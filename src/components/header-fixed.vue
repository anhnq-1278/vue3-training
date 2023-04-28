<template>
  <div
    class="px-8 h-[60px] bg-white fixed z-[50] w-full flex items-center shadow-[0_1px_8px_rgba(102,102,102,0.2)]"
  >
    <div class="flex justify-between items-center w-full">
      <h1
        class="text-[40px] leading-[60px] text-pink-8 font-extralight text-center cursor-pointer"
        @click="handleClickLogo"
      >
        todos app
      </h1>
      <div>
        <search-input @change-search="($event) => emit('change-search', $event)" />
        <div
          v-if="dataSearch.length"
          class="search-list absolute top-[50px] w-[600px] max-h-[225px] overflow-y-auto shadow-lg"
        >
          <div
            v-for="item in dataSearch"
            :key="item._id"
            class="bg-white w-full px-4 h-[45px] flex items-center hover:bg-pink-f6 duration-200 cursor-pointer"
            @click="handleRedirectDetailUser(item._id)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>

      <Menu>
        <MenuButton class="focus-visible:outline-none">Hello, {{ myAccount.username }}</MenuButton>
        <MenuItems class="absolute bg-white right-[-15px] top-[60px] shadow-lg flex flex-col">
          <MenuItem>
            <div
              class="px-10 py-2 cursor-pointer hover:bg-pink-f5 duration-200"
              @click="emit('list-users')"
            >
              List Users
            </div>
          </MenuItem>
          <MenuItem>
            <div
              class="px-10 py-2 cursor-pointer hover:bg-pink-f5 duration-200"
              @click="emit('setting')"
            >
              Setting
            </div>
          </MenuItem>
          <MenuItem>
            <div
              class="px-10 py-2 cursor-pointer hover:bg-pink-f5 duration-200"
              @click="emit('logout')"
            >
              Logout
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import { storeToRefs } from 'pinia'
import CommonStore from '@/store/Common'
import { useRouter } from 'vue-router'
import { RouteName } from '@/constants'
import searchInput from '@/components/search-input.vue'
import type { TResponseSearchUser } from '@/model/Account'

const { myAccount } = storeToRefs(CommonStore())
const router = useRouter()

defineProps({
  dataSearch: {
    type: Array<TResponseSearchUser>,
    default: () => []
  }
})

const emit = defineEmits<{
  (e: 'logout'): void
  (e: 'setting'): void
  (e: 'list-users'): void
  (e: 'change-search', value: string): void
}>()

const handleClickLogo = () => {
  router.push({ name: RouteName.HOME })
}

const handleRedirectDetailUser = (id: string) => {
  router.push({ name: RouteName.DETAIL_USER, params: { id } })

  emit('change-search', '')
}
</script>
