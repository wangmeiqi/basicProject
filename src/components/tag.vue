<template>
    <el-dialog title="标签" :visible.sync="tagShow" width="840px" center top="10vh">
        <div class="tagInfo">
            <div class="tag_left">
                <p @click="addNewTag" class="tag_btn_bottom">
                    <img src="../assets/images/添加1.png">
                    <span>新标签</span>
                </p>
                <ul>
                    <li class="tag_left_name" v-for="(item,index) in tagContent" :key="index" @click="hasClickTagDetail(item,index)">
                        <span class="tagcolor_i" :style="{'background-color':item.bq_color}"></span>
                        <span :class="{'blue_active':chooseTagId==item.id}">{{item.name}}</span>
                        <img src="../assets/images/checkcc.png" class="checkccImg" @click.stop="hasClicktagMenu($event, item)">
                    </li>
                </ul>
            </div>
            <!-- 点击标签弹窗开始 -->
            <div class="projectHeaderFloat"  v-show="addTagFloat" :style="{top: tagTop + 'px'}">
                <header class="addNewHeader">
                    <i @click="addTagType='menuTag'" v-show="addTagType=='editTag'||addTagType=='deleteTag'" class="iconfont arrow_right">&#xe8a2;</i>
                    <span>{{addTageTitle}}</span>
                    <img src="../assets/images/差号.png" @click="addTagFloat=false">
                </header>
                <!-- 弹窗类型：标签菜单 -->
                <div v-show="addTagType=='menuTag'" class="popover-content-menu">
                    <ul>
                        <li v-for="(item,index) in tagMenuList" :key="index" @click="tagMenuChoose(item,index)">
                            <i v-show="index==0" class="iconfont">&#xe623;</i>
                            <i v-show="index==1" class="iconfont">&#xe619;</i>
                            <i v-show="index==2" class="iconfont">&#xe600;</i>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 弹窗类型：新增、编辑标签 -->
                <div v-if="addTagType=='addTag'||addTagType=='editTag'" class="popover-content">
                    <input type="text" v-model="addTagName" placeholder="标签名称">
                    <ul>
                        <li v-for="item in colorLight" :class="item.classname" @click="select(item)">
                            <img v-if='hasChooseId==item.id?true:false' src="../assets/images/打勾1.png">
                        </li>
                    </ul>
                    <el-row class="addNewBtn">
                        <el-button @click="creatNewTag" v-show="addTagName!=''" type="primary">创建</el-button>
                        <el-button v-show="addTagName==''" type="info">创建</el-button>                
                    </el-row>
                </div>
                <!-- 弹窗类型：删除标签 -->
                <div v-if="addTagType=='deleteTag'" class="popover-content-delete">
                    <p>确认删除标签？</p>
                    <el-row class="addNewBtn deleteBtn">
                        <el-button @click="creatNewTag" type="warning">删除</el-button>
                    </el-row>
                </div>
            </div>
            <!-- 点击标签弹窗结束 -->
            <div class="tag_right">
                <div v-if="tagContent.length>0">
                    <p class="tag_right_1 tag_btn_bottom">
                        <span class="tagcolor_i tag_btn_bottom" :style="{'background-color':chooseTagDetail.bq_color}"></span>
                        <span class="tagcolor_name">{{chooseTagDetail.name}}</span>
                        <span>{{chooseTagDetail.countTask}}项任务，0个日程，0篇分享，0个文件</span>
                    </p>
                    <div v-show="chooseTagDetail.countTask>0" class="tag_right_detail">
                        <p>任务·{{chooseTagDetail.countTask}}</p>
                        <ul>
                            <li class="task" v-for="(item,index) in chooseTagDetail.taskList" :key="index" @click="openTaskEdit(item.id)">
                                <a style="font-size: 16px;margin-right:15px;">
                                    <span @click.stop="changeSatus(item,index)">
                                        <i v-if="item.state === 0" class="iconfont icon-xuanzekuang"></i>
                                        <i v-if="item.state === 1" class="iconfont icon-duoxuankuang2"></i>
                                    </span> 
                                </a>
                                <div class="task-content-set">
                                    <!--<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACL0lEQVRIS7VWsXXbMBC96wQ1kTfwBrEniD1BwpKHwsoESTbQCMkEkQuCJZUJLE9gbRBlgjiNqEqX9/lAPRAEGaoISuhw/+7/+0cx/efDU/JXVbWo6/ptGCsiz1PejgKUZXmnqp+I6MNAsg0zf8vzfDsElgTwFVdEdDelSiLaGmOyLMte4/geQFEUN0T0xMyLRPKWFsS8iX7fq2pmrd2F9x2AsiyvT6fTSyL5ozHmc1ihp28TAe2NMbdhXAfAOQcu30WVPYtIkqqiKJbM/D2K34rIfXt3BnDOQUjwHp8vIvJ1SAvnnPZ4Z75vhT8DFEWBiXg/FpwCcc6B884IE9GjiCwR3wD4qfmdSsBBNVMBVPXVWnt1BvCCPQ3QcDFFTWJfWNPBCP+kqjtr7W0KfEDkJnQygE/c68LT+kJE12PUNh38g6Lmvap+tNaufTz8UjEzDJc8nQ7GRFbVX8y8hz9AFzNjHWBH4R5ujx0NwD8i0myC0AcdkyEBEa1QNRyuqj8xfr7cB1Q4m812dV1jHFchkKr+sNY2CzL0QejK8xy3/Tvn1swMirBz1qG7PQMw40MocAfATxO6WIhIj1vfxY2naJ/nOWjrHL9qKATvLTtVXbUuHBIwdY8uDofDej6fLweXHR5iXTPz0hizSu33seRes+F13T72dEC4jYhgJQ8emA1fvLjy9sHoJ9M7vF3VMFXLO8wFna4g/MWfzLhc8Hs8HjvCY0SnUDjpX8UlYsexfwF0YywopNUjSAAAAABJRU5ErkJggg==" class="tag_img" v-if="!item.user.user_img">-->
                                    <div v-if="item.user.user_img==''&&item.user.username!=''" class="img">{{item.username.substring(0,1)}}</div>
                                    <div v-if="item.user.user_img==''&&item.user.username==''" class="img" style="background: #ccc;"><span style="background: #ccc;"><i class="iconfont icon-wode"></i></span></div>
                                    <img v-if="item.user.user_img!=''" :src="item.user.user_img" class="tag_img" v-else>
                                    <div class="task-content-wrapper">
                                    	<div class="task-content">
                                    		{{item.name}}
                                    		<span style="color:#A8A8A8;margin:0 10px 0 10px;">任务</span>
                                    		<span v-for="value in item.map.lableList" :style="{'background-color':value.bq_color}" class="tag_right_labelist">{{value.name}}</span>
                                			<span class="tag_right_btn_child" v-if="item.pid!=0">属于任务：{{item.map.countName}}</span>
                                    	</div>
                                    	<div class="tag_right_btn">
		                                    <el-row>
		                                        <el-button v-show="!item.deadLine" type="warning"><i class="iconfont" style="margin-right:5px;">&#xe621;</i>{{item.endTime}}</el-button>
		                                        <el-button v-show="item.deadLine" type="info"><i class="iconfont" style="margin-right:5px">&#xe621;</i>{{item.endTime}}</el-button> 
		                                    </el-row>
		                                </div>
		                              
                                    </div>
								</div>
                                
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else class="noTag">
                    <h2>项目中还没有标签</h2>
                    <p>
                         你可以通过“新标签”按钮来创建标签。此后，就可以在在这里按照标签来查看项目内容了。
                    </p>
                </div>
                <div>
                </div>
            </div>
        </div>
        <task-edit @close="closeTask" v-if="taskEditFlag" :taskId="taskEditId"></task-edit>
    </el-dialog>
</template>

<script>
import API from 'api/http'
import taskEdit from './taskEdit/taskEdit'
export default {
    props:{
        show:{
            type: Boolean,
            default: true
        }
    },
    components: {
        taskEdit
    },
    computed: {
        projectId () {
            return sessionStorage.getItem('projectId')
        }
    },
    data() {
        return {
            tagShow: false,
            //所有标签内容
            tagContent:'',
            //添加/编辑新标签弹窗开关
            addTagFloat:false,
            //添加/编辑新标签标题
            addTageTitle:'',
            addTagType:'',
            addTagColor:'#69B6FD',
            //点击展开标签菜单
            tagMenuShow:false,
            //标签颜色选择
            colorLight:[
                {id:1,classname:'btncolor1',color:'#69B6FD'},
                {id:2,classname:'btncolor2',color:'#C3F182'},
                {id:3,classname:'btncolor3',color:'#87D9F1'},
                {id:4,classname:'btncolor4',color:'#8D9FEE'},
                {id:5,classname:'btncolor5',color:'#FDCD89'},
                {id:6,classname:'btncolor6',color:'#F9978A'},
                {id:7,classname:'btncolor7',color:'#F94F4F'}
            ],
            //标签菜单数据
            tagMenuList:[
                {id:1,name:'编辑标签'},
                {id:2,name:'归档标签'},
                {id:3,name:'删除标签'}
            ],
            //标签颜色选择id
            hasChooseId:1,
            //添加的新标签名称model
            addTagName:'',
            //选中标签详情
            chooseTagDetail:{
                name:'',
                bq_color:'',
                countTask:0,
                taskList:[]
            },
            //选中标签ID
            chooseTagId:'',
            tagTop:40,
            //任务不可点击
            taskNotState: 0,
            taskNotclick:true,
            fileId: '',
            taskEditFlag: false,
            taskEditId: 0,
        }
    },
    methods: {
        //改变复选框的状态
        changeSatus(item,index){
            let code;
            item.state==1?code=0:code=1;
            let self = this;
            API.get('/tasks/getTaskPid', {
                taskId: item.id
            }).then(res => {
                if(res.data.data){
                    API.get('task/getTaskContent', {
                        tid: item.id,
                        stateChange:code
                    }).then(res => {
                        if(res.data.code==200){
                            this.getTaskByLable(this.chooseTagId);
                            this.taskNotclick = false;
                            // self.chooseTagDetail.taskList[index].state = self.chooseTagDetail.taskList[index].state == 1?0:1;
                            // self.chooseTagDetail.taskList[index].endTime = self.chooseTagDetail.taskList[index].state == 1?self.chooseTagDetail.taskList[index].endTime:'今天 完成';
                        }
                    })
                }else{
                    this.taskNotclick = false;
                }
            })
            
        },
        //点击添加新标签
        addNewTag(){
            this.addTagFloat = true;
            this.addTageTitle = '新建标签';
            this.addTagType = 'addTag';
            this.addTagName = '';
            this.hasChooseId = 1;
            this.tagTop = 40;
        },
        //弹窗选中标签详情
        select(item){
           this.hasChooseId = item.id;
           this.addTagColor = item.color;
        },
        //创建新目标
        creatNewTag(){
            this.addTagFloat = false;
            let url='',params={},type=1;
            if(this.addTagType=='addTag'){
                url = '/task/getRepeatLableName';
                params={
                    pid:this.projectId,
                    name: this.addTagName
                };
                this.getTagType(url,params,type);
            }else if(this.addTagType=='editTag'){
                url = '/task/getRepeatLableName';
                params={
                    pid:this.projectId,
                    name: this.addTagName
                };
                this.getTagType(url,params,type);

            }else if(this.addTagType=='deleteTag'){
                type=2;
                url = '/task/delLableTable';
                params={
                    id:this.chooseTagId
                };
                this.getTagType(url,params,type);
            }
        },
        //左侧选中标签
        hasClickTagDetail(item,index){
            this.chooseTagId = item.id;
            this.addTagName = item.name;
            this.chooseTagDetail.name = item.name;
            this.chooseTagDetail.bq_color = item.bq_color;
            this.getTaskByLable(this.chooseTagId);
        },
        getTaskByLable(id){
            //调选中任务查询接口
            API.get('/task/getTaskByLable', {lableId:id}).then(res => {
                console.log(res)
                if(res.data.data){
                    this.chooseTagDetail.countTask = res.data.data.countTask;
                    this.chooseTagDetail.taskList = res.data.data.taskList;
                    this.chooseTagDetail.taskList.map(function(item){
                        let myDate = +new Date();
                        //时间戳转化为日期
                        let date = new Date(item.endTime);
                        let Y = date.getFullYear() + '年';
                        let M = (date.getMonth()+1 < 10 ? (date.getMonth()+1) : date.getMonth()+1) + '月';
                        let D = date.getDate() + '日';
                        item.endTime = Y+M+D;
                        if(myDate>item.endTime){
                            item['deadLine'] = false;
                        }else{
                            item['deadLine'] = true;
                        }
                    })
                }
            })
        },
        //点击标签右侧三角箭头
        hasClicktagMenu(e,item){
            this.addTagFloat = true;
            this.addTageTitle = '标签菜单';
            this.addTagType = 'menuTag';
       
            var offsetTop=e.currentTarget.parentNode.offsetTop;
            var sTop=e.currentTarget.parentNode.parentNode.scrollTop;
            var sTopVal;

            if(sTop>0){    
               sTopVal=Number(offsetTop)- Number(sTop);
               if(sTopVal>300){
                 sTopVal=Number(sTopVal)-150;
               }else{
                 sTopVal=Number(sTopVal)+90;
               }
               
            }else{
               if(offsetTop>300){
                sTopVal=Number(offsetTop)-150;
               }else{
                sTopVal=Number(offsetTop)+90;
               }
               
            }
           
            this.tagTop=sTopVal;
            this.fileId = item.id
        },
        //编辑、归档、删除
        tagMenuChoose(item,index){
            switch(index){
                case 0:
                    this.tagMenuShow = false;
                    this.addTagFloat = true;
                    this.addTageTitle = '编辑标签';
                    this.addTagType = 'editTag';
                    this.hasChooseId = 1;
                    break;
                case 1:
                    //调归档接口
                    this.tagMenuShow = false;
                    let url = 'tasks/updLableSta'
                    let params = {
                        lableId: this.fileId,
                        type: 1
                    }
                    let type = 2
                    this.getTagType(url, params, type);
                    this.addTagFloat = false
                    break;
                case 2:
                    this.tagMenuShow = false;
                    this.addTagFloat = true;
                    this.addTagType = 'deleteTag';
                    this.addTageTitle = '删除标签';
                    break;
            }
        },
        //新建、编辑、归档、删除接口调用
        getTagType(url,parmas,type){
            var self = this;
            if(type==1){
                API.get(url, parmas).then(res => {
                    if(res.data.data){
                        parmas.bq_color = self.addTagColor;
                        if(self.addTagType=='addTag'){
                            url = '/task/addLable';
                            parmas.fid = 3;
                        }else if(self.addTagType=='editTag'){
                            url = '/task/updLable';
                            parmas.id = self.chooseTagId;
                        }
                        API.post(url,parmas).then(res => {
                            if(res.data.code==200){
                                //成功调获取当前项目所有标签方法
                                self.getAllTagContent();
                            }
                        })
                    }else{
                        this.$notify.error({
                            title: '失败',
                            message: '标签名称已存在'
                        });
                    }
                })
            }else{
                API.post(url, parmas).then(res => {
                    if(res.data.code==200){
                        self.getAllTagContent();
                    }
                })
            }
        },
        //调获取当前项目所有标签
        getAllTagContent(){
            API.get('/tasks/getLableByProId', {
                projectId: this.projectId
            }).then(res => {
                if(res.data.data){
                    this.tagContent = res.data.data;
                    if(this.tagContent.length>0){
                        this.chooseTagId = this.tagContent[0].id;
                        this.chooseTagDetail.name = this.tagContent[0].name;
                        this.chooseTagDetail.bq_color = this.tagContent[0].bq_color;
                        this.getTaskByLable(this.chooseTagId);
                    }
                }
            })
        },
        closeTask () {
            this.taskEditFlag = false
        },
        openTaskEdit (id) {
            this.taskEditId = id
            this.taskEditFlag = true
        }
    },
    watch:{
        show () {
            this.tagShow = true
            this.getAllTagContent()
        }
    }
    
};
</script>

<style scoped>
    .icon-checkbox{
        font-size: 19px;
        cursor: pointer;
    }
    .el-button--warning{
        background-color:#EF5520;
    }
    .tagInfo{
        position: relative;
        overflow-x: hidden;
        display: flex;
        border-top:1px solid #efefef;
        height: 70vh;
    }
    .noTag{
        text-align: center;
        margin: 19% auto;
        width: 94%;
    }
    .noTag h2{
        margin-bottom: 20px;
    }
    .tag_left{
        width: 30%;
        position: relative;
    }
    .tag_left,.tag_right{
        padding-top: 10px;
    }
    .tag_left ul,.tag_right_detail{
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .tag_right_detail .tag_img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        -webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
		margin-right: 12px;
    }
    ::-webkit-scrollbar{
        width: 10px;
        background-color: #f0f0f0;
    }
    ::-webkit-scrollbar-thumb{
        background-color: #C1C1C1;
        border-radius: 4px;
    }
    .tag_left p{
        cursor: pointer;
        padding: 3px 0 14px 20px;
    }
    .tag_btn_bottom{
        border-bottom: 1px solid #efefef;
    }
    .tag_left p span{
        display: inline-block;
        position: relative;
        top: 2px;
        margin-left: 6px;
        color: #077CE7;
        font-weight: bold;
    }
    .tag_left li{
        padding-left: 25px;
    }
    .tag_left_name{
        padding:12px 0;
        position: relative;
    }
    .checkccImg{
        position: absolute;
        top:14px;
        right:13px;
        display: none;
    }
    .tag_left_name:hover{
        background-color: #f9f6f6;
        cursor: pointer;
    }
    .tag_left_name:hover .checkccImg{
        display:inline-block;
    }
    .blue_active{
        color:#69B6FD;
    }
    .popover-content-menu li{
        padding:8px 0;
        line-height: 30px;
        cursor: pointer;
    }
    .popover-content-menu li:hover {
        background-color: #f7f7f7;
        color: #077CE7;
    }
    .popover-content-menu li span{
        margin-left:10px;
    }
    .tagcolor_i{
        display: inline-block;
        margin: 5px 12px 0 0;
        float: left;
        width: 12px;
        height: 12px;
        border-radius: 6px;
        transition: all 0.2s ease;
    }
    .tagcolor_name{
        margin-right: 24px;
    }
    .tag_right{
        width: 70%;
        border-left:1px solid #efefef;
        position: relative;
        flex: 1 1;
        min-width: 0;
    }
    .tag_right_labelist{
    	    border-radius: 35px;
	    vertical-align: middle;
	    padding: 3px 6px;
        margin-left: 5px;
        max-width: 200px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
        display: inline-block;
        font-size: 11px;
        line-height: 14px;
    }
    .tag_right_1{
        padding: 4px 0px 13px 12px;
    }
    .tag_right label{
        margin-right: 20px;
    }
    .tag_right_detail p{
        padding: 10px 11px 14px 0px;
        border-bottom: 2px solid #efefef;
        margin:0 20px 0 18px;
    }
    .tag_right_detail li{
        padding: 14px 0 14px 20px;
        position: relative;
    }
    .tag_right_detail ul{
        margin-top:16px;
    }
    .tag_right_detail li:hover{
        background-color: #EEEEEE
    }
    .tag_right_btn{
           height: 22px;
	    line-height: 22px;
	    margin-left: 16px;
	    padding-top: 0;
	    padding-bottom: 0;
	    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    -webkit-align-self: center;
    -ms-flex-item-align: center;
    align-self: center;
    }
    .tag_right_btn_child{
      padding: 3px 6px;
      display: inline-block;
    }

    .tag_right_btn .el-button{
        padding:6px 6px;
        line-height:0.8;
        width: 135px;
    	text-align: center;
    }


    .projectHeaderFloat {
        top: 25px;
        left: 20px;
        padding: 20px 15px;
        position: absolute;
        width: 275px;
        z-index: 9999;
        background: #ffffff;
        -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .1);
    }
    .addNewHeader{
        position: relative;
    }
    .arrow_right{
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
    }
    .addNewHeader img{
        position: absolute;
        top: 2px;
        right: 1px;
    }
    .popover-content-delete p{
        padding: 22px 0 22px 5px;
    }
    .projectHeaderFloat header{
        text-align: center;
        padding-bottom: 6px;
        border-bottom: 1px solid #EFEFEF;
    }
    .popover-content{
        margin:10px 0 15px 0;
    }
    
    .popover-content input{
        width: 90%;
        height: 34px;
        margin: 12px 0;
        border: 1px solid #CECECE;
        padding-left: 10px;
    }
    
    .popover-content ul li{
        display: block;
        float: left;
        margin: 0 13px 0 0;
        cursor: pointer;
        width: 25px;
        height: 25px;
        border-radius: 12px;
        transition: all 0.2s ease;
    }
    .popover-content ul{
        padding: 14px 0;
        height: 26px;
    }
    .addNewBtn button{
        width: 94%;
    }
    .deleteBtn button{
        background-color:#EF5520;
        border-radius: 5px;
    }
    .el-button+.el-button{
        margin-left: 0;
        background-color:#D9D9D9;
        border-color: #d9d9d9;
    }
    .el-button+.el-button:hover{
        background-color:#D9D9D9;
        border-color: #d9d9d9;
    }

    .popover-content ul li:hover{
        transform: scale(1.2);
    }
    .popover-content img{
        width: 26px;
        height: 26px;
        position: relative;
        top: -1px;
        right: 0px;
    }

    .btncolor1{
        background: #69B6FD;
    }
    .btncolor2{
        background: #C3F182;
    }
    .btncolor3{
        background: #87D9F1;
    }
    .btncolor4{
        background: #8D9FEE;
    }
    .btncolor5{
        background: #FDCD89;
    }
    .btncolor6{
        background: #F9978A;
    }
    .btncolor7{
        background: #F94F4F;
    }
    .nameStyle{
    	display: inline-block;
    	width: 300px;
    	height: 18px;
    	overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		vertical-align: text-bottom;
    }
    .task {
	    position: relative;
	    white-space: normal;
        display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-flex-direction: row;
	    -ms-flex-direction: row;
	    flex-direction: row;
	    -webkit-align-items: flex-start;
	    -ms-flex-align: start;
	    align-items: flex-start;
	    line-height: 20px;
}
.task .task-content-set, .task .task-content-set .task-content-wrapper {
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
        box-sizing: border-box;
}
.task .task-content-set .task-content-wrapper {
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
}
.task .task-content-set .task-content-wrapper .task-content {
    word-wrap: break-word;
    overflow: hidden;
    margin: 2px 6px 0 0;
    flex: 1 1 auto;
    box-sizing: border-box;
}
.img {
    width: 24px;
    height: 24px;
    border-radius: 30px;
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
    margin-right: 5px;
}
</style>
