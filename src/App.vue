<script setup lang="ts">
import AppLoading from '@/components/common/app-loading.vue'
import AppLayout from '@/layouts/layout-app.vue'
import CommonStore from '@/store/common'
const store = CommonStore()
</script>

<template>
  <AppLayout />
  <notifications />
  <app-loading v-if="store.isLoading" />
</template>
