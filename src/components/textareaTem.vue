<!--文本类型的组件
	自定义close事件 关闭
	自定义send事件	传内容出去
	
	
-->
<template>
	<div style="z-index: 15;">
		<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
		<div style="display: flex;justify-content: flex-end;margin-top: 10px;">
			<el-button size="mini" @click="cancel">取消</el-button>
			<el-button type="primary" size="mini" @click="$emit('send',textarea)">确定</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			defVal:{ 		//默认内容
				type:String,
				default:''
			}
		},
		data(){
			return {
				textarea:''	
			}
		},
		methods:{
			cancel(){
				this.$emit('close');
				this.textarea=this.defVal
			}
		},
		watch:{
			defVal(){
				this.textarea = this.defVal
			}
		},
		created(){
			this.textarea = this.defVal
		}
	}
</script>

<style scoped>
</style>