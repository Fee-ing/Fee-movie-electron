var cheerio = require('cheerio')
var superagent = require('superagent')
require('superagent-charset')(superagent)

var WEBCONFIG = require('../../assets/js/webconfig.js')

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

let getData = function (err, sres) {
  let searchData = {
    data: [],
    pageData: [],
    totalPage: '1'
  }
  if (!err) {
    let $ = cheerio.load(sres.text, {decodeEntities: false})
    $('.list-area .item').each(function (idx, element) {
      let $element = $(element)
      searchData.data.push({
        title: $element.find('.item-title a').html(),
        subTitle: $element.find('.item-title .category').html(),
        href: $element.find('.item-title a').attr('href'),
        download: $element.find('.item-detail span').eq(0).find('a').attr('href'),
        downloadType: $element.find('.item-detail span').eq(0).find('a').html(),
        time: $element.find('.item-detail span').eq(1).html().replace(/收录日期:/g, ''),
        size: $element.find('.item-detail span').eq(2).html().replace(/大小:/g, ''),
        num: $element.find('.item-detail span').eq(3).html().replace(/文件数:/g, ''),
        speed: $element.find('.item-detail span').eq(4).html().replace(/速度:/g, '')
      })
    })
    $('.pagination').children().each(function (idx, element) {
      let $element = $(element)
      if (idx === 0) {
        searchData.totalPage = $element.html()
      }
      if ($element.is('a')) {
        searchData.pageData.push({
          name: $element.html().replace(/»/g, '尾页').replace(/«/g, '首页'),
          href: $element.attr('href'),
          isCurrent: false
        })
      }
      if ($element.is('strong')) {
        searchData.pageData.push({
          name: $element.html(),
          href: '',
          isCurrent: true
        })
      }
    })
  }
  return searchData
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
  },
  searchDt ({ commit, dispatch, rootState, state }, options) {
    return new Promise((resolve, reject) => {
      if (options.href) {
        superagent.get(options.href)
          .end(function (err, sres) {
            let searchData = getData(err, sres)
            commit('GETSEARCHDT', searchData)
            resolve(searchData)
          })
      } else {
        superagent.post(WEBCONFIG.search.dt.search)
          .send({keyword: options.keywords})
          .type('form')
          .end(function (err, sres) {
            let searchData = getData(err, sres)
            commit('GETSEARCHDT', searchData)
            resolve(searchData)
          })
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
