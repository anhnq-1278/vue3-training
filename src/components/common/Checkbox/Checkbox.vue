<template>
  <div class="[&:nth-child(even)]:bg-[#D3D3D3]">
    <label class="flex w-full items-center h-[60px]"
      ><p class="input-label pl-2">{{ props.label }}</p>
      <input
        class="ml-2"
        :type="props.type"
        :checked="props.isChecked"
        :value="props.modelValue"
        :id="props.id"
        @input="handleChangeInput"
      />
    </label>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'removeSelectedFilter', id: string): void
  (e: 'changeInput', id: string): void
}>()
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'checkbox'
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})

function handleChangeInput(event: Event) {
  emit('changeInput', (event.target as HTMLInputElement).value)
}
</script>
<style lang="scss" scoped></style>
