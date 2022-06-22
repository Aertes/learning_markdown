### 第一章：Vue.js 基础结构

- vue 的最基础代码

```vue
<div id="app">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！{{ company.name }}
  </span>
</div>
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script>
	new Vue({
    el:"app",
    data: {
      company:{
        name:'jack',
        address: 'zzda'
      }
    }
  })
</script>
```

### 第二章：Vue 的生命周期

![Vue 实例生命周期](files/typora-user-images/lifecycle.png)

1. 生命周期钩子函数：
   - beforeCreate：
   - created：
   - beforeMount：
   - mounted：
   - beforeUpdate：
   - updated：
   - beforeDestroy：
   - destroy：

### 第三章：Vue.js语法和概念

- 差值表达式：
- 指令（内置14个）：
- 计算属性和监听器：
- Class 和 Style 绑定：
- 条件渲染 （v-if / v-show ） / 列表渲染 （v-for）：
- 表达输入绑定：
- 组件：
- 插槽：
- 插件：vue-router，vuex
- 混入：mixin
- 响应式原理：

### 第四章：Vue Router

- 基本使用：

- Hash 和 History 模式：
  - Hash 模式：# 号
    - 是基于锚点，以及 onhashchange 事件
    - URL 中 # 后面的内容作为路径地址
    - 监听 hashchange事件
    - 根据当前路由地址找到对应组件重新渲染

  - History 模式：
    - 基于 HTML5 中的 History API
    
    - history.pushState() IE10 以后支持
    
    - history.replaceState()
    
    - 需要服务器的支持
    
    - 在服务端应该除了静态资源外部都返回单页应用的 index.html
    
    - History 模式的 Nginx
    
      ```shell
      # 启动
      start nginx
      # 重启
      nginx -s reload
      # 停止
      nginx -s stop
      ```
  
- VueRouter 核心代码的实现：
  
  ```javascript
  // router/index.js
  // 注册插件
  Vue.use(VueRouter)
  // 创建路由对象
  const router = new VueRouter({
    routes: [
      {
        name: 'home',
        path: '/',
        component: homeComponent
      }
    ]
  })
  // mian.js
  // 创建 Vue 实例， 注册 router 对象
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
  ```
  
- 模拟 vue-router 的实现：

  ```javascript
  let _Vue = null
  export default class VueRouter{
    static install(Vue){
      // 1.判断当前插件是否已经被安装
      if(VueRouter.install.installed){
        return
      }
      VueRouter.install.installed = true
      // 2.把 Vue 构造函数记录到全局
      _Vue = Vue
      // 3.把创建Vue实例时候传入的 router 对象注入到Vue实例上
      // 混入
      _Vue.mixin({
        beforeCreate(){
          if($options.router){
             _Vue.prototype.$router = this.$options.router
            this.$option.router.init()
          }
        }
      })
    }
    constructor(options){
      this.options = options
      this.routerMap = {}
      this.data = _Vue.observable({
        current: '/'
      })
    }
    init(){
      this.createRouteMap()
      this.initComponents(_Vue)
      this.initEvent()
    }
    createRouteMap(){
      this.options.routes.forEach(route => {
        this.routerMap[route.path] = route.component
      })
    }
    initComponents(Vue){
      const self = this
      Vue.component('router-link', {
        props: {
          to: String,
        },
        render(h) {
          return h('a', {
            attrs: {
              href: this.to
            },
            on: {
              click: this.clickHandler
            }
          }, [this.$slot.default])
        }, // render 模式
        // template: `<a :href='to' ><slot></slot></a>` 
        method: {
          clickHandler(e){
            history.pushState({}, '', this.to)
            this.$router.data.current = this.to
            e.preventDefault()
          }
        }
      })
      Vue.component('router-view', {
        render(h) {
          const component = self.routerMap[self.data.current]
          return h(component)
        }
      })
    }
    initEvent(){
      window.addEventListener('popstate', () => {
        this.data.current = window.location.pathname
      })
    }
  }
  ```
  
- 模拟 Vue 的响应式原理：Vue 2+ （Object.defineProperty)、Vue 3+（Proxy）

  - 数据驱动

  - 响应式核心原理

    ![image-20220620163208538](files/img/vue%E5%93%8D%E5%BA%94%E5%BC%8F%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86.png)

  - 发布订阅模式和观察者模式

    ![image-20220620161839597](files/img/%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85%E5%92%8C%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F.png)

  ### 第五章：模拟 Vue 核心源码

  - Vue 2+

  ```html
  // index.html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Vue 模拟核心源码</title>
  </head>
  <body>
      <div id="app">
          <h1>差值表达式</h1>
          <h3>{{ msg }}</h3>
          <h3>v-text</h3>
          <div v-text="msg"></div>
          <h1>v-model</h1>
          <input type="text" v-model="msg">
          <input type="text" v-model="count">
      </div>
      <script>
          const vm = new Vue({
              el: '#app',
              data:{
                  msg:'hello world',
                  count: 100,
                  person:{
                      name: '里斯'
                  }
              }
          })
          console.log(vm.msg);
          // vm.msg = {
          //     test: 'test'
          // }
      </script>
      <script src="./Dep.js"></script>
      <script src="./Watcher.js"></script>
      <script src="./Compiler.js"></script>
      <script src="./Observer.js"></script>
      <script src="./Vue.js"></script>
  </body>
  </html>
  ```

  ```javascript
  // Vue.js
  class Vue {
      constructor(options) {
          // 1.通过属性保存选项的数据
          this.$options = options || {}
          this.$data = options.data || {}
          this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
          // 2.把data中的成员转换成getter和setter，注入到Vue实力中
          this._proxyData(this.$data)
          // 3.调用observer对象，监听数据的变化
          new Observer(this.$data)
          // 4.调用compiler对象，解析指令和差值表达式
          new Compiler(this)
      }
      _proxyData(data) {
          // 遍历data中的所有属性
          Object.keys(data).forEach(key => {
              // 把data的属性注入到Vue实例中 this => Vue 实例
              Object.defineProperty(this, key, {
                  enumerable: true,
                  configurable: true,
                  get() {
                      return data[key]
                  },
                  set(newValue) {
                      if (data[key] === newValue) return
                      data[key] = newValue
                  }
              })
          })
      }
  
  }
  ```

  ```javascript
  // Observer.js
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
  ```

  ```javascript
  // Compiler.js
  class Compiler {
      constructor(vm) {
          this.el = vm.$el
          this.vm = vm
          this.compile(this.el)
      }
      // 编译模版，处理文本节点和元素节点
      compile(el) {
          const childNodes = el.childNodes
          Array.from(childNodes).forEach(node => {
              // 处理文本节点
              if (this.isTextNode(node)) {
                  this.compileText(node)
              } else if (this.isElementNode(node)) {
                  // 处理元素节点
                  this.compileElement(node)
              }
              // node 节点是否有子节点，如果有子节点，则递归调用 compile
              if (node.childNodes && node.childNodes.length) {
                  this.compile(node)
              }
          })
      }
      // 编译元素节点，处理指令
      compileElement(node) {
          // 遍历所有属性的节点
          Array.from(node.attributes).forEach(attr => {
              let attrName = attr.name;
              // 判断是否是指令
              if (this.isDirective(attrName)) {
                  // v-text => text
                  attrName = attrName.substr(2)
                  let key = attr.value
                  this.update(node, key, attrName)
              }
          })
      }
  
      update(node, key, attrName) {
          let updateFn = this[attrName + 'Updater']
          updateFn && updateFn.call(this, node, this.vm[key], key)
      }
  
      // 处理 v-text 指令
      textUpdater(node, value, key) {
          node.textContent = value
          new Watcher(this.vm, key, (newValue) => {
              node.textContent = newValue
          })
      }
      // 处理 v-model 指令
      modelUpdater(node, value, key) {
          node.value = value
          new Watcher(this.vm, key, (newValue) => {
              node.value = newValue
          })
          // 双向绑定
          node.addEventListener('input', () => {
              this.vm[key] = node.value
          })
      }
  
      // 编译文本节点，处理差值表达式
      compileText(node) {
          // {{ msg }}  匹配差值表达式
          const reg = /\{\{.+?\}\}/
          let value = node.textContent
          if (reg.test(value)) {
              let key = RegExp.$1.trim()
              node.textContent = value.replace(reg, this.vm[key])
              // 创建watcher对象，当数据改变更新视图
              new Watcher(this.vm, key, (newValue) => {
                  node.textContent = newValue
              })
          }
      }
      // 判断元素属性是否是指令
      isDirective(attrName) {
          return attrName.startsWith('v-')
      }
      // 判断节点是否是文本节点
      isTextNode(node) {
          node.nodeType === 3
      }
      //判断节点是否是元素节点
      isElementNode(node) {
          node.nodeType === 1
      }
  }
  ```

  ```javascript
  // Watcher.js
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
  ```

  ```javascript
  // Dep.js
  class Dep {
      constructor() {
          // 存储所有的观察者
          this.subs = []
      }
      // 添加观察者
      addSub(sub) {
          if (sub && sub.update) {
              this.subs.push(sub)
          }
      }
      // 发送通知
      notify() {
          this.subs.forEach(sub => {
              sub.update()
          })
      }
  }
  ```

  - 整体流程

    ![image-20220622150207882](files/img/vue%E5%93%8D%E5%BA%94%E5%BC%8F%E6%95%B4%E4%BD%93%E6%B5%81%E7%A8%8B.png)

  - Vue 3+

  ```javascript
  
  ```

  













