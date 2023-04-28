import APIService from './api'
import type { TParams, TResponse, TSearch } from '@/type/ListUsers'

class ListUsers extends APIService {
  constructor() {
    super()
  }

  async getListUsers(data?: TParams) {
    return await this.axios.get<TResponse>('/users', { params: data })
  }

  async getListSearch(params: TSearch) {
    return await this.axios.get<TResponse>('/users/search', { params })
  }
}

export default ListUsers
