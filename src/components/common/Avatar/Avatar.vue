<template>
  <div class="flex items-center">
    <div v-if="!img" :class="[avatarPlaceholderWrapperClasses]">
      <div class="w-full h-full text-gray-400 flex items-center justify-center">No image</div>
    </div>
    <img v-else :class="[avatarClasses]" :src="img" :alt="alt" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import classNames from 'classnames'

const props = defineProps({
  alt: {
    type: String,
    default: 'Avatar'
  },
  bordered: {
    type: Boolean,
    default: false
  },
  img: {
    type: String,
    default: ''
  },
  rounded: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: '80px'
  }
})

const avatarBorderedClasses = 'ring-2 ring-gray-300 p-1'

const avatarTypeClasses = {
  default: 'rounded',
  rounded: 'rounded-full'
}

const avatarPlaceholderWrapperDefaultClasses = 'overflow-hidden bg-gray-100'

const avatarClasses = computed<string>(() => {
  const size = `w-[${props.size}] h-[${props.size}]`

  return classNames(
    size,
    avatarTypeClasses[props.rounded ? 'rounded' : 'default'],
    props.bordered ? avatarBorderedClasses : ''
  )
})

const avatarPlaceholderWrapperClasses = computed<string>(() => {
  const size = `w-[${props.size}] h-[${props.size}]`

  return classNames(
    avatarPlaceholderWrapperDefaultClasses,
    size,
    avatarTypeClasses[props.rounded ? 'rounded' : 'default']
  )
})
</script>
