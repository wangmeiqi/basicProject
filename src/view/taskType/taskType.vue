<template>
	<div>
    <!--项目信息-->
    <div class="taskInfo">
      <!--<task-info></task-info>-->
    </div>
		<!--任务管理-->
		<div class="taskManagement">
			<task-management></task-management>
		</div>
		<div class="main" style="margin-top:10px; white-space: nowrap">
			<router-view></router-view>
		</div>
		<taskTypeFloat/>
	</div>
</template>

<script>
	import taskTypeFloat from './taskTypeFloat'
	import draggable from 'vuedraggable'
	import headerUrl from 'assets/images/chengyuan.png'
	import taskManagement from 'view/taskType/taskManagement'
  	import taskInfo from 'view/taskType/taskInfo'
	import api from '../../api/http'
	import { mapMutations, mapGetters } from 'vuex'
	import Bus from 'assets/js/Bus.js'
	export default {
		components: {
			draggable,
			taskTypeFloat,
			taskManagement,
      taskInfo
		},
		data() {
			return {
				taskJia: true,
				myArray: [{
					name: '项目名称海航项目任务名称 ',
					tasksList: [{
						name: '海航风控BIM体系',
						fileURL: headerUrl,
						createTime: '2017-12-27',
						endTime: '2017-12-18',
						checked: false
					}]
				}, ],
				levelsIndex: -1,
				youUrl: '',
				Active: 0,
				isActive: -1,
				acitve: false,
				options: {
					group: {
						name: 'people',
						pull: true,
						put: true
					},
					sort: true,
					scroll: true,
					animation: 300,
					fallbackClass: true,
					forceFallback: true,
					filter: '.addTask',
					ghostClass: 'cccc'
				},
				vCreate: true,
				createInput: '',
				isShow: true,
				addTaskfloat: false,
				bottomMore: false,
				more: true,
				value1: '',
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				task: '', // 添加更多隐藏框 任务名称
				taskList: [], //添加更多隐藏框 任务列表
				showTask: false,
				name: '', //登陆用户名称
				imgUrl: '', //登陆用户头像
				receivePeople: false, //认领成员下拉框
				search: '', //查找成员输入框
				Peoples: [], //认领成员列表
				participate: false, //参与者下拉页面
				length: '', //参与着人数
				imgs: [], //img添加的数组
				list: [], //点击更多后的下拉数组
				priority: '', //优先级
				levels: [{
					name: '普通',
					id: 1
				}, {
					name: '紧急',
					id: 2
				}, {
					name: '非常紧急',
					id: 3
				}], //遍历级别数组
				level: false, //优先级浮动框
				levelName: '普通',
				input: '',
				labelBox: false,
				labelList: [], //遍历标签
				newLable: [], //选择标签的新数组
				inputLable: '', //添加标签的input输入框
				addLablebox: false, //添加标签后的盒子
				taskDescribe: '', // 任务描述
				implementPeopleId: '', //执行者id
				taskTypeId: '', //任务类别id
				ids: [], //人员id
				lables: [], // 标签id合集
				taskFielid: '', //优先级id
				taskField: '',
				tid: '',
				isActive: -1,
				yincang: true,
				onteList: [],
				setData: [],
				id: '',

			}
		},
		methods: {

			//添加标签方法
			addLable() {
				this.labelBox = false
				this.addLablebox = !this.addLablebox

			},
			saveAdd() {
				let data = {
					name: this.inputLable,
					pid: sessionStorage.getItem('projectId'),
					fid: 3
				}
				if(this.inputLable != '' && this.inputLable.length < 6) {
					this.labelList.push(this.inputLable)
					api.post('/task/addLable', data).then(res => {
						this.addLablebox = !this.addLablebox
					})
				}
			},
			//选择标签增加到新的数组
			addNewLable(index) {
				this.newLable.push(this.labelList[index].name)
				this.lables.push(3 + '-' + this.labelList[index].id)
				Array.prototype.distinct = function() {
					var arr = this,
						result = [],
						i,
						j,
						len = arr.length;
					for(i = 0; i < len; i++) {
						for(j = i + 1; j < len; j++) {
							if(arr[i] === arr[j]) {
								j = ++i;
							}
						}
						result.push(arr[i]);
					}
					return result;
				}
				let arr = this.newLable.distinct()
				this.newLable = arr
				let newArr = this.lables.distinct()
				this.lables = newArr
				this.labelBox = false
			},
			//标签浮动框
			labelShow() {
				this.taskJia = !this.taskJia
				this.labelBox = !this.labelBox
				let params = {
					pid: sessionStorage.getItem('projectId'),
					fid: 3
				}
				api.get('/task/findTaskLable', params).then(res => {
					console.log(res.data.data);
					this.labelList = res.data.data
				})
			},
			tab() {
				this.yincang = !this.yincang

			},
			//选中优先级li 进行赋值
			levelCheck(index) {
				this.levelsIndex = index
				this.levelName = this.levels[index].name
				this.taskField = (this.taskFielid + '-' + this.levels[index].id)
				console.log(this.taskField);
				this.level = false

			},
			//优先级下拉框显示与隐藏
			levelShow() {
				this.level = !this.level
			},
			//获取任务id
			getTask(index) {
				this.task = this.taskList[index].name
				this.taskTypeId = this.taskList[index].id
				sessionStorage.setItem('taskId', this.taskList[index].id)
				this.Active = index;
				this.showTask = false

			},
			//增加成员时 成员头像添加到遍历数组
			pushImg(index) {
				this.imgs.push(this.Peoples[index].user_img)
				this.ids.push(this.Peoples[index].id)

				Array.prototype.distinct = function() {
					var arr = this,
						result = [],
						i,
						j,
						len = arr.length;
					for(i = 0; i < len; i++) {
						for(j = i + 1; j < len; j++) {
							if(arr[i] === arr[j]) {
								j = ++i;
							}
						}
						result.push(arr[i]);
					}
					return result;
				}
				let arr = this.ids.distinct()
				this.ids = arr
			},
			//参与者下拉框
			participateXiala() {
				this.level = false
				this.receivePeople = false
				this.participate = !this.participate
				this.setProjectId()
			},
			cha() {
				this.addLablebox = false
				this.labelBox = false
			},
			zuo() {
				this.addLablebox = !this.addLablebox
				this.labelBox = true
			},
			//选中成员
			selected(index) {
				this.imgUrl = this.Peoples[index].user_img
				this.isActive = index
				this.name = this.Peoples[index].username
				this.receivePeople = false
				this.implementPeopleId = this.Peoples[index].id

			},
			//点击用户头像 显示认领 成员下拉框
			receive() {
				this.labelBox = false,
					this.level = false
				this.participate = false
				this.receivePeople = !this.receivePeople

				this.setProjectId()
			},
			//显示与隐藏任务列表下拉框z'

			showTasklist() {
				this.showTask = !this.showTask
				this.receivePeople = false
				this.labelBox = false
				this.level = false
				this.participate = false
				this.receivePeople = false

			},
			//创建任务
			saveButton(index) {
				let data = {
					name: this.taskDescribe, //任务描述
					endTime: this.value1, //设置日期截止事件
					proId: sessionStorage.getItem('projectId'), //项目id
					tid: 111, //任务列表　id
					implementPeopleId: this.implementPeopleId, //执行者id
					taskType: this.taskTypeId, //任务类型
					ids: this.ids.toString(), //参与人员id
					label: this.lables.toString(), //选择标签的id
					taskField: this.taskField, //优先级

				}
				let newData = {
					name: this.taskDescribe,
					endTime: this.value1,
					checked: false,
					fileURL: this.imgUrl,
				}

				if(this.taskDescribe && this.value1 !== '') {
					this.myArray[index].tasksList.push(newData)
					api.post('/task/addTask', data).then(res => {
						this.showTask = false
						this.receivePeople = false
						this.labelBox = false
						this.level = false
						this.participate = false
						this.receivePeople = false
					})
				} else {
					alert('请填写完整信息')
				}
			},
			//点击更多显示与隐藏
			addBoreder() {
				this.more = false,
					this.bottomMore = !this.bottomMore
				let params = {
					typeId: this.taskTypeId
				}
				api.get('/task/findField', params).then(res => {
					console.log(res);
					this.list = res.data.data.newData
					this.taskFielid = res.data.data.data.id
					this.youUrl = res.data.data.data.icon
					this.priority = res.data.data.data.name
				})

			},
			//添加任务显示与隐藏
			addTask(index) {
				console.log(index);
				this.addLablebox = false
				this.addTaskfloat = !this.addTaskfloat
				this.bottomMore = false
				this.more = true
				// 获取项目id
				let id = sessionStorage.getItem('projectId')
				let params = {
					pid: id
				}
				//查找任务列表
				api.get('/task/findTaskType', params).then(res => {
					if(res.data.data != '') {
						this.taskTypeId = res.data.data[0].id
						this.taskList = res.data.data
						this.task = res.data.data[0].name
					} else {
						this.task = '添加和任务管理类型'
					}

				})

			},
			createLi() {
				this.vCreate = !this.vCreate
			},
			cancel() {
				this.vCreate = !this.vCreate
			},
			save() {
				this.myArray.push({
					title: this.createInput,
					content: []
				})
				let tid = sessionStorage.getItem('tid')
				let data = {
					name: this.createInput,
					tid
				}
				console.log(tid);
				api.post('/task/addTaskList', data).then(res => {
					console.log(res);
				})

			},
			...mapMutations({}),
			//页面加载时候数据
			getData() {
				let bid = sessionStorage.getItem('userId')
				let params = {
					id: bid
				}
				api.get('/userInfo/getUserMessage', params).then(res => {
					this.setData = res.data.data
					this.id = res.data.data.id
					this.implementPeopleId = res.data.data.id
					this.name = res.data.data.username
					this.imgUrl = res.data.data.user_img
					this.imgs.push(this.imgUrl)
				})

			},
			//发送项目id函数
			setProjectId() {
				let id = sessionStorage.getItem('projectId')
				let params = {
					pid: id
				}
				api.get('/projects/getUserByPid', params).then(res => {
					this.Peoples = res.data.data
					this.length = this.Peoples.length
				})
			},
			//获取数组
			getMyarray() {
				let params = {
					projectId: sessionStorage.getItem('projectId')
				}
				api.get('/task/findGroupTask', params).then(res => {
					this.tid = res.data.data[0].id
					sessionStorage.setItem('tid', this.tid)
				})

			},
			//任务列表
			getList(taskTypeId) {

        let params = {
					tid: taskTypeId
				}

				api.get('/task/findTaskByGroupId', params).then(res => {
					this.myArray = []
					res.data.data.map(el => {
						el.addTaskfloat = false
						el.tasksList.map(el => {
							el.createTime = this.getTime(el.createTime).slice(0, 10)
							el.endTime = this.getTime(el.endTime).slice(0, 10)

							if(el.fileURL == '') {
								el.fileURL = headerUrl
							}

						})

					})
					// this.myArray =res.data.data
				})
			},
			//时间戳转换函数
			getTime(timestamp) {
				let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate() + ' ';
				let h = date.getHours() + ':';
				let m = date.getMinutes() + ':';
				let s = date.getSeconds();
				return Y + M + D + h + m + s;

			},

		},
		computed: {
			...mapGetters({
				getTid: 'GET_TID',
				GET_MYARRAY: 'GET_MYARRAY',
				getEnterpriseId: 'GET_ENTERPRISEID'
			}),
		},
		created: function() {
			this.getMyarray()
			this.getData()
			api.get('/task/findGroupTask', {
				projectId: sessionStorage.getItem('projectId')
			}).then(res => {
				this.getList(res.data.data[0].id)
			})
			//项目权限设置
			api.get('/projectPermission/queryProjectPermission', {
				projectId: sessionStorage.getItem('projectId')
			}).then(res => {
//				console.log('=================================',res.data.data)
				sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
				Bus.$emit('toQueryProjectPermission', res.data.data)
			})
		},

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.create {
		width: 234px;
		height: 17px;
		background: #f7f7f7;
		right: 0;
		align-items: center;
		padding: 14px 18px;
		display: flex;
	}

	.taskHeader:hover {
		color: deepskyblue;
	}

	.taskCreate {
		vertical-align: top;
		background-color: #f7f7f7;
		border-radius: 3px;
		align-items: stretch;
		position: relative;
		width: 234px;
		display: inline-flex;
		padding: 14px 18px;
	}

	.buttonBox {
		margin-top: 15px;
	}

	.roleListfloat {
		width: 200px;
		height: 200px;
		color: red;
	}

	.dessccs {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		border: 1px dashed #4e99ff;
		border-radius: 30px;
	}

	.personnelFloat {
		position: absolute;
		z-index: 2000;
		background: #fafafa;
		top: 150px;
		width: 340px;
		left: 490px;
		padding: 30px;
	}

	.rightNav {
		padding: 0 20px 20px 20px;
		background: #ffffff;
		position: absolute;
		right: 0;
		z-index: 2;
	}

	.roleListFals {
		width: 250px;
		z-index: 999;
		top: 415px;
		left: 1170px;
		display: block;
		bottom: auto;
	}

	.navHeader {
		padding: 20px 0 20px 0;
		width: 300px;
		height: 10px;
		border-bottom: 2px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.navList {
		padding-bottom: 20px;
		border-bottom: 1px solid;
	}

	.inputPersonnel {
		position: relative;
		margin-top: 20px;
	}

	.inputPersonnel>input {
		width: 340px;
		height: 35px;
		margin-top: 20px;
	}

	.navList>li {
		margin-top: 20px;
	}

	.mgT20 {
		margin-top: 20px;
	}

	.pdB20 {
		border-bottom: 1px solid;
		padding-bottom: 20px;
	}

	.mgT4 {
		margin-top: 4px;
	}

	.mgT17 {
		margin-top: 17px;
	}

	.maL30 {
		margin-left: 30px;
	}

	.rightLog>li {
		padding: 0 15px 0 15px;
	}

	.personnel {
		padding: 0 20px 20px 20px;
		background: #ffffff;
		position: absolute;
		right: 0;
		z-index: 2;
	}

	.personnelInput>input {
		width: 290px;
		height: 35px;
	}

	.mgT23 {
		margin-top: 23px;
	}

	.f12 {
		font-size: 12px;
	}

	.inputPli {
		position: relative;
	}

	.linputSpan {
		display: block;
		width: 50px;
		height: 25px;
		background: #4e99ff;
		position: absolute;
		right: 0;
		text-align: center;
		color: #ffffff;
	}

	.addBackground {
		background: #383838;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		opacity: 0.7;
		z-index: 10;
	}

	.add {
		color: #1296db;
	}

	.box {
		background: gray;
	}

	.item {
		padding: 10px;
		width: 270px;
		float: left;
		overflow: auto;
		background: #f7f7f7;
		height: 100vh;
		margin-left: 10px;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.item::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.item::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.item::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}

	.hand {
		margin-bottom: 13px;
		font-weight: bold;
	}

	.task {
		width: 100%;
		height: 106px;
		background: white;
		padding-top: 18px;
		margin-bottom: 10px;
		border-radius: 4px;
		border-left: 4px solid rgba(0, 0, 0, 0);
		transition: border 1s;
		.title {
			justify-content: space-between;
			display: flex;
			margin-left: 10px;
			margin-right: 10px;
		}
		.date {
			margin-top: 18px;
			text-align: center;
			span {
				background: #efefef;
				display: block;
				width: 85%;
				height: 20px;
				margin-left: 30px;
				border-radius: 2px;
			}
		}
	}

	.task:hover {
		border-left: 4px red solid;
	}

	.addTask {
		width: 100%;
		height: 36px;
		display: flex;
		justify-content: center;
		align-content: center;
		background: white;
		color: #0a7ee9;
		span {
			cursor: pointer;
			line-height: 36px;
			i {
				margin-right: 6px;
			}
		}
	}

	.taskManagement {
		display: flex;
		justify-content: center;
		position: fixed;
		top: 30px;
		z-index:10;
		left: 600px;
	}


	.cccc {
		background: gainsboro !important;
	}

	.floatHeader {
		display: flex;
		align-items: center;
		position: relative;
	}

	.floatHeader>p {
		margin-left: 10px;
	}

	.floatHeader>img {
		margin-left: 10px;
	}

	.addTaskfloat {
		margin-top: 10px;
		width: 100%;
		background: #ffffff;
	}

	.floatInput {
		width: 100%;
		margin-top: 20px;
	}

	.yongHeader {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.yongHeader>img {
		width: 100%;
		height: 24px;
		border-radius: 50%;
	}

	.yongyou {
		display: flex;
		align-items: center;
		margin-top: 15px;
		position: relative;
	}

	.yongyou>p {
		font-size: 14px;
	}

	.addbother {
		width: 90%;
		margin: auto;
		padding-top: 25px;
		padding-bottom: 10px;
		position: relative;
	}

	.borederBottom {
		margin-top: 15px;
		height: 1px;
		width: 100%;
		background: #e7e7e7;
	}

	.canyu {
		margin-top: 10px;
	}

	.canyuHeader {
		display: flex;
		align-items: center;
	}

	.canyuTouxiang {
		display: flex;
		margin-right: 10px;
	}

	.canyuTouxiang>li>img {
		width: 24px;
		margin-right: 10px;
		height: 24px;
		border-radius: 50%;
	}

	.canyuTitle {
		margin-top: 10px;
		display: flex;
		align-items: center;
		position: relative;
	}

	.more>p {
		font-size: 14px;
		margin-left: 10px;
	}

	.more {
		margin-top: 15px;
		display: flex;
		align-items: center;
	}

	.ft12 {
		font-size: 12px;
	}

	.saveButton {
		width: 72px;
		height: 38px;
		background: #077ce7;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		margin-left: 75px;
	}

	.taskList {
		width: 99%;
		position: absolute;
		top: 30px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
	}

	.receivePeople {
		padding-bottom: 10px;
		width: 99%;
		position: absolute;
		top: 30px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
	}

	.imgTitle {
		height: 37px;
		display: flex;
		align-items: center;
		font-size: 14px;
		cursor: pointer;
		position: relative;
	}

	.imgTitle>img {
		margin-left: 10px;
	}

	.imgTitle:hover {
		background: #e5e5e5;
	}

	.imgTitle>img {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}

	.imgTitle>p {
		margin-left: 10px;
	}

	.level {
		font-size: 14px;
		right: 0;
		position: absolute;
		cursor: pointer;
	}

	.gengduo:hover {
		color: #077ce7;
		cursor: pointer;
	}

	.pointer {
		cursor: pointer;
	}

	.levelFloat>li {
		position: relative;
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 14px;
	}

	.levelFloat>li>p {
		margin-left: 10px;
	}

	.levelFloat>li:hover {
		background: #e5e5e5;
	}

	.levelFloat {
		width: 99%;
		position: absolute;
		top: 30px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
	}

	.inputEl {
		width: 150px;
	}

	.absloue {
		position: absolute;
		right: 0;
	}

	.label {
		right: 0;
		position: relative;
		background: #ffffff;
		top: 20px;
		z-index: 1;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		width: 250px;
		border-radius: 10px;
	}

	.label>div {}

	.label>div>P {
		display: flex;
		align-items: center;
		height: 40px;
		margin-left: 10px;
	}

	.lableList {
		height: 20px;
		margin-left: -31px;
		width: 100%;
		margin-top: 30px;
		display: flex;
	}

	.floatHeader>p {
		font-size: 14px;
	}

	.addLablebox {
		width: 250px;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		z-index: 9999;
		position: relative;
		padding-bottom: 10px;
	}

	.canyuHeader>p {
		font-size: 14px;
	}

	.canyuHeader>img {
		margin-left: 10px;
	}

	.menu-item {
		display: flex;
		align-items: center;
		padding: 0 16px;
		height: 36px;
		line-height: 36px;
		cursor: pointer;
		font-size: 14px;
		position: relative;
	}

	.menu-item:hover {
		background: #e5e5e5;
	}

	.youxianji {
		border-bottom: 1px solid #e7e7e7;
		height: 30px;
		display: flex;
		position: relative;
		align-items: center;
		margin-top: 10px;
	}

	.bianli {
		display: flex;
		position: relative;
		margin-top: 10px;
		height: 50px;
		align-items: center;
		border-bottom: 1px solid #e7e7e7;
	}

	.bianli {
		font-size: 14px;
	}

	.bianli>p {
		font-size: 14px;
		margin-left: 8px;
	}

	.youxianji>p {
		margin-left: 8px;
		font-size: 14px;
	}

	.addLableboxTitle {
		margin: 0 auto;
		height: 40px;
		width: 90%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.yaoqing {
		cursor: pointer;
		color: #077ce7;
		margin-top: 10px;
		font-size: 14px;
		margin-left: 10px;
		display: flex;
		align-items: center;
	}

	.yaoqing>img {
		width: 24px;
		height: 24px;
		margin-right: 10px;
	}

	.saveAdd {
		width: 90%;
		margin: 10px auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #077ce7;
		text-align: center;
		color: #ffffff;
		height: 30px;
		border-radius: 5px;
	}

	.labelListBox:hover {
		background: #e5e5e5;
	}

	.closeBohter {
		position: absolute;
		right: 0;
		top: 10px;
		cursor: pointer;
	}

	.title>div>img {
		width: 16px;
		height: 16px;
	}

	.main{
		height: 80vh;
		z-index: 100;
	}
	  /*项目信息*/
	  .taskInfo {
	    position: absolute;
	    top: 78px;
	    z-index: 0;
	  }
</style>
