<template>
	<div>
		<div class="box" v-show="show" @click.stop="show=show">
			<div class="search" v-if="search">
				<el-input v-model="searchStr" placeholder="查找"></el-input>
			</div>
			<ul>
				<li v-for="item in dataList" @click="clickEL(item.id,item.name)">
					<div>{{item.name}}</div>
					<div>
						<i v-show="projectId==item.id" class="iconfont icon-duihao"></i>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			search:{
				type:Boolean,
				default:false
			},
			show:{
				type:Boolean,
				default:false
			},
			list:{
				type:Array,
				default:()=>{
					return []
				}
			},
			proId:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				searchStr:'',		//查询条件
				projectId:0,
                dataList:''
			}
		},
		methods:{
			//点击元素
			clickEL(id,name){
				this.projectId = id;
				this.$emit('sendMsg',{
					id:id,
					name:name
				});
				this.$emit('close');
			}
		},
		watch:{
			show(val){
				if(val){
					this.projectId = this.proId
				}
			},
            list(){
                this.dataList = this.list;
            },
            searchStr(val){
                if(val != ''){
                    this.dataList = []
                    this.list.map(el => {
                        if(el.name.indexOf(val) > -1){
                            this.dataList.push(el)
                        }
                    })
                }else{
                    this.dataList = []
                    this.list.map(el => {
                        this.dataList.push(el)
                    })
                }
            }
		}
	}
</script>

<style scoped>
	.box{
		width: 200px;
		height: 180px;
		position: fixed;
		background: white;
		overflow: auto;
		box-shadow: 0 0 10px #999999;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.box::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.box::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.box::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}
	.box li{
		padding: 0 15px;
		height: 34px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.box li:hover{
		background: #EFEFEF;
	}
</style>
