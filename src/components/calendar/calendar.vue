<template>
	<div class="calendarView">
		<div class="calendar-filter-view">
			<div class="rightStyle">
				<span class="others taskStyle" @click="taskState(taskstate)">
						<i v-if="this.taskstate==0" class="iconfont icon-xuanzekuang"></i>
						<i v-if="this.taskstate==1" class="iconfont icon-duoxuankuang2"></i>任务
					</span>
				<span class="others calendarStyle" @click="scheduleState(schedulestate)">
						<i v-if="this.schedulestate==0" class="iconfont icon-xuanzekuang"></i>
						<i v-if="this.schedulestate==1" class="iconfont icon-duoxuankuang2"></i>日程
					</span>
			</div>
			<!--搜索-->
			<div class="calendar-filter-search-form">
				<input class="search-form-input" type="text" placeholder="搜索" v-model="keys1" ref="input1" @keyup="searchAttentionMember()">
			</div>
			<!--已关注的人员列表-->
			<div class="calendar-filter-list thin-scroll">
				<ul class="filter-list">
					<li class="filter-list-cell" v-for="(items,index) in attentionMemberList[0]">
						<a class="cell-item" @click.stop.prevent="changeMemberState(items.id,items.state)">
							<span v-if="index==0">
									<i  class="iconfont icon-guanbi" style="font-size: 16px;color: #fff;"></i>
								</span>
							<span v-if="index!=0" class="close" @click.stop.prevent="cancelMember(items.id)">
									<i  class="iconfont icon-guanbi" style="font-size: 16px;"></i>
								</span>
							<span class="imgSpan">
									<img v-if="items.userpic != ''" :src="items.userpic"/>
                                    <div v-if="items.userpic ==''" class="img">{{items.username[0]}}</div>
									<!--<img v-if="items.userpic == ''" src="../../assets/images/头像.png" />-->
								</span>
							<span class="cell-name">{{items.username}}</span>
							<i v-if="items.state == 1" class="iconfont icon-duihao"></i>
						</a>
					</li>
					<li class="filter-list-cell" v-for="(items,index) in attentionMemberList[1]">
						<a class="cell-item" @click.stop.prevent="changeProjectState(items.id,items.state)">
							<span class="close" @click="cancelProject(items.id)">
									<i  class="iconfont icon-guanbi" style="font-size: 16px;"></i>
								</span>
							<span class="imgSpan">
									<img v-if="items.propic != ''" :src="items.propic"/>
                                    <div v-if="items.userpic ==''" class="img">{{items.proname[0]}}</div>
									<!--<img v-if="items.propic == ''" src="../../assets/images/头像.png" />-->
								</span>
							<span class="cell-name">{{items.proname}}</span>
							<i v-if="items.state == 1" class="iconfont icon-duihao"></i>
						</a>
					</li>
				</ul>
			</div>
			<!--添加关注-->
			<div class="calendar-filter-action">
				<center>
					<p class="calendar-filter-placeholder">点击下方「添加关注」<br>添加你所关心的成员或项目</p>
				</center>
				<button class="btn btnPrimary btn-open-subscriber" @click="centerDialogVisible = true">
						<i></i>
						<span>添加关注</span>
					</button>
			</div>
		</div>
		<div id='calendar'></div>
		<!--日历中添加日历和日程的弹框-->
		<div class="creatLayerDiv" v-show="creatLayer" :style='styles'>
			<ul class="list-unstyled">
				<li class="menu-item" @click="creatTask">
					<a>
						<span><i class="iconfont icon-duoxuankuang2"></i></span>
						<span>创建任务</span>
					</a>
				</li>
				<li class="menu-item" @click="creatScheduleLi">
					<a>
						<span><i class="iconfont icon-rili"></i></span>
						<span>创建日程</span>
					</a>
				</li>
			</ul>
		</div>
		<!--添加关注弹框-->
		<el-dialog :append-to-body='bol' title="添加关注" :visible.sync="centerDialogVisible" width="800px" class='div-dialog' center style="height: 610px;overflow: hidden;" @close='closeDialog'>

			<div class="modal-body" style="height: 400px;">
				<div class="calendar-subscriber-view">
					<div class="panel-left">
						<ul class="tab-list">
							<li class="tab-cell" v-for="(li,index) in navList" @click="navContent(index)">
								<a class="tab-item " data-tab="recommend" :class="{isActive:TabsIndex==index}">
									<span><i  :class="li.icon"></i></span>
									<span class="text">{{li.name}}</span>
								</a>
							</li>
						</ul>
					</div>
					<div class="panel-right">
						<!--成员列表-->
						<div v-if="TabsIndex==0" class="results-container">
							<!--搜索-->
							<div class="search-wrap">
								<div class="search-container">
									<span class="icon icon-search"></span>
									<input class="search-input" type="text" placeholder="搜索成员" v-model="keys2" ref="input2" @keyup="searchMember()">
								</div>
							</div>
							<div class="result-content thin-scroll">
								<ul class="result-list">
									<li class="result-cell" v-for="(li,index) in addMemberList">
										<span class="imgSpan">
											 <img v-if="li.user_img != ''" :src="li.user_img"/>
											 <!--<img v-if="li.user_img == ''" src="../../assets/images/头像.png" />-->
                                                <div v-if="li.user_img ==''" class="img">{{li.username[0]}}</div>
										</span>
										<div class="cell-content"> <span class="cell-title">{{li.username}}</span> </div>
										<div class="cell-handlers">
											<a v-if="li.flag==1" class="btn"> 已关注 </a>
											<a v-if="li.flag==0" class="btn btnGhost" @click="Addmember(li)"> 添加 </a>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<!--项目-->
						<div v-if="TabsIndex==1" class="results-container">
							<!--搜索-->
							<div class="search-wrap">
								<div class="search-container">
									<span class="icon icon-search"></span>
									<input class="search-input" type="text" placeholder="搜索项目" v-model="keys3" ref="input3" @keyup="searchProject()">
								</div>
							</div>
							<div class="result-content thin-scroll">
								<div>
									<div v-if="addProjectList.projectsList.length!=0" class="result-title">{{addProjectList.name}}</div>
									<ul class="result-list">
										<li class="result-cell" v-for="(li,index) in addProjectList.projectsList">
											<span class="imgSpan">
												 <img v-if="li.image != ''" :src="li.image"/>
												 <img v-if="li.image == ''" src="../../assets/images/头像.png" />
											</span>
											<div class="cell-content"> <span class="cell-title">{{li.name}}</span> </div>
											<div class="cell-handlers">
												<a v-if="li.flagg==1" class="btn"> 已关注 </a>
												<a v-if="li.flagg==0" class="btn btnGhost" @click="AddProject(li)"> 添加 </a>
											</div>
										</li>
									</ul>
								</div>

							</div>
						</div>

					</div>
				</div>
			</div>
		</el-dialog>
		<!--添加任务-->
		<addtask v-if="addTaskBol" :show="addTaskBol" :taskTimes='taskTime' @close="addTaskBol=false" @update="attentionMember"></addtask>
		<!--编辑任务-->
		<taskedit v-if="taskeditBol" :taskId="taskEditId" @close="taskeditBol=false"></taskedit>
		<!--添加日程-->
		<el-dialog :append-to-body='bol' :visible.sync="dialogVisible" width="680px" ref="closeCreator" class="shdlueLyer">
			<scheduleCreator v-if="dialogVisible" :dialogVisible="dialogVisible" :otherStartTime="testStartTime" :otherEndTime="testEndTime" @close="closeCreator" @creatSchedule="creatSchedule"></scheduleCreator>
		</el-dialog>
		<!--编辑日程-->
		<el-dialog :append-to-body='bol' :visible.sync="detailVisible" width="600px" ref="closeCreator" class="shdlueLyer">
			<scheduleDetail v-if="detailVisible" :detailvisible="detailVisible" @close="detailVisible=false" :scheduleID="scheduleId" @closeAllBoxs="closeAllBoxs"></scheduleDetail>
		</el-dialog>

	</div>

</template>

<script>
	import addtask from 'components/addTask' //新建任务
	import taskedit from 'components/taskEdit/taskEdit' //任务详情
	import scheduleCreator from '../../view/taskType/taskView/creatSchedule' // 新建日程组件
	import scheduleDetail from '../../view/taskType/taskView/scheduleDetail' // 日程详情
	import api from 'api/http'
	import Bus from 'assets/js/Bus.js'
	export default {
		props: {
			calenderShows: {
				type: Boolean,
				default: false
			}
		},
		components: {
			addtask,
			taskedit,
			scheduleCreator: scheduleCreator,
			//          scheduleActor: scheduleActor,
			scheduleDetail
		},
		data() {
			return {
				bol:true,
				testStartTime: '',
				testEndTime: '',
				centerDialogVisible: false, //添加成员弹框
				creatLayer: false, //创建任务日程弹框
				TabsIndex: 0,
				keys1: '', //已添加成员模糊搜索
				keys2: '', //弹框成员模糊搜索
				keys3: '', //弹框项目模糊搜索
				attentionMemberList: '', //左侧已关注的成员列表
				memberArr: [], //成员的id
				projectArr: [], //项目的id
				addMemberList: '', //成员列表
				addProjectList: '', //项目成员列表
				eventSList: [], //插件日历事件
				taskstate: '', //任务状态
				schedulestate: '', //日程状态
				styles: '', //添加任务日程动态样式
				addTaskBol: false, //添加任务标志
				taskeditBol: false, //编辑任务
				taskEditId: '', //编辑任务的id
				showtitle: "month", //显示月还是周，
				dialogVisible: false, //添加日程
				detailVisible: false, //编辑日程
				scheduleId: '', //日程的id
				taskTime: [], //添加任务的开始时间和结束时间
				navList: [
					//					{
					//						name: '推荐',
					//						icon: 'iconfont icon-zan'
					//					},
					{
						name: '成员',
						icon: 'iconfont icon-wode'
					},
					{
						name: '项目',
						icon: 'iconfont icon-xiangmuguanli'
					},
					//					{
					//						name: '部门',
					//						icon: 'iconfont icon-renyuan'
					//					}
				],

			}
		},
		methods: {
			//任务改变状态
			taskState(taskstate) {
				if(taskstate == 0) {
					this.taskstate = 1
				} else if(taskstate == 1) {
					this.taskstate = 0
				}

				$('#calendar').fullCalendar('destroy');
				this.calendar()

			},
			//日程改变状态
			scheduleState(schedulestate) {
				if(schedulestate == 0) {
					this.schedulestate = 1
				} else if(schedulestate == 1) {
					this.schedulestate = 0
				}
				$('#calendar').fullCalendar('destroy');
				this.calendar()
			},
			//加载左侧已关注的成员列表
			attentionMember() {
				this.memberArr = []
				this.projectArr = []
				//模糊查询传参
				let params = {
					name: this.keys1,

				}
				api.get('/Calendar/findMid', params).then(res => {
					this.attentionMemberList = res.data.data
					//获取成员seluid放memberArr数组里
					for(var i = 0; i < res.data.data[0].length; i++) {
						if(res.data.data[0][i].state == 1) {
							this.memberArr.push(res.data.data[0][i].seluid)
						}
					}
					//获取项目selproid放projectArr数组里
					for(var j = 0; j < res.data.data[1].length; j++) {
						if(res.data.data[1][j].state == 1) {
							this.projectArr.push(res.data.data[1][j].selproid)
						}
					}

				}).then(() => {
					$('#calendar').fullCalendar('destroy');
					this.calendar()
				})
			},
			//已加载成员模糊搜索
			searchAttentionMember() {
				this.keys1 = this.$refs.input1.value
				this.attentionMember()
			},
			//弹框成员模糊搜索
			searchMember() {
				this.keys2 = this.$refs.input2.value
				this.memberList()
			},
			//已加项目模糊搜索
			searchProject() {
				this.keys3 = this.$refs.input3.value
				this.projectList()
			},
			//点击成员项目关注，改变状态
			changeMemberState(id, state) {
				this.memberArr = []
				if(state == 1) {
					state = 0
				} else if(state == 0) {
					state = 1
				}
				let params = {
					id: id,
					state: state
				}
				api.get('/Calendar/updateUser', params).then(res => {
					this.attentionMember()
				})
			},
			//点击成员项目关注，改变状态
			changeProjectState(id, state) {
				this.projectArr = []
				if(state == 1) {
					state = 0
				} else if(state == 0) {
					state = 1
				}
				let params = {
					id: id,
					state: state
				}
				api.get('/Calendar/updatePro', params).then(res => {
					this.attentionMember()
				})
			},
			//点击添加关注显示弹框
			closeDialog() {
				//重新渲染弹框内的列表
				this.memberList()
				this.projectList()
			},
			//取消关注成员
			cancelMember(id) {
				let params = {
					id: id
				}
				api.get('/Calendar/delUser', params).then(res => {
					//重新调用成员列表
					this.attentionMember()
					this.projectList()
				})

			},
			//取消关注项目
			cancelProject(id) {
				let params = {
					id: id
				}
				api.get('/Calendar/delPro', params).then(res => {
					//重新调用成员列表
					this.attentionMember()
					this.projectList()
				})

			},
			//添加关注弹框  成员列表
			memberList() {
				let params = {
					username: this.keys2,
                    eid:sessionStorage.getItem('enterpriseId')
				};
				//成员列表接口
				api.get('/Calendar/findUsers', params).then(res => {
					this.addMemberList = res.data.data
				})
			},
			//添加关注弹框  项目列表
            projectList() {
                let proname = {
                    proname: this.keys3,
                };
                //项目列表接口
                let eid = sessionStorage.getItem('enterpriseId');
                    api.get('/Calendar/findProjects', proname).then(res => {
                        for(let i=0,le=res.data.data.length;i<le;i++){
                        if(res.data.data[i].id == eid){
                            this.addProjectList = res.data.data[i];
                        }
                    }
                })
            },
			//添加关注导航样式切换
			navContent(index) {
				this.TabsIndex = index;
			},
			//弹框内  成员点击添加
			Addmember(li) {
				let params = {
					state: '1',
					seluid: li.id,
					userpic: li.user_img,
					username: li.username
				}
				li.flag = 1
				api.get('/Calendar/addUser', params).then(res => {
					//重新渲染左侧已关注的列表
					this.attentionMember()

				})

			},
			//弹框内项目列表点击添加
			AddProject(li) {
				let params = {
					state: '1',
					selproid: li.id,
					propic: li.image,
					proname: li.name
				}
				li.flagg = 1
				api.get('/Calendar/addPro', params).then(res => {
					//重新渲染左侧已关注的列表
					this.attentionMember()

				})

			},
			findCalendar() {
				api.get('/Calendar/findCalendar').then(res => {
				    if(res && res.data && res.data.data){
                        this.taskstate = res.data.data[0].taskstate
                        this.schedulestate = res.data.data[0].schedulestate
                        //console.log(this.taskstate)
                    }
				})
			},
			//日程弹框
			closeCreator() {
//				sessionStorage.setItem('projectId','')
				this.dialogVisible = false;
				this.$refs.closeCreator.$el.click();
			},
			creatSchedule() {
				this.dialogVisible = false;
				this.$refs.closeCreator.$el.click();
				this.attentionMember()
			},
			//渲染日历
			calendar() {
        sessionStorage.setItem('addScheduleFalg','calendar')
				var eventSList = []

				//默认进来加载当前年月日
				var date = new Date();
				var seperator1 = "-";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				let currentdate1 = date.getFullYear() + seperator1 + month
				let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
				//日历插件的调用
				//				$(document).ready(function() {
				let params = {
					endtime: '2020-12', //日期 2018-05-14 23:50:01
					impIds: this.memberArr.toString(), //成员的id数组形式
					proIds: this.projectArr.toString(), //项目的id数组 形式
					taskstate: this.taskstate, //任务 不选0 选择1
					schedulestate: this.schedulestate, //日程 不选0 选择1
					todaystate: 0, //今天 不选0 选择是1
                    eid:sessionStorage.getItem('enterpriseId')||""
				}
				api.get('/Calendar/findTasksNM', params).then(res => {
//					console.log(res.data.data)
					this.eventSList = []
					let eventColor = ''
					var listTask = res.data.data[0] //任务
					var listSchedule = res.data.data[1] //日历
					//					console.log(list.length)
					if(listTask.length || listSchedule.length) {
						for(var i = 0; i < listTask.length; i++) {
							//日历任务改变颜色 sign   1未开始  2进行中 3完成 4逾期
							if(listTask[i].sign == 1) {
								eventColor = '#e7e7e7'
							} else if(listTask[i].sign == 2) {
								eventColor = '#9cc9f2'
							} else if(listTask[i].sign == 3) {
								eventColor = '#a9dbce'
							} else {
								eventColor = '#ffc6cd'
							}
							this.eventSList.push({
								proId:listTask[i].proId,
								id: listTask[i].id,
								title: listTask[i].name,
								start: listTask[i].startTimeStr,
								end: listTask[i].endTimeStr,
								color: eventColor
							})
						}
						for(var j = 0; j < listSchedule.length; j++) {
							this.eventSList.push({
								proId:listSchedule[j].proId,
								id: listSchedule[j].id,
								title: listSchedule[j].title,
								start: listSchedule[j].startTimeStr,
								end: listSchedule[j].endTimeStr,
								color: '#f6e3bf'
							})
						}
					} else {
						this.eventSList = []
					}
					let _this = this;
					$('#calendar').fullCalendar({
						header: {
							left: 'prev,next today',
							center: 'title',
							right: 'month,agendaWeek'
						},
						defaultDate: currentdate,
						lang: 'zh-cn',
						//height:2000,
						allDayText:'全天',
						timeFormat: "h:mm",
						timezone: 'local',
						monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
						monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
						dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
						dayNamesShort: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
						defaultView: _this.showtitle, //显示月还是周
						buttonText: {
							today: '今天',
							month: '月',
							week: '周',
							day: '天'
						},
						weekNumberTitle: "周",
						navLinks: true, // can click day/week names to navigate views
						selectable: true,
						selectHelper: true,
						editable: false,
						disableDragging:false,
						disableResizing:false,
						eventLimit: true, // allow "more" link when too many events
						firstDay: 1,
						select: function(startDate, endDate, allDay, jsEvent, view) {
							sessionStorage.setItem('projectId', '')
							//console.log(sessionStorage.setItem('projectId', ''))
							_this.taskTime = []
							//console.log(1)
							//console.log(startDate._d)
							//console.log(endDate._d)
							//console.log(2)
							_this.taskTime.push(new Date(startDate._d.getTime()-8 * 60 * 60 * 1000))
							_this.taskTime.push(new Date(endDate._d.getTime()-8 * 60 * 60 * 1000 - 1000))
							_this.testStartTime = Date.parse(new Date(startDate._d.getTime()-8 * 60 * 60 * 1000))
							_this.testEndTime = Date.parse(new Date(endDate._d.getTime()-8 * 60 * 60 * 1000 - 1000))
							//console.log(_this.testStartTime)
							//console.log(_this.testEndTime)
							if(jsEvent.name == "month") {
								_this.showtitle = "month"
							} else {
								_this.showtitle = "agendaWeek"
							}
							if(jsEvent.name == "agendaWeek" && startDate._ambigTime == false) {
								_this.testStartTime = Date.parse(new Date(startDate._d.getTime()))
								_this.testEndTime = Date.parse(new Date(endDate._d.getTime()))

								_this.creatLayer = false

								//直接添加日程
                _this.dialogVisible = true
							} else {
//								_this.testStartTime = Date.parse(new Date(startDate._d))
//								_this.testEndTime = Date.parse(new Date(endDate._d))
								//console.log(_this.testStartTime)
								//console.log(_this.testEndTime)
								_this.styles = 'top:' + allDay.clientY + 'px;left:' + allDay.clientX + "px"
								_this.creatLayer = !_this.creatLayer
							}

							//							var title = prompt('添加日历');
							//							var eventData;
							//							if(title) {
							//								eventData = {
							//									title: title,
							//									start: start,
							//									end: end
							//								};
							//								$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
							//							}
							$('#calendar').fullCalendar('unselect');
						},
						eventClick: function(event, element, jsEvent) {
							console.log(event)
							//点击事件触发
							//							console.log("点击事件触发");
							//							console.log(event)
							//							console.log(element)
							//							console.log(jsEvent)
							if(jsEvent.name == "month") {
								_this.showtitle = "month"
							} else {
								_this.showtitle = "agendaWeek"
							}

							//console.log(event.id);
							if(event.color == "#f6e3bf") {
								//项目权限设置
								api.get('/projectPermission/queryProjectPermission', {
									projectId: event.proId
								}).then(res => {
					//				console.log('=================================',res.data.data)
									sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
									Bus.$emit('toQueryProjectPermission', res.data.data)
									_this.detailVisible = true
									_this.scheduleId = event.id
								})

							} else {
								//项目权限设置
								api.get('/projectPermission/queryProjectPermission', {
									projectId: event.proId
								}).then(res => {
					//				console.log('=================================',res.data.data)
									sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
									Bus.$emit('toQueryProjectPermission', res.data.data)

									_this.taskeditBol = true
									_this.taskEditId = event.id
								})

							}

						},
						events: _this.eventSList
					});
					let str = ''
					str += "<span style='color:#333;margin-left:5px;line-height:30px'><i style='display: inline-block;width: 20px;height: 15px;background: #e7e7e7;margin-right: 2px;vertical-align: text-bottom;'></i>未开始</span>"
					str += "<span style='color:#333;margin-left:5px;line-height:30px'><i style='display: inline-block;width: 20px;height: 15px;background: #9cc9f2;;margin-right: 2px;vertical-align: text-bottom;'></i>进行中</span>"
					str += "<span style='color:#333;margin-left:5px;line-height:30px'><i style='display: inline-block;width: 20px;height: 15px;background: #a9dbce;margin-right: 2px;vertical-align: text-bottom;'></i>完成</span>"
					str += "<span style='color:#333;margin:0 18px 0 5px;line-height:30px;'><i style='display: inline-block;width: 20px;height: 15px;background: #ffc6cd;margin-right: 2px;vertical-align: text-bottom;'></i>逾期</span>"
					$('#calendar .fc-month-button').before(str);
					$('#calendar .fc-agendaWeek-button').after("<span  class='closeCalendar' style='margin:0 15px;cursor: pointer;'><i style='font-size:22px' class='iconfont icon-guanbi2'></i></span>");
					$(document).on('click', '.fc-header-toolbar', function() {
						$(".creatLayerDiv").hide()
						//						_this.taskeditBol = false
					})
					$(document).on('click', '.closeCalendar', function() {
						_this.$emit('close')
					})
				})

				//				});

			},
			//创建任务
			creatTask() {
				api.get('/projects/getProjectListByRole', {
					eid:sessionStorage.getItem('enterpriseId'),
					type:1	//1创建任务，2创建日程
				}).then(res => {
					console.log('-=-=-=-=',res.data.data)
				})
				this.creatLayer = false
				this.addTaskBol = true
			},
			//创建历程
			creatScheduleLi() {
				api.get('/projects/getProjectListByRole', {
					eid:sessionStorage.getItem('enterpriseId'),
					type:2	//1创建任务，2创建日程
				}).then(res => {
					console.log('-=-=-=-=',res.data.data)
				})
				//	alert("创建日程")
				this.creatLayer = false
				this.dialogVisible = true
			},
			closeAllBoxs() {
				this.attentionMember()
			},
		},
		created() {
			sessionStorage.setItem('projectId', '')
			$(document).on('click', '.nav li:eq(1)', function() {
				$(".calendarView").show()
			})
			this.findCalendar()
			setTimeout(() => {
				this.attentionMember() //加载已关注的成员列表
			}, 1);

			this.memberList() //弹框加载成员列表
			this.projectList() //弹框加载项目列表

		},
		watch: {
			taskeditBol() {
				if(!this.taskeditBol) {
					this.attentionMember()
				}
			},
			detailVisible() {
				if(!this.detailVisible) {
					this.attentionMember()
				}
			},
			calenderShows(val) {
				if(val) {
					this.attentionMember()
				}
			},
			addTaskBol(){
				if(!this.addTaskBol) {
					this.attentionMember()
				}
			}
		}
	}
</script>
<style scoped>
	.rightStyle {
		background: #f7f7f7;
		height: 53px;
		line-height: 53px;
		color: #666;
		margin-left: 20px;
	}

	#calendar {
		/*max-width: 900px;*/
		float: left;
		width: 84%;
	}

	.calendarView {
		padding: 93px 30px 0 10px;
		position: absolute;
		top: 0;
		background: #fff;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 95.3%;
		z-index: 20;
		left: 51px;
		padding-top: 10px;
		padding-bottom: 10%;
	}

	.calendar-filter-view {
		float: left;
		/*width: 265px;*/
		width: 16%;
	}

	.calendar-filter-search-form {
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
		transition: border-color 327ms ease;
		margin: 10px 20px 0;
		padding: 0 10px;
		line-height: 38px;
		border: 1px solid #d9d9d9;
		border-radius: 3px;
		color: #a6a6a6;
	}

	.search-form-input {
		font-size: 14px;
		border: none;
		color: #a6a6a6;
		outline: none;
		vertical-align: middle;
		width: 100%;
	}

	.calendar-filter-list {
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		margin: 20px 0;
		overflow-y: auto;
		height: 53.4vh;
		box-sizing: border-box;
	}

	.filter-list-cell {
		position: relative;
	}

	.filter-list .cell-item {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		height: 34px;
		padding-right: 20px;
		cursor: pointer;
	}

	.filter-list .cell-item:hover {
		color: #3da8f5;
	}

	.cell-icon.circle {
		border-radius: 50%;
	}

	.filter-list .cell-name {
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.calendar-filter-action {
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
		margin: 0 20px 20px;
	}

	.calendar-filter-placeholder {
		margin: 0 0 20px;
		font-size: 12px;
		line-height: 16px;
		color: #afafaf;
	}

	.btn-open-subscriber {
		width: 100%;
		line-height: 26px;
		text-align: center;
		color: #fff;
		background-color: #3da8f5;
		border-color: #3da8f5;
	}

	.btn {
		display: inline-block;
		padding: 8px 12px;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		border: 1px solid #d9d9d9;
		border-radius: 3px;
		white-space: nowrap;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.result-title {
		margin: 15px 20px 10px;
		font-size: 16px;
		line-height: 24px;
	}

	*+span {
		margin-left: 5px;
	}
	/*添加左侧导航样式*/

	.panel-left {
		width: 180px;
		border-right: 1px solid #e5e5e5;
	}

	.tab-cell {
		border-bottom: 1px solid #e5e5e5;
	}

	.calendar-subscriber-view .tab-item {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		padding: 20px 25px;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		cursor: pointer;
	}

	.calendar-subscriber-view .tab-item.isActive {
		padding-left: 21px;
		border-left: 4px solid #3da8f5;
		color: #3da8f5;
	}

	.calendar-subscriber-view .tab-item .text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.panel-right {
		width: 564px;
	}

	.calendar-subscriber-view .panel-left,
	.calendar-subscriber-view .panel-right {
		float: left;
		height: 100%;
	}

	.calendar-subscriber-view .results-container {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		height: 356px;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
	}

	.calendar-subscriber-view .search-container {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		height: 40px;
		margin: 20px 20px 0;
		padding: 0 10px;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		border: 1px solid #d9d9d9;
		border-radius: 3px;
		color: #383838;
		transition: border-color 0.3s ease;
	}

	.calendar-subscriber-view .search-container {
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
	}

	.calendar-subscriber-view .search-container .search-input {
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		font-size: 14px;
		line-height: 20px;
		border: 0;
		color: #383838;
		outline: 0;
	}

	.calendar-subscriber-view .result-content {
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		overflow-y: auto;
	}

	.calendar-subscriber-view .result-list {
		margin: 10px 20px;
	}

	.calendar-subscriber-view .result-cell {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		height: 50px;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		line-height: 20px;
	}

	.calendar-subscriber-view .result-cell .cell-content {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		overflow: hidden;
	}

	.calendar-subscriber-view .result-cell .cell-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
		line-height: 21px;
		color: #383838;
	}

	.calendar-subscriber-view .result-cell .cell-handlers {
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
		color: #a6a6a6;
	}

	.calendar-subscriber-view .result-cell .cell-handlers .add-handler {
		padding: 1px 9px;
		line-height: 20px;
	}

	.btnPrimary .badge,
	.btnGhost {
		background-color: #fff;
		color: #3da8f5;
		border: 1px solid #3da8f5;
	}

	.imgSpan {
		display: inline-block;
		width: 26px;
		height: 26px;
		border-radius: 26px;
		margin-right: 4px;
	}

	.imgSpan>img {
		width: 100%;
		height: 100%;
		border-radius: 26px;
	}

	.close {
		visibility: hidden;
	}

	.cell-item:hover>.close {
		visibility: initial;
		/*display: inline-block;*/
	}
	/*创建任务和创建日历*/

	.creatLayerDiv {
		position: fixed;
		background: #fff;
		border: 1px solid #e1e1e1;
		z-index: 9;
		box-shadow: 0px 1px 7px 0px;
	}

	.list-unstyled {
		width: 198px;
		padding: 5px 0;
		min-height: 20px;
		max-height: 200px;
		overflow-y: auto;
	}

	.list-unstyled li {
		line-height: 20px;
		list-style: none;
	}

	li.menu-item>a {
		display: block;
		padding: 5px 35px 5px 15px;
		clear: both;
		line-height: 24px;
		color: gray;
		outline: 0 none;
		cursor: pointer;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.closeCalendar {
		cursor: pointer;
	}

	.others {
		font-size: 18px;
		margin-left: 10%;
	}

	.others i.iconfont {
		font-size: 18px;
	}

	.closeCalendar {
		line-height: 32px;
	}

	.closeCalendar i {
		font-size: 30px;
	}
</style>
<style>
	/* 弹框样式 */

	.shdlueLyer .el-dialog__header {
		display: none;
	}

	.shdlueLyer .el-dialog__body {
		padding: 0;
	}
	/* 时间控件样式 */

	.timewrap .time .schedule-time {
		width: 20px;
		height: 18px;
	}

	.time .schedule-time input {
		width: 100px;
		height: 18px;
		padding: 0;
		border: none;
		cursor: pointer;
		text-align: center;
	}

	.time .el-date-editor.el-input {
		width: auto;
	}

	.time .schedule-time i {
		display: none;
	}

	.creatSchedule .rowhide {
		display: none !important;
	}

	.creatSchedule .selectAddress {
		height: 254px !important;
	}

	.creatSchedule .footer {
		padding-top: 50px;
	}

	.shdlueLyer .project {
		display: none;
	}
    .img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #ffae44;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: white;
        -webkit-box-shadow: 0 0 10px #E6E6E6;
        box-shadow: 0 0 10px #E6E6E6;
    }
</style>
