import type { TProfile, TChangePassword } from '@/model/Profile'
import APIService from './api'
import type { TLogin, TRegister } from '@/model/Auth'

class ProfileService extends APIService {
  constructor() {
    super()
  }

  async getProfile() {
    return this.axios.get<TProfile>('/my-account')
  }

  async updateProfile(profile: TProfile) {
    return this.axios.put('/my-account/update', profile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async changePassword(data: TChangePassword) {
    return await this.axios.put('/my-account/change-password', data)
  }
}

export default ProfileService
