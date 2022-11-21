import axiosInstance, { axiosInstanceWithAuth } from './axios';

const postApi = (url: string, data: any) =>
  axiosInstance(url, {
    method: 'POST',
    data
  });

export const putApi = (url: string, data: any) =>
  axiosInstance(url, {
    method: 'PUT',
    data
  });

export const deleteApiWithAuth = (url: string) =>
  axiosInstanceWithAuth(url, {
    method: 'DELETE'
  });

export const postApiWithAuth = (url: string, data: any) =>
  axiosInstanceWithAuth(url, {
    method: 'POST',
    data
  });

export const putApiWithAuth = (url: string, data: any) =>
  axiosInstanceWithAuth(url, {
    method: 'PUT',
    data
  });

export const getApi = (
  url: string,
  queryParams?: Record<string, string | number | Array<string | number>>
) => {
  let query = '';
  const params = queryParams ?? {};
  Object.keys(params).forEach((qp) => {
    if (Array.isArray(params[qp])) {
      (params[qp] as unknown as Array<string | number>).forEach((qpv) => {
        query += `${qp}=${qpv}&`;
      });
    } else {
      query += `${qp}=${params[qp]}&`;
    }
  });
  query = query.substring(0, query.length - 1);
  return axiosInstanceWithAuth(`${url}${query ? `?${query}` : ``}`, {
    method: 'GET'
  });
};
export default postApi;
