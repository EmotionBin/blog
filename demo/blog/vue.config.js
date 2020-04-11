// vue.config.js
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * 优化记录如下
 * 1.把一些类库采用CDN的方式引入，直接在index.html中引入CDN连接，防止打包过后vendor.js文件体积过大，
 * 但是这样的话，有一个弊端，就是如果CDN挂了，页面就无法渲染。为了解决这个问题，在一开始加载的时候我会
 * 判断CDN的资源是否成功引入进来，如果没有成功引入进来，则说明CDN的资源已经挂掉了，这时候需要引入本地的
 * 备用资源，详见index.html
 * 
 * 2.在打包的时候生成.gz压缩文件，服务器端采用nginx配置gzip加载，再次减小各个文件的体积。
 * 这里顺便提一下gzip加载实现方式，主要有两种：
 *    2.1 前端打包生成.gz文件，nginx后端部署直接读取.gz文件
 *    2.2 前端打包生成传统的.js或.css文件等，nginx后端部署开启gzip压缩模式，把传统文件转换成.gz文件
 * 我这里采用的2.1和2.2这两种方式的结合，前端打包直接生成.gz文件，ngxin先去找有没有.gz文件，如果有.gz文件，
 * 则直接引用.gz文件，如果没有则动态压缩，立马生成.gz文件
 * 
 * 3.路由懒加载，配置路由的时候采用了懒加载的方式，打包的时候按照路由懒加载分配的模块打包生成对应js，
 * 防止SPA单页应用加载首页的时候速度过慢。这里解释一下懒加载生成对应模块，只需要使用命名chunk，一个
 * 特殊的注释语法来提供chunk name(需要 Webpack > 2.4),详见src/router/index.js
 * 
 * 4.打包后删除了一些开发时的注释和console，这样控制台更干净、简洁
 * 
 * By 黄伟斌 2020.3.22
 */

module.exports = {
  //打包后的路径
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' :
    '/',
  //是否使用包含运行时编译器的Vue内核版本
  runtimeCompiler: true,
  //方便调试，显示代码路径
  productionSourceMap: false,

  // configureWebpack: {
  //   // devtool: 'source-map',
  //   /**
  //    * 这里说明这些库不需要打包，因为在index.html中引用了cdn
  //    * 前一个key是引用的第三方库名，后一个value是在项目中起的别名
  //    */
  //   externals:{
  //     'vue': 'Vue',
  //     'vuex': 'Vuex',
  //     'vue-router': 'VueRouter',
  //     'element-ui': 'ELEMENT',
  //   }
  // },

  configureWebpack: config => {
    //如果是生产环境下，则打包采用Gzip压缩的方式，删除注释和console，优化性能，减小体积
    if(process.env.NODE_ENV === 'production'){
      return {
        /**
          * 这里说明这些库不需要打包，因为在index.html中引用了cdn
          * 前一个key是引用的第三方库名，后一个value是在项目中起的别名
        */
        externals:{
          'vue': 'Vue',
          'vuex': 'Vuex',
          'vue-router': 'VueRouter',
          'element-ui': 'ELEMENT',
          'highlight.js':'hljs',
          'jquery':'jquery',
          'marked':'marked',
        },
        //一些打包插件的功能配置
        plugins: [
          //打包后生成.gz压缩文件
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ],
        optimization:{
          minimize: true,
          minimizer:[
            new TerserPlugin({
              terserOptions:{
                //打包后删除注释
                output:{
                  comments:false
                },
                //打包后去掉console和debug
                compress: {
                  warnings: false,
                  drop_debugger: true,
                  drop_console: true
                }
              }
            })
          ]
        }
      }
    }else{
      //开发模式下只配置第三方的cdn打包方式
      return {
        externals:{
          'vue': 'Vue',
          'vuex': 'Vuex',
          'vue-router': 'VueRouter',
          'element-ui': 'ELEMENT',
          'highlight.js':'hljs',
          'jquery':'jquery',
          'marked':'marked',
        },
      }
    }
  },

  //全局注册一些插件
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      //全局注册$
      // $: 'jquery',
      //全局注册utility，用于加密
      utility:'utility',
      //全局注册marked插件，用于解析markdown文件(.md)
      // marked:'marked',
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
      title: '黄伟斌的博客',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  //取消代码eslint语法检测
  lintOnSave: false
}