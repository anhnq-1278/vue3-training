import { defineStore } from 'pinia'
import { ref } from 'vue'
import accountApi from '../api/accountApi'
import type { Account } from '@/interface/auth.dto'


export const useAccountStore = defineStore('account', () => {
  const account = ref<Account>({
    _id: '',
    email: '',
    username: '',
    createAt: '',
    updateAt: '',
    token: '',
    refreshToken: '',
    address: '',
    birthday: '',
    phone: '',
    name: '',
  })

  const getAccount = async () => {
    const { data }: { data: Account } = await accountApi.getAccount();
    account.value = data
  }

  const login = async (email: string, password: string) => {
    const { data }: { data: Account } = await accountApi.login({
      email,
      password
    })
    const token: string = data.token || ''
    localStorage.setItem('token', token)
  }

  const register = async (username: string, email: string, password: string) => {
    await accountApi.register({
      username,
      email,
      password
    })
  }

  const update = async (data: FormData) => {
    await accountApi.update(data);
  }

  return {
    getAccount,
    account,
    login,
    register,
    update
  }
})
