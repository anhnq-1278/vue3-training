<script setup lang="ts">
import { onMounted } from 'vue';
// @ts-ignore
import  { NFCPortLib } from '@/sdk/NFCPortLib.js';

const lib = new NFCPortLib()

onMounted(() => {
  lib.init()
})

// async function handleDetectOpen () {
//   try {
//     await lib.init()
//     console.log('init successfully')
//     const data = await lib.open()
//     console.log('open successfully')
//     console.log(data)
//   } catch(error) {
//     console.log(error)
//   }
// }

async function handleDetectCard () {
  try {
    await lib.init()
    console.log('init successfully')
    await lib.open()
    console.log('open successfully')
    const data = await lib.detectCard('FeliCa')
    console.log(data)
  } catch(error) {
    console.log(error)
  }
}

</script>

<template>
  <div>
    <!-- <button @click="handleDetectOpen">detect open</button> -->
    <button @click="handleDetectCard">detect card</button>
  </div>
</template>
