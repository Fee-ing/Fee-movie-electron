import * as types from './mutation-types'

const mutations = {
  [types.CHANGE_WEBITEM] (state, newItem) {
    state.title = ''
    state.webItem = newItem
  },
  [types.CHANGE_TITLE] (state, title) {
    state.title = title
  },
  [types.CHANGE_ISLOAD] (state, bol) {
    state.isLoad = bol
  },
  [types.CHANGE_ROTATEDEG] (state, deg) {
    state.rotateDeg = deg
  },
  [types.CHANGE_KEYWORDS] (state, data) {
    state.keywords = data
  },
  [types.CHANGE_SEARCHTYPE] (state, type) {
    state.searchType = type
  },
  [types.GETSEARCHONE] (state, data) {
    state.searchData.searchOneData = data
  },
  [types.GETSEARCHSIX] (state, data) {
    state.searchData.searchSixData = data
  },
  [types.GETSEARCHEIGHT] (state, data) {
    state.searchData.searchEightData = data
  },
  [types.INIT_SEARCHDATA] (state) {
    state.searchData = {
      searchOneData: [],
      searchSixData: [],
      searchEightData: null
    }
  }
}

export default mutations
