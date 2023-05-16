<template>
  <div class="radio" @click="onChange">
    <radio-selected v-show="checked" class="cursor-pointer" />
    <radio-unselected v-show="!checked" class="cursor-pointer" />
  </div>
</template>

<script setup lang="ts">
import radioSelected from '@/components/radio-selected.vue'
import radioUnselected from '@/components/radio-unselected.vue'

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
