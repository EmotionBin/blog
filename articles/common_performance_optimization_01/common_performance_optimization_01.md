# 前端性能优化

## 资源加载优化

1. 减小资源体积(压缩，gzip压缩)
2. 使用缓存
3. 使用CDN
4. 减少http请求

## 资源渲染优化

1. 减少DOM操作，对DOM操作做缓存，多个操作尽量合并在一起执行
2. CSS放head中，与页面加载无关的JS放body后
3. 

参考：
1.https://segmentfault.com/a/1190000017556203
2.https://segmentfault.com/a/1190000008829958
3.http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html
4.b站webpack性能优化总结