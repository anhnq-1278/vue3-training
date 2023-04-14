import type { Task } from '@/model/todo.model'
import { generateID, sleep } from '@/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('todo', () => {
  const tasks = ref<Array<Task>>([])

  const addTask = async (title: string): Promise<void> => {
    tasks.value.push({
      id: generateID(),
      title: title,
      isComplete: false,
      isEdit: false
    })

    await sleep(500)
  }

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  const editTask = (id: string, title: string) => {
    const task = tasks.value.find((task) => task.id === id)

    if (task) {
      if (title) {
        task.title = title
      }
      task.isEdit = false
    }
  }

  const clearAllComplete = () => {
    tasks.value = tasks.value.filter((task) => !task.isComplete)
  }

  const toggleStatus = () => {
    const hasCompletedAllTask = tasks.value.every((tasks) => tasks.isComplete)

    tasks.value = tasks.value.map((task) => {
      return {
        ...task,
        isComplete: !hasCompletedAllTask
      }
    })
  }

  return { tasks, addTask, deleteTask, editTask, clearAllComplete, toggleStatus }
})
