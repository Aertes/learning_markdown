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
  
- 实现 vue-router 中的 install 方法

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
          }
        }
      })
      
    }
  }
  ```

  













