<template>
  <div
    class="relative overflow-hidden transition-[0.3s]"
    @mouseleave="isShowToolTip = false"
    @mouseover="isShowToolTip = true"
  >
    <div ref="tooltip" @mouseover="handleMouserOver">
      <slot />
    </div>
    <div
      v-if="isShowToolTip"
      :style="tooltipStyle"
      class="block fixed w-max right-0 bg-[#666] translate-x-[-50%] text-whiteCt-fb rounded-[3px] px-2 py-[6px] z-[2] after:content-[''] after:absolute after:block after:h-2 after:w-2 after:bg-[#666] after:-bottom-1 after:left-1/2 after:translate-x-[-50%] after:rotate-45 before:content-[''] before:absolute before:-bottom-1 before:inset-x-0 before:h-1"
    >
      <slot name="description">{{ $attrs.description }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const isShowToolTip = ref<Boolean>(false)
const left = ref<number>(0)
const bottom = ref<number>(0)
const width = ref<number>(0)
const tooltip = ref<HTMLDivElement>()

const props = defineProps({
  fitContent: {
    type: Boolean,
    default: false
  }
})
const tooltipStyle = computed(() => {
  return {
    left: `${left.value}px`,
    bottom: `${bottom.value}px`,
    ...(props.fitContent && { width: `${width.value}px` })
  }
})

function handleMouserOver(e: MouseEvent) {
  if (tooltip.value) {
    left.value = e.clientX - e.offsetX + tooltip.value.clientWidth / 2
    bottom.value = window.innerHeight - e.clientY + e.offsetY + 3
    width.value = tooltip.value.clientWidth + 18
  }
}
</script>
<style lang="scss" scoped></style>
