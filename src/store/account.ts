import { defineStore } from 'pinia'
import { ref } from 'vue'
import accountApi from '../api/accountApi'

interface Account {
  _id: string;
  email: string;
  username: string;
  isActive: boolean;
  createAt: string;
  updateAt: string;
  token: string;
  refreshToken: string
}

interface AccountResponse {
  data: {
    data: Account
  }
}

export const useAccountStore = defineStore('account', () => {
  const account = ref<Account>()
  const getAccount = async () => {
    const { data }: AccountResponse = await accountApi.getAccount();
    account.value = data.data
  }

  const login = async (email: string, password: string) => {
    const data: AccountResponse = await accountApi.login({
      email,
      password
    })
    const { token }: { token: string } = data.data.data
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
