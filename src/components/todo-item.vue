<template>
  <div
    class="w-full min-h-[60px] flex items-center gap-4 border-b border-b-gray-200 p-4 text-xl font-light"
  >
    <checkbox :checked="itemTodo.isCompleted" @change="emit('change-complete', itemTodo._id)" />
    <span
      v-if="!isEdit"
      :class="[
        'flex-1 whitespace-breakword ',
        { 'line-through text-gray-300': itemTodo.isCompleted }
      ]"
      @dblclick="isEdit = !isEdit"
      >{{ itemTodo.title }}</span
    >
    <input
      v-else
      autofocus
      class="flex-1 focus-visible:outline-none border border-gray-200 p-1"
      @keypress.enter="handleEditTitle"
      @blur="handleEditTitle"
      v-model="editValue"
    />

    <delete-icon v-if="!isEdit" @click="emit('delete-item', itemTodo._id)" class="cursor-pointer" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

import checkbox from '@/components/check-box.vue'
import deleteIcon from '@/components/delete-icon.vue'
import type { TTodoItem } from '@/model/Todo'

const props = defineProps({
  itemTodo: {
    type: Object as PropType<TTodoItem>,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'change-complete', id: string): void
  (e: 'edit-item', value: { id: string; title: string }): void
  (e: 'delete-item', id: string): void
}>()

const isEdit = ref(false)
const editValue = ref(props.itemTodo.title)

const handleEditTitle = () => {
  emit('edit-item', { id: props.itemTodo._id, title: editValue.value })

  isEdit.value = false
}
</script>
