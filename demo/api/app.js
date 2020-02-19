const Koa = require('koa');

//加载路由模块，处理各种路径请求
const route = require('./routes/route.js');

//加载配置文件
const config = require('./public/js/config.js');

//实例化koa 
const app = new Koa();

//挂载路由
route(app);


//设置端口
const port = process.env.PORT || config.port


//监听端口
app.listen(port, () => {
    console.log(`serve is running on ${port}`)
});
