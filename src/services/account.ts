import type { TDataAccount } from '@/model/Auth'
import APIService from './api'

class AccountService extends APIService {
  constructor() {
    super()
  }

  getMyAccount() {
    return this.axios.get<TDataAccount>('my-account')
  }
}

export default AccountService
