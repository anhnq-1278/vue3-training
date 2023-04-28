import APIService from './api'
import type { TParams, TResponse, TSearch } from '@/type/ListUsers'

class ListUsers extends APIService {
  constructor() {
    super()
  }

  async getListUsers(params?: TParams) {
    return await this.axios.get<TResponse>('/users', { params })
  }

  async getListSearch(params: TSearch) {
    return await this.axios.get<TResponse>('/users/search', { params })
  }
}

export default ListUsers
