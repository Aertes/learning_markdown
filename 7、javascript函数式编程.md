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
  // 另一种写法
  function curry (fn){
    return function curriedFn (...args){
      if(args.length < fn.length){
        return function (){
          return curriedFn(...args.concat(Array.from(arguments)));
        }
      }
      return fn(...args);
    }
  }
  ```

- 柯里化总结：

  1. 柯里化可以让我们给一个函数传递较少的参数，得到一个已经记住了某些固定参数的新函数；
  2. 这是一种对函数参数的‘缓存’；
  3. 让函数变的更灵活，让函数的粒度更小；
  4. 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能；

### 第五章：函数组合

- 纯函数和柯里化很容易写出洋葱代码（嵌套代码）

- 函数组合可以让我们把细粒度的函数重新组合生成一个新的函数；

- 管道：

- 函数组合（compose）：如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数；

  1. 函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果；
  2. **函数组合默认是从右到左执行**；

  ```javascript
  // 函数组合演示
  function compose (f, g){
    return function (value){
      return f(g(value))
    }
  }
  // lodash 中的组合函数
  const _ = require('lodash');
  const reverse = arr => arr.reverse();
  const first = arr => arr[0];
  const toUpper = str => str.toUpperCase();
  // 组合函数的参数是函数，执行时从右至左
  const f = _.flowRight(toUpper, first, reverse);
  console.log(f(['one', 'two', 'three'])) // THREE;
  
  // 模拟 lodash 中的 flowRight
  function _flowRight (...args){
    return function (value) {
      return args.reverse().reduce(function (acc, fn) {
        return fn(acc);
      }, value)
    }
  }
  // ES6 箭头函数写法
  const __flowRight = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value);
  // 测试
  const f = _.flowRight(toUpper, first, reverse);
  console.log(f(['one', 'two', 'three'])) // THREE;
  ```

- 函数组合的特点：函数组合要满足**结合律（associativity）**：

  ```javascript
  // lodash 中的组合函数 满足结合律
  const _ = require('lodash');
  const f = _.flowRight(_.toUpper, _.first, _.reverse);
  // 结合律
  const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse);
  // 结果一致
  console.log(f(['one', 'two', 'three'])) // THREE;
  ```

- PointFree：我们可以把数据处理的过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前，我们需要定义一些辅助的基本运算函数；

  1. 不需要指明处理的数据；

  2. **只需要合成运算过程**；

  3. 需要定义一些辅助的基本运算函数；

  4. 案例演示：

     ```javascript
     // 非 Point Free
     // Hello World  =>  hell_world
     function f (word){
       return word.toLowerCase().replace(/\s+/g, '_');
     }
     
     // Point Free
     const fp = require('lodash/fp');
     const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower);
     console.log(f('Hello World')) // hell_world
     ```

### 第六章：函子

- 函子（Functor）：

  1. 容器：包含值和值的变形关系（这个变形关系就是函数）；
  2. 函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运行一个函数对值进行处理（变形关系）；

  ```javascript
  class Container{
    constructor(value){
      this._value = value;
    };
    map (fn) {
      return new Container(fn(this._value));
    }
  }
  let r = new Container(5).map(x => x + 1 ).map(x => x * x);
  console.log(r) // Container {_value: 36}
  
  // 函子对象 隐藏new关键字
  class _Container{
    static of (value){
      return new Container(value);
    }
    // 存储一个值，不对外共享，公布；
    constructor(value){
      this._value = value;
    };
    map (fn) {
      return Container.of(fn(this._value));
    }
  }
  let t = _Container(5).map(x => x + 2 ).map(x => x * x);
  // t 是函子对象；
  console.log(t) // Container {_value: 49}
  ```

  3. 总结：
     - 函数式编程的运算不直接操作值，而是由函子完成；
     - 函子就是一个实现了 map 契约的对象；
     - 我们可以把函子想象成一个盒子，这个盒子里面封装了一个值；
     - 想要处理盒子中的值，我们需要给盒子的 map 方法传递一个处理值的函数（纯函数），由这个函数来对值进行处理；
     - 实现链式调用；
     - 最终 map 方法返回一个包含新值的盒子（函子）；
  4. MayBe 函子：

  - 我们在编程的过程中可能会遇到很多错误，需要对这些错误做相应的处理；

  - MayBe 函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）

    ```javascript
    // MayBe 函子
    class MayBe {
      static of (value) {
        return new MayBe(value)
      }
      constructor(value){
        this._value = value;
      }
      map (fn) {
        return this.isNothing()? MayBe.of(null) : MayBe.of(fn(this._value));
      }
      isNothing () {
        return this._value === null || this_value === undefind;
      }
    }
    
    let r = MayBe.of('Hello World').map(x => x.toUpperCase());
    console.log(r); // MayBe {_value: 'HELLO WORLD'}
    
    let t = MayBe.of(null).map(x => x.toUpperCase());
    console.log(t); // MayBe {_value: null}
    ```

  3. Either 函子：

     - Either 两者中的任何一个，类似于 if...else... 的处理；
     - 异常会让函数变的不纯，Either 函子可以用来做异常处理；

     ```javascript
     // Either 函子
     class Left {
       static of (value){
         return new Left(value);
       }
       constructor(value){
         this._value = value;
       }
       map (fn){
         return this;
       }
     }
     
     class Right {
       static of (value){
         return new Right(value);
       }
       constructor(value){
         this._value = value
       }
       map (fn) {
         return Right.of(fn(this._value));
       }
     }
     
     function parseJSON (str){
       try{
         return Right.of(JSON.parse(str))
       }catch(e){
         return Left.of({error: e.message})
       }
     }
     
     let r = parseJSON('{name: zs}');
     console.log(r); // Left {_value: {error: 'Unexpected token n in JSON at position 2'}}
     let t = parseJSON('{"name": "zs"}');
     console.log(t); // Right {_value: {name: "zs"}}
     ```

  4. IO 函子：

     - IO 函子中的 _value 是一个函数，这里是吧函数作为值来处理；
     - IO 函数可以把不纯的动作存储到 _value 中，延迟执行这个不纯的操作（惰性执行），当前的操作是纯的，把不纯的操作包装；
     - 把不纯的操作交给调用者来处理；

     ```javascript
     const fp = require('lodash/fp');
     class IO {
       static of (x) {
         return new IO(function (){
           return x;
         })
       }
       constructor(fn){
         this._value = fn;
       }
       map(fn){
         return new IO(fp.flowRight(fn, this._value));
       }
     }
     
     // 调用
     let r = IO.of(process).map(p => p.execPath);
     console.log(r); // IO {_value: [Function]}
     console.log(r._value()); // 输出 node 环境执行的路径
     ```

  5. Task 异步执行：

     - 异步任务的实现过于复杂，我们使用 folktale 中的 Task 来演示；
     - folktale 一个标准的函数式编程库；
       - 和lodash、ramda 不同的是，它没有提供很多功能函数；
       - 只提供了一些函数式处理操作，例如：compose（组合）、curry（柯里化）等，一些函子 Task、Either、MayBe 等；

     ```javascript
     const { compose, curry } = require('folktale/core/lambda');
     const { toUpper, first } = require('lodash/fp');
     // 第一个参数是传入函数的参数个数
     let f = curry(2, function (x, y) {
       console.log(x + y);
     })
     f(3, 4);  // 7
     f(3)(4);  // 7
     
     // 函数组合
     let t = compose(toUpper, first);
     t(['one', 'two']);  // ONE
     
     // Task 处理异步任务
     const fs = require('fs');
     const { task } = require('folktale/concurrency/task');
     const { split, find } = require('lodash/fp');
     function readFile (filename){
       return task(resolver => {
         fs.readFile(filename, 'utf-8', (error, data) => {
           if(error) resolver.reject(error);
           resolver.resolver(data);
         })
       })
     }
     // 调用；
     readFile('package.json')
       .map(split('\n'))
     	.map(find(x => x.inclundes('version')))
       .run()
       .listen({
         onRejected: err => {
           console.log(err);
         },
         onResolved: value => {
           console.log(value); // 'version: 1.0.0';
         }
     })
     ```

  6. Pointed 函子：

     - Pointed 函子是实现了 of 静态方法的函子；
     - of 方法是为了避免使用 new 来创建对象，更深层的含义是 of 方法用来把值放到上下文 Context 中（把值放到容器中，使用 map 来处理内部的值）；

     ```javascript
     class Container {
       static of (value){
         return new Container(value);
       }
       // .....
     }
     Container.of(2).map(x => x + 5); // 7
     ```

     

































