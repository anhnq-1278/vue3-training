import axiosClient from './apiClient'
import type { UpdateTodoDTO, TodoResponse } from '../interface/todo.dto'

const todoApi = {
  async createTodo(title: string) {
    const url = '/todo'
    const { data } = await axiosClient.post(url, {
      title,
    })
    return data
  },
  updateTodoTitle({ id, title }: UpdateTodoDTO) {
    const url = '/todo/title'

    return axiosClient.put(url, {
      id,
      title,
    })
  },
  updateTodoComplete({ id, isCompleted }: UpdateTodoDTO) {
    const url = '/todo/complete'

    return axiosClient.put(url, {
      id,
      isCompleted
    })
  },
  async getTodos() {
    const url = '/todo'
    const { data }: TodoResponse = await axiosClient.get(url)
    return data
  },

  deleteTodo(id: string) {
    const url = `/todo/${id}`
    return axiosClient.delete(url)
  }
}

export default todoApi
