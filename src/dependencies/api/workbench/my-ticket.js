import axios from 'axios';

export const getTest = ({ config = { loading: false } } = {}) => {
  return axios.request({
    url: '/test',
    method: 'get',
    ...config
  });
};
