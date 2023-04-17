import axios from 'axios'
import type { AxiosInstance } from 'axios'

import LocalStorage from '@/constants/LocalStorage'

class APIService {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API_URL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    })
    this.instance.interceptors.response.use(this.handleResponseSuccess, this.handleResponseFail)
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN)
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

  get(url: any, config = undefined) {
    return this.instance.get(url, config)
  }
  post(url: any, data: any, config = undefined) {
    return this.instance.post(url, data, config)
  }
  put(url: any, data: any, config = undefined) {
    return this.instance.put(url, data, config)
  }
  delete(url: any, data: any, config: any = undefined) {
    return this.instance.delete(url, {
      data,
      ...config
    })
  }
}

const http = new APIService()
export default http
