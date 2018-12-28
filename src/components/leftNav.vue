<template>
	<div class="parentBox">
		<div class="leftNav" @click="$emit('calendarClose')">
			<ul class="log">
				<img src="../assets/images/log.png" alt="">
			</ul>
			<ul class="nav">
				<li v-for="(item,index) in list" v-show="item.flages" v-if="item.log == '功能' || leftShows" :key="index" @click.stop="handle(index)" :class="{'active':initindex === index}">
					<i :class="item.icon"></i>
					<p style="font-size: 12px">{{item.log}}</p>
					<i class="msg-budge" v-if="littleRed&&msgBudge&&item.log === '群聊'"><!--{{msgBudge}}--></i>
				</li>
			</ul>
			<ul class="footer">
				<li>
					<i @click="quitXmpp" class="iconfont icon-bangzhu"></i>
				</li>
			</ul>
			<ul class="foote" style="display: flex;   justify-content: center;">
				<li class="myHeader" @click="routerPush" style="position: relative;">
                    <img v-if="imgUrl !=''" :src=imgUrl alt="">
                    <div v-if="imgUrl ==''" class="img">{{name[0]}}</div>
					<div class="personalDetails" v-show="personalDetails">
						<ul>
							<li @click="$router.push({path:'/myInformation'})">账号设置</li>
							<li v-show="false">偏好设置</li>
						</ul>
						<ul v-show="false">
							<li>升级</li>
						</ul>
						<ul v-show="false">
							<li>快捷键</li>
							<li>下载应用</li>
						</ul>
						<ul v-show="false">
							<li>
								<p>切换至国际服务器<br /><span style="color: #bcbcbc;">正在使用中国大陆服务器</span></p>
							</li>
						</ul>
						<ul style="border: none;padding-bottom: 0;">
							<li @click="out">退出</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<div class="float" v-show="isShow">
			<div>
				<div class="ft">
					企业功能
				</div>
				<ul class="fsort" v-for="(parent,index) in lis" :key="index">
					<li v-for="(child, index) in parent.More" v-show="child.flages" v-if="child.class == '成员' ||child.class == '简报' || child.class == '管理后台' || leftShows" :key="index" @click="leftNavSkip(child)">
						<span>
							<i :class="child.icon"></i>
						</span>
						<span style="cursor: pointer;">{{child.class}}</span>
					</li>
				</ul>
			</div>
		</div>
		<chat :show="chatFlag"></chat>
	</div>
</template>
<script>
	import chat from './chat/chat.vue';
	import my from 'assets/images/my.png'
	import rili from 'assets/images/rili.png'
	import xiaoxi from 'assets/images/xiaoxi.png'
	import liaotian from 'assets/images/liaotian.png'
	import gongneng from 'assets/images/gongneng.png'
	import chengyuan from 'assets/images/chengyuan.png'
	import baogao from 'assets/images/baogao.png'
	import tongji from 'assets/images/tongji.png'
	import houtaiguanli from 'assets/images/chengyuan.png'
	import target from 'assets/images/target.png'
	import { mapGetters, mapMutations } from 'vuex'
	import api from 'api/http.js'
	import xmpp from '../api/xmpp.js'
	import bus from 'assets/js/Bus.js'

	export default {
		props: ['hidden'],
		name: "left-nav",
		components: {
			chat
		},
		data() {
			return {
				//权限部分控制JSON.parse(editXmfzFlage).enterprisePermissionList[5].status
				//我的
				myFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[18].status,
				//日历
				dateFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[19].status,
				//群聊
				QLFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[20].status,
				//成员
				CYFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[21].status,
				//报告
				BGFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[22].status,
				//统计
				TJFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[23].status,
				//简报
				JBFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[24].status,
				//管理后台
				GLHTFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[25].status,

				imgUrl: '',
                name:'',
				list: [{
						flages: '',
						log: '我的',
						icon: 'iconfont icon-wode'
					},
					{
						flages: '',
						log: '日历',
						icon: 'iconfont icon-rili'
					},
					//					{
					//						log: '消息',
					//						icon: 'iconfont icon-xiaoxi'
					//					},
					{
						flages: '',
						log: '群聊',
						icon: 'iconfont icon-liaotian'
					},
					{
						flages: '',
						log: '功能',
						icon: 'iconfont icon-gongneng'
					},

				],
				lis: [{
					More: [{
							flages: '',
							src: chengyuan,
							class: '成员',
							icon: 'iconfont icon-renmai'
						},
						{
							flages: '',
							src: baogao,
							class: '报告',
							icon: 'iconfont icon-wenjian_file'
						},
						{
							flages: '',
							src: tongji,
							class: '统计',
							icon: 'iconfont icon--bingzhuangtu'
						},
						{
							flages: '',
							src: tongji,
							class: '简报',
							icon: 'iconfont icon--bingzhuangtu'
						},
						{
							flages: '',
							src: houtaiguanli,
							class: '管理后台',
							icon: 'iconfont icon-guanlihoutai'
						},
						//						{
						//							src: target,
						//							class: '目标管理',
						//							icon: 'iconfont icon-mubiao'
						//						}
					],
				}],
				isShow: false,
				personalDetails: false,
				initindex: 0,
				newData: [],
				chatFlag: false,
				msgBudge: 0,
				leftShows: false,
				littleRed: false
			}

		},
		methods: {
			quitXmpp(){
				api.get('/userInfo/updateLoginOutTime')
			},
			userIsShow() {
				let userAccount = sessionStorage.getItem("account");
				let userArr = ['hlguest', 'test1', 'test2', 'xu', 'wang', 'admin', 'techbim1', 'techbim2', 'techbim3', 'techbim4', 'techbim5'];
				this.leftShows = userArr.indexOf(userAccount) != -1 ? true : false
			},
			//点击头像弹出相应的信息
			routerPush() {
				this.isShow = false
				this.personalDetails = !this.personalDetails
			},
			//退出登陆
			out() {
				api.get('/userInfo/logout').then(res => {
					sessionStorage.clear()
					this.$router.push({
						path: '/'
					})
				})
				this.quitXmpp()
			},
			handle: function(index) {
				if(index == 0) {
					this.$emit('pageTomine');
				}
				if(index == 1) {
					this.$emit('leftNavItem');
				}
				if(index == 2) {
					this.$emit('chat');
					this.chatFlag = !this.chatFlag
					localStorage.setItem('information', 0)
					this.msgBudge = 0
				}
				if(index == this.list.length - 1) {
					this.$emit("function")
					this.initindex = index;
					this.isShow = !this.isShow
				}

			},
			leftNavSkip(child) {
				this.$emit('closeOthers')
				if(child.class == '成员') {
					this.$router.push({
						path: '/member'
					})
					this.popPath(0)
					this.addPath({
						name: '首页',
						path: '/home'
					})
					this.addPath({
						name: '成员',
						path: '/member'
					})
				} else if(child.class == '管理后台') {
					let parms = {
						eid: this.getEnterpriseId
					} //企业管理
					api.get('/enterprise/getEnterpriseById', parms).then(res => {
						this.newData = res.data.data
						//console.log(this.newData);
						this.$router.push({
							path: '/management',
							query: {
								data: this.newData
							}
						})
						this.popPath(0)
						this.addPath({
							name: '首页',
							path: '/home'
						})
						this.addPath({
							name: '管理后台',
							path: '/management'
						})
					})
					//console.log(this.newData);
				} else if(child.class == '简报') {
					this.$router.push({
						path: '/bulletin'
					})
				} else if(child.class == '报告') {
					this.$router.push({
						path: '/report'
					})
					this.popPath(0)
					this.addPath({
						name: '首页',
						path: '/home'
					})
					this.addPath({
						name: '报告',
						path: '/member'
					})
				} else if(child.class == '统计') {
					this.$router.push({
						path: '/statistical'
					})
					this.popPath(0)
					this.addPath({
						name: '首页',
						path: '/home'
					})
					this.addPath({
						name: '统计',
						path: '/statistical'
					})
				}
				this.isShow = !this.isShow

			},
			...mapMutations({
				addPath: 'ADD_PATH',
				popPath: 'POP_PATH'
			}),
			getData() {
				let bid = sessionStorage.getItem('userId')
				let params = {
					id: bid
				}
				api.get('/userInfo/getUserMessage', params).then(res => {
				    let dataList = res.data.data;
					this.imgUrl = dataList.user_img;
                    this.name = dataList.username;
				})

			}, //页面加载时候数据
			jqfz() {

				this.list[0].flages = this.myFlage //我的
				this.list[1].flages = this.dateFlage //日历
				this.list[2].flages = this.QLFlage //群聊
				this.list[3].flages = 1 //功能

				this.lis[0].More[0].flages = this.CYFlage //成员
				this.lis[0].More[1].flages = this.BGFlage //报告
				this.lis[0].More[2].flages = this.TJFlage //统计
				this.lis[0].More[3].flages = this.JBFlage //简报
				this.lis[0].More[4].flages = this.GLHTFlage //管理后台
				//console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhh', this.list[0].flages)
			}

		},
		created: function() {
			this.msgBudge = localStorage.getItem('information')
			let flag = localStorage.getItem('information')
			this.littleRed = flag == 0?false:true
			this.getData()
				bus.$on('msgCount', () => {
					this.msgBudge = localStorage.getItem('information')
				})
			this.userIsShow()

			//接收组件通信信息
			bus.$on('toCurrentRolePermissions', (msg) => {
				//console.log(msg)
				this.myFlage = msg.enterprisePermissionList[18].status
				this.dateFlage = msg.enterprisePermissionList[19].status
				this.QLFlage = msg.enterprisePermissionList[20].status
				this.CYFlage = msg.enterprisePermissionList[21].status
				this.BGFlage = msg.enterprisePermissionList[22].status
				this.TJFlage = msg.enterprisePermissionList[23].status
				this.JBFlage = msg.enterprisePermissionList[24].status
				this.GLHTFlage = msg.enterprisePermissionList[25].status
				this.jqfz()
			});
		},
		computed: {
			...mapGetters({
				getEnterpriseId: 'GET_ENTERPRISEID'
			})
		},
		mounted() {
			this.jqfz()
		},
		watch: {
			hidden() {
				this.isShow = false
				this.personalDetails = false
			}
		}

	}
</script>

<style scoped>
	.personalDetails {
		padding: 20px;
		position: fixed;
		width: 190px;
		background: white;
		z-index: 2;
		left: 60px;
		bottom: 10px;
		border-radius: 3px;
		box-shadow: 0px 4px 10px #d3d3d3;
		font-size: 12px;
		color: #666666;
	}

	.personalDetails ul {
		text-align: left;
		line-height: 30px;
		border-bottom: 1px solid #efefef;
		padding: 9px 0;
	}

	.personalDetails ul li:hover {
		color: #0a7ee9;
	}

	.parentBox {
		height: 100vh;
	}

	.leftNav {
		width: 50px;
		position: fixed;
		height: 100vh;
		text-align: center;
		background-color: #077ce7;
		float: left;
	}

	.log {
		padding: 10px auto;
	}

	.log>img {
		display: inline-block;
		margin-top: 30px;
	}

	.nav {
		margin-top: 50px;
		color: #ffffff;
	}

	.nav>li {
		margin-top: 30px;
		height: 50px;
		cursor: pointer;
		position: relative;
	}

	.nav>li>img {
		margin-top: 5px;
	}

	.nav>li>p {
		font-size: 15px;
		font-weight: 200;
	}

	.nav li .msg-budge {
		position: absolute;
		top: -12px;
		right: 0;
		/*padding: 0px 2px;*/
		width: 8px;
		height: 8px;
		border-radius: 8px;
		text-align: center;
		line-height: 20px;
		background-color: #F56C6C;
		color: #fff;
		font-size: 12px;
		font-style: normal;
	}

	.float {
		white-space: nowrap;
		position: fixed;
		background: #ffffff;
		top: 75px;
		left: 50px;
		z-index: 2;
		height: 100vh;
		box-shadow: 4px 0px 10px #e7e7e7;
		opacity: 0.97;
	}

	.ft {
		padding: 20px 15px;
		border-bottom: 2px solid #f1f1f1;
		color: #404040;
		font-size: 16px;
	}

	.fsort {
		margin-top: 22px;
	}

	.fsort>li>span i {
		color: #077ce6;
	}

	.fsort>li {
		margin: 10px 5px;
		padding: 6px 90px 6px 15px;
		font-size: 14px;
		color: #6f6f6f;
		border-radius: 2px;
		cursor: auto;
	}

	.fsort>li:hover {
		background: #F0F0F3;
	}
	/*.active {
		background: #1452de;
	}*/

	.footer {
		width: 100%;
		position: absolute;
		bottom: 100px;
		color: white;
	}

	.myHeader {
		border-radius: 50%;
		background-color: rgb(123, 176, 255);
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.myHeader>p {
		font-size: 12px;
		color: #ffffff;
	}

	.foote {
		width: 100%;
		position: absolute;
		bottom: 50px;
	}

	.myHeader>img {
		width: 100%;
		border-radius: 50%;
	}
    .img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #ffae44;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: white;
        -webkit-box-shadow: 0 0 10px #E6E6E6;
        box-shadow: 0 0 10px #E6E6E6;
    }
</style>
