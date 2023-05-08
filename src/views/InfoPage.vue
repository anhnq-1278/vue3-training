<template>
  <div v-if="isLoading" class="m-auto w-[80px] mt-96">
    <LoadingPage />
  </div>
  <BaseLayout v-else>
    <div
      class="flex m-auto w-[1200px] rounded-[30px] bg-white shadow-info mt-12 overflow-hidden min-h-[80vh]"
    >
      <div class="bg-[#1abc9c] p-7 text-center">
        <div class="h-[180px] w-[180px] cursor-pointer rounded-full overflow-hidden relative">
          <div
            v-if="isLoadImage"
            class="m-auto w-[80px] mt-8 absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <LoadingPage class="mt-4" />
          </div>
          <label for="uploadImage"
            ><img
              class="h-[170px] w-[170px] m-auto rounded-full border-0 border-sky-500 border-solid hover:border-4 cursor-pointer"
              :src="image"
              alt=""
          /></label>
          <input
            id="uploadImage"
            class="appearance-none h-0 w-0"
            ref="file"
            @change="handleFileUpload($event)"
            type="file"
          />
        </div>
        <h3 class="text-white mx-0 mt--[5px] mb-[7px] text-5xl capitalize mt-5 font-semibold">
          {{ account?.username }}
        </h3>
        <p class="text-white my-[5px] mx-0 font-normal text">web developer</p>
        <span class="text-white text-1xl">{{ account?.email }}</span>
        <button
          type="button"
          @click="openModalInfo = true"
          class="block border border-white py-2 px-6 rounded-full text-white mt-[150px] m-auto capitalize hover:bg-white hover:text-[#1abc9c] outline-none"
        >
          information
        </button>
        <button
          type="button"
          @click="openModalPassword = true"
          class="block border border-white py-2 px-6 rounded-full text-white mt-[10px] m-auto capitalize hover:bg-white hover:text-[#1abc9c] outline-none"
        >
          change password
        </button>
      </div>
      <UserComponent />
    </div>
    <Modal
      :is-open="openModalPassword"
      :title="'change password'"
      @close-modal="openModalPassword = false"
    >
      <ChangePassword />
    </Modal>
    <Modal
      :is-open="openModalInfo"
      :title="'infomation detail'"
      @close-modal="openModalInfo = false"
    >
      <Profile />
    </Modal>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseLayout from '@/layout/BaseLayout.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import { useAccountStore } from '@/store/account'
import { storeToRefs } from 'pinia'
import Profile from '@/components/account/Profile.vue'
import UserComponent from '@/components/users/UserComponent.vue'
import Modal from '@/components/Modal.vue'
import ChangePassword from '@/components/account/ChangePassword.vue'

const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
const isLoading = ref<boolean>(false)
const isLoadImage = ref<boolean>(false)
const openModalInfo = ref(false)
const openModalPassword = ref(false)

const file = ref<any>()
const image = computed(() => {
  if (account.value.avatar) {
    return account.value.avatar
  }

  return 'https://lmpixels.com/demo/breezycv/light/1/img/main_photo.jpg'
})

onMounted(async () => {
  try {
    isLoading.value = true
    await accountStore.getAccount()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})

const handleFileUpload = async ($event: Event) => {
  const target = $event.target as any
  if (!target && !target.files) return

  isLoadImage.value = true
  try {
    file.value = target && target.files[0]
    let formData: FormData = new FormData()
    formData.append('avatar', file.value)
    await accountStore.update(formData)
    await accountStore.getAccount()
  } catch (error) {
    console.log(error)
  } finally {
    isLoadImage.value = false
    file.value = null
  }
}
</script>
