<template>
  <div class="mt-[50px] pt-11 px-[10%] w-full">
    <h3 class="mb-4 text-[40px] font-bold leading-8">Change password</h3>
    <div class="text-base mb-6">Update your password regularly to ensure information security</div>
    <Form
      @submit="handleChangePassword"
      :validation-schema="schema"
      class="flex flex-col gap-4 p-6 border border-grey-dc"
    >
      <InputLabel name="Current password" class="w-[50%]">
        <template #input>
          <div class="relative">
            <Input
              class="h-12 text-xl bg-white"
              :type="typeInput.currentPassword"
              name="currentPassword"
              :value="formData.currentPassword"
              @input="handleChangeInput($event, 'currentPassword')"
              @has-error-validate="handleChangeErrorStatus"
              :error="errorMessage.currentPassword"
            />
            <EyeSlashIcon
              @click="changeTypeInput('currentPassword')"
              v-if="typeInput.currentPassword === 'password'"
              class="absolute top-2.5 right-2"
            />
            <EyeIcon
              v-else
              @click="changeTypeInput('currentPassword')"
              class="absolute top-2.5 right-2"
            />
          </div>
        </template>
      </InputLabel>
      <InputLabel name="New password" class="w-[50%]">
        <template #input>
          <div>
            <Input
              class="h-12 text-xl bg-white"
              :type="typeInput.newPassword"
              name="newPassword"
              :value="formData.newPassword"
              @input="handleChangeInput($event, 'newPassword')"
              @has-error-validate="handleChangeErrorStatus"
              :error="errorMessage.newPassword"
            />
            <EyeSlashIcon
              @click="changeTypeInput('newPassword')"
              v-if="typeInput.newPassword === 'password'"
              class="absolute top-2.5 right-2"
            />
            <EyeIcon
              v-else
              @click="changeTypeInput('newPassword')"
              class="absolute top-2.5 right-2"
            />
          </div>
        </template>
      </InputLabel>
      <InputLabel name="Confirm Password" class="w-[50%]">
        <template #input>
          <div>
            <Input
              class="h-12 text-xl bg-white"
              :type="typeInput.confirmPassword"
              name="confirmPassword"
              :value="formData.confirmPassword"
              @input="handleChangeInput($event, 'confirmPassword')"
              @has-error-validate="handleChangeErrorStatus"
              :error="errorMessage.confirmPassword"
            />
            <EyeSlashIcon
              @click="changeTypeInput('confirmPassword')"
              v-if="typeInput.confirmPassword === 'password'"
              class="absolute top-2.5 right-2"
            />
            <EyeIcon
              v-else
              @click="changeTypeInput('confirmPassword')"
              class="absolute top-2.5 right-2"
            />
          </div>
        </template>
      </InputLabel>
      <div class="mt-6 flex items-center gap-4">
        <button
          @click="handleResetForm"
          :class="[
            'h-12 w-[100px] text-base font-bold text-white rounded-[3px] border border-grey-dc'
          ]"
        >
          Reset
        </button>
        <button
          type="submit"
          :disabled="isDisabled"
          :class="[
            'h-12 w-[150px] text-base font-bold text-white rounded-[3px] border border-grey-dc',
            `${
              isDisabled
                ? 'cursor-not-allowed bg-white text-gray-400'
                : 'cursor-pointer  hover:bg-slate-400  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
            }`
          ]"
        >
          Change password
        </button>
      </div>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { Form } from 'vee-validate'
import InputLabel from '@/components/common/InputText/InputLabel.vue'
import Input from '@/components/common/InputText/InputText.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'
import { computed, reactive, ref } from 'vue'
import ProfileStore from '@/store/Profile'
import CommonStore from '@/store/Common'
import type { TChangePassword } from '@/model/Profile'

const schema = {
  currentPassword: 'password',
  newPassword: 'password',
  confirmPassword: 'confirmedPassword:newPassword|password'
}

interface ErrorMessage extends TChangePassword {}

const errorMessage = reactive<ErrorMessage>({} as ErrorMessage)
const errorValidate = ref<boolean>(false)
const formData = reactive<TChangePassword>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const typeInput = reactive<TChangePassword>({
  currentPassword: 'password',
  newPassword: 'password',
  confirmPassword: 'password'
})

const isDisabled = computed(() => {
  return (
    !formData.newPassword.trim() ||
    !formData.currentPassword ||
    !formData.confirmPassword.trim() ||
    errorValidate.value
  )
})

const { changePassword } = ProfileStore()
const { setLoading } = CommonStore()

function handleChangeInput(event: Event, field: keyof TChangePassword) {
  formData[field] = (event.target as HTMLInputElement).value
}

function handleChangeErrorStatus(hasError: boolean) {
  errorValidate.value = hasError
}
function changeTypeInput(field: string) {
  typeInput[field as keyof TChangePassword] =
    typeInput[field as keyof TChangePassword] === 'password' ? 'text' : 'password'
}

async function handleChangePassword() {
  if (!isDisabled) return
  try {
    setLoading(true)
    resetErrorMessage()
    await changePassword(formData)
  } catch (error: any) {
    errorMessage[error.data.key as keyof ErrorMessage] = error.data.message
  } finally {
    handleResetForm()
    setLoading(false)
  }
}

function resetErrorMessage() {
  Object.keys(errorMessage).forEach((key: string) => {
    errorMessage[key as keyof ErrorMessage] = ''
  })
}

function handleResetForm() {
  Object.keys(formData).forEach((field: string) => {
    formData[field as keyof TChangePassword] = ''
  })
}
</script>
<style lang="scss" scoped></style>
