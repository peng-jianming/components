import { registerMicroApps, start } from 'qiankun';

const apps = [
  {
    name: 'createTicket',
    // entry: '//8.129.90.25:5555/static',
    // entry: 'http://localhost:10300',
    entry: 'http://127.0.0.1:3000/ticket',
    container: '#qiankun-container',
    activeRule: location => {
      console.log(location.hash.start, '123');
      // return location.hash.startsWith('#/create');
      return location.pathname.startsWith('/ticket/create');
    }
  }
];

registerMicroApps(apps);

start();
