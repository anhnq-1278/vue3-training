<template>
  <div
    :class="[
      'relative flex items-center justify-center w-[30px] h-[30px] min-w-[30px] border rounded-full border-grey-6 bg-white cursor-pointer',
      { '!border-green-700 ': isChecked }
    ]"
    @click="onChange"
  >
    <check-icon v-if="props.isChecked" class="text-green-700" />
  </div>
</template>

<script setup lang="ts">
import checkIcon from '@/components/icons/check-icon.vue'

const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['change'])

function onChange() {
  emit('change')
}
</script>
