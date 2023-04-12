<template>
  <div>
    <h1>todos</h1>
    <div class="todo">
      <TodoControl @add-todo="addTodo" />
      <div :class="[todos.length ? 'display' : 'display-none']">
        <ListTodo :todos="todosRender" />
        <FooterTodo @change-tab="changeTab" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/store/todo'
import TodoControl from '@/components/TodoControl.vue'
import ListTodo from '@/components/ListTodo.vue'
import FooterTodo from '@/components/FooterTodo.vue'

const todoStore = useTodoStore()

const { todos } = storeToRefs(todoStore)
const tab = ref<string>('all')
const todosRender = computed(() => {
  if (tab.value === 'active') {
    return todos.value.filter(({ completed }) => !completed)
  }

  if (tab.value === 'completed') {
    return todos.value.filter(({ completed }) => completed)
  }

  return todos.value
})

const addTodo = (title: string) => {
  if (!title) return
  todoStore.addTodo(title)
}

const changeTab = (tabChange: string) => {
  tab.value = tabChange
}
</script>
