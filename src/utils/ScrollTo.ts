import type { Ref } from 'vue'
import { nextTick } from 'vue'

//Distance props represents the distance from the element to the header.
export default (ref: Ref, distance = 0) => {
  //Padding of fixed header
  const PADDING_TOP = 60

  nextTick(() => {
    const top = ref.value.getBoundingClientRect().y + window.scrollY - PADDING_TOP - distance

    window.scrollTo({ top, behavior: 'smooth' })
  })
}
