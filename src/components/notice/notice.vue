<template>
	<div>
		<div class="notice">
			<!--头部-->
			<div class="nav clearfix">
				<div class="leftwidth">
					<el-dropdown @command="handleCommand" trigger="click">
						<span class="el-dropdown-link" style="cursor: pointer;">
								<i class="iconfont" :class="noticeIcon"></i>
							    {{tasksort}}
							    <i class="el-icon-arrow-down el-icon--right"></i>
							  	</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="0">
								<i class="iconfont icon-xiaoxi"></i> 通知
								<i v-if="checkbox1==0" class="iconfont icon-duihao"></i>
							</el-dropdown-item>
							<el-dropdown-item command="1">
								<i class="iconfont icon-xiaoxi"></i> 未读消息
								<i v-if="checkbox1==1" class="iconfont icon-duihao"></i>
							</el-dropdown-item>
							<el-dropdown-item command="2">
								<i class="iconfont icon-shijian1"></i> 稍后处理
								<i v-if="checkbox1==2" class="iconfont icon-duihao"></i>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<div class="rightwidth">
					<span class="linkTip">前往项目:运营还航运</span>
					<span class="linkTip">前往测试版</span>
					<span class="fr"><i class="iconfont icon-guanbi"></i></span>
				</div>
			</div>
			<!--内容-->
			<div class="content clearfix">
				<div class="leftwidth" style="background: #fff;">
					<ul class="noticeBox">
						<li class="noticeList">
							<p style="margin-bottom: 10px;">
								<span><i class="iconfont icon-xiaoxi"></i>&nbsp;&nbsp;任务</span>
								<el-tooltip class="item" effect="dark" content="删除信息" placement="top">
									<span class="fr close iconBol"><i class="iconfont icon-guanbi"></i></span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" content="稍后处理" placement="top">
									<span class="fr iconBol">
									<el-dropdown @command="handleCommand" trigger="click">
										<span class="el-dropdown-link">
										    <i class="iconfont icon-shijian1"></i>
										</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item command="3">20分钟后处理</el-dropdown-item>
										<el-dropdown-item command="4">1小时后处理</el-dropdown-item>
										<el-dropdown-item command="5">4下小时后处理</el-dropdown-item>
										<el-dropdown-item command="6">1天后后处理</el-dropdown-item>
										<el-dropdown-item command="7">无限期稍后</el-dropdown-item>

									</el-dropdown-menu>
									</el-dropdown>
									</span>
								</el-tooltip>
							</p>
							<div>
								<img src="../../assets/images/22登录_01.png" class="imgstyle" />
								<span>&nbsp;测试5删除日程</span>
								<span class="fr">周三 15:00</span>
							</div>
						</li>

					</ul>
					<!--仅@我的通知-->
					<p class="mytip">
						<el-checkbox v-model="checked">仅@我的通知</el-checkbox>
					</p>
				</div>
				<div class="rightwidth" style="background: #fff;">
					<div class="message-content">
						<p>无法查看日程详情</p>
						<p>测试5 删除了日程 日程1</p>
						<span class="golink">前往项目:测试测试</span>
						<span class="golink">前往项目:前往纳贡哦吃</span>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tasksort: '通知',
				checkbox1: 0,
				noticeIcon: 'icon-xiaoxi',
				checked: true
			}
		},
		methods: {
			handleCommand(command) {
				//				this.$message('click on item ' + command);
				this.checkbox1 = command
				if(command == 0) {
					this.tasksort = '通知'
					this.noticeIcon = 'icon-xiaoxi'
				} else if(command == 1) {
					this.tasksort = '未读消息'
					this.noticeIcon = 'icon-xiaoxi'
				} else if(command == 2) {
					this.tasksort = '稍后处理'
					this.noticeIcon = 'icon-shijian1'
				}

			}
		}
	}
</script>

<style scoped>
	.notice {
		position: fixed;
		width: 100%;
		top: 0;
		left: 50px;
		background: #f7f7f7;
		height: 100%;
		padding-top: 40px;
		z-index: 20;
	}
	
	.nav {
		width: 86%;
		height: 50px;
		margin: 0 auto;
		line-height: 50px;
		background: #ebebeb;
	}
	
	.content {
		width: 86%;
		height: 800px;
		margin: 0 auto;
		overflow: auto;
		/*background: #fff;*/
		margin-top: 15px;
	}
	
	.leftwidth {
		float: left;
		width: 36%;
		height: 100%;
		position: relative;
	}
	
	.rightwidth {
		margin-left: 37%;
		height: 100%;
	}
	
	.rightwidth>span {
		cursor: pointer;
	}
	
	.noticeList {
		color: #666;
		padding: 15px 10px;
		border-bottom: 1px solid #efefef;
		cursor: pointer;
	}
	
	.iconBol {
		display: none;
	}
	
	.iconBol:hover {
		color: #0a7ee9;
	}
	
	.noticeList:hover {
		background: #f7f7f7;
	}
	
	.noticeList:hover .iconBol {
		display: block;
	}
	
	.linkTip {
		display: inline-block;
		height: 30px;
		line-height: 30px;
		padding: 0 15px;
		text-align: center;
		background: #e0e0e0;
		color: #999;
		cursor: pointer;
	}
	
	.imgstyle {
		width: 30px;
		height: 30px;
		border-radius: 30px;
	}
	
	.close {
		margin-left: 15px;
	}
	
	.message-content {
		padding-top: 37%;
		text-align: center;
		background: url(../../assets/images/notice.png) no-repeat center 62%;
	}
	
	.message-content>p {
		margin-bottom: 15px;
	}
	
	.golink {
		display: inline-block;
		padding: 0 15px;
		height: 35px;
		line-height: 35px;
		color: #fff;
		background: #0a7ee9;
		margin-left: 10px;
		cursor: pointer;
	}
	
	.mytip {
		display: none;
		position: absolute;
		bottom: 18px;
		right: 36px;
		height: 32px;
		padding: 0 10px;
		line-height: 32px;
		color: hsla(0, 0%, 100%, .7);
		background-color: rgba(0, 0, 0, .7);
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		transition: all 128ms;
		border-radius: 3px;
	}
	
	.leftwidth:hover .mytip {
		display: block;
	}
</style>