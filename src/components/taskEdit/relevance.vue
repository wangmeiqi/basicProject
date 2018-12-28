<template>
	<div>
		<div>
			<i class="iconfont icon-guanlian rotate"></i>
			<span>关联内容</span>
		</div>
		<div v-if="'listObject' in relList && relList.listObject.length == 0" class="groupTitle">
			<div class="title">任务</div>
			<div class="divider"></div>
		</div>
		<ul class="relList">
			<li v-for="item in relList.listObject">
				<div style="margin:0 20px;">
					<img class="img" v-if="item.tasks.user.user_img !=''" :src="item.tasks.user.user_img"/>
					<div class="img" v-if="item.tasks.user.user_img ==''">
						{{item.tasks.user.username[0]}}
					</div>
					<span>
						{{item.tasks.name}}
					</span>
				</div>
				<div>
					<span>{{item.names}}</span>
					<i @click="cancelRel(item.tasks.id,1)" class="iconfont icon-guanlian1" style="margin:0 10px;cursor: pointer;"></i>
				</div>
			</li>
		</ul>
		<div class="addRelevance">
			<i class="iconfont icon-tianjia"></i>
			<span @click="temShow=!temShow">添加关联</span>
		</div>
		<relevancetem :type="type" :taskId="taskId" @upDate="$emit('upDate')" :show="temShow" @close="temShow=false"></relevancetem>
	</div>
</template>

<script>
	import API from 'api/http'
	import relevancetem from 'components/relevancetem'
	export default {
		props:{
			taskId:{
				type:Number,
				default:0
			},
			relList:{
				default:()=>{
					return []
				}
			},
			type:{
				default:'task'
			}
		},
		components:{
			relevancetem
		},
		data(){
			return {
				temShow:false
			}
		},
		methods:{
			//取消关联
			cancelRel(id,flag){
				this.$confirm('是否取消关联?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '取消关联成功!'
					});
					API.post('/tasks/delRelationTask',{
						relId:id,
						taskId:this.taskId,
						type:flag
					}).then(res => {
						if(res.data.code == 200){
							this.$emit('upDate')
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消关联'
					});
				});
				
			}
		}
	}
</script>

<style scoped>
	.groupTitle{
		margin: 10px 20px;
		color: #999999;
		display: flex;
		align-items: center;
	}
	.groupTitle .title{
		width: 60px;
	}
	.groupTitle .divider{
		height: 1px;
		width: 100%;
		background: rgba(0,0,0,.1);
	}
	.addRelevance{
		color: #2c86ff;
		cursor: pointer;
		margin-top: 10px;
	}
	.relList li{
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: default;
	}
	.relList li:hover{
		background: #EFEFEF;
	}
	.relList li .img{
		width: 24px;
		height: 24px;
		border-radius: 24px;
		background: #ffae44;
		margin-right:10px;
		display: flex;
		text-align: center;
		align-items: center;
		color: white;
		display: inline-block;
	}
		.rotate{
		display: inline-block;
		width: 16px;
		height: 22px;
		transform:rotate(50deg);
		-ms-transform:rotate(50deg); 	/* IE 9 */
		-moz-transform:rotate(50deg); 	/* Firefox */
		-webkit-transform:rotate(50deg); /* Safari 和 Chrome */
		-o-transform:rotate(50deg); 	/* Opera */
	}
</style>
