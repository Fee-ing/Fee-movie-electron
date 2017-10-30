<template>
  <div class="web-movie-home">
    <h2 class="movie-title">今日看点</h2>
    <div class="block-wrapper">
      <a class="block-item block-item2" v-for="item in homeData.today" :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">最新电影</h2>
    <ul class="ul-wrapper" v-html="homeData.newMovie" @click="goDetail2"></ul>
    <h2 class="movie-title">最新电视剧</h2>
    <ul class="ul-wrapper" v-html="homeData.newTv" @click="goDetail2"></ul>
    <h2 class="movie-title">最新动漫</h2>
    <ul class="ul-wrapper" v-html="homeData.newComic" @click="goDetail2"></ul>
    <h2 class="movie-title">最新综艺</h2>
    <ul class="ul-wrapper" v-html="homeData.newVariety" @click="goDetail2"></ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      homeData: {
        type: Object,
        default: function () {
          return {
            today: [],
            newMovie: '',
            newTv: '',
            newComic: '',
            newVariety: ''
          }
        }
      }
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['webItem'])
    },
    methods: {
      goDetail (href) {
        this.$emit('get-detail', href)
      },
      goDetail2 (e) {
        if (e.target.tagName === 'A') {
          let href = this.webItem.href + e.target.getAttribute('data-href')
          this.$emit('get-detail', href)
        }
      }
    }
  }
</script>
