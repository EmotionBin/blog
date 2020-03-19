//关于文章的请求模块
const path = require('path');

//引入基于Promise的相关文件操作的js
const { mkdirFile, readFile, saveFile, deleteFile } = require('../public/js/fileOp.js');
//引入封装好的返回结果的文件
var customRes = require('../public/js/customRes.js');
//关于数据库的操作
var databaseOp = require('../public/js/dbQuery.js');

//这里配置上传的文件的相关信息
const fileOptions = {
  path:`../public/articles`
}

//获取文章列表数据
const getArticlesList = async ctx => {
  try {
    let queryRes = await databaseOp(`select * from articles order by issueYear desc`);
    // console.log(queryRes,queryRes[0].issueYear);
    let resArray = [];
    //记录存在几个年份
    let j = 0;
    for (let i in queryRes){
      let { issueYear, articleId, articleTitle, issueDate, articleName } = queryRes[i];
      //对数据库的时间格式进行格式化
      issueDate = getDate(issueDate).date_UTC;
      //格式化文章名字，拼接成完整的路径
      articleName = `${issueYear}/${articleName}.md`
      // 如果是第一条数据
      if(i == 0){
        resArray.push({
          issueYear,
          data: [{ articleId, articleTitle, issueDate, articleName }]
        });
      }else{
        //如果后一条数据的issueYear等于前一条数据的issueYear
        if (queryRes[i - 1].issueYear == issueYear) {
          resArray[j].data.push({ articleId, articleTitle, issueDate, articleName });
        } else {
          j ++;
          resArray.push({
            issueYear,
            data: [{ articleId, articleTitle, issueDate, articleName }]
          });
        }
      }
    }
    console.log(JSON.stringify(resArray));
    ctx.response.type = 'json';
    ctx.response.body = customRes(1, resArray);
  } catch (err) {
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了');
  }
}

//获取文章详细内容
const getArticles = async ctx => {
  // console.log(`这是传递过来的参数${ctx.params.articleName}`)
  try{
    const file = `${fileOptions.path}/${ctx.params.year}/${ctx.params.articleName}`;
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
  const {file} = ctx.request.files;
  const articleId = `${filename}_${stamp}`;
  try{
    //先用article的articleName查询该文章是否存在，不存在则直接写入，存在则停止操作
    let queryRes = await databaseOp(`select * from articles where articleName = '${year}_${filename}'`);
    // console.log(queryRes);
    if (queryRes.length){
      //文章存在，则上传失败
      console.log('文章已经存在，上传失败');
      ctx.response.type = 'json';
      ctx.response.body = customRes(0, '文件已经存在，请重新修改文件名');
    }else{
      //将相对路径转换成绝对路径
      const filePath = path.join(__dirname, `${fileOptions.path}/${year}`);
      //创建文件夹
      await mkdirFile(filePath);
      //保存文件
      filePath_res = await saveFile(file.path, `${filePath}\\${year}_${filename}.md`);
      //文章不存在，则直接将参数写入数据库中存储
      const sqlString = `insert into articles values ('${year}','${articleId}','${title}','${fullDate}','${year}_${filename}')`;
      await databaseOp(sqlString);
      console.log('数据写入成功');
      ctx.response.type = 'json';
      ctx.body = customRes(1, filePath_res);
    }
  }catch(err){
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了');
  }
}

//查询文章
const queryAticle = async ctx => {
  const { articleId } = ctx.request.query;
  console.log(articleId);
  try {
    if (articleId) {
      //如果传过来的Id不为空，则查找为对应ID的文章
      let queryRes = await databaseOp(`select * from articles where articleId = '${articleId}'`);
      console.log(queryRes);
      ctx.response.type = 'json';
      ctx.response.body = customRes(1, queryRes); 
    } else {
      //如果传过来的ID为空，则返回所有数据
      let queryRes1 = await databaseOp(`select * from articles`);
      console.log('所有',queryRes1);
      ctx.response.type = 'json';
      ctx.response.body = customRes(1, queryRes1); 
    }
  } catch (err) {
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了'); 
  }
}

//更新文章
const updataArticle = async ctx => {
  console.log(ctx.request.body);
  const {articleId,title} = ctx.request.body;
  //拿到上传的文件
  const {file} = ctx.request.files;
  try {
    //如果上传了文件则更新文件，否则不更新
    if(file){
      console.log('修改了文件');
      //上传了文件
      let queryRes = await databaseOp(`select * from articles where articleId='${articleId}'`);
      //将相对路径转换成绝对路径
      const filePath = path.join(__dirname, `${fileOptions.path}/${queryRes[0].issueYear}`);
      //保存文件
      await saveFile(file.path, `${filePath}\\${queryRes[0].articleName}.md`);
    }
    //写入数据库
    await databaseOp(`update articles set articleTitle='${title}' where articleId='${articleId}'`);
    ctx.response.type = 'json';
    ctx.response.body = customRes(1, '操作成功'); 
  } catch (err) {
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了'); 
  }
}

//删除文章
const deleteArticle = async ctx => {
  console.log(ctx.request.body);
  const { articleId } = ctx.request.body;
  try {
    //先去数据库中查找关于要删除的这篇文章的数据
    let queryRes = await databaseOp(`select * from articles where articleId='${articleId}'`);
    console.log(queryRes);
    //拼接路径，这里是绝对路径
    const filePath = path.join(__dirname, `${fileOptions.path}/${queryRes[0].issueYear}/${queryRes[0].articleName}.md`);
    console.log(filePath);
    //删除文件
    await deleteFile(filePath);
    //在数据库中删除数据
    const filePath_delete = await databaseOp(`delete from articles where articleId='${articleId}'`);
    ctx.response.type = 'json';
    ctx.response.body = customRes(1, filePath_delete);
  } catch (err) {
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了'); 
  }
}

//生成时间,年,月,日,时间戳,UTC时间转换
const getDate = (timer) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const fullDate = `${year}-${month}-${day}`;
  const stamp = Date.now();
  //对数据库的时间格式进行格式化
  const date_UTC = timer ? `${timer.getUTCFullYear()}-${timer.getUTCMonth() + 1}-${timer.getUTCDate() + 1}` : 0;
  const customDate = {
    year,
    month,
    day,
    fullDate,
    stamp,
    date_UTC
  }
  return customDate;
}

module.exports = {
  getArticlesList,
  getArticles,
  addArticle,
  queryAticle,
  updataArticle,
  deleteArticle
};
