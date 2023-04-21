<template>
  <div v-if="!isLoading">
    <div class="container pb-[30px]">
      <h1 class="text-[100px] text-pink-8 font-thin text-center leading-[100px]">todos</h1>
      <to-do-list
        :filter-list="filterList"
        :list-item="listItem"
        :item-left="itemLeft"
        :total-item="totalItem"
        :filter-value="filterValue"
        @on-submit="onSubmit"
        @change-filter-value="onChangeFilterValue"
        @change-complete="onChangeComplete"
        @edit-item="handleEditItem"
        @delete-item="handleDeleteItem"
        @clear-completed="handleClearCompleted"
        @set-complete-all-item="handleSetIsCompleteAllItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount, watch } from 'vue'

import ToDoStore from '@/store/Todo'
import CommonStore from '@/store/Common'

import type { TTodoItem } from '@/model/Todo'
import toDoList from '@/components/to-do-list.vue'

const filterList = reactive([
  {
    value: '',
    name: 'All'
  },
  {
    value: 'active',
    name: 'Active'
  },
  {
    value: 'completed',
    name: 'Completed'
  }
])

const store = ToDoStore()
const commonStore = CommonStore()

const listItem = ref<Array<TTodoItem>>([])
const itemLeft = ref(0)
const totalItem = ref(0)
const filterValue = ref('')
const isLoading = ref(false)

onBeforeMount(() => {
  try {
    isLoading.value = true

    setValueTodoList()
  } finally {
    isLoading.value = false
  }
})

const onSubmit = async (value: string) => {
  try {
    commonStore.setLoading(true)

    await store.createTodoItem({ title: value })

    setValueTodoList()
  } finally {
    commonStore.setLoading(false)
  }
}

const onChangeFilterValue = (value: string) => {
  filterValue.value = value
}

const onChangeComplete = async (id: string) => {
  try {
    commonStore.setLoading(true)

    await store.setCompletedItem(id)

    setValueTodoList()
  } finally {
    commonStore.setLoading(false)
  }
}

const handleClearCompleted = async () => {
  try {
    commonStore.setLoading(true)

    await store.deleteCompletedItem()

    setValueTodoList()
  } finally {
    commonStore.setLoading(false)
  }
}

const handleDeleteItem = async (id: string) => {
  try {
    commonStore.setLoading(true)

    await store.deleteItem(id)

    setValueTodoList()
  } finally {
    commonStore.setLoading(false)
  }
}

const handleEditItem = async (value: { id: string; title: string }) => {
  try {
    commonStore.setLoading(true)

    await store.editItem(value)

    setValueTodoList()
  } finally {
    commonStore.setLoading(false)
  }
}

const handleSetIsCompleteAllItem = async () => {
  try {
    commonStore.setLoading(true)

    await store.setCompleteAllItem()

    setValueTodoList()
  } finally {
    commonStore.setLoading(false)
  }
}

const setValueTodoList = async () => {
  try {
    commonStore.setLoading(true)

    if (filterValue.value) {
      const [{ data }, { data: countLeftItem }, { data: totalList }] = await Promise.all([
        store.getTodoList(filterValue.value),
        store.getItemLeft(),
        store.getTodoList()
      ])

      listItem.value = data
      itemLeft.value = countLeftItem
      totalItem.value = totalList.length
    } else {
      const [{ data }, { data: countLeftItem }] = await Promise.all([
        store.getTodoList(),
        store.getItemLeft()
      ])

      listItem.value = data
      itemLeft.value = countLeftItem
      totalItem.value = data.length
    }
  } finally {
    commonStore.setLoading(false)
  }
}

watch(filterValue, () => {
  setValueTodoList()
})
</script>
