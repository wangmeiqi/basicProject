<template>
	<div>
		<ul>
			<li v-for="(item,index) in taskList">
				<el-tooltip class="item" effect="dark" content="改变任务状态" placement="top">
				    <i v-show="item.state==0" @click="changeTaskState(taskList,index)" class="iconfont icon-xuanzekuang hand"></i>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="改变任务状态" placement="top">
					<i v-show="item.state==1" @click="changeTaskState(taskList,index)" class="iconfont icon-renwuwancheng hand"></i>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="点击可编辑" placement="top">
				    <input class="name" maxlength="20" type="text" v-model="item.name" @blur="updataTaskName(item.name,index)"/>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="截止日期" placement="top">
					<i v-show="item.endTime==null" @click="item.endTime='1111-11-11 11:11:11'" class="iconfont icon-rili1 hand" style="font-size: 20px;"></i>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="截止日期" placement="top">
					<span v-show="item.endTime!=null" @click="taskIndex=index">
						<datetem :defTime="item.endTime==null?null:formatTime(item.endTime)" @getIndex="taskIndex=index" @send="updateTime"></datetem>
					</span>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" :content="item.user.username" placement="top">
					<img v-if="item.user.user_img!=''" @click.stop="memberPositions(index,$event)" :src="item.user.user_img"/>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" :content="item.user.username" placement="top">
					<div @click.stop="memberPositions(index,$event)" class="img" v-if="item.user.user_img=='' && item.user.username!=''">{{item.user.username[0]}}</div>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="待认领" placement="top">
					<div @click.stop="memberPositions(index,$event)" class="img" style="width: 24px;" v-if="item.user.user_img=='' && item.user.username==''"><i class="iconfont icon-wode" style="color: white;margin-left: 10px;"></i></div>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="进入详情" placement="top">
					<i @click="$emit('sendChildrenId',item.id)" class="iconfont icon-jiantou hand"></i>
				</el-tooltip>
			</li>
		</ul>
		<div class="addChildrenTask" v-show="!addChildrenTask && taskStatus==0" @click="addChildrenTask=true">
			<i class="iconfont icon-tianjia"></i>
			<span>添加子任务</span>
		</div>
		<div class="addChildrenTask1" v-show="addChildrenTask">
			<i class="iconfont icon-tianjia2"></i>
			<el-input size="small" v-model="addTaskName" maxlength="20" placeholder="请输入内容"></el-input>
			<el-tooltip class="item" effect="dark" content="截止日期" placement="top">
				<i v-if="!dataBol" @click="dataBol=true" class="iconfont icon-rili1 hand" style="font-size: 20px;margin-left: 20px;"></i>
			</el-tooltip>
			<el-tooltip v-if="dataBol" class="item" effect="dark" content="截止日期" placement="top">
				<datetem style="margin-left: 10px" @send="getAddTaskTime"></datetem>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="执行人" placement="top">
				<img @click.stop="memberPositions(-4,$event)" v-if="addUserMsg.user_img!=''" :src="addUserMsg.user_img"/>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="执行人" placement="top">
				<div @click.stop="memberPositions(-4,$event)" class="img" v-if="addUserMsg.user_img=='' && addUserMsg.username!=''">
					{{addUserMsg.username[0]}}
				</div>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="执行人" placement="top">
				<div @click.stop="memberPositions(-4,$event)" class="img" style="width: 24px;" v-if="addUserMsg.user_img=='' && addUserMsg.username==''">
					<i style="color: white;margin-left: 15px;font-style: normal;">{{userImg}}</i>
				</div>
			</el-tooltip>
		</div>
		<div class="addChildrenTask1" style="justify-content: space-between;" v-show="addChildrenTask">
			<div>
				<tasktype @sendId="sendId"></tasktype>
			</div>
			<div>
				<el-button size="mini" @click="clearAddMsg">取消</el-button>
				<el-button size="mini" @click="addTask" type="primary">保存</el-button>
			</div>
		</div>
		<memberlist @send="changeMember" :type="radio" :show="hide" :ids="ids" :taskId="id" :styles="styles"></memberlist>
	</div>
</template>

<script>
	import API from 'api/http'
	import datetem from 'components/dateTem'
	import memberlist from 'components/memberList'
	import TIME from 'api/time'
	import tasktype from 'components/taskEdit/taskType'
	export default {
		props:{
			taskList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			taskId:{
				default: 0
			},
			closeflag:{
				type:Boolean,
				default:false
			},
			loadId:{
				default:0
			},
			taskStatus:{
				default:0
			},
			fatherPid:{
				default:0
			}
		},
		components:{
			datetem,
			memberlist,
			tasktype
		},
		data(){
			return {
				hide:false,
				styles:'',
				taskIndex:0,
				ids:[],
				id:0,
				addChildrenTask:false,
				addTaskName:'',
				addUserMsg:{
					id:0,
					username:JSON.parse(sessionStorage.getItem('userMessage')).account,
					user_img:JSON.parse(sessionStorage.getItem('userMessage')).user_img
				},
				dataBol:false,
				taskTypeId:0,
				addEndTime:null,
				userImg:''
			}
		},
		methods:{
			//清空添加的信息
			clearAddMsg(){
				this.addChildrenTask=false;
				this.dataBol=false;
				this.addTaskName='';
				this.addUserMsg={id:0,username:'',user_img:''}
			},
			//获取新增子任务的截止时间
			getAddTaskTime(time){
				this.addEndTime = time
			},
			//添加子任务
			addTask(){
				if(this.addTaskName != ''){
					API.post('/tasks/addSubtasks',{
						pid:this.taskId,
						proId:sessionStorage.getItem("projectId"),
						taskType:this.taskTypeId,
						endTime:this.addEndTime,
						implementPeopleId:this.addUserMsg.id,
						tid: this.loadId,
						name:this.addTaskName
					}).then(res => {
						this.$emit('update')
						this.clearAddMsg()
					})
				}
			},
			//接受子组件传过来的任务类型Id
			sendId(id){
				this.taskTypeId = id
			},
			//更新时间
			updateTime(data){
				API.post('/tasks/updTaskSETime',{
					eid: sessionStorage.getItem("enterpriseId"),
					projectId: sessionStorage.getItem("projectId"),
					taskId:this.taskList[this.taskIndex].id,
					startTime:TIME.formatting(this.taskList[this.taskIndex].createTime),
					endTime:data
				})
			},
			changeMember(obj){
				console.log(obj)
				if(this.taskIndex == -4){
					this.addUserMsg.username = obj.username
					this.addUserMsg.id = obj.id
					this.addUserMsg.user_img = obj.userImg
				}else{
					this.taskList[this.taskIndex].user.username = obj.username
					this.taskList[this.taskIndex].user.id = obj.id
					this.taskList[this.taskIndex].user.user_img = obj.userImg
				}

			},
			memberPositions(index,el){
			  //alert(index)
				if(index == -4){
					this.taskIndex = index
					this.hide = true
					this.styles = 'top:' + (el.clientY+20) + 'px;left:' + el.clientX + 'px'
					this.ids = []
					this.ids.push(this.addUserMsg.id)
					this.id = NaN
				}else{
					this.taskIndex = index
					this.hide = true
					this.styles = 'top:' + (el.clientY+20) + 'px;left:' + el.clientX + 'px'
					this.ids = []
					this.ids.push(this.taskList[index].user.id)
					this.id = this.taskList[index].id
				}

			},
			formatTime(time){
				return TIME.formatting(time);
			},
			//修改子任务状态
			changeTaskState(taskList,index){
				console.log(taskList)
				API.get('/tasks/getTaskPid',{
					taskId:this.taskList[index].id,
					parentId:this.fatherPid
				}).then(res => {
					if(res.data.data){
						API.get('/tasks/getTaskContent',{
							taskId:this.taskList[index].id,
							stateChange:this.taskList[index].state==0?1:0
						}).then(res => {
							this.taskList[index].state=this.taskList[index].state==0?1:0
						})
					}else{
						this.$notify({
          					title: '警告',
          					message: '子任务未全部完成或父任务已完成',
          					type: 'warning'
       					});
					}
				})
			},
			//修改任务名称
			updataTaskName(name,index){
				if(name == ''){
					this.taskList[index].name = this.taskList[index].taskName
					this.$notify({
			          	title: '警告',
			          	message: '任务名称不能为空',
			          	type: 'warning'
			        });
				}else if(this.taskList[index].name != this.taskList[index].taskName){
					API.post('/tasks/updTaskName', {
						eid: sessionStorage.getItem("enterpriseId"),
						projectId: sessionStorage.getItem("projectId"),
						taskId:this.taskList[index].id,
						name:name
					}).then(res => {
						if(res.data.code == 200){
							this.$notify({
					          	title: '成功',
					          	message: '任务修改成功',
					          	type: 'success'
					        });
						}
					})
				}
			}
		},
		created(){
			this.taskList.map(el => {
				this.$set(el,'taskName',el.name)
				this.$set(el,'ids',[el.user.id])
			})
			console.log(this.taskList)
			this.userImg =JSON.parse(sessionStorage.getItem('userMessage')).account.substring(0,1)
			console.log(this.userImg)
		},
		watch:{
			taskList(){
				this.taskList.map(el => {
					this.$set(el,'taskName',el.name)
					this.$set(el,'ids',[el.user.id])
				})
			},
			closeflag(){
				this.hide = false
			}
		}
	}
</script>

<style scoped>
	.addChildrenTask1{
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;
		margin-top: 10px;
	}
	.addChildrenTask1 img{
		width: 24px;
		height: 24px;
		border-radius: 100%;
		background: #999999;
		margin-right: 10px;
	}
	.addChildrenTask1 .img{
		width: 30px;
		height: 24px;
		border-radius: 100%;
		background: #ffae44;
		margin-right: 10px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.addChildrenTask1 i{
		color: #999999;
		margin-right: 16px;
	}
	.addChildrenTask{
		margin-top: 10px;
		color: #2c86ff;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;
	}
	.addChildrenTask i{
		margin-right: 4px;
		margin-top: 2px;
	}
	li{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	li i{
		color: #999999;
		margin-right: 10px;
		font-size: 18px;
	}
	li .name{
		font-size: 14px;
		color: #333333;
		padding: 0 2px;
		border-radius: 3px;
		width: 100%;
		margin-right: 10px;
	}
	li .name:hover{
		background: #F1F1F1;
	}
	li img{
		width: 24px;
		height: 24px;
		border-radius: 100%;
		background: #999999;
		margin-right: 10px;
	}
	li .img{
		width: 40px;
		height: 24px;
		border-radius: 100%;
		background: #ffae44;
		margin-right: 10px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.hand{
		cursor: pointer;
	}
</style>
