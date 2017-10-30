<template>
  <div class="web-all">
    <home :homeData="webSevenData" @get-detail="getDetail"></home>
    <detail :detailData="webSevenDetail" @go-back="backHome" @done-load="doneLoad"></detail>
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
        webSevenData: 'getWebSevenData',
        webSevenDetail: 'getWebSevenDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebSevenData', 'loadWebSevenDetail']),
      getDetail (href) {
        this.isLoadTrue(false)
        this.isClick = true
        this.loadWebSevenDetail(href)
      },
      backHome () {
        this.changeRotateDeg(0)
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
      this.loadWebSevenData()
    }
  }
</script>
