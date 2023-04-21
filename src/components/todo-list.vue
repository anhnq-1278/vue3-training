<template>
  <div class="list">
    <div class="flex justify-center items-center flex-col">
      <div class="text-[100px] text-[rgba(175,47,47,0.15)] font-thin text-center leading-[100px]">
        todos
      </div>
      <div class="text-center mt-2">Double-click to edit a task</div>
      <div class="content mt-10 w-full bg-white">
        <div class="content-header relative">
          <div
            v-if="total > 0"
            @click="handleCheckAll"
            :class="[
              'check-all absolute top-2 left-[-8px] w-[65px] h-[50px] z-10 cursor-pointer',
              { 'is-active': isCheckAll }
            ]"
          />
          <input
            v-model="task"
            type="text"
            placeholder="what needs to be done"
            class="w-full h-[65px] p-4 px-[60px] text-2xl font-light placeholder:text-gray-500 placeholder:font-thin placeholder:italic focus-visible:outline-none"
            @keyup.enter="handleAddTask"
          />
        </div>
        <div v-for="(list, index) in props.listTask" :key="index" class="w-full border-t p-2">
          <todo-item
            :item="list"
            @change-complete="emit('change-complete', list._id as string)"
            @delete-task="emit('delete-task', list._id as string)"
            @edit-task="emit('edit-task', $event)"
          />
        </div>
        <div class="w-full relative footer border-t p-2" v-if="total">
          <p class="absolute">{{ itemLeft }} items left</p>
          <div class="flex gap-4 justify-center z-10">
            <div
              v-for="item in ['All', 'Active', 'Completed']"
              :key="item"
              @click="handleChangeTab(item)"
              :class="[
                'cursor-pointer py-1 px-3 border  hover:border-[rgba(175,47,47,0.15)] cursor-pointer border-transparent',
                { 'text-[#38bdf8] border-[rgba(175,47,47,0.15)]': tab === item }
              ]"
            >
              {{ item }}
            </div>
          </div>
          <p
            v-if="total > itemLeft"
            class="cursor-pointer text-[#b51f14] absolute right-0 top-[50%] translate-y-[-50%] z-10 mr-2"
            @click="emit('clear-complete')"
          >
            Clear Completed
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import todoItem from '@/components/todo-item.vue'
import { ref, type PropType } from 'vue'
import type { ITask } from '@/type/Todo'

const props = defineProps({
  listTask: {
    type: Array as PropType<ITask[]>,
    default: () => []
  },
  itemLeft: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  tab: {
    type: String,
    default: 'All'
  }
})

const emit = defineEmits<{
  (e: 'add-task', value: string): void
  (e: 'change-complete', id: string): void
  (e: 'delete-task', id: string): void
  (e: 'edit-task', value: { title: string; id: string }): void
  (e: 'change-tab', value: string): void
  (e: 'clear-complete'): void
  (e: 'check-all'): void
}>()

const task = ref<string>('')
const isCheckAll = ref(false)

function handleAddTask() {
  emit('add-task', task.value)
  task.value = ''
}

function handleChangeTab(tabs: string) {
  emit('change-tab', tabs)
}

function handleCheckAll() {
  emit('check-all')
  isCheckAll.value = !isCheckAll.value
}
</script>

<style scoped lang="scss">
.list {
  .content {
    box-shadow: 0 2px 4px #0003, 0 25px 50px #0000001a;

    &-header {
      .check-all {
        transform: rotate(90deg);

        &::after {
          content: '❯';
          position: absolute;
          font-size: 22px;
          color: #e6e6e6;
          padding: 10px 27px 10px 27px;
        }

        &.is-active {
          &::after {
            color: #38bdf8;
          }
        }
      }
    }
  }

  .footer {
    &::after {
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
}
</style>
