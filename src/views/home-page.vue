<script setup lang="ts">
import { ref, computed } from 'vue'
interface IList {
  title: string
  isChecked: boolean
  isEdit: boolean
}

const task = ref<string>('')
const lists = ref<IList[]>([])
const tab = ref<string>('All')

const remaining = computed(() => {
  return lists.value.filter(({ isChecked }: { isChecked: boolean }) => !isChecked)
})

const listRender = computed(() => {
  if (tab.value === 'Active') {
    return lists.value.filter(({ isChecked }: { isChecked: boolean }) => !isChecked)
  }

  if (tab.value === 'Completed') {
    return lists.value.filter(({ isChecked }: { isChecked: boolean }) => isChecked)
  }

  return lists.value
})

function addTask() {
  if (!task.value.trim()) return

  lists.value.push({ title: task.value, isChecked: false, isEdit: false })
  task.value = ''
}

function changeActive(index: number) {
  lists.value[index].isChecked = !lists.value[index].isChecked
}

function removeTask(index: number) {
  lists.value.splice(index, 1)
}

function editTask(index: number) {
  lists.value[index].isEdit = !lists.value[index].isEdit
}

function onBlur(index: number) {
  lists.value[index].isEdit = false

  if (!lists.value[index].title.trim()) {
    removeTask(index)
  }
}

function handleChangeTabs(tabs: string) {
  tab.value = tabs
}

function clearCompleted() {
  lists.value = lists.value.filter(({ isChecked }: { isChecked: boolean }) => !isChecked)
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
          <input type="checkbox" :checked="list.isChecked" @change="changeActive(index)" />
          <p
            @dblclick="editTask(index)"
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
            @blur="onBlur(index)"
          />
          <p @click.prevent.stop="removeTask(index)" class="text-[#b51f14] cursor-pointer">
            Delete Task
          </p>
        </div>
      </div>
      <div class="flex justify-between w-full" v-if="lists.length">
        <p>{{ remaining.length }} items left</p>
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
          v-if="lists.length > remaining.length"
          class="cursor-pointer text-[#b51f14]"
          @click="clearCompleted"
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
