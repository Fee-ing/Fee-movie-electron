<template>
  <div class="web-all">
    <home :homeData="webTwoData" @get-detail="getDetail"></home>
    <detail :detailData="webTwoDetail" @go-back="backHome"></detail>
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
        webTwoData: 'getWebTwoData',
        webTwoDetail: 'getWebTwoDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebTwoData', 'loadWebTwoDetail']),
      getDetail (href) {
        this.isLoadTrue(false)
        this.loadWebTwoDetail(href)
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
      this.loadWebTwoData()
    }
  }
</script>
