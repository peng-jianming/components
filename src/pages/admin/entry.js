import Vue from 'src/modules/vue';
import router from './router';
import App from './App.vue';
import store from './store';
import './register-single-spa';

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
});
