<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoStore } from '@/store/home'
import closeIcon from '@/components/icons/close-icon.vue'
import checkBox from '@/components/check-box.vue'

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

const isCheckAll = computed(() => {
  return store.lists.every(({ isChecked }) => isChecked)
})

function handleChangeTabs(tabs: string) {
  tab.value = tabs
}

function addTask() {
  store.addTask(task.value)
  task.value = ''
}

function checkAll() {
  store.checkAll(isCheckAll.value)
}
</script>

<template>
  <div class="list mx-[400px] p-10">
    <div class="flex justify-center items-center flex-col">
      <div class="text-[100px] text-[rgba(175,47,47,0.15)] font-thin text-center leading-[100px]">
        todos
      </div>
      <div class="text-center mt-2">Double-click to edit a task</div>
      <div class="content mt-10 w-full bg-white">
        <div class="content-header relative">
          <div
            v-if="listRender.length"
            @click="checkAll"
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
            @keyup.enter="addTask"
          />
        </div>
        <div v-for="(list, index) in listRender" :key="index" class="w-full border-t p-2">
          <div class="flex gap-2">
            <check-box :is-checked="list.isChecked" @change="store.changeActive(index)" />
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
              class="flex-1 focus-visible:outline-none border border-gray-200 p-1"
              @blur="store.onBlur(index)"
            />
            <close-icon
              @click.prevent.stop="store.removeTask(index)"
              class="text-[#b51f14] cursor-pointer"
            >
              Delete Task
            </close-icon>
          </div>
        </div>
        <div class="w-full relative footer border-t p-2" v-if="store.lists.length">
          <p class="absolute">{{ store.remaining.length }} items left</p>
          <div class="flex gap-4 justify-center z-10">
            <div
              v-for="item in ['All', 'Active', 'Completed']"
              :key="item"
              @click="handleChangeTabs(item)"
              :class="[
                'cursor-pointer py-1 px-3 border  hover:border-[rgba(175,47,47,0.15)] cursor-pointer border-transparent',
                { 'text-[#38bdf8] border-[rgba(175,47,47,0.15)]': tab === item }
              ]"
            >
              {{ item }}
            </div>
          </div>
          <p
            v-if="store.lists.length > store.remaining.length"
            class="cursor-pointer text-[#b51f14] absolute right-0 top-[50%] translate-y-[-50%] z-10 mr-2"
            @click="store.clearCompleted"
          >
            Clear Completed
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
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
