<template>
  <div class="shadow-todo-footer flex justify-between p-[10px] font-thin text-gray text-[14px]">
    <span class="self-center">{{ lengthTodos }} items left</span>
    <ul class="todo-filter flex ml-[50px]">
      <li
        v-for="tab in tabsRender"
        :key="tab.text"
        :class="[
          tab.selected ? 'border-rose-300' : 'border-transparent',
          `px-[8px] py-[3px] cursor-pointer
          border mr-[3px]
          capitalize rounded-[5px] hover:rounded-[5px] 
          hover:border-rose-300`
        ]"
        @click="changeTab(tab.text)"
      >
        {{ tab.text }}
      </li>
    </ul>
    <span class="cursor-pointer self-center" @click="todoStore.clearCompleteTodos"
      >clear completed</span
    >
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/store/todo'

const emit = defineEmits(['changeTab'])
const props = defineProps<{
  lengthTodos: number
}>()

const tabsRender = ref<
  Array<{
    text: string
    selected: boolean
  }>
>([
  {
    text: 'all',
    selected: true
  },
  {
    text: 'active',
    selected: false
  },
  {
    text: 'completed',
    selected: false
  }
])

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

const changeTab = (tab: string) => {
  const findIndex = tabsRender.value.findIndex(({ text }) => text === tab)
  tabsRender.value.forEach((tabRender, index) => {
    if (index === findIndex) {
      tabRender.selected = true
    } else {
      tabRender.selected = false
    }
  })
  emit('changeTab', tab)
}
</script>
