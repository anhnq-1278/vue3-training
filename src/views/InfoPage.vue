<template>
  <div v-if="isLoading" class="m-auto w-[80px] mt-96">
    <LoadingPage />
  </div>
  <BaseLayout v-else>
    <div
      class="flex m-auto w-[1200px] rounded-[30px] bg-white shadow-info mt-12 overflow-hidden min-h-[80vh]"
    >
      <div class="bg-[#1abc9c] p-7 text-center">
        <div class="rounded-full overflow-hidden h-[180px] w-[180px] m-auto">
          <img src="https://lmpixels.com/demo/breezycv/light/1/img/main_photo.jpg" alt="" />
        </div>
        <h3 class="text-white mx-0 mt--[5px] mb-[7px] text-5xl capitalize mt-5 font-semibold">
          {{ account?.username }}
        </h3>
        <p class="text-white my-[5px] mx-0 font-normal text">web developer</p>
        <span class="text-white text-1xl">{{ account?.email }}</span>
        <button
          type="button"
          @click="openModal"
          class="block border border-white py-2 px-6 rounded-full text-white mt-[150px] m-auto capitalize hover:bg-white hover:text-[#1abc9c] outline-none"
        >
          information
        </button>
        <TransitionRoot appear :show="isOpen" as="template">
          <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div class="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel
                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
                    <DialogTitle
                      as="h3"
                      class="text-lg leading-6 text-gray-900 mb-4 capitalize font-semibold"
                    >
                      information detail
                    </DialogTitle>
                    <div class="mt-2">
                      <Profile />
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </div>
      <UserComponent />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseLayout from '@/layout/BaseLayout.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import { useAccountStore } from '@/store/account'
import { storeToRefs } from 'pinia'
import Profile from '@/components/account/Profile.vue'
import UserComponent from '@/components/users/UserComponent.vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
const isLoading = ref<boolean>(false)
const isOpen = ref(false)

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

const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
}
</script>
