import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('common', () => {
  const isLoading = ref<boolean>(false)

  const setLoading = (status: boolean) => {
    isLoading.value = status
  }

  return { isLoading, setLoading }
})
