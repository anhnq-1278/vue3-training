import type { TRequestAuth, TResAccount } from '@/type/Common'
import APIService from './api'

class Auth extends APIService {
  constructor() {
    super()
  }

  async register(params: TRequestAuth) {
    const { data } = await this.axios.post<{ data: TResAccount; message: string }>(
      'register',
      params
    )

    return data
  }

  async login(params: TRequestAuth) {
    const { data } = await this.axios.post<{ data: TResAccount; message: string }>('login', params)

    return data
  }

  async getMyAccount() {
    const { data } = await this.axios.get<{ data: TResAccount }>('my-account')

    return data
  }
}

export default Auth
