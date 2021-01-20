import axios from 'axios';

export const getRandomImage = () => {
  return axios.request({
    url: '/images',
    method: 'get'
  });
};
