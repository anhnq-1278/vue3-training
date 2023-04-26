import APIService from './api'
import type { IProfile } from '@/type/Profile'

class Profile extends APIService {
  constructor() {
    super()
  }

  async editProfile(params: IProfile) {
    const { data } = await this.axios.put<{ message: string }>('my-account/update', params, {
      headers: { 'Content-Type': 'multipart/form-data;' }
    })

    return data
  }
}

export default Profile
