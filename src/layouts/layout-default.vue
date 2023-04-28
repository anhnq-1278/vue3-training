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
      <div class="w-3/5 search-container">
        <ListSearch />
      </div>
      <div>
        <div class="flex justify-end">
          <div class="flex items-center gap-4">
            <p>hi {{ myAccount.username }}</p>
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <img
                    v-if="myAccount.avatar"
                    :src="myAccount.avatar"
                    alt="avt"
                    class="h-[24px] w-[24px] rounded-[50%] cursor-pointer"
                  />
                  <div v-else class="h-[24px] w-[24px] rounded-[50%] cursor-pointer bg-[#b8c3d4]" />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                      <div
                        @click="goTo('/profile')"
                        :class="[
                          active ? 'bg-violet-500 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer'
                        ]"
                      >
                        My Account
                      </div>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <div
                        @click="goTo('/change-password')"
                        :class="[
                          active ? 'bg-violet-500 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer'
                        ]"
                      >
                        Change Password
                      </div>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <div
                        @click="goTo('/list-users')"
                        :class="[
                          active ? 'bg-violet-500 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer'
                        ]"
                      >
                        List Users
                      </div>
                    </MenuItem>
                  </div>
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                      <div
                        :class="[
                          active ? 'bg-violet-500 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer'
                        ]"
                        @click="handleLogout"
                      >
                        Logout
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
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
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import ListSearch from '@/components/common/list-search.vue'

const router = useRouter()
const store = commonStore()
const { myAccount } = storeToRefs(store)

onBeforeMount(() => {
  getMyAccount()
})

function goTo(path: string) {
  router.push({ path })
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

<style scoped lang="scss">
.search-container {
  :deep() {
    label {
      color: #666;
    }

    input {
      background: #ddd;
    }
  }
}
</style>
