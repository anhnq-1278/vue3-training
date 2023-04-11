import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TodoDTO } from '@/interface/todo.dto'


export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Array<TodoDTO>>([])

  const addTodo = (title: string) => {
    todos.value.push({ id: new Date().toISOString(), title, completed: false })
  }

  const removeTodo = (index: number) => {
    todos.value.splice(index, 1);
  }

  const editTodo = (newTitle: string, index: number) => {
    todos.value[index].title = newTitle
  }

  const activeTodo = (index: number) => {
    todos.value[index].completed = !todos.value[index].completed;
  }

  const toggleActive = () => {
    const isActive = todos.value.some(todo => todo.completed === false)
    todos.value.forEach(todo => {
      todo.completed = isActive;
    })
  }


  return {
    todos,
    addTodo,
    removeTodo,
    activeTodo,
    toggleActive,
    editTodo,
  }
})
