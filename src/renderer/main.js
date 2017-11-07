import Vue from 'vue'

import VueLazyload from 'vue-lazyload'

import App from './App'
import router from './router'
import store from './store'

import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/css/main.css'

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.33,
  error: 'dist/error.png',
  loading: 'dist/loading.png',
  attempt: 1
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
