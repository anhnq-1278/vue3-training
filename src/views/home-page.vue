<template>
  <div class="flex flex-col justify-center items-center my-20">
    <div>
      Form upload 1
      <Transition name="slide-fade" mode="out-in">
        <img
          :key="previewImg"
          style="width: 430px; height: 284px"
          :src="previewImg"
          alt="preview"
          class="object-cover"
        />
      </Transition>
      <div class="flex flex-wrap justify-center mt-4 max-w-[430px]">
        <TransitionGroup
          name="list"
          tag="ul"
          class="flex gap-2 flex-wrap justify-center max-w-[430px]"
        >
          <li v-for="file in files" :key="file.id">
            <img
              @click="previewImg = file.blob"
              style="width: 100px; height: 100px"
              class="object-cover cursor-pointer"
              :class="previewImg === file.blob ? 'border-2 border-blue-600 rounded' : ''"
              :src="file.blob"
              alt="preview"
            />
          </li>
        </TransitionGroup>
        <FileUpload @change="handleChange" :modelValue="files" />
      </div>
    </div>
    <div>
      Form upload 2
      <FileUpload :drop="false" @change="handleChange" :modelValue="files" />
      <ul>
        <li v-for="file in files" :key="file.id">
          {{ file.name }}
          <button class="rounded-full bg-gray-200 p-1" @click="() => handleDelete(file.id)">
            delete
          </button>
        </li>
      </ul>
    </div>
    <div>
      Table
      <Table
        :wrapperClassName="'overflow-x-scroll max-w-[800px]'"
        :headers="headers"
        :rows="rows"
        @change="handleChangeTable"
      />
    </div>
    <div>
      Typography
      <typography :weight="'bold'" :size="'text-2xl'" />
    </div>
    <!-- <div>
      InputNumber
      <input-number v-model="modelInput" @change="handleChangeInput" />
    </div> -->
    <div>
      Form
      <div class="flex flex-col">
        <form @submit="onSubmit">
          <input-number v-model="modelValue" name="input-number" rules="required" />
          <input-number v-model="modelValue2" name="input-number2" />
          <button type="submit">Sumit</button>
        </form>
      </div>
    </div>
    <!-- <div>
      SelectBox
      <SelectBox />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'
import Table from '@/components/Table.vue'
import Typography from '@/components/Typography.vue'
import InputNumber from '@/components/InputNumber.vue'
import Form from '@/components/Form.vue'
import SelectBox from '@/components/SelectBox.vue'
import { ref } from 'vue'
import type { ITableRowData, ITableRowProps } from '@/components/Table.vue'
import type { VueUploadItem } from 'vue-upload-component'
import { useForm } from 'vee-validate'
import { defineRule } from 'vee-validate'
import AllRules from '@vee-validate/rules'

defineRule('required', (value: any) => {
  if (!value || !value.length) {
    return 'This field is required'
  }
  return true
})

const files = ref<VueUploadItem[]>([])
const previewImg = ref('../../public/images/default.svg')
const { handleSubmit } = useForm({
  // initialValues: {
  //   value: '',
  //   value2: ''
  // }
})

const modelValue = ref('1111111111111111111111')
const modelValue2 = ref('22222222222222')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

const handleDelete = (id: string) => {
  files.value = files.value.filter((file) => file.id !== id)
}

const validateField = (value: string) => {
  if (!value?.trim()) {
    return 'this field is required'
  }

  if (value.length < 8) {
    return 'this field must contain at least 8 characters'
  }

  return true
}

const headers = [
  { name: 'ID' },
  {
    name: 'NAME'
  },
  {
    name: 'EMAIL'
  },
  {
    name: 'EMAIL'
  },
  {
    name: 'EMAIL'
  },
  {
    name: 'EMAIL'
  },
  {
    name: 'EMAIL'
  },
  {
    name: 'EMAIL'
  },
  {
    name: 'EMAIL'
  }
]

const rows = ref<{ data: ITableRowData[]; props: ITableRowProps }[]>([
  {
    data: [
      { content: '1' },
      { content: 'EMAILEMAILEMAILEMAIL' },
      { content: 'EMAIL' },
      { content: 'EMAIL' },
      { content: 'EMAIL' },
      { content: 'EMAILEMAILEMAIL' },
      { content: 'EMAIL' },
      { content: 'EMAILEMAILEMAIL' },
      { content: 'EMAIL' }
    ],
    props: { id: 1, isSelected: false }
  },
  {
    data: [
      { content: '2' },
      { content: 'Select FilesSelect Files' },
      { content: 'Select Files' },
      { content: 'Select Files' },
      { content: 'EMAIL' },
      { content: 'Select Files' },
      { content: 'EMAILSelect Files' },
      { content: 'Select Files' },
      { content: 'EMAILSelect FilesSelect Files' }
    ],
    props: { id: 2, isSelected: false }
  }
])

const handleChangeTable = (ids: number) => {
  console.log(ids)

  // handle table with ids
}
</script>
