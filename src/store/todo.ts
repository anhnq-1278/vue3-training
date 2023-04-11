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

  return { tasks, addTask }
})
