### 第一章：ES2015 概述

- 解决原有语法上的问题或不足；
- 对原语法进行增强；
- 全新的对象、全新的方法、全新的功能；
- 全新的数据类型和数据结构；

### 第二章：let 、 const 和块级作用域





### Porxy

| **handler 方法**         | **触发方式**                                                 |
| ------------------------ | ------------------------------------------------------------ |
| get                      | 读取某个属性                                                 |
| set                      | 写入某个属性                                                 |
| has                      | in 操作符                                                    |
| deleteProperty           | delete 操作符                                                |
| getPrototypeOf           | Object.getPrototypeOf()                                      |
| setPrototypeOf           | Object.setPrototypeOf()                                      |
| isExtensible             | Object.isExtensible()                                        |
| preventExtensions        | Object.preventExtensions()                                   |
| getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor()                            |
| defineProperty           | Object.defineProperty()                                      |
| ownKeys                  | Object.getOwnPropertyNames()<br />Object.getOwnPropertySymbols() |
| apply                    | 调用一个函数                                                 |
| construct                | 用 new 调用一个函数                                          |



### Reflect 的 13种方法

- Reflect.apply()
- Reflect.construct()
- Reflect.defineProperty()
- Reflect.deleteProperty()
- Reflect.get()
- Reflect.getOwnPropertyDescriptor()
- Reflect.getPrototypeOf()
- Reflect.has()
- Reflect.isExtensible()
- Reflect.ownKeys()
- Reflect.preventExtensions()
- Reflect.set()
- Reflect.setPrototypeOf()

### Map 和  Set 数据结构





### Symbol 数据结构



### Generator 生成器



### ECMAScript 2016

- Array.prototype.includes
- 指数运算符 **

```javascript
// Array.prototype.includes
const arr = ['foo', 1, NaN, false];
console.log(arr.indexOf('foo')) // 0
console.log(arr.indexOf('boo')) // -1
console.log(arr.indexOf(NaN)) // -1
console.log(arr.indexOf(false)) // 3

console.log(arr.includes(NaN)) // true
// 指数运算符 **
console.log(Math.pow(2, 10)) // 1024
console.log(2 ** 10) // 1024
```

### ECMAScript 2017

- Object.values
- Object.entries
- Object.getOwnPropertyDescriptors
- String.prototype.padStart
- String.prototype.padEnd

```javascript
const obj = {
  foo: 'val1',
  bar: 'val2'
}
// Object.values
console.log(Object.values(obj)); // ['val1', 'vla2']
// Object.entries
for(const [key, val] of Object.entries(obj)){
  console.log(key, val); 
  // foo val1
  // bar val2
}
console.log(new Map(Object.entries(obj))); // Map(2) {'foo' => 'val1', 'bar' => 'val2'}
// Object.getOwnPropertyDescriptors
console.log(Object.getOwnPropertyDescriptors(obj));
```

