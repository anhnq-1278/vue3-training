<template>
  <div class="w-full mb-5 xl:mb-0 mt-10">
    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div class="block w-full overflow-x-auto">
        <table class="items-center bg-transparent w-full border-collapse">
          <thead>
            <tr>
              <th
                v-for="(item, index) in columns"
                :key="index"
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                {{ item }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in dataUsers"
              :key="user._id"
              class="border-b border-gray-200 last:border-transparent"
            >
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <img
                  :src="
                    user.avatar ||
                    'http://res.cloudinary.com/db54xeaer/image/upload/v1679297925/ujagfxv9w4lt47evy2gi.jpg'
                  "
                  alt="avatar"
                  class="w-[50px] h-[50px] rounded-full"
                />
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{ user.name }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{ user.email }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{ user.phone }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{ user.address }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <nav class="mt-[-10px]">
      <ul class="flex justify-center w-full">
        <li>
          <div
            @click="onPrevious"
            class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          >
            Previous
          </div>
        </li>
        <li v-for="n in dataMeta.totalPage" :key="n">
          <div
            @click="emit('change-page', n)"
            :class="[
              `px-3 py-2 leading-tight  border border-gray-300  cursor-pointer
              ${
                n == dataMeta.page
                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-500 cursor-default'
                  : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
              }`
            ]"
          >
            {{ n }}
          </div>
        </li>
        <li>
          <div
            class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            @click="onNext"
          >
            Next
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import type { TDataUser, TMeta } from '@/model/Account'
const props = defineProps({
  dataUsers: {
    type: Array<TDataUser>,
    default: () => []
  },
  dataMeta: {
    type: Object as PropType<TMeta>,
    default: () => ({})
  }
})

const columns = ['Avatar', 'Name', 'Email', 'Phone Number', 'Address']

const emit = defineEmits<{
  (e: 'change-page', value: number): void
}>()

const onNext = () => {
  if (props.dataMeta.page === props.dataMeta.totalPage) return

  emit('change-page', props.dataMeta.page + 1)
}

const onPrevious = () => {
  if (props.dataMeta.page === 1) return

  emit('change-page', props.dataMeta.page - 1)
}
</script>
