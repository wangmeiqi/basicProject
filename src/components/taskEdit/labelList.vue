<!--
	任务标签列表的显示
-->
<template>
	<div>
		<div v-for="(row,index) in labelList" class="rows">
			<el-row>
				<el-col :span="4">
					<div class="alCenter">
						<div>
							<i :class="row.icon" style="margin-right: 10px;"></i>
						</div>
						<div>
							{{row.name}}
						</div>
					</div>
				</el-col>
				<el-col :span="20" class="lingH">
					<!--备注-->
					<div v-show="!row.hide && row.id==1" class="alCenter">
						<span v-html="row.contents==''?'待添加':row.contents" @click.stop="row.hide=true;rowIndex=index"></span>
					</div>
					<!--工时-->
					<div v-if="!row.hide && row.id==5" class="alCenter">
						<span @click.stop="row.hide=true;rowIndex=index" class="bgColor">
							{{'计划工时 ' + row.map.planTime + ' 小时，实际已用工时 ' + row.map.countTime + ' 小时'}}
						</span>
					</div>
					<!--进度-->
					<div v-if="!row.hide && row.id==6"  class="alCenter">
						<span class="bgColor" @click.stop="progress(row,index)">
							{{row.contents==''?'待添加':row.contents + '%'}}
						</span>
					</div>
					<!--任务目标-->
					<div v-if="!row.hide && row.id==4" class="alCenter">
						<span @click.stop="row.hide=true;rowIndex=index">
							{{row.contents==''?'待添加':row.contents}}
						</span>
					</div>
					<!--优先级-->
					<div v-if="row.id==2" class="alCenter">
						<div @click.stop="row.hide=true;rowIndex=index;schedule=row.contents" v-if="row.contents == ''" class="priority info">普通</div>
						<div @click.stop="row.hide=true;rowIndex=index;schedule=row.contents" v-if="row.contents == 1" class="priority info">普通</div>
						<div @click.stop="row.hide=true;rowIndex=index;schedule=row.contents" v-if="row.contents == 2" class="priority yellow">紧急</div>
						<div @click.stop="row.hide=true;rowIndex=index;schedule=row.contents" v-if="row.contents == 3" class="priority red">非常紧急</div>
					</div>
					<!--单选-->
					<div v-if="row.type==1" class="alCenter">
						<span @click.stop="row.hide=true;rowIndex=index;schedule=row.contents">
							<span @click="getFiledList(row.id)">{{row.contents==''?'待添加':row.contents}}</span>
						</span>
					</div>
					<!--多选-->
					<div v-if="row.type==2" class="alCenter">
						<span @click.stop="row.hide=true;rowIndex=index;schedule=row.contents">
							<span @click="getFiledList(row.id)">{{row.contents==''?'待添加':row.contents}}</span>
						</span>
					</div>
					<!--数字-->
					<div v-if="!row.hide && row.type==3" class="alCenter">
						<span @click.stop="row.hide=true;rowIndex=index;schedule=row.contents">
							{{row.contents==''?'待添加':row.contents}}
						</span>
					</div>
					<!--日期-->
					<div v-if="!row.hide && row.type==4"  class="alCenter">
						<span @click.stop="rowIndex=index;schedule=row.contents">
							<datetem :defTime="row.contents" @send="update"></datetem>
						</span>
					</div>
					<!--文本-->
					<div v-if="!row.hide && row.type==5" class="alCenter">
						<span class="addText" @click.stop="row.hide=true;rowIndex=index;schedule=row.contents">
							{{row.contents==''?'待添加':row.contents}}
						</span>
					</div>
					<!--标签-->
					<div v-if="row.id==3" class="alCenter" @click.stop="rowIndex=index">
						<span @click.stop="row.hide=true;rowIndex=index;schedule=row.contents" v-if="row.lableList.length == 0">添加标签</span>
						<span v-if="row.lableList.length != 0" class="label" v-for="(item,index) in row.lableList" :style="bgColor(item.bq_color)">{{'● '+item.name}} <i @click="delLabel(item.id,index)" class="iconfont icon-guanbi" style="font-size: 12px;display: none;"></i></span>
						
						<i @click.stop="showLabelList(index,$event)" class="iconfont icon-tianjia" style="margin-left: 10px;color: #0a7ee9;"></i>
					</div>
					
					
					<div v-show="row.hide">
						<!--备注-->
						<div v-if="row.default_field == 1 && row.id==1">
							<richedit @close="row.hide=false" :defVal="row.contents" @save="join"></richedit>
						</div>
						<!--任务目标-->
						<div v-if="row.default_field == 1 && row.id==4">
							<textcomp :defVal="row.contents" @close="row.hide=false" @send="update"></textcomp>
						</div>
						<!--工时-->
						<div v-if="row.default_field == 1 && row.id==5">
							<worktime :params="{tid:taskId,fid:row.id}" :defVal="row.contents" :show="row.hide" styles="positions:absolute" @updWorkTime="updWorkTime"></worktime>
						</div>
						<!--进度-->
						<div v-if="row.default_field == 1 && row.id==6">
							<el-input-number style="margin-right: 4px;" v-model="row.contents" controls-position="right" :min="0" :max="100" size="mini"></el-input-number><span style="margin-right: 24px;">%</span>
							<el-button size="mini" @click="row.hide=false">取消</el-button>
							<el-button type="primary" size="mini" @click="updateField(row.contents,updSchedule)">确定</el-button>
						</div>
						<!--优先级-->
						<div v-if="row.default_field == 1 && row.id==2">
							<priority :itemIndex="row.contents" @sendIndex="update"></priority>
						</div>
						<!--单选-->
						<div v-if="row.default_field == 2 && row.type==1">
							<selectlist :defVal="row.contents" :show="row.hide" types="radio" :selectList="selectList" @radiosend="update"></selectlist>
						</div>
						<!--多选-->
						<div v-if="row.default_field == 2 && row.type==2">
							<selectlist :defVal="row.contents" :show="row.hide" types="checked" :selectList="selectList" @checksend="update"></selectlist>
						</div>
						<!--数字-->
						<div v-if="row.default_field == 2 && row.type==3">
							<numbertem :show="row.hide" :defNum="row.contents==''?0:row.contents" @close="row.hide = false" @send="update"></numbertem>
						</div>
						<!--文本-->
						<div v-if="row.default_field == 2 && row.type==5">
							<textareatem :defVal="row.contents" @close="row.hide=false" @send="update"></textareatem>
						</div>
						<!--标签-->
						<div v-if="row.default_field == 1 && row.id==3">
							<tags @send="addlabel" @close="row.hide=false" :show="row.hide" :params="row.lableList" :styles="lableStyle" @editFinish="editFinish" @delLabel="delLabel"></tags>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import API from 'api/http'
	import richedit from 'components/richEdit'
	import worktime from 'components/workTime'
	import textcomp from 'components/text_component'
	import priority from 'components/priority'
	import selectlist from 'components/select'
	import numbertem from 'components/number'
	import datetem from 'components/dateTem'
	import textareatem from 'components/textareaTem'
	import tags from 'components/tags'
	export default {
		components:{
			richedit,
			worktime,
			textcomp,
			priority,
			selectlist,
			numbertem,
			datetem,
			textareatem,
			tags
		},
		props:{
			labelList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			taskId:{
				type:Number,
				default:0
			},
			checkedBol:{
				default:0
			}
		},
		data(){
			return {
				rowIndex:0,
				schedule:0,				//进度
				selectList:[],
				lableStyle:''
			}
		},
		methods:{
			//如果进度是完成打钩的状态,进度是不能点击的
			progress(row,index){
				if(this.checkedBol==0){
					row.hide=true
					this.rowIndex=index
					this.schedule=row.content
				}
				
			},
			//删除标签
			delLabel(id){
				let index = this.labelList[this.rowIndex].lableList.findIndex(el => {
					return el.id == id
				})
				this.labelList[this.rowIndex].lableList.splice(index,1)
			},
	    	//背景颜色
	        bgColor(color){
	        	console.log(color)
	        	return 'background:' + color
	        },
			//标签修改完成
			editFinish(obj){
				this.labelList[this.rowIndex].lableList.map(el => {
					if(el.id == obj.id){
						el.name = obj.name;
						el.bq_color = obj.bq_color;
					}
				})
			},
			//添加标签
			addlabel(obj){
				let flag = false;
				let indexs = 0;
				this.labelList[this.rowIndex].lableList.map((el,index) => {
					if(el.name == obj.name){
						flag = true
						indexs = index
					}
				})
				if(flag){
					this.delLabel(obj.id,indexs)
				}else{
					this.updateField(obj.id,()=>{})
					this.labelList[this.rowIndex].lableList.push(obj)
				}
			},
			//显示标签列表
			showLabelList(index,el){
				console.log(el)
				this.labelList[index].hide=true;
				this.rowIndex=index;
				this.schedule=this.labelList[index].contents;
				this.lableStyle = "top:" + (el.clientY+20) + 'px;left:' + el.clientX + 'px'
			},
			//删除标签
			delLabel(id,index){
				this.$nextTick(()=>{
					API.post('/tasks/delLable',{
						taskId:this.taskId,
						lableId:id,
						fieldId:this.labelList[this.rowIndex].id
					}).then(res => {
						this.labelList[this.rowIndex].lableList.splice(index,1)
					})
				})
			},
			//获取字段选项
			getFiledList(id){
				API.get('/task/getFiledByED',{
					fieldId:id
				}).then(res=>{
					this.selectList = []
					res.data.data.map(el => {
						this.$set(el,'checked',false)
						this.selectList.push(el)
					})
				})
			},
			join(str){
				this.labelList[this.rowIndex].hide = false
				this.labelList[this.rowIndex].contents = str
				this.updateField(str,()=>{})
			},
			//修改字段
			updateField(content,fn){
				API.post('/tasks/updField',{
					eid: sessionStorage.getItem("enterpriseId"),
					projectId: sessionStorage.getItem("projectId"),
					default_field: this.labelList[this.rowIndex].default_field,
					type: this.labelList[this.rowIndex].type,
					tid: this.taskId,
					content: content,
					typeId: this.labelList[this.rowIndex].id
				}).then(res=>{
					fn()
				})
			},
			//更新工时
			updWorkTime(data){
				let workTimeIndex = this.labelList.findIndex(el => {
					return el.id == 5
				})
				console.log(data)
				this.labelList[workTimeIndex].map.planTime = data.plantTime
				this.labelList[workTimeIndex].map.countTime = data.facttime
			},
			//更新进度
			updSchedule(){
				this.labelList[this.rowIndex].hide = false
			},
			//数据更新
			update(val){
				this.labelList[this.rowIndex].hide = false
				this.labelList[this.rowIndex].contents = val
				this.updateField(val,()=>{})
			}
		},
		created(){
			this.labelList.map(el => {
				this.$set(el,'hide',false)
				let strs = ''
				if(el.taskAndFieldList != null){
					el.taskAndFieldList.map(li => {
						strs += li.content + ','
					})
				}
				
				let str = el.taskAndFieldList == null?'':strs.substr(0,strs.length-1)
				this.$set(el,'contents',str)
			})
			console.log(this.labelList)
		},
		watch:{
			labelList(){
				this.labelList.map(el => {
					this.$set(el,'hide',false)
					let strs = ''
					if(el.taskAndFieldList != null){
						el.taskAndFieldList.map(li => {
							strs += li.content + ','
						})
					}
					
					let str = el.taskAndFieldList == null?'':strs.substr(0,strs.length-1)
					this.$set(el,'contents',str)
				})
			},
			checkedBol(val){
				if(val==1){
					this.labelList[5].contents=100
				}else{
					this.labelList[5].contents=0
				}
			}
		}
	}
</script>

<style scoped>
	.rows{
		margin-bottom: 22px;
	}
	.alCenter{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;
		word-break: break-all;
		word-wrap: break-word;
	}
	.priority{
		padding: 0px 10px;
		border: 1px solid #000000;
		border-radius: 4px;
	}
	.red{
		color: #ef5520;
		border: 1px solid #ef5520;
	}
	.info{
		border: 1px solid #999999;
	}
	.yellow{
		color: #ffae44;
		border: 1px solid #ffae44;
	}
	.label{
		color: white;
		display: inline-block;
		padding: 2px 6px;
		border-radius: 4px;
		overflow: hidden;
		margin-right: 10px;
		background: #9CC9F2;
	}
	.label:hover>i{
		display: inline-block !important;
	}

	.addText{
		white-space: normal;
		word-wrap: break-word;
		word-break: break-all;
		width:100%;
		display:inline-block;
	}

	.lingH{
		line-height:24px;
	}
	
	.bgColor{
		border: 1px solid #0a7ee9;
		border-radius: 2px;
		padding: 0px 4px;
	}
</style>
<style type="text/css">
	.el-input-number__increase{
		background: none;
		border: none;
	}
	.el-input-number.is-controls-right .el-input-number__decrease{
		background: none;
		border: none;
	}
	.el-input-number.is-controls-right .el-input-number__increase{
		border-bottom: none;
	}
</style>