import type { TFormRequestRegister, TFormRequestLogin } from '@/model/Auth'
import http from './api'

const AuthApi = {
  register(data: TFormRequestRegister) {
    return http.post('register', data)
  },
  login(data: TFormRequestLogin) {
    return http.post('login', data)
  }
}

export default AuthApi
