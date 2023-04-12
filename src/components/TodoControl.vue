<template>
  <div class="todo-control">
    <div class="left-control" @click="useTodoStore().toggleActive">
      <IconArrowDown :style="{ display: useTodoStore().todos.length ? 'block' : 'none' }" />
    </div>
    <input
      type="text"
      v-model="title"
      autofocus
      class="input-control"
      placeholder="what needs to be done?"
      @keydown.enter="addTodo(title)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/store/todo'
import IconArrowDown from '@/assets/icons/IconArrowDown.vue'

const emit = defineEmits(['addTodo'])
const title = ref<string>('')

const addTodo = (newTitle: string) => {
  emit('addTodo', newTitle)
  title.value = ''
}
</script>
