<template>
  <div
    class="relative w-full bg-white-fb mt-8 shadow-default before:contents-[''] before:absolute before:right-0 before:bottom-0 before:left-0 before:h-[50px] before:shadow-3xl before:overflow-hidden"
  >
    <div class="flex items-center ml-4">
      <CaretDown class="hover:text-red-300 hover:cursor-pointer" @click="handleToggleStatus" />
      <input
        type="text"
        class="w-full h-[60px] p-4 border-none shadow-[inset_0_-2px_2px_rgba(0,0,0,0.04)] text-2xl font-light placeholder:text-gray-500 placeholder:font-thin placeholder:italic focus-visible:outline-none"
        placeholder="What needs to be done?"
        @keypress.enter="addTodo"
        :disabled="props.isPerLoading"
        v-model="title"
      />
    </div>
    <div>
      <div
        :class="[
          'w-full min-h-[60px] flex items-center gap-4 border-b border-b-gray-150 pl-4 text-xl font-light'
        ]"
        v-for="todo in todos"
        :key="todo._id"
        @dblclick="isEdit = !isEdit"
      >
        <Checkbox
          :checked="todo.isCompleted"
          @change="updateCompletedTodo(todo._id)"
          class="cursor-pointer"
        />
        <input
          v-if="isEdit"
          type="text"
          class="w-full h-[60px] border-none outline-none text-[24px]"
          :value="todo.title"
          @keypress.enter="handleEditTask($event, todo._id)"
          @focusout="handleEditTask($event, todo._id)"
        />
        <span
          v-else
          :class="[
            'flex justify-between flex-1 text-[24px] cursor-pointer truncate-1-line',
            { 'line-through': todo.isCompleted }
          ]"
        >
          {{ todo.title }}
          <Delete class="mr-4 ml-1 min-w-[20px] h-auto" @click="openDeleteTodoModal(todo._id)" />
        </span>
      </div>
    </div>
    <div
      v-if="props.totalTaskData.taskTotal > 0"
      class="flex items-center justify-between h-[50px] text-sm font-light p-4 leading-5 text-[14px]"
    >
      <div class="w-[80px]">{{ props.totalTaskData.leftTaskTotal }} item left</div>
      <div class="flex gap-4 flex-1 items-center font-light ml-[40px]">
        <span
          :class="[
            'py-1 px-3  border  hover:border-red-300 cursor-pointer',
            `${props.tabName === '' ? 'border-red-300' : 'border-transparent'}`
          ]"
          @click="changeTab('')"
        >
          All
        </span>
        <span
          :class="[
            'py-1 px-3 border hover:border-red-300 cursor-pointer',
            `${props.tabName === 'active' ? 'border-red-300' : 'border-transparent'}`
          ]"
          @click="changeTab('active')"
        >
          Active
        </span>
        <span
          :class="[
            'py-1 px-3 border  hover:border-red-300 cursor-pointer',
            `${props.tabName === 'completed' ? 'border-red-300' : 'border-transparent'}`
          ]"
          @click="changeTab('completed')"
        >
          Completed
        </span>
      </div>
      <div
        class="w-[140px] cursor-pointer py-1 px-3 border border-transparent hover:border-red-300"
        v-if="props.totalTaskData.taskTotal > props.totalTaskData.leftTaskTotal"
        @click="handleClearCompleted"
      >
        Clear completed
      </div>
    </div>
    <DeleteTodoModal
      :show-modal="showModal"
      @close-modal="closeDeleteTodoModal"
      @on-submit="handleOnSubmit"
      width="400px"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import Checkbox from '@/components/Checkbox.vue'
import Delete from '@/components/icons/Delete.vue'
import CaretDown from '@/components/icons/CaretDown.vue'
import DeleteTodoModal from '@/components/Todo/DeleteTodoModal.vue'
import type { TTodoItem } from '@/model/todo.model'

interface TTaskData {
  taskTotal: number
  leftTaskTotal: number
}

const isEdit = ref<boolean>(false)
const title = ref<string>('')
const showModal = ref<boolean>(false)

const idDeleteTodo = ref<string | null>(null)

function openDeleteTodoModal(id: string) {
  showModal.value = true
  idDeleteTodo.value = id
}

function closeDeleteTodoModal() {
  showModal.value = false
  idDeleteTodo.value = null
}

const props = defineProps({
  todos: {
    type: Array<TTodoItem>,
    default: () => []
  },
  tabName: {
    type: String,
    default: ''
  },
  totalTaskData: {
    type: Object as PropType<TTaskData>,
    default: () => ({})
  },
  isPerLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'addTodo', value: string): void
  (e: 'deleteTodo', value: string): void
  (e: 'editTodo', value: string, id: string): void
  (e: 'changeTab', value: string): void
  (e: 'updateCompletedTodo', value: string): void
  (e: 'clearCompleted'): void
  (e: 'toggleStatus'): void
}>()

function addTodo(): void {
  emit('addTodo', title.value.trim())
  title.value = ''
}

function handleOnSubmit() {
  if (!idDeleteTodo.value) return
  emit('deleteTodo', idDeleteTodo.value)
  closeDeleteTodoModal()
}

function updateCompletedTodo(id: string): void {
  emit('updateCompletedTodo', id)
}

function handleEditTask(event: Event, id: string): void {
  const newTitle = (event.target as HTMLInputElement).value.trim()
  emit('editTodo', id, newTitle)
  isEdit.value = false
}

function handleClearCompleted() {
  emit('clearCompleted')
}

function changeTab(type: string): void {
  emit('changeTab', type)
}

function handleToggleStatus(): void {
  emit('toggleStatus')
}
</script>

<style lang="scss" scoped></style>
