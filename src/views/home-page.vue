<template>
  <div class="mx-[400px] p-10">
    <todo-list
      :list-task="listTask"
      :item-left="itemLeft"
      :total="total"
      :tab="tab"
      @add-task="handleAddTask"
      @change-complete="handleChangeComplete"
      @edit-task="handleEditTask"
      @delete-task="handleDeleteTask"
      @change-tab="handleChangeTab"
      @clear-complete="handleClearComplete"
      @check-all="handleCheckAll"
    />
  </div>
</template>

<script setup lang="ts">
import todoList from '@/components/todo-list.vue'
import type { ITask } from '@/type/Todo'
import { onBeforeMount, ref } from 'vue'
import CommonStore from '@/store/common'
import ToDoStore from '@/store/home'

const store = ToDoStore()
const commonStore = CommonStore()
const listTask = ref<ITask[]>([])
const total = ref<number>(0)
const itemLeft = ref<number>(0)
const tab = ref<string>('All')

onBeforeMount(() => {
  getTodoList()
})

async function getTodoList() {
  commonStore.setLoading(true)

  try {
    const [{ data }, itemLeftData, { data: totalData }] = (await Promise.all([
      store.getTodoList({ ...(tab.value !== 'All' && { filter: tab.value.toLowerCase() }) }),
      store.getItemLeft(),
      tab.value !== 'All' && store.getTodoList()
    ])) as [{ data: ITask[] }, number, { data: ITask[] }]

    const loadingTime = Date.now() - commonStore.loadingStartTime

    if (loadingTime < 1000) {
      // Wait for 1s
      await new Promise((resolve) => setTimeout(resolve, 1000 - loadingTime))
    }

    listTask.value = data
    itemLeft.value = itemLeftData
    total.value = (totalData && totalData.length) ?? (data && data.length)
  } catch (error) {
    console.log(error)
  } finally {
    commonStore.setLoading(false)
  }
}

function handleChangeTab(tabValue: string) {
  tab.value = tabValue
  getTodoList()
}

async function handleAddTask(value: string) {
  try {
    commonStore.setLoading(true)

    await store.addTask(value)
    getTodoList()

    const loadingTime = Date.now() - commonStore.loadingStartTime

    if (loadingTime < 1000) {
      // Wait for 1s
      await new Promise((resolve) => setTimeout(resolve, 1000 - loadingTime))
    }
  } catch (error) {
    console.log(error)
  } finally {
    commonStore.setLoading(false)
  }
}

async function handleClearComplete() {
  try {
    commonStore.setLoading(true)

    await store.clearCompleted()
    getTodoList()

    const loadingTime = Date.now() - commonStore.loadingStartTime

    if (loadingTime < 1000) {
      // Wait for 1s
      await new Promise((resolve) => setTimeout(resolve, 1000 - loadingTime))
    }
  } catch (error) {
    console.log(error)
  } finally {
    commonStore.setLoading(false)
  }
}

async function handleDeleteTask(id: string) {
  try {
    commonStore.setLoading(true)

    await store.removeTask(id)
    getTodoList()

    const loadingTime = Date.now() - commonStore.loadingStartTime

    if (loadingTime < 1000) {
      // Wait for 1s
      await new Promise((resolve) => setTimeout(resolve, 1000 - loadingTime))
    }
  } catch (error) {
    console.log(error)
  } finally {
    commonStore.setLoading(false)
  }
}

async function editTask({ title, id }: { title: string; id: string }) {
  try {
    commonStore.setLoading(true)

    await store.editTask({ title, id })
    getTodoList()

    const loadingTime = Date.now() - commonStore.loadingStartTime

    if (loadingTime < 1000) {
      // Wait for 1s
      await new Promise((resolve) => setTimeout(resolve, 1000 - loadingTime))
    }
  } catch (error) {
    console.log(error)
  } finally {
    commonStore.setLoading(false)
  }
}

function handleEditTask({ title, id }: { title: string; id: string }) {
  title ? editTask({ title, id }) : handleDeleteTask(id)
}

async function handleChangeComplete(value: string) {
  try {
    commonStore.setLoading(true)

    await store.updateCompletedTodo(value)
    getTodoList()

    const loadingTime = Date.now() - commonStore.loadingStartTime

    if (loadingTime < 1000) {
      // Wait for 1s
      await new Promise((resolve) => setTimeout(resolve, 1000 - loadingTime))
    }
  } catch (error) {
    console.log(error)
  } finally {
    commonStore.setLoading(false)
  }
}

async function handleCheckAll() {
  try {
    commonStore.setLoading(true)

    await store.checkAll()
    getTodoList()

    const loadingTime = Date.now() - commonStore.loadingStartTime

    if (loadingTime < 1000) {
      // Wait for 1s
      await new Promise((resolve) => setTimeout(resolve, 1000 - loadingTime))
    }
  } catch (error) {
    console.log(error)
  } finally {
    commonStore.setLoading(false)
  }
}
</script>
