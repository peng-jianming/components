import axios from 'axios';

export const getTicketAboutMe = ({
  query = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    params: query,
    url: '/api/ticket/me',
    method: 'get',
    ...config
  });
};
