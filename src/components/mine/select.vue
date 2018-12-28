<template>
	<div v-if="show" class="tasks-menu-group-float" :style="styles">
		<ul>
			<li v-for="(item,index) in selectContent" @click="sortChoose(index)">
				<span>{{item.name}}</span>
				<i v-show="index==chooseIndexNum" class="iconfont icon-duihao"></i>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			//下拉框内容
			selectContent:{
				type:Array,
				default:null
			},
			//下拉框是否显示
			show:{
				type:Boolean,
				default:false
			},
			//选中项
			chooseIndex:{
				type:Number
			},
			//下拉框相对父元素位置
			styles:{
				default:'top:0px;left:0px;width:80%'
			}
		},
		data(){
			return{
				chooseIndexNum:this.chooseIndex
			}
		},

		watch:{
			chooseIndex(newVal,oldVal){
				if(newVal!=oldVal){
					this.chooseIndexNum=this.chooseIndex;
				}
			}
		},
		methods:{
			//选中某一项
			sortChoose(index){
				this.chooseIndexNum = index;
				this.$emit('hasChooseOne',this.chooseIndexNum);
				this.chooseIndexNum = this.chooseIndex;
			}
		},
		// created() {
		//     // 点击其他不在的区域触发事件
		//     document.addEventListener('click', (e) => {
		//     	console.log(this.$el.contains(e.target.parentNode.parentNode))
		//     	if (!this.$el.contains(e.target.parentNode.parentNode)){
		//     		this.$emit('test');
		//     	}
		//     })
		// }
		
	}
</script>

<style scoped>
	.tasks-menu-group-float{
		position: absolute;
		background: #fff;
		top: 0;
		left: 0;
		display: block;
		border-radius: 4px;
		box-shadow: 0 7px 21px rgba(0,0,0,.2);
		z-index:22;
	}
	.tasks-menu-group-float li{
		padding: 10px 0 10px 20px;
		position: relative;
	}
	.tasks-menu-group-float li:hover{
		background-color: #f9f6f6;
        cursor: pointer;
	}
	.icon-duihao{
		position: absolute;
		top: 9px;
		right: 24px;
	}
</style>