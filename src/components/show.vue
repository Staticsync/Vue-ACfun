<!--关注页面-->
<template>
  <div class="showpage">
      <div style="width:4rem;hight:4rem;font-size:1.5rem;">追的番剧</div>
      <div>
       <img src="../assets/image/focus1.png" alt="">
      </div>
      <div>UP主推荐<h4>还没有关(shi)注(jian)UP主，给级介绍几个</h4></div>


      <div class="show-content">
        <div class="showItem col-xs-8" @click="showDetail(item.archive.aid)" v-for="item in showList" key="item.archive.aid">
         <div class="totalshow">
          <img src="item.archive.owner.face" alt="">
          <span class="recommond">{{item.archive.owner.name}}</span>
          <span class="follow"  @click="follow"> + 关注</span>
         </div>
            <img :src="item.pic" alt="" class="showImg">    
            <div class="showInfo">
                <span class="showTag">#{{item.archive.tname}}#</span>
                <span class="showTitle">{{item.archive.title}}</span>
                <div class="showUser">
                    <span class="showAuthor">{{item.archive.owner.name}}</span>
                    <!--<i class="fa fa-eye" aria-hidden="true"></i>
                    <span class="showNum">{{item.archive.stat.view}}</span>-->
                </div>
            </div>
       </div>
      </div>
  </div>
</template>

<script>
import vSwiper from '@/components/swiper.vue'
export default {
    data () {
        return {
            isAbout:'',
            props: {
                banner: Object 
             }
        }
    },
    components: {
        vSwiper,
    },
    computed: {
        showList() {
             return this.$store.state.showList;      
        },
        banner() {
            return this.$store.state.banner;  
        }
    },
    mounted () {
         this.axios.get('/api/show-list').then(res => {
                this.$store.state.showList = res.data.data;
             }).catch((error) => {
                console.log(error)
        })
         this.axios.get('/api/banner').then(res => {
                this.$store.state.banner = res.data.data;
             }).catch((error) => {
                console.log(error)
        })
    },
    methods: {
         showDetail(aid) {
             this.$store.state.displayHeader = false;
             this.$router.push(
                 {name: 'showPlay', params: {'aid': aid}}
             )
         },
        showMe() {
            this.isAbout = true;
        },
        back () {
            this.isAbout = false
        },
             follow() {
         var follow = document.querySelector('.follow')
         follow.innerHTML = '已关注'
         follow.style.color = '#AFAFAF'
         follow.style.borderColor = '#AFAFAF'
     }
    }

}
</script>

<style lang="scss" scoped>
@import '../assets/css/show.scss';

</style>