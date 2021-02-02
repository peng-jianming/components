import axios from 'axios';

export const getTicket = ({
  params = {},
  config = { loading: false }
} = {}) => {
  return axios.request({
    url: `/api/ticket/${params.id}`,
    method: 'get',
    ...config
  });
};
