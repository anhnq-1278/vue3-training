<template>
  <div class="flex items-center justify-center h-screen">
    <section class="w-[1000px] h-[600px] border shadow-xs">
      <div class="h-full">
        <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div
            class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12"
          >
            <img src="../assets/images/bg1.webp" class="w-full" alt="image" />
          </div>
          <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <Form @submit="handleLogin" :validation-schema="schema">
              <div class="flex flex-col mb-3">
                <div class="relative mb-6 mr-6">
                  <span class="mb-2">Email address </span>
                  <InputText
                    class="block min-h-[auto] w-full rounded px-3 py-[5px] leading-[2.15] outline-none"
                    placeholder="Enter your email"
                    @input="handleChangeInput($event, 'email')"
                    :value="loginInfo.email"
                    name="email"
                  />
                </div>

                <div class="relative mr-6">
                  <span class="mb-2">Password </span>
                  <InputText
                    class="block min-h-[auto] w-full rounded px-3 py-[5px] leading-[2.15] outline-none"
                    placeholder="Enter your password"
                    @input="handleChangeInput($event, 'password')"
                    :value="loginInfo.password"
                    type="password"
                    name="password"
                  />
                </div>
                <div v-if="loginInfo.errorMessage" class="text-red-500 break-words">
                  {{ loginInfo.errorMessage }}
                </div>
              </div>

              <!-- Login button -->
              <div class="text-center lg:text-left">
                <button
                  type="submit"
                  :disabled="isDisabled"
                  :class="[
                    'inline-block rounded bg-[#3B71CA] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white-fb shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out',
                    `${
                      isDisabled
                        ? 'cursor-not-allowed bg-slate-500'
                        : 'cursor-pointer  hover:bg-blue-3b hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
                    }`
                  ]"
                >
                  Login
                </button>

                <!-- Register link -->
                <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?
                  <span
                    @click="router.push({ name: RouterName.Register })"
                    class="cursor-pointer transition duration-150 ease-in-out hover:text-blue-3b focus:text-danger-600 active:text-danger-700"
                    >Register</span
                  >
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouterName } from '@/router/constant'

import type { TLogin } from '@/model/Auth'
import InputText from '@/components/common/InputText/InputText.vue'
import CommonStore from '@/store/Common'
import { computed, reactive } from 'vue'
import { Form } from 'vee-validate'

const schema = {
  email: 'required|email',
  password: 'required|password'
}

interface IObjectKeys {
  [key: string]: string | number
}

interface ILoginInfo extends IObjectKeys {
  email: string
  password: string
  errorMessage: string
}

const commonStore = CommonStore()

const router = useRouter()
const isDisabled = computed(() => {
  return !loginInfo.email.trim() || !loginInfo.password.trim()
})

const loginInfo: ILoginInfo = reactive({
  email: '',
  password: '',
  errorMessage: ''
})

function handleChangeInput(event: Event, type: string) {
  loginInfo[type] = (event.target as HTMLInputElement).value.trim()
}

async function handleLogin() {
  loginInfo.errorMessage = ''

  const loginParams: TLogin = {
    email: loginInfo.email.trim(),
    password: loginInfo.password.trim()
  }
  try {
    commonStore.setLoading(true)

    const { data } = await commonStore.login(loginParams)
    localStorage.setItem('access_token', data.token)

    router.push('/')
  } catch (error: any) {
    loginInfo.errorMessage = error.data.message
  } finally {
    commonStore.setLoading(false)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
