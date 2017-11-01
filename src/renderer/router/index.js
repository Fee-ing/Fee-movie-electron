import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/one', component: resolve => require(['../views/one/index'], resolve)
  }, {
    path: '/two', component: resolve => require(['../views/two/index'], resolve)
  }, {
    path: '/three', component: resolve => require(['../views/three/index'], resolve)
  }, {
    path: '/four', component: resolve => require(['../views/four/index'], resolve)
  }, {
    path: '/five', component: resolve => require(['../views/five/index'], resolve)
  }, {
    path: '/six', component: resolve => require(['../views/six/index'], resolve)
  }, {
    path: '/seven', component: resolve => require(['../views/seven/index'], resolve)
  }, {
    path: '/eight', component: resolve => require(['../views/eight/index'], resolve)
  }, {
    path: '/', redirect: '/one'
  }, {
    path: '*', redirect: '/one'
  }]
})

export default router
