<template>
  <div class="flex gap-2">
    <div
      :tabindex="tabindex"
      :class="[
        'checkbox flex items-center justify-center w-[16px] h-[16px] border-[#D1D5DB] rounded-[4px] border bg-[#F9FAFB] cursor-pointer ',
        { '!border-green-4 bg-green-4': checked },
        { '!border-[#9CA3AF] !bg-[#D1D5DB] cursor-default': disabled || readonly },
        { disabled: disabled }
      ]"
      @click="onChange(value)"
      @keyup.space="onChange(value)"
    >
      <CheckmarkIcon v-show="props.checked" class="text-white" />
    </div>
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CheckmarkIcon from '@/components/icons/CheckMarkIcon.vue'

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
  },
  value: {
    type:  String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'change', value: string | boolean): void
}>()

const tabindex = computed(() => {
  return props.disabled || props.readonly ? -1 : 0
})

function onChange(value: string | boolean) {
  if (props.disabled || props.readonly) return

  emit('change', value)
}
</script>
<style lang="scss" scoped>
.checkbox {
  position: relative;

  &.disabled {
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      height: 1px;
      width: 8px;
      transform: translate(-50%, -50%);
      background-color: white;
    }
  }
}
</style>
