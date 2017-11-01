var cheerio = require('cheerio')
var superagent = require('superagent')

var WEBCONFIG = require('../../assets/js/webconfig.js')

const state = {
  webSixData: {
    movieData: []
  },
  webSixDetail: {
    src: ''
  }
}

const getters = {
  getWebSixData: (state, rootState) => state.webSixData,
  getWebSixDetail: (state) => state.webSixDetail
}

const mutations = {
  GET_WEBSIX_HOME (state, data) {
    state.webSixData = data
  },
  GET_WEBSIX_DETAIL (state, data) {
    state.webSixDetail.src = data
  }
}

const actions = {
  loadWebSixData ({ commit, dispatch, rootState, state }, page) {
    let host = ''
    if (page === '1') {
      host = rootState.webItem.home
    } else {
      host = rootState.webItem.home + '&currentPage=' + page
    }
    superagent.get(host)
      .end(function (err, sres) {
        let data = {
          movieData: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('.source-table .hidden-phone').each(function (idx, element) {
            let $element = $(element)
            data.movieData.push({
              title: $element.find('.source-name .source-title').attr('title'),
              href: rootState.webItem.href + $element.find('.source-name .source-title').attr('href'),
              time: $element.find('.source-download-times').next().html(),
              type: $element.find('.source-download-times').next().next().html()
            })
          })
        }
        commit('GET_WEBSIX_HOME', data)
        commit('CHANGE_ISLOAD', true)
      })
  },
  loadWebSixDetail ({ commit, dispatch, rootState, state }, href) {
    commit('GET_WEBSIX_DETAIL', href)
  },
  searchSix ({ commit, dispatch, rootState, state }, options) {
    return new Promise((resolve, reject) => {
      let searchData = []
      superagent.post(WEBCONFIG.search.six.search)
        .query({q: options.keywords, currentPage: options.page})
        .end(function (err, sres) {
          if (!err) {
            let $ = cheerio.load(sres.text, {decodeEntities: false})
            $('.search-classic.visible-desktop').each(function (idx, element) {
              let $element = $(element)
              searchData.push({
                title: $element.find('.source-title').attr('title'),
                href: WEBCONFIG.search.six.href + $element.find('.source-title').attr('href'),
                size: $element.find('.next-row').eq(2).html().split('|')
              })
            })
          }
          resolve(searchData)
          commit('GETSEARCHSIX', searchData)
        })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
