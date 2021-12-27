/**
 * 1. 搭建Promise基础架构
 *      a.Promise接受executor作为参数传入
 *      b.设置内置属性[PromiseStatus、PromiseResult]和方法[resolve、reject]
 *          Ⅰ. PromiseStatus有三种状态，分别为pending,fulfilled,rejected,状态只能改变一次，pending=>fuifilled pending=>rejected
 *          Ⅱ. PromiseResult 执行的结果保存在PromiseResult中
 *      c. 使用try catch来获取executor中抛出的错误，并返回Promise对象处理抛出的异常
 * 2. then方法
 *     a. then方法执行回调函数需要有条件，根据状态执行对应的回调函数，函数的实参是存储在PromiseResult的值
 *     b. 处理异步状态,实例对象内部为异步函数,状态是pending ,then方法的回调没有等到pending状态的改变,导致then方法不执行,解决方法：定义callbacks回调数组
 * 3. 实现catch方法
 * 4. 实现resolve、reject方法
 * 5. 实现all、race方法
 *
 * @param {*} executor
 */
function Promise(executor) {
    this.PromiseStatus = 'pending';
    this.PromiseResult = null;
    this.callbacks = [];

    resolve = (data) => {
        if (this.PromiseStatus !== 'pending') return;
        this.PromiseResult = data;
        this.PromiseStatus = 'fulfilled';
        // 复现原生Promise的异步调用机制
        setTimeout(() => {
            this.callbacks.forEach((item) => item.onResolved(data));
        });
    };
    reject = (data) => {
        if (this.PromiseStatus !== 'pending') return;

        this.PromiseResult = data;
        this.PromiseStatus = 'rejected';
        // 复现原生Promise的异步调用机制
        setTimeout(() => {
            this.callbacks.forEach((item) => item.onRejected(data));
        });
    };
    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = (onResolved, onRejected) => {
    // 异常穿透
    if (typeof onResolved !== 'function') {
        onResolved = (data) => data;
    }
    if (typeof onRejected !== 'function') {
        onRejected = (reason) => {
            throw reason;
        };
    }
    return new Promise((resolve, reject) => {
        const callback = (type) => {
            try {
                let result = type(this.PromiseResult);
                if (result instanceof Promise) {
                    result.then(
                        (r) => resolve(r),
                        (j) => reject(j)
                    );
                } else {
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        };
        if (this.PromiseStatus === 'fulfilled') {
            callback(onResolved);
        }
        if (this.PromiseStatus === 'rejected') {
            callback(onRejected);
        }
        if (this.PromiseStatus === 'pending') {
            this.callbacks.push({
                onResolved: callback(onResolved),
                onRejected: callback(onRejected),
            });
        }
    });
};

Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(
                (r) => {
                    resolve(r);
                },
                (j) => {
                    reject(j);
                }
            );
        } else {
            resolve(value);
        }
    });
};

Promise.reject = function (value) {
    return new Promise((resolve, reject) => {
        reject(value);
    });
};

Promise.all = function (pArray) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let pResult = [];
        for (let i = 0; i < pArray.length; i++) {
            pArray[i].then(
                (v) => {
                    count++;
                    pResult[i] = v;
                    if (count === pArray.length) {
                        resolve(pResult);
                    }
                },
                (j) => {
                    reject(j);
                }
            );
        }
    });
};

Promise.race = function (pArray) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < pArray.length; i++) {
            pArray[i].then(
                (r) => {
                    resolve(r);
                },
                (j) => {
                    reject(j);
                }
            );
        }
    });
};