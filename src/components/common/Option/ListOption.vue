<template>
  <div>
    <Listbox v-model="selectedItem">
      <ListboxButton class="w-[100px] border border-[#D1D5DB] px-3 py-2.5 rounded-lg bg-white-fb">
        <div class="flex items-center justify-center gap-x-2">
          {{ selectedLabel }}
          <ArrowDown />
        </div>
      </ListboxButton>
      <ListboxOptions
        class="w-[100px] border border-[#D1D5DB] bg-white-fb rounded-lg mt-2 max-h-[210px] overflow-y-scroll"
      >
        <ListboxOption
          v-for="item in listOption"
          :key="item.label"
          :value="item"
          class="px-3 h-[35px] hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg flex items-center"
        >
          {{ item.label }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import ArrowDown from '@/components/icons/ArrowDown.vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
const props = defineProps({
  listOption: {
    type: Array<{ name: number; label: string }>,
    default: () => []
  },
  displayItem: {
    type: Number,
    default: 1
  }
})
const selectedLabel = computed(() => {
  let value = ''
  if (props.displayItem < 10) value = '0' + props.displayItem
  else value = '' + props.displayItem
  return value
})
const emit = defineEmits<{
  (e: 'change-value', value: { name: number; label: string }): void
}>()
const selectedItem = ref<{ name: number; label: string }>(props.listOption[0])
watch(selectedItem, (value) => {
  emit('change-value', value)
})
</script>
