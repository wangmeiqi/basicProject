<template>

	<div class="customField">
		<div class="fieldTitle">
			<div class="top">
				<h6>项目自定义字段</h6>
				<div class="topRight" @click="addFieldVisible = true">
					<span>+</span>
					<a href="javascript:;">创建自定义字段</a>
				</div>
			</div>
			<p>补充和拓展项目资料，满足更多使用场景, 也帮助团队成员了解项目重点。</p>
		</div>
		<div class="fieldCon">
			<template>
				<el-table :data="fieldList" style="width: 100%">
					<el-table-column prop="firmImage" label="名称">
					</el-table-column>
					<el-table-column prop="type" label="类型">
					</el-table-column>
					<el-table-column prop="value" label="值">
					</el-table-column>
					<el-table-column label="">
						<template slot-scope="scope">
							<el-button type="text" size="small" class="icon iconfont icon-bianji" @click="updateFieldMask(scope.row)"></el-button>
							<el-button type="text" size="small" class="icon iconfont icon-shanchu" @click="deleteFieldMask(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</div>

		<!--创建自定义字段-->
		<div class="dialogStyle">
		<el-dialog title="创建自定义字段" :visible.sync="addFieldVisible" width="30%" center @close="emptyAddField()">
			<span>
				<p class="line"></p>
          <div>
            <el-form >
              <el-form-item label="" >
                 <el-input v-model="addData.name" auto-complete="off" placeholder="输入名称，最多20个字" :maxlength='maxlength'></el-input>
              </el-form-item>
              <el-form-item label="" >
                <el-select v-model="addData.type"  placeholder="输入类型（单选）" @change="typeFlag=addData.type">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              </el-form>
            <div v-if="typeFlag==1||typeFlag==2">
              <el-form class="addOptions" v-model="addData.optionsList">
              <el-form-item label="" v-for="(item,$index) in addData.optionsList" :key="$index">
                 <el-input :value="item" auto-complete="off" @input="item =changeValue($index,$event)" placeholder="输入选项，最多20个字" :maxlength='maxlength'></el-input>
                <span class="optionClose icon iconfont icon-guanbi" @click="delOptions($index)"></span>
			</el-form-item>

			</el-form>
			<!---->
			<div class="addBtn" @click="addOptions()">输入选项，最多20个字</div>

	</div>
	</div>
	<el-button class="save" type="primary" @click="addField()">保 存</el-button>
	</span>
	</el-dialog>
	</div>
	<!--创建自定义字段-->

	<!--更新自定义字段-->
	<div class="dialogStyle">
	<el-dialog title="更新自定义字段" :visible.sync="updateFieldVisible" width="30%" center @close="emptyUpdateField()">
		<span>
			<p class="line"></p>
          <div class="updateMask">
            <el-form >
              <el-form-item label="" >
                 <el-input v-model="updateData.name"  auto-complete="off" placeholder="输入项目名称" :maxlength='maxlength'></el-input>
              </el-form-item>
              <el-form-item label="" >
                <el-select v-model="updateData.type" disabled  placeholder="项目类型">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div v-if="updateTypeFlag==1||updateTypeFlag==2">
              <div class="updateOptions">
                <span>选项</span>
		<p></p>
		</div>
		<el-form>
			<el-form-item label="" v-for="(item,$index) in updateData.optionsList" :key="$index">
				<el-input auto-complete="off" :value="item" placeholder="输入选项，最多20个字" @input="item =changeUpdateValue($index,$event)" :maxlength='maxlength'></el-input>
				<span class="optionClose icon iconfont icon-guanbi" @click="deleteOptions($index)"></span>
			</el-form-item>
		</el-form>
		<div class="addBtn" @click="updateOptions()">输入选项，最多20个字</div>
		</div>

		<el-button class="save update" type="primary" @click="editField()">保存</el-button>
		</div>

		</span>
	</el-dialog>
	</div>
	<!--更新自定义字段-->

	<!--删除自定义字段-->
	<div class="dialogStyle">
	<el-dialog title="删除自定义字段" :visible.sync="deleteFieldVisible" width="30%" center>
		<span>
			<p class="line"></p>
         <p class="deleteContent">注意！删除该字段将会移除之前所有的数据，所有应用的项目资料也将不再展示该字段。</p>
          <el-button class="save delete" type="primary" @click="deleteField()" style="border: 1px solid #ef5520;">确认</el-button>
        </span>
	</el-dialog>
	</div>
	<!--删除自定义字段-->

	</div>

</template>

<script>
	import API from 'api/http'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				maxlength: 20,
				addFieldVisible: false, //创建弹框
				updateFieldVisible: false, //更新弹框
				deleteFieldVisible: false, //删除弹框
				typeList: ['单选', '多选', '日期', '数字', '文本'],
				fieldList: [], //列表数据存储
				typeFlag: 1, //判断五种类型渲染不同视图
				deleteId: 0, //删除
				updateId: 0, //编辑
				updateTypeFlag: 1, //回显获取类型
				value1: '123',
				options: [{
						value: '1',
						label: '单选'
					},
					{
						value: '2',
						label: '多选'
					},
					{
						value: '3',
						label: '日期'
					},
					{
						value: '4',
						label: '数字'
					},
					{
						value: '5',
						label: '文本'
					},
				],
				addData: { //添加数据
					name: '',
					type: '',
					optionsList: [],
					value: '',
				},
				updateData: {
					name: '',
					type: '',
					value: '',
					optionsList: ['正在运行', '已取消']
				},

			}
		},
		methods: {
			//获取自定义字段列表
			getFieldList() {
				this.fieldList = [];
				API.post('/projectFields/findAllFields', {
						enterpriseId: sessionStorage.getItem('enterpriseId'),
						//enterpriseId: 1
					})
					.then(res => {
						console.log(res.data.data);
						let list = res.data.data;
						for(var i = 0; i < list.length; i++) {
							var listObj = {};
							listObj.firmImage = list[i].name;
							listObj.type = this.typeList[Number(list[i].type) - 1];
							listObj.id = list[i].id;
							if(list[i].type == 3) {
								listObj.value = '-';
							} else if(list[i].type == 4) {
								listObj.value = '-';
							} else if(list[i].type == 5) {
								listObj.value = '-';
							} else {
								listObj.value = list[i].value;
							}
							this.fieldList.push(listObj)
						}
					})
			},
			//新增保存数据
			addField() {
				if(this.addData.name != '' && this.addData.type != '') {
					if((this.addData.type == 1 && this.addData.optionsList != '') || (this.addData.type == 2 && this.addData.optionsList != '')) {
						this.addAjax();
					} else if((this.addData.type != 1 && this.addData.optionsList == '') || (this.addData.type != 2 && this.addData.optionsList == '')) {
						this.addAjax();
					} else {
						alert("请将数据输入完整");
					}
				} else {
					alert("请将数据输入完整");
				}

			},
			//新增数据请求
			addAjax() {
				let valueArr = this.addData.optionsList.join();
				console.log(valueArr);
				API.post('/projectFields/addFields', {
						//enterpriseId: 1,
						enterpriseId: sessionStorage.getItem('enterpriseId'),
						name: this.addData.name,
						type: this.addData.type,
						value: valueArr,
					})
					.then(res => {
						console.log(res);
						if(res.data.message == 'SUCCESS') {
							this.addFieldVisible = false;
							this.getFieldList();
							this.emptyAddField();
						}
					})
			},
			//新增
			changeValue(index, e) {
				this.addData.optionsList[index] = e;
			},
			//修改
			changeUpdateValue(index, e) {
				this.updateData.optionsList[index] = e
			},
			//添加新增选项框
			addOptions() {
				this.addData.optionsList.push('');
			},
			//删除已添加选项数据
			delOptions(index) {
				//console.log(index);
				this.addData.optionsList.splice(index, 1);
			},
			//清空输入框内容
			emptyAddField() {
				this.addData.name = '';
				this.addData.type = '';
				this.addData.optionsList = [];
				this.typeFlag = 1;

			},
			//点击删除按钮
			deleteFieldMask(row) {
				this.deleteFieldVisible = true;
				console.log(row.id);
				this.deleteId = row.id;
			},
			//删除自定义列表数据
			deleteField() {
				this.deleteFieldVisible = false;
				API.post('/projectFields/deleteFields', {
						id: this.deleteId,
					})
					.then(res => {
						console.log(res);
						if(res.data.message == 'SUCCESS') {
							this.getFieldList()
						}
					})
			},
			//点击编辑按钮渲染编辑数据
			updateFieldMask(row) {
				this.updateFieldVisible = true;
				//console.log(row);
				this.updateId = row.id;
				this.updateTypeFlag = this.typeList.indexOf(row.type) + 1;

				API.post('/projectFields/findId', {
						id: row.id,
					})
					.then(res => {
						console.log(res.data.data);
						this.updateData.name = res.data.data.name;
						this.updateData.type = this.typeList[Number(res.data.data.type) - 1];
						this.updateData.optionsList = res.data.data.value.split(",");

					})
			},
			//编辑新增选项
			updateOptions() {
				this.updateData.optionsList.push('');
			},
			//删除已回显选项数据
			deleteOptions(index) {
				//console.log(index);
				this.updateData.optionsList.splice(index, 1);
			},
			//编辑保存数据
			editField() {
				if(this.updateData.name != '') {
					if((this.updateTypeFlag == 1 && this.updateData.optionsList != '') || (this.updateTypeFlag == 2 && this.updateData.optionsList != '')) {
						this.editAjax();
					} else if((this.updateTypeFlag != 1 && this.updateData.optionsList == '') || (this.updateTypeFlag != 2 && this.updateData.optionsList == '')) {
						this.editAjax();
					} else {
						alert("请将数据输入完整");
					}
				} else {
					alert("请将数据输入完整");
				}
			},
			//编辑保存请求
			editAjax() {
				this.updateFieldVisible = false;
				let valueArr = this.updateData.optionsList;
				let valueStr = valueArr.join();
				valueStr = valueStr.replace(/^,+/, "").replace(/,+$/, "");
				console.log(valueStr);
				API.post('/projectFields/updateFields', {
						id: this.updateId,
						name: this.updateData.name,
						value: valueStr,
					})
					.then(res => {
						console.log(res);
						if(res.data.message == 'SUCCESS') {
							this.getFieldList();
							this.emptyUpdateField();
						}
					})
			},
			//清空输入框内容
			emptyUpdateField() {
				this.updateData.name = '';
				this.updateData.type = '';
				this.updateData.value = '';
				this.updateData.optionsList = [];
			},

		},

		created() {
			this.getFieldList()
		},
		computed: {
			...mapGetters({
				getEnterpriseId: 'GET_ENTERPRISEID'
			})
		},
		watch: {
			getEnterpriseId() {
				this.getFieldList()
			}
		}
	}
</script>

<style scoped lang="scss">
	.customField {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 30px;
		overflow-y: auto;
		overflow-x: hidden;
		* {
			box-sizing: border-box;
			font-style: normal;
			text-decoration: none;
		}
		.fieldTitle {
			border-bottom: 1px solid #ececec;
			.top {
				display: flex;
				justify-content: space-between;
				h6 {
					font-size: 15px;
				}
				.topRight {
					span {
						cursor: pointer;
						display: inline-block;
						width: 18px;
						height: 18px;
						line-height: 16px;
						text-align: center;
						border-radius: 50%;
						background: #077ce7;
						color: #fff;
					}
					a {
						font-size: 12px;
						color: #077ce7;
					}
				}
			}
			p {
				font-size: 12px;
				line-height: 41px;
				color: #888;
			}
		}
		.fieldCon {
			.el-button--text {
				font-size: 14px;
				color: #b8b8b8;
				&:hover {
					color: #077ce7;
				}
			}
		}
		.el-dialog__wrapper {
			div.el-dialog__header {
				padding: 0;
				margin: 30px !important;
				border-bottom: 2px solid #efefef;
				.el-dialog__title {
					font-size: 15px !important;
				}
			}
			.el-select {
				width: 100% !important;
			}
			.el-dialog--center .el-dialog__body {
				padding: 25px 25px 0 !important;
			}
		}
		.save {
			width: 100%;
			height: 34px;
			line-height: 34px;
			padding: 0;
			margin-top: 20px;
		}
		.updateMask {
			.updateOptions {
				height: 32px;
				margin-bottom: 20px;
				display: flex;
				justify-content: flex-start;
				span {
					width: 10%;
					text-align: center;
					font-size: 12px;
					border-bottom: 2px solid #007ae6;
				}
				p {
					width: 90%;
					border-bottom: 2px solid #efefef;
				}
			}
			.el-input__inner {
				position: relative;
			}
			.optionClose {
				position: absolute;
				font-size: 12px;
				top: 0;
				right: 15px;
				color: #c0c4cc;
			}
		}
		.addOptions {
			.el-input__inner {
				position: relative;
				padding: 0 30px 0 15px;
			}
			.optionClose {
				position: absolute;
				font-size: 12px;
				top: 0;
				right: 15px;
				color: #c0c4cc;
			}
		}
		.delete {
			background: #ef5520;
		}
		.deleteContent {
			margin-bottom: 30px;
		}
		.addBtn {
			cursor: pointer;
			width: 100%;
			height: 40px;
			line-height: 40px;
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			color: #c0c4cc;
			padding: 0 15px;
		}
	}
	.line{
		width: 100%;
		height: 1px;
		background:#ccc;
		    margin-bottom: 20px;
	}
	
</style>
<style>
	.dialogStyle  .el-dialog__header {
    padding: 20px 20px 20px;
}
	.dialogStyle .el-dialog--center .el-dialog__body {
    padding-top: 0;
}
</style>