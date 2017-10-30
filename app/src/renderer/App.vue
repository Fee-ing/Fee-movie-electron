<template>
  <div id="app" class="flexbox">
    <div class="app-left flexbox flex-column">
      <div class="search-wrapper centerVertical">
        <form class="search-form flexbox">
          <select class="search-select" v-model="searchType">
            <option value="1">默认搜索</option>
            <option value="2">韩饭搜索</option>
            <option value="3">老司机搜索</option>
          </select>
          <input type="text" name="keywords" class="search-input flex1" placeholder="想看什么就搜一搜吧" v-model="keywords">
          <a class="search-btn centerVertical" @click="searchOpt">搜索</a>
        </form>
      </div>
      <div class="weblist-wrapper flex1">
        <a v-for="item in WEBCONFIG.common" v-if="item.show" class="weblist-item" :class="{'active': webItem.type === item.type}" :title="item.name+'——'+item.desc" @click="changeWebOpt(item)">
          <div class="weblist-item-info verticalbox">
            <img class="weblist-item-icon" :src="item.favicon">
            <span class="weblist-item-name">{{item.name}}</span>
          </div>
          <p class="weblist-item-desc words-point">{{item.desc}}</p>
        </a>
      </div>
    </div>
    <div class="app-right flexbox flex-column">
      <div class="webtitle-wrapper border-bottom">
        <h2 class="webtitle" v-if="title">{{title}}</h2>
        <h2 class="webtitle" v-else>{{webItem.name}}<span>{{webItem.desc}}</span></h2>
      </div>
      <div class="web-wrapper flex1">
        <div class="load-wrapper" v-show="!isLoad"></div>
        <div class="transform-wrapper" v-show="isLoad" 
          :style="{ transform: 'rotateY(' + rotateDeg + 'deg)' }"
          :class="[ rotateDeg === 0 ? 'front' : 'back' ]">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'

  import WEBCONFIG from './assets/js/webconfig.js'

  export default {
    name: 'app',
    data () {
      return {
        WEBCONFIG: WEBCONFIG,
        keywords: '',
        searchType: '1'
      }
    },
    computed: {
      ...mapGetters(['title', 'webItem', 'isLoad', 'rotateDeg'])
    },
    methods: {
      ...mapActions(['isLoadTrue', 'changeRotateDeg', 'searchOne', 'searchSix', 'searchEight']),
      ...mapMutations({
        changeWebItem: 'CHANGE_WEBITEM',
        changeTitle: 'CHANGE_TITLE',
        changeRotateDeg: 'CHANGE_ROTATEDEG',
        changeKeywords: 'CHANGE_KEYWORDS',
        changeSearchType: 'CHANGE_SEARCHTYPE',
        initSearchData: 'INIT_SEARCHDATA'
      }),
      changeWebOpt (item) {
        this.changeRotateDeg(0)
        this.changeWebItem(item)
        this.$router.push({path: item.path, query: {time: (new Date()).getTime()}})
      },
      searchOpt () {
        if (this.keywords) {
          this.isLoadTrue(false)
          this.changeKeywords(this.keywords)
          this.changeSearchType(this.searchType)
          if (this.searchType === '1') {
            this.changeTitle('默认搜索结果')
            Promise
            .all([this.searchOne(this.keywords), this.searchSix({keywords: this.keywords, page: 1})])
            .then((results) => {
              this.isLoadTrue(true)
              this.$router.push({path: '/search'})
            })
          } else if (this.searchType === '2') {
            this.changeTitle('韩饭搜索结果')
            this.searchEight({keywords: this.keywords})
            .then((results) => {
              this.isLoadTrue(true)
              this.$router.push({path: '/search'})
            })
          }
        }
      }
    }
  }
</script>

<style lang="less">
html, body, #app{
  width: 100%;
  height: 100%;
  min-width: 1120px;
  min-height: 768px;
}
#app{
  .app-left{
    width: 30%;
    background-color: #ECEAE8;
    .search-wrapper{
      height: 70px;
      .search-form{
        height: 40px;
        border: 1px solid #ccc;
        .search-select, .search-input{
          font-size: 12px;
          padding: 0 5px;
          border: none;
          outline: none;
          background-color: transparent;
        }
        .search-input{
          width: 150px;
        }
        .search-btn{
          padding: 0 10px;
          font-size: 12px;
          &:hover{
            color: #000;
          }
        }
      }
    }
    .weblist-wrapper{
      overflow-y: auto;
      .weblist-item{
        display: block;
        padding: 10px 15px;
        &.active{
          background-color: #C6C5C6;
          &:hover{
            background-color: #C6C5C6;
          }
        }
        &:hover{
          background-color: #DFDDDB;
        }
        .weblist-item-info{
          height: 16px;
          .weblist-item-icon{
            width: 16px;
            height: 16px;
            margin-right: 10px;
          }
          .weblist-item-name{
            display: inline-block;
            height: 16px;
            line-height: 16px;
            font-size: 14px;
          }
        }
        .weblist-item-desc{
          height: 16px;
          font-size: 12px;
          margin-top: 10px;
        }
      }
    }
  }
  .app-right{
    width: 70%;
    background-color: #f5f5f5;
    .webtitle-wrapper{
      position: relative;
      padding: 15px;
      h2 span{
        font-weight: normal;
        font-size: 13px;
        margin-left: 15px;
      }
    }
    .web-wrapper{
      overflow: hidden;
      .load-wrapper{
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100px 100px;
        background-image: url(./assets/imgs/loading.gif)
      }
      .transform-wrapper{
        height: 100%;
        transition: all 0.8s;
        &.front{
          .web-all{
            .web-movie-home{
              z-index: 10;
              background-color: #f5f5f5;
            }
            .web-movie-detail{
              z-index: 5;
            }
          }
        }
        &.back{
          .web-all{
            .web-movie-home{
              z-index: 5;
            }
            .web-movie-detail{
              z-index: 10;
              background-color: #f5f5f5;
            }
          }
        }
        .web-all{
          position: relative;
          height: 100%;
          .web-movie-home, .web-movie-detail{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: transparent;
            transition: all 0.8s;
          }
          .web-movie-home{
            z-index: 10;
            padding: 0 20px 30px;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
          }
          .web-movie-detail{
            z-index: 5;
            transform: rotateY(-180deg);
            overflow: hidden;
            .detail-wrapper{
              height: 100%;
              padding: 0 20px 30px;
              overflow-y: auto;
              -webkit-overflow-scrolling : touch;
              &.detail-wrapper1{
                overflow: hidden;
                padding: 0;
              }
              .iframe{
                width: 100%;
                height: 100%
              }
            }
            .back-home{
              position: fixed;
              right: 25px;
              bottom: 80px;
              z-index: 100;
              width: 50px;
              height: 50px;
              background-color: rgba(0, 0, 0, 0.6);
              border-radius: 50%;
              color: #fff;
              font-size: 12px; 
              &:hover{
                background-color: #000;
              }
            }
          }
        }
      }
    }
  }
}
</style>
