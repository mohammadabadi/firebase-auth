import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 

import * as BootstrapVueNext from 'bootstrap-vue-next'


const app = createApp(App)
app.use(store)
app.use(router)
// Global registration
for (const [key, component] of Object.entries(BootstrapVueNext)) {
  if (key.startsWith('B')) app.component(key, component)
}
app.mount('#app')