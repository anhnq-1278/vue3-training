let handleClickedOutside: EventListener;
const vClickOutsite = {
  mounted(el: any, binding: any, vnode: any) {
    handleClickedOutside = function (event: any) {
      if (!el.contains(event.target)) {
        binding.value();
      }
    };
    document.body.addEventListener('mousedown', handleClickedOutside);
  },
  unmounted() {
    document.body.removeEventListener('mousedown', handleClickedOutside);
  }
}

export default vClickOutsite;
