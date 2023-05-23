<template>
  <BaseModal :show="showModal" :width="width" v-bind="$attrs">
    <div class="p-4 pt-6 pr-8 pb-[14px] pl-6 border-t-[6px] border-blue-e8 rounded-t bg-white-fb">
      <div class="text-lg mb-8">Please choice your image!</div>
      <div class="flex flex-wrap my-4">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Select Image
        </label>

        <div class="mb-3 w-full">
          <input
            class="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            ref="fileInput"
            @change="getUploadedImage"
          />
          <span class="mt-1 text-red-500">{{ errorLocalValidate }}</span>
        </div>
        <div class="flex justify-center max-w-2xl">
          <Cropper
            ref="cropper"
            :src="uploadedImage"
            :stencil-props="{
              minAspectRatio: minAspectRatioProp.width / minAspectRatioProp.height,
              maxAspectRatio: maxAspectRatioProp.width / maxAspectRatioProp.height
            }"
          />
        </div>
      </div>
      <div class="flex justify-end gap-x-4">
        <button
          type="button"
          class="bg-indigo-200 px-3 py-1 font-medium rounded hover:bg-slate-400 hover:text-white-fb transition-all duration-1000"
          @click="closeModal"
        >
          Close
        </button>
        <button
          v-if="uploadedImage && !errorLocalValidate"
          type="button"
          class="bg-indigo-200 px-3 py-1 font-medium rounded hover:bg-slate-400 hover:text-white-fb transition-all duration-1000"
          @click="crop"
        >
          Crop Image
        </button>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '@/components/common/Modal/BaseModal.vue'
import { onBeforeMount, ref, type PropType } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const fileInput = ref<any>(null)
const cropper = ref<any>(null)
const uploadedImage = ref<string | null>(null)
const croppedImageData = ref<any>({
  file: null,
  imageUrl: null
})

const errorLocalValidate = ref<string>('')

interface ICopper {
  width: number
  height: number
}

const props = defineProps({
  minAspectRatioProp: {
    type: Object as PropType<ICopper>,
    default: () => ({})
  },
  maxAspectRatioProp: {
    type: Object as PropType<ICopper>,
    default: () => ({})
  },
  showModal: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '640px'
  },
  acceptFileType: {
    type: Array,
    default: () => []
  }
})

function getUploadedImage(e: Event) {
  const { files } = e.target as HTMLInputElement
  if (validateFileUpload(files)) {

    return
  }

  if (files && files[0]) {
    uploadedImage.value = URL.createObjectURL(files[0])
  }
}

function validateFileUpload(fileData: any) {
  const maxFileSize = 1 * 1024 * 1024
  let hasError = false
  const file = fileData[0]
  const fileType = fileData[0].name.toLowerCase().split('.').pop()
  const fileSize = parseInt(fileData[0].size)

  if (!file) return false

  if (!props.acceptFileType.includes(fileType)) {
    errorLocalValidate.value = 'Please choose image formats such as jpeg, jpg, png'

    hasError = true
  }

  if (fileSize >= maxFileSize) {
    errorLocalValidate.value = 'Please select files smaller than 1MB'

    hasError = true
  }

  return hasError
}

const emit = defineEmits<{
  (e: 'close-modal'): void
  (e: 'on-submit'): void
  (e: 'cropped-image-data', data: any): void
}>()

function closeModal() {
  if (uploadedImage.value) {
    URL.revokeObjectURL(uploadedImage.value)
  }
  resetErrorMessage()
  emit('close-modal')
}
async function crop() {
  const { canvas } = cropper.value.getResult()

  croppedImageData.imageUrl = canvas.toDataURL()

  const blobPromise = new Promise<Blob>((resolve) => {
    canvas.toBlob((blob: any) => resolve(blob))
  })
  const blob = await blobPromise
  const newFile = new File([blob], 'newImageCrop.jpg', { type: 'image/jpeg' })
  croppedImageData.file = newFile

  resetErrorMessage()
  emit('cropped-image-data', croppedImageData)
  emit('close-modal')
}

function resetErrorMessage() {
  errorLocalValidate.value = ''
}

onBeforeMount(() => {
  if (uploadedImage.value) {
    URL.revokeObjectURL(uploadedImage.value)
  }
})
</script>
