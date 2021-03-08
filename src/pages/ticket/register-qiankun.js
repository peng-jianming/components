import { registerMicroApps, start } from 'qiankun';
import { Loading } from 'element-ui';
import storage from 'src/modules/utils/storage.js';

const { get: getToken } = storage('token');

let loadingInstance = null;
const apps = [
  {
    name: 'createTicket',
    entry: '//www.pengjianming.top:9999',
    // entry: '//localhost:4000',
    container: '#qiankun-container',
    activeRule: location => location.pathname.startsWith('/ticket/create'),
    loader: loading => {
      console.log(`loading变化了,当前状态: ${loading}`);
      if (loading) {
        // 全屏loading加载效果
        loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      } else {
        loadingInstance.close();
        loadingInstance = null;
      }
    },
    props: { token: getToken() }
  }
];

registerMicroApps(apps, {
  beforeLoad: [
    app => {
      console.log('before load', app);
    }
  ],
  beforeMount: [
    app => {
      console.log('before mount', app);
    }
  ],
  afterUnmount: [
    app => {
      console.log('after unload', app);
    }
  ]
});

export default start;
