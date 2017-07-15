<template>
	<div class="loginbox">
		<div class="head">
			<div class="back" @click="Back">
				<img src="../assets/image/返回.png" alt="">
			</div>
			<div class="title">登录</div>
		</div>
		<div class="loginform">
			<div class="avatar">
			  <div class="testimg"><img src="../assets/image/mainlogo.png"></div>
				<div class="testimg">
				<img :src="url" alt="上传照片" @click.stop="addPic">
				</div>	
				<input hidden type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="fileInput">
			</div>
			<div class="inputbox">
				 <i class="icon iconfont">&#xe603;</i>
				<input type="text" v-model="username" name="username" placeholder="手机号/邮箱">
			</div>
			<div class="inputbox">
				<i class="icon iconfont">&#xe6fb;</i>
				<input type="password" name="password" v-model="password" placeholder="密纹">
			</div>
			<div class="button">
				<button class="login" @click="gologin">登录</button>
			</div>
			<div class="button1">
			  <p @click="register">快速注册</p>
			  <p @click="forget">忘记密码?</p>
			</div>
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
			forget () {
      this.sidebarShow = !this.sidebarShow
			this.$router.push({path:'/forget'})     
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
	
	.loginform {
		display: block;
	}	
	.loginform .avatar {
		width: 100%;
		height: 5rem;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-top: 4rem;
		margin-bottom: 2rem;
	}	
	.avatar img {
		/*height: 5rem;*/
		border-radius: 50%;
		margin-bottom: .4rem;
	}
	
	.avatar .choosephoto {
		font-size: 1.6rem;
		color: #000;
	}
	
	.inputbox {
		height:4.5rem;
		margin: 1.5rem;
		display: -webkit-flex;
		display: flex;
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
	.button1{
		width:90%;
	  margin-top: -.1rem;
		margin-left: 2rem;	
		display:flex;
    justify-content:space-between;
		color:#88D8F2;
		font-size: 1.6rem;
	}
</style>