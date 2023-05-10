<template>
  <li class="inline-flex items-center">
    <slot name="arrow-icon">
      <ArrowIcon v-if="!home" class="mx-[23px]" />
    </slot>
    <component
      :is="breadcrumbElementType"
      :class="['flex', `${props.isClick ? 'cursor-pointer text-[#374151]' : 'text-[#6B7280]'}`]"
    >
      <slot name="home-icon">
        <HomeIcon v-if="home" class="mr-[18px]" />
      </slot>
      <slot name="default" />
    </component>
  </li>
</template>
<script lang="ts" setup>
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import HomeIcon from '@/components/icons/HomeIcon.vue'
import { computed, toRefs } from 'vue'

const props = defineProps({
  home: {
    type: Boolean,
    default: false
  },
  isClick: {
    type: Boolean,
    default: false
  }
})

const breadcrumbElementType = computed<string>(() => {
  return props.isClick ? 'a' : 'span'
})
</script>
<style lang="scss" scoped></style>
