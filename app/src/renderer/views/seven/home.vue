<template>
  <div class="web-movie-home">
    <h2 class="movie-title">24小时热门</h2>
    <div class="list-wrapper">
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>资源名称</th>
            <th>类型</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in homeData.tvData1">
            <td>{{item.title}}</td>
            <td>{{item.subTitle}}</td>
            <td><a class="btn" @click="goDetail(item.href)">查看详情</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="movie-title">最新发布</h2>
    <div class="block-wrapper">
      <a class="block-item block-item1" v-for="item in homeData.tvData2" :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">最后更新</h2>
    <div class="block-wrapper">
      <a class="block-item block-item2" v-for="item in homeData.tvData3" :title="item.title" @click="goDetail(item.href)">
        <div class="item-poster equalHeight">
          <img :src="item.poster">
        </div>
        <h4 class="item-title">{{item.title}}</h4>
        <h5 class="item-subTitle">{{item.subTitle}}</h5>
      </a>
    </div>
    <h2 class="movie-title">新剧推荐</h2>
    <div class="block-wrapper">
      <a class="block-item block-item1" v-for="item in homeData.tvData4" :title="item.title" @click="goDetail(item.href)">
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
            tvData1: [],
            tvData2: [],
            tvData3: [],
            tvData4: []
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
