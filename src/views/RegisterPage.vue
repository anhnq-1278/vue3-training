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
            <Form @submit="handleRegister" :validation-schema="schema">
              <div class="flex flex-col mb-3">
                <div class="relative mb-3 mr-6 flex flex-col">
                  <span class="mb-2">Email address </span>
                  <InputText
                    class="block min-h-[auto] w-full rounded px-3 py-[5px] leading-[2.15] outline-none"
                    placeholder="Enter your email"
                    @input="handleChangeInput($event, 'email')"
                    :value="registerInfo.email"
                    :has-error="!!registerInfo.errorEmailMessage"
                    name="email"
                  />
                  <div v-if="registerInfo.errorEmailMessage" class="text-red-500 break-words mt-1">
                    {{ registerInfo.errorEmailMessage }}
                  </div>
                </div>
                <div class="relative mb-3 mr-6 flex flex-col">
                  <span class="mb-2">Username </span>
                  <InputText
                    class="block min-h-[auto] w-full rounded px-3 py-[5px] leading-[2.15] outline-none"
                    placeholder="Enter your username"
                    @input="handleChangeInput($event, 'username')"
                    :value="registerInfo.username"
                    :has-error="!!registerInfo.errorUsernameMessage"
                    name="username"
                  />
                  <div v-if="registerInfo.errorUsernameMessage" class="text-red-500 break-words mt-1">
                    {{ registerInfo.errorUsernameMessage }}
                  </div>
                </div>

                <div class="relative mr-6">
                  <span class="mb-2">Password </span>
                  <InputText
                    class="block min-h-[auto] w-full rounded px-3 py-[5px] leading-[2.15] outline-none"
                    placeholder="Enter your password"
                    @input="handleChangeInput($event, 'password')"
                    :value="registerInfo.password"
                    :has-error="!!registerInfo.errorPasswordMessage"
                    type="password"
                    name="password"
                  />
                </div>
                <div v-if="registerInfo.errorPasswordMessage" class="text-red-500 break-words mt-1">
                  {{ registerInfo.errorPasswordMessage }}
                </div>
              </div>
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
                  Register
                </button>
                <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Do you have an account?
                  <span
                    @click="router.push({ name: RouterName.Login })"
                    class="cursor-pointer transition duration-150 ease-in-out hover:text-blue-3b focus:text-danger-600 active:text-danger-700"
                    >Login</span
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

import type { TRegister } from '@/model/Auth'
import InputText from '@/components/common/InputText/InputText.vue'
import { Form } from 'vee-validate'
import '@/validators/AuthValidator.ts'
import CommonStore from '@/store/Common'
import { computed, reactive } from 'vue'

interface IObjectKeys {
  [key: string]: string | number
}

const schema = {
  email: 'required|email',
  username: 'required',
  password: 'required|password',
};

interface TRegisterInfo extends IObjectKeys {
  email: string
  username: string
  password: string
  errorEmailMessage: string
  errorUsernameMessage: string
  errorPasswordMessage: string
}

const commonStore = CommonStore()

const router = useRouter()
const isDisabled = computed(() => {
  return (
    !registerInfo.email.trim() || !registerInfo.password.trim() || !registerInfo.username.trim()
  )
})

const registerInfo: TRegisterInfo = reactive({
  email: '',
  username: '',
  password: '',
  errorEmailMessage: '',
  errorUsernameMessage: '',
  errorPasswordMessage: ''
})

function handleChangeInput(event: Event, type: string) {
  registerInfo[type] = (event.target as HTMLInputElement).value.trim()
}

async function handleRegister() {
  registerInfo.errorEmailMessage = ''
  registerInfo.errorUsernameMessage = ''
  registerInfo.errorPasswordMessage = ''

  const registerPayload: TRegister = {
    email: registerInfo.email.trim(),
    username: registerInfo.username.trim(),
    password: registerInfo.password.trim()
  }
  try {
    commonStore.setLoading(true)

    const { data } = await commonStore.register(registerPayload)
    localStorage.setItem('access_token', data.token)

    router.push('/')
  } catch (error: any) {
    switch (error.data.key) {
      case 'email':
        registerInfo.errorEmailMessage = error.data.message

        break
      case 'username':
        registerInfo.errorUsernameMessage = error.data.message

        break
      case 'password':
        registerInfo.errorPasswordMessage = error.data.message

        break

      default:
        break
    }
  } finally {
    commonStore.setLoading(false)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/index';
</style>
