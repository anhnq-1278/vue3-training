import type { TDataAccount } from '@/model/Auth'
import APIService from './api'
import type {
  TDataUser,
  TFormChangePW,
  TParams,
  TResponse,
  TResponseSearchUser,
  TUpdateAccount
} from '@/model/Account'

class AccountService extends APIService {
  constructor() {
    super()
  }

  getMyAccount() {
    return this.axios.get<TDataAccount>('my-account')
  }

  updateMyAccount(data: TUpdateAccount) {
    return this.axios.put('my-account/update', data, {
      headers: { 'Content-Type': 'multipart/form-data;' }
    })
  }

  changePassword(data: TFormChangePW) {
    return this.axios.put('my-account/change-password', data)
  }

  async getListUsers(data: TParams) {
    return await this.axios.get<TResponse>('/users', { params: data })
  }

  async getListSearchUsers(data: string) {
    return await this.axios.get<TResponseSearchUser[]>('/users/search', {
      params: { q: data }
    })
  }

  async getDetailUser(id: string) {
    return await this.axios.get<TDataUser>(`/user/${id}`)
  }
}

export default AccountService
