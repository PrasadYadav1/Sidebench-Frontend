import { User } from '../login/types';

export const clearLocalStorage = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('firstname');
  localStorage.removeItem('lastname');
};

export const setAccessToken = (token: string) =>
  localStorage.setItem('token', token);
export const getAccessToken = () => localStorage.getItem('token');

export const getLocalStorageData = () => {
  return {
    email: localStorage.getItem('email') ?? '',
    name: localStorage.getItem('name') ?? '',
    firstname: localStorage.getItem('firstname') ?? '',
    lastname: localStorage.getItem('lastname') ?? '',
    id: localStorage.getItem('id') ?? '',
    roleName: localStorage.getItem('roleName') ?? '',
    accessToken: localStorage.getItem('token') ?? ''
  };
};
export default getLocalStorageData;

export const setLocalStorageData = (data: User) => {
  localStorage.setItem('email', data.email);
  localStorage.setItem('name', `${data.firstname} ${data.lastname}`);
  localStorage.setItem('firstname', data.firstname);
  localStorage.setItem('lastname', data.lastname);
  localStorage.setItem('id', String(data.id));
  localStorage.setItem('roleName', data.role.name);
  localStorage.setItem('token', data.token);
};