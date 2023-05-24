<script lang="ts" setup>
import DropDown from '@/components/common/DropDown/DropDown.vue'
import Button from '@/components/common/Button/Button.vue'
import SearchIconBtn from '@/components/icons/SearchIconBtn.vue'
import Input from '@/components/common/InputText/InputTextCp.vue'

const options2: { value: string; label: string }[] = [
  {
    value: 'option1',
    label: '1'
  },
  {
    value: 'option1',
    label: '2'
  },
  {
    value: 'option1',
    label: '3'
  },
  {
    value: 'option1',
    label: '4'
  },
  {
    value: 'option1',
    label: '5'
  },
  {
    value: 'option1',
    label: '6'
  },
  {
    value: 'option1',
    label: '7'
  },
  {
    value: 'option2',
    label: '8'
  }
]
</script>
<template>
  <div class="flex gap-4">
    <div class="w-[232px]">
      <Input title="氏名" name="name" placeholder="入力してください" />
    </div>
    <div class="w-[165px]">
      <span class="mb-2 block">所属</span>
      <DropDown placeholder="選択してください" :list-option="options2" />
    </div>
    <div class="w-[165px]">
      <span class="mb-2 block">職位</span>
      <DropDown placeholder="選択してください" :list-option="options2" />
    </div>
  </div>
  <div class="btn flex gap-x-4 mt-[17px]">
    <Button :icon="SearchIconBtn" variant="primary" :text="'検索'" class="w-[95px]" />
    <Button variant="rounded-default" :text="'クリア'" class="w-82" />
  </div>
</template>
