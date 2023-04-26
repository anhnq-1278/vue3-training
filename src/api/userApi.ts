import axiosClient from './apiClient'
import type { UserResponse, SearchUserResponse } from '@/interface/user.dto'

const userApi = {
  async getUsers(page: number, limit: number) {
    const url = '/users'
    const { data }: UserResponse = await axiosClient.get(url, { params: { page, limit } })
    return data
  },
  async searchUser(query: string) {
    const url = '/users/search'
    const { data }: SearchUserResponse = await axiosClient.get(url, { params: { q: query } })
    return data
  }

}

export default userApi
