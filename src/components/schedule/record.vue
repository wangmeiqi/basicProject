<template>
	<div class="record" @click.stop="stop">
		<el-tabs style="padding: 0 20px;" v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="评论" name="comment">
		    	<div class="comment" v-show="activeName=='comment'">
		    <div class="commentBox">
		    	<div>
		    		<input @keyup.enter="addComment" type="text" v-model="comment_content" placeholder="@提及他人，按enter快速发布"/>
		    	</div>
		    	<div>
		    		<div>
		    			<i class="iconfont icon-xiaolian-line" style="color: #c7c7c7;cursor: pointer;"></i>
		    		</div>
		    		<div>
		    			<div class="send">
		    				<div @click="addComment">发布</div>
		    				<div>
		    					<i class="iconfont icon-jiantoux"></i>
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    </div>
		</div>
		    	<ul class="commentList">
		    		<li v-for="item in commentList">
		    			<div>
		    				<img v-if="item.user.user_img!=''" class="img" :src="item.user.user_img" alt="" />
		    				<div class="img" v-if="item.user.user_img==''">
		    					{{item.user.username[0]}}
		    				</div>
		    			</div>
		    			<div style="width: 100%;">
		    				<div style="display: flex;align-items: flex-start;">
		    					<span class="name" style="margin-right: 20px;">{{item.user.username}}</span>
		    					<span class="time">{{item.createTime | timeFormat}}</span>
		    				</div>
		    				<div class="content">
		    					<p>{{item.content}}</p>
		    				</div>
		    			</div>
		    			<div>
		    				<i v-if="item.user.id == userId" @click="delComment(item.coid)" class="iconfont icon-guanbi hand"></i>
		    			</div>
		    		</li>
		    	</ul>
		    </el-tab-pane>
		    <div v-if="type!='schedule'">
		    	<el-tab-pane label="进度汇报" name="report">
			    	<div v-show="!addFlag" style="margin-bottom: 10px;">
			    		<span style="color: #2c86ff;cursor: pointer;" @click="addFlag=!addFlag">
			    			<i class="iconfont icon-tianjia"></i>
			    			<span>添加进度汇报{{type=='schedule'}}</span>
			    		</span>
			    	</div>
			    	<div v-show="addFlag" class="addReportMsg">
			    		<div style="display: flex">
			    			<div style="margin-right: 10px;">
							    <el-date-picker
							      	v-model="reportTime"
							      	type="datetime"
							      	placeholder="选择日期"
							      	value-format="yyyy-MM-dd hh:mm:ss">
							    </el-date-picker>
			    				<!--<i class="iconfont icon-rili1" style="cursor: pointer;"></i>-->
			    			</div>
			    			<div style="width: 100%;">
			    				<el-input
								  	type="textarea"
								  	:rows="2"
								  	placeholder="请输入进度汇报"
								  	maxlength="60"
								  	minlength="15"
								  	v-model="reportStr">
								</el-input>
			    			</div>
			    		</div>
			    		<div style="display: flex;justify-content: flex-end;margin-top: 10px;">
			    			<el-button @click="addFlag=false" size="medium">取消</el-button>
			    			<el-button type="primary" size="medium" @click="addPeport">确认</el-button>
			    		</div>
			    	</div>
			    	<ul class="reportList">
			    		<li v-for="(item,index) in reportList">
			    			<el-row v-show="!item.edit">
			    				<el-col :span="2">
			    					{{item.showTime | monthDay}}
			    					<!--{{item.week}}-->
			    				</el-col>
			    				<el-col :span="2">
			    					{{item.showTime | hourMinute}}
			    				</el-col>
			    				<el-col :span="16" style="word-wrap: break-word;word-break:break-all;white-space: normal;">
			    					{{item.content}}
			    				</el-col>
			    				<el-col :span="2">
			    					<img class="img" v-if="item.user.user_img!=''" :src="item.user.user_img"/>
			    					<div class="img" v-if="item.user.user_img==''">
			    						{{item.user.username[0]}}
			    					</div>
			    				</el-col>
			    				<el-col :span="2">
			    					<i v-if="item.user.id == userId" @click="item.edit=true" class="iconfont icon-bianji hands"></i>
			    					<i v-if="item.user.id == userId" @click="delReport(item.reportId)" class="iconfont icon-guanbi hands"></i>
			    				</el-col>
			    			</el-row>
			    			<div v-if="item.edit">
			    				<div style="display: flex">
					    			<div style="margin-right: 10px;">
									    <el-date-picker
									      	v-model="item.reportTime"
									      	type="datetime"
									      	placeholder="选择日期"
									      	value-format="yyyy-MM-dd hh:mm:ss">
									    </el-date-picker>
					    				<!--<i class="iconfont icon-rili1" style="cursor: pointer;"></i>-->
					    			</div>
					    			<div style="width: 100%;">
					    				<el-input
										  	type="textarea"
										  	:rows="2"
										  	placeholder="请输入进度汇报"
										  	maxlength="60"
								  			minlength="15"
										  	v-model="item.reportStr">
										</el-input>
					    			</div>
					    		</div>
					    		<div style="display: flex;justify-content: flex-end;margin-top: 10px;">
					    			<el-button @click="item.edit=false" size="medium">取消</el-button>
					    			<el-button @click="editReport(index,item.reportStr,item.reportTime,item.reportId)" type="primary" size="medium">确认</el-button>
					    		</div>
			    			</div>
			    		</li>
			    	</ul>
			    </el-tab-pane>
		    </div>
		    <el-tab-pane label="日志动态" name="log">
		    	<ul class="reportList" v-show="logList.length>0">
		    		<li v-for="item in logList">
		    			<el-row :gutter="20">
		    				<el-col :span="4">
		    					<span>{{item.showTime | monthDay}}</span>
		    					<span>{{item.showTime | hourMinute}}</span>
		    				</el-col>
		    				<el-col :span="16" style="word-wrap: break-word;word-break:break-all;white-space: normal;">
		    					{{item.content}}
		    				</el-col>
		    				<el-col :span="4">
		    					<img class="img" v-if="item.user.user_img!=''" :src="item.user.user_img"/>
		    					<div class="img" v-if="item.user.user_img==''">
		    						{{item.user.username[0]}}
		    					</div>
		    				</el-col>
		    			</el-row>
		    		</li>
		    	</ul>
		    </el-tab-pane>
	  	</el-tabs>
	  	
	</div>
</template>

<script>
	import API from 'api/http'
	import TIME from 'api/time'
	export default {
		props:{
			taskId:{
				type:Number,
				default:0
			},
			commentList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			flag:{
				type:Boolean,
				default:false
			},
			type:{
				default:null
			}

		},
		data() {
			return {
				activeName: 'comment',			//选项卡现在选的是哪个块
				comment_content:'',				//评论的内容
				reportList:[],					//进度汇报列表
				addFlag:false,					//添加模块的显示与隐藏
				reportStr:'',					//进度汇报的内容
				reportTime:'',					//进度汇报的时间
				logList:[],						//日志列表
				userId:0,						//用户Id
			};
		},
		filters:{
			timeFormat(val){
				return TIME.formatting(val)
			},
			monthDay(val){
				return val.substr(5,5)
			},
			hourMinute(val){
				return val.substr(11,5)
			}
		},
		methods: {
			//阻止冒泡
			stop(){
				
			},
			//检测选项卡的Tab
			handleClick(tab, event) {
//				console.log(tab, event);
				console.log(tab)
				if(tab.name == 'comment'){
					//获取评论列表
					this.getCommentList()
					this.comment_content = ''
				}else if(tab.name == 'report'){
					//获取进度汇报列表
					this.getReportList()
					this.addFlag = false
					this.reportTime = ''
				}else if(tab.name == 'log'){
					this.getLogList()
				}
			},
			//添加评论
			addComment(){
				if(this.comment_content.trim() != ''){
					let url = '',parmars={
						taskId: this.taskId,
						content: this.comment_content,
						type: 1
					};
					if(this.type=='schedule'){
						url = '/schedule/addComment';
						parmars.type=2;
					}else{
						url='/tasks/addComment';
					}
					API.post(url,parmars).then(res => {
						this.comment_content = ''
						this.getCommentList()
					})
				}
				
			},
			//删除评论
			delComment(id){
				let url = '',parmars={
					commentId:id
				};
				if(this.type=='schedule'){
					url = '/schedule/delComment';
				}else{
					url='/tasks/delComment';
				}
				API.post(url,parmars).then(res => {
					this.getCommentList()
				})
			},
			//获取任务评论
			getCommentList(){
				let url = '/tasks/getTaskComment',parmars={
					taskId:this.taskId,
					type:'1'
				};
				if(this.type=='schedule'){
					parmars.type='2';
				}
				API.get(url,parmars).then(res => {
					this.$emit('updateComment',res.data.data)
				})
			},
			//获取进度汇报
			getReportList(){
				API.get('/tasks/getProgressReport', {
					tid:this.taskId
				}).then(res => {
					this.reportList = []
					res.data.data.progressReport.map(el => {
						this.$set(el,'edit',false);
						this.$set(el,'reportTime',el.showTime);
						this.$set(el,'reportStr',el.content)
						this.reportList.push(el);
					})
					console.log(this.reportList)
				})
			},
			//添加进度汇报
			addPeport(){
				if(this.reportStr.length > 15){
					API.post('/tasks/addProgressReport',{
						projectId: sessionStorage.getItem("projectId"),
						eid: sessionStorage.getItem("enterpriseId"),
						tid: this.taskId,
						content: this.reportStr,
						showTime: this.reportTime
					}).then(res => {
						this.reportStr = ''
						this.reportTime = ''
						this.getReportList()
						this.addFlag = false
					})
				}else{
					this.$notify({
			          	title: '警告',
			          	message: '请至少录入15个字',
			          	type: 'warning'
			        });
				}
			},
			//删除进度汇报
			delReport(id){
				API.post('/tasks/delProgressReport',{
					reportId:id,
					taskId:this.taskId,
					projectId: sessionStorage.getItem("projectId"),
					eid: sessionStorage.getItem("enterpriseId")
				}).then(res => {
					this.getReportList()
				})
			},
			//修改进度汇报
			editReport(index,content,showTime,id){
				this.reportList[index].edit = false
				if(content.length > 15){
					API.post('/tasks/updTaskRelation' ,{
						tid:this.taskId,
						projectId: sessionStorage.getItem("projectId"),
						eid: sessionStorage.getItem("enterpriseId"),
						content:content,
						showTime:showTime,
						reportId:id
					}).then(res => {
						this.getReportList()
					})
				}else{
					this.$notify({
			          	title: '警告',
			          	message: '请至少录入15个字',
			          	type: 'warning'
			        });
				}
			},
			//获取日志信息
			getLogList(){
				let url = '',parmars={};
				if(this.type=='schedule'){
					url = '/schedule/getScheduleLog';
					parmars={
						sid:this.taskId
					}
				}else{
					url='/tasks/getTaskLog';
					parmars={
						tid:this.taskId
					}
				}
				API.get(url,parmars).then(res => {
					this.logList = []
					res.data.data.progressReport.map(el => {
						this.$set(el,'showTime',TIME.formatting(el.createTime))
						this.logList.push(el)
					})
				})
			}
		},
		watch:{
			addFlag(val){
				if(val){
					this.reportStr = ''
				}
			},
			flag(){
				this.activeName = 'comment'
			}
		},
		created(){
			this.userId = sessionStorage.getItem("userId");
		}
	}
</script>


<style scoped>
	.reportList li{
		padding: 20px 4px;
	}
	.reportList li .img{
		width: 24px;
		height: 24px;
		border-radius: 24px;
		background: #ffae44;
		text-align: center;
		line-height: 24px;
		color: white;
	}
	.reportList li:hover{
		background: #F1F1F1;
	}
	.commentList li{
		display: flex;
		align-items: center;
		padding: 10px 7px;
		cursor: default;
	}
	.commentList li:hover{
		background: #f7f7f7;
	}
	.commentList li:hover .hand{
		visibility: initial;
	}
	.commentList li .img{
		width: 38px;
		height: 38px;
		border-radius: 38px;
		background: #999999;
		margin-right: 10px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.commentList .name {
		font-size: 16px;
		color: #666666;
	}
	.commentList .time {
		color: #999999;
		font-size: 12px;
	}
	.commentList .content{
		word-wrap: break-word;
		color: #333333;
		word-break: break-all;
		white-space: normal
	}
	.commentList .hand{
		visibility: hidden;
		cursor: pointer;
	}
	.hands{
		cursor: pointer;
	}
	.comment {
		width: 100%;
		height: 156px;
		background: #E5E5E5;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 15px;
	}
	 .commentBox{
		width: 600px;
		height: 116px;
		background: white;
		border-radius: 6px;
		border: 1px solid #d2d2d2;
	}
	 .commentBox>div:nth-child(1){
		border-bottom: 1px solid #d2d2d2;
	}
	 .commentBox input{
		width: 570px;
		border-radius: 6px;
		height: 58px;
		font-size: 12px;
		padding: 0 15px;
	}
	.commentBox input::-moz-placeholder{
		font-size: 12px;
		color: #c7c7c7;
	}
	.commentBox input::-webkit-input-placeholder{
		font-size: 12px;
		color: #c7c7c7;
	}
	.commentBox>div:nth-child(2){
		height: 58px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px ;
	}
	.commentBox .send{
		display: flex;
		width: 70px;
		height: 28px;
		background: #0a7ee9;
		color: white;
		border-radius: 4px;
		cursor: pointer;
	}
	.send>div{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.commentBox .send>div:nth-child(1){
		width: 43px;
		height: 100%;
		border-right: 1px solid #71b4f2;
	}
	.commentBox .send>div:nth-child(2){
		width: 26px;
		height: 100%;
	}
</style>
<style>
	.record .el-input--prefix .el-input__inner{
		height: 54px;
	}
</style>