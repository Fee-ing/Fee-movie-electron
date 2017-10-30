var cheerio = require('cheerio')
var superagent = require('superagent')

const state = {
  webFourData: {
    movieData: []
  },
  webFourDetail: {
    title: '',
    poster: '',
    info: '',
    description: '',
    download: []
  }
}

const getters = {
  getWebFourData: (state, rootState) => state.webFourData,
  getWebFourDetail: (state) => state.webFourDetail
}

const mutations = {
  GET_WEBFOUR_HOME (state, data) {
    state.webFourData = data
  },
  GET_WEBFOUR_DETAIL (state, data) {
    state.webFourDetail = data
  }
}

const actions = {
  loadWebFourData ({ commit, dispatch, rootState, state }, page) {
    let host = ''
    if (+page === 1) {
      host = rootState.webItem.home
    } else {
      host = rootState.webItem.home + 'ajax.php?type=&country=&director=&actor=&year=&p=' + page + '&sort='
    }
    superagent.get(host)
      .end(function (err, sres) {
        let data = {
          movieData: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          if (+page === 1) {
            $('#result1 li').each(function (idx, element) {
              let $element = $(element)
              data.movieData.push({
                title: $element.find('img').attr('alt'),
                poster: $element.find('img').attr('src'),
                href: $element.find('.z-movie-playlink').attr('href')
              })
            })
          } else {
            $('li').each(function (idx, element) {
              let $element = $(element)
              data.movieData.push({
                title: $element.find('img').attr('alt'),
                poster: $element.find('img').attr('src'),
                href: $element.find('.z-movie-playlink').attr('href')
              })
            })
          }
        }
        commit('GET_WEBFOUR_HOME', data)
        commit('CHANGE_ISLOAD', true)
      })
  },
  loadWebFourDetail ({ commit, dispatch, rootState, state }, href) {
    superagent.get(href)
      .end(function (err, sres) {
        let detail = {
          title: '',
          poster: '',
          info: '',
          description: '',
          download: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          detail.title = $('h2 a').html()
          detail.poster = $('.x-m-poster img').attr('src')
          detail.info = $('#viewfilm').html()
          detail.description = $('#des-full').html().replace(/\s+/g, '')
          $('#cili td').each(function (idx, element) {
            let $element = $(element)
            detail.download.push({
              name: $element.find('b').html(),
              size: $element.find('.label-warning').html(),
              type: $element.find('.label-danger').html(),
              link1: $element.find('a.btn-info.btn-sm').attr('href'),
              link2: $element.find('a.btn-primary.btn-sm').attr('href')
            })
          })
        }
        commit('GET_WEBFOUR_DETAIL', detail)
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
