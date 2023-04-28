<template>
  <div v-if="!isPerLoading" class="mt-[50px] pt-11 px-[10%] w-full">
    <h3 class="mb-4 text-[40px] font-bold leading-8">User List</h3>
    <div class="text-base font-light mb-10">
      Follow the list of users, you can search for users by name
    </div>
    <div class="relative w-[50%] mb-10 border rounded">
      <SearchUser :userSearchList="userSearchList" />
    </div>
    <div class="flex items-center justify-between mb-4">
      <span class="font-semibold">User Total: {{metaData.totalItem}}</span>
    <div class="flex items-center justify-end">
      <LimitSelect
        :options="LIMIT_OPTIONS"
        :selectedValue="params.limit"
        @change-limit="handleChangeLimit"
      />
    </div>
    </div>
    <UserListTable :userList="userList" />
    <Pagination
      class="mt-1 flex items-center justify-center"
      v-model="params.page"
      :total-items="metaData.totalItem"
      :per-page="metaData.limit"
      :slice-length="4"
      previous-label="<<<"
      next-label=">>>"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, reactive, onBeforeMount, watch } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'

import LimitSelect from '@/components/UserList/LimitSelect.vue'
import SearchUser from '@/components/UserList/SearchUser.vue'
import UserListTable from '@/components/UserList/UserListTable.vue'
import Pagination from '@/components/common/Pagination/Pagination.vue'
import { LIMIT_OPTIONS } from '@/constants'
import type { TMeta, TSearchUser } from '@/model/User'
import type { TUser, TUserListParams } from '@/model/User'
import UserStore from '@/store/User'
import CommonStore from '@/store/Common'

const isPerLoading = ref(false)

const params = reactive<TUserListParams>({
  page: 1,
  limit: LIMIT_OPTIONS[0].value
})

const userList = ref<TUser[]>([] as TUser[])
const metaData = ref<TMeta>({} as TMeta)

const { getUserList } = UserStore()
const { setLoading } = CommonStore()

const userListParams = computed(() => {
  return {
    page: params.page,
    limit: params.limit
  }
})

function handleChangeLimit(limit: number) {
  params.limit = limit
}

async function getUsers() {
  try {
    setLoading(true)
    const data = await getUserList(userListParams.value)

    metaData.value = data.meta
    userList.value = data.data
  } finally {
    setLoading(false)
  }
}

watch(userListParams, () => {
  getUsers()
})

onBeforeMount(async () => {
  isPerLoading.value = true
  await getUsers()
  isPerLoading.value = false
})

const userSearchList = [
  {
    _id: '1',
    username: 'user1'
  },
  {
    _id: '2',
    username: 'user2'
  }
]
</script>
<style lang="scss" scoped></style>
