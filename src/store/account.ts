import { defineStore } from 'pinia'
import { ref } from 'vue'
import accountApi from '../api/accountApi'
import  type { Account } from '@/interface/auth.dto'


export const useAccountStore = defineStore('account', () => {
  const account = ref<Account>()
  const getAccount = async () => {
    const {data} : {data: Account} = await accountApi.getAccount();
    account.value = data
  }

  const login = async (email: string, password: string) => {
    const { data }: { data: Account } = await accountApi.login({
      email,
      password
    })
    const { token }: { token: string } = data
    localStorage.setItem('token', token)
  }

  const register = async (username: string, email: string, password: string) => {
    await accountApi.register({
      username,
      email,
      password
    })
  }

  return {
    getAccount,
    account,
    login,
    register
  }
})
