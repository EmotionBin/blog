//关于文章的请求模块
const path = require('path');

//引入基于Promise的读取文件、写入文件的js
const { mkdirFile,readFile,saveFile } = require('../public/js/fileOp.js');
//引入封装好的返回结果的文件
var customRes = require('../public/js/customRes.js');
//关于数据库的操作
var databaseOp = require('../public/js/dbQuery.js');

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
  // console.log(fullDate);
  //获取上传到这里的标题和文件名称
  const {title,filename} = ctx.request.body;
  //获取上传的附件
  const file = ctx.request.files.file;
  const articleId = `${filename}_${stamp}`;
  try{
    //将相对路径转换成绝对路径
    const filePath = path.join(__dirname, `${fileOptions.path}/${year}`);
    //创建文件夹
    await mkdirFile(filePath);
    //保存文件
    filePath_res = await saveFile(file.path,`${filePath}\\${filename}.md`);
    //先用article的住建articleId查询该文章是否存在，不存在则直接写入，存在则更新
    let queryRes = await databaseOp(sqlString);
    console.log(queryRes);
    if (queryRes){
      //文章存在，则更新
    }else{
      //文章不存在，则直接写入
      //将参数写入数据库中存储
      const sqlString = `insert into articles values ('${year}','${articleId}','${title}','${fullDate}','${filename}')`;
      await databaseOp(sqlString);
      console.log('数据写入成功');
    }
    ctx.body = customRes(1, filePath_res);
  }catch(err){
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了');
  }
  // console.log(articleId);
  // console.log(title,filename);
  // console.log(file);
}

//生成时间,年,月,日,时间戳
const getDate = () => {
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
