<template>
  <li
    :class="[
      { 'bg-completed': todo.completed },
      `group list-none h-[50px]
      flex items-center pl-[11px]
      text-[24px] border-b border-solid
      border-[#ededed]
      relative bg-no-repeat bg-left bg-check`
    ]"
  >
    <input class="h-6 w-6 appearance-none" type="checkbox" @click="activeTodo(todo.id)" />
    <span
      v-if="!isEdit"
      class="ml-5 font-light text-gray text-[18px]"
      :class="[todo.completed ? 'line-through' : 'no-underline']"
      @dblclick="isEdit = true"
      >{{ todo.title }}</span
    >
    <input
      v-model="newTitle"
      v-else
      class="input-edit w-full ml-5 h-11 text-2xl"
      type="text"
      autofocus
      @keydown.enter="editTodo(todo.id)"
    />
    <span
      class="pt-2 absolute right-5 cursor-pointer hidden group-hover:block"
      @click="removeTodo(todo.id)"
      v-show="!isEdit"
    >
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
