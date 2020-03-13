/**
 * Vue自定义指令
 */

import Vue from 'vue';
import hljs from'highlight.js';
//highlight代码高亮的样式
import 'highlight.js/styles/default.css';

//highlight.js用于markdown的代码高亮，必须设置为自定义指令，否则无作用
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  })
})