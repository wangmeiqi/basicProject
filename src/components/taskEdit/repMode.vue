<!--
	任务重复组建
	传入任务id 可以改变相应任务的重复状态
	show传入一个布尔值 控制显示与隐藏
-->
<template>
	<div>
		<div class="repMode" v-show="show">
			<ul>
				<li v-for="(mode,index) in repMode" @click="clickItem(index)">
					<div>{{mode.mode}}</div>
					<div>
						<i v-if="mode.checked" class="iconfont icon-duihao"></i>
					</div>
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
				default: false
			},
			taskId:{
				type:Number,
				default: 85
			}
		},
		data(){
			return {
				repMode:[{			//重复方式
					mode:'不重复',
					checked:true,
				},{
					mode:'每天重复',
					checkde:false
				},{
					mode:'每周重复',
					checked:false
				},{
					mode:'每月重复',
					checked:false
				},{
					mode:'每年重复',
					checked:false
				},{
					mode:'工作日重复',
					checked:false
				}]
			}
		},
		methods:{
			clickItem(index){
				let oldIndex = this.repMode.findIndex(el => {
					return el.checked == true
				})
				this.repMode[oldIndex].checked = false
				this.repMode[index].checked = true
				
			}
		},
		created(){
			for(let i in this.repMode) {
				this.repMode[i].checked = false
			}
			this.repMode[0].checked = true
		}
	}
</script>

<style scoped>
	.repMode{
		width: 190px;
		box-shadow: 0 0 10px #E1E1E1;
		padding: 20px 0px;
	}
	.repMode li{
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 30px;
		cursor: pointer;
	}
	.repMode li:hover{
		background: #F2F2F2;
	}
</style>