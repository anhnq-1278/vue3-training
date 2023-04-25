<template>
  <div class="max-w-[80%] mx-auto">
    <div class="pt-20">
      <h1 class="text-6xl text-pink-8 font-extralight">Password</h1>
      <div class="mt-8 flex flex-col">
        <div class="mt-2 flex flex-col gap-3 text-lg p-7 bg-white rounded-xl shadow-lg">
          <form @submit="onSubmit">
            <input-field
              type="password"
              placeholder="Current password"
              name="currentPassword"
              title="Current Password"
              :is-error="keyError === 'currentPassword'"
              :error-msg="errorMessage"
            />
            <input-field
              type="password"
              placeholder="New password"
              name="newPassword"
              title="New Password"
              :is-error="keyError === 'newPassword'"
              :error-msg="errorMessage"
            />
            <input-field
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              title="Confirm Password"
              :is-error="keyError === 'confirmPassword'"
              :error-msg="errorMessage"
            />
            <button
              class="px-5 py-2 bg-blue-400 border-blue-500 border rounded text-white w-full"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputField from '@/components/input-field.vue'
import { useForm } from 'vee-validate'
import Common from '@/store/Common'
import { useRouter } from 'vue-router'
import { RouteName } from '@/constants'
import { useNotification } from '@kyvg/vue3-notification'

const commonStore = Common()
const router = useRouter()
const { notify } = useNotification()

const schema = {
  currentPassword: 'required|password',
  newPassword: 'required|password',
  confirmPassword: 'required|password'
}

const { handleSubmit } = useForm({
  validationSchema: schema
})

const errorMessage = ref('')
const keyError = ref('')

const onSubmit = handleSubmit(async (value: any) => {
  try {
    commonStore.setLoading(true)

    await commonStore.changePassword(value)

    router.push({ name: RouteName.SETTING })

    notify({
      type: 'success',
      title: 'Success'
    })
  } catch (error: any) {
    if (error.status === 403) {
      errorMessage.value = error.data.message
      keyError.value = error.data.key
    }
  } finally {
    commonStore.setLoading(false)
  }
})
</script>
