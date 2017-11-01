<template>
  <div class="web-movie-detail">
    <a class="back-home centerVertical" @click="goBack">返回<br>主页</a>
    <div class="detail-wrapper detail-wrapper1">
      <iframe :src="detailData.src" frameborder="0" class="iframe"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detailData: {
        type: Object,
        default: function () {
          return {
            src: ''
          }
        }
      }
    },
    data () {
      return {
      }
    },
    mounted () {
      let that = this
      document.querySelector('.iframe').onload = function () {
        that.$emit('done-load')
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
