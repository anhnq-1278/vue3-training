import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TTodoItem } from '@/model/Todo'

export default defineStore('todo', () => {
  const toDoList = ref<Array<TTodoItem>>([])
  const incrementId = ref<number>(0)

  const setTodoItem = (name: string) => {
    toDoList.value.unshift({
      id: incrementId.value,
      name,
      completed: false,
      isEdit: false
    })

    incrementId.value += 1
  }

  const setCompletedItem = (id: number) => {
    const index = toDoList.value.findIndex((item) => item.id === id)

    toDoList.value[index].completed = !toDoList.value[index].completed
  }

  const deleteCompletedItem = () => {
    toDoList.value = toDoList.value.filter((item) => !item.completed)
  }

  const deleteItem = (id: number) => {
    const index = toDoList.value.findIndex((item) => item.id === id)

    if (index > -1) toDoList.value.splice(index, 1)
  }

  const setEditTrueItem = (id: number) => {
    const index = toDoList.value.findIndex((item) => item.id === id)

    toDoList.value[index].isEdit = true
  }

  const editItem = (id: number, name: string) => {
    const index = toDoList.value.findIndex((item) => item.id === id)

    toDoList.value[index].name = name
    toDoList.value[index].isEdit = false
  }

  return {
    toDoList,
    setTodoItem,
    setCompletedItem,
    deleteCompletedItem,
    deleteItem,
    setEditTrueItem,
    editItem
  }
})
