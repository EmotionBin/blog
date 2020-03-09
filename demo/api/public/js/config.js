//本项目所有的配置都在这里

module.exports = {
  //运行端口号
  port: 5000,
  //管理员账户
  admin:'hwb',
  //自定义的token关键字
  tokenKey:() => `token_secret${Date.now()}`,

  //数据库配置
  dataBase: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test1',
  }
}