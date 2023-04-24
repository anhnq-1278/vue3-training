import { defineStore } from 'pinia'
import { ref } from 'vue'
import userApi from '../api/userApi'
import type { UserDTO, SearchUserDTO } from '@/interface/user.dto'


interface UserResponse {
  data: {
    data: UserDTO[]
  };
}

interface SearchUserResponse {
  data: {
    data: SearchUserDTO[]
  };
}

export const useUserStore = defineStore('user', () => {
  const listUser = ref<Array<UserDTO>>([])
  const listSearchUser = ref<Array<SearchUserDTO>>([])
  const getUsers = async (page: number, limit: number) => {
    const data: UserResponse = await userApi.getUsers(page, limit);
    listUser.value = data.data.data
  }

  const searchUsers = async (query: string) => {
    const data: SearchUserResponse = await userApi.searchUser(query);
    listSearchUser.value = data.data.data
  }

  return {
    getUsers,
    listUser,
    searchUsers,
    listSearchUser
  }
})
