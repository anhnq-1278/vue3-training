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
      <Popover class="relative">
        <PopoverButton class="focus-visible:outline-none"
          >Hello, {{ myAccount.username }}</PopoverButton
        >

        <PopoverPanel
          v-slot="{ close }"
          class="absolute bg-white right-[-20px] top-[41px] shadow-lg"
        >
          <div
            class="px-10 py-2 cursor-pointer hover:bg-pink-f5 duration-200"
            @click="handleClickSetting(close)"
          >
            Setting
          </div>
          <div
            class="px-10 py-2 cursor-pointer hover:bg-pink-f5 duration-200"
            @click="emit('logout')"
          >
            Logout
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

import { storeToRefs } from 'pinia'
import CommonStore from '@/store/Common'
import { useRouter } from 'vue-router'
import { RouteName } from '@/constants'

const { myAccount } = storeToRefs(CommonStore())
const router = useRouter()

const emit = defineEmits<{
  (e: 'logout'): void
  (e: 'setting'): void
}>()

const handleClickLogo = () => {
  router.push({ name: RouteName.HOME })
}

const handleClickSetting = (close: any) => {
  emit('setting')
  close()
}
</script>
