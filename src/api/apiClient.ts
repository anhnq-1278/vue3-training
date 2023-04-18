import axios from "axios"

const axiosClient = axios.create({
  baseURL: 'https://api.congvinh.cloud',
});

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token
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