import type { ObjectDirective } from 'vue'

interface HTMLElementWithVueClickEventHandler extends HTMLElement {
  __vueClickEventHandler__?: (event: MouseEvent) => void
}

const vClickOutside: ObjectDirective<HTMLElementWithVueClickEventHandler> = {
  beforeMount(el, binding) {
    const ourClickEventHandler = (event: MouseEvent) => {
      if (!el.contains(event.target as Node) && el !== event.target) {
        if (binding.value) {
          binding.value(event)
        }
      }
    }

    el.__vueClickEventHandler__ = ourClickEventHandler

    document.addEventListener('click', ourClickEventHandler as EventListener)
  },
  unmounted(el) {
    document.removeEventListener('click', el.__vueClickEventHandler__ as EventListener)
  }
}

export default vClickOutside
