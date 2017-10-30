var cheerio = require('cheerio')
var superagent = require('superagent')
require('superagent-charset')(superagent)

const state = {
  webTwoData: {
    today: [],
    newMovie: '',
    newTv: '',
    newComic: '',
    newVariety: ''
  },
  webTwoDetail: {
    title: '',
    poster: '',
    info: '',
    download: []
  }
}

const getters = {
  getWebTwoData: (state, rootState) => state.webTwoData,
  getWebTwoDetail: (state) => state.webTwoDetail
}

const mutations = {
  GET_WEBTWO_HOME (state, data) {
    state.webTwoData = data
  },
  GET_WEBTWO_DETAIL (state, data) {
    state.webTwoDetail = data
  }
}

const actions = {
  loadWebTwoData ({ commit, dispatch, rootState, state }) {
    superagent.get(rootState.webItem.home)
      .charset('gbk')
      .end(function (err, sres) {
        let data = {
          today: [],
          newMovie: '',
          newTv: '',
          newComic: '',
          newVariety: ''
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('.kandian .commend ul li').each(function (idx, element) {
            let $element = $(element)
            data.today.push({
              title: $element.find('.db').attr('title'),
              subTitle: $element.find('p').html(),
              poster: $element.find('.db img').attr('src'),
              href: rootState.webItem.href + $element.find('.db').attr('href')
            })
          })
          $('.zuoce .xinfenlei').eq(0).find('ul li').each(function (idx, element) {
            let $element = $(element)
            $element.attr('title', $element.find('a').html())
            let href = $element.find('a').attr('href')
            $element.find('a').attr('data-href', href).removeAttr('href').removeAttr('target').addClass('link')
          })
          $('.zuoce .xinfenlei').eq(1).find('ul li').each(function (idx, element) {
            let $element = $(element)
            $element.attr('title', $element.find('a').html())
            let href = $element.find('a').attr('href')
            $element.find('a').attr('data-href', href).removeAttr('href').removeAttr('target').addClass('link')
          })
          $('.zuocez .xxfl').eq(0).find('ul li').each(function (idx, element) {
            let $element = $(element)
            $element.attr('title', $element.find('a').html())
            let href = $element.find('a').attr('href')
            $element.find('a').attr('data-href', href).removeAttr('href').removeAttr('target').addClass('link')
          })
          $('.zuocez .xxfl').eq(1).find('ul li').each(function (idx, element) {
            let $element = $(element)
            $element.attr('title', $element.find('a').html())
            let href = $element.find('a').attr('href')
            $element.find('a').attr('data-href', href).removeAttr('href').removeAttr('target').addClass('link')
          })
          data.newMovie = $('.zuoce .xinfenlei').eq(0).find('ul').html()
          data.newTv = $('.zuoce .xinfenlei').eq(1).find('ul').html()
          data.newComic = $('.zuocez .xxfl').eq(0).find('ul').html()
          data.newVariety = $('.zuocez .xxfl').eq(1).find('ul').html()
        }
        commit('GET_WEBTWO_HOME', data)
        commit('CHANGE_ISLOAD', true)
      })
  },
  loadWebTwoDetail ({ commit, dispatch, rootState, state }, href) {
    superagent.get(href)
      .charset('gbk')
      .end(function (err, sres) {
        let detail = {
          title: '',
          poster: '',
          info: '',
          download: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          detail.title = $('h1 a').html()
          detail.poster = $('.haibao img').attr('src')
          $('.neirong').children().last().remove()
          detail.info = $('.neirong').remove('img').html()
          $('.downurl').each(function (idx, element) {
            let $element = $(element)
            $element.find('li').each(function (idx, element1) {
              let $element1 = $(element1)
              let name = $element1.find('a').eq(0).html()
              if (name === 'HD') {
                name = '高清版'
              } else if (name === 'TS') {
                name = '准枪版'
              } else if (name === 'CAM') {
                name = '枪版'
              } else if (name === 'BD') {
                name = '蓝光版'
              }
              detail.download.push({
                name: name,
                link: $element1.find('a').eq(0).attr('href')
              })
            })
          })
        }
        commit('GET_WEBTWO_DETAIL', detail)
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
