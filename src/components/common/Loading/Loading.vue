<template>
  <div class="fixed inset-0 bg-grey-dc opacity-50 z-[999]">
    <img
      class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[40px] h-[40px]"
      :src="LoadingImage"
    />
  </div>
</template>
<script setup lang="ts">
import LoadingImage from '@/assets/images/loading.gif'
</script>

<style lang="scss"></style>
