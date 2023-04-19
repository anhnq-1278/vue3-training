import { defineStore } from 'pinia'
import { TodoService } from '@/services'

export default defineStore('todo', () => {
  const getTodoList = async (filter?: string) => {
    return await TodoService.getListTodo(filter)
  }

  const createTodoItem = async (payload: { title: string }) => {
    return await TodoService.createTodoItem(payload)
  }

  const setCompletedItem = async (id: string) => {
    return await TodoService.updateCompleteTodoItem(id)
  }

  const deleteCompletedItem = async () => {
    return await TodoService.deleteCompletedItem()
  }

  const deleteItem = async (id: string) => {
    return await TodoService.deleteTodoItem(id)
  }

  const editItem = async (payload: { id: string; title: string }) => {
    return await TodoService.updateTitleTodoItem(payload)
  }

  const setCompleteAllItem = async () => {
    return await TodoService.setCompleteAllItem()
  }

  const getItemLeft = async () => {
    return await TodoService.getItemLeft()
  }

  return {
    getTodoList,
    createTodoItem,
    setCompletedItem,
    deleteCompletedItem,
    deleteItem,
    editItem,
    setCompleteAllItem,
    getItemLeft
  }
})
