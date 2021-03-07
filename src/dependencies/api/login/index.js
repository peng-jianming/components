import axios from 'axios';

export const getCaptcha = ({
  query = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    params: query,
    url: 'http://127.0.0.1:3000/api/login/captcha',
    method: 'get',
    ...config
  });
};

export const postSendCaptchaEmail = ({
  data = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    data,
    url: '/api/login/sendCaptchaEmail',
    method: 'post',
    ...config
  });
};

export const postRegister = ({
  data = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    data,
    url: '/api/login/register',
    method: 'post',
    ...config
  });
};

export const postRetrieve = ({
  data = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    data,
    url: '/api/login/retrieve',
    method: 'post',
    ...config
  });
};

export const postLogin = ({ data = {}, config = { loading: false } } = {}) => {
  return axios.request({
    data,
    url: 'http://127.0.0.1:3000/api/login',
    method: 'post',
    ...config
  });
};
