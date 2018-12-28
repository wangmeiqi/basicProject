<template>
	<div class="uploadFileBox">
		<div class="uploadFileBoxIn">
			<div class="options" v-show="multipleSelection.length">
				<span>已选择6项</span>
				<span>
					<i class="el-icon-download"></i> 下载
				</span>
				<span>
					<i class="el-icon-rank"></i> 移动
				</span>
				<span>
					<i class="el-icon-loading"></i> 复制
				</span>
				<span>
					<i class="el-icon-loading"></i> 归档
				</span>
				<span>
					<i class="el-icon-loading"></i> 删除
				</span>
			</div>
			<div class="uploadFileHead">
				<p><span @click="titleSkip(index)" v-for="(item,index) in uploadFieldTitle">{{index==uploadFieldTitle.length-1?item.name:item.name + '/'}}</span></p>
				<div class="right">
					<span @click="newFileBol=!newFileBol;dialogTitle='新建文件夹'"><i class="el-icon-circle-plus"></i> 新建文件夹</span>
					<span ref="uploadfile"><i class="el-icon-upload"></i> 上传文件</span>
					<span ref="uploadfiles"><i class="el-icon-upload"></i> 上传文件夹</span>
				</div>
			</div>
			<div class="fileShowBox">
				<div class="fieldName">
					<div class="checkBox">
						<i @click="allPich=!allPich" :class="allPich ? unselected : pich"></i>
					</div>
					<div class="name">
						<span @click="sort('name')">名称 <i class="iconfont icon-xiala1"></i></span>
					</div>
					<div class="size">
						<span @click="sort('filesize')">大小  <i class="iconfont icon-xiala1"></i></span>
					</div>
					<div class="creator">
						<span>创建人</span>
					</div>
					<div class="update">
						<span>更新时间</span>
					</div>
					<!--<div class="viewArrangement">
						<i class="iconfont icon-liebiao1"></i>
						<div style="margin-top: 4px;margin-left: 10px;">
							<i class="iconfont icon-ziyuan" style="font-size: 20px;"></i>
						</div>
					</div>-->
				</div>
				<div class="fieldBody" v-for="(item,index) in tableData" @mouseover="item.operation = true" @mouseleave="item.operation = false">
					<div class="checkBox">
						<i @click="pitchRow(index)" :class="item.pitch ? unselected : pich"></i>
					</div>
					<div class="name">
						<span @click="enterFile(item.dir,item.id,item.name)">
							<i v-if="item.dir" class="iconfont icon-weibiaoti5 fileSize"></i>
							<i v-if="!item.dir" class="iconfont icon-wenjian fileSize"></i>
							<span class="name">{{item.name}}</span>
						</span>
					</div>
					<div class="size">{{item.filesize | unit}}</div>
					<div class="creator">{{item.username}}</div>
					<div class="update">{{item.createTime}}</div>
					<div class="viewArrangement" style="position: relative;">
						<div>
							<span>
								<!--<a href="http://192.168.9.38:83/ftp/downloadFtpFile?ids=164">33</a>-->
								<i @click="downloadFild(index)" v-show="item.operation" class="iconfont icon-download"></i>
							</span>
							<span>
								<i v-show="item.operation" class="iconfont icon-yidong"></i>
							</span>
							<span>
								<i @click="newFileBol=!newFileBol;dialogTitle='重命名'" v-show="item.operation" class="iconfont icon-bianji1"></i>
							</span>
							<span>
								<i v-show="item.operation" @click="item.card = !item.card" class="iconfont icon-xiala"></i>
								<div v-show="item.card" class="cardBox">
									<div class="cardHead">
										<div style="width: 20px;"></div>
										<div>文件夹菜单</div>
										<div>
											<i @click="item.card=false" class="iconfont icon-guanbi" style="margin-right: 10px;"></i>
										</div>
									</div>
									<div>
										<ul>
											<li>
												<i class="iconfont icon-fuzhi"></i> 复制文件夹连接
											</li>
											<li>
												<i class="iconfont icon-fuzhi"></i> 复制文件夹
											</li>
											<li>
												<i class="iconfont icon-xiangmuguanli"></i> 归档文件夹
											</li>
											<li @click="del(index)">
												<i class="iconfont icon-shanchu1"></i> 删除文件夹
											</li>
										</ul>
									</div>
								</div>
							</span>
						</div>
					</div>
				</div>
			</div>
			<!--<el-table :data="tableData" style="width: 100%" tooltip-effect="dark" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column prop="name" label="名称" sortable>
					<template slot-scope="scope">
						<i v-if="scope.row.dir" class="iconfont icon-weibiaoti5"></i> <span @click="enterFile(scope.row.dir,scope.row.id,scope.row.name)">{{scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="filesize" label="大小" sortable>
					<template slot-scope="scope">
						{{scope.row.filesize | unit}}
					</template>
				</el-table-column>
				<el-table-column prop="username" label="创建者">
				</el-table-column>
				<el-table-column prop="createTime" label="更新时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						
					</template>
				</el-table-column>
			</el-table>-->

		</div>
		<el-dialog :title="dialogTitle" :visible.sync="newFileBol" width="30%" center>
			<span>
				<el-row>
					<el-col :span="24">
						<el-input v-model="flieName" placeholder="请输入文件名"></el-input>
					</el-col>
				</el-row>
			</span>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="newFileBol = false">取 消</el-button>
		    <el-button type="primary" @click="dialogenter">确 定</el-button>
		  </span>
		</el-dialog>
		<div class="uploadBox">
			<uploader :options="options" ref="uploader" class="uploader-example">
				<uploader-unsupport></uploader-unsupport>
				<uploader-list></uploader-list>
			</uploader>
		</div>
	</div>
</template>

<script>
	import API from 'api/http'
	let path = ''
	export default {
		data() {
			return {
				dialogTitle:"新建文件夹",
				flieName:'',
				uploadFieldTitle: [{
					name: "文件库",
					pid: 0
				}],
				options: {
					testMethod: 'post',
					chunkSize:10*1024*1024,
					// https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
					target: API.ip + '/ftp/upload;JSESSIONID=' +　sessionStorage.getItem('JSESSIONID'),
					testChunks: false,
					withCredentials: true,
					query: {
						projectId:sessionStorage.getItem("projectId"),
						pid:0
					},
					allowDuplicateUploads:true
				},
				attrs: {
					accept: 'image/*'
				},
				tableData: [],
				multipleSelection: [],
				newFileBol:false,
				pich:"iconfont icon-fuxuankuang checkSize",
				unselected: "iconfont icon-duoxuankuang2 checkSize",
				allPich:false,
				sortBol:true,
				//文件index
				fileIndex:0
			}
		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection)
			},
			//下载文件
			downloadFild(index){
				location.href = API.ip + '/ftp/downloadFtpFile?ids=' + this.tableData[index].id
//				API.get('/ftp/downloadFtpFile', {
//					ids:this.tableData[index].id
//				}).then(res => {
//					console.log(res)
//				})
			},
			//点击一个checkbox判断是否全选
			pitchRow(index){
				this.tableData[index].pitch = !this.tableData[index].pitch
				let num = 0;
				for(let i in this.tableData){
					if(this.tableData[i].pitch){
						num++
					}
				}
				if(num == this.tableData.length){
					this.allPich = true
				}else{
					this.allPich = false
				}
			},
			//重命名
			rename(){
				API.get('/ftp/renameFile', {
					id:this.tableData[this.fileIndex].id,
					name:this.flieName
				}).then(res => {
					this.getFileList(this.uploadFieldTitle[this.uploadFieldTitle.length - 1].pid)
				})
			},
			//进入文件夹
			enterFile(isDirectory, id, name) {
				if(isDirectory) {
					this.uploadFieldTitle.push({
						name: name,
						pid: id
					})
					sessionStorage.setItem('tierId',id)
					this.options.query.pid = id
					this.getFileList(id)
				}
			},
			dialogenter(){
				if(this.dialogTitle == '新建文件夹'){
					if(this.flieName != ''){
						this.newFile()
						this.newFileBol = false
					}
				}else if(this.dialogTitle == '重命名'){
					if(this.flieName != ''){
						this.rename()
						this.newFileBol = false
					}
				}
			},
			titleSkip(index) {
				this.getFileList(this.uploadFieldTitle[index].pid)
				this.uploadFieldTitle.splice(index + 1);

			},
			//新建文件夹
			newFile(){
				API.get('/ftp/createDir', {
					projectId:sessionStorage.getItem("projectId"),
					pid:this.uploadFieldTitle[this.uploadFieldTitle.length - 1].pid,
					name:this.flieName
				}).then(res => {
					this.newFileBol = false
					this.getFileList(this.uploadFieldTitle[this.uploadFieldTitle.length - 1].pid)
				})
			},
			//删除文件
			del(index){
				API.get('/ftp/delDir', {
					id:this.tableData[index].id,
					projectId: sessionStorage.getItem('projectId'),
					eid: sessionStorage.getItem('enterpriseId')
				}).then(res => {
					this.getFileList(this.uploadFieldTitle[this.uploadFieldTitle.length - 1].pid)
				})
			},
			//排序
			sort(str){
				this.sortBol = !this.sortBol
				this.tableData.sort((a,b)=>{
					let item1 = a[str];
					let item2 = b[str];
					if(this.sortBol){
						return item1 - item2
					}else{
						return item2 - item1
					}
				})
			},
			//获取文件目录
			getFileList(pid) {
				API.get('/ftp/findFileList', {
					projectId: sessionStorage.getItem('projectId'),
					pid:pid
				}).then(res => {
					this.tableData = []
					console.log(res)
					res.data.data.map(el => {
						let time = new Date(el.createTime);
						el.createTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
						el.pitch = false
						el.operation = false
						el.card = false
						this.tableData.push(el)
					})
				})
			}
		},
		filters: {
			unit(num) {
				if(num < 1024) {
					return num + 'B'
				} else if(num >= 1024 && num < Math.pow(1024, 2)) {
					return(num / 1024).toFixed(2) + 'KB'
				} else if(num >= Math.pow(1024, 2) && num < Math.pow(1024, 3)) {
					return(num / Math.pow(1024, 2)).toFixed(2) + 'M'
				} else if(num >= Math.pow(1024, 3)) {
					return(num / Math.pow(1024, 3)).toFixed(2) + 'G'
				}
			}
		},
		created() {
			this.getFileList(0)
		},
		mounted() {
			console.log(this.$refs.uploader)
			this.$refs.uploader.uploader.assignBrowse(this.$refs.uploadfile)
			this.$refs.uploader.uploader.assignBrowse(this.$refs.uploadfiles, true)
			//			this.$refs.uploader.uploader.on('fileSuccess', function (rootFile, file, message) {
			//			  	console.log(rootFile, file, message)
			//			})
			this.$refs.uploader.uploader.on('fileComplete', function(rootFile) {
				console.log(rootFile)
			})
			let _this = this;
			this.$refs.uploader.uploader.on('complete', function() {
				_this.getFileList(_this.uploadFieldTitle[_this.uploadFieldTitle.length - 1].pid)
			})
			//			this.$refs.uploader.assignBrowse()
			//删除文件夹
//			API.get('/ftp/delDir', {
//				path:'/6/1||'
//			}).then(res => {
//				console.log(res)
//			})
		},
		watch:{
			uploadFieldTitle(){
//				path = '/' + this.uploadFieldTitle[this.uploadFieldTitle.length - 1].path
				console.log(path)
			},
			allPich(){
				for(let i in this.tableData){
					if(this.allPich){
						this.tableData[i].pitch = true
					}else{
						this.tableData[i].pitch = false
					}
				}
			},
			tableData(){
				for(let i in this.tableData){
					if(this.tableData[i].pitch == false){
						this.allPich = false
						break
					}
				}
			}
		}
	}
</script>

<style scoped>
	.uploadFileBox {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		display: flex;
		justify-content: center;
		position: relative;
	}
	
	.uploadBox {
		position: absolute;
		right: 10px;
		bottom: 20px;
		display: none;
	}
	
	.uploadBox .uploader-example {
		width: 30vw;
		padding: 15px;
		height: 20vh;
		margin: 40px auto 0;
		font-size: 12px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .4);
	}
	
	.uploadBox .uploader-example .uploader-btn {
		margin-right: 4px;
	}
	
	.uploadBox .uploader-example .uploader-list {
		max-height: 440px;
		overflow: auto;
		overflow-x: hidden;
		overflow-y: auto;
	}
	
	.uploadFileBoxIn {
		margin-top: 20px;
		width: 80%;
		height: 80%;
		background: white;
		border-radius: 4px;
		padding: 10px;
		position: relative;
	}
	
	.uploadFileBoxIn .options {
		position: absolute;
		background: white;
		width: 90%;
		height: 30px;
		top: 68px;
		z-index: 10;
		left: 68px;
		font-size: 14px;
		color: #606266;
	}
	
	.uploadFileBoxIn .options span {
		margin-right: 20px;
		cursor: pointer;
	}
	
	.uploadFileHead {
		display: flex;
		height: 50px;
		justify-content: space-between;
		align-items: center;
		color: #383838;
		border-bottom: 1px solid #ebeef5;
	}
	
	.uploadFileHead p {}
	
	.uploadFileHead .right {
		font-size: 14px;
		color: #3da8f5;
		cursor: pointer;
	}
	
	.uploadFileHead .right i {
		color: #3da8f5;
		margin-left: 20px;
	}
	
	.fileShowBox{
		width: 100%;
		height: 100%;
	}
	.fieldName{
		display: flex;
		height: 50px;
		align-items: center;
		border-bottom: 1px solid #ebeef5;
	}
	.fieldBody{
		display: flex;
		height: 50px;
		align-items: center;
		border-bottom: 1px solid #ebeef5;
	}
	
	.fieldBody:hover{
		background: #f5f5f5;
	}
	.fileShowBox .checkBox{
		width: 85px;
		padding-left: 10px;
	}
	.fileShowBox .name{
		width: 400px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.fileShowBox .name span{
		display: flex;
	}
	.fileShowBox .size{
		width: 100px;
		cursor: pointer;
	}
	.fileShowBox .creator{
		width: 140px;
	}
	.fileShowBox .update{
		width: 140px;
	}
	.fileShowBox .viewArrangement{
		width: 200px;
		text-align: right;
		display: flex;
		justify-content: flex-end;
	}
	.fileShowBox .viewArrangement .cardBox{
		width: 240px;
		background: white;
		position: absolute;
		box-shadow: 0px 0px 10px gainsboro;
		right: -100px;
		top: 30px;
		padding: 10px 0;
		z-index: 10;
	}
	.fileShowBox .viewArrangement .cardBox .cardHead{
		display: flex;
		justify-content: space-between;
		width: 100%;
		align-items: center;
	}
	.fileShowBox .viewArrangement .cardBox ul li{
		text-align: left;
		cursor: pointer;
		line-height: 30px;
		font-size: 14px;
	}
	.fileShowBox .viewArrangement .cardBox ul li:hover{
		background: #f5f5f5;
	}
	.fileShowBox .viewArrangement i{
		font-size: 30px;
		display: inline-block;
		margin-top: 10px;
	}
	.fileShowBox .viewArrangement span {
		display: inline-block;
		width: 20%;
		height: 100%;
	}
	.fileShowBox .viewArrangement span i{
		font-size: 16px;
		margin-left: 10px;
	}
	.checkSize{
		font-size: 24px !important;
	}
	.fileSize{
		display: inline-block;
		font-size: 30px !important;
		color: #3da8f5;
		margin-top:6px;
		margin-right: 10px;
	}
</style>