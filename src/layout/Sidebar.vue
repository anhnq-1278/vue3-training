<template>
  <div class="h-full w-[290px] mt-[50px]">
    <div class="px-2.5 py-2.5 text-base">
      <h3 class="leading-[29px] text-xl font-medium text-[24px] py-2.5">Menu</h3>
      <router-link :to="{ name: RouterName.Profile }">
        <SidebarItem>
          <template #logo>
            <Profile />
          </template>
          <template #name>
            <span>Profile</span>
          </template>
        </SidebarItem>
      </router-link>
      <router-link :to="{ name: 'home' }">
        <SidebarItem>
          <template #logo>
            <YourTodo />
          </template>
          <template #name>
            <span>Your Todo</span>
          </template>
        </SidebarItem>
      </router-link>
      <SidebarItem>
        <template #logo>
          <ChangePasswordIcon />
        </template>
        <template #name>
          <span>Change Password</span>
        </template>
      </SidebarItem>
      <SidebarItem @click="handleLogout">
        <template #logo>
          <Logout />
        </template>
        <template #name>
          <span>Logout</span>
        </template>
      </SidebarItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logout from '@/components/icons/Logout.vue'
import Profile from '@/components/icons/ProfileIcon.vue'
import ChangePasswordIcon from '@/components/icons/ChangePassword.vue'
import YourTodo from '@/components/icons/YourTodo.vue'
import SidebarItem from '@/components/common/SidebarItem/SidebarItem.vue'
import CommonStore from '@/store/Common'
import { useRouter } from 'vue-router'
import { RouterName } from '@/router/constant'

const commonStore = CommonStore()
const router = useRouter()

function handleLogout() {
  commonStore.logout()
  router.push({ name: RouterName.Login })
}
</script>

<style lang="scss" scoped></style>
