<template>
  <div class="w-full relative" v-click-outside="hideList">
    <span class="p-input-icon-left w-full">
      <i class="pi pi-search" />
      <InputText name="search" class="mt-0" placeholder="Search" @input="handleSearch" />
    </span>
    <div
      v-if="isLoading && isDisplay"
      class="absolute top-[50px] w-full h-20 bg-white border flex-1 z-10"
    >
      <div class="flex justify-center items-center">
        <img :src="Loading" alt="loading" class="w-20" />
      </div>
    </div>
    <div
      v-if="listUser.length && !isLoading && isDisplay"
      class="absolute w-full top-[50px] bg-[#f4fafe] border flex-1 z-10"
    >
      <div
        v-for="(item, i) in listUser"
        :key="i"
        class="cursor-pointer p-2.5 hover:bg-[#e8f3ff]"
        @click="openDetail(item._id)"
      >
        {{ item.name }}
      </div>
    </div>
    <div
      v-if="searchValue && !isLoading && isDisplay && !listUser.length"
      class="absolute w-full top-[50px] border flex-1 z-10 p-2.5 bg-[#f4fafe]"
    >
      List Empty
    </div>
  </div>
</template>

<script setup lang="ts">
import listStore from '@/store/listUsers'
import InputText from '@/components/common/text-input.vue'
import Loading from '@/assets/images/loading.gif'
import { ref } from 'vue'
import type { TDataUser } from '@/type/ListUsers'
import { useRouter } from 'vue-router'

const store = listStore()
const router = useRouter()

const searchValue = ref<string>('')
const isLoading = ref(false)
const listUser = ref<TDataUser[]>([])
const isDisplay = ref(true)

function hideList() {
  isDisplay.value = false
}

const debounce = (fn: Function, delay: number) => {
  let timeout: any

  return (...args: any) => {
    isLoading.value = true

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const getUser = async () => {
  try {
    const res = await store.getListSearch({ q: searchValue.value })

    listUser.value = res.data.data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = debounce((e: Event) => {
  isDisplay.value = true
  listUser.value = []
  searchValue.value = (e.target as HTMLInputElement).value

  if (!searchValue.value) {
    isLoading.value = false

    return
  }

  getUser()
}, 500)

function openDetail(id: string) {
  isDisplay.value = false
  router.push({ name: 'user-detail', params: { id } })
}
</script>

<style scoped></style>
