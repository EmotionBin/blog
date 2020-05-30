
# 关于跨域问题与解决方案

跨域问题一般在前后端分离的模式下比较常见，因为前端页面和后端服务往往部署在不同的域名下，在此过程中一个重要的问题就是跨域资源访问的问题，通常由于同域安全策略浏览器会拦截`JavaScript`脚本的跨域网络请求，这也就造成了系统上线时前端无法访问后端资源这一问题。

----

## 跨域问题原因

产生跨域问题的根本原因就是浏览器同源策略。

----

### 浏览器同源策略
1995年，同源政策由Netscape公司引入浏览器。目前，所有浏览器都实行这个政策。**所谓同源是指:协议、域名、端口相同。**  

来看一些例子，这里引用了阮一峰老师的例子：  

举例来说，http://www.example.com/dir/page.html 这个网址，协议是http://，域名是www.example.com ，端口是80（默认端口可以省略），它的同源情况如下。
- http://www.example.com/dir2/other.html ： 同源
- http://example.com/dir/other.html ： 不同源（域名不同）
- http://v2.www.example.com/dir/other.html ： 不同源（域名不同）
- http://www.example.com:81/dir/other.html ： 不同源（端口不同）
- https://www.example.com/dir/page.html ： 不同源（协议不同）

当我们开发好我们的网页，在部署之后发现，网页上很多资源都是要通过发送AJAX请求向服务器索要资源，但是在前后端分离的系统架构中，前端页面和后端服务往往不会部署在同一域名之下。比如用户通过浏览器访问 www.test001.com 这一地址，来到了系统首页，此时浏览器从网站服务器中只取回了基本的`HTML`页面以及`CSS`样式表文件和`JavaScript`脚本。系统首页的其他内容，比如轮播图、文章列表等，需要利用`JavaScript`脚本程序，向地址为  www.test002.com 的后端应用服务器发送请求来获取信息。此时由于浏览器的同源策略，该请求会被浏览器所拦截，这就造成了前后端数据不通这一结果。

![GN15Yn.png](https://s1.ax1x.com/2020/04/03/GN15Yn.png)

----

### 同源政策的目的

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。    

设想这样一种情况：A 网站是一家银行，用户登录以后，A 网站在用户的机器上设置了一个 `Cookie`，包含了一些隐私信息（比如存款总额）。用户离开 A 网站以后，又去访问 B 网站，如果没有同源限制，B 网站可以读取 A 网站的 `Cookie`，那么隐私信息就会泄漏。更可怕的是，`Cookie` 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。**因为浏览器同时还规定，提交表单不受同源政策的限制。**由此可见，同源政策是必需的，否则 `Cookie` 可以共享，互联网就毫无安全可言了。    

**同源策略是浏览器的行为**，是为了保护本地数据不被`JavaScript`代码获取回来的数据污染，因此拦截的是客户端发出的请求回来的数据接收，即请求发送了，服务器响应了，但是无法被浏览器接收。  

----

### 同源策略的限制范围
随着互联网的发展，同源政策越来越严格。目前，如果非同源，共有三种行为受到限制。

- 无法读取非同源网页的 `Cookie`、`LocalStorage` 和 `IndexedDB`
- 无法接触非同源网页的 `DOM`
- 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）

这里注意一下，**用a标签的download属性实现下载功能的时候也会受到浏览器同源策略的约束**，也就是说如果你想通过a标签下载一个非同源的url的资源，那么`download`属性会失效。另外，通过 `JavaScript` 脚本可以拿到其他窗口的`Window`对象。

----

## 解决方案

### 前端解决方案 

#### 反向代理

因为由于浏览器的同源策略，`JavaScript`脚本程序只能向同一域名下的服务器发送网络请求，那么可以通过网页服务器转发这一网络请求到相应的后端服务器，获取相关数据，然后网页服务器再把这一数据返回给浏览器。这一过程称之为反向代理。  

假设用户通过地址www.test001.com 访问到了系统首页，该系统首页中所加载的`JavaScript`脚步程序本应该要发送AJAX请求到www.test002.com/api/article… 这一地址，来获取首页文章列表信息。此时应该改成向www.test001.com/api/article… 这一与之同源的地址发送数据请求。该系统的网页服务器会收到此请求，然后代替`JavaScript`脚本程序向www.test002.com/api/article… 这一地址请求数据，获取数据后将之返回给浏览器。此时`JavaScript`脚本程序就通过网页服务器这一桥梁成功获取到了后端应用服务器上的数据。

![GN374A.png](https://s1.ax1x.com/2020/04/03/GN374A.png)

----

#### JSONP跨域

浏览器的同源策略对`JavaScript`脚本向不同域的服务器请求数据进行了限制，但是没有对`HTML`中的`script`标签进行限制，我们可以基于此规则，动态创建`script`标签进行跨域资源访问。`script`标签中`src`这一属性值设置为：接口地址+处理数据的回调函数名称。相关代码示例如下：

```javascript
<script>
    var script = document.createElement('script');
    script.type = 'text/javascript';
	// 设置接口地址+数据获取成功后的回调函数（handleData）
    script.src = 'http://www.test002.com/api/articleList&callback=handleData';
    document.body.appendChild(script);
    // 回调执行函数
    function handleData(res) {
        data = JSON.stringify(res)
        console.log(data);
    }
</script>
```

在这里值得注意的是，因为请求数据的接口地址是写在了`script`标签中`src`这一属性值里面，那么数据请求的方式就只能支持`GET`请求，其他请求无法实现。在基于Vue.js这种框架开发的项目中，因为其使用了虚拟化`DOM`这一概念，JSONP跨域的方式对其并不是一个很好的选择，对于原生`JavaScript`代码，可以采用此方式进行跨域。

----

### 后端解决方案 

#### 跨域资源共享(CORS) 

跨域资源共享(CORS) 是一种机制，它使用额外的 `HTTP` 头来告诉浏览器 让运行在一个`origin (domain)`上的Web应用被准许访问来自不同源服务器上的指定的资源。  

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个**Origin**字段，用来说明，本次请求来自哪个域(协议 + 域名 + 端口)。服务器根据这个值，决定是否同意这次请求。如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的 `HTTP` 回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段（详见下文），就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。注意，这种错误无法通过状态码识别，因为 `HTTP` 回应的状态码有可能是200。

出于安全原因，浏览器限制从脚本内发起的跨源`HTTP`请求。 例如，`XMLHttpRequest`和`Fetch` API遵循同源策略。 这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求`HTTP`资源，**除非响应报文包含了正确CORS响应头！** 所以要想实现跨域资源访问，这也就要求后端服务程序，应该[根据CORS策略来配置好相应的HTTP响应头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 。  

```javascript
Access-Control-Allow-Origin: *
```

表示该资源可以被任意外域访问。  

如果服务端仅允许来自 http://test001.com 的访问，该首部字段的内容如下：

```javascript
Access-Control-Allow-Origin: http://test001.com
```

----

## 结束语

以上就是关于跨域问题的一些理解，其实解决跨域问题的办法各有优劣，比如Jsonp方式虽然对浏览器的兼容性相对较好，但是只支持GET请求方式，反向代理的方式无需改动后端代码，但是对于整个系统而言可移植性较差，CORS方式需要后端来积极配合前端实现跨域。总之，需要根据情况来选择解决办法，具体情况具体分析。如果本文中有说的不正确的地方，欢迎大佬鞭策!

**参考资料：**

[阮一峰-同源策略](https://javascript.ruanyifeng.com/bom/same-origin.html)  
[阮一峰-CORS通信](https://javascript.ruanyifeng.com/bom/cors.html)       
[掘金-你所需要的跨域问题的全套解决方案都在这里啦！（前后端都有）](https://juejin.im/post/5e8158e1e51d45470d5269af)
