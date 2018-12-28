<template>
	<div>
		<ul class="task-list events-list my-list">
			<li @click="taskDetail(item,index)" class="task" v-for="(item,index) in taskDataList">
				<el-tooltip v-if="item.map.isTrue==0" class="item" effect="dark" :content="repeatContent" placement="top-start">
					<div @click.stop="changeSatus(item,index)" class="frame-check-box" :class="{'frame-check-box-unchecked':item.map.isTrue==0}">
					</div>
				</el-tooltip>
				<div v-if="item.map.isTrue==1" @click.stop="changeSatus(item,index)" class="frame-check-box" :class="{'frame-check-box-unchecked':item.map.isTrue==0}">
					<i v-show="item.state==1" class="iconfont icon-duihao"></i>
				</div>
				<div class="task-content-set" data-type="task">
					<div class="task-content-wrapper">
						<div class="task-content">
							<!--<img v-if="imgBol&&item.user.user_img!=''" class="nameImg" :src="item.user.user_img" alt="" />
							<span v-if="imgBol&&item.user.user_img==''&&item.user.username!=''" class="img">{{item.user.username[0]}}</span>
							<span style="background: #ccc;" v-if="imgBol&&item.user.user_img==''&&item.user.username==''" class="img"><i class="iconfont icon-wode"></i></span>
							-->
							<span style="font-size: 14px;vertical-align: sub;">{{item.name}}</span>
							<a style="vertical-align: sub;" @click="jumpOtherDetail" v-if="item.map.groupName==''" class="task-tag">{{item.map.countName}}</a>
							<a style="vertical-align: sub;" @click="jumpOtherDetail" v-else class="task-tag">{{item.map.groupName}}</a>
							<span class="label task-id-label"></span>
							<span class="label tag tag-blue" v-for="value in item.map.lableList">
								<span class="tag-name">{{value.name}}</span>
							</span>
							<div v-if="item.pid!=0" class="subtask-info muted">属于任务：{{item.map.countName}}</div>
						</div>
						<time class="task-duedate label  label-important" :class="{'red_color':item.map.sta==3?true:false}">
							<span class="icon icon-calendar2 icon-white"></span>{{item.endTime | timeFilt}}
						</time>
					</div>
				</div>
			</li>
		</ul>
		<div v-if="showDetailTask">
			<taskEdit :taskId="chooseTaskId" @close="close"></taskEdit>
		</div>
	</div>
</template>

<script>
import API from 'api/http'
import taskEdit from 'components/taskEdit/taskEdit'

export default{
	props:{
		taskDataList:{
			type:Array,
			default:null
		},
		chooseDoneType:{
			type:Boolean
		},
		imgBol:{
			default:true//true是否显示头像,false为不显示
		}
	},
	components:{
		taskEdit
	},
	filters: {
        //时间戳转化为日期
        timeFilt(val) {
        	let date = new Date(val);
        	let Y = date.getFullYear() + '年';
        	let M = (date.getMonth()+1) + '月';
        	let D = date.getDate() + '日';
        	val = Y+M+D;
        	return val;
        }
    },
    data(){
    	return{
    		chooseTaskId:'',
    		showDetailTask:false,
    		repeatContent:'子任务有未全部完成，无法完成父任务'
    	}
    },
    methods:{
    	taskDetail(item,index){
    		this.chooseTaskId = item.id;
    		this.showDetailTask = true;
    	},
    	close(){
    		this.showDetailTask = false;
    		this.$emit('getDataAgain');
    	},
    	jumpOtherDetail(){
    		// this.$router.push()
    	},
    	//取消选中
    	// deleteDuihao(item,index){
    	// 	if(this.chooseDoneType){
    	// 		this.changeSatus(item,index,0);
    	// 	}
    	// },
    	//改变复选框的状态
        changeSatus(item,index){
        	let self = this;
        	let code;
        	item.state==1?code=0:code=1;
        	API.get('task/getTaskPid', {
                pid: item.id
            }).then(res => {
                if(res.data.data){
            		this.taskDataList[index].state = 1;
                	API.get('task/getTaskContent', {
		                tid: item.id,
		                stateChange:code
		            }).then(res => {
		            	let self = this;
		                if(res.data.code==200){
		                	// 勾选了未完成任务，更新近期的事任务列表
		                    self.$emit('getDataAgain');
		                }
		            })
                }
            })
        }
    }

}
</script>

<style scoped>
.my-list {
	padding-bottom: 8px;
	margin: 4px 0 0;
}

.task {
	position: relative;
	white-space: normal;
}

.task-list .task {
	padding: 10px 20px;
	list-style: none;
}

.task .task-content-set .task-tag:hover {
	color: #3da8f5;
}

.task .task-content-set .task-content-wrapper .task-content {
	-webkit-flex: 1 1 auto;
	-ms-flex: 1 1 auto;
	flex: 1 1 auto;
}

.task {
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-flex-direction: row;
	-ms-flex-direction: row;
	flex-direction: row;
	-webkit-align-items: flex-start;
	-ms-flex-align: start;
	align-items: flex-start;
}

.my-list>.task:hover {
	background-color: #f5f5f5;
}

.task .task-content-set {
	overflow: hidden;
	margin: 0 0 0 12px;
	line-height: 20px;
	cursor: pointer;
}

.task .task-content-set,
.task .task-content-set .task-content-wrapper {
	-webkit-flex: 1 1 auto;
	-ms-flex: 1 1 auto;
	flex: 1 1 auto;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-align-items: flex-start;
	-ms-flex-align: start;
	align-items: flex-start;
}

.task .task-content-set .task-content-wrapper {
	overflow: hidden;
	min-height: 24px;
}

.task .task-content-set .task-content-wrapper {
	-webkit-flex-direction: row;
	-ms-flex-direction: row;
	flex-direction: row;
}

.task .task-content-set .task-content-wrapper .task-content {
	word-wrap: break-word;
	overflow: hidden;
	margin: 2px 12px 0 0;
}

.task .task-content-set .task-tag {
	margin-left: 5px;
	color: #a6a6a6;
	transition: color 218ms;
}

.task .task-content-set .task-content-wrapper .task-content .label {
	margin-left: 5px;
}

.icon.icon-white {
	color: #fff;
}

.task-duedate {
	color: #a6a6a6;
	background-color: transparent;
}

.task .task-content-set .task-content-wrapper .task-duedate {
	height: 22px;
	line-height: 22px;
	margin-left: 16px;
	padding-top: 0;
	padding-bottom: 0;
}

.task .task-content-set .task-content-wrapper .task-content .tag {
	border-radius: 35px;
	vertical-align: middle;
	padding: 3px 6px;
}

.task .task-content-set .task-content-wrapper .task-content .label {
	margin-left: 5px;
}

.tag-blue,
.tag-default {
	color: #246493;
	background-color: rgba(138, 202, 249, .8);
}

.label {
	font-weight: 400;
}

.muted {
	color: #a6a6a6;
	font-weight: 400;
}
.red_color {
	color: #ff4f3e;
}
.frame-check-box{
	-ms-flex-order: 0;
	-webkit-box-ordinal-group: 1;
	order: 0;
	-ms-flex: none;
	-webkit-box-flex: 0;
	flex: none;
	margin-right: 0;
	width: 18px;
	height: 18px;
	line-height: 20px;
	border: 2px solid #a6a6a6;
	display: inline-block;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
    margin-top: 4px;
}
.frame-check-box-unchecked{
	background: #e0e0e0;
    opacity: 0.5;
    cursor: initial;
}
.img{
	width: 26px;
    height: 26px;
     border-radius: 50%;
    background: #ffae44;
    display: inline-block;
    color: white;
    -webkit-box-shadow: 0 0 10px #E6E6E6;
    box-shadow: 0 0 10px #E6E6E6;
    text-align: center;
    line-height: 26px;
    vertical-align:middle
}
.nameImg{
	width: 26px;
    height: 26px;
    border-radius: 50%;
    vertical-align:middle
}
</style>