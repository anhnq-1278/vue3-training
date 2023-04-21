<template>
  <div class="loading">
    <div
      class="bg-black fixed inset-0 flex items-center justify-center bg-grey-dc opacity-40 z-[999]"
    />
    <img
      :src="loadingImage"
      class="fixed inset-2/4 w-28 h-28 translate-x-[-50%] translate-y-[-50%] z-[1000]"
    />
  </div>
</template>

<script setup lang="ts">
import loadingImage from '@/assets/images/loading.gif'
</script>
