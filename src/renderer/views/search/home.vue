<template>
  <div class="web-movie-home">
    <template v-if="searchType === '1' && searchData.searchOneData.length > 0">
      <h2 class="movie-title">80s搜索结果</h2>
      <div class="block-wrapper">
        <template v-for="item in searchData.searchOneData">
          <a class="block-item block-item1" :title="item.title" @click="goDetail(item.href, '1')">
            <div class="item-poster equalHeight">
              <img v-lazy="item.poster">
            </div>
            <h4 class="item-title">{{item.title}}</h4>
            <h5 class="item-subTitle">{{item.subTitle}}</h5>
          </a>
        </template>
      </div>
    </template>
    <template v-else-if="searchType === '2' && searchData.searchDtData && searchData.searchDtData.data.length > 0">
      <template v-if="searchData.searchDtData.resultType === '1'">
        <h2 class="movie-title">DiggBT搜索结果</h2>
        <div class="list-wrapper">
          <table border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th class="width250">资源名称</th>
                <th>资源类型</th>
                <th>大小</th>
                <th>文件数</th>
                <th>下载速度</th>
                <th>更新日期</th>
                <th>下载类型</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in searchData.searchDtData.data">
                <td class="width250" v-html="item.title"></td>
                <td v-html="item.subTitle"></td>
                <td v-html="item.size"></td>
                <td v-html="item.num"></td>
                <td v-html="item.speed"></td>
                <td v-html="item.time"></td>
                <td v-html="item.downloadType"></td>
                <td>
                  <a class="btn" :href="item.download">点击下载</a>
                  <a :data-clipboard-text="item.download" class="btn copy-btn">复制链接</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-wrapper">
          <div class="pagination">
            <template v-for="item in searchData.searchDtData.pageData">
              <a class="pagination-item active" v-if="item.isCurrent">{{item.name}}</a>
              <a class="pagination-item" @click="goPage(item.href, '1')" v-else>{{item.name}}</a>
            </template>
            <a class="pagination-item">{{searchData.searchDtData.totalPage}}</a>
          </div>
        </div>
      </template>
      <template v-if="searchData.searchDtData.resultType === '2'">
        <h2 class="movie-title">DiggBT搜索结果</h2>
        <div class="list-wrapper">
          <table border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th class="width250">资源名称</th>
                <th>收录时间</th>
                <th>活跃热度</th>
                <th>最后活跃</th>
                <th>文件大小</th>
                <th>下载</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in searchData.searchDtData.data">
                <td class="width250" v-html="item.title"></td>
                <td v-html="item.time"></td>
                <td v-html="item.active"></td>
                <td v-html="item.last"></td>
                <td v-html="item.size"></td>
                <td>
                  <template v-for="i in item.download">
                    <a class="btn" :href="i.href">{{i.name}}</a>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-wrapper">
          <div class="pagination">
            <template v-for="item in searchData.searchDtData.pageData">
              <a class="pagination-item active" v-if="item.isCurrent">{{item.name}}</a>
              <a class="pagination-item" @click="goPage(item.href, '1')" v-else>{{item.name}}</a>
            </template>
          </div>
        </div>
      </template>
    </template>
    <template v-else-if="searchType === '3' && searchData.searchEightData && searchData.searchEightData.data.length > 0">
      <h2 class="movie-title">韩饭网搜索结果</h2>
      <div class="block-wrapper">
        <template v-for="item in searchData.searchEightData.data">
          <a class="block-item block-item2" :title="item.title" @click="goDetail(item.href, '2')">
            <div class="item-poster equalHeight">
              <img v-lazy="item.poster">
            </div>
            <h4 class="item-title item-title1">{{item.title}}</h4>
            <h5 class="item-subTitle" v-html="item.subTitle"></h5>
          </a>
        </template>
      </div>
      <div class="pagination-wrapper">
        <div class="pagination">
          <template v-for="item in searchData.searchEightData.pageData">
            <a class="pagination-item" :class="{ 'active': item.isCurrent }" @click="goPage(item.href, '2')">{{item.name}}</a>
          </template>
          <a class="pagination-item">{{searchData.searchEightData.totalPage}}</a>
        </div>
      </div>
    </template>
    <div class="no-result centerVertical" v-else>
      <p>很抱歉，没有找到您想要的结果</p>
    </div>
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
      goPage (href, type) {
        document.querySelector('.web-movie-home').scrollTop = 0
        this.$emit('go-page', {href: href, type: type})
      }
    }
  }
</script>

<style lang="less" scoped>
  .no-result{
    height: 100%;
    p{
      font-weight: bold;
      font-size: 16px;
    }
  }
</style>
