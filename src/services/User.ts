import APIService from './api'
import type { IUserListResponse, TUserListParams, TUser, TMeta } from '@/model/User'

class UserService extends APIService {
  constructor() {
    super()
  }

  async getUserList(params: TUserListParams): Promise<IUserListResponse> {
    return await this.axios.get('/users', { params })
  }
}

export default UserService
