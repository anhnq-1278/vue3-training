<template>
  <div class="bg-pink-e4 w-full min-h-screen flex justify-center items-center">
    <div class="w-[500px] bg-[#f5f5f5] p-5 rounded-lg">
      <h1 class="uppercase text-xl text-center text-pink-8 font-semibold [word-spacing:7px]">
        sign up for a new account
      </h1>
      <div class="mt-8 flex flex-col">
        <Form :on-submit="handleSubmit" :validation-schema="schema">
          <input-field
            type="text"
            placeholder="Email"
            name="email"
            :is-error="keyError === 'email'"
            :error-msg="errorMessage"
          />
          <input-field
            type="text"
            placeholder="Username"
            name="username"
            :is-error="keyError === 'username'"
            :error-msg="errorMessage"
          />
          <input-field
            type="password"
            placeholder="Password"
            name="password"
            :is-error="keyError === 'password'"
            :error-msg="errorMessage"
          />
          <button
            class="bg-pink-d5 hover:bg-pink-8 duration-200 w-full text-white px-6 py-2 rounded text-lg"
          >
            Sign up
          </button>
        </Form>
      </div>
      <h3 class="text-center mt-3">
        Already have an account? <a href="/login" class="text-blue-700">Sign in</a>
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'

import InputField from '@/components/input-field.vue'
import CommonStore from '@/store/Common'
import { RouteName } from '@/constants'

const commonStore = CommonStore()
const router = useRouter()
const { notify } = useNotification()

const schema = {
  email: 'required|email',
  username: 'required',
  password: 'required|min:6|max:16|password'
}

const errorMessage = ref('')
const keyError = ref('')

const handleSubmit = async (value: any, actions: any) => {
  try {
    commonStore.setLoading(true)

    await commonStore.register(value)

    router.push({ name: RouteName.HOME })

    notify({
      type: 'success',
      title: 'Success'
    })
  } catch (error: any) {
    if (error.status === 403) {
      actions.setErrors({ [error.data.key]: error.data.message })
    }
  } finally {
    commonStore.setLoading(false)
  }
}
</script>
