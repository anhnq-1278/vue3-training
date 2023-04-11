<template>
  <div class="relative w-full bg-white-fb mt-8">
    <div class="flex items-center ml-4">
      <CaretDown class="cursor-pointer" />
      <input
        type="text"
        class="w-full h-[60px] p-4 border-none shadow-[inset_0_-2px_2px_rgba(0,0,0,0.04)] text-2xl font-light placeholder:text-gray-500 placeholder:font-thin placeholder:italic focus-visible:outline-none"
        placeholder="What needs to be done?"
        @keypress.enter="addTask"
        v-model="title"
      />
    </div>
    <div>
      <div
        :class="[
          'w-full min-h-[60px] flex items-center gap-4 border-b border-b-gray-150 pl-4 text-xl font-light'
        ]"
        v-for="task in tasks"
        :key="task.id"
        @dblclick="task.isEdit = !task.isEdit"
      >
        <Checkbox
          :checked="task.isComplete"
          @change="task.isComplete = !task.isComplete"
          class="cursor-pointer"
        />
        <input
          v-if="task.isEdit"
          type="text"
          class="w-full h-[60px] border-none outline-none"
          @keypress.enter="task.isEdit = !task.isEdit"
        />
        <span
          v-else
          :class="[
            'flex justify-between flex-1 text-[24px] cursor-pointer',
            { 'line-through': task.isComplete }
          ]"
        >
          {{ task.title }}
          <Delete class="mr-4" @click="deleteTask(task.id)" />
        </span>
      </div>
    </div>
    <div
      v-if="taskTotal > 0"
      class="flex items-center justify-between h-[50px] text-sm font-light p-4 leading-5 text-[14px]"
    >
      <span>{{ taskTotal }} item left</span>
      <div class="flex gap-4 items-center font-light">
        <span
          :class="[
            'py-1 px-3  border border-transparent hover:border-red-300 cursor-pointer',
            `${props.tabName === 'all' ? 'border-red-300' : ''}`
          ]"
        >
          All
        </span>
        <span
          :class="[
            'py-1 px-3 border border-transparent hover:border-red-300 cursor-pointer',
            `${props.tabName === 'active' ? 'border-red-300' : ''}`
          ]"
        >
          Active
        </span>
        <span
          :class="[
            'py-1 px-3 border border-transparent hover:border-red-300 cursor-pointer',
            `${props.tabName === 'completed' ? 'border-red-300' : ''}`
          ]"
        >
          Completed
        </span>
      </div>
      <div v-if="hasTaskCompleted">Clear completed</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Checkbox from '@/components/Checkbox.vue'
import Delete from '@/components/icons/Delete.vue'
import CaretDown from '@/components/icons/CaretDown.vue'
import type { Task } from '@/model/todo.model'

const isComplete = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const title = ref<string>('')

const props = defineProps({
  tasks: {
    type: Array<Task>,
    default: () => []
  },
  tabName: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits<{
  (e: 'addTask', value: string): void
}>()

const taskTotal = computed<number>(() => {
  return props.tasks.length
})

const hasTaskCompleted = computed<boolean>(() => {
  return props.tasks.some((task) => task.isComplete)
})

function addTask(): void {
  emit('addTask', title.value.trim())
  title.value = ''
}

function deleteTask(id: string): void {
  console.log(id)
}
</script>

<style lang="scss" scoped></style>
