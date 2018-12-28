<template>
	<!--添加关联组件-->
	<div>
		<div class="relBack" v-if="show" @click="$emit('close')">
			<div class="relBox" @click.stop="show=show">
				<div class="header">
					<el-row>
						<el-col :span="8">&nbsp;</el-col>
						<el-col class="center" :span="8">
							<span>关联内容</span>
						</el-col>
						<el-col class="center" :span="8">
							<el-input size="small" v-model="search" placeholder="搜索全部"></el-input>
							<i class="iconfont icon-guanbi hand" style="margin-left: 20px;" @click="$emit('close')"></i>
						</el-col>
					</el-row>
				</div>
				<div class="body">
					<div class="left">
						<ul style="margin-top: 13px;">
							<li v-for="(item,index) in leftList" :class="{active:leftIndex==index}" @click="typeClick(index)">
								<i :class="item.icon"></i> {{item.name}}
							</li>
						</ul>
					</div>
					<div class="right">
						<div class="left">
							<div class="box" v-for="item in list">
								<ul>
									<li class="none row">{{item.enterprise.name}}</li>
								</ul>
								<ul>
									<li :class="{active:li.id==proId}" class="row" v-for="li in item.projects" @click="getTaskGroupList(li.id)">
										{{li.name}}
									</li>
								</ul>
							</div>
						</div>
						<div class="taskListArr" ref="F_taskListArr">
							<div ref="taskListArr">
								<div class="left">
									<div class="box">
										<ul>
											<li class="none row">任务分组</li>
										</ul>
										<ul>
											<li class="row" :class="{active:groupId==li.id}" v-for="li in groupList" @click="getTaskList(li.id)">
												{{li.name}}
											</li>
										</ul>
									</div>
									<div class="box">
										<ul>
											<li class="none row">智能分组</li>
										</ul>
										<ul>
											<li class="row" v-for="li in smartGroup">
												{{li.name}}
											</li>
										</ul>
									</div>
								</div>
								<div class="box scroll" v-for="(item,index) in taskList">
									<div class="row">
										<i class="iconfont icon-tianjia" style="color: #077ce7;cursor: pointer;"></i>
										<span @click="addTaskBol=true" style="color: #077ce7;cursor: pointer;">添加新任务</span>
									</div>
									<div v-if="index==0" v-for="li in item" class="box">
										<ul>
											<li class="row" style="color: black;">
												{{li.name}}
											</li>
										</ul>
										<ul>
											<li class="row task" :class="{active:relId==o.id}" v-for="o in li.tasksList" @click="getSonTaskList(o.id,index)">
												<img class="img" v-if="o.user.user_img!=''" :src="o.user.user_img"/>
												<div class="img" v-if="o.user.user_img==''">
													{{o.user.username[1]}}
												</div>
												<span class="itemStyleName">{{o.name}}</span>

											</li>
										</ul>
									</div>
									<ul class="box" v-if="index!=0">
										<li class="row task" :class="{active:relId==li.id}" v-for="li in item" @click="getSonTaskList(li.id,index)">
											<img class="img" v-if="li.user.user_img!=''" :src="li.user.user_img"/>
											<div class="img" v-if="li.user.user_img==''">
												{{li.user.username[1]}}
											</div>
											<span>{{li.name}}</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<div></div>
					<div></div>
					<div>
						<button @click="relTask" :class="{buttonActive:relId!=-1}">确定</button>
					</div>
				</div>
			</div>
		</div>
		<addtask :show="addTaskBol" @close="addTaskBol=false"></addtask>
	</div>
</template>

<script>
	import API from 'api/http'
	import addtask from 'components/addTask'
	export default {
		components:{
			addtask
		},
		props:{
			show:{				//显示隐藏
				type:Boolean,
				default:false
			},
			taskId:{
				type:Number,
				default:0
			},
			type:{
				default:'task'
			}
		},
		data(){
			return {
				addTaskBol:false,	//创建新任务的显示与隐藏
				search:'',			//查询条件
				leftList:[{			//类型列表
					icon:'iconfont icon-bianji2',
					name:'任务',
					flag:1
				},
//				{
//					icon:'iconfont icon-fuzhi',
//					name:'分享',
//					flag:2
//				},{
//					icon:'iconfont icon-rili2',
//					name:'日程',
//					flag:3
//				},{
//					icon:'iconfont icon-wenjian',
//					name:'文件',
//					flag:4
//				}
				],
				leftIndex:0,		//左侧导航默认选中第一个
				list:[],			//企业项目列表
				groupList:[],		//项目分组列表
				proId:0,
				smartGroup:[{		//智能分组
					name:"今天的任务",
					flag:1
				},{
					name:"未完成的任务",
					flag:1
				},{
					name:"已完成的任务",
					flag:1
				}],
				taskList:[],		//任务列表
				groupId:0,			//分组id
				relId:-1			//任务id

			}
		},
		methods:{
			//获取企业项目
			getList(){
				API.get('/tasks/getTaskRelation',{
					proId: sessionStorage.getItem("projectId")
				}).then(res => {
					this.list = res.data.data.listObject
					this.groupList = res.data.data.taskGroup
				})
			},
			//点击左侧导航切换关联类型
			typeClick(index){
				this.leftIndex=index;
			},
			//获取任务分组
			getTaskGroupList(id){
				this.proId = id
				API.get("/tasks/findGroupTask",{
					projectId:id
				}).then(res => {
					this.groupList = res.data.data
				})
			},
			//获取任务列表
			getTaskList(groId){
			    var roleId = JSON.parse(sessionStorage.getItem('currentProjectPermissions'));
			   // console.log(roleId.roleId,666)
				this.groupId = groId
				this.relId = -1
				API.get("/tasks/findTaskByGroupId",{
					groupId:groId,
                    roleId:roleId.roleId==4?1:0,
                    projectId:sessionStorage.getItem('projectId')
				}).then(res => {
					this.taskList.splice(0)
					this.taskList.push(res.data.data)
					//console.log(this.taskList)
					//console.log(this.$refs.taskListArr)
					//console.log((this.taskList.length+1)*200)
					this.$refs.taskListArr.style.width = (this.taskList.length+1.1)*200 + "px";
					this.$refs.taskListArr.style.height = 440 + "px";
				})
			},
			//获取子任务列表
			getSonTaskList(id,index){
				this.relId = id
				API.get("/tasks/getSonTask",{
					taskId:id
				}).then(res => {
					this.taskList.splice(index+1)
					this.taskList.push(res.data.data)
					this.$refs.taskListArr.style.width = (this.taskList.length+1.1)*200 + "px";
					this.$refs.taskListArr.style.height = 440 + "px";
					this.$nextTick(()=>{
						this.$refs.F_taskListArr.scrollLeft = 200 * (index+1)
					})
				})
			},
			//关联任务
			relTask(){
				if(this.type == 'task'){
					if(this.relId != -1){
						API.post("/tasks/addTaskRelation",{
							eid:sessionStorage.getItem("enterpriseId"),
							projectId:sessionStorage.getItem("projectId"),
							taskId:this.taskId,
							relIds:this.relId,
							type:this.leftList[this.leftIndex].flag
						}).then(res => {
							this.$emit('upDate');
							this.$emit("close");
						})
					}
				}else if(this.type == 'schedule'){
					if(this.relId != -1){
						API.post("/schedule/addScheduleRelation", {
							eid:sessionStorage.getItem("enterpriseId"),
							pid:sessionStorage.getItem("projectId"),
							sid:this.taskId,
							relIds:this.relId,
							type:this.leftList[this.leftIndex].flag
						}).then(res => {
							this.$emit('upDate');
							this.$emit("close");
						})
					}
				}

			}
		},
		watch:{
			show(){
				//当组建显示的时候显示
				if(this.show){
					this.getList()
					this.leftIndex = 0
					this.proId = sessionStorage.getItem("projectId")
				}
			}
		}
	}
</script>

<style scoped>
	.taskListArr {
		width: 418px;
		height: 440px;
		float: left;
		overflow: auto;
		overflow-y: hidden;
	}
	.taskListArr>div>div{
		display:inline-block;
		float: left;
		width: 194px;
		height: 440px;
		border-right: 2px solid #EFEFEF;
	}
	.relBack{
		width: 100vw;
		height: 100vh;
		background: black;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 20;
		background: rgba(0,0,0,0.5);
	}
	.relBox{
		width: 810px;
		height: 610px;
		background: white;
		opacity: 1;

	}
	.center{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 74px;
	}
	.header{
		padding: 0 30px;
		font-size: 16px;
		border-bottom: 2px solid #EFEFEF;
	}
	.hand{
		cursor: pointer;
	}
	.body{
		height: 440px;
		width: 100%;
		border-bottom: 2px solid #EFEFEF;
	}
	.left{
		width: 194px;
		height: 440px;
		float: left;
		border-right: 2px solid #EFEFEF;
		overflow: auto !important;
	}
	.left li{
		height: 32px;
		/*display: flex;
		flex-wrap: wrap;*/
		align-items: center;
		cursor: pointer;
		line-height: 32px;
	}
	.left li:hover{
		background: #077ce7;
		color: white;
	}
	.left li i{
		margin: 4px 10px 0 24px;
	}
	.right{
		width: 614px;
		float: left;
		height: 440px;
	}
	.active{
		background: #077ce7 !important;
		color: white !important;
	}
	.none {
		color: black !important;
		cursor: default !important;
	}
	.none:hover{
		background: white !important;
		color: black !important;
	}
	.box{
		padding-top: 20px;
		margin-bottom: 40px;
	}
	.row {
		padding: 0 20px;
	    line-height: 32px;
	    width: 140px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.task{
		height: 32px;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	.task:hover{
		background: #077ce7;
		color: white;
	}
	.scroll{
		overflow: auto;
	}
	.footer{
		height: 90px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.footer button{
		width: 90px;
		height: 36px;
		color: white;
		background: #999999;
		border-radius: 4px;
		cursor: pointer;
		margin-right: 30px;
	}
	.buttonActive{
		background: #077ce7 !important;
	}
	.task .img{
		width: 20px;
		height: 20px;
		border-radius: 20px;
		background: gold;
		margin-right: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}
	.itemStyleName{
		display: inline-block;
    	width: 150px;
    	overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		vertical-align: text-bottom;
	}
</style>
