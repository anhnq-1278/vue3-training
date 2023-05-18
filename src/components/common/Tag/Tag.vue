<template>
  <div
    :class="[
      'flex items-center justify-center rounded-md w-[48px] h-[22px] text-[12px] font-medium leading-[18px]',
      statusFormat.class
    ]"
  >
    {{ statusFormat.name }}
  </div>
</template>
<script lang="ts" setup>
import { STATUS } from '@/constants'
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: Number,
    default: 1
  }
})

const statusFormat = computed(() => {
  switch (props.status) {
    case STATUS.Cancel:
      return {
        name: '未対応',
        class: 'text-[#9B1C1C] bg-[#FDE8E8]'
      }
    case STATUS.Waiting:
      return {
        name: '対応中',
        class: 'text-[#1E429F] bg-[#E1EFFE]'
      }
    case STATUS.Completion:
      return {
        name: '完了',
        class: 'text-[#111928] bg-[#F3F4F6]'
      }
    default:
      return {}
  }
})
</script>
<style lang="scss" scoped></style>
