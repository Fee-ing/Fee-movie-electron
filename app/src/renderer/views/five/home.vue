<template>
  <div class="web-movie-home">
    <h2 class="movie-title">热门电影</h2>
      <div class="block-wrapper">
        <a class="block-item block-item1" v-for="item in homeData.movieData" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
        </a>
      </div>
      <h2 class="movie-title">最新电视剧</h2>
      <div class="block-wrapper">
        <a class="block-item block-item1" v-for="item in homeData.tvData" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
        </a>
      </div>
      <h2 class="movie-title">高清电影</h2>
      <div class="block-wrapper">
        <a class="block-item block-item1" v-for="item in homeData.highMovieData" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
        </a>
      </div>
  </div>
</template>

<script>
  export default {
    props: {
      homeData: {
        type: Object,
        default: function () {
          return {
            movieData: [],
            tvData: [],
            highMovieData: []
          }
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      goDetail (href) {
        this.$emit('get-detail', href)
      }
    }
  }
</script>
