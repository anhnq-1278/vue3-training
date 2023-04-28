<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="flex items-center w-fit justify-center rounded-md bg-opacity-20 px-4 py-2 text-base font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        {{ selectedLabel?.label}}
        <CaretDown class="ml-2 -mr-1 h-5 w-5 text-gray-900" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute z-10 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-grey-f8 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem
            v-slot="{ active }"
            v-for="option in options"
            :key="option.value"
            :value="option"
            @click="handleChangeItem(+option.value)"
          >
            <button
              :class="[
                active ? 'bg-blue-e8 text-gray-900' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-base'
              ]"
            >
              {{ option.label }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import type { TSelectOption } from '@/model/Common'
import CaretDown from '@/components/icons/CaretDown.vue'
import { computed, type PropType } from 'vue'
const props = defineProps({
  options: {
    type: Array<TSelectOption>,
    default: () => []
  },
  selectedValue: {
    type: Number,
    default: 0,
  }
})

const selectedOptionIndex = computed<number>(() => {
  return props.options.findIndex(option => {
    return +option.value === props.selectedValue
  })
})

const hasSelectedOption = computed<boolean>(() => !selectedOptionIndex)

const selectedLabel = computed<TSelectOption|null>(()=> {
  if (!hasSelectedOption) return  null

  return props.options[selectedOptionIndex.value]
})

const emit = defineEmits<{
  (e: 'change-limit', value: number): void
}>()

function handleChangeItem(value: number) {
  
  emit('change-limit', value)
}
</script>
<style lang="scss" scoped></style>
