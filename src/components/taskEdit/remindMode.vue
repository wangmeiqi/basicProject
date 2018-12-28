<template>
	<!--提醒组件-->
	<div>
		<div class="remindModeBox" v-show="show">
			<ul>
				<li v-for="(item,index) in remindModeList" @click.stop="clickItem(index)">
					<div>{{item.mode}}</div>
					<div>
						<i v-if="item.checked" class="iconfont icon-duihao"></i>
					</div>
				</li>
				<li>
					<div>提醒谁 · {{memberList.length}}</div>
					<div></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:[]
			}
		},
		data(){
			return {
				remindModeList:[{
					mode:'不提醒',
					showUsers:false,
					checked:true
				},{
					mode:'任务截止时提醒',
					showUsers:true,
					checked:false
				},{
					mode:'任务开始时提醒',
					showUsers:true,
					checked:false
				},{
					mode:'自定义时间',
					showUsers:true,
					checked:false
				}],
				memberList:[]
			}
		},
		methods:{
			clickItem(index){
				let oldIndex = this.remindModeList.findIndex(el => {
					return el.checked == true
				})
				this.remindModeList[oldIndex].checked = false
				this.remindModeList[index].checked = true
				
			}
		}
	}
</script>

<style scoped>
	.remindModeBox{
		width: 190px;
		box-shadow: 0 0 10px #E1E1E1;
		padding: 20px 0px;
	}
	.remindModeBox li{
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 30px;
		cursor: pointer;
	}
	.remindModeBox li:hover{
		background: #F2F2F2;
	}
</style>