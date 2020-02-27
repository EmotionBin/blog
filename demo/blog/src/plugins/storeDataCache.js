import store from '../store'

/**
 * 页面刷新之后，对store中的数据进行缓存
 * 保持在刷新之后可以保持一部分数据状态,将缓存动作绑定在浏览器刷新事件上
 * (也可以使用vuex-along)
 */

window.onbeforeunload = function() {
  const storeData = store.state;
  const storeDataJson = JSON.stringify(storeData);

  //将缓存数据放在sessionStorage
  window.sessionStorage.setItem('storeData', storeDataJson);
}

//同时在页面加载完之后，从缓存中取出数据存放在store之中
const stateDataJson = window.sessionStorage.getItem('storeData');
try {
  const storeData = JSON.parse(stateDataJson);
  if (storeData && typeof storeData == 'object'){
    store.replaceState(storeData);
  }
} catch (error) {
  console.log('解析数据发生错误', error);
}