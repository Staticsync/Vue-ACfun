<template>
	<div class="loginbox">
		<div class="head">
			<div class="back" @click="Back">
				<img src="../assets/image/返回.png" alt="">
			</div>
			<div class="title">注册</div>
		</div>
			<div class="inputbox">
				 <i class="icon iconfont">&#xe61f;</i>
				<input type="text" v-model="username" name="username" placeholder="手机号">
			</div>
			<div class="inputbox" style="width:60%;">
				 <i class="icon iconfont">&#xe6d1;</i>
				<input type="text" v-model="username" name="username" placeholder="验证码" style="padding-right:1rem;">
			</div>
			<button class="validate">获取短信验证码</button>
			<div class="inputbox">
				 <i class="icon iconfont">&#xe603;</i>
				<input type="text" v-model="username" name="username" placeholder="昵称(4-16字)">
			</div>

			<div class="inputbox">
				 <i class="icon iconfont">&#xe6fb;</i>
				<input type="text" v-model="username" name="username" placeholder="密纹((6-16位)">
			</div>

			<div class="inputbox">
				<i class="icon iconfont">&#xe6fb;</i>
				<input type="password" name="password" v-model="password" placeholder="重复密纹">
			</div>

			<div class="button">
				<button class="login" @click="gologin">完成注册</button>
			</div>
			<div class="bottom">
			  <mt-button @click.native="popupVisible1 = true" size="large" ref="button" style="color:#88D8F2;">海外用户注册请点击这里</mt-button>
			</div>
		<mt-popup v-model="popupVisible1" popup-transition="popup-fade" class="mint-popup-1" :style="{ top: buttonBottom + 10 + 'px' }">
      <h1>海外用户注册请联系客服</h1>
      <p>联系方式</p>
      <p>客服QQ：800055564</p>
      <p>官方邮箱：report@acfun.tv</p>
    </mt-popup>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		Toast,
		MessageBox
	} from 'mint-ui'
	import router from '@/router'
	export default {
		data() {
			return {
				popupVisible1: false,
				username: '',
				password: '',
				url: './static/loginpic.png'
			}
		},
		computed: mapGetters(['login']),
		methods: {
			Back() {
				router.go(-1)
			},
			register () {
      this.sidebarShow = !this.sidebarShow
			this.$router.push({path:'/register'})     
		},
			addPic(e) {
				let vm = this;
				let add = document.querySelector('input[type=file]')
				add.click()
				return false;
			},
			fileInput(e) {
				var files = e.target.files
				console.log(files)
				if (!files.length) return;
				this.createImage(files, e);
			},
			createImage(files, e) {
				let vm = this;
				// lrz图片先压缩在加载、
				this.lrz(files[0], {
					width: 480
				}).then(function(rst) {
					vm.url = rst.base64;
					return rst;
				}).always(function() {
					// 清空文件上传控件的值
					e.target.value = null;
				});
			},
			gologin() {
				if (this.username == '') {
					Toast('请输入账户名')
				} else if (this.password == '') {
					Toast('请输入密码');
				} else if (this.password.length <= 6) {
					Toast('密码不能低于6位哟')
				} else {
					window.localStorage.setItem('username', this.username)
					window.localStorage.setItem('password', this.password)
					this.$store.dispatch('hasLogin')
					// let username = window.localStorage.getItem('username')
					let obj = {}
					obj.avatar = this.url
					obj.username = this.username
					obj.password = this.password
					this.$store.dispatch('setUsername', this.username)
					this.$store.dispatch('setUserinfo', obj)
					Toast({
						message: '登录成功',
						duration: 500
					});
					setTimeout(() => {
						this.$router.push({
							path: '/'
						})
					}, 600)
					this.$store.dispatch('setCurindex', 0)
				}
			}
		}
	}
</script>

<style lang="css" scoped>

@component-namespace page {
    @component popup {
      @descendent wrapper {
        padding: 0 20px;
        position: absolute 50% * * *;
        width: 100%;
        transform: translateY(-50%);
        button:not(:last-child) {
          margin-bottom: 20px;
        }
      }

      .mint-popup-1 {
        width: 200px;
        border-radius: 8px;
        padding: 10px;
        transform: translate(-50%, 0);

        h1 {
          font-size: 20px;
          color: #26a2ff;
        }

        p {
          margin-bottom: 10px;
        }
      }

      .mint-popup-1::before {
        triangle: 10px top #fff;
        content: '';
        position: absolute;
        top: -20px;
        right: 50px;
      }

      .mint-popup-2 {
        width: 100%;
        height: 50px;
        text-align: center;
        background-color: rgba(0,0,0,.7);
        backface-visibility: hidden;
      }

      .mint-popup-2 p {
        line-height: 50px;
        color: #fff;
      }

      .mint-popup-3 {
        width: 100%;
        height: 100%;
        background-color: #fff;
      }

      .mint-popup-3 .mint-button {
        position: absolute;
        width: 90%;
        top: 50%;
        left: 5%;
        transform: translateY(-50%);
      }

      .mint-popup-4 {
        width: 100%;
        .picker-slot-wrapper, .picker-item {
          backface-visibility: hidden;
        }
      }
    }
  }

/*引入字体图标*/
@font-face {
  font-family: 'iconfont';  /* project id 353289 */
  src: url('//at.alicdn.com/t/font_71bv175n301wcdi.eot');
  src: url('//at.alicdn.com/t/font_71bv175n301wcdi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_71bv175n301wcdi.woff') format('woff'),
  url('//at.alicdn.com/t/font_71bv175n301wcdi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_71bv175n301wcdi.svg#iconfont') format('svg');
}
.iconfont {
          font-family:"iconfont" !important;
          font-size:16px;
          font-style:normal;
          -webkit-font-smoothing: antialiased;
          -webkit-text-stroke-width: 0.2px;
          -moz-osx-font-smoothing: grayscale;
}
/*设置placeholder 颜色*/
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#D6D6D6; opacity:1; 
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #D6D6D6;opacity:1;
}

input:-ms-input-placeholder{
    color: #D6D6D6;opacity:1;
}

input::-webkit-input-placeholder{
    color: #D6D6D6;opacity:1;
}

	.loginbox {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}	
	.head {
		height: 4rem;
		display: -webkit-flex;
		display: flex;
		flex-wrap:wrap;
		align-items: center;
		background: #F8565F;
	}
	
	.back img {
		margin-top: .3rem;
		margin-left: 1.5rem;
		width: 1.3rem;
		height: 1.3rem;
	}
	
	.title {
		margin-left: 2rem;
		font-family: Georgia;
		font-size: 1.7rem;
		color: #ffffff;
	}
	.avatar .choosephoto {
		font-size: 1.6rem;
		color: #000;
	}

	.validate{
		border:none;
		width:124px;
		height:54px;
    border-radius: .5rem;
    position:absolute;
    left:22.5rem;
    top:11.5rem;
		color:#fff;
		outline:none;
	}
	
	.inputbox {
		height:4.5rem;
		margin: 1.5rem;
		padding: 1rem 1rem;
		box-sizing: border-box;
    border:1px solid #D6D6D6;
		border-radius: .5rem;
	}
	.inputbox i{
		text-align:center;
		margin-right:1rem;
		margin-top:.4rem;
		color:#D6D6D6;
	}
	.inputbox input {
		border: none;
		outline: none;
		font-size: 1.4rem;
		color: #000;
	}
	
	.button {
		width: 100%;
		padding: 1rem 1rem;
		box-sizing: border-box;
		
	}
	
	.button .login {
		width: 97%;
		height: 4rem;
		background-color: #F8565F;
		outline: none;
		border: none;
		font-size: 1.7rem;
		color: #fff;
		letter-spacing: 4px;
		border-radius: .5rem;
		margin-top: -.5rem;
		margin-left: .5rem;	
	}

</style>