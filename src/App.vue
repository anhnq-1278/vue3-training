<script setup lang="ts">
import AppLoading from '@/components/common/app-loading.vue'

import CommonStore from '@/store/common'
const store = CommonStore()
</script>

<template>
  <RouterView />
  <notifications />
  <app-loading v-if="store.isLoading" />
</template>
