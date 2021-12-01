### Class 的基本语法

#### 简介：

JavaScript 语言中，生成实例对象的传统方法是通过构造函数：

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
var p = new Point(1, 2);
```

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
// constructor()方法，这就是构造方法
// 而this关键字则代表实例对象
```

类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用`new`命令，跟构造函数的用法完全一致。

构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。

```javascript
// prototype对象的constructor()属性，直接指向“类”的本身，这与 ES5 的行为是一致的。
Point.prototype.constructor === Point // true
// 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
class Point {
  constructor(x, y) {
    // ...
  }
  toString() {
    // ...
  }
}
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
// 上面代码中，toString()方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。

var Point = function (x, y) {
  // ...
};
Point.prototype.toString = function () {
  // ...
};
Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
// 上面代码采用 ES5 的写法，toString()方法就是可枚举的。
```

#### constructor 方法：

`constructor()`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor()`方法，如果没有显式定义，一个空的`constructor()`方法会被默认添加。

```javascript
class Point {
  
}

// 等同于
class Point {
  constructor() {}
}
```

`constructor()`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象。

```javascript
// constructor()函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo  // false

// 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

#### 类的实例：

生成类的实例的写法，与 ES5 完全一样，也是使用`new`命令。前面说过，如果忘记加上`new`，像函数那样调用`Class`，将会报错。

```javascript
class Point {
  // ...
}
// 报错 TypeError: Class constructor Foo cannot be invoked without 'new'
var point = Point(2, 3);
// 正确
var point = new Point(2, 3);
```

```ABAP
__proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
```

#### 取值函数（getter）和存值函数（setter）：

与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
```

存值函数和取值函数是设置在属性的 Descriptor 对象上的。

```javascript
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }
  get html() {
    return this.element.innerHTML;
  }
  set html(value) {
    this.element.innerHTML = value;
  }
}
var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);
"get" in descriptor  // true
"set" in descriptor  // true

// 上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。
```

#### 属性表达式：

类的属性名，可以采用表达式。

```javascript
let methodName = 'getArea';
class Square {
  constructor(length) {
    // ...
  }
  [methodName]() {
    // ...
  }
}
```

#### Class 表达式：

与函数一样，类也可以使用表达式的形式定义。

```javascript
// 需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
// Me只在 Class 内部有定义。
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

// 采用 Class 表达式，可以写出立即执行的 Class。
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');
person.sayName(); // "张三"
```

#### 注意点：

1. 严格模式：类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

2. 不存在提升：类不存在变量提升（hoist），这一点与 ES5 完全不同。

   ```javascript
   // Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
   new Foo(); // ReferenceError
   class Foo {}
   
   // 下面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，下面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。
   {
     let Foo = class {};
     class Bar extends Foo {}
   }
   ```

3. name 属性：由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被`Class`继承，包括`name`属性。

   ```javascript
   class Point {}
   Point.name // "Point"
   // name属性总是返回紧跟在class关键字后面的类名。
   ```

4. Generator 方法：如果某个方法之前加上星号（`*`），就表示该方法是一个 Generator 函数。

   ```javascript
   class Foo {
     constructor(...args) {
       this.args = args;
     }
     * [Symbol.iterator]() {
       for (let arg of this.args) {
         yield arg;
       }
     }
   }
   for (let x of new Foo('hello', 'world')) {
     console.log(x);
   }
   // hello
   // world
   
   // 上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
   ```

5. this 的指向：类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

   ```javascript
   class Logger {
     printName(name = 'there') {
       this.print(`Hello ${name}`);
     }
     print(text) {
       console.log(text);
     }
   }
   const logger = new Logger();
   const { printName } = logger;
   printName(); // TypeError: Cannot read property 'print' of undefined
   // 上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。
   
   // 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
   class Logger {
     constructor() {
       this.printName = this.printName.bind(this);
     }
     // ...
   }
   
   // 另一种解决方法是使用箭头函数。
   class Obj {
     constructor() {
       this.getThis = () => this;
     }
   }
   
   const myObj = new Obj();
   myObj.getThis() === myObj // true
   ```

   箭头函数内部的`this`总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以`this`会总是指向实例对象。

   还有一种解决方法是使用`Proxy`，获取方法的时候，自动绑定`this`。

   ```javascript
   function selfish (target) {
     const cache = new WeakMap();
     const handler = {
       get (target, key) {
         const value = Reflect.get(target, key);
         if (typeof value !== 'function') {
           return value;
         }
         if (!cache.has(value)) {
           cache.set(value, value.bind(target));
         }
         return cache.get(value);
       }
     };
     const proxy = new Proxy(target, handler);
     return proxy;
   }
   const logger = selfish(new Logger());
   ```

#### 静态方法：

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 **static** 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()；// TypeError: foo.classMethod is not a function

// 上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。
```

**注意**，如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。

```javascript
// 静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}
Foo.bar() // hello
```

父类的静态方法，可以被子类继承。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
}
Bar.classMethod() // 'hello'

// 静态方法也是可以从super对象上调用的。
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

#### 私有属性和私有方法：

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

- 一种做法是在命名上加以区别：

  ```javascript
  class Widget {
    // 公有方法
    foo (baz) {
      this._bar(baz);
    }
    // 私有方法
    _bar(baz) {
      return this.snaf = baz;
    }
  }
  // 上面代码中，_bar()方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。
  ```

- 另一种方法就是索性将私有方法移出类，因为类内部的所有方法是对外可见的：

  ```javascript
  class Widget {
    foo (baz) {
      bar.call(this, baz);
    }
  }
  function bar(baz) {
    return this.snaf = baz;
  }
  // 上面代码中，foo是公开方法，内部调用了bar.call(this, baz)。这使得bar()实际上成为了当前类的私有方法。
  ```

- 还有一种方法是利用 Symbol 值的唯一性，将私有方法的名字命名为一个 Symbol 值：

  ```javascript
  const bar = Symbol('bar');
  const snaf = Symbol('snaf');
  export default class myClass{
    // 公有方法
    foo(baz) {
      this[bar](baz);
    }
    // 私有方法
    [bar](baz) {
      return this[snaf] = baz;
    }
  };
  
  // 上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。
  
  // Symbol 值的属性名依然可以从类的外部拿到。
  const inst = new myClass();
  Reflect.ownKeys(myClass.prototype)
  // [ 'constructor', 'foo', Symbol(bar) ]
  ```

#### **in** 运算符：

`try...catch`结构可以用来判断是否存在某个私有属性。

```javascript
// 类A并不存在私有属性#foo，所以try...catch报错了。
// 
class A {
  use(obj) {
    try {
      obj.#foo;
    } catch {
      // 私有属性 #foo 不存在
    }
  }
}

const a = new A();
a.use(a); // 报错

// 这样的写法很麻烦，可读性很差，V8 引擎改进了in运算符，使它也可以用来判断私有属性。
class A {
  use(obj) {
    if (#foo in obj) {
      // 私有属性 #foo 存在
    } else {
      // 私有属性 #foo 不存在
    }
  }
}
// 上面示例中，in运算符判断当前类A的实例，是否有私有属性#foo，如果有返回true，否则返回false。
```

`in`也可以跟`this`一起配合使用。

```javascript
class A {
  #foo = 0;
  m() {
    console.log(#foo in this); // true
    console.log(#bar in this); // false
  }
}
// 注意，判断私有属性时，in只能用在定义该私有属性的类的内部。
class A {
  #foo = 0;
  static test(obj) {
    console.log(#foo in obj);
  }
}
A.test(new A()) // true
A.test({}) // false
class B {
  #foo = 0;
}
A.test(new B()) // false
// 上面示例中，类A的私有属性#foo，只能在类A内部使用in运算符判断，而且只对A的实例返回true，对于其他对象都返回false。
```

注意：`in`运算符对于`Object.create()`、`Object.setPrototypeOf`形成的继承，是无效的，因为这种继承不会传递私有属性。

```javascript
class A {
  #foo = 0;
  static test(obj) {
    console.log(#foo in obj);
  }
}
const a = new A();
const o1 = Object.create(a);
A.test(o1) // false
A.test(o1.__proto__) // true
const o2 = {};
Object.setPrototypeOf(o2, A);
A.test(o2) // false
A.test(o2.__proto__) // true

// 上面示例中，对于修改原型链形成的继承，子类都取不到父类的私有属性，所以in运算符无效。
```

#### new.target 属性：

`new`是从构造函数生成实例对象的命令。ES6 为`new`命令引入了一个`new.target`属性，该属性一般用在构造函数之中，返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令或`Reflect.construct()`调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。

```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

Class 内部调用`new.target`，返回当前 Class。

```javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```

需要注意的是，子类继承父类时，`new.target`会返回子类。

```javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length, width) {
    super(length, width);
  }
}

var obj = new Square(3); // 输出 false
// 上面代码中，new.target会返回子类。
```

利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确

// 上面代码中，Shape类不能被实例化，只能用于继承。
```

注意，在函数外部，使用new.target会报错。