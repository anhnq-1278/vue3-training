<template>
  <div
    class="px-8 h-[60px] bg-white fixed z-[50] w-full flex items-center shadow-[0_1px_8px_rgba(102,102,102,0.2)]"
  >
    <div class="flex justify-between items-center w-full">
      <h1
        class="text-[40px] leading-[60px] text-pink-8 font-extralight text-center cursor-pointer"
        @click="handleClickLogo"
      >
        todos app
      </h1>
      <div class="cursor-pointer" @click="isOpen = true" v-click-outside="onClickOutside">
        Hello, {{ myAccount.username }}
      </div>
    </div>
    <div class="popover absolute top-[60px] bg-white right-4" v-show="isOpen">
      <div class="px-10 py-2 cursor-pointer hover:bg-pink-f5 duration-200" @click="emit('setting')">
        Setting
      </div>
      <div class="px-10 py-2 cursor-pointer hover:bg-pink-f5 duration-200" @click="emit('logout')">
        Logout
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import CommonStore from '@/store/Common'
import { useRouter } from 'vue-router'
import { RouteName } from '@/constants'

const { myAccount } = storeToRefs(CommonStore())
const router = useRouter()

const isOpen = ref(false)

const emit = defineEmits<{
  (e: 'logout'): void
  (e: 'setting'): void
}>()

const onClickOutside = () => {
  if (!isOpen.value) return

  isOpen.value = false
}

const handleClickLogo = () => {
  router.push({ name: RouteName.HOME })
}
</script>
