<template>
	<div class="projectBox">
		<vaddfield v-show="addfieldBol" :addfieldBol="addfieldBol" @closes="closeAddField"></vaddfield>
		<edittasktype :edittasktypeBol="edittasktypeBol" :taskTypeId="taskTypeId" v-show="edittasktypeBol" @closes="closeAddField"></edittasktype>
		<!--项目编辑-->
		<el-dialog :append-to-body="true" title="项目设置" :visible.sync="editProBol" width="810px" center>
			<div class="MTbox" style="width: 808px;margin-left: -26px;overflow: inherit;">
				<div class="editBox">
					<div class="leftNav">
						<ul>
							<li :class="{check:editProFlag==nav.flag}" v-for="nav in editProLeftList" class="nav" @click="navSkip(nav.flag)">
								<i :class="nav.icon"></i> {{nav.name}}
							</li>
						</ul>
					</div>
					<div class="rightMain">
						<div class="box" v-if="editProFlag == 1">
							<!--项目信息-->
							<!--<el-row>
								<el-col :span="24">
									<i class="iconfont icon-icon13" style="color: #077ce7;"></i>
									<span style="color: #077ce7;">您暂时没有权限修改此处设置，请联系拥有者修改</span>
								</el-col>
							</el-row>-->
							<el-row>
								<el-col :span="24" class="proMesRow">
									<h3>项目封面</h3>
									<div style="display: flex;align-items: flex-end;">
										<div class="fengmian">
											<img v-if="proMes.image!=''" :src="proMes.image"/>
											<img v-if="proMes.image==''" src="../assets/images/back.png"/>
										</div>
										<div style="margin-left: 12px;">
											<up-load @sendBase64="changeProBg">上传封面</up-load>
										</div>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="proMesRow">
									<h3>项目名称</h3>
									<el-input v-model="proMes.name" placeholder="项目名称"></el-input>
								</el-col>
							</el-row>
							<el-row :gutter="20">
								<el-col :span="8" class="proMesRow">
									<h3>项目分类</h3>
									<el-select v-model="proMes.oneId" :placeholder="typeOneMes.name">
									    <el-option
									      v-for="item in typeOneListMT"
									      :key="item.dicId"
									      :label="item.name"
									      :value="item.dicId">
									    </el-option>
									</el-select>
								</el-col>
								<el-col :span="8" class="proMesRow">
									<h3>&nbsp;</h3>
									<el-select v-model="proMes.twoId" :placeholder="typeTwoMes.name">
									    <el-option
									      v-for="item in typeTwoListMT"
									      :key="item.dicId"
									      :label="item.name"
									      :value="item.dicId">
									    </el-option>
									</el-select>
								</el-col>
								<el-col :span="8" class="proMesRow">
									<h3>&nbsp;</h3>
									<el-select v-model="proMes.threeid" :placeholder="typeThreeMes.name">
									    <el-option
									      v-for="item in typeThreeListMT"
									      :key="item.dicId"
									      :label="item.name"
									      :value="item.dicId">
									    </el-option>
									</el-select>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="proMesRow">
									<h3>项目简介</h3>
									<el-input type="textarea" :rows="3" v-model="proMes.bewrite" placeholder="项目简介"></el-input>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="proMesRow">
									<h3>项目公开性</h3>
									<el-select v-model="proMes.projectType" placeholder="项目公开性">
									    <el-option
									      v-for="item in proOpenness"
									      :key="item.flag"
									      :label="item.content"
									      :value="item.flag">
									    </el-option>
									</el-select>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="proMesRow">
									<h3>项目归属</h3>
									<div class="enterpriseBox">
										<div>
											<img v-if="proMes.enterprise.imgUrl !=''" :src="proMes.enterprise.imgUrl"/>
											<img v-if="proMes.enterprise.imgUrl ==''" src="../assets/images/22登录_01.png"/>
										</div>
										<span>{{proMes.enterprise.name}}</span>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="20" class="proMesRow">
									<h3>&nbsp;</h3>

								</el-col>
								<el-col :span="4" class="proMesRow">
									<el-button @click="saveProMeg" style="width:100%" type="primary">保存1</el-button>
								</el-col>
							</el-row>
						</div>

						<div class="box" v-if="editProFlag == 2">
							<!--项目偏好-->
						</div>
						<div class="box" v-if="editProFlag == 3">
							<!--任务类型配置-->
							<div class="addTaskType" @click="addfieldBol=true;editProBol=false">
								<i class="iconfont icon-tianjia2"></i>
								<span>添加任务类型</span>
							</div>
							<ul>
								<li class="taskTypePageRow" v-for="(item,index) in taskTypePageList">
									<div>
										<div>
											<i :class="item.icon"></i>
											<span>{{item.name}}</span>
										</div>
										<div>
											<i @click="item.edixBol = !item.edixBol;taskTypeIndex=index" class="iconfont icon-msnui-more" style="cursor: pointer;"></i>
											<editbox v-show="item.edixBol" @close="item.edixBol=false" size="width:213px" title="类型菜单" @outIndex="inIndex" :lists="typeList"></editbox>
										</div>
									</div>
									<div>
										<span v-for="(field,index) in item.fields">
											<div v-if="field!=null">
												<i :class="field.icon"></i>
												<span>{{field.name}}</span>
											</div>
										</span>
									</div>
								</li>
							</ul>
						</div>
						<div class="box" v-if="editProFlag == 4">
							<!--自动化规则-->
						</div>
						<div class="box" v-if="editProFlag == 5">
							<!--更多-->
							<h1>项目操作</h1>
							<p>您可以执行以下操作</p>
							<el-row :gutter="20">
								<el-col :span="7">
									<el-button @click="proFile(1)" type="primary" style="width:100%">归档</el-button>
								</el-col>
								<el-col :span="7">
									<el-button @click="exitPro" type="danger" style="width:100%">退出</el-button>
								</el-col>
								<el-col :span="7">
									<el-button @click="delPro" type="danger" style="width:100%" v-if="delProjectcyFlage">删除</el-button>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>

		<!--保存任务类型名称-->
		<el-dialog :append-to-body="true" title="编辑名称" :visible.sync="saveMTBol" width="400px" center>
			<span class="saveMTBox">
				<el-row>
					<el-col :span="24">
						<el-input v-model="taskTypeName" placeholder="设置任务类型"></el-input>
						<p>一个配置对应一个任务类型；如有多个类型，创建任务时，可选择任务类型；任务类型不可重名。</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<h2>设置类型图标</h2>
						<div class="radioIcons">
							<div :class="{radioIconac:index==iconIndex}" @click="iconIndex=index" class="radioIcon" v-for="(icon,index) in icons">
								<i :class="icon"></i>
							</div>
						</div>
					</el-col>
				</el-row>
			</span>
			<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="savetaskTypeField">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import API from 'api/http'
	import upLoad from 'components/upload'
	//添加任务类型组件
	import vaddfield from 'view/home/addField'
	//编辑配置
	import edittasktype from 'view/home/editTaskType'
	import { mapGetters, mapMutations } from 'vuex'
	import editbox from 'components/editBox'
	import Bus from 'assets/js/Bus.js'
	export default{
		components:{
			upLoad,
			vaddfield,
			edittasktype,
			editbox
		},
		mounted(){
			window.onbeforeunload = function(){
				alert('关闭当前标签页')
			}
		},
		computed:{
			...mapGetters({
				getEnterpriseId: 'GET_ENTERPRISEID'
			})
		},
		props:['openFlag'],
		data(){
			return {
				//移除项目权限
				delProjectcyFlage:null,



				//编辑项目的模态框
				editProBol:false,
				//编辑项目的id
				editProId:0,
				//编辑项目的模态框左边栏的列表
				editProLeftList:[{
					icon:'iconfont icon-xiangmuguanli',
					name:'项目信息',
					flag:1
				},
//				{
//					icon:'iconfont icon-review',
//					name:'项目偏好',
//					flag:2
//				},
				{
					icon:'iconfont icon-renwuyiwancheng',
					name:'任务类型配置',
					flag:3
				},
//				{
//					icon:'iconfont icon-953caidan_liucheng',
//					name:'自动化规则',
//					flag:4
//				},
				{
					icon:'iconfont icon-msnui-more',
					name:'更多',
					flag:5
				}],
				//编辑项目的模态框右边显示的内容
				editProFlag:3,
				//项目信息
				proMes:{
					id:'',
					name:'',
					image:'',
					bewrite:'',
					projectType:'',
					oneId:'',
					twoId:'',
					threeid:'',
					enterprise:{
						name:'',
						imgUrl:'',
						introduction:''
					}
				},
				//项目公开性
				proOpenness:[{
					content:'公开项目（所有人都可以访问，仅项目成员可以编辑）',
					flag: '1'
				},{
					content:'私有项目（仅项目成员可以访问和编辑）',
					flag: '2'
				}],

				//项目设置 任务类型配置
				taskTypePageList:[],
				//类型菜单
				typeList:['编辑名称','编辑配置','删除类型'],
				//编辑名称的模态框
				saveMTBol:false,
				//编辑名称
				taskTypeName:'',
				//图标类型列表
				icons: ['iconfont icon-deng bulb', 'iconfont icon-duoxuankuang money', 'iconfont icon-ren people', 'iconfont icon-shui water', 'iconfont icon-dian electricity', 'iconfont icon-xingxing star', 'iconfont icon-xuanzhong right'],
				//图标类型列表index
				iconIndex:0,
				//任务类型配置任务类型的index
				taskTypeIndex:0,
				//控制显示添加任务类型组件
				addfieldBol:false,
				//控制显示编辑任务类型组件
				edittasktypeBol:false,
				//编辑需要的任务类型的Id
				taskTypeId:0,


				//分类的名称
				typeOneMes:{},
				typeTwoMes:{},
				typeThreeMes:{},

				//创建新项目的模态框分类的选项框
				typeOneListMT:[],
				typeTwoListMT:[],
				typeThreeListMT:[],
			}
		},
		methods:{
			//关闭添加任务类型组件
			closeAddField(){
				this.addfieldBol = false
				this.edittasktypeBol = false
			},
			//保存编辑的任务字段信息
			savetaskTypeField(){
				API.post('/taskType/isHave', {
					typeId: this.taskTypePageList[this.taskTypeIndex].id,
					name:this.taskTypeName,
					projectId:sessionStorage.getItem('projectId')
				}).then(res => {
//					console.log(res)
					if(res.data.data){
						API.post('/taskType/updateName', {
							id:this.taskTypePageList[this.taskTypeIndex].id,
							name:this.taskTypeName,
							icon:this.icons[this.iconIndex]
						}).then(res => {
							console.log(res)
							if(res.data.data){
								this.saveMTBol = !this.saveMTBol
								this.getTaskTypeList()
							}
						})
					}
				})
			},
			//接收项目设置类型菜单
			inIndex(index){
				if(index == 0){
                    API.post('/taskType/getIsDel', {
                        id: this.taskTypePageList[this.taskTypeIndex].id
                    }).then(res => {
                        if(res.data.data){
                            //编辑名称
                            this.saveMTBol = !this.saveMTBol
                            this.taskTypeName = this.taskTypePageList[this.taskTypeIndex].name
                            this.iconIndex = this.icons.findIndex(el =>{
                                return el == this.taskTypePageList[this.taskTypeIndex].icon
                            })
                        }else{
                            this.$message({
                                type: 'info',
                                message: '该任务类型正在使用，不允许编辑名称'
                            });
                        }
                    })
				}else if(index == 1){
                    API.post('/taskType/getIsDel', {
                        id: this.taskTypePageList[this.taskTypeIndex].id
                    }).then(res => {
                        if(res.data.data){
                            //编辑配置
                            this.taskTypeId = this.taskTypePageList[this.taskTypeIndex].id
                            this.edittasktypeBol = true
                            this.editProBol = false
                        }else{
                            this.$message({
                                type: 'info',
                                message: '该任务类型正在使用，不允许编辑配置'
                            });
                        }
                    })
				}else if(index == 2){
                    //删除类型
                    this.$confirm('此操作将永久删除该任务类型, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        API.post('/taskType/getIsDel', {
                            id: this.taskTypePageList[this.taskTypeIndex].id
                        }).then(res => {
                            if(res.data.data){
                                API.post('/taskType/delName', {
                                    id: this.taskTypePageList[this.taskTypeIndex].id
                                }).then(res => {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getTaskTypeList()
                                })
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: '该任务类型正在使用，不允许删除'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
				}
			},
			//获取任务类型配置
			getTaskTypeList(){
				API.post('/taskType/getTaskType', {
					projectId: sessionStorage.getItem("projectId")
				}).then(res => {
					console.log(res)
					this.taskTypePageList = []
					res.data.data.map(el => {
						this.$set(el,'edixBol',false)
						this.taskTypePageList.push(el)
					})
				})
			},
			//退出项目
			exitPro(){
				API.post('/projects/delProUser',{
					pid: sessionStorage.getItem('projectId')
				}).then(res => {
					console.log(res)
				})
			},
			//项目归档
			proFile(flag,id){
				if(flag == 1){
					this.$alert('如果项目已经完成或是暂时中止，你可以先将项目归档。归档的项目可以很容易地再次激活，并且不会有数据丢失', {
				        confirmButtonText: '确定',
			        }).then(() => {
			        	API.post('/projects/updFile', {
							id:sessionStorage.getItem('projectId'),
							file:flag
						}).then(res => {
			        		this.editProBol = false
				        	this.$message({
					            type: 'success',
					            message: '归档成功'
				        	});
			        	})
			        })
				}else if(flag == 0){
					API.post('/projects/updFile', {
						id:id,
						file:flag
					}).then(res => {
			       		this.editProBol = false
				       	this.$message({
				            type: 'success',
					        message: '激活成功'
				    	});
				    	this.getFileProList()
			        })
				}


			},
			//删除项目
			delPro(){
				this.$confirm('此操作将永久删除该项目, 是否继续?', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
		        }).then(() => {
		        	this.$message({
			            type: 'success',
			            message: '删除成功!'
		        	});
		        	API.post('/projects/deletePro',{
		        		id: sessionStorage.getItem('projectId'),
		        		state: 1,
		        		eid: sessionStorage.getItem("enterpriseId")
		        	}).then(res => {
		        		this.editProBol = false
		        	})
		        }).catch(() => {
		          	this.$message({
			            type: 'info',
			            message: '已取消删除'
		        	});
		        });
			},
			//保存项目信息
			saveProMeg(){
                if(this.proMes.oneId || this.proMes.twoId ||this.proMes.threeid){
                    let ids = ''
                    ids = this.proMes.oneId + ',' + this.proMes.twoId + ',' + this.proMes.threeid
                    API.post('/projects/updatePro', {
                        base64:this.proMes.image[0] == 'h'?'':this.proMes.image,
                        eid:sessionStorage.getItem("enterpriseId"),
                        ids:ids,
                        id:this.proMes.id,
                        name:this.proMes.name,
                        bewrite:this.proMes.bewrite,
                        projectType:this.proMes.projectType,
                        image:this.proMes.image
                    }).then(res => {
                        this.editProBol = false
                    })
                }else{
                    this.$notify({
                        title: '警告',
                        message: '项目分类必须选择一项',
                        type: 'warning'
                    });
                }
			},
			//改变项目背景
			changeProBg(imgUrl){
				this.proMes.image = imgUrl
			},
			//获取项目信息
			getProMes(){
				API.get('/projects/showOnePro', {
					id: sessionStorage.getItem('projectId'),
					eid: sessionStorage.getItem("enterpriseId")
				}).then(res => {
					this.proMes.id = res.data.data.project.id,
					this.proMes.name = res.data.data.project.name,
					this.proMes.image = res.data.data.project.image,
					this.proMes.bewrite = res.data.data.project.bewrite,
					this.proMes.projectType = res.data.data.project.projectType,
					this.proMes.oneId = res.data.data.lableList[0].enterpriseDictionariesList.length == 0 ?'':res.data.data.lableList[0].enterpriseDictionariesList[0].dicId.toString(),
					this.proMes.twoId = res.data.data.lableList[1].enterpriseDictionariesList.length == 0 ?'':res.data.data.lableList[1].enterpriseDictionariesList[0].dicId.toString(),
					this.proMes.threeid = res.data.data.lableList[2].enterpriseDictionariesList.length == 0 ?'':res.data.data.lableList[2].enterpriseDictionariesList[0].dicId.toString()
					this.proMes.enterprise.name = res.data.data.enterprise.name
					this.proMes.enterprise.imgUrl = res.data.data.enterprise.pictureURL
					this.proMes.enterprise.introduction = res.data.data.enterprise.introduction
				})
			},
			//项目设置里的选项卡跳转
			navSkip(flag){
				this.editProFlag = flag
				if(flag == 1){
					this.getProMes()
				}else if(flag == 3){
					this.getTaskTypeList()
				}
			},
			//获取三级分类
			getThreeType(){
				API.get('/enterpriseDictionaries/getenterpriseDictionaries',{
					eid:sessionStorage.getItem("enterpriseId")
				}).then(res => {
					console.log(res)
					this.typeOneMes = res.data.data[0]
					this.typeTwoMes = res.data.data[1]
					this.typeThreeMes = res.data.data[2]

					//初始化选项
					this.typeOneList = []
					this.typeOneListMT = []
					this.editTypeOneList = []
					res.data.data[0].enterpriseDictionariesList.map(el => {
						this.$set(el,'checked',false);
						this.$set(el,'editBol',false);
						this.typeOneList.push(el)
						this.typeOneListMT.push(el)
						this.editTypeOneList.push(el)
					})
					this.typeTwoList = []
					this.typeTwoListMT = []
					this.editTypeTwoList = []
					res.data.data[1].enterpriseDictionariesList.map(el => {
						this.$set(el,'checked',false);
						this.$set(el,'editBol',false);
						this.typeTwoList.push(el)
						this.typeTwoListMT.push(el)
						this.editTypeTwoList.push(el)
					})
					this.typeThreeList = []
					this.typeThreeListMT = []
					this.editTypeThreeList = []
					res.data.data[2].enterpriseDictionariesList.map(el => {
						this.$set(el,'checked',false);
						this.$set(el,'editBol',false);
						this.typeThreeList.push(el)
						this.typeThreeListMT.push(el)
						this.editTypeThreeList.push(el)
					})
					this.typeOneListMT.unshift({
						dicId:'',
						name:'请选择' + this.typeOneMes.name
					})
					this.typeTwoListMT.unshift({
						dicId:'',
						name:'请选择' + this.typeTwoMes.name
					})
					this.typeThreeListMT.unshift({
						dicId:'',
						name:'请选择' + this.typeThreeMes.name
					})
					this.editTypeList = []
					if(this.editFlag == 1){
						this.typeOneList.map(el => {
							this.editTypeList.push(el)
						})
					}else if(this.editFlag == 2){
						this.typeTwoList.map(el => {
							this.editTypeList.push(el)
						})
					}else if(this.editFlag == 3){
						this.typeThreeList.map(el => {
							this.editTypeList.push(el)
						})
					}
				})
			},
			...mapMutations({
				addPath: 'ADD_PATH',
				popPath: 'POP_PATH'
			})
		},
		watch:{
			openFlag(){
				this.editProBol = true
				this.getProMes()
				this.editProFlag = 3
			},
			edittasktypeBol(){
				if(!this.edittasktypeBol){
					this.editProBol = true
					this.editProFlag = 3
					this.getTaskTypeList()
				}
			},
			addfieldBol(){
				if(!this.addfieldBol){
					this.editProBol = true
					this.editProFlag = 3
					this.getTaskTypeList()
				}
			}
		},
		//初始化
		created(){
			this.getThreeType()
			this.getTaskTypeList()
			//接收组件通信信息
			Bus.$on('toQueryProjectPermission', (msg) => {
//				console.log(msg)
				this.delProjectcyFlage = msg.projectPermissionList[21].status
			});
		}
	}
</script>

<style scoped>
	.projectBox{
		/*width: 100%;*/
		/*height: 80vh;*/
	}
	.projectBox::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: #f5f5f5;
	}
	.projectBox h1{
		font-size: 16px;
	}
	.projectBox h1 span{
		color: #999999;
		font-size: 14px;
		margin-left: 20px;
		cursor: pointer;
	}
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

	.projectBody{
		margin-top: 30px;
		display: flex;
		flex-wrap: wrap;
	}

	.projectBody .card{
		width: 220px;
		height: 100px;
		border-radius: 4px;
		padding: 20px;
		position: relative;
		margin-right: 20px;
		margin-bottom: 20px;
	}

	.projectBody .card .cardTitle {
		display: flex;
		justify-content: space-between;
		color: white;
		height: 24px;
	}
	.projectBody .card .bg{
		width: 260px;
		height: 140px;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 4px;
		z-index: -1;
		background: black;
		opacity: 0.2;
	}
	.projectBody .card .bgimg{
		width: 260px;
		height: 140px;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 4px;
		z-index: -2;
	}

	.projectBody .addPro{
		width: 260px;
		height: 140px;
		background: #f7f7f7;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #cccccc;
	}
	.projectBody .addPro i{
		font-size: 30px;
	}

	.projectBody .addPro:hover{
		color: #3da8f5;
	}

	.MTbox{
		border-top: 2px solid #efefef;
		width: 100%;
		height: 60vh;
		overflow: auto;
	}
	.MTbox .body .row{
		margin-top: 20px;
		color: #999999;
	}
	.MTbox .body .row .mtBox{
		width: 100%;
	}
	.MTbox .body .row .mtBox .card{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 260px;
		height: 140px;
		background: #f7f7f7;
		border-radius: 6px;
		color: #cccccc;
		font-size: 14px;
		cursor: pointer;
	}
	.MTbox .body .row .mtBox .card:hover{
		color: #077ce7;
	}
	.MTbox .body .row .mtBox .card span{
		margin-left: 5px;
		margin-top: -4px;
	}
	.MTbox .body .title span{
		font-size: 14px;
	}
	.MTbox .tabs{
		display: flex;
		justify-content: space-around;
		height: 75px;
		width: 100%;
		align-items: center;
		font-size: 16px;
		color: #333333;
		position: absolute;
		top: -75px;
		z-index: 10;
	}
	.MTbox .tabs span{
		cursor: pointer;
		padding: 24px 14px;
		border-bottom: 2px solid rgba(0,0,0,0);
	}
	.MTbox .tabs .bottomBorder{
		border-bottom: 2px solid #077ce7;
	}

	.MTbox>.editBox{
		display: flex;
		width: 100%;
		height: 100%;
	}
	.MTbox>.editBox .leftNav {
		width: 175px;
		height: 20px;
	}
	.MTbox>.editBox .leftNav .nav{
		height: 59px;
		border-bottom: 2px solid #efefef;
		border-right: 1px solid #efefef;
		display: flex;
		align-items: center;
		color: #666666;
		font-size: 12px;
		border-left: 4px solid rgba(0,0,0,0);
		cursor: pointer;
	}
	.MTbox>.editBox .leftNav .nav:hover{
		color: #077ce7;
		border-left: 4px solid #077ce7;
	}
	.MTbox>.editBox .leftNav .check{
		color: #077ce7;
		border-left: 4px solid #077ce7;
	}
	.MTbox>.editBox .leftNav .nav i{
		margin-left: 20px;
		margin-right: 10px;
		font-size: 12px;
	}
	.MTbox>.editBox .rightMain {
		width: 100%;
		height: 100%;
		padding: 14px;
		overflow: auto;
	}
	.MTbox>.editBox .rightMain .box{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.MTbox>.editBox .rightMain .box h1{
		font-size: 16px;
	}

	.MTbox>.editBox .rightMain .box .taskTypePageRow{
		padding-right: 20px;
	}

	.MTbox>.editBox .rightMain .box .taskTypePageRow>div:nth-child(1){
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}

	.MTbox>.editBox .rightMain .box .taskTypePageRow>div:nth-child(2){
		display: flex;
		padding: 10px 0;
		border-bottom: 1px solid #efefef;
		flex-wrap: wrap;
	}
	.MTbox>.editBox .rightMain .box .taskTypePageRow>div:nth-child(2) div{
		margin-right: 30px;
	}

	.MTbox>.editBox .rightMain .box::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: #f5f5f5;
	}
	.MTbox>.editBox .rightMain .box .enterpriseBox{
		display: flex;
		align-items: center;
	}
	.MTbox>.editBox .rightMain .box .enterpriseBox>div:nth-child(1){
		width: 30px;
		height: 30px;
		border-radius: 30px;
		margin-right: 7px;
		/*background: red;*/
	}
	.MTbox>.editBox .rightMain .box .enterpriseBox>div:nth-child(1) img{
		width: 100%;
		height: 100%;
		border-radius: 30px;
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
	.center{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 15px;
	}
	.finishBtn{
		width: 100%;
		height: 36px;
		background: #077ce7;
		color: white;
		outline: none;
		border: none;
		border-radius: 4px;
	}

	.editRow{
		margin-top: 30px;
	}

	.editRow h3{
		border-bottom: 2px solid #efefef;
		font-size: 14px;
		padding-bottom: 7px;
		color: #999999;
	}
	.editRow h3 span{
		border-bottom: 2px solid #007be5;
		padding-bottom: 10px;
	}

	.editRow .typeList{
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 40px;
		color: #999999;
	}
	.editRow .typeList>div:nth-child(1) i{
		margin-right: 1px;
	}
	.editRow .typeList>div:nth-child(2) i{
		margin-left: 14px;
	}
	.editRow .typeList>div:nth-child(2) i:hover{
		margin-left: 14px;
		color: #017ae6;
	}
	.editRow .typeList>div:nth-child(2) .editType{
		position: absolute;
		width: 260px;
		background: white;
		z-index: 10;
		left: 0px;
		padding: 0 20px;
		border-radius: 6px;
		box-shadow: 0px 0px 10px #999999;
	}
	.editRow .typeList>div:nth-child(2) .editType:hover{
		color: #999999;
	}
	.redBtn{
		width: 100%;
		background: #ef5521;
		height: 28px;
		color: white;
		border-radius: 4px;
		border: none;
		outline: none;
	}
	.proMesRow h3{
		color: 333333;
		font-size: 14px;
		margin: 14px 0 10px 0;
	}
	.proMesRow .fengmian {
		width: 260px;
		height: 140px;
		border-radius: 4px;
		border: 1px solid #efefef;
	}
	.proMesRow .fengmian img {
		width: 100%;
		height: 100%;
	}
	.saveMTBox h2{
		margin-top: 30px;
		font-size: 14px;
	}
	.saveMTBox p{
		margin-top: 14px;
		line-height: 16px;
		font-size: 12px;
	}
	.saveMTBox .radioIcons{
		display: flex;
	}
	.saveMTBox .radioIcons .radioIcon{
		width: 20px;
		height: 20px;
		margin-right: 15px;
		border-radius: 4px;
		border: 1px solid #EFEFEF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
	}
	.saveMTBox .radioIcons .radioIcon i{
		margin-top: 2px;
	}
	.saveMTBox .radioIcons .radioIconac{
		border: 1px solid #0a7ee9 !important;
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
	.addTaskType{
		display: flex;
		justify-content:
		flex-start;
		align-items: center;
		color: #0a7ee9;
		cursor: pointer;
	}
	.addTaskType i{
		margin-right: 10px;
	}
</style>
