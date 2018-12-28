<template>
	<div class="dialog" v-show="visible" @click.self="visible=false">
		<el-container>
			<el-aside>
				<header class="history-head" v-show="history">
					<i class="iconfont icon-duihua" @click.stop="select"></i>
				</header>
				<section class="history-main" v-show="history">
					<ul class="chat-list">
						<li :class="{actives:index==activesIndex}" v-for="(item, index) in historyList" @click="select2Chat(item, 0, index)" :key="index">
							<span class="remind" style="background: #0070FE;" v-if="item.newMsg"></span>
							<span class="remind" v-if="!item.newMsg"></span>
							<template v-if="!item.jid">
								<div class="chat-icon">
									<img v-if="item.user_img == ''" src="http://keyprojecttbdata.hnatech.com/thumbnail/01143307077f8b6c8683710e572f372280e8/w/200/h/200" alt="">
									<img v-if="!item.user_img == ''" :src="item.user_img" alt="">
								</div>
							</template>
							<template v-else>
								<div class="chat-icon">
									<img v-if="!item.imageUrl" src="http://keyprojecttb.hnatech.com/api/images/covers/cover-media.jpg" alt="">
									<img v-else :src="item.imageUrl" alt="">
								</div>
							</template>
							<template v-if="!item.jid">
								<div class="chat-info">
									<p class="chat-name">{{item.username}}</p>
									<p class="chat-speak" v-if="item.chatInfo">
										<span v-html="item.chatInfo.context"><!--{{item.chatInfo.context}}--></span>
									</p>
								</div>
							</template>
							<template v-else>
								<div class="chat-info">
									<p class="chat-name">{{item.name}}</p>
									<p class="chat-speak" v-if="item.chatInfo">
										<span>{{item.chatInfo.sender}}:</span><span v-html="item.chatInfo.context"><!--{{item.chatInfo.context}}--></span>
									</p>
								</div>
							</template>
							<div class="chat-time">
								<span v-if="item.chatInfo">
                  {{item.chatInfo.ts | timeFormat}}
                </span>
							</div>
							<div class="chat-close">
								<i class="iconfont icon-guanbi" @click.stop="delHistory(item, index)"></i>
							</div>
						</li>
					</ul>
				</section>
				<header class="select-head" v-show="!history">
					<header>
						<div class="back" @click.stop="select">
							<i class="iconfont icon-jiantouyou-copy"></i>
						</div>
						<h2>发起聊天</h2>
					</header>
				</header>
				<section class="select-main" v-show="!history">
					<div class="inp">
						<el-input v-model="memberInput" size="medium" v-show="tabIndex === 0" placeholder="搜索成员" @input="searchMem"></el-input>
						<el-input v-model="proInput" size="medium" v-show="tabIndex === 1" placeholder="搜索项目" @input="searchProject"></el-input>
					</div>
					<ul class="tab">
						<li :class="{'active': tabIndex===index}" @click="handleTab(item, index)" v-for="(item, index) in tabs" :key="index">
							<span>{{item}}</span>
							<i></i>
						</li>
					</ul>
					<div class="content">
						<template v-if="tabIndex === 0">
							<div class="member-list">
								<!-- <h4>常用联系人</h4> -->
								<div class="member-info" @click="select2Chat(item)" v-for="(item, index) in memberList" :key="index">
									<div class="member-img">
										<img v-show="item.user_img == ''" src="http://keyprojecttbdata.hnatech.com/thumbnail/01143307077f8b6c8683710e572f372280e8/w/200/h/200" alt="">
										<img v-show="!item.user_img == ''" :src="item.user_img" alt="">
									</div>
									<div class="member">
										<p class="name">
											{{item.username}}
										</p>
										<p class="email">
											{{item.email}}
										</p>
									</div>
								</div>
							</div>
						</template>
						<template v-if="tabIndex === 1">
							<div class="pro-list" v-for="(item, index) in projectList" :key="index">
								<!-- <h4>{{item[0][0].enName != undefined ? item[0][0].enName :'测试' }}</h4> -->
								<div class="pro-info" @click="select2Chat(v)" v-for="(v, i) in item" :key="i">
									<div class="pro-img">
										<img v-show="!v.imageUrl" src="http://keyprojecttbdata.hnatech.com/thumbnail/01143307077f8b6c8683710e572f372280e8/w/200/h/200" alt="">
										<img v-show="v.imageUrl" :src="v.imageUrl" alt="">
									</div>
									<div class="project">
										{{v.name}}
									</div>
								</div>
							</div>
						</template>
					</div>
				</section>
			</el-aside>
			<el-main>
				<mess @closeBox="closeChat" @commentfun="sendMessage" :userId="selectChat" v-if="chatbox"></mess>
				<div class="no-chat" v-else>
					<div class="iconfont icon-guanbi close" @click="closeChat"></div>
					<span>
            <img src="../../assets/images/timg.jpg" alt="">
          </span>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import mess from './messageContainer'
	import api from '../../api/http.js'
	import bus from '../../assets/js/Bus.js'
	import XMPP from 'api/xmpp'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		components: {
			mess
		},
		filters: {
			timeFormat(data) {
				let time = new Date(data)
				let year = time.getFullYear()
				let month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
				let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
				let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
				let s = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
				return `${month}月${day}日 ${h}:${s}`
			}
		},
		data() {
			return {
				visible: false,
				history: true,
				chatbox: false,
				memberInput: '',
				proInput: '',
				tabs: ['私信', '项目'],
				tabIndex: 0,
				memberList: [],
				projectList: [],
				historyList: [],
				selectChat: {},
				connection: null,
				activesIndex: NaN,
				jidArr: [],
				jidFlag: '',
				elems: null,
				carryEcho: false,
				newMsg: null
			}
		},
		methods: {
			//存储用户历史聊天列表
			setHIstoryLIst(str, fn) {
				api.post('/myModel/addMyChat', {
					context: str
				}).then(() => {
					fn()
				})
			},
			//获取用户历史聊天列表
			getHistoryListByUser(fn) {
				api.get('/myModel/getMyChatList').then(res => {
					localStorage.setItem('histroyMem', res.data.data[0].context)
					//			this.setHIstoryLIst(res.data.data[0].context)
					//			console.log(JSON.stringify(res.data.data[0].context))
					this.getHistoryList(this)
					fn()
					//			this.getProList()
				})
			},
			//加入我的群聊
			joinMyGroupChat() {
				if(this.jidArr.indexOf(this.selectChat.jid) == -1) {
					//			alert('加入房间成功')
					this.jidArr.push(this.selectChat.jid)
					let pres = $pres({
						id: this.getId(),
						to: this.selectChat.jid + '@' + api.xmpproom + '/' + sessionStorage.getItem("account")
					}).c("x", {
						xmlns: "http://jabber.org/protocol/muc"
					}).c("history", {
						maxchars: '0',
						seconds: '0'
					}).tree()
					this.connection.sendIQ(pres, function(res) {
						Strophe.serialize(res)
					})
				}

			},
			closeChat() {
				this.history = true
				this.chatbox = false
				this.visible = false
			},
			chatInfoSet(data, obj) {
				let str = JSON.stringify(obj.selectChat)
				let his = JSON.parse(localStorage.getItem('histroyMem')).map(v => {
					return JSON.parse(v)
				})
				let index = 0
				console.log(his)
				//    his.map((v, i) => {
				//      if ('jid' in obj.selectChat) {
				//        if (v.jid === obj.selectChat.jid) {
				//          index = i
				//          alert(222)
				//        } 
				//      } else {
				//        if (v.account === obj.account) {
				//          index = i
				//          alert(i)
				//        }
				//      }
				//    })
				for(let i = 0; i < his.length; i++) {
					if('jid' in obj.selectChat) {
						if(his[i].jid == obj.selectChat.jid) {
							index = i
						}
					} else {
						if(his[i].account == obj.selectChat.account) {
							index = i
						}
					}
				}
				//			his.findIndex(el => {
				//				return el
				//			})
				//			if(this.activesIndex != index){
				//				this.$set(his[index], 'newMsg', true);
				//				this.$set(this.historyList[index], 'newMsg', true);
				//			}
				//			alert(this.historyList[index].newMsg)

				Object.defineProperty(his[index], 'chatInfo', {
					value: data,
					configurable: true,
					enumerable: true,
					writable: true
				})
				his = his.map(v => {
					return JSON.stringify(v)
				})
				localStorage.setItem('histroyMem', JSON.stringify(his))
				new Promise((resolve, reject) => {
					this.setHIstoryLIst(JSON.stringify(his), function() {
						resolve()
					})
				}).then(() => {
					obj.getHistoryListByUser(function() {})
				})
			},
			//发送消息
			sendMessage(data) {
				this.chatInfoSet(data, this)
				let type = 'jid' in this.selectChat ? 'groupchat' : 'chat';
				let room = 'jid' in this.selectChat ? this.selectChat.jid : this.selectChat.account;
				let to = 'jid' in this.selectChat ? this.selectChat.jid + '@' + api.xmpproom : this.selectChat.account + '@' + api.xmpphost;
				let obj = JSON.parse(sessionStorage.getItem("userMessage"));
				console.log(XMPP.sendMsg(to, type, obj.account, obj.username, data.context, room).tree())
				this.connection.send(XMPP.sendMsg(to, type, obj.account, obj.username, data.context, room, obj.user_img).tree())
			},
			// 删除历史记录
			delHistory(item, index) {
				this.$confirm('确定删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					if(this.activesIndex == this.historyList.length - 1) {
						this.activesIndex--
					}
					let his = JSON.parse(localStorage.getItem('histroyMem'))
					his.splice(index, 1)
					this.historyList.splice(index, 1)
					localStorage.setItem('histroyMem', JSON.stringify(his))
					this.setHIstoryLIst(JSON.stringify(his), function() {})
					if(this.activesIndex != -1) {
						this.selectChat = this.historyList[this.activesIndex]
					} else {
						this.chatbox = false
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			// 打开私信列表
			select() {
				this.history = !this.history
			},
			// 私信项目切换
			handleTab(item, index) {
				this.tabIndex = index
			},
			// 选中聊天对象
			select2Chat(data, flag, index) {
				let _this = this
				if(arguments.length == 3) {
					this.activesIndex = index
					this.historyList[index].newMsg = false
					this.openChatBox()
					this.history = true
					let arr = this.historyList.map(el => {
						return JSON.stringify(el)
					})
					console.log(this.historyList)
					this.setHIstoryLIst(JSON.stringify(arr), function() {
						_this.getHistoryListByUser(function() {})
					});

				}
				if('account' in data && data.account == sessionStorage.getItem("account")) {
					this.history = true
					return;
				}
				this.selectChat = data
				if('jid' in data) {
					this.joinMyGroupChat()
				}
				let his = JSON.parse(localStorage.getItem('histroyMem'))
				if(his === null) {
					his = []
				}
				//    if (his.indexOf(JSON.stringify(data)) == -1) {
				//      his.unshift(JSON.stringify(data))
				//      alert(3)
				//    }
				if(arguments.length == 1) {

					his = his.map(el => {
						return JSON.parse(el)
					})
					let num = NaN
					for(let i = 0; i < his.length; i++) {
						if('jid' in data) {
							if(data.jid == his[i].jid) {
								num = i
							}
						} else {
							if(data.account == his[i].account) {
								num = i
							}
						}
					}

					this.activesIndex = isNaN(num) ? 0 : num
					his = his.map(el => {
						return JSON.stringify(el)
					})
					if(isNaN(num)) {
						his.unshift(JSON.stringify(data))
					}
					localStorage.setItem('histroyMem', JSON.stringify(his))
					new Promise((resolve, reject) => {
						this.setHIstoryLIst(JSON.stringify(his), function() {
							resolve()
						})
					}).then(() => {
						this.getHistoryListByUser(function() {})
					})
					this.openChatBox()
					this.history = true
				}
			},
			// 打开聊天盒子
			openChatBox() {
				this.chatbox = true
			},
			// 搜索聊天成员
			searchMem() {
				api.get('/userInfo/findUserLikeAccount', {
					likeAccount: this.memberInput
				}).then(res => {
					this.memberList.splice(0, this.memberList.length)
					this.memberList = res.data.data
				})
			},
			// 搜索项目群组
			searchProject() {
				this.getProList(this.proInput)
			},
			// 获取成员列表
			getMemberList() {
				api.get('/userInfo/getNormalUserList', {
					page: 0,
					size: 2 ^ 30
				}).then(res => {
					this.memberList.splice(0, this.memberList.length)
					this.memberList = res.data.data.allUser.list
				})
			},
			// 获取项目列表
			getProList(searchPro) {
				let that = this
				this.getHistoryListByUser(function() {
					$.ajax({
						type: 'post',
						url: api.xmpphttp + '/room/project/list/his',
						contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
						dataType: 'JSON',
						data: {
							ownerId: sessionStorage.getItem('account'),
							flag: 1,
							name: searchPro
						},
						success: function(data) {
							that.connectXMPP()
							that.projectList = []
							if(!data.data) return
							that.projectList = data.data
							let userQuitTime = JSON.parse(sessionStorage.getItem("userMessage")).loginOutTime
							let arr = []
							data.data.map(el => {
								arr = arr.concat(el)
							})
							console.log(arr)
							for(var i = 0; i < arr.length; i++) {
								if(arr[i].object == null) {
									continue;
								} else {
									if(arr[i].object.ts > userQuitTime) {
										that.$set(arr[i], 'newMsg', true)
										that.$set(arr[i], 'chatInfo', {
											context: arr[i].object.context,
											sender: arr[i].object.sender,
											ts: arr[i].object.ts
										})
										let num = NaN
										that.historyList.map(el => {
											if('jid' in el && el.jid == arr[i].jid) {
												console.log('jid' in el && el.jid == arr[i].jid)
												num = i
											}
										})
										if(isNaN(num)) {
											that.historyList.unshift(arr[i])
										} else {
											if(JSON.parse(sessionStorage.getItem("userMessage")).account != arr[i].object.sender) {
												that.$set(that.historyList[num], 'newMsg', true)
												that.$set(that.historyList[num], 'chatInfo', {
													context: arr[i].object.context,
													sender: arr[i].object.sender,
													ts: arr[i].object.ts
												})
											}

										}
									}
								}
							}
							let arrs = that.historyList.map(el => {
								return JSON.stringify(el)
							})
							that.setHIstoryLIst(JSON.stringify(arrs), function() {});
							//        arr.map(el => {
							//        	if(el.object == null){
							//        		continue
							//        	}else{
							//        		
							//        	}
							//        })
							let room = []
							data.data.forEach(ele => {
								ele.forEach(v => {
									room.push(`${v.jid}@${api.xmpproom}`)
								})
							})
							sessionStorage.setItem('ROOM', JSON.stringify(room))
						}
					})
				})
			},
			getId() {
				return Math.round(new Date().getTime() / 1000) + Math.floor(Math.random() * 1000)
			},
			//列表无该消息时的回显
			addNoneItem(flag) {
				//  	alert(flag)
				let num = NaN
				if(flag.length == 32) {
					//  		alert(1)
					this.historyList.map((el, index) => {
						if('jid' in el && el.jid == flag) {
							num = index
						}
					})
					//  		alert(isNaN(num))
					if(isNaN(num)) {
						$.ajax({
							type: 'post',
							url: api.xmpphttp + '/room/selectByJid',
							contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
							dataType: 'JSON',
							data: {
								Jid: flag
							},
							success: data => {
								console.log(data)
							}
						})
					}
				} else {
					//  		alert(2)
					this.historyList.map((el, index) => {
						if('account' in el && el.account == flag) {
							num = index
						}
					})
					//  		alert(isNaN(num))
					if(isNaN(num)) {
						api.get('/userInfo/findUserByAccount', {
							account: flag
						}).then(res => {
							console.log(res)
							let obj = res.data.data
							this.$set(obj, 'newMsg', true)
							console.log(this.newMsg)
							this.$set(obj, 'chatInfo', {
								'context': '',
								'sender': res.data.data.wang,
								'ts': Date.parse(new Date())
							})
							this.historyList.unshift(obj)
							console.log(this.historyList)
							let arr = this.historyList.map(el => {
								return JSON.stringify(el)
							})
							console.log(this.historyList)
							this.setHIstoryLIst(JSON.stringify(arr), function() {});
						})
					}
				}

			},
			//接收回显
			echoMessage(flag, elems) {
				this.addNoneItem(flag)
				if(flag.length == 32) {
					this.historyList.map((el, index) => {
						if('jid' in el) {
							if(el.jid == flag) {
								if(index != this.activesIndex) {
									this.$set(el, 'newMsg', true)
								}
								if('chatInfo' in el) {
									el.chatInfo.context = JSON.parse(elems[0].innerHTML).content
									el.chatInfo.sender = JSON.parse(elems[0].innerHTML).fromUserName
									el.chatInfo.ts = Date.parse(new Date)
								} else {
									el.chatInfo = {
										context: JSON.parse(elems[0].innerHTML).content,
										sender: JSON.parse(elems[0].innerHTML).fromUserName,
										ts: Date.parse(new Date)
									}
								}
							}
						}
					})
				} else {
					this.historyList.map((el, index) => {
						if('account' in el) {
							if(el.account == flag) {
								if(index != this.activesIndex) {
									this.$set(el, 'newMsg', true)
								}
								if('chatInfo' in el) {
									el.chatInfo.context = JSON.parse(elems[0].innerHTML).content
									el.chatInfo.sender = JSON.parse(elems[0].innerHTML).fromUserName
									el.chatInfo.ts = Date.parse(new Date)

								} else {
									el.chatInfo = {
										context: JSON.parse(elems[0].innerHTML).content,
										sender: JSON.parse(elems[0].innerHTML).fromUserName,
										ts: Date.parse(new Date)
									}
								}
							}
						}
					})
				}
				if(this.historyList.length == 0) {
					return
				}
				let arr = this.historyList.map(el => {
					return JSON.stringify(el)
				})
				console.log(this.historyList)
				this.setHIstoryLIst(JSON.stringify(arr), function() {});
			},
			// 链接及时通讯
			connectXMPP() {
				let self = this
				let jid = sessionStorage.getItem('account')
				let password = sessionStorage.getItem('token')
				let account = sessionStorage.getItem('account').split("@")[0] + '@' + api.xmpp.split('//')[1]
				self.connection = new Strophe.Connection(api.xmpp)
				self.connection.connect(`${jid}@${api.xmpphost}`, password, function(status) {
					console.log(status)
					if(status == Strophe.Status.CONNFAIL) {
						console.log("连接失败！");
					} else if(status == Strophe.Status.AUTHFAIL) {
						console.log("登录失败！");
					} else if(status == Strophe.Status.DISCONNECTED) {
						console.log("连接断开！");
					} else if(status == Strophe.Status.CONNECTED) {
						console.log('连接成功')
						// 告诉服务器 我已上线
						self.connection.send($pres().tree())
						// 加入群聊房间
						//        let roomId = JSON.parse(sessionStorage.getItem('ROOM'))
						//        if (roomId !== null && roomId.length) {
						//          roomId.forEach(v => {
						//            let pres = $pres({
						//              from: self.getId(),
						//              to: `${v}/${jid}`
						//            }).c('x',{xmlns: 'http://jabber.org/protocol/muc'}).tree()
						//            self.connection.send(pres)
						//          })
						//        }
						// 监听消息,并处理
						self.connection.addHandler(function(msg) {
							console.log(msg)
							let from = msg.getAttribute('from');
							let type = msg.getAttribute('type');
							let to = msg.getAttribute('to')
							let id = msg.getAttribute('id')
							let elems = msg.getElementsByTagName('body')
							//          self.carryEcho = !self.carryEcho
							self.jidFlag = from.split("@")[0];
							self.elems = elems;
							// 信息为单聊
							if(elems.length > 0 && type === 'chat') {
								//          	alert(555)
								//          	self.historyList.push({
								//          		username:'2222',
								//          		user_img:'',
								//          		email:'2222222'
								//          	})
								//          	console.log(self.historyList)
								let body = elems[0]
								this.newMsg = JSON.parse(body.innerHTML)
								let msgObj = JSON.parse(body.innerHTML)
								// 如果消息为私信,发送收到回执
								if(type === 'chat') {
									let receipt = $msg({
										to: from,
										from: to,
										type: 'chat'
									}).c("received", {
										xmlns: "urn:xmpp:receipts",
										id: id
									}, null)
									self.connection.send(receipt.tree());
								}
								if(msgObj.type == '907') {
									var pres = $pres({
										from: `${jid}@${api.xmpphost}`,
										to: `${msgObj.objectId}@${api.xmpproom}/${jid}`
									}).c('x', {
										xmlns: 'http://jabber.org/protocol/muc'
									}).c("history", {
										maxchars: '0',
										seconds: '0'
									}).tree();
									self.connection.send(pres);
								}
								// 储存历史聊天对象
								let historySess = JSON.parse(localStorage.getItem('histroyMem'))
								if(historySess == null) {
									localStorage.setItem('histroyMem', JSON.stringify([]))
									this.setHIstoryLIst(JSON.stringify([]), function() {})
									historySess = []
								}
								if(msgObj.type == 1) {
									self.getPersonDetail(msgObj.fromUserId, historySess, msgObj)
								} else if(msgObj.type == 907) {
									self.getGroupDeail(msgObj.content, historySess)
								}

								if(self.visible && msgObj.type == 1) {
									bus.$emit('realTimeInfo', body.innerHTML)
								} else {
									let long = localStorage.getItem('information')
									if(!long) {
										localStorage.setItem('information', 0)
									}
									localStorage.setItem('information', long * 1 + 1)
									bus.$emit('msgCount')
								}
								// 信息为群聊
							} else if(elems.length > 0 && type === 'groupchat') {
								let body = elems[0]
								if(self.visible) {
									if(from.split('/')[from.split('/').length - 1] != sessionStorage.getItem("account")) {
										if(to.indexOf('tigase') > -1) {
											bus.$emit('realTimeInfo', body.innerHTML)
										}
									}
								} else {
									let long = localStorage.getItem('information')
									if(!long) {
										localStorage.setItem('information', 0)
									}
									localStorage.setItem('information', long * 1 + 1)
									bus.$emit('msgCount')
								}
								self.carryEcho = !self.carryEcho
							}
							self.carryEcho = !self.carryEcho
							return true
						}, null, 'message', null, null, null)
						// 心跳包
						//        window.setInterval(function(){
						//          var iq = $iq({
						//            id : self.randomUUID(),
						//            to : api.xmpp.split(':')[0],
						//            type : "get"
						//          }).c("ping", {
						//            xmlns : "urn:xmpp:ping"
						//          }, null)
						//          self.connection.send(iq)
						//        },5000)
					}
				})
			},
			// 随机Id
			randomUUID() {
				var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
					uuid = new Array(36),
					rnd = 0,
					r;
				for(var i = 0; i < 36; i++) {
					if(i == 8 || i == 13 || i == 18 || i == 23) {
						uuid[i] = '-';
					} else if(i == 14) {
						uuid[i] = '4';
					} else {
						if(rnd <= 0x02)
							rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
						r = rnd & 0xf;
						rnd = rnd >> 4;
						uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
					}
				}
				return uuid.join('').replace(/-/gm, '').toLowerCase();
			},
			// 获取历史聊天列表
			getPersonDetail(person, arr, msgObj) {
				let newArr = arr.slice()
				api.get('/userInfo/findUserByAccount', {
					account: person
				}).then(res => {
					if(res.data.data === null) return
					newArr = newArr.map(v => {
						return JSON.parse(v)
					})
					let index = -1
					newArr.forEach((v, i) => {
						if(v.account === res.data.data.account) {
							index = i
						}
					})
					if(index === -1) {
						arr.unshift(JSON.stringify(res.data.data))
					}
					//      localStorage.setItem('histroyMem', JSON.stringify(arr))
					//      this.setHIstoryLIst(JSON.stringify(arr),function(){})
					//				let arr = this.historyList.map(el => {
					//					return JSON.parse(el)
					//				})
					//				this.setHIstoryLIst(JSON.stringify(arr), function(){});
					let chatInfo = {
						'context': msgObj.content,
						'sender': msgObj.fromUserName,
						'ts': msgObj.timeSend * 1000
					}
					//      this.chatInfoSet(chatInfo, this)
				})
			},
			getGroupDeail(group, arr) {
				$.ajax({
					type: 'post',
					url: api.xmpphttp + '/room/project/list/his',
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					dataType: 'JSON',
					data: {
						ownerId: sessionStorage.getItem('account'),
						name: group,
						flag: 1
					},
					success: function(data) {
						if(!data.data.length) return
						data.data.forEach(m => {
							m.forEach(n => {
								if(arr.includes(JSON.stringify(n))) return
								arr.unshift(JSON.stringify(n))
								//            alert(2)
								//            localStorage.setItem('histroyMem', JSON.stringify(arr))
								//            this.setHIstoryLIst(JSON.stringify(arr),function(){})
							})
						})
					}
				})
			},
			getHistoryList(obj) {
				obj.historyList = []
				let h = JSON.parse(localStorage.getItem('histroyMem'))
				if(!h) return
				h = h.map(v => {
					return typeof v == 'string' ? JSON.parse(v) : v
				})
				h = h.map(el => {
					if(!('newMsg' in el)) {
						this.$set(el, 'newMsg', false)
					}

					return el
				})
				obj.historyList = h
			}
		},
		created() {
			this.getMemberList()
			this.getProList()
		},
		watch: {
			show() {
				this.visible = true
				this.getHistoryListByUser(function() {})
			},
			carryEcho(val) {
				this.echoMessage(this.jidFlag, this.elems)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: inherit;
		background-color: rgba(0, 0, 0, .5);
		overflow: hidden;
		.el-container {
			width: 738px;
			height: 80vh;
			background-color: #fff;
			margin: 12vh auto;
			.el-aside {
				display: flex;
				flex-direction: column;
				border-right: 1px solid #efefef;
				.history-head {
					height: 64px;
					border-bottom: 1px solid #efefef;
					display: flex;
					align-items: center;
					padding: 0 15px;
					i {
						font-size: 32px;
						cursor: pointer;
						color: #888888;
					}
				}
				.history-main {
					flex: 1;
					overflow-y: auto;
					.chat-list {
						padding-top: 20px;
						li {
							display: flex;
							padding: 20px 14px 20px 20px;
							font-size: 12px;
							color: #888;
							line-height: 15px;
							.chat-icon {
								width: 30px;
								height: 30px;
								border-radius: 2px;
								margin-right: 6px;
								img {
									width: 30px;
									height: 30px;
								}
							}
							.chat-info {
								flex: 1;
								width: 120px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								.chat-name {
									color: #333;
									width: 120px;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
							.chat-close {
								position: relative;
								z-index: 1;
								display: none;
								i {
									cursor: pointer;
								}
							}
							&:hover {
								background-color: #f9f9f9;
								.chat-name {
									color: #3da8f5;
								}
								.chat-close {
									display: block;
									i:hover {
										color: #3da8f5;
									}
								}
								.chat-time {
									display: none;
								}
							}
							&.active {
								background-color: #f9f9f9;
							}
						}
					}
				}
				.select-head {
					header {
						position: relative;
						padding: 0 15px;
						height: 64px;
						line-height: 64px;
						color: #333;
						h2 {
							width: 100%;
							text-align: center;
							font-weight: 400;
						}
						.back {
							position: absolute;
							top: 0;
							left: 15px;
							color: #888;
							height: 64px;
							line-height: 64px;
							cursor: pointer;
							.iconfont {
								font-size: 20px;
							}
						}
					}
				}
				.select-main {
					flex: 1;
					display: flex;
					flex-direction: column;
					.inp {
						padding: 0 15px;
						height: 36px;
					}
					.tab {
						display: flex;
						width: calc(100% - 30px);
						height: 45px;
						margin: 0 auto;
						border-bottom: 2px solid #ccc;
						li {
							padding: 0 4px;
							text-align: center;
							line-height: 45px;
							position: relative;
							margin-right: 20px;
							i {
								position: absolute;
								left: 0;
								bottom: -2px;
								width: 100%;
								height: 3px;
								border-radius: 1px;
								background-color: transparent;
							}
							&.active {
								i {
									background-color: #3da8f5;
								}
							}
						}
					}
					.content {
						flex: 1;
						overflow-y: auto;
					}
					.member-list {
						h4 {
							padding: 15px;
							color: #ccc;
							font-size: 14px;
						}
						.member-info {
							padding: 10px 15px;
							display: flex;
							.member-img {
								width: 36px;
								height: 36px;
								margin-right: 10px;
								img {
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}
							.member {
								flex: 1;
								.name {
									color: #333;
								}
								.email {
									color: #888;
									font-size: 12px;
								}
							}
							&:hover {
								background-color: #f9f9f9;
								cursor: pointer;
							}
						}
					}
					.pro-list {
						h4 {
							padding: 15px;
							color: #ccc;
							font-size: 14px;
						}
						.pro-info {
							padding: 10px 15px;
							display: flex;
							.pro-img {
								width: 36px;
								height: 36px;
								margin-right: 10px;
								img {
									width: 100%;
									height: 100%;
									border-radius: 4px;
								}
							}
							.project {
								flex: 1;
								line-height: 36px;
							}
							&:hover {
								background-color: #f9f9f9;
								cursor: pointer;
							}
						}
					}
				}
			}
			.el-main {
				width: 500px;
				padding: 0;
				.no-chat {
					width: 100%;
					height: 100%;
					line-height: 70vh;
					text-align: center;
					position: relative;
					img {
						width: 90px;
					}
					.close {
						position: absolute;
						top: 10px;
						right: 10px;
						font-size: 24px;
						line-height: 40px;
						color: #888;
						cursor: pointer;
					}
				}
			}
		}
		 ::-webkit-scrollbar {
			width: 4px;
			background-color: #f0f0f0;
		}
		 ::-webkit-scrollbar-thumb {
			background-color: #C1C1C1;
			border-radius: 2px;
		}
	}
	
	.actives {
		background: #f9f9f9;
	}
	
	.remind {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 6px;
		margin-right: 5px;
		margin-top: 12px;
	}
</style>