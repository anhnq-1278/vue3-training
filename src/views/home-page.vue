<script setup lang="ts">
import { onMounted, ref } from 'vue';
// @ts-ignore
import  { NFCPortLib } from '@/sdk/NFCPortLib.js';

const cardInfo = ref<any>({})

const lib = new NFCPortLib()

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
    console.log(data)
    cardInfo.value = data
  } catch(error) {
    console.log(error)
  }
}

</script>

<template>
  <div>
    <button @click="handleDetectCard()">detect card non params</button>
    <button @click="handleDetectCard('FeliCa')">detect card FeliCa protocol</button>
    <button @click="handleDetectCard('iso18092')">detect card iso18092 protocol</button>
    <table v-if="Object.keys(cardInfo).length">
      <tr>
        <td>uid</td>
        <td>idm</td>
        <td>pmm</td>
        <td>pupi</td>
        <td>systemCode</td>
        <td>baudRate</td>
      </tr>
      <tr>
        <td>{{ cardInfo.uid }}</td>
        <td>{{ cardInfo.idm }}</td>
        <td>{{ cardInfo.pmm }}</td>
        <td>{{ cardInfo.pupi }}</td>
        <td>{{ cardInfo.systemCode }}</td>
        <td>{{ cardInfo.baudRate }}</td>
      </tr>
    </table>
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
table {
  margin-top: 20px;
  table-layout: fixed;
  width: 100%;
}

table, th, td {
  border: 1px solid #ccc;
}

</style>