<template>
	<div>
		<div class="selectAddress" :style="styles" v-show="show" @click.stop="listBol=false;proBol=false;groupBol=false">
			<div class="header">
				<el-row>
					<el-col :span="2">&nbsp;</el-col>
					<el-col :span="20" class="center">选择位置</el-col>
					<el-col :span="2" class="center">
						<i class="iconfont icon-guanbi close" @click="$emit('close')"></i>
					</el-col>
				</el-row>
			</div>
			<div class="body">
				<div class="row">
					<div class="left">
						<span>项目</span>
					</div>
					<div class="right">
						<span @click.stop="getProList">
							<span>{{proStr?proStr:'待添加'}}</span>
						<i class="iconfont icon-jiantoux"></i>
						</span>
						<selects @sendMsg="getProMsg" @close="proBol=false" :proId="posIds.projects.id" :list="proList" :search="search" :show="proBol"></selects>
					</div>
				</div>
				<div class="row rowhide">
					<div class="left">
						<span>分组</span>
					</div>
					<div class="right">
						<span @click.stop="getGroupList">
							<span>{{groupStr?groupStr:'待添加'}}</span>
						<i class="iconfont icon-jiantoux"></i>
						</span>
						<selects @sendMsg="getGroupMsg" @close="groupBol=false" :proId="posIds.taskGroup.id" :list="taskGroupList" :show="groupBol"></selects>
					</div>
				</div>
				<div class="row rowhide">
					<div class="left">
						<span>列表</span>
					</div>
					<div class="right">
						<span @click.stop="getTaskList">
							<span>{{listStr?listStr:'待添加'}}</span>
						<i class="iconfont icon-jiantoux"></i>
						</span>
						<selects @sendMsg="getTaskListMsg" @close="listBol=false" :proId="posIds.taskList.id" :list="taskList" :show="listBol"></selects>
					</div>
				</div>
				<p class="rowhide" style="margin-top: 8px;">你可以在任务板中添加和修改任务分组及任务列表。</p>
			</div>
			<div class="footer">
				<button @click="submit">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	import API from 'api/http'
	import selects from 'components/radioSelect'
	import Bus from 'assets/js/Bus.js'
	export default {
		components: {
			selects
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			styles: {
				type: String,
				default: "top:0px;left:0px"
			},
			flagBol: {
				default: 'addTask' //addTask验证项目,分类,列表addSchedule只验证项目
			}
		},
		data() {
			return {
				a: 111,
				search: true,
				proStr: '',
				proBol: false,
				groupStr: '',
				groupBol: false,
				listStr: '',
				listBol: false,

				proList: [], //项目列表
				posIds: { //位置信息
					projects: {
						id: 0,
						name: ''
					},
					taskGroup: {
						id: 0,
						name: ''
					},
					taskList: {
						id: 0,
						name: ''
					}
				},

				taskGroupList: [], //任务分组列表

				taskList: [], //甬道类表
				selProjectId:''//选中的项目id
			}
		},
		methods: {
			//提交信息
			submit() {
				if(this.flagBol == 'addTask') {
					if(this.proStr == '') {
						this.$notify({
							title: '警告',
							message: '请选择项目',
							type: 'warning'
						});
					} else if(this.groupStr == '') {
						this.$notify({
							title: '警告',
							message: '请选择分组',
							type: 'warning'
						});
					} else if(this.listStr == '') {
						this.$notify({
							title: '警告',
							message: '请选择列表',
							type: 'warning'
						});
					} else {
						sessionStorage.setItem('projectId',this.selProjectId)
						this.$emit('send', this.posIds)
						this.$emit('close')
						//控制显示
						this.$emit('ifCYZadnYCs')
						
						
					}
				} else if(this.flagBol == 'addSchedule') {
					if(sessionStorage.getItem('addScheduleFalg')=='calendar'){
						if(this.proStr == '') {
						this.$notify({
							title: '警告',
							message: '请选择项目',
							type: 'warning'
						});
					} else {
						this.$emit('send', this.posIds)
						this.$emit('close')
						//控制显示
						this.$emit('ifCYZadnYCs')
					}
					}else{
						sessionStorage.setItem('projectId', this.selProjectId)
						this.$emit('send', this.posIds)
						this.$emit('close')
						//控制显示
						this.$emit('ifCYZadnYCs')
					}

				}

			},
			//获取甬道的信息
			getTaskListMsg(data) {
				this.posIds.taskList.id = data.id;
				this.posIds.taskList.name = data.name;
				this.listStr = data.name;
			},
			//获取选中的分组信息
			getGroupMsg(data) {
				this.posIds.taskGroup.id = data.id;
				this.posIds.taskGroup.name = data.name;
				this.groupStr = data.name;
			},
			//获取选中的项目信息
			getProMsg(data) {
//				sessionStorage.setItem('projectId', data.id)
				this.selProjectId = data.id
				this.posIds.projects.id = data.id;
				this.posIds.projects.name = data.name;
				this.proStr = data.name;
				this.echoOther(this.posIds.projects.id, 0, 0)
			},
			//获取位置
			getPosition() {
				API.get('/projects/getProjectAndBelow', {
					projectId: sessionStorage.getItem("projectId")
				}).then(res => {
					let pos = res.data.data
					this.proStr = pos.projects.name
					this.groupStr = pos.taskGroup.name
					this.listStr = pos.taskList.name
					for(let i in pos) {
						this.posIds[i] = {
							id: pos[i].id,
							name: pos[i].name
						}
					}
				})
			},
			//获取项目列表
			getProList() {
				this.proBol = !this.proBol;
                this.groupBol = false;
                this.listBol = false;
				if(this.proBol) {
					API.get('/projects/getProjectByUid', {
						eid: sessionStorage.getItem('enterpriseId')
					}).then(res => {
						//console.log(res.data.data, 987654321)
						this.proList = res.data.data
					})
				}
			},
			//获取任务分组列表
			getGroupList() {
				this.groupBol = !this.groupBol;
                this.proBol = false;
                this.listBol = false;
				if(this.groupBol) {
					API.get('/tasks/findGroupTask', {
						projectId: this.posIds.projects.id
					}).then(res => {
						this.taskGroupList = res.data.data
					})
				}
			},
			//获取甬道列表
			getTaskList() {
				this.listBol = !this.listBol;
                this.proBol = false;
                this.groupBol = false;
				API.get('/tasks/getTaskListByGroupId', {
					groupId: this.posIds.taskGroup.id
				}).then(res => {
					this.taskList = res.data.data
				})
			},
			//选择其中的一个选项 其他选项回显
			echoOther(proId, groupId, listId) {
				API.get('/projects/getPGL', {
					projectId: proId,
					groupId: groupId,
					listId: listId
				}).then(res => {
					this.posIds.taskGroup.id = res.data.data.taskGroup.id
					this.posIds.taskGroup.name = res.data.data.taskGroup.name
					this.groupStr = res.data.data.taskGroup.name
					this.posIds.taskList.id = res.data.data.taskList.id
					this.posIds.taskList.name = res.data.data.taskList.name
					this.listStr = res.data.data.taskList.name
				})
			}
		},
		created() {
			this.getPosition()
		},
		watch: {
			flagBol(val) {
				//console.log(66)
				//console.log(val)
			},
		},
	}
</script>

<style scoped>
	.selectAddress {
		position: fixed;
		top: 0;
		left: 0;
		width: 250px;
		height: 319px;
		background: white;
		box-shadow: 0 0 10px #999999;
		z-index: 9;
	}

	.header {
		font-size: 15px;
		font-weight: bold;
		padding: 0 15px;
		border: 1px solid #E5E5E5;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 51px;
	}

	.close {
		font-weight: normal;
		font-size: 20px;
		color: #a6a6a6;
		cursor: pointer;
	}

	.body {
		padding: 0 15px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		border-bottom: 1px solid #E5E5E5;
	}

	.left {
		font-weight: bold;
	}

	.right {
		color: #808080;
		cursor: pointer;
	}

	.footer {
		padding: 8px 15px;
	}

	.footer button {
		width: 100%;
		height: 40px;
		background: #077ce7;
		border-radius: 4px;
		color: white;
		cursor: pointer;
	}
</style>
