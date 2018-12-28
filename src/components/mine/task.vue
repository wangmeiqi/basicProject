<template>
	<div v-show="show">
		<div class="my-content-wrap">
			<div class="my-content card my-wrap">
				<section class="my-recent-view my-content-view fade in">
					<header class="my-tab-header tasks-header"> 
						<ul class="my-header-tabs">
							<li v-for="(item,index) in mineTabs" @click="mineTabsSkip(index)" :class="{active:mineTabIndex==index}" class="type-filter">{{item.name}}
							</li>  
						</ul> 
						<div class="tasks-menu-group pull-right">
							<a v-if="!(!hasClicksortComplete&&index==1)" v-for="(item,index) in chooseName"  @click="getTaskSort(index)" style="margin-right:18px">
								<span class="menu-title">{{item.name}}</span>
								<i class="iconfont icon-middle">&#xe695;</i>
							</a>
							<selects :selectContent="selectContent" @hasChooseOne="sortChoose" :chooseIndex="chooseIndex" :show="selectshow" :styles="styles"></selects>
						</div>
					</header>
					<div class="my-tasks-wrapper">
						<taskList :imgBol='imgBolean' :taskDataList="taskList" @getDataAgain="getDataAgain" :chooseDoneType="chooseDoneType"></taskList>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	import taskList from 'components/mine/taskList'
	import selects from 'components/mine/select'
	// document.addEventListener('click', (e) => {
	// 	if (!this.$el.contains(e.target)) this.isShowDialog = false;
	// })
	export default{
		props:{
			show:{
				type:Boolean,
				default:false
			},
			taskList:{
				type:Array,
				default:null
			}
		},
		components:{
			taskList,
			selects
		},
		data(){
			return{
				//下拉框
				imgBolean:false,//是否显示头像
				styles:'',
				selectshow:false,
				compeleteTab:[
					{id:1,name:'未完成'},
					{id:2,name:'已完成'}
				],
				sortItem:[
					{id:1,name:'按优先级排序'},
					{id:2,name:'按截止时间排序'},
					{id:3,name:'按创建时间排序'},
					{id:4,name:'按项目名称排序'}
				],
				sortItem2:[
					{id:1,name:'按优先级排序'},
					{id:2,name:'按截止时间排序'},
					{id:3,name:'按创建时间排序'}
				],
				//我的选项卡
                mineTabs: [
	                {
	                    name: '我执行的'
	                }, 
	                {
	                    name: '我创建的'
	                },  
	                {
	                    name: '我参与的'
	                },
                ],
                chooseName:[
                	{name:'未完成'},
                	{name:'按截止时间排序'}
                ],
                chooseIndex:0,
                //我选择显示的任务类型（执行创建参与）
                mineTabIndex:0,
                //下拉框开关
                sortAlert:false,
                //勾选图标显示位置
                chooseDoneIndex:0,
                chooseSortIndex:1,
                //完成情况选择结果
                chooseDoneType:false,
                //优先级选择情况
                chooseSortType:'dueDate',
                //优先级下拉框显示开关
                hasClicksortComplete:true,
                selectContent:[]
			}
		},
		mounted(){
			this.selectContent = this.compeleteTab;
		},
		methods:{
			mineTabsSkip(index){
				console.log(2323)
				if(index==0){
					this.imgBolean = false
					this.priorityTab = this.sortItem;
					this.chooseName[1].name = '按截止时间排序';
					
				}else{
					this.imgBolean = true
					this.priorityTab = this.sortItem2;
					this.chooseName[1].name = '按截止时间排序';
				}
				if(this.mineTabIndex!=index){
					this.mineTabIndex = index;
					this.sortAlert = false;
					this.hasClicksortComplete = true;
					this.selectshow=false;
					this.chooseName[0].name = '未完成';
					this.chooseDoneType = false;
					this.chooseDoneIndex = 0;
					this.chooseSortType = 'dueDate';//按照截至时间
					this.chooseSortIndex = 1;
					let obj = {
						'myRun':this.mineTabIndex,
						'isDone':false,
						'sort':'dueDate'
					}

					if(this.mineTabIndex>0){
						this.priorityTab = this.sortItem2;
					}else{
						this.priorityTab = this.sortItem;
					}


					this.$emit('getTaskChangeData',obj);
				}
			},
			getTaskSort(index){
				this.selectshow=true;
				switch(index){
					case 0:
						!this.hasClicksortComplete?this.styles='top:38px;left:-29px;width:148%':this.styles='top:38px;left:-20px;width:80%';
						this.selectContent = this.compeleteTab;
						this.chooseIndex = this.chooseDoneIndex;
						break;
					case 1:
						this.styles='top:38px;left:60px;width:80%';
						this.mineTabIndex==0?this.priorityTab = this.sortItem:this.priorityTab = this.sortItem2;
						this.selectContent = this.priorityTab;
						this.chooseIndex = this.chooseSortIndex;
						break;
				}
			},
			sortChoose(index){
				let self = this;
				this.selectshow=false;

				if(this.selectContent==this.compeleteTab){
					this.chooseDoneIndex = index;
					switch(index){
						case 0:
							this.chooseDoneType = false;
							this.hasClicksortComplete = true;

							break;
						case 1:
							this.chooseDoneType = true;
							this.hasClicksortComplete = false;
							this.chooseName[1].name = '按截止时间排序';
							this.chooseSortIndex = 1;
							break;
					}
					this.chooseName[0].name = this.compeleteTab[index].name;
					this.sortAlert = false;
				}else{
					this.chooseSortIndex = index;
					switch(index){
						case 0:
							this.chooseSortType = 'priority';//按照优先级
							break;
						case 1:
							this.chooseSortType = 'dueDate';//按照截至时间
							break;
						case 2:
							this.chooseSortType = 'created';//按照创建时间
							break;
						case 3:
							this.chooseSortType = 'project';//按照项目名称排序
							break;
					}
					this.chooseName[1].name = this.priorityTab[index].name;
					setTimeout(function(){
						self.sortAlert = false;
					},500)
				}
				let obj = {
					'myUrl':this.minTabUrl,
					'myRun':this.mineTabIndex,
					'isDone':this.chooseDoneType,
					'sort':this.chooseSortType
				}
				this.$emit('getTaskChangeData',obj);
			},
			//勾选了未完成任务，更新近期的事任务列表
			getDataAgain(){
				let obj = {
					'myRun':this.mineTabIndex,
					'isDone':this.chooseDoneType,
					'sort':this.chooseSortType
				}
				this.$emit('getTaskData',obj);
			}
		},
		watch:{
			show(newVal){
				if(!newVal){
					this.mineTabIndex = 0;
					this.selectshow=false;
				}
			}
		}
	}
</script>

<style scoped>
	.my-tab-header {
	    margin: 0 20px;
	    border-bottom: 2px solid #e5e5e5;
	}
	.my-tab-header {
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.my-tab-header .my-header-tabs {
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}
	.my-tab-header .my-header-tabs li {
	    position: relative;
	    padding: 14px 4px;
	    font-size: 16px;
	    color: #383838;
	    cursor: pointer;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    line-height: 20px;
	}
	.my-tab-header .my-header-tabs li+li {
	    margin-left: 26px;
	}
	.pull-right {
		color: #383838;
	    float: right!important;
	}
	.my-content-wrap{
		position: absolute;
	    width: 100%;
	    padding-top: 20px;
	    background: #f7f7f7;
	    height: 80vh;
	    overflow: auto;
	}
	.my-content{
		position: relative;
	    margin: 0 auto;
	    width: 90%;
	    height: 100%;
	    background: #fff;
	}
	.my-content .my-content-view.my-recent-view {
	    overflow-y: auto;
	}
	.my-content-wrap .my-content .my-content-view {
	    height: 100%;
	}
	.my-header-tabs li.active:after,.my-header-tabs li:hover:after{
		content: "";
		position: absolute;
		left: 0;
		bottom: -2px;
		height: 3px;
		width: 100%;
		border-bottom: 2px solid #3da8f5;
		transition: opacity 218ms ease,border-width 218ms ease;
	}
	.icon-middle{
		vertical-align: middle;
	}
	.tasks-menu-group a{
		cursor: pointer;
	}
	.tasks-menu-group{
		position: relative;
	}

</style>