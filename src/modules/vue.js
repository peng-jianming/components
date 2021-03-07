import Vue from 'vue';
import Http from 'src/modules/http';
import ElementUI from 'element-ui';
import 'src/modules/theme/theme';
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);
Vue.use(ElementUI);
Vue.use(Http);

export default Vue;
