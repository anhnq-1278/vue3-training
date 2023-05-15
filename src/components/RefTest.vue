<template>
  <div class="mt-16 flex items-center justify-center">
    <div
      class="h-24 w-24 p-2 resize overflow-scroll bg-gray-700 text-gray-300 rounded flex items-center justify-center"
      :ref="functionRef"
    />
  </div>

  <div>

  </div>
</template>
<script lang="ts" setup>
import { useDimension } from '@/utils/useDimension'
const functionRef = useDimension()
</script>
