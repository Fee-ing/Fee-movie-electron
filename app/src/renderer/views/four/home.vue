<template>
  <div class="web-movie-home">
    <div class="block-wrapper">
      <a class="block-item block-item1" v-for="item in homeData.movieData" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title item-title1" :title="item.title">{{item.title}}</h4>
      </a>
    </div>
    <div class="pagination-wrapper">
      <div class="pagination">
        <a class="pagination-item page-first" v-if="page === 1" @click="goPage">首页</a>
        <a class="pagination-item" v-else @click="goPage('up')">上一页</a>
        <span class="page-on">第{{page}}页</span>
        <a class="pagination-item" @click="goPage('down')">下一页</a>
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
            movieData: []
          }
        }
      }
    },
    data () {
      return {
        page: 1
      }
    },
    methods: {
      goDetail (href) {
        this.$emit('get-detail', href)
      },
      goPage (type) {
        if (type === 'up') {
          if (this.page > 1) {
            this.page--
          }
        } else if (type === 'down') {
          this.page++
        } else {
          this.page = 1
        }
        document.querySelector('.web-movie-home').scrollTop = 0
        this.$emit('go-page', this.page)
      }
    }
  }
</script>
