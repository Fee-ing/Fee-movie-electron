<template>
  <div class="web-all">
    <home :homeData="webEightData" @get-detail="getDetail" @go-page="goPage"></home>
    <detail :detailData="webEightDetail" @go-back="backHome"></detail>
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
        webEightData: 'getWebEightData',
        webEightDetail: 'getWebEightDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebEightData', 'loadWebEightDetail']),
      getDetail (href) {
        this.isLoadTrue(false)
        this.loadWebEightDetail(href)
      },
      backHome () {
        this.changeRotateDeg(0)
      },
      goPage (href) {
        this.loadWebEightData(href)
      }
    },
    beforeRouteUpdate () {
      this.isLoadTrue(true)
    },
    mounted () {
      this.isLoadTrue(false)
      this.loadWebEightData()
    }
  }
</script>
