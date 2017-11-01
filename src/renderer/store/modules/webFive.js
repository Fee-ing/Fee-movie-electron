var cheerio = require('cheerio')
var superagent = require('superagent')
require('superagent-charset')(superagent)

const state = {
  webFiveData: {
    movieData: [],
    tvData: [],
    highMovieData: []
  },
  webFiveDetail: {
    title: '',
    poster: '',
    info: '',
    description: '',
    imgs: [],
    download: []
  }
}

const getters = {
  getWebFiveData: (state, rootState) => state.webFiveData,
  getWebFiveDetail: (state) => state.webFiveDetail
}

const mutations = {
  GET_WEBFIVE_HOME (state, data) {
    state.webFiveData = data
  },
  GET_WEBFIVE_DETAIL (state, data) {
    state.webFiveDetail = data
  }
}

const actions = {
  loadWebFiveData ({ commit, dispatch, rootState, state }) {
    superagent.get(rootState.webItem.home)
      .charset('gbk')
      .end(function (err, sres) {
        let data = {
          movieData: [],
          tvData: [],
          highMovieData: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('#tab1_div_0 img').each(function (idx, element) {
            let $element = $(element)
            data.movieData.push({
              title: $element.attr('alt'),
              poster: $element.attr('src'),
              href: $element.parent().attr('href')
            })
          })
          $('#tab1_div_1 img').each(function (idx, element) {
            let $element = $(element)
            data.tvData.push({
              title: $element.attr('alt'),
              poster: $element.attr('src'),
              href: $element.parent().attr('href')
            })
          })
          $('#tab1_div_2 img').each(function (idx, element) {
            let $element = $(element)
            data.highMovieData.push({
              title: $element.attr('alt'),
              poster: $element.attr('src'),
              href: $element.parent().attr('href')
            })
          })
        }
        commit('GET_WEBFIVE_HOME', data)
        commit('CHANGE_ISLOAD', true)
      })
  },
  loadWebFiveDetail ({ commit, dispatch, rootState, state }, href) {
    superagent.get(href)
      .charset('gbk')
      .end(function (err, sres) {
        let detail = {
          title: '',
          poster: '',
          info: '',
          description: '',
          imgs: [],
          download: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('#dede_content p').eq(3).find('a').removeAttr('href')
          detail.title = $('.title a').html()
          detail.poster = $('#dede_content img').eq(0).attr('src')
          detail.info = $('#dede_content p').eq(1).html()
          detail.description = $('#dede_content p').eq(3).html().replace(/\s+/g, '')
          $('#dede_content img').each(function (idx, element) {
            if (idx > 0) {
              let $element = $(element)
              detail.imgs.push($element.attr('src'))
            }
          })
          $('#dede_content table').eq(0).find('tr td').each(function (idx, element) {
            let $element = $(element)
            let obj = {}
            obj.name = $element.find('a').html()
            obj.href = $element.find('a').attr('href')
            $element.find('a').remove()
            obj.size = $element.html().replace(/(\()|(\))/g, ' ').split('：')
            detail.download.push(obj)
          })
        }
        commit('GET_WEBFIVE_DETAIL', detail)
        commit('CHANGE_ISLOAD', true)
        commit('CHANGE_ROTATEDEG', 180)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
