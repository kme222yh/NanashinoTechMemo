import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Axios from 'axios'
window.axios = Axios

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
