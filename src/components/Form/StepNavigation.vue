<template>
  <div class="stepper-navigation flex">
    <div class="flex items-center">
      <CheckCircle v-if="+step === 1" />
      <h4 class="font-[14px] leading-[21px] text-[#374151]">申請内容登録</h4>
    </div>
    <span class="line mx-2 inline-block w-[180px] h-[1px] bg-[#E5E7EB] my-auto"></span>
    <div class="flex items-center">
      <CheckCircle v-if="+step === 2" />
      <h4>申請内容確認</h4>
    </div>
    <span class="line mx-2 inline-block w-[180px] h-[1px] bg-[#E5E7EB] my-auto"></span>
    <div class="flex items-center">
      <CheckCircle v-if="+step === 3" />
      <h4>申請完了</h4>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CheckCircle from '@/components/icons/CheckCircle.vue'

const props = defineProps({
  step: {
    type: Number,
    default: 1
  }
})
</script>
<style lang="scss" scoped></style>
