import { registerMicroApps, start } from 'qiankun';

const apps = [
  {
    name: 'createTicket',
    entry: '//8.129.90.25:5555',
    container: '#qiankun-container',
    activeRule: location => location.pathname.startsWith('/ticket/create')
  }
];

registerMicroApps(apps);

start();
