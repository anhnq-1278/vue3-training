<template>
  <div class="w-[800px] flex flex-col mx-auto">
    <h3
      class="text-center mx-auto px-4 py-0 my-5 overflow-hidden border-[2px] border-[#34465c] w-1/2 rounded-[10px] font-bold text-2xl text-[#34465c]"
    >
      Filter Name
    </h3>
    <div class="flex gap-10">
      <div class="flex-1 flex items-center justify-center flex-col">
        <div class="p-2.5 w-full text-white-f1 bg-[#596476] ct-scrollbar">Available columns</div>
        <div class="flex flex-col w-full overflow-y-auto h-[500px] ct-scrollbar">
          <CheckBox
            v-for="(item, index) in data"
            :key="index"
            :label="item.name"
            :modelValue="item.name"
            :id="index"
            :is-checked="isChecked(index)"
            @remove-selected-filter="removeSelectedFilter"
            @change-input="handleChangeInput($event, index)"
          />
        </div>
      </div>
      <div class="flex-1 items-center justify-center">
        <div class="p-2.5 w-full text-white-f1 bg-[#596476]">Selected columns</div>
        <div class="max-h-[500px] overflow-y-auto ct-scrollbar">
          <div
            class="flex items-center justify-between h-[60px] border mb-2 rounded-xl"
            v-for="(item, index) in filterCollection.filter"
            :key="index"
          >
            <p class="pl-2">{{ item }}</p>
            <RemoveFilter
              class="mr-2 cursor-pointer hover:scale-125"
              @click="removeSelectedFilter(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CheckBox from '@/components/common/Checkbox/Checkbox.vue'
import RemoveFilter from '@/components/icons/RemoveFilter.vue'
import { reactive, ref } from 'vue'

interface TCheckBox {
  name: string
}

const data = ref<Array<TCheckBox>>([
  {
    name: 'Number'
  },
  {
    name: 'Customer Number'
  },
  {
    name: 'ID'
  },
  {
    name: 'Description'
  },
  {
    name: 'Name 1'
  },
  {
    name: 'Name 2'
  },
  {
    name: 'Street'
  },
  {
    name: 'Postcode'
  },
  {
    name: 'City'
  },
  {
    name: 'Country'
  },
  {
    name: 'Formular'
  },
  {
    name: 'Previous Number'
  },
  {
    name: 'Acquisition Status'
  }
])

const filterCollection = ref<any>({
  filter: {}
})

function isChecked(index: any) {
  return !!filterCollection.value.filter[index]
}
function handleChangeInput(value: string, index: number) {
  if (filterCollection.value.filter[index]) {
    removeSelectedFilter(index)
  } else {
    filterCollection.value.filter[index] = value
  }
}

function removeSelectedFilter(index: number) {
  delete filterCollection.value.filter[index]
}
</script>
<style lang="scss" scoped></style>
