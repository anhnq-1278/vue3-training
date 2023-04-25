<template>
  <div class="flex justify-center items-center h-screen bg-[#23242a]">
    <div class="container relative w-[380px] h-[520px] rounded-lg overflow-hidden">
      <div class="form absolute rounded-lg bg-[#23242a] z-10 p-10">
        <form @submit="onSubmit">
          <div class="flex-col flex">
            <p class="text-center text-[#45f3ff] font-medium tracking-widest">Change Password</p>
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
import type { IChangePW } from '@/type/Common'

import CommonStore from '@/store/common'
import TextInput from '@/components/common/text-input.vue'
import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()
const commonStore = CommonStore()
const router = useRouter()

const schema = {
  currentPassword: 'required|password',
  newPassword: 'required|password',
  confirmPassword: 'required|confirmed:newPassword'
}

const inputs = [
  {
    name: 'currentPassword',
    type: 'password',
    placeholder: 'Enter your current password',
    label: 'Current Password'
  },
  {
    name: 'newPassword',
    type: 'password',
    placeholder: 'Enter your new password',
    label: 'New Password'
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Confirm Password'
  }
]

const { handleSubmit, values } = useForm({
  validationSchema: schema
})

const formValid = computed(() => {
  return !!values.currentPassword && !!values.newPassword && !!values.confirmPassword
})

const onSubmit = handleSubmit(async (value) => {
  if (!formValid.value) {
    return
  }

  try {
    commonStore.setLoading(true)

    await commonStore.changePassword(value as IChangePW)

    router.push({ path: '/' })
  } catch (error: any) {
    notify({
      type: 'error',
      title: error.response.data.message
    })
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
