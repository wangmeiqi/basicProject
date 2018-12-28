<template>
	<div v-show="show">
		<div class="my-content-wrap">
			<div class="my-content card my-wrap">
				<div class="my-recent-view my-content-view fade in">
					<div class="ma-files">
						<!--选项卡-->
						<header class="my-tab-header tasks-header">
							<ul class="my-header-tabs">
								<li v-for="(item,index) in mineTabs" @click="mineTabsSkip(index)" :class="{active:mineTabIndex==index}" class="type-filter">{{item.name}}
								</li>
							</ul>
						</header>
						<!--头部-->
						<div class="library-handler flex-horiz">
							<div class="check-box flex-static"></div>
							<div v-show="showType" class="library-info flex-fill">
								<a class="library-info-name sort-name-handler dropup">
									<span class="library-sort">名称</span>
								</a>
								<a class="library-info-size sort-size-handler dropup">
									<span class="library-sort sort-size-handler">大小</span>
								</a>
								<!--<a class="library-info-update sort-updated-handler dropup" style="position:relative;">-->
								<!--<span class="library-sort">更新时间</span>-->
								<!--&lt;!&ndash;<span class="caret"></span>&ndash;&gt;-->
								<!--</a>-->
								<a class="library-info-update sort-updated-handler dropup">
									<span class="library-sort">更新时间</span>
									<span :class="switchState?'caret':'active' " @click="switchBtnSort"></span>
								</a>
							</div>
							<div v-show="!showType&&hasChooseOtherFileNum>0" class="library-info flex-fill">
								<span>已选择{{hasChooseOtherFileNum}}项</span>
								<div class="other-list-type">
									<a :title="value.name" v-show="num<4&&num!=3" v-for="(value,num) in oprateDeail" @click="editfAllFun(num)" style="padding: 0;">
										<i v-show="value.classname!='icon-yidong'" v-if="value.classname!='icon-bianji1'" class="iconfont" :class="[value.classname,{'up-rorate':num==1}]"></i>
										<span v-show="value.name!='移动'" v-if="value.name!='编辑'">{{value.name}}</span>
									</a>
								</div>
							</div>
							<div class="view-mode-handlers">
								<a v-for="(item,index) in libraryType" class="mode-handler icon" @click="getFileWatchType(index)">
									<i class="iconfont" :class="[item.classname,{'icon-blue':fileWatchType==index}]"></i>
								</a>
							</div>
						</div>
						<!--列表-->
						<div class="my-files-content">
							<ul v-if="showType" class="library-field library-list">
								<li v-for="(item,index) in fileList" class="library-list-item library-list-work">
									<div class="check-frame">
										<div class="frame-content">
											<div class="list-item-content">
												<div class="list-item-display">
													<!--<span class="work-icon image-icon" style="background-image: "></span>-->
													<span v-if="item.type==1" style="margin-right: 5px;"><i style="color: #234f9a;" class="iconfont icon-doc"></i></span>
													<span v-if="item.type==2" style="margin-right: 5px;"><i style="color: #848290;" class="iconfont icon-txt"></i></span>
													<span v-if="item.type==3" style="margin-right: 5px;"><i style="color: #ea0200;" class="iconfont icon-pdf"></i></span>
													<span v-if="item.type==4" style="margin-right: 5px;"><i style="color: #fcb108;" class="iconfont icon-zip"></i></span>
													<span v-if="item.type==5" style="margin-right: 5px;"><i style="color: #e32400;" class="iconfont icon-ppt"></i></span>
													<span v-if="item.type==6" style="margin-right: 5px;"><i style="color: #067445;" class="iconfont icon-xls"></i></span>
													<span v-if="item.type==7" style="margin-right: 5px;"><i style="color: #027966;" class="iconfont icon-jpg"></i></span>
													<span v-if="item.type==8" style="margin-right: 5px;"><i style="color: #d80084;" class="iconfont icon-gif"></i></span>
													<span v-if="item.type==9" style="margin-right: 5px;"><i style="color: #00796a;" class="iconfont icon-png"></i></span>
													<span v-if="item.type==10" style="margin-right: 5px;"><i style="color: #fcb108;" class="iconfont icon-zip"></i></span>
													<span v-if="item.type==11" style="margin-right: 5px;"><i style="color: #3d7aa9;" class="iconfont icon-avi"></i></span>
													<span v-if="item.type==12" style="margin-right: 5px;"><i style="color: #43ae46;" class="iconfont icon-html"></i></span>
													<span v-if="item.type==0" style="margin-right: 5px;"><i style="color: #ae1c33;" class="iconfont icon-othe"></i></span>
													<div class="title-bar" style="width:81%;text-align:left;">
														<div class="editable">
															<input v-if="hasClickEdit==item.id" @blur="outClickEdit(0,item,index)" @keyup.enter="outClickEdit(1,item,index)" type="text" v-model="targetFname">
															<p v-else class="elastic-title-tail">
																<span v-if="name.length<=0" :title="item.name">
																	<span class="fileTextOver">{{item.name.slice(0, item.name.lastIndexOf('.'))}}</span><span style="float:left">{{item.name.slice(item.name.lastIndexOf('.'), item.name.length)}}</span>
																</span>
																<span v-else>
																	{{name[index]}}
																</span>
															</p>
														</div>
													</div>
												</div>
												<div class="list-item-info"><span class="info-size">{{item.filesize | bToKbFun}}</span>
													<span class="info-updated hinted" data-title="2018-03-15 02:00">{{item.createTime | timeFilt}}</span>
												</div>
											</div>
										</div>
										<div class="frame-check-box">
											<i class="check-mark icon icon-tick"></i>
										</div>
									</div>
									<!--我创建的下载模块1-5-->
									<div class="library-item-handler">
										<a @click="oprateChoose(item,num)" :href="num==0?item.fileUrl:'javascript:void(0)'" :title="value.name" v-show="num<4" v-for="(value,num) in oprateDeail">
											<i class="iconfont" :class="[value.classname,{'up-rorate':num==1}]"></i>
										</a>
									</div>
								</li>
							</ul>
							<ul v-else class="library-field library-grid">
								<li v-for="(item,index) in fileList" class="library-grid-item-li">
									<div style="height:100%;position:relative;" :class="{'change-border-color-blue':item.state>0}">
										<!--<i class="#icon-PDF"></i>-->
										<!--<img v-if="item.type=='0'" class="imgSet"/>
										<img v-if="item.type=='1'" class="imgSet" src="../../assets/images/word.png" />
										<img v-if="item.type=='2'" class="imgSet" src="../../assets/images/txt.png" />
										<img v-if="item.type=='3'" class="imgSet" src="../../assets/images/pdf.png" />
										<img v-if="item.type=='4'" class="imgSet" src="../../assets/images/zip.png" />
										<img v-if="item.type=='5'" class="imgSet" src="../../assets/images/ppt.png" />
										<img v-if="item.type=='6'" class="imgSet" src="../../assets/images/xls.png" />
										<img v-if="item.type=='7'" class="imgSet" src="../../assets/images/jpg.png" />
										<img v-if="item.type=='8'" class="imgSet" src="../../assets/images/gif.png" />
										<img v-if="item.type=='9'" class="imgSet" src="../../assets/images/png.png" />
										<img v-if="item.type=='10'" class="imgSet" src="../../assets/images/rar.png" />
										<img v-if="item.type=='11'" class="imgSet" src="../../assets/images/AVI.png" />
										<img v-if="item.type=='12'" class="imgSet" src="../../assets/images/htm.png" />-->
										<svg v-if="item.type=='1'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-doc"></use>
										</svg>
										<svg v-if="item.type=='2'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-txt"></use>
										</svg>
										<svg v-if="item.type=='3'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-pdf"></use>
										</svg>
										<svg v-if="item.type=='4'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-zip"></use>
										</svg>
										<svg v-if="item.type=='5'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-ppt"></use>
										</svg>
										<svg v-if="item.type=='6'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-xls"></use>
										</svg>
										<svg v-if="item.type=='7'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-jpg"></use>
										</svg>
										<svg v-if="item.type=='8'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-gif"></use>
										</svg>
										<svg v-if="item.type=='9'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-png"></use>
										</svg>
										<svg v-if="item.type=='10'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-zip"></use>
										</svg>
										<svg v-if="item.type=='11'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-avi"></use>
										</svg>
										<svg v-if="item.type=='12'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-html"></use>
										</svg>
										<svg v-if="item.type=='0'" class="imgSet" aria-hidden="true">
											<use xlink:href="#icon-othe"></use>
										</svg>
									</div>
									<div class="title-bar">
										<input v-if="hasClickEdit==item.id" @blur="outClickEdit(0,item)" @keyup.enter="outClickEdit(1,item)" type="text" v-model="targetFname" class="title-bar-input">
										<p v-else @click="hasClickEdit=''" class="paddingP">
											<span class="fileTextOver">{{item.name.slice(0, item.name.lastIndexOf('.'))}}</span><span style="float:left">{{item.name.slice(item.name.lastIndexOf('.'), item.name.length)}}</span>
										</p>
									</div>
									<div @click="chooseOtherFile(item,index)" class="other-title-bar frame-check-box change-check-box-color" :class="{'change-check-box-color-blue':item.state>0}">
										<i class="iconfont icon-duihao"></i>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import taskList from 'components/mine/taskList'
	import API from 'api/http'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			fileList: {
				type: Array,
				default: []
			}
		},
		components: {
			taskList
		},
		data() {
			return {
				//我的选项卡
				mineTabs: [{
						name: '我创建的'
					}
					//					{
					//						name: '我参与的'
					//					}
				],
				libraryType: [{
						classname: 'icon-liebiao1'
					},
					{
						classname: 'icon-ziyuan'
					}
				],
				mineTabIndex: 0,
				fileWatchType: 0,
				oprateDeail: [{
						classname: 'icon-download',
						name: '下载'
					},
					//					{
					//						classname: 'icon-download',
					//						name: '更新'
					//					},
					{
						classname: 'icon-yidong',
						name: '移动'
					},
					{
						classname: 'icon-bianji1',
						name: '编辑'
					},
					{
						classname: 'icon-shanchu1',
						name: '删除'
					},
					{
						classname: 'icon-xiala2',
						name: ''
					}
				],
				showType: true,
				name: [],
				targetFname: '',
				targetFnameSuffix: '',
				hasClickEdit: '',
				hasChooseOtherFile: false,
				hasChooseOtherFileNum: 0,
				switchState: true,
				pathAndName: [],
				pathToName: '',
			}
		},
		filters: {
			//时间戳转化为日期
			timeFilt(val) {
				let date = new Date(val);
				let Y = date.getFullYear() + '年';
				let M = (date.getMonth() + 1) + '月';
				let D = date.getDate() + '日';
				let year = date.getFullYear() + '年'; //获得年份

				Y == year ? val = M + D : val = Y + M + D;
				return val;
			},
			//字节转换过滤器
			bToKbFun(val) {
				if(val < 1024) {
					return val + 'B'
				} else if(val > 1024 && val < 1024 * 1024) {
					return(val / 1024).toFixed(2) + 'KB'
				} else {
					return(val / (1024 * 1024)).toFixed(2) + 'M'
				}
			}
		},
		methods: {
			switchBtnSort() {
				this.switchState = !this.switchState;
				if(this.switchState) {
					API.get('/myModel/getMyFile',{
						eid: sessionStorage.getItem("enterpriseId")}).then(res => {
						if(res.data.data) {
							this.fileList = res.data.data;
						}
					});
				} else {
					API.get('/myModel/getMyFile', {
						order: 'flashback',
						eid: sessionStorage.getItem("enterpriseId")
					}).then(res => {
						if(res.data.data) {
							this.fileList = res.data.data;
						}
					});
				}
			},
			mineTabsSkip(index) {
				// this.mineTabIndex = index;
				this.hasClickEdit = '';
			},
			//查看文件类型方式
			getFileWatchType(index) {
				this.fileWatchType = index;
				console.log(index)
				index == 0 ? this.showType = true : this.showType = false
			},
			
			//我创建的 多选下载
			editfAllFun(index) {
				switch(index) {
					case 0: //0是下载
						//下载文件输出到浏览器显示[{path:1,name:2},{path:1,name:2}]
						location.href = API.ip + '/ftp/downFiles?content=' + this.pathToName.substring(0, this.pathToName.length - 2)
						let self = this
						//						this.pathAndName.map(function(item, index){
						//							location.href = API.ip + '/ftp/downloadFile?path=' + item.path + '&name=' + item.name
						//							console.log(item.name)
						//						})
						this.fileList.map(function(item, index) {
							if(item.state == 1) {
								item.state = 0
							}
						})
						self.hasChooseOtherFileNum = 0
						self.pathToName = ''
						//						self.pathAndName =[]
						break;
				}
			},
			oprateChoose(item, index) {
				let url = '',
					parmas = {};
				//				console.log(index)
				switch(index) {
					//下载
					//qqqqq-asas,asasa-121
					case 0:
						//下载文件输出到浏览器显示
						location.href = API.ip + '/ftp/downloadFile?path=' + item.path + '&name=' + item.name
						//						API.get('/ftp/downloadFile', {
						//							path:item.path,
						//							name:item.name
						//						}).then(res => {
						//							console.log('0999999999999999999999999999',res)
						//						});
						break;
						//更新
						//					'case 1:
						//						break;'
						//移动
					case 1:
						break;
						//编辑
					case 2:
						this.hasClickEdit = item.id;
						this.targetFname = item.name.split('.')[0];
						this.targetFnameSuffix = item.name.split('.')[1];
						break;
						//删除
					case 3:
						this.$confirm('此操作将永久删除该企业, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							url = 'myModel/delMyFile';
							parmas = {
								'path': item.fileUrl,
								'tFid': item.id
							};
							//	this.getOperateEffect(url, parmas, true);
							API.post(url, parmas).then(res => {
								API.get('/myModel/getMyFile',{
									eid: sessionStorage.getItem("enterpriseId")
								}).then(res => {
									if(res.data.data) {
										this.fileList = res.data.data;
									}
								});
							});
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
						break;
				}
			},
			getOperateEffect(url, parmas, type) {
				if(type) {
					API.post(url, parmas).then(res => {
						console.log(res)
					});

				} else {
					API.get(url, parmas).then(res => {
						console.log(res)
					});
				}

			},
			//修改了文件名称
			outClickEdit(type, item, index) {
				console.log(this.name)
				if(this.targetFname.trim() != '') {
					this.hasClickEdit = ''
					this.name[index] = this.targetFname + '.' + this.targetFnameSuffix;
					let url = '/ftp/updFileName';
					let parmas = {
						'srcFname': item.name,
						'newName': this.name[index],
						'tFid': item.id
					};
					console.log(this.name)
//					this.getOperateEffect(url, parmas, true);
					API.post(url, parmas).then(res => {
						API.get('/myModel/getMyFile',{
							eid: sessionStorage.getItem("enterpriseId")
						}).then(res => {
							this.name=[]
							if(res.data.data) {
								this.fileList = res.data.data;
								console.log(this.fileList)
								for(var i = 0; i < this.fileList.length; i++) {
									this.name.push(this.fileList[i].name)
								}
							}
						});
					});
				} else {
					this.$notify({
						title: '警告',
						message: '名称不能为空!',
						type: 'warning'
					});
				}

			},
			chooseOtherFile(item, index) {
				//				console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=', item)
				item.state == 0 ? this.fileList[index].state = 1 : this.fileList[index].state = 0;
				let self = this;
				self.hasChooseOtherFileNum = 0;
				//				self.pathAndName = []
				self.pathToName = ''
				this.fileList.map(function(item, index) {
					if(item.state == 1) {
						self.hasChooseOtherFileNum++;
						//						self.pathAndName.push({'path':item.path,'name':item.name})
						self.pathToName = self.pathToName + item.path + '-' + item.name + '~!'
					}
				})

				console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=', self.pathToName.substring(0, self.pathToName.length - 2))
			}
		},
		created() {
			console.log(this.fileList)
			for(var i = 0; i < this.fileList.length; i++) {
				this.name.push(this.fileList[i].name)
			}
		}
	}
</script>

<style scoped>
	.icon-liebiao1 {
		font-size: 21px;
	}
	
	.icon-ziyuan,
	.icon-liebiao1 {
		cursor: pointer;
	}
	
	.icon-blue {
		color: #3da8f5;
	}
	
	.up-rorate {
		transform: rotate(-180deg);
		display: inline-block;
		position: relative;
		top: -2px;
	}
	
	.my-content-wrap {
		position: absolute;
		width: 100%;
		padding-top: 20px;
		background: #f7f7f7;
		height: 80vh;
		overflow: auto;
	}
	
	.my-content {
		position: relative;
		margin: 0 auto;
		width: 90%;
		height: 100%;
		background: #fff;
	}
	
	.my-content .my-content-view.my-recent-view {
		overflow-y: auto;
	}
	
	.my-content-wrap .my-content .my-content-view {
		height: 100%;
	}
	
	.my-tab-header {
		margin: 0 20px;
		border-bottom: 2px solid #e5e5e5;
	}
	
	.my-tab-header {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}
	
	.my-tab-header .my-header-tabs {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	
	.my-tab-header .my-header-tabs li {
		position: relative;
		padding: 14px 4px;
		font-size: 16px;
		color: #383838;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		line-height: 20px;
	}
	
	.my-tab-header .my-header-tabs li+li {
		margin-left: 26px;
	}
	
	.pull-right {
		color: #383838;
		float: right!important;
	}
	/*头部*/
	
	.library-handler {
		padding: 20px 0 20px 18px;
		color: gray;
		position: relative;
		margin: 0 19px;
		border-bottom: 1px solid #efefef;
	}
	
	.flex-horiz {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		flex-direction: row;
	}
	
	.library-handler .check-box {
		display: inline-block;
		margin-right: 16px;
		width: 20px;
		height: 20px;
		line-height: 20px;
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
		text-align: center;
	}
	
	.library-handler .library-info {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		font-size: 15px;
	}
	
	.flex-fill {
		-webkit-flex: 1 1 auto;
		-ms-flex: 1 1 auto;
		flex: 1 1 auto;
	}
	
	.library-handler .library-info .library-info-name {
		display: block;
		width: 50%;
		padding-left: 4px;
	}
	
	.library-handler .library-info .library-info-size {
		display: block;
		width: 100px;
		padding-right: 20px;
	}
	
	.library-handler .library-info>a {
		-webkit-flex: none;
		-ms-flex: none;
		flex: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	.library-handler .library-info .dropup .caret {
		width: 0;
		height: 0;
		margin-left: 2px;
		vertical-align: middle;
		border-top: 4px solid;
		border-right: 4px solid transparent;
		border-left: 4px solid transparent;
		display: inline-block;
		cursor: pointer;
	}
	
	.library-handler .library-info .dropup .active {
		width: 0;
		height: 0;
		margin-left: 2px;
		vertical-align: middle;
		border-bottom: 4px solid;
		border-right: 4px solid transparent;
		border-left: 4px solid transparent;
		display: inline-block;
		cursor: pointer;
	}
	
	.library-handler .view-mode-handlers {
		position: absolute;
		top: 18px;
		right: 0;
	}
	
	.library-handler .view-mode-handlers .mode-handler.active {
		color: #3da8f5;
	}
	
	.library-handler .view-mode-handlers .mode-handler {
		padding: 0 2px 0 18px;
	}
	
	.my-header-tabs li.active:after,
	.my-header-tabs li:hover:after {
		content: "";
		position: absolute;
		left: 0;
		bottom: -2px;
		height: 3px;
		width: 100%;
		border-bottom: 2px solid #3da8f5;
		transition: opacity 218ms ease, border-width 218ms ease;
	}
	
	.my-view .my-content-wrap .my-content .my-content-view .my-files-content {
		overflow-y: auto;
		height: calc(100% - 104px);
	}
	
	.my-files .my-files-content {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	
	.library-list-item {
		position: relative;
		padding: 0 20px;
		transition: background-color 218ms;
		line-height: 20px;
	}
	
	.library-list-item .check-frame {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}
	
	.library-list-item .check-frame .frame-content {
		-webkit-order: 1;
		-ms-flex-order: 1;
		order: 1;
		-webkit-flex: 1 1 auto;
		-ms-flex: 1 1 auto;
		flex: 1 1 auto;
		min-width: 0;
		margin-left: 20px;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.library-list-item .list-item-content {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
	}
	
	.library-list-item .list-item-content .list-item-display {
		-webkit-flex: none;
		-ms-flex: none;
		flex: none;
		width: 50%;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		padding: 12px 0;
		margin-right: 10px;
	}
	
	.library-field .work-icon {
		position: relative;
	}
	
	.library-list-item .work-icon {
		-webkit-flex: none;
		-ms-flex: none;
		flex: none;
		margin-right: 12px;
		background-size: cover;
		background-repeat: no-repeat;
	}
	
	.library-field .work-icon:before {
		position: absolute;
		display: inline-block;
		content: "";
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	
	.library-list-item .list-item-content .list-item-info {
		-webkit-flex: 1 1 auto;
		-ms-flex: 1 1 auto;
		flex: 1 1 auto;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		color: gray;
	}
	
	.library-list-item .list-item-content .list-item-info .info-size {
		width: 100px;
	}
	
	.library-list-item .list-item-content .list-item-info>span {
		padding-right: 20px;
		max-width: ellipsis;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	*,
	 :after,
	 :before {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	.library-list-item .check-frame .frame-check-box {
		-webkit-order: 0;
		-ms-flex-order: 0;
		order: 0;
		-webkit-flex: none;
		-ms-flex: none;
		flex: none;
		margin-right: 0;
		width: 20px;
		height: 20px;
		line-height: 20px;
		border: 2px solid #a6a6a6;
	}
	
	.check-frame .frame-check-box {
		display: inline-block;
		text-align: center;
		cursor: pointer;
		border-radius: 3px;
	}
	
	.library-list-item .library-item-handler {
		position: absolute;
		right: 20px;
		top: 23px;
		height: 100%;
		padding-left: 8px;
		/*display: none;*/
	}
	
	.library-list-item:hover {
		background-color: #f5f5f5;
	}
	
	.library-list-item:hover .library-item-handler {
		display: inline-block;
	}
	
	.library-item-handler a {
		text-decoration: none;
		color: #545252;
		margin-left: 12px;
	}
	
	.library-item-handler>i {
		font-size: 16px;
		margin-left: 16px;
		cursor: pointer;
	}
	
	.library-item-handler>i:first-of-type {
		margin-left: 0;
	}
	
	.library-grid-item-li {
		margin: 12px 2px 0 28px;
		width: 168px;
		height: 172px;
		position: relative;
		float: left;
	}
	
	.library-grid-item-li div:first-child {
		height: 90%!important;
		border: 1px solid #efefef;
	}
	
	.library-grid-item-oprate i {
		font-size: 18px;
		margin-right: 20px;
		cursor: pointer;
	}
	
	.library-grid-item-oprate {
		position: absolute;
		bottom: 8px;
		left: 35%;
		display: none;
	}
	
	.iconDetail {
		position: absolute;
		top: 0;
		left: 0;
		display: none;
	}
	
	.library-grid-item-li:hover .library-grid-item-oprate {
		display: block;
	}
	
	.library-grid-item-li:hover .iconDetail {
		display: block;
	}
	
	.title-bar {
		text-align: center;
	}
	
	.frame-check-box {
		-ms-flex-order: 0;
		-webkit-box-ordinal-group: 1;
		order: 0;
		-ms-flex: none;
		-webkit-box-flex: 0;
		flex: none;
		margin-right: 0;
		width: 18px;
		height: 18px;
		line-height: 20px;
		border: 2px solid #a6a6a6;
		display: inline-block;
		text-align: center;
		cursor: pointer;
		border-radius: 3px;
	}
	
	.frame-check-box-unchecked {
		background: #e0e0e0;
		opacity: 0.5;
		cursor: initial;
	}
	
	.editable input {
		width: 100%;
		border: 1px solid #efefef;
		height: 30px;
		line-height: 30px;
	}
	
	.other-list-type {
		margin-left: 40px;
	}
	
	.other-list-type a {
		padding: 0 15px;
		cursor: pointer;
	}
	
	.other-title-bar {
		position: absolute;
		top: 0px;
		left: 0px;
	}
	
	.library-grid-item-li:hover .other-title-bar {
		display: block;
	}
	
	.change-check-box-color {
		background-color: #EFEFEF;
		border-color: #EFEFEF;
		width: 22px;
		height: 22px;
		display: none;
	}
	
	.change-check-box-color i {
		color: #fff;
	}
	
	.change-check-box-color-blue {
		background-color: #077CE7;
		border-color: #077CE7;
		display: block;
	}
	
	.change-border-color-blue {
		border: 2px solid #077CE7;
	}
	
	.title-bar-input {
		padding: 0 4px;
		border: 1px solid #f5f5f5;
		line-height: 28px;
		width: 97%;
	}
	
	.elastic-title-tail {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.fileTextOver {
		max-width: 67%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		display: inline-block;
		float: left;
	}
	
	.paddingP {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	
	.imgSet {
		width: 50%;
		height: 50%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
	}
	
	.img {
		width: 30px;
		height: 30px;
		border-radius: 30px;
		background: #ffae44;
		display: inline-block;
		color: white;
		-webkit-box-shadow: 0 0 10px #E6E6E6;
		box-shadow: 0 0 10px #E6E6E6;
		text-align: center;
		line-height: 30px;
	}
	
	.nameImg {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
</style>