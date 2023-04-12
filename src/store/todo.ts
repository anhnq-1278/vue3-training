import type { Task } from '@/model/todo.model'
import { generateID } from '@/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('todo', () => {
  const tasks = ref<Array<Task>>([])

  const addTask = (title: string) => {
    tasks.value.push({
      id: generateID(),
      title: title,
      isComplete: false,
      isEdit: false
    })
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
    tasks.value = tasks.value.map((task) => {
      return {
        ...task,
        isComplete: false
      }
    })
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
