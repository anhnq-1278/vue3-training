<template>
  <div class="radio" @click="onChange">
    <div class="flex items-center justify-center cursor-pointer">
      <div
        :class="[
          'w-[16px] h-[16px] rounded-full bg-[#F9FAFB]',
          checked ? 'border-[3.5px] border-[#1c64f2]' : 'border border-[#D1D5DB]'
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (e: 'change'): void
}>()
const onChange = () => {
  if (props.disabled) return
  emit('change')
}
</script>