<template>
    <div>
      <div class="tabBox">
        <el-tabs v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="评论" name="second">
            <li v-for="(li , index) in components" class="dispaly"   @mouseover="li.deteItem =true" @mouseleave="li.deteItem = false"
                style="margin-top: 30px;position: relative">
              <div class="dispaly" >
                <img class="componentImg" :src="li.user.user_img" alt="">
              </div>
              <div class="componentName">
                <div class="ft18 " style="display: flex;align-items: center">
                  <div>
                    {{li.user.username}}
                  </div>
                  <div class="ft12 componentCreate"  >
                    <div style="color: #999999;font-size: 12px; margin-left: 20px">
                      {{li._id.time}}
                    </div>
                  </div>
                </div>
                <div class="ft12">{{li.content}}</div>

              </div>
              <div style="cursor:pointer;position: absolute;right: 0"   @click="deleteLi(li,index)">
                删除
              </div>
            </li>
            <div class="pushComponent">
              <div class="pushComponentbox">
                <div >
                  <input class="pushInput" v-model="inputCom"  @keyup.enter="addComponent" placeholder="@提及他人,按Enter快速发布">
                </div>
                <div class="pushBox">
                  <div style="margin-left: 10px;">
                    <i style="font-size: 20px;color: #e5e5e5" class="iconfont icon-xiaolian-line"></i>
                  </div>
                  <div style="position: absolute; display: flex;right: 30px;top: 13px;align-items: center">
                    <p style="margin-right: 15px;font-size: 12px;color: #c7c7c7"></p>
                    <div style="height: 30px;width: 70px;background: #0a7ee9; border-radius: 4px;display: flex">
                      <div class="fabu" @click="addComponent" style="cursor: pointer;">
                        发布
                      </div>
                      <div style="width: 1px;height: 30px;background:#ffffff;"></div>
                      <div style="width: 27px;justify-content:center;align-items: center; display: flex">
                        <i style="color: white" class="iconfont icon-xiala"> </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>    <!-- 评论-->
          <el-tab-pane label="进度汇报" name="first" >     <!-- 进度汇报-->
            <div>
              <div>
                <div class="addReport"  @click="showaddReporttwo" v-show="addReport">
                  <i class="iconfont icon-add"></i>
                  <p>添加进度汇报</p>
                </div>
                <div class="addReporttwo" v-show="addReporttwo">
                  <div>
                    <!--<i class="iconfont icon-add"></i>-->
                    <div style="display: inline-block;width: 200px;">
                    	 <el-date-picker v-model="value1" type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    	 	
                    	 </el-date-picker>
                    </div>
                    
                    <input class="addinput" type="text" v-model="report" placeholder="输入进度汇报" maxlength="60" minlength="15">
                  </div>
                  <div  style="margin-top:15px;margin-left:500px;display: flex;align-items: center">
                    <p style="display: flex;align-items:center;cursor: pointer;width: 68px;height: 35px" @click="addReport =true ,addReporttwo=false,report='' ">取消</p>
                    <div @click="pushReport" class="button">
                      		保存
                    </div>
                  </div>
                </div>
              </div>
              <div v-for="(report , index) in reports "  @mouseover="report.ic_Guan = true"  @click="reportClick(report)" @mouseleave="report.ic_Guan = false" >
                <div class="report"  v-show="!report.showReport">
                  <div>
                    <span>
                      {{report.showTime}}
                    </span>
                    <!--<span style="margin-left: 5px;">
                      {{report.week}}
                    </span>-->
                  </div>
                  <el-tooltip class="item" effect="dark" content="点击修改进度汇报" placement="top"  >
                    <span style="width: 556px " class="deleteReportBox">
                      <!--<div style="margin-left: 15px">
                        {{report.newTime}}
                      </div>-->
                      <span class="contents" style="width:360px;margin-left: 30px;cursor: pointer" @click="showReportShow(report)">
                        {{report.content}}
                      </span>
                    </span>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="点击删除" placement="top"  >
                    <span class="ic_Guan"  @click="deleteReport(report,index)" v-show="report.ic_Guan">
                      <i class="iconfont icon-guanbi" ></i>
                    </span>
                  </el-tooltip>
                  <span style="position: absolute; right: 114px;top: 4px;">
                    {{report.user.username}}
                  </span>
                </div>
                <div class="showReport" v-show="report.showReport">
                  <div class="showReportOne">
                  	<div style="display: inline-block;width: 200px;">
                    	 <el-date-picker v-model="report.showTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择修改日期时间"></el-date-picker>
                    </div>
                    <!--<div style="margin-left: 15px">
                    	
                      {{report.newTime}}
                    </div>-->
                    <div style="margin-left: 10px">
                      <input type="text" class="taskInput" v-model="report.content"  placeholder="请填写要修改的汇报内容" >
                    </div>
                    <div style="margin-left: 10px">
                      {{report.user.username}}
                    </div>
                  </div>
                  <div class="showReportTwo">
                    <div style="margin-right: 30px;white-space: nowrap;cursor: pointer" @click="closeButton(report)">
                     	 取消
                    </div>
                    <div class="reportButton" @click="handleButton(report)" style="cursor: pointer;">
                      	保存
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="日志动态" name="third">
            <div class="dynamic">
              <div v-for="(dynamic ,index) in dynamicList" style="display: flex" class="dynamicList">
                <div style="display: flex;align-items: center;">
                  <div style="width: 160px;">
                    {{dynamic.createTime}}
                  </div>
                  <div style="margin-left: 5px">
                    {{dynamic.week}}
                  </div>
                </div>
                <div  class="dynamicContent">
                  <div style=" width: 35px;font-weight: bold;color: #333333">
                    {{dynamic.newTime}}
                  </div>
                  <div style="margin-left: 15px">
                    <img  :src="dynamic.user.user_img" alt="">
                  </div>
                  <div style="margin-left: 10px;color: #333333">
                    {{dynamic.user.username}}
                  </div>
                  <div style="margin-left: 10px;color: #333333">
                    {{dynamic.operation}}
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from '../../api/http'
  import headerUrl from 'assets/images/chengyuan.png'
  import TIME from 'api/time'


  export default {
        props:["components","taksCompile","elementId"],  // 接受返回内容  用户头像 用户名字
        name: "task-associated-tab",
        data(){
          return{
            deleteItem:false,
            value1:'',//进度汇报时间选择
            inputCom:'',//添加内容输入框
            activeName: 'second',
            addReport:true,
            addReporttwo:false,
            report:'',//添加内容汇报输入框
            reports:[
              {
                showReport:false,
                content:'添加一个评论',
                createTime:'1月8号',
                week:'星期4',
                newTime:'19：20',
                user:{
                  username:'xuran'
                }
              }
            ],//进度汇报数组
            reportId:'',//
            dynamicList:[],//日志动态
          }
        },
        methods:{
          //点击显示与隐藏
          showReportShow(report){
            if(report.user.id == sessionStorage.getItem('userId')){
              this.reports.map(el=>{
                el.showReport = false
                report.showReport =true
              })
            }else{
              this.$notify({
                title: '警告',
                message: '不可以修改其他人的进度汇报',
                type: 'warning'
              })
            }
          },

          //删除评论
          deleteLi(li,index){
            let userId = sessionStorage.getItem('userId')
            if (li.user.id == userId ){
              let data={
                commentId:li.coid
              }
              api.post('/task/delComment',data).then(res=>{
                this.components.splice(index, 1)
                this.$notify({
                  title: '成功',
                  message: '删除评论成功',
                  type: 'success'
                });
              })
            }else {
              this.$notify({
                title: '警告',
                message: '不可以删除其他人的评论',
                type: 'warning'
              });
            }

          },

          //添加评论
          addComponent(){
            let data={
                taskId: this.elementId,
                content:this.inputCom,
              }
            let component ={}
              for (let i in this.components[0]) {
                if (i == 'content') {
                  component[i] = this.inputCom
                } else {
                  component[i] = this.components[0][i]
                }
              }
            if (this.inputCom.trim() !== ''){
              api.post('/task/addComment',data).then(res=>{
                if (res.data.code == 200 ){
                  let params = {
                    id:this.elementId
                  }
                  api.get('/task/getOneTask', params).then(res=>{
                    this.components = res.data.data.commentList
                    this.components.map(el=>{
                      if(el.user.user_img == ''){
                        el.user.user_img =headerUrl
                      }
                    })
                  })
                  this.$notify({
                    title: '成功',
                    message: '添加评论成功',
                    type: 'success'
                  });
                }
              })
              this.inputCom=''
            }else if (this.inputCom.trim() == ''){
              this.$notify({
                title: '警告',
                message: '评论内容不可为空',
                type: 'warning'
              })
            }
          },

          //点击添加汇报 现实盒子
          showaddReporttwo(){
            this.addReport= !this.addReport
            this.addReporttwo= !this.addReporttwo
          },

          //添加汇报内容
          pushReport(){
          	let now = new Date()
          	let data ={
              tid:this.elementId,
              content:this.report,
              showTime:this.value1.trim() == ''? now.getFullYear() + '-' + TIME.doubleStr(now.getMonth()+1) + '-' + TIME.doubleStr(now.getDate()) + ' ' + TIME.doubleStr(now.getHours()) + ':' + TIME.doubleStr(now.getUTCMinutes()) + ':' + TIME.doubleStr(now.getSeconds()) : this.value1,
              pid:2,
              eid:1,
           }
            
            if (this.report.trim() !=''){
            	if(this.report.trim().length<15){
            		  this.$notify({
		                title: '警告',
		                message: '汇报内容不能小与15个字符',
		                type: 'warning'
		              });
            	}else{
            		
              api.post('/task/addProgressReport',data).then(res=>{
                this.addReporttwo=!this.addReporttwo
                if (res.data.code ==200){
                	this.$notify({
                    title: '成功',
                    message: '添加汇报内容成功',
                    type: 'success'
                  })
                	this.value1=''
                  let params={
                    tid:this.elementId,
                  }
                  api.get('/task/getProgressReport',params).then(res=>{
                    res.data.data.progressReport.map(el=>{
                      let ic_Guan ='ic_Guan'
                      let taskInput ='taskInput'
                      let showReport = 'showReport'
                      let newTime ='newTime'
                      let createTime= this.getTime(el.showTime).slice(5,10)
                      el[newTime]=this.getdayTime(el.showTime)
                      el[showReport] =false
                      el[ic_Guan] =false
                      el.taskInput =''
                      el.createTime =  createTime
                    })
                    this.reports = res.data.data.progressReport
                  })
                  this.report =''
                }
                else if (res.data.code == 500){
                  this.$notify.error({
                    title: '错误',
                    message: '服务器异常'
                  })
                }
              })
              this.addReport =true
            
            	}
            }else{
              this.$notify({
                title: '警告',
                message: '汇报内容不能为空',
                type: 'warning'
              });
            }

          },

          //点击切换的时候发送请求 获得进度汇报数据
          handleClick(tab, event) {
            console.log(event);
            if(tab.label == "进度汇报"){
                this.getDay()
            }
            else if(tab.label == '日志动态'){
              let data={
                tid:this.elementId,
              }
              api.get('/task/getTaskLog',data).then(res=>{
                res.data.data.progressReport.map(el=>{
                  let createTime =this.getTime(el.createTime)
                  el.createTime =  createTime

                })
                this.dynamicList =  res.data.data.progressReport
              })

            }
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
          //获取时间
          getdayTime(timestamp){
          	let time = new Date(timestamp);
          	return time.getHours() + ":" + time.getMinutes()
          },

          //修改汇报回显
          reportClick(report){

            this.reportId=report.reportId
          },
          //取消进度汇报按钮
          closeButton(report){
            if(report.content == ''){
              this.getDay()
              report.showReport  =false
            }
            report.showReport  =false

          },


          //修改汇报保存
          handleButton(report){
          	alert(report.showTime)
          	let now = new Date()
            let data={
              eid:this.getEnterpriseId,
              pid:sessionStorage.getItem('projectId'),
              tid:this.elementId,
              reportId:this.reportId,
              content:report.content,
              showTime:report.showTime == null? now.getFullYear() + '-' + TIME.doubleStr(now.getMonth()+1) + '-' + TIME.doubleStr(now.getDate()) + ' ' + TIME.doubleStr(now.getHours()) + ':' + TIME.doubleStr(now.getUTCMinutes()) + ':' + TIME.doubleStr(now.getSeconds()) : report.showTime,
            }
            report.showReport =true
            api.post('/task/updTaskRelation',data).then(res=>{
              if(res.data.code == 200){
                this.getDay()
                this.$notify({
                  title: '成功',
                  message: '修改进度汇报成功',
                  type: 'success'
                });
              }

            })
          },

          //删除汇报
          deleteReport(report,index){
            let userid= sessionStorage.getItem('userId')
            if (report.user.id == userid){
              let data={
                eid:this.getEnterpriseId,
                pid:sessionStorage.getItem('projectId'),
                tid:this.elementId,
                reportId:report.reportId,
              }
//            this.reports.splice(index,1)
              api.post('/task/delProgressReport',data).then(res=>{
                if (res.data.code == 200){
                  this.$notify({
                    title: '成功',
                    message: '删除汇报成功',
                    type: 'success'
                  })
                  this.getDay()
                }else{
                  this.$notify.error({
                    title: '错误',
                    message: '服务器异常'
                  })
                }
              })
            }
            else{
              this.$notify({
                title: '警告',
                message: '不可以删除其他人的进度汇报',
                type: 'warning'
              })
              return
            }

          },

          //点击进度汇报函数
          getDay(){
            let params={
              tid:this.elementId,
            }
            this.reports= []
            api.get('/task/getProgressReport',params).then(res=>{
              res.data.data.progressReport.map(el=>{
                let ic_Guan ='ic_Guan'
                let taskInput ='taskInput'
                let showReport = 'showReport'
                let newTime ='newTime'
                let createTime= this.getTime(el.createTime).slice(5,10)
                el[newTime]=this.getdayTime(el.createTime)
                el[showReport] =false
                el[ic_Guan] =false
                el.taskInput =''
                el.createTime =  createTime
              })
              this.reports = res.data.data.progressReport
              console.log(this.reports);
            })

          }
        },

        computed:{
      ...mapGetters({
        getEnterpriseId:'GET_ENTERPRISEID',
      }),

    },
        watch:{
        	elementId(){
        		this.activeName = 'second'
//      		this.taksCompile()
        	},
           report(){
		       if(this.report.length == 60){
		         this.$notify({
		           title: '警告',
		           message: '进度汇报字数不能大于60字',
		           type: 'warning'
		         })
		       }
		      },
          components(){
            for (let i=0;i<this.components.length;i++){
              this.components[i]._id.time = this.getTime(this.components[i]._id.time).slice(5,-3)
            }
          },
          taksCompile(){
            if (this.taksCompile == true){
              let data={
                tid:this.elementId,
              }
              api.get('/task/getTaskLog',data).then(res=>{
                res.data.data.progressReport.map(el=>{
                  let createTime =this.getTime(el.createTime)
                  el.createTime =this.getTime(el.createTime).slice(5,10)
                  let newTime ='newTime'
                  el[newTime] = this.getTime(createTime).slice(11,16)
                })
                this.dynamicList =  res.data.data.progressReport
              })
              this.reports= []
              let params={
                tid:this.elementId,
              }
              api.get('/task/getProgressReport',params).then(res=>{
                res.data.data.progressReport.map(el=>{
                  let ic_Guan ='ic_Guan'
                  let taskInput ='taskInput'
                  let showReport = 'showReport'
                  let newTime ='newTime'
                  let createTime= this.getTime(el.createTime).slice(5,10)
                  el[newTime]=this.getTime(el.createTime).slice(11,16)
                  el[showReport] =false
                  el[ic_Guan] =false
                  el.taskInput =''
                  el.createTime =  createTime
                })
                this.reports = res.data.data.progressReport
              })
            }

          },
        }


  }
</script>

<style scoped>
  .dispaly{
    display: flex;
    align-items: center;
  }
  .componentImg{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .componentName{
    margin-left: 10px;
  }
  .componentCreate{
    white-space: nowrap;
  }
  .pushComponent{
    width: 730px;
    height: 150px;
    background: #e5e5e5;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pushComponentbox{
    width: 670px;
    height: 115px;
    background: #ffffff;
    border-radius: 5px;
  }
  .addReporttwo>div>i{
    color: #4087f7;
  }
  .addReporttwo{
    margin-top: 20px;
  }
  .pushInput {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px 4px 0px 0px;
    border: 1px solid #d2d2d2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: 12px;
    height: 58px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }
  .pushBox{
    position: relative;
    padding-top:30px ;
    border-radius:  0px 0px 4px 4px;
    border-left:1px solid #d2d2d2 ;
    border-right:1px solid #d2d2d2 ;
    border-bottom:1px solid #d2d2d2 ;
  }
  .addReport{
    cursor: pointer;
    color: #4087f7;
    margin-top: 15px;
    display: flex;
    align-content: center;
  }
  .addReport>p{
    margin-left: 5px;
  }
  .addinput{
    /*width: 610px;*/
    width: 538px;
    height: 40px;
    -webkit-appearance: none;
    background-color: #fff;
    /*border-radius: 30px;*/
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
  }
  .button{
    cursor: pointer;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border-radius: 5px;
    width: 68px;
    height: 35px;
    background: #317ee2;
  }
  .report{
    align-items: center;
    height: 35px;
    position: relative;
    display: flex;
    margin-top: 40px;
  }
  .showReport{
    margin-top: 25px;
    padding: 20px 0;
    width: 725px;
    height: 105px;
    background: #f7f7f7;
  }
  .taskInput{

    height: 40px;
    width: 450px;
    -webkit-appearance: none;
    background-color: #fff;
    /*border-radius: 30px;*/
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    line-height: 1;
    outline: 0;
    padding: 0 20px;
  }
  .showReportOne{
    display: flex;
    align-items: center;
  }
  .showReportTwo{
    align-items: center;
    margin-top: 30px;
    margin-left: 520px;
    display: flex;
  }
  .reportButton{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border-radius: 5px;
    width: 68px;
    height: 35px;
    background: #317ee2;
  }
  .ic_Guan{
    width: 20px;
    height: 20px;
    cursor: pointer;
    top: 4px;
    position: absolute;
    right: 50px;
  }
  .ic_Guan>i{
    font-size:12px;

  }
  .report:hover{
    background: #F7F7F7;
  }
  .deleteReportBox{
    width: 610px;
    height: 35px;
    display: flex;
    align-items: center;
  }
  .dynamicList:first-child{
    margin-top: 0;
  }
  .dynamicList{
    margin-top: 20px;
  }
  .dynamic{
    padding: 15px 20px;
  }
  .dynamicContent{
    display: flex;
    align-items: center;
    margin-left: 80px;
  }
  .dynamicContent>div>img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;

  }

  .fabu{
    color: #ffffff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
  }
  .ft18{
    font-size: 18px;
    color: #666666;
  }
  .ft12{
    font-size: 12px;
    color: #333333;
  }
  .contents{
  	height: 24px;
    width: 418px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
