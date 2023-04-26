<template>
  <section class="min-h-screen min-w-[100vw] flex justify-center items-center bg-[#ece093]">
    <div class="relative w-[800px] h-[500px] bg-[#fff] shadow-form">
      <div class="w-full h-full flex signinBx">
        <div class="imgBx relative w-1/2 h-full bg-[#ff0]">
          <img
            src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
            alt=""
            class="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div class="relative w-1/2 h-full bg-white flex justify-center items-center p-10">
          <div>
            <h2 class="text-2xl uppercase mb-3">Hello fen</h2>
            <Form @submit="submit" :validation-schema="schema" class="flex flex-col">
              <Field v-model="email" name="email" type="text" placeholder="address email" />
              <ErrorMessage name="email" class="text-red-600" />
              <Field v-model="password" name="password" type="password" placeholder="password" />
              <ErrorMessage name="password" class="text-red-600" />
              <ErrorMessage name="loginError" class="text-red-600" />
              <button
                type="submit"
                class="w-[120px] bg-[#677eff] py-1 mt-2 text-white cursor-pointer"
              >
                Sign up
              </button>
            </Form>
            <p class="signup mt-3">
              Already have an account ?
              <a href="/register" class="underline text-[#677eff] text-base">Register</a>
            </p>
          </div>
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

const router = useRouter()
const accountStore = useAccountStore()

const schema = {
  email: 'required|email',
  password: 'required|password'
}
const email = ref<string>('')
const password = ref<string>('')

const submit = async (_values: any, actions: any) => {
  try {
    await accountStore.login(email.value, password.value)
    router.push('/')
  } catch (error) {
    actions.setErrors({ loginError: ['email or password is wrong'] })
  }
}
</script>
