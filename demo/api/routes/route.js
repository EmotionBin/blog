//本项目中所有的请求都配置在这个文件中
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const utility = require("utility");
const jwt = require('jsonwebtoken');

//引入配置文件
const { tokenKey , admin } = require('../public/js/config.js')
//引入封装好的数据库中间件
var databaseOp = require('../public/js/dbQuery.js');
//引入封装好的返回结果的文件
var customRes = require('../public/js/customRes.js');
//引入加载文章的路由模块
var articles = require('./articlesRoute.js');


var router = new Router();

//注册请求
const register = async ctx => {
    var resObj;
    var { username, password } = ctx.request.body;
    username = username.trim();
    console.log(username, password);
    try {
        var queryRes = await databaseOp(`select * from userinfo where username = '${username}'`);
        console.log(queryRes);
        if (queryRes.length) {
            //如果能查到数据，说明该用户名已经被占用，不可再注册
            console.log('该用户名已经被占用');
            resObj = customRes(1, '该用户名已经被占用');
        } else {
            //如果没查到数据，则进行注册操作
            console.log('用户名合法，开始注册');
            //将密码进行md5加密
            var password_md5 = utility.md5(password);
            console.log(password, password_md5);
            if (username === admin) {
                //超级管理员用户
                var writeRes = await databaseOp(`insert into userinfo values ('${username}','${password_md5}',1,1)`);
            } else {
                //普通用户
                var writeRes1 = await databaseOp(`insert into userinfo values ('${username}','${password_md5}',0,0)`);
            }
            console.log('写入数据库操作完成!');
            resObj = customRes(1, '注册成功', username);
        }
    } catch (error) {
        console.log(error);
        resObj = customRes(0, '失败了');
    }
    ctx.response.type = 'json';
    ctx.response.body = resObj;
}

//登录请求
const login = async ctx => {
    var resObj;
    var { username, password } = ctx.request.body;
    username = username.trim();
    console.log(username, password);
    try {
        //检查用户名是否存在
        var queryRes = await databaseOp(`select * from userinfo where username = '${username}'`);
        console.log(queryRes);
        if (queryRes.length) {
            //如果用户名存在，检查密码是否正确
            if (queryRes[0].password === utility.md5(password)) {
                //若正确，登录成功，返回token
                console.log('登录成功');
                const payload = {
                    username,
                    isComment: queryRes[0].isComment,
                    isEdit: queryRes[0].isEdit
                };
                const token = jwt.sign(payload, tokenKey());
                console.log(`这是生成的token:${token}`);
                console.log(`这是token解析出来的:${JSON.stringify(jwt.decode(token))}`);
                resObj = customRes(1, '登陆成功', token);
            } else {
                //密码错误
                resObj = customRes(1, '输入的密码有误');
            }
        } else {
            //没查到数据,用户名不存在
            console.log('用户名不存在');
            resObj = customRes(1, '用户名不存在');
        }
    } catch (error) {
        console.log(error);
        resObj = customRes(0, '失败了');
    }
    ctx.response.type = 'json';
    ctx.response.body = resObj;
}

//路由菜单
router.post('/register', register);
router.post('/login', login);
//加载文章
router.get('/articles/:articleName', articles);

module.exports = (app) => {
    app.use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods())
}
