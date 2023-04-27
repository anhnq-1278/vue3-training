<template>
  <div class="base-layout">
    <header-fixed
      @logout="handleLogout"
      @setting="handleSetting"
      @list-users="handleRedirectUserPage"
    />

    <div class="content-wrapper pt-[60px]">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import headerFixed from '@/components/header-fixed.vue'
import { RouteName } from '@/constants'
import Common from '@/store/Common'
import { useRouter } from 'vue-router'

const commonStore = Common()
const router = useRouter()

const handleRedirectUserPage = () => {
  router.push({ name: RouteName.USERS })
}

const handleLogout = () => {
  commonStore.logout()

  router.push({ name: RouteName.LOGIN })
}

const handleSetting = () => {
  router.push({ name: RouteName.SETTING })
}
</script>
