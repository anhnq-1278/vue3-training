<template>
  <div v-if="!isHidden">
    <Form @submit="handleSubmit">
      <div class="bg-white p-4" ref="block1">
        <div>Email</div>
        <input-field type="text" placeholder="Email" name="email" :value="email" />
      </div>

      <div class="bg-white p-4 mt-[100px]" ref="block2">
        <div>Name</div>
        <input-field type="text" placeholder="name" name="name" :value="name" />
      </div>

      <button
        class="bg-pink-d5 hover:bg-pink-8 duration-200 w-full text-white px-6 py-2 mt-2 rounded text-lg"
      >
        submit
      </button>

      <div class="mt-[900px]"></div>
    </Form>
  </div>

  <div v-if="isHidden">
    <div>
      <div>Email: {{ email }}</div>
      <button class="bg-white text-blue-600 p-4" @click="onBack('block1')">back</button>
    </div>

    <div>
      <div>Name: {{ name }}</div>
      <button class="bg-white text-blue-600 p-4" @click="onBack('block2')">back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import InputField from '@/components/input-field.vue'
import ScrollTo from '@/utils/ScrollTo'

const email = ref('')
const name = ref('')

const block1 = ref()
const block2 = ref()
const isHidden = ref(false)

const handleSubmit = async (value: any) => {
  email.value = value.email
  name.value = value.name

  isHidden.value = true
}

const onBack = (value: any) => {
  isHidden.value = false

  switch (value) {
    case 'block1':
      ScrollTo(block1, 20)
      break
    case 'block2':
      ScrollTo(block2, 20)
      break
  }
}
</script>
