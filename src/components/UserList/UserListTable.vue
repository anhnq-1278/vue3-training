<template>
  <div>
    <div class="flex border-t border-b items-center font-extrabold text-black text-base bg-grey-f8">
      <div class="flex items-center h-[32px] w-[180px] px-2">
        <Checkbox :isChecked="isChecked('all', '')" @click="handleChecked('all', '')" />
      </div>
      <div class="flex items-center h-[32px] w-[180px] px-2">Username</div>
      <div class="flex items-center h-[32px] w-[200px] px-2">Name</div>
      <div class="flex items-center h-[32px] flex-1 px-2">Email</div>
      <div class="flex items-center justify-center h-[32px] w-[200px] px-2">ステータス</div>
      <div class="flex items-center h-[32px] w-[200px] px-2">Created Date</div>
      <div class="flex items-center h-[32px] w-[180px] px-2">Action</div>
    </div>
    <div
      v-for="user in userList"
      :key="user._id"
      class="flex border-b items-center font-bold text-base cursor-pointer"
      @click="getUserDetail(user._id)"
    >
      <div class="px-2 flex items-center h-[50px] w-[180px] truncate">
        <Checkbox
          :isChecked="isChecked('single', user._id)"
          @click.stop="handleChecked('single', user._id)"
        />
      </div>
      <div class="px-2 flex items-center h-[50px] w-[180px] truncate">{{ user.username }}</div>
      <div class="px-2 flex items-center h-[50px] w-[200px]">
        <ToolTip fitContent>
          <div class="truncate-2-line">
            {{ user.name ? user.name : '-' }}
          </div>
          <template #description>
            <div class="break-words">
              {{ user.name ? user.name : '-' }}
            </div>
          </template>
        </ToolTip>
      </div>
      <div class="px-2 flex items-center h-[50px] flex-1 truncate">{{ user.email }}</div>
      <div class="px-2 flex items-center justify-center h-[50px] w-[200px]">
        <Tag :status="+20" />
      </div>
      <div class="px-2 flex items-center h-[50px] w-[200px]">
        {{ formatIsoDate(user.createdAt) }}
      </div>
      <div class="px-2 flex items-center h-[50px] w-[180px]"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { TUser } from '@/model/User'
import { formatIsoDate } from '@/utils/'
import { useRouter } from 'vue-router'
import { RouterName } from '@/router/constant'
import ToolTip from '@/components/common/Tooltip/Tooltip.vue'
import Tag from '@/components/common/Tag/Tag.vue'
import Checkbox from '@/components/common/Checkbox/Checkbox.vue'

const router = useRouter()

const props = defineProps({
  userList: {
    type: Array<TUser>,
    default: () => []
  }
})

const listCheckedIds = ref<string[]>([])
const userIds = computed(() => {
  return props.userList.map(({ _id }) => _id)
})

function isChecked(type: string, _id: string) {
  if (listCheckedIds.value.length === 0) return false

  if (type === 'all') {
    return userIds.value.length === listCheckedIds.value.length
  }

  return listCheckedIds.value.includes(_id)
}

function handleChecked(type: string, id: string) {
  if (type === 'all') {
    if (listCheckedIds.value.length === userIds.value.length) {
      listCheckedIds.value = []
    } else {
      listCheckedIds.value = userIds.value
    }
  }

  if (type === 'single') {
    if (listCheckedIds.value.includes(id)) {
      listCheckedIds.value = listCheckedIds.value.filter((_id) => _id !== id)
    } else {
      listCheckedIds.value.push(id)
    }
  }
}

function getUserDetail(id: string) {
  const routerData = router.resolve({ name: RouterName.UserDetail, params: { id } })
  window.open(routerData.href, '_blank')
}
</script>
<style lang="scss" scoped></style>
