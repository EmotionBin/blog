//关于文章的请求模块
const path = require('path');

//引入自己封装的基于Promise的读写文件模块
const readFile = require('../public/js/readFile.js');
//引入封装好的返回结果的文件
var customRes = require('../public/js/customRes.js');

//请求文章内容
const loadArticles = async ctx => {
  // console.log(`这是传递过来的参数${ctx.params.articleName}`)
  try{
    const file = `../public/articles/${ctx.params.direction}/${ctx.params.articleName}`;
    const filePath = path.join(__dirname, file);
    // console.log(filePath);
    var fileData = await readFile(filePath);
    ctx.response.body = fileData;
  }catch(err){
    console.log(error);
    resObj = customRes(0, '失败了');
  }
}

module.exports = loadArticles;
