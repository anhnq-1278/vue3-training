<template>
  <div v-if="isLoading" class="m-auto w-[80px] mt-96">
    <LoadingPage />
  </div>
  <BaseLayout v-else>
    <div
      class="flex m-auto w-[1200px] rounded-[30px] bg-white shadow-info mt-12 overflow-hidden min-h-[80vh]"
    >
      <div class="bg-[#1abc9c] p-7 text-center">
        <div class="rounded-full overflow-hidden h-[180px] w-[180px] m-auto">
          <img src="https://lmpixels.com/demo/breezycv/light/1/img/main_photo.jpg" alt="" />
        </div>
        <h3 class="text-white mx-0 mt--[5px] mb-[7px] text-5xl capitalize mt-5 font-semibold">
          {{ accountStore.account?.username }}
        </h3>
        <p class="text-white my-[5px] mx-0 font-light text">web developer</p>
        <span class="text-white text-1xl">{{ accountStore.account?.email }}</span>
        <button
          class="block border border-white py-2 px-6 rounded-full text-white mt-[150px] m-auto capitalize hover:bg-white hover:text-[#1abc9c]"
        >
          information
        </button>
      </div>
      <div></div>
    </div>
  </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/layout/BaseLayout.vue'
import LoadingPage from '@/components/loadingPage.vue'
import { useAccountStore } from '@/store/account'
import { onMounted, ref } from 'vue'

const accountStore = useAccountStore()
const isLoading = ref<boolean>(false)

onMounted(async () => {
  try {
    isLoading.value = true
    await accountStore.getAccount()
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
  }
})
</script>
