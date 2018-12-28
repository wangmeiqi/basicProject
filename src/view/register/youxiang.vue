<template>
	<div class="loginBox">
		<div>
			<img src="../../assets/images/22登录_01.png" />
		</div>
		<div>
			<div class="lgbox">
				<ul>
					<li class="zcxzh">注册新账号</li>
					<li class="l1">
						<input type="text" v-model="email" disabled="disabled" />
					</li>
					<li class="l2">
						<input type="text" placeholder="请输入姓名" v-model="username" />
						<img src="../../assets/images/差号.png" alt="" class="img1" @click="clear1()" />
					</li>
					<li class="same" ref="message1"></li>
					<li class="l3">
						<input type="password" placeholder="请输入密码" v-model="password" ref="psw" />
						<img src="../../assets/images/差号.png" alt="" class="img2" @click="clear2()" />
						<img src="../../assets/images/chakan.png" alt="" class="img3" @click="xianshi()" />
					</li>
					<li class="same" ref="message2"></li>
					<li class="l5">
						<div ref="drag" class="drag" @mousemove="moveBlock($event)">
							<div ref="bg" class="bg"></div>
							<div ref="btn" class="btn"  @mousemove="moveBlock($event)" :class="this.validation==1 ? 'moveSuccess' :'btn'"></div>
							<p ref="text" class="text" :class="{white:validation}" @mousedown="done=true" @mouseup="moveFailure" @mouseout="moveFailure">{{validation?'验证成功':'拖动滑块验证'}}</p>
						</div>
					</li>
					<li class="same" ref="message3"></li>
					<li class="l6">
						<button @click="onsubmit()">注册</button>
					</li>
					<li class="words">
						<el-checkbox v-model='checked'></el-checkbox><span class="agree">我已阅读并同意</span><span class="yinsi">《隐私条款》</span>
					</li>
					<li class="same" ref="message4"></li>
				</ul>
			</div>
		</div>
		<img class="logo" src="../../assets/images/logo.jpg" alt="" />
	</div>
</template>
<script>
	import API from 'api/http'

	export default {
		name: "youxiang",
		data() {
			return {
				email: this.$route.params.info,
				checked: true,
				password: '',
				username: '',
				done: false,
				validation:false,	//滑块验证成功与否
				moveWidth:0			//移动的宽度
			}
		},
		methods: {
			//移动滑块
			moveBlock(e) {
//				console.log(e)
				if(this.done) {
					if(e.offsetX>=20){
						this.$refs.btn.style.left = (e.offsetX-20) + 'px'
						this.$refs.bg.style.width = (e.offsetX-20) + 'px'
						this.moveWidth = e.offsetX
					}
					
				}
			},
			//验证失败
			moveFailure(){
				if(!this.validation){
					this.done = false
					this.$refs.btn.style.left = 0
					this.$refs.bg.style.width = 0
				}
			},
			clear1() {
				this.username = ""
			},
			clear2() {
				this.password = ""
			},
			xianshi() {
				if(this.$refs.psw.type == "password") {
					this.$refs.psw.type = "text"
				} else {
					this.$refs.psw.type = "password"
				}
			},

			btn1(e) {
				var e = e || window.event;
				var posX = e.clientX - this.offsetLeft;
			},
			//			

			onsubmit() {
				if(this.username == "") {
					this.$refs.message1.innerHTML = "用户名不能为空"
					var self = this
					setTimeout(function() {
						self.$refs.message1.innerHTML = ""
					}, 4000)
					return false
				}
				if(this.password == "" && this.password.length < 6) {
					this.$refs.message2.innerHTML = "密码格式不正确"
					var self = this
					setTimeout(function() {
						self.$refs.message2.innerHTML = ""
					}, 4000)
					return false
				}
				if(this.checked == 0) {
					this.$refs.message4.innerHTML = "请勾选以阅读隐私条款"
					var self = this
					setTimeout(function() {
						self.$refs.message4.innerHTML = ""
					}, 4000)
					return false
				}
				if(this.validation == false) {
					this.$refs.message3.innerHTML = "请拖动滑块验证"
					var self = this
					setTimeout(function() {
						self.$refs.message3.innerHTML = ""
					}, 4000)
					return false
				}
				API.post('/userInfo/register', {
					email: this.email,
					username: this.username,
					password: this.password,
				}).then(res => {
					if(res.data.code == 200) {
						this.$router.push({
							name: 'login',
							params: {
								email: this.email,
								password: this.password
							}
						})
					}
				})
			},
		},
		watch:{
			moveWidth(num){
				if(num>=250){
					this.validation = true
					this.done = false
				}else{
					this.validation = false
				}
			}
		}
	}
	
</script>
<style scoped>
	.loginBox {
		display: flex;
		overflow: hidden;
	}
	
	img {
		height: 100vh;
		width: 60vw;
		border: none;
	}
	
	.logo {
		position: fixed;
		right: 30px;
		top: 30px;
		width: 56px;
		height: 15px;
	}
	
	.lgbox {
		width: 40vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.zcxzh {
		font-size: 14px;
		font-weight: bold;
		color: #000000;
		margin-bottom: 30px;
	}
	
	input {
		width: 270px;
		height: 40px;
		border: 1px solid #EBEBEB;
		padding-left: 5px;
		box-sizing: border-box;
	}
	
	.same {
		width: 200px;
		height: 30px;
		color: red;
		line-height: 30px;
	}
	
	.l6>button {
		width: 270px;
		height: 40px;
		background: #077ce7;
		color: white;
		border-radius: 4px;
	}
	
	.l1>input {
		background: #f5f5f5;
	}
	
	.l1 {
		margin-bottom: 30px;
	}
	
	input:focus {
		border-color: #077ce7;
	}
	
	.agree {
		margin-left: 10px;
	}
	
	.words {
		margin-top: 15px;
	}
	
	.img1,
	.img2,
	.img3 {
		width: 12px;
		height: 12px;
		border: 1px solid #EBEBEB;
		border-radius: 50%;
	}
	
	.img1,
	.img2,
	.img3:hover {
		cursor: pointer;
	}
	
	.l2,
	.l3 {
		position: relative;
	}
	
	.img1,
	.img3 {
		position: absolute;
		right: 10px;
		top: 14px;
	}
	
	.img2 {
		position: absolute;
		right: 35px;
		top: 14px;
	}
	
	button:hover {
		cursor: pointer;
	}
	
	input::-webkit-input-placeholder {
		color: #cccccc;
	}
	
	.yinsi {
		color: #077ce7;
	}
	
	.drag {
		position: relative;
		width: 270px;
		height:40px;
		background-color: #e8e8e8;
		line-height:40px;
	}
	
	.bg {
		position: absolute;
		width: 0;
		height: 100%;
		background-color: #7ac23c;
	}
	
	.text {
		position: absolute;
		width: 100%;
		margin: 0;
		text-align: center;
		color:#cccccc;
	}
	
	.btn {
		position: absolute;
		width:39px;
		height: 100%;
		left: 0;
		background: url(../../assets/images/注册图片/slider.png) no-repeat center;
		background-color: white;
		border-radius: 4px;
		border:1px solid #cccccc;
	}
	
	.moveSuccess {
		
		background: #fff url(../../assets/images/注册图片/success.png) no-repeat center;
	}
	.white{
		color: white;
	}
</style>