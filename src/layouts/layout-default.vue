<template>
  <div>
    <div
      class="px-4 z-30 flex items-center justify-between fixed w-full bg-white shadow-[0_1px_8px_rgba(102,102,102,0.2)]"
    >
      <router-link
        to="/"
        class="text-[40px] leading-[60px] text-pink-8 text-[rgba(175,47,47,0.15)] text-center cursor-pointer"
      >
        todos app
      </router-link>
      <div class="">
        <div class="flex justify-end">
          <div class="flex items-center gap-4">
            <p>hi {{ myAccount.username }}</p>
            <div class="relative">
              <img
                v-if="myAccount.avatar"
                :src="myAccount.avatar"
                v-click-outside="closeDropdown"
                alt="avt"
                class="h-[24px] w-[24px] rounded-[50%] cursor-pointer"
                @click="openDropdown = !openDropdown"
              />
              <div
                v-else
                v-click-outside="closeDropdown"
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
                      <router-link to="/profile"> Account </router-link>
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
      </div>
    </div>
    <div class="pt-[60px]">
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
const openDropdown = ref(false)

onBeforeMount(() => {
  getMyAccount()
})

function closeDropdown() {
  openDropdown.value = false
}

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

function handleLogout() {
  localStorage.removeItem('access_token')

  router.push({ path: '/login' })
}
</script>

<style scoped></style>
