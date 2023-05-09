<template>
  <Combobox v-model="selected">
    <div class="relative mt-1">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none"
      >
        <ComboboxInput
          class="w-full border-none pl-3 pr-10 leading-5 text-gray-900 focus:outline-none h-[32px] text-base"
          placeholder="Search user"
          @change="searchUser($event)"
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
            v-if="userSearchList.length === 0"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="person in userSearchList"
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
              @click="getUserDetail(person._id)"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ person.name }}
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
import { ref } from 'vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import type { TSearchUser } from '@/model/User'
import { useRouter } from 'vue-router'
import { RouterName } from '@/router/constant'

const props = defineProps({
  userSearchList: {
    type: Array<TSearchUser>,
    default: () => []
  }
})

const router = useRouter()

const emit = defineEmits<{
  (e: 'searchUser', q: string): void
}>()

let selected = ref<any>({})
let query = ref<string>('')

function searchUser(e: Event) {
  query.value = (e.target as HTMLInputElement).value
  emit('searchUser', query.value)
}

function getUserDetail(id: string) {
  const routerData = router.resolve({ name: RouterName.UserDetail, params: { id } })
  window.open(routerData.href, '_blank')
}
</script>
<style lang="scss" scoped></style>
