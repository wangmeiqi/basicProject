<template>
	<!--简报-->
	<div class="projectBox">
		<!--三级分类-->
		<div class="threeTypeBox">
			<h1>企业项目</h1>
			<el-row style="margin-top: 24px;">
				<el-col :span="24">
					<el-row :class="{typeBox:!typeOneBol,typeBoxShow:typeOneBol}">
						<el-col :span="2">
							<div class="hand">
								<span style="cursor: default;">{{typeOneMes.name}} :</span>
							</div>
						</el-col>
						<el-col :span="21">
							<ul ref="box1">
								<li class="edit" @click="openEditTypeMT(1)"><i class="iconfont icon-bianji1"></i> <span style="cursor: pointer;">编辑</span></li>

								<li v-for="(item, index) in typeOneList" @click="screens(index,1,item.checked)" :class="{typeChecked:item.checked}">
									<span v-if="item.description==''">
										<div slot="content" v-html="changBr(item.description)"></div>
								     	<p>{{item.name}}</p>
									</span>
									<span v-if="item.description!=''">
										<el-tooltip class="item" effect="dark" placement="bottom">
									     	<div slot="content" v-html="changBr(item.description)"></div>
									     	<p>{{item.name}}</p>
									  	</el-tooltip>
									</span>
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
								<span style="cursor: default;">{{typeTwoMes.name}} :</span>
							</div>
						</el-col>
						<el-col :span="21">
							<ul ref="box2">

								<li class="edit" @click="openEditTypeMT(2)"><i class="iconfont icon-bianji1"></i> <span style="cursor: pointer;">编辑</span></li>

								<li v-for="(item, index) in typeTwoList" @click="screens(index,2,item.checked)" :class="{typeChecked:item.checked}">
									<span v-if="item.description==''">
										<div slot="content" v-html="changBr(item.description)"></div>
								     	<p>{{item.name}}</p>
									</span>
									<span v-if="item.description!=''">
										<el-tooltip class="item" effect="dark" placement="bottom">
									     	<div slot="content" v-html="changBr(item.description)"></div>
									     	<p>{{item.name}}</p>
									  	</el-tooltip>
									</span>
								</li>
							</ul>
						</el-col>
						<el-col :span="1">
							<span v-if="typeTwoShow" @click="typeTwoBol=!typeTwoBol" class="hand">{{typeTwoBol | fold}} <i v-if="typeTwoBol" class="el-icon-arrow-up"></i><i v-if="!typeTwoBol" class="el-icon-arrow-down"></i></span>
						</el-col>
					</el-row>
					<el-row :class="{typeBox:!typeThreeBol,typeBoxShow:typeThreeBol}">
						<el-col :span="2">
							<div class="hand">
								<span style="cursor: default;">{{typeThreeMes.name}} :</span>
							</div>
						</el-col>
						<el-col :span="21">
							<ul ref="box3">

								<li class="edit" @click="openEditTypeMT(3)"><i class="iconfont icon-bianji1"></i> <span style="cursor: pointer;">编辑</span></li>

								<li v-for="(item, index) in typeThreeList" @click="screens(index,3,item.checked)" :class="{typeChecked:item.checked}">
									<span v-if="item.description==''">
										<div slot="content" v-html="changBr(item.description)"></div>
								     	<p>{{item.name}}</p>
									</span>
									<span v-if="item.description!=''">
										<el-tooltip class="item" effect="dark" placement="bottom">
									     	<div slot="content" v-html="changBr(item.description)"></div>
									     	<p>{{item.name}}</p>
									  	</el-tooltip>
									</span>
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
		<!--简报预览-->
		<div class="projectBody">
			<div class="left">
				<div class="top">
					<p style="color: #333333;font-size: 14px;">项目列表</p>
					<p style="cursor: pointer;" @click="allChecked">全选</p>
				</div>
				<div class="center">
					<ul>
						<li v-for="(item,index) in projectList">
							<i @click="screenPro(index)" v-show="item.checked" class="iconfont icon-duoxuankuang2"></i>
							<i @click="screenPro(index)" v-show="!item.checked" class="iconfont icon-xuanzekuang"></i>
							<img v-if="item.image == ''" src="../../assets/images/22登录_01.png" />
							<img v-if="item.image != ''" :src="item.image" />
							<span>{{item.name}}</span>
						</li>
					</ul>
				</div>
				<button class="preview" @click="preview">预览</button>
			</div>
			<div class="right">
				<div style="height: 64px;">
					<button class="previews" @click="exports">导出</button>
				</div>
				<!--<ul class="ui-title">
					<li>重点工程项目</li>
					<li>项目</li>
					<li>执行人</li>
					<li>周进展</li>
				</ul>-->
				<el-table ref="tableEl" :data="MergeData" :span-method="arraySpanMethod" border style="width: 100%">
					<el-table-column prop="oneName" label="项目名称">
						<template slot-scope="scope">
							<p v-html="scope.row.projectName"></p>
						</template>
					</el-table-column>
					<el-table-column prop="twoName" label="任务分类">
						<template slot-scope="scope">
							<p>
								{{scope.row.className | cutStr}}
							</p>
						</template>
					</el-table-column>
					<el-table-column prop="threeName" label="任务拆解" width="300">
						<template slot-scope="scope">
							<p v-html="scope.row.taskName"></p>
						</template>
					</el-table-column>
					<el-table-column prop="projectName" label="最新进展" width="300">
						<template slot-scope="scope">
							<p v-html="scope.row.content"></p>
						</template>
					</el-table-column>
					<el-table-column prop="userName" label="完成进度">
						<template slot-scope="scope">
							<p>
								{{scope.row.progress + '%'}}
							</p>
						</template>
					</el-table-column>
					<el-table-column prop="content" label="备注">
						<template slot-scope="scope">
							<p v-html="scope.row.remark"></p>
						</template>
					</el-table-column>
					<!--<el-table-column prop="content"  label="负责人">
						<template slot-scope="scope">
							<p v-html="scope.row.proUser"></p>
					    </template>
					</el-table-column>-->
					<el-table-column prop="content" label="执行人">
						<template slot-scope="scope">
							<p v-html="scope.row.username"></p>
						</template>
					</el-table-column>
					<el-table-column prop="content" :label="oneName">
						<template slot-scope="scope">
							<p v-html="scope.row.oneName"></p>
						</template>
					</el-table-column>
					<el-table-column prop="content" :label="twoName">
						<template slot-scope="scope">
							<p v-html="scope.row.twoName"></p>
						</template>
					</el-table-column>
					<el-table-column prop="content" :label="threeName">
						<template slot-scope="scope">
							<p v-html="scope.row.threeName"></p>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination style="text-align: center;padding-top:20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pages" layout="prev, pager, next, jumper" :total="totalPages">

				</el-pagination>
			</div>
		</div>

		<!--新增分类-->
		<el-dialog :append-to-body="true" title="项目管理分类" :visible.sync="editTypeBol" width="430px" center>
			<div class="MTbox" style="overflow: inherit;height: auto;">
				<el-row class="editRow">
					<el-col :span="24">
						<el-input placeholder="输入项目分类名称" v-model="editTypemsg.name" class="input-with-select">
							<el-button @click="addType" style="background: #077ce6;color: white;border-radius: 0 2px 2px 0;border:1px solid #077ce6" slot="append" type="primary">添加</el-button>
						</el-input>
					</el-col>
				</el-row>
				<el-row class="editRow">
					<el-col :span="24">
						<el-input placeholder="输入项目分类描述" v-model="editTypemsg.describe" class="input-with-select">
						</el-input>
					</el-col>
				</el-row>
				<el-row class="editRow">
					<el-col :span="24">
						<h3><span>企业项目分类</span></h3>
					</el-col>
				</el-row>
				<el-row class="editRow">
					<el-col :span="24">
						<ul>
							<li class="typeList" v-for="(item,index) in editTypeList">
								<div>
									<i class="iconfont icon-xiangmuguanli"></i>
									<span>{{item.name}}</span>
								</div>
								<div>
									<span style="position: relative;">
										<i @click="editTypeBox(index)" class="iconfont icon-bianji"></i>
										<div class="editType" v-show="item.editBol">
											<el-row style="margin-bottom: 14px;border-bottom: 2px solid #efefef;">
												<el-col :span="2">&nbsp;</el-col>
												<el-col :span="20" style="font-size: 14px;display: flex;justify-content: center;align-items: center;">
													<span>编辑项目分类</span>
					</el-col>
					<el-col :span="2">
						<i @click="item.editBol = false" class="iconfont icon-guanbi" style="font-size: 12px;"></i>
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 7px;">
					<el-col :span="24">
						<el-input v-model="smallEditTypemsg.name" placeholder="输入项目分类名称"></el-input>
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 14px;">
					<el-col :span="24">
						<el-input v-model="smallEditTypemsg.describe" type="textarea" :rows="2" placeholder="输入项目分类描述"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<button class="redBtn" @click="editType(index)">确定</button>
					</el-col>
				</el-row>
				</div>
				</span>
				<i @click="delType(item)" class="iconfont icon-shanchu1"></i>
				<i @click="typeSort(index)" class="iconfont icon-paixusheng"></i>
			</div>
			</li>
			</ul>
			</el-col>
			</el-row>
	</div>
	</el-dialog>

	</div>
</template>

<script>
	import API from 'api/http'
	import { mapGetters, mapMutations } from 'vuex'
	import Bus from 'assets/js/Bus.js'
	export default {
		computed: {
			...mapGetters({
				getEnterpriseId: 'GET_ENTERPRISEID'
			})
		},
		data() {
			return {
				// 查看企业所有项目权限
				lookAllProject: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[6].status,

				//当前页
				currentPage: 1,
				//总页数
				totalPages: 0,
				//一页有几个
				pages: 4,
				//全选的标识
				allBol: false,
				//左侧的项目选项
				projectList: [],
				//分类的名称
				typeOneMes: {},
				typeTwoMes: {},
				typeThreeMes: {},

				oneName: '',
				twoName: '',
				threeName: '',
				//分类的选项框
				typeOneList: [],
				typeTwoList: [],
				typeThreeList: [],

				//编辑的分类列表
				editTypeOneList: [],
				editTypeTwoList: [],
				editTypeThreeList: [],

				//超出一行隐藏
				typeOneBol: true,
				typeTwoBol: true,
				typeThreeBol: true,

				//是否显示展开收起
				typeoneShow: true,
				typeTwoShow: true,
				typeThreeShow: true,

				//编辑分类的模态框
				editTypeBol: false,
				//编辑分类的模态框的信息
				editTypemsg: {
					name: '',
					describe: ''
				},
				smallEditTypemsg: {
					name: '',
					describe: ''
				},
				//编辑分类的模态框的列表
				editTypeList: [],
				//编辑分类的模态框的标识
				editFlag: 1,

				//

				//合并单元格要的数据
				MergeData: [],
				//				oneNameRow:[], //记录onename哪几行需要合并
				//				oneNameMerge:[],//记录onename需要合并几行
				//				oneNameHidden:[],
				//				twoNameRow:[],
				//				twoNameMerge:[],
				//				twoNameHidden:[],
				//				threeNameRow:[],
				//				threeNameMerge:[],
				//				threeNameHidden:[],
				newClassRow: [],
				newClassMerge: [],
				newClassHidden: [],
				rows: [],
				merges: [],
				hidden: [],
				oldContent: '', //旧数据
				merge: 1, //合并的列数

				proIds: '',
				dataProIds: ''

			}
		},
		filters: {
			//展开收起
			fold(bol) {
				if(bol) {
					return '收起'
				} else {
					return '展开'
				}
			},
			cutStr(val) {
				return val.substr(0, val.length - 2)
			}
		},
		methods: {
			//打开分类编辑
			editTypeBox(index) {
				console.log(index)
				let editOldIndex = this.editTypeList.findIndex(el => {
					return el.editBol == true
				})
				this.editTypeList[editOldIndex == -1 ? 0 : editOldIndex].editBol = false
				this.editTypeList[index].editBol = true
				this.smallEditTypemsg.name = this.editTypeList[index].name
				this.smallEditTypemsg.description = this.editTypeList[index].description
			},
			//预览
			preview() {
				this.currentPage = 1
				this.getPreviewData(this.proIds)
				this.dataProIds = this.proIds
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			//筛选项目
			screenPro(index) {
				if(!isNaN(index)) {
					this.projectList[index].checked = !this.projectList[index].checked
				}

				this.proIds = ''
				this.projectList.map(el => {
					if(el.checked) {
						this.proIds += el.id + ','
					}
				})
				this.proIds = this.proIds.substr(0, this.proIds.length - 1)
				console.log(this.proIds.substr(0, this.proIds.length - 1))
			},
			//导出
			exports() {
				console.log(API.ip + '/exPort/ex?eid=' + sessionStorage.getItem('enterpriseId') + '&ids=')
				location.href = API.ip + '/exPort/ex?eid=' + sessionStorage.getItem('enterpriseId') + '&ids=' + this.proIds
			},
			//获取预览数据
			getPreviewData(ids) {
				API.get('/projects/getAllProject', {
					eid: sessionStorage.getItem('enterpriseId'),
					page: this.currentPage,
					size: this.pages,
					ids: ids
				}).then(res => {
					//					this.oneNameRow = []
					//					this.oneNameMerge = []
					//					this.oneNameHidden = []
					//					this.twoNameRow = []
					//					this.twoNameMerge = []
					//					this.twoNameHidden = []
					//					this.threeNameRow = []
					//					this.threeNameMerge = []
					//					this.threeNameHidden =[]
					//					this.oldContent = 'qwewq@eqwewq'
					//					this.merge = 1
					//					
					//					this.MergeData = []
					//					this.totalPages = res.data.data.total
					//					let arr = res.data.data.list
					//					for(let i in arr){
					//						if(arr[i].oneName.trim() != this.oldContent){
					//							if(i != 0){
					//								this.oneNameMerge.push(this.merge)
					//								this.merge = 1
					//							}
					//							this.oldContent = arr[i].oneName.trim()
					//							this.oneNameRow.push(i)
					//						}else if(arr[i].oneName.trim() == this.oldContent){
					//							this.merge++
					//							this.oneNameHidden.push(i)
					//						}
					//					}
					//					this.oneNameMerge.push(this.merge)
					//					this.oldContent = 'qwewqe&qwewq'
					//					this.merge = 1
					//					for(let i in arr){	
					//						if(arr[i].twoName.trim() != this.oldContent){
					//							if(i != 0){
					//								this.twoNameMerge.push(this.merge)
					//								this.merge = 1
					//							}
					//							this.oldContent = arr[i].twoName.trim()
					//							this.twoNameRow.push(i)
					//						}else if(arr[i].twoName.trim() == this.oldContent){
					//							this.merge++
					//							this.twoNameHidden.push(i)
					//						}
					//						
					//					}
					//					this.twoNameMerge.push(this.merge)
					//					this.oldContent = 'qwewq$eqwewq'
					//					this.merge = 1
					//					for(let i in arr){	
					//						if(arr[i].threeName.trim() != this.oldContent){
					//							if(i != 0){
					//								this.threeNameMerge.push(this.merge)
					//								this.merge = 1
					//							}
					//							this.oldContent = arr[i].threeName.trim()
					//							this.threeNameRow.push(i)
					//						}else if(arr[i].threeName.trim() == this.oldContent){
					//							this.merge++
					//							this.threeNameHidden.push(i)
					//						}
					//						
					//					}
					//					this.threeNameMerge.push(this.merge)
					//					for(let i in arr){
					//						let obj = {}
					//						for(let j in arr[i]){
					//							console.log(arr[i][j].toString())
					//							obj[j] = arr[i][j].toString().replace(/(\r\n)|(\n)/g,'<br>')
					//						}
					//						console.log(obj)
					//						this.MergeData.push(obj)
					//					}
					//					console.log(this.MergeData)

					this.newClassRow = []
					this.newClassMerge = []
					this.newClassHidden = []
					this.rows = []
					this.merges = []
					this.hidden = []
					this.oldContent = 'qwewq@eqwewq'
					this.merge = 1

					this.MergeData = []
					this.totalPages = res.data.data.total
					let arr = res.data.data.list
					for(let i in arr) {
						if(arr[i].className.trim() != this.oldContent) {
							if(i != 0) {
								this.newClassMerge.push(this.merge)
								this.merge = 1
							}
							this.oldContent = arr[i].className.trim()
							this.newClassRow.push(i)
						} else if(arr[i].className.trim() == this.oldContent) {
							this.merge++
								this.newClassHidden.push(i)
						}
					}
					this.newClassMerge.push(this.merge)
					this.oldContent = 'qwewqe&qwewq'
					this.merge = 1
					for(let i in arr) {
						if(arr[i].projectName.trim() != this.oldContent) {
							if(i != 0) {
								this.merges.push(this.merge)
								this.merge = 1
							}
							this.oldContent = arr[i].projectName.trim()
							this.rows.push(i)
						} else if(arr[i].projectName.trim() == this.oldContent) {
							this.merge++
								this.hidden.push(i)
						}

					}
					this.merges.push(this.merge)
					for(let i in arr) {
						let obj = {}
						for(let j in arr[i]) {
							console.log(arr[i][j].toString())
							obj[j] = arr[i][j].toString().replace(/(\r\n)|(\n)/g, '<br>')
						}
						console.log(obj)
						this.MergeData.push(obj)
					}
					console.log(this.MergeData)

				})
			},
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				for(let i in this.newClassMerge) {
					if(rowIndex == this.newClassRow[i] && columnIndex == 1) {
						return [this.newClassMerge[i], 1];
					}
				}
				for(let i in this.newClassHidden) {
					if(rowIndex == this.newClassHidden[i] && columnIndex == 1) {
						return [0, 0];
					}
				}

				for(let i in this.merges) {
					if(rowIndex == this.rows[i] && columnIndex == 0) {
						return [this.merges[i], 1];
					}
				}
				for(let i in this.hidden) {
					if(rowIndex == this.hidden[i] && columnIndex == 0) {
						return [0, 0];
					}
				}

				for(let i in this.merges) {
					if(rowIndex == this.rows[i] && columnIndex == 7) {
						return [this.merges[i], 1];
					}
				}
				for(let i in this.hidden) {
					if(rowIndex == this.hidden[i] && columnIndex == 7) {
						return [0, 0];
					}
				}

				for(let i in this.merges) {
					if(rowIndex == this.rows[i] && columnIndex == 8) {
						return [this.merges[i], 1];
					}
				}
				for(let i in this.hidden) {
					if(rowIndex == this.hidden[i] && columnIndex == 8) {
						return [0, 0];
					}
				}

				for(let i in this.merges) {
					if(rowIndex == this.rows[i] && columnIndex == 9) {
						return [this.merges[i], 1];
					}
				}
				for(let i in this.hidden) {
					if(rowIndex == this.hidden[i] && columnIndex == 9) {
						return [0, 0];
					}
				}

				for(let i in this.merges) {
					if(rowIndex == this.rows[i] && columnIndex == 10) {
						return [this.merges[i], 1];
					}
				}
				for(let i in this.hidden) {
					if(rowIndex == this.hidden[i] && columnIndex == 10) {
						return [0, 0];
					}
				}

			},
			//描述换行
			changBr(str) {
				let newStr = ''
				for(let i = 0; i < str.length; i++) {
					if((i + 1) % 30 == 0) {
						newStr += str[i] + '<br />'
					} else {
						newStr += str[i]
					}
				}
				return newStr
			},
			//全选功能
			allChecked() {
				this.projectList.map(el => {
					el.checked = !this.allBol
				})
				this.allBol = !this.allBol
				this.screenPro(NaN)
			},
			//获取项目列表
			getProjectList() {
				API.get('/projects/getProjectList', {
					state: this.lookAllProject, //查询所有项目and 查询相关项目
					eid: sessionStorage.getItem("enterpriseId")
				}).then(res => {
					this.projectList = []
					res.data.data.map(el => {
						this.$set(el, 'checked', false);
						if(el.file == 0) {
							this.projectList.push(el)
						} else if(el.file == 1) {
							this.fileProjectList.push(el)
						}
					})
				})
			},
			//修改分类信息
			editType(index) {
				let pid = 0;
				if(this.editFlag == 1) {
					pid = this.typeOneMes.id
				} else if(this.editFlag == 2) {
					pid = this.typeTwoMes.id
				} else if(this.editFlag == 3) {
					pid = this.typeThreeMes.id
				}
				if(this.smallEditTypemsg.name.trim() != '') {
					API.post('/enterpriseDictionaries/ishave', {
						eid: sessionStorage.getItem('enterpriseId'),
						name: this.smallEditTypemsg.name,
						parentId: pid
					}).then(res => {
						if(res.data.data) {
							API.post('/enterpriseDictionaries/editDic', {
								eid: sessionStorage.getItem("enterpriseId"),
								pid: pid,
								name: this.smallEditTypemsg.name,
								description: this.smallEditTypemsg.describe,
								dicId: this.editTypeList[index].dicId,
								id: this.editTypeList[index].id,
								sort: this.editTypeList[index].sort
							}).then(res => {
								this.typeOneBol = true
								this.typeTwoBol = true
								this.typeThreeBol = true
								this.getThreeType()
								this.$notify({
									title: '成功',
									message: '修改成功',
									type: 'success'
								});
							})
						} else {
							this.$notify({
								title: '警告',
								message: '您输入的与其他分类重名，请修改',
								type: 'warning'
							});
						}
					})
				} else {
					this.$notify({
						title: '警告',
						message: '分类名称不能为空',
						type: 'warning'
					});
				}

			},
			//删除分类
			delType(item) {
				API.post('/enterpriseDictionaries/delDic', {
					id: item.id,
					dicId: item.dicId
				}).then(res => {
					this.getThreeType()
				})
			},
			//添加分类
			addType() {
				let pid = 0;
				if(this.editFlag == 1) {
					pid = this.typeOneMes.id
				} else if(this.editFlag == 2) {
					pid = this.typeTwoMes.id
				} else if(this.editFlag == 3) {
					pid = this.typeThreeMes.id
				}
				if(this.editTypemsg.name.trim() != '') {
					API.post('/enterpriseDictionaries/ishave', {
						eid: sessionStorage.getItem('enterpriseId'),
						name: this.editTypemsg.name,
						parentId: pid
					}).then(res => {
						if(res.data.data) {
							API.post('/enterpriseDictionaries/addDic', {
								eid: sessionStorage.getItem("enterpriseId"),
								pid: pid,
								name: this.editTypemsg.name,
								description: this.editTypemsg.describe
							}).then(res => {
								this.typeOneBol = true
								this.typeTwoBol = true
								this.typeThreeBol = true
								this.getThreeType()
								this.editTypemsg.name = ''
								this.editTypemsg.describe = ''
								this.$notify({
									title: '成功',
									message: '添加成功',
									type: 'success'
								});
							})
						} else {
							this.$notify({
								title: '警告',
								message: '您输入的与其他分类重名，请修改',
								type: 'warning'
							});
						}
					})
				} else {
					this.$notify({
						title: '警告',
						message: '分类名称不能为空',
						type: 'warning'
					});
				}

			},
			//打开编辑模态框
			openEditTypeMT(flag) {
				this.editTypemsg.name = ''
				this.editTypemsg.describe = ''
				this.editFlag = flag
				this.editTypeBol = true
				this.editTypeList = []
				if(this.editFlag == 1) {
					this.editTypeOneList.map(el => {
						this.editTypeList.push(el)
					})
				} else if(this.editFlag == 2) {
					this.editTypeTwoList.map(el => {
						this.editTypeList.push(el)
					})
				} else if(this.editFlag == 3) {
					this.editTypeThreeList.map(el => {
						this.editTypeList.push(el)
					})
				}
			},
			//筛选项目
			screens(index, flag, checked) {
				let oneIds = '';
				let twoIds = '';
				let threeIds = '';
				if(flag == 1) {
					this.typeOneList[index].checked = !this.typeOneList[index].checked
					this.typeTwoList = []
					this.typeThreeList = []
				} else if(flag == 2) {
					this.typeTwoList[index].checked = !this.typeTwoList[index].checked
					this.typeThreeList = []
				} else if(flag == 3) {
					this.typeThreeList[index].checked = !this.typeThreeList[index].checked
				}

				this.typeOneList.map(el => {
					if(el.checked) {
						oneIds += el.dicId + ','
					}
				})
				this.typeTwoList.map(el => {
					if(el.checked) {
						twoIds += el.dicId + ','
					}
				})
				this.typeThreeList.map(el => {
					if(el.checked) {
						threeIds += el.dicId + ','
					}
				})
				let send = false
				if(oneIds == '' && twoIds == '' && threeIds == '') {
					send = true
				}

				if(send) {
					this.getThreeType()
				}
				API.post('/projects/queryProjectByLable', {
					oneIds: oneIds.substr(0, oneIds.length - 1),
					twoIds: twoIds.substr(0, twoIds.length - 1),
					threeIds: threeIds.substr(0, threeIds.length - 1),
					eid: sessionStorage.getItem("enterpriseId")
				}).then(res => {
					//筛选项目
					this.projectList = []
					res.data.data.project.map(el => {
						this.$set(el, 'checked', false);
						this.projectList.push(el)
					})

					//二级分类 三级分类 联动
					if(flag == 1 || flag == 2) {
						res.data.data.dics.map(el => {
							if(el.zsort == 1 && flag != 1) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeOneList.push(el)
							} else if(el.zsort == 2 && flag != 2) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeTwoList.push(el)
							} else if(el.zsort == 3 && flag != 3) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeThreeList.push(el)
							}
						})
					} else if(flag == 3) {
						res.data.data.dics.map(el => {
							if(el.zsort == 3 && flag != 3) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeThreeList.push(el)
							}
						})
					}

					this.$nextTick(() => {
						if(this.$refs.box1.offsetHeight > 40) {
							this.typeoneShow = true
							this.typeOneBol = false
						} else {
							this.typeoneShow = false
							this.typeOneBol = false
						}

						if(this.$refs.box2.offsetHeight > 40) {
							this.typeTwoShow = true
							this.typeTwoBol = false
						} else {
							this.typeTwoShow = false
							this.typeTwoBol = false
						}

						if(this.$refs.box3.offsetHeight > 40) {
							this.typeThreeShow = true
							this.typeThreeBol = false
						} else {
							this.typeThreeShow = false
							this.typeThreeBol = false
						}
					})

					//标签选中
					//					let tabs = res.data.data.dics
					//					for(let i=0;i<tabs.length;i++) {
					//						if(tabs[i].zsort == 1 && flag != 1){
					//							let index = this.typeOneList.findIndex(el => {
					//								return tabs[i].dicId == el.dicId
					//							})
					//							this.typeOneList[index].checked = true
					//						}else if(tabs[i].zsort == 2 && flag != 2){
					//							let index = this.typeTwoList.findIndex(el => {
					//								return tabs[i].dicId == el.dicId
					//							})
					//							this.typeTwoList[index].checked = true
					//						}else if(tabs[i].zsort == 3 && flag != 3){
					//							let index = this.typeThreeList.findIndex(el => {
					//								return tabs[i].dicId == el.dicId
					//							})
					//							this.typeThreeList[index].checked = true
					//						}
					//					}

				})
			},
			//获取三级分类
			getThreeType() {
				if(sessionStorage.getItem("enterpriseId")) {
					API.get('/enterpriseDictionaries/getenterpriseDictionaries', {
						eid: sessionStorage.getItem("enterpriseId")
					}).then(res => {
						this.typeOneBol = true
						this.typeTwoBol = true
						this.typeThreeBol = true
						console.log(res)
						this.typeOneMes = res.data.data[0]
						this.typeTwoMes = res.data.data[1]
						this.typeThreeMes = res.data.data[2]
						this.oneName = res.data.data[0].name
						this.twoName = res.data.data[1].name
						this.threeName = res.data.data[2].name

						//初始化选项
						this.typeOneList = []
						this.typeOneListMT = []
						this.editTypeOneList = []
						res.data.data[0].enterpriseDictionariesList.map(el => {
							this.$set(el, 'checked', false);
							this.$set(el, 'editBol', false);
							this.typeOneList.push(el)
							this.typeOneListMT.push(el)
							this.editTypeOneList.push(el)
						})
						this.typeTwoList = []
						this.typeTwoListMT = []
						this.editTypeTwoList = []
						res.data.data[1].enterpriseDictionariesList.map(el => {
							this.$set(el, 'checked', false);
							this.$set(el, 'editBol', false);
							this.typeTwoList.push(el)
							this.typeTwoListMT.push(el)
							this.editTypeTwoList.push(el)
						})
						this.typeThreeList = []
						this.typeThreeListMT = []
						this.editTypeThreeList = []
						res.data.data[2].enterpriseDictionariesList.map(el => {
							this.$set(el, 'checked', false);
							this.$set(el, 'editBol', false);
							this.typeThreeList.push(el)
							this.typeThreeListMT.push(el)
							this.editTypeThreeList.push(el)
						})
						this.typeOneListMT.unshift({
							dicId: '',
							name: '请选择' + this.typeOneMes.name
						})
						this.typeTwoListMT.unshift({
							dicId: '',
							name: '请选择' + this.typeTwoMes.name
						})
						this.typeThreeListMT.unshift({
							dicId: '',
							name: '请选择' + this.typeThreeMes.name
						})
						this.editTypeList = []
						if(this.editFlag == 1) {
							this.typeOneList.map(el => {
								this.editTypeList.push(el)
							})
						} else if(this.editFlag == 2) {
							this.typeTwoList.map(el => {
								this.editTypeList.push(el)
							})
						} else if(this.editFlag == 3) {
							this.typeThreeList.map(el => {
								this.editTypeList.push(el)
							})
						}
						this.$nextTick(() => {
							if(this.$refs.box1.offsetHeight >= 40) {
								this.typeoneShow = true
								this.typeOneBol = false
							} else {
								this.typeoneShow = false
								this.typeOneBol = false
							}

							if(this.$refs.box2.offsetHeight >= 40) {
								this.typeTwoShow = true
								this.typeTwoBol = false
							} else {
								this.typeTwoShow = false
								this.typeTwoBol = false
							}

							if(this.$refs.box3.offsetHeight >= 40) {
								this.typeThreeShow = true
								this.typeThreeBol = false
							} else {
								this.typeThreeShow = false
								this.typeThreeBol = false
							}
						})
					})
				}

			},

			//分类向上排序
			typeSort(index) {
				if(index != 0) {
					API.post('/enterpriseDictionaries/sortDic', {
						yId: this.editTypeList[index].id,
						tId: this.editTypeList[index - 1].id,
						ysort: this.editTypeList[index].sort,
						tsort: this.editTypeList[index - 1].sort
					}).then(res => {
						this.getThreeType()
					})
				}
			},
			...mapMutations({
				addPath: 'ADD_PATH',
				popPath: 'POP_PATH',
				setBackHome: 'SET_BACKHOME'
			})
		},
		watch: {
			getEnterpriseId(val1, val2) {
				if(!isNaN(val2)) {
					this.getThreeType()
				}
				this.getProjectList()
				this.$router.push({
					path: '/home'
				})
			},
			currentPage() {
				this.getPreviewData(this.dataProIds)
			}
		},
		//初始化
		created() {
			this.getThreeType()
			this.getProjectList()
			this.getPreviewData(this.dataProIds)
			this.popPath(0)

			//接收组件通信信息
			Bus.$on('toCurrentRolePermissions', (msg) => {
				this.lookAllProject = msg.enterprisePermissionList[6].status
			});
		}
	}
</script>

<style scoped>
	.projectBox {
		/*width: 100%;*/
		padding: 85px 10px 0 10px;
		height: 88vh;
		overflow: auto;
		background: #f7f7f7;
	}
	
	.projectBox .threeTypeBox {
		background: white;
		padding: 16px 40px 22px 40px;
	}
	
	.projectBox::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: #f5f5f5;
	}
	
	.projectBox h1 {
		font-size: 16px;
	}
	
	.projectBox h1 span {
		color: #999999;
		font-size: 14px;
		margin-left: 20px;
		cursor: pointer;
	}
	
	.typeBox,
	.typeBoxShow {
		margin-bottom: 12px;
		border-bottom: 2px dashed #e9e9e9;
	}
	
	.typeBox ul {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		height: 36px;
		overflow: hidden;
	}
	
	.typeBox ul>li {
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
		cursor: pointer;
	}
	
	.typeBoxShow ul {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}
	
	.typeBoxShow ul>li {
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
	
	.typeChecked {
		background: #077ce7 !important;
		color: white !important;
	}
	
	.hand {
		cursor: pointer;
		font-size: 14px;
		color: #999999;
		margin-top: 4px;
	}
	
	.projectBody {
		margin-top: 10px;
		width: 100%;
		height: 98%;
		/*flex-wrap: wrap;*/
	}
	
	.projectBody .left {
		padding: 20px 35px 0 35px;
		width: 204px;
		height: 100%;
		background: white;
		color: #888888;
		font-size: 12px;
		float: left;
	}
	
	.projectBody .left .top {
		display: flex;
		justify-content: space-between;
	}
	
	.projectBody .left .preview {
		border: none;
		color: white;
		font-size: 14px;
		width: 190px;
		height: 32px;
		background: #077ce7;
		border-radius: 4px;
		margin-top: 20px;
		cursor: pointer;
	}
	
	.projectBody .left .center {
		margin-top: 22px;
		width: 100%;
		height: 70%;
		overflow: auto;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
	
	.projectBody .left .center::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.projectBody .left .center::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/
	
	.projectBody .left .center::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}
	
	.projectBody .left .center li {
		display: flex;
		align-items: center;
		margin-top: 20px;
	}
	
	.projectBody .left .center li img {
		width: 28px;
		height: 28px;
		border-radius: 2px;
		margin-left: 10px;
		margin-right: 8px;
	}
	
	.projectBody .right {
		/*width:81vw;*/
		/*height: 100%;*/
		margin-left: 285px;
		background: white;
		/*float: left;*/
	}
	
	.projectBody .right .previews {
		border: none;
		color: white;
		font-size: 14px;
		width: 100px;
		height: 32px;
		background: #077ce7;
		border-radius: 4px;
		float: right;
		margin: 15px 45px 15px 0;
		cursor: pointer;
	}
	
	.MTbox {
		width: 100%;
		height: 60vh;
		overflow: auto;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
	
	.MTbox::-webkit-scrollbar {
		width: 0px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.MTbox::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/
	
	.MTbox::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}
	
	.editRow {
		margin-top: 30px;
	}
	
	.editRow h3 {
		border-bottom: 2px solid #efefef;
		font-size: 14px;
		padding-bottom: 7px;
		color: #999999;
	}
	
	.editRow h3 span {
		border-bottom: 2px solid #007be5;
		padding-bottom: 10px;
	}
	
	.editRow .typeList {
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 40px;
		color: #999999;
	}
	
	.editRow .typeList>div:nth-child(1) i {
		margin-right: 1px;
	}
	
	.editRow .typeList>div:nth-child(2) i {
		margin-left: 14px;
	}
	
	.editRow .typeList>div:nth-child(2) i:hover {
		margin-left: 14px;
		color: #017ae6;
	}
	
	.editRow .typeList>div:nth-child(2) .editType {
		position: absolute;
		width: 260px;
		background: white;
		z-index: 10;
		left: 0px;
		padding: 0 20px;
		border-radius: 6px;
		box-shadow: 0px 0px 10px #999999;
	}
	
	.editRow .typeList>div:nth-child(2) .editType:hover {
		color: #999999;
	}
	
	.redBtn {
		width: 100%;
		background: #ef5521;
		height: 28px;
		color: white;
		border-radius: 4px;
		border: none;
		outline: none;
	}
	
	.ui-title {
		height: 47px;
		line-height: 47px;
		border: 1px solid #ebeef5;
		border-left: 0;
		border-right: 0;
		border-bottom: 0;
		font-size: 14px;
		color: #606266;
		width: 100%;
	}
	
	.ui-title li {
		float: left;
		border-right: 1px solid #ebeef5;
		padding: 0 10px;
		width: 14.44%;
	}
	
	.ui-title li:nth-child(1) {
		width: 48.2%;
		text-align: center;
	}
	
	.ui-title li:nth-child(4) {
		border-right: 0;
	}
	
	.edit {
		cursor: pointer;
	}
	
	.edit:hover {
		background: #077ce7;
		color: white;
	}
	
	.icon-duoxuankuang2 {
		width: 16px;
	}
	
	.icon-duoxuankuang2:before {
		content: "\e677";
		margin-left: -6px;
		color: #0886fa
	}
</style>