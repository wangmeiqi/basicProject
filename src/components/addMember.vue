<!--
	添加新成员组建
	通过邮箱添加
	通过部门添加
	通过群组添加
-->
<template>
	<div>
		<div class="addMember">
			<el-dialog :append-to-body="true" @close="cls" :title="title" :visible.sync="shows" width="340px" center>
				<i v-show="flag!=1" @click="flag = 1" class="iconfont icon-jiantouyou-copy" style="position: absolute;top: 12px;left:12px;font-size: 20px;cursor: pointer;"></i>
				<div class="addMemberBox">
					<div v-if="flag==1">
						<el-row class="row">
							<el-col :span="24">账号邀请</el-col>
						</el-row>
						<el-row class="row">
							<el-col :span="24">
								<el-input :placeholder="hint" prefix-icon="el-icon-search" v-model="membetStr"></el-input>
							</el-col>
						</el-row>
						<el-row class="row">
							<el-col :span="24">
								<ul class="options">
									<li @click="flag = 2">
										<div>从部门邀请成员</div>
										<div><i class="iconfont icon-jiantou"></i></div>
									</li>
									<li @click="flag = 3">
										<div>从群组要求成员</div>
										<div><i class="iconfont icon-jiantou"></i></div>
									</li>
								</ul>
							</el-col>
						</el-row>
					</div>
					<div v-if="flag==2">
						<el-row class="row">
							<el-col :span="24">
								<el-col :span="24">
									<el-input :placeholder="hint" prefix-icon="el-icon-search" v-model="membetStr"></el-input>
								</el-col>
							</el-col>
						</el-row>
						
					</div>
				</div>
			</el-dialog>
		</div>
		
	</div>
</template>

<script>
	import API from 'api/http'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '邀请新成员'
			}
		},
		data(){
			return {
				membetStr:'',				//查询条件
				flag:1,						//区分显示哪个模块 1：通过邮箱邀请成员 2：通过部门邀请成员 3：通过群组邀请成员
				hint:'输入关键字或者邮箱查找',		//input的placeholder
				shows:false
				
			}
		},
		methods: {
			//获取成员信息
			getUsersList() {
				API.get('/projects/getUsersByEid', {
					eid: sessionStorage.getItem("enterpriseId"),
					pid: sessionStorage.getItem("projectId")
				}).then(res => {
					console.log(res)
				})
			},
			//关闭之前的回调
			cls(){
				this.$emit('close')
			}
		},
		watch:{
			show(){
				this.shows = this.show
				if(this.show){
					this.getUsersList()
				}
			},
			flag(val){
				switch(val){
					case 1:this.hint = '输入关键字或者邮箱查找'
						break;
					case 2:this.hint = '输入关键字查找部门或成员'
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.row{
		margin-top: 10px;
	}
	.addMemberBox{
		width: 100%;
		height: 400px;
		border-top: 1px solid #e1e1e1;
		color: #999999;
	}
	.options li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		height: 40px;
	}
	.options li:hover{
		background: #F2F2F2;
	}
</style>
<style>
	/*.el-dialog__header{
		padding-top: 10px !important;
	}
	.el-dialog__title{
		font-size: 16px;
		color: #999999;
	}
	.el-dialog--center .el-dialog__body{
		padding:0 18px;
	}*/
</style>