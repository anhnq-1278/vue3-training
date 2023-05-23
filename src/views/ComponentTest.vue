<template>
  <FilterPopup />
</template>
<script setup lang="ts">
import FilterPopup from '@/components/FilterPopup.vue'
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index';

:deep() {
  .ct-scrollbar {
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: #fff;
    }
    &::-webkit-scrollbar-thumb {
      background: #6b7280;
      border-radius: 3px;
    }
  }
}
</style>
