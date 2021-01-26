import axios from 'axios';

export const getCaptcha = ({
  query = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    params: query,
    url: '/login/api/captcha',
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
    url: '/login/api/sendCaptchaEmail',
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
    url: '/login/api/register',
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
    url: '/login/api/retrieve',
    method: 'post',
    ...config
  });
};

export const postLogin = ({ data = {}, config = { loading: false } } = {}) => {
  return axios.request({
    data,
    url: '/login/api/login',
    method: 'post',
    ...config
  });
};
