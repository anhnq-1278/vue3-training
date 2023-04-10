<template>
  <div class="w-full bg-white mt-7 relative todoapp">
    <input
      type="text"
      class="w-full h-[60px] p-4 border-none shadow-[inset_0_-2px_1px_rgba(0,0,0,0.03)] text-2xl font-light placeholder:text-gray-500 placeholder:font-thin placeholder:italic focus-visible:outline-none"
      placeholder="What needs to be done?"
      v-model="todoValue"
      @keyup.enter="onSubmit"
    />

    <div class="to-do-list">
      <div
        v-for="item in todoList"
        :key="item.id"
        class="w-full min-h-[60px] flex items-center gap-4 border-b border-b-gray-200 p-4 text-xl font-light"
      >
        <checkbox :checked="item.completed" @change="onChangeComplete(item.id)" />
        <span :class="['flex-1', { 'line-through': item.completed }]">{{ item.name }}</span>
        <delete-icon @click="handleDeleteItem(item.id)" class="cursor-pointer" />
      </div>
    </div>

    <div class="flex items-center justify-between h-[50px] text-sm font-light p-4">
      <span>{{ itemLeft }} item left</span>
      <div class="flex gap-4">
        <div
          v-for="item in filterList"
          :key="item.id"
          :class="[
            `py-1 px-3 border  hover:border-[rgba(175,47,47,0.15)] cursor-pointer ${
              filterValue === item.id ? 'border-[rgba(175,47,47,0.15)]' : 'border-transparent'
            }`
          ]"
          @click="filterValue = item.id"
        >
          {{ item.name }}
        </div>
      </div>
      <div @click="handleClearCompleted" class="cursor-pointer">Clear completed</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive, watch } from 'vue'
import checkbox from '@/components/check-box.vue'
import deleteIcon from '@/components/delete-icon.vue'
import ToDoStore from '@/store/Todo'
import type { TTodoItem } from '@/model/Todo'

const store = ToDoStore()

const todoValue = ref('')
const todoList = ref<Array<TTodoItem>>([])
const itemLeft = ref(0)
const filterList = reactive([
  {
    id: 1,
    name: 'All'
  },
  {
    id: 2,
    name: 'Active'
  },
  {
    id: 3,
    name: 'Completed'
  }
])
const filterValue = ref(1)

onBeforeMount(() => {
  setValueTodoList()
})

const onSubmit = () => {
  store.setTodoItem(todoValue.value)

  todoValue.value = ''

  setValueTodoList()
}

const onChangeComplete = (id: number) => {
  store.setCompletedItem(id)

  setValueTodoList()
}

const handleClearCompleted = () => {
  store.deleteCompletedItem()

  setValueTodoList()
  filterValue.value = 1
}

const handleDeleteItem = (id: number) => {
  store.deleteItem(id)

  setValueTodoList()
}

const setValueTodoList = () => {
  switch (filterValue.value) {
    case 1:
      todoList.value = store.toDoList
      break
    case 2:
      todoList.value = store.toDoList.filter((item) => !item.completed)
      break
    case 3:
      todoList.value = store.toDoList.filter((item) => item.completed)
      break
  }

  itemLeft.value = store.toDoList.filter((item) => !item.completed).length
}

watch(filterValue, (value) => {
  switch (value) {
    case 1:
      todoList.value = store.toDoList
      break
    case 2:
      todoList.value = store.toDoList.filter((item) => !item.completed)
      break
    case 3:
      todoList.value = store.toDoList.filter((item) => item.completed)
      break
  }
})
</script>

<style lang="scss" scoped>
.todoapp {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
}
</style>
