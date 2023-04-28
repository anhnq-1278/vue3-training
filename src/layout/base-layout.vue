<template>
  <div class="base-layout">
    <header-fixed
      :data-search="dataSearch"
      @logout="handleLogout"
      @setting="handleSetting"
      @list-users="handleRedirectUserPage"
      @change-search="handleChangeSearch"
    />

    <div class="content-wrapper pt-[60px]">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import headerFixed from '@/components/header-fixed.vue'
import { RouteName } from '@/constants'
import { useRouter } from 'vue-router'
import Common from '@/store/Common'
import Account from '@/store/Account'
import { debounce } from '@/utils'
import type { TResponseSearchUser } from '@/model/Account'

const commonStore = Common()
const accountStore = Account()
const router = useRouter()

const searchValue = ref('')
const dataSearch = ref<TResponseSearchUser[]>([])

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

const handleChangeSearch = ($event: any) => {
  searchValue.value = $event
}

const getListSearch = debounce(async () => {
  if (searchValue.value === '') {
    dataSearch.value = []
    return
  }

  const { data } = await accountStore.getListSearchUsers(searchValue.value)

  dataSearch.value = data
}, 300)

watch(searchValue, () => {
  getListSearch()
})
</script>
