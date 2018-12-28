<template>
	<div class="taskEditBackGround">
		<div class="taskEditBox" :style="styles" @click.stop="closeAllBox">
			<div class="taskTitle common">
				<div class="taskTitleName">
					<span style="cursor: pointer;" @click.stop="tId = fatherId==0?tId:fatherId;recordDefault=!recordDefault">{{taskMessage.countName}}</span>
				</div>
				<div>
					<i @click.stop="pullDownList($event)" class="iconfont icon-xiala"></i>
					<i @click.stop="$emit('close')" class="iconfont icon-guanbi"></i>
				</div>
			</div>
			<div class="taskName common">
				<el-tooltip class="item" effect="dark" content="改变任务状态" placement="top">
					<i v-show="taskMessage.task.state==0" @click.stop="changeTaskState(taskMessage,taskMessage.task.state)" class="iconfont icon-xuanzekuang"></i>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="改变任务状态" placement="top">
					<i v-show="taskMessage.task.state==1" @click.stop="changeTaskState(taskMessage,taskMessage.task.state)" class="iconfont icon-renwuwancheng"></i>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="点击可编辑" placement="top">
					<input class="name" type="text" v-model="taskName" @blur="updataTaskName" />
				</el-tooltip>
			</div>
			<div class="taskmsg common">
				<img v-if="taskMessage.task.user.user_img!=''" class="img" :src="taskMessage.task.user.user_img" />
				<div v-if="taskMessage.task.user.user_img=='' && taskMessage.task.user.username!=''" class="img">{{taskMessage.task.user.username[0]}}</div>
				<div v-if="taskMessage.task.user.user_img=='' && taskMessage.task.user.username==''" class="img"><i class="iconfont icon-wode"></i></div>
				<div class="name" style="position: relative;">
					<span @click.stop="radioMember = !radioMember">{{taskMessage.task.user.username?taskMessage.task.user.username:'待认领'}}</span>
					<memberlist type="radio" style="position: absolute;top: 30px;" :ids="radioIds" :show="radioMember" :taskId="tId" @send="getRadioList" @colse="radioMember=false"></memberlist>
				</div>

				<div class="noneBorder">
					<el-date-picker :editable="editable" @change="updTaskTime" v-model="taskTime" type="daterange" range-separator="-" start-placeholder="设置开始时间" end-placeholder="设置结束时间">
					</el-date-picker>
				</div>
				<!--<div style="position: relative;">
					<el-tooltip class="item" effect="dark" content="点击设置任务重复方式" placement="top">
						<i @click.stop="repModeBol = !repModeBol" class="iconfont icon-xunhuan hand"></i>
					</el-tooltip>

					<repmode :show="repModeBol" :taskId="tId" style="position: absolute"></repmode>
				</div>
				<div style="margin-left: 23px;position: relative;">
					<el-tooltip class="item" effect="dark" content="点击设置任务提醒方式" placement="top">
						<i class="iconfont icon-ai254 hand" @click.stop="remindModeBol=!remindModeBol"></i>
					</el-tooltip>
					<remindmode style="position: absolute" :show="remindModeBol"></remindmode>
				</div>-->
			</div>
			<div class="labeles common">
				<labellist :checkedBol="taskMessage.task.state" :taskId="tId" :labelList="taskMessage.fieldList"></labellist>
			</div>
			<div class="childrenList common">
				<div style="margin-bottom: 10px;">
					<i class="iconfont icon-liebiao1" style="font-size: 18px;"></i>
					<span>子任务 · {{taskMessage.completeSon+'/'+taskMessage.countSonTask}}</span>
				</div>
				<children-task @update="getTaskMsgInfo" :fatherPid='tId' :loadId="taskMessage.task.tid" :closeflag="closeflag" @sendChildrenId="sendChildrenId" :taskList="taskMessage.sonTask" :taskId="tId" :taskStatus='taskMessage.task.state'></children-task>
			</div>
			<div class="relevance common">
				<relevance :relList="taskMessage.relationMap" :taskId="tId" @upDate="update"></relevance>
			</div>
			<div class="fileList common">
				<filelists  @delfile="delFile" :list="taskMessage.tFileList" :taskId="tId" @update="update"></filelists>
			</div>
			<div class="participant common">
				<participant :flag="recordDefault" :principalId="taskMessage.task.user.id" :taskId="tId" :list="taskMessage.task.userList"></participant>
			</div>
			<div class="record">
				<record :flag="recordDefault" @updateComment="updateComment" :commentList="taskMessage.commentList" :taskId="tId"></record>
			</div>
		</div>
		<pulldownlist hide="true" title="任务菜单" :list="pullDownTaskList" :show="pullDownListBol" :styles="pulldownStyles" @close="pullDownListBol=false" @command="executeCommand"></pulldownlist>
	</div>
</template>

<script>
	import API from 'api/http'
	import TIME from 'api/time'
	import pulldownlist from 'components/pulldownList'
	import repmode from 'components/taskEdit/repMode'
	import remindmode from 'components/taskEdit/remindMode'
	import memberlist from 'components/memberList'
	import labellist from 'components/taskEdit/labellist'
	import childrenTask from 'components/taskEdit/childrenTask'
	import relevance from 'components/taskEdit/relevance'
	import filelists from 'components/taskEdit/fileList'
	import participant from 'components/taskEdit/participant'
	import record from 'components/taskEdit/record'
	export default {
		props: {
			styles: { //宽高
				default: 'width:690px;height:550px',
				type: String
			},
			taskId: { //任务id
				default: 85,
				type: Number
			}
		},
		components: {
			relevance,
			pulldownlist,
			repmode,
			remindmode,
			memberlist,
			labellist,
			childrenTask,
			filelists,
			participant,
			record
		},
		filters: {
			str20(val) { //限制字数20
				if(val.length > 20) {
					return val.substr(0, 20);
				} else {
					return val;
				}
			}
		},
		data() {
			return {
				editable:false,
				fatherId:0,//父级任务Id
				recordDefault:false,//默认跳到评论的标识
				closeflag: false, //所有弹窗的关闭flag
				remindModeBol: false, //提醒方式的框显示或隐藏
				repModeBol: false, //重复方式的框显示或隐藏
				taskTime: [], //开始时间与截至时间
				taskName: '', //任务名称
				tId: '', //任务id
				taskMessage: {
					task:{
						state:0,
						user:{
							user_img:'',
							username:'00000'
						}
					}
				}, //任务信息
				pullDownTaskList: [ //任务菜单列表 二维数组
//					[{
//						icon: 'iconfont icon-fuzhi',
//						name: '复制'
//					}, {
//						icon: 'iconfont icon-link',
//						name: '连接'
//					}],
					[
//					{
//						icon: 'iconfont icon-yidong',
//						name: '移动'
//					}, {
//						icon: 'iconfont icon-shoucang',
//						name: '收藏'
//					}, {
//						icon: 'iconfont icon-gongxiangtubiaozhuangtaileicaozuolei22',
//						name: '共享'
//					}, {
//						icon: 'iconfont icon-guidang',
//						name: '归档',
//						can: true
//					},
					{
						icon: 'iconfont icon-shanchu1',
						name: '删除'
					}
					],
				],
				pullDownListBol: false, //是否显示下拉菜单
				pulldownStyles: '', //下拉菜单定位
				radioIds: [], //传给单选的成员列表
				radioMember: false, //是否显示单选的成员列表
			}
		},
		methods: {
			//更新评论
			updateComment(data){
				this.taskMessage.commentList = data
			},
			//更新数据
			update() {
				this.getTaskMsgInfo()
			},
			//删除附件
			delFile(index){
				this.taskMessage.tFileList.splice(index,1);
			},
			//接收子任务id 更新任务编辑面板数据
			sendChildrenId(id) {
				this.tId = id
			},
			//获取负责人修改信息
			getRadioList(data) {
				console.log(data)
				this.taskMessage.task.user.id = data.id
				this.taskMessage.task.user.user_img = data.userImg
				this.taskMessage.task.user.username = data.username
				console.log(this.taskMessage)
				let index = this.taskMessage.task.userList.findIndex((el)=>{
					return el.id == data.id
				})
				if(index > -1){
					this.taskMessage.task.userList.splice(index,1)
				}
				this.taskMessage.task.userList.splice(1,1)
				if(!(data.id)){
					return
				}
				// this.taskMessage.task.userList.unshift({
				// 	user_img:data.userImg,
				// 	id:data.id,
				// 	username:data.username
				// })
			},
			//修改任务名称
			updataTaskName() {
				if(this.taskName == '') {
					this.taskName = this.taskMessage.task.name
					this.$notify({
						title: '警告',
						message: '任务名称不能为空',
						type: 'warning'
					});
				} else if(this.taskName != this.taskMessage.task.name) {
					API.post('/tasks/updTaskName', {
						eid: sessionStorage.getItem("enterpriseId"),
						projectId: sessionStorage.getItem("projectId"),
						taskId: this.tId,
						name: this.taskName
					}).then(res => {
						if(res.data.code == 200) {
							this.$notify({
								title: '成功',
								message: '任务修改成功',
								type: 'success'
							});
						}
					})
				}
			},
			//获取信息
			getTaskMsgInfo() {
				this.taskTime = []
				API.get('/tasks/getOneTask', {
					id: this.tId
				}).then(res => {
//					console.log(res)
					this.radioIds = []
					this.taskMessage = res.data.data
					this.taskName = res.data.data.task.name
					let arr = []
					arr.push(res.data.data.task.startTime)
					arr.push(res.data.data.task.startTime=="null"?"''":res.data.data.task.startTime)
					console.log(arr)
					this.taskTime = arr
					this.radioIds.push(res.data.data.task.user.id)
					this.fatherId = res.data.data.task.pid
					sessionStorage.setItem("projectId",res.data.data.task.proId)
				})
			},
			//显示下拉菜单
			pullDownList(el) {
				console.log(el.clientY)
				this.pullDownListBol = true;
				this.pulldownStyles = 'top:' + (el.clientY + 10) + 'px;left:' + el.clientX + 'px'
			},
			//改变任务状态
			changeTaskState(taskMessage,state) {
				API.get('/tasks/getTaskPid', {
					taskId: this.tId,
					parentId:this.fatherId
				}).then(res => {
					console.log(res)
					if(res.data.data) {
						API.get('/tasks/getTaskContent', {
							eid: sessionStorage.getItem("enterpriseId"),
							projectId: sessionStorage.getItem("projectId"),
							taskId: this.tId,
							stateChange: state==0?1:0
						}).then(res => {
							if(res.data.code == 200) {
								this.taskMessage.task.state = this.taskMessage.task.state == 0 ? 1 : 0
							}
						})
					}
				})
			},
			//返回下拉菜单返回的命令
			executeCommand(val) {
				if(val == '删除') {
					this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						API.post('/tasks/delTask', {
							eid: sessionStorage.getItem("enterpriseId"),
							projectId: sessionStorage.getItem("projectId"),
							taskId: this.tId
						}).then(res => {
							console.log(res)
							this.tId = this.fatherId == 0?this.tId:this.fatherId
							if(this.fatherId == 0){
								this.$emit('close')
							}
							this.pullDownListBol = false
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			},
			//更新任务时间
			updTaskTime(val) {
			  let sTime = '',eTime ='';
			  if(val){
          sTime = TIME.formatting(val[0]);
          eTime = TIME.formatting(val[1]);
        }else{
          sTime = '';
          eTime = '';
        }

				API.post('/tasks/updTaskSETime', {
					eid: sessionStorage.getItem("enterpriseId"),
					projectId: sessionStorage.getItem("projectId"),
					taskId: this.tId,
					startTime: sTime,
					endTime: eTime
				})
			},
			//关闭所有弹窗
			closeAllBox() {
				this.closeflag = !this.closeflag
				this.pullDownListBol = false
				this.repModeBol = false
				this.remindModeBol = false
				this.taskMessage.fieldList.map(el => {
					if(el.id == 5 || el.id == 2 || el.id == 3 || el.type == 2 || el.type == 1) {
						el.hide = false
					}
				})
				this.recordDefault = !this.recordDefault
				this.radioMember = false
			}
		},
		created() {
			this.tId = this.taskId
			this.getTaskMsgInfo()
		},
		watch: {
			taskId() {
				this.tId = this.taskId
			},
			taskName(val, oldVal) {
				if(val.length > 20) {
					this.taskName = oldVal
					this.$notify({
						title: '警告',
						message: '不能超过20字',
						type: 'warning'
					});
				}
			},
			tId(){
				this.getTaskMsgInfo()
			}
		}
	}
</script>

<style scoped>
	.record{
		margin-top: 10px;
	}
	.participant{
		margin-top: 20px;
		border-top: 1px solid #E1E1E1;
	}
	.fileList {
		margin-top: 20px;
		border-top: 1px solid #E1E1E1;
	}
	.modelist {
		position: absolute;
	}

	.modelist li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.taskEditBackGround {
		width: 100vw;
		height: 100vh;
		position: fixed;
		background: rgba(0,0,0,.5);
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.taskEditBox {
		height:600px !important;
		background: white;
		border-radius: 3px;
		position: relative;
		font-size: 12px;
		color: #666666;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.taskEditBox::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.taskEditBox::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.taskEditBox::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}

	.taskTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
	}

	.taskTitle .taskTitleName {
		background: #f2f2f2;
		padding: 5px;
		border-radius: 3px;
		color: #999999;
	}

	.taskTitle>div:nth-child(2) i {
		margin-left: 10px;
		cursor: pointer;
	}

	.taskName {
		margin-top: 30px;
		display: flex;
	}

	.taskName .name {
		font-size: 16px;
		color: #333333;
		padding: 0 2px;
		border-radius: 3px;
		width: 100%;
	}

	.taskName .name:hover {
		background: #F1F1F1;
	}

	.taskName i {
		color: #999999;
		margin-right: 10px;
		cursor: pointer;
	}

	.taskEditBoxFooter {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 140px;
		background: #e5e5e5;
		border-radius: 0 0 3px 3px;
	}

	.taskmsg {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 28px;
	}

	.taskmsg .img {
		width: 30px;
		height: 30px;
		border-radius: 30px;
		background: #ffae44;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		box-shadow: 0 0 10px #E6E6E6;
		margin-right: 10px;
	}

	.taskmsg>.name {
		margin-right: 40px;
		cursor: pointer;
	}

	.taskmsg>.name span:hover {
		color: #077ce7;
	}

	.common {
		padding: 0 20px;
	}

	.hand {
		cursor: pointer;
	}

	.hand:hover {
		color: #077ce7;
	}

	.labeles {
		border-top: 1px solid #E1E1E1;
		margin-top: 12px;
		padding-top: 30px;
		z-index: -10;
	}

	.childrenList {
		border-top: 1px solid #E1E1E1;
		margin-top: 12px;
		padding-top: 30px;
		z-index: -10;
	}

	.relevance {
		border-top: 1px solid #E1E1E1;
		margin-top: 12px;
		padding-top: 30px;
		z-index: -10;
	}
</style>
<style>
	.noneBorder .el-input__inner {
		border: none !important;
		width: 250px;
		display: flex;
	}
</style>
