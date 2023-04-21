import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TDataAccount, TFormRequestLogin, TFormRequestRegister } from '@/model/Auth'
import { AccountService, AuthService } from '@/services'
import { LocalStorage } from '@/constants'

export default defineStore('common', () => {
  const isLoading = ref(false)
  const isLoggedIn = ref(false)
  const myAccount = ref<TDataAccount>({} as TDataAccount)

  const setLoading = (status: boolean) => {
    isLoading.value = status
  }

  const register = async (payload: TFormRequestRegister) => {
    const { data } = await AuthService.register(payload)

    isLoggedIn.value = true
    myAccount.value = data

    localStorage.setItem(LocalStorage.IS_LOGGED_IN, '1')
    localStorage.setItem(LocalStorage.ACCESS_TOKEN, data.token)
  }

  const login = async (payload: TFormRequestLogin) => {
    const { data } = await AuthService.login(payload)

    isLoggedIn.value = true
    myAccount.value = data

    localStorage.setItem(LocalStorage.IS_LOGGED_IN, '1')
    localStorage.setItem(LocalStorage.ACCESS_TOKEN, data.token)
  }

  const logout = () => {
    isLoggedIn.value = false

    localStorage.removeItem(LocalStorage.IS_LOGGED_IN)
    localStorage.removeItem(LocalStorage.ACCESS_TOKEN)
  }

  const getMyAccount = async () => {
    try {
      isLoading.value = true

      const { data } = await AccountService.getMyAccount()

      myAccount.value = data
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, isLoggedIn, myAccount, setLoading, register, login, logout, getMyAccount }
})
