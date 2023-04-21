import APIService from './api'
import type { TTodo, TTodoItem, TTodoListParams } from '@/model/todo.model'

class TodoService extends APIService {
  constructor() {
    super()
  }

  async getTodoList(params: TTodoListParams) {
    const { filter} = params
    if (filter) {
      return await this.axios.get<Array<TTodoItem>>('/todo', { params })
    }
    return await this.axios.get<Array<TTodoItem>>('/todo')

  }

  async addTodo(params: TTodo) {
    return await this.axios.post('/todo', params)
  }

  async editTodo(params: TTodo) {
    return await this.axios.put('/todo/title', params)
  }

  async updateCompletedTodo(id: string) {
    return await this.axios.put('/todo/complete', { id })
  }

  async deleteTodo(id: string) {
    return await this.axios.delete(`/todo/${id}`)
  }

  async deleteAllCompletedTodo() {
    return await this.axios.delete('/todo/deleteCompletedItem')
  }

  async toggleAllTodo() {
    return await this.axios.put('/todo/setCompleteAllItem')
  }

  async getItemLeft() {
    return await this.axios.get<number>('/todo/itemLeft')
  }

  async getAllTodoList() {
    return await this.axios.get<Array<TTodoItem>>('/todo')
  }
}

export default TodoService
