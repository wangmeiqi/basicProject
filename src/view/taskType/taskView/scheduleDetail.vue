<template>
	<div class="taskEditBackGround" @click="$emit('close')">
		<div class="taskEditBox" :style="styles" @click.stop="closeAllBox">
			<div class="taskEditBox-section">
				<div class="taskEditBox-header">
					<div class="taskTitle">
						<div class="taskTitleName">
							<span @click.stop="tId = fatherId==0?tId:fatherId">{{scheduleDetails.projectName}}</span>
						</div>
						<div>
						<!--<el-tooltip content="点个赞" placement="top">
						  <i class="iconfont icon-zan"></i>
						</el-tooltip>-->

							<i @click.stop="pullDownList($event)" class="iconfont icon-xiala"></i>
							<i @click.stop="$emit('close')" class="iconfont icon-guanbi"></i>
						</div>
					</div>
					<div class="taskTitle-name">
						<input type="text" maxlength="20" placeholder="日程标题" v-model="scheduleDetails.title" :class="{'protectame':titleShow}" class="originalInput" @focus="titleFocus" @blur="titleBlur">
					</div>
					<div class="event-detail-handler-set">
						<div class="event-detail-startDate">
							<h6 class="event-detail-handler-h6">开始时间</h6>
							<p class="event-detail-handler-content">
								<span class="iconfont icon-rili1"></span>
								<a class="time-a-info">
									<span>{{startTimeShow}}</span>
									<el-date-picker @change="TimeChange(0)" class="schedule-time start" :class="{'schedule-time-cover':true}" v-model="startTime" format="MM-dd HH:mm" value-format="timestamp" :picker-options="pickerStartTime" :default-value="startTime" :clearable='clearable' :type="fullDay?'date':'datetime'">
									</el-date-picker>
								</a>
							</p>
						</div>
						<div class="event-detail-endDate">
							<h6 class="event-detail-handler-h6">结束时间</h6>
							<p class="event-detail-handler-content">
								<a class="time-a-info">
									<span>{{endTimeShow}}</span>
									<el-date-picker class="schedule-time end" @change="TimeChange(1)" v-model="endTime" format="MM-dd HH:mm" value-format="timestamp" :picker-options="pickerEndTime" :default-value="endTime" :type="fullDay?'date':'datetime'">
									</el-date-picker>
								</a>
							</p>
						</div>
						<div class="event-detail-isAllDay">
							<h6 class="event-detail-handler-h6">全天</h6>
							<p>
								<span @click="selectFullDay"><i style="cursor: pointer;" class="iconfont icon-xuanzekuang" :class="{'icon-xuanzekuang-xuanzhong':fullDay}"></i></span>
							</p>
						</div>
						<!--<div class="event-remind-repeat-wrapper">
							<a>
								<el-tooltip class="item" effect="dark" :content="repeatType" placement="top">
									<div style="cursor: pointer;" class="repeat iconfont icon-liebiaoxunhuan" @click.stop="showRepeatList">
										<ul class="repeatList selectList" v-show="repeatListShow">
											<li class="listItem" v-for="item in repeatList" :key="item.name" @click="selectItem($event,'repeatList')" :id="item.id">{{item.name}}</li>
										</ul>
									</div>
								</el-tooltip>
							</a>
							<a>
								<el-tooltip class="item" effect="dark" :content="remindType" placement="top">
									<div style="cursor: pointer;" class="remind iconfont icon-ai254" @click.stop="showRemindList">
										<ul class="remindList selectList" v-show="remindListShow">
											<li class="listItem" v-for="item in remindList" :key="item.name" @click="selectItem($event,'remindList')" :id="item.id">{{item.name}}</li>
										</ul>
									</div>
								</el-tooltip>
							</a>
						</div>-->
					</div>
				</div>
				<div style="margin-top:10px;">
					<!-- 地点 -->
					<div class="labeles">
						<el-row>
							<div style="margin-right:20px;float: left;">
								<div class="alCenter">
									<span class="labeles-mark"><i class="iconfont icon-zhiyuandidian1"></i>地点</span>
									<span v-show="!placeShow" @click.stop="placeShow=true" class="middle-center" >{{scheduleDetails.place | cutStr}}</span>
								</div>
							</div>
							<div style="float: left;width: 514px;">
								<div v-show="placeShow">
									<input type="text"  class="labeles-place" v-model="scheduleDetails.place">
									<div class="buttonGroup">
										<div class="cancel" @click="placeCancel">取消</div>
										<el-button @click="placeSave" style="z-index: 15;" class="can-code" type="primary" size="medium">保存</el-button>
									</div>
								</div>
							</div>
						</el-row>
					</div>
					<!-- 备注 -->
					<div class="labeles">
						<el-row>
							<div style="margin-right:20px;float: left;">
								<div class="alCenter">
									<span class="labeles-mark"><i class="iconfont icon-wenjian"></i>备注</span>
									<span v-show="!markShow" @click.stop="markShow=true" class="middle-center" v-html="cutString(scheduleDetails.remarks)"></span>
								</div>
							</div>
							<div style="float: left;width: 514px;">
								<div v-show="markShow" class="buttonMark">
									<richedit @close="markCancel" :defVal="scheduleDetails.remarks" :style="markStyle" @save="join"></richedit>
								</div>
							</div>
						</el-row>
					</div>
					<!-- 标签 -->
					<div class="labeles">
						<el-row>
							<el-col style="margin-right:20px;">
								<div class="alCenter">
									<span class="labeles-mark"><i class="iconfont icon-biaoqian rotate"></i>标签</span>
									<span @click.stop="showLabelList($event)" class="middle-center" v-if="tagList.length == 0">添加标签</span>
									<span v-if="tagList.length != 0" class="label" v-for="(item,index) in tagList" :style="bgColor(item.bq_color)">{{'● '+item.name}} <i @click="delLabel(item.id,index)" class="iconfont icon-guanbi" style="font-size: 12px;display: none;"></i></span>
									<i @click.stop="showLabelList($event)" class="iconfont icon-tianjia" style="display: inline-block;vertical-align: sub;color: #0a7ee9;"></i>
								</div>
							</el-col>
							<el-col :span="20">
								<div v-if="tagShow" class="buttonMark">
									<tags @send="addlabel" @close="tagShow=false" :show="tagShow" :params="tagList" :styles="lableStyle" @editFinish="editFinish" @delLabel="delLabel"></tags>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
				<!-- 关联内容 -->
				<!--<div class="relevance common">
					<div>
						<div>
							<relevance type="schedule" :relList="scheduleDetails.relationList" :taskId="scheduleDetails.id" @upDate="update"></relevance>
						</div>
					</div>
				</div>-->
				<!-- 参与人 -->
				<div class="participant">
					<participant :closeAll="closeflag" :type="selectType" :principalId="schedule.userId" :scheduleId="scheduleDetails.id" :list="scheduleDetails.userList"></participant>
				</div>
				<!-- 评论 -->
				<div class="record">
					<record :type="selectType" :flag="recordDefault" @updateComment="updateComment" :commentList="commentList" :taskId="scheduleDetails.id"></record>
				</div>
			</div>
		</div>

		<pulldownlist hide="true" title="任务菜单" :list="pullDownTaskList" :shows="pullDownListBol" :styles="pulldownStyles" @close="pullDownListBol=false" @command="executeCommand" @chooseProject="chooseProject"></pulldownlist>
	</div>
</template>

<script>
	import API from 'api/http'
	import TIME from 'api/time'
	import pulldownlist from 'components/schedule/pulldownList'
	import memberlist from 'components/schedule/memberList'
	import relevance from 'components/taskEdit/relevance'
	import participant from 'components/schedule/participant'
	import record from 'components/schedule/record'
	import richedit from 'components/richEdit'
	import tags from 'components/tags'
	import times from '../../../api/time.js'

	export default {
		props: {
			styles: { //宽高
				default: 'width:690px;height:615px',
				type: String
			},
			scheduleID: { //日程id
				default: 85,
				// type: Number
			},
			detailvisible: {
				// type:Boolean,
				// default:false
			}
			// scheduleDetails:{
			//     default: null,
			//     type: Object
			// }
		},
		components: {
			relevance,
			pulldownlist,
			memberlist,
			participant,
			record,
			richedit,
			tags
		},
		filters: {
			str20(val) { //限制字数20
				if(val.length > 20) {
					return val.substr(0, 20);
				} else {
					return val;
				}
			},
			//时间戳转化为日期
			timeFilt(val) {
				return TIME.getRightTime(val);
			},
			timeFormat(val) {
				return TIME.formatting(val)
			},
			monthDay(val) {
				return val.substr(5, 5)
			},
			hourMinute(val) {
				return val.substr(11, 5)
			},
            cutStr(str){
			    if(str!=''){
                    if(str && str.length>40){
                        return str.slice(0,40)+'...'
                    }else{
                        return str;
                    }
                }else{
                    return '待添加';
                }

            }
		},
		data() {
			return {
				selectType: 'schedule',
				fatherId: 0, //父级任务Id
				recordDefault: false, //默认跳到评论的标识
				closeflag: false, //所有弹窗的关闭flag
				tId: '', //任务id
				taskMessage: {
					task: {
						state: 0,
						user: {
							user_img: '',
							username: '00000'
						}
					}
				}, //任务信息
				pullDownTaskList: [ //任务菜单列表 二维数组
//					[{
//						icon: 'iconfont icon-fuzhi',
//						name: '复制日程',
//						can: true
//
//					}, {
//						icon: 'iconfont icon-yidong',
//						name: '移动日程',
//						can: true
//					}],
					[{
						icon: 'iconfont icon-guidang',
						name: '归档日程'
					}, {
						icon: 'iconfont icon-shanchu',
						name: '删除日程'
					}],
				],
				pullDownListBol: false, //是否显示下拉菜单
				pulldownStyles: '', //下拉菜单定位
				repeatType: "不重复", // 重复
				// 列表显示
				repeatListShow: false,
				repeatList: [{
						name: '不重复',
						id: 0
					},
					{
						name: '每天重复',
						id: 0
					},
					{
						name: '每周重复',
						id: 0
					},
					{
						name: '每月重复',
						id: 0
					},
					{
						name: '每年重复',
						id: 0
					},
					{
						name: '工作日重复',
						id: 0
					},
					{
						name: '自定义重复',
						id: 0
					}
				],
				remindListShow: false,
				remindList: [{
						name: '关闭提醒',
						id: 0
					},
					{
						name: '开始时提醒',
						id: 0
					},
					{
						name: '5分钟前',
						id: 0
					},
					{
						name: '15分钟前',
						id: 0
					},
					{
						name: '30分钟前',
						id: 0
					},
					{
						name: '1小时前',
						id: 0
					},
					{
						name: '2小时前',
						id: 0
					},
					{
						name: '1天前',
						id: 0
					}
				],
				remindType: "关闭提醒", // 提醒
				startTime: '',
				endTime: '',
				startTimeShow: '',
				endTimeShow: '',
				// 日期范围控制
				pickerStartTime: {},
				pickerEndTime: {
					disabledDate: (time) => {
						return time.getTime() < this.startTime - 8.64e7;
					}
				},
				clearable: true,
				fullDay: false, // 全天
				markShow: false, //备注开关
				placeShow: false, //位置开关
				tagShow: false, //标签开关
				titleShow: false, //名称开关
				markStyle: 'top:0px;left:19px;',
				labelList: {
					contents: ''
				},
				tagList: [],
				lableStyle: '',
				comment_content: '', //评论的内容
				schedule: {
					title: '',
					place: '',
					marks: '',
					contents: [],
					userId: parseInt(sessionStorage.getItem('userId'))
				},
				temSchedule: {
					title: '',
					place: '',
					marks: ''
				},
				logList: [], //日志列表
				commentList: [], //评论列表
				scheduleDetails: {}
			}
		},
		mounted() {

		},
		methods: {
            cutString(val){
                if(val!=''){
                    var string = val.replace(/<[^>]+>/g,"");
                    if(string && string.length>50){
                        return string.slice(0,40)+'...'
                    }else{
                        return string;
                    }
                }else{
                    return '待添加'
                }
            },
			markCancel() {
				this.markShow = false;
				this.scheduleDetails.remarks = this.temSchedule.marks;
			},
			//编辑弹窗名字获取焦点
			titleFocus() {
				this.titleShow = true;
				this.scheduleDetails.title == '' ? this.scheduleDetails.title = '' : this.scheduleDetails.title;
			},
			//修改日程名称
			titleBlur() {
				this.titleShow = false;
				this.scheduleDetails.title == '' ? this.scheduleDetails.title = '' : this.scheduleDetails.title;
				this.getUpdateSchedule('title', this.scheduleDetails.title);
				console.log(this.scheduleDetails.title)
				if(this.scheduleDetails.title == '') {
					this.$message('日程标题不能为空！');
				}
			},
			//点击地址保存取消
			placeCancel() {
				this.placeShow = false;
				this.scheduleDetails.place = this.temSchedule.place;
			},
			//点击地址保存
			placeSave() {
				this.placeShow = false;
				this.temSchedule.place = this.scheduleDetails.place;
				this.getUpdateSchedule('place', this.scheduleDetails.place);
			},
			//修改备注
			join(str) {
                console.log(str,666)
				this.markShow = false;
				this.scheduleDetails.remarks = str;
				this.temSchedule.marks = str;
				this.getUpdateSchedule('remarks', this.scheduleDetails.remarks);
			},
			//更新日程详细
			getUpdateSchedule(key, value) {
				let params = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId'),
					id: this.scheduleDetails.id
				};

				params[key] = value;
				API.post('/schedule/updateSchedule', params).then(res => {
					if(res.data.code == 200 && res.data.message == "SUCCESS") {
						this.$emit('closeAllBoxs');
					}
				})

			},
			//是否全天
			selectFullDay() {
				this.fullDay = !this.fullDay;
				if(this.fullDay) {
					this.startTimeShow = TIME.getRightDay(this.startTime);
					this.endTimeShow = TIME.getRightDay(this.endTime);
				} else {
					this.startTimeShow = TIME.getRightTime(this.startTime);
					this.endTimeShow = TIME.getRightTime(this.endTime);
				}
				this.updateSchedule();
			},
			//根据日程id查找评论
			getTaskComment() {
				API.get('/tasks/getTaskComment', {
					taskId: this.scheduleDetails.id,
					type: 2
				}).then(res => {
					if(res.data.code == 200 && res.data.message == "SUCCESS") {
						this.commentList = res.data.data;
					}

				})
			},
			//添加评论
			addComment() {
				if(this.comment_content.trim() != '') {
					API.post('/schedule/addComment', {
						taskId: this.scheduleDetails.id,
						content: this.comment_content,
						type: 2
					}).then(res => {
						this.comment_content = '';
						// this.getCommentList()
						this.getTaskComment();
					})
				}

			},
			//背景颜色
			bgColor(color) {
				return 'background:' + color
			},
			//标签修改完成
			editFinish(obj) {
				this.tagList.map(el => {
					if(el.id == obj.id) {
						el.name = obj.name;
						el.bq_color = obj.bq_color;
					}
				})
			},
			//添加标签
			addlabel(obj) {
				let flag = false;
				let indexs = 0;
				this.tagList.map((el, index) => {
					if(el.name == obj.name) {
						flag = true
						indexs = index
					}
				})
				if(flag) {
					this.delLabel(obj.id, indexs)
				} else {
					API.post('/schedule/addScheduleLabel', {
						eid: sessionStorage.getItem('enterpriseId'),
						pid: sessionStorage.getItem('projectId'),
						scheduleId: this.scheduleDetails.id,
						lid: obj.id
					}).then(res => {
						this.tagList.splice(index, 1)
					})
					this.tagList.push(obj)
				}
			},
			//显示标签列表
			showLabelList(el) {
				this.tagShow = true;
				this.lableStyle = "top:" + (el.clientY + 20) + 'px;left:' + el.clientX + 'px'
			},
			//删除标签
			delLabel(id, index) {
				this.$nextTick(() => {
					API.post('/schedule/deleteScheduleLabel', {
						eid: sessionStorage.getItem('enterpriseId'),
						pid: sessionStorage.getItem('projectId'),
						scheduleId: this.scheduleDetails.id,
						lid: id
					}).then(res => {
						this.tagList.splice(index, 1)

					})
				})
			},
			// //更新评论
			updateComment(data) {
				this.commentList = data
			},
			//更新数据
			update() {
				this.getTaskMsgInfo()
			},
			//接收子任务id 更新任务编辑面板数据
			sendChildrenId(id) {
				this.tId = id
			},
			//获取信息
			getTaskMsgInfo() {
				API.get('/schedule/findScheduleById', {
					id: this.tId
				}).then(res => {
					this.scheduleDetails = res.data.data;
					this.fatherId = res.data.data.pid;
					this.scheduleDetails.isDay == 1 ? this.fullDay = true : this.fullDay = false;
					this.temSchedule.place = this.scheduleDetails.place;
					this.temSchedule.marks = this.scheduleDetails.remarks;
					this.tagList = this.scheduleDetails.labelList
					this.commentList = this.scheduleDetails.commentList;
					this.timeInit();
				})
			},
			//显示下拉菜单
			pullDownList(el) {
				this.pullDownListBol = true;
				this.pulldownStyles = 'top:' + (el.clientY + 10) + 'px;left:' + el.clientX + 'px'
			},
			//返回下拉菜单返回的命令
			executeCommand(val) {
				let title = '',
					url, parmas = {
						eid: sessionStorage.getItem("enterpriseId"),
						pid: sessionStorage.getItem("projectId"),
						id: this.scheduleDetails.id
					},
					msg = '';
				if(val == '删除日程') {
					title = '此操作将永久删除该日程, 是否继续?';
					url = '/schedule/deleteSchedule';
					msg = '删除';
				}
				if(val == '归档日程') {
					title = '此操作将该日程归档, 是否继续?';
					url = '/schedule/archiveSchedule';
					parmas['archive'] = 2;
					msg = '归档';
				}
				this.delwithSchedule(title, url, parmas, msg);
			},
			delwithSchedule(title, url, parmas, msg) {
				this.$confirm(title, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					API.post(url, parmas).then(res => {
						// if(this.father == 0){

						// }
						this.tId = this.fatherId == 0 ? this.tId : this.fatherId
						this.$emit('close');
						this.$emit('closeAllBoxs');
						this.pullDownListBol = false;
						this.$message({
							type: 'success',
							message: msg + '成功！'
						});

					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消' + msg
					});
				});
			},
			//关闭所有弹窗
			closeAllBox() {
				let self = this;
				this.closeflag = !this.closeflag;
				this.pullDownListBol = false
				this.tagShow = false
				this.recordDefault = !this.recordDefault;
				this.$emit('closeAllBoxs');
			},
			// 初始化
			moduleInit() {
				this.timeInit();
				document.onclick = () => {
					this.repeatListShow = false;
					this.remindListShow = false;
				}
			},
			// 时间初始化
			timeInit() {

				this.startTime = this.scheduleDetails.startTime;
				this.endTime = this.scheduleDetails.endTime;

				if(this.scheduleDetails.isDay == 0) {
					this.startTimeShow = TIME.getRightTime(this.startTime);
					console.log(121)
					console.log(this.startTimeShow)

					this.endTimeShow = TIME.getRightTime(this.endTime);
				} else {
					this.startTimeShow = TIME.getRightDay(this.startTime);
					this.endTimeShow = TIME.getRightDay(this.endTime);
				}
			},
			// 下拉列表显示
			showRepeatList() {
				this.repeatListShow = !this.repeatListShow;
				this.remindListShow = false;
			},
			showRemindList() {
				this.remindListShow = !this.remindListShow;
				this.repeatListShow = false;
			},
			// 选择下拉项
			selectItem(e, w) {
				// let items = e.target.parentNode.children;
				// for (let i = 0; i < items.length; i++) {
				//     items[i].classList.remove('icon-duihao');
				// }
				// e.target.classList.add('icon-duihao');
				// if (w === 'repeatList') {
				//     this.repeatType = e.target.innerHTML;
				// }
				// if (w === 'remindList') {
				//     this.remindType = e.target.innerHTML;
				// }
			},
			//改变时间选择器确定按钮样式
			getClassChange() {
				// let div = document.getElementsByClassName("el-picker-panel");
				// this.$nextTick(()=>{
				//     if(div.length==1){
				//         div[0].querySelector(".el-button--mini:last-child").setAttribute("class","can-code el-button--mini");
				//     }
				//     if(div.length==2){
				//         div[1].querySelector(".el-button--mini:last-child").setAttribute("class","can-code el-button--mini");
				//     }
				// })
			},
			//点击时间确定按钮
			TimeChange(index) {
				// let div = document.getElementsByClassName("el-picker-panel__footer");
				// if(div.length==1){
				//     div[0].children[1].setAttribute("class","el-button--mini");
				// }
				// if(div.length==2){
				//     div[0].children[1].setAttribute("class","el-button--mini");
				//     div[1].children[1].setAttribute("class","el-button--mini");
				// }

				let endTime = this.endTime.valueOf();
				let startTime = this.startTime.valueOf();

				if(endTime < startTime || endTime == startTime) {
					this.endTime = startTime + 1000 * 60 * 60;
				}
				if(this.fullDay) {
					if(index == 0) {
						this.startTimeShow = TIME.getRightDay(this.startTime);
					}
					this.endTimeShow = TIME.getRightDay(this.endTime);
				} else {
					if(index == 0) {
						this.startTimeShow = TIME.getRightTime(this.startTime);
					}
//					console.log(this.startTime)
//					console.log(this.startTimeShow)
					this.endTimeShow = TIME.getRightTime(this.endTime);
//					console.log(this.endTimeShow)
				}
				this.updateSchedule();
			},
			//改变时间，更新数据
			updateSchedule() {
				API.post('/schedule/updateSchedule', {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId'),
					id: this.scheduleDetails.id,
					isDay: this.fullDay ? 1 : 0,
					startTime: times.formatting(this.startTime),
					endTime: times.formatting(this.endTime)
				}).then(res => {
					if(res.data.code == 200 && res.data.message == "SUCCESS") {
						this.$emit('closeAllBoxs');
					}
				})
			},
			// 日程菜单
			//选中某一项目
			chooseProject(obj, eid, id) {
				console.log(obj)
				console.log(eid)
				console.log(id)
				let title = '',
					msg = '',
					url = '',
					parmas = {
						eid: eid,
						pid: id,
						id: this.scheduleDetails.id
					};
				if(obj == '复制日程') {
					title = '此操作将该日程复制，是否继续？';
					msg = '复制';
					url = '/schedule/copySchedule';
				}
				if(obj == '移动日程') {
					title = '此操作将该日程移动，是否继续？';
					msg = '移动';
					url = '/schedule/moveSchedule';

				}
				this.getDealWith(title, msg, url, parmas);
			},
			//二级菜单操作处理复制移动
			getDealWith(title, msg, url, parmas) {
				this.$confirm(title, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					API.post(url, parmas).then(res => {
						if(res.data.code == 200) {
							this.$emit('close');
							this.$emit('closeAllBoxs');
							this.$message({
								type: 'success',
								message: msg + '成功！'
							});
						}
					})
					this.rank = 1;
				}).catch(() => {
					this.$emit('close');
					this.$message({
						type: 'info',
						message: '已取消' + msg
					});
					this.rank = 1;
				});
			}
		},
		created() {
			this.tId = this.scheduleID;
			this.getTaskMsgInfo()

		},
		watch: {
			taskId() {
				this.tId = this.scheduleID

			},
			scheduleID(newVal) {
				this.tId = this.scheduleID
				this.getTaskMsgInfo();
			},
			detailvisible(newVal) {
				if(!newVal) {
					this.pullDownListBol = false;
					this.closeflag = false;
					this.tagShow = false;
				} else {
					this.closeflag = true;
				}
			},
			'scheduleDetails.place'(val, oldVal) {
				if(val.length > 200) {
					console.log(oldVal)
					console.log(val)
					this.scheduleDetails.place = oldVal
					this.$notify({
						title: '警告',
						message: '地点不可超过200字',
						type: 'warning'
					});

				}
			}

		}
	}
</script>

<style scoped>
	.record {
		padding: 24px 0;
	}

	.participant {
		margin-top: 20px;
		border-top: 1px solid #E1E1E1;
		padding: 20px 22px 28px 22px;
		background-color: #F7F7F7;
		border-bottom: 1px solid #efefef;
	}

	.modelist {
		position: absolute;
	}

	.modelist li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.taskEditBackGround {
		width: 100vw;
		height: 100vh;
		position: fixed;
		background: rgba(0, 0, 0, .5);
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.taskEditBox {
		background: white;
		border-radius: 3px;
		position: relative;
		font-size: 12px;
		color: #666666;
		/*  overflow-x: hidden;
        overflow-y: scroll;*/
	}

	.taskEditBox-section {
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.taskEditBox-header {
		position: relative;
		padding: 3px 14px 16px 14px;
		color: #fff;
		background-color: #3da8f5;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.taskEditBox-section::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.taskEditBox-section::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.taskEditBox-section::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}

	.taskTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
	}

	.taskTitle .taskTitleName {
		padding: 8px 9px;
		background-color: #3696dc;
		border-radius: 4px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #fff;
		font-size: 14px;
	}

	.taskTitle-name {
		margin: 16px 0 0;
		font-size: 18px;
		word-break: break-word;
	}

	.originalInput {
		width: 97%;
		background-color: #3DA8F5;
		color: #fff;
		height: 35px;
		line-height: 35px;
		padding-left: 10px;
		border-radius: 4px;
		font-size: 18px;
	}

	.transparent {
		opacity: 0.7;
	}

	.protectame {
		background-color: #3797DC;
	}

	.taskTitle-name div {
		padding: 4px;
		border-radius: 4px;
	}

	.taskTitle>div:nth-child(2) i {
		margin-left: 18px;
		cursor: pointer;
	}

	.common {
		padding: 0 20px;
	}

	.hand {
		cursor: pointer;
	}

	.hand:hover {
		color: #077ce7;
	}

	.labeles {
		/*border-top: 1px solid #E1E1E1;*/
		padding-top: 20px;
		z-index: -10;
		padding-left: 20px;
	}

	.labeles-mark {
		width: 100px;
		display: inline-block;
		vertical-align: middle;
	}

	.labeles-place {
		height: 28px;
		padding: 4px;
		margin-bottom: 8px;
		border: 1px solid #cac8c8;
		border-radius: 4px;
		width: 100%;
	}

	.buttonGroup {
		display: flex;
		justify-content: flex-end;
		margin-top: 10px;
		padding-right: 30px;
	}

	.middle-center {
		vertical-align: middle;
		display: inline-block;
		cursor: pointer;
	}

	.buttonGroup .cancel {
		cursor: pointer;
		display: flex;
		align-items: center;
		margin-right: 30px;
		font-size: 14px;
		z-index: 15;
	}

	.buttonGroup .cancel:hover {
		color: #3da8f5;
	}

	.relevance {
		border-top: 1px solid #E1E1E1;
		margin-top: 12px;
		padding-top: 30px;
		z-index: -10;
	}
	/**/

	.event-detail-handler-set {
		display: flex;
		margin: 28px 72px 20px 0;
	}

	.event-detail-startDate {
		padding-left: 0;
		border-left: 0 none;
		flex: 1 0 0;
	}

	.event-detail-endDate {
		flex: 1 0 0;
		padding-left: 20px;
		border-left: 1px solid hsla(0, 0%, 100%, .15);
	}

	.event-detail-isAllDay {
		flex: 1 0 0;
		padding-left: 20px;
		border-left: 1px solid hsla(0, 0%, 100%, .15);
	}

	.event-remind-repeat-wrapper {
		position: relative;
		top: 27px;
		right: -26px;
	}

	.event-remind-repeat-wrapper a {
		float: left;
	}

	.event-remind-repeat-wrapper a:first-child {
		margin-right: 20px;
	}

	.event-detail-handler-h6 {
		margin: 0 0 12px;
		line-height: 14px;
		color: hsla(0, 0%, 100%, .5);
		font-size: 12px;
		margin-bottom: 16px;
	}

	.event-detail-handler-content {
		cursor: pointer;
		line-height: 16px;
		position: relative;
	}

	.event-detail-handler-content span {
		background: #3da8f5;
		display: inline-block;
		width: 100%;
		z-index: 1;
		color: #fff;
		position: absolute;
		height: 41px;
		line-height: 26px;
		border-radius: 4px;
		font-size: 14px;
		cursor: pointer;
		pointer-events: none;
	}

	.el-date-editor schedule-time start el-input el-input--prefix el-input--suffix el-date-editor--datetime schedule-time-cover {
		width: 120px;
	}

	.el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 157px;
	}

	.blue-color {
		color: #3da8f5;
	}

	.label {
		color: white;
		display: inline-block;
		padding: 2px 6px;
		border-radius: 4px;
		overflow: hidden;
		margin-right: 10px;
		vertical-align: middle;
	}

	.label:hover>i {
		display: inline-block !important;
	}
	/**/

	.repeat {
		position: relative;
	}

	.selectList {
		position: absolute;
		left: -90px;
		width: 180px;
		background: #ffffff;
		box-shadow: 0 0 5px #f5f5f5;
		border-radius: 5px;
		padding: 10px 0;
		overflow: hidden;
	}

	.selectList .listItem {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #666666;
		padding: 0 20px;
	}
	/* item选中样式 */

	.selectList .listItem::before {
		float: right;
	}

	.repeatList .listItem:last-child {
		border-top: 1px solid #e0e0e0;
		box-sizing: border-box;
		height: 45px;
		line-height: 45px;
	}

	.repeatList {
		padding-bottom: 0;
	}

	.selectList .listItem:hover {
		background-color: #f7f7f7;
	}

	.reportList li {
		padding: 14px 27px;
	}

	.reportList li .img {
		width: 24px;
		height: 24px;
		border-radius: 24px;
		background: #999999;
		text-align: center;
		line-height: 24px;
		color: white;
	}

	.reportList li:hover {
		background: #F1F1F1;
	}

	 ::-moz-placeholder {
		color: #fff;
	}

	 ::-webkit-input-placeholder {
		color: #fff;
	}

	 :-ms-input-placeholder {
		color: #fff;
	}
	.rotate{
		display: inline-block;
		width: 16px;
		height: 22px;
		transform:rotate(50deg);
		-ms-transform:rotate(50deg); 	/* IE 9 */
		-moz-transform:rotate(50deg); 	/* Firefox */
		-webkit-transform:rotate(50deg); /* Safari 和 Chrome */
		-o-transform:rotate(50deg); 	/* Opera */
	}
</style>
