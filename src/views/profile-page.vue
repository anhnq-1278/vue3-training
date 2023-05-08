<template>
  <DetailPage :user="myAccount" @openModal="openModal" isEdit>
    <RootModal :show="isOpen">
      <div v-click-outside="closeModal" class="bg-white w-[640px] p-10 rounded">
        <div>
          <div class="flex gap-4 items-center my-4">
            <img
              v-if="imageUrl || myAccount.avatar"
              class="w-32 h-32 border p-4 shadow-md rounded-xl"
              :src="imageUrl || myAccount.avatar"
              alt=""
            />
            <div v-else class="w-32 h-32 rounded-[50%] bg-[#b8c3d4]"></div>
            <div class="flex flex-col items-center gap-2">
              <label
                class="cursor-pointer shadow-md font-medium border rounded-xl w-28 h-12 flex justify-center cursor-pointer items-center text-[#0d6efd]"
                for="file"
              >
                <span class="ml-2"> Upload File </span>
                <input
                  id="file"
                  name="file"
                  type="file"
                  class="file-input hidden"
                  accept=".jpeg,.jpg,.png"
                  @change="onChangeFile"
                />
              </label>
              <div
                @click="removeAvatar"
                class="border shadow-md rounded-xl w-28 h-12 flex justify-center items-center cursor-pointer text-[#b50e25]"
              >
                Remove file
              </div>
            </div>
          </div>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="input-component">
            <TextInput
              v-for="({ name, label, type, placeholder }, i) in inputs"
              :key="i"
              v-bind="{
                name,
                label,
                type,
                placeholder
              }"
            />
          </div>
          <div>
            <button
              :class="['mt-2 px-5 py-2 bg-blue-400 border-blue-500 border rounded text-white']"
              type="submit"
            >
              Submit
            </button>
            <button
              :class="[
                'mt-2 ml-2 px-5 py-2 bg-white text-[#333] border border-color-[#dcdcdc] rounded'
              ]"
              type="submit"
              @click.stop.prevent="closeModal"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </RootModal>
  </DetailPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'

import commonStore from '@/store/common'
import profileStore from '@/store/profile'
import RootModal from '@/components/modal/root-modal.vue'
import TextInput from '@/components/common/text-input.vue'
import DetailPage from '@/components/detail-page.vue'
import moment from 'moment'
import { notify } from '@kyvg/vue3-notification'
const store = commonStore()
const profile = profileStore()
const { myAccount } = storeToRefs(store)

const isOpen = ref(false)
const imageUrl = ref('')
const avatar = ref<File | null>()
const inputs = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Enter your name',
    label: 'Name'
  },
  {
    name: 'address',
    type: 'text',
    placeholder: 'Enter your address',
    label: 'Address'
  },
  {
    name: 'birthday',
    type: 'date',
    placeholder: 'Enter your birthday',
    label: 'Birthday'
  },
  {
    name: 'phone',
    type: 'text',
    placeholder: 'Enter your phone',
    label: 'Phone number'
  }
]

const { handleSubmit, setValues } = useForm({})

function openModal() {
  setValues({
    name: myAccount.value.name,
    address: myAccount.value.address,
    phone: myAccount.value.phone,
    birthday: formatDate(myAccount.value.birthday)
  })

  isOpen.value = true
  removeAvatar()
}

function closeModal() {
  isOpen.value = false
}

const onSubmit = handleSubmit(async (value) => {
  try {
    store.setLoading(true)

    const formData = new FormData()

    Object.keys(value).forEach((key) => {
      formData.append(key, value[key])
    })

    if (avatar.value) formData.append('avatar', avatar.value)

    await profile.editProfile(formData as any)
    await store.getMyAccount()

    closeModal()
  } catch (error: any) {
    console.log('🚀 ~ file: profile-page.vue:181 ~ onSubmit ~ error:', error)
  } finally {
    store.setLoading(false)
  }
})

async function onChangeFile(event: Event) {
  const inputElement = event.target as HTMLInputElement
  if (inputElement.files != null) {
    if (!/^image\//.test(inputElement.files[0].type)) {
      notify({
        type: 'error',
        title: 'format file should be a image'
      })

      return
    }

    if (inputElement.files[0].size / (1024 * 1024) > 1) {
      notify({
        type: 'error',
        title: 'size file should be less than 10MB'
      })

      return
    }

    avatar.value = inputElement.files[0]
    imageUrl.value = URL.createObjectURL(inputElement.files[0])
  }
}

function removeAvatar() {
  URL.revokeObjectURL(imageUrl.value)
  imageUrl.value = ''
}

function formatDate(date: string) {
  return date ? moment(date).format('YYYY-MM-DD') : ''
}
</script>

<style scoped lang="scss">
.input-component {
  :deep() {
    label {
      color: #666;
    }

    input {
      background: white;
      border: 1px solid #dcdcdc;
      color: #333;
      border-radius: 4px;
    }
  }
}
</style>
