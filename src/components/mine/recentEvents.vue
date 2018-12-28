<template>
	<div v-show="show">
		<div class="my-content-wrap">
			<div class="my-content card my-wrap">
				<section class="my-recent-view my-content-view fade in">
					<!--今天的事-->
					<div class="today-tasks">
						<h3 class="title"> 近期的事 · 
							<span v-if="enentList.length==0" class="count">0</span>
							<span v-else class="count">{{enentList.length}}</span>
						</h3>
						<taskList :taskDataList="enentList" :imgBol='false' @getDataAgain="getDataAgain"></taskList>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	import taskList from 'components/mine/taskList'
	export default{
		props:{
			show:{
				type:Boolean,
				default:false
			},
			enentList:{
				type:Array,
				default:null
			}
		},
		data(){
			return{
			}
		},
		components:{
			taskList
		},
		methods:{
			//勾选了未完成任务，更新近期的事任务列表
			getDataAgain(){
				this.$emit('getRecentData');
			}
		}

	}
</script>

<style scoped>
	.my-content-wrap{
		position: absolute;
	    width: 100%;
	    padding-top: 20px;
	    background: #f7f7f7;
	    height: 80vh;
	    overflow: auto;
	}
	.my-content{
		position: relative;
	    margin: 0 auto;
	    width: 90%;
	    height: 100%;
	    background: #fff;
	}
	.my-content .my-content-view.my-recent-view {
	    overflow-y: auto;
	}
	.my-content-wrap .my-content .my-content-view {
	    height: 100%;
	}
	.my-content-wrap .my-content h3 {
	    margin: 0 20px;
	    padding: 13px 0;
	    line-height: 20px;
	    font-size: 16px;
	    border-bottom: 2px solid #e5e5e5;
	}
	.title{
		color:#A8A8A8;
		font-weight:normal;
	}
</style>