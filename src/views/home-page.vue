<script setup lang="ts">
import { onMounted } from 'vue';
// @ts-ignore
import  { NFCPortLib } from '@/sdk/NFCPortLib.js';

onMounted(async () => {
  const lib = new NFCPortLib()
  try {
    await lib.init()
    await lib.open()
  } catch (error) {
    console.log(error)
  }
  
})

</script>

<template>
  <div>
    OK
  </div>
</template>
