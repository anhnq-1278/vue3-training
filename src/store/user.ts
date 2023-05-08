import { defineStore } from 'pinia'
import { ref } from 'vue'
import userApi from '../api/userApi'
import type { UserDTO, SearchUserDTO, MetaDTO } from '@/interface/user.dto'

export const useUserStore = defineStore('user', () => {
  const listUser = ref<Array<UserDTO>>([])
  const listSearchUser = ref<Array<SearchUserDTO>>([])
  const metaData = ref<MetaDTO>()
  const userDetail = ref<UserDTO>({
    _id: '',
    email: '',
    username: '',
    isActive: false,
    createAt: '',
  });

  const getUsers = async (page: number, limit: number) => {
    const { data, meta }: { data: UserDTO[]; meta: MetaDTO } = await userApi.getUsers(page, limit);
    listUser.value = data
    metaData.value = meta
  }

  const getUserDetail = async (id: string) => {
    const { data }: { data: UserDTO } = await userApi.getUserDetail(id);
    userDetail.value = data
  }

  const searchUsers = async (query: string) => {
    const { data }: { data: SearchUserDTO[] } = await userApi.searchUser(query);
    listSearchUser.value = data
  }

  return {
    getUsers,
    listUser,
    searchUsers,
    listSearchUser,
    metaData,
    getUserDetail,
    userDetail
  }
})
