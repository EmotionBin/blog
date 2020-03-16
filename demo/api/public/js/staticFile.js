//这个文件夹开辟静态资源，作为中间件挂载

module.exports = function(app) {
  const path = require('path');
  const static = require('koa-static');

  /**
   * 开辟静态资源，对外公开/public/articles这个路径下的文件
   * 访问的时候为ip:端口/articles/.....
   * 如http://localhost:5000/articles/2020/a.md
   */
  const staticPath = '..';
  app.use(static(path.join(__dirname, staticPath)));
  // console.log(path.join(__dirname, staticPath));
}
