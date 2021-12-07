### 第一章：什么是函数式编程

- 概念：（FP：Function Programming）

  1. 面向对象编程思维方式：把现实世界中的事物抽象程序世界中的**类**和**对象**，通过**封装**、**继承**、**多态**来演示事物事件的联系；
  2. 函数式编程的思维方式：把现实世界的事物和事物之间的**联系**抽象到程序世界（对运算过程进行抽象）；
     - 程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会 涉及很多有输入和输出的函数；
     - x -> f(联系，映射) -> y，y = f(x);
     - **函数式编程中的函数指的不是程序中的函数（方法）**，而是数学中的函数即映射关系，例如：**y = sin(x) **，x和y的关系；
     - **相同的输入始终要得到相同的输出**（纯函数）；
     - 函数式编程用来描述数据（函数）之间的映射；

  ```javascript
  // 非函数式
  let num1 = 2;
  let num2 = 3;
  let sum = num1 + num2;
  console.log(sum); // 5
  
  // 函数式
  function add (n1, n2){
    return n1 + n2;
  }
  let sum = add(2,3)
  console.log(sum); // 5
  ```

- 函数式一等公民：（First-class Function）

  1. 函数可以存储在变量中；
  2. 函数作为参数；
  3. 函数作为返回值；

  在 javascript 中**函数就是一个普通的对象（可以通过 new Function() )**，我们可以把函数存储到**变量/数组**中，它还可以作为另一个函数的参数和返回值，甚至我们可以在程序运行的时候通过 new Function() 来构造一个新的函数；

### 第二章：高阶函数

- 高阶函数：（Higher-order Function）

  1. 可以把函数作为参数传递给另一个函数；

     ```javascript
     function forEach (array, fn){
       for(let i = 0; i < array.length; i++){
         fn(array[i])
       }
     }
     // 测试
     let arr = [1,2,4,5,7];
     forEach(arr, function(item){
       console.log(item)
     })
     // 1
     // 2
     // 4
     // 5
     // 7
     
     function filter (array, fn){
       let result = [];
       for(let i = 0; i < array.length; i++){
         if(fn(array[i])){
           result.push(array[i])
         }
       }
       return result
     }
     // 测试
     let arr2 = [1,2,4,5,7];
     let a = filter(arr2, function(item){
       return item % 2 === 0;
     })
     console.log(a); // [2, 4]
     ```

  2. 可以把函数作为一个函数的返回结果；

     ```javascript
     function makeFn(){
       let msg = 'hello function'
       return function(){
         console.log(msg)
       }
     }
     //测试
     const fn = makeFn();
     fn();
     makeFn()();
     
     // once 函数
     function once (fn){
       let done = false;
       return function (){
         if(!done){
           done = true;
           return fn.apply(this, arguments)
         }
       }
     }
     // 测试
     let pay = once(function(money){
       console.log(`支付：${money} RMB`)；
     })
     pay(20) // 支付：20RMB  只执行一次；
     pay(20)
     pay(20)
     ```

- 使用高级函数的意义：
  1. 抽象可以帮我们屏蔽细节，只需关注于我们相关的目标执行；
  2. 高阶函数是用来抽象通用的问题；

### 第三章：闭包

- 闭包（Closure）：

  - 函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包；
  - 可以在另一个作用域中调用一个函数的内部函数，并访问到该函数的作用域的成员；

- 闭包的本质：函数在执行的时候会被放到一个执行栈上，当函数执行完毕后，会从执行栈上移除，**但是堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员；

- 闭包的好处：延长了外部函数它内部变量的作用范围；

  ```javascript
  function makePower (power){
    return function (number){
      return Math.pow(number, power)
    }
  }
  // 求平方
  let power2 = makePower(2);
  console.log(power2(4)) // 16
  console.log(power2(5)) // 25
  // 求三次方
  let power3 = makePower(3);
  console.log(power3(4)) // 64
  console.log(power3(3)) // 27
  ```

### 第四章：纯函数

- 概念：

  纯函数：相同的输入永远会得到相同的输出，而且没有任何可观察的副作用；

  lodash：是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法；

  数组 slice 和 splice 分别是：纯函数和不纯函数；

  - slice 返回数组中指定的部分，不会改变原数组；
  - splice 对数组进行操作返回该数组，会改变原数组；

- 函数式编程不会保留计算中的结果，所以变量不可变的（无状态的）；

- 我们可以把一个函数的执行结果交给另一个函数去处理；

```javascript
const _ = require('lodash');
function getArea (r){
  console.log(r);
  return Math.PI * r * r;
}
let getAreaWithMemory = _.memoize(getArea);
console.log(getAreaWithMemory(4));
// 模拟 memoize 方法的实现 可缓存
function memoize(fn){
  let cache = {};
  return function (){
    let key = JSON.stringify(arguments);
   	return cache[key] = cache[key] || fn.apply(fn, arguments);
  }
}
```

- 可测试：纯函数让测试更方便；

- 并行处理：

  1. 在多线程环境下，并行操作共享的内存数据很可能会出现意外情况；
  2. 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数（web worker）；

- 副作用：副作用让一个函数变的不纯，纯函数的根据相同的输入返回相同的输出，如果函数依赖外部的状态就无法保证输出相同，就会带来副作用；

- 副作用来源：

  1. 配置文件；
  2. 数据库；
  3. 获取用户的输入；

  所有的外部交互都有可能带来副作用，副作用也使得方法的通用性不适合扩展和可重用性，同时副作用会给程序中带来安全隐患给程序带来不确定性，但是副作用不可能完全禁止，尽可能控制它们在可控范围内发生；

  ```javascript
  // 柯里化 演示：
  function checkage (min){
    return function (age){
      return age >= min;
    }
  }
  checkage(18)(20) // true;
  // ES6
  const checkAge = min => (age => age >= min)
  ```

- 柯里化（Currying）：

  1. 当一个函数有多个参数的时候，先传递一部分参数调用它（这部分参数以后永远不变）；
  2. 然后返回一个新的函数接收剩余的参数，返回结果；

  高级柯里化的实现：

  ```javascript
  function curry(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.apply(this, args);
      } else {
        return function(...args2) {
          return curried.apply(this, args.concat(args2));
        }
      }
    }
  }
  ```

  

