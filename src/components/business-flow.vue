<template>
  <div class="flex flex-col">
    <div v-for="(step, index) in stepList" :key="step.stepNumber">
      <step-item
        :step-number="step.stepNumber"
        :title="step.title"
        :description="step.description"
        :href-title="step.hrefTitle"
        :value="stepValue"
        :max-step="maxStep"
        @change="($event) => onChange($event)"
      />
      <div class="h-10 w-10 flex justify-center my-2" v-if="index + 1 !== stepList.length">
        <div class="h-full w-[2px] bg-[#9ca3af]"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import stepItem from './step-item.vue'

const stepList = [
  {
    stepNumber: 1,
    title: '制度概要情報',
    description: '審査のチェックリスト',
    hrefTitle: '画面名画面名画面名'
  },
  {
    stepNumber: 2,
    title: '制度概要情報',
    description: '審査のチェックリスト',
    hrefTitle: '画面名画面名画面名'
  },
  {
    stepNumber: 3,
    title: '制度概要情報',
    hrefTitle: '画面名画面名画面名'
  },
  {
    stepNumber: 4,
    title: '制度概要情報',
    hrefTitle: '画面名画面名画面名'
  },
  {
    stepNumber: 5,
    title: '制度概要情報',
    description: '審査のチェックリスト',
    hrefTitle: '画面名画面名画面名'
  }
]

const stepValue = ref(3)
const maxStep = ref(3)

const onChange = (value: number) => {
  console.log(value)

  stepValue.value = value
}
</script>
