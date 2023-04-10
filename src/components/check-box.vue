<template>
  <div
    :class="[
      'relative flex items-center justify-center w-[30px] h-[30px] min-w-[30px] border rounded-full border-grey-6 bg-white cursor-pointer',
      { '!border-green-700 ': checked }
    ]"
    @click="onChange"
    @keyup.space="onChange"
  >
    <check-mark-icon v-show="props.checked" class="text-green-700" />
  </div>
</template>

<script setup lang="ts">
import checkMarkIcon from '@/components/check-mark-icon.vue'

const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change'])

function onChange() {
  emit('change')
}
</script>
<style lang="scss" scoped></style>
