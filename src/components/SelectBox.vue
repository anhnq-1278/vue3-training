<template>
  <div class="w-full">
    <Listbox v-model="selectedPerson">
      <div class="relative mt-1">
        <!-- <Input name="selectbox" model-value="selectedPerson.name"/> -->
        <ListboxButton
          class="bg-gray-50 border border-solid border-gray-300 text-gray-500 text-sm rounded-lg block w-full px-4 py-2 focus:outline-none focus-visible:gray-300 placeholder:text-[#b1b5bd] disabled:bg-gray-300 disabled:text-black"
        >
          <span class="block truncate">{{ selectedPerson.name }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <img src="/images/caret_down.svg" className="h-5 w-5" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in people"
              :key="person.name"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-gray-200' : 'text-gray-500',
                  'relative cursor-default select-none py-2 pl-10 pr-4'
                ]"
              >
                <span
                  :class="[selected ? 'text-base font-bold' : 'font-regular', 'block truncate']"
                  >{{ person.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <!-- <CheckIcon class="h-5 w-5" aria-hidden="true" /> -->
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' }
]
const selectedPerson = ref(people[0])
</script>
