//这里封装基于Promise的保存文件操作
const fs = require('fs');

//保存文件
const saveFile = (file, path) => {
  console.log('asdasdasd',file, path);
  return new Promise((resolve, reject) => {
      let render = fs.createReadStream(file);
      // 创建写入流
      let upStream = fs.createWriteStream(path);
      render.pipe(upStream);
      upStream.on('finish', () => {
          resolve(path)
      });
      upStream.on('error', (err) => {
          reject(err)
      });
  })
}

module.exports = saveFile;
