import axios, { type AxiosInstance } from 'axios'
import { RouterName } from '@/router/constant'
import routes from '@/router'

export default class APIService {
  axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL || 'https://api.congvinh.cloud',
      headers: { 'Content-Type': 'application/json' }
    })
    this.axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
    this.axios.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse)
  }

  handleSuccessResponse(response: any) {
    return response.data
  }

  handleErrorResponse(error: any) {
    if (error.response.status === '403' && error.response.data.message === 'Forbidden') {
      if (routes.currentRoute.value.name !== RouterName.Login) {
        localStorage.removeItem('access_token')
        routes.push({ name: RouterName.Login })
      }
    }

    return Promise.reject(error.response)
  }
}
