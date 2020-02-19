var customRes = (status,data,detail = '') => {
    var obj = {
        status,
        data,
        detail
    };
    return obj
}

module.exports = customRes;