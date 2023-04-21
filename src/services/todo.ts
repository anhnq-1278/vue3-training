import type { ITask, IToDoListParams } from '@/type/Todo'
import APIService from './api'

class TodoService extends APIService {
  constructor() {
    super()
  }

  async getTodoList(params?: IToDoListParams) {
    const { data } = await this.axios.get<{ data: ITask[] }>('/todo', { params })

    return data
  }

  async addTodo(params: string) {
    await this.axios.post('/todo', { title: params })
  }

  async editTodo(params: ITask) {
    await this.axios.put('/todo/title', params)
  }

  async updateCompletedTodo(id: string) {
    await this.axios.put('/todo/complete', { id })
  }

  async deleteTodo(id: string) {
    await this.axios.delete(`/todo/${id}`)
  }

  async deleteAllCompletedTodo() {
    await this.axios.delete('/todo/deleteCompletedItem')
  }

  async toggleAllTodo() {
    await this.axios.put('/todo/setCompleteAllItem')
  }

  async getItemLeft() {
    const { data } = await this.axios.get<{ data: number }>('/todo/itemLeft')

    return data
  }
}

export default TodoService
