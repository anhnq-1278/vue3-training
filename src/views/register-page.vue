<template>
  <div class="flex justify-center items-center h-screen bg-[#23242a]">
    <div class="container relative w-[380px] h-[460px] rounded-lg overflow-hidden">
      <div class="form absolute rounded-lg bg-[#23242a] z-10 p-10">
        <form @submit="onSubmit">
          <div class="flex-col flex">
            <p class="text-center text-[#45f3ff] font-medium tracking-widest">REGISTER</p>
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

            <div class="flex items-center justify-between mt-2.5">
              <button
                type="submit"
                :class="[
                  'bg-[#45f3ff] text-[#23242a] font-semibold w-[100px] mt-6 h-10 flex justify-center items-center rounded cursor-pointer',
                  { 'bg-[#dbdbdb] !cursor-not-allowed text-white border-none': !formValid }
                ]"
              >
                Register
              </button>
              <router-link
                to="/login"
                class="bg-[#45f3ff] text-[#23242a] font-semibold w-[100px] mt-6 h-10 flex justify-center items-center rounded"
              >
                Login
              </router-link>
            </div>
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

const store = CommonStore()
const router = useRouter()

const schema = {
  email: 'required|email',
  password: 'required|password',
  username: 'required'
}

const inputs = [
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter your email',
    label: 'Email'
  },
  {
    name: 'username',
    type: 'text',
    placeholder: 'Enter your username',
    label: 'Username'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password'
  }
]

const { handleSubmit, values, setErrors } = useForm({
  validationSchema: schema
})

const formValid = computed(() => {
  return !!values.email && !!values.password && !!values.username
})

const onSubmit = handleSubmit(async (value) => {
  if (!formValid.value) {
    return
  }
  store.setLoading(true)

  try {
    await store.register(value as TRequestAuth)

    router.push({ path: '/' })
  } catch (error: any) {
    const errorMsg = error.response.data

    setErrors({
      [errorMsg.key]: errorMsg.message
    })
  } finally {
    store.setLoading(false)
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
