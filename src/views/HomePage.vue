<template>
  <div>
    <h1 class="text-[100px] font-thin text-center m-5 text-brown-red">todos</h1>
    <div class="todo relative bg-white shadow-todo max-w-[500px]">
      <TodoControl @add-todo="addTodo" />
      <div v-show="todos.length">
        <ListTodo :todos="todosRender" />
        <FooterTodo @change-tab="changeTab" :length-todos="todosRender.length" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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
    return todos.value.filter(({ isCompleted }) => !isCompleted)
  }

  if (tab.value === 'completed') {
    return todos.value.filter(({ isCompleted }) => isCompleted)
  }

  return todos.value
})

onMounted(() => {
  todoStore.getTodos()
})

const addTodo = (title: string) => {
  if (!title) return
  todoStore.addTodo(title)
}

const changeTab = (tabChange: string) => {
  tab.value = tabChange
}
</script>
