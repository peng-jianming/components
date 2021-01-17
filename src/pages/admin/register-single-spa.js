import { registerApplication, start } from 'single-spa';

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
        '//8.129.90.25:9000/static/vendor.5.a912a54258a0e2641e03.js'
      );
      await insetScript(
        '8.129.90.25:9000/static/main/index.e27818e66f20f208f404.js'
      );
      insetCss('//8.129.90.25:9000/static/main/index.c1f4d9d2118c9fdf5b6a.css');
      return window.managePermission;
    },
    // location匹配
    activeWhen: location => location.hash.startsWith('#/permission/manage'),
    // 传参到子应用
    customProps: (name, location) => {
      return {
        data: 'data'
      };
    }
  }
];

apps.forEach(app => registerApplication(app));

start();
