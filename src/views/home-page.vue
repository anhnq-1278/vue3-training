<script setup lang="ts">
import { onMounted } from 'vue';
// @ts-ignore
import  { NFCPortLib } from '@/sdk/NFCPortLib.js';

const lib = new NFCPortLib()

onMounted(() => {
  lib.init()
})

async function handleDetect () {
  try {
    const data = await lib.open()
    console.log(data)
  } catch(error) {
    console.log(error)
  }
  
}

</script>

<template>
  <div>
    <button @click="handleDetect">detect device</button>
  </div>
</template>
