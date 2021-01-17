import Vue from 'src/modules/vue';
import App from './App.vue';
import './entry.less';
import router from './router';
import start from './register-qiankun';

new Vue({
  el: '#app',
  router,
  mounted() {
    start();
  },
  render: h => h(App)
});
