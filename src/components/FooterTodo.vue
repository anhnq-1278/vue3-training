<template>
  <div class="todo-footer">
    <span>{{ todos.length }} items left</span>
    <ul class="todo-filter">
      <li
        v-for="tab in tabsRender"
        :key="tab.text"
        :class="{ selected: tab.selected }"
        @click="changeTab(tab.text)"
      >
        {{ tab.text }}
      </li>
    </ul>
    <span @click="todoStore.clearCompleteTodos">clear completed</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/store/todo'

const emit = defineEmits(['changeTab'])

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
