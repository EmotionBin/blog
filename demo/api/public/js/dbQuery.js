//这个文件封装所有涉及到数据库的操作

const mysql = require('mysql');

//引入配置文件配置项
const config = require('./config.js');

const queryOp = async querySql => {
    //初始化数据库
    const connection = mysql.createConnection(config.dataBase);
    await connection.connect();
    return new Promise((resolve,reject) => {
        connection.query(querySql, (error, results) => {
            if (error) {
                reject(error);
            }
            //关闭连接
            connection.end();
            resolve(results);
        });
    })   
}

module.exports = queryOp;