import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TodoDTO } from '@/interface/todo.dto'


export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Array<TodoDTO>>([])

  const addTodo = (title: string) => {
    todos.value.push({ id: new Date().toISOString(), title, completed: false })
  }

  const removeTodo = (id: string) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    todos.value.splice(index, 1);
  }

  const editTodo = (newTitle: string, id: string) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    todos.value[index].title = newTitle
  }

  const activeTodo = (id: string) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    todos.value[index].completed = !todos.value[index].completed;
  }

  const toggleActive = () => {
    const isActive = todos.value.some(todo => todo.completed === false)
    todos.value.forEach(todo => {
      todo.completed = isActive;
    })
  }

  const clearCompleteTodos = () => {
    todos.value = todos.value.filter(todo => !todo.completed)
  }


  return {
    todos,
    addTodo,
    removeTodo,
    activeTodo,
    toggleActive,
    editTodo,
    clearCompleteTodos,
  }
})
