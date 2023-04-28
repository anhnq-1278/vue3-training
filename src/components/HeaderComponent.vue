<template>
  <header class="bg-[#1abc9c] flex justify-end pr-14 h-24 w-full items-center">
    <div class="flex items-center relative">
      hieuhh
      <img
        :src="account.avatar"
        alt=""
        class="h-10 w-10 ml-4 rounded-full"
        @click="isOpen = !isOpen"
      />
      <ul v-if="isOpen" class="bg-white absolute top-[45px] left-0 w-full shadow-todo">
        <li class="pl-3 cursor-pointer hover:bg-green-300"><a href="/info">info</a></li>
        <li class="pl-3 cursor-pointer hover:bg-green-300" @click="logout">logout</li>
      </ul>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/store/account'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
const router = useRouter()

const isOpen = ref<boolean>(false)

const logout = () => {
  localStorage.setItem('token', '')
  router.push('/login')
}
</script>
