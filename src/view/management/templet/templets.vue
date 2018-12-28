<template>
	<div>
		<div class="navs clearfix">
			<span class="fl">模板管理</span>
			<span class="fr" v-if="newQyxmmbFlage" style="color: #077ce7;cursor: pointer;" @click="layerBol=true;type='add';titleName='添加模板'">
				<i class="iconfont icon-add"></i>
				新建模板
			</span>
		</div>
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="name" label="模板名称">
			</el-table-column>
			<el-table-column prop="pname" label="所属分类">
			</el-table-column>
			<el-table-column prop="username" label="创建人">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
					<el-button @click.native.prevent="deleteRow(scope.$index,tableData,scope.row)" type="text" size="small">
						移除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block" style="margin-top: 20px;text-align: center;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<!--添加模板-->
		<el-dialog :visible.sync="layerBol" width="800px" ref="closeCreator" :title="titleName" center>
			<templetsLayer :shows="layerBol" :types="type" :id="editorId" @cancel="layerBol=false" @tbn="tbnDialog"></templetsLayer>
		</el-dialog>

	</div>

</template>

<script>
	import api from 'api/http'
	import templetsLayer from 'view/management/templet/templetsLayer'
	import Bus from 'assets/js/Bus.js'
	let pageSize = 0;
	let browserHeight = document.documentElement.clientHeight || window.innerHeight || document.body.offsetHeight
	if(browserHeight >= 800) {
		pageSize = 10;
	} else if(browserHeight < 800) {
		pageSize = 10;
	}
	export default {
		components: {
			templetsLayer
		},
		data() {
			return {
				//"创建企业项目模板"
				newQyxmmbFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[7].status,
				
				flag:1,//1是添加2是编辑
				layerBol: false,
				//当前页数
				pageNum: 1,
				//总数
				total: 0,
				//显示几条数据
				pageSize: pageSize,
				currentPage3: 1,
				tableData:'',
				//添加模板的类型
				type:'add',
				//编辑的id
				editorId:'',
				titleName:'添加模板'
			}
		},
		methods: {
			//加载模板列表
			templetsList(){
				let parms = {
					page:this.pageNum,
					size:this.pageSize
				}
				api.get('projects/getProModelManage',parms).then(res => {
					this.tableData = res.data.data.list.list
					this.total=res.data.data.list.total
				})
			},
			//删除模板
			deleteRow(index,rows,rowsid) {
				this.$confirm('是否移除模板?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '移除成功!'
					});
					let parms = {
					id:rowsid.id,
					type:1
				}
				api.post('projects/delProModel',parms).then(res => {
					this.templetsList()
				})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消移除'
					});
				});
			},

			//编辑模板
			handleClick(row) {
				this.type = 'exit'
				this.layerBol = true
				this.titleName="编辑模板"
				console.log(row);
				this.editorId = row.id
				
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pageNum = val
				this.templetsList()
			},
			//日程弹框
			closeCreator() {
				this.layerBol = false;
				this.$refs.closeCreator.$el.click();
			},
			tbnDialog() {
				this.templetsList()
				this.layerBol = false
			}
		},
		created(){
			//初始化
			this.templetsList()
			//接收组件通信信息
			Bus.$on('toCurrentRolePermissions', (msg) => {
				this.newQyxmmbFlage = msg.enterprisePermissionList[7].status
			});
		}
	}
</script>

<style scoped>
	.navs {
		background: #fff;
		height: 60px;
		line-height: 60px;
		padding: 0 25px;
		border-bottom: 1px solid #ebeef5;
		font-size: 14px;
		font-weight: 600;
		color: #909399;
		padding-left: 10px;
	}
	
	.el-table .cell {
		padding-left: 25px;
	}
</style>