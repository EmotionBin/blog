//这个文件夹开辟静态资源，作为中间件挂载

const path = require('path');
const static = require('koa-static');

//开辟静态资源，对外公开/public/articles这个路径下的文件
const staticPath = '..';

module.exports = function(app) {
  app.use(static(path.join(__dirname, staticPath)));
  console.log(path.join(__dirname, staticPath));
}
