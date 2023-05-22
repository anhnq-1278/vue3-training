<template>
  <div class="flex gap-4 items-center">
    <div
      :class="[
        'w-10 h-10 flex items-center justify-center text-[#111928] text-base font-bold bg-gray-200 rounded-full border-2 border-gray-200',
        { '!bg-[#1c64f2] !text-white !border-[#1c64f2]': value === stepNumber },
        { '!bg-white !text-[#1c64f2] !border-[#1c64f2]': value < stepNumber }
      ]"
    >
      {{ stepNumber }}
    </div>
    <div>
      <h3 class="text-[20px] leading-[30px] font-bold text-[#111928]">{{ title }}</h3>
      <span class="text-sm leading-[21px] text-gray-700 font-medium">{{ description }}</span>
      <div
        :class="[
          'flex items-center text-[#1a56db] text-sm leading-[21px] cursor-pointer',
          {
            '!text-gray-400 !cursor-default': maxStep < stepNumber
          }
        ]"
        @click="onChange(stepNumber)"
      >
        <span>{{ hrefTitle }}</span>
        <chevron-right :class="[`${maxStep < stepNumber ? 'fill-gray-400' : 'fill-[#1a56db]'}`]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import chevronRight from '@/components/chevron-right.vue'

const props = defineProps({
  stepNumber: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true,
    default: 1
  },
  maxStep: {
    type: Number,
    required: true,
    default: 1
  },
  title: {
    type: String,
    default: '',
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  hrefTitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'change', value: number): void
}>()

const onChange = (value: number) => {
  if (value > props.maxStep) return

  emit('change', value)
}
</script>
