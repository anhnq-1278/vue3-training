<template>
  <div class="flex justify-center items-center h-screen bg-[#23242a]">
    <div class="container relative w-[380px] h-[420px] rounded-lg overflow-hidden">
      <div class="form absolute rounded-lg bg-[#23242a] z-10 p-10">
        <form @submit="onSubmit">
          <div class="flex-col flex">
            <p class="text-center text-[#45f3ff] font-medium tracking-widest">LOGIN</p>
            <TextInput
              v-for="({ name, label, type, placeholder }, i) in inputs"
              :key="i"
              v-bind="{
                name,
                label,
                type,
                placeholder
              }"
            />

            <div class="flex justify-between mt-2.5">
              <span
                class="hover:text-[#45f3ff] transition cursor-pointer duration-300 text-[#8f8f8f]"
                >Forgot Password</span
              >
              <router-link to="/register" class="text-[#45f3ff]"> Signup </router-link>
            </div>

            <button
              :class="[
                'bg-[#45f3ff] text-[#23242a] font-semibold w-[100px] mt-6 cursor-pointer h-10 flex items-center justify-center rounded',
                { 'bg-[#dbdbdb] !cursor-not-allowed text-white border-none': !formValid }
              ]"
              type="submit"
              :disabled="!formValid"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import type { TRequestAuth } from '@/type/Common'

import CommonStore from '@/store/common'
import TextInput from '@/components/common/text-input.vue'

const commonStore = CommonStore()
const router = useRouter()

const schema = {
  email: 'required|email',
  password: 'required|password'
}

const inputs = [
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter your email',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password'
  }
]

const { handleSubmit, values } = useForm({
  validationSchema: schema
})

const formValid = computed(() => {
  return !!values.email && !!values.password
})

const onSubmit = handleSubmit(async (value) => {
  if (!formValid.value) {
    return
  }

  try {
    commonStore.setLoading(true)

    await commonStore.login(value as TRequestAuth)

    router.push({ path: '/' })
  } catch (error) {
    console.log('🚀 ~ file: login-page.vue:109 ~ onSubmit ~ error:', error)
  } finally {
    commonStore.setLoading(false)
  }
})
</script>
<style lang="scss" scoped>
.container {
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 420px;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 420px;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
    animation-delay: -3s;
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .form {
    inset: 2px;

    .input-box {
      input {
        box-shadow: none;
        outline: none;
      }

      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px #45f3ff inset !important;
      }
    }
  }
}
</style>
