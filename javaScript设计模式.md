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

从实现角度来讲，中介者模式是观察者模式中的共享被观察者对象。在这个系统中的对象之间直接的发布/订阅关系被牺牲掉了，取而代之的是维护一个通信的中心节点。

- 基础的实现：

  中介者模式的一种简单的实现可以在下面找到,publish()和subscribe()方法都被暴露出来使用:

```javascript
var mediator = (function(){
    // Storage for topics that can be broadcast or listened to
    var topics = {};
    // Subscribe to a topic, supply a callback to be executed
    // when that topic is broadcast to
    var subscribe = function( topic, fn ){
        if ( !topics[topic] ){
          topics[topic] = [];
        }
        topics[topic].push( { context: this, callback: fn } );
        return this;
    };

    // Publish/broadcast an event to the rest of the application
    var publish = function( topic ){
        var args;
        if ( !topics[topic] ){
          return false;
        }
        args = Array.prototype.slice.call( arguments, 1 );
        for ( var i = 0, l = topics[topic].length; i < l; i++ ) {
            var subscription = topics[topic][i];
            subscription.callback.apply( subscription.context, args );
        }
        return this;
    };
    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function( obj ){
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
}());
```

- 高级的实现：

  通过生成对象实体,我们稍后能够简单的更新认购,而不需要去取消注册然后重新注册它们.认购可以写成一个使用被称作一个选项对象或者一个上下文环境的函数；

```javascript
// Pass in a context to attach our Mediator to.
// By default this will be the window object
(function( root ){
  function guidGenerator() { /*..*/}
  // Our Subscriber constructor
  function Subscriber( fn, options, context ){
    if ( !(this instanceof Subscriber) ) {
      return new Subscriber( fn, context, options );
    }else{

      // guidGenerator() is a function that generates
      // GUIDs for instances of our Mediators Subscribers so
      // we can easily reference them later on. We're going
      // to skip its implementation for brevity

      this.id = guidGenerator();
      this.fn = fn;
      this.options = options;
      this.context = context;
      this.topic = null;
    }
  }
})();
```

- 优点：

  中介者模式最大的好处就是，它节约了对象或者组件之间的通信信道，这些对象或者组件存在于从多对多到多对一的系统之中。由于解耦合水平的因素，添加新的发布或者订阅者是相对容易的。

- 缺点：

  也许使用这个模式最大的缺点是它可以引入一个单点故障。在模块之间放置一个中间人也可能会造成性能损失，因为它们经常是间接地的进行通信的。由于松耦合的特性，仅仅盯着广播很难去确认系统是如何做出反应的。

- 中间人VS观察者：

  “在观察者模式中，没有封装约束的单一对象”。取而代之，观察者和主题必须合作来维护约束。通信的模式决定于观察者和主题相互关联的方式：一个单独的主题经常有许多的观察者，而有时候一个主题的观察者是另外一个观察者的主题。

  中间人和观察者都提倡松耦合，然而，中间人默认使用让对象严格通过中间人进行通信的方式实现松耦合。观察者模式则创建了观察者对象，这些观察者对象会发布触发对象认购的感兴趣的事件。

### 第十三章：JavaScript 原型模式

真正原型的集成,像ECMAScript 5标准中所定义的那样,需要使用 Object.create(如我们在本节的前面部分所见到的).为了提醒我们自己,Object.create创建了一个拥有特定原型的对象,并且也包含选项式的特定属性.(例如,Object.create(prototype,optionalDescriptorObject))。

```javascript
var myCar = {
  name: "Ford Escort",
  drive: function () {
    console.log( "Weeee. I'm driving!" );
  },
  panic: function () {
    console.log( "Wait. How do you stop this thing?" );
  }

};

// Use Object.create to instantiate a new car
var yourCar = Object.create( myCar );

// Now we can see that one is a prototype of the other
console.log( yourCar.name );
```

Object.create也允许我们简单的继承先进的概念,比如对象能够直接继承自其它对象,这种不同的继承.我们早先也看到Object.create允许我们使用 供应的第二个参数来初始化对象属性。

```javascript
var vehicle = {
  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model );
  }
};

var car = Object.create(vehicle, {
  "id": {
    value: MY_GLOBAL.nextId(),
    // writable:false, configurable:false by default
    enumerable: true
  },
  "model": {
    value: "Ford",
    enumerable: true
  }
});
```

这里的属性可以被Object.create的第二个参数来初始化,使用一种类似于我们前面看到的Object.defineProperties和Object.defineProperties方法所使用语法的对象字面值。

在枚举对象的属性,和(如Crockford所提醒的那样)在一个hasOwnProperty()检查中封装循环的内容时,原型关系会造成麻烦,这一事实是值得我们关注的。

如果我们希望在不直接使用Object.create的前提下实现原型模式,我们可以像下面这样,按照上面的示例,模拟这一模式:

```javascript
var vehiclePrototype = {
  init: function ( carModel ) {
    this.model = carModel;
  },
  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model);
  }
};

function vehicle( model ) {
  function F() {};
  F.prototype = vehiclePrototype;
  var f = new F();
  f.init( model );
  return f;
}

var car = vehicle( "Ford Escort" );
car.getModel();

// 注意:这种可选的方式不允许用户使用相同的方式定义只读的属性(因为如果不小心的话vehicle原型可能会被改变)。
```

原型模式的最后一种可选实现可以像下面这样:

```javascript
var beget = (function () {
    function F() {}
    return function ( proto ) {
        F.prototype = proto;
        return new F();
    };
})();
```

### 第十四章：JavaScript 命令模式

命名模式的目标是将方法的调用,请求或者操作封装到一个单独的对象中,给我们酌情执行同时参数化和传递方法调用的能力.另外,它使得我们能将对象从实现了行为的对象对这些行为的调用进行解耦,为我们带来了换出具体的对象这一更深程度的整体灵活性。

具体类是对基于类的编程语言的最好解释,并且同抽象类的理念联系紧密.抽象类定义了一个接口,但并不需要提供对它的所有成员函数的实现.它扮演着驱动其它类的基类角色.被驱动类实现了缺失的函数而被称为具体类. 命令模式背后的一般理念是为我们提供了从任何执行中的命令中分离出发出命令的责任,取而代之将这一责任委托给其它的对象。

```javascript
(function(){
  var CarManager = {
      // request information
      requestInfo: function( model, id ){
        return "The information for " + model + " with ID " + id + " is foobar";
      },
      // purchase the car
      buyVehicle: function( model, id ){
        return "You have successfully purchased Item " + id + ", a " + model;
      },
      // arrange a viewing
      arrangeViewing: function( model, id ){
        return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
      }
    };
})();

// 看一看上面的这段代码,它也许是通过直接访问对象来琐碎的调用我们CarManager的方法。在技术上我们也许都会都会对这个没有任何失误达成谅解.它是完全有效的Javascript然而也会有情况不利的情况。
// 现在让我们来扩展我们的CarManager,以便我们这个命令模式的应用程序得到接下来的这种效果:接受任何可以在CarManager对象上面执行的方法,传送任何可以被使用到的数据,如Car模型和ID。
CarManager.execute( "buyVehicle", "Ford Escort", "453543" );

// 按照这种结构,我们现在应该像下面这样,添加一个对于"CarManager.execute()"方法的定义：
CarManager.execute = function ( name ) {
    return CarManager[name] && CarManager[name].apply( CarManager, [].slice.call(arguments, 1) );
};

// 最终我们的调用如下所示:
CarManager.execute( "arrangeViewing", "Ferrari", "14523" );
CarManager.execute( "requestInfo", "Ford Mondeo", "54323" );
CarManager.execute( "requestInfo", "Ford Escort", "34232" );
CarManager.execute( "buyVehicle", "Ford Escort", "34232" );
```

### 第十五章：JavaScript 外观模式

这一模式提供了面向一种更大型的代码体提供了一个的更高级别的舒适的接口，隐藏了其真正的潜在复杂性。把这一模式想象成要是呈现给开发者简化的API，一些总是会提升使用性能的东西。

```javascript
var addMyEvent = function( el,ev,fn ){
   if( el.addEventListener ){
            el.addEventListener( ev,fn, false );
      }else if(el.attachEvent){
            el.attachEvent( "on" + ev, fn );
      } else{
           el["on" + ev] = fn;
    }
};
```

外观模式不仅仅只被用在它们自己身上，它们也能够被用来同其它的模式诸如模块模式进行集成。如我们在下面所看到的，我们模块模式的实体包含许多被定义为私有的方法。外观模式则被用来提供访问这些方法的更加简单的API：

```javascript
var module = (function() {
    var _private = {
        i:5,
        get : function() {
            console.log( "current value:" + this.i);
        },
        set : function( val ) {
            this.i = val;
        },
        run : function() {
            console.log( "running" );
        },
        jump: function(){
            console.log( "jumping" );
        }
    };

    return {

        facade : function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    };
}());

// Outputs: "current value: 10" and "running"
module.facade( {run: true, val:10} );
```

当使用这个模式的时候，尝试了解任何有关性能上面的消耗，要知道它们是否值得以抽象的级别被提供出来调用。

### 第十六章：JavaScript 工厂模式

工厂模式是另外一种关注对象创建概念的创建模式。它的领域中同其它模式的不同之处在于它并没有明确要求我们使用一个构造器。取而代之，一个工厂能提供一个创建对象的公共接口，我们可以在其中指定我们希望被创建的工厂对象的类型。

- 何时使用工厂模式：
  1. 当我们的对象或者组件设置涉及到高程度级别的复杂度时。
  2. 当我们需要根据我们所在的环境方便的生成不同对象的实体时。
  3. 当我们在许多共享同一个属性的许多小型对象或组件上工作时。
  4. 当带有其它仅仅需要满足一种API约定(又名鸭式类型)的对象的组合对象工作时.这对于解耦来说是有用的。
- 何时不要去使用工厂模式：
  1. 当被应用到错误的问题类型上时,这一模式会给应用程序引入大量不必要的复杂性.除非为创建对象提供一个接口是我们编写的库或者框架的一个设计上目标,否则我会建议使用明确的构造器,以避免不必要的开销。
  2. 由于对象的创建过程被高效的抽象在一个接口后面的事实,这也会给依赖于这个过程可能会有多复杂的单元测试带来问题。

抽象工厂：

了解抽象工厂模式也是非常实用的,它的目标是以一个通用的目标将一组独立的工厂进行封装.它将一堆对象的实现细节从它们的一般用例中分离。

抽象工厂应该被用在一种必须从其创建或生成对象的方式处独立,或者需要同多种类型的对象一起工作,这样的系统中。

简单且容易理解的例子就是一个发动机工厂,它定义了获取或者注册发动机类型的方式.抽象工厂会被命名为AbstractVehicleFactory.抽象工厂将允许像"car"或者"truck"的发动机类型的定义,并且构造工厂将仅实现满足发动机合同的类.(例如:Vehicle.prototype.driven和Vehicle.prototype.breakDown)。

```javascript
var AbstractVehicleFactory = (function () {
    // Storage for our vehicle types
    var types = {};
    return {
        getVehicle: function ( type, customizations ) {
            var Vehicle = types[type];
            return (Vehicle ? new Vehicle(customizations) : null);
        },
        registerVehicle: function ( type, Vehicle ) {
            var proto = Vehicle.prototype;
            // only register classes that fulfill the vehicle contract
            if ( proto.drive && proto.breakDown ) {
                types[type] = Vehicle;
            }
            return AbstractVehicleFactory;
        }
    };
})();

// Usage:
AbstractVehicleFactory.registerVehicle( "car", Car );
AbstractVehicleFactory.registerVehicle( "truck", Truck );

// Instantiate a new car based on the abstract vehicle type
var car = AbstractVehicleFactory.getVehicle( "car" , { color: "lime green", state: "like new" } );

// Instantiate a new truck in a similar manner
var truck = AbstractVehicleFactory.getVehicle( "truck" , { wheelSize: "medium", color: "neon yellow" } );
```

### 第十七章：JavaScript Mixin模式：

在诸如C++或者List着这样的传统语言中,织入模式就是一些提供能够被一个或者一组子类简单继承功能的类,意在重用其功能。

- 子类划分：

  子类划分是一个参考了为一个新对象继承来自一个基类或者超类对象的属性的术语，在传统的面向对象编程中,类B能够从另外一个类A处扩展，这里我们将A看做是超类，而将B看做是A的子类，如此，所有B的实体都从A处继承了其A的方法，然而B仍然能够定义它自己的方法，包括那些重载的原本在A中的定义的方法。

  B是否应该调用已经被重载的A中的方法，我们将这个引述为方法链，B是否应该调用A(超类)的构造器，我们将这称为构造器链。

  为了演示子类划分，首先我们需要一个能够创建自身新实体的基对象。

```javascript
// 基础实例对象
var Person =  function( firstName , lastName ){
  this.firstName = firstName;
  this.lastName =  lastName;
  this.gender = "male";
};
var Superhero = function( firstName, lastName , powers ){
   // 继承 Person 类
    Person.call( this, firstName, lastName );
    this.powers = powers;
};
// 继承原型链
SuperHero.prototype = Object.create( Person.prototype );
var superman = new Superhero( "Clark" ,"Kent" , ["flight","heat-vision"] );
console.log( superman );
```

- Mixin(织入目标类)

  在Javascript中,我们会将从Mixin继承看作是通过扩展收集功能的一种途径.我们定义的每一个新的对象都有一个原型,从其中它可以继承更多的属性.原型可以从其他对象继承而来,但是更重要的是,能够为任意数量的对象定义属性.我们可以利用这一事实来促进功能重用。

```javascript
var myMixins = {
  moveUp: function(){
    console.log( "move up" );
  },
  moveDown: function(){
    console.log( "move down" );
  },
  stop: function(){
    console.log( "stop! in the name of love!" );
  }
};
function carAnimator(){
  this.moveLeft = function(){
    console.log( "move left" );
  };
}
function personAnimator(){
  this.moveRandomly = function(){ /*..*/ };
}
// 扩展现有构造器功能的原型
_.extend( carAnimator.prototype, myMixins );
_.extend( personAnimator.prototype, myMixins );
var myAnimator = new carAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();

// Outputs:
// move left
// move down
// stop! in the name of love!
```

这允许我们将通用的行为轻易的"混"入相当普通对象构造器中。

- 优点：

  Mixin支持在一个系统中降解功能的重复性,增加功能的重用性.在一些应用程序也许需要在所有的对象实体共享行为的地方,我们能够通过在一个Mixin中维护这个共享的功能,来很容易的避免任何重复,而因此专注于只实现我们系统中真正彼此不同的功能。

- 缺点：

  对Mixin的副作用是值得商榷的.一些开发者感觉将功能注入到对象的原型中是一个坏点子,因为它会同时导致原型污染和一定程度上的对我们原有功能的不确定性.在大型的系统中,很可能是有这种情况的。

### 第十八章：JavaScript 装饰器模式

装饰器是旨在提升重用性能的一种结构性设计模式。同Mixin类似，它可以被看作是应用子类划分的另外一种有价值的可选方案。

典型的装饰器提供了向一个系统中现有的类动态添加行为的能力。其创意是装饰本身并不关心类的基础功能，而只是将它自身拷贝到超类之中。

#### 示例1：带有新功能的装饰构造器

```javascript
// 一个 vehicle 构造器
function vehicle( vehicleType ){
    // 默认参数
    this.vehicleType = vehicleType || "car";
    this.model = "default";
    this.license = "00000-000";
}

// Test instance for a basic vehicle
var testInstance = new vehicle( "car" );
console.log( testInstance );

// Outputs:
// vehicle: car, model:default, license: 00000-000

// Lets create a new instance of vehicle, to be decorated
var truck = new vehicle( "truck" );

// New functionality we're decorating vehicle with
truck.setModel = function( modelName ){
    this.model = modelName;
};

truck.setColor = function( color ){
    this.color = color;
};

// Test the value setters and value assignment works correctly
truck.setModel( "CAT" );
truck.setColor( "blue" );

console.log( truck );

// Outputs:
// vehicle:truck, model:CAT, color: blue

// Demonstrate "vehicle" is still unaltered
var secondInstance = new vehicle( "car" );
console.log( secondInstance );

// Outputs:
// vehicle: car, model:default, license: 00000-000
```

上面示例，这种类型的简单实现是实用的，但它没有真正展示出装饰能够贡献出来的全部潜能。

#### 示例2：带有多个装饰器的装饰对象

```javascript
// The constructor to decorate
function MacBook() {
  this.cost = function () { return 997; };
  this.screenSize = function () { return 11.6; };
}

// Decorator 1
function Memory( macbook ) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };
}

// Decorator 2
function Engraving( macbook ){
  var v = macbook.cost();
  macbook.cost = function(){
    return  v + 200;
  };
}

// Decorator 3
function Insurance( macbook ){
  var v = macbook.cost();
  macbook.cost = function(){
     return  v + 250;
  };
}

var mb = new MacBook();
Memory( mb );
Engraving( mb );
Insurance( mb );

// Outputs: 1522
console.log( mb.cost() );

// Outputs: 11.6
console.log( mb.screenSize() );
```

在上面的示例中，我们的装饰器重载了超类对象MacBook()的 object.cost()函数，使其返回的Macbook的当前价格加上了被定制后升级的价格。

这被看做是对原来的Macbook对象构造器方法的装饰，它并没有将其重写（例如，screenSize())，我们所定义的Macbook的其它属性也保持不变，完好无缺。

上面的示例并没有真正定义什么接口，而且我们也转移了从创造者到接受者移动时确保一个对象对应一个接口的责任。

- **注意**：装饰模式的这一特殊变体是提供出来做参考用的。如果发现它过于复杂，建议你选择前面更加简单的实现。

- 优点：

  因为它可以被透明的使用，并且也相当的灵活，因此开发者都挺乐意去使用这个模式——如我们所见，对象可以用新的行为封装或者“装饰”起来，而后继续使用，并不用去担心基础的对象被改变。在一个更加广泛的范围内，这一模式也避免了我们去依赖大量子类来实现同样的效果。

- 缺点：

  然而在实现这个模式时，也存在我们应该意识到的缺点。如果穷于管理，它也会由于引入了许多微小但是相似的对象到我们的命名空间中，从而显著的使得我们的应用程序架构变得复杂起来。这里所担忧的是，除了渐渐变得难于管理，其他不能熟练使用这个模式的开发者也可能会有一段要掌握它被使用的理由的艰难时期。

### 第十九章：JavaScript 享元模式

享元模式是一个优化重复、缓慢和低效数据共享代码的经典结构化解决方案。它的目标是以相关对象尽可能多的共享数据，来减少应用程序中内存的使用(例如：应用程序的配置、状态等)。

- 使用享元：
  1. 数据层：基于存储在内存中的大量相同对象的数据共享的概念；
  2. DOM 层：享元模式被作为事件管理中心，以避免将事件处理程序关联到我们需要相同行为父容器的所有子节点上；

- 享元和数据共享（两种状态的概念，内在和外在）：
  1. 内在信息可能会被我们的对象中的内部方法所需要，它们绝对不可以作为功能被带出。
  2. 外在信息则可以被移除或者放在外部存储。

金典的享元模式实现：

- 享元对应的是一个接口，通过此接口能够接受和控制外在状态。
- 构造享元来实际的实际的实现接口，并存储内在状态。构造享元须是能够被共享的，并且具有操作外在状态的能力。
- 享元工厂负责管理享元对象，并且也创建它们。它确保了我们的享元对象是共享的，并且可以对其作为一组对象进行管理，这一组对象可以在我们需要的时候查询其中的单个实体。如果一个对象已经在一个组里面创建好了，那它就会返回该对象，否则它会在对象池中新创建一个，并且返回之。

```javascript
jQuery.single = (function( o ){
   var collection = jQuery([1]);
   return function( element ) {
       // Give collection the element:
       collection[0] = element;
        // Return the collection:
       return collection;
   };
});
```

## JavaScript MV* 模式

三个非常重要的架构模式：

1. MVC (Model(模型)-View(视图)-Controller(控制器))；
2. MVP (Model(模型)-View(视图)-Presenter(中介者)) ；
3. MVVM (Model(模型)-View(视图)-ViewModel(视图模型))；

### 第一章：JavaScript MVC模式

MVC是一个架构设计模式，它通过分离关注点的方式来支持改进应用组织方式。它促成了业务数据(Models)从用户界面(Views)中分离出来，还有第三个组成部分(Controllers)负责管理传统意义上的业务逻辑和用户输入。

当时它起初被称作Model-View-Controller-Editor。

MVC 由三个核心部分组成：

- Models：

  管理一个业务应用的数据，它们既与用户界面无关也与表现层无关，相反的它们代表了一个业务应用所需要的形式唯一的数据。当一个model改变时(比如当它被更新时)，它通常会通知它的观察者(比如我们很快会介绍的views)一个改变已经发生了，以便观察者采取相应的反应。

- 视图：

  视图是模型的可视化表示，提供了一个当前状态的经过过滤的视图。Smaltalk的视图是关于绘制和操作位图的，而JavaScript的视图是关于构建和操作DOM元素的。

- 模版：

  JavaScript 模板解决方案（例如Handlebars.js 和Mustache）通常用于为视图定义模板作为标记（要么存储在外部，要么存储在脚本标签里面，使用自定义的类型例如text/template），标记中包含有模板变量。变量可以使用变化的语法来分割（例如{{name}}），框架通常也足够只能接受JSON格式的数据（模型可以转化成JSOn格式），这样我们只需要关心如何维护干净的模型和干净的模板。人们遭遇的绝大多数的苦差事都被框架本身所处理了。这样做有大量的好处，尤其选择是将模板存储在外部的时候，这样在构建大型引应用的时候可以是模板按照需要动态加载。

  视图是一个观察着模型的对象，并且让可视的展现保持最新。模板也许是用一种声明的方式指定部分甚至所有的视图对象，因此它可能是从模板定制文档生成的。

- 控制器：

  控制器是模型和视图之间的中介，典型的职责是当用户操作视图的时候同步更新模型。

MVC 中关注分离的思想有利于对应用程序中功能进行更加简单的模块化：

- 整体的维护更加便利.当需要对应用程序进行更新时,到底这些改变是否是以数据为中心的,意味着对模型的修改还-有可能是控制器,或者仅仅是视觉的,意味着对视图的修改,这一区分是非常清楚的。
- 对模型和视图的解耦意味着为业务逻辑编写单元测试将会是更加直截了当的。
- 对底层模型和控制器的代码解耦(即我们可能会取代使用的)在整个应用程序中被淘汰了。
- 依赖于应用程序的体积和角色的分离,这种模块化允许负责核心逻辑的开发者和工作于用户界面的开发者同时进行工作。

### 第二章：JavaScript MVP 模式

模型-视图-展示器(MVP)是MVC设计模式的一个衍生模式，它专注于提升展现逻辑。而MVC和MVP的目标都直指对整个多组件关注点的分离，它们之间有一些基础上的不同。

模型,视图&展示器：

MVP中的P代表展示器，它是一个包含视图的用户界面逻辑的组件，不像MVC，来自视图的调用被委派给了展示器，它是从视图中解耦出来的，并且转而通过一个接口来同它进行对话，这允许所有类型的有用的东西,比如在单元测试中模拟视图的调用。

对MVP最通常的实现是使用一个被动视图(Passive View 一种对所有动机和目的保持静默的视图),包含很少甚至与没有任何逻辑.如果MVC和MVP是不同的,那是因为其C和P干了不同的事情.在MVP中,P观察着模型并且当模型发生改变的时候对视图进行更新.P切实的将模型绑定到了视图,这一责任在MVC中被控制器提前持有了。

MVP一般最常使用在企业级应用程序中，这样的程序中有必要对展现逻辑尽可能的重用。带有非常复杂的逻辑和大量用户交互的应用程序中，我们也许会发现MVC相对来说并不怎么满足需求，因为要解决这个问题可能意味着对多重控制器的重度依赖。在MVP中，所有这些复杂的逻辑能够被封装到一个展示器中，它可以显著的简化维护工作量。

### 第三章：JavaScript MVVM模式

MVVM(Model View ViewModel)是一种基于MVC和MVP的架构模式，它试图将用户界面（UI）从业务逻辑和行为中更加清晰地分离出来。为了这个目的，很多例子使用声明变量绑定来把View层的工作从其他层分离出来。

这促进了UI和开发工作在同一代码库中的同步进行。UI开发者用他们的文档标记（HTML）绑定到ViewModel，在这个地方Model和ViewModel由负责逻辑的开发人员维护。

- 模型：

  模型持有信息，但是通常没有操作行为。它们不会格式化信息，也不会影响数据在浏览器中的表现，因为这些不是模型的责任。相反，数据格式化是由视图层处理的，尽管这种行为被认为是业务逻辑，这个逻辑应该被另外一个层封装，这个层和模型交互，这个曾就是视图模型。

- 视图：

  这样一个视图在我们的应用程序中可能也没有真正的模型的概念,而可以被一个代理控制.MVVM的主动视图包含数据绑定,事件和需要能够理解视图模型的行为.尽管这些行为能够被映射到属性,视图仍然处理这来自视图模型的事件。

- 视图模型：

  视图模型被认为是一个专门进行数据转换的控制器。它可以把对象信息转换到视图信息，将命令从视图携带到对象。

MVVM 的优缺点：

- 优点：
  1. MVVM更加便于UI和驱动UI的构造块,这两部分的并行开发；
  2. 抽象视图使得背后所需要的业务逻辑(或者粘合剂)的代码数量得以减少；
  3. 视图模型比事件驱动代码更加容易进行单元测试；
  4. 视图模型(比视图更加像是模型)能够在不用担心UI自动化和交互的前提下被测试；
- 缺点：
  1. 对于更简单的UI而言,MVVM可能矫枉过正了；
  2. 虽然数据绑定可以是声明性质的并且工作得很好,但在我们简单设置断点的地方,它们比当务之急的代码更加难于调试；
  3. 在非凡的应用程序中的数据绑定能够创造许多的账簿.我们也并不希望以绑定比被绑定目标对象更加重量级,这样的境地告终；
  4. 在大型的应用程序中,将视图模型的设计提升到获取足够所需数量的泛化,会变得更加的困难；

MVC / MVP / MVVM：

MVP和MVVM都是MVC的衍生物。它和它的衍生物之间关键的不同之处在于每一层对于其它层的依赖，以及它们相互之间是如何紧密结合在一起的。

- 在MVC中，视图位于我们架构的顶部，其背后是控制器。模型在控制器后面，而因此我们的视图了解得到我们的控制器，而控制器了解得到模型。这里，我们的视图有对模型的直接访问。然而将整个模型完全暴露给视图可能会有安全和性能损失，这取决于我们应用程序的复杂性。MVVM则尝试去避免这些问题。
- 在MVP中，控制器的角色被代理器所取代，代理器和视图处于同样的地位，视图和模型的事件都被它侦听着并且接受它的调解。不同于MVVM，没有一个将视图绑定到视图模型的机制，因此我们转而依赖于每一个视图都实现一个允许代理器同视图去交互的接口。
- MVVM进一步允许我们创建一个模型的特定视图子集，包含了状态和逻辑信息，避免了将模型完全暴露给视图的必要。不同于MVP的代理器，视图模型并不需要去引用一个视图。视图可以绑定到视图模型的属性上面，视图模型则去将包含在模型中的数据暴露给视图。像我们所提到过的，对视图的抽象意味着其背后的代码需要较少的逻辑。

## JQuery 中的设计模式

jQuery是目前最流行的JavaScript DOM操作库，它提供了一个在安全和跨浏览器的方式下与DOM交互的抽象层。有意思的是，这个库也可以作为一个例子，来展示设计模式如何有效的创建既可读又易用的API。

### 第一章：JavaScript 组合模式

组合模式 描述了一组对象可像单个对象一样的对待。这允许我们能统一的处理单个对象或多个对象。这意味着无论是一个对象还是一千个对象我们都能以同样的行为来处理。

在Jquery中，当我们在一个节点或多个节点上应用方法时，我们都能以相同的方式来选择并返回JQuery对象。

下面这个演示我们将使用Jquery的选择器。对单一元素(比如拥有唯一ID的元素)或拥有相同标签或Class的一组元素添加名为active的class,对待它们使用上并无不同：

```javascript
// 单一节点
$( "#singleItem" ).addClass( "active" );
$( "#container" ).addClass( "active" );

// 一组节点
$( "div" ).addClass( "active" );
$( ".item" ).addClass( "active" );
$( "input" ).addClass( "active" );
```

JQuery的addClass()实现中直接使用原生的for循环、Jquery的JQuery.each()、Jquery.fn.each来迭代一个集合以达到能同时处理一个或一组元素的目的。请看下面的例子：

```javascript
addClass: function( value ) {
  var classNames, i, l, elem,
    setClass, c, cl;
  if ( jQuery.isFunction( value ) ) {
    return this.each(function( j ) {
      jQuery( this ).addClass( value.call(this, j, this.className) );
    });
  }
  if ( value && typeof value === "string" ) {
    classNames = value.split( rspace );
    for ( i = 0, l = this.length; i < l; i++ ) {
      elem = this[ i ];
      if ( elem.nodeType === 1 ) {
        if ( !elem.className && classNames.length === 1 ) {
          elem.className = value;
        } else {
          setClass = " " + elem.className + " ";
          for ( c = 0, cl = classNames.length; c < cl; c++ ) {
            if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
              setClass += classNames[ c ] + " ";
            }
          }
          elem.className = jQuery.trim( setClass );
        }
      }
    }
  }
  return this;
}
```

### 第二章：JavaScript 适配器模式

适配器模式 将一个对象或者类的接口翻译成某个指定的系统可以使用的另外一个接口。

适配器基本上允许本来由于接口不兼容而不能一起正常工作的对象或者类能够在一起工作.适配器将对它接口的调用翻译成对原始接口的调用，而实现这样功能的代码通常是最简的。

我们可能已经用过的一个适配器的例子就是jQuery的jQuery.fn.css()方法，这个方法帮助规范了不同浏览器之间样式的应用方式，使我们使用简单的语法，这些语法被适配成为浏览器背后真正支持的语法：

```javascript
// Cross browser opacity:
// opacity: 0.9;  Chrome 4+, FF2+, Saf3.1+, Opera 9+, IE9, iOS 3.2+, Android 2.1+
// filter: alpha(opacity=90);  IE6-IE8

// Setting opacity
$( ".container" ).css( { opacity: .5 } );

// Getting opacity
var currentOpacity = $( ".container" ).css('opacity');
```

将上面的代码变得可行的相应的jQuery核心css钩子在下面：

```javascript
get: function( elem, computed ) {
  // IE uses filters for opacity
  return ropacity.test( (
        computed && elem.currentStyle ?
            elem.currentStyle.filter : elem.style.filter) || "" ) ?
    ( parseFloat( RegExp.$1 ) / 100 ) + "" :
    computed ? "1" : "";
},

set: function( elem, value ) {
  var style = elem.style,
    currentStyle = elem.currentStyle,
    opacity = jQuery.isNumeric( value ) ?
          "alpha(opacity=" + value * 100 + ")" : "",
    filter = currentStyle && currentStyle.filter || style.filter || "";

  // IE has trouble with opacity if it does not have layout
  // Force it by setting the zoom level
  style.zoom = 1;

  // if setting opacity to 1, and no other filters
  //exist - attempt to remove filter attribute #6652
  if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

    // Setting style.filter to null, "" & " " still leave
    // "filter:" in the cssText if "filter:" is present at all,
    // clearType is disabled, we want to avoid this style.removeAttribute
    // is IE Only, but so apparently is this code path...
    style.removeAttribute( "filter" );

    // if there there is no filter style applied in a css rule, we are done
    if ( currentStyle && !currentStyle.filter ) {
      return;
    }
  }

  // otherwise, set new filter values
  style.filter = ralpha.test( filter ) ?
      filter.replace( ralpha, opacity ) :
      filter + " " + opacity;
  }
};
```

### 第三章：JavaScript 外观模式

正如我们早前在书中提过的, 没面模式为一个庞大的（可能更复杂的）代码结构提供了一个更简单的抽象接口。

门面在jQuery库中能够经常见到，它们为开发者处理DOM节点，动画或者令人特别感兴趣的跨域Ajax提供了简单的实现入口。

下面的代码是jQuery $.ajax()方法的门面：

```javascript
$.get( url, data, callback, dataType );
$.post( url, data, callback, dataType );
$.getJSON( url, data, callback );
$.getScript( url, callback ); 
```

这些方法背后真正执行的代码是这样的：

```javascript
// $.get()
$.ajax({
  url: url,
  data: data,
  dataType: dataType
}).done( callback );

// $.post
$.ajax({
  type: "POST",
  url: url,
  data: data,
  dataType: dataType
}).done( callback );

// $.getJSON()
$.ajax({
  url: url,
  dataType: "json",
  data: data,
}).done( callback );

// $.getScript()
$.ajax({
  url: url,
  dataType: "script",
}).done( callback );
```

这是因为jQuery.ajax()在jQuery核心代码中的实现是一段不平凡的代码，至少是这样的。至少它规范了XHR（XMLHttpRequest）之间的差异而且让我们能够简单的执行常见的HTTP动作（比如：get、post等），以及处理延迟等等。

由于显示与上面所讲的门面相关的代码将会占据整个章节，这里仅仅给出了jQuery核心代码中规划化XHR的代码：

```javascript
// Functions to create xhrs
function createStandardXHR() {
  try {
    return new window.XMLHttpRequest();
  } catch( e ) {}
}

function createActiveXHR() {
  try {
    return new window.ActiveXObject( "Microsoft.XMLHTTP" );
  } catch( e ) {}
}

// Create the request object
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
  /* Microsoft failed to properly
   * implement the XMLHttpRequest in IE7 (can't request local files),
   * so we use the ActiveXObject when it is available
   * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
   * we need a fallback.
   */
  function() {
    return !this.isLocal && createStandardXHR() || createActiveXHR();
  } :
  // For all other browsers, use the standard XMLHttpRequest object
  createStandardXHR;
  ...
```

下面的代码也处于实际的jQuery XHR（jqXHR）实现的上层，它是我们实际上经常打交道的方便的门面：

```javascript
// Request the remote document
   jQuery.ajax({
     url: url,
     type: type,
     dataType: "html",
     data: params,
     // Complete callback (responseText is used internally)
     complete: function( jqXHR, status, responseText ) {
       // Store the response as specified by the jqXHR object
       responseText = jqXHR.responseText;
       // If successful, inject the HTML into all the matched elements
       if ( jqXHR.isResolved() ) {
         // Get the actual response in case
         // a dataFilter is present in ajaxSettings
         jqXHR.done(function( r ) {
           responseText = r;
         });
         // See if a selector was specified
         self.html( selector ?
           // Create a dummy div to hold the results
           jQuery("

<div>

   ")
             // inject the contents of the document in, removing the scripts
             // to avoid any 'Permission Denied' errors in IE
             .append(responseText.replace(rscript, ""))
             // Locate the specified elements
             .find(selector) :
           // If not, just inject the full result
           responseText );
       }
       if ( callback ) {
         self.each( callback, [ responseText, status, jqXHR ] );
       }
     }
   });
   return this;
 }
</div>
```

### 第四章：JavaScript 观察者模式

另一个我们之前提到过的模式就是观察者（发布/订阅）模式.这种模式下，系统中的对象可以在关注的事件发生的时候给其他对象发送消息，也可以被其他对象所通知。

jQuery核心库很多年前就已经提供了对于类似于发布/订阅系统的支持，它们称之为定制事件。

jQuery的早期版本中，可以通过使用jQuery.bind()(订阅),jQuery.trigger()(发布),和jQuery.unbind()(取消订阅)来使用这些定制事件，但在近期的版本中，这些都可以通过使用jQuery.on(),jQuery.trigger()和jQuery.off()来完成。

下面我们来看一下实际应用中的一个例子：

```javascript
// Equivalent to subscribe(topicName, callback)
$( document ).on( "topicName" , function () {
    //..perform some behaviour
});

// Equivalent to publish(topicName)
$( document ).trigger( "topicName" );

// Equivalent to unsubscribe(topicName)
$( document ).off( "topicName" );
```

对于jQuery.on()和jQuery.off()的调用最后会经过jQuery的事件系统，与Ajax一样，由于它们的实现代码相对较长，我们只看一下实际上事件处理器是在哪儿以及如何将定制事件加入到系统中的：

```javascript
jQuery.event = {

  add: function( elem, types, handler, data, selector ) {

    var elemData, eventHandle, events,
      t, tns, type, namespaces, handleObj,
      handleObjIn, quick, handlers, special;

    ...

    // Init the element's event structure and main handler,
    //if this is the first
    events = elemData.events;
    if ( !events ) {
      elemData.events = events = {};
    }
    ...

    // Handle multiple events separated by a space
    // jQuery(...).bind("mouseover mouseout", fn);
    types = jQuery.trim( hoverHack(types) ).split( " " );
    for ( t = 0; t < types.length; t++ ) {

      ...

      // Init the event handler queue if we're the first
      handlers = events[ type ];
      if ( !handlers ) {
        handlers = events[ type ] = [];
        handlers.delegateCount = 0;

        // Only use addEventListener/attachEvent if the special
        // events handler returns false
        if ( !special.setup || special.setup.call( elem, data,
        //namespaces, eventHandle ) === false ) {
          // Bind the global event handler to the element
          if ( elem.addEventListener ) {
            elem.addEventListener( type, eventHandle, false );

          } else if ( elem.attachEvent ) {
            elem.attachEvent( "on" + type, eventHandle );
          }
        }
      }
```

jQuery.publish(),jQuery.subscribe和jQuery.unscribe方法。我之前在书中提到过，现在我们可以完整的看一下这个包装器。

```javascript
(function( $ ) {
  var o = $({});
  $.subscribe = function() {
    o.on.apply(o, arguments);
  };
  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };
  $.publish = function() {
    o.trigger.apply(o, arguments);
  };
}( jQuery ));
```

在近期的jQuery版本中，一个多目的的回调对象（jQuery.Callbacks）被提供用来让用户在回调列表的基础上写新的方案。另一个发布/订阅系统就是一个使用这个特性写的方案，它的实现方式如下：

```javascript
var topics = {};
jQuery.Topic = function( id ) {
    var callbacks,
        topic = id && topics[ id ];
    if ( !topic ) {
        callbacks = jQuery.Callbacks();
        topic = {
            publish: callbacks.fire,
            subscribe: callbacks.add,
            unsubscribe: callbacks.remove
        };
        if ( id ) {
            topics[ id ] = topic;
        }
    }
    return topic;
};
```

### 第五章：JavaScript 迭代器模式

迭代器模式中，迭代器（允许我们遍历集合中所有元素的对象）顺序迭代一个集合对象中的元素而无需暴漏其底层形式。

迭代器封装了这种特别的迭代操作的内部结构，就jQuery的jQuery.fn.each()迭代器来说，我们实际上可以使用jQuery.each()底层的代码来迭代一个集合，而无需知道或者理解后台提供这种功能的代码是如何实现的。

```javascript
$.each( ["john","dave","rick","julian"] , function( index, value ) {
  console.log( index + ": "" + value);
});
$( "li" ).each( function ( index ) {
  console.log( index + ": " + $( this ).text());
});
```

这里我们可以看到jQuery.fn.each()的代码：

```javascript
// Execute a callback for every element in the matched set.
each: function( callback, args ) {
  return jQuery.each( this, callback, args );
}
```

在jQuery.each()方法后面的代码提供了两种迭代对象的方法：

```javascript
each: function( object, callback, args ) {
  var name, i = 0,
    length = object.length,
    isObj = length === undefined || jQuery.isFunction( object );
  if ( args ) {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.apply( object[ name ], args ) === false ) {
          break;
        }
      }
    } else {
      for ( ; i < length; ) {
        if ( callback.apply( object[ i++ ], args ) === false ) {
          break;
        }
      }
    }

  // A special, fast, case for the most common use of each
  } else {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
          break;
        }
      }
    } else {
      for ( ; i < length; ) {
        if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
          break;
        }
      }
    }
  }
  return object;
};
```

### 第五章：JavaScript 惰性初始模式

























