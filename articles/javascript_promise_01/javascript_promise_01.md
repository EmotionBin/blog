# 浅谈Promise

草稿
1.promise是什么
2.promise有什么作用
	(1)promise解决了什么问题
	(2)promise的使用方法
3.promise的各种API
4.使用promise的一些注意事项
	(1)不可取消
	(2)Promise在初始化时，传入的函数是同步执行的，异步提现在 then 回调
5.promise优缺点总结
	优点:
	(1)对象的状态不受外界影响
	(2)一旦状态改变，就不会再变
	缺点:
	(1)无法取消
	(2)如果不设置回调函数，Promise内部抛出的错误
	(3)当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
6.实践
	(1)手写promise
	(2)一些关于promise的面试题



# 浅谈Promise

`Promise` 是异步编程的一种解决方案，ES6 将其写进了语言标准，统一了用法，原生提供了 `Promise` 对象。`Promise` 的出现对于异步变成有了很大的遍历，掌握好 `Promise` 将会有极大的便利  

----

## Promise是什么

所谓 `Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，`Promise` 是一个对象，从它可以获取异步操作的消息。`Promise` 提供统一的 API，各种异步操作都可以用同样的方法进行处理  

`Promise` 对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。由此可以得出一个结论，**Promise对象的状态不受外界影响**  

`Promise`对象的状态改变，只有两种可能：

1. 从 `pending` 变为 `fulfilled(resolved)`  
2. 从 `pending` 变为 `rejected`  

只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。**一旦Promise状态改变，就不会再变，任何时候都可以得到这个结果**  

----

## Promise基本用法

```javascript
const promise = new Promise((resolve, reject) => {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject`

`resolve` 函数的作用是，将 `Promise` 对象的状态从“未完成”变为“成功”（即从 `pending` 变为 `resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去； `reject` 函数的作用是，将 `Promise` 对象的状态从“未完成”变为“失败”（即从 `pending` 变为 `rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去  

`Promise` 实例生成以后，可以用 `then` 方法分别指定 `resolved` 状态和 `rejected` 状态的回调函数  

```javascript
promise.then(function(value) {
  // success
  console.log(value);
}, function(error) {
  // failure
  console.log(error);
});
```

`then` 方法可以接受两个回调函数作为参数。第一个回调函数是 `Promise` 对象的状态变为 `resolved` 时调用，第二个回调函数是 `Promise` 对象的状态变为 `rejected` 时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受 `Promise` 对象传出的值作为参数  

**注意，Promise 新建后就会立即执行，在Promise中的函数是同步执行的，它的异步体现在then方法中**  

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

上面的代码中，一旦创建了 `Promise` 对象就会立即执行它里面的内容，输出`Promise`，因为 `then` 方法是异步的，是微任务，要等到本轮事件循环中的所有同步任务执行完毕后才会执行，所以输出 `Hi!` 之后再输出 `resolved`  

**注意，调用resolve或reject并不会终结 Promise 的参数函数的执行**  

```javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});

// 2
// 1
```

对于上面的代码， 虽然 `console.log` 在 `resolve` 的后面，但是它依然会执行，先输出2再输出1，原理同上。但是不建议使用这种写法，因为一般来说，调用 `resolve` 或 `reject` 以后， `Promise` 的使命就完成了，后继操作应该放到 `then` 方法里面，而不应该直接写在 `resolve` 或 `reject` 的后面。所以，最好在它们前面加上 `return` 语句，这样就不会有意外  

```javascript
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
});
```

----

## Promise各种API的使用




