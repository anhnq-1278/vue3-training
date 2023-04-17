<template>
  <div class="bg-pink-e4 w-full min-h-screen flex justify-center items-center">
    <div class="min-w-[500px] bg-[#f5f5f5] p-5 rounded-lg">
      <h1 class="uppercase text-xl text-center text-pink-8 font-semibold [word-spacing:7px]">
        sign in
      </h1>
      <div class="mt-8 flex flex-col">
        <input-field
          type="text"
          placeholder="Email"
          @input="handleChangeInput($event, 'email')"
          :is-error="keyError === 'password'"
        />
        <input-field
          type="password"
          placeholder="Password"
          @input="handleChangeInput($event, 'password')"
          :is-error="keyError === 'password'"
          :error-message="errorMessage"
        />
        <button
          class="bg-pink-d5 hover:bg-pink-8 duration-200 w-full text-white px-6 py-2 rounded text-lg"
          @click="handleSubmit"
        >
          Sign in
        </button>
      </div>
      <h3 class="text-center mt-3">
        Don't have an account? <a href="/register" class="text-blue-700">Sign up</a>
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import InputField from '@/components/input-field.vue'
import CommonStore from '@/store/Common'
import { useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'

const commonStore = CommonStore()
const router = useRouter()
const { notify } = useNotification()

const formData: any = reactive({
  email: '',
  password: ''
})

const errorMessage = ref('')
const keyError = ref('')

const handleSubmit = async () => {
  try {
    commonStore.setLoading(true)

    await commonStore.login(formData)

    router.push({ name: 'home' })

    notify({
      type: 'success',
      title: 'Success'
    })
  } catch (error: any) {
    if (error.status === 403) {
      errorMessage.value = error.data.message
      keyError.value = 'password'
    }
  } finally {
    commonStore.setLoading(false)
  }
}

const handleChangeInput = (event: Event, type: string) => {
  formData[type] = (event.target as HTMLInputElement).value
}
</script>
