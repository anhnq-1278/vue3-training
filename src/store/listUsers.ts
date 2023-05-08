import { listUsersService } from '@/services'
import type { TParams, TSearch } from '@/type/ListUsers'
import { defineStore } from 'pinia'

export default defineStore('listUsers', () => {
  const getListUsers = async (payload?: TParams) => {
    return await listUsersService.getListUsers(payload)
  }

  const getListSearch = async (payload: TSearch) => {
    return await listUsersService.getListSearch(payload)
  }

  const getDetailUser = async (id: string) => {
    return await listUsersService.getDetailUser(id)
  }

  return { getListUsers, getListSearch, getDetailUser }
})
