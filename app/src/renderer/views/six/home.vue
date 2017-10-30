<template>
  <div class="web-movie-home">
    <div class="list-wrapper">
        <table border="1" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th class="width400">资源名称</th>
              <th>更新日期</th>
              <th>下载方式</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in homeData.movieData">
              <td class="width400">{{item.title}}</td>
              <td>{{item.time}}</td>
              <td>{{item.type}}</td>
              <td><a class="btn" target="_blank" :href="item.href">前往下载</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-wrapper">
        <div class="pagination">
          <a class="pagination-item page-first" v-if="page === '1'" @click="goPage">首页</a>
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
        page: '1'
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
