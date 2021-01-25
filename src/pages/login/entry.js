import Vue from 'src/modules/vue';
import App from './App.vue';
import './entry.less';

new Vue({
  el: '#app',
  render: h => h(App)
});
