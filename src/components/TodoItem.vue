<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <input type="checkbox" @click="activeTodo(todo.id)" />
    <span
      :style="{
        'text-decoration': todo.completed ? 'line-through' : 'initial',
        display: isEdit ? 'none' : 'block'
      }"
      @dblclick="isEdit = true"
      >{{ todo.title }}</span
    >
    <input
      v-model="newTitle"
      :style="{
        display: isEdit ? 'block' : 'none'
      }"
      class="input-edit"
      type="text"
      autofocus
      @keydown.enter="editTodo(todo.id)"
    />
    <span @click="removeTodo(todo.id)" :class="[isEdit ? 'display-none' : 'icon-remove']">
      <IconRemove />
    </span>
  </li>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TodoDTO } from '@/interface/todo.dto'
import { useTodoStore } from '@/store/todo'
import IconRemove from '@/assets/icons/IconRemove.vue'

const props = defineProps<{
  todo: TodoDTO
  index: number
}>()
const todoStore = useTodoStore()

const isEdit = ref<boolean>(false)
const newTitle = ref<string>(todoStore.todos[props.index].title)

const removeTodo = (id: string) => {
  todoStore.removeTodo(id)
}

const activeTodo = (id: string) => {
  todoStore.activeTodo(id)
}

const editTodo = (id: string) => {
  todoStore.editTodo(newTitle.value, id)
  isEdit.value = false
}
</script>
