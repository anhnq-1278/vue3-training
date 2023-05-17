<template>
  <div v-if="isLoading" class="m-auto w-[80px] mt-36">
    <LoadingPage />
  </div>
  <div v-else>
    <div class="w-full h-[550px] overflow-y-auto">
      <h2 class="font-semibold text-[30px] capitalize mb-4">list user</h2>
      <table class="w-full">
        <thead>
          <tr class="text-left">
            <th :width="'25%'">Name</th>
            <th :width="'50%'">address email</th>
            <th :width="'10%'">allow</th>
            <th :width="'15%'">edit</th>
          </tr>
        </thead>
        <tbody>
          <UserItem
            v-for="user in listUser"
            :key="user._id"
            :user="user"
            @show-detail-user="showDetailUser"
          />
        </tbody>
      </table>
    </div>
    <Modal :is-open="openUserDetail" :title="'detail user'" @close-modal="openUserDetail = false">
      <UserDetail :user="userDetail" />
    </Modal>
    <div class="pagination mt-10 m-auto w-[550px]">
      <PaginationCom
        :total-items="80"
        v-model="currentPage"
        :items-per-page="10"
        :max-pages-shown="5"
        @on-click="handlePaginate"
        :disable-pagination="isLoading"
      >
      </PaginationCom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserItem from './UserItem.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import { useUserStore } from '@/store/user'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import Modal from '@/components/Modal.vue'
import UserDetail from './UserDetail.vue'
import PaginationCom from '@/components/common/PaginationCom.vue'

const userStore = useUserStore()
const { listUser, metaData, userDetail } = storeToRefs(userStore)

const currentPage = ref<number>(1)
const limit = ref<number>(10)
const isLoading = ref<boolean>(false)
const openUserDetail = ref<boolean>(false)

onMounted(async () => {
  await getListUser()
})

const getListUser = async () => {
  try {
    isLoading.value = true
    await userStore.getUsers(currentPage.value, limit.value)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const handlePaginate = async (page: number) => {
  currentPage.value = page
  await getListUser()
}

const showDetailUser = async (id: string) => {
  try {
    await userStore.getUserDetail(id)
    openUserDetail.value = true
  } catch (error) {
    console.log(error)
    openUserDetail.value = false
  }
}
</script>
