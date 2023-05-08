import axiosClient from './apiClient'
import type { UserResponse, SearchUserResponse, UserDetailResponse } from '@/interface/user.dto'

const userApi = {
  async getUsers(page: number, limit: number) {
    const url = '/users'
    const { data }: UserResponse = await axiosClient.get(url, { params: { page, limit } })
    return data
  },
  async getUserDetail(id: string) {
    const url = `/user/${id}`
    const { data }: UserDetailResponse = await axiosClient.get(url)
    return data
  },
  async searchUser(query: string) {
    const url = '/users/search'
    const { data }: SearchUserResponse = await axiosClient.get(url, { params: { q: query } })
    return data
  }

}

export default userApi
