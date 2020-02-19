// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
      './' :
      './',
    runtimeCompiler: true,
    //productionSourceMap: true,
    configureWebpack: {
      devtool: 'source-map'
    },
    // devServer: {
    //   // 配置多个代理
    //   proxy: {
    //     "gis_beta.ashx": {
    //       target: 'http://192.168.51.243:8180/',//这里写的是访问接口的域名和端口号 
    //       changeOrigin: true//跨域请求,
    //       // pathRewrite: { // 重命名 
    //     }
    //   }
    // },
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
    }
  }