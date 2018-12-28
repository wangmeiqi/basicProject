<template>
	<!--统计-->
	<div>
		<div class="">
			<div class="bigbox">
				<div class="smallbox">
					<!--项目总数-->
					<div class="echart1 clearfix">

						<div class="Number_info">
							<p class="p35">
								<i class="iconfont icon-icon-test12" style="color: #fff;"></i>
								<span>项目总数</span>
							</p>
							<p class="count">{{projectCount}}</p>
						</div>
						<div class="chartBox" id="myChart1" :style="{width: '69%', height: '200px'}">

						</div>
					</div>
					<!--成员总数-->
					<div class="echart2 clearfix">
						<div class="Number_info">
							<p class="p35">
								<i class="iconfont icon-renyuan"></i>
								<span>成员总数</span>
							</p>
							<p class="count">{{memberCount}}</p>
						</div>
						<div class="chartBox" id="myChart2" :style="{width: '69%', height: '200px'}">

						</div>
					</div>
					<!--成员活跃度-->
					<div class="echart3 clearfix">
						<div class="Number_info">
							<p class="p35">
								<i class="iconfont icon-huoyuedu"></i>
								<span>成员活跃度</span>
							</p>
							<p class="count">{{memberLives}}</p>
						</div>
						<div class="chartBox" id="myChart3" :style="{width: '69%', height: '200px'}">

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import api from 'api/http'
	import Bus from 'assets/js/Bus.js'
	export default {
		data() {
			return {
				// 查看企业所有项目权限
				lookAllProject: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[6].status,

				projectCount: '', //项目总数
				memberCount: '', //成员总数
				memberLives: '', //成员活跃度
				xAxisProject: [], //项目x轴坐标
				yAxisProject: [], //项目y轴
				xAxisMember: [], //成员x轴坐标
				yAxisMember: [], //成员y轴
				xAxisMemberLive: [], //成员活跃度x轴坐标
				yAxisMemberLive: [], //成员活跃度y轴
			}
		},
		mounted() {

			this.drawLine();

		},
		methods: {
			drawLine() {
				let eid = sessionStorage.getItem('enterpriseId'); //企业id
				let params = {
					eid: eid,
					sign:this.lookAllProject,
				}
				//项目总数
				api.get('/Count/getProjectCount', params).then(res => {
					let projectList = res.data.data
					this.projectCount = projectList[12].total //项目总数
					for(var i = 0; i < projectList.length; i++) {
						this.xAxisProject.push(projectList[i].dateTime)
						this.yAxisProject.push(projectList[i].total)
					}

				}).then(res => {
					// 基于准备好的dom，初始化echarts实例
					let myChart = this.$echarts.init(document.getElementById('myChart1'))
					// 绘制图表
					myChart.setOption({
						tooltip: {
							triggerOn: 'onmousemove',
							trigger: 'axis',
							axisPointer:{
								type:'none'
							}
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							scale: false,
							show: false,
							splitLine: {　　　　
								show: false　　
							},
							data: this.xAxisProject
						},
						yAxis: {
							type: 'value',
							scale: true,
							show: false,
							splitLine: {　　　　
								show: false　　
							}
						},
						series: [{
							data: this.yAxisProject,
							type: 'line',
							smooth: true,
							symbolSize:0,
							itemStyle: {
								normal: {
									color: "#fff",
									lineStyle: {
										color: "#fff"
									}
								}
							}

						}]
					});
				})
				//成员总数
				api.get('/Count/getUserCount', params).then(res => {
					let memberList = res.data.data
					this.memberCount = memberList[12].total //项目总数
					for(var j = 0; j < memberList.length;j++) {
						this.xAxisMember.push(memberList[j].dateTime)
						this.yAxisMember.push(memberList[j].total)
					}

				}).then(res => {
					// 基于准备好的dom，初始化echarts实例
					let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
					// 绘制图表
					myChart2.setOption({
						tooltip: {
							triggerOn: 'onmousemove',
							trigger: 'axis',
							axisPointer:{
								type:'none'
							}
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							scale: false,
							show: false,
							splitLine: {　　　　
								show: false　　
							},
							data: this.xAxisMember
						},
						yAxis: {
							type: 'value',
							scale: true,
							show: false,
							splitLine: {　　　　
								show: false　　
							}
						},
						series: [{
							data: this.yAxisMember,
							type: 'line',
							smooth: true,
							symbolSize:0,
							itemStyle: {
								normal: {
									color: "#fff",
									lineStyle: {
										color: "#fff"
									}
								}
							}

						}]
					});
				})

				//成员活跃数
				api.get('/Count/getEnterpriseCountNew', params).then(res => {
					let memberLivesList = res.data.data
					this.memberLives = memberLivesList[7].total //项目总数
					for(var k = 0; k < memberLivesList.length-1; k++) {
						this.xAxisMemberLive.push(memberLivesList[k].dateTime)
						this.yAxisMemberLive.push(memberLivesList[k].total)
					}

				}).then(res => {
					// 基于准备好的dom，初始化echarts实例
					let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
					// 绘制图表
					myChart3.setOption({
						tooltip: {
							triggerOn: 'onmousemove',
							trigger: 'axis',
							axisPointer:{
								type:'none'
							}
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							scale: false,
							show: false,
							splitLine: {　　　　
								show: false　　
							},
							data: this.xAxisMemberLive
						},
						yAxis: {
							type: 'value',
							scale: true,
							show: false,
							splitLine: {　　　　
								show: false　　
							}
						},
						series: [{
							data: this.yAxisMemberLive,
							type: 'line',
							smooth: true,
							symbolSize:0,
							itemStyle: {
								normal: {
									color: "#fff",
									lineStyle: {
										color: "#fff"
									}
								}
							}

						}]
					});
				})

			}
		},
		created() {
			//接收组件通信信息
			Bus.$on('toCurrentRolePermissions', (msg) => {
				this.lookAllProject = msg.enterprisePermissionList[6].status
			});

		}
	}
</script>
<style scoped>
	.bigbox {
		width: 100%;
	}
	
	.smallbox {
		margin: 0 30px;
		height: 200px;
		justify-content: center;
		flex-direction: row;
		margin-bottom: 20px;
		font-size: 14px;
		color: #fff;
	}
	
	.echart1,
	.echart2,
	.echart3 {
		height: 200px;
		border-radius: 4px;
		width: 32.7%;
		float: left;
		box-sizing: border-box;
	}
	
	.echart1 {
		background: #6ba1f4;
	}
	
	.echart2 {
		background: #e57e91;
		margin: 0 10px;
	}
	
	.echart3 {
		background: #87c5ba;
	}
	
	.p35 {
		padding: 55px 0 0 20px;
		font-size: 14px;
	}
	
	.Number_info {
		width: 31%;
		height: 140px;
		float: left;
		font-size: 30px !important;
		font-weight: 600;
		color: #FFFFFF;
	}
	
	.pic {
		width: calc(100% - 134px);
		height: 140px;
		float: left;
	}
	
	.count {
		box-sizing: border-box;
		padding: 20px 0 0 40px;
	}
	
	.chartBox {
		float: left;
	}
</style>