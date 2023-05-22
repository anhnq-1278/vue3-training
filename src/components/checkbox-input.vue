<template>
  <div
    :class="[
      'checkbox flex items-center justify-center w-[16px] h-[16px] border border-[#D1D5DB] rounded-[4px] bg-[#F9FAFB] cursor-pointer',
      { '!border-transparent bg-[#1C64F2]': checked },
      { '!border-[#D1D5DB] !bg-[#D1D5DB] !cursor-default': disabled || readonly },
      { disabled: disabled }
    ]"
    @click="onChange"
    @keyup.space="onChange"
  >
    <checkmark-icon v-if="props.checked" class="text-white" />
  </div>
</template>

<script setup lang="ts">
import CheckmarkIcon from '@/components/check-mark-icon.vue'

const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change'])

function onChange() {
  if (props.disabled || props.readonly) return

  emit('change')
}
</script>
