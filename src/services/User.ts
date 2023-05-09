import APIService from './api'
import type {
  IUserListResponse,
  TUserListParams,
  TSearchUserParams,
  TSearchUser
} from '@/model/User'
import type { TProfile } from '@/model/Profile'


class UserService extends APIService {
  constructor() {
    super()
  }

  async getUserList(params: TUserListParams): Promise<IUserListResponse> {
    return await this.axios.get('/users', { params })
  }

  async getUserDetail(id: string) {
    return await this.axios.get<TProfile>(`/user/${id}`)
  }

  async searchUser(params: TSearchUserParams) {
    return await this.axios.get<TSearchUser[]>('/users/search', { params })
  }
}

export default UserService
