# 关于编码

编码对我们来说其实并不陌生，接触计算机就要一直和编码打交道，`UTF-8` 就是比较常见的编码，当然编码的方式有很多，这里只是举例说明。那么为什么需要编码呢，因为计算机是二进制的，我们在电脑上存储的文件大多数都是以二进制形式存储的，在计算机眼里只有 0 和 1，如果不经过编码，计算机可能无法识别一些内容；又比如我们熟悉的 `HTTP` 协议，`HTTP` 协议可以传输数据，一般使用的是 `UTF-8` 编码，这里编码是为了让数据传输的过程中节省数据存储空间，可以节省带宽，加快传输速度等，这就是为什么需要编码的原因，本文就来一起讨论一些常见的编码  

----

## ASCII 码 

计算机内部，所有信息最终都是一个二进制值，每一个二进制位(bit)有 0 和 1 两种状态，因此八个二进制位就可以组合出 256 种状态，这被称为一个字节(byte)。所以一个字节可以表示 256 种不同的状态，每一个状态对应一个符号，就是 256 个符号，从 `00000000` 到 `11111111`  

ASCII 码是一直沿用至今的一套编码表，规定了128个字符的编码，比如空格 `SPACE` 是 32(二进制`00100000`)，大写的字母 A 是 65(二进制 `01000001`)。这 128 个符号，只占用了一个字节的后面 7 位，最前面的一位统一规定为 0，即可以表示为 `0xxxxxxx`(x 代表 0 或 1)  

----

## 非 ASCII 编码

英语用 128 个符号编码就够了，但是用来表示其他语言，128 个符号是不够的，比如一些欧洲国家的语言会有比较多的符号。所以就决定利用 ASCII 码中字节的第一个 0 来表示更多的符号，这样一来，这些欧洲国家使用的编码体系，可以表示最多 256 个符号  

这样看似解决了问题，这里又出现了新的问题，不同的国家有不同的字母，因此，哪怕它们都使用 256 个符号的编码方式，代表的字母却不一样，比如，130 在法语编码中代表了 `é`，在希伯来语编码中却代表了字母 `Gimel` (`ג`)，在俄语编码中又会代表另一个符号。但是不管怎样，所有这些编码方式中，0--127 表示的符号是一样的，不一样的只是 128--255 的这一段  

对于亚洲国家的符号就更多了，汉字就多达10万左右，一个字节只能表示 256 种符号，肯定是不够的，就必须使用多个字节表达一个符号。比如，简体中文常见的编码方式是 GB2312，使用两个字节表示一个汉字，所以理论上最多可以表示 256 x 256 = 65536 个符号  

----

## Unicode

正如上一节所说，世界上存在着多种编码方式，同一个二进制数字可以被解释成不同的符号。因此，要想打开一个文本文件，就必须知道它的编码方式，否则用错误的编码方式解读，就会出现乱码。为什么电子邮件常常出现乱码?就是因为发信人和收信人使用的编码方式不一样  

如果有一种，每一个符号都给予一个独一无二的编码，就可以解决这个问题，这就是 Unicode，它是一个很大的集合，现在的规模可以容纳一百多万个符号，比如，`U+0639` 表示阿拉伯字母 `Ain`，`U+0041` 表示英语的大写字母 `A`，`U+4E25` 表示汉字“严”  

----

## UTF-8

UTF-8 是 Unicode 的实现方式之一，也是目前在互联网上使用最广的一种编码方式。UTF-8 最大的一个特点，就是它是一种变长的编码方式。它可以使用 1~4 个字节表示一个符号，根据不同的符号而变化字节长度  

UTF-8 的编码规则很简单，只有二条：  

1. 对于单字节的符号，字节的第一位设为 0，后面 7 位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的
2. 对于 n 字节的符号（n > 1），第一个字节的前 n 位都设为 1，第 n + 1 位设为 0，后面字节的前两位一律设为 10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码

如果一个字节的第一位是 0，则这个字节单独就是一个字符；如果第一位是 1，则连续有多少个 1，就表示当前字符占用多少个字节。“严”的 Unicode 是 `4E25`(`100111000100101`)，查表可知，“严”的 UTF-8 编码需要三个字节，即格式是 `1110xxxx 10xxxxxx 10xxxxxx`。然后，从严的最后一个二进制位开始，依次从后向前填入格式中的 x，多出的位补 0。这样就得到了，严的 UTF-8 编码是 `11100100 10111000 10100101`，转换成十六进制就是 `E4B8A5`  

----

## 中文编码

中文编码是我们国家为了专门对汉字编码而使用的，常见的编码方式有 GB2312 和 GBK 两种  

GB2312 又称国标码，由国家标准总局发布，GB2312 规定“对任意一个图形字符都采用两个字节表示，每个字节均采用七位编码表示”，习惯上称第一个字节为“高字节”，第二个字节为“低字节”  

GBK 是 GB2312 的扩展，是向上兼容的，因此 GB2312 中的汉字的编码与 GBK 中汉字的相同。另外，GBK 中还包含繁体字的编码  

----

## URL 编码

一般来说，URL 只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号，因为网络标准 `RFC 1738` 做了硬性规定，这意味着，如果 URL 中有汉字，就必须编码后使用，但是麻烦的是，`RFC 1738` 没有规定具体的编码方法，而是交给应用程序（浏览器）自己决定，这导致 URL 编码成为了一个混乱的领域  

下面直接引用阮一峰老师经过辛苦测试得出的结论，致敬阮一峰老师  

- 情况1：网址路径中包含汉字  

如 `http://zh.wikipedia.org/wiki/春节`，这个网址中包含了中文字符，必须要经过浏览器编码，编码后“春节”变成了 `%E6%98%A5%E8%8A%82`  

**结论：网址路径的编码，用的是utf-8编码**  

- 情况2：查询字符串包含汉字  

如 `http://www.baidu.com/s?wd=春节`，注意和情况1区分，“春节”这两个字此时属于查询字符串，不属于网址路径，编码后“春节”变成了 `%E6%98%A5%E8%8A%82`  

**结论：查询字符串的编码，用的是操作系统的默认编码**

- 情况3：GET 方法生成的 URL 包含汉字

如 `http://www.baidu.com/s?wd=春节`、`http://www.google.cn/search?q=春节` 注意和情况2区分，这里指的是在已打开的网页上，直接用 GET 或 POST 方法发出 HTTP 请求  

**结论：GET 和 POST 方法的编码，用的是网页的编码**(在 html 文件的 head 标签中 `<meta charset="UTF-8">` 则说明该网页使用 `utf-8` 编码，可自行修改)

以上结论是阮一峰老师在 2010 年得出的结论，现在的网页一般情况下都是使用的 utf-8 进行编码，提高容错率，下面会介绍一些手动编码的 JS 函数  

----

### encodeURI() 与 decodeURI()

`encodeURI()` 是 JS 中对 URL 进行编码的函数，它着眼于对整个URL进行编码，所以对部分有特殊含义的符号不进行编码(`;` `/` `?` `:` `@` `&` `=` `+` `$` `,` `#` 等)，编码后，输出 utf-8 形式，并且在每个字节前加上 `%`   

```javascript
encodeURI('http://www.baidu.com/s?wd=春节');
// "http://www.baidu.com/s?wd=%E6%98%A5%E8%8A%82"
```

`decodeURI()` 是 JS 中对 URL 进行解码的函数，与 `encodeURI()` 对应  

```javascript
decodeURI('http://www.baidu.com/s?wd=%E6%98%A5%E8%8A%82');
// "http://www.baidu.com/s?wd=春节"
```

----

### encodeURIComponent() 与 decodeURIComponent()

`encodeURIComponent()` 也是 JS 中对 URL 进行编码的函数，与 `encodeURI()` 的区别是，它用于对URL的组成部分进行个别编码，因此部分 `encodeURI()` 不进行编码的符号在 `encodeURIComponent()` 中都会进行编码  

```javascript
encodeURIComponent('http://www.baidu.com/s?wd=春节');
// "http%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3D%E6%98%A5%E8%8A%82"
```

`decodeURIComponent()` 也是 JS 中对 URL 进行解码的函数，与 `encodeURIComponent()` 对应  

```javascript
decodeURIComponent('http%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3D%E6%98%A5%E8%8A%82');
// "http://www.baidu.com/s?wd=春节"
```

----

## base64编码

base64 是一种基于 64 个可打印字符来表示二进制数据的表示方法，每 6 个比特为一个单元，对应某个可打印字符。比如 3 个字节有 24 个比特，对应于 4 个 base64 单元，即 3 个字节可由 4 个可打印字符来表示  

比如用 base64 对 `Man` 进行编码，`Man` 由 `M`、`a`、`n` 三个字符组成，对应的 ASCII 码为 77(`01001101`)、97(`01100001`)、110(`01101110`)，所以 `Man` 的二进制数为 `010011010110000101101110`，共 24 比特，每六个比特为一个单元分成四部分 `010011`、`010110`、`000101`、`101110`，查找 base64 编码表得 `TWFu`，所以 `Man` 的 base64 编码为 `TWFu`  

`Man` 正好 3 个字节 24 比特，能被 6 整除分成 4 份，那么当不足 3 字节的长度时，往末尾补 0，使其能够被 3 整除，再进行 base64 编码  

比如要对 `A` 进行 base64 编码，`A` 对应的二进制数为 `01000001`，只有一个字节的长度，则往末尾补 0，补到 3 字节，即 `010000010000000000000000`，再分成 4 份，`010000`、`010000`、`000000`、`000000`，查找 base64 编码表得 `QQ==`，所以 `A` 的 base64 编码为 `QQ==`，以此类推，`BC` 的 base64 编码为 `QkM=`  

JS 提供了原生的 base64 编码、解码的函数，分别是 `btoa()` 和 `atob()`  

**btoa()**

btoa() 方法可以把字符(不能是中文汉字)转换成 base64 编码，简单记忆为 b 代表 blob 二进制，a 代表 ASCII，btoa() 则为 base64 加密  

```javascript
btoa('Man');
// "TWFu"
```

**atob()**

atob() 方法可以进行 base64 解密  

```javascript
atob("TWFu");
// "Man"
```

base64 一般是用来传输数据的，经过 base64 编码之后体积会增大至少三分之一，而且 base64 编码完全是可逆的，因此不能用于传输私密信息  

----

## ajax 编码

ajax 常用于向后端提交数据，用 POST 提交数据时会有好几种提交格式，下面就来一起探讨这几种格式的区别  

**application/x-www-form-urlencoded**

这种格式就是提交表单格式，默认使用 JS 的 encodeURI() 方法进行编码，提交的格式是键值对格式，中间用 `&` 连接，请看下面的例子:  

```javascript
// 这是要提交的数据
params = {
  data:'参数',
  data1:222
}

// 经过编码后变成如下格式
'data=%E5%8F%82%E6%95%B0&data1=222'
```

**application/json**

这种格式提交的数据是 JSON 格式的，也就是 JSON 字符串，需要使用 `JSON.stringify()` 进行格式化，请看下面的例子：  

```javascript
// 这是要提交的数据
params = {
  data:'参数',
  data1:222
}

// 使用 JSON.stringify() 方法格式化后变成 JSON 字符串
`{"data":"参数","data1":222}`
```

**multipart/form-data**

这种格式提交的数据是原生的表单格式，需要使用 `var formData = new FormData()` 来创建表单，再利用 `append()` 方法组装数据，一般用来上传文件，这种格式提交时不会对参数进行编码，使用 `boundary`(分割线)，相当于 `&`，`boundary` 的值是 `----WebKitFormBoundary**********` 请看下面的例子：  

```javascript
// 这是要提交的参数
var formData = new FormData();
formData.append('data','参数');
formData.append('data1',222);

// 这是提交后的参数
`------WebKitFormBoundaryKwk2Gx9aK7G89GzK
Content-Disposition: form-data; name="data"

参数
------WebKitFormBoundaryKwk2Gx9aK7G89GzK
Content-Disposition: form-data; name="data1"

222
------WebKitFormBoundaryKwk2Gx9aK7G89GzK--`
```

----

## 结束语

以上就是本文关于编码的所有内容。如果本文中有说的不正确的地方，欢迎大佬鞭策!  

**参考资料：**

[字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)  
[关于URL编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)  



