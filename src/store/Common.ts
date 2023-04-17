import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TLogin } from '@/model/Auth'
import { authService } from '@/services';

export default defineStore('common', () => {
  const isLoading = ref<boolean>(false)

  const setLoading = (status: boolean) => {
    isLoading.value = status
  }


  async function login(payload: TLogin) {
    return await authService.login(payload);
  }

  return { isLoading, setLoading, login }
})
