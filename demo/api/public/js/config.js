module.exports = {
  //本项目所有的配置都在这里
  port: 5000,
  admin:'hwb',
  tokenKey:() => `token_secret${Date.now()}`,

  dataBase: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test1',
  }
}