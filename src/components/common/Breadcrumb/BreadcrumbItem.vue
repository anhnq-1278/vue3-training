<template>
  <li class="inline-flex items-center">
    <slot name="arrow-icon">
      <ArrowIcon v-if="!home" class="mx-[23px]" />
    </slot>
    <span
      :class="['flex', `${props.isClick ? 'cursor-pointer text-[#374151]' : 'text-[#6B7280]'}`]"
    >
      <slot name="home-icon">
        <HomeIcon v-if="home" class="mr-[18px]" />
      </slot>
      <slot name="default" />
    </span>
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
</script>
<style lang="scss" scoped></style>
