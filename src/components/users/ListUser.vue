<template>
  <div v-if="isLoading" class="m-auto w-[80px] mt-36">
    <LoadingPage />
  </div>
  <div v-else class="w-full h-[550px] overflow-y-auto">
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
        <UserItem v-for="user in listUser" :key="user._id" :user="user" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserItem from './UserItem.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import { useUserStore } from '@/store/user'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { listUser } = storeToRefs(userStore)

const page = ref<number>(1)
const limit = ref<number>(10)
const isLoading = ref<boolean>(false)
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
</script>
