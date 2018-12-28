<template>
	<div>
		<el-dialog title="关联内容" :visible.sync="addAssociated" width="800px" center>
			<span>
          		<div style="display: flex" class="father">
           			<div class="oneBox">
              			<div  class="navs" v-for="(li, index) in navs":class="{active:index==navActive}" @click="tabButton(index)">
	                		<i></i>
	                		<div >{{li.name}}</div>
              			</div>
            		</div>
		            <div class="twoBox">
		              	<div v-for="(element,index) in Data" class="group-name">
		                	<p class="object">{{element.enterprise.name}}</p>
		                	<div class="object elementP" v-for="(li , ind ) in element.projects"  :class="{active:ind== isActive}"  @click="tab(li,ind)">
		                  		<div style="font-size: 14px;font-weight: 400" >
		                    		{{li.name}}
		                  		</div>
		                	</div>
		              	</div>
		            </div>
		            <div v-show="task" class="task" ref="task">
		             	<div style="border-right: 1px solid rgba(0,0,0,.12);" >
			               	<div>
				                <div>
				                  	<p class="taskTypeone">任务分组</p>
				                  	<div v-for="(li, index) in groupTaks" style="cursor: pointer" @click="checkTask(index)" :class="{active:index == groupIndex }">
					                    <div style="padding: 5px 15px;" class="groupTaks">
					                      {{li.name}}
					                    </div>
				                  	</div>
				                </div>
				                <div>
				                  	<p class="taskType">智能分组</p>
				                  	<div v-for="(task, index) in taskList" class="taskList"  >
					                    <div>
					                      {{task.name}}
					                    </div>
				                  	</div>
				                </div>
			               	</div>
		             	</div>
		              	<div class="scroll" style="border-right: 1px solid rgba(0,0,0,.12);">
		               		<div style="overflow: auto;height: 100%;">
			               		<div class="addCopy">
			                 		<i style="margin-right: 10px" class="iconfont icon-add-copy-copy"></i>
			                 		<p style="cursor: pointer">创建新任务</p>
			               		</div>
		               			<div v-for="(task,index) in getTaskType">
		                 			<div style="font-size: 14px;font-weight: 400">
		                    			<div style="padding: 5px 15px;">
		                      				<b>{{task.name}}</b>
		                    			</div>
		                    			<div v-for="li in task.tasksList" class="taskItem taskHover" @click="addAssociatedList(li,0)">
		                       				<div>
		                          				<i @click.stop="li.state=li.state==0?1:0" v-show="li.state==1" class="iconfont icon-duoxuankuang2"></i>
								                <i @click.stop="li.state=li.state==0?1:0" v-show="li.state==0" class="iconfont icon-fuxuankuang"></i>
								                <span style="margin-left: 10px;">{{li.name}}</span>
		                       				</div>
		                    			</div>
		                 			</div>
		               			</div>
		               		</div>
		              	</div>
		              	<div class="scroll" style="border-right: 1px solid rgba(0,0,0,.12);" v-for="(item,index) in associatedlistArray">
		               		<div style="">
				               	<div class="addCopy">
				                 	<i style="margin-right: 10px" class="iconfont icon-add-copy-copy"></i>
				                 	<p>创建新任务</p>
				               	</div>
			               		<div v-for="task in item" >
					                <div class="taskItem taskHover" @click="addAssociatedList(task ,index+1)">
					                   	<i @click.stop="task.state=task.state==0?1:0" v-show="task.state==1" class="iconfont icon-duoxuankuang2"></i>
					                   	<i @click.stop="task.state=task.state==0?1:0" v-show="task.state==0" class="iconfont icon-fuxuankuang"></i>
					                   	<span style="margin-left: 10px;">{{task.name}}</span>
					                </div>
			               		</div>
		               		</div>
		             	</div>
            		</div>
		            <div v-show="share">
		              	分享
		            </div>
		            <div v-show="day">
		              	日程
		            </div>
		            <div v-show="file">
		              	文件
		            </div>
          		</div>
        	</span>
			<span slot="footer" class="dialog-footer">
	          	<el-button @click="addAssociated = false">取 消</el-button>
	          	<el-button type="primary" @click="saveRelTask">确 定</el-button>
	        </span>
		</el-dialog>
	</div>
</template>

<script>
	import api from 'api/http'

	export default {
		name: "task-associated",
		props: ['Associated', "associatedData", "taskGroup","elementId"],
		data() {
			return {
				taskIndex: -1,
				getTaskType: [],
				groupIndex: 0,
				navActive: 0,
				groupTaks: [],
				task: true,
				day: false,
				share: false,
				file: false,
				isActive: 0,
				addAssociated: false,
				Data: [],
				navs: [{
						name: '任务'
					},
					{
						name: '分享'
					},
					{
						name: '日程'
					},
					{
						name: '文件'
					}
				],
				taskList: [{
						name: '今天的任务'
					},
					{
						name: '未完成的任务'
					},
					{
						name: '已完成的任务'
					}
				],
				//关联任务显示数组
				associatedlistArray: []
			}
		},
		methods: {
			//添加子任务
			addAssociatedList(item, index) {
				//        	alert(index)
				if(this.associatedlistArray.length == index) {
					api.get('/task/getSonTask', {
						tid: item.id
					}).then(res => {
						let arr = []
						res.data.data.map(el => {
							this.$set(el,'checked',false)
							arr.push(el)
						})
						this.associatedlistArray.push(arr)
						this.$refs.task.scrollTo((index + 2) * 200, 0)
					})
				} else if(this.associatedlistArray.length - 1 == index) {
					this.associatedlistArray.splice(index)
					api.get('/task/getSonTask', {
						tid: item.id
					}).then(res => {
						let arr = []
						res.data.data.map(el => {
							this.$set(el,'checked',false)
							arr.push(el)
						})
						this.associatedlistArray.push(arr)
						
						this.$refs.task.scrollTo((index + 2) * 200, 0)
					})
				}
				console.log(this.associatedlistArray)
				setTimeout(() => {
					this.$refs.task.scrollTo((index + 2) * 200, 0)
					console.log(this.$refs.task.scrollLeft)
				}, 200)
			}, //点击最左侧导航 切换
			tabButton(index) {
				this.navActive = index
				if(index == 0) {
					this.task = true
					this.day = false
					this.share = false
					this.file = false
				} else if(index == 1) {
					this.task = false
					this.day = true
					this.share = false
					this.file = false
				} else if(index == 2) {
					this.task = false
					this.day = false
					this.share = true
					this.file = false
				} else {
					this.task = false
					this.day = false
					this.share = false
					this.file = true
				}
			},

			//点击企业项目 切换任务
			tab(li, ind) {
				this.associatedlistArray = []
				this.isActive = ind
				let params = {
					projectId: li.id
				}
				api.get('/task/findGroupTask', params).then(res => {
					this.groupTaks = res.data.data
				})
			},

			//点击任务任务 查找任务列表
			checkTask(index) {
				this.groupIndex = index
				let params = {
					groupId: this.groupTaks[index].id,
					taskId: this.elementId
				}
				api.get('task/getGroupRelationList', params).then(res => {
//					this.getTaskType = res.data.data
					this.getTaskType = res.data.data
					console.log(res.data.data)
				})
			},
			//保存关联任务
			saveRelTask(){
				this.addAssociated = false
				let ids = ''
				for(let i in this.getTaskType){
					for(let j in this.getTaskType[i].tasksList){
						if(this.getTaskType[i].tasksList[j].state == 1){
							ids += this.getTaskType[i].tasksList[j].id + ','
						}
					}
				}
				for(let i in this.associatedlistArray){
					console.log(this.associatedlistArray[i])
					for(let j in this.associatedlistArray[i]){
						if(this.associatedlistArray[i][j].state == 1){
							ids += this.associatedlistArray[i][j].id + ','
						}
					}
				}
				api.post('/task/addTaskRelation',{
					eid:sessionStorage.getItem('enterpriseId'),
					pid:sessionStorage.getItem('projectId'),
					tid: this.elementId,
					relIds:ids.substr(0,ids.length-1)
				}).then(res => {
					console.log(res)
					this.$emit('relevance',false);
				})
			}
		},
		watch: {
			Associated() {
				this.addAssociated = true
			},
			associatedData() {
				this.Data = this.associatedData
				console.log(this.Data);

			},

		}

	}
</script>

<style scoped>
	.scroll {
		width: 400px !important;
	}
	
	.father {
		border: 1px solid rgba(0, 0, 0, .12);
	}
	
	.active {
		background: #f7f7f7;
		color: #3da8f5
	}
	
	.oneBox {
		border-right: 1px solid rgba(0, 0, 0, .12);
	}
	
	.twoBox {
		overflow: auto;
		height: 420px;
		width: 180px;
		border-right: 1px solid rgba(0, 0, 0, .12)
	}
	
	.twoBox::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.twoBox::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/
	
	.twoBox::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 4px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}
	
	.navs {
		width: 135px;
		display: flex;
		align-items: center;
		padding: 5px 15px;
		height: 34px;
		transition: background-color 218ms ease, color 218ms ease;
	}
	
	.navs:hover {
		cursor: pointer;
		background: #f7f7f7;
	}
	
	.object {
		display: block;
		padding: 5px 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.group-name {
		color: gray;
		font-weight: 700;
		margin-top: 25px;
	}
	
	.group-name:first-child {
		margin-top: 2px;
	}
	
	.elementP:hover {
		cursor: pointer;
		background: #F7F7F7;
	}
	
	.task {
		display: flex;
		width: 400px;
		overflow-x: auto;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
	
	.task::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.task::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/
	
	.task::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 4px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}
	
	.taskList>div {
		padding: 5px 15px;
		width: 169px;
	}
	
	.taskList>div:hover {
		background: #f7f7f7;
	}
	
	.taskType:hover {
		background: #f7f7f7;
	}
	
	.taskTypeone {
		color: gray;
		font-weight: 700;
		padding: 5px 15px;
		width: 169px;
	}
	
	.taskTypeone:hover {
		background: #f7f7f7;
	}
	
	.taskType {
		margin-top: 30px;
		color: gray;
		font-weight: 700;
		padding: 5px 15px;
		width: 169px;
	}
	
	.groupTaks:hover {
		background: #f7f7f7;
	}
	
	.icon-add-copy-copy {
		color: #3da8f5;
	}
	
	.addCopy {
		display: flex;
		align-items: center;
		padding: 5px 15px;
		width: 144px;
		height: 30px;
		overflow: auto;
	}
	
	.taskItem {
		cursor: pointer;
		width: 169px;
		padding: 5px 15px;
	}
	
	.taskHover:hover {
		background: #F7F7F7;
		color: #3da8f5;
	}
	
	.taskAcvtive {
		background: #3da8f5;
		color: #ffffff;
	}
</style>