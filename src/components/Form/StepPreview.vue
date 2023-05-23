<template>
  <div>
    <SectionForm title="世帯主" class="mt-10">
      <template #content>
        <div class="flex mb-2">
          <div class="w-[240px]">Name1</div>
          <div class="flex-1">{{ dataForm.name1 || '' }}</div>
        </div>
        <div class="flex mb-2">
          <div class="w-[240px]">Name2</div>
          <div class="flex-1">{{ dataForm.name2 || '' }}</div>
        </div>
      </template>
    </SectionForm>
    <button
      class="px-2 py-2 border border-grey-d9 rounded-lg mb-10"
      @click="backTo('scrollToElement1')"
    >
      申請内容入力画面へ戻る
    </button>
    <SectionForm title="世帯主">
      <template #content>
        <div class="flex">
          <div class="w-[240px]">Email1</div>
          <div class="flex-1">{{ dataForm.email1 || '' }}</div>
        </div>
        <div class="flex">
          <div class="w-[240px]">Email2</div>
          <div class="flex-1">{{ dataForm.email2 || '' }}</div>
        </div>
      </template>
    </SectionForm>
    <button
      class="px-2 py-2 border border-grey-d9 rounded-lg mb-10"
      @click="backTo('scrollToElement2')"
    >
      申請内容入力画面へ戻る
    </button>
  </div>
</template>
<script setup lang="ts">
import SectionForm from '@/components/Form/SectionForm.vue'
import ItemForm from '@/components/Form/ItemForm.vue'

const props = defineProps({
  dataForm: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'back', refSectionName: string): void
}>()

function backTo(refSectionName: string) {
  emit('back', refSectionName)
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
