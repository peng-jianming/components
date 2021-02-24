import axios from 'axios';
import { isEqual } from 'lodash';

const queue = [];
const DELAY = 500;

const { CancelToken } = axios;
const source = CancelToken.source();

const exists = (_url, _method, _params, _data) => {
  return queue.some(
    ({ url, method, params, data }) =>
      url === _url &&
      method === _method &&
      isEqual(params, _params) &&
      isEqual(data, _data)
  );
};

const add = (url, method, params, data) => {
  queue.push({
    url,
    method,
    params,
    data
  });
};

const remove = (_url, _method, _params, _data) => {
  const request = queue.find(
    ({ url, method, params, data }) =>
      url === _url &&
      method === _method &&
      isEqual(params, _params) &&
      isEqual(data, _data)
  );
  if (request) {
    queue.splice(queue.indexOf(request), 1);
  }
};

// 防抖函数
// 一定时间内队列只能有一个同一个url请求
// 以url和method作为请求的唯一标志
export default {
  requestResolve(config) {
    const { debounce = true } = config;
    if (debounce) {
      const { url, method, params, data } = config;
      if (!exists(url, method, params, data)) {
        add(url, method, params, data);
        setTimeout(() => {
          remove(url, method, params, data);
        }, DELAY);
      } else {
        source.cancel('cancel request because of debounce');
        return Object.assign(config, {
          cancelToken: source.token
        });
      }
    }
    return config;
  },
  responseReject(error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
      return error;
    } else {
      return Promise.reject(error);
    }
  }
};
