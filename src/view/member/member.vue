<template>
	<div class="memberBox">
		<div class="memberMenu">
			<div class="searchMember">
				<i class="el-icon-search"></i>
				<input @keyup.enter="allMember" type="text" v-model="search" placeholder="搜索所有成员" />
			</div>
			<div class="memberList">
				<h4>成员</h4>
				<ul>
					<li @click="allMember">
						<div style="cursor: pointer;"><i class="iconfont icon-renyuan"></i> 所有成员</div>
					</li>
					<!--<li>
						<div style="cursor: pointer;"><i class="iconfont icon-jiaren"></i> 新加入的成员</div>
					</li>
					<li>
						<div style="cursor: pointer;"><i class="iconfont icon-weifenzu"></i> 未分配部门的成员</div>
					</li>-->
					<li @click="stopMember">
						<div style="cursor: pointer;"><i class="iconfont icon-tingyong"></i> 停用的成员</div>
					</li>
				</ul>
				<!--<h4>部门</h4>
				<ul>
					<li>
						<div><i class="iconfont icon-qiyexinxi"></i> 三核</div>
						<div><i class="el-icon-arrow-down"></i></div>
					</li>
				</ul>
				<div class="create">
					<i class="iconfont icon-add"></i> <span>创建部门</span>
				</div>
				<h4>群组</h4>
				<ul>
					<li></li>
				</ul>
				<div class="create">
					<i class="iconfont icon-add"></i> <span>创建群组</span>
				</div>
				<div class="more">更多〉</div>
				<div class="create">
					<i class="iconfont icon-zonghepaixu"></i> <span>部门排序</span>
				</div>-->
			</div>
		</div>
		<div class="content">
			<div class="contentHead">
				<div>{{title}} <b style="color: #1885e9;">{{numberOfPeople}}</b></div>
				<div>
					<div style="font-size: 14px;">
						<img style="vertical-align: middle;" src="../../assets/images/piliang.png" /> 批量更新成员信息
					</div>
					<div style="font-size: 14px;">
						<i class="iconfont icon-add-copy-copy" v-if="addQYcyFlage"></i> <span v-if="addQYcyFlage" @click="addMemberBol = !addMemberBol">添加成员</span>
						<div class="addMember" v-show="addMemberBol">
							<ul>
								<li @click="addMemberBox = true;addMemberBol = false">通过邮箱邀请成员</li>
								<li>下载批量添加成员模板</li>
								<li>上传文件批量添加模板</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<ul class="memberList" style="margin: 0 10px;">
				<li v-for="(item,index) in memberList" @click="memberMessageSkip(item)">
					<div class="name">
						<img v-if="item.userImg != ''" :src="item.userImg"/>
                        <div v-if="item.userImg == ''" class="img">{{item.name[0]}}</div>
						<!--<img v-if="item.userImg == ''" src="../../assets/images/22登录_01.png" />--> {{item.name}}
					</div>
					<div class="role">
						<span :class="{blue:item.operation==true,owner:item.rolename=='拥有者'}">{{item.rolename}}</span>
						<span style="display:inline-block;width: 20px;" @click.stop="item.operation = !item.operation">
							<i :class="{blue:item.operation==true}" v-if="item.rolename != '拥有者'" class="el-icon-arrow-down"></i>
						</span>
						<div :class="{operation:index>memberList.length-4,operation2:memberList.length>=4?index<=memberList.length-4:true}" v-show="item.operation">
							<div>
								<h4>
									<div></div>
									<div>成员菜单</div>
									<div>
										<i @click.stop="item.operation=false" class="el-icon-close"></i>
									</div>
								</h4>
							</div>
							<ul>
								<li v-for="role in roleList" @click="assignRoles(item,role)">
									<div class="check" v-if="item.rolename==role.roleName">
										<div>{{role.roleName}}</div>
										<div><i class="el-icon-check"></i></div>
									</div>
									<div v-else-if="item.rolename!=role.roleName">{{role.roleName}}</div>
								</li>
							</ul>
							<ul>
								<li @click="onOff(item)">{{item.state | onOffContent}}</li>
								<li @click="delMember(item,index)" v-if="removeQYcyFlage">从企业移除成员</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="添加成员至企业" :visible.sync="addMemberBox" width="400px" center>
			<span>
				<el-input v-model="member" placeholder="搜索成员"></el-input>
				<h4 class="inviteTitle">账号邀请</h4>
				<div class="memberListBox">
					<ul class="memberList">
						<li v-for="(item,index) in addMemberListTwo">
							<div>
								<img v-if="item.user_img != ''" :src="item.user_img"/>
                                <div v-if="item.user_img == ''" class="img">{{item.username[0]}}</div>
								<!--<img v-if="item.user_img == ''" src="../../assets/images/22登录_01.png"/>-->
								<span>{{item.username}}</span>
							</div>
							<div class="addBtn">
								<el-button @click="addMember(index)" size="mini" type="primary" plain>添加</el-button>
							</div>
						</li>
					</ul>
				</div>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	import API from 'api/http'
	import upload from 'components/upload'
	import Bus from 'assets/js/Bus.js'
	let pageSize = 0;
	let browserHeight = document.documentElement.clientHeight || window.innerHeight || document.body.offsetHeight
	if(browserHeight>=800){
		pageSize = 7;
	}else if(browserHeight<800){
		pageSize = 5;
	}
	export default {
		name: 'member',
		components: {
			upload
		},
		data() {
			return {
				//企业权限
				//添加企业成员
				addQYcyFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[10].status,
				//添加企业成员
				removeQYcyFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[11].status,



				/*
				 	在那个页面上的标识
				 * 	所有成员 1
				 * 	停用成员 4
				 * */
				flag:1,
				//标题
				title: '所有成员',
				//搜索框的内容
				search: '',
				//总数
				total: 4,
				//每页显示的个数
				pageSize: pageSize,
				//当前页数
				pageNum:1,
				//人数
				numberOfPeople: 0,
				//人员列表
				memberList: [],
				//角色列表
				roleList: [],
				//点击添加成员触发
				addMemberBol: false,
				//点击通过邮箱邀请成员触发
				addMemberBox: false,
				//添加成员弹窗e-input
				member: '',
				addMemberList: [],
				addMemberListTwo: []
			}
		},
		filters: {
			onOffContent(state) {
				if(state == 0) {
					return '启用成员'
				} else if(state == 1) {
					return '停用成员'
				}
			}
		},
		methods: {
			//获取所有成员的列表
			allMember() {
				/*
				 *  	获取人员列表
				 * 		获取角色列表
				 * */
				this.flag = 1
				this.title = "所有成员"
				new Promise((resolve, reject) => {
					API.post('/user/getUserList', {
						page: 1,
						size: this.pageSize,
						enterpriseId: sessionStorage.getItem('enterpriseId'),
						name:this.search
					}).then(res => {
						console.log(res.data.data,11111111111111)
						//获取人员列表
						this.memberList = res.data.data.list.map(el => {
							el.operation = false
							return el
						})
						//人员总数
						this.total = res.data.data.total
						this.numberOfPeople = res.data.data.total
						resolve()
					})
				}).then(() => {
					API.get('/user/getRole', {
						eid: sessionStorage.getItem('enterpriseId')
					}).then(res => {
						console.log(res.data.data)
						//获取角色列表
						this.roleList = res.data.data
					})
				})
			},
			//获取停用成员的列表
			stopMember() {
				this.flag = 4;
				this.title = "停用的成员"
				this.roleList = []
				API.get('/user/queryDisable', {
					eid: sessionStorage.getItem('enterpriseId'),
					pageNum:this.pageNum,
					pageSize:this.pageSize
				}).then(res => {
					console.log(res)
					this.memberList = res.data.data.list.map(el => {
						el.operation = false
						el.rolename = '已停用'
						return el
					})
					this.total = res.data.data.total
					this.numberOfPeople = res.data.data.total
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},

			//切换页数时调用的方法
			handleCurrentChange(val) {
				this.pageNum=val
				if(this.flag == 1){ //现在是所有成员页面
					API.post('/user/getUserList', {
						//页数
						page: val,
						//一页的数量
						size: this.pageSize,
						name: this.search,
						enterpriseId: sessionStorage.getItem('enterpriseId')
					}).then(res => {
						console.log(res.data.data.list)
						this.memberList = res.data.data.list.map(el => {
							el.operation = false
							return el
						})
						console.log(this.memberList)
						this.total = res.data.data.total
						this.numberOfPeople = res.data.data.total
					})
				}else if(this.flag == 4){ //现在是停用用户页面
					this.stopMember()
				}

			},

			//给人员分配角色
			assignRoles(item, role) {
				//				alert(item.id)
				//				alert(role.roleId)
				API.post('/user/updateRole', {
					//成员ID
					id: item.id,
					//角色ID
					roleId: role.roleId
				}).then(res => {
					if(res.data.message == 'SUCCESS') {
						item.rolename = role.roleName;
						item.operation = false;
					}
				})

			},

			//启用或停用成员
			onOff(item) {
				let state;
				let str;
				if(item.state == 0) {
					state = 1;
					str = '启用';
				} else if(item.state == 1) {
					state = 0;
					str = '停用';
				}
				this.$confirm('是否' + str + '该用户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: str + '成功!'
					});

					API.post('/user/updateState', {
						state: state,
						id: item.id
					}).then(res => {
						if(res.data.message == 'SUCCESS') {
							item.state = state
							item.operation = false
							if(this.title == '停用的成员') {
								this.stopMember()
							}
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消' + str
					});
				});
			},

			//删除成员
			delMember(item, index) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					API.get('/user/delUser', {
						id: item.id
					}).then(res => {
						console.log(res)
						this.memberList.splice(index, 1)
						this.allMember()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			//添加成员
			addMember(index) {
				//				console.log(this.addMemberList[index])
				API.post('/userInfo/invitationUser', {
					id: this.addMemberListTwo[index].id,
					eid: sessionStorage.getItem('enterpriseId')
				}).then(res => {
					console.log(res)
					this.allMember()
					this.addMemberListTwo.splice(index, 1)
				})
			},

			//跳到成员详情页
			memberMessageSkip(item) {
				console.log(item)
				let lock = true;
				for(let i in this.memberList) {
					if(this.memberList[i].operation == true) {
						lock = false
					}
				}
				if(lock) {
					this.$router.push({
						path: '/memberMessage'
					})
					sessionStorage.setItem('memberId', item.id)
				}

			}
		},
		created() {
			this.allMember()

			API.get('/userInfo/showAllUser', {
				eid: sessionStorage.getItem('enterpriseId')
			}).then(res => {
				console.log(res.data.data)
				this.addMemberList = res.data.data
				for(let i in this.addMemberList) {
					this.addMemberListTwo[i] = this.addMemberList[i]
				}
			})

			//接收组件通信信息
			Bus.$on('toCurrentRolePermissions', (msg) => {
				this.addQYcyFlage = msg.enterprisePermissionList[10].status
				this.removeQYcyFlage = msg.enterprisePermissionList[11].status
			});

		},
		watch: {
			member() {
				this.addMemberListTwo = this.addMemberList.filter(el => {
					if(el.username.indexOf(this.member) > -1) {
						return true
					}
				})
			},
			search(val){
				if(val.trim() == ''){
					this.allMember()
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.memberBox {
		margin-top: 10px;
    	margin-left: 30px;
    	height: 78vh;
		.memberMenu {
			padding-top: 20px;
			width: 270px;
			background: #f7f7f7;
			height: 100%;
			overflow: auto;
			float: left;
			.searchMember {
				text-align: center;
				position: relative;
				i {
					position: absolute;
					top: 13px;
					left: 32px;
					font-size: 13px;
					color: #cccccc;
				}
				input {
					padding-left: 30px;
					width: 200px;
					height: 36px;
					outline: none;
					background-color: rgba(0, 0, 0, 0);
					border: 2px solid #e7e7e7;
					border-radius: 4px;
				}
				input::-webkit-input-placeholder {
					color: #CCCCCC;
				}
			}
			.memberList {
				padding-left: 20px;
				padding-right: 20px;
				h4 {
					margin: 30px 0;
					color: #333333;
					font-size: 14px;
				}
				li {
					cursor: default;
					padding: 3px 6px;
					border-radius: 3px;
					line-height: 30px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #666666;
					font-size: 14px;
				}
				li:hover {
					background: gainsboro;
				}
				.create {
					font-size: 14px;
					i{
						margin-top: 4px;
					}
					cursor: pointer;
					margin-top: 20px;
					display: flex;
					align-items: center;
					color: #0a7ee9;
					span{
						margin-left: 5px;
					}
				}
				.more {
					cursor: pointer;
					color: #c3c3c3;
					margin: 20px 0;
				}
			}
		}
		/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
		.memberMenu::-webkit-scrollbar {
			width: 4px;
			height: 16px;
			background-color: #f5f5f5;
		}
		/*定义滚动条的轨道，内阴影及圆角*/
		.memberMenu::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
			border-radius: 10px;
			background-color: white;
		}
		/*定义滑块，内阴影及圆角*/
		.memberMenu::-webkit-scrollbar-thumb {
			/*width: 10px;*/
			height: 20px;
			border-radius: 10px;
			-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
			background-color: gainsboro;
		}
		/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
		.content::-webkit-scrollbar {
			width: 4px;
			height: 16px;
			background-color: #f5f5f5;
		}
		/*定义滚动条的轨道，内阴影及圆角*/
		.content::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
			border-radius: 10px;
			background-color: white;
		}
		/*定义滑块，内阴影及圆角*/
		.content::-webkit-scrollbar-thumb {
			/*width: 10px;*/
			height: 20px;
			border-radius: 10px;
			-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
			background-color: gainsboro;
		}
		.content {
			position: relative;
		    padding-top: 0;
		    overflow: auto;
		    height: 100%;
		    background: #f7f7f7;
		    margin-left: 290px;
		    color: #333;
			.contentHead {
				margin: 10px;
				margin-bottom: 0;
				height: 78px;
				background: white;
				line-height: 78px;
			}
			.contentHead>div:nth-child(2) {
				user-select: none;
				cursor: pointer;
				float: right;
				display: flex;
				margin-right: 33px;
				color: #1885e9;
				position: relative;
				div {
					margin-left: 20px;
				}
				.addMember {
					right: -30px;
					position: absolute;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 170px;
					height: 118px;
					background: white;
					box-shadow: 0 0 10px #999999;
					z-index: 10;
					li {
						line-height: 30px;
						color: #999999;
						font-size: 12px;
					}
				}
			}
			.contentHead>div:nth-child(1) {
				float: left;
				margin-left: 33px;
				font-size: 14px;
				font-weight: 600;
			}
			.memberList {
				li {
					display: flex;
					height: 78px;
					justify-content: space-between;
					align-items: center;
					background: white;
					margin-top: 1px;
					font-size: 14px;
					.name {
						margin-left: 20px;
						display: flex;
						align-items: center;
						cursor: pointer;
						img {
							width: 30px;
							height: 30px;
							border-radius: 30px;
							margin-right: 10px;
						}
					}
					.role {
						text-align: right;
						margin-right: 30px;
						cursor: pointer;
						width: 100px;
						position: relative;
						span {
							color: #999999;
						}
						.operation {
							padding: 14px;
							width: 200px;
							box-shadow: -0px 0px 20px gray;
							position: absolute;
							background: white;
							z-index: 1;
							top: -250px;
							right: 0;
							h4 {
								display: flex;
								cursor: default;
								text-align: center;
								height: 40px;
								div {
									flex: 1;
									text-align: right;
								}
							}
							ul {
								padding: 10px 0;
								border-top: 2px solid #efefef;
								color: #999999;
								font-size: 12px;
							}
							li {
								padding-left: 6px;
								cursor: default;
								width: 100%;
								height: 32px;
								cursor: pointer;
								.check {
									width: 100%;
									padding-right: 10px;
									display: flex;
									justify-content: space-between;
									align-items: center;
									color: #077ce5;
								}
							}
						}
						.operation2 {
							padding: 14px;
							width: 200px;
							box-shadow: -0px 0px 20px gray;
							position: absolute;
							background: white;
							z-index: 1;
							top: 30px;
							right: 0;
							h4 {
								display: flex;
								cursor: default;
								text-align: center;
								height: 40px;
								div {
									flex: 1;
									text-align: right;
								}
							}
							ul {
								padding: 10px 0;
								border-top: 2px solid #efefef;
								color: #999999;
								font-size: 12px;
							}
							li {
								padding-left: 6px;
								cursor: default;
								width: 100%;
								height: 32px;
								cursor: pointer;
								.check {
									width: 100%;
									padding-right: 10px;
									display: flex;
									justify-content: space-between;
									align-items: center;
									color: #077ce5;
								}
							}
						}
					}
				}
				li:hover {
					background: #F7F7F7;
				}
			}
			.block {
				width: 100%;
				margin-top: 20px;
				justify-content: center;
				text-align: center;
			}
		}
	}

	.memberListBox {
		height: 300px;
		overflow: auto;
		.memberList {
			img {
				width: 30px;
				height: 30px;
				border-radius: 30px;
			}
			li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 40px;

			}
			li>div:nth-child(1) {
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					margin-right: 10px;
				}
			}
		}
	}

	.memberListBox::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.memberListBox::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.memberListBox::-webkit-scrollbar-thumb {
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}

	.addBtn {
		margin-right: 4px;
	}

	.inviteTitle {
		margin-top: 10px;
	}

	.blue {
		color: #1885e9 !important;
	}

	.owner {
		color: black !important;
	}
    .img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #ffae44;
        margin-right: 10px;
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
