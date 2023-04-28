import type { TParams } from '@/model/Account'
import { AccountService } from '@/services'
import { defineStore } from 'pinia'

export default defineStore('account', () => {
  const getListUsers = async (payload: TParams) => {
    return await AccountService.getListUsers(payload)
  }

  const getListSearchUsers = async (payload: string) => {
    return await AccountService.getListSearchUsers(payload)
  }

  return { getListUsers, getListSearchUsers }
})
