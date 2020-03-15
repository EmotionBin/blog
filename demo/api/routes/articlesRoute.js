//关于文章的请求模块
const path = require('path');

//引入保存文件的js
const saveFile = require('../public/js/saveFile.js');

//这里配置上传的文件的相关信息
const fileOptions = {
  path:`../public/articles`,
  time:() => {
    //生成当前时间戳
    return Date.parse(new Date());
  }
}


//引入自己封装的基于Promise的读写文件模块
const readFile = require('../public/js/readFile.js');
//引入封装好的返回结果的文件
var customRes = require('../public/js/customRes.js');

//请求文章内容
const getArticles = async ctx => {
  // console.log(`这是传递过来的参数${ctx.params.articleName}`)
  try{
    const file = `${fileOptions.path}/${ctx.params.articleName}`;
    const filePath = path.join(__dirname, file);
    // console.log(filePath);
    var fileData = await readFile(filePath);
    ctx.response.body = fileData;
  }catch(err){
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了');
  }
}

//新增文章
const addArticle = async ctx => {
  let filePath_res;
  //获取上传到这里的标题和文件名称
  const {title,filename} = ctx.request.body;
  //获取上传的附件
  const file = ctx.request.files.file;
  const fileId = `${filename}_${fileOptions.time()}`;
  //将相对路径转换成绝对路径
  const filePath = path.join(__dirname, fileOptions.path);
  try{
    //保存文件
    filePath_res = await saveFile(file.path,`${filePath}/${filename}.md`);
  }catch(err){
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了');
  }
  console.log(fileId);
  console.log(title,filename);
  console.log(file);
  ctx.body = customRes(0, filePath_res);
}

module.exports = {
  getArticles,
  addArticle
};
