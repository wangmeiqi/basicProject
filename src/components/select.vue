<template>
	<!--单选多选组建
		自定义事件 
			radiosend 传选项的名字出去
			checksend 传所有选项出去并用，分隔
	-->
	<div>
		<div class="selectBox" :style="styles" v-show="show" @click.stop="show=show">
			<ul>
				<li v-if="types=='radio'" @click="clickItem(-1)">
					<div>（空）</div>
					<div>
						<i v-if="radioIndex==-1" class="iconfont icon-duihao"></i>
					</div>
				</li>
				<li v-for="(item,index) in selectList" @click="clickItem(index)">
					<div>
						{{item.name}}
					</div>
					<div>
						<i v-if="types=='radio'&&radioIndex==index" class="iconfont icon-duihao"></i>
						<i v-if="types=='checked' && item.checked" class="iconfont icon-duihao"></i>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			defVal:{			//默认内容
				type:String,
				default:''
			},
			show:{				//是否显示
				type:Boolean,
				default:false
			},
			types:{				//什么类型
				default:'radio'		//单选是radio，多选是checked
			},
			selectList:{		//传入选项
				type:Array,
				default:()=>{
					return []
				}
			},
			styles:{
				default:'top:0px;left:0px'
			}
		},
		data(){
			return {
				radioIndex:0
			}
		},
		methods:{
			clickItem(index){
				if(this.types == 'radio'){
					this.radioIndex = index
					if(index == -1){
						this.$emit('radiosend','')
					}else{
						this.$emit('radiosend',this.selectList[index].name)
					}
				}else if(this.types == 'checked'){
					console.log(this.selectList)
					if(this.selectList[index].checked){
						this.selectList[index].checked = false
					}else{
						this.selectList[index].checked = true
					}
				}
				
			}
		},
		watch:{
			show(){
				if(!this.show){
					let strs = '';
					this.selectList.map(el => {
						if(el.checked==true){
							strs += el.name + ','
						}
					})
					this.$emit('checksend',strs.substr(0,strs.length-1))
				}
			},
			selectList(){
				if(this.types == 'radio'){
					this.radioIndex = this.selectList.findIndex(el => {
						return el.name == this.defVal
					})
				}else if(this.types == 'checked'){
					let arr = this.defVal.split(',');
					console.log(arr)
					this.selectList.map(el => {
						arr.map(li => {
							if(el.name == li){
								el.checked = true
							}
						})
					})
				}
			}
		}
	}
</script>

<style scoped>
	.selectBox{
		width: 160px;
		height: auto;
		box-shadow: 0 0 10px #E1E1E1;
		z-index: 15 !important;
		background: white;
	}
	.selectBox li{
		height: 30px;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.selectBox li:hover{
		background: #F2F2F2;
	}
</style>