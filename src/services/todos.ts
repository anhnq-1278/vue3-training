import type { TTodoItem } from '@/model/Todo'
import APIService from './api'

class TodoService extends APIService {
  constructor() {
    super()
  }

  getListTodo(filter?: string) {
    if (!filter) {
      return this.axios.get<TTodoItem[]>('todo')
    } else {
      return this.axios.get<TTodoItem[]>(`todo?filter=${filter}`)
    }
  }

  createTodoItem(data: { title: string }) {
    return this.axios.post('todo', data)
  }

  updateTitleTodoItem(data: { id: string; title: string }) {
    return this.axios.put('todo/title', data)
  }

  updateCompleteTodoItem(id: string) {
    return this.axios.put('todo/complete', { id })
  }

  deleteTodoItem(id: string) {
    return this.axios.delete(`todo/${id}`)
  }

  deleteCompletedItem() {
    return this.axios.delete('todo/deleteCompletedItem')
  }

  setCompleteAllItem() {
    return this.axios.put('todo/setCompleteAllItem')
  }

  getItemLeft() {
    return this.axios.get<number>('todo/itemLeft')
  }
}

export default TodoService
