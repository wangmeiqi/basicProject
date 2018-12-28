<template>
	<div>
		<h1>企业项目</h1>
		<el-row style="margin-top: 24px;">
			<el-col :span="24">
				<el-row :class="{typeBox:!typeOneBol,typeBoxShow:typeOneBol}">
					<el-col :span="2">
						<div class="hand">
							<span>{{typeOneMes.name}} :</span>
						</div>
					</el-col>
					<el-col :span="21">
						<ul ref="box1">
							<li @click="openEditTypeMT(1)"><i class="iconfont icon-bianji1"></i> 编辑</li>
							<li v-for="(item, index) in typeOneList" @click="screens(index,1,item.checked)" :class="{typeChecked:item.checked}">
								<el-tooltip class="item" effect="dark" :content="item.description || '这个分类暂时没有描述'" placement="top">
							     	<p>{{item.name}}</p>
							  	</el-tooltip>
							</li>
						</ul>
					</el-col>
					<el-col :span="1">
						<span v-if="typeoneShow" @click="typeOneBol=!typeOneBol" class="hand">{{typeOneBol | fold}} <i v-if="typeOneBol" class="el-icon-arrow-up"></i><i v-if="!typeOneBol" class="el-icon-arrow-down"></i></span>
					</el-col>
				</el-row>
				<el-row :class="{typeBox:!typeTwoBol,typeBoxShow:typeTwoBol}">
					<el-col :span="2">
						<div class="hand">
							<span>{{typeTwoMes.name}} :</span>
						</div>
					</el-col>
					<el-col :span="21">
						<ul ref="box2">
							<li @click="openEditTypeMT(2)"><i class="iconfont icon-bianji1"></i> 编辑</li>
							<li v-for="(item, index) in typeTwoList" @click="screens(index,2,item.checked)" :class="{typeChecked:item.checked}">
								<el-tooltip class="item" effect="dark" :content="item.description || '这个分类暂时没有描述'" placement="top">
							     	<span>{{item.name}}</span>
							  	</el-tooltip>
							</li>
						</ul>
					</el-col>
					<el-col :span="1">
						<span v-if="typeTwoShow" @click="typeTwoBol=!typeTwoBol" class="hand">{{typeTwoBol | fold}} <i v-if="typeTwoBol" class="el-icon-arrow-up"></i><i v-if="!typeTwoBol" class="el-icon-arrow-down"></i></span>
					</el-col>
				</el-row>
				<el-row class="typeBox">
					<el-col :span="2">
						<div class="hand">
							<span>{{typeThreeMes.name}} :</span>
						</div>
					</el-col>
					<el-col :span="21">
						<ul ref="box3">
							<li @click="openEditTypeMT(3)"><i class="iconfont icon-bianji1"></i> 编辑</li>
							<li v-for="(item, index) in typeThreeList" @click="screens(index,3,item.checked)" :class="{typeChecked:item.checked}">
								<el-tooltip class="item" effect="dark" :content="item.description || '这个分类暂时没有描述'" placement="top">
							     	<span>{{item.name}}</span>
							  	</el-tooltip>
							</li>
						</ul>
					</el-col>
					<el-col :span="1">
						<span v-if="typeThreeShow" @click="typeThreeBol=!typeThreeBol" class="hand">{{typeThreeBol | fold}} <i v-if="typeThreeBol" class="el-icon-arrow-up"></i><i v-if="!typeThreeBol" class="el-icon-arrow-down"></i></span>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	.typeBox,.typeBoxShow{
		margin-bottom: 12px;
		border-bottom: 2px dashed #e9e9e9;
	}
	.typeBox ul{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		height: 36px;
		overflow: hidden;

	}
	.typeBox ul>li{
		color: #666666;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 26px;
		font-size: 14px;
		background: #f0f0f0;
		padding: 0px 10px;
		border-radius: 4px;
		margin-left: 10px;
		margin-bottom: 10px;
		cursor: auto;
	}
	.typeBoxShow ul{

		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}
	.typeBoxShow ul>li{
		color: #666666;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 26px;
		font-size: 14px;
		background: #f0f0f0;
		padding: 0px 10px;
		border-radius: 4px;
		margin-left: 10px;
		margin-bottom: 10px;
		cursor: auto;
	}
	.typeChecked{
		background: #077ce7 !important;
		color: white !important;
	}
	.hand{
		cursor: pointer;
		font-size: 14px;
		color: #999999;
		margin-top: 4px;
	}
</style>