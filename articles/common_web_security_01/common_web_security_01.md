
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

!!!!!模拟`javascript:alert()`，参考 `https://tech.meituan.com/2018/09/27/fe-security.html`

