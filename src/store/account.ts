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

  return {
    getAccount,
    account
  }
})
