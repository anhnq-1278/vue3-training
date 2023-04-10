<template>
  <div class="w-full bg-white mt-7 relative todoapp">
    <input
      type="text"
      class="w-full h-[60px] p-4 border-none shadow-[inset_0_-2px_1px_rgba(0,0,0,0.03)] text-2xl font-light placeholder:text-gray-500 placeholder:font-thin placeholder:italic focus-visible:outline-none"
      placeholder="What needs to be done?"
    />
    <div>
      <div
        class="w-full min-h-[60px] flex items-center gap-4 border-b border-b-gray-200 p-4 text-xl font-light"
      >
        <checkbox :checked="isActive" @change="isActive = !isActive" />
        <span :class="['flex-1', { 'line-through': isActive }]">Have breakfast</span>
      </div>
      <div
        class="w-full min-h-[60px] flex items-center gap-4 border-b border-b-gray-200 p-4 text-xl font-light"
      >
        <checkbox :checked="false" />
        <span class="flex-1">Have breakfast</span>
      </div>
    </div>
    <div class="flex items-center justify-between h-[50px] text-sm font-light p-4">
      <span>1 item left</span>
      <div class="flex gap-4">
        <a
          class="py-1 px-3 border border-transparent hover:border-[rgba(175,47,47,0.15)] cursor-pointer"
        >
          All
        </a>
        <a
          class="py-1 px-3 border border-transparent hover:border-[rgba(175,47,47,0.15)] cursor-pointer"
        >
          Active
        </a>
        <a
          class="py-1 px-3 border border-transparent hover:border-[rgba(175,47,47,0.15)] cursor-pointer"
        >
          Completed
        </a>
      </div>
      <div>Clear completed</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import checkbox from '@/components/check-box.vue'

const isActive = ref(false)
</script>

<style lang="scss" scoped>
.todoapp {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
}
</style>
