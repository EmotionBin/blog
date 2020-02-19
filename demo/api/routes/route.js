//本项目中所有的请求都配置在这个文件中
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const utility = require("utility");

//引入封装好的数据库中间件
var databaseOp = require('../public/js/dbQuery.js');
//引入封装好的返回结果的文件
var customRes = require('../public/js/customRes.js');

var router = new Router();

//根路径测试请求
const index =  async ctx => {
    databaseOp(`SELECT * from user`).then(res => {
        console.log(res);
    });
    ctx.body = {
        data:'Hello Koa!'
    }
}

//注册请求
const register = async ctx => {
    var resObj;
    var {username,password} = ctx.request.body;
    username = username.trim();
    console.log(username,password);
    try {
        var queryRes = await databaseOp(`SELECT * from userinfo where username = '${username}'`);
        console.log(queryRes);
        if(queryRes.length){
            //如果能查到数据，说明该用户名已经被占用，不可再注册
            console.log('该用户名已经被占用');
            resObj = customRes(1,'该用户名已经被占用');
        }else{
            //如果没查到数据，则进行注册操作
            console.log('用户名合法，开始注册');
            //将密码进行md5加密
            var password_md5 = utility.md5(password);
            console.log(password,password_md5);
            var queryRes = await databaseOp(`insert into userinfo values ('${username}','${password_md5}')`);
            console.log('写入数据库操作完成!');
            resObj = customRes(1,'注册成功');
        }
    } catch (error) {
        console.log(error);
        resObj = customRes(0,'失败了');
    }
    ctx.response.type = 'json';
    ctx.response.body = resObj;
}

//登录请求
const login = async ctx => {
    console.log(ctx.request.body);
    ctx.body = {
        data:'login!'
    }
}

//路由菜单
router.get('/',index );
router.post('/register',register );
router.post('/login',login );

module.exports = (app)=> {
    app.use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods())
}
