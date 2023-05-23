import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router'

import './assets/main.css'
const app = createApp(App)

import loadimage from '../public/images/loading.gif'

app.use(createPinia())
app.use(router)

app.use(VueLazyload, {
  loading: loadimage,
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.5
  }
})

app.mount('#app')
