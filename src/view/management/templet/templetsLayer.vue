<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px">
			<div class="box">
				<el-row>
					<el-col :span="23" class="proMesRow">
						<h3>模板名称</h3>
						<el-input :maxlength="15" placeholder="项目名称" v-model="form.projectName"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="23" class="proMesRow">
						<h3>模板封面</h3>
						<div style="display: flex;align-items: flex-end;">
							<div class="fengmian">
								<img v-if="form.image!=''" :src="form.image" />
								<img v-if="form.image==''" src="../../../assets/images/back.png" />
							</div>
							<div style="margin-left: 12px;">
								<up-load :title="titleImg" @sendBase64="changeProBg">上传封面</up-load>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="23" class="proMesRow">
						<h3>所属分类</h3>
						<el-select v-model="form.region" placeholder="请选择">
							<el-option v-for='(item,index) in classify' :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="23" class="proMesRow">
						<h3>模板描述</h3>
						<el-input type="textarea" :rows="3" v-model="form.describe"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="11" class="proMesRow">
						<h3>甬道一</h3>
						<div v-for="(item,index) in arr" style="margin-bottom: 15px;">
							<input type="text" :maxlength="15" v-model="item.content" class="iptSyle" />
							<span v-if="arr.length-1!=0" class="iconStyle" @click='del(index)'><i class="iconfont icon-guanbi1"></i></span>
							<span v-if="arr.length-1==index" class="iconStyle" @click="add"><i class="iconfont icon-add"></i></span>
						</div>
					</el-col>
				</el-row>
				<div slot="footer" class="dialog-footer" style="text-align: right;">
					<el-button @click="dialogCancel">取 消</el-button>
					<el-button type="primary" @click="dialogBtn">{{types == 'add'?'确 定':'编辑'}}</el-button>
				</div>
			</div>

		</el-form>
	</div>
</template>

<script>
	import api from 'api/http'
	import upLoad from 'components/upload'
	export default {
		props: {
			//添加还是编辑
			types: {
				default: 'add'
			},
			//编辑的id
			id: {
				default: '0'
			},
			//显示或隐藏
			shows: {
				default: false
			},
			title: {
				default: '添加模板'
			}

		},
		components: {
			upLoad,
		},
		data() {
			return {
				form: {
					projectName: '', //项目名称
					image: '', //上传图片
					region: '', //所属分类
					describe: '', //模板描述
				},
				classify: [], //所属分类
				arr: [{
					content: ''
				}],
				titles: [], //甬道
				yongdao: false,
				titleImg:'上传封面'
			}
		},
		methods: {
			//改变项目背景
			changeProBg(imgUrl) {
				console.log(imgUrl)
				this.form.image = imgUrl
			},
			//添加甬道
			add() {
				this.arr.push({
					content: ''
				})
			},
			//删除甬道
			del(index) {
				this.arr.splice(index, 1)
			},
			dialogCancel() {
				//清空数据
				this.form.projectName = ''
				this.form.image = ''
				this.form.region = ''
				this.form.describe = ''
				this.arr = [{
					content: ''
				}]
				this.titles = []
				this.$emit("cancel")
			},
			dialogBtn() {
				console.log(this.arr)
				for(var i = 0; i < this.arr.length; i++) {
					if(this.arr[i].content.trim() == '') {
						this.yongdao = false
					} else {
						this.yongdao = true
					}
				}
				if(this.form.projectName.trim() == '') {
					this.$notify({
						title: '警告',
						message: '模板名称不能为空',
						type: 'warning'
					})
				} else if(this.form.region == '') {
					this.$notify({
						title: '警告',
						message: '所属分类不能为空',
						type: 'warning'
					})
				} else if(this.yongdao == false) {
					this.$notify({
						title: '警告',
						message: '甬道不能为空',
						type: 'warning'
					})
				} else {
					if(this.types == 'add') {
						//新增
						for(var i = 0; i < this.arr.length; i++) {
							this.titles.push(this.arr[i].content)
						}
						let parms = {
							modelName: this.form.projectName, //模板名称
							base64: this.form.image, //图片
							type: this.form.region, //
							bewrite: this.form.describe, //描述
							titles: JSON.stringify(this.titles) //甬道的数组
						}
						api.post('projects/addProModel', parms).then(res => {
							this.$emit("tbn")
						})

					} else if(this.types == 'exit') {
						//编辑
						for(var i = 0; i < this.arr.length; i++) {
							this.titles.push(this.arr[i].content)
						}
						//所属分类
						for(var j = 0; j < this.classify.length; j++) {
							if(this.classify[j].name == this.form.region) {
								this.form.region = this.classify[j].id
							}
						}
						let parms = {
							modelName: this.form.projectName, //模板名称
							base64: this.form.image, //图片
							type: this.form.region, //所属分类
							bewrite: this.form.describe, //描述
							titles: JSON.stringify(this.titles), //甬道的数组
							modelId: this.id
						}
						api.post('projects/updProModel', parms).then(res => {
							this.$emit("tbn")
						})
					}


				}

			}
		},
		created() {
			api.get('projects/getAllProModelType').then(res => {
				this.classify = res.data.data
				console.log(res.data.data)
			})
			if(this.types == 'exit') {
				let parms = {
					modelId: this.id
				}
				api.get('projects/getProModel', parms).then(res => {
					this.arr = []
					var getData = res.data.data
					this.form.projectName = getData.name
					this.form.image = getData.modelUrl
					this.form.region = getData.typeName
					this.form.describe = getData.description
					if(getData.modelAisle.length == 0) {
						arr: [{
							content: ''
						}]
					}
					else {
						for(var i = 0; i < getData.modelAisle.length; i++) {
							this.arr.push({
								content: getData.modelAisle[i].name
							})
						}
					}
				})
			}
		},
		watch: {
			'form.projectName' () {
				if(this.form.projectName.length == 15) {
					this.$notify({
						title: '警告',
						message: '项目名称不可大于15字',
						type: 'warning'
					})
				}
			},
			'form.describe' () {
				if(this.form.describe.length == 400) {
					this.$notify({
						title: '警告',
						message: '模板描述不可大于400字',
						type: 'warning'
					})
				}
			},
			types(val) {
				if(val == 'add') {
					//清空数据
					this.form.projectName = ''
					this.form.image = ''
					this.form.region = ''
					this.form.describe = ''
					this.arr = [{
						content: ''
					}]
					this.titles = []
				} else if(val == 'exit') {
					//回显数据
				}
			},
			shows(val) {
				//清空数据
				this.form.projectName = ''
				this.form.image = ''
				this.form.region = ''
				this.form.describe = ''
				this.arr = [{
					content: ''
				}]
				this.titles = []
				if(val) {
					//回显数据
					if(this.types == 'exit') {
						let parms = {
							modelId: this.id
						}
						api.get('projects/getProModel', parms).then(res => {
							this.arr = []
							var getData = res.data.data
							this.form.projectName = getData.name
							this.form.image = getData.modelUrl
							this.form.region = getData.typeName
							this.form.describe = getData.description
							if(getData.modelAisle.length == 0) {
								arr: [{
									content: ''
								}]
							}
							else {
								for(var i = 0; i < getData.modelAisle.length; i++) {
									this.arr.push({
										content: getData.modelAisle[i].name
									})
								}
							}

							console.log(this.arr)
						})
					}
				}
			}
		}
	}
</script>

<style scoped>
	.box {
		height: 60vh;
		overflow: auto;
	}

	.box h3 {
		height: 50px;
		line-height: 50px;
		font-size: 14px;
	}

	.iptSyle {
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
		width: 278px;
	}

	.iconStyle {
		color: #077CE7;
		margin-left: 5px;
		cursor: pointer;
	}
  .fengmian img{
    border-radius:6px;
    width:260px;
    height:140px;
  }
</style>
