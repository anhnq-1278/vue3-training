<template>
  <div class="w-full">
    <div class="flex justify-center max-w-[1920px] flex-col items-center">
      <StepNavigation class="mt-10" :step="step" />
      <div class="card w-[839px] mt-10">
        <StepInputForm
          v-if="step === 1"
          @preview="handlePreview"
          @change-input="handleChangeInput"
          :dataForm="dataForm"
          ref="sectionRef"
        />
        <StepPreview v-if="step === 2" :dataForm="dataForm" @back="handleBack" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionForm from '@/components/Form/SectionForm.vue'
import ItemForm from '@/components/Form/ItemForm.vue'
import StepNavigation from '@/components/Form/StepNavigation.vue'
import StepInputForm from '@/components/Form/StepInputForm.vue'
import StepPreview from '@/components/Form/StepPreview.vue'
import InputText from '@/components/common/InputText/InputText.vue'
import { nextTick, reactive, ref } from 'vue'
import  dayjs from 'dayjs'
import 'dayjs/locale/ja'  // Import the language plugin

const step = ref<number>(1)
interface IData {
  name1: string
  name2: string
  email1: string
  email2: string
}

const sectionRef = ref<HTMLDivElement | null>(null)

const dataForm = reactive<IData>({
  name1: '',
  name2: '',
  email1: '',
  email2: ''
} as IData)

function handlePreview() {
  step.value = 2
}

function handleBack(sectionRefName: string) {
  step.value = 1
  nextTick(() => {
    (sectionRef.value as any)?.[sectionRefName].scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  })
}

function handleChangeInput(data: string, type: string) {
  dataForm[type as keyof IData] = data
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
