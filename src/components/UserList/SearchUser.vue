<template>
  <Combobox v-model="selected">
    <div class="relative mt-1">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none"
      >
        <ComboboxInput
          class="w-full border-none pl-3 pr-10 leading-5 text-gray-900 focus:outline-none h-[32px] text-base"
          placeholder="Search user"
          @change="query = $event.target.value"
        />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <SearchIcon class="h-5 w-5 text-gray-400" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="bg-grey-f8 z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredUserList.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="person in filteredUserList"
            as="template"
            :key="person._id"
            :value="person"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-blue-e8 text-white': active,
                'text-gray-900': !active
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ person.username }}
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>
<script lang="ts" setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'
import { computed, ref } from 'vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import type { TSearchUser } from '@/model/User'

const props = defineProps({
  userSearchList: {
    type: Array<TSearchUser>,
    default: () => []
  }
})

let selected = ref<any>({})
let query = ref<string>('')

let filteredUserList = computed(() =>
  query.value === ''
    ? props.userSearchList
    : props.userSearchList.filter((person) =>
        person.username
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
</script>
<style lang="scss" scoped></style>
