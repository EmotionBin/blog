//这个文件自己封装基于Promise的读写文件的异步操作
const fs = require('fs');

module.exports = (filePath) => {
  return new Promise((resolve,reject) => {
    fs.readFile(filePath,'utf-8',(err,data) => {
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    }) 
  })
}

