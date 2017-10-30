<template>
  <div class="web-movie-detail">
    <a class="back-home centerVertical" @click="goBack">返回<br>主页</a>
    <div class="detail-wrapper">
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
        <div class="detail-item-title">影片截图：</div>
        <div class="detail-item-content">
          <div class="detail-img" v-for="item in detailData.imgs">
            <img :src="item">
          </div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-item-title detail-item-title1">资源下载：</div>
        <div class="detail-item-content">
          <table border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>下载方式</th>
                <th>资源名称</th>
                <th>大小</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in detailData.download">
                <tr v-if="item.size[0].indexOf('网盘') < 0">
                  <td>{{item.size[0]}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.size[1]}}</td>
                  <td>
                    <a :href="item.href" class="btn">点击下载</a>
                    <a :data-clipboard-text="item.href" class="btn copy-btn">复制下载链接</a>
                  </td>
                </tr>
                <tr v-else>
                  <td>{{item.size[0] ? item.size[0] : '磁力'}}</td>
                  <td>{{detailData.title}}</td>
                  <td>{{item.size[1]}}：{{item.size[2]}}</td>
                  <td>
                    <a :href="item.href" target="_blank" class="btn">前往下载</a>
                    <a :data-clipboard-text="item.href" class="btn copy-btn">复制网盘链接</a>
                  </td>
                </tr>
              </template>
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
            imgs: [],
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
