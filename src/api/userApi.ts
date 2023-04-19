import axiosClient from './apiClient'
import type { UserRegister, UserLogin } from '../interface/auth.dto'
const userApi = {
  async signUp({ email, password }: UserLogin) {
    const url = '/login'
    return axiosClient.post(url, {
      email,
      password
    })
  },
  register({ username, email, password }: UserRegister) {
    const url = '/register'

    return axiosClient.post(url, {
      email,
      username,
      password
    })
  }
}

export default userApi
