<template>
  <div class="h-full w-[290px] mt-[50px]">
    <div class="px-2.5 py-2.5 text-base">
      <h3 class="leading-[29px] text-xl font-medium text-[24px] py-2.5">Menu</h3>
      <template v-for="(menu, index) in menus" :key="index">
        <router-link :to="{ name: `${menu.routerName}` }">
          <SidebarItem>
            <template #logo>
              <component :is="components[menu.logo]" />
            </template>
            <template #name>
              <span>{{ menu.sidebarName }}</span>
            </template>
          </SidebarItem>
        </router-link>
      </template>
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
import { defineComponent } from 'vue'

const menus = [
  {
    routerName: RouterName.Profile,
    logo: 'Profile',
    sidebarName: 'Profile'
  },
  {
    routerName: RouterName.Home,
    logo: 'YourTodo',
    sidebarName: 'Your todo'
  },
  {
    routerName: RouterName.ChangePassword,
    logo: 'ChangePasswordIcon',
    sidebarName: 'Change Password'
  }
]

const components = defineComponent({
  Profile,
  YourTodo,
  ChangePasswordIcon
})

const commonStore = CommonStore()
const router = useRouter()

function handleLogout() {
  commonStore.logout()
  router.push({ name: RouterName.Login })
}
</script>

<style lang="scss" scoped></style>
