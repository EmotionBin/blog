//引入封装好的返回结果的文件
var customRes = require('../public/js/customRes.js');
//关于数据库的操作
var databaseOp = require('../public/js/dbQuery.js');

//新增评论
const addComment = async ctx => {
  const {username,floor,content,reply,articleId} = ctx.request.body;
  console.log(username,floor,content,reply,articleId);
  //生成时间戳
  const time = Date.now();
  //根据时间戳生成每一条字段的id
  const id = `${time}_${username}`
  try {
    const sqlString = `insert into comment values ('${id}','${time}','${username}','${floor}','${content}','${reply}','${articleId}')`;
    //把新增的评论信息一并写入数据库
    await databaseOp(sqlString);
    ctx.response.type = 'json';
    ctx.response.body = customRes(1, '操作成功', getDate(Number.parseInt(time))); 
  } catch (err) {
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了'); 
  }
}

//获取评论
const getCommentList = async ctx => {
  const {articleId} = ctx.request.query;
  try {
    let queryRes = await databaseOp(`select * from comment where articleId = '${articleId}' order by floor asc`);
    console.log(JSON.stringify(queryRes));
    let arrayList = [];
    queryRes.forEach(item => {
      let { username, time, floor, content, reply } = item;
      console.log(username, time, floor, content, reply);
      //对时间戳进行转换
      time = getDate(Number.parseInt(time));
      //对内容进行解码，解码出emoji表情
      content = decodeURI(content);
      const floorIndex = floor.split('-');
      if(Number.parseInt(floorIndex[1]) === 0){
        //这是每层楼的第一条数据
        const obj = {
          username,
          date:time,
          floor,
          content,
          comment:[]
        }
        arrayList.push(obj);
      }else{
        //这是楼中楼的数据
        const arrayListIndex = Number.parseInt(floorIndex[0]) - 1;
        const obj1 = {
          username,
          date:time,
          floor,
          content,
          reply
        }
        arrayList[arrayListIndex].comment.push(obj1);
      }
    });
    console.log(JSON.stringify(arrayList));
    ctx.response.type = 'json';
    ctx.response.body = customRes(1, arrayList);
  } catch (err) {
    console.log(err);
    ctx.response.type = 'json';
    ctx.response.body = customRes(0, '失败了');
  }
}

//时间戳转换成年月日时分秒的函数
const getDate = function(timestamp){
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  
  console.log(date,Y,M,D,h,m,s);
  strDate = Y + M + D + h + m + s;
  return strDate;
}

module.exports = {
  addComment,
  getCommentList
};
