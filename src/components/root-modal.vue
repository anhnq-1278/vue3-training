<template>
  <div>
    <div
      class="bg-black fixed inset-0 flex items-center justify-center bg-grey-dc opacity-40 z-[999]"
    />
    <div
      class="fixed inset-2/4 w-[700px] h-fit translate-x-[-50%] translate-y-[-50%] z-[1000] bg-white px-7 py-5 rounded-xl"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
