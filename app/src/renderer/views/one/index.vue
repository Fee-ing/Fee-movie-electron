<template>
  <div class="web-all">
    <home :type="loadType" :homeData="webOneData" @get-detail="getDetail"></home>
    <detail :type="loadType" :detailData="webOneDetail" @go-back="backHome" @done-load="doneLoad"></detail>
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
        loadType: 'getLoadType',
        webOneData: 'getWebOneData',
        webOneDetail: 'getWebOneDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebOneData', 'loadWebOneDetail', 'loadWebOneDetail2']),
      getDetail (href) {
        this.isLoadTrue(false)
        if (this.loadType === '1') {
          this.loadWebOneDetail(href)
        } else {
          this.isClick = true
          this.loadWebOneDetail2(href)
        }
      },
      backHome () {
        this.changeRotateDeg(0)
      },
      doneLoad () {
        this.isLoadTrue(true)
        if (this.loadType === '2' && this.isClick) {
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
      this.loadWebOneData()
    }
  }
</script>
