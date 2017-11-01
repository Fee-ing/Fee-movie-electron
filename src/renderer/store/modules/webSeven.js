var cheerio = require('cheerio')
var superagent = require('superagent')

const state = {
  webSevenData: {
    tvData1: [],
    tvData2: [],
    tvData3: [],
    tvData4: []
  },
  webSevenDetail: {
    src: ''
  }
}

const getters = {
  getWebSevenData: (state, rootState) => state.webSevenData,
  getWebSevenDetail: (state) => state.webSevenDetail
}

const mutations = {
  GET_WEBSEVEN_HOME (state, data) {
    state.webSevenData = data
  },
  GET_WEBSEVEN_DETAIL (state, data) {
    state.webSevenDetail.src = data
  }
}

const actions = {
  loadWebSevenData ({ commit, dispatch, rootState, state }, page) {
    superagent.get(rootState.webItem.home)
      .end(function (err, sres) {
        let data = {
          tvData1: [],
          tvData2: [],
          tvData3: [],
          tvData4: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('.top24 .top').each(function (idx, element) {
            let $element = $(element)
            data.tvData1.push({
              title: $element.find('.fl-info a').html(),
              subTitle: $element.find('.fl-info p').eq(0).html(),
              href: rootState.webItem.href + $element.find('.fl-img a').attr('href')
            })
          })
          $('.top24 li').each(function (idx, element) {
            let $element = $(element)
            if (!$element.hasClass('top')) {
              data.tvData1.push({
                title: $element.find('a').html(),
                subTitle: $element.find('em').html(),
                href: rootState.webItem.href + $element.find('a').attr('href')
              })
            }
          })
          $('.lastest-release li').each(function (idx, element) {
            let $element = $(element)
            data.tvData2.push({
              title: $element.find('p a').html(),
              subTitle: $element.find('.f4').eq(0).html(),
              href: rootState.webItem.href + $element.find('.imglink').attr('href'),
              poster: $element.find('.imglink img').attr('src')
            })
          })
          $('.top-update li').each(function (idx, element) {
            let $element = $(element)
            data.tvData3.push({
              title: $element.find('.t .f14 a strong').html(),
              subTitle: $element.find('.t .f14').html().split('<')[0],
              href: rootState.webItem.href + $element.find('.img a').attr('href'),
              poster: $element.find('.img img').attr('src')
            })
          })
          $('.top-tv li').each(function (idx, element) {
            let $element = $(element)
            data.tvData4.push({
              title: $element.find('.fl-info h3 a').html(),
              href: rootState.webItem.href + $element.find('.fl-img a').attr('href'),
              poster: $element.find('.fl-img img').attr('src')
            })
          })
        }
        commit('GET_WEBSEVEN_HOME', data)
        commit('CHANGE_ISLOAD', true)
      })
  },
  loadWebSevenDetail ({ commit, dispatch, rootState, state }, href) {
    commit('GET_WEBSEVEN_DETAIL', href)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
