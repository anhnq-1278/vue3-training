import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker'

import './assets/main.css'
import '@/validators/Validator.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router).use(Notifications)
app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
