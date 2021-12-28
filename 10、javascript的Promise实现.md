### Promise的核心逻辑实现：

- Promise 就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行；

- Promise 中有三种状态：
  
  1. 成功（fulfilled）： pending => fulfilled
  2. 失败（rejected）：pending => rejected
  3. 等待（pending）：
  
  注意：**一旦状态确定就不可更改**
  
  - resolve 和  reject 函数是用来更改状态的；
    1. resolve => fulfilled；
    2. reject => rejected；
  - then 方法内部做的事情就是判断状态，如果状态是成功，就调用成功的回调函数，如果状态是失败，就调用失败的回调函数；then 方法是被定义在原型对象中的；
  - then 成功回调有一个参数，表示成功之后的值；then 失败回调有一个参数，表示失败后的原因；
  - then 方法是可以被链式调用的，后面 then 方法的回调函数拿到的值是上一个 then 方法的回调函数的返回值；
  
  ```javascript
  new Promise((resolve, reject) => {
    resolve('成功')
    // 或
    reject('失败')
  })
  ```
  
  ```javascript
  // 实现 MyPromise
  const PENDING = 'pending'; // 等待；
  const FULFILLED = 'fulfilled'; // 成功；
  const REJECTED = 'rejected'; // 失败；
  class MyPromise {
    constructor(executor){
      try{
        // 表示执行器，，立即调用执行器
          executor(this.resolve, this.reject)
      }catch(e){
        this.reject(e);
      }
    }
    // promise 状态；
    status = PENDING;
    // 成功之后的值；
    value = undefined;
    // 失败之后的原因；
    reason = undefined;
    // 成功回调；
    successCallback = [];
    // 失败回调；
    failCallback = [];
    resolve = value => {
      // 如果状态不是等待 阻止程序向下执行；
      if(this.status !== PENDING) return;
      // 将状态改为成功；
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // 判断成功回调是否存在，如果存在，就调用；
      // this.successCallback && this.successCallback(this.value);
      while(this.successCallback.length) this.successCallback.shift()();
    }
    reject = reason => {
      // 如果状态不是等待 阻止程序向下执行；
      if(this.status !== PENDING) return;
      // 将状态改为失败；
      this.status = REJECTED;
      // 保存失败之后的原因
      this.reason = reason;
      // 判断失败回调是否存在，如果存在，就调用；
      // this.failCallback && this.failCallback(this.reason);
      while(this.failCallback.length) this.failCallback.shift()();
    }
    then (successCallback, failCallback) {
      successCallback = successCallback ? successCallback : value => value;
      failCallback = failCallback ? failCallback : reason => { throw reason };
      // 实现 then 链式调用 ， 
      let promiseObj = new MyPromise((resolve, reject) => {
        // 判断状态
        if(this.status === FULFILLED){
          // 成功的回调函数
          // 异步获取 promiseObj 执行完后的 promise 对象
          setTimeout(() => {
            try{
              let x =  successCallback(this.value);
                  resolvePromise(promiseObj, x, resolve, reject);
            }catch(e){
              reject(e)
            }
          }, 0)
        }else if(this.status === REJECTED){
          // 失败的回调函数
          setTimeout(() => {
            try{
              let x =  failCallback(this.reason);
                  resolvePromise(promiseObj, x, resolve, reject);
            }catch(e){
              reject(e)
            }
          }, 0)
        }else{
          // 等待的状态
          // 将成功回调和失败回调存储起来 存储在数组中实现多次调用
          this.successCallback.push(() => {
            setTimeout(() => {
              try{
                let x =  successCallback(this.value);
                resolvePromise(promiseObj, x, resolve, reject);
              }catch(e){
                reject(e)
              }
            }, 0)
          });
          this.failCallback.push(() => {
            setTimeout(() => {
              try{
                let x =  failCallback(this.reason);
                resolvePromise(promiseObj, x, resolve, reject);
              }catch(e){
                reject(e)
              }
            }, 0)
          });
        }
      });
      // then 方法返回的 promise 对象；
      return promiseObj;
    }
    static all (array) {
      let result = [], index = 0;
      return new MyPromise((resolve, reject) => {
        function addData (key, value){
          result[key] = value;
          // 等待异步操作
          index++;
          if(index === array.length){
            resolve(result);
          }
        }
        for(let i = 0; i < array.length; i++){
          let current = array[i];
          if(current instanceof MyPromise){
            // promise 对象
            current.then(value => addData(i, value), reason => reject(reason))
          }else{
            // 普通值
            addData(i, array[i]);
          }
        }
        resolve(result);
      })
    }
    static resolve (value) {
      if(value instanceof MyPromise) return value;
      return new MyPromise(resolve => resolve(value))
    }
    finally (callback) {
      return this.then(value => {
        return MyPromise.resolve(callback()).then(() => value);
      }, reason => {
        return MyPromise.resolve(callback()).then(() => { throw reason });
      })
    }
    catch (failCallback) {
      return this.then(undefined, failCallback);
    }
  }
  function resolvePromise (promiseObj, x, resolve, reject) {
    //1. 判断 x 的值是普通值还是 promise 对象；
    //2. 如果是普通值，直接 resolve(x)返回出去；
    //3. 如果是 promise 对象，查看 promise 对象返回的结果；
    //4. 再根据 promise 对象返回结果，决定调用 resolve 还是 reject；
    if(promiseObj === x) {
      return reject(new TpyeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof MyPromise){
      // 是 promise 对象
      // x.then(value => resolve(value), reason => reject(reason));
      x.then(resolve, reject);
    } else {
      // 普通值
      resolve(x);
    }
  }
  
  // 测试
  const myPromise = new MyPromise((resolve, reject) => {
    setTimeout((i = 0) => {
      resolve(`成功 ${++i}`);
    }, 2000)
  })
  myPromise.then(value => {
    console.log(value); // 成功
  }, reason => {
    console.log(reason);
  })
  // 多次调用
  myPromise.then(value => {
    console.log(value); // 成功
  }, reason => {
    console.log(reason);
  })
  
  // then 链式调用
  myPromise.then(value => {
    console.log(value); // 成功
    return 100
  }).then(value => {
    console.log(value); // 100
  })
  ```