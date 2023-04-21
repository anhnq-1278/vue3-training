<template>
  <div class="flex gap-2">
    <check-box :is-checked="item.isCompleted" @change="emit('change-complete')" />
    <p
      @dblclick="isEdit = !isEdit"
      v-if="!isEdit"
      :class="[' flex-1 p-1', { 'line-through text-[#dbdbdb]': item.isCompleted }]"
    >
      {{ item.title }}
    </p>
    <input
      v-else
      type="text"
      v-model="editValue"
      class="flex-1 focus-visible:outline-none border border-gray-200 p-1"
      @blur="editTask"
    />
    <close-icon @click.prevent.stop="emit('delete-task')" class="text-[#b51f14] cursor-pointer">
      Delete Task
    </close-icon>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import checkBox from '@/components/check-box.vue'
import closeIcon from '@/components/icons/close-icon.vue'
import type { ITask } from '@/type/Todo'

const props = defineProps({
  item: {
    type: Object as PropType<ITask>,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'edit-task', value: { title: string; id: string }): void
  (e: 'change-complete'): void
  (e: 'delete-task'): void
}>()

const isEdit = ref(false)
const editValue = ref<string>(props.item.title as string)

function editTask() {
  isEdit.value = false
  emit('edit-task', { title: editValue.value, id: props.item._id as string })
}
</script>

<style scoped></style>
