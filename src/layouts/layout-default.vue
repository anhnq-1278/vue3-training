<template>
  <div class="flex">
    <div class="border-l w-[350px] pt-10">sidebar</div>
    <div class="p-10 bg-[#f7faff] min-h-screen w-full">
      <div class="flex justify-end">
        <div class="flex items-center gap-4">
          <p>hi {{ myAccount.username }}</p>
          <div class="relative">
            <img
              v-if="myAccount.avatar"
              :src="myAccount.avatar"
              alt="avt"
              class="h-[24px] w-[24px] rounded-[50%] cursor-pointer"
              @click="openDropdown = !openDropdown"
            />
            <div
              v-else
              class="h-[24px] w-[24px] rounded-[50%] cursor-pointer bg-[#b8c3d4]"
              @click="openDropdown = !openDropdown"
            />

            <div
              :class="[
                'dropdown z-10 absolute bg-white right-0 border rounded mt-3 min-w-[150px] text-[#212529]',
                `${openDropdown ? 'block' : 'hidden'}`
              ]"
            >
              <div>
                <div class="flex flex-col gap-2 py-4">
                  <div class="cursor-pointer px-4 py-1 hover:bg-[#5a8dee] hover:text-white">
                    <router-link to="/#"> Account </router-link>
                  </div>
                  <div class="cursor-pointer px-4 py-1 hover:bg-[#5a8dee] hover:text-white">
                    <router-link to="/change-password"> Change PW </router-link>
                  </div>
                </div>
                <div
                  class="cursor-pointer px-4 py-2 hover:bg-[#5a8dee] hover:text-white border-t"
                  @click="handleLogout"
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import commonStore from '@/store/common'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = commonStore()
const { myAccount } = storeToRefs(store)

onBeforeMount(() => {
  getMyAccount()
})

async function getMyAccount() {
  try {
    store.setLoading(true)

    await store.getMyAccount()
  } catch (error) {
    console.log(error)
  } finally {
    store.setLoading(false)
  }
}

const openDropdown = ref(false)

function handleLogout() {
  localStorage.removeItem('access_token')

  router.push({ path: '/login' })
}
</script>

<style scoped></style>
