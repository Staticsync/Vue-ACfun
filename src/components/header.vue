<template>
  <div class="headpage">
    <div class="b-header" v-if="($route.name !== 'showPlay' )  && ($route.name !== 'dramaPlay') && ($route.name !== 'recommondPlay') && ($route.name !== 'searchList')" :style="{backgroundColor: skinColor}">
      <div class="wowo">
        <i class="fa fa-bars" aria-hidden="true" @click="toggleSidebar"></i>
        <img src="../assets/image/loginpic.png" @click="toggleSidebar" alt="" class="b-avatar">
        <i class="fa icon-acfun"></i>
        <div class="right">
          <i class="fa" aria-hidden="true">
                    <router-link to="/gameshop"><i class="icon-game"></i></router-link>
          </i>
          <i class="fa" aria-hidden="true">
                     <router-link to="/download"><i class="icon-dowmload"></i></router-link>
          </i>
  
          <i class="fa" aria-hidden="true">
                       <router-link to="/lishi"><i class="icon-history"></i></router-link>
          </i>
          <i class="fa" aria-hidden="true">       
                       <router-link to="/search"><i class="icon-search"></i></router-link>
          </i>
        </div>
      </div>
      <div class="b-navbar">
        <ul>
          <li class="b-show">
            <router-link to="/show">关注</router-link>
          </li>
          <li class="b-recommond">
            <router-link to="/recommond">推荐</router-link>
          </li>
          <li class="b-drama">
            <router-link to="/drama">番剧</router-link>
          </li>
          <li class="b-partition">
            <router-link to="/partition">娱乐</router-link>
          </li>
          <li class="b-follow">
            <router-link to="/follow">文章</router-link>
          </li>
          <li class="b-find">
            <router-link to="/find">频道</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="b-content">
      <router-view></router-view>
    </div>
    <transition name="fold">
      <div class="b-sidebar" v-if="sidebarShow">
        <div class="b-user" :style="{backgroundColor: skinColor}">
          <div class="user-desc">
            <div>
              <img src="../assets/image/loginpic.png" alt="">
              <span class="user-username" @click="tologin">立即登录</span>
              <span class="unlogin">登录解锁更多精彩功能</span>
            </div>
          </div>
          <div class="icon" style="color: white">
            <i class="fa fa-envelope" aria-hidden="true"></i>
            <i class="fa fa-moon-o" aria-hidden="true" @click="changeColor('#080C10')" v-if="isShowSkin"></i>
            <!--换肤逻辑-->
            <i class="fa fa-sun-o" aria-hidden="true" @click="changeColor('#F8565F')" v-if="!isShowSkin"></i>
          </div>
          <div @click="register" class="item">
            <button>快速注册</button>
          </div>
        </div>
        <div class="b-sideItem">
          <button v-for="(item,$index) in items" @click="selectStyle (item, $index) " :class="{'active':item.active,'unactive':!item.active}">
                          {{item.select}}
                           <span class="icon" v-show="item.active"><a href="https://staticsync.github.io/myresume/#info">今天已签到</a></span>
                        </button>
          <ul class="side-List">
            <li class="item icon-history">&nbsp&nbsp历史记录<span class="number"></span></li>
  
            <li class="item icon-dowmload">&nbsp&nbsp离线缓存<span class="number"></span></li>
  
            <li class="item icon-fans">&nbsp&nbsp关注和粉丝<span class="number"></span></li>
  
            <li class="item icon-star">&nbsp&nbsp我的收藏<span class="number"></span></li>
  
            <li class="item icon-upload">&nbsp&nbsp我的投稿</li>
  
            <li class="item icon-game">&nbsp&nbsp游戏中心<span class="number"></span></li>
  
            <li class="item icon-shop">&nbsp&nbsp周边商城<span class="number"></span></li>
  
            <li class="item icon-setting">&nbsp&nbsp设置<span class="number"></span></li>
  
            <li class="item icon-idea">&nbsp&nbsp意见反馈<span class="number"></span></li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="sidebarShow" @click="toggleSidebar"></div>
    </transition>
    <transition name="slide">
      <div class="search" v-if="searchbarShow">
        <div class="b-searchbar">
          <i class="fa fa-arrow-left" aria-hidden="true" @click="back"></i>
          <input type="search" placeholder="搜索视频，番剧，up主或av号" v-model="keywords" @keypress.enter="searchSub">
          <i class="fa fa-search" aria-hidden="true" @click="searchSub"></i>
        </div>
        <div class="searchList" v-show="isListShow">
          <ul>
            <li v-for="list in searchList" @click="searchPlay(list.aid, list.title, list.description)">
              <img :src="list.pic" alt="" class="pic">
              <span class="title">{{list.title}}</span>
              <span class="author">{{list.author}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        active: false,
        　　　　　　　　items: [　　　　　　　　　　{
          select: '签到'
        }　　　　　　　　],
        sidebarShow: false,
        isShowSkin: true,
        keywords: '',
        url: ''
      }
    },
    created() {
      this.axios.get('/api/show-list')
        .then(res => {
          this.$store.state.showList = res.data.showList;
        })
    },
    computed: {
      skinColor() {
        return this.$store.state.skinColor;
      },
      showList() {
        return this.$store.state.showList;
      },
      searchList() {
        return this.$store.state.searchList;
      },
      isListShow() {
        return this.$store.state.isListShow;
      },
      searchbarShow() {
        return this.$store.state.searchbarShow;
      },
    },
    methods: {
  
      tologin() {
        this.sidebarShow = !this.sidebarShow
        this.$router.push({
          path: '/login'
        })
      },
      register() {
        this.sidebarShow = !this.sidebarShow
        this.$router.push({
          path: '/register'
        })
      },
  
      selectStyle(item, index) {　　　　　　
        this.$nextTick(function() {　　　　　　　　
          this.items.forEach(function(item) {　　　　　　　　　　
            Vue.set(item, 'active', false);　　　　　　　　
          });　　　　　　　　
          Vue.set(item, 'active', true);
          item.select = "";　　　　　　
        });　　　　
      },
      toggleSidebar() {
        this.sidebarShow = !this.sidebarShow
      },
      toggleSearchbar() {
        this.$store.state.searchbarShow = !this.$store.state.searchbarShow
      },
      searchShow() {
        this.$router.push({
          path: '/#/search'
        })
        this.$store.state.searchbarShow = !this.$store.state.searchbarShow
      },
      searchSub() {
        let keywords = this.keywords
        this.util.openIndicator()
        this.axios.post('https://api.imjad.cn/bilibili/?get=search&keyword=' + keywords).then((res) => {
          this.util.closeIndicator()
          this.$store.state.searchList = res.data.result.video
          this.$store.state.isListShow = true
        }).catch((error) => {
          this.util.pop()
          this.keywords = ''
        })
      },
      searchPlay(aid, title, description) {
        this.$router.push({
          name: 'searchList',
          params: {
            'aid': aid
          }
        })
        this.$store.state.searchTitle = title
        this.$store.state.searchDesc = description
        this.$store.state.isListShow = false;
        this.$store.state.searchbarShow = false;
      },
      changeColor(color) {
        this.$store.commit('changeColor', color)
        this.isShowSkin = !this.isShowSkin
        localStorage.skinColor = color;
      },
      back() {
        this.$router.push({
          name: 'show'
        })
        this.$store.state.searchbarShow = false
        this.$store.state.isListShow = false
  
      },
  
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/header.scss';
  @import '../assets/css/style.css';
</style>

