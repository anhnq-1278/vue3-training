<template>
  <div class="flex flex-col">
    <form @submit="onSubmit">
      <input v-model="value" placeholder="Type something" />
      <span class="text-red-700">{{ errorMessage }}</span>
      <input v-model="value2" placeholder="Type something" />
      <span class="text-red-700">{{ errorMessage2 }}</span>
      <button type="submit">Sumit</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

const validateField = (value: string) => {
  if (!value?.trim()) {
    return 'this field is required'
  }

  if (value.length < 8) {
    return 'this field must contain at least 8 characters'
  }

  return true
}

const { handleSubmit, resetForm } = useForm({
  initialValues: {
    value: '',
    value2: ''
  }
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

const { value, errorMessage } = useField('value', validateField)
const { value: value2, errorMessage: errorMessage2 } = useField('value2', validateField)
</script>
