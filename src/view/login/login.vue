<template>
	<div class="loginBox">
		<div>
			<img src="../../assets/images/22登录_01.png" />
		</div>
		<div>
			<div class="lgbox">
				<div>
					<ul>
						<li class="clearfix liOne">
							<div class="fl loginAdimn" @click="changeLogin(index)" v-for="(li , index ) in list" :class="{active:activeIndex == index}">
								<i class="iconfont" :class="li.img"></i>
								<span>{{li.name}}</span>
							</div>
						</li>
						<li>
							<i class="iconfont icon-yonghuzu iconColor"></i>
							<input v-model="ruleForm2.username" class="username" type="text" placeholder="请输入用户名" />
						</li>
						<li>
							<i class="iconfont icon-suozi iconColor"></i>
							<input v-model="ruleForm2.pass" class="password" type="password" placeholder="请输入密码" />
						</li>
						<li>
							<div><button @click.enter="login" class="login">登录</button></div>
						</li>
						<li class="CENTER">
							<router-link to='/register' class="zh_info">注册新账户</router-link>
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
	import { mapGetters, mapMutations } from 'vuex'
	import Bus from 'assets/js/Bus.js'
	export default {
		data() {

			return {
				activeIndex: 0,
				list: [{
						name: '用户登录',
						img: "icon-choiceO",
					},
					{
						name: '域名账号登录',
						img: " icon-choiceO"
					}
				],
				ruleForm2: {
					username: this.$route.params.email,
					pass: this.$route.params.password
				}
			};
		},
		methods: {
			changeLogin(index) {
				if(index == 1) {
					//                    alert(index)
					location.href = API.imaip
				}
				//                if(this.list[index].name == '用户登录'){
				//                    alert('用户登录')
				//                }else {
				//                    alert('域名账号登录')
				//                }
				this.activeIndex = index

				this.ruleForm2.username = ''
				this.ruleForm2.pass = ''
			},
			login() {
				API.post('/userInfo/login', {
					userName: this.ruleForm2.username.trim(),
					password: this.ruleForm2.pass
				}).then(res => {
					//                    sessionStorage.setItem('sessionId',res.data.data.sessionId)
					if(res.data.code == 200 && !('sessionId' in res.data.data)) {
						this.$notify({
							title: '错误',
							message: res.data.data.msg || res.data.message,
							position: 'top-right',
							duration: 1000

						});
					} else if(res.data.data.msg == '登录成功') {
						sessionStorage.setItem('JSESSIONID', res.data.data.sessionId)
						sessionStorage.setItem('account', res.data.data.account)
						sessionStorage.setItem('token', res.data.data.pwd)
						sessionStorage.setItem('information', 0)
						sessionStorage.setItem('enterpriseIndex','none')
						//登录成功当前用户具备哪些权限
						API.get('/enterprisePermission/queryEnterprisePermission', {
							eid: sessionStorage.getItem('enterpriseId'), //企业ID
						}).then(res => {
							sessionStorage.setItem('currentRolePermissions', JSON.stringify(res.data.data))
							console.log('登录成功当前用户具备哪些权限', res.data.data)
							Bus.$emit('toCurrentRolePermissions', res.data.data)
							//登录成功当前用户是否具备创建企业的权限
							API.get('/enterprisePermission/findAllByAccount', {}).then(res => {
								console.log('登录成功当前用户是否具备创建企业的权限', res.data.data)
								sessionStorage.setItem('isAddProject', JSON.stringify(res.data.data.length))
								Bus.$emit('toisAddProject', res.data.data.length)

								this.$notify({
									title: '成功',
									message: '登录成功',
									position: 'top-right',
									duration: 1000

								});
								this.$router.push({
									path: '/home'
								})
								this.popPath(0)
								this.addPath({
									name: '首页',
									path: '/home'
								})
							})

						})
						API.get('/userInfo/getMyInfo').then(res => {
							sessionStorage.setItem("userMessage", JSON.stringify(res.data.data))
							let id = res.data.data.id
							sessionStorage.setItem('userId', id) //用户id
						})
						let bid = sessionStorage.getItem('userId')
					}

				})
			},
			...mapMutations({
				addPath: 'ADD_PATH',
				popPath: 'POP_PATH',
				setEnterpriseId: 'SET_ENTERPRISEID',
			})
		},
		mounted() {
			this.setEnterpriseId(0)
			sessionStorage.clear()
			if(location.href.indexOf('JSESSIONID') !== -1) {
				let str = location.href
				let arr = []
				let obj = {}
				str = location.href.split('?')[1]
				arr = str.split('&')
				for(let i in arr) {
					obj[arr[i].split("=")[0]] = arr[i].split("=")[1]
				}
				sessionStorage.setItem('JSESSIONID', obj['JSESSIONID']);

				API.get('/enterprisePermission/queryEnterprisePermission', {
					eid: sessionStorage.getItem('enterpriseId'), //企业ID
				}).then(res => {
					sessionStorage.setItem('currentRolePermissions', JSON.stringify(res.data.data))
					console.log('登录成功当前用户具备哪些权限0', res.data.data)
					Bus.$emit('toCurrentRolePermissions', res.data.data)
					//登录成功当前用户是否具备创建企业的权限
					API.get('/enterprisePermission/findAllByAccount', {}).then(res => {
						console.log('登录成功当前用户是否具备创建企业的权限', res.data.data)
						sessionStorage.setItem('isAddProject', JSON.stringify(res.data.data.length))
						Bus.$emit('toisAddProject', res.data.data.length)
						API.get('/userInfo/getMyInfo').then(res => {
							sessionStorage.setItem('account', res.data.data.account)
							sessionStorage.setItem('token', res.data.data.password)
							sessionStorage.setItem("userMessage", JSON.stringify(res.data.data))
							let id = res.data.data.id
							sessionStorage.setItem('userId', id) //用户id
							this.$router.push({
								path: '/home'
							})
						})
					})
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.liOne .active {
		color: #077ce7;
	}
	
	.loginAdimn,
	.loginYu {
		color: #999;
		width: 35%;
		cursor: pointer;
		font-size: 14px;
		font-weight: 600;
	}
	
	.loginBox .lgbox li .loginAdimn i {
		width: 13px;
		height: 12px;
		position: absolute;
		top: 9px;
	}
	
	.loginBox .lgbox li .loginYu i {
		color: #999;
		width: 13px;
		height: 12px;
		position: absolute;
		top: 9px;
	}
	
	body {
		overflow: hidden;
	}
	
	.loginBox {
		display: flex;
		overflow: hidden;
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
			span {
				display: inline-block;
				padding-left: 20px;
				line-height: 40px;
			}
			li {
				position: relative;
				.iconColor {
					width: 13px;
					height: 12px;
					position: absolute;
					top: 9px;
					color: #379de6;
				}
				margin-bottom: 20px;
				.username {
					width: 20vw;
					height: 34px;
					border: none;
					border-bottom: #ebebeb 1px solid;
					outline: none;
					padding-left: 30px;
				}
				.username:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px white inset;
					border-bottom: #ebebeb 1px solid !important;
				}
				.username:focus {
					width: 20vw;
					height: 34px;
					border: none;
					outline: none;
					border-bottom: #379de6 1px solid;
					background: none;
				}
				.username::-webkit-input-placeholder {
					color: #cccccc;
				}
				.password {
					width: 20vw;
					height: 34px;
					border: none;
					border-bottom: #ebebeb 1px solid;
					outline: none;
					padding-left: 30px;
					margin-bottom: 50px;
				}
				.password:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px white inset;
					border-bottom: #ebebeb 1px solid !important;
				}
				.password:focus {
					width: 20vw;
					height: 34px;
					border: none;
					outline: none;
					border-bottom: #379de6 1px solid;
					background: none;
				}
				.password::-webkit-input-placeholder {
					color: #cccccc;
				}
				.login {
					width: 100%;
					height: 40px;
					color: white;
					border: none;
					border-radius: 4px;
					cursor: pointer;
					background: -webkit-linear-gradient(-90deg, #379de6, #077ce7);
					background: -o-linear-gradient(-90deg, #379de6, #077ce7);
					background: -moz-linear-gradient(-90deg, #379de6, #077ce7);
					background: linear-gradient(-90deg, #379de6, #077ce7);
				}
			}
		}
	}
	
	.CENTER {
		text-align: center;
	}
	
	.zh_info {
		text-decoration: none;
		color: #077ce7;
	}
</style>