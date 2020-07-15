# JS中令人头疼的this指向问题
# 注意，这里为草稿
1.严格模式和非严格模式
2.函数直接调用和new的区别 如F是一个函数 F() 和var f = new F()区别
3.call apply bind
4.箭头函数


# 令人头疼的this

`this` 指向问题真的很令人头大，本文就来讨论一下关于 `this` 指向的问题  

----

## 绑定规则

### 默认绑定

```javascript
var a = 1;

function foo() {
  console.log(this.a);
};

function bar() {
  "use strict";
  console.log(this.a);
};

foo(); //1，非严格模式下，this 指向全局对象 Window，这里相当于 Window.a，输出1

bar();// Uncaught TypeError: Cannot read property 'a' of undefined，严格模式下，this 会绑定到 undefined，尝试从 undefined 读取属性会报错
```

默认绑定的规则为：**非严格模式下，this 指向全局对象，严格模式下，this 会绑定到 undefined**  

----

### 隐式绑定

**如果函数在调用位置有上下文对象，this 就会隐式地绑定到这个对象上**  

```javascript
var a  = 1;

function foo() {
  console.log(this.a);
};

var obj = {
  a: 2,
  foo: foo, // <-- foo 的调用位置
};

obj.foo(); // 2，foo 在调用位置有上下文对象 obj，this 会隐式地绑定到 obj，this.a 相当于 obj.a
```

调用的时候是通过 `obj.foo()` 调用的，所以 `foo()` 中的 `this` 指向对象 `obj`  

```javascript
var a = 1;

function foo() {
  console.log(this.a);
};

var obj = {
  a: 2,
  foo: foo,
};

var bar = obj.foo;

bar();// 1，赋值并不会改变引用本身，使用函数别名调用时，bar 虽然是 obj.foo 的一个引用，但是实际上引用的还是 foo 函数本身，所以这里隐式绑定并没有生效， this 应用的是默认绑定
```

这里把 `foo` 函数赋值给了另外一个变量 `bar`，`bar` 虽然是 `obj.foo` 的一个引用，但是实际上引用的还是 `foo` 函数本身，是一个**独立的函数**，所以这里的 `this` 是默认绑定    

**一般情况下，谁点出来的就指向谁，this 永远指向最后调用它的那个对象**  

----

### 显示绑定

`call`，`apply`，`bind` 方法可以改变 `this` 指向，调用这些方法的时候就是显示绑定  

#### call

引用MDN的解释:  

> call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
> function.call(thisArg, arg1, arg2, ...)

```javascript
function foo(){
    console.log(this.a);
}
var obj = {
    a : 0
}
var obj1 = {
    a : 1
}

foo.call(obj); // 0
foo.call(obj1); // 1
```

`foo.call(obj)` 显示的把 `this` 绑定到 `obj`，所以调用的时候 `this` 指向 `obj`，`foo.call(obj1)`同理  

----

#### apply

引用MDN的解释:  

> apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数
> func.apply(thisArg, [argsArray])

```javascript
function foo(){
    console.log(this.a);
}
var obj = {
    a : 0
}
var obj1 = {
    a : 1
}

foo.apply(obj); // 0
foo.apply(obj1); // 1
```

原理同上面的 `call`，`apply` 和 `call` 的第一个参数都是想要 `this` 绑定的对象，他们的区别就是后面的传参方式不同  

----

#### bind

引用MDN的解释:  

> bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
> function.bind(thisArg[, arg1[, arg2[, ...]]])

```javascript
function foo() {
  console.log(this.a);
};

var obj = { a: 2 };

var a = 1;

var bar = foo.bind(obj);

bar(); // 2，bar 是通过 bind 返回后的一个硬绑定函数，其内部应用了显式绑定
```

----

#### 小结

使用 `call`，`apply`，`call` 方法可以手动显式的改变 `this` 指向，但是有一点需要注意，**将 null，undefined 作为第一个参数传入 call，apply，bind ，调用时会被忽略，实际应用的是默认绑定规则，即严格模式下，this 为 undefined，非严格模式下为全局对象**

----

### new绑定

#### new()发生了什么



