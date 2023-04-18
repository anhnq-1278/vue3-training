import APIService from './api'
import type { TLogin, TRegister } from '@/model/Auth'

class AuthService extends APIService {
  constructor() {
    super()
  }

  login(data: TLogin) {
    return this.axios.post<{
      token: string
      data: { token: string }
    }>('/login', data)
  }

  register(data: TRegister) {
    return this.axios.post<{
      token: string
      data: { token: string }
    }>('/register', data)
  }
}

export default AuthService
