import axios from 'axios';
import getAPIUrl from '../config';

// use this for calling public apis
const axiosInstance = axios.create({
  baseURL: getAPIUrl(),
  headers: {
    'content-type': 'application/json'
  },
  responseType: 'json'
});

// use this for calling apis which need authentication
export const axiosInstanceWithAuth = axios.create({
  baseURL: getAPIUrl(),
  headers: {
    'content-type': 'application/json'
  },
  responseType: 'json'
});

export default axiosInstance;
