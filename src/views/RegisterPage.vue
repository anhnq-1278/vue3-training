<template>
  <section class="min-h-screen min-w-[100vw] flex justify-center items-center bg-[#ece093]">
    <div class="relative w-[800px] h-[500px] bg-[#fff] shadow-form">
      <div class="w-full h-full flex signupBx">
        <div class="relative w-1/2 h-full bg-white flex justify-center items-center p-10">
          <div>
            <h2 h2 class="text-2xl uppercase mb-3">Create an account</h2>
            <Form @submit="submit" :validation-schema="schema" class="flex flex-col">
              <Field
                v-model="username"
                name="username"
                type="text"
                placeholder="username"
                @input="isWrong = true"
              />
              <ErrorMessage name="username" class="text-red-600" />
              <Field
                v-model="email"
                name="email"
                type="text"
                placeholder="address email"
                @input="isWrong = true"
              />
              <ErrorMessage name="email" class="text-red-600" />
              <Field
                v-model="password"
                name="password"
                type="password"
                placeholder="password"
                @input="isWrong = true"
              />
              <ErrorMessage name="password" class="text-red-600" />
              <span v-if="isWrong" class="text-red-600"> something is wrong </span>
              <button
                type="submit"
                class="w-[120px] bg-[#677eff] py-1 mt-2 text-white cursor-pointer"
              >
                Sign up
              </button>
            </Form>
            <p class="signup mt-3">
              Already have an account ?
              <a href="/login" class="underline text-[#677eff] text-base">Sign in.</a>
            </p>
          </div>
        </div>
        <div class="imgBx relative w-1/2 h-full bg-[#ff0]">
          <img
            src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
            alt=""
            class="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Field, Form, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()

const router = useRouter()
const schema = {
  username: 'required',
  email: 'required|email',
  password: 'required|password'
}
const email = ref<string>('')
const password = ref<string>('')
const username = ref<string>('')
const isWrong = ref<boolean>(false)

const submit = async () => {
  try {
    await accountStore.register(username.value, email.value, password.value)
    router.push('/login')
  } catch (error) {
    email.value = ''
    password.value = ''
    username.value = ''
    isWrong.value = true
  }
}
</script>
