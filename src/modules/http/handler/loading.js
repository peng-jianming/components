import { Loading } from 'element-ui';

const openLoading = config => {
  if (config.loading) {
    return Object.assign(config, {
      loading: Loading.service({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.8)',
        text: '拼命加载中....',
        spinner: 'el-icon-loading'
      })
    });
  }
  return config;
};

const closeLoading = response => {
  const config = response.config || {};
  if (config && config.loading) {
    config.loading.close();
  }
};

export default {
  requestResolve: openLoading,
  responseResolve(response) {
    closeLoading(response);
    return response;
  },
  responseReject(error) {
    closeLoading(error);
    return Promise.reject(error);
  }
};
