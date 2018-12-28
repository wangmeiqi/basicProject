<template>
	<div class="reportBox clearfix">
		<el-container>
			<el-aside>
				<div class="project_listBOx">
					<div class="titleBox">
						<p>项目列表</p>
						<span class="iconfont icon-add-copy-copy" @click="addProject"></span>
					</div>
					<ul>
						<li @click="listActive(index)" :class="activeItem == index ? 'active' : ''" v-for="(val,index) in projectList">
							<span class="iconfont icon-guanbi1 dels" @click="thisListDel(index)"></span>
							<span class="avatar" v-if="val.image!=''" :style="{backgroundImage: 'url(' + val.image + ')'}"></span>
							<span class="avatar" v-else></span>
							<div class="content">{{val.name}}</div>
						</li>
					</ul>
				</div>
			</el-aside>
			<el-main>
				<div class="project_viewBox">
					<!--全部任务概览-->
					<ALLTASK></ALLTASK>
					<!--本周已完成-->
					<COMPLETED></COMPLETED>
					<!--接下来的任务-->
					<NEXTTASK></NEXTTASK>
					<!--项目成员反馈列表-->
					<COMMENTLIST :proId='proIds'></COMMENTLIST>
					<!--项目成员反馈输入框-->
					<COMMENT @sendComment="commentfun" v-if="projectList.length != 0"></COMMENT>
				</div>
			</el-main>
		</el-container>

		<!--项目列表添加弹框组件-->
		<ADDPROJECT :isShow='addFlag'></ADDPROJECT>
	</div>
</template>

<script>
	import API from 'api/http'
	import Bus from 'assets/js/Bus.js'
	import ADDPROJECT from 'components/report/addProject' //添加项目弹框
	import ALLTASK from 'components/report/allTask'			//全部任务概览模块
	import COMPLETED from 'components/report/completed' //本周已完成模块
	import NEXTTASK from 'components/report/nextTask' //接下来的任务
	import COMMENTLIST from 'components/report/commentList'//评论列表
	import COMMENT from 'components/comment'			//评论输入框

	export default {
		name: 'reportBox',
		components: {
			ADDPROJECT,
			ALLTASK,
			COMPLETED,
			NEXTTASK,
			COMMENT,
			COMMENTLIST
		},
		data() {
			return {
				proIds:0,//任务默认id
				addFlag: false,//左侧项目添加弹框显示隐藏
				activeItem: 0, //控制左侧列表选中状态
				projectList: []
			}
		},
		methods: {
			//添加项目
			addProject() {
				this.addFlag = !this.addFlag;
			},
			//左侧列表切换选中事件
			listActive: function(index) { //当点击时候点亮，同级的li标签删除Class
				this.activeItem = index;
				//全部任务概括
				this.allTaskFun(this.projectList[index].id)
				//本周已完成
				this.taskCompSevenFun(this.projectList[index].id)
				//接下来的任务模块
				this.nextTaskFun(this.projectList[index].id)
				//项目成员反馈列表
				this.commentListFun(this.projectList[index].id)
				//alert(111)  这里和右侧概括联动...
				
				//项目权限设置
				API.get('/projectPermission/queryProjectPermission', {
					projectId: this.projectList[index].id
				}).then(res => {
	//				console.log('=================================',res.data.data)
					sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
					Bus.$emit('toQueryProjectPermission', res.data.data)
				})
				
				
			},
			//移除左侧列表当前数据
			thisListDel: function(index) {
				let names = this.projectList[index].name;

				API.get('/Report/delReportPros', {
					proid: this.projectList[index].id
				}).then(res => {

					//所有项目参与的任务
					API.get('/Report/findProjects', {
						eid: sessionStorage.getItem('enterpriseId'), //企业ID
						proname: null //项目名默认查询所有
					}).then(res => {
						for(var i = 0; i < res.data.data.length; i++) {
							if(res.data.data[i].name == names) {
								console.log(res.data.data[i].name, 'lplplplplp', names)
								res.data.data[i].flag = false;
								Bus.$emit('toAll', res.data.data)
								//console.log('全部项目333',res.data.data)
							}
						}

					})

					this.projectList.splice(index, 1); //移除数据
					res.data.data.splice(index, 1);
//					console.log('左侧列表移除后剩余项目', res.data.data);
				})
			},
			//当前左侧列表选中的id
			poridFun(proid){
				Bus.$emit('toAllId', proid)
			},
			//右侧全部任务概览
			allTaskFun(proid) {
				API.get('/Report/showTasks', {
					proid: proid
				}).then(res => {
//					console.log('右侧第一个', res.data.data)
					Bus.$emit('onallTaskBox', res.data.data)
					this.poridFun(proid)
					//this.allTasksList = res.data.data
				})
			},
			//本周已完成模块
			taskCompSevenFun(proid) {
				API.get('/Report/taskCompSeven', {
					proid: proid
				}).then(res => {
					console.log('右侧第2个', res.data.data)
					//this.allTasksList = res.data.data
					Bus.$emit('ontaskCompSevenBox', res.data.data)
					this.poridFun(proid)
				})
			},
			//接下来的任务模块
			nextTaskFun(proid) {
				API.get('/Report/taskNexts', {
					proid: proid
				}).then(res => {
//					console.log('右侧第3个', res.data.data)
					//this.allTasksList = res.data.data
					Bus.$emit('onnextTaskBox', res.data.data)
					this.poridFun(proid)
				})
			},
			//项目成员反馈列表
			commentListFun(msg){
				this.proIds = msg
				
//				console.log('项目成员反馈列表msg',msg)
			},
			//评论区域信息发布
			commentfun(data){
				console.log('datadatadatadatadatadatadatadata',data)
				API.get('/Report/addComment', {
					taskId: this.projectList[this.activeItem].id,
					content:data,
					type:3
				}).then(res => {
//					console.log('那叫你哦按哦啊脑',res.data.data)
					API.get('/Report/findProComment', {
						proId: this.projectList[this.activeItem].id
					}).then(res => {
						Bus.$emit('oncommentfun', res.data.data)
					})
//					this.commentListFun(this.projectList[this.activeItem].id)
				})
			}
		},
		created() {
			//左侧项目列表
			API.get('/Report/findReportPros', {
				eid: sessionStorage.getItem('enterpriseId')
			}).then(res => {
				console.log('左侧列表项目', res.data.data)
				this.projectList = res.data.data
				if(this.projectList.length == 0){
					return false
				}
				//右侧全部任务概览
				this.allTaskFun(this.projectList[0].id)
				//本周已完成模块
				this.taskCompSevenFun(this.projectList[0].id)
				//接下来的任务模块
				this.nextTaskFun(this.projectList[0].id)
				//项目成员反馈列表
				this.commentListFun(this.projectList[0].id)
				
				//项目权限设置
				API.get('/projectPermission/queryProjectPermission', {
					projectId: this.projectList[0].id
				}).then(res => {
	//				console.log('=================================',res.data.data)
					sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
					Bus.$emit('toQueryProjectPermission', res.data.data)
				})
				
			})
			
			

			//接收组件通信信息
			Bus.$on('onlists', (msg) => {
				this.projectList = msg
			});
			
		}
	}
</script>

<style lang="scss" scoped>
	.reportBox {
		margin-top: 10px;
		margin-left: 30px;
		height: 78vh;
		.project_listBOx {
			border-radius: 5px;
			width: 286px;
			background: #f7f7f7;
			padding-bottom: 10px;
			.titleBox {
				height: 20px;
				padding: 16px;
				line-height: 20px;
				display: flex;
				p {
					flex: auto;
					color: #808080;
					font-size: 14px;
				}
				span {
					flex: none;
					color: #1885e9;
					cursor: pointer;
				}
			}
			ul li {
				padding: 0 16px;
				height: 40px;
				display: flex;
				align-items: center;
				cursor: pointer;
				position: relative;
				span.dels {
					position: absolute;
					width: 10px;
					height: 10px;
					top: 14px;
					left: 3px;
					display: none;
					font-size: 12px;
					text-align: center;
					line-height: 10px;
				}
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
			}
			ul li:hover {
				background: #e5e5e5;
				span.dels {
					display: block;
				}
			}
			ul li.active {
				background: #e5e5e5;
			}
		}
		.el-main {
			padding: 0;
			margin-left: 10px;
		}
		.project_viewBox {
			width: 100%;
		}
	}
</style>