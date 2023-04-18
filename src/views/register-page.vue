<template>
  <div class="flex justify-center items-center h-screen bg-[#23242a]">
    <div class="container relative w-[380px] h-[460px] rounded-lg overflow-hidden">
      <div class="form absolute rounded-lg bg-[#23242a] z-10 p-10">
        <div class="flex-col flex">
          <p class="text-center text-[#45f3ff] font-medium tracking-widest">REGISTER</p>

          <div class="input-box mt-9 relative">
            <input
              class="relative w-full z-10 border-none bg-transparent text-[#23242a] tracking-wider p-2.5"
              type="text"
              required
              autocomplete="off"
              v-model="username"
            />
            <span
              class="absolute left-0 top-[-10px] pt-5 pb-2.5 px-0 text-[#8f8f8f] pointer-events-none"
              >Username</span
            >
            <i
              class="absolute left-0 bottom-0 z-[9] w-full h-0.5 bg-[#45f3ff] rounded pointer-events-none"
            ></i>
          </div>
          <div class="input-box mt-9 relative">
            <input
              :class="[
                'relative w-full z-10 border-none bg-transparent text-[#23242a] tracking-wider p-2.5',
                { 'has-value': email }
              ]"
              type="email"
              required
              autocomplete="off"
              v-model="email"
            />
            <span
              class="absolute left-0 top-[-10px] pt-5 pb-2.5 px-0 text-[#8f8f8f] pointer-events-none"
              >Email</span
            >
            <i
              :class="[
                'absolute left-0 bottom-0 z-[9] w-full h-0.5 bg-[#45f3ff] rounded pointer-events-none',
                { 'border-red-900 border-2': errorMessage.email }
              ]"
            ></i>
          </div>
          <p class="text-[#ed1822] text-sm mt-0.5" v-if="errorMessage.email">
            {{ errorMessage.email }}
          </p>
          <div class="input-box mt-9 relative">
            <input
              class="relative w-full z-10 border-none bg-transparent text-[#23242a] tracking-wider p-2.5"
              type="password"
              required
              autocomplete="off"
              v-model="password"
            />
            <span
              class="absolute left-0 top-[-10px] pt-5 pb-2.5 px-0 text-[#8f8f8f] pointer-events-none"
              >Password</span
            >
            <i
              :class="[
                'absolute left-0 bottom-0 z-[9] w-full h-0.5 bg-[#45f3ff] rounded pointer-events-none',
                { 'border-red-900 border-2': errorMessage.email }
              ]"
            ></i>
          </div>
          <p class="text-[#ed1822] text-sm mt-0.5" v-if="errorMessage.password">
            {{ errorMessage.password }}
          </p>
          <div class="flex items-center justify-between mt-2.5">
            <div
              :class="[
                'bg-[#45f3ff] text-[#23242a] font-semibold w-[100px] mt-6 h-10 flex justify-center items-center rounded cursor-pointer',
                { 'bg-[#dbdbdb] !cursor-not-allowed text-white border-none': !buttonActive }
              ]"
              @click.prevent.stop="handleSubmit"
            >
              Register
            </div>
            <router-link
              to="/login"
              class="bg-[#45f3ff] text-[#23242a] font-semibold w-[100px] mt-6 h-10 flex justify-center items-center rounded"
            >
              Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonStore from '@/store/common'

const store = CommonStore()
const router = useRouter()

const email = ref('')
const username = ref('')
const password = ref('')
const errorMessage = ref({} as any)

const buttonActive = computed(() => {
  return !!username.value && !!password.value && !!email.value
})

async function handleSubmit() {
  if (!buttonActive.value) {
    return
  }
  errorMessage.value = {}
  store.setLoading(true)
  const registerParams = {
    email: email.value,
    username: username.value,
    password: password.value
  }
  try {
    await store.register(registerParams)

    router.push({ path: '/' })
  } catch (error) {
    console.log('🚀 ~ file: register-page.vue:132 ~ handleSubmit ~ error:', error)
  } finally {
    store.setLoading(false)
  }
}
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

        &:valid ~ span,
        &.has-value ~ span,
        &:focus ~ span {
          color: #45f3ff;
          transform: translateX(0) translateY(-34px);
        }

        &:valid ~ i,
        &.has-value ~ i,
        &:focus ~ i {
          height: 44px;
        }
      }

      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px #45f3ff inset !important;
      }

      span,
      i {
        transition: 0.5s all;
      }
    }
  }
}
</style>
