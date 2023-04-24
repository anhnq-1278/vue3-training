<template>
  <div v-if="isLoading" class="m-auto w-[80px] mt-36">
    <LoadingPage />
  </div>
  <div v-else class="w-full h-[550px] overflow-y-auto">
    <h2 class="font-semibold text-[30px] capitalize mb-4">list search user</h2>
    <table class="w-full">
      <thead>
        <tr class="text-left">
          <th :width="'90%'">Name</th>
          <th :width="'10%'">edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in listSearchUser" :key="user._id">
          <td>{{ user.name }}</td>
          <td>
            <IconTrash />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import IconTrash from '@/assets/icons/IconTrash.vue'
import LoadingPage from '@/components/loadingPage.vue'

const props = defineProps<{
  q: string
}>()
const userStore = useUserStore()
const { listSearchUser } = storeToRefs(userStore)

const isLoading = ref<boolean>(false)
onMounted(async () => {
  try {
    isLoading.value = true
    await userStore.searchUsers(props.q)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
  }
})
</script>
