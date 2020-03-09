// vue.config.js
const webpack = require('webpack');

module.exports = {
  //打包后的路径
  publicPath: process.env.NODE_ENV === 'production' ?
    './' :
    './',
  //是否使用包含运行时编译器的Vue内核版本
  runtimeCompiler: true,
  //productionSourceMap: true,
  //方便调试，显示代码路径
  configureWebpack: {
    devtool: 'source-map'
  },
  //全局注册一些插件
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      //注册$
      $: 'jquery',
      //注册utility，用于加密
      utility:'utility'
    }])
  },
  devServer: {
    // 配置多个代理
    proxy: {
      "/api": {
        target: 'http://localhost:5000',//这里写的是访问接口的域名和端口号 
        changeOrigin: true, //跨域请求
        pathRewrite: { // 重命名 
          "^/api":""
        }
      }
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        prependData: `@import "@/sass/variables.scss";`
      }
    }
  },
  pages: {
    //多页面模式配置，可配置多个页面应用
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  //取消代码eslint语法检测
  lintOnSave: false 
}