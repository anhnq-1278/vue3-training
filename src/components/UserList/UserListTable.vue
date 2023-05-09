<template>
  <div>
    <div class="flex border-t border-b items-center font-extrabold text-black text-base bg-grey-f8">
      <div class="flex items-center h-[32px] w-[180px] px-2">Username</div>
      <div class="flex items-center h-[32px] w-[200px] px-2">Name</div>
      <div class="flex items-center h-[32px] flex-1 px-2">Email</div>
      <div class="flex items-center h-[32px] w-[200px] px-2">Active Status</div>
      <div class="flex items-center h-[32px] w-[200px] px-2">Created Date</div>
      <div class="flex items-center h-[32px] w-[180px] px-2">Action</div>
    </div>
    <div
      v-for="user in userList"
      :key="user._id"
      class="flex border-b items-center font-bold text-base cursor-pointer"
      @click="getUserDetail(user._id)"
    >
      <div class="px-2 flex items-center h-[50px] w-[180px] truncate">{{ user.username }}</div>
      <div class="px-2 flex items-center h-[50px] w-[200px] truncate">
        {{ user.name ? user.name : '-' }}
      </div>
      <div class="px-2 flex items-center h-[50px] flex-1 truncate">{{ user.email }}</div>
      <div class="px-2 flex items-center h-[50px] w-[200px]">
        <span class="rounded-[5px] bg-green-300 px-3">
          {{ user.isActive ? 'active' : 'inactive' }}
        </span>
      </div>
      <div class="px-2 flex items-center h-[50px] w-[200px]">
        {{ formatIsoDate(user.createdAt) }}
      </div>
      <div class="px-2 flex items-center h-[50px] w-[180px]"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TUser } from '@/model/User'
import { formatIsoDate } from '@/utils/'
import { useRouter } from 'vue-router'
import { RouterName } from '@/router/constant'

const router = useRouter()

defineProps({
  userList: {
    type: Array<TUser>,
    default: () => []
  }
})

function getUserDetail(id: string) {
  const routerData = router.resolve({ name: RouterName.UserDetail, params: { id } })
  window.open(routerData.href, '_blank')
}
</script>
<style lang="scss" scoped></style>
