// import * as types from './mutation-types'

export const isLoadTrue = ({ commit }, bol) => {
  commit('CHANGE_ISLOAD', bol)
}

export const changeRotateDeg = ({ commit }, deg) => {
  commit('CHANGE_ROTATEDEG', deg)
}

// export const getWebOneHome = ({ commit, dispatch, state }) => {
//   http.get(state.webItem.home, function (res) {
//     res.setEncoding('utf8')
//     res.on('data', function (chunk) {
//       console.log(chunk)
//     })
//   })
// }
