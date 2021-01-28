import axios from 'axios';

export const getUser = ({ config = { loading: false } } = {}) => {
  return axios.request({
    url: '/api/user',
    method: 'get',
    ...config
  });
};

export const postUserAvatar = ({
  data = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    data,
    url: '/api/user/avatar',
    method: 'post',
    ...config
  });
};

export const putUpdateUser = ({
  data = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    data,
    url: '/api/user',
    method: 'put',
    ...config
  });
};

export const patchChangePassword = ({
  data = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    data,
    url: '/api/user/ChangePassword',
    method: 'patch',
    ...config
  });
};
