import Vue from 'src/modules/vue';
import App from './App.vue';
import './entry.less';
import router from './router';
import './register-qiankun';
const Vue2 = Vue;
window.Vue = undefined;
new Vue2({
  el: '#app',
  router,
  render: h => h(App)
});
