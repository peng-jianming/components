import axios from 'axios';
import { registerHandler, handlers } from './handler';
import storage from 'src/modules/utils/storage';

const { get: getToken } = storage('token');

const Http = {};
axios.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

Http.install = Vue => {
  registerHandler(handlers);
  Vue.prototype.$http = {
    get(url, config) {
      return axios.get(url, config);
    },
    post(url, data, config) {
      return axios.post(url, data, config);
    },
    put(url, data, config) {
      return axios.post(url, data, config);
    },
    delete(url, config) {
      return axios.delete(url, config);
    }
  };
};

export default Http;
