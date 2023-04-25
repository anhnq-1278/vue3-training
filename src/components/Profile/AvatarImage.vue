<template>
  <div class="flex items-center gap-x-2">
    <div v-if="hasShowImage" class="flex items-center gap-4">
      <img :src="avatar" alt="image" class="w-32 h-32 rounded-full object-cover" />
    </div>
    <div v-else class="w-32 h-32 rounded-full bg-blue-e8 flex items-center justify-center">
      No image
    </div>

    <div @click="choiceFile" class="flex items-center cursor-pointer p-2 border">
      <UploadIcon /> <span>Upload image</span>
    </div>
  </div>
  <CropperModal
    :acceptFileType="acceptFileType"
    :showModal="showModal"
    :minAspectRatioProp="{ width: 16, height: 9 }"
    :maxAspectRatioProp="{ width: 16, height: 9 }"
    @close-modal="closeCropperModal"
    @cropped-image-data="handleGetCropperImage"
    width="640px"
  />
</template>
<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue'
import UploadIcon from '@/components/icons/UploadIcon.vue'
import CropperModal from '@/components/Profile/CropperModal.vue'

interface IFile {
  name: string
  url: string
}

const emit = defineEmits<{
  (e: 'close-modal'): void
  (e: 'on-submit'): void
  (e: 'cropped-image-data', data: any): void
}>()

const showModal = ref<boolean>(false)

function choiceFile() {
  showModal.value = true
}

function handleGetCropperImage(dataCropperImage: any) {
  emit('cropped-image-data', dataCropperImage)
}

function closeCropperModal() {
  showModal.value = false
}

const hasShowImage = computed(() => {
  return !!props.avatar
})

const props = defineProps({
  acceptFileType: {
    type: Array,
    default: () => []
  },
  avatar: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped></style>
