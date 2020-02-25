//这里重写ajax请求，配置全局的请求拦截，方便控制权限
import jquery from 'jquery';

(function ($) {
  //备份jquery的ajax方法  
  var _ajax = $.ajax;

  //重写jquery的ajax方法  
  $.ajax = function (opt) {
    //备份opt中error和success方法  
    var fn = {
      error: function (XMLHttpRequest, textStatus, errorThrown) { },
      success: function (data, textStatus) { },
      beforeSend: function (XMLHttpRequest) {
        if (opt.authority) {
          let userToken = sessionStorage.getItem('userToken');
          console.log(opt.authority, userToken);
          if (userToken !== null) {
            //如果sessionStorage中的token不为空，则在请求头中加上User-Token参数
            XMLHttpRequest.setRequestHeader("User-Token", userToken);
          } else {
            //如果sessionStorage中的token为空，则说明没有登录
            console.log('请登录');
            //强制终止，不发送请求
            XMLHttpRequest.abort();
            //跳转至登录界面
            window.location.replace(`${window.location.origin}/login`);
          }
        }
      },
    }
    if (opt.error) {
      fn.error = opt.error;
    }
    if (opt.success) {
      fn.success = opt.success;
    }

    //扩展增强处理  
    var _opt = $.extend(opt, {
      beforeSend: function (XMLHttpRequest) {
        fn.beforeSend(XMLHttpRequest);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        //错误方法增强处理  

        fn.error(XMLHttpRequest, textStatus, errorThrown);
      },
      success: function (data, textStatus) {
        //成功回调方法增强处理  

        fn.success(data, textStatus);
      }
    });
    return _ajax(_opt);
  };
})(jquery);