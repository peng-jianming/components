import axios from 'axios';

export const getTicket = ({ params = {}, config = { loading: true } } = {}) => {
  return axios.request({
    url: `/api/ticket/${params.id}`,
    method: 'get',
    ...config
  });
};

export const postTicket = ({ data = {}, config = { loading: true } } = {}) => {
  return axios.request({
    data,
    url: `/api/ticket`,
    method: 'post',
    ...config
  });
};
