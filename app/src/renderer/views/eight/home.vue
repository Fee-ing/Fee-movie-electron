<template>
  <div class="web-movie-home">
    <div class="block-wrapper">
        <a class="block-item block-item2" v-for="item in homeData.movieData" :title="item.title" @click="goDetail(item.href)">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title item-title1">{{item.title}}</h4>
          <h5 class="item-subTitle" v-html="item.subTitle"></h5>
        </a>
      </div>
      <div class="pagination-wrapper">
        <div class="pagination">
          <a class="pagination-item" v-for="item in homeData.pageData" :class="{ 'active': item.isCurrent }" @click="goPage(item.href)">{{item.name}}</a>
          <a class="pagination-item">{{homeData.totalPage}}</a>
        </div>
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
            pageData: [],
            totalPage: '1'
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
      },
      goPage (href) {
        document.querySelector('.web-movie-home').scrollTop = 0
        this.$emit('go-page', href)
      }
    }
  }
</script>
