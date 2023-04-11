<template>
  <div class="w-[550px] mx-auto my-0">
    <h1 class="text-[100px] text-red-default font-thin text-center leading-[80px]">todos</h1>
    <TodoList
      :tasks="tasks"
      :tab-name="tabName"
      :total-task-data="{
        taskTotal,
        leftTaskTotal,
        hasTaskCompleted
      }"
      @add-task="handleAddTask"
      @delete-task="handleDeleteTask"
      @edit-task="handleEditTask"
      @change-tab="handleChangeTab"
      @clear-completed="handleClearCompleted"
    />
  </div>
</template>
<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import type { Task } from '@/model/todo.model'
import TodoStore from '@/store/todo'
import { computed, reactive, ref, watch } from 'vue'

const todoStore = TodoStore()
const tabName = ref<string>('active')
const tasks = ref<Array<Task>>([])

const taskTotal = computed<number>(() => {
  return todoStore.tasks.length
})

const hasTaskCompleted = computed<number>(() => {
  return todoStore.tasks.some((task) => task.isComplete)
})

const leftTaskTotal = computed<number>(() => {
  return todoStore.tasks.filter((task) => !task.isComplete).length
})

function handleAddTask(title: string): void {
  if (!title) return
  todoStore.addTask(title)
  filterTaskByTab(tabName.value)
}

function handleDeleteTask(id: string): void {
  todoStore.deleteTask(id)
  filterTaskByTab(tabName.value)
}

function handleEditTask(id: string, newTitle: string): void {
  todoStore.editTask(id, newTitle)
  filterTaskByTab(tabName.value)
}

function handleChangeTab(tab: string): void {
  tabName.value = tab
}

function handleClearCompleted(): void {
  todoStore.clearAllComplete()
  filterTaskByTab(tabName.value)
}

function filterTaskByTab(tabName: string) {
  switch (tabName) {
    case 'all':
      tasks.value = todoStore.tasks
      break
    case 'completed':
      tasks.value = todoStore.tasks.filter((task) => task.isComplete)
      break
    case 'active':
      tasks.value = todoStore.tasks.filter((task) => !task.isComplete)
      break
  }
}

watch(
  tabName,
  (tabName) => {
    if (tabName) {
      filterTaskByTab(tabName)
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
