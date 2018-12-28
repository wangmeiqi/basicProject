<template>
	<div>
		<div v-show="show" class="bg" @click="$emit('close')">
			<div class="addTaskBox" @click.stop="closeAll">
				<div class="header">
					<div>
						<span>创建新任务至</span>
						<span class="selet_address" @click.stop="tig($event)">
							<span>{{positionName}}</span>
							<i v-show="!select_address_bol" class="iconfont icon-jiantoux"></i>
							<i v-show="select_address_bol" class="iconfont icon-jiantous"></i>
						</span>
					</div>
					<div>
						<i class="iconfont icon-guanbi" style="cursor: pointer;font-size: 20px;" @click="$emit('close')"></i>
					</div>
				</div>
				<div class="body">
					<div class="row">
						<span style="margin-right: 10px;">类型：</span>
						<tasktype @sendId="sendId"></tasktype>
					</div>
					<div>
						<el-input type="textarea" :rows="4" maxlength=20 placeholder="请输入内容" v-model="taskName">
						</el-input>
						<!--<input class="iptstyle" type="text" placeholder="请输入内容" v-model="taskName" />-->
					</div>
					<div class="row" style="border-bottom: 1px solid #E5E5E5;">
						<div class="user" @click.stop="userListBol=!userListBol;participantBol=false">
							<img class="img" v-if="userMsg.img != ''" :src="userMsg.img"/>
							<div class="img" v-if="userMsg.img == ''">
								<i v-if="userMsg.name == ''" class="iconfont icon-wode"></i>
								<span v-if="userMsg.name !=''">{{userMsg.name[0]}}</span>
							</div>
							<span>{{userMsg.name?userMsg.name:'待认领'}}</span>
						</div>
						<memberlist @send="updateUser" @colse="userListBol=false" :show="userListBol" :ids="ids" :taskId="NaN"></memberlist>
						<div class="noneBorder" style="margin-left: 10px;">
							<el-date-picker
								@change="updTaskTime"
						      	v-model="taskTime"
						      	type="daterange"
						      	range-separator="-"
						      	start-placeholder="设置开始时间"
						      	end-placeholder="设置结束时间">
						    </el-date-picker>
						</div>
						<!--<div style="margin-top: 4px;">-->
							<!--<el-tooltip class="item" effect="dark" content="点击设置任务重复方式" placement="top">-->
						      	<!--<i class="iconfont icon-xunhuan hand"></i>-->
						    <!--</el-tooltip>-->
						<!--</div>-->
						<!--<div style="margin:4px 0 0 20px;">-->
							<!--<el-tooltip class="item" effect="dark" content="点击设置任务提醒方式" placement="top">-->
						      	<!--<i class="iconfont icon-ai254 hand"></i>-->
						   	<!--</el-tooltip>-->
						<!--</div>-->
					</div>
					<div class="row" style="flex-direction: column;align-items: flex-start;">
						<div>
							<span>参与者</span>
						</div>
						<div class="memberList">
							<img class="img" v-if="userMsg.img != ''" :src="userMsg.img"/>
							<div class="img" v-if="userMsg.img == '' && userMsg.name != ''">
								<i v-if="userMsg.name == ''" class="iconfont icon-wode"></i>
								<span v-if="userMsg.name !=''">{{userMsg.name[0]}}</span>
							</div>
							<div v-for="user in memberList">
								<img class="img" v-if="user.user_img != ''" :src="user.user_img"/>
								<div class="img" v-if="user.user_img == ''">
									<i v-if="user.username == ''" class="iconfont icon-wode"></i>
									<span v-if="user.username !=''">{{user.username[0]}}</span>
								</div>
							</div>
							<i class="iconfont icon-tianjia addUser" @click.stop="addUserBol" v-if="addParticipantFlage"></i>
							<memberlist :principalId="userMsg.id" @allmsg="getAllMsg" @send="reception" type="checked" :show="participantBol" :ids="checkIds" :taskId="NaN"></memberlist>
						</div>
					</div>
				</div>
				<div class="footer">
					<div class="privateMode" @click="PrivateMode=!PrivateMode" v-if="privacyModeFlage">
						<div>
							<i v-show="PrivateMode" class="iconfont icon-suo"></i>
							<i v-show="!PrivateMode" class="iconfont icon-jiesuo"></i>
						</div>
						<div>
							<div class="private">隐私模式</div>
							<div>{{PrivateMode?'仅参与者可见':'所有成员可见'}}</div>
						</div>
					</div>
					<div>
						<el-button @click="addTask" type="primary" size="medium">确认</el-button>
					</div>
				</div>
			</div>
			<selectaddress @send="getPosMsg"  @ifCYZadnYCs = 'ifCYZadnYCFun' :styles="select_address_styles" :show="select_address_bol" :flagBol='select_address_falg' @close="select_address_bol=false"></selectaddress>
		</div>
	</div>
</template>

<script>
	import API from 'api/http'
	import TIME from 'api/time'
	import selectaddress from 'components/select_address'
	import tasktype from 'components/taskEdit/taskType'
	import memberlist from 'components/memberList'
	import Bus from 'assets/js/Bus.js'
	export default {
		components: {
			selectaddress,
			tasktype,
			memberlist
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			taskTimes: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				//创建任务部分权限   ---参与者和隐藏模式显示问题
//				ifCYZadnYC:false,
				//添加参与者权限
				addParticipantFlage: null,
				//移除参与者权限
				removeParticipantFlage: null,
				//隐私模式权限
				privacyModeFlage:null,



				posIds:{},						//位置信息
				positionName:'',				//位置
				select_address_bol: false, //选择地址的显示与隐藏
				select_address_falg:'addTask',
				select_address_styles: 'top:0px;left:0px', //选择位置组件出现的位置
				taskTypeId: 0,					//任务类型的id
				taskName: '',					//任务的名字
				userMsg:{						//任务负责人的信息
					name:JSON.parse(sessionStorage.getItem('userMessage')).username,
					img:JSON.parse(sessionStorage.getItem('userMessage')).user_img,
					id:JSON.parse(sessionStorage.getItem('userMessage')).id
				},
				userListBol:false,				//负责人列表的显示与隐藏
				ids:[0],
				taskTime:[],					//创建任务时间
				memberList:[],					//参与人列表
				checkIds:[],					//参与人ids
				participantBol: false,			//参与人选择框显示与隐藏
				PrivateMode: false,				//隐私模式
				taskTypeName:''
			}
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
		methods: {
			//添加任务
			addTask(){
				if(this.positionName.trim()==''){
					this.$notify({
						title: '警告',
						message: '请填写创建新任务到哪个项目',
						type: 'warning'
					})
				}else if(this.taskTypeName == ''){
					this.$notify({
						title: '警告',
						message: '请选择任务类型',
						type: 'warning'
					})
				}else if(this.taskName.trim() == ''){
					this.$notify({
						title: '警告',
						message: '请填写任务名称',
						type: 'warning'
					})
				}else{
					let str = '';
					if(this.userMsg.id != 0){
						str += this.userMsg.id + ','
					}
					this.memberList.map(el => {
						str += el.id + ','
					})
					API.post('/tasks/addTask',{
						privacyType:this.PrivateMode ? 1 : 0 ,//公开是0私有是1
						proId:this.posIds.projects.id,
						tid:this.posIds.taskList.id,
						taskType:this.taskTypeId,
						name:this.taskName,
						implementPeopleId:this.userMsg.id,
						startTime:this.taskTime == ''?null:TIME.formatting(this.taskTime[0]),
						endTime:this.taskTime == ''?null:TIME.formatting(this.taskTime[1]),
						ids:str.substr(0,str.length-1)
					})
					this.$emit('close')
					this.$emit('update')
				}

			},
			//获取全部人员的信息
			getAllMsg(data){
				console.log(data)
				this.memberList = data.userList
			},
			//获取位置组件信息
			getPosMsg(obj){
				console.log(obj)
				this.posIds = obj
				this.positionName = obj.projects.name + ' · ' + obj.taskGroup.name + ' · ' + obj.taskList.name
			},
			//控制参与者显示问题和权限的添加
			ifCYZadnYCFun(){
				//项目权限设置
				API.get('/projectPermission/queryProjectPermission', {
					projectId: sessionStorage.getItem('projectId')
				}).then(res => {
	//				console.log('=================================',res.data.data)
					sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
					Bus.$emit('toQueryProjectPermission', res.data.data)

				})
			},
			//接收参与人组件传出来的信息
			reception(obj){
				console.log(obj)
				if(obj.checked){
					this.memberList.push(obj)
				}else{
					let index = this.memberList.findIndex(el => {
						return el.id == obj.id
					})
					this.memberList.splice(index,1)
				}
			},
			//创建新任务至 的显示隐藏
			tig(el) {
				console.log(el)
				this.select_address_falgs='addTask'
				this.select_address_bol = !this.select_address_bol
				this.select_address_styles = "top:" + (el.clientY + 20) + "px;left:" + (el.clientX - 120) + "px"
			},
				//接收任务类型组件发送出来的id
			sendId(id,name) {
				this.taskTypeId = id
				this.taskTypeName = name
			},
			//更新负责人的信息
			updateUser(obj){
				this.userMsg.name = obj.username
				this.userMsg.id = obj.id
				this.userMsg.img = obj.userImg
				let index = this.memberList.findIndex(el => {
					return el.id == obj.id
				})
				this.memberList.splice(index,1)
			},
			//更新任务时间
			updTaskTime(){

			},
			//获取位置
			getPosition(){
				API.get('/projects/getProjectAndBelow',{
					projectId: sessionStorage.getItem("projectId")
				}).then(res => {
					let pos = res.data.data
					for(let i in pos){
						console.log(i)
						this.posIds[i] = {
							id:pos[i].id,
							name:pos[i].name
						}
					}
				this.positionName = this.posIds.projects.name + ' · ' + this.posIds.taskGroup.name + ' · ' + this.posIds.taskList.name
				})
			},
			//关闭所有弹窗
			closeAll(){
				this.select_address_bol = false
				this.participantBol = false
				this.userListBol = false
			},
			addUserBol(){
				console.log(sessionStorage.getItem('projectId'))
				if(sessionStorage.getItem('projectId')==''){
					this.$notify({
						title: '警告',
						message: '请先选择创建至哪个项目',
						type: 'warning'
					})
				}else{
				    this.userListBol = false
					this.participantBol=!this.participantBol
				}

			}
		},
		created(){
			//接收组件通信信息
			Bus.$on('toQueryProjectPermission', (msg) => {
				this.addParticipantFlage = msg.projectPermissionList[16].status
				this.removeParticipantFlage = msg.projectPermissionList[17].status
				this.privacyModeFlage = msg.projectPermissionList[18].status

			});
		},
		watch: {
			show(val) {
				if(val) {
					this.positionName=''//清空创建到哪个项目
					this.taskName=''//清空项目名称
					this.taskTypeName =''
					this.getPosition()
					this.taskTime = []
					this.taskTimes.map(el => {
						this.taskTime.push(el)
					})
				} else {
					this.positionName=''//清空创建到哪个项目
					this.taskName=''//清空项目名称
					this.taskTypeName =''
					this.select_address_bol = false
				}
			},
			taskTime(val){
				console.log(val)
			},
			taskName(val, oldVal) {
				if(val.length > 19) {
//					console.log(oldVal)
//					console.log(val)
//					this.taskName = oldVal
					this.$notify({
						title: '警告',
						message: '任务名称不可以超过20字',
						type: 'warning'
					});

				}
			}
		}
	}
</script>

<style scoped>
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 20;
		display: flex;
		justify-content: center;
	}

	.addTaskBox {
		width: 600px;
		height: 406px;
		background: white;
		margin-top: 100px;
		border-radius: 4px;
		position: relative;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 16px;
		height: 48px;
		font-size: 16px;
		border-bottom: 1px solid #e5e5e5;
	}

	.body {
		padding: 0 16px;
	}

	.selet_address {
		cursor: pointer;
	}

	.selet_address:hover {
		color: #73c0f8;
	}

	.row {
		display: flex;
		align-items: center;
		padding: 10px 0;
	}

	.row .img{
		width: 24px;
		height: 24px;
		border-radius: 24px;
		background: #ffae44;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
	}

	.row .user {
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.hand{
		cursor: pointer;
	}

	.memberList{
		display: flex;
		align-items: center;
	}
	.addUser{
		font-size: 23px;
		margin-top: 4px;
		color: #077CE7;
		cursor: pointer;
	}
	.footer{
		position: absolute;
		width: 570px;
		height: 80px;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
	}
	.privateMode{
		display: flex;
		font-size: 14px;
		cursor: pointer;
	}
	.privateMode:hover .private{
		color: #077ce7;
	}
	.privateMode i{
		font-weight: bold;
		color: #999999;
	}
	.privateMode>div{
		margin-right: 10px;
	}
	.iptstyle{
		width: 100%;
	    height: 40px;
	    border: 1px solid #ccc;
	    padding-left: 5px;
	    box-sizing: border-box;
	}
</style>
<style>
	.noneBorder .el-input__inner {
		border: none !important;
		width: 250px;
		display: flex;
	}
</style>
