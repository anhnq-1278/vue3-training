<template>
  <FilterPopup />
  <RefTest />
  <div>
    <input ref="input" type="text" class="h-12 w-[50%] border border-red-400" />
  </div>
</template>
<script setup lang="ts">
import FilterPopup from '@/components/FilterPopup.vue'
import RefTest from '@/components/RefTest.vue'
import { onMounted, ref } from 'vue'

const input = ref(null)

onMounted(() => {
  input.value.focus()
  input.value.value = 'phuc'
  input.value.draggable = true

})
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
