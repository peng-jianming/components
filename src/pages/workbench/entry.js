import Vue from 'src/modules/vue';
import router from './router';
import store from './store';
import App from './App';

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
});
