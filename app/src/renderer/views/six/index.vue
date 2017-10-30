<template>
  <div class="web-all">
    <home :homeData="webSixData" @get-detail="getDetail" @go-page="goPage"></home>
    <detail :detailData="webSixDetail" @go-back="backHome" @done-load="doneLoad"></detail>
  </div>
</template>

<script>
  import home from './home.vue'
  import detail from './detail.vue'

  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        isClick: false
      }
    },
    components: {
      home,
      detail
    },
    computed: {
      ...mapGetters({
        webSixData: 'getWebSixData',
        webSixDetail: 'getWebSixDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebSixData', 'loadWebSixDetail']),
      getDetail (href) {
        this.isLoadTrue(false)
        this.isClick = true
        this.loadWebSixDetail(href)
      },
      backHome () {
        this.changeRotateDeg(0)
      },
      goPage (page) {
        this.loadWebSixData(page)
      },
      doneLoad () {
        this.isLoadTrue(true)
        if (this.isClick) {
          this.changeRotateDeg(180)
          this.isClick = false
        }
      }
    },
    beforeRouteUpdate () {
      this.isLoadTrue(true)
    },
    mounted () {
      this.isLoadTrue(false)
      this.loadWebSixData(1)
    }
  }
</script>
