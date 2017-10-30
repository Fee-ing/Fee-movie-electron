<template>
  <div class="web-movie-detail">
    <a class="back-home centerVertical" @click="goBack">返回<br>主页</a>
    <div class="detail-wrapper threedetail-wrapper" v-html="detailData.content"></div>
  </div>
</template>

<script>
  export default {
    props: {
      detailData: {
        type: Object,
        default: function () {
          return {
            content: ''
          }
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      goBack () {
        document.querySelector('.detail-wrapper').scrollTop = 0
        this.$emit('go-back')
      }
    }
  }
</script>

<style lang="less" scoped>
  .threedetail-wrapper{
    padding-top: 20px !important;
  }
</style>
