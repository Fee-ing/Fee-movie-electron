<template>
  <div class="web-movie-home">
    <template v-if="searchType === '1'">
      <template v-if="searchData.searchOneData.length > 0">
        <h2 class="movie-title">80s搜索结果</h2>
        <div class="block-wrapper">
          <a class="block-item block-item1" v-for="item in searchData.searchOneData" :title="item.title" @click="goDetail(item.href, '1')">
            <div class="item-poster equalHeight">
              <img :src="item.poster">
            </div>
            <h4 class="item-title">{{item.title}}</h4>
            <h5 class="item-subTitle">{{item.subTitle}}</h5>
          </a>
        </div>
      </template>
      <template v-if="searchData.searchSixData.length > 0">
        <h2 class="movie-title">去转盘网搜索结果</h2>
        <div class="list-wrapper">
          <table border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th class="width400">资源名称</th>
                <th>大小</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in searchData.searchSixData">
                <td class="width400" v-html="item.title"></td>
                <td>{{item.size[2] ? item.size[2].replace(/大小：/g, '') : ''}}</td>
                <td><a class="btn" target="_blank" :href="item.href">前往下载</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </template>
    <template v-if="searchType === '2' && searchData.searchEightData">
      <h2 class="movie-title">韩饭网搜索结果</h2>
      <div class="block-wrapper">
        <a class="block-item block-item2" v-for="item in searchData.searchEightData.data" :title="item.title" @click="goDetail(item.href, '2')">
          <div class="item-poster equalHeight">
            <img :src="item.poster">
          </div>
          <h4 class="item-title item-title1">{{item.title}}</h4>
          <h5 class="item-subTitle" v-html="item.subTitle"></h5>
        </a>
      </div>
      <div class="pagination-wrapper">
        <div class="pagination">
          <a class="pagination-item" v-for="item in searchData.searchEightData.pageData" :class="{ 'active': item.isCurrent }" @click="goPage(item.href)">{{item.name}}</a>
          <a class="pagination-item">{{searchData.searchEightData.totalPage}}</a>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      searchData: {
        type: Object,
        default: function () {
          return {
            searchOneData: [],
            searchSixData: [],
            searchEightData: null
          }
        }
      },
      searchType: {
        type: String,
        default: '1'
      }
    },
    data () {
      return {
      }
    },
    methods: {
      goDetail (href, type) {
        this.$emit('get-detail', {href: href, type: type})
      },
      goPage (href) {
        document.querySelector('.web-movie-home').scrollTop = 0
        this.$emit('go-page', href)
      }
    }
  }
</script>
