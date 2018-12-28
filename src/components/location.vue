<template>
	<div style="background: #f7f7f7;">
		<div class="locationBox" v-show="getPath.length > 0">
			当前位置：
			<div v-for="(item,index) in getPath" :key="index" style="cursor: pointer;">
				<span @click="skip(index)">
					{{item.name}}<span v-if="index!=getPath.length-1">&nbsp;>&nbsp;</span>
				</span>
				<!--<div v-show="hiddenShow" v-if="item.path == '/taskType'" class="proList">
					<el-row>
						<el-col :span="24">
							<div style="margin: 0 10px;">
								<el-input v-model="searchTest" placeholder="查找项目"></el-input>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<el-col :span="24">
							<ul>
								<li class="row" @click="checked(index)" v-for="(item,index) in proList">
									<div>
										<img v-if="item.image != ''" :src="item.image"/>
										<img v-if="item.image == ''" src="../assets/images/back.png"/>
										{{item.name}}
									</div>
									<div>
										<i v-show="item.checked" class="iconfont icon-duihao"></i>
									</div>
								</li>
							</ul>
						</el-col>
					</el-row>
				</div>-->
			</div>
			<div v-if="showHidden">
				<task-info></task-info>
			</div>
		</div>
		
	</div>
</template>

<script>
	import {mapMutations, mapGetters} from 'vuex'
	import taskInfo from 'view/taskType/taskInfo'
	import API from 'api/http'
	export default {
		components:{
			taskInfo
		},
		data(){
			return {
				showHidden:false,
				arr:["首页","成员"],
				searchTest:'',
				hiddenShow:false,
				proList:[],
				proListData:[]
			}
		},
		methods:{
			skip(index){
				if(index < this.getPath.length - 1){
					this.$router.push({
						path: this.getPath[index].path
					})
					this.popPath(index+1)
				}else if(index == this.getPath.length-1){
					this.hiddenShow = !this.hiddenShow
				}
			},
			//选中
			checked(index){
				let oldIndex
				oldIndex = this.proList.findIndex(el => {
					return el.checked == true
				})
				this.proList[oldIndex].checked = false
				this.proList[index].checked = true
				this.setProId(this.proList[index].id)
				this.hiddenShow = !this.hiddenShow
				
				this.popPath(1)
				this.addPath({
					name:this.proList[index].name,
					path:'/taskType'
				})
			},
			//获取所有项目
			getAllProject(){
				API.get('/projects/getProjectList', {
					eid:sessionStorage.getItem('enterpriseId')
				}).then(res => {
					this.proList = []
					this.proListData = []
					res.data.data.map((el,index) => {
						if(el.id == this.getPath[this.getPath.length-1].id){
							this.$set(el,'checked',true);
						}else{
							this.$set(el,'checked',false);
						}
						this.proList.push(el)
						this.proListData.push(el)
					})
				})
			},
			...mapMutations({
				addPath:'ADD_PATH',
				popPath:'POP_PATH',
				setBackHome: 'SET_BACKHOME',
				setProId: 'SET_PROJECTID'
			}),

		},

		computed:{
			...mapGetters({
				getPath:'GET_PATH',
				getBackHome: 'GET_BACKHOME',
				getProId: 'GET_PROJECTID'
			})
		},
		watch:{
			getProId(){
				this.getAllProject()
			},
			getPath(){
				sessionStorage.setItem('path',JSON.stringify(this.getPath))
				if(this.getPath.length != 0){
					this.showHidden = (this.getPath[1].path == '/taskType')
					if(this.getPath[1].path != '/management'){
						this.setBackHome(true)
					}
				}
				
			},
			searchTest(){
				if(this.searchTest != ''){
					this.proList = this.proListData.filter(el => {
						if(el.name.indexOf(this.searchTest) > -1){
							return true
						}
					})
				}else{
					this.proList = []
					this.proListData.map(el => {
						this.proList.push(el)
					})
				}
			}
		},
		created(){
//			this.addPath({
//				path:'/index',
//				name:'首页'
//			})
			sessionStorage.setItem('path',JSON.stringify(this.getPath))
			this.getAllProject()
		}
	}
</script>

<style scoped lang="scss">
@import '../common/scss/color';
	.locationBox{
		padding-left: 33px;
		height: 50px;
		background: $backGroundColor;
		margin-top: 75px;
		margin-left: 50px;
		display: flex;
		align-items: center;
		color: gray;
		font-size: 10px;
		position: relative;
	}
	
	.proList{
		padding: 10px 0;
		position: absolute;
		width: 300px;
		height: 76vh;
		background: white;
		z-index: 10;
		top: 55px;
		left: 4px;
		border-radius: 5px;
		box-shadow: 0px 0px 10px #E1E1E1;
		overflow: auto;
	}

	.row{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
	}
	.row:hover{
		background: #E1E1E1;
	}
	.row img{
		margin-right: 10px;
		width: 100px;
		height: 50px;
		border-radius: 2px;
		background: #E1E1E1;
	}
</style>
