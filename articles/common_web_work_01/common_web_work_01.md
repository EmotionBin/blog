
1. 是什么，解决了什么问题
2. Web Worker 使用
 (1)创建
 (2)通信
 (3)终止
 (4)错误处理

参考：
1. https://juejin.cn/post/6844903496550989837
2. http://www.ruanyifeng.com/blog/2018/07/web-worker.html


# Web Worker

Web Worker 是 HTML5 标准的一部分，本文就来研究一些关于它的新特性  

----

## Web Worker 是什么

JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。  

Web Worker 是 HTML5 标准的一部分，它允许一段JavaScript程序运行在主线程之外的另外一个线程中。  

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。  

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。  

----

## Web Worker 怎样使用

Web Worker 有以下几个使用注意点：  

**（1）同源限制**  

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。  

**（2）DOM 限制**  

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用 `document`、`window`、`parent` 这些对象。但是，Worker 线程可以使用 `navigator` 对象和 `location` 对象。  

**（3）通信联系**  

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

**（4）脚本限制**  

Worker 线程不能执行 `alert()` 方法和 `confirm()` 方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。  

**（5）文件限制**  

Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。  

----

### 创建 Web Worker

只需调用 `Worker()` 构造函数并传入一个要在 worker 线程内运行的脚本的 URI，即可创建一个新的 worker。  

```javascript
// worker.js 是本地的一个 js 文件
const myWorker = new Worker("worker.js")
```

另外，通过 `URL.createObjectURL()` 创建 URL 对象，可以实现创建内嵌的 worker。  

```javascript
const worker = `
  onmessage = function (e) {
    console.log('我是 worker', e)
  }
`

const blob = new Blob([worker])
const myWorker = new Worker(window.URL.createObjectURL(blob))
```

这两种创建 Web Worker 的方法效果是一样的，可以自行进行选择。  

Worker 线程的创建是异步的，主线程代码不会阻塞在这里等待 worker 线程去加载、执行指定的脚本文件，而是会立即向下继续执行后面代码。  

----

### Web Worker 通信

Web Worker 与其主页面之间的通信是通过 onmessage 事件和 `postMessage()` 方法实现的。  

使用构造时传入本地文件创建 worker。

```javascript
const myWorker = new Worker("worker.js")

myWorker.onmessage = function (e) {
  const { data } = e
  console.log('我是页面，我收到了web worker发来的消息', data)
}

const message = '这是页面发送的消息'
myWorker.postMessage(message)
```

```javascript
// worker.js
onmessage = function (e) {
  const { data } = e
  console.log('我是worker，我收到了页面发来的消息: ', data)
  const message = '这是worker发送的消息'
  postMessage(message)
}
```

使用 `URL.createObjectURL()` 创建内嵌的 worker。  

```javascript
const worker = `
  onmessage = function (e) {
    const { data } = e
    console.log('我是worker，我收到了页面发来的消息: ', data)
    const message = '这是worker发送的消息'
    postMessage(message)
  }
`

const blob = new Blob([worker])
const myWorker = new Worker(window.URL.createObjectURL(blob))

myWorker.onmessage = function (e) {
  const { data } = e
  console.log('我是页面，我收到了web worker发来的消息', data)
}

const message = '这是页面发送的消息'
myWorker.postMessage(message)
```
