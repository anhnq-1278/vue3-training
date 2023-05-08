import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/base.css'
import './validation/index.ts'
// import the package
import VueAwesomePaginate from 'vue-awesome-paginate';

// import the necessary css file
import 'vue-awesome-paginate/dist/style.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)
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
