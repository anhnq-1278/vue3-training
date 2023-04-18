import axios from 'axios'
import type { AxiosResponse, AxiosInstance, AxiosError } from 'axios'

class APIService {
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      headers: { 'Content-Type': 'application/json' },
      baseURL: import.meta.env.VITE_APP_BASE_API_URL
    })
    this.axios.interceptors.response.use(this.handleResponseSuccess, this.handleResponseFail)
    this.axios.interceptors.request.use(
      (config) => {
        // Add a custom header
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // Add request interceptors

  private handleResponseSuccess(response: AxiosResponse) {
    return response
  }

  private handleResponseFail(error: AxiosError) {
    return Promise.reject(error)
  }
}

export default APIService
