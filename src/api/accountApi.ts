import axiosClient from './apiClient'
import type { UserRegister, UserLogin, AccountResponse } from '@/interface/auth.dto'

const accountApi = {
  async getAccount() {
    const url = '/my-account'
    const { data }: AccountResponse = await axiosClient.get(url)
    return data
  },
  async login({ email, password }: UserLogin) {
    const url = '/login'
    const { data }: AccountResponse = await axiosClient.post(url, {
      email,
      password
    })
    return data
  },
  register({ username, email, password }: UserRegister) {
    const url = '/register'

    return axiosClient.post(url, {
      email,
      username,
      password
    })
  },
  update(data: FormData) {
    const url = '/my-account/update'

    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default accountApi
