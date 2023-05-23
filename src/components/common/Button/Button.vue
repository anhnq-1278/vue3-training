<template>
  <button
    class="inline-block text-center align-middle text-sm rounded font-semibold px-4 py-2 h-[40px] box-border"
    :class="[style, variant]"
    :disabled="disabled"
  >
    <component :is="icon" class="inline-block h-[18px] w-[18px]" />
    {{ text }}
  </button>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

// type ButtonSize = 'sm' | 'base' | 'xl' | '2xl'
type ButtonVariant = 'primary' | 'default' | 'rounded-primary' | 'rounded-default'
type ButtonType = 'button' | 'submit'
type ButtonStyle = 'rounded' | 'squared' | 'rounded-full'

interface IButtonProps {
  variant?: ButtonVariant
  type?: ButtonType
  style?: ButtonStyle
  disabled?: boolean
  icon?: Object
  text?: string
}

const props = withDefaults(defineProps<IButtonProps>(), {
  variant: 'default',
  type: 'button',
  style: 'rounded',
  disabled: false
})

const style = computed<string>(() => {
  if (props.style === 'rounded') return 'rounded-lg'
  if (props.style === 'squared') return 'rounded-none'
  return 'rounded-full'
})

const variant = computed<string>(() => {
  if (props.variant === 'primary') return 'bg-[#1A56DB] text-white'
  if (props.variant === 'rounded-primary') return 'bg-[#fff] text-[#1A56DB] border border-[#1A56DB]'
  if (props.variant === 'rounded-default') return 'bg-[#fff] text-[#000] border border-[#e5e7eb]'
  return 'bg-[#e5e7eb] text-[#111928]'
})
</script>
