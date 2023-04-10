<template>
  <div>
    <h1>todos</h1>
    <div class="todo">
      <TodoControl />
      <ListTodoVue />
      <div class="todo-footer">
        <span>2 items left</span>
        <ul class="todo-filter">
          <li>all</li>
          <li>active</li>
          <li>completed</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TodoControl from '@/components/TodoControl.vue'
import ListTodoVue from '@/components/ListTodo.vue'
export default {
  name: 'HomePage',
  components: {
    TodoControl,
    ListTodoVue
  }
}
</script>
