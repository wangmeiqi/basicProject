<template>
	<div class="message-container-box">
		<div class="message-panel-header">
			<p class="text">{{projectName}}</p>
			<a class="close icon-remove" v-show="closeShow" @click="close"></a>
		</div>
		<div class="message-container">
			<ul class="project-message-list">
				<li v-for=" (val,index) in infoList " :class="session == val.sender ?'message-item creator':'message-item'">
					<div class="headImg" v-if="session != val.sender">
						<!--<img v-if="JSON.parse(val.body).img == '' " src="../../assets/images/22登录_01.png" alt="" />-->
						<p class="defImg" v-if="JSON.parse(val.body).img == '' ">{{val.sender.slice(0,1)}}</p>
						<img v-else :src="JSON.parse(val.body).img" alt="" />
					</div>
					<div class="message-body">
						<div class="messageText">
							<!--<p v-html="val.context"></p>-->
							<p v-html="$options.filters.toImg(val.context)"></p>
						</div>
						<div class="messageTime" v-if="session  == val.sender">{{val.ts | formatDate}}</div>
						<div class="messageTime" v-else><span class="name">{{val.sender}}</span>，{{val.ts | formatDate}}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="chat-room-creator">
			<COMMENT @sendComment='commentfun'></COMMENT>
		</div>
	</div>
</template>

<script>
	import API from 'api/http'
	import axios from 'axios'
	import Bus from 'assets/js/Bus.js'
	import COMMENT from '../comment.vue'
	import { formatDate } from 'assets/js/date.js';

	import emoji from 'assets/js/emotions.js'
	export default {
		name: '',
		props: { //组件传值接收
			closeShow: {
				type: Boolean,
				default: true
			},
			userId: {
				type: Object,
				default: () => {}
			}
		},
		components: {
			COMMENT
		},
		data() {
			return {
				session: sessionStorage.getItem('account'),
				projectName: '', //左侧列表名
				userHeadImg: '', //用户头像
				infoList: [], //信息列表
				sender: null, //发送者
			}
		},
		methods: {
			//评论信息发布
			commentfun(data) {
				console.log(this.userId.account)
				let username = JSON.parse(sessionStorage.getItem("userMessage")).username
				console.log(data);
				let datasObj2 = {
					'context': data,
					'sender': this.session,
					'username': username,
					'ts': Date.parse(new Date())
				}
				this.$emit('commentfun', datasObj2)
				this.infoList.push(datasObj2)
				this.$nextTick(function() { //当dom发生变化，更新后执行的回调
					this.scrollBottomFun()
				})

			},
			//关闭当前对话框
			close() {
				this.$emit('closeBox')
			},
			//获取当前聊天窗口名称
			userName(name) {
				this.projectName = name
			},
			//获取当前用户头像
			userImg(imgs) {
				this.userHeadImg = imgs
			},
			//默认加载当前选中聊天的历史记录信息
			historyRecordFun(nl) {
				//console.log('111',nl)
				let that = this
				let ports = '' //单聊或者群聊接口
				let datas = ''
				//console.log('nl.jid',nl.jid)
				if(nl.jid != undefined) {
					ports = 'shiku_muc_msgs' //群聊接口
					datas = {
						roomId: nl.jid, //接收者userid
						sender: this.session, //当前用户的id
						startTime: '', //开始时间
						endTime: '', //结束时间
						pageIndex: '', //页码
						pageSize: '10' //页大小
					}
				} else {
					ports = 'shiku_msgs2' //私聊接口
					datas = {
						receiver: nl.account, //接收者userid
						sender: this.session, //当前用户的id
						startTime: '', //开始时间
						endTime: '', //结束时间
						pageIndex: '', //页码
						pageSize: '10' //页大小
					}
				}
				//				console.log(userId,ports)
				$.ajax({
					type: 'post',
					url: API.xmpphttp + '/tigase/' + ports,
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					dataType: 'json',
					data: datas,
					success: function(data) {
						console.log('successsss', data)
						//that.infoList = data.data.reverse()
						that.infoList = []
						data.data.map(el => {
							let sender = JSON.parse(el.body).fromUserId
							that.$set(el, 'username', JSON.parse(el.body).fromUserName)
							el.sender = sender
							that.infoList.unshift(el)
						})
						that.$nextTick(function() { //当dom发生变化，更新后执行的回调
							that.scrollBottomFun()
						});
					},
					error: function(data) {
						console.log('error', data)
					}
				})
			},
			//滚动到底部
			scrollBottomFun() {
				$('.message-container').scrollTop($('.project-message-list').height())
			}
		},
		mounted() {
			//接收组件通信信息 
			Bus.$on('realTimeInfo', (data) => {
				console.log('wwqwqw1', JSON.parse(data))
				console.log(this.userId)
				this.sender = JSON.parse(data).fromUserId
				let datasObj = {
					'body': data,
					'context': JSON.parse(data).content,
					'sender': JSON.parse(data).fromUserId,
					//					'sender':"xu",
					'ts': JSON.parse(data).timeSend * 1000
				}
				//				alert(!('jid' in this.userId) || this.userId.account == data.fromUserId)
				//				alert(this.userId.account == data.fromUserId)
				//				if(!('jid' in this.userId) || this.userId.account == data.fromUserId){
				//					if(this.userId.account == data.fromUserId){
				//						this.infoList.push(datasObj)
				//					}
				//				}
				console.log(!('jid' in this.userId))
				console.log(this.userId.account == JSON.parse(data).fromUserId)
				if(!('jid' in this.userId) && this.userId.account == JSON.parse(data).fromUserId) {
					this.infoList.push(datasObj)
				}
				if('jid' in this.userId && this.userId.jid == JSON.parse(data).room) {
					this.infoList.push(datasObj)
				}
				console.log('this.infoList',this.infoList)
				this.$nextTick(function() { //当dom发生变化，更新后执行的回调
					this.scrollBottomFun()
				});
				//				console.log(this.infoList)
			});
		},
		created() {
			console.log('目标聊天信息2', this.userId)
			this.userName(this.userId.username || this.userId.name)
			this.userImg(this.userId.user_img)
			this.historyRecordFun(this.userId)

		},
		watch: {
			//获取目标聊天信息
			userId(nl, ol) {
				console.log('目标聊天信息', nl, ol)
				this.userName(nl.username || nl.name)
				this.userImg(nl.user_img)
				this.historyRecordFun(nl)
			}

		},
		//时间格式转换过滤器
		filters: {
			formatDate: function(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			},
			//表情转换过滤器
			toImg: function(data) {
				let str = data
				let reg = /\[[\u4e00-\u9fa5]+\]/g
				let reg2 = /\[[\u4e00-\u9fa5]+\]/
				let emojiArr = str.match(reg)
				let htmls = ''
				if(emojiArr == null) {

				} else if(emojiArr.length !== 0) {
					for(let i = 0; i < emojiArr.length; i++) {
						for(let k = 0; k < emoji.length; k++) {
							if(emojiArr[i] == emoji[k].phrase) {
								htmls = `<img src="${emoji[k].url}">`
								str = str.replace(reg2, htmls)
								break;
							}
						}
					}
				}
				data = str
				return data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message-container-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		.message-panel-header {
			display: flex;
			flex-flow: row wrap;
			border-bottom: 1px solid #e5e5e5;
			height: 64px;
			line-height: 64px;
			padding: 0 16px;
			align-items: center;
			p.text {
				flex: 1;
				font-size: 18px;
				color: #383838;
			}
			a.close {
				width: 20px;
				height: 20px;
				cursor: pointer;
				background: url(../../assets/images/差号.png) no-repeat center center;
			}
		}
		.message-container {
			flex: 1;
			position: relative;
			height: 100%;
			overflow-y: auto;
			.message-item {
				display: flex;
				position: relative;
				z-index: 1;
				overflow: hidden;
				margin: 25px 15px;
				.headImg {
					width: 36px;
					height: 36px;
					border-radius: 50%;
					overflow: hidden;
					img {
						width: 36px;
						height: 36px;
					}
					p.defImg{
						width: 36px;
						height: 36px;
						background: #ffac44;
						font-size: 16px;
						text-align: center;
						line-height: 36px;
						color:#fff;
					}
				}
				.message-body {
					margin-left: 12px;
					flex: 1;
					box-sizing: border-box;
					.messageText {
						display: inline-block;
						padding: 8px 13px;
						color: #383838;
						font-size: 15px;
						word-break: break-word;
						border-radius: 10px;
						background: #eee;
					}
					.messageTime {
						color: #a6a6a6;
					}
				}
			}
			.message-item:first-child {
				margin-top: 50px;
			}
			.message-item.creator .message-body {
				text-align: right;
				.messageText {
					background: #e5f6fb;
				}
			}
		}
	}
</style>