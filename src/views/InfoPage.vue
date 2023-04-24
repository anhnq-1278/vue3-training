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
        <p class="text-white my-[5px] mx-0 font-normal text">web developer</p>
        <span class="text-white text-1xl">{{ accountStore.account?.email }}</span>
        <button
          class="block border border-white py-2 px-6 rounded-full text-white mt-[150px] m-auto capitalize hover:bg-white hover:text-[#1abc9c]"
        >
          information
        </button>
      </div>
      <div class="p-10 flex-1">
        <div
          class="w-[400px] flex justify-between items-center h-[50px] border border-gray border-solid px-5 rounded-full mb-5"
        >
          <input
            type="text"
            class="bg border border-transparent border-solid w-full outline-none"
            placeholder="Search ...."
            v-model.trim="query"
          />
          <IconSearch />
        </div>
        <ListSearchUser v-if="isSearch" :q="query" />
        <ListUser v-else :query="query" />
      </div>
    </div>
  </BaseLayout>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import BaseLayout from '@/layout/BaseLayout.vue'
import LoadingPage from '@/components/loadingPage.vue'
import { useAccountStore } from '@/store/account'
import IconSearch from '@/assets/icons/IconSearch.vue'
import IconTrash from '@/assets/icons/IconTrash.vue'
import ListUser from '@/components/users/ListUser.vue'
import ListSearchUser from '@/components/users/ListSearchUser.vue'

const accountStore = useAccountStore()
const isLoading = ref<boolean>(false)
const query = ref<string>('')
const isSearch = ref<boolean>(false)
const timeout = ref<any>()

onMounted(async () => {
  try {
    isLoading.value = true
    await accountStore.getAccount()
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
  }
})

watch(query, () => {
  const DELAY_TIME = query.value.trim() ? 1000 : 0
  clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    if (!query.value) {
      isSearch.value = false
    } else {
      isSearch.value = true
    }
  }, DELAY_TIME)
})
</script>
