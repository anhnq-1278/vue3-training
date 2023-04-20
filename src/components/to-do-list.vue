<template>
  <div :class="['w-full bg-white mt-7 relative todoapp', { 'todoapp-before': !onHiddenFooter }]">
    <div class="flex items-center w-full h-[60px] px-4 border-b border-b-gray-200">
      <div class="h-full w-[25px] flex items-center justify-center">
        <chevron-down
          v-if="totalItem"
          class="cursor-pointer"
          @click="emit('set-complete-all-item')"
        />
      </div>
      <input
        type="text"
        class="w-full h-full py-4 pl-4 border-none text-2xl font-light placeholder:text-gray-500 placeholder:font-thin placeholder:italic focus-visible:outline-none"
        placeholder="What needs to be done?"
        v-model="todoValue"
        @keypress.enter="handleSubmit"
      />
    </div>

    <div class="to-do-list" v-if="!onHiddenFooter">
      <todo-item
        v-for="item in listItem"
        :key="item._id"
        :item-todo="item"
        @change-complete="emit('change-complete', $event)"
        @edit-item="emit('edit-item', $event)"
        @delete-item="emit('delete-item', $event)"
      />
    </div>

    <div
      class="flex items-center justify-between h-[50px] text-sm font-light p-4"
      v-if="!onHiddenFooter"
    >
      <span>{{ itemLeft }} item left</span>
      <div class="flex gap-4">
        <div
          v-for="item in filterList"
          :key="item.value"
          :class="[
            `py-1 px-3 border  hover:border-[rgba(175,47,47,0.15)] cursor-pointer ${
              filterValue === item.value ? 'border-[rgba(175,47,47,0.15)]' : 'border-transparent'
            }`
          ]"
          @click="emit('change-filter-value', item.value)"
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
import chevronDown from '@/components/chevron-down.vue'
import todoItem from '@/components/todo-item.vue'
import type { TTodoItem } from '@/model/Todo'

const props = defineProps({
  filterList: {
    type: Array<{ value: string; name: string }>,
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

  totalItem: {
    type: Number,
    default: 0
  },

  filterValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'on-submit', value: string): void
  (e: 'change-filter-value', value: string): void
  (e: 'change-complete', id: string): void
  (e: 'edit-item', value: { id: string; title: string }): void
  (e: 'delete-item', id: string): void
  (e: 'clear-completed'): void
  (e: 'set-edit-true-item', id: string): void
  (e: 'set-complete-all-item'): void
}>()

const todoValue = ref('')

const hasCompletedItem = computed(() => {
  return props.totalItem > props.itemLeft
})

const onHiddenFooter = computed(() => {
  return props.totalItem === 0
})

const handleSubmit = () => {
  if (todoValue.value === '') return

  emit('on-submit', todoValue.value)

  todoValue.value = ''
}
</script>

<style lang="scss" scoped>
.todoapp {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  &-before {
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
}
</style>
