import axios from 'axios';
import debounceHandler from './debounce';
import loadingHandler from './loading';
import errorHandler from './error';

export const handlers = [debounceHandler, loadingHandler, errorHandler];

// 如需继续处理需要返回config
const normalResolve = config => {
  return config;
};

// 如需继续处理reject需要返回Promise.reject
const normalReject = error => {
  return Promise.reject(error);
};

// 单文件添加拦截器
export const registerHandler = handlers => {
  handlers.forEach(
    ({
      requestResolve = normalResolve,
      requestReject = normalReject,
      responseResolve = normalResolve,
      responseReject = normalReject
    }) => {
      axios.interceptors.request.use(requestResolve, requestReject);
      axios.interceptors.response.use(responseResolve, responseReject);
    }
  );
};
