<template>
  <ul class="list-todo">
    <TodoItem v-for="(todo, index) in todos" :key="todo._id" :todo="todo" :index="index" />
  </ul>
</template>

<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import type { TodoDTO } from '@/interface/todo.dto'
defineProps<{
  todos: Array<TodoDTO>
}>()
</script>
