<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoStore } from '@/store/home'

const store = useTodoStore()

const task = ref<string>('')
const tab = ref<string>('All')

const listRender = computed(() => {
  if (tab.value === 'Active') {
    return store.lists.filter(({ isChecked }: { isChecked: boolean }) => !isChecked)
  }

  if (tab.value === 'Completed') {
    return store.lists.filter(({ isChecked }: { isChecked: boolean }) => isChecked)
  }

  return store.lists
})

function handleChangeTabs(tabs: string) {
  tab.value = tabs
}

function addTask() {
  store.addTask(task.value)
  task.value = ''
}
</script>

<template>
  <div class="list mx-[400px] p-10">
    <div class="flex justify-center items-center flex-col gap-4">
      <div class="text-[#333] text-6xl">ToDo List</div>
      <div class="text-center mt-2">Double-click to edit a task</div>
      <div class="mt-10 w-full">
        <input
          v-model="task"
          type="text"
          class="border rounded p-4 text-xl w-full"
          @keyup.enter="addTask"
        />
      </div>
      <div v-for="(list, index) in listRender" :key="index" class="w-full border rounded p-2">
        <div class="flex gap-2">
          <input type="checkbox" :checked="list.isChecked" @change="store.changeActive(index)" />
          <p
            @dblclick="store.editTask(index)"
            v-if="!list.isEdit"
            :class="[' flex-1 p-1', { 'line-through text-[#dbdbdb]': list.isChecked }]"
          >
            {{ list.title }}
          </p>
          <input
            v-else
            type="text"
            v-model="list.title"
            class="border flex-1 p-1"
            @blur="store.onBlur(index)"
          />
          <p @click.prevent.stop="store.removeTask(index)" class="text-[#b51f14] cursor-pointer">
            Delete Task
          </p>
        </div>
      </div>
      <div class="flex justify-between w-full" v-if="store.lists.length">
        <p>{{ store.remaining.length }} items left</p>
        <div class="flex gap-2">
          <div
            v-for="item in ['All', 'Active', 'Completed']"
            :key="item"
            @click="handleChangeTabs(item)"
            :class="['cursor-pointer', { 'text-[#38bdf8]': tab === item }]"
          >
            {{ item }}
          </div>
        </div>
        <p
          v-if="store.lists.length > store.remaining.length"
          class="cursor-pointer text-[#b51f14]"
          @click="store.clearCompleted"
        >
          Clear Completed
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.list {
  input {
    box-shadow: none;
    outline: none;
  }
}
</style>
