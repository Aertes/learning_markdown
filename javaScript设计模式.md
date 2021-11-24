## JavaScript 设计模式

### 第一章：什么是设计模式

- 一个模式就是一个可重复的方案，可应用于在软件设计中的常见问题；

- 模式的另一种解释就是一个我们如何解决问题的模版，那些可以在许多不同的情况里使用的模版；

设计模式有一下三点好处：

1. **模式是行之有效的解决方法**：他们提供固定的解决方法来解决在软件开发中出现的问题，这些都是久经考验的反应了开发者的经验和见解的使用模式来定义的技术；
2. **模式可以很容易重用**：一个模式通常反映了一个可以适应自己需要的开箱即用的解决方案。这个特性让它们很健壮；
3. **模式善于表达**：当我们看到一个提供某种解决方案的模式时，一般有一组结构和词汇可以非常优雅地帮助表达相当大的解决方案；

设计模式必须提供的其他的一些优势：

1. 模式的重用可以帮助防止在应用程序开发过程中出现的一些可能导致重大问题的小问题。这意味着当代码是建立在行之有效的模式上时，我们可以花更少的时间去关心我们的代码结构，从而能花更多的时间关注我们的解决方案的整体质量。这是因为模式可以鼓励我们在更好的结构化和有组织的方式下编码，这将避免在未来由于清洁的目的而去重构它。
2. 模式可以提供一个不需要绑定到一个特定问题的书面的概括性的解决方案。这个广义的方法意味着不用管我们正在处理的应用程序 (许多情况下的编程语言) 设计模式的应用可以提高我们的代码的结构。
3. 某些模式可以通过避免重复来减小我们代码的文件大小。通过鼓励开发者更仔细地看待他们的解决方案来减少重复的地方，如通过将类似的执行流程作为一个一般性的函数来减少函数的数量，这样我们就可以减小代码库的总体大小，这也成为使代码更DRY。
4. 模式增加了开发者的词汇（提供的API），这使得交流更快速。
5. 经常使用的模式可通过收集其他使用这些模式的开发人员贡献给设计模式社区的经验来改进。在某些情况下，这将导致全新模式的创建，同时也可以提供改进的指导大家如何使用特定的模式才是最好的。这可以确保基于模式的解决方案继续变得比特别的解决方案更健壮。 

### 第二章：JavaScript 设计模式的结构

你可能会对设计模式的作者如何接近勾勒出概念轮廓，实施和新模式的目的。模式是最出提出的一种在两者之间建立关系的**规则**：

- 上下文环境；
- 在这种环境下产生的系统力量；
- 一类配置，考虑到允许这种力量在自己的上下文环境中解决这一点，现在让我们对一种设计模式的组件元素，一探究竟。
- 一种设计模式应该具有：
  1. 上下文概述：在设计模式中的上下文对响应用户需求是很有效的；
  2. 问题声明：一类问题的声明，能让我们理解模式的意图；
  3. 解决方案：在可理解的列表和看法上，对用户的问题如何解决的一种描述；
  4. 设计：模式设计，特别是与之交互的用户行为的描述；
  5. 实现：对模式如何被实现的一种指引；
  6. 例证：在模式中的一种类的虚拟化表示；
  7. 例子：模式实现的一种最下的形式；
  8. 共同条件：可能会有其他的什么模式会被用到，以对被描述的模式进行支持；
  9. 关系：与该模式相似的模式；
  10. 已知的使用：模式有没有被正常使用；
  11. 讨论：获利的模式的想法团队或者作者的沟通讨论；

### 第三章：JavaScript 编写设计模式

创建新设计模式的建议：

- **模式是否实用**：确保这个模式能够对一些常见的问题有明确的解决方案，而不是临时的解决方案。
- **保持最佳实践**：我们的设计需要以最佳实践中所获得的理解作为基础；
- **设计模式对用户来说应该是清晰的**：设计模式必须对任何形式的用户体验都是清晰的。因为设计模式主要服务于开发者们，所以不能强迫他们去改变原来的行为，那样的开发者们才会去使用这个模式；
- **独创力不是设计模式的关键**：当我们在设计一个模式的时候，我们既不需要是发明者，也不需要去担心是否是其他模式的子集。如果某个想法有很强的实用性，那么这就是一个创造新模式的机会。
- **需要有几个有说服力的例子**：一个好的设计模式需要有一个有说服力的例子来展示这个模式是成功的。为了广泛使用这个设计模式，这些例子需要展示良好的设计原则。

### 第四章：JavaScript 反模式

反模式的两种观念：

- 描述对于一个特殊的问题，提出了一个*糟糕的*解决方案，最终导致一个坏结果发生；
- 描述如何摆脱上述解决方案并能提出一个好的解决方案；

javascript 的反模式例子如下：

- 在全局上面文中定义大量污染全局命名空间的变量；
- 在调用 **setTimeout** 和 **setInterval** 时传递字符串（会用 eval 来执行）而不是函数；
- 修改 **Object** 的原型（这是最糟糕的反模式）；
- 使用內联 javascript ；
- 在本应使用 document.createElement 的地方使用 document.write ；document.write 被错误的用了相当多的年头，它有相当多的缺点，包括如果在页面加载后执行它可能会覆盖我们的页面。再有它不能工作在XHTML下，这也是另外一个我们使用像 document.createElement 这种对DOM友好方法的原因。

### 第五章：JavaScript 设计模式的分类

#### 1.创建型设计模式：

创建型设计模式关注于对象创建的机制方法；通过该方法，对象以适应工作环境的方式被创建。基本的对象创建方法可能会给项目增加额外的复杂性，而这些模式的目的就是为了通过控制创建过程解决这个问题；

- **构造器模式**（Constructor）
- **工厂模式**（Factory）
- **抽象工厂模式**（Abstract）
- **原型模式**（Prototype）
- **单例模式**（Singleton）
- **建造者模式**（Builder）

#### 2.结构型设计模式：

结构模式关注于对象组成和通常识别的方式实现不同对象之间的关系。该模式有助于在系统的某一部分发生改变的时候，整个系统结构不需要改变。该模式同样有助于系统中某个部分没有达到某一目的的部分进行重组；

- **装饰器模式**（Decorator）
- **外观模式**（Facada）
- **享元模式**（Flyweight）
- **适配器模式**（Adapter）
- **代理模式**（Proxy）
- **桥接模式**（Bridge）
- **组合模式**（Composite）

#### 3.行为型设计模式：

行为模式关注改善或精简在系统中不同对象间通信；

- **迭代模式**（Iterator）
- **中介者模式**（Mediator）
- **观察者模式**（Observer）
- **访问者模式**（Visitor）
- **解释器模式**（Interpreter）
- **模版方法**（Template Method）
- **响应链**（Chain of Responsibility）
- **命令**（Command）
- **状态**（State）
- **策略**（Strategy）

### 第六章：JavaScript 设计模式分类概览表

| SN（设计模式）                    | 描述                                                         |
| :-------------------------------- | :----------------------------------------------------------- |
| Creational                        | 根据创建对象的概念分成下面几类：                             |
| Calss                             |                                                              |
| Factory Method（工厂方法）        | 通过将数据和事件接口化来构建若干个子类。                     |
| Object                            |                                                              |
| Abstract Factory（抽象工厂）      | 建立若干族类的一个实例，这个实例不需要具体类的细节信息。（抽象类） |
| Builder（建造者）                 | 将对象的构建方法和其表现形式分离开来，总是构建相同类型的对象。 |
| Prototype（原型）                 | 一个完全初始化的实例，用于拷贝或者克隆。                     |
| Singleton（单例）                 | 一个类只有唯一的一个实例，这个实例在整个程序中有一个全局的访问点。 |
|                                   |                                                              |
| Structural                        | 根据构建对象块的方法分成下面几类：                           |
| Class                             |                                                              |
| Adapter（适配器）                 | 将不同类的接口进行匹配，调整，这样尽管内部接口不兼容但是不同的类还是可以协同工作的。 |
| Bridge（桥接模式）                | 将对象的接口从其实现中分离出来，这样对象的实现和接口可以独立的变化。 |
| Composite（组合模式）             | 通过将简单可组合的对象组合起来，构成一个完整的对象，这个对象的能力将会超过这些组成部分的能力的总和，即会有新的能力产生。 |
| Decorator（装饰器）               | 动态给对象增加一些可替换的处理流程。                         |
| Facada（外观模式）                | 一个类隐藏了内部子系统的复杂度，只暴露出一些简单的接口。     |
| Flyweight（享元模式）             | 一个细粒度对象，用于将包含在其它地方的信息在不同对象之间高效的共享。 |
| Proxy（代理模式）                 | 一个充当占位符的对象用来代表一个真实的对象。                 |
|                                   |                                                              |
| Behavioral                        | 基于对象间作用方式来分类：                                   |
| Class                             |                                                              |
| Interpreter（解释器）             | 将语言元素包含在一个应用中的一种方式，用于匹配目标语言的语法。 |
| Template Method（模版方法）       | 在一个方法中为某个建立一层外壳，将算法的具体步骤交付给子类去做。 |
| Object                            |                                                              |
| Chain of Responsibility（响应链） | 一种将请求在一串对象中传递的方式，寻找可以处理这个请求的对象。 |
| Command（命令）                   | 封装命令请求为一个对象，从而使记录日志，队列缓存请求，未处理请求进行错误处理 这些功能称为可能。 |
| Iterator（迭代器）                | 在不需要直到集合内部工作原理的情况下，顺序访问一个集合里面的元素。 |
| Mediator（中介者模式）            | 在类之间定义简化的通信方式，用于避免类之间显式的持有彼此的引用。 |
| Observer（观察者模式）            | 用于将变化通知给多个类的方式，可以保证类之间的一致性。       |
| State（状态）                     | 当对象状态改变时，改变对象的行为。                           |
| Strategy（策略）                  | 将算法封装在类中，将选择和实现分离开来。                     |
| Visitor（访问者）                 | 为类增加新的操作而不改变类本身。                             |

### 第七章：JavaScript 构造器模式

在面向对象编程中，构造器是个当新建对象的内存被分配后，用来初始化该对象的一个特殊函数。

对象构造器是被用来创建特殊类型的对象的，首先它要准备使用对象，其次在对象初次被创建时，通过接受参数，构造器要用来对成员的属性和方法进行赋值。

#### 1.**对象创建**：

创建对象的三种基本方式：

```javascript
// 字面量的创建对象
var newObject = {};

// 通过 Object.create() 方法创建对象
var newObject = Object.create( null );

// 通过关键字 new 构造器，创建对象
// "Object"构造器创建了一个针对特殊值的对象包装，只不过这里没有传值给它，所以它将会返回一个空对象。
var newObject = new Object();
```

四种方式可以将一个键值对赋给一个对象：

```javascript
// ECMAScript 3 兼容形式
// 1\. “.点号”法
// 设置属性
newObject.someKey = "Hello World";
// 获取属性
var key = newObject.someKey;

// 2\. “[]方括号”法
// 设置属性
newObject["someKey"] = "Hello World";
// 获取属性
var key = newObject["someKey"];

// ECMAScript 5 仅兼容性形式
// 3\. Object.defineProperty方式
// 设置属性
Object.defineProperty( newObject, "someKey", {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});
// 如果上面的方式你感到难以阅读，可以简短的写成下面这样：
var defineProp = function ( obj, key, value ){
  config.value = value;
  Object.defineProperty( obj, key, config );
};
// 为了使用它，我们要创建一个“person”对象
var person = Object.create( null );
// 用属性构造对象
defineProp( person, "car",  "Delorean" );
defineProp( person, "dateOfBirth", "1981" );
defineProp( person, "hasBeard", false );

// 4\. Object.defineProperties方式
// 设置属性
Object.defineProperties( newObject, {
  "someKey": { 
    value: "Hello World", 
    writable: true 
  },
  "anotherKey": { 
    value: "Foo bar", 
    writable: false 
  } 
});

// 3和4中的读取属行可用1和2中的任意一种
```

这些方法会被用于继承：

```javascript
// 创建一个继承与Person的赛车司机
var driver = Object.create( person );
// 设置司机的属性
defineProp(driver, "topSpeed", "100mph");
// 获取继承的属性 (1981)
console.log( driver.dateOfBirth );
// 获取我们设置的属性 (100mph)
console.log( driver.topSpeed );
```

#### 2.**基础构造器**：

javascript 不支持类的概念，但它有一种与对象一起工作的构造器函数，使用 new 关键字来调用该函数，我们可以告诉 javascript 把这个函数当做一个构造器来用，它可以用自己所定义的成员来初始化一个对象。

在这个构造器内部，关键字 **this** 引用到刚被创建的对象。

```javascript
function Car (model, year, miles){
  this.model = model;
  this.year = year;
  this.miles = miles;
  this.toString = function () {
    return this.model + "has done" + this.miles + "miles";
  }
}
// 可以实例化一个 Car
var civic = new Car("Honda Civic", 2008, 20000);
var mondeo = new Car("Ford Mondeo", 2020, 50000);
console.log(civic.toString()); // Honda Civichas done20000miles
console.log(mondeo.toString()); // Ford Mondeohas done50000miles
```

#### 3.使用**“原型”**的构造器：

在 javascript 中函数有一个 **prototype** 的属性，当我们调用 javascript 的构造器创建一个对象时，构造器函数 prototype 上的属性对于所创建的对象来说都看见；

```javascript
function Car( model, year, miles ) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

// 注意这里我们使用Note here that we are using Object.prototype.newMethod 而不是
// Object.prototype ，以避免我们重新定义原型对象
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};
// 使用:
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

console.log( civic.toString() );
console.log( mondeo.toString() );
// 通过上面的代码，单个 toString() 实例被所有的 Car 对象所共享来；
```

### 第八章：JavaScript 模块化模式

模块是任何健壮的应用程序体系结构不可或缺的一部分，特点是有助于保持应用项目的代码单元既能清晰地分离又有组织。

**模块化模式最初被定义为一种对传统软件工程中的类提供私有和公有封装的方法。**

在JavaScript中，模块化模式用来进一步模拟类的概念，通过这样一种方式：我们可以在一个单一的对象中包含**公共**/**私有**的方法和变量，从而从全局范围中屏蔽特定的部分。这个结果是可以减少我们的函数名称与在页面中其他脚本区域定义的函数名称冲突的可能性。

javascript 中实现模块的方式：

- 模块化模式；
- 对象表示法；
- AMD 模块；
- CommonJS 模块；
- ECMAScript Harmony 模块；

对象字面量：在对象字面值的标记里，一个对象被描述为一组以逗号分隔的名称/值对括在大括号（{}）的集合。对象内部的名称可以是字符串或是标记符后跟着一个冒号":"。在对象里最后一个名称/值对不应该以","为结束符，因为这样会导致错误。

```javascript
var myObjectLiteral = {
    variableKey: variableValue,
    functionKey: function () {
      // ...
    };
};
var myModule = {
  myProperty: "someValue",
  // 对象字面值包含了属性和方法（properties and methods）.
  // 例如，我们可以定义一个模块配置进对象：
  myConfig: {
    useCaching: true,
    language: "en"
  },
  // 非常基本的方法
  myMethod: function () {
    console.log( "Where in the world is Paul Irish today?" );
  },
  // 输出基于当前配置（<span>configuration</span>）的一个值
  myMethod2: function () {
    console.log( "Caching is:" + ( this.myConfig.useCaching ) ? "enabled" : "disabled" );
  },
  // 重写当前的配置（configuration）
  myMethod3: function( newConfig ) {

    if ( typeof newConfig === "object" ) {
      this.myConfig = newConfig;
      console.log( this.myConfig.language );
    }
  }
};
// 输出: Where in the world is Paul Irish today?
myModule.myMethod();
// 输出: enabled
myModule.myMethod2();
// 输出: fr
myModule.myMethod3({
  language: "fr",
  useCaching: false
});
```

- 优势：

  既然我们已经看到单例模式很有用，为什么还是使用模块模式呢？首先，对于有面向对象背景的开发者来讲，至少从javascript语言上来讲，模块模式相对于真正的封装概念更清晰。

  其次，模块模式支持私有数据-因此，在模块模式中，公共部分代码可以访问私有数据，但是在模块外部，不能访问类的私有部分。

- 缺点：

  模块模式的缺点是因为我们采用不同的方式访问公有和私有成员，因此当我们想要改变这些成员的可见性的时候，我们不得不在所有使用这些成员的地方修改代码。

  我们也不能在对象之后添加的方法里面访问这些私有变量。也就是说，很多情况下，模块模式很有用，并且当使用正确的时候，潜在地可以改善我们代码的结构。

  其它缺点包括不能为私有成员创建自动化的单元测试，以及在紧急修复bug时所带来的额外的复杂性。根本没有可能可以对私有成员打补丁。相反地，我们必须覆盖所有的使用存在bug私有成员的公共方法。开发者不能简单的扩展私有成员，因此我们需要记得，私有成员并非它们表面上看上去那么具有扩展性。

### 第九章：JavaScript 暴露模块模式

既然我们对模块模式已经有一些了解了，让我们看一下改进版本 - Christian Heilmann 的启发式模块模式。 启发式模块模式来自于，当Heilmann对这样一个现状的不满，即当我们想要在一个公有方法中调用另外一个公有方法，或者访问公有变量的时候，我们不得不重复主对象的名称。他也不喜欢模块模式中，当想要将某个成员变成公共成员时，修改文字标记的做法。

因此他工作的结果就是一个更新的模式，在这个模式中，我们可以简单地在私有域中定义我们所有的函数和变量，并且返回一个匿名对象，这个对象包含有一些指针，这些指针指向我们想要暴露出来的私有成员，使这些私有成员公有化。

```javascript
var myRevealingModule = function () {
        var privateVar = "Ben Cherry",
            publicVar  = "Hey there!";
        function privateFunction() {
            console.log( "Name:" + privateVar );
        }
        function publicSetName( strName ) {
            privateVar = strName;
        }
        function publicGetName() {
            privateFunction();
        }
        // Reveal public pointers to 
        // private functions and properties
        return {
            setName: publicSetName,
            greeting: publicVar,
            getName: publicGetName
        };
    }();

myRevealingModule.setName( "Paul Kinlan" );
```

这个模式可以用于将私有函数和属性以更加规范的命名方式展现出来。

```javascript
var myRevealingModule = function () {
        var privateCounter = 0;
        function privateFunction() {
            privateCounter++;
        }
        function publicFunction() {
            publicIncrement();
        }
        function publicIncrement() {
            privateFunction();
        }
        function publicGetCount(){
          return privateCounter;
        }
        // Reveal public pointers to
        // private functions and properties       
       return {
            start: publicFunction,
            increment: publicIncrement,
            count: publicGetCount
        };
    }();
myRevealingModule.start();
```

- 优势：

  这个模式是我们脚本的语法更加一致。同样在模块的最后关于那些函数和变量可以被公共访问也变得更加清晰，增强了可读性。

- 缺点：

  这个模式的一个缺点是如果私有函数需要使用公有函数，那么这个公有函数在需要打补丁的时候就不能被重载。因为私有函数仍然使用的是私有的实现，并且这个模式不能用于公有成员，只用于函数。

  公有成员使用私有成员也遵循上面不能打补丁的规则。

  因为上面的原因，使用暴露式模块模式创建的模块相对于原始的模块模式更容易出问题，因此在使用的时候需要小心。

### 第十章：JavaScript 单例模式：

单例模式也称为单体模式，规定一个类只有一个实例，并且提供可全局访问点；

JavaScript中没有类的定义，单例模式的特点是“**唯一**”和“**全局访问**”，那么我们可以联想到JavaScript中的全局对象，利用 ES6 的 let 不允许重复声明的特性，刚好符合这两个特点；是的，全局对象是最简单的单例模式；

```javascript
let obj = {
    name:"W3Cschool",
    getName:function(){}
}
```

上述代码中可以知道obj就是一个单例，因为obj刚好就符合单例模式的两大特点："唯一"和"可全局访问"；

弊端：

- 污染命名空间（容易变量名冲突）
- 维护时不容易管控（容易就直接被覆盖）

简单版单例模式：

- 分析：只能有一个实例，所以我们需要使用 if 分支来判断，如果已经存在就直接返回，如果不存在就新建一个实例；

```javascript
let Singleton = function(name){
    this.name = name;
    this.instance = null; 
}
Singleton.prototype.getName = function(){
    console.log(this.name);
}
Singleton.getInstance = function(name){
    if(this.instance){
        return this.instance; 
    }
    return this.instance = new Singleton(name);
}
let winner = Singleton.getInstance("winner");   //winner
console.log(winner.getName());
let sunner = Singleton.getInstance("sunner");   //winner
console.log(sunner.getName())
```

上面的代码还是存在问题，因为创建对象的操作和判断实例的操作耦合在一起，并不符合“**单一职责原则**”；

改良版：

- 思路：通过一个 “*闭包*” ，来实现判断实例的操作；

```javascript
let CreateSingleton = (function(){
    let instance = null;
    return function(name){
        this.name = name;
        if(instance){
            return instance
        }
        return instance = this;
    }
})()
CreateSingleton.prototype.getName = function(){
        console.log(this.name);
}
let winner = new CreateSingleton("winner");  //winner
console.log(winner.getName());
let sunner = new CreateSingleton("sunner");  //winner
console.log(sunner.getName())
```

1. 代理版单例模式：

- 通过代理的形式，将创建对象的操作和实例判断的操作进行解耦拆分，实现更小粒度的划分，符合”单一职责原则“；

```javascript
let ProxyCreateSingleton = (function(){
    let instance = null;
    return function(name){
        if(instance){
            return instance
        }
        return instance = new Singlton(name);
    }
})();
let Singlton = function(name){
    this.name = name;
} 
Singlton.prototype.getName = function(){
    console.log(this.name);
}
let winner = new ProxyCreateSingleton("winner");
console.log(winner.getName());
let sunner = new ProxyCreateSingleton("sunner");
console.log(sunner.getName());
```

上面的代码中，ProxyCreateSingleton()只负责判断实例，Singlton只负责创建对象和赋值；

2. 惰性单例模式：

- 我们经常会有这样的场景：页面多次调用都有弹窗提示，只是提示内容不一样；这个时候我们可以立马想到是单例模式，弹窗就是单例实例，提示内容是参数传递；我们可以用惰性单例模式来实现它；

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>W3Cschool</title>
</head>
<body>
  <div id="loginBtn">W3Cschool</div>
</body>
<script>
  let getSingleton = function (fn) {
    var result;
    return function () {
      return result || (result = fn.apply(this, arguments)); // 确定this上下文并传递参数
    }
  }
  let createAlertMessage = function (html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
  }
  let createSingleAlertMessage = getSingleton(createAlertMessage);
  document.getElementById('loginBtn').onclick = function () {
    let alertMessage = createSingleAlertMessage('<a href="https://www.w3cschool.cn/" style="text-decoration:none;" target="_blank">W3Cschool.cn</a>');
    alertMessage.style.display = 'block';
  }
</script>
</html>
```

惰性单例是指的是页面开始加载的时候我们的实例是没有进行创建的，是当我们点击页面的div之后才开始创建实例（按需创建），这可以提高我们的网页性能，加快我们的页面渲染速度；

### 第十一章：JavaScript 观察者模式

观察者模式是这样一种设计模式。一个被称作被观察者的对象，维护一组被称为观察者的对象，这些对象依赖于被观察者，被观察者自动将自身的状态的任何变化通知给它们。

观察者模式实现包含的组件：

- 被观察者：维护一组观察者，提供用于增加移除观察者的方法；
- 观察者：提供一个更新接口，用于当被观察者状态变化时，得到通知；
- 具体的被观察者：状态变化时广播通知给观察者，保持具体的观察者的信息；
- 具体的观察者：保持一个指向具体被观察者的引用，实现一个更新接口，用于观察，以便保证自身状态总是和被观察者状态一致的；

```javascript
// 首先，让我们对被观察者可能有的一组依赖其的观察者进行建模：
function ObserverList(){
  this.observerList = [];
}

ObserverList.prototype.Add = function( obj ){
  return this.observerList.push( obj );
};

ObserverList.prototype.Empty = function(){
  this.observerList = [];
};

ObserverList.prototype.Count = function(){
  return this.observerList.length;
};

ObserverList.prototype.Get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};

ObserverList.prototype.Insert = function( obj, index ){
  var pointer = -1;

  if( index === 0 ){
    this.observerList.unshift( obj );
    pointer = index;
  }else if( index === this.observerList.length ){
    this.observerList.push( obj );
    pointer = index;
  }

  return pointer;
};

ObserverList.prototype.IndexOf = function( obj, startIndex ){
  var i = startIndex, pointer = -1;

  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      pointer = i;
    }
    i++;
  }

  return pointer;
};

ObserverList.prototype.RemoveAt = function( index ){
  if( index === 0 ){
    this.observerList.shift();
  }else if( index === this.observerList.length -1 ){
    this.observerList.pop();
  }
};

// Extend an object with an extension
function extend( extension, obj ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}

// 接着，我们对被观察者以及其增加，删除，通知在观察者列表中的观察者的能力进行建模：
function Subject(){
  this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function( observer ){
  this.observers.Add( observer );
}; 

Subject.prototype.RemoveObserver = function( observer ){
  this.observers.RemoveAt( this.observers.IndexOf( observer, 0 ) );
}; 

Subject.prototype.Notify = function( context ){
  var observerCount = this.observers.Count();
  for(var i=0; i < observerCount; i++){
    this.observers.Get(i).Update( context );
  }
};

// 我们接着定义建立新的观察者的一个框架。这里的update 函数之后会被具体的行为覆盖。
// The Observer
function Observer(){
  this.Update = function(){
    // ...
  };
}
```

观察者模式和 发布/订阅模式的不同：

观察者模式要求想要接受相关通知的观察者必须到发起这个事件的被观察者上注册这个事件；

发布/订阅模式使用一个主题/事件频道，这个频道处于想要获取通知的订阅者和发起事件的发布者之间。这个事件系统允许代码定义应用相关的事件，这个事件可以传递特殊的参数，参数中包含有订阅者所需要的值。这种想法是为了避免订阅者和发布者之间的依赖性。

这种和观察者模式之间的不同，使订阅者可以实现一个合适的事件处理函数，用于注册和接受由发布者广播的相关通知；

这里给出一个关于如何使用发布者/订阅者模式的例子，这个例子中完整地实现了功能强大的publish(), subscribe() 和 unsubscribe()。

```javascript
// 一个非常简单的邮件处理器

// 接受的消息的计数器
var mailCounter = 0;

// 初始化一个订阅者，这个订阅者监听名叫"inbox/newMessage" 的频道

// 渲染新消息的粗略信息
var subscriber1 = subscribe( "inbox/newMessage", function( topic, data ) {

  // 日志记录主题，用于调试
  console.log( "A new message was received: ", topic );

  // 使用来自于被观察者的数据，用于给用户展示一个消息的粗略信息
  $( ".messageSender" ).html( data.sender );
  $( ".messagePreview" ).html( data.body );

});

// 这是另外一个订阅者，使用相同的数据执行不同的任务

// 更细计数器，显示当前来自于发布者的新信息的数量
var subscriber2 = subscribe( "inbox/newMessage", function( topic, data ) {
  $('.newMessageCounter').html( mailCounter++ );
});

publish( "inbox/newMessage", [{
  sender:"hello@google.com",
  body: "Hey there! How are you doing today?"
}]);

// 在之后，我们可以让我们的订阅者通过下面的方式取消订阅来自于新主题的通知
// unsubscribe( subscriber1,  );
// unsubscribe( subscriber2 );
```

这个例子的更广的意义是对松耦合的原则的一种推崇。不是一个对象直接调用另外一个对象的方法，而是通过订阅另外一个对象的一个特定的任务或者活动，从而在这个任务或者活动出现的时候的得到通知。

- 优势：

  观察者和发布/订阅模式鼓励人们认真考虑应用不同部分之间的关系，同时帮助我们找出这样的层，该层中包含有直接的关系，这些关系可以通过一些列的观察者和被观察者来替换掉。这中方式可以有效地将一个应用程序切割成小块，这些小块耦合度低，从而改善代码的管理，以及用于潜在的代码复用。

  使用观察者模式更深层次的动机是，当我们需要维护相关对象的一致性的时候，我们可以避免对象之间的紧密耦合。例如，一个对象可以通知另外一个对象，而不需要知道这个对象的信息。

  两种模式下，观察者和被观察者之间都可以存在动态关系。这提供很好的灵活性，而当我们的应用中不同的部分之间紧密耦合的时候，是很难实现这种灵活性的。

  尽管这些模式并不是万能的灵丹妙药，这些模式仍然是作为最好的设计松耦合系统的工具之一，因此在任何的JavaScript 开发者的工具箱里面，都应该有这样一个重要的工具。

- 缺点：

  事实上，这些模式的一些问题实际上正是来自于它们所带来的一些好处。在发布/订阅模式中，将发布者共订阅者上解耦，将会在一些情况下，导致很难确保我们应用中的特定部分按照我们预期的那样正常工作。

  例如，发布者可以假设有一个或者多个订阅者正在监听它们。比如我们基于这样的假设，在某些应用处理过程中来记录或者输出错误日志。如果订阅者执行日志功能崩溃了（或者因为某些原因不能正常工作），因为系统本身的解耦本质，发布者没有办法感知到这些事情。

  另外一个这种模式的缺点是，订阅者对彼此之间存在没有感知，对切换发布者的代价无从得知。因为订阅者和发布者之间的动态关系，更新依赖也很能去追踪。

**发布 / 订阅实现**：

发布/订阅在JavaScript的生态系统中非常合适，主要是因为作为核心的ECMAScript 实现是事件驱动的。尤其是在浏览器环境下更是如此，因为DOM使用事件作为其主要的用于脚本的交互API。

也就是说，无论是ECMAScript 还是DOM都没有在实现代码中提供核心对象或者方法用于创建定制的事件系统（DOM3 的CustomEvent是一个例外，这个事件绑定在DOM上，因此通常用处不大）。

幸运的是，流行的JavaScript库例如dojo, jQuery(定制事件)以及YUI已经有相关的工具，可以帮助我们方便的实现一个发布/订阅者系统。

```javascript
// 发布

// jQuery: $(obj).trigger("channel", [arg1, arg2, arg3]);
$( el ).trigger( "/login", [{username:"test", userData:"test"}] );

// Dojo: dojo.publish("channel", [arg1, arg2, arg3] );
dojo.publish( "/login", [{username:"test", userData:"test"}] );

// YUI: el.publish("channel", [arg1, arg2, arg3]);
el.publish( "/login", {username:"test", userData:"test"} );

// 订阅

// jQuery: $(obj).on( "channel", [data], fn );
$( el ).on( "/login", function( event ){...} );

// Dojo: dojo.subscribe( "channel", fn);
var handle = dojo.subscribe( "/login", function(data){..} );

// YUI: el.on("channel", handler);
el.on( "/login", function( data ){...} );

// 取消订阅

// jQuery: $(obj).off( "channel" );
$( el ).off( "/login" );

// Dojo: dojo.unsubscribe( handle );
dojo.unsubscribe( handle );

// YUI: el.detach("channel");
el.detach( "/login" );
```

**发布 / 订阅实例**：

```javascript
var pubsub = {};

(function(q) {
    var topics = {}, subUid = -1;
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    q.publish = function( topic, args ) {
        if ( !topics[topic] ) {
            return false;
        }
        var subscribers = topics[topic], len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].func( topic, args );
        }
        return this;
    };

    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    q.subscribe = function( topic, func ) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    q.unsubscribe = function( token ) {
        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if ( topics[m][i].token === token) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}( pubsub ));
```

观察者模式在应用设计中，解耦一系列不同的场景上非常有用，如果你没有用过它，我推荐你尝试一下今天提到的之前写到的某个实现。这个模式是一个易于学习的模式，同时也是一个威力巨大的模式。

### 第十二章：JavaScript 中介者模式


















