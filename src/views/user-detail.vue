<template>
  <DetailPage :user="user" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import listStore from '@/store/listUsers'
import commonStore from '@/store/common'
import DetailPage from '@/components/detail-page.vue'
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import type { TResAccount } from '@/type/Common'

const store = listStore()
const { setLoading } = commonStore()
const route = useRoute()
const user = ref<TResAccount>({} as TResAccount)

onBeforeMount(() => {
  getDetailUser()
})

async function getDetailUser() {
  try {
    setLoading(true)
    const { id } = route.params

    const data = await store.getDetailUser(id as string)

    user.value = data.data
  } catch (error) {
    console.log('🚀 ~ file: user-detail.vue:64 ~ getDetailUser ~ error:', error)
  } finally {
    setLoading(false)
  }
}
</script>
