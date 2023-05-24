<template>
  <div class="w-full flex gap-6">
    <VueDatePicker
      menu-class-name="dp-custom-menu"
      calendar-cell-class-name="dp-custom-cell"
      v-model="year"
      :enableTimePicker="false"
      year-picker
      :format="formatYear"
      hide-input-icon
      @update:model-value="setYear"
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
      menu-class-name="dp-custom-menu"
      calendar-cell-class-name="dp-custom-cell"
      v-model="month"
      :enableTimePicker="false"
      month-picker
      :format="formatMonth"
      @update:model-value="setMonth"
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
      v-model="day"
      :day-names="['日', '月', '火', '水', '木', '金', '土']"
      :enable-time-picker="false"
      :format="formatDay"
      @update:model-value="setDay"
      calendar-class-name="dp-custom-calendar"
      calendar-cell-class-name="dp-custom-cell"
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
<script lang="ts" setup>
import { ref } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'

const initDate = '1990-01-01'
const day = ref(new Date(initDate))
const month = ref({
  month: new Date(initDate).getMonth(),
  year: new Date(initDate).getFullYear()
})

const year = ref(new Date(initDate).getFullYear())

const formatYear = (day: Date) => {
  return day.getFullYear() + ''
}

const formatMonth = (date: Date) => {
  return date.getMonth() + 1 + ''
}

const formatDay = (date: Date) => {
  return date.getDate() + ''
}

function setYear(value: number) {
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
:deep(.dp-custom-menu) {
  .dp__calendar_header_separator {
    display: none;
  }
  .dp__month_year_row {
    height: 250px;
  }
  .dp__calendar {
    display: none;
  }
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
</style>
