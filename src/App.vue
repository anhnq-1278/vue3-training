<template>
  <RouterView />
  <div id="modals" class="relative z-20"></div>
  <notifications />
  <Loading v-if="store.isLoading" />
</template>
<script setup lang="ts">
import Loading from '@/components/common/Loading/Loading.vue'
import CommonStore from '@/store/Common'

const store = CommonStore()
</script>
<style lang="scss">
@import '@/assets/styles/index';
</style>
