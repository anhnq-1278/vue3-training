import { defineStore } from 'pinia'
import { ref } from 'vue'
import userApi from '../api/userApi'
import type { UserDTO, SearchUserDTO } from '@/interface/user.dto'

export const useUserStore = defineStore('user', () => {
  const listUser = ref<Array<UserDTO>>([])
  const listSearchUser = ref<Array<SearchUserDTO>>([])
  const getUsers = async (page: number, limit: number) => {
    const { data }: { data: UserDTO[] } = await userApi.getUsers(page, limit);
    listUser.value = data
  }

  const searchUsers = async (query: string) => {
    const { data }: { data: SearchUserDTO[] } = await userApi.searchUser(query);
    listSearchUser.value = data
  }

  return {
    getUsers,
    listUser,
    searchUsers,
    listSearchUser
  }
})
