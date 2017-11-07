<template>
  <div class="web-movie-home">
    <h2 class="movie-title">热门电影</h2>
      <div class="block-wrapper">
        <template v-for="item in homeData.movieData">
          <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
            <div class="item-poster equalHeight">
              <img v-lazy="item.poster">
            </div>
            <h4 class="item-title">{{item.title}}</h4>
          </a>
        </template>
      </div>
      <h2 class="movie-title">最新电视剧</h2>
      <div class="block-wrapper">
        <template v-for="item in homeData.tvData">
          <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
            <div class="item-poster equalHeight">
              <img v-lazy="item.poster">
            </div>
            <h4 class="item-title">{{item.title}}</h4>
          </a>
        </template>
      </div>
      <h2 class="movie-title">高清电影</h2>
      <div class="block-wrapper">
        <template v-for="item in homeData.highMovieData">
          <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
            <div class="item-poster equalHeight">
              <img v-lazy="item.poster">
            </div>
            <h4 class="item-title">{{item.title}}</h4>
          </a>
        </template>
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
