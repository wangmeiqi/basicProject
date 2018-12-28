<template>
	<div class="addprojectBox">
		<el-dialog :append-to-body="true" title="添加项目" :visible.sync="addprojectInfoVisible" width="600px" center class="fieldBox" @close="closeDialog()">
			<div class="dialog_body">
				<div class="seachBox">
					<span class="icons el-icon-search"></span>
					<input type="text" name="" id="" value="" v-model="inputText" placeholder="搜索项目" />
				</div>
				<div class="project_listBOx">
					<!--<div class="listBox">
						<div class="titleBox">
							<p>星标项目</p>
						</div>
						<ul v-for="(val,index) in projectList">
							<li>
								<span class="avatar" style="background-image: url('http://keyprojecttb.hnatech.com/api/images/covers/cover-media.jpg');"></span>
								<div class="content">{{val.account}}</div>
								<a class="handler-btn add-handler">添加</a>
							</li>
							<li>
								<span class="avatar" style="background-image: url('http://keyprojecttb.hnatech.com/api/images/covers/cover-media.jpg');"></span>
								<div class="content">11111111</div>
								<a class="handler-btn added-handler">
									<span class="text-added">已添加</span>
									<span class="text-remove">取消</span>
								</a>
							</li>
						</ul>
					</div>-->
					<div class="listBox">
						<div class="titleBox">
							<p>参与的任务</p>
						</div>
						<ul>
							<li v-for="(val,index) in projectList">
								<span class="avatar" v-if="val.image!=''" :style="{backgroundImage: 'url(' + val.image + ')'}"></span>
								<span class="avatar" v-else></span>
								<div class="content">{{val.name}}</div>
								<a class="handler-btn add-handler" @click="addHandler(index)" v-if="val.flag == false">添加</a>
								<a class="handler-btn added-handler" @click="addedHandler(index)" v-else>
									<span class="text-added">已添加</span>
									<span class="text-remove">取消</span>
								</a>
							</li>
							<!--<li>
								<span class="avatar" style="background-image: url('http://keyprojecttb.hnatech.com/api/images/covers/cover-media.jpg');"></span>
								<div class="content">11111111</div>
								<a class="handler-btn added-handler">
									<span class="text-added">已添加</span>
									<span class="text-remove">取消</span>
								</a>
							</li>-->
						</ul>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import API from 'api/http'
	import Bus from 'assets/js/Bus.js'

	export default {
		name: 'addprojectBox',
		props: { //父子组件传值
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 查看企业所有项目权限
				lookAllProject: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[6].status,

				projectList: [], //列表内容信息
				inputText: '', //输入框默认内容
				addprojectInfoVisible: false //默认显示弹框标识
			}
		},
		methods: {
			//控制弹框显示隐藏事件
			addprojectInfoFun() {
				this.addprojectInfoVisible = true;
			},
			//关闭弹框处理数据
			closeDialog() {
				//alert(1)
			},
			//处理input  模糊查询事件
			fuzzySearch() {
				//列表内容
				API.get('/Report/findProjects', {
					sign: this.lookAllProject, //查询所有项目and 查询相关项目
					eid: sessionStorage.getItem('enterpriseId'), //企业ID
					proname: this.inputText //项目名
				}).then(res => {
					//					console.log(res.data.data)
					this.projectList = res.data.data
				})
			},
			//添加当前任务
			addHandler(index) {
				//添加
				API.get('/Report/addReportPros', {
					eid: sessionStorage.getItem('enterpriseId'), //企业ID
					proid: this.projectList[index].id //项目ID
				}).then(res => {
					if(res.data.message == 'SUCCESS') {
						this.projectList[index].flag = true;
						API.get('/Report/findReportPros', {
							eid: sessionStorage.getItem('enterpriseId')
						}).then(res => {
							//bus组件之间通信
							Bus.$emit('onlists', res.data.data)
							console.log('点击添加项目', res.data.data)
						})
					}
				})

			},
			//取消当前任务
			addedHandler(index) {
				//取消
				API.get('/Report/delReportPros', {
					proid: this.projectList[index].id //项目ID
				}).then(res => {
					if(res.data.message == 'SUCCESS') {
						this.projectList[index].flag = false;
						API.get('/Report/findReportPros', {
							eid: sessionStorage.getItem('enterpriseId')
						}).then(res => {
							//bus组件之间通信
							Bus.$emit('onlists', res.data.data)
							console.log('点击取消项目', res.data.data)
						})
					}
				})
			}
		},
		created() {
			//所有项目参与的任务
			API.get('/Report/findProjects', {
				sign: this.lookAllProject, //查询所有项目and 查询相关项目
				eid: sessionStorage.getItem('enterpriseId'), //企业ID
				proname: null //项目名默认查询所有
			}).then(res => {
				console.log('全部项目', res.data.data)
				this.projectList = res.data.data
			})

			//接收组件通信信息
			Bus.$on('toAll', (msg) => {
				this.projectList = msg
				console.log('全部项目2', this.projectList)
			});
			//接收组件通信信息
			Bus.$on('toCurrentRolePermissions', (msg) => {
				this.lookAllProject = msg.enterprisePermissionList[6].status
			});
		},
		watch: { //监听事件
			isShow() { //是否显示弹框
				this.addprojectInfoFun()
			},
			inputText() { //input 内容发生改变
				//				console.log(this.inputText)
				this.fuzzySearch()
			}
		}

	}
</script>

<style lang="scss" scoped="scoped">
	.dialog_body {
		/*border-top: 1px solid #E5E5E5;*/
		.seachBox {
			border: 1px solid #ccc;
			height: 40px;
			border-radius: 3px;
			padding-left: 40px;
			position: relative;
			span.icons {
				width: 40px;
				height: 40px;
				position: absolute;
				top: 0;
				left: 0;
				display: block;
				text-align: center;
				font-size: 18px;
				line-height: 40px;
			}
			input {
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				color: #666;
			}
		}
		.project_listBOx {
			width: 100%;
			height: 340px;
			padding-bottom: 10px;
			overflow-y: auto;
			.titleBox {
				height: 30px;
				padding-top: 20px;
				line-height: 30px;
				display: flex;
				p {
					flex: auto;
					color: #666;
					font-size: 14px;
				}
				span {
					flex: none;
					color: #1885e9;
					cursor: pointer;
				}
			}
			ul li {
				height: 40px;
				display: flex;
				align-items: center;
				cursor: pointer;
				span.avatar {
					width: 24px;
					height: 24px;
					margin-right: 10px;
					flex: none;
					background: url('../../assets/images/22登录_01.png') no-repeat center center;
					background-size: 24px 24px;
				}
				div.content {
					width: 220px;
					height: 24px;
					line-height: 24px;
					flex: auto;
				}
				a.handler-btn {
					display: inline-block;
					height: 24px;
					padding: 0 10px;
					font-size: 14px;
					line-height: 22px;
					border: 1px solid #3da8f5;
					border-radius: 3px;
					color: #3da8f5;
				}
				a.handler-btn.added-handler {
					color: #808080;
					border: 1px solid #d9d9d9;
					.text-added {
						color: #808080;
					}
					.text-remove {
						display: none;
					}
				}
				a.handler-btn.added-handler:hover {
					border: 1px solid #3da8f5;
					.text-added {
						display: none;
					}
					.text-remove {
						display: block;
						color: #3da8f5;
					}
				}
			}
			ul li:hover {
				background: #f7f7f7;
				span.dels {
					display: block;
				}
			}
			ul li.active {
				background: #f7f7f7;
			}
		}
	}
</style>