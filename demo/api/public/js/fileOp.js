//这里封装基于Promise的保存文件操作
const fs = require('fs');

// 创建文件目录
const mkdirFile = (path) => {
    // console.log(path);
    if (!fs.existsSync(path)) {
        //路径不存在则新建文件夹
        fs.mkdirSync(path, err => {
            if(err){
                console.log('创建文件夹失败');
                throw err;
            }
        });
    }
}

//读取文件
const readFile  = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

//保存文件
const saveFile = (file, path) => {
  return new Promise((resolve, reject) => {
    let render = fs.createReadStream(file, {
        encoding: 'utf8'
    });
    // 创建写入流
    let upStream = fs.createWriteStream(path, {
        encoding: 'utf8'
    });
    render.pipe(upStream);
    upStream.on('finish', () => {
        resolve(path);
    });
    upStream.on('error', (err) => {
        reject(err);
    });
  })
}

module.exports = {
    mkdirFile,
    readFile,
    saveFile
};
