<template>
  <div class="web-all">
    <home :homeData="webFiveData" @get-detail="getDetail"></home>
    <detail :detailData="webFiveDetail" @go-back="backHome"></detail>
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
        webFiveData: 'getWebFiveData',
        webFiveDetail: 'getWebFiveDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebFiveData', 'loadWebFiveDetail']),
      getDetail (href) {
        this.isLoadTrue(false)
        this.loadWebFiveDetail(href)
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
      this.loadWebFiveData()
    }
  }
</script>
