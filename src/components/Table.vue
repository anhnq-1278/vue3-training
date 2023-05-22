<template>
  <div class="flex flex-col table">
    <div class="p-1.5 w-full inline-block align-middle">
      <div class="border rounded-lg tables" :class="wrapperClassName">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th v-if="hasSelect" scope="col" class="py-3 pl-4">
                <div class="flex items-center h-5">
                  <input
                    v-model="isCheckAll"
                    id="checkbox-all"
                    type="checkbox"
                    class="text-blue-600 border-gray-900 rounded focus:ring-blue-500 cursor-pointer"
                    @change="handleCheckAll"
                  />
                  <label for="checkbox" class="sr-only"> Checkbox </label>
                </div>
              </th>
              <th
                v-for="(header, index) in headers"
                :key="index"
                scope="col"
                class="px-6 py-4 text-left uppercase bg-gray-50"
              >
                <div :class="header.class">
                  <Typography size="base" weight="bold" :text="header.name" class="text-gray-500" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="row in rows" :key="row.props.id">
              <td v-if="hasSelect" class="py-3 pl-4">
                <div class="flex items-center h-5">
                  <input
                    v-model="row.props.isSelected"
                    type="checkbox"
                    class="text-blue-600 border-gray-200 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label for="checkbox" class="sr-only"> Checkbox </label>
                </div>
              </td>
              <td v-for="(data, index) in row.data" :key="index" class="px-6 py-4">
                <div :class="data.class">
                  <Typography
                    size="base"
                    weight="regular"
                    :text="data.content"
                    class="text-[#111928]"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import Typography from './Typography.vue'

export interface ITableRowProps {
  id: number
  isDisabled?: boolean
  onClick?: () => void
  isSelected: boolean
}

export interface ITableRowData {
  content: string
  class?: string
}

const props = defineProps({
  rows: { type: Array<{ data: ITableRowData[]; props: ITableRowProps }>, default: [] },
  headers: { type: Array<{ name: string; class?: string }>, default: [] },
  hasSelect: { type: Boolean, default: true },
  wrapperClassName: { type: String, default: '' }
})

const emits = defineEmits(['change'])

const rows = ref(props.rows)
const headers = ref(props.headers)
const hasSelect = ref(props.hasSelect)
const wrapperClassName = ref(props.wrapperClassName)
const isCheckAll = ref(false)

const selectedIds = computed(() =>
  rows.value.filter((row) => row.props.isSelected).map((row) => row.props.id)
)

const handleCheckAll = () => {
  rows.value = rows.value.map((row) => ({
    ...row,
    props: {
      ...row.props,
      isSelected: isCheckAll.value
    }
  }))
}

watchEffect(() => {
  emits('change', selectedIds.value)
})

watchEffect(() => {
  isCheckAll.value = selectedIds.value.length === rows.value.length
})
</script>

<style scoped>
.table .tables::-webkit-scrollbar {
  width: 1em;
  height: 4px;
}

.table .tables::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.table .tables::-webkit-scrollbar-thumb {
  background-color: #90a4ae;
  border-radius: 8px;
  background-clip: padding-box;
  outline: 1px solid rgb(145, 150, 155);
}
</style>
