<template>
  <div
    :class="`
      flex p-4 pl-0 bg-black/[0.003] w-[500px]
     text-black/[.5] border-b border-solid
      border-[#ededed]
      shadow-[0_-2px_1px_rgba(0,0,0,0.03)]
    `"
  >
    <div
      class="w-[50px] flex justify-center items-center mr-[10px]"
      @click="useTodoStore().toggleActive"
    >
      <IconArrowDown v-show="useTodoStore().todos.length" />
    </div>
    <input
      type="text"
      v-model="title"
      autofocus
      class="border-none w-full text-[24px] leading-[1.4em] focus:outline-none"
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
