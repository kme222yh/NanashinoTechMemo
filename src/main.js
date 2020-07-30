import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from 'axios'
window.axios = Axios

Vue.config.productionTip = false


window.home_url = document.getElementsByName('home_url')[0].content


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
