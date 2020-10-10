参考
1. https://juejin.im/post/6844903708938108935
2. https://juejin.im/post/6844904102544031757
3. https://www.jianshu.com/p/6fc9cea6daa2
4. https://www.jianshu.com/p/bd1be47a16c1
5. http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html


# 彻底弄懂cookie、session、token、webstorage

本文要讲述的主要就是 cookie、session、token、webstorage 这四兄弟之间的关系与区别，他们都是我们前端攻城狮经常接触的，特别是关于鉴权、用户信息这一方面  

----

# cookie

cookie 指某些网站为了辨别用户身份而储存在用户浏览器上的数据(通常经过加密)，以便于用户再次访问时候对用户进行身份校验  

HTTP 是一种无状态传输协议，它不能以状态来区分和管理请求和响应。也就是说，服务器接收到了一个 HTTP 请求时，服务器并不知道这个请求是谁发来的，假如现在有三个人，A、B、C，他们的编号分别为1、2、3，这三个人向服务器发送请求时，把自己的编号带过去，服务器就可以知道请求是谁发来的了。cookie 也是一样的道理，cookie 中存储用户的信息，在发送请求时把 cookie 存储的用户信息带到服务器，服务器就可以根据带过来的用户信息来区分请求来自哪个用户了  

服务器通过 response 的 `set-cookie` 字段告诉客户端去写入 cookie，后面的请求都会携带该 cookie  

![0ydcC9.png](https://s1.ax1x.com/2020/10/10/0ydcC9.png)

cookie有以下重要参数  

![0y0AWd.png](https://s1.ax1x.com/2020/10/10/0y0AWd.png)

除了以上参数外，cookie 还新增了一个参数 `SameSite`，用来防止 CSRF 攻击和用户追踪  

CSRF 可以看我之前的文章，这里就不多说了，这里引用阮一峰老师的文章解释一下 cookie 实现用户追踪的原理  

比如，Facebook 在第三方网站插入一张看不见的图片  

```html
<img src="facebook.com" style="visibility:hidden;">
```

浏览器加载上面代码时，就会向 Facebook 发出带有 cookie 的请求，从而 Facebook 就会知道你是谁，访问了什么网站  

cookie 的 SameSite 属性用来限制第三方 cookie，从而减少安全风险，它有三个值 Strict、Lax、None  

- Strict，最为严格，完全禁止第三方 cookie，跨站点时，任何情况下都不会发送 cookie。换言之，只有当前网页的 url 与请求目标一致，才会带上 cookie
- Lax，规则稍稍放宽，大多数情况也是不发送第三方 cookie，但是导航到目标网址的 get 请求除外
- None，





