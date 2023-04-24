import axiosClient from './apiClient'
const userApi = {
  getUsers(page: number, limit: number) {
    const url = '/users'
    return axiosClient.get(url, { params: { page, limit } })
  },
  searchUser(query: string) {
    const url = '/users/search'
    return axiosClient.get(url, { params: { q: query } })
  }

}

export default userApi
