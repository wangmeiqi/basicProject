<template>
	<div>
		<el-row>
			<el-col :span="12">
				<el-input v-model="val" placeholder="请输入内容" size="mini"></el-input>
			</el-col>
			<el-col :span="12">
				<el-button style="margin-left: 20px;" size="mini" @click="$emit('close');val=defVal">取消</el-button>
				<el-button type="primary" size="mini" @click="$emit('send',val)">确定</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		props:{
			defVal:{
				type: String,
				default: ''
			}
		},
		data(){
			return {
				val:''
			}
		},
		watch:{
			defVal(value){
				this.val = value
			}
		},
		created(){
			this.val = this.defVal
		}
	}
</script>

<style scoped>
</style>