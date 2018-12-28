<template>
	<div class="wrap" style="height:100%;">
        <div class="bar">
            <div class="options">
                <span class="date-option">
                    <span :class="{active:viewType=='day'}" @click="chageViewType('day')">日</span>
                    <span :class="{active:viewType=='week'}" @click="chageViewType('week')">周</span>
                    <span :class="{active:viewType=='month'}" @click="chageViewType('month')">月</span>
                </span>
            </div>
            <div class="date">
                <el-date-picker
                    :editable=editable
                    :clearable=editable
                    align="center"
                    v-show="viewType!='day'"
                    v-model="date"
                    type="year"
                    format="< yyyy 年 >"
                    @change="selectDate"
                ></el-date-picker>
                <el-date-picker
                    editable=editable
                    :clearable=editable
                    align="center"
                    v-show="viewType =='day'"
                    v-model="date"
                    type="month"
                    format="< yyyy 年 M 月>"
                    @change="selectDate"
                ></el-date-picker>
            </div>
            <div class="example">
                <p class="item">
                    <span class="icon"></span><span class="name">未开始</span>
                </p>
                <p class="item">
                    <span class="icon"></span><span class="name">进行中</span>
                </p>
                <p class="item">
                    <span class="icon"></span><span class="name">完成</span>
                </p>
                <p class="item">
                    <span class="icon"></span><span class="name">逾期</span>
                </p>
            </div>
        </div>
		<div id="gantt_here" style='width:100%; height:100%;'></div>
        <!--<taskCompile :taksCompileShow="taksCompileShow" :elementId="taskId"><span></span></taskCompile>-->
    <taskedit styles="width:690px;height:80%" v-if="taksCompileShow" :taskId="taskId" @close="taksCompileShow=false"></taskedit>
	</div>
</template>

<script>
    import api from '../../../api/http'
    // import 'static/dhtmlxgantt/dhtmlxgantt.js'
    import 'static/dhtmlxgantt/dhtmlxgantt_trial.js'
    import 'static/dhtmlxgantt/dhtmlxgantt_marker.js'   // 标记扩展
    // import 'static/dhtmlxgantt/dhtmlxgantt_grouping.js'
    import 'static/dhtmlxgantt/locale_cn.js'
    import taskCompile from '../taskCompile'
    import {mapGetters} from 'vuex'
    import taskedit from 'components/taskEdit/taskEdit'

	export default {
        components: {
            taskCompile,
          taskedit
        },
        computed: {
        	...mapGetters({
        		getTaskTypeId: 'GET_TASKTYPEID'
        	})
        },
        watch:{
        	getTaskTypeId(){
        		this.getTaskList()
        	}
        },
		data(){
			return {
                res: {
                    "code": 200,
                    "data": {
                        "taskList": [

                        ],
                        "taskGroup": {
                            "createTime": 1522206219000,
                            "describes": "默认任务",
                            "id": 45,
                            "name": "任务",
                            "project_id": "46",
                            "taskList": null,
                            "updateTime": null
                        }
                    },
                    "message": "SUCCESS"
                },  // 模拟数据
                eid: '',         // 企业id
                projectId: '',   // 项目id
                taskId: '',
                tasks:{},        // 本地数据
                viewType: 'day',
                date: new Date(),
                editable: false,
                groupName: '任务列表',
                taksCompileShow: false,
                taskList: [],       // 任务列表
                nullTask: [],        // 空列表
                data:''                 // 原始数据
			}
        },
		mounted(){
            this.getTaskList();
        },
        beforeDestroy() {
            sessionStorage.setItem("reload",true);
        },
        methods: {
            // 获取列表
            getTaskList() {
                // this.dataFormat(this.res.data.taskGroup,this.res.data.taskList);
                this.eid = sessionStorage.getItem('enterpriseId');
                this.projectId = sessionStorage.getItem('projectId');
                let id = sessionStorage.getItem('tid');
                // 获取分组id
//              api.get('task/findGroupTask',{projectId:this.projectId}).then((res) => {
//                  if (res.data.code === 200) {
//                      id = res.data.data[0].id;
//                      getList();
//                  }else {
//                      this.$message(res.data.message);
//                  }
//              });
                // 获取列表、任务
//              let getList = () => {
                    api.get('task/taskTimeView', {id}).then((res) => {
                        if (res.data.code === 200) {
                            this.dataFormat(res.data.data.taskGroup,res.data.data.taskList);
                            this.data = res.data.data;
                        }else {
                            this.$message(res.data.message);
                        }
                    });
//              }
            },
            // 甘特图默认配置
            setDefaultConf() {
                gantt.config.row_height = 30;
                gantt.config.task_height = 16;
                gantt.config.grid_resize = true;
                // gantt.config.drag_links = false;
                gantt.config.drag_progress = false;         // 禁止修改进度
                let _this = this;
                // 按天显示
                gantt.config.scale_unit = "day";
                gantt.config.date_scale = "%m月 %d日";
                // this.date = this.tasks.data[0].start_date;
                // 数据时间格式
                gantt.config.xml_date = "%Y-%m-%d %H:%i";
                // 左侧显示
                gantt.config.columns=[
                    {name:"text",label:this.groupName,tree:true, width:"*"},
                    {name:"add",label:"",}
                ];
                // 父节点
                gantt.templates.grid_folder = function(item) {
                    return '';
                };
                // 子节点
                gantt.templates.grid_file = function(item) {
                    return '';
                };
                gantt.templates.grid_indent=function(task){
                    return "<div style='width:20px; float:left; height:100%'></div>"
                };
                // 折叠按钮
                gantt.templates.grid_open = function(item) {
                    return "<div class='gantt_tree_icon iconfont icon-" +
                    (item.$open ? "shanglakongjian" : "xialakongjian") + "'></div>";
                };
                // 任务连接线
                gantt.attachEvent("onBeforeLinkAdd", function() {
                    return false;
                });
                // 点击事件
                gantt.attachEvent("onTaskClick", function(id, e) {
                    // 添加任务
                    if (e.target.className == 'gantt_add') {
                        let em = e.target.parentNode.parentNode;
                        let tid = em.getAttribute("task_id");
                        let tObj = gantt.getTask(tid);
                        if (tObj.parent == 0) {
                            tid = tObj.tid;
                        }
                        console.log(tid,'Y(^o^)Y');
                        alert('给id为'+tid+'的列表添加任务');
                        return;
                    }
                    // 查看修改任务弹框
                    let tObj = gantt.getTask(id);
                    if (tObj.parent != 0) {
                        let em = e.target;
                        if (em.className.indexOf('iconfont') == -1) {
                            _this.taskId = id;
                            _this.taksCompileShow =!_this.taksCompileShow;
                            return;
                        }
                    }
                    // 折叠展开任务
                    if (e.target.className !='gantt_task_content' || tObj.parent == 0) {
                        if (tObj.$open) {
                            gantt.close(id);
                        }else {
                            gantt.open(id);
                        }
                    }
                    _this.projectStatusInit();
                });
                gantt.config.details_on_dblclick = false;
                // 拖动修改任务
                gantt.attachEvent("onAfterTaskDrag",function(id, mode, e) {
                    // mode:resize/progress/move
                    let taskObj = gantt.getTask(id);
                    let startTime = Date.parse(taskObj.start_date);
                    let endTime = Date.parse(taskObj.end_date) - 1000*60*60*24;
                    let progress = Math.floor(taskObj.progress*100);
                    if (mode == 'resize' || mode == 'move') {
                        _this.updTask(id,'date',{startTime,endTime});
                    }else if (mode == 'progress') {
                        _this.updTask(id,'progress',{timeLong: progress});
                    }

                });
                // 解决调整浏览器大小项目进度样式不生效问题
                window.onresize = () => {
                    setTimeout(() => {
                        this.projectStatusInit();
                    },500)
                }
                // 显示进度
                gantt.templates.task_text=function(start,end,task){
                    if (task.progress == undefined || task.parent == 0) {
                        return "";
                    }
                    return "<b>进度:</b> "+ Math.floor(task.progress*100) + "%";
                };
                // 当天标记
                var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
                var id = gantt.addMarker({
                    start_date: new Date(),
                    css: "today",
                    title:date_to_str(new Date())
                });
                setInterval(function(){
                    var today = gantt.getMarker(id);
                    today.start_date = new Date();
                    today.title = date_to_str(today.start_date);
                    gantt.updateMarker(id);
                }, 1000*60);

            },
            // 初始化
            ganntInit() {
                gantt.init("gantt_here");
                gantt.parse(this.tasks);
                this.projectStatusInit();
            },
            // 查看方式
            chageViewType(type) {
                if (type == 'month') {                      // 月
                    gantt.config.scale_unit = "month";
                    gantt.config.date_scale = "%m月";
                }else if(type == 'week'){                  // 周
                    gantt.config.scale_unit = "week";
                    gantt.config.date_scale = "%y年 第%W周";
                }else {                                 // 日
                    gantt.config.scale_unit = "day";
                    gantt.config.date_scale = "%m月 %d日";
                }
                this.viewType = type;
                this.ganntInit();
            },
            // 项目进行状态
            projectStatusInit() {
                let noStartedList = [];             // 未开始项目id
                let overdueList = [];               // 逾期项目id
                let onGoingList = [];
                let tasks = this.tasks.data;         // 所有项目
                // 未开始/逾期判断    noStarted/overdue/onGoing/complete
                let stateJudge = (item,state) => {
                    let currentDate = Date.parse(new Date());
                    // 未开始
                    if (state == 'noStarted') {
                        if (item.start_date - currentDate > 0) {
                            return true;
                        }
                    // 进行中
                    }else if (state == 'onGoing') {
                        if (item.start_date - currentDate < 0 && item.end_date - currentDate > 0 && item.state == 0) {
                            return true;
                        }
                    // 逾期
                    }else if (state == 'overdue'){
                        if (item.end_date - currentDate < 0 && item.state == 0) {
                            return true;
                        }
                    // 已经完成
                    }else if (state = 'complete') {
                        if (item.state == 1) {
                            return true;
                        }
                    }
                    return false;
                }
                for (let i=0; i<tasks.length; i++) {
                    // 未开始项目
                    if (stateJudge(tasks[i],"noStarted")) {
                        noStartedList.push(tasks[i].id);
                    }
                    // 逾期项目
                    if (stateJudge(tasks[i],"overdue")) {
                        overdueList.push(tasks[i].id);
                    }
                    // 进行中
                    if (stateJudge(tasks[i],"onGoing")) {
                        onGoingList.push(tasks[i].id);
                    }
                }
                let em = document.getElementsByClassName('gantt_task_content');
                for (let i=0; i<em.length; i++) {
                    let parentNode = em[i].parentNode;
                    // 未开始项目
                    if (noStartedList.length != 0) {
                        for (let j=0; j<noStartedList.length; j++) {
                            if (parentNode.getAttribute('task_id') == noStartedList[j]) {
                                parentNode.firstElementChild.classList.add('noStarted');
                            }
                        }
                    }
                    if (overdueList.length != 0) {
                        for (let j=0; j<overdueList.length; j++) {
                            if (parentNode.getAttribute('task_id') == overdueList[j]) {
                                parentNode.firstElementChild.classList.add('overdue');
                            }
                        }
                    }
                    if (onGoingList.length != 0) {
                        for (let j=0; j<onGoingList.length; j++) {
                            if (parentNode.getAttribute('task_id') == onGoingList[j]) {
                                parentNode.firstElementChild.classList.add('onGoing');
                            }
                        }
                    }
                }
                // 隐藏空列表的显示
                if(this.nullTask.length != 0) {
                    for (let i=0; i<this.nullTask.length; i++) {
                        let em = document.querySelector(".gantt_task_line[task_id =" + "'" + this.nullTask[i] +"'" +"]");
                        em.classList.add("hide")
                    }
                }
                // 列表样式设置
                if (this.taskList.length != 0) {
                    for (let i=0; i<this.taskList.length; i++) {
                        let em = document.querySelector(".gantt_task_line[task_id =" + "'" + this.taskList[i] +"'" +"]");
                        em.classList.add("project-list")
                    }
                }
            },
            // 数据处理
            dataFormat(taskGroup,taskList) {
                // 时间戳转时间Y-M-D
                let timestampToTime = (timestamp,state) => {
                    let date = new Date(timestamp);
                    if (state == 'end') {
                        date = new Date(timestamp + 1000*60*60*24);
                    }
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    let D = date.getDate();
                    return Y+M+D;
                }
                this.groupName = taskGroup.name;
                let tasks = [];
                for (let i=0; i<taskList.length; i++) {
                    let list = {};
                    list.id = taskList[i].id;
                    list.text = taskList[i].name + ' · ' + taskList[i].tasks.length;
                    list.open = true;
                    list.parent = 0;
                    list.tid = taskList[i].classid;
                    this.taskList.push(taskList[i].id);     // 所有列表id
                    if (taskList[i].tasks.length == 0) {
                        // taskList[i].type = gantt.config.types.project;
                        list.start_date = timestampToTime(Date.parse(new Date()));
                        list.end_date = timestampToTime(Date.parse(new Date()));
                        // 列表为空记录id
                        this.nullTask.push(taskList[i].id);
                    }
                    tasks.push(list);
                    for (let j=0; j<taskList[i].tasks.length; j++) {
                        taskList[i].tasks[j].text = taskList[i].tasks[j].name;
                        taskList[i].tasks[j].start_date = timestampToTime(taskList[i].tasks[j].start_time);
                        taskList[i].tasks[j].end_date = timestampToTime(taskList[i].tasks[j].end_time,'end');
                        taskList[i].tasks[j].progress = taskList[i].tasks[j].progress/100;
                        tasks.push(taskList[i].tasks[j]);
                    }
                }
                this.tasks.data = tasks;
                this.setDefaultConf();
                this.ganntInit();
            },
            // 更新任务
            updTask(id,type,data) {
                data.eid = this.eid;
                data.projectId = this.projectId;
                data.taskId = id;
                if (type == 'date') {
                    api.post('task/updTaskStartTime',data).then((res) => {
                        console.log(res,'Y(^o^)Y');
                        if (res.data.code === 200) {
                            this.$message("修改成功！");
                        }else {
                            this.$message(res.data.message);
                        }
                    });
                }else if (type == 'progress') {
                    api.post('task/updTaskTimeLong',data).then((res) => {
                        console.log(res,'Y(^o^)Y');
                        if (res.data.code === 200) {
                            this.$message("修改成功！");
                        }else {
                            this.$message(res.data.message);
                        }
                    });
                }
                this.projectStatusInit();
            },
            // 筛选数据
            dataFilter (proviso) {
                let tasks = [];
                let list = JSON.parse(JSON.stringify(this.data.taskList));
                console.log(list,'Y(^o^)Y');
                let getDate = (date) => {
                    let tmp = new Date(date);
                    let Y = tmp.getFullYear();
                    let M = tmp.getMonth();
                    return {Y,M}
                }
                for (let i=0; i<list.length; i++) {
                    if (list[i].tasks.length == 0) continue
                    for (let j=list[i].tasks.length-1; j>=0; j--) {
                        if (proviso.M) {
                            if (getDate(list[i].tasks[j].start_time).Y != proviso.Y && getDate(list[i].tasks[j].end_time).Y != proviso.Y) {
                                list[i].tasks.splice(j,1);
                            }
                            if (getDate(list[i].tasks[j].start_time).M != proviso.M && getDate(list[i].tasks[j].end_time).M != proviso.M) {
                                list[i].tasks.splice(j,1);
                            }
                        }else {
                            if (getDate(list[i].tasks[j].start_time).Y != proviso.Y && getDate(list[i].tasks[j].end_time).Y == proviso.Y) {
                                list[i].tasks.splice(j,1);
                            }
                        }
                    }
                }
                console.log(list,'Y(^o^)Y');
                this.dataFormat(this.data.taskGroup,list);
            },
            // 更改时间
            selectDate() {
                let Y = this.date.getFullYear();
                if (this.viewType == 'day') {
                    let M = this.date.getMonth();
                    this.dataFilter({Y,M});
                }else {
                    this.dataFilter({Y});
                }
            },
            // 第二次打开数据重复临时解决方案
            refresh() {
                let state = sessionStorage.getItem("reload");
                if (state == 'true') {
                    location.reload();
                }
                sessionStorage.setItem("reload",false);
            }
        }
	}
</script>

<style scoped>
    /* bar */
    .bar {
        display: flex;
        justify-content: space-between;
        line-height: 26px;
    }
    .bar .options {
        line-height: 26px;
    }
    /* 时间选项 */
    .options .date-option {
        background-color: #e9e7e7;
        display: inline-block;
        height: 26px;
        border-radius: 13px;
        overflow: hidden;
        margin-left: 35px;
    }
    .date-option span {
        text-align: center;
        width: 50px;
        cursor: pointer;
        box-sizing: border-box;
        float: left;
    }
    .date-option span:nth-child(2) {
        box-sizing: border-box;
        border-right: 1px solid #fff;
        border-left: 1px solid #fff;
    }
    .date-option span.active {
        background-color: #0a7ee9;
        color: #fff;
    }
    /* 日期 */
    .bar .date {
        font-size: 16px;
        cursor: pointer;
    }
    /* 示例 */
    .bar .example {
        height: 26px;
        line-height: 26px;
        display: flex;
        align-items: center;
    }
    .example .item {
        margin-right: 30px;
        vertical-align: middle;
    }
    .item span {
        float: left;
        line-height: 16px;
    }
    .example .item .icon {
        display: inline-block;
        width: 20px;
        height: 14px;
        border-radius: 2px;
        margin-right: 3px;
    }
    .example .item:nth-child(1) .icon {
        background-color: #e7e7e7;
        border: 1px solid #c6c6c6;
    }
    .example .item:nth-child(2) .icon {
        background-color: #9cc9f2;
        border: 1px solid #639ed4;
    }
    .example .item:nth-child(3) .icon {
        background-color: #a9dbce;
        border: 1px solid #69baa7;
    }
    .example .item:nth-child(4) .icon {
        background-color: #ffc6cd;
        border: 1px solid #f396a1;
    }
    .example .date {
        font-size: 16px;
        line-height: 16px;
    }
</style>
<style>
    /* 折叠 */
    .gantt_tree_icon.iconfont {
        cursor: pointer;
    }
    /* 日期背景 */
    .gantt_scale_line {
        background-color: #077ce7;
        border-top: 1px solid #077ce7;
    }
    .gantt_task .gantt_task_scale .gantt_scale_cell {
        color: #ffffff;
        border-right: 1px solid #0a7ee9;
    }
    /* 进度背景 */
    .gantt_task_progress_wrapper {
        background-color: #a9dbce;
    }
    /* 未开始 */
    .gantt_task_progress_wrapper.noStarted {
        background-color: #e7e7e7;
    }
    /* 进行中 */
    .gantt_task_progress_wrapper.onGoing {
        background-color: #9cc9f2;
    }
    /* 逾期 */
    .gantt_task_progress_wrapper.overdue {
        background-color: #ffc6cd;;
    }
    /* 左侧列表标题 */
    div.gantt_grid_head_cell.gantt_grid_head_text {
        text-align: left;
        padding-left: 20px;
        font-size: 14px;
        color: #333333;
    }
    [aria-level= '0'] .gantt_tree_content {
        font-weight: bold;
    }
    .gantt_row .gantt_add {
        display: none;
    }
    [aria-level= '0'] .gantt_add {
        /*display: block;*/
       display: none;

    }
    .gantt_row {
        cursor: pointer;
    }
    .gantt_tree_icon.gantt_blank {
        width: 28px;
    }
    /* 边框 */
    .gantt_task_row, .gantt_row {
        border: none;
    }
    .gantt_task_cell {
        border-right: 1px solid #dfdfdf;
    }
    .gantt_task_line {
        border: none;
    }
    .gantt_grid_head_cell.gantt_grid_head_add {
        /* background: none; */
        display: none;
    }
    /* 日期选择 */
    .bar .date input {
        text-align: center;
        border: none;
        width: 200px;
        font-size: 14px;
        cursor: pointer;
    }
    .bar .date i::before {
        content: ''
    }
    /* 任务列表 */
    .gantt_task_line.project-list {
        height: 10px!important;
    }
    .project-list .gantt_task_progress_wrapper {
        background-color: #0a7ee9;
        position: relative;
    }
    .project-list::before,.project-list::after {
        content: '';
        width: 0px;
        height: 0px;
        position: absolute;
        border-top: 10px solid #0a7ee9;
        top: 9px;
    }
    .project-list::before {
        border-right: 6px solid transparent;
    }
    .project-list::after {
        border-left: 6px solid transparent;
        right: 0;
    }
    .gantt_task_content {
        line-height: 18px;
    }
    .gantt_task_row:hover {
        /* background-color: rgba(0,0,0,0.1)!important; */
    }
    .hide {
        display: none;
    }
</style>
