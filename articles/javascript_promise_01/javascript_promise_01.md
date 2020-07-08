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
	(2)错误需要通过回调函数捕获，如果不设置回调函数，Promise内部抛出的错误
	(3)当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
6.实践
	(1)手写promise
		a.https://www.jianshu.com/p/c633a22f9e8c
		b.https://www.jianshu.com/p/1eea8ce8c7a5
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

## Promise各种常用API的使用

### Promise.prototype.then()

`Promise` 的 `then` 方法是定义在原型对象 `Promise.prototype` 上的， `then` 方法的第一个参数是 `resolved` 状态的回调函数，第二个参数（可选）是 `rejected` 状态的回调函数  

`then` 方法返回的是一个新的 `Promise` 实例（注意，不是原来那个 `Promise` 实例）。因此可以采用链式写法，即 `then` 方法后面再调用另一个 `then` 方法  

```javascript
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

采用链式的 `then` ，可以指定一组按照次序调用的回调函数，这对异步嵌套是很友好的，有效的解决了回调地狱的问题  

```javascript
getData('/test').then(res => {
  console.log('res: ', res);
  return getData(res.a);
}).then(res1 => {
  console.log('res1: ', res1);
  return getData(res1.b);
}).then(
  res2 => console.log('res2: ', res2),
  err => console.log('err: ', err)
);
```

----

### Promise.prototype.catch()

`Promise.prototype.catch()` 方法用于指定发生错误时的回调函数  

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

上面代码中， `getJSON()` 方法返回一个 `Promise` 对象，如果该对象状态变为 `resolved` ，则会调用 `then()` 方法指定的回调函数；如果异步操作抛出错误，状态就会变为 `rejected`，就会调用 `catch()` 方法指定的回调函数，处理这个错误。另外，`then()` 方法指定的回调函数，如果运行中抛出错误，也会被 `catch()` 方法捕获  

其实 `Promise.prototype.catch()` 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名  

```javascript
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
```

`Promise` 中 `reject()` 方法的作用，等同于抛出错误  

```javascript
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```

如果 `Promise` 状态已经变成 `resolved`，再抛出错误是无效的，不会被捕获，等于没有抛出。因为 `Promise` 的状态一旦改变，就永久保持该状态，不会再变了  

```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

`Promise` 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 `catch` 语句捕获  

```javascript
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

一般来说，不要在 `then()` 方法里面定义 `reject` 状态的回调函数（即 `then` 的第二个参数），总是使用 `catch` 方法  

```javascript
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，因此，建议总是使用 `catch()` 方法，而不使用 `then()` 方法的第二个参数  

如果没有使用 `catch()` 方法指定错误处理的回调函数，`Promise` 对象抛出的错误不会传递到外层代码，即不会有任何反应  

```javascript
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

上面代码中，`someAsyncThing()` 函数产生的 `Promise` 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示 `ReferenceError: x is not defined` ，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说， **Promise 内部的错误不会影响到 Promise 外部的代码**，通俗的说法就是“ `Promise` 会吃掉错误”  

----

### Promise.prototype.finally()

`finally()` 方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的  

下面是一个例子，服务器使用 `Promise` 处理请求，然后使用 `finally` 方法关掉服务器  

```javascript
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```

`finally` 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 `Promise` 状态到底是 `fulfilled` 还是 `rejected`。这表明，`finally` 方法里面的操作，应该是与状态无关的，不依赖于 `Promise` 的执行结果  

其实 `finally` 本质上是 `then` 方法的特例  

```javascript
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

上面代码中，如果不使用 `finally` 方法，同样的语句需要为成功和失败两种情况各写一次。有了 `finally` 方法，则只需要写一次  

它的实现也很简单，下面来手写一个 `finally` 方法  

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

----

### Promise.all()

`Promise.all()` 方法用于将多个 `Promise` 实例，包装成一个新的 `Promise` 实例  

```javascript
const p = Promise.all([p1, p2, p3]);
```

上面代码中，`Promise.all()` 方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 `Promise` 实例，如果不是，就会先调用 `Promise.resolve` 方法，将参数转为 `Promise` 实例，再进一步处理。另外，`Promise.all()` 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 `Promise` 实例  

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况:  

1. 只有`p1`、`p2`、`p3`的状态都变成 `fulfilled`，`p` 的状态才会变成 `fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数  
2. 只要`p1`、`p2`、`p3`之中有一个被 `rejected`，`p`的状态就变成 `rejected` ，此时第一个被 `reject` 的实例的返回值，会传递给`p`的回调函数  

下面是一个具体的例子  

```javascript
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

上面代码中，`promises` 是包含 6 个 `Promise` 实例的数组，只有这 6 个实例的状态都变成 `fulfilled` ，或者其中有一个变为 `rejected`，才会调用 `Promise.all` 方法后面的回调函数  

**注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法**  

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```

上面代码中，`p1`会 `resolved`，`p2`首先会 `rejected`，但是`p2`有自己的 `catch` 方法，该方法返回的是一个新的 `Promise` 实例，`p2`指向的实际上是这个实例。该实例执行完 `catch` 方法后，也会变成 `resolved`，导致 `Promise.all()` 方法参数里面的两个实例都会 `resolved`，因此会调用 `then` 方法指定的回调函数，而不会调用 `catch` 方法指定的回调函数  

如果`p2`没有自己的 `catch` 方法，就会调用 `Promise.all()` 的 `catch` 方法  

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// Error: 报错了
```

----

### Promise.race()

`Promise.race()` 方法同样是将多个 `Promise` 实例，包装成一个新的 `Promise` 实例  

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 `Promise` 实例的返回值，就传递给`p`的回调函数  

`Promise.race()` 方法的参数与 `Promise.all()` 方法一样，如果不是 `Promise` 实例，就会先调用 `Promise.resolve()` 方法，将参数转为 `Promise` 实例，再进一步处理  

下面是一个例子，如果指定时间内没有获得结果，就将 `Promise` 的状态变为 `reject`，否则变为`resolve`  

```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

----

## Promise的注意事项

1. Promise 的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态
2. Promise 状态的不可逆性，一旦状态改变，就不会再变，任何时候都可以得到这个结果
3. 无法取消 Promise，一旦新建它就会立即执行，无法中途取消
4. 错误需要通过回调函数捕获，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
5. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

----

## 实践

### 手写Promise








