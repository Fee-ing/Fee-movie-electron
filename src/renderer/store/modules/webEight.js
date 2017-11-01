var cheerio = require('cheerio')
var superagent = require('superagent')

var WEBCONFIG = require('../../assets/js/webconfig.js')

const state = {
  webEightData: {
    movieData: [],
    pageData: [],
    totalPage: '1'
  },
  webEightDetail: {
    title: '',
    poster: '',
    info: [],
    video: '',
    download: []
  }
}

const getters = {
  getWebEightData: (state, rootState) => state.webEightData,
  getWebEightDetail: (state) => state.webEightDetail
}

const mutations = {
  GET_WEBEIGHT_HOME (state, data) {
    state.webEightData = data
  },
  GET_WEBEIGHT_DETAIL (state, data) {
    state.webEightDetail = data
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
    $('.excerpt').each(function (idx, element) {
      let $element = $(element)
      searchData.data.push({
        title: $element.find('.focus img').attr('alt'),
        subTitle: $element.find('.meta .pv').html(),
        poster: $element.find('.focus img').attr('data-src'),
        href: $element.find('.focus').attr('href')
      })
    })
    $('.pagination li').each(function (idx, element) {
      var $element = $(element)
      if ($element.hasClass('active')) {
        searchData.pageData.push({
          page: $element.find('span').html(),
          name: $element.find('span').html(),
          isCurrent: true
        })
      } else {
        if ($element.children().is('a')) {
          let page = $element.find('a').attr('href').replace(/http:\/\/www.hanfan.cc\//g, '').replace(/page\//g, '').replace(/\//g, '')
          if (!page) {
            page = '1'
          }
          searchData.pageData.push({
            page: page,
            name: $element.find('a').html(),
            href: $element.find('a').attr('href'),
            isCurrent: false
          })
        }
      }
    })
  }
  return searchData
}

const actions = {
  loadWebEightData ({ commit, dispatch, rootState, state }, href) {
    let link = rootState.webItem.home
    if (href) {
      link = href
    }
    superagent.get(link)
      .end(function (err, sres) {
        let data = {
          movieData: [],
          pageData: [],
          totalPage: '1'
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('.excerpt').each(function (idx, element) {
            let $element = $(element)
            data.movieData.push({
              title: $element.find('.focus img').attr('alt').replace(/韩饭网/g, ''),
              subTitle: $element.find('.meta .pv').html(),
              poster: $element.find('.focus img').attr('data-src'),
              href: $element.find('.focus').attr('href')
            })
          })
          $('.pagination li').each(function (idx, element) {
            let $element = $(element)
            if ($element.hasClass('active')) {
              data.pageData.push({
                page: $element.find('span').html(),
                name: $element.find('span').html(),
                isCurrent: true
              })
            } else {
              if ($element.children().is('a')) {
                let page = $element.find('a').attr('href').replace(/http:\/\/www.hanfan.cc\//g, '').replace(/page\//g, '').replace(/\//g, '')
                if (!page) {
                  page = '1'
                }
                data.pageData.push({
                  page: page,
                  name: $element.find('a').html(),
                  href: $element.find('a').attr('href'),
                  isCurrent: false
                })
              }
            }
          })
          data.totalPage = $('.pagination li').last().find('span').html()
        }
        commit('GET_WEBEIGHT_HOME', data)
        commit('CHANGE_ISLOAD', true)
      })
  },
  loadWebEightDetail ({ commit, dispatch, rootState, state }, href) {
    superagent.get(href)
      .end(function (err, sres) {
        let detail = {
          title: '',
          poster: '',
          info: [],
          video: '',
          download: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          detail.title = $('.article-title a').html()
          detail.poster = $('.article-content img').eq(0).attr('src')
          detail.video = $('.article-content iframe').attr('src')

          let part = $('.part_content .part').eq(1)
          if (part.html()) {
            $('.part_content .part strong').remove()
            $('.part_content .part br').remove()
            part.find('a').each(function (idx, element) {
              let $element = $(element)
              detail.download.push({href: $element.attr('href')})
            })
            $('.part_content .part a').remove()
            let partHtml = part.html().replace(/(天使_TSKS：)|(幻想乐园：)|(\|)|(\s)/g, '').split('密码')
            let k = 0
            for (let i = 1; i < partHtml.length; i++) {
              if (partHtml[i] && detail.download[k]) {
                detail.download[k].password = partHtml[i]
                k++
              }
            }
          }
          $('.article-content center').remove()
          $('.article-content div').remove()
          $('.article-content img').remove()
          $('.article-content p').each(function (idx, element) {
            let $element = $(element)
            if ($element.is('p')) {
              detail.info.push($element.html())
            }
          })
        }
        commit('GET_WEBEIGHT_DETAIL', detail)
        commit('CHANGE_ISLOAD', true)
        commit('CHANGE_ROTATEDEG', 180)
      })
  },
  searchEight ({ commit, dispatch, rootState, state }, opt) {
    return new Promise((resolve, reject) => {
      if (opt.href) {
        superagent.get(opt.href)
          .end(function (err, sres) {
            let searchData = getData(err, sres)
            resolve(searchData)
            commit('GETSEARCHEIGHT', searchData)
          })
      } else {
        superagent.post(WEBCONFIG.search.eight.search)
          .query({s: opt.keywords})
          .end(function (err, sres) {
            let searchData = getData(err, sres)
            resolve(searchData)
            commit('GETSEARCHEIGHT', searchData)
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
