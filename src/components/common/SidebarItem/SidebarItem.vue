<template>
  <div
    class="flex items-center cursor-pointer gap-x-2 font-medium text-2xl hover:bg-slate-400 hover:text-whiteCt-fb transition-all duration-1000 w-full h-[50px]"
  >
    <slot name="logo" />
    <slot name="name" />
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
