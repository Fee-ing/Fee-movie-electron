var cheerio = require('cheerio')
var superagent = require('superagent')

import WEBCONFIG from '../../assets/js/webconfig.js'

const state = {
  loadType: '1',
  webOneData: {
    movieHotData: [],
    tvHotData: [],
    varietyHotData: [],
    comicHotData: [],
    movieData: [],
    tvData: [],
    varietyData: [],
    comicData: []
  },
  webOneDetail: {
    title: '',
    subTitle: '',
    poster: '',
    description: '',
    info: '',
    screenshot: '',
    bad: [],
    low: [],
    normal: [],
    high: [],
    higher: [],
    src: ''
  }
}

const getters = {
  getLoadType: (state) => state.loadType,
  getWebOneData: (state) => state.webOneData,
  getWebOneDetail: (state) => state.webOneDetail
}

const mutations = {
  CHANGE_LOADTYPE (state, data) {
    state.loadType = data
  },
  GET_WEBONE_HOME (state, data) {
    state.webOneData = data
  },
  GET_WEBONE_DETAIL (state, data) {
    state.webOneDetail = data
    state.webOneDetail.src = ''
  },
  GET_WEBONE_DETAIL_SRC (state, data) {
    state.webOneDetail.src = data
  }
}

const actions = {
  loadWebOneData ({ commit, dispatch, rootState, state }) {
    superagent.get(rootState.webItem.home)
      .end(function (err, sres) {
        let data = {
          movieHotData: [],
          tvHotData: [],
          varietyHotData: [],
          comicHotData: [],
          movieData: [],
          tvData: [],
          varietyData: [],
          comicData: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('.section-list.sl1 .list_mov').each(function (idx, element) {
            let $element = $(element)
            data.movieHotData.push({
              title: $element.find('.list_mov_title h4 a').html(),
              subTitle: $element.find('.list_mov_title em').html(),
              href: rootState.webItem.href + $element.find('.list_mov_title h4 a').attr('href'),
              poster: $element.find('.list_mov_poster img').attr('data-original')
            })
          })
          $('.section-list.sl3 .list_mov').each(function (idx, element) {
            let $element = $(element)
            data.tvHotData.push({
              title: $element.find('.list_mov_title h4 a').html(),
              subTitle: $element.find('.list_mov_title em').html(),
              href: rootState.webItem.href + $element.find('.list_mov_title h4 a').attr('href'),
              poster: $element.find('.list_mov_poster img').attr('data-original')
            })
          })
          $('.section-list.sl5 .list_mov').each(function (idx, element) {
            let $element = $(element)
            data.varietyHotData.push({
              title: $element.find('.list_mov_title h4 a').html(),
              subTitle: $element.find('.list_mov_title em').html(),
              href: rootState.webItem.href + $element.find('.list_mov_title h4 a').attr('href'),
              poster: $element.find('.list_mov_poster img').attr('data-original')
            })
          })
          $('.section-list.sl7 .list_mov').each(function (idx, element) {
            let $element = $(element)
            data.comicHotData.push({
              title: $element.find('.list_mov_title h4 a').html(),
              subTitle: $element.find('.list_mov_title em').html(),
              href: rootState.webItem.href + $element.find('.list_mov_title h4 a').attr('href'),
              poster: $element.find('.list_mov_poster img').attr('data-original')
            })
          })
          $('.section-list.sl2 .list_mov').each(function (idx, element) {
            let $element = $(element)
            data.movieData.push({
              title: $element.find('.list_mov_title h4 a').html(),
              subTitle: $element.find('.list_mov_title em').html(),
              href: rootState.webItem.href + $element.find('.list_mov_title h4 a').attr('href'),
              poster: $element.find('.list_mov_poster img').attr('data-original')
            })
          })
          $('.section-list.sl4 .list_mov').each(function (idx, element) {
            let $element = $(element)
            data.tvData.push({
              title: $element.find('.list_mov_title h4 a').html(),
              subTitle: $element.find('.list_mov_title em').html(),
              href: rootState.webItem.href + $element.find('.list_mov_title h4 a').attr('href'),
              poster: $element.find('.list_mov_poster img').attr('data-original')
            })
          })
          $('.section-list.sl6 .list_mov').each(function (idx, element) {
            let $element = $(element)
            data.varietyData.push({
              title: $element.find('.list_mov_title h4 a').html(),
              subTitle: $element.find('.list_mov_title em').html(),
              href: rootState.webItem.href + $element.find('.list_mov_title h4 a').attr('href'),
              poster: $element.find('.list_mov_poster img').attr('data-original')
            })
          })
          $('.section-list.sl8 .list_mov').each(function (idx, element) {
            let $element = $(element)
            data.comicData.push({
              title: $element.find('.list_mov_title h4 a').html(),
              subTitle: $element.find('.list_mov_title em').html(),
              href: rootState.webItem.href + $element.find('.list_mov_title h4 a').attr('href'),
              poster: $element.find('.list_mov_poster img').attr('data-original')
            })
          })
        }
        if (data.movieHotData.length < 1) {
          dispatch('loadWebOneData2')
        } else {
          commit('GET_WEBONE_HOME', data)
          commit('CHANGE_LOADTYPE', '1')
          commit('CHANGE_ISLOAD', true)
        }
      })
  },
  loadWebOneData2 ({ commit, dispatch, rootState, state }) {
    superagent.get(rootState.webItem.home2)
      .end(function (err, sres) {
        let data = {
          movieHotData: [],
          tvHotData: [],
          varietyHotData: [],
          comicHotData: [],
          movieData: [],
          tvData: [],
          varietyData: [],
          comicData: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          $('#tt1 .lpelmt2').each(function (idx, element) {
            let $element = $(element)
            data.movieHotData.push({
              title: $element.find('.h3 a').html(),
              subTitle: $element.find('.tip').html(),
              href: rootState.webItem.href2 + $element.find('.h3 a').attr('href'),
              poster: $element.find('img').attr('_src')
            })
          })
          $('#tt2 .lpelmt2').each(function (idx, element) {
            let $element = $(element)
            data.tvHotData.push({
              title: $element.find('.h3 a').html(),
              subTitle: $element.find('.tip').html(),
              href: $element.find('.h3 a').attr('href'),
              poster: $element.find('img').attr('_src')
            })
          })
          $('#tt3 .lpelmt2').each(function (idx, element) {
            let $element = $(element)
            data.comicHotData.push({
              title: $element.find('.h3 a').html(),
              subTitle: $element.find('.tip').html(),
              href: $element.find('.h3 a').attr('href'),
              poster: $element.find('img').attr('_src')
            })
          })
          $('#tt4 .lpelmt2').each(function (idx, element) {
            let $element = $(element)
            data.varietyHotData.push({
              title: $element.find('.h3 a').html(),
              subTitle: $element.find('.tip').html(),
              href: $element.find('.h3 a').attr('href'),
              poster: $element.find('img').attr('_src')
            })
          })
          $('.me1').eq(0).find('li').each(function (idx, element) {
            let $element = $(element)
            data.movieData.push({
              title: $element.find('.h3 a').html(),
              subTitle: $element.find('.tip').html(),
              href: $element.find('.h3 a').attr('href'),
              poster: $element.find('img').attr('_src')
            })
          })
          $('.me1').eq(1).find('li').each(function (idx, element) {
            let $element = $(element)
            data.tvData.push({
              title: $element.find('.h3 a').html(),
              subTitle: $element.find('.tip').html(),
              href: $element.find('.h3 a').attr('href'),
              poster: $element.find('img').attr('_src')
            })
          })
          $('.me1').eq(2).find('li').each(function (idx, element) {
            let $element = $(element)
            data.varietyData.push({
              title: $element.find('.h3 a').html(),
              subTitle: $element.find('.tip').html(),
              href: $element.find('.h3 a').attr('href'),
              poster: $element.find('img').attr('_src')
            })
          })
          $('.me1').eq(3).find('li').each(function (idx, element) {
            let $element = $(element)
            data.comicData.push({
              title: $element.find('.h3 a').html(),
              subTitle: $element.find('.tip').html(),
              href: $element.find('.h3 a').attr('href'),
              poster: $element.find('img').attr('_src')
            })
          })
        }
        commit('GET_WEBONE_HOME', data)
        commit('CHANGE_LOADTYPE', '2')
        commit('CHANGE_ISLOAD', true)
      })
  },
  loadWebOneDetail ({ commit, dispatch, rootState, state }, href) {
    superagent.get(href)
      .end(function (err, sres) {
        let detail = {
          title: '',
          subTitle: '',
          poster: '',
          description: '',
          info: '',
          screenshot: '',
          bad: [],
          low: [],
          normal: [],
          high: [],
          higher: []
        }
        if (!err) {
          let $ = cheerio.load(sres.text, {decodeEntities: false})
          detail.title = $('h1').html()
          detail.subTitle = $('#movie_tip').html()
          detail.poster = $('#poster a').attr('href')
          detail.description = $('#movie_description').html()
          $('.movie-info a').removeAttr('href')
          detail.info = ($('.movie-info').eq(0).html() + $('.movie-info').eq(1).html()).replace(/豆瓣评论/g, '<br>')
          detail.screenshot = $('.img-responsive.img-thumbnail').attr('src')

          $('.panel.panel-quality-5').each(function (idx, element) {
            let $element = $(element)
            $element.find('.row').each(function (idx, element1) {
              let $element1 = $(element1)
              detail.higher.push({
                name: $element1.find('.td-dl-links a').html(),
                format: $element1.find('.label-quality-5').html(),
                size: $element1.find('.label-filesize').html(),
                link: $element1.find('.td-dl-links a').attr('href')
              })
            })
          })

          $('.panel.panel-quality-4').each(function (idx, element) {
            let $element = $(element)
            $element.find('.row').each(function (idx, element1) {
              let $element1 = $(element1)
              detail.high.push({
                name: $element1.find('.td-dl-links a').html(),
                format: $element1.find('.label-quality-4').html(),
                size: $element1.find('.label-filesize').html(),
                link: $element1.find('.td-dl-links a').attr('href')
              })
            })
          })

          $('.panel.panel-quality-3').each(function (idx, element) {
            let $element = $(element)
            $element.find('.row').each(function (idx, element1) {
              let $element1 = $(element1)
              detail.normal.push({
                name: $element1.find('.td-dl-links a').html(),
                format: $element1.find('.label-quality-3').html(),
                size: $element1.find('.label-filesize').html(),
                link: $element1.find('.td-dl-links a').attr('href')
              })
            })
          })

          $('.panel.panel-quality-2').each(function (idx, element) {
            let $element = $(element)
            $element.find('.row').each(function (idx, element1) {
              let $element1 = $(element1)
              detail.low.push({
                name: $element1.find('.td-dl-links a').html(),
                format: $element1.find('.label-quality-2').html(),
                size: $element1.find('.label-filesize').html(),
                link: $element1.find('.td-dl-links a').attr('href')
              })
            })
          })

          $('.panel.panel-quality-1').each(function (idx, element) {
            let $element = $(element)
            $element.find('.row').each(function (idx, element1) {
              let $element1 = $(element1)
              detail.bad.push({
                name: $element1.find('.td-dl-links a').html(),
                format: $element1.find('.label-quality-1').html(),
                size: $element1.find('.label-filesize').html(),
                link: $element1.find('.td-dl-links a').attr('href')
              })
            })
          })
        }
        commit('GET_WEBONE_DETAIL', detail)
        commit('CHANGE_ISLOAD', true)
        commit('CHANGE_ROTATEDEG', 180)
      })
  },
  loadWebOneDetail2 ({ commit, dispatch, rootState, state }, href) {
    commit('GET_WEBONE_DETAIL_SRC', href)
  },
  searchOne ({ commit, dispatch, rootState, state }, keywords) {
    return new Promise((resolve, reject) => {
      let searchData = []
      superagent.post(WEBCONFIG.search.one.search)
        .send({keyword: keywords})
        .end(function (err, sres) {
          if (!err) {
            let $ = cheerio.load(sres.text, {decodeEntities: false})
            $('.list-group-item').each(function (idx, element) {
              let $element = $(element)
              searchData.push({
                title: $element.find('.search-list-img').attr('alt'),
                subTitle: $element.find('em').html(),
                href: WEBCONFIG.search.one.href + $element.attr('href'),
                poster: $element.find('.search-list-img').attr('src')
              })
            })
          }
          resolve(searchData)
          commit('GETSEARCHONE', searchData)
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
