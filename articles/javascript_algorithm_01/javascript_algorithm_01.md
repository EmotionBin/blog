# js算法练习

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





