<template>
  <div v-if="!isPerLoading" class="px-[10%] h-[500px] w-full mt-[50px] pt-11">
    <h3 class="mb-4 text-[40px] font-bold leading-8">User Detail</h3>
    <div class="text-base mb-6">This is user detail page</div>
    <div class="flex gap-x-10 border p-3">
      <Avatar :img="userData.avatar" size="144px" />
      <div class="flex flex-col gap-y-4">
        <h4 class="text-base text-[#6b7280] font-normal">
          Name : <span class="text-base text-[#111827] font-medium"> {{ userData.name }}</span>
        </h4>
        <h4 class="text-base text-[#6b7280] font-normal">
          Birthday :
          <span class="text-base text-[#111827] font-medium"> {{ userData.birthday }}</span>
        </h4>
        <h4 class="text-base text-[#6b7280] font-normal">
          Address :
          <span class="text-base text-[#111827] font-medium"> {{ userData.address }}</span>
        </h4>
        <h4 class="text-base text-[#6b7280] font-normal">
          Contact number :
          <span class="text-base text-[#111827] font-medium"> {{ userData.phone }}</span>
        </h4>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import UserStore from '@/store/User'
import CommonStore from '@/store/Common'
import { formatIsoDate } from '@/utils'
import Avatar from '@/components/common/Avatar/Avatar.vue'
import { useRoute } from 'vue-router'

const { getUserDetail } = UserStore()
const { setLoading } = CommonStore()
const isPerLoading = ref<boolean>(true)
const route = useRoute()

interface TUser {
  name: string
  address?: string
  phone?: string
  birthday?: string
  avatar?: any
}

const userData = ref<TUser>({
  name: '',
  address: '',
  birthday: '',
  phone: '',
  avatar: ''
})

async function getDataUserDetail() {
  setLoading(true)
  try {
    const { id } = route.params
    const { data } = await getUserDetail(id?.toString())
    const { name = '', address = '', phone = '', birthday = '', avatar = '' } = data
    userData.value = {
      name,
      address,
      phone,
      avatar,
      birthday: formatIsoDate(birthday)
    }
  } finally {
    setLoading(false)
  }
}

onBeforeMount(() => {
  try {
    isPerLoading.value = true
    getDataUserDetail()
  } finally {
    isPerLoading.value = false
  }
})
</script>
<style lang="scss" scoped></style>
