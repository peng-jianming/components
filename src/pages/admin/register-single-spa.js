import { registerApplication, start } from 'single-spa';
import storage from 'src/modules/utils/storage.js';

const { get: getToken } = storage('token');

const insetScript = src => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const insetCss = href => {
  const link = document.createElement('link');
  link.href = href;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const apps = [
  {
    // 该子应用的名字,自定义即可
    name: 'manage-permission-spa',
    // 当activeWhen为true时,将触发该方法,挂载app,需返回暴露出来的全局变量
    app: async () => {
      await insetScript(
        '//8.129.90.25:7777/static/vendor.5.f174fd37baa8a418744a.js'
      );
      await insetScript(
        '//8.129.90.25:7777/static/main/index.e40e7080aa78b8a56ab1.js'
      );
      insetCss('//8.129.90.25:7777/static/main/index.433126d7ee3315dee3c1.css');
      return window.managePermission;
    },
    // location匹配
    activeWhen: location => {
      console.log(location.hash.startsWith('#/permission/manage'));
      return location.hash.startsWith('#/permission/manage');
    },
    // 传参到子应用
    customProps: (name, location) => {
      return {
        token: getToken()
      };
    }
  }
];

apps.forEach(app => registerApplication(app));

start();
