<template>
  <BaseModal :show="showModal" :width="width" v-bind="$attrs">
    <div class="p-4 pt-6 pr-8 pb-[14px] pl-6 border-t-[6px] border-red-600 rounded-t bg-white">
      <div class="text-lg mb-8">Do you want to delete this todo!</div>
      <div class="flex justify-end gap-x-4">
        <button
          type="button"
          class="bg-indigo-200 px-3 py-1 font-medium rounded hover:bg-slate-400 hover:text-whiteCt-fb transition-all duration-1000"
          @click="closeModal"
        >
          Close
        </button>
        <button
          type="button"
          class="bg-indigo-200 px-3 py-1 font-medium rounded hover:bg-slate-400 hover:text-whiteCt-fb transition-all duration-1000"
          @click="onSubmit"
        >
          Submit
        </button>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/common/Modal/BaseModal.vue'

defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '640px'
  }
})

const emit = defineEmits<{
  (e: 'close-modal'): void
  (e: 'on-submit'): void
}>()

function closeModal() {
  emit('close-modal')
}
function onSubmit() {
  emit('on-submit')
}
</script>
