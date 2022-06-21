class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        // data中的属性名称
        this.key = key
        // 回调函数负责更新视图
        this.cb = cb
        // 把watcher对象记录到 Dep类的静态属性 target
        Dep.target = this
        // 触发get方法， 在get方法中会调用addSub
        this.oldValue = vm[key]
        Dep.target = null
    }
    update() {
        // 当数据发生变化的时候 更新视图
        let newValue = this.vm[this.key]
        if (this.oldValue === newValue) return
        this.cb(newValue)
    }
}