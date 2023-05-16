<template>
  <div class="example-drag">
    <Transition name="slide-fade" mode="out-in">
      <img
        :key="previewImg"
        style="width: 430px; height: 284px"
        :src="previewImg"
        alt="preview"
        class="object-cover"
      />
    </Transition>
    <div class="upload">
      <TransitionGroup
        name="list"
        tag="ul"
        class="flex flex-wrap gap-2 justify-center mt-4 max-w-[430px]"
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
        <li>
          <div class="text-center px-2 py-3 border-dashed border-2 border-gray-200 rounded">
            <h4>Drop files to upload<br />or</h4>
            <label for="file" class="cursor-pointer">Select Files</label>
          </div>
        </li>
      </TransitionGroup>

      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>Drop files to upload</h3>
      </div>

      <div class="example-btn">
        <vue-upload-component
          ref="upload"
          v-model="files"
          :accept="accept"
          :multiple="multiple"
          :drop="drop"
          @input-filter="inputFilter"
        />
      </div>
    </div>
    <p v-if="errorMesssage" class="text-red-700 text-center">
      {{ errorMesssage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import VueUploadComponent from 'vue-upload-component'
import type { VueUploadItem } from 'vue-upload-component'
import { ref } from 'vue'
import { getBytesSize } from '@/utils/getBytesSize'

const props = defineProps({
  accept: { type: String, default: 'image/png,image/jpeg,image/jpg,image/webp' },
  multiple: { type: Boolean, default: true },
  drop: { type: Boolean, default: true },
  maxSize: { type: String, default: '2MB' }
})

const accept = ref(props.accept)
const multiple = ref(props.multiple)
const drop = ref(props.drop)
const maxSize = ref(props.maxSize)
const errorMesssage = ref('')
const files = ref<VueUploadItem[]>([])
const previewImg = ref('../../public/images/default.svg')

const inputFilter = (newFile: VueUploadItem, oldFile: VueUploadItem, prevent: () => void) => {
  if (newFile && !oldFile) {
    const extFile = accept.value?.replace(/image\//g, '').replace(/,/g, '|')

    const regex = new RegExp(`.(${extFile})$`, 'i')

    if (!regex.test(newFile.name!)) {
      errorMesssage.value = `The files must be a file of type: ${extFile.replace(/\|/g, ', ')}`

      return prevent()
    }

    console.log(newFile.size, getBytesSize(maxSize.value))

    if (newFile.size && newFile.size > getBytesSize(maxSize.value)!) {
      errorMesssage.value = `Image should be less than ${maxSize.value}`

      return prevent()
    }

    errorMesssage.value = ''

    newFile.blob = ''
    let URL = window.URL || window.webkitURL
    if (URL && URL.createObjectURL) {
      newFile.blob = URL.createObjectURL(newFile.file!)
    }
  }
}
</script>

<style>
.example-drag label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}

.example-drag .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}

.example-drag .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
