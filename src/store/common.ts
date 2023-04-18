import { defineStore } from 'pinia'
import { ref } from 'vue'
import { commonService } from '@/services'
import type { TRequestAuth, TResAccount } from '@/type/Common'
import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()

export default defineStore('auth', () => {
  const isLoading = ref(false)
  const myAccount = ref<TResAccount>({} as TResAccount)

  function setLoading(status: boolean) {
    isLoading.value = status
  }

  async function login(payload: TRequestAuth) {
    const { data, message } = await commonService.login(payload)

    notify({
      type: 'success',
      title: message
    })
    localStorage.setItem('access_token', data.token)
  }

  async function register(payload: TRequestAuth) {
    const { data, message } = await commonService.register(payload)

    notify({
      type: 'success',
      title: message
    })
    localStorage.setItem('access_token', data.token)
  }

  async function getMyAccount() {
    const { data } = await commonService.getMyAccount()

    return data
  }

  return { setLoading, login, isLoading, myAccount, register, getMyAccount }
})
