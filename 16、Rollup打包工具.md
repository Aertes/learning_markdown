### 第一章：概述

- Rollup 更为小巧
- 仅仅是一款 ESM 打包器
- Rollup 中并不支持类似 HMR 这种高级特性
- 初衷是提供一个充分利用 ESM 各项特性构建出结构扁平性能高效的打包器
- Rollup 默认会应用到 Tree-shaking
- Rollup 支持使用插件的方式扩展，插件是 Rollup 唯一扩展途径；
- 

### 第二章：快速上手

- 安装：

  ```shell
  npm install --global rollup
  ```

- 命令行的参数：

  ```shell
  -i, --input <filename>      要打包的文件（必须）
  -o, --file <output>         输出的文件 (如果没有这个参数，则直接输出到控制台)
  -f, --format <format>       输出的文件类型 (amd, cjs, esm, iife, umd)
  -e, --external <ids>        将模块ID的逗号分隔列表排除
  -g, --globals <pairs>       以`module ID:Global` 键值对的形式，用逗号分隔开 
                                任何定义在这里模块ID定义添加到外部依赖
  -n, --name <name>           生成UMD模块的名字
  -h, --help                  输出 help 信息
  -m, --sourcemap             生成 sourcemap (`-m inline` for inline map)
  --amd.id                    AMD模块的ID，默认是个匿名函数
  --amd.define                使用Function来代替`define`
  --no-strict                 在生成的包中省略`"use strict";`
  --no-conflict               对于UMD模块来说，给全局变量生成一个无冲突的方法
  --intro                     在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容
  --outro                     在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容
  --banner                    在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容
  --footer                    在打包好的文件的块的外部(wrapper外部)的最底部插入一段内容
  --interop                   包含公共的模块（这个选项是默认添加的）
  ```

### 第三章：配置文件

```javascript
// rollup.config.js
export default {
  // 核心选项
  input,     // 必须
  external,
  plugins,

  // 额外选项
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy

  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file,    // 必须
    format,  // 必须
    name,
    globals,

    // 额外选项
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // 高危选项
    exports,
    amd,
    indent
    strict
  },
};
```

### 第四章：Code Splitting（代码拆分）

- 通过代码的动态导入实现代码的拆分

```javascript
// rollup.config.js
export default {
 	input: 'src/index.js',
  output:{
    dir: 'dist',
    format: 'amd'
  }
}

// index.js
import('./idnex').then(({ log }) => {
  log('code splitting~')
})
```

### 第五章：多入口打包

```javascript
// rollup.config.js
export default {
 	// input: ['src/index.js', 'src/ablum.js'],
  input: {
    foo: 'src/index.js',
    bar: 'src/album.js'
  }
  output:{
    dir: 'dist',
    format: 'amd'
  }
}
```

### 第六章：Rollup 与 Webpack 的区别

- Rollup：
  - 输出的结果更加扁平
  - 执行效率更高
  - 自动移除未引用代码
  - 打包结果依然完全可读
  - 缺点：
    - 加载非 ESM 的第三方模块比较复杂
    - 模块最终都打包到一个函数中，无法实现 HMR
    - 在浏览器环境中，代码拆分功能依赖 AMD 库（requireJS）
  - 适用于开发**框架**或是些**类库**
- Webpack：
  - webpack 大而全
  - 相对适用于应用程序

### 第七章：Parcel

零配置的前端应用打包器

以 html 文件作为打包入口文件；

```shell
# 开发模式打包
yarn parcel src/index.html
# 生产模式打包
yarn parcel build src/index.html
```

- 会自动启动一个本地服务（server）
- 修改文件内容会自动刷新浏览器
- 支持模块热替换 HMR
- 支持自动安装依赖
- 支持加载其他类型的资源模块
- 支持动态导入 （import(‘jquery’).then(()=>{})）
- 相同体量的项目打包，parcel 的构建速度比 webpack 快很多；因为在 parcel 的内部使用的是多进程同时去工作，发挥了多核 CPU 的性能；
- webpack 的 happypack 插件也可以实现多核 CPU 的性能的多进程打包功能