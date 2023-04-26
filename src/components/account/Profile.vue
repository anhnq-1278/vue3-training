<template>
  <Form @submit="submit" :validation-schema="schema" class="flex flex-col capitalize">
    <label>username</label>
    <Field v-model="account.username" name="username" type="text" placeholder="username" />
    <ErrorMessage name="username" class="text-red-600" />

    <label>email</label>
    <Field v-model="account.email" name="email" type="text" placeholder="address email" />
    <ErrorMessage name="email" class="text-red-600" />

    <label>name</label>
    <Field v-model="account.name" name="name" type="text" placeholder="name" />
    <ErrorMessage name="name" class="text-red-600" />

    <label>address</label>
    <Field v-model="account.address" name="address" type="text" placeholder="address" />
    <ErrorMessage name="address" class="text-red-600" />

    <label>birthday</label>
    <Field v-model="account.birthday" name="birthday" type="text" placeholder="birthday" />
    <ErrorMessage name="birthday" class="text-red-600" />

    <label>phone</label>
    <Field v-model="account.phone" name="phone" type="text" placeholder="phone" />
    <ErrorMessage name="phone" class="text-red-600" />

    <button type="submit" class="w-[120px] bg-[#677eff] py-1 mt-2 text-white cursor-pointer">
      submit
    </button>
  </Form>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useAccountStore } from '@/store/account'
import { storeToRefs } from 'pinia'

const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)

const schema = {
  username: 'required',
  email: 'required|email',
  name: 'required',
  address: 'required',
  birthday: 'required',
  phone: 'required|phone'
}

onMounted(async () => {
  await accountStore.getAccount()
})

const submit = async () => {
  let formData: FormData = new FormData()
  formData.append('name', account.value.name)
  formData.append('username', account.value.username)
  formData.append('email', account.value.email)
  formData.append('address', account.value.address)
  formData.append('birthday', account.value.birthday)
  formData.append('phone', account.value.phone)
  try {
    await accountStore.update(formData)
    await accountStore.getAccount()
  } catch (error) {
    console.log(error)
  }
}
</script>
