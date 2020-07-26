# 关于webpack的那些事

1. 什么是webpack，webpack解决了什么问题
2. webpack核心概念
(1) entry
(2) output
(3) module
(4) loader
(5) plugins
(6) chunk
(7) bundle
3. 打包优化手段
4. webpack构建流程与原理
5. 一些功能的实现原理.如
(1) dev-serve 实现原理
(2) HMR模块热替换实现原理
(3) tree-shaking 实现原理
6. 手写loader和plugins

参考资料:

webpack构建流程与原理:
1. https://segmentfault.com/a/1190000021494964?utm_source=tag-newest
2. https://juejin.im/post/5c62a137f265da2db87b87bb

手写webpack:
1. https://www.jianshu.com/p/2520049a94c5
2. https://blog.csdn.net/weixin_34124939/article/details/91386853
3. https://www.jianshu.com/p/b0a644e336a2
4. https://zhuanlan.zhihu.com/p/58151131

手写loader:https://www.jianshu.com/p/c89f1f3fd4af

# 关于webpack的那些事

webpack是现代前端工程中必备的一个打包工具，它帮我们做了很多事情，使得我们的开发效率极大提高，本文来一起了解webpack  

----

## 什么是webpack

webpack 是一个模块打包机，将根据文件间的依赖关系对其进行静态分析，然后将这些模块按指定规则生成静态资源  

当 webpack 处理程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle  

在webpack眼里，万物皆模块，webpack 以模块化思想为核心，帮助开发者更好的管理整个前端工程  

----

## webpack核心概念

### Entry

告诉 webpack 从哪个文件开始构建，这个文件将作为 webpack 依赖关系图的起点，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的，每个依赖项随即被处理，最后输出到称之为 bundles 的文件中  

----

### Output

告诉 webpack 在哪里输出构建后的包、包的名称等，以及如何命名这些文件，默认值为 ./dist，基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中  

----

### Module

模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块  

----

### Chunk

代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割  

----

### Loader

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript），loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块  

----

### Plugins

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务  

----

## 打包优化手段

### 开发环境

1. 开启HMR(热模块替换)功能，优化打包构建速度

如果只有一个模块发生了变化，只会重新构建这一个模块，其他模块使用缓存  

2. source-map优化代码调试

source-map是一个代码的映射，打包后的文件如果报错了，提示信息会映射到我们的源码中  

----

### 生产环境

1. 使用缓存

缓存分为以下三种:  

- hash:每次打包构建后都会生成一个唯一的hash值
- chunkhash:来自同一个chunk(同一个入口)的文件，打包构建后hash值相同，不同chunk的hash值不同
- contenthash:根据文件内容生成的hash值，文件被修改了这个hash值就会发生变化

合理的利用缓存可以减少请求数量，减轻服务器压力，优化性能，提高用户体验  

----

2. 树摇(tree-shaking)

树摇，要求必须使用的是ES6 Module，去除掉代码中没有引用到的模块，使得文件体积更小，请求速度更快  

----

3. 代码分割(split-code)

如果打包后只生成一个 bundle，那么这个bundle的体积会比较大，请求需要花费的时间就更多，可以把这一个 bundle 拆分成多个文件，这样加载的时候更快，这一点在 SPA 单页应用中的首屏渲染特别有体现  

----

4. 代码压缩

把所有代码去除空格、去除注释等，并进行压缩，这样打包后的文件体积更小  

5. 懒加载

懒加载对性能优化也是一种重要手段，等到需要的时候再加载，就拿 SPA 的路由模式来说，在首屏的时候只渲染首屏用到的东西，跳转至其他路由的时候，才渲染这个路由对应的文件

这里顺便提一下懒加载的原理，其实就是先返回一个 `promise`，当需要加载的时候 `promise` 的状态变为 `resolved` ，再去执行相应的回调

----

6. Externals

可以指定在打包的时候那些模块不打包，比如一些第三方的库文件 Vue、React 等，然后需要使用CDN或者其他的方式引入第三方库文件  

----

## webpack构建流程

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程:  

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数  
2. 开始编译：用上一步得到的参数初始化 `Compiler` 对象，加载所有配置的插件，执行对象的 `run` 方法开始执行编译  
3. 确定入口：根据配置中的 `entry` 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 `Loader` 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理  
5. 完成模块编译：在经过第 4 步使用 `Loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系  
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会  
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

**在以上过程中，webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果**

我自己写了一个简易的 webpack，模拟了 webpack 打包的主要流程，对于理解 webpack 的构建流程和原理有很大的帮助，可以看这里 [传送门](https://github.com/EmotionBin/variousDemo/tree/master/webpack/25-handle-webpack)  

----

## 实现原理

