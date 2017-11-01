<template>
  <div class="web-movie-home">
    <h2 class="movie-title">最新电影</h2>
    <div class="list-wrapper">
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>资源名称</th>
            <th>更新日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in homeData.newData">
            <td>{{item.title}}</td>
            <td>{{item.time}}</td>
            <td><a class="btn" @click="goDetail(item.href)">前往下载</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="movie-title">热门电影</h2>
    <div class="list-wrapper">
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>资源名称</th>
            <th>更新日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in homeData.thunderData">
            <td>{{item.title}}</td>
            <td>{{item.time}}</td>
            <td><a class="btn" @click="goDetail(item.href)">前往下载</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="movie-title">华语电视剧</h2>
    <div class="list-wrapper">
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>资源名称</th>
            <th>更新日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in homeData.chmovieData">
            <td>{{item.title}}</td>
            <td>{{item.time}}</td>
            <td><a class="btn" @click="goDetail(item.href)">前往下载</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="movie-title">欧美电视剧</h2>
    <div class="list-wrapper">
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>资源名称</th>
            <th>更新日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in homeData.enmovieData">
            <td>{{item.title}}</td>
            <td>{{item.time}}</td>
            <td><a class="btn" @click="goDetail(item.href)">前往下载</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="movie-title">热门综艺</h2>
    <div class="list-wrapper">
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>资源名称</th>
            <th>更新日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in homeData.varietyData">
            <td>{{item.title}}</td>
            <td>{{item.time}}</td>
            <td><a class="btn" @click="goDetail(item.href)">前往下载</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="movie-title">热门动漫</h2>
    <div class="list-wrapper">
      <table border="1" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>资源名称</th>
            <th>更新日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in homeData.comicData">
            <td>{{item.title}}</td>
            <td>{{item.time}}</td>
            <td><a class="btn" @click="goDetail(item.href)">前往下载</a></td>
          </tr>
        </tbody>
      </table>
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
            newData: [],
            thunderData: [],
            chmovieData: [],
            enmovieData: [],
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
