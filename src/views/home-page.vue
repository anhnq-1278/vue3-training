<template>
  <div>
    <h1>todos</h1>
    <div class="todo">
      <TodoControl @add-todo="addTodo" />
      <div>
        <ListTodo :todos="todos" />
        <div class="todo-footer">
          <span>{{ todos.length }} items left</span>
          <ul class="todo-filter">
            <li @click="allTodos">all</li>
            <li @click="activeTodos">active</li>
            <li @click="completeTodos">completed</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoControl from '@/components/TodoControl.vue'
import ListTodo from '@/components/ListTodo.vue'
import { ref } from 'vue'
import { useTodoStore } from '@/store/todo'
import type { TodoDTO } from '@/interface/todo.dto'
const todoStore = useTodoStore()

let todos = ref<Array<TodoDTO>>(todoStore.todos)

const addTodo = (title: string) => {
  if (!title) return
  todoStore.addTodo(title)
}
const allTodos = () => {
  todos.value = todoStore.todos
}
const activeTodos = () => {
  todos.value = todoStore.todos.filter((todo) => !todo.completed)
}
const completeTodos = () => {
  todos.value = todoStore.todos.filter((todo) => todo.completed)
}
</script>
