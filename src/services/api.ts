import axios from 'axios'
import type { AxiosInstance } from 'axios'

import LocalStorage from '@/constants/LocalStorage'

class APIService {
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API_URL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    })
    this.axios.interceptors.response.use(this.handleResponseSuccess, this.handleResponseFail)
    this.axios.interceptors.request.use(
      (config) => {
        const accessToken = 'Bearer ' + localStorage.getItem(LocalStorage.ACCESS_TOKEN)
        if (accessToken) {
          config.headers.authorization = accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error.response)
      }
    )
  }

  handleResponseSuccess(response: any) {
    return response.data
  }

  handleResponseFail(error: any) {
    return Promise.reject(error.response)
  }
}

export default APIService
