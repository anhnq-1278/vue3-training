<template>
  <div class="relative">
    <Listbox v-model="selectedItem">
      <ListboxButton
        class="w-full border border-[#D1D5DB] px-3 py-2.5 rounded-lg bg-white h-[38px] outline-none"
      >
        <div
          class="flex items-center justify-end gap-x-[11px] leading-[17.5px] text-[#6B7280] text-[14px]"
        >
          <span v-if="!selectedItem?.label">{{ placeholder }}</span>
          <span v-else>
            {{ selectedItem.label }}
          </span>
          <ArrowDown />
        </div>
      </ListboxButton>
      <ListboxOptions
        class="w-full border border-[#D1D5DB] bg-white rounded-lg mt-2 ct-listbox-option absolute z-10"
        :style="listStyle"
      >
        <ListboxOption
          v-for="item in listOption"
          :key="item.label"
          :value="item"
          class="px-3 h-[38px] hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg flex items-center"
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

interface IOptionList {
  listSize: number
  placeholder: string
  listOption: Array<{ value: string; label: string }>
}

const props = withDefaults(defineProps<IOptionList>(), {
  listSize: 5,
  listOption: () => []
})

const listStyle = computed<any>(() => {
  if (!props.listSize)
    return {
      'max-height': '210px'
    }

  return {
    height: `${Math.min(props.listOption.length, props.listSize) * 38}px`,
    'overflow-y': 'scroll'
  }
})

const emit = defineEmits<{
  (e: 'change-value', value: { value: string; label: string }): void
}>()

const selectedItem = ref<{ value: string; label: string }>({} as { value: string; label: string })
watch(selectedItem, (value) => {
  console.log(value)

  emit('change-value', value)
})
</script>
<style lang="scss" scoped>
.ct-listbox-option::-webkit-scrollbar {
  width: 0;
  display: none;
}
</style>
