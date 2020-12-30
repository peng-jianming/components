import queryString from 'query-string';
import { unescape } from 'lodash';

export const getURIParams = (url = unescape(location.search)) =>
  queryString.parse(url, {
    arrayFormat: 'bracket',
    parseNumbers: true,
    parseBooleans: true,
    decode: false
  });
