import axios from 'axios';

export const postPermission = ({
  data = {},
  config = { loading: false }
} = {}) =>
  axios.request({
    data,
    url: '/api/admin/permission',
    method: 'post',
    ...config
  });

export const getPermission = ({ config = { loading: false } } = {}) =>
  axios.request({
    url: '/api/admin/permission',
    method: 'get',
    ...config
  });

export const putPermission = ({
  params = {},
  data = {},
  config = { loading: false }
} = {}) =>
  axios.request({
    data,
    url: `/api/admin/permission/${params.id}`,
    method: 'put',
    ...config
  });

export const deletePermission = ({
  params = {},
  config = { loading: false }
} = {}) =>
  axios.request({
    url: `/api/admin/permission/${params.id}`,
    method: 'delete',
    ...config
  });
