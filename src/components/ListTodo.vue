<template>
  <ul class="list-todo">
    <TodoItem />
    <TodoItem />
  </ul>
</template>

<script lang="ts">
import TodoItem from '@/components/TodoItem.vue'
export default {
  name: 'ListTodo',
  components: {
    TodoItem
  }
}
</script>
