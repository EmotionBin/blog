# 关于数组的一些思考

数组是一个特别常见的存储结构，本文来讨论一下数组去重、数组排序以及Vue中关于数组的响应式监听  

----

## 数组去重

数组又分为简单数组和复杂数组，简单数组就是一维数组，复杂数组可能会嵌套对象等

----

### 简单数组去重

为了方便对比，在数组最后两个元素加入了两个空对象`{}`，严格意义上说，这并不算是简单数组  

----

#### 双重for循环 + splice

```javascript
  function unique(arr){
    for(let i = 0;i < array.length; i ++){
      for(let j = i + 1;j< array.length; j ++){
        if(array[i] === array[j]){
          array.splice(j, 1);
          j --;
        }
      }
    }
    return arr;
  }
  const array = [1,1,'true','true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
  console.log(unique(array));
  //[1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {}, {}]
```

可以发现利用这种方法进行去重时，无法去除`NaN`和`{}`  

----

#### 双重for循环

```javascript
  function unique(arr){
    const res = [];
    for(var i = 0;i < arr.length;i ++){
        for(var j = 0;j < res.length;j ++){
          if(res[j] === arr[i]) break; 
        }
        if(res.length === j) res.push(arr[i]);
    }
    return res;
  }
  const array = [1,1,'true','true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
  console.log(unique(array));
  //[1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {}, {}]
```

这种方法也无法去除`NaN`和`{}`  

----

#### for循环 + indexOf

```javascript
  function unique(arr){
    const res = [];
    for(let i = 0;i < arr.length;i ++){
      if(res.indexOf(arr[i]) === -1) res.push(arr[i]);
    }
    return res;
  }
  const array = [1,1,'true','true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
  console.log(unique(array));
  // [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {}, {}]
```

这种方法也对`NaN`和`{}`无效  

----

#### for循环 + includes

```javascript
  function unique(arr){
    const res = [];
    for(let i = 0;i < arr.length;i ++){
      if(!res.includes(arr[i])) res.push(arr[i]);
    }
    return res;
  }
  const array = [1,1,'true','true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
  console.log(unique(array));
  //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```

这种方法可以有效的对`NaN`进行去重，但是仍然无法对`{}`去重  

----

#### filter + indexOf

```javascript
  function unique(arr){
    return arr.filter((item, index) => {
      return arr.indexOf(item) === index;
    })
  }
  const array = [1,1,'true','true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
  console.log(unique(array));
  //[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {}, {}]
```

根据得到的结果，发现原来的`NaN`直接被忽略掉了，无法对`{}`去重  

----

#### es6的Set

```javascript
  function unique(arr){
    return [...new Set(arr)];
  }
  const array = [1,1,'true','true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
  console.log(unique(array));
  //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```

这种方法代码最少，对`NaN`可以有效去重，无法对`{}`去重  

----

### 复杂数组去重

复杂数组即在数组中嵌套了对象，下面会详细讨论根据对象中指定的`key`去重  

----

#### filter + findIndex

```javascript
  function unique(arr, key){
    return arr.filter((item, index, self) => {
      const targetIndex = self.findIndex(el => el[key] === item[key]);
      return targetIndex === index;
    })
  }
  const array = [{
    name:'小明',
    age:10,
    tall:180
  },{
    name:'小明',
    age:12,
    tall:170
  },{
    name:'小红',
    age:10,
    tall:180
  },{
    name:'小明',
    age:10,
    tall:180
  },{
    name:'小明',
    age:10,
    tall:180
  }];
  console.log(unique(array, 'name'));
  //[{name:'小明',age:10,tall:180},{name:'小红',age:10,tall:180}]
```

可以看到，在这个对象数组中，对象中的`name`属性值为`小明`的被去重了，只留一下了一个  

----

#### for循环

```javascript
  function unique(arr, key){
    const res = [];
    const obj = {};
    for(let i = 0;i < arr.length;i ++){
      if(!obj[arr[i][key]]){
        res.push(arr[i]);
        obj[arr[i][key]] = true;
      }
    }
    return res;
  }
  const array = [{
    name:'小明',
    age:10,
    tall:180
  },{
    name:'小明',
    age:12,
    tall:170
  },{
    name:'小红',
    age:10,
    tall:180
  },{
    name:'小明',
    age:10,
    tall:180
  },{
    name:'小明',
    age:10,
    tall:180
  }];
  console.log(unique(array, 'name'));
  //[{name:'小明',age:10,tall:180},{name:'小红',age:10,tall:180}]
```

这种方法需要开辟相对比较多的新空间，比较占用资源，不太推荐  

----

## 数组排序

待补充

----

## Vue对于数组的响应式监听

### Vue对数组监听的坑

Vue对于数组的监听会有一定的弊端，这是官网的说明：  

> Vue 不能检测以下数组的变动：  
> 
> 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue  
> 当你修改数组的长度时，例如：vm.items.length = newLength  

看一下这个官网的例子：  

```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

----

### 对于Vue不能对数组响应式监听的解决办法

1. `Vue.set(vm.items, indexOfItem, newValue)`或`vm.$set(vm.items, indexOfItem, newValue)`
2. 使用部分数组操作方法，如`splice()`、`push()`、`pop()`等，使用这些方法操作数组可以触发更新
3. 替换原数组，使用如`map()`、`filter()`等方法返回新数组，再把原数组用新数组替换掉

----

### Vue为什么要对数组做这样的设计

Vue的双向绑定是通过`Object.defineProperty`给对象添加`getter`和`setter`方法实现的  

是不是因为`Object.defineProperty`对数组失效呢?下面来看一段代码:  

```javascript
var array = ['a', 'b']

// 枚举数组各项，试图设置各项的getter，setter，
for (var i = 0, len = array.length; i < len ;i++) {
    // 数组的index就相当于对象的属性
    Object.defineProperty(array, i, {
        get: function() {
            console.log('trigger subscription')
        },
        set: function() { // 数组项变动触发通知
            console.log('trigger notify')
        }
    })
}

array[0] = 'x' // 输出 trigger notify
```

事实证明，是可以通过`array[index] = newValue`这样的方式触发响应的。那Vue为什么不这样做呢？

1. 试想一下，如果数组有100个元素，对数组内的每个元素都这样设置，会很笨拙，也会很损耗性能
2. `Javascript`的数组是可变的，可以通过`array[index] = value`添加数组项，而`Object.defineProperty`是针对已有项的设置，新加的项是不会被 `Object.definePropert`设置的，也就不会触发响应更新了

正因为以上原因，Vue没有对数组进行响应式的监听，对象可以响应式的监听是因为我们在创建Vue实例的时候，data中的属性是预先定义好了的，Vue会去遍历data中的属性添加数据劫持  

既然数组不是响应式的，那么为什么`splice()`、`push()`这些方法改变数据可以被监听到呢？实际上，是因为Vue对部分数组方法（pop, push, shifut, unshift, splice, sort, reverse）进行了重写，可以在浏览器控制台打印一个Vue实例中data的属性，再打印一个普通数组进行对比，比如下面这段代码：  

```javascript
  const vm = new Vue({
    el:'#app',
    data: {
      items: ['a', 'b', 'c']
    }
  });
  const test = ['a', 'b', 'c'];
  console.log(vm.items, test);
```

这段代码创建了一个Vue实例，并打印了Vue实例中的数组和一个普通数组，在控制台点开它们的`__proto__`属性就会发现，Vue实例中的部分数组方法果然被重写了  

----

### 小结

Vue不能检测到以元素赋值方式的数组变动是因为：  

1. 动态添加的数组项不能被劫持生成`getter`，`setter`，因此无法产生响应
2. 给数组每一项做劫持，性能低且笨拙

----

## 结束语

在开发的过程中，经常会遇到数组，而且还要对数组进行一些对应的操作，比如增删改查等，能熟练运用这些方法，就可以大大提高我们的开发效率。如果本文中有说的不正确的地方，欢迎大佬鞭策!  

**参考资料：**

[掘金-Vue为什么不能检测到以元素赋值方式的数组变动](https://juejin.im/post/5e002644e51d45581054216a)   