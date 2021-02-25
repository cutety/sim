import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import './plugin/antui'
import './assets/css/style.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuex)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
