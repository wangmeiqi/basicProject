<template>
	<div class="viewBoxPubll">
		<div class="titles">
			<p class="title">接下来的任务</p>
		</div>
		<div class="task_view" v-if="allList != 0">
			<table>
				<tbody>
					<tr v-for="(val,index) in allList " v-if="index<5" @click="taskEditFun(val.id)">
						<td class="xzBox"><span class="xzBtn" @click.stop="addSelect(val.id,val.pid)"></span></td>
						<td class="texts">{{val.name}}</td>
						<td class="schedule">完成度：{{val.taskPlan == '' ? '0':val.taskPlan}}%</td>
						<td :class="val.colour  == 0 ? 'endTimes': 'endTimes yq'">{{val.endTimeStr}}</td>
						<td class="headImgs">
							<p class="imgs" v-if="val.implName == '' && val.imppic == ''" ><i class="iconfont icon-wode"></i></p>
							<p class="imgs" v-else-if="val.imppic == ''" >{{val.implName.substring(0,1)}}</p>
							<img v-else :src="val.imppic" alt="" />
						</td>
					</tr>
				</tbody>
			</table>
			<a class="more" v-show="allList.length>5?true:false " @click="moerFun">查看更多</a>
		</div>
		<div class="task_view" v-else>
			<p class="noDate">接下来没有任务了哦，快去提前安排吧～</p>
		</div>
		<!--查看更多弹框-->
		<div class="viewTasksDialog" v-if="viewTasksVisible">
			<div class="fieldBoxDialog"></div>
			<div class="fieldBox" @click="closeDialog">
				<div class="fieldHead">
					<p>接下来的任务</p> <span></span></div>
				<div class="dialog_body">
					<table>
						<tbody>
							<tr v-for="(val,index) in allList " @click.stop="taskEditFun(val.id)">
								<td class="xzBox"><span class="xzBtn" @click.stop="addSelect(val.id,val.pid)"></span></td>
								<td class="texts">{{val.name}}</td>
								<td class="schedule">完成度：{{val.taskPlan == '' ? '0':val.taskPlan}}%</td>
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
				styless: 'width:690px;height:600px;',
				taskIds: 0, //详情页默认id
				taskEditFlag: false, //控制详情页是否显示
				proid: null,
				allList: [],
				eid: sessionStorage.getItem('enterpriseId'),
				viewTasksVisible: false, //控制弹框显示默认值
				childs: '' //判断是否有子集
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
			moerFun() {
				this.viewTasksFlag()
			},
			//添加选择
			addSelect(val,valPid) {
				API.get('/tasks/getTaskPid', {
					taskId: val,
					parentId:valPid,
				}).then(res => {
					//					console.log(res.data.data)
					if(res.data.data == true) {
						API.get('/tasks/getTaskContent', {
							eid: this.eid,
							projectId: this.proid,
							taskId: val,
							parentId:valPid,
							stateChange: 1 //0是取消对勾 1是加上对勾
						}).then(res => {
							console.log('================================',res.data.message)
							if(res.data.message == "SUCCESS") {
								API.get('/Report/showTasks', {
									proid: this.proid
								}).then(res => {
									console.log('右侧第一个11111111111', res.data.data)
									Bus.$emit('onallTaskBox', res.data.data)
								})
								API.get('/Report/taskNexts', {
									proid: this.proid
								}).then(res => {
									console.log('右侧第2个121212', res.data.data)
									this.allList = res.data.data
								})
								API.get('/Report/taskCompSeven', {
									proid: this.proid
								}).then(res => {
									Bus.$emit('ontaskCompSevenBox', res.data.data)
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
			//点击调用详情页弹框
			taskEditFun(msg) {
				this.taskIds = msg;
				this.taskEditFlag = true;
			},
			//关闭详情页弹框
			taskClose() {
				this.taskEditFlag = false;
			}
		},
		created() {
			//接收组件通信信息
			Bus.$on('onnextTaskBox', (msg) => {
				this.allList = msg
				console.log('ajjjjjjjjjjjkkkk', this.allList);
			});
			//接收组件通信信息 proid
			Bus.$on('toAllId', (msg) => {
				this.proid = msg
				console.log('sddddddddddd', this.proid);
			});
		},
		watch: {

		}
	}
</script>

<style lang="scss" scoped>
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
			p.noDate {
				padding: 15px 0;
				text-align: center;
				line-height: 50px;
				font-size: 16px;
				color: #666;
			}
			a.more {
				display: inline-block;
				height: 30px;
				line-height: 30px;
				font-size: 12px;
				color: #03a9f4;
				cursor: pointer;
			}
			table {
				width: 100%;
				tr {
					cursor: pointer;
					td {
						border-collapse: collapse;
						padding: 8px;
						white-space: nowrap;
						font-size: 14px;
						color: #383838;
					}
				}
				tr:hover {
					background: #fff;
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
			td.schedule {
				width: 80px;
				text-align: right;
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