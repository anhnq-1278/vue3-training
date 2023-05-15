<template>
<<<<<<< HEAD
  <div class="w-[839px] mx-auto pt-10 flex flex-col gap-10">
    <DatePickerSingle />
    <DatePickerFull />
  </div>
  <!-- <FilterPopup />
  <RefTest /> -->
=======
  <FilterPopup />
  <RefTest />
  <div>
    <input ref="input" type="text" class="h-12 w-[50%] border border-red-400" />
  </div>
>>>>>>> 9925fd464d826082712c1c931912e14afd4c1d7f
</template>
<script setup lang="ts">
import FilterPopup from '@/components/FilterPopup.vue'
import RefTest from '@/components/RefTest.vue'
<<<<<<< HEAD
import DatePickerFull from '@/components/common/DatePicker/DatePickerFull.vue'
import DatePickerSingle from '@/components/common/DatePicker/DatePickerSingle.vue'
=======
import { onMounted, ref } from 'vue'

const input = ref(null)

onMounted(() => {
  input.value.focus()
  input.value.value = 'phuc'
  input.value.draggable = true

})
>>>>>>> 9925fd464d826082712c1c931912e14afd4c1d7f
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
