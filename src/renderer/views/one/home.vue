<template>
  <div class="web-movie-home">
    <h2 class="movie-title">热门电影</h2>
    <div class="block-wrapper">
      <template v-for="item in homeData.movieHotData">
        <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
          <h5 class="item-subTitle">{{item.subTitle}}</h5>
        </a>
      </template>
    </div>
    <h2 class="movie-title">热门电视剧</h2>
    <div class="block-wrapper">
      <template v-for="item in homeData.tvHotData">
        <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
          <h5 class="item-subTitle">{{item.subTitle}}</h5>
        </a>
      </template>
    </div>
    <h2 class="movie-title">热门综艺</h2>
    <div class="block-wrapper">
      <template v-for="item in homeData.varietyHotData">
        <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
          <h5 class="item-subTitle">{{item.subTitle}}</h5>
        </a>
      </template>
    </div>
    <h2 class="movie-title">热门动漫</h2>
    <div class="block-wrapper">
      <template v-for="item in homeData.comicHotData">
        <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
          <h5 class="item-subTitle">{{item.subTitle}}</h5>
        </a>
      </template>
    </div>
    <h2 class="movie-title">最新电影</h2>
    <div class="block-wrapper">
      <template v-for="item in homeData.movieData">
        <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
          <h5 class="item-subTitle">{{item.subTitle}}</h5>
        </a>
      </template>
    </div>
    <h2 class="movie-title">最新电视剧</h2>
    <div class="block-wrapper">
      <template v-for="item in homeData.tvData">
        <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
          <h5 class="item-subTitle">{{item.subTitle}}</h5>
        </a>
      </template>
    </div>
    <h2 class="movie-title">最新综艺</h2>
    <div class="block-wrapper">
      <template v-for="item in homeData.varietyData">
        <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
          <h5 class="item-subTitle">{{item.subTitle}}</h5>
        </a>
      </template>
    </div>
    <h2 class="movie-title">最新动漫</h2>
    <div class="block-wrapper">
      <template v-for="item in homeData.comicData">
        <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title">{{item.title}}</h4>
          <h5 class="item-subTitle">{{item.subTitle}}</h5>
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
            movieHotData: [],
            tvHotData: [],
            varietyHotData: [],
            comicHotData: [],
            movieData: [],
            tvData: [],
            varietyData: [],
            comicData: []
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
