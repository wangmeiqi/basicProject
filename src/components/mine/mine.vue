<template>
	<div  v-if="showPage">
		<div class="mine">
			<div class="mine-div">
				<ul class="my-tab">
					<li v-for="(tab,index) in mineTabs" @click="mineTabsSkip(index)" :class="{active:mineTabIndex==index}">
		                <span>{{tab.name}}</span>
		            </li>
				</ul>
				<span @click="$emit('hasClickClose')" class="close-btn"><i class="iconfont icon-guanbi"></i></span>
			</div>
			<div>
				<recentEvents :show="mineTabIndex==0?true:false" :enentList="enentLists" @getRecentData="getRecentData"></recentEvents>
				<task :show="mineTabIndex==1?true:false" :taskList="taskLists" @getTaskData="getTaskData" @getTaskChangeData="getTaskChangeData"></task>
				<!-- <schedule></schedule> -->
				<file :show="mineTabIndex==2?true:false" :fileList="fileLists"></file>
				<!-- <collect></collect> -->
			</div>
		</div>
	</div>
</template>

<script>
    import recentEvents from 'components/mine/recentEvents'
    import task from 'components/mine/task'
    import schedule from 'components/mine/schedule'
    import file from 'components/mine/file'
    import collect from 'components/mine/collect'
    import API from 'api/http'	
	export default{
		components:{
			recentEvents,
			task,
			schedule,
			file,
			collect
		},
		props:{
			showPage:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			showPage(val){
				if(!val){
					this.mineTabIndex = 0;
				}else{
					this.getRecentDataList();
				}
			}
		},
		data() {
			return {
				closeBtn:false,
				//我的选项卡
                mineTabs: [
	                {
	                    name: '近期的事',
	                    path: '/recentEvents'
	                }, 
	                {
	                    name: '任务',
	                    path: '/task'
	                }, 
	                // {
	                //     name: '日程',
	                //     path: '/schedule'
	                // }, 
	                {
	                    name: '文件',
	                    path: '/file'
	                }, 
	                // {
	                //     name: '收藏',
	                //     path: '/collect'
	                // }
                ],
                //我的选项卡index
                mineTabIndex: 0,
                //近期的事数据列表
                enentLists:[],
                //任务数据列表
                taskLists:[],
                //文件数据列表
                fileLists:[],
               
			}
		},
		mounted(){
			//首次进入加载默认--近期的事
			this.getRecentDataList();
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
		methods:{
			//勾选了未完成任务，更新近期的事任务列表
			getRecentData(){
				this.getRecentDataList();
			},
			mineTabsSkip(index){
				this.mineTabIndex = index;
				switch(index){
					case 0:
						this.getRecentDataList();
						break;
					case 1:
						this.getTaskDataList('/myModel/myTask',{isDone:false,sort:'dueDate',eid:sessionStorage.getItem("enterpriseId")});
						break;
					case 2:
						this.getFileDataList();
						break;
				}
				
			},
			//获取近期的事列表数据
			getRecentDataList(){
                API.get('/myModel/recent',{
                	eid: sessionStorage.getItem("enterpriseId")
                }).then(res => {
                	if(res.data.data){
                		this.enentLists = res.data.data;
                	}
                });
			},
			//获取任务列表数据
			getTaskDataList(url,parmas){
				console.log(url)
				console.log(parmas)

                API.get(url,parmas).then(res => {
                	if(res.data.data){
                		this.taskLists = res.data.data;
                	}
                });
			},
			//勾选了未完成任务，更新近期的事任务列表
			getTaskData(obj){
				console.log(23232)
				this.getObj(obj);
			},
			getTaskChangeData(obj){
				this.getObj(obj);
			},
			
			//处理组件返回obj
			getObj(obj){
				let url = '',params = {},enterpriseId=sessionStorage.getItem('enterpriseId');
				switch(obj.myRun){
					case 0:
						url  = "/myModel/myTask";//执行
						break;
					case 1:
						url = "/myModel/getMyCreated";//创建
						break;
					case 2:
						url = "/myModel/getMyInvolves";//参与
						break;
				}
				params.isDone = obj.isDone;
				if(obj.isDone){
					params.sort = 'accomplished';
				}else{
					params.sort = obj.sort;
				}
				params.eid = enterpriseId;
				this.getTaskDataList(url,params)
			},
			//获取文件列表数据
			getFileDataList(){
                API.get('/myModel/getMyFile',{
                	eid: sessionStorage.getItem("enterpriseId")
                }).then(res => {
                	console.log('00000000000000000000000000000000000000000000',res)
                	if(res.data.data){
                		this.fileLists = res.data.data;
                		console.log(this.fileLists)
                	}
                });
			}
		}
	}
</script>

<style scoped>
	.mine{
		position: fixed;
		width: 97%;
		top: 0;
    	left: 50px;
    	background: #f7f7f7;
    	height: 100%;
    	padding-top: 40px;
    	z-index: 20;
	}
	.mine-div{
		height: 50px;
		width: 90%;
		margin: auto;
		border-bottom: 1px solid #e1e1e1;
	}
	.my-tab{
		width: 30%;
		margin: 0 auto;
	}
	.my-tab li{
		float: left;
		cursor: pointer;
		padding: 15px 4px 15px;
	    margin: 0 20px;
	    text-align: center;
	    color: #383838;
	    border-bottom: 2px solid #f7f7f7;
	}
	.my-tab li.active{
		border-bottom: 2px solid #3da8f5;
	}
	.my-tab li:hover{
		border-bottom: 2px solid #3da8f5;
	}
	.close-btn{
		position: absolute;
		top: 50px;
		right: 5.2%;
		color: #b7b0b0;
	}
	.close-btn i {
		font-size: 20px;
	}
</style>