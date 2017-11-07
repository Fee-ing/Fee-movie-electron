<template>
  <div class="web-all">
    <home :searchData="searchData" :searchType="searchType" @get-detail="getDetail" @go-page="goPage"></home>
    <detail1 v-if="type === '1'" :type="type" :detailData="webOneDetail" @go-back="backHome"></detail1>
    <detail2 v-if="type === '2'" :detailData="webEightDetail" @go-back="backHome"></detail2>
  </div>
</template>

<script>
  import home from './home.vue'
  import detail1 from '../one/detail.vue'
  import detail2 from '../eight/detail.vue'

  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        type: ''
      }
    },
    components: {
      home,
      detail1,
      detail2
    },
    computed: {
      ...mapGetters({
        searchData: 'searchData',
        searchType: 'searchType',
        webOneDetail: 'getWebOneDetail',
        webEightDetail: 'getWebEightDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebOneDetail', 'loadWebEightDetail', 'searchDt', 'searchEight']),
      getDetail (opt) {
        this.isLoadTrue(false)
        this.type = opt.type
        if (this.type === '1') {
          this.loadWebOneDetail(opt.href)
        } else if (this.type === '2') {
          this.loadWebEightDetail(opt.href)
        }
      },
      backHome () {
        this.changeRotateDeg(0)
      },
      goPage (opt) {
        if (opt.type === '1') {
          this.searchDt({href: opt.href})
        } else if (opt.type === '2') {
          this.searchEight({href: opt.href})
        }
      }
    },
    beforeRouteUpdate () {
      this.isLoadTrue(true)
    }
  }
</script>
