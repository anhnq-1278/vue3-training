import axios, { type AxiosInstance } from "axios"

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://api.congvinh.cloud',
});

axiosClient.interceptors.request.use(function (config) {
  const token: string = localStorage.getItem('token') || '';

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});


export default axiosClient;