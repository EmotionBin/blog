# JS算法练习

## 实现es6模板字符串变量解析

```javascript
//已知
info = {status:'good',emotion:'happy'};
//输入
'today is a ${info.status} day,I am so ${info.emotion}'
//输出
'today is a good day,I am so happy'
```

思路:观察可知，在遇到形如 `${xxx}` 的字符串时，会把中间的内容替换成对应变量，所以可以利用**正则表达式**匹配 `${xxx}` 把匹配到的中间的值当成一个变量解析，并替换 `${xxx}`  

```javascript
const info = {status:'good',emotion:'happy'};
const str = 'today is a ${info.status} day,I am so ${info.emotion}';
const s = str.replace(/\$\{(.*?)\}/g,(matched,key) => eval(key));
console.log(s); // "today is a good day,I am so happy"
```

----

## 实现forEach、map、filter、reduce

**实现forEach**

```javascript
Array.prototype.forEach = function (cb, context) {
  if(typeof cb !== 'function'){
    throw new TypeError(`${cb} is not a function`);
  }
  for(let i = 0;i < this.length;i ++){
    cb.call(context, this[i], i ,this);
  }
}
```

**实现map**

```javascript
Array.prototype.map = function (cb, context) {
  if(typeof cb !== 'function'){
    throw new TypeError(`${cb} is not a function`);
  }
  const result = [];
  for(let i = 0;i < this.length;i ++){
    result.push(cb.call(context, this[i], i ,this));
  }
  return result;
}
```

**实现filter**

```javascript
Array.prototype.filter = function (cb, context) {
  if(typeof cb !== 'function'){
    throw new TypeError(`${cb} is not a function`);
  }
  const result = [];
  for(let i = 0;i < this.length;i ++){
    const flag = !!cb.call(context, this[i], i, this);
    flag && result.push(this[i]);
  }
  return result;
}
```

**实现reduce**

```javascript
Array.prototype.reduce = function (cb, initValue) {
  if(typeof cb !== 'function'){
    throw new TypeError(`${cb} is not a function`);
  }
  if (initValue && typeof initValue !== 'number') {
    throw new TypeError(`'${initValue}' is not a number`);
  }
  let result = initValue || 0;
  for(let i = 0;i < this.length;i ++){
    result = cb(result, this[i], i, this);
  }
  return result;
}
```

关于以上函数的实现，只考虑了一些主要的核心代码，还有一些边界条件是缺少检测的  

----

## 实现indexOf

这是leetCode的一道题，[传送门](https://leetcode-cn.com/problems/implement-strstr/)  

> 28 实现 strStr()  
> 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1

其实这道题用 `indexOf` 就可以解决了，但是这样太无趣，于是我自己手写了一个函数模拟 `indexOf` 的实现，边界条件判断确实有点恶心   

```javascript
function myIndexOf(haystack, needle) {
  if (!needle) {
    return 0;
  }
  if (!haystack || needle.length > haystack.length) {
    return -1;
  }
  for(let i = 0;i < haystack.length;i ++){
    if (i > haystack.length - needle.length ){
      return -1;
    }
    if(haystack[i] === needle[0]){
      if (needle.length === 1){
        return i; 
      }
      for(let j = 1;j < needle.length;j ++){
        if (haystack[i + j] !== needle[j]) {
          break;
        } else if (j === needle.length - 1) {
          return i;
        }
      }
    } else if (i === haystack.length - 1) {
      return -1;
    }
  }
}
```

看到这复杂的边界条件判断，于是我决定进行优化，下面给出了一个优化后的版本  

```javascript
function myIndexOf(haystack, needle) {
  const haystackLength = haystack.length;
  const needleLength = needle.length;
  if (!needle) {
    return 0;
  }
  for (let i = 0; i < haystackLength; i++) {
    if (i > haystackLength - needleLength) {
      return -1;
    }
    if (haystack[i] === needle[0]) {
      if (needleLength === 1) {
        return i;
      }
      for (let j = 1; j < needleLength; j++) {
        if (haystack[i + j] !== needle[j]) {
          break;
        } else if (j === needleLength - 1) {
          return i;
        }
      }
    }
  }
  return -1;
};
```

----

## 实现防抖节流

**防抖**

```javascript
function debounce(cb, wait, immediate){
  let timer;
  return function (){
    const args = arguments; 
    const context = this;
    if(timer) clearTimeout(timer);
    if(immediate){
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait)
      if(callNow) return cb.apply(context, args);
    }else{
      timer = setTimeout(function() {
        return cb.apply(context, args);
      }, wait);
    }
  }
}
```

**节流**

```javascript
function throttle3(cb, wait){
  let context, args, timer;
  let old = 0; // 时间戳
  let later = function(){
    old = + new Date();
    timer = null;
    cb.apply(context, args);
  }
  return function(){
    context = this;
    args = arguments;
    let now = + new Date();
    if(now - old > wait){
      if(timer){
        clearTimeout(timer);
        timer = null;
      }
      cb.apply(context, args);
      old = now;
    }else if(!timer){
      timer = setTimeout(later, wait)
    }
  }
}
```
