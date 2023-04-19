<template>
  <li
    :class="[
      `group list-none 
      flex items-center pl-[11px]
      text-[24px] border-b border-solid
      border-[#ededed]
      relative bg-no-repeat bg-left bg-check`,
      { 'bg-completed': todo.isCompleted },
      { 'bg-none': isEdit }
    ]"
  >
    <input
      v-if="!isEdit"
      class="h-6 w-6 appearance-none"
      type="checkbox"
      @click="activeTodo(todo._id)"
    />
    <div v-if="!isEdit" class="w-[400px] break-words ml-5">
      <span
        class="font-light text-gray text-[18px]"
        :class="[todo.isCompleted ? 'line-through' : 'no-underline']"
        @dblclick="isEdit = true"
        >{{ todo.title }}</span
      >
    </div>
    <input
      v-else
      v-model="newTitle"
      v-click-outside="editTodo"
      class="input-edit h-12 border border-black text-lg text-gray focus:outline-none w-full ml-10 shadow-todo-edit"
      type="text"
      autofocus
      @keydown.enter="editTodo"
    />
    <span
      class="pt-2 absolute right-5 cursor-pointer hidden group-hover:block"
      @click="removeTodo(todo._id)"
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

const editTodo = () => {
  todoStore.editTodo(newTitle.value, props.todo._id)
  isEdit.value = false
}
</script>
