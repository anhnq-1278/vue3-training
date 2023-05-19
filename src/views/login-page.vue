<template>
  <div class="bg-pink-e4 w-full min-h-screen flex justify-center items-center">
    <div class="w-[500px] bg-[#f5f5f5] p-5 rounded-lg">
      <h1 class="uppercase text-xl text-center text-pink-8 font-semibold [word-spacing:7px]">
        sign in
      </h1>
      <div class="mt-8 flex flex-col">
        <Form :on-submit="handleSubmit" :validation-schema="schema">
          <input-field
            type="text"
            placeholder="Email"
            name="email"
            :is-error="keyError === 'email'"
            :error-msg="errorMessage"
            v-model="email"
          />
          <input-field
            type="password"
            placeholder="Password"
            name="password"
            :is-error="keyError === 'password'"
            :error-msg="errorMessage"
            v-model="password"
          />
          <button
            class="bg-pink-d5 hover:bg-pink-8 duration-200 w-full text-white px-6 py-2 mt-2 rounded text-lg"
          >
            Sign in
          </button>
        </Form>
      </div>
      <h3 class="text-center mt-3">
        Don't have an account? <a href="/register" class="text-blue-700">Sign up</a>
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'
import { Form } from 'vee-validate'

import InputField from '@/components/input-field.vue'
import CommonStore from '@/store/Common'
import { RouteName } from '@/constants'

const commonStore = CommonStore()
const router = useRouter()
const { notify } = useNotification()

const schema = {
  email: 'required|email',
  password: 'required|min:6|max:16|password'
}

const email = ref('')
const password = ref('')

const errorMessage = ref('')
const keyError = ref('')

const handleSubmit = async (value: any, actions: any) => {
  try {
    commonStore.setLoading(true)

    await commonStore.login(value)

    router.push({ name: RouteName.HOME })

    notify({
      type: 'success',
      title: 'Success'
    })
  } catch (error: any) {
    if (error.status === 403) {
      actions.setErrors({ password: error.data.message })
    }
  } finally {
    commonStore.setLoading(false)
  }
}
</script>
