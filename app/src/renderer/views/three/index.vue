<template>
  <div class="web-all">
    <home :homeData="webThreeData" @get-detail="getDetail"></home>
    <detail :detailData="webThreeDetail" @go-back="backHome"></detail>
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
        webThreeData: 'getWebThreeData',
        webThreeDetail: 'getWebThreeDetail'
      })
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'loadWebThreeData', 'loadWebThreeDetail']),
      getDetail (href) {
        this.isLoadTrue(false)
        this.loadWebThreeDetail(href)
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
      this.loadWebThreeData()
    }
  }
</script>
