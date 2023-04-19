import axiosClient from './apiClient'
import type { UpdateTodoDTO } from '../interface/todo.dto'

const todoApi = {
  createTodo(title: string) {
    const url = '/todo'
    return axiosClient.post(url, {
      title,
    })
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
  getTodos() {
    const url = '/todo'
    return axiosClient.get(url)
  },

  deleteTodo(id: string) {
    const url = `/todo/${id}`
    return axiosClient.delete(url)
  }
}

export default todoApi
