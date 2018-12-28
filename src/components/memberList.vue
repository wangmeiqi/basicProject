<!--
	添加成员控件
-->
<template>
	<div>
		<div class="memberListBox" @click.stop="show=show" v-show="show" :style="styles">
			<div class="search">
				<el-input v-model="searchInput" placeholder="查找成员"></el-input>
			</div>
			<ul>
				<li class="memberRow" @click="clickTopOption">
					<div>
						<div class="img" style="background: gray;">
							<i v-if="type=='radio'" class="iconfont icon-wode"></i>
							<i v-if="type=='checked'" class="iconfont icon-renyuan"></i>
						</div>
						<span>{{type=='radio'?'待认领':'所有成员'}}</span>
					</div>
					<div>
						<i v-show="topOption" class="iconfont icon-duihao"></i>
					</div>
				</li>
				<li class="memberRow" v-for="(member,index) in memberListMol" @click="clickOption(index)">
					<div>
						<img class="img" v-if="member.user_img !=''" :src="member.user_img"/>
						<div class="img" v-if="member.user_img ==''">
							{{member.username[0]}}
						</div>
						{{member.username}}
					</div>
					<div>
						<i v-show="member.checked" class="iconfont icon-duihao"></i>
					</div>
				</li>
				<!--<li class="memberRow" @click="addMembershow=!addMembershow">
					<div>
						<i class="iconfont icon-add" style="font-size: 24px;margin-right: 6px;color: #077ce7;"></i>
						<span class="addMember">添加新成员</span>
					</div>
				</li>-->
			</ul>
		</div>
		<addmember :show="addMembershow" @close="addMembershow=false"></addmember>
	</div>
</template>

<script>
	import API from 'api/http'
	import ARR from 'api/arr'
	import addmember from 'components/addMember'
	export default {
		components:{
			addmember
		},
		data(){
			return {
				searchInput:'',		//查找成员的文本框对应的值
				memberList:[], 		//成员列表
				memberListMol:[],
				topOption:false,	//待认领或者
				radioIndex:0,		//单选之前选中的下标
				checkNum:0,			//是否全选的
				userId:0,			//执行者Id
				addMembershow:false,//控制添加成员弹出层是否显示
			}
		},
		props:{
			styles:{
				type:String,
				default:''
			},
			show:{
				type:Boolean,
				default:false
			},
			type:{
				type:String,
				default:'radio'   //radio 是单选类型  checked 是多选类型
			},
			ids:{
				type:Array,
				default:()=>{
					return []
				}
			},
			taskId:{
				type:Number,
				default:0
			},
			principalId:{
				default:NaN
			}
		},
		methods:{
			//获取成员列表
			getMemberList(){
				API.get('/projects/getUserByPid', {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId')
				}).then(res => {
					this.memberList = [];
					this.memberListMol = [];
					if(this.ids[0] != 0){
						this.radioIndex = res.data.data.findIndex(el => {
							return el.id == this.ids[0]
						})
					}
					res.data.data.map(el => {
						if(this.ids.indexOf(el.id) > -1 || el.id == this.principalId){
							this.$set(el,'checked',true);
							this.checkNum++
						}else{
							this.$set(el,'checked',false);
						}
						this.memberList.push(el);
						this.memberListMol.push(el);
					})
				})
			},
			clickTopOption(){ //点击所有成员或者代认领
				if(this.type == 'radio'){
					if(this.topOption){
						this.topOption = false;
						this.memberList[this.radioIndex].checked = true;
					}else{
						this.topOption = true;
						this.memberList[this.radioIndex].checked = false;
					}
					ARR.clear(this.ids)
					this.ids.push(0)
					this.updateMemberList()
					this.$emit('colse');
				}else if(this.type == "checked"){
					let arr = [];
					if(this.topOption){
						if(isNaN(this.principalId)){
							this.checkNum = this.ids.length
						}else{
							this.checkNum = 1
						}
						this.topOption = false
						this.memberList.map((el,index) => {
							if(el.id != this.principalId){
								el.checked = false
							}
						})
					}else{
						this.checkNum = this.memberList.length
						this.topOption = true
						this.memberList.map(el => {
							if(el.id != this.principalId){
								el.checked = true
							}
						})
					}
					ARR.clear(this.ids)
					this.memberList.map(el => {
						if(el.checked){
							this.ids.push(el.id)
							if(el.id != this.principalId){
								arr.push({
									id:el.id,
									username:el.username,
									user_img:el.user_img,
									checked:el.checked
								})
							}
							
						}else{
							if(el.id != this.principalId){
								arr.push({
									id:el.id,
									username:el.username,
									user_img:el.user_img,
									checked:el.checked
								})
							}
						}
					})
					this.$emit("allmsg",{
						flag:this.topOption,
						userList:arr
					})
				}
			},
			clickOption(index){ //点击选项
				console.log(555555)
				if(this.type == 'radio'){
					this.memberList[this.radioIndex].checked = false;
					this.memberList[index].checked = true;
					this.radioIndex = index;
					this.topOption = false;
					this.$emit('colse');
				}else if(this.type == 'checked'){
					if(this.memberList[index].checked){
						if(this.memberList[index].id != this.principalId){
							this.memberList[index].checked = false;
							this.checkNum--;
						}
					}else{
						this.memberList[index].checked = true;
						this.checkNum++;
					}
				}
				ARR.clear(this.ids)
				this.memberList.map(el => {
					if(el.checked){
						this.ids.push(el.id)
					}
				})
				this.updateMemberList(index,this.memberList[index].checked)
			},
			updateMemberList(index,flag){
				if(this.type == 'radio'){    //radio 操作会返回 一个对象 有id、username、userImg这些属性
					if(isNaN(this.taskId)){
						if(this.ids[0] == 0){
							this.$emit('send',{
								id:'',
								username:'',
								userImg:''
							})
						}else{
							this.$emit('send',{
								id:this.memberList[this.radioIndex].id,
								username:this.memberList[this.radioIndex].username,
								userImg:this.memberList[this.radioIndex].user_img
							})
						}
					}else{
						API.post('/tasks/updTaskImplementUser',{
							eid: sessionStorage.getItem('enterpriseId'),
							pid: sessionStorage.getItem('projectId'),
							taskId: this.taskId,
							implementUser: this.ids[0]
						}).then(res => {
							if(this.ids[0] == 0){
								this.$emit('send',{
									id:'',
									username:'',
									userImg:''
								})
							}else{
								this.$emit('send',{
									id:this.memberList[this.radioIndex].id,
									username:this.memberList[this.radioIndex].username,
									userImg:this.memberList[this.radioIndex].user_img
								})
							}
							
						})
					}
					
				}else if(this.type == 'checked'){ //checked 操作会返回 一个对象 有id、username、userImg这些属性
					let idsStr = ''
					for(let i in this.ids){
						idsStr+=this.ids[i]+','
					}
					if(this.memberList[index].id != this.principalId){
						this.$emit('send',{
							id:this.memberList[index].id,
							username:this.memberList[index].username,
							user_img:this.memberList[index].user_img,
							checked:this.memberList[index].checked,
							ids:idsStr.substr(0,idsStr.length-1),
							flag:flag
						})
					}
					
//						API.post('/tasks/addTaskUser', {
//							eid: sessionStorage.getItem('enterpriseId'),
//							pid: sessionStorage.getItem('projectId'),
//							taskId: this.taskId,
//							userId: idsStr.substr(0,idsStr.length-1)
//						}).then(res => {
//							if(this.memberList[index].id != this.principalId){
//								
//							}
//						})
				}
			}
		},
		watch:{
			checkNum(){
				console.log(this.checkNum)
				if(this.checkNum == this.memberList.length){
					if(this.checkNum!=0 && this.type != 'radio'){
						this.topOption = true;
					}
				}else{
					if(this.type != 'radio'){
						this.topOption = false;
					}
				}
			},
			show(){
				if(this.show){
					this.checkNum = 0
					this.getMemberList()
					if(this.ids[0] == 0){
						this.topOption = true
					}
					this.userId = this.ids[0]
				}
			},
			principalId(val,valOld){
				console.log(val + '___' + valOld)
				if(!isNaN(valOld)){
					ARR.clear(this.ids)
				}
			},
			searchInput(val){
				if(val != ''){
					this.memberListMol = []
					this.memberList.map(el => {
						if(el.username.indexOf(val) > -1){
							this.memberListMol.push(el)
						}
					})
				}else{
					this.memberListMol = []
					this.memberList.map(el => {
						this.memberListMol.push(el)
					})
				}
			}
		}
	}
</script>

<style scoped>
	.memberListBox{
		width: 200px;
		height: 150px;
		box-shadow: 0 0 10px #E1E1E1;
		padding: 10px 0px;
		position: fixed;
		z-index: 200;
		background: white;
		overflow: auto;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.memberListBox::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.memberListBox::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.memberListBox::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}

	.memberRow{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 10px;
	}
	.search{
		padding: 0 10px;
	}
	.memberRow:hover{
		background: #F1F1F1;
	}
	.memberRow>div:nth-child(1){
		display: flex;
		align-items: center;
	}
	.memberRow .img{
		width: 24px;
		height: 24px;
		border-radius: 30px;
		box-shadow: 0 0 10px #E1E1E1;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ffae44;
		color: white;
		margin-right: 6px;
	}
	.addMember{
		color: #077ce7;
	}
	.addMember:hover{
		font-weight: bold;
	}
</style>