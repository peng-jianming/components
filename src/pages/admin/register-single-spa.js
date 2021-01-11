import * as singleSpa from 'single-spa';

const insetScript = async src => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

singleSpa.registerApplication(
  'manage-permission-spa',
  async () => {
    await insetScript('http://8.129.90.25:9000/js/chunk-vendors.70b80d13.js');
    await insetScript('http://8.129.90.25:9000/js/app.581647cf.js');
    return window.managePermission;
  },
  location => location.hash.endsWith('/permission/manage')
);

singleSpa.start();
