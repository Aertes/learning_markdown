### 第一章：性能优化的介绍

- 性能优化是不可避免的；
- 哪些内容可以看做是性能优化；
- 无处不在的前端性能优化；
- javascript 语言的性能优化；

1. 内存管理；
2. 垃圾回收与常见GC算法；
3. V8 引擎的垃圾回收；
4. Performance 工具；
5. 代码优化实例

### 第二章：内存管理（Memory Management）

- 内存：由可读写单元组成，表示一片可操作空间；
- 管理：认为的去操作一片空间的申请、使用和释放；
- 内存管理：开发者主动申请空间、使用空间、释放空间；
- 管理流程：申请 => 使用 => 释放；

```javascript
// 1、申请空间；
let obj = {}
// 2、使用空间；
obj.name = 'jack';
// 3、释放空间；
obj = null;
```

### 第三章：JavaScript 中的垃圾回收

- javascript 中的内存管理是自动的；
- 对象不再被引用时是垃圾；（引用）；
- 对象不能从根上访问到时是垃圾；（从根上访问-可达对象）
- javascript 中的可达对象：
  - 可以访问到的对象就是可达对象（引用、作用域链）；
  - 可达的标准就是从根上出发是否能够被访问；
  - javascript 中的根就可以理解为全局变量对象；

```javascript
// 可达对象；
let obj = {name: 'jack'};
let al = obj; // 引用；
obj = null;
// Reachable
// 对象引用
function objGroup (obj1, obj2){
  obj1.next = obj2;
  obj2.prev = obj1;
  return {
    o1: obj1,
    o2: obj2
  }
}
let obj = objGroup({name: 'obj1'}, {name: 'obj2'});
console.log(obj);
{
	o1: {name: 'obj1', next: {name: 'obj2', prev: [Circular]}},
  o2: {name: 'obj2', prev: {name: 'obj1', next: [Circular]}},
}
```

### 第四章：GC 算法

- GC 的定义与作用：
  1. GC 就是垃圾回收机制的简写；
  2. GC 可以找到内存中的垃圾、并释放和回收空间；

```javascript
// 程序中不再需要使用的对象
function func () {
  name = 'lg' // 调用完成后不再需要使用，当成垃圾回收掉
  return `${name} is a coder`
}
func();

// 程序中不能再访问到的对象
function func () {
  const name = 'lg' // 在外部不能被访问到
  return `${name} is a coder`
}
func()
```

- GC 算法的定义：
  1. GC 是一种机制，垃圾回收器完成具体工作；
  2. 工作的内容就是查找垃圾释放空间、回收空间；
  3. 算法就是工作时查找和回收所遵循的规则；

- 常见的 GC 算法：

  1. 引用计数：

     - 核心思想：设置引用数，判断当前引用数是否为 0；
     - 引用计数器：
     - 引用关系改变时，修改引用数字；

     ```javascript
     const user1 = {age: 11}
     const user2 = {age: 22}
     const user3 = {age: 33}
     const nameList = [user1.age, user2.age,user3.age]
     function fn () {
       const num1 = 1
       const num2 = 2
     }
     fn()
     ```

     - 优点：
       1. 发现垃圾时立即回收；
       2. 最大限度减少程序暂停、卡顿；
     - 缺点：
       1. 无法回收循环引用的对象；
       2. 时间开销大；

     ```javascript
     // 对象的循环引用
     function fn () {
       const obj1 = {}
       const obj2 = {}
       obj1.name = obj2
       obj2.name = obj1
     }
     fn()
     ```

  2. 标记清除：

     - 核心思想：分标记和清除两个阶段完成；
     - 遍历所有对象，找标记活动对象；
     - 遍历所有对象，清除没有标记对象；
     - 回收相应的空间；

     标记 => 清除；

     - 优点：
       1. 解决对象引用的回收操作；
     - 缺点：
       1. 地址不连续；
       2. 空间碎片化；
       3. 不会立即回收垃圾对象；

  3. 标记整理：

     - 可以看做是标记清除的增强操作；
     - 标记阶段的操作和标记清除一致；
     - 清除阶段会优先执行整理，移动对象位置，地址上产生连续；
     - 优点：
       1. 减少碎片化空间；
     - 缺点：
       1. 不会立即回收垃圾对象；

  4. 分代回收：

### 第五章：V8 引擎

- V8 引擎的认识：

  1. 是一款主流的 javascript 执行引擎，（浏览器环境、node环境）；
  2. V8 采用即时编译；
  3. V8 内存设限：64位系统上限 1.5G， 32位系统上限 800M（内部回收机制）；

- V8 垃圾回收机制：

  1. 采用分代回收思想；
  2. 内存分为新生代、老生代；
  3. 针对不同对象采用不同算法；

  ![image-20211220142124582](../../../Library/Application%20Support/typora-user-images/image-20211220142124582.png)

- V8 中常用 GC 算法：

  1. 分代回收：

     - 新生代：存活时间较短的对象；
       - 回收过程采用复制算法 + 标记整理；
       - 新生代内存区分为两个等大小空间；（From、To）
       - 使用空间为 From，空闲空间为 To；
       - 活动对象存储于 From 空间；
       - 标记整理后，将活动对象拷贝至 To空间；
       - From 与 To 交换空间完成释放；
       - 回收细节说明：
         1. 拷贝过程中可能出现晋升；
         2. 晋升就是将新生代对象移动到老生代；
         3. 一轮 GC 还存活的新生代需要晋升；
         4. To 空间的使用率超过 25%，移动到老生代中；
     - 老生代：
       - 老生代对象存放在右侧老生代区域；
       - 内存大小的限制：64位操作系统1.4G，32位操作系统700M；
       - 老生代对象就是指存活时间较长的对象；
       - 老生代对象垃圾回收实现：
         1. 主要采用标记清除、标记整理、增量标记算法；
         2. 首先使用标记清除完成垃圾空间的回收；
         3. 采用标记整理进行空间优化；
         4. 采用增量标记进行效率优化；
     - 新生代和老生代细节对比：
       1. 新生代（复制算法）区域垃圾回收使用空间换时间；
       2. 老生代区域垃圾回收不适合复制算法；

     ![image-20211220144200649](../../../Library/Application%20Support/typora-user-images/image-20211220144200649.png)

  2. 空间复制：

  3. 标记清除：

  4. 标记整理：

  5. 标记增量：

### 第六章：内存问题的体现（Performance 工具）

- 页面出现延迟加载或经常性暂停；

- 页面持续性出现糟糕的性能表现；（内存膨胀）

- 页面的性能随时间延长越来越差；

- 界定内存问题的标准：

  1. 内存泄露：内存使用持续升高；
  2. 内存膨胀：在多数设备上都存在性能问题；
  3. 频繁垃圾回收：通过内存变化图进行分析；

- 监控内存的几种方式：

  1. 浏览器任务管理器：

  2. Timeline 时序图记录；

  3. 堆快照查找分离 DOM；（内存监控）

     - 界面元素存活在 DOM 树上；
     - 垃圾对象时的 DOM 节点；
     - 分离状态的 DOM 节点；（空间的浪费）

  4. 判断是否存在频繁的垃圾回收；

     1. GC 工作时应用程序时停止的；
     2. 频繁且过长的 GC 会导致应用假死；
     3. 用户使用中感知应用卡顿；

     - Timeline 中频繁的上升下降：
     - 任务管理器中数据频繁的增加减小：

### 第七章：Jsperf 使用流程（性能测试）

- 基于 Benchmark.js 的 [Jsperf](https://github.com/jsperf/jsperf.com)；

1. 使用 GitHub 账号登陆；
2. 填写个人信息；（非必须）
3. 填写详细的测试用例信息（title、slug）；
4. 填写准备代码（DOM操作时经常使用）；
5. 填写必要有 setup 与 teardown 代码；
6. 填写测试代码片段；

### 第八章：JSBench 使用（性能测试）

- [JSBench](https://jsbench.me/)

### 第九章：javascript 性能优化几点

1. 慎用全局变量：

   - 全局变量定义在全局执行上下文，是所有作用域的顶端；
   - 全局执行上下文一直存在于上下文执行栈，直到程序退出；
   - 如果某个局部作用域出现了同名变量则会遮蔽或污染全局；

2. 缓存全局变量：

   - 将使用中无法避免的全局变量缓存到局部；（如：获取DOM元素）

3. 通过原型新增方法：

   - 在原型对象上新增实例对象需要的附加方法；

4. 避开闭包陷阱：（引用的释放）

5. 避免属性访问方法使用：

   - javascript 不需要属性的方法方法，所有属性都是外部可见的；
   - 使用属性访问方法只会增加一层重定义，没有访问的控制力；

6. for 循环的优化：

   - 对 length 的提前缓存；

7. 选择最优的循环方式：

   forEach  >   for  >  for...in  （性能排序）

8. 节点添加优化：（DOM节点操作）

   - 节点的添加操作必然会有回流和重绘；
   - 回流：
   - 重绘：
   - 重排：

9. 克隆优化节点操作：（DOM节点操作）

10. 直接量替换：（new Object）

    - 通过字面量的方式替换 new 关键

    ![image-20211220164848173](../../../Library/Application%20Support/typora-user-images/image-20211220164848173.png)

11. 减少判断层级：

    ![image-20211220174154675](../../../Library/Application%20Support/typora-user-images/image-20211220174154675.png)

12. 减少作用域链查找层级：

    ![image-20211221100117098](../../../Library/Application%20Support/typora-user-images/image-20211221100117098.png)

13. 减少数据读取次数：（引用类型的值提前缓存）

    ![image-20211221102118724](../../../Library/Application%20Support/typora-user-images/image-20211221102118724.png)

14. 字面量和构造式：（字面量快于构造式）

    ![image-20211221102614809](../../../Library/Application%20Support/typora-user-images/image-20211221102614809.png)

    ![image-20211221102831567](../../../Library/Application%20Support/typora-user-images/image-20211221102831567.png)

15. 减少循环体中活动：

    ![image-20211221103510452](../../../Library/Application%20Support/typora-user-images/image-20211221103510452.png)

    ![image-20211221103712039](../../../Library/Application%20Support/typora-user-images/image-20211221103712039.png)

16. 减少声明及最小化语句数：

    ![image-20211221104212594](../../../Library/Application%20Support/typora-user-images/image-20211221104212594.png)

    ![image-20211221104554566](../../../Library/Application%20Support/typora-user-images/image-20211221104554566.png)

17. 采用事件绑定：（事件委托）