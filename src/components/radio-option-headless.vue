<template>
  <RadioGroup v-model="value" class="flex gap-6">
    <RadioGroupOption
      v-for="(option, index) in options"
      :key="index"
      v-slot="{ checked }"
      :value="option.value"
      class="cursor-pointer"
    >
      <div class="flex gap-1 items-center">
        <radio-selected v-show="checked" />
        <radio-unselected v-show="!checked" />
        <span>{{ option.label }}</span>
      </div>
    </RadioGroupOption>
  </RadioGroup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import radioSelected from '@/components/radio-selected.vue'
import radioUnselected from '@/components/radio-unselected.vue'

defineProps({
  options: {
    type: Array<{ value: string; label: string }>,
    default: () => []
  }
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const value = ref('')

watch(value, (value) => emit('change', value))
</script>
