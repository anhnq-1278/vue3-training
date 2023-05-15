<template>
  <div v-if="!isPerLoading" class="mt-[50px] pt-11 px-[10%] w-full">
    <h3 class="mb-4 text-[40px] font-bold leading-8">User List</h3>
    <div class="text-base font-light mb-10">
      Follow the list of users, you can search for users by name
    </div>
    <div class="relative w-[50%] mb-10 border rounded">
      <SearchUser :userSearchList="userSearchList" @searchUser="handleSearchUser" />
    </div>
    <div class="flex items-center justify-between mb-4">
      <span class="font-semibold">User Total: {{ metaData.totalItem }}</span>
      <div class="flex items-center justify-end">
        <LimitSelect
          :options="LIMIT_OPTIONS"
          :selectedValue="params.limit"
          @change-limit="handleChangeLimit"
        />
      </div>
    </div>
    <UserListTable :userList="userList" />
    <!-- <Pagination
      class="mt-1 flex items-center justify-center"
      v-model="params.page"
      :total-items="metaData.totalItem"
      :per-page="metaData.limit"
      :slice-length="4"
      previous-label="<<<"
      next-label=">>>"
    /> -->
    <div class="flex items-center justify-center mt-2">
      <PaginationVer2
        :total-items="metaData.totalItem"
        :items-per-page="metaData.limit"
        :max-pages-shown="5"
        v-model="params.page"
      />
    </div>
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
import PaginationVer2 from '@/components/common/PaginationV2/Pagination.vue'
import { LIMIT_OPTIONS } from '@/constants'
import type { TMeta, TSearchUser, TSearchUserParams } from '@/model/User'
import type { TUser, TUserListParams } from '@/model/User'
import UserStore from '@/store/User'
import CommonStore from '@/store/Common'
import { debounce } from 'lodash'

const isPerLoading = ref(false)

const params = reactive<TUserListParams>({
  page: 1,
  limit: LIMIT_OPTIONS[0].value
})

const userList = ref<TUser[]>([] as TUser[])
const metaData = ref<TMeta>({} as TMeta)

const { getUserList, getSearchUser } = UserStore()
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

const handleSearchUser = debounce(async function (q: string) {
  const param: TSearchUserParams = {
    q
  }

  try {
    setLoading(true)
    const { data } = await getSearchUser(param)
    userSearchList.value = data
  } finally {
    setLoading(false)
  }
}, 300)

watch(userListParams, () => {
  getUsers()
})

onBeforeMount(async () => {
  try {
    isPerLoading.value = true
    await getUsers()
  } finally {
    isPerLoading.value = false
  }
})

const userSearchList = ref<TSearchUser[]>([])
</script>
<style lang="scss" scoped>
:deep() {
  .pagination-container {
    display: flex;
    justify-items: center;
    align-items: center;
    margin-bottom: 10px;
    border: 1px solid #e5e7eb;

    .back-button {
      width: 44px;
      border-top-left-radius: 1px;
      border-bottom-left-radius: 1px;
    }

    .next-button {
      width: 44px;
      border-top-right-radius: 1px;
      border-bottom-right-radius: 1px;
      border-right-width: 0.5px;
    }
  }

  .paginate {
    &-buttons {
      height: 33px;
      width: 33px;
      padding: 6px 12px;
      cursor: pointer;
      background-color: #ffffff;
      color: #6b7280;
      border-right: 0.5px solid #e5e7eb;
      border-left: 0.5px solid #e5e7eb;
    }

    &:hover {
      background-color: #d8d8d8;
    }
  }

  .active-page {
    background-color: #e1effe;
    border: 1px solid #3498db;
    color: #1c64f2;
  }
}
</style>
