import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TodoDTO } from '@/interface/todo.dto'
import todoApi from '../api/todoApi'


export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Array<TodoDTO>>([])

  const getTodos = async () => {
    const { data } = await todoApi.getTodos();
    todos.value = data.data
  }

  const addTodo = async (title: string) => {
    const { data } = await todoApi.createTodo(title);
    const newTodo: TodoDTO = data.data
    todos.value.push(newTodo)
  }

  const removeTodo = async (id: string) => {
    await todoApi.deleteTodo(id);
    const index = todos.value.findIndex(todo => todo._id === id);
    todos.value.splice(index, 1);
  }

  const editTodo = async (newTitle: string, id: string) => {
    await todoApi.updateTodoTitle({ id, title: newTitle });
    const index = todos.value.findIndex(todo => todo._id === id);
    todos.value[index].title = newTitle
  }

  const activeTodo = async (id: string) => {
    const index = todos.value.findIndex(todo => todo._id === id);
    await todoApi.updateTodoComplete({ id, isCompleted: !todos.value[index].isCompleted });
    todos.value[index].isCompleted = !todos.value[index].isCompleted;
  }

  const toggleActive = () => {
    const isActive = todos.value.some(todo => todo.isCompleted === false)
    todos.value.forEach(todo => {
      todo.isCompleted = isActive;
    })
  }

  const clearCompleteTodos = () => {
    todos.value = todos.value.filter(todo => !todo.isCompleted)
  }


  return {
    todos,
    addTodo,
    removeTodo,
    activeTodo,
    toggleActive,
    editTodo,
    clearCompleteTodos,
    getTodos
  }
})
