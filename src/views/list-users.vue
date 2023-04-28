<template>
  <div class="rounded p-10">
    <div class="w-full rounded">
      <table class="border-collapse w-full border border-slate-400 bg-white text-sm shadow-sm">
        <thead class="bg-slate-50">
          <tr>
            <th
              v-for="col in columns"
              :key="col"
              class="w-1/5 border font-semibold p-4 text-slate-900 text-left"
            >
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in listUsers" :key="i">
            <td class="border p-2.5 text-slate-500">
              <img
                :src="
                  user.avatar ||
                  'http://res.cloudinary.com/db54xeaer/image/upload/v1679297925/ujagfxv9w4lt47evy2gi.jpg'
                "
                alt="avatar"
                class="w-[50px] h-[50px] rounded-full"
              />
            </td>
            <td class="border p-2.5 text-slate-500">
              {{ user.name }}
            </td>
            <td class="border p-2.5 text-slate-500">
              {{ user.email }}
            </td>
            <td class="border p-2.5 text-slate-500">
              {{ user.phone }}
            </td>
            <td class="border p-2.5 text-slate-500">
              {{ user.address }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination class="mt-5" :meta="meta" @change-page="handleChangePage" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import userStore from '@/store/listUsers'
import useCommonStore from '@/store/common'
import pagination from '@/components/common/pagination-page.vue'
import type { TDataUser, TMeta, TParams } from '@/type/ListUsers'

const store = userStore()
const commonStore = useCommonStore()
const meta = ref<TMeta>({} as TMeta)
const listUsers = ref<TDataUser[]>([])
const params = ref<TParams>({} as TParams)

const columns = ['Avatar', 'Name', 'Email', 'Phone Number', 'Address']

onBeforeMount(() => {
  getListUsers()
})

async function getListUsers(params?: TParams) {
  try {
    commonStore.setLoading(true)
    const { data } = await store.getListUsers(params)

    meta.value = data.meta
    listUsers.value = data.data
  } catch (error) {
    console.log('🚀 ~ file: list-users.vue:19 ~ getListUsers ~ error:', error)
  } finally {
    commonStore.setLoading(false)
  }
}

function handleChangePage(page: number) {
  params.value.page = page
}

watch(params.value, () => {
  getListUsers(params.value)
})
</script>

<style scoped></style>
