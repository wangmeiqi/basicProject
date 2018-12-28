<!--事件组件
	自定义事件
		send 将时间传出去
-->
<template>
	<div>
		<div class="dateTem">
			<el-date-picker :editable="editable" v-model="dateTime" @change="changeTime" type="datetime" placeholder="待添加" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			defTime:{
				default:''
			}
		},
		data(){
			return {
				dateTime:'',
				editable:false
			}
		},
		methods:{
			changeTime(){
				this.$emit('getIndex')
				this.$emit('send',this.dateTime)
			}
		},
		created(){
			this.dateTime = this.defTime
		}
	}
</script>

<style scoped>
</style>
<style>
	.dateTem .el-input__inner{
		padding: 0 !important;
		border: none;
		width: 120px;
	}
	.dateTem .el-input--prefix{
		padding: 0 !important;
	}
	.dateTem .el-icon-time{
		display: none !important;
	}
</style>