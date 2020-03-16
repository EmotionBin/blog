//关于文章的请求模块
const path = require('path');

//引入基于Promise的读取文件、写入文件的js
const { mkdirFile,readFile,saveFile } = require('../public/js/fileOp.js');
//引入封装好的返回结果的文件
var customRes = require('../public/js/customRes.js');

//这里配置上传的文件的相关信息
const fileOptions = {
  path:`../public/articles`
}

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
  const { year, fullDate,stamp } = getDate();
  console.log(fullDate);
  //获取上传到这里的标题和文件名称
  const {title,filename} = ctx.request.body;
  //获取上传的附件
  const file = ctx.request.files.file;
  const fileId = `${filename}_${stamp}`;
  try{
    //将相对路径转换成绝对路径
    const filePath = path.join(__dirname, `${fileOptions.path}/${year}`);
    //创建文件夹
    await mkdirFile(filePath);
    //保存文件
    filePath_res = await saveFile(file.path,`${filePath}\\${filename}.md`);
    ctx.body = customRes(1, filePath_res);
  }catch(err){
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了');
  }
  console.log(fileId);
  // console.log(title,filename);
  // console.log(file);
}

const getDate = () => {
  //生成时间,年,月,日,时间戳
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const fullDate = `${year}-${month}-${day}`;
  const stamp = Date.parse(new Date());
  const customDate = {
    year,
    month,
    day,
    fullDate,
    stamp
  }
  return customDate;
}

module.exports = {
  getArticles,
  addArticle
};
