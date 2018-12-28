<template>
	<!--统计-->
	<div>
		<div class="contents">
			<echarts></echarts>
			<div class="tabels">
				<div class="header">
					<div class="pull-left">
						<a class="item tab" v-for="(item,index) in headerItems" :class="{active:activeItem==index}" @click="projectOrMember(index)">{{item.name}}</a>
					</div>
					<div class="pull-right">
						<div class="item">
							<el-dropdown @command="handleCommand" trigger="click">
								<span class="el-dropdown-link">
							    {{tasksort}}排序<i class="el-icon-arrow-down el-icon--right"></i>
							  </span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="0">按任务完成率
										<i v-if="checkbox1==0" class="iconfont icon-duihao"></i>
									</el-dropdown-item>
									<el-dropdown-item command="1">按任务逾期率
										<i v-if="checkbox1==1" class="iconfont icon-duihao"></i>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
						<div class="item search">
							<span class="searchIcon">
								<i class="iconfont icon-sousuo"></i>
							</span>
							<input v-if='activeItem==0' class="searchIpt" type="text" placeholder="搜索项目" v-model="keyWords"  @keyup="showSearchDiv"/>
							<input v-if='activeItem==1' class="searchIpt" type="text" placeholder="搜索成员" v-model="keyWords"  @keyup="showSearchDiv"/>
							<div class="searchList" v-show="resultListShow">
								<div class="category">
									<p class="title">{{resultListHL.length}}个搜索结果</p>
									<!--项目搜索-->
									<div v-if='activeItem==0' class="item clearfix" v-for="item in resultListHL" :key="item.index" @click="showDetails(item)">
										<img v-if="item.proimage" :src="item.proimage" alt="">
										<img v-if="item.proimage==''" src="../../assets/images/22登录_01.png" alt="">
										<div class="content">
											<p class="result-title">
												<span v-html="item.proname "></span>
											</p>
										</div>
									</div>
									<!--成员搜索-->
									<div v-if='activeItem==1' class="item clearfix" v-for="item in resultListHL" :key="item.index" @click="showDetails(item)">
										<img v-if="item.useriamge" :src="item.useriamge" alt="">
                                        <div v-if="item.useriamge == ''" class="img imgSearch">{{item.username[0]}}</div>
										<!--<img v-if="item.useriamge==''" src="../../assets/images/22登录_01.png" alt="">-->
										<div class="content">
											<p class="result-title">
												<span v-html="item.username"></span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<!--项目统计-->
				<el-table v-show="showBol" :data="projectTableData" style="width: 100%">
					<el-table-column label="项目">
						<template slot-scope="scope">
							<span class="spanImg">
								<img v-if="scope.row.proimage != ''" :src="scope.row.proimage"/>
								<img v-if="scope.row.proimage == ''" src="../../assets/images/头像.png" />
							</span>
							<span style="margin-left: 10px">{{ scope.row.proname}}</span>
						</template>
					</el-table-column>
					<el-table-column label="成员" width="180">
						<template slot-scope="scope">
							<p>{{ scope.row.peopleCount }}</p>
						</template>
					</el-table-column>
					<el-table-column label="周活跃度">
						<template slot-scope="scope">
							<p>{{ scope.row.proLiveness }}</p>
						</template>
					</el-table-column>
					<el-table-column label="已完成/总任务数">
						<template slot-scope="scope">
							<p>{{ scope.row.taskCompleteCount }}/{{ scope.row.taskCount }}</p>
						</template>
					</el-table-column>
					<el-table-column label="进行中的任务">
						<template slot-scope="scope">
							<div class="task-bar">
								<el-tooltip class="item" effect="dark" placement="top">
									<div slot="content">{{'未开始：' + scope.row.taskNotStartCount}}</div>
									<span class="bg1" :style="'width:'+(scope.row.taskNotStartCount)/(scope.row.taskNotStartCount+scope.row.taskInProgressCount+scope.row.taskNotStartCount+scope.row.taskOverdueCount)*100+'%;'"></span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" :content="'进行中：' + scope.row.taskInProgressCount" placement="top">
									<span class="bg2" :style="'width:'+(scope.row.taskInProgressCount)/(scope.row.taskNotStartCount+scope.row.taskInProgressCount+scope.row.taskNotStartCount+scope.row.taskOverdueCount)*100+'%;'"></span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" :content="'已完成：'+ scope.row.taskNotStartCount" placement="top">
									<span class="bg3" :style="'width:'+(scope.row.taskNotStartCount)/(scope.row.taskNotStartCount+scope.row.taskInProgressCount+scope.row.taskNotStartCount+scope.row.taskOverdueCount)*100+'%;'"></span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" :content="'已逾期：'+ scope.row.taskOverdueCount" placement="top">
									<span class="bg4" :style="'width:'+(scope.row.taskOverdueCount)/(scope.row.taskNotStartCount+scope.row.taskInProgressCount+scope.row.taskNotStartCount+scope.row.taskOverdueCount)*100+'%;'"></span>
								</el-tooltip>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<!--成员统计-->
				<el-table v-show="!showBol" :data="memberTableData" style="width: 100%">
					<el-table-column label="姓名" width="180">
						<template slot-scope="scope">
							<span class="spanImg">
								<img v-if="scope.row.useriamge != ''" :src="scope.row.useriamge"/>
                                <div v-if="scope.row.useriamge == ''" class="img imgList">{{scope.row.username[0]}}</div>
								<!--<img v-if="scope.row.useriamge == ''" src="../../assets/images/头像.png" />	-->
							</span>
							<span style="margin-left: 10px">{{scope.row.username}}</span>
						</template>
					</el-table-column>
					<el-table-column label="参与项目数" width="180">
						<template slot-scope="scope">
							<p>{{ scope.row.projectCount }}</p>
						</template>
					</el-table-column>
					<el-table-column label="已完成/总任务数">
						<template slot-scope="scope">
							<p>{{ scope.row.taskCompleteCount }}/{{ scope.row.taskCount }}</p>
						</template>
					</el-table-column>
					<el-table-column label="进行中的任务">
						<template slot-scope="scope">
							<div class="task-bar">
								<el-tooltip class="item" effect="dark" placement="top">
									<div slot="content">{{'未开始：' + scope.row.taskNotStartCount}}</div>
									<span class="bg1" :style="'width:'+(scope.row.taskNotStartCount)/(scope.row.taskNotStartCount+scope.row.taskInProgressCount+scope.row.taskNotStartCount+scope.row.taskOverdueCount)*100+'%;'"></span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" :content="'进行中：' + scope.row.taskInProgressCount" placement="top">
									<span class="bg2" :style="'width:'+(scope.row.taskInProgressCount)/(scope.row.taskNotStartCount+scope.row.taskInProgressCount+scope.row.taskNotStartCount+scope.row.taskOverdueCount)*100+'%;'"></span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" :content="'已完成：'+ scope.row.taskNotStartCount" placement="top">
									<span class="bg3" :style="'width:'+(scope.row.taskNotStartCount)/(scope.row.taskNotStartCount+scope.row.taskInProgressCount+scope.row.taskNotStartCount+scope.row.taskOverdueCount)*100+'%;'"></span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" :content="'已逾期：'+ scope.row.taskOverdueCount" placement="top">
									<span class="bg4" :style="'width:'+(scope.row.taskOverdueCount)/(scope.row.taskNotStartCount+scope.row.taskInProgressCount+scope.row.taskNotStartCount+scope.row.taskOverdueCount)*100+'%;'"></span>
								</el-tooltip>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="block" style="margin-top: 20px;text-align: center;">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from 'api/http'
	import echarts from '../statistical/echarts'
	import Bus from 'assets/js/Bus.js'
	let pageSize = 0;
	let browserHeight = document.documentElement.clientHeight || window.innerHeight || document.body.offsetHeight
	if(browserHeight>=800){
		pageSize = 7;
	}else if(browserHeight<800){
		pageSize = 5;
	}
	export default {
		components:{
			echarts

		},
		data() {
			return {
				// 查看企业所有项目权限
				lookAllProject: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[6].status,

				checkbox1: 0, //选中打对号
				activeItem: 0, //样式切换
				showBol: true,
				tasksort: '按任务完成率',
				sequence: 1, //1任务完成率排序2逾期率排序
				currentPage3: 1,
				projectTableData: '', //项目统计
				proid: '', //项目id
				memberTableData: '', //成员统计
				uid: '', //成员id
				findUserNameAll: '', //成员搜索全部人员
				checkMember: 0, //成员搜索打对号标志
				resultListShow: false, //搜索
				keyWords: '',
				//当前页数
				pageNum:1,
				//总数
				total: 5,
				//显示几条数据
				pageSize: pageSize,
				resultListHL: '', //搜索数组
				headerItems: [{
					name: "项目统计"
				}, {
					name: '成员统计'
				}],

			}
		},
		methods: {
			//项目统计和成员统计切换
			projectOrMember(index) {
				this.activeItem = index
				this.pageNum = 1
				this.currentPage3=1
				if(this.activeItem==0){
					this.projectItem()
				}else{
					this.menberItem()
				}
			},
			handleCommand(command) {
				//				this.$message('click on item ' + command);
				this.checkbox1 = command
				if(command == 0) {
					this.tasksort = '按任务完成率',
						this.sequence = 1
					if(this.activeItem == 0) {
						this.projectItem()

					} else if(this.activeItem == 1) {
						this.menberItem()
					}
				} else if(command == 1) {
					this.tasksort = '按任务逾期率',
						this.sequence = 2
					if(this.activeItem == 0) {
						this.projectItem()
					} else if(this.activeItem == 1) {
						this.menberItem()
					}
				}
			},
			//加载项目统计列表
			projectItem() {
				let eid = sessionStorage.getItem('enterpriseId');
				let params = {
					sign:this.lookAllProject,
					eid: eid,
					sequence: this.sequence,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					proid: this.proid
				}
				api.get('/Count/getProjectCountList', params).then(res => {
					this.projectTableData = res.data.data.list
					this.total=res.data.data.total
				})
			},
			//加载成员统计列表
			menberItem() {
				let eid = sessionStorage.getItem('enterpriseId');
				let params = {
					eid: eid,
					sequence: this.sequence,
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					uid: this.uid
				}
				api.get('/Count/getUserCountList', params).then(res => {
					this.memberTableData = res.data.data.list
					this.total=res.data.data.total
				})
			},
			// 成员展示全部人员
			menberSreach() {
				let eid = sessionStorage.getItem('enterpriseId');
				let params = {
					eid: eid,
				}
				api.get('/Count/findUserNameAll', params).then(res => {
					this.findUserNameAll = res.data.data
				})
			},
			// 获取全文检索结果
			getSearchList() {
				if(this.activeItem == 0) {
					//项目搜索
					let searchLimit = {
						sign:this.lookAllProject,
						eid: sessionStorage.getItem('enterpriseId'),
						proname: this.keyWords,
					}
					api.get('/Count/findProName', searchLimit).then(res => {
						this.resultListHL = res.data.data
					})

				} else if(this.activeItem == 1) {
					//成员搜索
					let searchLimit = {
						eid: sessionStorage.getItem('enterpriseId'),
						username: this.keyWords,
					}
					api.get('/Count/findUserName', searchLimit).then(res => {
						this.resultListHL = res.data.data
						console.log(res.data.data)
					})
				}
			},
			//
			showSearchDiv(){
				var ipt = this.keyWords
				if(ipt.trim() == '') {
					this.resultListShow = false;
				} else {
					this.resultListShow = true;

				}
			},
			// 显示详情
			showDetails(item) {
				if(this.activeItem == 0) {
					this.proid = item.proid;
					this.keyWords = item.proname;
					this.projectItem()
				} else {
					this.uid = item.uid;
					this.keyWords = item.username;
					this.menberItem()
				}
				this.resultListShow = false;
			},
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		     handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		        this.pageNum = val
		        if(this.activeItem == 0) {
					this.projectItem()
				} else {
					this.menberItem()
				}
		      }
		},
		created() {
//			this.menberItem()
			this.projectItem()
			//接收组件通信信息
			Bus.$on('toCurrentRolePermissions', (msg) => {
				this.lookAllProject = msg.enterprisePermissionList[6].status
			});

		},
		watch: {
			activeItem(val){
				this.showBol = !this.showBol
				this.pageNum = 1
				this.currentPage3=1
			},
			keyWords(newVal, oldVal) {
				if(newVal.trim() != '') {
				} else {
					this.proid = '';
					this.uid = '';

				}
				this.keyWords= newVal
				this.getSearchList(); // 根据关键字获取数据
				if(this.activeItem == 0) {
					this.projectItem()
				} else {
					this.menberItem()
				}
			}
		}
	}
</script>

<style scoped>
	.bg1{
		background: #e7e7e7;
	}
	.bg2{
		background: #9cc9f2;
	}
	.bg3{
		background: #a9dbce;
	}
	.bg4{
		background: #ffc6cd;
	}
	.tabels {
		background: #fff;
		padding: 20px;
		padding-top: 0;
	}

	.header {
		height: 54px;
		padding: 0px 20px;
		border-bottom: 1px solid rgb(217, 217, 217);
		box-sizing: border-box;
		background: #fff;
	}

	.pull-left {
		float: left !important;
	}

	.item.active {
		color: rgb(56, 56, 56);
		border-bottom: 2px solid #0070FE;
	}

	.item.tab {
		position: relative;
		font-size: 16px;
		padding: 15px 4px;
		margin: 0px 28px;
	}

	.header .item {
		display: inline-block;
		cursor: pointer;
	}

	.pull-right {
		float: right !important;
	}

	.pull-right .item {
		padding: 0 10px;
	}

	.contents {
		background: #f1f1f1;
		padding: 20px;
	}

	.task-bar {
		/*background: #f1f1f1;*/
		height: 6px;
		width: 100px;
	}

	.task-bar>span {
		float: left;
		height: 6px;
	}

	.header .item.search {
		position: relative;
		padding: 10px 0px 10px 12px;
	}

	.searchIcon {
		position: absolute;
		top: 15px;
		left: 20px
	}

	.searchIpt {
		height: 30px;
		padding: 0px 13px 0px 28px;
		border-radius: 15px;
		border: 1px solid #f1f1f1;
	}

	.spanImg {
		display: inline-block;
		width: 26px;
		height: 26px;
		border-radius: 26px;
	}

	.spanImg>img {
		width: 100%;
		height: 100%;
		border-radius: 26px;
	}
	/*搜索*/

	.searchList {
		position: absolute;
		width: 200px;
		max-height: 500px;
		line-height: normal;
		background: #fff;
		color: gray;
		font-size: 15px;
		overflow-y: auto;
		border-radius: 2px;
		box-shadow: 0 0 10px #DFDFDF;
		z-index: 9;
	}

	.searchList .category {
		padding: 4px 0;
	}

	.category .title {
		margin: 2px 15px 5px;
		padding-bottom: 5px;
		border-bottom: 1px solid #e5e5e5;
	}

	.category .item {
		padding: 5px 15px;
		box-sizing: border-box;
		cursor: pointer;
	}

	.category .item:hover {
		background-color: #f5f5f5;
	}

	.category .item>* {
		float: left;
	}

	.category .item img {
		width: 30px;
		height: 30px;
		border-radius: 15px;
		margin-right: 12px;
	}

	.category .more {
		font-size: 14px;
	}

	.category .more:hover {
		background-color: #fff;
		color: #3da8f5;
	}

	.item .content {
		display: flex;
		height: 30px;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}

	.content .result-title {
		vertical-align: middle;
	}

	.content .describe {
		font-size: 12px;
		color: #a6a6a6;
	}
    .imgList{
        width:100%;
        height: 100%;
    }
    .imgSearch{
        width: 30px;
        height: 30px;
    }
    .img {
        border-radius: 50%;
        background: #ffae44;
        margin-right: 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: white;
        -webkit-box-shadow: 0 0 10px #E6E6E6;
        box-shadow: 0 0 10px #E6E6E6;
    }
</style>
