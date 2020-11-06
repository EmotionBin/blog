# 第三方登录与单点登录

本文来讨论一下**第三方登录**与**单点登录**的实现  

## 第三方登录

第三方登录是借用第三方的登录系统，完成登录的操作，这里的第三方一定是权威的、可信任的机构，看下面这张图就知道什么是第三方登录了  

![BWAAN4.png](https://s1.ax1x.com/2020/11/05/BWAAN4.png)  

话不多说，直接来看我自己写的一个 demo  

页面很简单，就是一个登录页面  

![BhtFaD.png](https://s1.ax1x.com/2020/11/06/BhtFaD.png)  

这个页面有两个按钮，登录按钮就是普通的登录，重点关注第三方登录这个按钮  

这个第三方登录按钮点击后发生了什么，看完下面的代码就知道了  

```javascript
// 这里是点击第三方登录按钮的函数
function thirdPartyLogin(){
  const width = 600;
  const height = 600;
  const top = 60;
  const left = 60;
  const redirect_uri = 'http://localhost:9527/success.html';
  this.childWindow = window.open(`http://localhost:9528/index1.html?redirect_uri=${window.encodeURIComponent(redirect_uri)}`, 'test', `width=${width}, height=${height}, top=${top}, left=${left}`);
  // 监听第三方登录页面关闭事件
  this.timer = setInterval(() => {
    if(this.childWindow.closed){
      // 第三方登页面关闭的回调
      clearInterval(this.timer);
      // 拿到access_token
      const access_token = window.localStorage.getItem('access_token');
      // 发送请求获取用户信息
      this.getUserInfo(access_token);
    }
  }, 500);
},
```

点击之后会打开一个新的页面，这个新的页面是第三方自己的，**并且利用轮询来监听这个页面的关闭事件，在关闭后执行获取用户信息的回调**，这个后面会说  

![Bht8iQ.png](https://s1.ax1x.com/2020/11/06/Bht8iQ.png)  

注意观察这两个页面，他们的 url 地址的域名部分是不一样的，都是各自的域名，并且第三方登录页面会有一个参数 `redirect_uri`，这个参数的地址是登录成功后的回调地址，注意，这个回调地址需要经过编码    

在这个页面中输入账号密码，点击登录，服务器校验，若校验通过，则登录成功，**服务器返回一个临时票据 `code`，这时候这个页面会带着这个 `code` 参数重定向到之前的 `redirect_uri` 的页面**  

![BhUM4g.png](https://s1.ax1x.com/2020/11/06/BhUM4g.png)  

注意看这里的域名，又回到了原来的域名，这个页面是特意为第三方登录成功后而准备的，**拿到这个 `code` 后，带着这个 `code` 向服务器请求真正的 `access_token`**，拿到真正的 `access_token` 后存入 localStorage 中，然后这个页面会在 3 秒后关闭  

还记得最开始的那个登录页面吗，之前是用轮询的方式监听第三方登录页面的关闭状态，关闭后，从 localStorage 中读取 `access_token`，再带着 `access_token` 向服务器请求用户的信息，服务器校验 `access_token`，若校验通过，则成功获取到用户信息，整个第三方登录流程完成  

![BhaLO1.png](https://s1.ax1x.com/2020/11/06/BhaLO1.png)  

看到这里可能会有两点疑问  

Q:为什么需要回调地址 `redirect_uri` 并拼接参数，而不是直接服务器返回信息?  

A:如果不用回调地址，服务器直接返回信息，有可能会被截获，导致一系列不可预知的后果，若通过回调地址并拼接上参数则相对安全，因为这个回调地址是事先定义好的，也就是说这个地址一定是我们这边自己的地址，不会是黑客的钓鱼网站，这样就保证了登录成功后我们能从页面的参数中拿到必要信息  

Q:为什么先拿到一个临时票据，再用临时票据换取真实凭证，而不是直接拿到真实凭证?  

A:因为拿到的第一个票据是需要拼接在回调地址的参数上的，这是可以在页面地址 URL 直接暴露出来的，如果这时候直接给真实的凭证，则真实凭证就会被暴露出来，有可能被黑客利用，所以需要先返回一个临时的票据，客户端再通过这个临时的票据去获取真正的凭证  

我写的这个 demo 会发布在我的 github 上，看详细的实现过程可以点击这里 [传送门](https://github.com/EmotionBin/various-demo/tree/master/third-party-login)  

----

## 单点登录

单点登录即 Single Sign On，简称 **SSO**，简单来说，单点登录就是**在多个系统中，用户只需一次登录，各个系统即可感知该用户已经登录**  

单点登录可能会遇到同域或者跨域的情况，这里主要讲解下面 3 个方面  

1. 同域名下的单点登录(域名一致，端口可以不一致)  
2. 不同域名下的单点登录(借助 SSO 登录系统)  
3. 不同域名下的单点登录(借助 iframe 实现 localStorage 跨域共享)  

### 同域名下的单点登录





