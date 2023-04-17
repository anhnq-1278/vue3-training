import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TFormRequestLogin, TFormRequestRegister } from '@/model/Auth'
import { AuthService } from '@/services'
import LocalStorage from '@/constants/LocalStorage'

export default defineStore('common', () => {
  const isLoading = ref(false)
  const isLoggedIn = ref(false)

  const setLoading = (status: boolean) => {
    isLoading.value = status
  }

  const register = async (payload: TFormRequestRegister) => {
    const { data } = await AuthService.register(payload)

    isLoggedIn.value = true
    localStorage.setItem(LocalStorage.IS_LOGGED_IN, '1')
    localStorage.setItem(LocalStorage.ACCESS_TOKEN, data.token)
  }

  const login = async (payload: TFormRequestLogin) => {
    const { data } = await AuthService.login(payload)

    isLoggedIn.value = true
    localStorage.setItem(LocalStorage.IS_LOGGED_IN, '1')
    localStorage.setItem(LocalStorage.ACCESS_TOKEN, data.token)
  }

  return { isLoading, isLoggedIn, setLoading, register, login }
})
