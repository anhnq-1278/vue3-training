<template>
  <div class="w-[839px] mx-auto pt-10 flex gap-6">
    <VueDatePicker
      v-model="year"
      menu-class-name="dp-custom-menu"
      calendar-cell-class-name="dp-custom-cell"
      :enable-time-picker="false"
      :format="formatYear"
      @update:model-value="setYear"
      year-picker
      hide-input-icon
    >
      <template #action-row="{ closePicker, selectDate }">
        <div class="action-row flex items-center gap-2">
          <button
            class="w-[118px] h-[37px] rounded-[8px] text-[#1F2A37] border border-[#e5e7eb]"
            @click="closePicker"
          >
            キャンセル
          </button>
          <button
            class="w-[118px] h-[37px] rounded-[8px] text-white bg-[#1A56DB] border border-[#1A56DB]"
            @click="selectDate"
          >
            選択
          </button>
        </div>
      </template>
    </VueDatePicker>

    <VueDatePicker
      v-model="month"
      menu-class-name="dp-custom-menu"
      calendar-cell-class-name="dp-custom-cell"
      :enable-time-picker="false"
      :format="formatMonth"
      @update:model-value="setMonth"
      month-picker
      hide-input-icon
      disable-year-select
    >
      <template #action-row="{ closePicker, selectDate }">
        <div class="action-row flex items-center gap-2">
          <button
            class="w-[118px] h-[37px] rounded-[8px] text-[#1F2A37] border border-[#e5e7eb]"
            @click="closePicker"
          >
            キャンセル
          </button>
          <button
            class="w-[118px] h-[37px] rounded-[8px] text-white bg-[#1A56DB] border border-[#1A56DB]"
            @click="selectDate"
          >
            選択
          </button>
        </div>
      </template>
    </VueDatePicker>

    <VueDatePicker
      v-model="day"
      :day-names="['日', '月', '火', '水', '木', '金', '土']"
      :enable-time-picker="false"
      :format="formatDay"
      @update:model-value="setDay"
      calendar-class-name="dp-custom-calendar"
      calendar-cell-class-name="dp-custom-cell"
      hide-input-icon
    >
      <template #action-row="{ closePicker, selectDate }">
        <div class="action-row flex items-center gap-2">
          <button
            class="w-[118px] h-[37px] rounded-[8px] text-[#1F2A37] border border-[#e5e7eb]"
            @click="closePicker"
          >
            キャンセル
          </button>
          <button
            class="w-[118px] h-[37px] rounded-[8px] text-white bg-[#1A56DB] border border-[#1A56DB]"
            @click="selectDate"
          >
            選択
          </button>
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref } from 'vue'

const setDate = '1970-01-01'

const year = ref(new Date(setDate).getFullYear())
const month = ref({
  month: new Date(setDate).getMonth(),
  year: new Date(setDate).getFullYear()
})
const day = ref(new Date(setDate))

const formatYear = (date: Date) => {
  return date.getFullYear() + ''
}

const formatMonth = (date: Date) => {
  return date.getMonth() + 1 + ''
}

const formatDay = (date: Date) => {
  return date.getDate() + ''
}

const setYear = (value: number) => {
  year.value = value

  month.value = {
    month: 0,
    year: value
  }
}

const setMonth = (value: { month: number; year: number }) => {
  month.value = value
  year.value = value.year

  day.value = new Date(`${value.year}-${value.month + 1}-01`)
}

const setDay = (value: Date) => {
  year.value = value.getFullYear()
  month.value = {
    month: value.getMonth(),
    year: value.getFullYear()
  }

  day.value = value
}
</script>

<style lang="scss" scoped>
:deep(.dp__clear_icon) {
  display: none;
}

:deep(.dp__calendar_item) {
  width: 36px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  .dp-custom-cell {
    width: 36px;
    height: 30px;
  }
}

:deep(.dp-custom-menu) {
  .dp__calendar_header_separator {
    display: none;
  }

  .dp__month_year_row {
    height: 255px;
  }

  .dp__calendar {
    display: none;
  }
}
</style>
