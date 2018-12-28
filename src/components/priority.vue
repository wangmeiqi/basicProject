<template>
	<!--优先级组建-->
	<div>
		<div class="priorityList" :style="styles">
			<ul>
				<li v-for="(item,index) in priorityList">
					<div :class="{info:index==0,yellow:index==1,red:index==2}" @click="clickItem(index)">
						{{item.name}}
					</div>
					<div>
						<i v-show="index==itemindex" class="iconfont icon-duihao"></i>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props:{			//传入内容
			itemIndex:{
				default:0
			},
			styles:{	//传入显示位置
				type:String,
				default:'top:30px;left:106px'
			}
		},
		data(){
			return {
				priorityList:[{
					name:'普通',
					checked:true
				},{
					name:'紧急',
					checked:false
				},{
					name:'非常紧急',
					checked:false
				}],
				itemindex:0
			}
		},
		methods:{
			clickItem(index){
				this.itemindex=index
				this.$emit('sendIndex',index+1)
			}
		},
		watch:{
			itemIndex(){
				this.itemindex = this.itemIndex-1
			}
		},
		created(){
			this.itemindex = this.itemIndex-1
		}
	}
</script>

<style scoped>
	.priorityList{
		width: 185px;
		height: auto;
		box-shadow: 0 0 10px #E1E1E1;
		padding: 10px 0;
		position: absolute;
		background: white;
		z-index: 12;
		border-radius: 4px;
	}
	.priorityList li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
	}
	.priorityList li>div{
		margin: 0 10px;
	}
	.priorityList li>div:nth-child(1){
		padding: 4px 10px;
		border-radius: 4px;
		cursor: pointer;
	}
	.red{
		color: #ef5520;
		border: 1px solid #ef5520;
	}
	.info{
		border: 1px solid #999999;
	}
	.yellow{
		color: #ffae44;
		border: 1px solid #ffae44;
	}
</style>