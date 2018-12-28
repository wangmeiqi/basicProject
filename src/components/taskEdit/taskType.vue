<template>
	<div>
		<div style="display: flex;align-items: center;" @click="tig($event)">
			<div style="margin-top: 3px;"><i :class="taskType.icon"></i></div>
			<div>{{taskType.name}}</div>
			<div style="margin-top: 4px;margin-left: 4px;"><i class="iconfont icon-jiantoux"></i></div>
		</div>
		<div class="list" :style="styles" v-show="shows">
			<ul>
				<li @click="openFlag=!openFlag">
					<div>
						<div>
							<i class="iconfont icon-tianjia2"></i>
						</div>
						<div>添加和管理任务类型</div>
					</div>
				</li>
				<li v-for="(item,index) in taskTypeList" @click="typeIndex=index;shows=fasle;$emit('sendId',this.taskTypeList[this.typeIndex].id)">
					<div> <i style="margin-top: 3px;" :class="item.icon"></i> {{item.name}}</div>
					<div>
						<i v-show="typeIndex==index" class="iconfont icon-duihao"></i>
					</div>
				</li>
			</ul>
		</div>
		<project-edit :openFlag="openFlag"></project-edit>
	</div>
</template>

<script>
	import API from 'api/http'
	import projectEdit from 'components/projectEdit'
	export default {
		components:{
			projectEdit
		},
		data(){
			return {
				taskTypeList:[],
				typeIndex:0,
				styles:'',
				shows:false,
				openFlag:false,
				taskType:{
					icon:'',
					name:'',
					id:''
				}
			}
		},
		methods:{
			//获取任务类型列表
			getTaskTypeList(){
				API.get('/tasks/findTaskType',{
					projectId:sessionStorage.getItem("projectId")
				}).then(res => {
					this.taskTypeList = res.data.data
					this.$emit("sendId",this.taskTypeList[this.typeIndex].id,this.taskTypeList[this.typeIndex].name)
					this.taskType.name = this.taskTypeList[this.typeIndex].name
					this.taskType.icon = this.taskTypeList[this.typeIndex].icon
					this.taskType.id = this.taskTypeList[this.typeIndex].id
				})
			},
			//弹出全部任务类型
			tig(el){
				if(sessionStorage.getItem('projectId')==''){
						this.$notify({
						title: '警告',
						message: '请先选择创建至哪个项目',
						type: 'warning'
					})
				}else{
					this.shows = !this.shows
					console.log(el)
					this.styles = "top:" + (el.clientY+10) + "px;left:" + el.clientX + "px"
					console.log(this.styles)
					this.getTaskTypeList()
				}

			}
		},
		watch:{
			typeIndex(val){
				this.taskType.name = this.taskTypeList[val].name
				this.taskType.icon = this.taskTypeList[val].icon
				this.taskType.id = this.taskTypeList[val].id
			}
		},
		created(){
//			this.getTaskTypeList()
		}
	}
</script>

<style scoped>
	.list{
		width: 200px;
		height: auto;
		box-shadow: 0 0 10px #E1E1E1;
		background: white;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 17;
	}
	ul li{
		width: 100%;
		height: 36px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	ul li:hover{
		background: #E1E1E1;
	}
	ul li div{
		margin: 0 10px;
		display: flex;
		align-items: center;
	}
	.bulb{
		color: #77c2f8;
	}
	.money {
		color: #69b6fd;
	}
	.people{
		color: #fdcd89;
	}
	.water{
		color: #87d9f1;
	}
	.electricity{
		color: #f9978a ;
	}
	.star{
		color: #ffb74c;
	}
	.right {
		color: #f94f4f;
	}
</style>
