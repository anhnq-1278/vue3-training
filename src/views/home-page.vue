<template>
  <div class="flex flex-col justify-center items-center mt-20">
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
  </div>
</template>

<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'
import { ref } from 'vue'
import type { VueUploadItem } from 'vue-upload-component'
const files = ref<VueUploadItem[]>([])
const previewImg = ref('../../public/images/default.svg')

const handleChange = (file: VueUploadItem[]) => {
  files.value = file
}

const handleDelete = (id: string) => {
  files.value = files.value.filter((file) => file.id !== id)
}
</script>
