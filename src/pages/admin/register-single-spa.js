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
    await insetScript('http://localhost:8080/js/chunk-vendors.js');
    await insetScript('http://localhost:8080/js/app.js');
    return window.managePermission;
  },
  location => location.hash.endsWith('/permission/manage')
);

singleSpa.start();
