import axios from 'axios';

export const getTicketList = ({
  query = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    params: query,
    url: '/api/ticket/list',
    method: 'get',
    ...config
  });
};

export const getSearchUser = ({
  query = {},
  config = { loading: false, debounce: false }
} = {}) => {
  return axios.request({
    params: query,
    url: '/api/user/search',
    method: 'get',
    ...config
  });
};
