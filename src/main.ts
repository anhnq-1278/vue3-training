import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

import vClickOutside from '@/directives/clickOutside'

import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker'
import './validation'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Notifications)
  .component('VueDatePicker', VueDatePicker)
  .directive('click-outside', vClickOutside)
  .mount('#app')
