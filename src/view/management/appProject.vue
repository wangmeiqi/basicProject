<template>
	<div>
		<div class="corporateAuthority-head">
			<p>项目权限</p>
			<a class="addBox" @click="addCustomRole" v-if="addFlage">添加自定义角色</a>
			<a class="addBox defAdd" v-if="defAddFlage">添加自定义角色</a>
		</div>
		<div class="corporateAuthority-body">
			<div class="width-limited">
				<!--左侧部分-->
				<div class="left-wrap">
					<div class="left-wrap-head"></div>
					<div class="left-wrap-box">
						<template v-for="(val,index) in projectList" v-if='index<=5'>
							<div :class="index == 0?'group-gap-active group-gap active flagss'+index:'group-gap-active group-gap flagss'+index" v-show="val.id == index+1">{{val.name}}</div>
							<div :class="index == 0?'flageActive active flagss'+index:'flageActive flagss'+index">
								<template v-for="val in projectList">
									<div class="permission-item" v-if="val.pid == index+1">{{val.name}}</div>
								</template>
							</div>
						</template>
					</div>
				</div>
				<!--右侧部分-->
				<div class="right-wrap">
					<div class="right-wrap-list" v-for="(item,indexs) in roleList">
						<template v-if="indexs >2">
							<div class="right-wrap-head right-wrap-head-edit" @click="clickFlags && editRoleFun(indexs)" v-if="item.roleName != ''">
								{{item.roleName}}<img src="../../assets/images/xiajiantou.png" alt="" />
								<div class="editBox" v-if="editRoleFlage == indexs">
									<p class="def" v-if="0"><img src="../../assets/images/所有成员.png" />设为默认角色</p>
									<p class="edit" @click="editCostomRoleFun(item.roleId)"><img src="../../assets/images/qianbi.png" />编辑角色</p>
									<p class="del" @click="delCostomRoleFun(item.roleId)"><img src="../../assets/images/newlj.png" />删除角色</p>
								</div>
							</div>
							<div class="right-wrap-head" v-else><input type="text" v-model="roleNamesVal" class="roleNames" autofocus="autofocus" placeholder="角色名称" /></div>
						</template>
						<template v-else>
							<div class="right-wrap-head">{{item.roleName}}</div>
							<!--<div class="right-wrap-head" v-else><input type="text" v-model="roleNamesVal" class="roleNames" autofocus="autofocus" placeholder="角色名称" /></div>-->
						</template>
						<div class="right-wrap-box">
							<template v-for="(val,index) in roleList[indexs].projectPermissionList" v-if='index<=5'>
								<div :class="'group-gap flagss'+index" v-if="val.id == index+1">
									<img v-if="val.status == 1" src="../../assets/images/xzicoon.png" />
									<template v-if="val.status == 4">
										<span class="defImg active" :data-id='val.id' v-if="val.id>6?1:0"></span>
									</template>
									<template v-if="val.status == 3">
										<span class="defImg" :data-id='val.id' v-if="val.id>6?1:0"></span>
									</template>
								</div>
								<div :class="index == 0?'flageActive active flagss'+index:'flageActive flagss'+index">
									<template v-for="val in roleList[indexs].projectPermissionList">
										<div class="permission-item" v-if="val.pid == index+1">
											<img v-if="val.status == 1" src="../../assets/images/xzicoon.png" />
											<template v-if="val.status == 4">
												<span class="defImg active" :data-id='val.id' v-if="val.id>6?1:0"></span>
											</template>
											<template v-if="val.status == 3">
												<span class="defImg" :data-id='val.id' v-if="val.id>6?1:0"></span>
											</template>
										</div>
									</template>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
			<div class="btnBox" v-if="defAddFlage">
				<a class="cancelBtn" @click="cancelFun">取消</a>
				<a class="saveBtn" @click="saveFun" v-if="saveFlage">保存</a>
				<a class="saveBtn" @click="editSaveFun" v-if="!saveFlage">保存</a>
			</div>
		</div>

	</div>
</template>

<script>
	import API from 'api/http'
	import Bus from 'assets/js/Bus.js'

	export default {
		name: "",
		data() {
			return {
				//				//创建自定义角色
				//				newZdyjsFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[12].status,
				//				//修改自定义角色
				//				XGZdyjsFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[13].status,
				//				//删除自定义角色
				//				delZdyjsFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[14].status,
				
				clickFlags:true,//默认可以操作点击事件
				defAddFlage: false, //保存按钮and添加自定义显示
				addFlage: true, //默认添加自定义显示
				projectList: [], //左侧部分项目列表
				roleList: [], //右侧角色权限列表
				customRole: [], //添加自定义角色
				num: 3, //默认角色id为3  有3个是固定的角色不可修改
				roleNamesVal: '', //默认角色名
				editRoleFlage: -1, //编辑自定义角色控制显示隐藏
				saveFlage: true, //当前角色编辑状态下的显示隐藏
				roleSub: null, //编辑企业自定义角色数组下标
				roleIds: null, //编辑当前角色的id
			}
		},
		components: {

		},
		methods: {
			//滚动到最右侧
			scrollLeftFun() {
				//console.log($('.right-wrap').width(), $('.right-wrap .right-wrap-list').length * 160)
				$('.right-wrap').scrollLeft($('.right-wrap')[0].scrollWidth)
			},
			defAddFun() {
				//控制添加自定义按钮和保存取消按钮
				this.defAddFlage = !this.defAddFlage
				this.addFlage = !this.addFlage
			},
			//查询企业下项目的所有角色和权限
			selectRoleListFun() {
				API.get('/projectPermission/queryProjectPermissionAll', {
					eid: sessionStorage.getItem('enterpriseId') //企业ID
				}).then(res => {
					console.log('查询企业下项目的所有角色和权限', res.data.data)
					this.roleList = res.data.data
					this.projectList = res.data.data[0].projectPermissionList
//					this.$nextTick(function() {
//						//jq控制显示隐藏的事件
//						this.jqShowHideFun()
//					})

				})
			},
			//jq控制显示隐藏的事件
			jqShowHideFun() {
				for(let i = 0; i < 6; i++) {
					$('.flags' + i).bind('click')
					$(document).on('click', '.group-gap-active.flagss' + i, function() {
						$('.flagss' + i).addClass('active')
					})
					$(document).on('click', '.group-gap-active.active.flagss' + i, function() {
						$('.flagss' + i).removeClass('active')
					})
				}
			},
			//添加自定义角色
			addCustomRole() {
				this.clickFlags=false
				this.roleNamesVal = ''
				this.defAddFun()
				API.get('/projectPermission/toAddProjectPermissionRole', {
					eid: sessionStorage.getItem('enterpriseId') //企业ID
				}).then(res => {
					console.log('添加自定义角色', res.data.data)
					this.customRole = {
						enterprisePermissionList: null,
						projectPermissionList: [],
						roleId: this.num++,
						roleName: ""
					}
					this.customRole.projectPermissionList = res.data.data
					console.log(this.customRole)
					this.roleList.push(this.customRole)
					this.editRoleQX()
					this.$nextTick(function() { //当dom发生变化，更新后执行的回调
						//滚动到最右侧
						this.scrollLeftFun()
					});
				})

			},
			//jq编辑角色权限
			editRoleQX() {
				$(document).on('click', '.defImg', function() {
					$(this).addClass('active')
				})
				$(document).on('click', '.defImg.active', function() {
					$(this).removeClass('active')
				})
			},
			//添加自定义角色的保存按钮事件
			saveFun() {
				this.clickFlags=true
				if(this.roleNamesVal == '') {
					//消息提示框
					this.$notify({
						title: '警告',
						message: '角色名称未填写！！',
						type: 'warning'
					});
					return false
				}
				let dataId = '' //选中的id
				let roleNames = this.roleNamesVal
				for(let i = 0; i < this.customRole.projectPermissionList.length; i++) {
					if($('span.defImg.active').eq(i).attr('data-id') != undefined) {
						dataId = dataId + $('span.defImg.active').eq(i).attr('data-id') + ','
					}
				}
				if(dataId.length == 0) {
					//消息提示框
					this.$notify({
						title: '警告',
						message: '当前角色没有勾选权限，请选择！！',
						type: 'warning'
					});
					return false
				}
				//console.log(roleNames,dataId.substr(0,dataId.length-1))
				API.get('/projectPermission/addProjectPermissionRole', {
					roleName: roleNames,
					eid: sessionStorage.getItem('enterpriseId'), //企业ID
					ids: dataId.substr(0, dataId.length - 1)
				}).then(res => {
					console.log('添加自定义角色', res.data.message)
					if(res.data.message == 'SUCCESS') {
						//消息提示框
						this.$notify({
							title: '成功',
							message: '添加项目自定义角色成功！',
							type: 'success'
						});
						//添加成功后 执行查询事件
						this.selectRoleListFun()
					}
				})
				this.defAddFun()
				this.editRoleFun(-1)

			},
			//添加自定义角色的取消按钮事件
			cancelFun() {
				this.clickFlags=true
				//取消后 执行查询事件
				this.selectRoleListFun()
				this.defAddFun()
				this.editRoleFun(-1)
			},
			//编辑自定义角色状态
			editRoleFun(indexs) {
				if(this.editRoleFlage != indexs) {
					this.editRoleFlage = indexs
				} else {
					this.editRoleFlage = -1
				}
			},
			//删除企业自定义角色
			delCostomRoleFun(roleIds) { //roleIds为角色id
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					API.get('/projectPermission/deleteProjectPermissionRole', {
						roleId: roleIds,
						eid: sessionStorage.getItem('enterpriseId') //企业ID
					}).then(res => {
						console.log('删除项目自定义角色', res.data.message)
						if(res.data.message == 'SUCCESS') {
							//添加成功后 执行查询事件
							this.selectRoleListFun()
						}
					})

					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//编辑企业自定义角色
			editCostomRoleFun(roleIds) { //roleIds为角色id
				this.clickFlags=false
				this.roleIds = roleIds
				//控制添加显示隐藏
				this.defAddFun()
				this.saveFlage = !this.saveFlage
				API.get('/projectPermission/findByRoleId', {
					roleId: roleIds,
				}).then(res => {
					console.log('编辑项目自定义角色', res.data.data)
					for(let i = 0; i < this.roleList.length; i++) {
						if(this.roleList[i].roleId == roleIds) {
							this.roleSub = i //当前角色数组下标
							this.roleList.splice(i, 1, res.data.data) //数据替换  这里不能直接更改值否则视图没有变化，只能通过动态更新
							this.roleNamesVal = this.roleList[i].roleName //input编辑角色赋值
							this.roleList[i].roleName = '' //角色名称置空
						}
					}
					this.editRoleQX()
				})

			},
			//编辑企业自定义角色保存按钮事件
			editSaveFun() {
				this.clickFlags=true
				if(this.roleNamesVal == '') {
					//消息提示框
					this.$notify({
						title: '警告',
						message: '角色名称未填写！！',
						type: 'warning'
					});
					return false
				}
				this.saveFlage = !this.saveFlage
				let dataId = '' //选中的id
				let roleNames = this.roleNamesVal
				for(let i = 0; i < this.roleList[this.roleSub].projectPermissionList.length; i++) {
					if($('span.defImg.active').eq(i).attr('data-id') != undefined) {
						dataId = dataId + $('span.defImg.active').eq(i).attr('data-id') + ','
					}
				}
				if(dataId.length == 0) {
					//消息提示框
					this.$notify({
						title: '警告',
						message: '当前角色没有勾选权限，请选择！！',
						type: 'warning'
					});
					return false
				}
				//console.log(roleNames,dataId.substr(0,dataId.length-1),this.roleIds)
				API.get('/projectPermission/updateProjectPermissionRole', {
					id: this.roleIds,
					roleName: roleNames,
					eid: sessionStorage.getItem('enterpriseId'), //企业ID
					ids: dataId.substr(0, dataId.length - 1)
				}).then(res => {
					console.log('编辑项目自定义角色保存按钮事件', res.data.message)
					if(res.data.message == 'SUCCESS') {
						//消息提示框
						this.$notify({
							title: '成功',
							message: '编辑项目自定义角色成功！',
							type: 'success'
						});
						//添加成功后 执行查询事件
						this.selectRoleListFun()
					}
				})
				this.defAddFun()
				this.editRoleFun(-1)
			}
		},
		created() {
			//查询企业下所有的角色和权限
			this.selectRoleListFun()
			this.jqShowHideFun()
			//			//接收组件通信信息
			//			Bus.$on('toCurrentRolePermissions', (msg) => {
			//				this.newZdyjsFlage = msg.enterprisePermissionList[12].status
			//				this.XGZdyjsFlage = msg.enterprisePermissionList[13].status
			//				this.delZdyjsFlage = msg.enterprisePermissionList[14].status
			//			});
		},
		watch: {

		}
	}
</script>

<style scoped lang="scss">
	.corporateAuthority-head {
		padding: 23px 30px;
		border-bottom: 1px solid #f7f7f7;
		display: flex;
		p {
			height: 30px;
			line-height: 30px;
			flex: 1;
			font-size: 16px;
			color: #333;
		}
		a.addBox {
			cursor: pointer;
			height: 30px;
			line-height: 30px;
			padding-left: 20px;
			font-size: 14px;
			color: #077ce7;
			background: url(../../assets/images/添加1.png) no-repeat left center;
		}
		a.addBox.defAdd {
			cursor: auto;
			color: #666;
		}
	}
	
	.corporateAuthority-body {
		padding: 30px;
		.width-limited {
			display: flex;
			border: 1px solid #f1f1f1;
			.left-wrap {
				position: relative;
				min-width: 260px;
				z-index: 10;
				.left-wrap-head {
					height: 60px;
					background: #fff;
					border-right: 1px solid #f1f1f1;
				}
				.left-wrap-box {
					border-right: 1px solid #f1f1f1;
					background: #fff;
					.flageActive {
						display: none;
					}
					.flageActive.active {
						display: block;
					}
					.group-gap,
					.permission-item {
						border-top: 1px solid #f1f1f1;
						height: 50px;
						font-size: 14px;
						color: #666;
						line-height: 50px;
					}
					.group-gap {
						cursor: pointer;
						padding-left: 20px;
						background: url(../../assets/images/xiajiantou.png) no-repeat 210px center;
					}
					.group-gap:hover {
						background: url(../../assets/images/xiajiantou.png) no-repeat 210px center #eee;
					}
					.permission-item {
						padding-left: 40px;
					}
				}
			}
			.right-wrap {
				padding-left: 260px;
				margin-left: -260px;
				display: flex;
				flex-flow: row nowrap;
				overflow-x: auto;
				.right-wrap-list {
					min-width: 160px;
					.right-wrap-head {
						position: relative;
						height: 60px;
						font-size: 16px;
						color: #333;
						line-height: 60px;
						text-align: center;
						input {
							width: 100%;
							height: 60px;
							font-size: 16px;
							color: #333;
							text-align: center;
						}
						.editBox {
							position: absolute;
							top: 70px;
							left: 50%;
							margin-left: -90px;
							width: 180px;
							height: 120px;
							border-radius: 5px;
							background: #fff;
							box-shadow: 0 0 10px 0px #ccc;
							p {
								height: 40px;
								line-height: 40px;
								text-align: left;
								padding: 0 20px;
								img {
									margin-right: 10px;
								}
							}
							p:hover {
								background: #eee;
							}
						}
					}
					.right-wrap-head-edit {
						cursor: pointer;
					}
					.right-wrap-box {
						.flageActive {
							display: none;
						}
						.flageActive.active {
							display: block;
						}
						.group-gap,
						.permission-item {
							border-top: 1px solid #f1f1f1;
							height: 50px;
							display: flex;
							justify-content: center;
							align-items: center;
							.defImg {
								width: 20px;
								height: 20px;
								cursor: pointer;
								background: url(../../assets/images/box_situation_1.png) no-repeat center center;
							}
							.defImg.active {
								background: url(../../assets/images/box_situation_2.png) no-repeat center center;
							}
						}
					}
				}
			}
		}
		.btnBox {
			display: flex;
			justify-content: flex-end;
			padding: 20px 0;
			a {
				box-sizing: border-box;
				width: 100px;
				height: 38px;
				line-height: 38px;
				margin-left: 20px;
				text-align: center;
				font-size: 14px;
				border-radius: 5px;
				cursor: pointer;
			}
			a.cancelBtn {
				border: 1px solid #cccccc;
				color: #666;
			}
			a.saveBtn {
				background: #0a7ee9;
				color: #fff;
			}
		}
	}
</style>