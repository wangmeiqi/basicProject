<template>
	<!-- 标签组件
    	close	关闭
    	delLabel	删除标签 将要删除标签的id传出去
    	editFinish	编辑完成 将要修改的标签的id name bq_color 传出去
    	send		将点击的标签传出去 传出这个标签所有的信息
    -->
	<div class="tags" v-show="show" :style="styles" @click.stop="show=show">
		<div v-show="flag==1" class="tagList">
			<div class="header">
				<input type="text" v-model="search" placeholder="搜索标签">
				<i @click="flag=2" class="iconfont icon-tianjia2" style="color: #0a7ee9;cursor: pointer;"></i>
			</div>
			<ul class="lists">
				<li v-for="(item,index) in labelListM" @click="clickItem(index,item.checked,item)">
					<div>
						<span class="circle" :style="bgColor(item.bq_color)"></span> {{item.name}}
					</div>
					<div>
						<i @click.stop="editLabel(item)" class="iconfont icon-bianji1" style="font-size: 14px;display: none;"></i>
						<i v-show="item.checked" style="margin-left: 10px;" class="iconfont icon-duihao"></i>
					</div>
				</li>
			</ul>
		</div>
		<div v-show="flag==2" class="tagList">
			<div class="header">
				<div>
					<i class="iconfont icon-jiantouyou-copy hand" @click="flag=1"></i>
				</div>
				<div>
					<span>新建标签</span>
				</div>
				<div>
					<i class="iconfont icon-guanbi hand" @click="$emit('close')"></i>
				</div>
			</div>
			<div class="body common">
				<!--<el-input type='text'v-model="labelName" placeholder="标签名称"></el-input>-->
				<input class="iptStyle" type='text' v-model="labelName" placeholder="标签名称" />
			</div>
			<ul class="colorSelector">
				<li v-for="(item,index) in colorLight" :style="bgColor(item)" class="hand" @click="colorIndex=index">
					<i v-show="index==colorIndex" class="iconfont icon-duihao" style="color: white;"></i>
				</li>
			</ul>
			<div class="body common">
				<button @click="createLabel" :class="{blue:labelName!='' && !reg.test(this.labelName)}">创建</button>
			</div>
		</div>
		<div v-show="flag==3" class="tagList">
			<div class="header">
				<div>
					<i class="iconfont icon-jiantouyou-copy hand" @click="flag=1"></i>
				</div>
				<div>
					<span>编辑标签</span>
				</div>
				<div>
					<i class="iconfont icon-guanbi hand" @click="$emit('close')"></i>
				</div>
			</div>
			<div class="body common">
				<!--<el-input type='text' v-model="editName" placeholder="标签名称"></el-input>-->
				<input class="iptStyle" type="text" v-model="editName" placeholder="标签名称" />
			</div>
			<ul class="colorSelector">
				<li v-for="(item,index) in colorLight" :style="bgColor(item)" class="hand" @click="editColorIndex=index">
					<i v-show="index==editColorIndex" class="iconfont icon-duihao" style="color: white;"></i>
				</li>
			</ul>
			<div class="common">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-button @click="delLabel" type="danger" style="width: 100%;" plain>删除</el-button>
					</el-col>
					<el-col :span="12">
						<el-button @click="editFinish" type="primary" style="width: 100%;">完成</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../api/http'
	export default {
		props: {
			params: { // 默认内容
				type: Array,
				default: () => {
					return []
				}
			},
			show: { // 是否显示
				type: Boolean,
				default: false
			},
			styles: { // 位置
				type: String,
				default: 'top:0px;left:0px;'
			},
			fid: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				search: '',
				flag: 1,
				labelName: '',
				editName: '',
				//标签颜色选择
				colorLight: ['#69B6FD', '#C3F182', '#87D9F1', '#8D9FEE', '#FDCD89', '#F9978A', '#F94F4F'],
				colorIndex: 0,
				editColorIndex: 0,
				editId: 0,
				editIndex: 0,
				labelList: [],
				labelListM: [],
				reg: /\s/,
			}
		},
		methods: {
			//创建标签
			createLabel() {
				if(this.labelName && !this.reg.test(this.labelName)) {
					api.get('/tasks/getRepeatLableName', {
						name: this.labelName,
						projectId: sessionStorage.getItem('projectId')
					}).then(res => {
						if(res.data.data) {
							api.post('/tasks/addLable', {
								name: this.labelName,
								pid: sessionStorage.getItem('projectId'),
								bq_color: this.colorLight[this.colorIndex],
								fid: this.fid
							}).then(res => {
								this.getLabelList()
								this.flag = 1
								this.labelName = ''
							})
						} else {
							this.$notify({
								title: '警告',
								message: '编辑不能与其他标签重名',
								type: 'warning'
							});
						}
					})
				} else {
					this.$notify({
						title: '警告',
						message: '标签不允许输入空格',
						type: 'warning'
					});
				}

			},
			//删除标签
			delLabel() {
				this.$confirm('确定删除标签?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					api.post('/tasks/delLableTable', {
						id: this.editId
					}).then(res => {
						this.$emit('delLabel', this.editId);
						let index = this.labelList.findIndex(el => {
							return el.id == this.editId
						})
						this.labelList.splice(index, 1);
						this.getLabelListM();
						this.flag = 1;
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			//编辑完成
			editFinish() {
				let flag = false
				this.labelList.map(el => {
					if(el.id != this.editId && el.name == this.editName) {
						flag = true
					}
				})
				if(flag) {
					this.$notify({
						title: '警告',
						message: '编辑不能与其他标签重名',
						type: 'warning'
					});
				} else {
					if(this.editName) {
						api.post('/tasks/updLable', {
							pid: sessionStorage.getItem('projectId'),
							id: this.editId,
							name: this.editName,
							bq_color: this.colorLight[this.editColorIndex]
						}).then(res => {
							this.$emit('editFinish', {
								id: this.editId,
								name: this.editName,
								bq_color: this.colorLight[this.editColorIndex]
							})
							this.getLabelListM()
							this.labelList.map(el => {
								if(el.id == this.editId) {
									el.name = this.editName;
									el.bq_color = this.colorLight[this.editColorIndex]
								}
							})
							this.flag = 1;
						})
					}

				}
			},
			//编辑标签
			editLabel(item) {
				this.editId = item.id;
				this.flag = 3;
				this.editName = item.name
				this.editColorIndex = this.colorLight.findIndex(el => {
					return el == item.bq_color;
				})
				this.editColorIndex = this.editColorIndex == -1 ? 0 : this.editColorIndex
				console.log(this.editColorIndex)
			},
			//背景颜色
			bgColor(color) {
				return 'background:' + color
			},
			//获取模板数据
			getLabelListM() {
				this.labelListM = []
				this.labelList.map(el => {
					this.labelListM.push(el)
				})
				this.search = ''
			},
			//获取标签列表
			getLabelList() {
				api.get('/tasks/getLableByProId', {
					projectId: sessionStorage.getItem('projectId')
				}).then(res => {
					this.labelList = []
					res.data.data.map(el => {
						this.params.map(li => {
							if(li.name == el.name) {
								this.$set(el, 'checked', true);
							}
						})
						if(!el.checked) {
							this.$set(el, 'checked', false);
						}
						this.labelList.push(el)
					})
					this.getLabelListM()
				})
			},
			//点击元素
			clickItem(index, flag, item) {
				if(flag) {
					this.labelList[index].checked = false
				} else {
					this.labelList[index].checked = true
				}
				this.$emit('send', item)
			}
		},
		created() {
			this.getLabelList()
		},
		watch: {
			search(val) {
				this.labelListM = []
				this.labelList.map(el => {
					if(el.name.indexOf(val) > -1) {
						this.labelListM.push(el)
					}
				})
			},
			labelName(val, oldVal) {
				if(val.length > 10) {
					console.log(oldVal)
					console.log(val)
					this.labelName = oldVal
					this.$notify({
						title: '警告',
						message: '标签名称不可超过10字',
						type: 'warning'
					});

				}
			},
			editName(val, oldVal) {
				if(val.length > 10) {
					console.log(oldVal)
					console.log(val)
					this.editName = oldVal
					this.$notify({
						title: '警告',
						message: '标签名称不可超过10字',
						type: 'warning'
					});

				}
			}

		}
	};
</script>

<style scoped>
	.tags {
		width: 230px;
		box-shadow: 0 0 10px #E1E1E1;
		background: white;
		position: fixed;
		z-index: 14;
		border-radius: 4px;
	}
	
	.tagList .header {
		padding: 0 15px;
		height: 40px;
		border-bottom: 1px solid #E1E1E1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.tagList .common {
		padding: 10px;
	}
	
	.tagList .body button {
		width: 100%;
		height: 40px;
		outline: none;
		color: white;
		background: grey;
		border-radius: 4px;
	}
	
	.lists li {
		height: 30px;
		padding: 0 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	
	.lists li:hover {
		background: #e1e1e1;
	}
	
	.lists li:hover .icon-bianji1 {
		display: inline-block !important;
	}
	
	.circle {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background: #b4dcf1;
		margin-right: 4px;
	}
	
	.hand {
		cursor: pointer;
	}
	
	.colorSelector {
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.colorSelector li {
		width: 26px;
		height: 26px;
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
	}
	
	.blue {
		background: #0a7ee9 !important;
	}
	
	.iptStyle {
		-webkit-appearance: none;
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #606266;
		display: inline-block;
		font-size: inherit;
		height: 40px;
		line-height: 40px;
		outline: 0;
		padding: 0 15px;
		-webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		width: 100%;
	}
</style>