<template>
	<div class="addFieldBox">
		<div class="addFieldHeader">
			<div class="addFieldHeaderLeft">
				<p style="font-size: 18px;margin-bottom: 10px;">任务字段配置</p>
				<p>根据工作场景，配置默认显示的任务字段</p>
			</div>
			<div class="addFieldHeaderRight">
				<el-button @click="openSaveMT" size="small" type="primary">保存</el-button><br />
				<i @click="closeAddField" class="el-icon-close close"></i>
			</div>
		</div>
		<div class="addFieldBody">
			<div class="left">
				<div class="location"><span>项目 · 任务分组 · 任务列表</span></div>
				<h2>任务标题</h2>
				<div class="spans">
					<span><i class="iconfont icon-xiaolian-line rightDis"></i>待认领</span>
					<span><i class="iconfont icon-rili3 rightDis"></i>开始时间 — 结束时间</span>
				</div>
				<div class="addFieldList">
					<draggable v-model="myArray" :options="{group:{name: 'field',pull: false,put: true},animation:150}">
						<div class="itemAddField" v-for="(element,index) in myArray" :key="element.id">
							<div @mouseover="Fieldindex=index">
								<i :class="element.icon"></i>
								<p style="display:inline-block;width: 80px;">{{element.name}}</p>
								<span>待添加</span>
								<div class="itemAddFieldClose"><i v-show="index == Fieldindex" @click="transfer(index)" class="el-icon-circle-close"></i></div>
							</div>
						</div>
					</draggable>
				</div>
				<div class="childTask"><i class="el-icon-document rightDis"></i>子任务</div>
				<div class="addChildTask"><i class="el-icon-circle-plus-outline rightDis"></i>添加子任务</div>
			</div>
			<div class="rights">
				<div class="right">
					<div class="addField" @click="addFieldBol=true">
						<div class="icons"><i class="el-icon-plus"></i></div>
						<div>新增字段</div>
					</div>
				</div>
				<draggable class="right" v-model="newField" :options="{group:{name: 'field',pull: true,put: false}}">
					<div class="itemAddField" v-for="(item,index) in newField" :key="index" @mouseover="item.btnBol=true" @mouseleave="item.btnBol=false">
						<div class="icons"><i :class="item.icon"></i></div>
						<div>{{item.name}}</div>
						<div v-if="item.btnBol" class="iconbtn">
							<i v-if="item.default_field != 3" @click="item.SHBol = !item.SHBol" class="el-icon-arrow-down"></i>
						</div>
						<div class="SH" v-show="item.SHBol">
							<div class="SHTitle">
								<div></div>
								<div>
									<p>字段菜单</p>
								</div>
								<div>
									<i @click="item.SHBol = false" class="el-icon-close"></i>
								</div>
							</div>
							<div class="SHBody">
								<ul>
									<li @click="compileField(index)">查看详情/编辑</li>
									<li style="color: #ff4f3e;" @click="delField(index)">删除字段</li>
								</ul>
							</div>
						</div>
					</div>
				</draggable>
				<div class="right defaults">
					<p>已设置为默认显示</p>
					<div class="itemAddField" v-for="(item, index) in defaults" :key="index" @mouseover="item.btnBol=true" @mouseleave="item.btnBol=false">
						<div class="icons"><i :class="item.icon"></i></div>
						<div>{{item.name}}</div>
						<div v-if="item.btnBol" class="iconbtn">
							<i @click="item.SHBol = !item.SHBol" class="el-icon-arrow-down"></i>
						</div>
						<div class="SH" v-show="item.SHBol">
							<div class="SHTitle">
								<div></div>
								<div>
									<p>字段菜单</p>
								</div>
								<div>
									<i @click="item.SHBol = false" class="el-icon-close"></i>
								</div>
							</div>
							<div class="SHBody">
								<div style="margin-right: 10px;">是否显示在任务卡上</div>
								<el-switch v-model="item.showListBol"></el-switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="新增字段" :visible.sync="addFieldBol" width="400px" center :append-to-body="toBody">
			<span class="addFieldMTBox">
				<el-row>
					<el-col :span="24">
						<div class="field">名称</div>
						<el-input :maxlength="20" v-model="FieldMessage.name" placeholder="输入名称，最多20字"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div class="field">描述</div>
						<el-input :maxlength="20" v-model="FieldMessage.describe" placeholder="可选项，最多20字"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div class="field">类型</div>
						 <el-select v-model="FieldMessage.type" placeholder="请选择">
						    <el-option
						      v-for="item in selectList"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						      <span style="float: left; color: #8492a6; font-size: 13px;margin-right: 10px;"><i :class="item.icon"></i></span>
						      <span>{{item.label}}</span>
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<div v-show="FieldMessage.type==1 || FieldMessage.type==2" class="field">选项</div>
				<el-row v-for="(option,index) in options" :key="index" style="margin-bottom: 10px;">
					<el-col :span="24">
						<el-input :maxlength="20" v-model="option.name">
							<i @click="options.splice(index,1)" slot="suffix" class="el-input__icon el-icon-close"></i>
						</el-input>
					</el-col>
				</el-row>
				<el-row v-show="FieldMessage.type==1 || FieldMessage.type==2" style="margin-bottom: 10px;">
					<el-col :span="24">
						<div @click="addOption" class="addOptionBtn"><p>最多20字</p></div>
					</el-col>
				</el-row>
			</span>
			<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="saveAddField">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog :append-to-body="toBody" title="保存任务类型" :visible.sync="saveMTBol" width="400px" center>
			<span class="saveMTBox">
				<el-row>
					<el-col :span="24">
						<h2>设置任务类型</h2>
						<el-input v-model="taskTypeName" placeholder="设置任务类型，最多20个字，如需求"></el-input>
						<p>一个配置对应一个任务类型；如有多个类型，创建任务时，可选择任务类型；任务类型不可重名。</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<h2>设置类型图标</h2>
						<div class="radioIcons">
							<div :class="{radioIconac:index==iconIndex}" @click="iconIndex=index" class="radioIcon" v-for="(icon,index) in icons" :key="index">
								<i :class="icon"></i>
							</div>
						</div>
					</el-col>
				</el-row>
			</span>
			<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="saveTaskType">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog :append-to-body="toBody" title="查看详情/编辑" :visible.sync="compileBol" width="400px" center>
			<span class="addFieldMTBox">
				<el-row>
					<el-col :span="24">
						<div class="field">名称</div>
						<el-input v-model="compileFieldMessage.name" placeholder="输入名称，最多20字"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div class="field">描述</div>
						<el-input v-model="compileFieldMessage.describe" placeholder="可选项，最多20字"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div class="field">类型</div>
						 <el-select disabled v-model="compileFieldMessage.type" placeholder="请选择">
						    <el-option
						      v-for="item in selectList"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<div class="field">选项</div>
				<el-row v-for="(option,index) in compileOptions" :key="index" style="margin-bottom: 10px;">
					<el-col :span="24">
						<el-input v-model="option.name">
							<i @click="compileOptions.splice(index,1)" slot="suffix" class="el-input__icon el-icon-close"></i>
						</el-input>
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 10px;">
					<el-col :span="24">
						<div @click="compileOptions.push({name:''})" class="addOptionBtn"><p>最多20字</p></div>
					</el-col>
				</el-row>
			</span>
			<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="compileSave">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import API from 'api/http'
	import draggable from 'vuedraggable'
	export default {
		props:['taskTypeId','edittasktypeBol'],
		components: {
			draggable
		},
		data() {
			return {
				toBody:true,
				//编辑模态框
				compileBol: false,
				//图标列表index
				iconIndex: 0,
				//图标类型列表
				icons: ['iconfont icon-deng bulb', 'iconfont icon-duoxuankuang money', 'iconfont icon-ren people', 'iconfont icon-shui water', 'iconfont icon-dian electricity', 'iconfont icon-xingxing star', 'iconfont icon-xuanzhong rightss'],
				//任务类型的名字
				taskTypeName: '',
				//点击保存之后的模态框
				saveMTBol: false,
				//显示删除标识的index
				Fieldindex: NaN,
				//点击新增字段时 弹出的模态框
				addFieldBol: false,
				//默认 显示的任务字段
				myArray: [],
				//这个项目新的字段 还没有放入显示的字段
				newField: [],
				//已设置为默认显示
				defaults: [],
				//新增字段的字段信息
				FieldMessage: {
					name: "",
					describe: "",
					type: 1
				},
				//编辑字段的字段信息
				compileFieldMessage:{
					id:"",
					name: "",
					describe: "",
					type: 1,
					//编辑字段所需要的content
					content:''
				},
				//新增字段的类型
				selectList: [{
					icon:'iconfont icon-953caidan_liucheng',
					value: 1,
					label: '单选'
				}, {
					icon:'iconfont icon-953caidan_liucheng',
					value: 2,
					label: '多选'
				}, {
					icon:'iconfont icon-953caidan_liucheng',
					value: 3,
					label: '数字'
				}, {
					icon:'iconfont icon-953caidan_liucheng',
					value: 4,
					label: '日期'
				}, {
					icon:'iconfont icon-953caidan_liucheng',
					value: 5,
					label: '文本'
				}],
				//新增字段的选项
				options: [],
				//编辑字段的选项
				compileOptions: []
			}
		},
		methods: {
			//
			closeAddField(){
				this.$emit('closes','close')
			},
			//点击保存按钮， 打开保存模态框
			openSaveMT(){
				this.saveMTBol = true
				API.post('/taskType/selectById',{
					typeId:this.taskTypeId
				}).then(res => {
					this.taskTypeName = res.data.data.name
					this.iconIndex = this.icons.findIndex(el => {
						return el == res.data.data.icon
					})
				})
			},
			//保存编辑字段
			compileSave(){
				this.compileBol = false;
				let contents = '';
				this.compileOptions.map(el => {
					if(el.name != '') {
						contents = contents + "-" + el.name
					}
				})
				API.post('/taskType/updateField', {
					id:this.compileFieldMessage.id,
					name: this.compileFieldMessage.name,
					describes: this.compileFieldMessage.describe,
					type: this.compileFieldMessage.type,
					eid: sessionStorage.getItem('enterpriseId'),
					default_field: 2,
					contents: contents.substr(1),
					content:this.compileFieldMessage.content
				}).then(res => {
				})
			},
			//编辑字段
			compileField(index){
				this.compileBol = true;
				this.newField[index].SHBol = false;
				API.post('/taskType/showFieldInfo',{
					id: this.newField[index].id
				}).then(res => {
					this.compileFieldMessage.id = res.data.data.fieldInfo.id
					this.compileFieldMessage.name = res.data.data.fieldInfo.name
					this.compileFieldMessage.describe = res.data.data.fieldInfo.describes
					this.compileFieldMessage.type = parseInt(res.data.data.fieldInfo.type)
					this.compileFieldMessage.content = res.data.data.fieldInfo.content
					this.compileOptions = []
					res.data.data.optionList.map(el => {
						this.compileOptions.push({
							name:el.name
						})
					})
				})
			},
			//删除字段
			delField(index) {
				API.post('/taskType/delField', {
					id: this.newField[index].id
				}).then(res => {
					if(res.data.data == true) {
						this.newField.splice(index,1)
					}
				})
			},
			//移动元素的方法 并删除原先数组中的这个元素
			transfer(index) {
				this.newField.push(this.myArray[index])
				this.myArray.splice(index, 1)
				this.Fieldindex = NaN
			},
			//添加选项
			addOption() {
				this.options.push({
					name: ''
				})
			},
			//确认新增字段
			saveAddField() {
				if(this.FieldMessage.name != "") {
					if(this.FieldMessage.type == 1 || this.FieldMessage.type == 2){
						if(this.options.length != 0){
							let contents = '';
							this.options.map(el => {
								if(el.name != '') {
									contents = contents + "-" + el.name
								}
							})
							API.post('/taskType/saveField', {
								name: this.FieldMessage.name,
								describes: this.FieldMessage.describe,
								type: this.FieldMessage.type,
								eid: sessionStorage.getItem('enterpriseId'),
								default_field: 2,
								contents: contents.substr(1),
								icon: this.selectList[this.FieldMessage.type-1].icon
							}).then(res => {
								this.FieldMessage.name = ''
								this.FieldMessage.describe = ''
								this.FieldMessage.type = 1
								this.options = []
								this.addFieldBol = false
								let obj = {}
								obj.colseBol = false
								obj.SHBol = false
								obj.btnBol = false
								obj.showListBol = false
								for(let i in res.data.data){
									obj[i] = res.data.data[i]
								}
								this.newField.push(obj)
								this.$notify({
					            title: '成功',
						            message: '添加成功',
						            type: 'success'
						        });
							})
						}else{
							this.$notify({
						        title: '警告',
						        message: this.selectList[this.FieldMessage.type-1].label + '必须有选项',
						        type: 'warning'
						    });
						}
					}else{
						let contents = '';
						this.options.map(el => {
							if(el.name != '') {
								contents = contents + "-" + el.name
							}
						})
						API.post('/taskType/saveField', {
							name: this.FieldMessage.name,
							describes: this.FieldMessage.describe,
							type: this.FieldMessage.type,
							eid: sessionStorage.getItem('enterpriseId'),
							default_field: 2,
							contents: contents.substr(1),
							icon: this.selectList[this.FieldMessage.type-1].icon
						}).then(res => {
							this.FieldMessage.name = ''
							this.FieldMessage.describe = ''
							this.FieldMessage.type = 1
							this.options = []
							this.addFieldBol = false
							let obj = {}
							obj.colseBol = false
							obj.SHBol = false
							obj.btnBol = false
							obj.showListBol = false
							for(let i in res.data.data){
								obj[i] = res.data.data[i]
							}
							this.newField.push(obj)
							this.$notify({
					            title: '成功',
					            message: '添加成功',
					            type: 'success'
					        });
						})
					}
					
				}else{
					this.$notify({
				        title: '警告',
				        message: '字段名称不能为空',
				        type: 'warning'
				    });
				}
			},
			//保存任务类型
			saveTaskType() {
				this.saveMTBol = false
				let fieldJson = [];
				this.defaults.map(el => {
					fieldJson.push({
						id: el.id,
						shows: el.showListBol ? 1 : 2
					})
				})
				API.post('/taskType/updateTaskType', {
					id:this.taskTypeId,
					name: this.taskTypeName,
					projectId: sessionStorage.getItem('projectId'),
					icon: this.icons[this.iconIndex],
					fieldJson: JSON.stringify(fieldJson)
				}).then(res => {
					this.$notify({
					    title: '成功',
					    message: '修改成功',
					    type: 'success'
				    });
				    this.closeAddField()
				})

			},
			//获取字段
			getField() {
				API.post('/taskType/showTypeField', {
					typeId: this.taskTypeId,
					eid: sessionStorage.getItem('enterpriseId')
				}).then(res => {
					this.myArray = []
					this.newField = []
					res.data.data.haveField.map(el => {
						this.$set(el,'colseBol',false);
						this.$set(el,'SHBol',false);
						this.$set(el,'btnBol',false);
						this.$set(el,'showListBol',true);
						this.myArray.push(el)
						

					})
					res.data.data.notField.map(el => {
						this.$set(el,'colseBol',false);
						this.$set(el,'SHBol',false);
						this.$set(el,'btnBol',false);
						this.$set(el,'showListBol',true);
						this.newField.push(el)

					})
				})
			}
		},
		watch: {
			FieldMessage:{
				handler(val,oldval){
					this.options = []
				},
				deep:true
			},
			taskTypeId(){
				this.getField()
			},
			//Fieldindex 控制关闭按钮的显隐
			Fieldindex() {
				for(let i in this.myArray) {
					if(this.Fieldindex == i) {
						this.myArray[i].colseBol = true
					} else {
						this.myArray[i].colseBol = false
					}
				}
			},
			//检测myArray 当这个数组的长度为0时 传进一个空的元素 当有新的元素加进来的时候把空元素删除
			myArray() {
				this.Fieldindex = NaN
				if(this.myArray.length == 0) {
					this.myArray.push({
						name: ''
					})
					this.defaults = []
				} else if(this.myArray[0].name != '') {
					this.defaults = this.myArray
					for(let i = this.myArray.length - 1; i > 0; i--) {
						if(this.myArray[i].name == '') {
							this.myArray.splice(i, 1)
						}
					}
				}
			},
			//
			value3() {
			},
			edittasktypeBol(){
				if(this.edittasktypeBol){
					this.getField()
				}
			}
		},
		created() {
			this.defaults = this.myArray
			this.getField()
		}
	}
</script>

<style scoped>
	.addFieldBox {
		width: 100vw;
		height: 100vh;
		background-color: #F7F7F7;
		position: fixed;
		top: 0;
		z-index: 10;
		left: 0;
	}
	
	.addFieldHeader {
		display: flex;
		justify-content: space-between;
		background: white;
		height: 70px;
		box-shadow: 0px 0px 10px #e3e3e3;
	}
	
	.addFieldHeaderRight {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}
	
	.addFieldHeaderRight .close {
		margin-left: 20px;
	}
	
	.addFieldHeaderLeft {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.addFieldHeaderLeft p {
		color: #a6a6a6;
		font-size: 10px;
	}
	
	.addFieldBody {
		margin-top: 20px;
		color: #858585;
	}
	
	.addFieldBody .left {
		margin-left: 15%;
		float: left;
		width: 750px;
		background: white;
		border-radius: 4px;
		box-shadow: -1px 1px 20px 0px #e3e3e3;
		padding: 20px;
	}
	
	.addFieldBody .left .spans {
		margin-top: 10px;
	}
	
	.addFieldBody .left .spans span {
		margin-right: 10px;
	}
	
	.addFieldBody .left .location span {
		padding: 2px 10px;
		border-radius: 4px;
		background: #F7F7F7;
	}
	
	.addFieldBody .left h2 {
		margin-top: 10px;
	}
	
	.addFieldBody .left .addChildTask {
		margin-top: 10px;
	}
	
	.addFieldBody .left .childTask {
		margin-top: 10px;
	}
	
	.addFieldList {
		margin-top: 10px;
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		padding: 10px 0;
		line-height: 40px;
	}
	
	.addFieldList span {
		margin-left: 40px;
	}
	
	.addFieldList .itemAddField {
		position: relative;
		width: 100%;
	}
	
	.addFieldList .itemAddField .itemAddFieldClose {
		position: absolute;
		top: 0;
		left: -40px;
		color: #bfdff7;
	}
	
	.rights{
		height: 80vh;
		overflow: auto;
	}
	
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.rights::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.rights::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.rights::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}
	
	.addFieldBody .right {
		float: right;
		width: 270px;
	}
	
	.addFieldBody .right .addField {
		width: 100%;
		height: 54px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: white;
		color: #4aaef6;
		cursor: pointer;
	}
	
	.addFieldBody .right .itemAddField {
		margin-top: 10px;
		width: 100%;
		height: 54px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: white;
		cursor: pointer;
		border-radius: 6px 0 0 6px;
		position: relative;
	}
	
	.addFieldBody .right .itemAddField .iconbtn {
		position: absolute;
		right: 20px;
	}
	
	.addFieldBody .right .itemAddField .SH {
		padding: 10px 20px;
		position: absolute;
		top: 40px;
		right: 20px;
		width: 200px;
		/*height: 100px;*/
		background: white;
		z-index: 3;
		box-shadow: 0px 0px 10px 0px gainsboro;
	}
	
	.addFieldBody .right .itemAddField .SH2 {
		padding: 10px 20px;
		position: absolute;
		top: -110px;
		right: 20px;
		width: 200px;
		height: 100px;
		background: white;
		z-index: 3;
		box-shadow: 0px 0px 10px 0px gainsboro;
	}
	
	.addFieldBody .right .itemAddField .SH .SHTitle {
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 18px;
		margin-bottom: 10px;
	}
	
	.addFieldBody .right .itemAddField .SH .SHBody {
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.addFieldBody .right .itemAddField .SH .SHBody ul {
		width: 100%;
	}
	
	.addFieldBody .right .itemAddField .SH .SHBody ul li {
		line-height: 40px;
		border-top: 1px solid #C3C3C3;
		font-size: 14px;
		font-weight: none;
	}
	
	.addFieldBody .right .itemAddField .SH .SHBody ul li:hover {
		background: #fcfcfc;
	}
	
	.addFieldBody .right .itemAddField:hover {
		box-shadow: -1px 1px 20px 0px #e3e3e3;
		/*color: #4aaef6;*/
	}
	
	.defaults {
		margin-top: 40px;
	}
	
	.rightDis {
		margin-right: 10px;
	}
	
	.icons {
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.field {
		height: 40px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.addOptionBtn {
		width: 100%;
		height: 40px;
		border: 1px solid #DCDCDC;
		border-radius: 4px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.addOptionBtn>p {
		margin-left: 12px;
		color: #CCCCCC;
	}
	
	.addFieldMTBox {
		display: block;
		height: 400px;
		overflow-x: hidden;
		padding-right: 10px;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
	
	.addFieldMTBox::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: white;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.addFieldMTBox::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/
	
	.addFieldMTBox::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: white;
	}
	
	.radioIcons {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.radioIcons .radioIcon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		border: 1px solid #CCCCCC;
		margin-right: 10px;
		border-radius: 4px;
	}
	
	.radioIconac {
		border: 1px solid rgb(119, 194, 248) !important;
	}
	
	.saveMTBox h2 {
		margin-bottom: 10px;
		font-size: 16px;
	}
	
	.saveMTBox p {
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 12px;
		color: gray;
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
	.rightss {
		color: #f94f4f;
	}
</style>
