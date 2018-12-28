<template>
	<div class="commentListBox">
		<!--<div class="selectBox">
			<el-select v-model="value" placeholder="所有成员" class="selects">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>-->

		<ul class="listBox">
			<li v-for="(val,index) in allList">
				<img v-if="val.user.user_img == ''" class="headImg" src="../../assets/images/22登录_01.png" />
				<img v-else class="headImg" :src="val.user.user_img" />
				<div class="contentsBox">
					<div class="namesBox">
						<span class="names">{{val.user.username}}</span>
						<span class="times">{{val.createTime | formatDate}}</span>
					</div>
					<div class="texts" v-html="val.content">
						<!--{{val.content}}-->
					</div>
				</div>
				<div class="editsBox">
					<!--<span class="editBtn"></span>-->
					<span v-if="userIds == val.user.id" class="closeBtn" @click="delCommentFun(val.coid)"></span>
				</div>

			</li>
		</ul>
	</div>
</template>

<script>
	import API from 'api/http'
	import Bus from 'assets/js/Bus.js'
	import {formatDate} from 'assets/js/date.js';
	export default {
		name: '',
		props: {
			proId: { //任务id
				type: Number
			}
		},
		components: {},
		data() {
			return {
				userIds:sessionStorage.getItem('userId'),
				allList: []
			}
		},
		methods: {
			//获取评论列表信息
			commentListFun() {
				API.get('/Report/findProComment', {
					proId: this.proId
				}).then(res => {
					console.log('评论列表2323232323322222222222222', res.data.data)
					this.allList = res.data.data
				})
			},
			//删除本条评论
			delCommentFun(msg) {
				API.get('/Report/delComment', {
					commentId: msg
				}).then(res => {
					console.log('resmmmmmmmmmmmmm',res)
					if(res.data.message == "SUCCESS") {
						API.get('/Report/findProComment', {
							proId: this.proId
						}).then(res => {
							this.allList = res.data.data
						})
					}

				})
			}
		},
		created(){
			Bus.$on('oncommentfun', (msg) => {
				this.allList = msg
			});
		},
		watch: {
			proId() {//监听数据发生改变 
				this.commentListFun()
			}
		},
		//时间格式转换过滤器
		filters: {
			formatDate: function(time) {
				var date = new Date(time);
            	return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commentListBox {
		border: 1px solid #eee;
		background: #fff;
		padding: 15px;
		.selectBox {
			height: 40px;
			padding-bottom: 10px;
			.selects {
				width: 120px;
				float: right;
			}
		}
		.listBox li {
			display: flex;
			min-height: 60px;
			padding: 5px 0 5px 60px;
			position: relative;
			img.headImg {
				flex: none;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				position: absolute;
				top: 50%;
				margin-top: -20px;
				left: 7px;
			}
			.contentsBox {
				flex: auto;
				.namesBox {
					height: 30px;
					line-height: 30px;
					.names {
						font-size: 18px;
						color: #999;
						padding-right: 20px;
					}
					.times {
						font-size: 14px;
						color: #a0a0a0;
					}
				}
				.texts {
					word-break:break-all;
					line-height: 24px;
					font-size: 14px;
					color: #333;
				}
			}
			.editsBox {
				display: none;
				flex: none;
				position: relative;
				width: 80px;
				.editBtn,
				.closeBtn {
					flex: none;
					width: 30px;
					height: 30px;
					position: absolute;
					top: 50%;
					left: 0;
					margin-top: -15px;
					cursor: pointer;
					background: url(../../assets/images/qianbi.png) no-repeat center center;
				}
				.closeBtn {
					left: 40px;
					background: url(../../assets/images/差号.png) no-repeat center center;
				}
			}
		}
		.listBox li:hover {
			background: #eee;
			.editsBox {
				display: flex;
			}
		}
	}
</style>