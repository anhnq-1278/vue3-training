import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

export function useDimension() {
  const element = ref()
  const functionRef = (el: any) => {
    element.value = el
  }
  const observer = shallowRef()

  onMounted(() => {
    observer.value = new ResizeObserver((entries) => {
      element.value.textContent = entries[0].contentRect.width
    })
    observer.value.observe(element.value)
  })

  onBeforeUnmount(() => {
    observer.value.disconnect()
  })

  return functionRef
}
