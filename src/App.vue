<template>
  <RouterView />
  <notifications position="bottom right" />
  <loading-app v-if="store.isLoading" />
</template>

<script setup lang="ts">
import LoadingApp from '@/components/loading-app.vue'
import CommonStore from '@/store/Common'

const store = CommonStore()
</script>

<style lang="scss">
@import '@/assets/main.css';
@import '@/assets/index';
</style>
