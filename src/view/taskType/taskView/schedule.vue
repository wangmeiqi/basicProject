<!-- 日程-->
<template>
    <div class="schedule schedule-time-special">
        <a class="create card" @click.prevent="createSchedule" v-if="newscheduleFlage">
            <div>
                <span class="iconfont icon-add"></span>
                <span>添加日程</span>
            </div>
        </a>
        <div class="tips card" v-show="tipsShow">
            <div class="iconfont icon-rili3"></div>
            <div class="content">添加新日程，安排会议或其他活动，添加参与者即可通知其他成员参加。</div>
        </div>
        <div v-for="(value,num) in dataList">
            <p class="schedule-list"><span>{{value.title}} · {{value.number}}</span></p>
            <div v-if="value.number>0" class="scheduleList card">
                <div class="schedule-view clearfix" @click="checkDetail(item,num,index)" v-for="(item,index) in value.childList">
                    <div class="schedule-time">
                        <div>
                            <time>{{item.startTime | timeFilt}}</time>
                            <div>~</div>
                            <time>{{item.endTime | timeFilt}}</time>
                        </div>
                    </div>
                    <div class="schedule-content">
                        <div class="schedule-content-container">
                            <h3 class="schedule-title">{{item.title}}</h3>
                            <p class="schedule-palce"><span><i class="iconfont icon-zhiyuandidian1"></i>地点 </span>{{item.place | cutStr}}</p>
                            <!-- 参与者 -->
                            <participant :closeAll="detailVisible" :type="selectType" :principalId="userId" :scheduleId="item.id" :list="item.userList"></participant>
                        </div>
                    </div>
                    <a class="iconfont icon-jiantou"></a>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible" width="600px" ref="closeCreator">
            <scheduleCreator @close="closeCreator" v-if="dialogVisible" :dialogVisible="dialogVisible" @creatSchedule="creatSchedule"></scheduleCreator>
        </el-dialog>
        <el-dialog :visible.sync="detailVisible" width="600px" ref="closeCreator">
            <scheduleDetail :detailvisible="detailVisible" @close="detailVisible=false" :scheduleID="scheduleId" @closeAllBoxs="closeAllBoxs"></scheduleDetail>
        </el-dialog>
    </div>
</template>
<script>
    import API from 'api/http'
    import TIME from '../../../api/time.js';
    import scheduleCreator from './creatSchedule.vue';      // 新建日程组件
    import scheduleActor from './scheduleActor';            // 参与者组件
    import scheduleDetail from './scheduleDetail';            // 日程详情
    import addTask from '../../../components/addTask.vue';
    import participant from 'components/schedule/participant'
    import Bus from 'assets/js/Bus.js'
    export default {
        components: {
            scheduleCreator: scheduleCreator,
            scheduleActor: scheduleActor,
            scheduleDetail,
            addTask,
            participant
        },
        data() {
            return {
            	//创建日程权限
            	newscheduleFlage:JSON.parse(sessionStorage.getItem('currentProjectPermissions')).projectPermissionList[14].status,

                value4:'',
                selectType:'schedule',
                dataList:[
                    {
                        title:'未来的日程',
                        number:0,
                        childList:[]
                    },
                    {
                        title:'过去的日程',
                        number:0,
                        childList:[]
                    }
                ],
                dialogVisible: false,//添加日程
                detailVisible:false,//编辑日程
                // 提示
                tipsShow: false,
                scheduleId:'',
                scheduleNum:'',
                scheduleIndex:'',
                userId:parseInt(sessionStorage.getItem('userId')),
                userList:[],   //参与人列表
            }
        },
        filters: {
            //时间戳转化为日期
            timeFilt(val) {
                return TIME.getRightTime(val-28800000);
            },
            cutStr(str){
                if(str && str.length>50){
                    return str.slice(0,50)+'...'
                }else{
                    return str;
                }
            }
        },
        methods: {
            // 新建日程弹框
            createSchedule() {
            	this.dialogVisible = true;
                sessionStorage.setItem('addScheduleFalg','project')
            },
            closeCreator() {
                this.dialogVisible = false;
                this.$refs.closeCreator.$el.click();
            },
            creatSchedule(){
                this.dialogVisible = false;
                this.$refs.closeCreator.$el.click();
                this.getScheduleList();
            },
            closeAllBoxs(){
                this.getScheduleList();
            },
            //获取日程列表
            getScheduleList(){
                API.get('/schedule/getAllSchedule', {
                    projectId: sessionStorage.getItem('projectId')
                }).then(res => {
                    if(res.data.code==200&res.data.message=='SUCCESS'){
                        let data = res.data.data;
                        this.dataList[0].number = data.scheduleFutureList.length;
                        this.dataList[0].childList = data.scheduleFutureList;
                        this.dataList[1].number = data.schedulePassList.length;
                        this.dataList[1].childList = data.schedulePassList;
                    }
                })
            },
            checkDetail(item,num,index){
                this.scheduleId = item.id;
                this.scheduleNum = num;
                this.scheduleIndex = index;
                this.detailVisible = true;
            },
            //改变参与人
            // changeUser(){
            //      API.get('/schedule/findScheduleById', {id:this.scheduleId}).then(res => {
            //         if(res.data.code==200&res.data.message=='SUCCESS'){
            //             this.dataList[this.scheduleNum].childList[this.scheduleIndex] =  res.data.data;
            //         }
            //     })
            // }
            editTags(){
                this.detailVisible = false;
            },
        },
        mounted() {
            this.getScheduleList();
        },
        created(){

        	//接收组件通信信息
			Bus.$on('toQueryProjectPermission', (msg) => {
//				console.log(msg)
				//"创建日程"
				this.newscheduleFlage = msg.projectPermissionList[14].status
//				console.log(this.newscheduleFlage )
			});
        },
        watch:{
            //弹窗关闭，更新列表（参与人）
            detailVisible(newVal){
                if(!newVal){
                    this.closeAllBoxs();
                }
            }
        }
    }
</script>
<style scoped>
    .schedule {
        box-sizing: border-box;
        background-color: #f5f5f5;
        padding: 30px 0;
        min-width: 1020px;
    }
    .schedule a {
        cursor: pointer;
    }
    .schedule .create,.schedule .tips{
        text-align: center;
        margin: 0 auto;
        vertical-align: middle;
        width: 90%;
    }
    /* 添加 */
    .schedule .create {
        display: block;
        height: 50px;
        margin-top: 20px;
        position: relative;
        color: #077ce5;
        margin-bottom: 40px;
    }
    .create div {
        display: inline-block;
        height: 50px;
        line-height: 50px;
    }
    .create .iconfont {
        font-size: 18px;
    }
    /* 提示 */
    .schedule .tips {
        margin-top: 20px;
        padding: 30px 0;
        color: #cccccc;
    }
    .tips .content {
        line-height: 30px;
    }
    .tips .iconfont {
        font-size: 40px;
        font-weight: bold;
    }
    /* 分隔线 */
    .schedule .separation {
        position: relative;
        height: 20px;
        margin: 40px 0 20px;
        text-align: center;
    }
    .schedule .separation::before {
        display: block;
        position: absolute;
        top: 10px;
        height: 1px;
        width: 100%;
        content: "";
        background-image: radial-gradient(circle,rgba(0,0,0,.12),transparent);
        background-repeat: no-repeat;
    }
    /* 日程列表 */
    .scheduleList {
        width: 90%;
        margin: 0 auto 0;
    }
    /* 头部 */
    .scheduleList .header{
        box-sizing: border-box;
        margin: 0px 15px;
        padding: 10px 15px;
        font-size: 18px;
    }
    .header .iconfont {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
    }
    /* 内容 */
    .scheduleList .schedule-view {
        position: relative;
        padding-top: 20px;
        margin: 0 10px;
        background-color: #fff;
        border-top: 1px solid #eee;
        padding-bottom: 10px;
    }
    .scheduleList.past .schedule-view {
        padding-bottom: 20px;
    }
    .scheduleList .schedule-view:hover {
        cursor: pointer;
    }
    .scheduleList .schedule-view:hover>.iconfont{
        display: block;
    }
    .schedule-view .schedule-time,.schedule-view .schedule-content {
        float: left;
    }
    .schedule-view .schedule-time {
        width: 160px;
        color: #a6a6a6;
        text-align: center;
        margin-top: 10px;

    }
    .schedule-view .schedule-content {
        padding: 0 30px;
        margin-right: 58px;
    }
    .schedule-content-container .schedule-title {
        font-size: 18px;
        line-height: 40px;
        font-weight: 400;
        max-width: 860px;
        word-break: break-word;
        white-space: normal;
    }
    .schedule-view > .iconfont {
        position: absolute;
        top: 50%;
        right: 20px;
        display: none;
        margin-top: -10px;
        font-size: 28px;
        color: #a6a6a6;
    }
</style>
<style>
    /* 公共样式 */
    /* 阴影 */
    .schedule .card {
        border: 0 none;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0px 2px 3px 0px rgba(0,0,0,.0470588);
    }
    /* 清除浮动 */
    .clearfix:after {
        content: "";
        height: 0;
        line-height: 0;
        display: block;
        clear: both;
        visibility: hidden;
    }
    .clearfix {
        /* 兼容IE 触发IE的hasLayout*/
        zoom: 1;
    }
    /* 弹框样式 */
    .schedule .el-dialog__header {
        display: none;
    }
    .schedule .el-dialog__body {
        padding: 0;
    }
    /* 时间控件样式 */
    .timewrap .time .schedule-time {
        width: 20px;
        height: 18px;
    }
    .time .schedule-time input{
        width: 100px;
        height: 18px;
        padding: 0;
        border: none;
        cursor: pointer;
        text-align: center;
    }
    .time .schedule-time {
        width: auto;
    }
    .time .schedule-time i {
        display: none;
    }
/*    .schedule-time-special div.el-picker-panel__footer{
        text-align: center;
        padding:13px 3px;
    }
    .schedule-time-special div.el-picker-panel__footer button.el-button--text{
        display: none;
    }
    .schedule-time-special .el-button,.el-button.is-plain,.el-button.is-plain,.el-button--mini{
        background: #e0e0e0;
        border-color: #e0e0e0;
        width: 86px;
        height: 32px;
        line-height: 0;
        color:#fff;
        pointer-events: none;
    }
    .schedule-time-special .el-button.is-plain:focus, .el-button.is-plain:hover{
        background: #e0e0e0;
        border-color: #e0e0e0;
        color:#fff;
    }
    .schedule-time-special .el-time-panel__footer{
        display: none;
    }
    .schedule-time-special .can-code{
        background: #409EFF;
        border-color: #409EFF;
        width: 86px;
        height: 32px;
        line-height: 0;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        pointer-events: auto;
    }
    .schedule-time-special .el-input__inner{
        height: 26px;
        line-height: 26px;
        width: 81%;
        cursor: pointer;
    }
    .schedule-time-special .el-input__icon{
        display: none;
    }*/
    .schedule-list{
        padding:26px 0;
        text-align: center;
        font-size: 14px;
    }
    .schedule-list:before{
        content: '';
        border-bottom: 1px solid #f3eded;
        display: inline-block;
        vertical-align: middle;
        width: 40%;
        margin-right: 10px;
    }
    .schedule-list:after{
        content: '';
        border-bottom: 1px solid #f3eded;
        display: inline-block;
        vertical-align: middle;
        width: 40%;
        margin-left: 10px;
    }
    .schedule-palce{
        padding: 10px 0 0 0;
    }
    .schedule-palce span i{
        font-size: 14px;
        margin-right: 4px;
    }
</style>
<!--<style>
	.schedule .selet_address{
		display: none;
	}
</style>-->

