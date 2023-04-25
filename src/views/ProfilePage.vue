<template>
  <div class="px-[10%] h-[500px] w-full mt-[50px] pt-11">
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
        :files="formData.file"
        :acceptFileType="['jpeg', 'png', 'jpg']"
        @cropped-image-data="handleGetCropperImage"
      />
      <div class="flex items-center justify-between gap-10">
        <InputLabel name="Name" class="flex-1">
          <template #input>
            <Input
              @keydown.enter.prevent
              name="name"
              class="h-10"
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
              class="h-10"
              :value="formData.birthday"
              @input="handleChangeInput($event, 'birthday')"
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
              class="h-10"
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
              class="h-10"
              :value="formData.phone"
              @input="handleChangeInput($event, 'phone')"
            />
          </template>
        </InputLabel>
      </div>

      <div class="mt-6 flex items-center gap-4">
        <button
          :disabled="isDisabled"
          :class="[
            'h-10 w-[100px] text-base font-bold text-white rounded-[3px] border border-grey-dc',
            `${
              isDisabled
                ? 'cursor-not-allowed bg-white-fb'
                : 'cursor-pointer  hover:bg-slate-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
            }`
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
import { reactive, ref } from 'vue'
import type { TProfile } from '@/model/Profile'
import { Form } from 'vee-validate'

const isDisabled = ref<boolean>(true)
const formData = reactive<TProfile>({
  name: '',
  address: '',
  birthday: '',
  phone: '',
  file: {
    url: ''
  }
})

const schema = {
  birthday: 'date',
  phone: 'phone'
}

function handleGetCropperImage(data: any) {
  formData.file.url = data.imageUrl
}

function handleChangeInput(event: Event, type: string) {
  formData[type] = (event.target as HTMLInputElement).value
}

function handleSubmit() {
  console.log('sb')
}
</script>
<style lang="scss" scoped></style>
