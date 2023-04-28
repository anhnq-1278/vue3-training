<template>
  <div v-if="!isLoading" class="max-w-[80%] mx-auto">
    <div class="pt-20">
      <h1 class="text-6xl text-pink-8 font-extralight">Detail User</h1>
      <div class="mt-8 flex gap-8 p-7 bg-white rounded-xl shadow-lg">
        <div>
          <img
            :src="
              dataUser.avatar ||
              'https://i.pinimg.com/564x/7c/d4/a1/7cd4a1b2ba0d1eb12b19bcfb47e0f20b.jpg'
            "
            alt="user_avatar"
            class="w-[200px] h-[200px]"
          />
        </div>
        <div class="flex flex-1 flex-col gap-3 text-xl">
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Email:</span>
            <span>{{ dataUser.email }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Username:</span>
            <span>{{ dataUser.username }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Full name:</span>
            <span>{{ dataUser.name }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Address:</span>
            <span>{{ dataUser.address }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Birthday:</span>
            <span>{{ formatDate(new Date(dataUser.birthday || '')) }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Phone number:</span>
            <span>{{ dataUser.phone }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import Account from '@/store/Account'
import Common from '@/store/Common'
import type { TDataUser } from '@/model/Account'
import { formatDate } from '@/utils'

const route = useRoute()
const AccountStore = Account()
const CommonStore = Common()

const isLoading = ref(false)
const dataUser = ref<TDataUser>({} as TDataUser)

onBeforeMount(() => {
  try {
    isLoading.value = true

    const id = route.params.id.toString()
    getDetailUser(id)
  } finally {
    isLoading.value = false
  }
})

onBeforeRouteUpdate((to) => {
  const id = to.params.id.toString()

  getDetailUser(id)
})

const getDetailUser = async (id: string) => {
  try {
    CommonStore.setLoading(true)

    const { data } = await AccountStore.getDetailUser(id)
    dataUser.value = data
  } finally {
    CommonStore.setLoading(false)
  }
}
</script>
