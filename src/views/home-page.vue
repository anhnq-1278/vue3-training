<template>
  <div class="w-[550px] mx-auto my-0 py-10 mt-[50px]">
    <h1 class="text-[100px] text-red-default font-thin text-center leading-[80px]">todos</h1>
    <TodoList
      :todos="todos"
      :tab-name="tabName"
      :is-per-loading="isPerLoading"
      :total-task-data="{
        taskTotal,
        leftTaskTotal
      }"
      @add-todo="handleAddTodo"
      @delete-todo="handleDeleteTodo"
      @edit-todo="handleEditTodo"
      @change-tab="handleChangeTab"
      @clear-completed="handleClearCompleted"
      @toggle-status="handleToggleStatus"
      @update-completed-todo="handleUpdateCompletedTodo"
    />
  </div>
</template>
<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import type { TTodoItem } from '@/model/todo.model'
import TodoStore from '@/store/todo'
import CommonStore from '@/store/Common'

import { computed, onBeforeMount, ref, watch } from 'vue'

const todoStore = TodoStore()
const store = CommonStore()
const tabName = ref<string>('')
const isPerLoading = ref<boolean>(false)
const todoListParams = computed(() => {
  return {
    filter: tabName.value
  }
})
const leftTaskTotal = ref<number>(0)
const taskTotal = ref<number>(0)

const todos = ref<Array<TTodoItem>>([])

onBeforeMount(async () => {
  isPerLoading.value = true
  await getTodoList()
  isPerLoading.value = false
})

async function getTodoList() {
  try {
    store.setLoading(true)

    const [{ data }, { data: leftItem }, { data: total }] = await Promise.all([
      todoStore.getTodoList(todoListParams.value),
      todoStore.getItemLeft(),
      todoStore.getAllTodoList()
    ])

    todos.value = data
    leftTaskTotal.value = leftItem
    taskTotal.value = total.length
  } finally {
    store.setLoading(false)
  }
}

async function handleAddTodo(title: string): Promise<void> {
  if (isPerLoading.value) return

  try {
    store.setLoading(true)
    isPerLoading.value = true

    if (!title) return
    await todoStore.addTodo({ title })
    getTodoList()
  } catch (error: any) {
  } finally {
    isPerLoading.value = false

    store.setLoading(false)
  }
}

async function handleDeleteTodo(id: string): Promise<void> {
  try {
    store.setLoading(true)

    await todoStore.deleteTodo(id)
    getTodoList()
  } catch (error: any) {
  } finally {
    store.setLoading(false)
  }
}

async function handleUpdateCompletedTodo(id: string): Promise<void> {
  try {
    store.setLoading(true)

    await todoStore.updateCompletedTodo(id)
    getTodoList()
  } catch (error: any) {
  } finally {
    store.setLoading(false)
  }
}

async function handleEditTodo(id: string, title: string): Promise<void> {
  try {
    store.setLoading(true)
    const params = {
      id,
      title
    }
    await todoStore.editTodo(params)
    getTodoList()
  } catch (error: any) {
  } finally {
    store.setLoading(false)
  }
}

function handleChangeTab(tab: string): void {
  tabName.value = tab
}

async function handleClearCompleted(): Promise<void> {
  try {
    store.setLoading(true)

    await todoStore.clearAllComplete()
    getTodoList()
  } catch (error: any) {
  } finally {
    store.setLoading(false)
  }
}

async function handleToggleStatus() {
  try {
    store.setLoading(true)

    await todoStore.toggleStatus()
    getTodoList()
  } catch (error: any) {
  } finally {
    store.setLoading(false)
  }
}

watch(todoListParams, () => {
  getTodoList()
})
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
