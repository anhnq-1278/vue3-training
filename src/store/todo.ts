import type { TTodo } from '@/model/todo.model'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { todoService } from '@/services'
import type { TTodoListParams } from '@/model/todo.model'
import { useNotification } from '@kyvg/vue3-notification';
import { NotificationTypes } from '@/constants';

const { notify } = useNotification();

export default defineStore('todo', () => {
  const getTodoList = async (params: TTodoListParams) => {
    return await todoService.getTodoList(params)
  }

  const addTodo = async (params: TTodo): Promise<void> => {
    await todoService.addTodo(params)
    notify({
      type: NotificationTypes.SUCCESS,
      title: 'Add todo succsessfully'
    })
  }

  const deleteTodo = async (id: string) => {
    await todoService.deleteTodo(id)
    notify({
      type: NotificationTypes.SUCCESS,
      title: 'Delete todo succsessfully'
    })
  }

  const updateCompletedTodo = async (id: string) => {
    await todoService.updateCompletedTodo(id)
    notify({
      type: NotificationTypes.SUCCESS,
      title: 'Update completed todo succsessfully'
    })
  }

  const editTodo = async (params: TTodo) => {
    await todoService.editTodo(params)
    notify({
      type: NotificationTypes.SUCCESS,
      title: 'Edit todo succsessfully'
    })
  }

  const clearAllComplete = async () => {
    await todoService.deleteAllCompletedTodo()
    notify({
      type: NotificationTypes.SUCCESS,
      title: 'Clear all completed todo succsessfully'
    })
  }

  const toggleStatus = async () => {
    await todoService.toggleAllTodo()
    notify({
      type: NotificationTypes.SUCCESS,
      title: 'Toggle all todo status succsessfully'
    })
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
