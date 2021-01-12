import { registerApplication, start } from 'single-spa';

const insetScript = async src => {
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

registerApplication(
  'manage-permission-spa',
  async () => {
    await insetScript(
      'http://8.129.90.25:9000/admin/static/vendor.1.26e7843d1fbfff010b2e.js'
    );
    await insetScript(
      'http://8.129.90.25:9000/admin/static/main/index.a63c24ab6bc9fd855ffa.js'
    );
    insetCss(
      'http://8.129.90.25:9000/admin/static/main/index.ad87c26f69b2030d7fa2.css'
    );
    return window.managePermission;
  },
  location => location.hash.startsWith('#/permission/manage'),
  (name, location) => {
    return {
      data: 'data'
    };
  }
);

start();
