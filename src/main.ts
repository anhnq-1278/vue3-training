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
import vClickOutside from './directives/ClickOutside'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)
app.directive('clickOutside', vClickOutside);

app.mount('#app')
