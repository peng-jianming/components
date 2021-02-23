import axios from 'axios';

export const getTicketAboutMe = ({
  query = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    params: query,
    url: '/api/workbench/me',
    method: 'get',
    ...config
  });
};
