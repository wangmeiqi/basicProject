<template>
	<div class="viewBoxPubll">
		<div class="titles">
			<p class="title">全部任务概览</p>
		</div>
		<div class="task_view">
			<table>
				<tbody>
					<tr>
						<td class="text">未认领的任务数</td>
						<td class="td-bar">
							<div class="td-bar-bg" @click="viewTasksFun(1)">
								<p class="tooltip">全部任务数：{{allTasksList[0]}}<br/>未认领的任务数：{{allTasksList[1]}}<br/>总任务数占比：{{allTasksList[1]/allTasksList[0]*100 | tofixeds}}%</p>
								<div class="td-bar-ys ys01" v-if="allTasksList[0] == 0" style="width:0%;">
								</div>
								<div class="td-bar-ys ys01" v-else :style="'width:'+ allTasksList[1]/allTasksList[0]*100 +'%;'">
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="text">未开始的任务数</td>
						<td class="td-bar">
							<div class="td-bar-bg" @click="viewTasksFun(2)">
								<p class="tooltip">全部任务数：{{allTasksList[0]}}<br/>未开始的任务数：{{allTasksList[2]}}<br/>总任务数占比：{{allTasksList[2]/allTasksList[0]*100 | tofixeds}}%</p>
								<div class="td-bar-ys ys02" v-if="allTasksList[0] == 0" style="width:0%;">
								</div>
								<div class="td-bar-ys ys02" v-else :style="'width:'+allTasksList[2]/allTasksList[0]*100 +'%;'">
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="text">进行中的任务数 - 正常</td>
						<td class="td-bar">
							<div class="td-bar-bg" @click="viewTasksFun(3)">
								<p class="tooltip">全部任务数：{{allTasksList[0]}}<br/>进行中的任务数 - 正常：{{allTasksList[3]}}<br/>总任务数占比：{{allTasksList[3]/allTasksList[0]*100 | tofixeds}}%</p>
								<div class="td-bar-ys ys03" v-if="allTasksList[0] == 0" style="width:0%;">
								</div>
								<div class="td-bar-ys ys03" v-else :style="'width:'+allTasksList[3]/allTasksList[0]*100 +'%;'">
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="text">进行中的任务数 - 逾期</td>
						<td class="td-bar">
							<div class="td-bar-bg" @click="viewTasksFun(4)">
								<p class="tooltip">全部任务数：{{allTasksList[0]}}<br/>进行中的任务数 - 逾期：{{allTasksList[4]}}<br/>总任务数占比：{{allTasksList[4]/allTasksList[0]*100 | tofixeds}}%</p>
								<div class="td-bar-ys ys04" v-if="allTasksList[0] == 0" style="width:0%;">
								</div>
								<div class="td-bar-ys ys04" v-else :style="'width:'+allTasksList[4]/allTasksList[0]*100 +'%;'">
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="text">按时完成的任务数</td>
						<td class="td-bar">
							<div class="td-bar-bg" @click="viewTasksFun(5)">
								<p class="tooltip">全部任务数：{{allTasksList[0]}}<br/>按时完成的任务数：{{allTasksList[5]}}<br/>总任务数占比：{{allTasksList[5]/allTasksList[0]*100 | tofixeds}}%</p>
								<div class="td-bar-ys ys05" v-if="allTasksList[0] == 0" style="width:0%;">
								</div>
								<div class="td-bar-ys ys05" v-else :style="'width:'+allTasksList[5]/allTasksList[0]*100 +'%;'">
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td class="text">逾期完成的任务数</td>
						<td class="td-bar">
							<div class="td-bar-bg" @click="viewTasksFun(6)">
								<p class="tooltip">全部任务数：{{allTasksList[0]}}<br/>逾期完成的任务数：{{allTasksList[6]}}<br/>总任务数占比：{{allTasksList[6]/allTasksList[0]*100 | tofixeds}}%</p>
								<div class="td-bar-ys ys06" v-if="allTasksList[0] == 0" style="width:0%;">
								</div>
								<div class="td-bar-ys ys06" v-else :style="'width:'+allTasksList[6]/allTasksList[0]*100 +'%;'">
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="viewTasksDialog" v-if="viewTasksVisible">
			<div class="fieldBoxDialog"></div>
			<div class="fieldBox" @click="closeDialog">
				<div class="fieldHead">
					<p>{{allClickName[allName]}}</p> <span></span></div>
				<div class="dialog_body">
					<table>
						<tbody>
							<tr v-for="(val,index) in allTasksDialogList " @click.stop="taskEditFun(val.id)">
								<td class="xzBox" v-if="val.state == 1" @click.stop="cancleSelect(val.id,val.pid)"><span class="xzBtn xz-icon"></span></td>
								<td class="xzBox" v-if="val.state == 0" @click.stop="addSelect(val.id,val.pid)"><span class="xzBtn"></span></td>
								<td class="texts">{{val.name}}</td>
								<!--<td class="schedule">进度1/1</td>-->
								<td :class="val.colour  == 0 ? 'endTimes': 'endTimes yq'">{{val.endTimeStr}}</td>
								<td class="headImgs">
									<p class="imgs" v-if="val.implName == '' && val.imppic == ''" ><i class="iconfont icon-wode"></i></p>
									<p class="imgs" v-else-if="val.imppic == ''" >{{val.implName.substring(0,1)}}</p>
									<img v-else :src="val.imppic" alt="" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<TASKEDIT v-if='taskEditFlag' :styles='styless' :taskId='taskIds' @close='taskClose'></TASKEDIT>
	</div>
</template>

<script>
	import API from 'api/http'
	import Bus from 'assets/js/Bus.js'
	import TASKEDIT from 'components/taskEdit/taskEdit'

	export default {
		name: '',
		components: {
			TASKEDIT
		},
		data() {
			return {
				styless: 'width:690px;height:600px',
				taskIds: 0, //详情页默认id
				taskEditFlag: false, //控制详情页是否显示
				proid: null,
				allName: 0, //全部任务数组索引值
				allClickName: ['未认领的任务数', '未开始的任务数', '进行中的任务数 - 正常', '进行中的任务数 - 逾期', '按时完成的任务数', '逾期完成的任务数'],
				allTasksDialogList: [], //弹框部分每个任务任务数组
				viewTasksVisible: false, //控制弹框显示默认值
				allTasksList: [] //全部任务概览
			}
		},
		methods: {
			//控制弹框显示隐藏事件
			viewTasksFlag() {
				this.viewTasksVisible = true;
			},
			//关闭弹框处理数据
			closeDialog() {
				this.viewTasksVisible = false;
				//alert(1)
			},
			//全部任务概览详情弹框
			viewTasksFun(index) {
				this.allName = index - 1;
				this.viewTasksFlag()
				//全部任务概览详情弹框
				API.get('/Report/showTasksPar', {
					proid: this.proid,
					sign: index
				}).then(res => {
					this.allTasksDialogList = res.data.data
					console.log('全部任务概览详情弹框', res.data.data)
				})
			}, //添加选择
			addSelect(val,valPid) {
				API.get('/tasks/getTaskPid', {
					taskId: val,
					parentId:valPid,
				}).then(res => {
					if(res.data.data == true) {
						API.get('/tasks/getTaskContent', {
							eid: this.eid,
							projectId: this.proid,
							taskId: val,
							parentId:valPid,
							stateChange: 1 //0是取消对勾 1是加上对勾
						}).then(res => {
							if(res.data.message == "SUCCESS") {
								API.get('/Report/showTasks', {
									proid: this.proid
								}).then(res => {
									console.log('右侧第一个11111111111', res.data.data)
									this.allTasksList = res.data.data
								})
								API.get('/Report/taskNexts', {
									proid: this.proid
								}).then(res => {
									Bus.$emit('onnextTaskBox', res.data.data)
									//									console.log('右侧第2个121212', res.data.data)
									//									this.allList = res.data.data
								})
								API.get('/Report/taskCompSeven', {
									proid: this.proid
								}).then(res => {
									Bus.$emit('ontaskCompSevenBox', res.data.data)
								})
								API.get('/Report/showTasksPar', {
									proid: this.proid,
									sign: this.allName + 1
								}).then(res => {
									this.allTasksDialogList = res.data.data
									//console.log('全部任务概览详情弹框', res.data.data)
								})
							}
						})
					} else {
						this.$message({
							message: '子任务或父任务有未全部完成，无法完成父任务！',
							type: 'warning'
						});
					}
				})
			},
			//取消选择
			cancleSelect(val,valPid) {
				API.get('/tasks/getTaskPid', {
					taskId: val,
					parentId:valPid,
				}).then(res => {
					if(res.data.data == true) {
						API.get('/tasks/getTaskContent', {
							eid: this.eid,
							projectId: this.proid,
							taskId: val,
							parentId:valPid,
							stateChange: 0 //0是取消对勾 1是加上对勾
						}).then(res => {
							if(res.data.message == "SUCCESS") {
								API.get('/Report/showTasks', {
									proid: this.proid
								}).then(res => {
									console.log('右侧第一个11111111111', res.data.data)
									this.allTasksList = res.data.data
								})
								API.get('/Report/taskCompSeven', {
									proid: this.proid
								}).then(res => {
									Bus.$emit('ontaskCompSevenBox', res.data.data)
									//console.log('右侧第2个121212', res.data.data)
									//this.allList = res.data.data
								})
								API.get('/Report/taskNexts', {
									proid: this.proid
								}).then(res => {
									Bus.$emit('onnextTaskBox', res.data.data)
								})
								API.get('/Report/showTasksPar', {
									proid: this.proid,
									sign: this.allName + 1
								}).then(res => {
									this.allTasksDialogList = res.data.data
									//									console.log('全部任务概览详情弹框', res.data.data)
								})
							}
						})
					}
				})

			},
			taskEditFun(msg) {
				this.taskIds = Number(msg); //对应的id值
				this.taskEditFlag = true; //控制详情页是否显示

			},
			taskClose() {
				this.taskEditFlag = false;
			}
		},
		created() {
			//接收组件通信信息
			Bus.$on('onallTaskBox', (msg) => {
				this.allTasksList = msg
			});
			//接收组件通信信息 proid
			Bus.$on('toAllId', (msg) => {
				this.proid = msg
			});

		},
		watch: {

		},
		//小数点保留两位过滤器
		filters: {
			tofixeds: function(value) {
				value = Number(value)
				return value.toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.taskEditBackGround {
		z-index: 100;
	}
	
	.viewBoxPubll {
		border-radius: 5px;
		background: #f7f7f7;
		padding: 16px;
		margin-bottom: 25px;
		.titles {
			display: flex;
			height: 20px;
			color: #808080;
			font-size: 14px;
			margin-bottom: 16px;
			p.title {
				flex: auto;
			}
			span.description {
				flex: none;
			}
		}
		.task_view {
			table {
				width: 100%;
			}
			table tr td {
				border-collapse: collapse;
				padding: 8px;
				white-space: nowrap;
				text-align: right;
			}
			table tr td.text {
				width: 157px;
			}
			table tr td.td-bar {
				width: 100%;
				cursor: pointer;
				.td-bar-bg {
					position: relative;
					width: 100%;
					height: 16px;
					background: #fff;
					p.tooltip {
						display: none;
						z-index: 99;
						position: absolute;
						top: -50%;
						left: 50%;
						width: auto;
						height: auto;
						min-width: 100px;
						border-radius: 5px;
						text-align: left;
						padding: 10px;
						background: rgba(0, 0, 0, 0.5);
						font-size: 12px;
						color: #fff;
						line-height: 20px;
					}
					.td-bar-ys {
						width: 0%;
						height: 16px;
						position: relative;
					}
					.td-bar-ys.ys01 {
						background-color: rgb(255, 229, 78);
					}
					.td-bar-ys.ys02 {
						background-color: rgb(255, 175, 56);
					}
					.td-bar-ys.ys03 {
						background-color: rgb(61, 168, 245);
					}
					.td-bar-ys.ys04 {
						background-color: rgb(255, 79, 62);
					}
					.td-bar-ys.ys05 {
						background-color: rgb(117, 201, 64);
					}
					.td-bar-ys.ys06 {
						background-color: rgb(121, 126, 201);
					}
				}
				.td-bar-bg:hover {
					box-shadow: 0px 0px 5px 0px #999;
					.tooltip {
						display: block;
					}
				}
			}
		}
	}
	
	.viewTasksDialog {
		.fieldBoxDialog {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 30;
		}
		.fieldBox {
			width: 600px;
			height: 370px;
			padding: 20px;
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 30;
			margin-left: -300px;
			margin-top: -185px;
			background: #fff;
			.fieldHead {
				display: flex;
				align-items: center;
				text-align: center;
				font-size: 16px;
				height: 30px;
				color: #333;
				line-height: 30px;
				border-bottom: 1px solid #ccc;
				p {
					flex: 1;
				}
				span {
					cursor: pointer;
					width: 20px;
					height: 20px;
					background: url(../../assets/images/差号.png) no-repeat center center;
				}
			}
		}
	}
	
	.dialog_body {
		height: 340px;
		overflow-y: auto;
		table {
			width: 100%;
			tr {
				cursor: pointer;
				border-bottom: 1px solid #eee;
				td {
					border-collapse: collapse;
					padding: 8px;
					white-space: nowrap;
					font-size: 14px;
					color: #383838;
				}
			}
			tr:hover {
				background: #f7f7f7;
			}
		}
		td.xzBox {
			width: 30px;
			span.xzBtn {
				display: block;
				width: 16px;
				height: 16px;
				border: 2px solid #ccc;
			}
			span.xzBtn.xz-icon {
				background: url(../../assets/images/duihao.png);
			}
		}
		td.endTimes {
			width: 80px;
			text-align: right;
		}
		td.endTimes.yq {
			color: #f00;
		}
		td.headImgs {
			width: 30px;
			p.imgs{
					width: 20px;
					height: 20px;
					background: #ffae44;
					text-align: center;
					line-height: 20px;
					color:#fff;
					i{
						color:#fff;
						font-size: 12px;
					}
				}
			img {
				width: 20px;
				height: 20px;
			}
		}
	}
</style>