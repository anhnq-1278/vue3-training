<template>
  <div class="flex flex-col">
    <form @submit="onSubmit">
      <input-number v-model="modelInput" @change="handleChangeInput" />
      <button type="submit">Sumit</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

const modelInput = ref('')

const validateField = (value: string) => {
  if (!value?.trim()) {
    return 'this field is required'
  }

  if (value.length < 8) {
    return 'this field must contain at least 8 characters'
  }

  return true
}

const handleChangeInput = (value: string) => {
  modelInput.value = value
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

const { value: inputValue, errorMessage } = useField('value', validateField)
</script>
