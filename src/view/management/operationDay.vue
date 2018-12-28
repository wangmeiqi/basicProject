<template>
	<div class="oDbox">
		<h4 class="col3 font16 nav-title">操作日志</h4>
		<div class="filtrate">
			<el-row :gutter="20" style="margin-left: 0;margin-right: 0;height: 70px;">
				<el-col :span="6">
					<div class="oDFlag">日期<span style="color:#999 ">（单次操作不能超过一年）</span></div>
					<el-date-picker v-model="startDate" type="date" placeholder="开始日期">
					</el-date-picker>
				</el-col>
				<el-col :span="6">
					<div class="oDFlag"></div>
					<el-date-picker v-model="endDate" type="date" placeholder="结束日期">
					</el-date-picker>
				</el-col>
				<el-col :span="6">
					<div class="oDFlag">成员</div>
					<el-select v-model="userid" placeholder="请选择">
						<el-option v-for="item in roleArr" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<div class="oDFlag">操作类型</div>
					<el-select v-model="type" placeholder="请选择">
						<el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</div>
		<div>
			<el-table :data="userList" style="width: 100%">
				<el-table-column label="用户">
					<template slot-scope="scope">
						<div class="userBox">
							<div>
								<img class="headImage" v-if="typeof(scope.row.userImage) !='object'" :src="scope.row.userImage"/>
								<img class="headImage" v-if="typeof(scope.row.userImage) =='object'" src="../../assets/images/22登录_01.png"/>
							</div>
							<div>
								<div>{{scope.row.user}}</div>
								<div>{{scope.row.ip}}</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="operation" label="操作">
				</el-table-column>
				<el-table-column prop="content" label="内容">
				</el-table-column>
				<el-table-column prop="projectName" label="项目">
				</el-table-column>
				<el-table-column label="时间">
					<template slot-scope="scope">
						{{scope.row.createTime | times}}
					</template>
				</el-table-column>
			</el-table>

		</div>
		<div class="oDfooter">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="size"  :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import API from 'api/http'
	export default {
		name: "operation-day",
		data() {
			return {
				startDate: 0,
				endDate: 0,
				userid: '',
				type: '',
				roleArr: [],
				typeArr: [],
				userList: [],
				//页数
				page: 1,
				//条数
				size: 5,
				//总条数
				total: 0
			}
		},
		methods: {
			handleSizeChange(val) {
//				console.log(`每页 ${val} 条`);
//				this.getOperationDay()
			},
			handleCurrentChange(val) {
//				console.log(`当前页: ${val}`);
				this.getOperationDay()
			},
			getOperationDay(){
				API.post('/log/logList', {
					page: this.page,
					size: this.size,
					begin: Date.parse(new Date(this.startDate)),
					end: Date.parse(new Date(this.endDate)),
					eid: sessionStorage.getItem('enterpriseId'),
					userId: this.userid,
					type:this.type
				}).then(res => {
					console.log(res)
					this.userList = res.data.data.list
					this.total = res.data.data.total
				})
			}
		},
		filters:{
			times(val){
				let time = new Date(val);
				return time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate()
			}
		},
		watch: {
			startDate() {
				if(Date.parse(new Date(this.endDate)) - Date.parse(new Date(this.startDate)) > 31536000000) {
					this.$message({
						message: '您选择的时间超过了一年，请重新选择',
						type: 'info'
					});
					this.startDate = ''
					this.endDate = ''
				} else {
					this.getOperationDay()
				}
			},
			endDate() {
				if(Date.parse(new Date(this.endDate)) - Date.parse(new Date(this.startDate)) > 31536000000) {
					this.$message({
						message: '您选择的时间超过了一年，请重新选择',
						type: 'info'
					});
					this.startDate = ''
					this.endDate = ''
				} else {
					this.getOperationDay()
				}
			},
			userid() {
				this.getOperationDay()
			},
			type(){
				this.getOperationDay()
			}
		},
		created() {
			API.post('/user/getEUser', {
				enterpriseId: sessionStorage.getItem('enterpriseId')
			}).then(res => {
				console.log(res.data.data)
				res.data.data.map(el => {
					this.roleArr.push({
						value: el.id,
						label: el.name
					})
				})
			})
			//获取成员下拉列表
			this.getOperationDay()
			
			//操作类型
			API.post('/log/getType',{
				name:'operationType'
			}).then(res => {
				console.log(res)
				res.data.data.map(el => {
					this.typeArr.push({
						value:el.id,
						label:el.NAME
					})
				})
			})
		}
	}
</script>

<style scoped>
	.el-row {
		margin-bottom: 20px;
	}
	
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple-dark {
		background: #99a9bf;
	}
	
	.bg-purple {
		background: #d3dce6;
	}
	
	.bg-purple-light {
		background: #e5e9f2;
	}
	
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	
	.filtrate {
		margin-top: 30px;
		padding: 0 30px;
		padding-left: 20px;
	}
	
	.oDFlag {
		height: 30px;
		color: #333;
    	font-size: 14px;
	}


	.oDfooter {
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	
	.headImage{
		width: 30px;
		height: 30px;
		border-radius: 30px;
	}
	
	.userBox{
		display: flex;
		/*justify-content: center;
		align-items: center;*/
	}
	.userBox>div:nth-child(1){
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}
	.col3 {
		color: #333
	}
	.font16{
		font-size: 16px
	}
	.nav-title{
		height: 80px;
		line-height: 80px;
		padding-left: 30px;
		border-bottom: 1px solid #f7f7f7;
	}
	.has-gutter{
		background: red !important;
	}
</style>