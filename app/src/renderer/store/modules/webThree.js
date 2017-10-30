var cheerio = require('cheerio')
var superagent = require('superagent')
require('superagent-charset')(superagent)

const state = {
  webThreeData: {
    newData: [],
    thunderData: [],
    chmovieData: [],
    enmovieData: [],
    varietyData: [],
    comicData: []
  },
  webThreeDetail: {
    content: ''
  }
}

const getters = {
  getWebThreeData: (state, rootState) => state.webThreeData,
  getWebThreeDetail: (state) => state.webThreeDetail
}

const mutations = {
  GET_WEBTHREE_HOME (state, data) {
    state.webThreeData = data
  },
  GET_WEBTHREE_DETAIL (state, data) {
    state.webThreeDetail = data
  }
}

const actions = {
  loadWebThreeData ({ commit, dispatch, rootState, state }) {
    superagent.get(rootState.webItem.home)
      .charset('gbk')
      .end(function (err, sres) {
        let data = {
          newData: [],
          thunderData: [],
          chmovieData: [],
          enmovieData: [],
          varietyData: [],
          comicData: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('.bd3r').eq(0).find('.bd3rl .co_area2').eq(0).find('ul').find('a').each(function (idx, element) {
            let $element = $(element)
            if (idx % 2 !== 0) {
              data.newData.push({
                title: $element.html(),
                href: rootState.webItem.href + $element.attr('href'),
                time: $element.parent().next().find('font').html()
              })
            }
          })
          $('.bd3r').eq(0).find('.bd3rl .co_area2').eq(1).find('ul').find('a').each(function (idx, element) {
            let $element = $(element)
            if (idx % 2 !== 0) {
              data.thunderData.push({
                title: $element.html(),
                href: rootState.webItem.href + $element.attr('href'),
                time: $element.parent().next().find('font').html()
              })
            }
          })
          $('.bd3r').eq(0).find('.bd3rl .co_area2').eq(2).find('ul').find('a').each(function (idx, element) {
            let $element = $(element)
            if (idx % 2 !== 0) {
              data.chmovieData.push({
                title: $element.html(),
                href: rootState.webItem.href + $element.attr('href'),
                time: $element.parent().next().find('font').html()
              })
            }
          })
          $('.bd3r').eq(0).find('.bd3rl .co_area2').eq(3).find('ul').find('a').each(function (idx, element) {
            let $element = $(element)
            if (idx % 2 !== 0) {
              data.enmovieData.push({
                title: $element.html(),
                href: rootState.webItem.href + $element.attr('href'),
                time: $element.parent().next().find('font').html()
              })
            }
          })
          $('.bd3r').eq(1).find('.bd3rl .co_area2').eq(0).find('ul').find('a').each(function (idx, element) {
            let $element = $(element)
            if (idx % 2 !== 0) {
              data.varietyData.push({
                title: $element.html(),
                href: rootState.webItem.href + $element.attr('href'),
                time: $element.parent().next().find('font').html()
              })
            }
          })
          $('.bd3r').eq(1).find('.bd3rl .co_area2').eq(1).find('ul').find('a').each(function (idx, element) {
            let $element = $(element)
            if (idx % 2 !== 0) {
              data.comicData.push({
                title: $element.html(),
                href: rootState.webItem.href + $element.attr('href'),
                time: $element.parent().next().find('font').html()
              })
            }
          })
        }
        commit('GET_WEBTHREE_HOME', data)
        commit('CHANGE_ISLOAD', true)
      })
  },
  loadWebThreeDetail ({ commit, dispatch, rootState, state }, href) {
    superagent.get(href)
      .charset('gbk')
      .end(function (err, sres) {
        let detail = {
          content: ''
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('#Zoom>span a').each(function (idx, element) {
            let $element = $(element)
            let html = $element.attr('href')
            $element.attr('href', 'javascript:void(0);')
            $element.html(html)
          })
          let html = $('#Zoom>span').html().split('img')
          html[1] = ' class="poster"' + html[1]
          detail.content = html.join('img').replace(/下载地址/g, '下载地址（复制后用迅雷打开）')
        }
        commit('GET_WEBTHREE_DETAIL', detail)
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
