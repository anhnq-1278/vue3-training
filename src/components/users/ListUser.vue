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
      <vue-awesome-paginate
        :total-items="metaData?.totalItem || 10"
        v-model="currentPage"
        :items-per-page="10"
        :max-pages-shown="5"
        :show-breakpoint-buttons="false"
        :on-click="getListUser"
      >
        <template #prev-button>
          <span> Previous </span>
        </template>
        <template #next-button>
          <span> Next </span>
        </template>
      </vue-awesome-paginate>
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

const userStore = useUserStore()
const { listUser, metaData, userDetail } = storeToRefs(userStore)

const page = ref<number>(1)
const limit = ref<number>(10)
const isLoading = ref<boolean>(false)
const currentPage = ref<number>(1)
const openUserDetail = ref<boolean>(false)

onMounted(async () => {
  try {
    isLoading.value = true
    await userStore.getUsers(page.value, limit.value)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})

const getListUser = async (page: number) => {
  await userStore.getUsers(page, limit.value)
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
<style>
.pagination .pagination-container {
  column-gap: 10px;
}
.pagination .paginate-buttons {
  width: 50px;
  height: 40px;
  cursor: pointer;
  background-color: #1abc9c;
  border: none;
  color: white;
  border-radius: 2px;
}
.pagination .back-button,
.pagination .next-button {
  width: 100px;
  height: 40px;
}
.pagination .paginate-buttons:hover,
.pagination .active-page:hover {
  background-color: #1abc9c;
}
.pagination .active-page {
  background-color: #d35400;
}
.pagination .back-button:active,
.pagination .next-button:active {
  background-color: #1abc9c;
}
</style>
