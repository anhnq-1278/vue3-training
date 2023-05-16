<template>
  <div class="section-form">
    <div class="section-form__title pb-2 text-black-11 font-bold text-[24px] leading-[30px] border-b border-grey-d9">{{ title }}</div>
    <div class="section-form__desc">
      <slot name="description" />
    </div>
    <div class="section-form__content">
      <slot name="content" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped></style>
