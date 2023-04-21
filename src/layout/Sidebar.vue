<template>
  <div class="h-full w-[290px]">
    <div class="px-2.5 py-2.5 text-base">
      <h3 class="leading-[29px] text-xl font-medium text-[24px] py-2.5">Vue js</h3>
      <div
        @click="handleLogout"
        class="flex items-center cursor-pointer gap-x-2 font-medium text-2xl hover:bg-slate-400 hover:text-white-fb transition-all duration-1000 w-full h-8"
      >
        <Logout />
        <span>Logout</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logout from '@/components/icons/Logout.vue'
import CommonStore from '@/store/Common'
import { useRouter } from 'vue-router'
import { RouterName } from '@/router/constant'


const commonStore = CommonStore()
const router = useRouter()

function handleLogout() {  
  commonStore.logout()
  router.push({name: RouterName.Login})
}
</script>

<style scoped></style>
