<template>
	<div>
		<div class="editBox" :style="size">
			<el-row style="border-bottom: 1px solid #efefef;">
				<el-col :span="2">&nbsp;</el-col>
				<el-col :span="20" class="editBoxRow title">
					{{title}}
				</el-col>
				<el-col :span="2" class="editBoxRow">
					<i @click="$emit('close')" class="iconfont icon-guanbi" style="font-size: 12px;"></i>
				</el-col>
			</el-row>
			<ul v-for="(list,index) in lists" class="list">
				<li @click="$emit('outIndex',index)">{{list}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			size:{
				default:'width:200px'
			},
			title:{
				default: "未命名"
			},
			lists:{
				default: []
			}
		},
	}
</script>
<style scoped>
	.editBox{
		position: fixed;
		background: white;
		box-shadow: 0px 0px 10px #dbdbdb;
		border-radius: 2px;
		padding:0 13px;
	}
	.editBoxRow{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
	}
	.title {
		font-size: 14px;
		color: #333333;
	}
	.list{
		padding: 6px;
	}
	.list li{
		color: #666666;
		cursor: pointer;
	}
	.list li:hover{
		color: #077ce7;
	}
</style>