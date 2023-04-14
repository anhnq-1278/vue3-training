<template>
  <div class="w-[550px] mx-auto my-0 py-10">
    <h1 class="text-[100px] text-red-default font-thin text-center leading-[80px]">todos</h1>
    <TodoList
      :tasks="tasks"
      :tab-name="tabName"
      :is-per-loading="isPerLoading"
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
      @toggle-status="handleToggleStatus"
    />
  </div>
</template>
<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import type { Task } from '@/model/todo.model'
import TodoStore from '@/store/todo'
import CommonStore from '@/store/Common'

import { computed, reactive, ref, watch } from 'vue'

const todoStore = TodoStore()
const store = CommonStore()
const tabName = ref<string>('all')
const isPerLoading = ref<boolean>(false)

const taskTotal = computed<number>(() => {
  return todoStore.tasks.length
})

const hasTaskCompleted = computed<boolean>(() => {
  return todoStore.tasks.some((task) => task.isComplete)
})

const leftTaskTotal = computed<number>(() => {
  return todoStore.tasks.filter((task) => !task.isComplete).length
})

const tasks = computed(() => {
  if (tabName.value === 'active') {
    return todoStore.tasks.filter((task) => !task.isComplete)
  }

  if (tabName.value === 'completed') {
    return todoStore.tasks.filter((task) => task.isComplete)
  }

  return todoStore.tasks
})

async function handleAddTask(title: string): Promise<void> {
  if (isPerLoading.value) return

  try {
    store.setLoading(true)
    isPerLoading.value = true

    if (!title) return
    await todoStore.addTask(title)
  } catch (error: any) {
  } finally {
    isPerLoading.value = false

    store.setLoading(false)
  }
}

function handleDeleteTask(id: string): void {
  todoStore.deleteTask(id)
}

function handleEditTask(id: string, newTitle: string): void {
  todoStore.editTask(id, newTitle)
}

function handleChangeTab(tab: string): void {
  tabName.value = tab
}

function handleClearCompleted(): void {
  todoStore.clearAllComplete()
}

function handleToggleStatus() {
  todoStore.toggleStatus()
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
