import type { Task } from '@/model/todo.model'
import { generateID } from '@/utils'
import { defineStore } from 'pinia'

interface TodoState {
  tasks: Task[]
}

export const useTodoStore = defineStore({
  id: 'todo',
  state: (): TodoState => ({
    tasks: []
  }),
  getters: {},
  actions: {
    addTask(title: string) {
      this.tasks.push({
        id: generateID(),
        title: title,
        isComplete: false,
        isEdit: false
      })
    }
  }
})
