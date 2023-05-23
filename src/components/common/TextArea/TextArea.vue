<template>
  <div
    class="text-area-input relative  border rounded overflow-y-hidden outline-none min-h-[60px] border-grey-db text-red-400"
    :class="{
      focus: isFocused && showOutline,
      '!border-red-500': errorMessage
    }"
    tabindex="-1"
  >
    <textarea
      ref="textarea"
      class="textarea text-sm overflow-hidden w-full h-full z-10 break-words align-baseline cursor-auto absolute resize-none m-0 outline-none placeholder:text-sm placeholder:text-grey-bf"
      v-bind="$attrs"
      :class="dynamicTextareaClass"
      :placeholder="placeholder"
      :disabled="disabled"
      :name="name"
      v-model="inputValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @paste="onPaste"
    />
    <div
      ref="clone"
      class="w-full border-0 max-h-full whitespace-breakword px-[10px] py-[9px]"
      :class="defaultTextareaClass"
    ></div>
  </div>
  <div class="min-h-[30px]" v-if="!!errorMessage" >
    <p class="text-sm ml-3 text-red-700 italic mt-[2px]">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },

  placeholder: {
    type: String,
    default: ''
  },

  disabled: {
    type: Boolean,
    default: false
  },

  textareaClass: {
    type: [String, Array, Object],
    default: ''
  },

  hasError: {
    type: Boolean,
    default: false
  },

  showOutline: {
    type: Boolean,
    default: true
  }
})

const isFocused = ref(false)
const allowScrolling = ref(false)
const textarea = ref<HTMLTextAreaElement>()
const clone = ref<HTMLTextAreaElement>()

onMounted(() => {
  updateSize()
})

const { value: inputValue, errorMessage } = useField(props.name, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: false
})

const defaultTextareaClass = computed(() => props.textareaClass || 'textarea-style')

const dynamicTextareaClass = computed(() => {
  const dynamicClassesObject: { [key: string]: boolean }  = {
    'overflow-auto': allowScrolling.value
  }
  const dynamicClassesArray = Object.keys(dynamicClassesObject).filter(
    (key) => dynamicClassesObject[key]
  )
  const dynamicClassesString = dynamicClassesArray.join(' ')

  if (typeof defaultTextareaClass.value === 'string') {
    return defaultTextareaClass.value + ' ' + dynamicClassesString
  }
  if (Array.isArray(defaultTextareaClass.value)) {
    return [...defaultTextareaClass.value, ...dynamicClassesArray]
  }
  if (typeof defaultTextareaClass.value === 'object') {
    return {
      ...defaultTextareaClass.value,
      ...dynamicClassesObject
    }
  }

  return defaultTextareaClass.value
})

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}

function onInput() {
  updateSize()
}

function onPaste() {
  updateSize()
}

function updateSize() {
  cloneTextareaContentToCloneDiv()
  fixScrolling()
}

function cloneTextareaContentToCloneDiv() {
  if (!textarea.value || !clone.value) return


  const lines = textarea.value.value.split('\n')
  const safeLines = lines.map((line: string) => line.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
  const linesWithFixedEmptyLines = safeLines.map((line: string) => (line === '' ? '&nbsp;' : line))
  const linesAsHTML = linesWithFixedEmptyLines
    .map((line: string) => '<div class="line">' + line + '</div>')
    .join('')
  clone.value.innerHTML = linesAsHTML
}

function fixScrolling() {
  if (!textarea.value) return

  const textareaComputedStyles = window.getComputedStyle(textarea.value)

  const hasMaxHeightSet = textareaComputedStyles.getPropertyValue('max-height') !== 'none'
  if (hasMaxHeightSet) {
    const scrollHeight = textarea.value.scrollHeight
    const height = Number.parseInt(textareaComputedStyles.getPropertyValue('height'))
    const isContentOverflown = height < scrollHeight
    allowScrolling.value = isContentOverflown
  }
}

watch(
  () => props.value,
  () => {
    nextTick(() => {
      updateSize()
    })
  }
)
</script>

<style scoped lang="scss">
.textarea-style {
  padding: 5px 10px 5px 10px;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}
</style>
