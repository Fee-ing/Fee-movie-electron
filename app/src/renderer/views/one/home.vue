<template>
  <div class="web-movie-home">
    <h2 class="movie-title">热门电影</h2>
    <div class="block-wrapper">
      <a class="block-item" v-for="item in homeData.movieHotData"
        :class="[ type === '1' ? 'block-item1' : 'block-item2' ]"
        :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">热门电视剧</h2>
    <div class="block-wrapper">
      <a class="block-item" v-for="item in homeData.tvHotData"
        :class="[ type === '1' ? 'block-item1' : 'block-item2' ]"
        :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">热门综艺</h2>
    <div class="block-wrapper">
      <a class="block-item" v-for="item in homeData.varietyHotData"
        :class="[ type === '1' ? 'block-item1' : 'block-item2' ]"
        :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">热门动漫</h2>
    <div class="block-wrapper">
      <a class="block-item" v-for="item in homeData.comicHotData"
        :class="[ type === '1' ? 'block-item1' : 'block-item2' ]"
        :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">最新电影</h2>
    <div class="block-wrapper">
      <a class="block-item" v-for="item in homeData.movieData"
        :class="[ type === '1' ? 'block-item1' : 'block-item3' ]"
        :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">最新电视剧</h2>
    <div class="block-wrapper">
      <a class="block-item" v-for="item in homeData.tvData"
        :class="[ type === '1' ? 'block-item1' : 'block-item3' ]"
        :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">最新综艺</h2>
    <div class="block-wrapper">
      <a class="block-item" v-for="item in homeData.varietyData"
        :class="[ type === '1' ? 'block-item1' : 'block-item3' ]"
        :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">最新动漫</h2>
    <div class="block-wrapper">
      <a class="block-item" v-for="item in homeData.comicData"
        :class="[ type === '1' ? 'block-item1' : 'block-item3' ]"
        :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: '1'
      },
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
