<template>
  <div class="w-[839px] mx-auto pt-10 flex flex-col gap-10">
    <date-picker-one />
    <date-picker-two />
    <radio-option :options="options" @change="onChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DatePickerOne from '@/components/date-picker-one.vue'
import DatePickerTwo from '@/components/date-picker-two.vue'
import radioOption from '@/components/radio-option.vue'

const options = ref([
  {
    value: 'a',
    label: '男性'
  },
  {
    value: 'b',
    label: '女性'
  },
  {
    value: 'c',
    label: 'その他'
  }
])

const onChange = (value: any) => {
  console.log(value)
}
</script>
