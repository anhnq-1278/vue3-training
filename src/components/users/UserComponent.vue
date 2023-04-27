<template>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import IconSearch from '@/assets/icons/IconSearch.vue'
import ListUser from '@/components/users/ListUser.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { debounce } from '@/utils/debounce'

const userStore = useUserStore()
const { listSearchUser } = storeToRefs(userStore)
const query = ref<string>('')
const isSearch = computed(() => {
  return !!query.value
})

const showDetailUser = () => {
  query.value = ''
}

const debounceSearch = () => {
  debounce(async () => {
    if (query.value) {
      await userStore.searchUsers(query.value)
    }
  })
}
</script>
