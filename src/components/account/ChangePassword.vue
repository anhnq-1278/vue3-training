<template>
  <Form @submit="submit" :validation-schema="schema" class="flex flex-col">
    <Field
      v-model="currentPassword"
      name="currentPassword"
      type="password"
      placeholder="current password"
    />
    <ErrorMessage name="currentPassword" class="text-red-600" />
    <Field v-model="newPassword" name="newPassword" type="password" placeholder="password" />
    <ErrorMessage name="password" class="text-red-600" />
    <Field
      v-model="confirmPassword"
      name="confirmPassword"
      type="password"
      placeholder="confirm password"
    />
    <ErrorMessage name="confirmPassword" class="text-red-600" />
    <ErrorMessage name="errorChange" class="text-red-600" />
    <p v-if="isSuccess" class="text-green-500 capitalize text-[20px] font-medium">
      you changed password success
    </p>
    <button type="submit" class="w-[120px] bg-[#677eff] py-1 mt-2 text-white cursor-pointer">
      submit
    </button>
  </Form>
</template>
<script setup lang="ts">
import { Field, Form, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()

const schema = {
  currentPassword: 'required|password',
  newPassword: 'required|password',
  confirmPassword: 'required|confirmed:@newPassword'
}
const currentPassword = ref<string>('')
const newPassword = ref<string>('')
const confirmPassword = ref<string>('')
const isSuccess = ref<boolean>(false)

const submit = async (_values: any, actions: any) => {
  try {
    await accountStore.changePassword(
      currentPassword.value,
      newPassword.value,
      confirmPassword.value
    )

    actions.resetForm()
    isSuccess.value = true
  } catch (error) {
    console.log(error)
    actions.setErrors({ errorChange: ['change password is failed'] })
  }
}
</script>
