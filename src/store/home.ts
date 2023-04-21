import { defineStore } from 'pinia'
import { todoService } from '@/services'
import type { ITask, IToDoListParams } from '@/type/Todo'

export default defineStore('todo', () => {
  async function getTodoList(params?: IToDoListParams) {
    return await todoService.getTodoList(params)
  }

  async function addTask(params: string) {
    await todoService.addTodo(params)
  }

  async function changeActive() {
    await todoService.toggleAllTodo()
  }

  async function removeTask(id: string) {
    await todoService.deleteTodo(id)
  }

  async function editTask(params: ITask) {
    await todoService.editTodo(params)
  }

  async function clearCompleted() {
    await todoService.deleteAllCompletedTodo()
  }

  async function checkAll() {
    await todoService.toggleAllTodo()
  }

  async function updateCompletedTodo(params: string) {
    await todoService.updateCompletedTodo(params)
  }

  async function getItemLeft() {
    const { data } = await todoService.getItemLeft()

    return data
  }

  return {
    addTask,
    editTask,
    clearCompleted,
    changeActive,
    removeTask,
    checkAll,
    getTodoList,
    updateCompletedTodo,
    getItemLeft
  }
})
