<template>
  <div class="flex w-[1140px] mx-auto flex-col justify-center">
    <p class="mx-auto mt-[60px] text-[3rem]">Profile</p>
    <p class="mx-auto mt-2.5 text-xl">I'm a creative FE webdeveloper</p>
    <div class="my-[60px] relative">
      <div
        v-if="isEdit"
        class="absolute right-0 top-0 z-10 cursor-pointer"
        @click.stop="emit('openModal')"
      >
        <EditIcon />
      </div>
      <div class="flex w-full items-center shadow-[0_1px_8px_rgba(102,102,102,0.2)]">
        <div class="flex-1">
          <div class="p-[30px]">
            <p class="text-xl">About me</p>
            <p class="break-all mt-5 leading-[2]">
              I am an allround web developer. I am a senior programmer with good knowledge of
              front-end techniques. Vitae sapien pellentesque habitant morbi tristique senectus et.
              Aenean sed adipiscing diam donec adipiscing tristique risus.
            </p>
          </div>
        </div>
        <div class="flex-1">
          <div class="p-[30px] flex justify-center items-center">
            <img
              v-if="props.user.avatar"
              :src="props.user.avatar"
              alt="avt"
              class="w-[240px] h-[240px] rounded-[50%]"
            />
            <div v-else class="w-[240px] h-[240px] rounded-[50%] overflow-hidden bg-[#b8c3d4]" />
          </div>
        </div>
        <div class="flex-1">
          <div class="p-[30px]">
            <p class="text-xl">Details</p>
            <div class="flex flex-col gap-2 mt-5">
              <p class="font-bold">Email:</p>
              <p>{{ props.user.email }}</p>
              <p class="font-bold">Name:</p>
              <p>{{ props.user.name }}</p>
              <p class="font-bold">Location:</p>
              <p>{{ props.user.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import EditIcon from '@/components/icons/edit-icon.vue'
import type { TResAccount } from '@/type/Common'
import type { PropType } from 'vue'

const props = defineProps({
  user: {
    type: Object as PropType<TResAccount>,
    default: () => ({})
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'openModal'): void
}>()
</script>

<style scoped></style>
