<template>
  <div class="web-movie-detail">
    <a class="back-home centerVertical" @click="goBack">返回<br>主页</a>
    <div class="detail-wrapper">
      <h1 class="detail-title">{{detailData.title}}</h1>
      <div class="detail-item">
        <div class="detail-item-content">
          <div class="center-img center-img1">
            <img :src="detailData.poster">
          </div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-item-title">简介：</div>
        <div class="detail-item-content detail-item-content1" v-html="detailData.info"></div>
      </div>
      <div class="detail-item">
        <div class="detail-item-title detail-item-title1 detail-item-title2">下载：</div>
        <div class="detail-item-content">
          <table border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>资源名称</th>
                <th class="width400">链接</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in detailData.download">
                <td>{{item.name}}</td>
                <td class="width400" :title="item.link">
                  <input :value="item.link">
                </td>
                <td>
                  <a :href="item.link" class="btn">迅雷下载</a>
                  <a :data-clipboard-text="item.link" class="btn copy-btn">复制链接</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detailData: {
        type: Object,
        default: function () {
          return {
            title: '',
            poster: '',
            info: '',
            download: []
          }
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      goBack () {
        document.querySelector('.detail-wrapper').scrollTop = 0
        this.$emit('go-back')
      }
    }
  }
</script>
