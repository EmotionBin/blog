// vue.config.js
const webpack = require('webpack');

module.exports = {
  //打包后的路径
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' :
    '/',
  //是否使用包含运行时编译器的Vue内核版本
  runtimeCompiler: true,
  //方便调试，显示代码路径
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    /**
     * 这里说明这些库不需要打包，因为在index.html中引用了cdn
     * 前一个key是引用的第三方库名，后一个value是在项目中起的别名
     */
    externals:{
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
    }
  },
  //全局注册一些插件
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      //全局注册$
      $: 'jquery',
      //全局注册utility，用于加密
      utility:'utility',
      //全局注册marked插件，用于解析markdown文件(.md)
      marked:'marked',
      //jwt解密token工具
      jwt:'jsonwebtoken'
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