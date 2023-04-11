<template>
  <div class="w-[550px] mx-auto my-0">
    <h1 class="text-[100px] text-red-default font-thin text-center leading-[80px]">todos</h1>
    <TodoList :tasks="todoStore.tasks" @add-task="handleAddTask" />
  </div>
</template>
<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/store/todo'

const todoStore = useTodoStore()

function handleAddTask(title: string): void {
  if (!title) return
  todoStore.addTask(title)
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
