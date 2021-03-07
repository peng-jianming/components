import axios from 'axios';

export const getUser = ({ config = { loading: false } } = {}) => {
  return axios.request({
    url: '/api/user',
    method: 'get',
    ...config
  });
};

export const getAllUser = ({
  query = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    params: query,
    url: '/api/user/all',
    method: 'get',
    ...config
  });
};

export const patchAllUser = ({
  data = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    data,
    url: '/api/user/all',
    method: 'patch',
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

export const getUserMessage = ({
  query = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    params: query,
    url: '/api/user/message',
    method: 'get',
    ...config
  });
};

export const patchUserMessage = ({
  data = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    data,
    url: '/api/user/message',
    method: 'patch',
    ...config
  });
};
