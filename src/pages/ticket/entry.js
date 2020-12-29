import Vue from 'src/modules/vue';
import App from './App.vue';
import './entry.less';
import router from './router';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
