import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import webOne from './modules/webOne'
import webTwo from './modules/webTwo'
import webThree from './modules/webThree'
import webFour from './modules/webFour'
import webFive from './modules/webFive'
import webSix from './modules/webSix'
import webSeven from './modules/webSeven'
import webEight from './modules/webEight'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    webOne,
    webTwo,
    webThree,
    webFour,
    webFive,
    webSix,
    webSeven,
    webEight
  }
})
