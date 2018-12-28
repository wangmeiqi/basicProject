<template>
<div class="loginBox">
		<div>
			<img src="../../assets/images/22登录_01.png" />
		</div>
		<div>
			<div class="lgbox">
				 <ul>
				 	<li class="zcxzh">注册新账号</li>
				 	<li class="send_num" >
				 		<span>+86</span><input type="text" v-model="phone"/><span class="yzm">发送验证码</span>
				 	</li>
				 	<li class="same"></li>
				 	<li>
				 		<input type="text" placeholder="请输入用户名"  class="cl" v-model="username"/>
				 	</li>
				 	<li class=' same' ref="message1"></li>
				 	<li class="pic">
				 		<input type="password" placeholder="请输入密码(字母.数字.至少6位)" class="cl" ref="show" v-model="password"/>
				 		<img src="../../assets/images/chakan.png" alt=""  class="yanjing" @click="show()"/>
				 	</li>
				 	<li class=" same" ref="message2"></li>
				 	<li class="huadong">
				 		<div class="movebox" >
                             <div class="movego"></div>
                              <div class="txt" id="txt">请按住滑块，拖动到最右边</div>
                              <div class="move moveBefore" flag='0' v-move></div>
                          </div>	
				 	</li>
				 	<li class="message3 same" ref="message3"></li>
				 	<li>
				 		<input type="text" placeholder="短信验证码" class="cl" v-model="phone_test"/>
				 	</li>
				 	<li class='message4 same' ref="message4"></li>
				 	<li>
				 	   <button class="btn" @click="send">注册</button>
				 	</li>
				 	<li class="last">
				 	   <el-checkbox v-model='checked'></el-checkbox><span class="agree">我已阅读并同意</span><span class="yinsi">《隐私条款》</span>
				 	</li>
				 	<li class='message5 same' ref="message5"></li>
				 </ul>
			</div>
		</div>
		<img class="logo" src="../../assets/images/logo.jpg" alt="" />
	</div>
</template>
<script>
	import API from 'api/http'
	export default {
		name: "phone",
		data() {
			return {
				phone: this.$route.params.info,
				checked: true,
				username: '',
				password: '',
				phone_test: ''
			}
		},
		methods: {
			show() {
				var cl = this.$refs.show
				if (cl.type == "password") {
					cl.type = "text"
				} else if (cl.type == "text") {
					cl.type = "password"
				}
			},
			send() {
				if (this.username == "") {
					var message1 = this.$refs.message1
					message1.innerHTML = "用户名不能为空"
					 var self=this
					setTimeout(function() {
						self.$refs.message1.innerHTML = ""
					}, 4000)
					return false
				}
				var length = this.password.length
				if (length < 6){
					var message2 = this.$refs.message2
					message2.innerHTML = "密码格式不正确"
					 var self=this
					setTimeout(function() {
						self.$refs.message2.innerHTML = ""
					}, 4000)
					return false
				}
				if (this.checked==0) {
					var message5 = this.$refs.message5
					message5.innerHTML = "请勾选以阅读隐私条款"
					var self=this
					setTimeout(function() {
						self.$refs.message5.innerHTML = ""
					}, 4000)
					return false
				} 
				this.$router.push({
						name: "login",
						params: {
							email: this.phone,
							password: this.password
						}
					})
					//			    $http.post('',{
					//			    	  phone:this.phone,
					//			    	  username:this.username,
					//			    	  password:this.Password
					//			    	
					//			      }).then(res=>{
					//			      	console.log(res)
					//			      })
			}
		},
		
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
		font-weight: bold;
		color: #000000;
		margin-bottom: 30px;
	}
	.yanjing {
		width: 16px;
		height: 16px;
		position: absolute;
		right:26px;
		margin-top:-8px;
		top: 50%;
	}
	.yanjing:hover {
		cursor: pointer;
	}
	.pic {
		position: relative;
	}
	.send_num {
		border: 1px solid #EBEBEB;
		padding: 10px;
		box-sizing: border-box;
		font-size: 12px !;
	}
	.send_num:focus {
		border-color: #077ce7;
	}
	.send_num input {
		margin: 0 5px;
		width: 140px;
		height: 16px;
		font-size: 12px;
		box-sizing: border-box;
		padding-left: 5px;
		border-left: 1px solid #EBEBEB;
		border-right: 1px solid #EBEBEB;
	}
	.same{
		width:200px;
		height:30px;
		color:red;
		line-height:30px;
	}
	input:focus {
		border-color: #077ce7;
	}
	.send_num input:focus {
		border-color: #EBEBEB;
	}
	.yzm {
		color: #077ce7;
		font-size: 12px;
		margin-left: 25px;
		box-sizing: border-box;
	}
	.yzm:hover {
		cursor: pointer;
	}
	.cl::-webkit-input-placeholder {
		color: #cccccc;
	}
	.cl {
		width: 298px;
		height: 40px;
		border: 1px solid #EBEBEB;
		box-sizing: border-box;
		padding: 0 5px;
	}
	.btn {
		width: 298px;
		height: 40px;
		background: #077ce7;
		line-height: 40px;
		text-align: center;
		font-size: 12px;
		border-radius: 4px;
		color: white;
	}
	.btn:hover {
		cursor: pointer;
	}
	.agree {
		margin-left: 10px;
	}
	
	.yinsi {
		color: #077ce7;
	}
	.yinsi {
		cursor: pointer;
	}
	.input:-ms-input-placeholder {
		font-size: 12px;
	}
	.movebox {
		position: relative;
		background-color: #e8e8e8;
		width: 298px;
		height: 39px;
		line-height: 39px;
		text-align: center;
	}
	.txt {
		position: absolute;
		top: 0px;
		width: 230px;
		color: #cccccc;
		-moz-user-select: none;
		-webkit-user-select: none;
		user-select: none;
		-o-user-select: none;
		-ms-user-select: none;
	}
	.last{
		margin-top:15px;
	}
	.movego {
		background-color: #7ac23c;
		height: 40px;
		width: 0px;
	}
	.move {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 40px;
		height: 38px;
		border: 1px solid #ccc;
		cursor: move;
	}
	.moveBefore {
		background: #fff url(../../assets/images/注册图片/slider.png)no-repeat center;
	}
	.moveSuccess {
		background: #fff url(../../assets/images/注册图片/success.png) no-repeat center;
	}
</style>