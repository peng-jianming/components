import axios from 'axios';

export const getTicketAboutMe = ({
  query = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    params: query,
    url: 'http://127.0.0.1:3000/api/workbench/me',
    method: 'get',
    ...config
  });
};
