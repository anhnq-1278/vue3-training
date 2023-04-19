<template>
  <div v-if="!isLoading">
    <div class="text-right pr-5 pt-5">Hello, {{ myAccount.username }}</div>
    <div class="container pb-[30px]">
      <h1 class="text-[100px] text-pink-8 font-thin text-center leading-[100px]">todos</h1>
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
        @set-complete-all-item="handleSetIsCompleteAllItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount, watch } from 'vue'
import { storeToRefs } from 'pinia'

import ToDoStore from '@/store/Todo'
import CommonStore from '@/store/Common'

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
const commonStore = CommonStore()

const { myAccount } = storeToRefs(CommonStore())

const listItem = ref<Array<TTodoItem>>([])
const itemLeft = ref(0)
const filterValue = ref(1)
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

const onChangeFilterValue = (value: number) => {
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
    filterValue.value = 1
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
  getItemLeft()

  switch (filterValue.value) {
    case 1: {
      try {
        commonStore.setLoading(true)

        const { data } = await store.getTodoList()
        listItem.value = data
      } finally {
        commonStore.setLoading(false)
      }
      break
    }
    case 2: {
      try {
        commonStore.setLoading(true)

        const { data } = await store.getTodoList('active')
        listItem.value = data
      } finally {
        commonStore.setLoading(false)
      }
      break
    }
    case 3: {
      try {
        commonStore.setLoading(true)

        const { data } = await store.getTodoList('completed')
        listItem.value = data
      } finally {
        commonStore.setLoading(false)
      }
      break
    }
  }
}

const getItemLeft = async () => {
  try {
    commonStore.setLoading(true)

    const dataItemLeft = await store.getItemLeft()
    itemLeft.value = dataItemLeft.data
  } finally {
    commonStore.setLoading(false)
  }
}

watch(filterValue, async () => {
  switch (filterValue.value) {
    case 1: {
      try {
        commonStore.setLoading(true)

        const { data } = await store.getTodoList()
        listItem.value = data
      } finally {
        commonStore.setLoading(false)
      }
      break
    }
    case 2: {
      try {
        commonStore.setLoading(true)

        const { data } = await store.getTodoList('active')
        listItem.value = data
      } finally {
        commonStore.setLoading(false)
      }
      break
    }
    case 3: {
      try {
        commonStore.setLoading(true)

        const { data } = await store.getTodoList('completed')
        listItem.value = data
      } finally {
        commonStore.setLoading(false)
      }
      break
    }
  }
})
</script>
