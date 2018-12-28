<!--时间类型控件
	自定义事件
		close 	关闭
		send 	将数字传出去
-->
<template>
	<div>
		<div v-show="show">
			<el-input-number v-model="num" controls-position="right" size="mini"></el-input-number>
			<el-button size="mini" style="margin-left: 10px;" @click="$emit('close')">取消</el-button>
			<el-button type="primary" size="mini" @click="$emit('send',num)">确定</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			defNum:{			//默认的数字
				default:0
			},
			show:{				//是否显示
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				num:0
			}
		},
		watch:{
			defNum(){
				this.num = this.defNum
			}
		},
		created(){
			this.num = this.defNum
		}
	}
</script>

<style scoped>
	
</style>