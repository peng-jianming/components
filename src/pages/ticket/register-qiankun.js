import { registerMicroApps, start } from 'qiankun';
import { Loading } from 'element-ui';

let loadingInstance = null;
const apps = [
  {
    name: 'createTicket',
    entry: '//8.129.90.25:5555',
    // entry: '//localhost:3000',
    container: '#qiankun-container',
    activeRule: location => location.pathname.startsWith('/ticket/create'),
    loader: loading => {
      console.log(`loading变化了,当前状态: ${loading}`);
      if (loading) {
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
    }
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
