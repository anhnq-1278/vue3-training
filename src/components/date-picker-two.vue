<template>
  <div class="flex gap-3">
    <list-option
      :list-option="listYear"
      :display-item="birthdayValue.year"
      @change-value="onChangeYear"
    />
    <list-option
      :list-option="listMonth"
      :display-item="birthdayValue.month"
      @change-value="onChangeMonth"
    />
    <list-option
      :list-option="listDay"
      :display-item="birthdayValue.day"
      @change-value="onChangeDay"
    />
    <VueDatePicker
      v-model="day"
      :day-names="['日', '月', '火', '水', '木', '金', '土']"
      :enable-time-picker="false"
      @update:model-value="setDay"
      calendar-class-name="dp-custom-calendar"
      calendar-cell-class-name="dp-custom-cell"
      position="left"
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
import { ref, onBeforeMount, reactive, watch } from 'vue'
import listOption from '@/components/list-option.vue'
import VueDatePicker from '@vuepic/vue-datepicker'

const listYear = ref<Array<{ name: number; label: string }>>([])
const listMonth = ref<Array<{ name: number; label: string }>>([])
const listDay = ref<Array<{ name: number; label: string }>>([])

const MAX_YEAR = 2030
const MIN_YEAR = 1980

const birthdayValue = reactive({
  year: MIN_YEAR,
  month: 1,
  day: 1
})

const day = ref(new Date(`${birthdayValue.year}-${birthdayValue.month}-${birthdayValue.day}`))

onBeforeMount(() => {
  setListYear(MIN_YEAR, MAX_YEAR)
  setListMonth()
  setListDay()
})

const onChangeYear = (value: any) => {
  birthdayValue.year = value.name

  setListMonth()
  setListDay()
}

const onChangeMonth = (value: any) => {
  birthdayValue.month = value.name

  if (value.name === 2) {
    let totalDay = new Date(birthdayValue.year, birthdayValue.month, 0).getDate()

    birthdayValue.day = totalDay
    day.value = new Date(birthdayValue.year, birthdayValue.month, birthdayValue.day)
  }

  setListDay()
}

const onChangeDay = (value: any) => {
  birthdayValue.day = value.name
}

const setListYear = (minYear: number, maxYear: number) => {
  for (let i = minYear; i <= maxYear; i++) {
    listYear.value.push({
      name: i,
      label: i + ''
    })
  }
}

const setListMonth = () => {
  listMonth.value = []
  let totalMonth = 12

  for (let i = 1; i <= totalMonth; i++) {
    const label = i < 10 ? `0${i}` : `${i}`

    listMonth.value.push({
      name: i,
      label
    })
  }
}

const setListDay = () => {
  listDay.value = []
  let totalDay = new Date(birthdayValue.year, birthdayValue.month, 0).getDate()

  for (let i = 1; i <= totalDay; i++) {
    const label = i < 10 ? `0${i}` : `${i}`

    listDay.value.push({
      name: i,
      label
    })
  }
}

const setDay = (value: Date) => {
  day.value = value

  birthdayValue.year = value.getFullYear()
  birthdayValue.month = value.getMonth() + 1
  birthdayValue.day = value.getDate()
}

watch(birthdayValue, (value) => {
  day.value = new Date(`${value.year}-${value.month}-${value.day}`)
})
</script>

<style lang="scss" scoped>
:deep(.dp__clear_icon) {
  display: none;
}

:deep(.dp__input_reg) {
  display: none;
}

:deep(.dp__theme_light) {
  margin-top: 20px;
  width: fit-content;
}

:deep(.dp__menu_transitioned) {
  left: -112px !important;
}
</style>
