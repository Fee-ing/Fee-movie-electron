<template>
  <div class="web-all">
    <home :homeData="webFourData" @get-detail="getDetail" @go-page="goPage"></home>
    <detail :detailData="webFourDetail" @go-back="backHome"></detail>
  </div>
</template>

<script>
  import home from './home.vue'
  import detail from './detail.vue'

  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
      }
    },
    components: {
      home,
      detail
    },
    computed: {
      ...mapGetters({
        webFourData: 'getWebFourData',
        webFourDetail: 'getWebFourDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebFourData', 'loadWebFourDetail']),
      getDetail (href) {
        this.isLoadTrue(false)
        this.loadWebFourDetail(href)
      },
      backHome () {
        this.changeRotateDeg(0)
      },
      goPage (page) {
        this.loadWebFourData(page)
      }
    },
    beforeRouteUpdate () {
      this.isLoadTrue(true)
    },
    mounted () {
      this.isLoadTrue(false)
      this.loadWebFourData(1)
    }
  }
</script>
