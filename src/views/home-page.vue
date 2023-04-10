<template>
  <div class="container pb-[30px]">
    <h1 class="text-[100px] text-[rgba(175,47,47,0.15)] font-thin text-center leading-[100px]">
      todos
    </h1>
    <to-do-list />
  </div>
</template>

<script setup lang="ts">
import toDoList from '@/components/to-do-list.vue'
</script>
