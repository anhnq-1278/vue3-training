<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <input type="checkbox" @click="activeTodo(index)" />
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
      @keydown.enter="editTitle(index)"
    />
    <span
      :style="{
        display: isEdit ? 'none' : 'block'
      }"
      @click="removeTodo(index)"
      class="icon-remove"
    >
      <svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </span>
  </li>
</template>

<script lang="ts" setup>
import type { TodoDTO } from '@/interface/todo.dto'
import { useTodoStore } from '@/store/todo'
import { ref } from 'vue'
const props = defineProps<{
  todo: TodoDTO
  index: number
}>()
const todoStore = useTodoStore()

const isEdit = ref<boolean>(false)

const newTitle = ref<string>(todoStore.todos[props.index].title)

const removeTodo = (index: number) => {
  todoStore.removeTodo(index)
}

const activeTodo = (index: number) => {
  todoStore.activeTodo(index)
}

const editTitle = (index: number) => {
  todoStore.editTodo(newTitle.value, index)
  isEdit.value = false
}
</script>
