
1. XSS攻击
2. CSRF
3. sql注入(万能密码)
4. 前端加密是否有意义

参考:
1. https://www.jianshu.com/p/f8e47a132e1c
2. https://segmentfault.com/a/1190000006672214
3. https://tech.meituan.com/2018/09/27/fe-security.html
4. https://www.cnblogs.com/Renyi-Fan/p/9951407.html


# web 前端安全

随着互联网的高速发展，信息安全越来越备受大家关注，大多数网站从早期的 HTTP 已经升级到了 HTTPS，可见安全这个概念的重要性，本文就来探讨一下关于 web 前端的安全问题  

## XSS攻击

XSS 攻击全称跨站脚本攻击(Cross Site Script)，是为了不和层叠样式表 CSS(Cascading Style Sheets) 的混淆，故将跨站脚本攻击缩写为 XSS，XSS 是一种在 web 应用中的计算机安全漏洞，它允许恶意 web 用户将代码植入到提供给其它用户使用的页面中  
