<template>
  <div class="max-w-[80%] mx-auto">
    <div class="pt-20">
      <h1 class="text-6xl text-pink-8 font-extralight">Profile</h1>
      <div class="mt-8 flex flex-col">
        <div class="flex justify-end pr-2">
          <edit-icon
            class="w-[45px] h-[45px] bg-pink-8 fill-white rounded-full p-2 cursor-pointer"
            @click="openModal = true"
          />
        </div>
        <div class="mt-2 flex flex-col gap-3 text-xl p-7 bg-white rounded-xl shadow-lg">
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Email:</span>
            <span>{{ myAccount.email }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Username:</span>
            <span>{{ myAccount.username }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Full name:</span>
            <span>{{ myAccount.name }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Address:</span>
            <span>{{ myAccount.address }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Birthday:</span>
            <span>{{ formatDate(new Date(myAccount.birthday || '')) }}</span>
          </div>
          <div class="text-blue-4 flex gap-4">
            <span class="w-[150px]">Phone number:</span>
            <span>{{ myAccount.phone }}</span>
          </div>
        </div>

        <root-modal v-show="openModal">
          <form @submit="onSubmit">
            <div class="flex gap-3">
              <div class="w-[200px] mt-10 flex flex-col items-center">
                <img
                  :src="
                    imgPreview ||
                    myAccount.avatar ||
                    'https://i.pinimg.com/564x/7c/d4/a1/7cd4a1b2ba0d1eb12b19bcfb47e0f20b.jpg'
                  "
                  alt="avatar"
                  class="rounded-full w-[150px] h-[150px]"
                />
                <div class="input-file-container">
                  <input
                    class="input-file"
                    id="my-file"
                    type="file"
                    @change="handleChangeUploadAvatar"
                  />
                  <label tabindex="0" for="my-file" class="input-file-trigger">File upload</label>
                </div>
                <span class="text-red-600 italic mt-2">{{ errorMsgAvatar }}</span>
              </div>
              <div class="w-full flex-1">
                <input-field
                  type="text"
                  placeholder="Full name"
                  name="name"
                  title="Full name"
                  :value="myAccount.name"
                />
                <input-field type="text" placeholder="Address" name="address" title="Address" />
                <input-field type="text" placeholder="Phone" name="phone" title="Phone" />
                <input-field
                  type="date"
                  name="birthday"
                  min="1900-01-01"
                  max="2023-01-01"
                  title="Birthday"
                />
              </div>
            </div>
            <div class="flex gap-3 items-center justify-center">
              <div
                class="px-5 py-2 bg-pink-f6 border-pink-e4 border rounded cursor-pointer"
                @click="handleCloseModal"
              >
                Cancel
              </div>
              <button
                class="px-5 py-2 bg-blue-400 border-blue-500 border rounded text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </root-modal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'

import Common from '@/store/Common'
import InputField from '@/components/input-field.vue'
import editIcon from '@/components/edit-icon.vue'
import rootModal from '@/components/root-modal.vue'
import { formatDate } from '@/utils'

const { myAccount } = storeToRefs(Common())
const commonStore = Common()

const openModal = ref(false)

const avatar = ref<File | null>()
const imgPreview = ref('')
const errorMsgAvatar = ref('')

const schema = {
  name: 'required',
  address: 'required',
  phone: 'required|phoneNumber',
  birthday: 'required'
}

const { handleSubmit, setValues } = useForm({
  validationSchema: schema
})

const onSubmit = handleSubmit(async (value: any) => {
  const formdata: any = new FormData()

  formdata.append('name', value.name)
  formdata.append('address', value.address)
  formdata.append('phone', value.phone)
  formdata.append('birthday', value.birthday)
  if (avatar.value) formdata.append('avatar', avatar.value)

  try {
    commonStore.setLoading(true)

    await commonStore.updateMyAccount(formdata)
    await commonStore.getMyAccount()
  } finally {
    commonStore.setLoading(false)

    openModal.value = false
    imgPreview.value = ''
    avatar.value = null
  }
})

const handleCloseModal = () => {
  openModal.value = false
}

const handleChangeUploadAvatar = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (target && target.files) {
    if (target.files[0].size > 1000000) {
      errorMsgAvatar.value = 'File upload max 1MB'

      return
    } else {
      errorMsgAvatar.value = ''
    }

    avatar.value = target.files[0]
    imgPreview.value = URL.createObjectURL(avatar.value)
  }
}

watch(myAccount, (value) => {
  setValues({
    name: value.name,
    address: value.address,
    phone: value.phone,
    birthday: formatDate(new Date(value.birthday || ''))
  })
})
</script>

<style lang="scss" scoped>
.input-file-container {
  position: relative;
  width: 120px;
  margin-top: 10px;
}

.input-file-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  background: rgb(96 165 250 / 1);
  color: #fff;
  font-size: 1em;
  transition: all 0.4s;
  cursor: pointer;
}

.input-file {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  opacity: 0;
  padding: 10px 0;
  cursor: pointer;
}
</style>
