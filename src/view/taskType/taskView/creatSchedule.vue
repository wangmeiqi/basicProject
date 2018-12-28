// 新建日程
<template>
	<div class="creatSchedule">
		<header class="creat-header">
			<h3 class="title">添加日程到 <span class="project" v-if="!flagState">{{projectNmae}}</span>
                <span class="selet_address" @click.stop="tig($event)" v-if="flagState">
                        <span>{{positionName}}</span>
                        <i v-show="!select_address_bol" class="iconfont icon-jiantoux"></i>
                        <i v-show="select_address_bol" class="iconfont icon-jiantous"></i>
                </span>
            </h3>
			<a class="close iconfont icon-guanbi" @click="closeCreator"></a>
		</header>
		<section class="creator-body">
			<div class="newTitle-wrap">
				<textarea placeholder="日程名称" v-model="title" maxlength="20"></textarea>
			</div>
			<!-- 时间设置 -->
			<div class="time-wrap">
				<div>
					<label for="fullDay" class="checkbox iconfont" :class="{'icon-xuanzekuang-xuanzhong':fullDay,'icon-xuanzekuang':!fullDay}"><span class="text">全天</span></label>
					<input id="fullDay" type="checkbox" style="display:none" @click="selectFullDay">
				</div>
				<div class="time">
					<span class="iconfont icon-rili1"></span>
					<a class="time-a-info">
						<span>{{startTimeShow}}</span>
						<el-date-picker @change="TimeChange(0)" class="schedule-time start" :class="{'schedule-time-cover':true}" v-model="startTime" format="MM-dd HH:mm" value-format="timestamp" :picker-options="pickerStartTime()" :default-value="startTime" :clearable='clearable' :type="fullDay?'date':'datetime'">
						</el-date-picker>
					</a>
					<span>-</span>
					<a class="time-a-info">
						<span>{{endTimeShow}}</span>
						<el-date-picker class="schedule-time end" @change="TimeChange(1)" v-model="endTime" format="MM-dd HH:mm" value-format="timestamp" :picker-options="pickerEndTime()" :default-value="endTime" :type="fullDay?'date':'datetime'">
						</el-date-picker>
					</a>
					<!-- <span class="time-start">今天</span> -->
					<!-- <span class="time-end">今天</span> -->
					<!-- <el-date-picker
                        class="schedule-time start"
                        v-model="startTime"
                        :format="timeType"
                        :picker-options="pickerStartTime"
                        :default-value="startTime"
                        :type="fullDay?'date':'datetime'">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker
                        class="schedule-time end"
                        v-model="endTime"
                        :format="timeType"
                        :picker-options="pickerEndTime"
                        :default-value="endTime"
                        :type="fullDay?'date':'datetime'">
                    </el-date-picker> -->
				</div>
				<!--          <el-tooltip class="item" effect="dark" :content="repeatType" placement="top">
                    <div class="repeat iconfont icon-liebiaoxunhuan" @click.stop="showRepeatList">
                        <ul class="repeatList selectList" v-show="repeatListShow">
                            <li class="listItem" v-for="item in repeatList" :key="item.name" @click="selectItem($event,'repeatList')" :id="item.id">{{item.name}}</li>
                        </ul>
                    </div>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="remindType" placement="top">
                    <div class="remind iconfont icon-ai254" @click.stop="showRemindList">
                        <ul class="remindList selectList" v-show="remindListShow">
                            <li class="listItem" v-for="item in remindList" :key="item.name" @click="selectItem($event,'remindList')" :id="item.id">{{item.name}}</li>
                        </ul>
                    </div>
                </el-tooltip> -->
			</div>
			<!-- 参与者 -->
			<scheduleActor></scheduleActor>
			<div class="privacy">
				<div class="selector" @click="changePrivacy" v-if="privacyModeFlage">
					<div class="name">
						<i class="iconfont" :class="{'icon-jiesuo':!privacy,'icon-suo':privacy}"></i>
						<span>隐私模式</span>
					</div>
					<div class="state" ref="state">所有成员可见</div>
				</div>
				<el-button class="btn-add can-code" :class="{inactive:title.trim()==''}" type="primary" @click="creatSchedule">创建</el-button>
			</div>
		</section>
		<selectaddress @send="getPosMsg" @ifCYZadnYCs = 'ifCYZadnYCFun' :styles="select_address_styles" :show="select_address_bol" :flagBol="select_address_falgs" @close="select_address_bol=false"></selectaddress>
	</div>
</template>
<script>
	import selectaddress from '../../../components/select_address' //创建任务至那个项目
	import scheduleActor from './scheduleActor';
	import times from '../../../api/time.js';
	import API from 'api/http'
	import Bus from 'assets/js/Bus.js'

	// document.getElementsByClassName('el-picker-panel')[0].onclick=function(ev){
	//     var ev = ev || window.event;
	//     　　　　var target = ev.target || ev.srcElement;
	//     console.log(target)
	//     　　　　　　　  console.log('click');
	// }

	export default {
		components: {
			selectaddress,
			scheduleActor: scheduleActor
		},
		props: {
			dialogVisible: {
				type: Boolean
			},
			otherStartTime: {},
			otherEndTime: {}
		},
		data() {
			return {
				//隐私模式权限
				privacyModeFlage:null,

				posIds: {}, //位置信息
				select_address_styles: 'top:0px;left:0px', //选择位置组件出现的位置
				positionName: '', //选择项目至
				select_address_bol: false, //选择地址的显示与隐藏
				select_address_falgs: 'addSchedule',
				clearable: true,
				title: '', // 标题
				fullDay: false, // 全天
				startTime: '',
				endTime: '',
				startTimeShow: '',
				endTimeShow: '',

				// 时间显示方式
				// timeType: 'yyyy年M月d日 HH:mm',
				// dataTime: 'yyyy年M月d日 HH:mm',
				// dataOnly: 'yyyy年M月d日',
				privacy: false, // 隐私模式
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
				projectNmae: '',
				flagState: true
			};
		},
		watch: {
			dialogVisible(val) {
				if(val) {
					this.timeInit();
					this.positionName = ''
					this.title = ''
				} else {
					this.positionName = ''
					this.title = ''
				}
			},
			'startTime' (val) {
				if(this.startTime > this.endTime || this.startTime == this.endTime) {
					this.endTime = this.startTime + 1000 * 60 * 60 * 24;
				}
			}
		},
		methods: {
			//点击时间确定按钮
			TimeChange(index) {
				//console.log(this.endTime)
				let endTime = this.endTime.valueOf();
				let startTime = this.startTime.valueOf();
				if(endTime < startTime || endTime == startTime) {
					//this.endTime = startTime + 1000*60*60;
				}
				if(this.fullDay) {
					if(index == 0) {
						this.startTimeShow = times.getRightDay(this.startTime);
					}
					this.endTimeShow = times.getRightDay(this.endTime);
				} else {
					if(index == 0) {
						//this.endTime = startTime + 1000*60*60;
						let end = new Date(this.endTime);
						let endGG;
						let month = Number(end.getMonth()) + 1;
						let hour = Number(new Date(startTime).getHours()) + 1
						endGG = end.getFullYear() + "-" + month + "-" + end.getDate() + " " + hour + ":" + end.getMinutes();
						this.endTime = new Date(endGG).getTime();
						this.startTimeShow = times.getRightTime(this.startTime);
					}
					let newEndTime = this.startTime+3600000;
					this.endTimeShow = times.getRightTime(newEndTime);
				}
			},
			// 初始化
			moduleInit() {
				this.timeInit();
				document.onclick = () => {
					this.repeatListShow = false;
					this.remindListShow = false;
				}
			},
			// 关闭新建弹窗
			closeCreator() {
				this.title = '';
				this.fullDay = false;

				this.$emit("close");
			},
			// 选择全天
			selectFullDay() {
				this.fullDay = !this.fullDay;
				if(this.fullDay) {
					this.startTimeShow = times.getRightDay(this.startTime);
					this.endTimeShow = times.getRightDay(this.endTime);
				} else {
					this.startTimeShow = times.getRightTime(this.startTime);
					this.endTimeShow = times.getRightTime(this.endTime);
				}
			},
			// 保护模式
			changePrivacy() {
				this.privacy = !this.privacy;
				if(this.privacy) {
					this.$refs.state.innerHTML = "仅参与者可见";
				} else {
					this.$refs.state.innerHTML = "所有成员可见";
				}
			},
			// 时间初始化
			timeInit() {
				let date = new Date();
				let startdate = date - date.getMinutes() * 1000 * 60;
				let enddate = date - date.getMinutes() * 1000 * 60 + 1000 * 60 * 60;

				if(this.otherStartTime != undefined && this.otherEndTime != undefined) {
					this.startTime = this.otherStartTime;
					this.endTime = this.otherEndTime;
				} else {
					this.startTime = startdate;
					this.endTime = enddate;
				}

				// this.startTime = times.startMinutes(new Date());
				// this.endTime = times.endMinutes(new Date());

				this.startTimeShow = times.getRightTime(this.startTime)
				this.endTimeShow = times.getRightTime(this.endTime)
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
				let items = e.target.parentNode.children;
				for(let i = 0; i < items.length; i++) {
					items[i].classList.remove('icon-duihao');
				}
				e.target.classList.add('icon-duihao');
				if(w === 'repeatList') {
					this.repeatType = e.target.innerHTML;
				}
				if(w === 'remindList') {
					this.remindType = e.target.innerHTML;
				}
			},
			// 创建日程
			creatSchedule(e) {
			    let flag = sessionStorage.getItem('addScheduleFalg'),starTime='',endTime='';
			    if(flag == 'calendar'){
                    starTime = times.formatting(this.startTime);
                    endTime = times.formatting(this.endTime);
                }else if(flag == 'project'){
                    starTime = times.formatting(this.startTime);
                    endTime = times.formatting(this.startTime+3600000);
                }
				if(sessionStorage.getItem('addScheduleFalg')=='calendar') {
					// 标题为空不提交
					if(this.title != '' && this.positionName != '') {
						let params = {
							hide:this.privacy ? 2 : 1 ,//公开是1私有是2
							eid: sessionStorage.getItem("enterpriseId"),
							pid: sessionStorage.getItem("projectId"),
							ids: sessionStorage.getItem('userId'),
							title: this.title,
							isDay: this.fullDay ? 1 : 0,
							startTime: starTime,
							endTime: endTime
						}
						API.post('/schedule/addSchedule', params).then(res => {
							if(res.data.code == 200 && res.data.message == "SUCCESS") {
								this.$emit('creatSchedule');
								this.title = '';
								this.fullDay = false;
								this.privacy = false;
								this.timeInit();
							}

						})
					} else if(this.positionName == '') {
						this.$notify({
							title: '警告',
							message: '请选择创建到哪个项目',
							type: 'warning'
						});
					}
				}else{
						// 标题为空不提交
					if(this.title != '') {
						let params = {
							hide:this.privacy ? 2 : 1 ,//公开是1私有是2
							eid: sessionStorage.getItem("enterpriseId"),
							pid: sessionStorage.getItem("projectId"),
							ids: sessionStorage.getItem('userId'),
							title: this.title,
							isDay: this.fullDay ? 1 : 0,
							startTime: starTime,
							endTime: endTime
						}
						API.post('/schedule/addSchedule', params).then(res => {
							if(res.data.code == 200 && res.data.message == "SUCCESS") {
								this.$emit('creatSchedule');
								this.title = '';
								this.fullDay = false;
								this.privacy = false;
								this.timeInit();
							}

						})
					}
				}

			},
			//创建新任务至 的显示隐藏
			tig(el) {
				//console.log(el)
				this.positionName = ''
				this.select_address_falgs = 'addSchedule'
				this.select_address_bol = !this.select_address_bol
				this.select_address_styles = "top:" + (el.clientY + 20) + "px;left:" + (el.clientX - 120) + "px"
			},
			//获取位置组件信息
			getPosMsg(obj) {
				//console.log(obj)
				//this.posIds = obj
				//console.log(obj.projects.name)
				this.positionName = obj.projects.name
				sessionStorage.setItem("projectId", obj.projects.id)
			},
			//控制参与者显示问题和权限的添加
			ifCYZadnYCFun(){
				//项目权限设置
				API.get('/projectPermission/queryProjectPermission', {
					projectId: sessionStorage.getItem('projectId')
				}).then(res => {
	//				console.log('=================================',res.data.data)
					sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
					Bus.$emit('toQueryProjectPermission', res.data.data)

				})
			},
			//关闭所有弹窗
			closeAll() {
				this.select_address_bol = false
			},
			//开始，结束时间限制
			pickerStartTime() {
				const that = this
				return {
					disabledDate(time) {

						//         if (!that.endTime) {
						//             return time.getTime() < Date.now() - 8.64e7
						//         }
						//         return time.getTime() < Date.now() - 8.64e7 || time.getTime() > new Date(that.endTime).getTime() - 8.64e7
					}
				}
			},
			pickerEndTime() {
				const that = this
				return {
					// disabledDate(time) {
					// if (!that.startTime) {
					//     return time.getTime() < Date.now()
					// }
					// return time.getTime() < new Date(that.startTime).getTime() + 8.64e7
					// }
					disabledDate(time) {
						let beginDateVal = that.startTime;
						if(beginDateVal) {
							return time.getTime() < beginDateVal;
						}
					}
				}
			},
		},
		mounted() {
			this.moduleInit();
			let name = this.$store.state.path;
			this.projectNmae = name[1].name
			let session = sessionStorage.getItem('addScheduleFalg');
			if(session == 'project') {
				this.flagState = false
			} else if(session == 'calendar') {
				this.flagState = true
			}
		},
		created(){
		//接收组件通信信息
		Bus.$on('toQueryProjectPermission', (msg) => {
			this.addParticipantFlage = msg.projectPermissionList[16].status
			this.removeParticipantFlage = msg.projectPermissionList[17].status
			this.privacyModeFlage = msg.projectPermissionList[18].status

		});
	}
	};
</script>
<style scoped>
	/* 下拉列表 */

	.time-wrap .repeat,
	.time-wrap .remind {
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
	/* header */

	.creatSchedule .creat-header {
		padding: 0 16px;
		height: 75px;
		line-height: 75px;
		text-align: center;
		border-bottom: 1px solid #e0e0e0;
		position: relative;
	}

	.creat-header .title {
		font-size: 16px;
		font-weight: normal;
	}

	.creat-header .project {
		color: #999999;
	}

	.creat-header .close {
		display: inline-block;
		position: absolute;
		top: 30px;
		right: 20px;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		color: #A8A8A8;
		cursor: pointer;
	}

	.creat-header .close:hover {
		color: #3da8f5;
	}

	.creatSchedule .creator-body {
		padding: 0 30px;
		user-select: none;
	}
	/* 标题 */

	.creator-body .newTitle-wrap {
		margin-top: 20px;
		background-color: #fff;
		border: 1px solid rgba(0, 0, 0, .1);
		border-radius: 4px;
		padding: 10px 15px;
	}

	.newTitle-wrap textarea {
		overflow: hidden;
		height: auto;
		width: 100%;
		resize: none;
		border: 0 none;
		line-height: 20px;
		box-shadow: none;
		outline: none;
		font-size: 14px;
	}
	/* 时间控件 */

	.creator-body .time-wrap {
		padding: 20px 0;
		display: flex;
		color: #B0B0B0;
		font-size: 14px;
		border-bottom: 1px solid #e5e5e5;
	}

	.time-wrap>div {
		margin-right: 30px;
	}

	.time-wrap .checkbox {
		display: inline-block;
		/* width: 45px; */
		height: 20px;
		font-size: 15px;
		cursor: pointer;
	}

	.time .iconfont {
		font-size: 14px;
		/*margin-right: 10px;*/
	}

	.checkbox .text {
		padding-left: 10px;
		color: #808080;
		font-size: 14px;
	}

	.time span:not(.iconfont) {
		color: #808080;
	}

	.time .time-start:hover,
	.time .time-end:hover {
		cursor: pointer;
		color: #3da8f5;
	}

	.time-wrap .repeat,
	.time-wrap .remind {
		cursor: pointer;
	}
	/* 隐私 */

	.creatSchedule .privacy {
		padding: 26px 0;
		border-top: 1px solid #e0e0e0;
		display: flex;
		justify-content: space-between;
		user-select: none;
	}

	.privacy .selector:hover {
		cursor: pointer;
		color: #3DA8F5;
	}

	.selector .name .iconfont {
		font-size: 20px;
	}

	.selector .state {
		padding-left: 24px;
		font-size: 12px;
		line-height: 18px;
		color: #B0B0B0;
	}

	.privacy .btn-add {
		width: 96px;
		height: 36px;
		line-height: 0;
	}
	/* 创建按钮 */

	.privacy .btn-add.inactive {
		background: #e0e0e0;
		border-color: #e0e0e0;
	}
	/*时间选择器样式修改*/

	.time-a-info {
		position: relative;
	}

	.time-a-info span {
		width: 100px;
		display: inline-block;
		position: absolute;
		top: -2px;
		left: 0;
		z-index: 2;
		pointer-events: none;
		background-color: #fff;
		text-align: center;
	}

	.schedule-time-cover .el-button--mini:hover {
		background-color: red;
	}

	.can-code {
		background: #409EFF;
		border-color: #409EFF;
		width: 86px;
		height: 32px;
		line-height: 0;
		color: #fff;
		border-radius: 4px;
		pointer-events: auto;
	}
</style>
