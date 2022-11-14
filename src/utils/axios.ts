import axios from 'axios';
import getAPIUrl from '../config';
import { getAccessToken } from './commonHelpers';

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

axiosInstanceWithAuth.interceptors.request.use((request) => {
  const accToken = getAccessToken();
  if (accToken) {
    if (request.headers) {
      request.headers.Authorization = `Bearer ${accToken ?? ''}`;
    } else {
      request.headers = { Authorization: `Bearer ${accToken ?? ''}` };
    }
  }
  return request;
});

export default axiosInstance;
