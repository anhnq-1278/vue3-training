import { defineStore } from 'pinia'
import { userService } from '@/services'
import type { TSearchUser, TSearchUserParams, TUserListParams } from '@/model/User'

export default defineStore('user', () => {
  async function getUserList(params: TUserListParams) {
    return await userService.getUserList(params)
  }

  async function getSearchUser(params: TSearchUserParams) {
    return await userService.searchUser(params)
  }
  async function getUserDetail(id: string) {
    return await userService.getUserDetail(id)
  }

  return { getUserList, getSearchUser, getUserDetail }
})
