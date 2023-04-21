import type { TTodo } from '@/model/todo.model'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { todoService } from '@/services'
import type { TTodoListParams } from '@/model/todo.model'

export default defineStore('todo', () => {
  const getTodoList = async (params: TTodoListParams) => {
    return await todoService.getTodoList(params)
  }

  const addTodo = async (params: TTodo): Promise<void> => {
    await todoService.addTodo(params)
  }

  const deleteTodo = async (id: string) => {
    await todoService.deleteTodo(id)
  }

  const updateCompletedTodo = async (id: string) => {
    return todoService.updateCompletedTodo(id)
  }

  const editTodo = async (params: TTodo) => {
      await todoService.editTodo(params)
  }

  const clearAllComplete = async () => {
    await todoService.deleteAllCompletedTodo()
  }

  const toggleStatus = async () => {
    await todoService.toggleAllTodo()
  }

  const getItemLeft = async () => {
    return await todoService.getItemLeft()
  }

  const getAllTodoList = async () => {
    return await todoService.getAllTodoList()
  }

  return {
    addTodo,
    deleteTodo,
    editTodo,
    clearAllComplete,
    toggleStatus,
    getTodoList,
    updateCompletedTodo,
    getItemLeft,
    getAllTodoList
  }
})
