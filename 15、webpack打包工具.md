### 第一章：概述

模块打包工具（Module Bundler）=> 模块加载器（Loader） =>  代码拆分（Code Splitting）=> 资源模块（Asset Module）

### 第二章：配置文件

- webpack.config.js

  ```javascript
  const path = require('path')
  module.exports = {
    mode: 'development' // development 模式：（开发模式）\ production 模式：（生产模式）\ none 模式：（原始打包模式）
    entry: './src/main.js', // 打包的入口文件
    output： {
    	filename: 'bundle.js', // 打包后的输出文件名
    	path: path.join(__dirname, 'dist'), // 打包后的输出文件路径
        publicPath: 'dist/', // '' 表示网站的根目录， 'dist/' 表示项目的目录
  	},
    module: {
      rules: [
        {
          test: /.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        /** 
        {
          test: /.png$/,
          use: 'file-loader'
        },
        */
        {
          test: /.png$/,
          use: 'url-loader',
          options: {
            limit: 10*1024  // 10KB
          }
        },
        {
          test: /.html$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'a:href']
            }
          }
        }
      ]
    },
      
  }
  ```

### 第三章：工作模式

- development 模式：（开发模式）
- production 模式：（生产模式）
- none 模式：（原始打包模式）

### 第四章：打包结果运行原理

- 

### 第五章：资源模块加载

- 内部默认的 javascript 文件的 Loader 加载器；
- 其他文件格式的需要 Other Loader 的加载器；

### 第六章：导入资源模块

- 文件资源加载器（file-loader）；
- html-loader：
- Data URLs （url-loader），小文件通过 Data URLs，减少请求次数
- 大文件单独提取存放，提高加载速度；
- 常用加载器分类：
  - 编译转换类：
    - babel-loader：处理代码中的新特性
  - 文件操作类：
  - 代码检查类：
- 遵循模块化标准：
  - 遵循 ES Modules 标准的 import 声明；
  - 遵循 CommonJS 标准的 require 函数；
  - 遵循 AMD 标准的 define 函数和 require 函数；
  - <font color='hotpink' font-weight=700>样式代码中的 @import 指令和 url 函数</font>；
  - <font color='hotpink' font-weight=700>HTML 代码中的图片标签的 src 属性</font>

### 第七章：核心工作原理

概述：一般在我们的项目当中，散落着一些资源文件，webpack 会根据我们的配置，找到其中的一个文件，作为打包的入口，一般入口文件是一个 js 文件，然后顺着我们入口文件中的代码，根据代码中出现的 import 或者 require 之类的语句，然后解析推断出来这个文件所依赖的资源模块，然后分别去解析每一个资源模块对应的依赖，最后形成了整个项目中所以用到文件之间关系的一个依赖树，有了依赖树关系后，webpack 会去遍历（**<font color='red'>递归</font>**）这个依赖树，然后找到每个节点所对应的资源文件，最好根据我们配置文件当中的 **rules** 属性，去找到这个模块所对应的加载器，然后交给对应的加载器去加载对应的模块，最后会将加载到的结果放入到 bundle.js 中，也就是打包结果当中，从而去实现我们整个项目的打包。

- loader 机制是 webpack 的核心；

- loader 的工作原理：（示例：markdown-loader.js）

  ```javascript
  
  module.exports = source => {
    // 通过 source 参数接收 输入， 通过返回值，去输出
    console.log(source); // 
  }
  ```

  