<template>
  <div class="web-movie-detail">
    <a class="back-home centerVertical" @click="goBack">返回<br>主页</a>
    <div class="detail-wrapper fourdetail-wrapper">
      <h1 class="detail-title">{{detailData.title}}</h1>
      <div class="info-wrapper flexbox">
        <div class="info-left">
          <img :src="detailData.poster">
        </div>
        <div class="info-right flex1" v-html="detailData.info"></div>
      </div>
      <div class="detail-item">
        <div class="detail-item-title">剧情简介：</div>
        <div class="detail-item-content" v-html="detailData.description"></div>
      </div>
      <div class="detail-item">
        <div class="detail-item-title detail-item-title1">资源下载：</div>
        <div class="detail-item-content">
          <table border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>资源名称</th>
                <th>清晰度</th>
                <th>大小</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in detailData.download">
                <td>{{item.name}}</td>
                <td>{{item.type}}</td>
                <td>{{item.size}}</td>
                <td>
                  <a :href="item.link1" class="btn">种子下载</a>
                  <a :href="item.link2" class="btn">磁力链接</a>
                  <a :data-clipboard-text="item.link2" class="btn copy-btn">复制磁力链接</a>
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
            description: '',
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

<style lang="less" scoped>
  .threedetail-wrapper{
    padding-top: 20px !important;
  }
</style>
