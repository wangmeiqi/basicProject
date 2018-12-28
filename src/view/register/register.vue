<template>
	<div class="loginBox">
		<div>
			<img src="../../assets/images/22登录_01.png" />
		</div>
		<div>
			<div class="lgbox">
				<div>
					<ul>
						<li class="zhuche">
							 {{zhuche}}
						</li>
						<li >
							<input v-model="phoneNum" class="number" type="text" placeholder="请输入工作邮箱" />
						</li>
						<span class="tishi" ref="info"></span>
						<li id="zhuchebtn">
							 <button @click="submit1()" class="submit">{{now}}</button>
						</li>
						<li class="forth">
                              <span>第三方账户登录&nbsp;或&nbsp;</span><router-link to="/login" class="zh_login">账号登录</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<img class="logo" src="../../assets/images/logo.jpg" alt="" />
	</div>
</template>
<script>
	import API from 'api/http'
	export default {
		name: 'register',
		data() {
			return {
				zhuche: '注册新账号',
				now: '即可开始',
				phoneNum: ''
			}
		},
		methods: {
			submit1() {
				if ((/^1[34578]\d{9}$/.test(this.phoneNum))) {
					this.$router.push({
						name: 'phone',
						params: {
							info: this.phoneNum
						}
					})
				} else if ((/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.phoneNum))) {
					this.$router.push({
						name: 'youxiang',
						params: {
							info: this.phoneNum
						}
					})
				} else {
					const self = this
					this.$refs.info.innerText = "格式不正确"
					setTimeout(function() {
					self.$refs.info.innerText = ""
					}, 4000)
				}
			},
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
	
	.zhuche {
		font-weight: bold;
		font-size: 14px;
	}
	
	.number {
		width: 270px;
		height: 36px;
		border: 1px solid #ddd;
		margin-top: 30px;
		padding-left: 5px;
	}
	
	.number::-webkit-input-placeholder {
		color: #cccccc;
	}
	
	.zhuchebtn {
		width: 270px;
	}
	
	.submit {
		width: 100%;
		height: 36px;
		line-height: 36px;
		background-color: #077ce7;
		color: white;
		text-align: center;
		font-size: 14px;
		border-radius: 4px;
		cursor: pointer;
	}
	
	.forth {
		font-size: 14px;
		margin-top: 30px;
		color: #cfcfcf;
		text-align: center;
	}
	
	.zh_login {
		text-decoration: none;
		color: #077ce7;
	}
	
	.tishi {
		display: block;
		color: red;
		height: 30px;
		line-height: 30px;
	}
	
	input:focus {
		border-color: #077ce7;
	}
</style>