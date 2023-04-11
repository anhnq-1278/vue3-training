<template>
  <div @click="onChange">
    <Check v-if="props.checked" class="text-green-ed" />
    <UnCheck v-else class="text-green-ed" />
  </div>
</template>

<script setup lang="ts">
import Check from '@/components/icons/Check.vue'
import UnCheck from '@/components/icons/UnCheck.vue'
const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'change'): void
}>()

function onChange() {
  emit('change')
}
</script>
<style lang="scss" scoped></style>
