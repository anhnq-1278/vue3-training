<template>

  <div v-if="!isPerLoading" class="px-[10%] h-[500px] w-full pt-11">
    <h3 class="mb-4 text-[40px] font-bold leading-8">Your profile</h3>
    <div class="text-base mb-6">
      You can update your personal information below to display on your profile
    </div>
    <Form
      @submit="handleSubmit"
      class="border border-grey-dc flex gap-4 flex-col p-6"
      :validation-schema="schema"
    >
      <Avatar
        :avatar="formData.avatar"
        :acceptFileType="['jpeg', 'png', 'jpg']"
        @cropped-image-data="handleGetCropperImage"
      />
      <div class="flex items-center justify-between gap-10">
        <InputLabel name="Name" class="flex-1">
          <template #input>
            <Input
              @keydown.enter.prevent
              name="name"
              class="h-10 bg-white-fb"
              :value="formData.name"
              @input="handleChangeInput($event, 'name')"
            />
          </template>
        </InputLabel>
        <InputLabel name="Birthday">
          <template #input>
            <Input
              @keydown.enter.prevent
              name="birthday"
              type="date"
              class="h-10 bg-white-fb"
              :value="formData.birthday"
              @input="handleChangeInput($event, 'birthday')"
              @has-error-validate="handleChangeErrorStatus"
            />
          </template>
        </InputLabel>
      </div>
      <div>
        <InputLabel name="Address">
          <template #input>
            <Input
              @keydown.enter.prevent
              name="address"
              class="h-10 bg-white-fb"
              :value="formData.address"
              @input="handleChangeInput($event, 'address')"
            />
          </template>
        </InputLabel>
      </div>
      <div>
        <InputLabel name="Contact number">
          <template #input>
            <Input
              @keydown.enter.prevent
              name="phone"
              class="h-10 bg-white-fb"
              :value="formData.phone"
              :error="errorPhoneMessage"
              @input="handleChangeInput($event, 'phone')"
              @has-error-validate="handleChangeErrorStatus"
            />
          </template>
        </InputLabel>
      </div>

      <div class="mt-6 flex items-center gap-4">
        <button
          @click="handleCancel"
          :class="[
            'h-10 w-[100px] text-base font-bold text-white rounded-[3px] border border-grey-dc'
          ]"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="isDisabled"
          :class="[
            'h-10 w-[100px] text-base font-bold text-white rounded-[3px] border border-grey-dc',
            `${
              isDisabled
                ? 'cursor-not-allowed bg-white-fb'
                : 'cursor-pointer  hover:bg-slate-400  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
            }`
          ]"
        >
          Submit
        </button>
      </div>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import InputLabel from '@/components/common/InputText/InputLabel.vue'
import Input from '@/components/common/InputText/InputText.vue'
import Avatar from '@/components/Profile/AvatarImage.vue'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import type { TProfile } from '@/model/Profile'
import { Form } from 'vee-validate'
import ProfileStore from '@/store/Profile'
import CommonStore from '@/store/Common'
import { cloneDeep, isEqual } from 'lodash'
import { formatIsoDate } from '@/utils'

const { getProfile, updateProfile } = ProfileStore()
const { setLoading } = CommonStore()
const isPerLoading = ref<boolean>(true)
const avatarFile = ref<File | null>(null)
const errorValidate = ref<boolean>(false)

const isDisabled = computed(() => {
  return errorValidate.value || isEqual(oldFormData.value, formData.value)
})

const schema = {
  birthday: 'date',
  phone: 'phone'
}
const oldFormData = ref<TProfile>({} as TProfile)

const formData = ref<TProfile>({
  name: '',
  address: '',
  birthday: '',
  phone: '',
  avatar: ''
})

interface TProfile {
  name: string
  address?: string
  phone?: string
  birthday?: string
  avatar?: any
}

const errorPhoneMessage = ref<string>('')

function handleGetCropperImage(data: any) {
  formData.value.avatar = data.imageUrl
  avatarFile.value = data.file
}

function handleChangeInput(event: Event, type: keyof TProfile) {
  formData.value[type as keyof TProfile] = (event.target as HTMLInputElement).value
}

function handleChangeErrorStatus(hasError: boolean) {
  errorValidate.value = hasError
}

async function handleSubmit() {
  if (isDisabled.value) return

  errorPhoneMessage.value = ''

  let form: any = new FormData()
  form.append('name', formData.value.name || '')
  form.append('address', formData.value.address || '')
  form.append('birthday', formData.value.birthday || '')
  form.append('phone', formData.value.phone || '')
  if (avatarFile) {
    form.append('avatar', avatarFile.value)
  }

  try {
    setLoading(true)

    await updateProfile(form)
    await getFormProfile()
  } catch (error: any) {
    errorPhoneMessage.value = error.data.message
  } finally {
    setLoading(false)
  }
}

async function getFormProfile() {
  setLoading(true)
  try {
    const { data } = await getProfile()
    const { name = '', address = '', phone = '', birthday = '', avatar = '' } = data

    formData.value = {
      name,
      address,
      phone,
      avatar,
      birthday: formatIsoDate(birthday)
    }

    oldFormData.value = cloneDeep(formData.value)
  } finally {
    setLoading(false)
  }
}

function handleCancel() {
  formData.value = cloneDeep(oldFormData.value)
}

onBeforeMount(() => {
  isPerLoading.value = true
  getFormProfile()
  isPerLoading.value = false
})
</script>
<style lang="scss" scoped></style>
