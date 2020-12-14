// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 引入静态资源
import './assets/css/reset.css'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
/* eslint-disable no-new */
import store from './store/index'

//图片添加的路径
Vue.prototype.$preImg = 'http://localhost:3000';


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
