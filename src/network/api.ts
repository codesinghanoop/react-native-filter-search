import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BASE_URL } from './endpoints';

export default (): AxiosInstance => {

  let axiosInstance: AxiosInstance = axios.create({
    _retryCount: 0,
    baseURL: BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  } as AxiosRequestConfig);

  axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    let errorJson = JSON.stringify(error);
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  });

  return axiosInstance;
};