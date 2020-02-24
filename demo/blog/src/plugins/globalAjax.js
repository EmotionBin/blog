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
      success: function (data, textStatus) { }
    }
    if (opt.error) {
      fn.error = opt.error;
    }
    if (opt.success) {
      fn.success = opt.success;
    }

    //扩展增强处理  
    var _opt = $.extend(opt, {
      //拓展请求头，自动带上参数
      headers: {
        'User-Token': 'testToken'
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