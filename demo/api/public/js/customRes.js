
//自定义格式的调用接口后返回的对象
var customRes = (status,data,detail = '') => {
    var obj = {
        status,
        data,
        detail
    };
    return obj
}

module.exports = customRes;