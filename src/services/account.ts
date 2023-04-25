import type { TDataAccount } from '@/model/Auth'
import APIService from './api'
import type { TFormChangePW, TUpdateAccount } from '@/model/Account'

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
}

export default AccountService
