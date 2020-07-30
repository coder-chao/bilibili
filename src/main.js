import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vant from 'vant'
import 'vant/lib/index.css';
import http from '../http'
import {Toast} from 'vant'
import '@/assets/style.css'

Vue.prototype.$http = http
Vue.prototype.$msg = Toast

Vue.use(vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
