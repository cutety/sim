import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import XLSX from "xlsx"
import './plugin/antui'
import './plugin/vc'
import './assets/css/style.css'
//引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(XLSX)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
