<template>
  <div class="w-full bg-white mt-7 relative todoapp">
    <div class="flex items-center w-full h-[60px] px-4">
      <div class="h-full w-[25px] flex items-center justify-center">
        <chevron-down
          v-if="listItem.length !== 0"
          class="cursor-pointer"
          @click="emit('set-complete-all-item')"
        />
      </div>
      <input
        type="text"
        class="w-full h-[60px] py-4 pl-4 border-none shadow-[inset_0_-2px_1px_rgba(0,0,0,0.03)] text-2xl font-light placeholder:text-gray-500 placeholder:font-thin placeholder:italic focus-visible:outline-none"
        placeholder="What needs to be done?"
        v-model="todoValue"
        @keypress.enter="handleSubmit"
      />
    </div>

    <div class="to-do-list">
      <div
        v-for="item in listItem"
        :key="item.id"
        class="w-full min-h-[60px] flex items-center gap-4 border-b border-b-gray-200 p-4 text-xl font-light"
      >
        <checkbox :checked="item.completed" @change="emit('change-complete', item.id)" />

        <span
          :class="['flex-1', { 'line-through text-gray-300': item.completed }]"
          @dblclick="emit('set-edit-true-item', item.id)"
          v-if="!item.isEdit"
          >{{ item.name }}</span
        >
        <input
          v-else
          autofocus
          class="flex-1 focus-visible:outline-none border border-gray-200 p-1"
          @keypress.enter="emit('edit-item', item.id, item.name)"
          @blur="emit('edit-item', item.id, item.name)"
          v-model="item.name"
        />

        <delete-icon
          v-if="!item.isEdit"
          @click="emit('delete-item', item.id)"
          class="cursor-pointer"
        />
      </div>
    </div>

    <div class="flex items-center justify-between h-[50px] text-sm font-light p-4">
      <span>{{ itemLeft }} item left</span>
      <div class="flex gap-4">
        <div
          v-for="item in filterList"
          :key="item.id"
          :class="[
            `py-1 px-3 border  hover:border-[rgba(175,47,47,0.15)] cursor-pointer ${
              filterValue === item.id ? 'border-[rgba(175,47,47,0.15)]' : 'border-transparent'
            }`
          ]"
          @click="emit('change-filter-value', item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <div
        :class="['w-[110px] flex justify-end', { invisible: !hasCompletedItem }]"
        @click="emit('clear-completed')"
        class="cursor-pointer"
      >
        Clear completed
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import checkbox from '@/components/check-box.vue'
import deleteIcon from '@/components/delete-icon.vue'
import chevronDown from '@/components/chevron-down.vue'
import type { TTodoItem } from '@/model/Todo'

const props = defineProps({
  filterList: {
    type: Array<{ id: number; name: string }>,
    default: () => []
  },

  listItem: {
    type: Array<TTodoItem>,
    default: () => []
  },

  itemLeft: {
    type: Number,
    default: 0
  },

  filterValue: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits<{
  (e: 'on-submit', value: string): void
  (e: 'change-filter-value', id: number): void
  (e: 'change-complete', id: number): void
  (e: 'edit-item', id: number, name: string): void
  (e: 'delete-item', id: number): void
  (e: 'clear-completed'): void
  (e: 'set-edit-true-item', id: number): void
  (e: 'set-complete-all-item'): void
}>()

const todoValue = ref('')

const hasCompletedItem = computed(() => {
  if (props.listItem.length === 0) return false

  return props.listItem.some((item) => item.completed === true)
})

console.log(props.listItem.length)

const handleSubmit = () => {
  emit('on-submit', todoValue.value)

  todoValue.value = ''
}
</script>

<style lang="scss" scoped>
.todoapp {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
}
</style>
