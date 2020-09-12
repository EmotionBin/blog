
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

----

### 模拟 XSS 攻击

我对 XSS 攻击比较好奇，所以自己写了个 demo 进行试验，下面直接上代码：  

```html
<body>
  <div id="app">
    <input v-model="test" type="text">
    <div class="value">
      <p v-html="test"></p>
    </div>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js"></script>
</body>
```

```javascript
new Vue({
  el:'#app',
  data:{
    test:''
  }
})
```

在本地启动一个服务，打开页面，在输入框中输入 `<img src="x" onerror="alert('xss!')">`，下一秒奇迹就发生了  

![wGSOl6.png](https://s1.ax1x.com/2020/09/10/wGSOl6.png)

弹出了一个 `alert` 弹窗，这说明这个网页执行了输入的代码，只要用户输入了一些可执行的代码，这个网页就会执行，这是非常危险的，这就是 XSS 攻击，试想一下假设有一个留言板系统，如果有人输入一些恶意代码，这些恶意代码就会被记录到留言板上，以后每个用户打开这个留言板页面的时候，都会执行一次这些恶意代码，非常容易导致用户信息泄露，造成一些不必要的损失  

再来看下面一个例子：  

```html
<body>
  <div id="app">
    <input type="text" v-model="test">
    <a :href="test">跳转</a>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js"></script>
</body>
```

```javascript
new Vue({
  el:'#app',
  data:{
    test:''
  }
})
```

在本地启动一个服务，打开页面，在输入框中输入 `javascript:alert('xss!')`，点击 “跳转”，同样的页面也显示了一个 `alert` 弹窗  

----

### 如何预防 XSS

**对特殊字符进行转义**

将前端输出的数据都进行转义，对特殊字符如 `<`、`>` 转义，就可以从根本上防止这一问题，来看下面的例子:  

```html
<body>
  <div id="app">
    <input v-model="test" type="text">
    <div class="value">
      <p v-html="encodedCode"></p>
    </div>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js"></script>
</body>
```

```javascript
new Vue({
  el:'#app',
  data:{
    test:''
  },
  computed: {
    encodedCode(){
      return encodeURI(this.test)
    }
  },
})
```

这个例子还是引用上面 XSS 攻击的例子，只是多了一个计算属性 `encodedCode` 来对要输出的数据进行转义  

进行测试，输入 `<img src="x" onerror="alert('xss!')">`，什么都没有发生  

![waPhr9.png](https://s1.ax1x.com/2020/09/12/waPhr9.png)  

**对 javascript:xxx 特殊字符进行过滤**

若某些标签的 `href`、`scr` 属性中包含 `javascript:xxx`，也会造成安全隐患，所以应该进行过滤  

```html
<body>
  <div id="app">
    <input type="text" v-model="test">
    <a :href="encodedCode">跳转</a>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js"></script>
</body>
```

```javascript
new Vue({
  el:'#app',
  data:{
    test:''
  },
  computed: {
    encodedCode(){
      return this.test.toLowerCase().indexOf('javascript:') > -1 ? '' : encodeURI(this.test);
    }
  },
})
```

这个例子还是引用上面 XSS 攻击的例子，对输入的 `javascript:` 进行了过滤，注意这里要进行大小写转换  

进行测试，`javascript:alert('xss!')`，点击 “跳转”，页面被刷新了，没有出现异常情况  

----

## CSRF

CSRF(Cross Site Request Forgery)，即跨站请求伪造，是一种常见的Web攻击，通过伪装来自受信任用户的请求来利用受信任的网站，可以这么理解，攻击者盗用了用户的身份信息，伪装成用户，以用户的名义向第三方网站发送恶意请求，看下面的图片：  

![wa0dts.png](https://s1.ax1x.com/2020/09/12/wa0dts.png)  

**如何防止 CSRF**

1. 加入验证码，在用户提交关键请求(如转账)前，强制用户输入验证码
2. 使用 token，登录成功后前端存储 token，在提交请求时带上这个 token，后端对 token 进行验证

关于第二点，为什么使用 token 而不使用 cookie，**因为浏览器发送请求的时候不会自动带上 token，而cookie在浏览器发送请求的时候会被自动带上**，CSRF 就是利用的这一特性，所以 token 可以防范 CSRF，而 cookie 不能  

----

## SQL 注入

SQL 注入也是一种比较常见的网络攻击方式之一，多见于登录场景，在登陆时通过 SQL 注入实现无账号登录，甚至篡改数据等，这是非常危险的行为  

举个简单的例子，下面是后端的 SQL 语句，两个变量 `username`、`password` 是用户登录时传过来的用户名和密码  

```javascript
`select * from userinfo where username = '${username}' and password = '${password}'`
```

假设用户输入的用户名为 `' or 1 = 1 --`，密码为空，这个 SQL 语句这时候就变成了这样：  

```javascript
`select * from userinfo where username = '' or 1 = 1 --' and password = ''`
```

`--` 在 SQL 语句中表示注释，它后面的代码会被忽略，所以这个 SQL 语句总是会成功的，这就实现了无账号登录  

**如何防止 SQL 注入**

1. 输入的时候对有关 SQL 语句的关键字进行排查，如 `select`、`update`、`drop` 等，只要检测到用户输入了就进行提示而且不发送请求
2. 后端校验，先验证用户名，如果能在数据库中查到用户名，再进行密码校验，密码一致则说明登录成功

----

## 前端加密是否有意义



