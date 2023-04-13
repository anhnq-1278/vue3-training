<template>
  <div class="container pb-[30px]">
    <h1 class="text-[100px] text-[rgba(175,47,47,0.15)] font-thin text-center leading-[100px]">
      todos
    </h1>
    <to-do-list
      :filter-list="filterList"
      :list-item="listItem"
      :item-left="itemLeft"
      :filter-value="filterValue"
      @on-submit="onSubmit"
      @change-filter-value="onChangeFilterValue"
      @change-complete="onChangeComplete"
      @edit-item="handleEditItem"
      @delete-item="handleDeleteItem"
      @clear-completed="handleClearCompleted"
      @set-edit-true-item="handleSetEditTrueItem"
      @set-complete-all-item="handleSetIsCompleteAllItem"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount, watch } from 'vue'

import ToDoStore from '@/store/Todo'
import type { TTodoItem } from '@/model/Todo'
import toDoList from '@/components/to-do-list.vue'

const filterList = reactive([
  {
    id: 1,
    name: 'All'
  },
  {
    id: 2,
    name: 'Active'
  },
  {
    id: 3,
    name: 'Completed'
  }
])

const store = ToDoStore()

const listItem = ref<Array<TTodoItem>>([])
const itemLeft = ref(0)
const filterValue = ref(1)

onBeforeMount(() => {
  setValueTodoList()
})

const onSubmit = (value: string) => {
  store.setTodoItem(value)

  setValueTodoList()
}

const onChangeFilterValue = (value: number) => {
  filterValue.value = value
}

const onChangeComplete = (id: number) => {
  store.setCompletedItem(id)

  setValueTodoList()
}

const handleClearCompleted = () => {
  store.deleteCompletedItem()

  setValueTodoList()
  filterValue.value = 1
}

const handleDeleteItem = (id: number) => {
  store.deleteItem(id)

  setValueTodoList()
}

const handleEditItem = (id: number, name: string) => {
  store.editItem(id, name)

  setValueTodoList()
}

const handleSetEditTrueItem = (id: number) => {
  store.setEditTrueItem(id)
}

const handleSetIsCompleteAllItem = () => {
  store.setCompleteAllItem()

  setValueTodoList()
}

const setValueTodoList = () => {
  switch (filterValue.value) {
    case 1:
      listItem.value = store.toDoList
      break
    case 2:
      listItem.value = store.toDoList.filter((item) => !item.completed)
      break
    case 3:
      listItem.value = store.toDoList.filter((item) => item.completed)
      break
  }

  itemLeft.value = store.toDoList.filter((item) => !item.completed).length
}

watch(filterValue, (value) => {
  switch (value) {
    case 1:
      listItem.value = store.toDoList
      break
    case 2:
      listItem.value = store.toDoList.filter((item) => !item.completed)
      break
    case 3:
      listItem.value = store.toDoList.filter((item) => item.completed)
      break
  }
})
</script>
