### 一、赋值（Copy）：

赋值是将某一个数值或对象赋给某个变量的过程：

- 基本数据类型：**赋值**，赋值之后两个变量互不影响；

  ```javascript
  let strings = 'zhangshan';
  let copyString = strings;
  console.log(copyString); // zhangshan
  strings = 'lishi';
  console.log(strings); // lishi
  console.log(copyString); // zhangshan
  ```

- 引用数据类型：**赋址**，两个变量具有相同的引用，指向同一个对象，互相之间有影响；

  ```javascript
  let obj = {
    name: 'zhangshang',
    age: 19,
    book: {
      title: 'javascript 权威指南',
      price: 108
    }
  }
  let objCopy = obj; // 引用类型赋值
  obj.name = 'lishi';
  obj.age = 20;
  obj.price = 119;
  // obj 的改变，会影响 objCopy 一起改变；
  console.log(obj);
  console.log(objCopy);
  ```

### 二、浅拷贝（Shallow Copy）：

1. 浅拷贝的概念：

   创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

   ![图片](images/%E6%B5%85%E6%8B%B7%E8%B4%9D.png)

   上图中，`SourceObject` 是原对象，其中包含基本类型属性 `field1` 和引用类型属性 `refObj`。浅拷贝之后基本类型数据 `field2` 和 `filed1` 是不同属性，互不影响。但引用类型 `refObj` 仍然是同一个，改变之后会对另一个对象产生影响。

   简单来说可以理解为浅拷贝只解决了第一层的问题，拷贝第一层的**基本类型值**，以及第一层的**引用类型地址**。

2. 浅拷贝的使用场景：

   - Object.assign():

   `Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

   ***有些文章说`Object.assign()` 是深拷贝，其实这是不正确的***。

   ```javascript
   let a = {
       name: "zhangshan",
       book: {
           title: "You Don't Know JS",
           price: "45"
       }
   }
   let b = Object.assign({}, a);
   console.log(b);
   // {
   //  name: "zhangshan",
   //  book: {title: "You Don't Know JS", price: "45"}
   // } 
   
   a.name = "change";
   a.book.price = "55";
   console.log(a);
   // {
   //  name: "change",
   //  book: {title: "You Don't Know JS", price: "55"}
   // } 
   
   console.log(b);
   // {
   //  name: "zhangshan",
   //  book: {title: "You Don't Know JS", price: "55"}
   // } 
   ```

   上面代码改变对象 a 之后，对象 b 的基本属性保持不变。但是当改变对象 a 中的对象 `book` 时，对象 b 相应的位置也发生了变化。

   - 展开语法 **Spread**：

   ```javascript
   let a = {
       name: "zhangshan",
       book: {
           title: "You Don't Know JS",
           price: "45"
       }
   }
   // ES6 展开语法
   let b = {...a};
   console.log(b);
   // {
   //  name: "zhangshan",
   //  book: {title: "You Don't Know JS", price: "45"}
   // } 
   
   a.name = "change";
   a.book.price = "55";
   console.log(a);
   // {
   //  name: "change",
   //  book: {title: "You Don't Know JS", price: "55"}
   // } 
   
   console.log(b);
   // {
   //  name: "zhangshan",
   //  book: {title: "You Don't Know JS", price: "55"}
   // } 
   ```

   ES6 展开语法，通过代码可以看出实际效果和 `Object.assign()` 是一样的。

   - Array.prototype.silce():

   `slice()` 方法返回一个新的数组对象，这一对象是一个由 `begin`和 `end`（不包括`end`）决定的原数组的**浅拷贝**。原始数组不会被改变。

   ```javascript
   let a = [0, "1", [2, 3]];
   let b = a.slice(1);
   console.log(b);
   // ["1", [2, 3]]
   
   a[1] = "99";
   a[2][0] = 4;
   console.log(a);
   // [0, "99", [4, 3]]
   
   console.log(b);
   //  ["1", [4, 3]]
   ```

   可以看出，改变 `a[1]` 之后 `b[0]` 的值并没有发生变化，但改变 `a[2][0]` 之后，相应的 `b[1][0]` 的值也发生变化。说明 `slice()` 方法是浅拷贝，相应的还有`concat`等，在工作中面对复杂数组结构要额外注意。
   
2. 代码实现：

   ```javascript
   function cloneShallow(source) {
       var target = {};
       for (var key in source) {
           if (Object.prototype.hasOwnProperty.call(source, key)) {
               target[key] = source[key];
           }
       }
       return target;
   }
   ```

### 三、深拷贝（Deep Copy）：

1. 深拷贝的概念：

   深拷贝会拷贝所有的属性，并拷贝属性指向的动态分配的内存。当对象和它所引用的对象一起拷贝时即发生深拷贝。深拷贝相比于浅拷贝速度较慢并且花销较大。拷贝前后两个对象互不影响。

   ![图片](images/%E6%B7%B1%E6%8B%B7%E8%B4%9D.png)

2. 深拷贝的应用场景：

   - JSON.parse(JSON.stringify(object)):

   ```javascript
   let a = {
       name: "zhangsan",
       book: {
           title: "You Don't Know JS",
           price: "45"
       }
   }
   let b = JSON.parse(JSON.stringify(a));
   console.log(b);
   // {
   //  name: "zhangsan",
   //  book: {title: "You Don't Know JS", price: "45"}
   // } 
   
   a.name = "change";
   a.book.price = "55";
   console.log(a);
   // {
   //  name: "change",
   //  book: {title: "You Don't Know JS", price: "55"}
   // } 
   
   console.log(b);
   // {
   //  name: "zhangsan",
   //  book: {title: "You Don't Know JS", price: "45"}
   // } 
   ```

   对数组深拷贝,改变原数组不会影响到拷贝之后的数组。

   ```javascript
   let a = [0, "1", [2, 3]];
   let b = JSON.parse(JSON.stringify( a.slice(1) ));
   console.log(b);
   // ["1", [2, 3]]
   
   a[1] = "99";
   a[2][0] = 4;
   console.log(a);
   // [0, "99", [4, 3]]
   
   console.log(b);
   //  ["1", [2, 3]]
   ```

   JSON.parse(JSON.stringify(object)) 的缺陷问题：

   - 会忽略 undefined；
   - 会忽略 symbol；
   - 不能序列化函数（function）；

   ```javascript
   let obj = {
       name: 'muyiy',
       a: undefined,
       b: Symbol('muyiy'),
       c: function() {}
   }
   let b = JSON.parse(JSON.stringify(obj));
   console.log(b);
   // {name: "muyiy"}
   ```

   - 不能解决循环引用的对象；

   ```javascript
   // 循环引用情况下，会报错。
   let obj = {
       a: 1,
       b: {
           c: 2,
        d: 3
       }
   }
   obj.a = obj.b;
   obj.b.c = obj.a;
   let b = JSON.parse(JSON.stringify(obj));
   // Uncaught TypeError: Converting circular structure to JSON
   ```

   - 不能正确处理 new Date();

   ```javascript
   new Date();
   // Mon Dec 24 2018 10:59:14 GMT+0800 (China Standard Time)
   
   // new Date 情况下，转换结果不正确。
   JSON.stringify(new Date());
   // ""2018-12-24T02:59:25.776Z""
   JSON.parse(JSON.stringify(new Date()));
   // "2018-12-24T02:59:41.523Z"
   
   // 解决方法转成字符串或者时间戳就好了。
   let date = (new Date()).valueOf();
   // 1545620645915
   JSON.stringify(date);
   // "1545620673267"
   JSON.parse(JSON.stringify(date));
   // 1545620658688
   ```

   - 不能处理正则；

   ```javascript
   let obj = {
       name: "muyiy",
       a: /'123'/
   }
   console.log(obj);
   // {name: "muyiy", a: /'123'/}
   let b = JSON.parse(JSON.stringify(obj));
   console.log(b);
   // {name: "muyiy", a: {}}
   ```

   除了上面介绍的深拷贝方法，常用的还有`jQuery.extend()` 和 `lodash.cloneDeep()`
   
2. 代码实现：

   ```javascript
   // 破解递归爆栈
   function cloneDeep(x) {
       const root = {};
       // 栈
       const loopList = [
           {
               parent: root,
               key: undefined,
               data: x,
           }
       ];
   
       while(loopList.length) {
           // 深度优先
           const node = loopList.pop();
           const parent = node.parent;
           const key = node.key;
           const data = node.data;
   
           // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
           let res = parent;
           if (typeof key !== 'undefined') {
               res = parent[key] = {};
           }
   
           for(let k in data) {
               if (data.hasOwnProperty(k)) {
                   if (typeof data[k] === 'object') {
                       // 下一次循环
                       loopList.push({
                           parent: res,
                           key: k,
                           data: data[k],
                       });
                   } else {
                       res[k] = data[k];
                   }
               }
           }
       }
       return root;
   }
   ```

### 四、总结：

|        | 和原数据是否指向同一对象 | 第一层数据为基本数据类型 |    原数据中包含子对象    |
| :----: | :----------------------: | :----------------------: | :----------------------: |
|  赋值  |            是            |  改变会使原数据一同改变  |  改变会使原数据一同改变  |
| 浅拷贝 |            否            | 改变不会使原数据一同改变 |  改变会使原数据一同改变  |
| 深拷贝 |            否            | 改变不会使原数据一同改变 | 改变不会使原数据一同改变 |

