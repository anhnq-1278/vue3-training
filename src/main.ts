import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/base.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
let handleClickedOutside: EventListener;
app.directive('clickOutside', {
  mounted(el, binding, vnode) {
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
});

app.mount('#app')
