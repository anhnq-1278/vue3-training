import type { TFormRequestRegister, TFormRequestLogin, TDataAccount } from '@/model/Auth'
import APIService from './api'

class AuthService extends APIService {
  constructor() {
    super()
  }

  register(data: TFormRequestRegister) {
    return this.axios.post<TDataAccount>('register', data)
  }

  login(data: TFormRequestLogin) {
    return this.axios.post<TDataAccount>('login', data)
  }
}

export default AuthService
