<template>
	<div class="TMBox">
		<ul class="taskMBox">
			<li v-for="(item,index) in plugTabs">
				<span class="nameBox"><span :class="{btb:tabIndex==index}" @click="skip(index)">{{item.name}}</span><span v-if="index==0" class="task"></span></span>
				<i v-if="index==0" @click.stop="swvih" class="iconfont icon-xiala"></i>
			</li>
		</ul>
		<el-card class="box-card" v-show="taskMBol">
			<div @click.stop="stop">
				<el-input v-model="taskSearch" placeholder="搜索分组"></el-input>
			</div>
			<ul class="taskMList" @click.stop="stop">
				<li v-for="(task,index) in taskList">
					<div class="taskTitle">
						<div @click="vSwitch(index)" class="hand">
							<span style="color: #0a7ee9;font-weight: bold;">{{task.name}}</span>
						</div>
						<div>
							<i @click.stop="designate(index)" class="hand iconfont icon-xialakongjian" style="font-size: 12px;color: #a1a1a1"></i>
						</div>
					</div>
					<div class="plan"></div>
				</li>
			</ul>
			<div></div>
			<div class="addTask" @click.stop="addTaskList = !addTaskList" v-if="newProjectFZFlage">
				<i class="iconfont icon-add" style="color: #0a7ee9;"></i>
				<span style="margin-left: 6px;">添加任务分组</span>
			</div>
			<div v-show="addTaskList" @click.stop="stop">
				<div class="tabCon">
					<div :class="{F7F7F7:newCon}" @click="newCon=true">新建</div>
					<div :class="{F7F7F7:!newCon}" @click="newCon=false">模板</div>
				</div>
				<div v-show="newCon">
					<el-row>
						<el-col :span="24">
							<el-input v-model="newMessage.name" placeholder="任务分组名称"></el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="newMessage.describe">
							</el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-button class="create" @click="create" type="primary">创建</el-button>
						</el-col>
					</el-row>
				</div>
				<div v-show="!newCon">模板</div>
			</div>
			<div class="taskClassify" @click.stop="stop">
				<ul>
					<li v-for="(task,index) in taskGrouping" @click="getMTTaskList(index)">
						<i :class="task.icon"></i> {{task.name}}
					</li>
					<li class="MemberTask" @click="memberTig">
						<i class="iconfont icon-renyuan"></i> 成员的任务 <i class="el-icon-arrow-down" style="font-weight: bold;"></i>
					</li>
				</ul>
			</div>
		</el-card>
		<el-card class="memberList" v-show="memberListBol">
			<div @click.stop="stop">
				<el-input v-model="memberSearch" placeholder="查找成员"></el-input>
			</div>
			<div v-for="o in memberList" class="text item" @click.stop="getMTTaskListTWO(o)">
				<img :src="o.user_img" />{{o.username}}
			</div>
		</el-card>
		<el-card class="redact" v-show="taskMTwoice">
			<div class="redactHead"  @click.stop="stop">
				<div><img v-show="redactHeadTitle != '分组菜单'" style="cursor: pointer;" @click.stop="redactHeadTitle='分组菜单';groupIndex=10" src="../../assets/images/zuojiantou.png" /></div>
				<div>{{redactHeadTitle}}</div>
				<div><i @click.stop="taskMTwoice=false" class="el-icon-close"></i></div>
			</div>
			<ul class="group" v-show="groupIndex==10"  @click.stop="stop">
				<li v-for="(item,index) in group" @click.stop="redactHeadTitle=item.title;groupIndex=index" v-if="item.title == '编辑任务分组'?0 !=bjProjectFzFlage:1">
					<i :class="item.icon" style="margin-right: 6px;"></i>
					<span>{{item.title}}</span>
				</li>
				<li v-for="(item,index) in group" @click.stop="redactHeadTitle=item.title;groupIndex=index" v-else-if="item.title == '移到回收站'?0 !=delProjectFzFlage:1">
					<i :class="item.icon" style="margin-right: 6px;"></i>
					<span>{{item.title}}</span>
				</li>
			</ul>
			<div v-show="groupIndex==0" @click.stop="stop">
				<el-row>
					<el-col :span="24">
						<el-input v-model="compileTask.name" placeholder="请输入内容"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="compileTask.describe">
						</el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-button class="create" @click="save" type="primary">保存</el-button>
					</el-col>
				</el-row>
			</div>
			<div v-show="groupIndex==1"  @click.stop="stop">

			</div>
			<div v-show="groupIndex==2" @click.stop="stop">

			</div>
			<div v-show="groupIndex==3" @click.stop="stop">

			</div>
			<div v-show="groupIndex==4" @click.stop="stop">

			</div>
			<div v-show="groupIndex==5" @click.stop="stop">
				<el-row>
					<el-col :span="24">
						<el-button class="create" @click="del" type="danger">删除</el-button>
					</el-col>
				</el-row>
			</div>
		</el-card>
		<el-dialog :title="taskListTitle" :append-to-body="toBody" :visible.sync="taskListMTBol" width="600px" center>
			<span>
				<ul class="MTTaskList">
					<li v-for="item in MTTaskList">
						<div>
							<!--<div class="checkBox"></div>-->
							<i v-show="item.state == 0" @click="changeTaskState(item.id,item.state)" class="iconfont icon-xuanzekuang checkSize"></i>
							<i v-show="item.state == 1" @click="changeTaskState(item.id,item.state)" class="iconfont icon-renwuwancheng checkSize"></i>
							<img v-if="item.user_img" :src="item.user_img"/>
							<p>{{item.name}}</p>
							<p>{{item.tname}}</p>
						</div>
						<div>
							<div v-if="item.state == 0" class="expirationDate" :class="{expirationDateRED:item.expirationDate==0,expirationDateBLUE:item.expirationDate==1,expirationDateGRAY:item.expirationDate==2}">
								<i class="el-icon-date"></i> {{item.date}} 截止
							</div>
							<div v-else-if="item.state == 1" style="color: gray;">
								{{item.date}} 完成
							</div>
						</div>
					</li>
				</ul>
			</span>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="taskListMTBol = false">取 消</el-button>
			    <el-button type="primary" @click="taskListMTBol = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import API from 'api/http'
	import qwe from '../../assets/images/jiahao.png'
	import { mapGetters, mapMutations } from 'vuex'
	import Bus from 'assets/js/Bus.js'

	export default {
		data() {
			return {
				//创建任务分组权限
				newProjectFZFlage:null,
				//编辑任务分组
				bjProjectFzFlage:null,
				//"删除任务分组"
				delProjectFzFlage:null,

				//路由的index
				tabIndex:0,
				//成员列表
				memberList: [],
				//成员查询框
				memberSearch: '',
				//成员列表
				memberListBol: false,
				//任务列表模态框里的任务列表
				MTTaskList: [],
				toBody: true,
				//任务列表模态框的标题
				taskListTitle: "",
				//任务列表模态框的显隐
				taskListMTBol: false,
				//任务分组列表
				taskGrouping: [{
					icon: "iconfont icon-rili3",
					name: "今天的任务"
				}, {
					icon: "iconfont icon-xuanzekuang",
					name: "未完成的任务"
				}, {
					icon: "iconfont icon-renwuwancheng",
					name: "已完成的任务"
				}, {
					icon: "iconfont icon-ren2",
					name: "待认领的任务"
				}],
				//tabs
				plugTabs: [{
					name:'任务',
					path:'/task'
				},
//				{
//					name:'分享',
//					path:'/share'
//				},
				{
					name:'文件',
					path:'/file'
				},
				{
					name:'日程',
					path:'/schedule'
				},
//				{
//					name:'群聊',
//					path:'/chat'
//				}
				],
				//搜索分组
				taskSearch: '',
				//任务分组卡片BOL
				taskMBol: false,
				//任务二级卡片
				taskMTwoice: false,
				//添加任务分组BOL
				addTaskList: false,
				//新建或者模板BOL
				newCon: true,
				//新建分组的信息
				newMessage: {
					name: '',
					describe: ''
				},
				//任务分组列表
				taskList: [],
				//任务分组列表标题
				redactHeadTitle: '分组菜单',
				//分组菜单
				group: [{
					src: qwe,
					title: '编辑任务分组',
					icon:'iconfont icon-bianji1'
				}, {
					src: qwe,
					title: '设置分组默认任务类型',
					icon:'iconfont icon-shezhi1'
				}, {
					src: qwe,
					title: '保存为任务分组模板',
					icon:'iconfont el-icon-plus'
				}, {
					src: qwe,
					title: '复制任务分组',
					icon:'iconfont icon-fuzhi'
				}, {
					src: qwe,
					title: '移动任务分组',
					icon:'iconfont icon-yidong'
				}, {
					src: qwe,
					title: '移到回收站',
					icon:'iconfont icon-shanchu'
				}],
				//分组菜单的index
				groupIndex: 10,
				//编辑的数据
				compileTask: {
					name: '',
					describe: ''
				},
				//任务分组索引
				taskMListIndex: 0,
				//切换后的任务列表

				week: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],


				//定义任务分类的标识
				taskIndex:0
			}
		},
		methods: {
			//改变任务状态
			changeTaskState(taskId,state){
				API.get('/tasks/getTaskPid',{
					taskId:taskId
				}).then(res => {
					if(res.data.data){
						API.get('/tasks/getTaskContent',{
							eid:sessionStorage.getItem("enterpriseId"),
							projectId:sessionStorage.getItem("projectId"),
							taskId:taskId,
							stateChange:state==0?1:0
						}).then(res => {
							this.getMTTaskList(this.taskIndex)
						})
					}
				})
			},
			stop(){

			},
		  	swvih(){
		        this.taskMBol = !this.taskMBol
		        this.taskMTwoice=false
		        this.SET_TASKTYPE(this.taskMBol)
		    },
			skip(index){
                let eid = this.$route.query.eid; //企业id 和项目id
                let pid = this.$route.query.pid;
				this.tabIndex = index;
				this.$router.push({
					path:this.plugTabs[index].path,
                    query: {
                        eid:eid,
                        pid:pid
                    }
				});
//				if(index == 0){
					//项目权限设置
					API.get('/projectPermission/queryProjectPermission', {
						projectId: sessionStorage.getItem('projectId')
					}).then(res => {
		//				console.log('=================================',res.data.data)
						sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
						Bus.$emit('toQueryProjectPermission', res.data.data)
					})
//				}
			},
			memberTig() {
				this.memberListBol = !this.memberListBol
				if(this.memberListBol) {
					API.get('/projects/getUserByPid', {
						pid: sessionStorage.getItem('projectId')
					}).then(res => {
						// console.log(res.data.data)
						this.memberList = res.data.data
					})
				}
			},
			getMTTaskListTWO(o) {
				this.taskListMTBol = true;
				this.taskListTitle = o.username + "的任务"
				API.post('/task/getMemberTask', {
					proid: sessionStorage.getItem('projectId'),
					impid: o.id
				}).then(res => {
					// console.log(res)
					this.MTTaskList = []
					let now = new Date()
					res.data.data.map(el => {
						let endTime = new Date(el.endTime)
						if(el.endTime < Number(now)) {
							el.expirationDate = 0
							el.date = this.week[endTime.getDay()]
							this.MTTaskList.push(el)
						} else {
							if(el.endTime - Number(now) > 604800000) {
								el.expirationDate = 2
								el.date = (endTime.getMonth() + 1) + '月' + endTime.getDate() + '日'
								this.MTTaskList.push(el)
							} else {
								el.expirationDate = 1
								el.date = this.week[endTime.getDay()]
								this.MTTaskList.push(el)
							}

						}
					})
				})
			},
			//huo
			getMTTaskList(index) {
				this.taskIndex = index
				this.taskListMTBol = true;
				this.taskListTitle = this.taskGrouping[index].name
				if(index == 0) {
					API.post('/task/findTodayTask', {
						proid: sessionStorage.getItem('projectId')
					}).then(res => {
						// console.log(res)
						this.MTTaskList = []
						let now = new Date()
						res.data.data.map(el => {
							let endTime = new Date(el.endTime)
							if(el.endTime < Number(now)) {
								el.expirationDate = 0
								el.date = this.week[endTime.getDay()]
								this.MTTaskList.push(el)
							} else {
								if(el.endTime - Number(now) > 604800000) {
									el.expirationDate = 2
									el.date = (endTime.getMonth() + 1) + '月' + endTime.getDate() + '日'
									this.MTTaskList.push(el)
								} else {
									el.expirationDate = 1
									el.date = this.week[endTime.getDay()]
									this.MTTaskList.push(el)
								}

							}
						})

					})
				} else if(index == 1) {
					API.post('/task/findNotCompleteTask', {
						proid: sessionStorage.getItem('projectId')
					}).then(res => {
						this.MTTaskList = []
						let now = new Date()
						res.data.data.map(el => {
							let endTime = new Date(el.endTime)
							if(el.endTime < Number(now)) {
								el.expirationDate = 0
								el.date = this.week[endTime.getDay()]
								this.MTTaskList.push(el)
							} else {
								if(el.endTime - Number(now) > 604800000) {
									el.expirationDate = 2
									el.date = (endTime.getMonth() + 1) + '月' + endTime.getDate()
									this.MTTaskList.push(el)
								} else {
									el.expirationDate = 1
									el.date = this.week[endTime.getDay()]
									this.MTTaskList.push(el)
								}

							}
						})
					})
				} else if(index == 2) {
					API.post('/task/findCompleteTask', {
						proid: sessionStorage.getItem('projectId')
					}).then(res => {
						this.MTTaskList = []
						let now = new Date()
						res.data.data.map(el => {
							let endTime = new Date(el.realCompletionTime)
							if(el.endTime < Number(now)) {
								el.expirationDate = 0
								el.date = this.week[endTime.getDay()]
								this.MTTaskList.push(el)
							} else {
								if(el.endTime - Number(now) > 604800000) {
									el.expirationDate = 2
									el.date = (endTime.getMonth() + 1) + '月' + endTime.getDate()
									this.MTTaskList.push(el)
								} else {
									el.expirationDate = 1
									el.date = this.week[endTime.getDay()]
									this.MTTaskList.push(el)
								}

							}
						})
					})
				} else if(index == 3) {
					API.post('/task/findNoClaimTask', {
						proid: sessionStorage.getItem('projectId')
					}).then(res => {
						this.MTTaskList = []
						let now = new Date()
						res.data.data.map(el => {
							let endTime = new Date(el.endTime)
							if(el.endTime < Number(now)) {
								el.expirationDate = 0
								el.date = this.week[endTime.getDay()]
								this.MTTaskList.push(el)
							} else {
								if(el.endTime - Number(now) > 604800000) {
									el.expirationDate = 2
									el.date = (endTime.getMonth() + 1) + '月' + endTime.getDate()
									this.MTTaskList.push(el)
								} else {
									el.expirationDate = 1
									el.date = this.week[endTime.getDay()]
									this.MTTaskList.push(el)
								}

							}
						})
					})
				}

			},
			//切换项目
			vSwitch(index) {
				this.taskMBol = !this.taskMBol
				this.plugTabs[0].name = this.taskList[index].name
				let tid = this.taskList[index].id
				let data = {
					tid
				}
				API.get('/task/findTaskByGroupId', data).then(res => {
					this.SET_MYARRAY(res.data.data)
				})
				this.SET_TASKTYPEID(tid)
				sessionStorage.setItem('tid', tid)
			},
			//创建任务分组
			create() {
				API.post('/task/addGroup', {
					project_id: sessionStorage.getItem('projectId'),
					name: this.newMessage.name,
					describes: this.newMessage.describe
				}).then(res => {
					// console.log(res)
					this.newMessage.name = ''
					this.newMessage.describe = ''
					this.addTaskList = false
					this.getTaskList()
				})
			},
			//获取任务分组的列表
			getTaskList(flag) {
				API.get('/task/findGroupTask', {
					projectId: sessionStorage.getItem('projectId')
				}).then(res => {
					this.plugTabs[0].name = res.data.data[0].name
					this.taskList = res.data.data
          if(!flag){
            this.vSwitch(0)
          }
				})
			},

			//编辑任务分组信息
			save() {
				API.post('/task/updateGroup', {
					name: this.compileTask.name,
					describes: this.compileTask.describe,
					id: this.taskList[this.taskMListIndex].id
				}).then(res => {
					this.getTaskList()
				})
			},

			//切换表
			designate(index) {
				this.groupIndex = 10
				this.taskMListIndex = index
				this.compileTask.name = this.taskList[index].name
				this.compileTask.describe = this.taskList[index].describes
				this.taskMTwoice = !this.taskMTwoice
			},
			//删除任务分组
			del() {
				API.post('/task/delGroup', {
					projectId: sessionStorage.getItem("projectId"),
					id: this.taskList[this.taskMListIndex].id
				}).then(res => {
					if(res.data.data == 1){
						this.$notify({
				          	title: '成功',
				          	message: '删除成功',
				          	type: 'success'
        				});
					}else if(res.data.data == 2){
						this.$notify.error({
          					title: '失败',
          					message: '删除失败'
        				});
					}else{
						this.$notify({
          					title: '警告',
          					message: '至少保留一个任务分组',
          					type: 'warning'
        				});
					}
					this.getTaskList()
					this.taskMTwoice = false
				})
			},
			...mapMutations({
				SET_MYARRAY: 'SET_MYARRAY',
				SET_TASKTYPEID: 'SET_TASKTYPEID',
				SET_TASKTYPE:'SET_TASKTYPE'
			})
		},
		computed: {
			...mapGetters({
				GET_MYARRAY: 'GET_MYARRAY',
				getCloseAllFlag: 'GET_COLSEALLFLAG'
      }),
		},
		created() {
            let path = this.$route.path.slice(1,99);
            switch(path){
                case 'task':
                    this.tabIndex = 0;break;
                case 'file':
                    this.tabIndex = 1;break;
                case 'schedule':
                    this.tabIndex = 2;break;
            }
			this.getTaskList(1);

			//接收组件通信信息
			Bus.$on('toQueryProjectPermission', (msg) => {
//				console.log(msg)
				//"创建任务分组"
				this.newProjectFZFlage = msg.projectPermissionList[8].status
				this.bjProjectFzFlage = msg.projectPermissionList[9].status
				this.delProjectFzFlage = msg.projectPermissionList[10].status
			});

		},
		watch:{
			getCloseAllFlag(){
				this.taskMBol = false
				this.taskMTwoice = false
				this.memberListBol = false
			}
		}
	}
</script>

<style scoped>
	.TMBox {
		position: relative;
	}

	.taskMBox {
		display: flex;
		justify-content: center;
	}

	.taskMBox>li {
		cursor: pointer;
		margin-right: 48px;
		padding-bottom: 28px;
		line-height: 28px;
	}

	.taskMBox .task {
		display: inline-block;
		height: 11px;
		padding-right: 10px;
		margin-right: 10px;
		border-right: 1px solid #999999;
	}

	.taskMBox img {
		cursor: pointer;
	}

	.box-card {
		position: absolute;
		left: -30px;
		top: 60px;
		width: 300px;
		height: 400px;
		overflow: auto;
	}

	.box-card::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.box-card::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.box-card::-webkit-scrollbar-thumb {
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}

	.taskMList>li {
		height: 65px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.taskMList .taskTitle {
		display: flex;
		justify-content: space-between;
	}

	.TMBox.taskMList .taskTitle span {
		font-size: 12px;
		padding-left: 5px;
		color: #a0a0a0;
	}

	.TMBox .taskMList .plan {
		width: 100%;
		height: 2px;
		background: red;
		margin-top: 10px;
	}

	.TMBox .addTask {
		display: flex;
		height: 50px;
		align-items: center;
		cursor: pointer;
	}

	.addTask img {
		width: 20px;
		margin-right: 10px;
	}

	.tabCon {
		display: flex;
	}

	.TMBox .tabCon>div {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 36px;
		cursor: pointer;
	}

	.TMBox .el-row {
		margin-bottom: 10px;
	}

	.TMBox .create {
		width: 100%;
	}

	.F7F7F7 {
		color: #0a7ee9;
	}

	.redact {
		z-index: 10;
		position: absolute;
		top: 100px;
		left: 280px;
		width: 260px;
	}

	.redact .redactHead {
		display: flex;
		justify-content: space-between;
		height: 30px;
		border-bottom: 2px solid #F0F0F3;
		font-size: 14px;
		color: #333333;
	}

	.TMBox .group li {
		line-height: 30px;
		cursor: pointer;
		font-size: 12px;
	}

	.TMBox .group li:hover {
		background: #F7F7F7;
	}

	.TMBox .group li img {
		margin-right: 10px;
	}

	.taskClassify {
		padding: 10px 0;
		border-bottom: 1px solid #E7E7E7;
		border-top: 1px solid #E7E7E7;
	}

	.taskClassify ul li {
		line-height: 40px;
		cursor: pointer;
		color: gray;
		font-size: 14px;
	}

	.MTTaskList {
		border-top: 1px solid #E7E7E7;
	}

	.MTTaskList .expirationDate {
		color: white;
		padding: 0 6px;
		font-size: 14px;
	}

	.expirationDateRED {
		background: #ff4f3e;
	}

	.expirationDateBLUE {
		background: #3da8f5;
	}

	.expirationDateGRAY {
		background: #e1e1e1;
	}
	.MTTaskList{
		height: 40vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.MTTaskList::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.MTTaskList::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.MTTaskList::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}
	.MTTaskList li {
		border-bottom: 1px solid #E7E7E7;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
	}

	.MTTaskList li>div {
		display: flex;
		justify-content: flex-start;
		color: gray;
	}

	.MTTaskList li img {
		width: 24px;
		height: 24px;
		border-radius: 50px;
		margin-right: 10px;
	}

	.MTTaskList li p {
		margin-right: 10px;
		color: gray;
	}

	.checkBox {
		width: 20px;
		height: 20px;
		outline: none;
		border: 2px solid #a6a6a6;
		border-radius: 3px;
		cursor: pointer;
		margin-right: 10px;
	}

	.checkBox:hover {
		border: 2px solid gray;
	}

	.MemberTask {
		position: relative;
	}

	.memberList {
		position: absolute;
		top: 440px;
		left: 80px;
		width: 200px;
		height: 140px;
		overflow: auto;
	}

	.memberList img {
		width: 24px;
		height: 24px;
		border-radius: 50px;
		margin-right: 10px;
	}

	.memberList>div div {
		display: flex;
		color: gray;
		padding: 2px 0;
	}

	.memberList::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.memberList::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.memberList::-webkit-scrollbar-thumb {
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}


	.btb{
		padding-bottom: 22px;
		border-bottom: 2px solid #0b7ee9;
	}

	.hand{
		cursor: pointer;
	}

	.checkSize{
		font-size: 20px;
		margin-right: 10px;
	}
</style>

