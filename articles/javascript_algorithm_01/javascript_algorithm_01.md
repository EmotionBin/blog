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
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
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
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
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

----

## 两数之和

这是leetCode的一道题，[传送门](https://leetcode-cn.com/problems/two-sum/)  

> 1 两数之和  
> 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍

思路:使用一个对象作为映射，遍历数组，对象的键记录数组中元素的值，对象的值记录数组中元素的索引，先获取差值 `diff`，如果映射对象中存在 `diff` 属性，且它的值大于等于 0，则说明条件成立，反之，条件不成立，则往映射对象中记录当前元素的值和索引  

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var NUM_MAP = {};
  for(let i = 0;i < nums.length;i ++){
    const item = nums[i];
    const diff = target - item;
    if(NUM_MAP[diff] >= 0) return [NUM_MAP[diff], i];
    NUM_MAP[item] = i;
  }
};
```

其实这里还可以优化，就是把映射对象利用 `new Map()` 代替  

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var NUM_MAP = new Map();
  for(let i = 0;i < nums.length;i ++){
    const item = nums[i];
    const diff = target - item;
    if(NUM_MAP[diff] >= 0) return [NUM_MAP[diff], i];
    NUM_MAP[item] = i;
  }
};
```

----

## 实现 new、call、apply、bind

**实现 new**  

```javascript
function _new() {
  let obj = {}; // 1. 创建一个空对象
  let Constructor = [].shift.call(arguments); // 2. 获得构造函数
  obj.__proto__ = Constructor.prototype; // 3. 链接到原型
  let result = Constructor.apply(obj, arguments); // 4. 绑定 this，执行构造函数
  return typeof result === 'object' ? result : obj; // 5. 返回 new 出来的对象
}
```

简化版：  

```javascript
function _new(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let result = fn.apply(obj, args);
  return typeof result === 'object' ? result : obj;
}
```

演示：  

```javascript
function Person(name, age){
  this.name = name;
  this.age  = age;
}
var person = _new(Person, '小明', 18);
console.log(person);
// Person {name: "小明", age: 18}
```

**实现 call**

```javascript
Function.prototype._call = function (target, ...args) {
  target.fn = this;
  let res = target.fn(...args);
  delete target.fn;
  return res;
}
```

演示:  

```javascript
var a = 1;
var b = 2;

var obj = {
  a:10,
  b:20
}

function test(params1, params2){
  console.log(this.a);
  console.log(this.b);
  console.log(params1);
  console.log(params2);
}
test(100, 200); // 1 2 100 200
test._call(obj, 100, 200); // 10 20 100 200
```

**实现 apply**

```javascript
Function.prototype._apply = function (target, args) {
  target.fn = this;
  let res;
  if (args && args.length) {
    res = target.fn(...args);
  } else {
    res = target.fn();
  }
  delete target.fn;
  return res;
}
```

演示:  

```javascript
var a = 1;
var b = 2;

var obj = {
  a:10,
  b:20
}

function test(params1, params2){
  console.log(this.a);
  console.log(this.b);
  console.log(params1);
  console.log(params2);
}
test(100, 200); // 1 2 100 200
test._apply(obj, [100, 200]); // 10 20 100 200
```

**实现 bind**

```javascript
Function.prototype._bind = function (target, ...args) {
  target.fn = this;
  return function () {
    const newArgs = args.concat(...arguments);
    let res = target.fn(...newArgs);
    delete target.fn;
    return res;
  }
}
```

演示:  

```javascript
var a = 1;
var b = 2;

var obj = {
  a:10,
  b:20
}

function test(params1, params2){
  console.log(this.a);
  console.log(this.b);
  console.log(params1);
  console.log(params2);
}
test(100, 200); // 1 2 100 200
test._bind(obj, 100, 200)(); // 10 20 100 200
test._bind(obj, 100)(200); // 10 20 100 200
```

----

## Promise 实现 setTimeout

```javascript
function _setTimeout(cb, delay, ...args) {
  const currentTimestamp = + new Date();
  return Promise.resolve().then(() => {
    let flag = true;
    while (flag) {
      if (+ new Date() - currentTimestamp > delay){
        cb(...args);
        flag = false;
      }
    }
  })
}
```

测试：  

```javascript
console.log('script start');
_setTimeout(doSomething, 2000, 1, 2, 3, 4, 5);
console.log('script end');

function _setTimeout(cb, delay, ...args) {
  const currentTimestamp = + new Date();
  return Promise.resolve().then(() => {
    let flag = true;
    while (flag) {
      if (+ new Date() - currentTimestamp > delay){
        cb(...args);
        flag = false;
      }
    }
  })
}

function doSomething(){
  console.log(arguments);
  console.log('时间到');
}

// script start
// script end
// Arguments(5) [1, 2, 3, 4, 5, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// 时间到
```

这里用 Promise 模拟的 setTimeout 和真实的 setTimeout 还是有区别的，区别就在于 **Promise 是微任务，setTimeout 是宏任务**，我只实现了核心功能，对于微任务和宏任务的问题暂时没有想到解决办法  

----

## 最大子序和

这是leetCode的一道题，[传送门](https://leetcode-cn.com/problems/maximum-subarray/)  

> 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和

这道题我第一次做的时候没有做出来，然后看了别人的解答，收到了很大的启发，别人的解答如下：  

- 这道题用动态规划的思路并不难解决，比较难的是后文提出的用分治法求解，但由于其不是最优解法，所以先不列出来
- 动态规划的是首先对数组进行遍历，当前最大连续子序列和为 sum，结果为 ans
- 如果 sum > 0，则说明 sum 对结果有增益效果，则 sum 保留并加上当前遍历数字
- 如果 sum <= 0，则说明 sum 对结果无增益效果，需要舍弃，则 sum 直接更新为当前遍历数字
- 每次比较 sum 和 ans 的大小，将最大值置为 ans，遍历结束返回结果
- 时间复杂度：O(n)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let ans = nums[0];
  let sum = 0;
  for(const num of nums) {
    if(sum > 0) {
      sum += num;
    } else {
      sum = num;
    }
    ans = Math.max(ans, sum);
  }
  return ans;
}
```

我在参考了他的思路后，自己也总结一下，我觉得这样更容易理解：

1. 如果全部都是负数，负数越加越小，所以直接找最大值
2. 如果有正数，从正数开始计算，因为如果算上前面的负数，和肯定变小了
3. 当和小于 0 时，这个区间就告一段落了，从下一个正数开始计算
