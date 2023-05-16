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
        <div class="w-6 h-6 flex items-center justify-center">
          <div
            :class="[
              'w-4 h-4 rounded-full bg-[#F9FAFB]',
              checked ? 'border-[3.5px] border-[#1c64f2]' : 'border border-[#d1d5db]'
            ]"
          ></div>
        </div>
        <span>{{ option.label }}</span>
      </div>
    </RadioGroupOption>
  </RadioGroup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'

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
