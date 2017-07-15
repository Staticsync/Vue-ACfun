<template lang="html">
  <div class="wrap">
    <div class="head">
      <div class="back" @click="util.comBack">
        <img src="../assets/image/返回.png" alt="" >
      </div>
      <p>离线缓存</p>
    </div>
    <div class="resultwrap" v-if="result">
      <div class="title"><span class="key">{{key}}</span></div>
      <div class="result" v-for="(item,index) in items" key="item.id">
        <img :src="item.image" alt="">
        <p class="desc">{{item.desc}}</p>
        <p class="price">￥{{item.price}}</p>
        <div class="more">
          <span class="addr">{{item.addr}}</span>
          <span class="time">{{item.time}}</span>
        </div>
      </div>
    </div>
    <div class="noresultwrap" v-else>
      <img src="../assets/image/123.png" alt="">
    </div>
  </div>
</template>
<script>
  import {
    Toast
  } from 'mint-ui'
  export default {
    data() {
      return {
        keywords: '',
        items: '',
        result: false,
        key: ''
      }
    },
    methods: {
      search(keywords) {
        this.items = ''
        this.key = keywords
        if (this.key == '') {
          Toast('请输入要搜的宝贝~')
          return
        }
        this.axios.get('https://easy-mock.com/mock/593f72288ac26d795ff1e570/search/results')
          .then((res) => {
            let result = res.data
            console.log(result)
            for (let i in result) {
              let item = i
              console.log(item)
              console.log(item.indexOf(this.keywords))
              if (item.indexOf(this.keywords) !== -1) {
                this.items = result[item]
              }
            }
            if (this.items.length > 0) {
              this.result = true
            } else {
              this.result = false
            }
            console.log(this.result)
          }).catch((error) => {
            console.log(error)
          })


      }
    }
  }

</script>

<style lang="css" scoped>
/*@import '../assets/imags/css/search.css'*/

.wrap {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
}

.head {
  background-color: #F8565F;
  width: 100%;
  height: 5rem;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  font-size:1.8rem;  
  color:white;
  padding-left:1rem;
}

.head .back {
  width: 3rem;
  height: 3rem;
}

.back img {
  padding-top:.8rem;
  padding-left:-.8rem;
  width: 1.3rem;
  height: 1.3rem;
}

.search {
  border: none;
  outline: none;
  background-color: #f3f3f3;
  font-size: 1.5rem;
}

.resultwrap,
{
  width: 100%;
}

.noresultwrap {
  width: 100%;
  height: 80%;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
}

.noresultwrap .noresult {
  position: absolute;
  left: 35px;
  top: 100px;
  width: 14rem;
  font-size: 1.8rem;
  color: #7B7B7B;
}

.noresultwrap img {
  position: absolute;
  left: 55px;
  top: 120px;
}

.title {
  padding: 1rem 1rem;
  font-size: 1.5rem;
  color: #000;
  box-sizing: border-box;
}

.key {
  display: inline-block;
  padding: .4rem 1rem;
  box-sizing: border-box;
}

.result {
  display: inline-block;
  width: 48%;
  height: auto;
  background-color: #fff;
}

.result:nth-child(2n+1) {
  margin-left: 4%;
}

.result img {
  width: 100%;
  height: 12rem;
}

.result .desc,
.result .price {
  width: 100%;
  padding: .4rem .4rem;
  box-sizing: border-box;
}

.result .desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000;
  font-size: 1.4rem;
}

.result .price {
  color: red;
  font-size: 1.4rem;
}

.result .more {
  padding: 0 .4rem .4rem .4rem;
  box-sizing: border-box;
  font-size: 1.3rem;
  color: #888;
  display: -webkit-flex;
  display: flex;
}

.more .addr {
  flex: 1;
}

</style>
