JavaScript 采用单线程模式工作，js 执行环境中负责执行代码的线程只有一个；

单线程：

- 优点：更安全更简单；
- 缺点：耗时任务易阻塞；

### 第一章：同步模式（Synchronous）

### 第二章：异步模式（Asynchronous）

- 概念：不会去等待这个任务的结束才开始下一个任务，是开启过后就立即往后执行下一个任务，后续逻辑一般会通过回调函数的方式定义；

- 运行环境提供的 API 是以同步或异步模式的方式工作；

- **回调函数是所有异步编程方案的根基**；

- Promise：
  
  1. Promise 对象的 then 方法会返回一个全新的 Promise 对象；
  2. 后面的 then 方法就是在为上一个 then 返回的 Promise 注册回调；
  3. 前面 then 方法中回调函数的返回值会作为后面 then 方法回调的参数；
  4. 如果回调中返回的是 Promise，那后面 then 方法的回调等待它的结束；

- unhandledrejection 事件：
  
  ```javascript
  // 浏览器中注册：
  window.addEventListener('unhandledrejection', event => {
    const { reason, promise } = event;
    console.log(reason, promise);
    // reason => Promise 失败原因，一般是一个错误对象；
    // promise => 出现异常的 Promise 对象；
    event.preventDefault();
  }, false)
  
  // node 中注册：unhandledRejection驼峰命名
  process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    // reason => Promise 失败原因，一般是一个错误对象；
    // promise => 出现异常的 Promise 对象；
  })
  ```

- Generator 异步方案：（生成器函数）
  
  ```javascript
  function ajax (url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onload = function () {
        if(this.status === 200){
          resolve(this.response)
        }else{
          reject(new Error(this.statusText))
        }
      };
      xhr.send();
    })
  }
  
  function * main () {
    try{
      const users = yield ajax('/api/users.json');
      console.log(users);
      const posts = yield ajax('/api/posts.json');
      console.log(posts);
      const urls = yield ajax('/api/urls.json');
      console.log(urls);
    }catch(e){
      console.log(e)
    }
  }
  
  // 封装执行器函数  co库；
  function co (generator) {
    const g = generator();
    function handleResult (result) {
      if(result.done) return; // 生成器函数结束；
      result.value.then(data => {
        handleResult(g.next(data))
      }, error => {
        g.throw(error);
      })
    }
    handleResult(g.next());
  }
  // 调用：  
  co(mian);
  ```

- Async / Await 语法糖：
  
  ```javascript
  async function main () {
    try{
      const users = await ajax('/api/users.json');
      console.log(users);
      const posts = await ajax('/api/posts.json');
      console.log(posts);
      const urls = await ajax('/api/urls.json');
      console.log(urls);
    }catch(e){
      console.log(e)
    }
  }
  // 调用
  const promise = main();
  promise.then(() => {
    console.log('all completed')
  })
  ```