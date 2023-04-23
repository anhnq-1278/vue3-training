<template>
  <FilterPopup />
  <RefTest />
</template>
<script setup lang="ts">
import FilterPopup from '@/components/FilterPopup.vue'
import RefTest from '@/components/RefTest.vue'

</script>

<style lang="scss" scoped>
@import '@/assets/styles/index';

:deep() {
  .ct-scrollbar {
    &::-webkit-scrollbar {
      width: 7px;
      background: #f4f7fb;
    }
    &::-webkit-scrollbar-thumb {
      background: #c4c4c4;
      border-radius: 26px;
    }
  }
}
</style>
