import axios from 'axios';

export const getUser = () => axios.get('http://localhost:3000/user');
// axios.request({
//   url: 'http://localhost:3000/user',
//   methods: 'get'
// });
