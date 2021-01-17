import { registerMicroApps, start } from 'qiankun';

const apps = [
  {
    name: 'createTicket',
    entry: '//8.129.90.25:5555',
    // entry: '//localhost:3000',
    container: '#qiankun-container',
    activeRule: location => location.pathname.startsWith('/ticket/create'),
    loader: loading => {
      console.log(`loading---变化了,当前状态${loading}`);
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

start();
