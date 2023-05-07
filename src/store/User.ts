import { defineStore } from 'pinia'
import { userService } from '@/services'
import type { TUserListParams } from '@/model/User'

export default defineStore('user', () => {
  async function getUserList(params: TUserListParams) {
    return await userService.getUserList(params)
  }

  return { getUserList }
})
