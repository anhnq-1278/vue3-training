<script setup lang="ts">
import { onMounted, ref } from 'vue';
// @ts-ignore
import  { NFCPortLib } from '@/sdk/NFCPortLib.js';

const lib = new NFCPortLib()
const idm = ref<any>('')


onMounted(() => {
  lib.init()
})


async function handleDetectCard (type: string = '') {
  try {
    console.log(type)
    await lib.init()
    console.log('init successfully')
    await lib.open()
    console.log('open successfully')
    const data = await lib.detectCard(type)
    console.log(data?.idm)
    // const idmData = new Uint8Array([1, 46,85, 34, 215, 20, 102, 168])
 
    // getIdmFromUint8Array(idmData)
    getIdmFromUint8Array(data?.idm)
  } catch(error) {
    console.log(error)
  }
}

function getIdmFromUint8Array(idmData: any) {
  let idmToHex:any = []
  idmData.forEach((item: any) => {
    idmToHex.push(item.toString(16))
  });
  idm.value = idmToHex.join('')
}

</script>

<template>
  <div>
    <button @click="handleDetectCard('FeliCa')">get UID card FeliCa</button>
    <p v-if="idm.length">UID: {{ idm }}</p>
    <p v-else>no data</p>
  </div>
</template>
<style>

button {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
}

p {
  margin-top: 20px;
}

</style>