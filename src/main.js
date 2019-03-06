import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/plugins/mint-ui'
import '@/plugins/axios'
import './mock'
import '@/assets/font/iconfont.css'
import './main.css'
import '@/components/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
