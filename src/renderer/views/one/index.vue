<template>
  <div class="web-all">
    <home :homeData="webOneData" @get-detail="getDetail"></home>
    <detail :detailData="webOneDetail" @go-back="backHome"></detail>
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
        webOneData: 'getWebOneData',
        webOneDetail: 'getWebOneDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebOneData', 'loadWebOneDetail']),
      getDetail (href) {
        this.isLoadTrue(false)
        this.loadWebOneDetail(href)
      },
      backHome () {
        this.changeRotateDeg(0)
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
