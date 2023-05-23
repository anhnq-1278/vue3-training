<template>
  <div class="item-form mt-4">
    <div
      v-if="title"
      class="item-form__title text-[16px] leading-5 font-bold pb-2 border-b border-grey-d9"
    >
      {{ title }}
    </div>
    <div class="item-form__content">
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
