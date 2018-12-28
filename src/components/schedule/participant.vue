<template>
	<!--参与者-->
	<div>
		<h5>参与者</h5>
		<ul class="participant">
			<li v-for="item in list">
				<img v-if="item.user_img!=''" class="img" :src="item.user_img" />
				<div v-if="item.user_img==''" class="img">
					{{item.username[0]}}
				</div>
				<i @click.stop="delUser(item.id)" class="iconfont icon-guanbi close" v-if="removeParticipantFlage"></i>
			</li>
			<i style="color: rgb(10, 126, 233);" @click.stop="getStyles($event)" class="iconfont icon-tianjia addparticipant" v-if="addParticipantFlage" ></i>
		</ul>
		<div :style="styles" v-show="shows">
			<memberlist :show="shows" @allmsg="getUsersMsg" @send="getUserMsg" :principalId="principalId" type="checked" :styles="styles" :ids="ids" :taskId="taskId"></memberlist>
		</div>
	</div>

</template>

<script>
	import API from 'api/http'
	import memberlist from 'components/schedule/memberList'
	import Bus from 'assets/js/Bus.js'
	export default {
		components: {
			memberlist
		},
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			taskId: { //任务Id
				type: Number,
				default: 0
			},
			scheduleId: {
				type: Number,
				default: 0
			},
			principalId: { //执行人Id
				type: Number,
				default: NaN
			},
			type: {
				default: null
			},
			closeAll: {
				type: Boolean
			}
		},
		data() {
			return {
				//添加参与者权限
				addParticipantFlage: JSON.parse(sessionStorage.getItem('currentProjectPermissions')).projectPermissionList[16].status,
				//移除参与者权限
				removeParticipantFlage: JSON.parse(sessionStorage.getItem('currentProjectPermissions')).projectPermissionList[17].status,

				ids: [],
				shows: false,
				styles: 'top:40px;left:10px'
			}
		},
		methods: {
			getStyles(el) { //给邀请成员组件定位
				this.shows = !this.shows
				let y = el.clientY + 10,
					x = el.clientX + 6;
				this.styles = 'top:' + y + 'px;left:' + x + 'px';
			},
			getUserMsg(data) { //获取邀请成员组件发出的用户信息
				if(data.flag) {
					this.addUser(data.id)
					this.list.push(data)
				} else {
					let index = this.list.findIndex(el => {
						return el.id == data.id
					})
					this.delUser(data.id)
					this.list.splice(index, 1)
				}
			},
			//获取所有的信息
			getUsersMsg(arr) {
				let strIds = '';
				arr.userList.map(el => {
					strIds += el.id + ','
				})
				if(arr.flag) {
					arr.userList.map(el => {
						this.list.push(el)
					})
					this.addUser(strIds.substr(0, strIds.length - 1))
				} else {
					for(let i in this.list) {
						if(this.list[i].id != this.principalId) {
							this.list.splice(i, 1)
						}
					}
					this.delUser(strIds.substr(0, strIds.length - 1))
				}
			},
			//删除参与人
			delUser(id) {
				let url = '',
					parmas = {};
				if(this.type == 'schedule') {
					url = '/schedule/deleteScheduleUser';
					parmas = {
						eid: sessionStorage.getItem("enterpriseId"),
						projectId: sessionStorage.getItem("projectId"),
						userId: id,
						sid: this.scheduleId
					}
				} else {
					url = '/tasks/delTaskUser',
						parmas = {
							eid: sessionStorage.getItem("enterpriseId"),
							projectId: sessionStorage.getItem("projectId"),
							userId: id,
							taskId: this.taskId
						}
				}
				API.post(url, parmas).then(res => {
					if(res.data.code == 200) {
						this.$emit('changeUser')
					}
				})

			},
			//添加参与人
			addUser(id) {
				let url = '',
					parmas = {};
				if(this.type == 'schedule') {
					url = '/schedule/addScheduleUser';
					parmas = {
						eid: sessionStorage.getItem("enterpriseId"),
						projectId: sessionStorage.getItem("projectId"),
						userIds: id,
						sid: this.scheduleId
					}
				} else {
					url = '/tasks/addTaskUser',
						parmas = {
							eid: sessionStorage.getItem('enterpriseId'),
							pid: sessionStorage.getItem('projectId'),
							taskId: this.taskId,
							userId: id
						}
				}
				API.post(url, parmas).then(res => {
					if(res.data.code == 200) {
						this.$emit('changeUser')
					}
				})
			}
		},
		created(){
			//接收组件通信信息
			Bus.$on('toQueryProjectPermission', (msg) => {
				this.addParticipantFlage = msg.projectPermissionList[16].status
				this.removeParticipantFlage = msg.projectPermissionList[17].status
			});
		},
		watch: {
			list() {
				this.ids = []
				this.list.map(el => {
					this.ids.push(el.id)
				})
			},
			closeAll() {
				this.shows = false;
			}
		}
	}
</script>

<style scoped>
	h5 {
		margin-top: 10px;
	}
	
	.participant {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
	}
	
	.participant li {
		display: flex;
		background: #E5E5E5;
		margin-right: 10px;
		/*width: 26px;*/
		height: 26px;
		border-radius: 26px;
	}
	
	.participant .img {
		width: 24px;
		height: 24px;
		border-radius: 24px;
		background: #ffae44;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: default;
	}
	
	.close {
		display: none;
		cursor: pointer;
	}
	
	.participant li:hover .close {
		display: inline-block;
	}
	
	.addparticipant {
		font-size: 24px;
		margin-top: -4px;
		cursor: pointer;
	}
</style>