class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        // 1. 判断data是否是对象
        if (!data || typeof data !== 'object') return
        // 2. 遍历data所有的属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(obj, key, val) {
        let that = this
        // 负责收集依赖，并发送通知
        let dep = new Dep()
        // 如果 val 是对象，把val里面的属性转换成响应式数据
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                // 不是 obj[key], 是因为产生死递归，闭包未释放val
                return val
            },
            set(newValue) {
                if (newValue === val) return
                val === newValue
                that.walk(newValue)
                // 发送通知
                dep.notify()
            }
        })
    }

}