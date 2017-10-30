import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/one', component: require('../views/one/index')
  }, {
    path: '/two', component: require('../views/two/index')
  }, {
    path: '/three', component: require('../views/three/index')
  }, {
    path: '/four', component: require('../views/four/index')
  }, {
    path: '/five', component: require('../views/five/index')
  }, {
    path: '/six', component: require('../views/six/index')
  }, {
    path: '/seven', component: require('../views/seven/index')
  }, {
    path: '/eight', component: require('../views/eight/index')
  }, {
    path: '/search', component: require('../views/search/index')
  }, {
    path: '/', redirect: '/one'
  }, {
    path: '*', redirect: '/one'
  }]
})

export default router
