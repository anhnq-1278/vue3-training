<template>
  <div v-if="!isLoading">
    <div class="container mx-auto pb-[30px]">
      <h1 class="text-[80px] text-pink-8 font-thin">List users</h1>

      <table-user :data-users="dataUser" :data-meta="meta" @change-page="handleChangePage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive, watch } from 'vue'
import Account from '@/store/Account'
import Common from '@/store/Common'
import tableUser from '@/components/table-user.vue'
import type { TDataUser, TMeta } from '@/model/Account'

const AccountStore = Account()
const CommonStore = Common()

const isLoading = ref(false)
const dataUser = ref<TDataUser[]>([] as TDataUser[])

const params = reactive({
  page: 1,
  limit: 10
})

const meta = ref<TMeta>({} as TMeta)

onBeforeMount(() => {
  try {
    isLoading.value = true

    getListUsers()
  } finally {
    isLoading.value = false
  }
})

const getListUsers = async () => {
  try {
    CommonStore.setLoading(true)

    const data = await AccountStore.getListUsers(params)

    dataUser.value = data.data
    meta.value = data.meta
  } finally {
    CommonStore.setLoading(false)
  }
}

const handleChangePage = (event: any) => {
  params.page = event
}

watch(params, () => {
  getListUsers()
})
</script>
