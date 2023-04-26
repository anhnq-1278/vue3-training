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
          {{ account?.username }}
        </h3>
        <p class="text-white my-[5px] mx-0 font-normal text">web developer</p>
        <span class="text-white text-1xl">{{ account?.email }}</span>
        <button
          class="block border border-white py-2 px-6 rounded-full text-white mt-[150px] m-auto capitalize hover:bg-white hover:text-[#1abc9c]"
        >
          information
        </button>
      </div>
      <div class="p-10 flex-1 relative">
        <div
          class="w-[400px] flex justify-between items-center h-[50px] border border-gray border-solid px-5 rounded-full mb-5"
        >
          <input
            type="text"
            class="bg border border-transparent border-solid w-full outline-none"
            placeholder="Search ...."
            v-model="query"
            @input="debounceSearch"
          />
          <IconSearch />
          <ul
            class="w-[400px] absolute top-[95px] left-[40px] h-[300px] bg-white shadow-todo overflow-y-auto"
            :class="[isSearch ? 'block' : 'hidden']"
          >
            <li
              v-for="user in listSearchUser"
              :key="user._id"
              class="p-4 hover:bg-[#1abc9c] cursor-pointer"
              @click="showDetailUser"
            >
              {{ user.name }}
            </li>
          </ul>
        </div>
        <ListUser />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseLayout from '@/layout/BaseLayout.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import { useAccountStore } from '@/store/account'
import IconSearch from '@/assets/icons/IconSearch.vue'
import IconTrash from '@/assets/icons/IconTrash.vue'
import ListUser from '@/components/users/ListUser.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { debounce } from '@/utils/debounce'

const accountStore = useAccountStore()
const userStore = useUserStore()
const { listSearchUser } = storeToRefs(userStore)
const { account } = storeToRefs(accountStore)
const isLoading = ref<boolean>(false)
const query = ref<string>('')
const isSearch = ref<boolean>(false)

onMounted(async () => {
  try {
    isLoading.value = true
    await accountStore.getAccount()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})

const showDetailUser = () => {
  query.value = ''
  isSearch.value = false
}

const debounceSearch = () => {
  debounce(async () => {
    if (query.value) {
      await userStore.searchUsers(query.value)
      isSearch.value = true
    } else {
      isSearch.value = false
    }
  })
}
</script>
