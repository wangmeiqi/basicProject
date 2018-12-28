<template>
	<div>
		<div class="title">
			<i class="iconfont icon-fujian"></i>
			<span>附件上传</span>
		</div>
		<!--<ul>
			<li v-for="(item,index) in list">
				<span @click="downloadFile(item)">
					{{item.fileName}}
					<i @click.stop="delFile(item.id,index)" class="iconfont icon-guanbi del"></i>
				</span>
			</li>
		</ul>-->
		<div class="fileList">
			<span v-for="(item,index) in list" class="fileListBox">
				<span @click="downloadFile(item)">
					{{item.fileName}}
					<i @click.stop="delFile(item.id,index)" class="iconfont icon-guanbi del"></i>
				</span>
			</span>
		</div>
		<div class="addFile">
			<span ref="addfile">
				<i class="iconfont icon-tianjia"></i>
				<span>添加附件</span>
			</span>
		</div>
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
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			show: {
				type: Boolean,
				default: false
			},
			taskId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				num: 0,
				options: {
					testMethod: 'post',
					chunkSize: 10 * 1024 * 1024,
					// https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
					target: API.ip + '/task/uploadFile;JSESSIONID=' + 　sessionStorage.getItem('JSESSIONID'),
					testChunks: false,
					withCredentials: true,
					query: {
						projectId: sessionStorage.getItem("projectId"),
						pid: sessionStorage.getItem('projectId'),
						tid: sessionStorage.getItem('tid'),
					},
					allowDuplicateUploads: true
				}
			}
		},
		methods: {
			//删除附件
			delFile(id, index) {
				this.$confirm('是否删除附件?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					API.post('/tasks/delTaskFile', {
						eid: sessionStorage.getItem("enterpriseId"),
						projectId: sessionStorage.getItem("projectId"),
						taskId: this.taskId,
						fileId: id
					}).then(res => {
						if(res.data.data) {
							this.$emit('delfile', index)
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除'
					});
				});

			},
			//下载附件
			downloadFile(item) {
				window.open(API.ip + '/ftp/downloadFile;JSESSIONID=' + 　sessionStorage.getItem('JSESSIONID') + '?path=' + item.fileUrl + '&name=' + item.fileName)
				API.get('/ftp/downloadFile', {
					path: item.fileUrl,
					name: item.fileName
				})
			}
		},
		mounted() {
			if(this.num == 0) {
				this.$nextTick(() => {
					let _this = this;
					console.log(this.$refs.addfile)
					this.$refs.uploader.uploader.assignBrowse(this.$refs.addfile)
					this.$refs.uploader.uploader.on('complete', function() {
						_this.$emit("update")
					})
				})
				this.num++
			}
		},
		watch: {
			taskId() {
				this.options.query.tid = this.taskId
			}
		},
		created() {
			this.options.query.tid = this.taskId
		}
	}
</script>

<style scoped>
	.fileList {
		padding: 10px 20px;
		display: flex;
		flex-wrap: wrap;
	}
	
	.fileListBox {
		margin-bottom: 10px;
		padding: 3px 6px;
		background: #c9e6f5;
		margin-right: 10px;
		border-radius: 20px;
		cursor: pointer;
	}
	
	.uploadBox {
		display: none;
	}
	
	.title {
		margin-top: 20px;
	}
	
	.addFile {
		color: #2c86ff;
		cursor: pointer;
	}
	
	li {
		padding: 0 20px;
		height: 32px;
		display: flex;
		align-items: center;
	}
	
	li span {
		cursor: pointer;
	}
	
	.fileListBox:hover .del {
		display: inline-block;
	}
	
	.del {
		font-size: 8px;
		cursor: pointer;
		display: none;
	}
</style>