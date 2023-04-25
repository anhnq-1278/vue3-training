import type { TDataAccount } from '@/model/Auth'
import APIService from './api'
import type { TUpdateAccount } from '@/model/Account'

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
}

export default AccountService
