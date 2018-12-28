<template>
	<div>
		<div class="rightLog">
			<li class="navLog" v-for="(item,index) in nav" @click="handlePersonnel(index)" :key="index">
				<div>
					<i class="iconfont " :class="item.icon"></i>
				</div>
				<div style="margin-left: 5px">{{item.name}}</div>
			</li>
		</div>
		<div v-show="rightNav " class="rightNav">
			<div class="navHeader">
				<p class="a7a">视图</p>
				<div style="position: absolute;right: 10px;top: 14px; cursor: pointer;" @click="guanbi1">
					<i style="font-size: 12px" class="iconfont icon-guanbi"></i>
				</div>
				<span style="position: absolute; right: 20px">
        </span>
			</div>
			<div class="navList">
				<li v-for="(li, index) in list" :key="index" @click="routerPush(index)">
					<div><i class="iconfont" :class="li.img"></i></div>
					<div class="a7a mgL10">{{li.name}}</div>
				</li>
			</div>
			<!--<div class="pdB20">
          <div class="mgT20 disFlex" >
            <img src="../../assets/images/自定义排序.png" alt="">
            <p class="mgL7 a7a" >项目自定义顺序</p>
          </div>
        </div>-->
			<!--<div class="pdB20">
          <div class="mgT20">
            <div>
              <span></span>
              <div class="disFlex">
                <img src="../../assets/images/筛选2.png" alt="">
                <p class="mgL7 a7a">任务筛选</p>
              </div>
            </div>
            <div class="mgt10" >
              <el-input placeholder="查找相关任务"></el-input>
            </div>
          </div>
          <div class="mgT20">
            <div class="disFlex">
              <img src="../../assets/images/biaoqian.png" alt="">
              <p class="mgL7 a7a">标签</p>
            </div>
              <p class="a7a  mgt10 mgL35"> 无标签</p>
          </div>
        </div>-->
			<!--<div class="mgT20">
          <span><i class="iconfont icon-quanxian"></i></span>
          <span class="a7a">执行者</span>
          <div class="mgT4">
            <li class="mgT17 maL30 " v-for="(li, index) in personnels ">
              <span></span>
              <div class="ft14 a7a">{{li.name}}</div>
            </li>
          </div>
        </div>-->
		</div>
		<div v-show="personnel" class="personnel">
			<div class="navHeader">
				<p>项目成员</p>
				<div style="position: absolute;right: 10px;top: 14px;cursor: pointer;" @click="guanbi">
					<i style="font-size: 12px" class="iconfont icon-guanbi"></i>
				</div>
			</div>

			<div class="mgT20 " style="margin-bottom: 90px;">
				<div class="personnelInput ">
					<el-input v-model="search" placeholder="搜索成员"></el-input>
				</div>
				<div class="personnels">
					<div class="invitation" @click="addPersonnelTrue" v-if="addProjectcyFlage">
						<div>
							<div class="dessccs">
								<img src="../../assets/images/bluejia.png" alt="">
							</div>
						</div>
						<div style="color:#2c86ff; margin-left: 15px;font-size: 14px">
							邀请新成员
						</div>
					</div>
					<div class="mgT23 mebel" v-for="(li, index) in searchArr" :key="index" @mouseover="roleListFals(li) " @mouseleave=" li.roleListFals = false">
						<div class="userImg">
							<img v-if="li.user_img != ''" :src="li.user_img" alt="">
							<div v-if="li.user_img == ''">{{li.username[0]}}</div>
						</div>
						<div class="mebelRight">
							<div style="font-size: 14px;color: #333">{{li.username}}</div>
							<span class="f12" style="color: #a7a7a7;">{{li.email}}</span>
							<div v-show="!(index==0&&searchArr.length==1)" class="removeX" style="z-index: 2" @click="hanldeRemove(li,index)">
								<i class="iconfont icon-xiala"></i>
							</div>
						</div>
						<div class="roleListFals" v-show="li.show">
							<div style="padding: 0 20px;position: relative;align-items: center;display: flex;  justify-content: center;">
								<div class="roleListFals-header">
									<p> 成员菜单</p>
								</div>
								<div @click="li.show =false" style="position: absolute;right:18px;">
									<i style="font-size: 12px" class="iconfont icon-guanbi"></i>
								</div>
							</div>
							<div style="margin-top: 15px">
								<li v-for="(li ,indexRole) in roleList" :key="indexRole" class="roleList roleList_Active" @click="hanleCheck(li,indexRole)" >
									<div>
										<p>{{li.roleName}}</p>
									</div>
									<div v-if="duihaoFlages == indexRole?1:0"  style="position: absolute;right: 15px;color: #3da8f5">
										<i class="iconfont icon-duihao"></i>
									</div>
								</li>
							</div>
							<div class="removePeople" @click="removeLi(li,index)" v-if="delProjectcyFlage">
								<div>
									删除成员
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="menu" class="menu">
			<transition name="slide">
				<div class="base" v-show="baseMenu">
					<el-row class="header" type="flex" align="middle">
						<el-col :span="23">
							<h2>项目菜单</h2>
						</el-col>
						<el-col :span="1" class="icon">
							<i class="el-icon-close" @click="closeMenu"></i>
						</el-col>
					</el-row>
					<ul class="setting">
						<li @click="openSet">
							<i class="iconfont icon-shezhi"></i> 项目设置
						</li>
						<li @click="openProInfo">
							<i class="iconfont icon-xiangmuguanli"></i> 项目信息
						</li>
						<li @click="openTag">
							<i class="iconfont icon-biaoqian"></i> 标签
						</li>
						<li @click="closeMoreMenu">
							<i class="iconfont icon-msnui-more"></i> 查看更多
						</li>
					</ul>
					<div class="split-line"></div>
					<div class="task-count">
						<h2>
                <i class="iconfont icon-icon-test"></i>
                任务统计
              </h2>
						<ul>
							<li @click="openTaskList(index)" v-for="(item, index) in taskCount" :key="index">
								<p>{{item.name}}</p>
								<p :class="index === 0 ? 'unassign' : 'today'">{{item.count}}</p>
							</li>
						</ul>
					</div>
					<div class="split-line"></div>
					<div class="dynamic-list">
						<div class="title">
							<i class="iconfont icon-caidan"></i> 项目动态
						</div>
						<ul class="list">
                            <li @click="openDetail(item)" :class="{'nomember':dynamicList.type !== 13}"
                                v-for="(item, index) in dynamicList" :key="index">
                                <!--<div class="photo" v-if="item.user.user_img !== ''" :style="{'backgroundImage': `url(${item.user.user_img})`}"></div>-->
                                <!--<div class="photo" v-else>白</div>-->
                                <img class="photo" v-if="item.user.user_img !=''" :src=item.user.user_img alt="">
                                <div class="photo" v-if="item.user.user_img ==''" >{{item.user.username[0]}}</div>
                                <div class="content">
                                    <div class="info">
                                        <span class="user">{{item.info1}}</span>
                                        <span class="doing">{{item.operation+':'}}</span>
                                        <span class="do-name">{{item.info3}}</span>
                                    </div>
                                    <div class="time">
                                        <span class="day">{{item.createTime.split(' ')[0]}}</span>
                                        <span class="date">{{item.createTime.split(' ')[1]}}</span>
                                    </div>
                                </div>
                            </li>
							<!-- <li class="nomember">
                  <div class="photo"></div>
                  <div class="content">
                    <div class="info">
                      <span class="user">
                        测试A
                      </span>
                      <span class="doing">
                        完成了任务:
                      </span>
                      <span class="do-name">
                        三疙瘩四棒槌
                      </span>
                    </div>
                    <div class="time">
                      <span class="day">11月21日</span>
                      <span class="date">12:07</span>
                    </div>
                  </div>
                </li>
                <li class="nomember">
                  <div class="photo"></div>
                  <div class="content">
                    <div class="info">
                      <span class="user">
                        测试A
                      </span>
                      <span class="doing">
                        完成了任务:
                      </span>
                      <span class="do-name">
                        三疙瘩四棒槌
                      </span>
                    </div>
                    <div class="time">
                      <span class="day">11月21日</span>
                      <span class="date">12:07</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="photo">
                  </div>
                  <div class="content">
                    <div class="info">
                      <span class="user">
                        测试A
                      </span>
                      <span class="doing">
                        邀请 123321 加入项目
                      </span>
                      <span class="do-name">
                      </span>
                    </div>
                    <div class="info-body" @click.stop="handlePopover">
                      <div class="member-photo"></div>
                      <div class="member-info">
                        <div class="name">123123</div>
                        <div class="email">11@11.com</div>
                      </div>
                    </div>
                    <div class="time">
                      <span class="day">1月22日</span>
                      <span class="date">12:07</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="photo">

                  </div>
                  <div class="content">
                    <div class="info">
                      <span class="user">
                        测试A
                      </span>
                      <span class="doing">
                        完成了任务:
                      </span>
                      <span class="do-name">
                        三疙瘩
                      </span>
                    </div>
                    <div class="info-body" @click.stop="handlePopover">
                      <div class="member-photo"></div>
                      <div class="member-info">
                        <div class="name">123123</div>
                        <div class="email">11@11.com</div>
                      </div>
                    </div>
                    <div class="time">
                      <span class="day">1月22日</span>
                      <span class="date">12:07</span>
                    </div>
                  </div>
                </li> -->
						</ul>
						<div class="split-line"></div>
						<div class="more" @click="showProDyn">
							<i class="iconfont icon-msnui-more"></i> 查看所有项目动态
						</div>
					</div>
				</div>
			</transition>
			<transition name="slide">
				<div class="show-more" v-show="moreMenu">
					<div class="head">
						<el-button type="text" icon="el-icon-arrow-left" @click="closeMoreMenu">返回</el-button>
						<el-button type="text" icon="el-icon-close" @click="closeMenu"></el-button>
					</div>
					<div class="split-line"></div>
					<ul class="do-list">
						<li @click="openArchiving(index)" v-for="(item, index) in moreMenuList" v-if="item.flages" :key="index">
							<i class="iconfont" :class="item.class"></i> {{item.name}}
						</li>
					</ul>
				</div>
			</transition>
			<transition name="slide">
				<div class="show-more" v-show="moreMenuPanel">
					<div class="head">
						<el-button type="text" icon="el-icon-arrow-left" @click="closeMoreMenuPanel">返回</el-button>
						<el-button type="text" icon="el-icon-close" @click="closeMenu"></el-button>
					</div>
					<div class="split-line"></div>
					<template v-if="moreMenuTool === 1">
						<div class="see">
							<div class="see-name">项目名称</div>
							<el-input class="see-input" v-model="seeName"></el-input>
							<div class="see-name">拥有者</div>
							<el-select v-model="seeCompany">
								<el-option v-for="item in seeCompanyList" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<ul>
								<li v-for="(item, index) in proPowers" :key="index" @click="selectPower(index)">
									<p :class="power === index ? 'active' : ''">
										<i class="iconfont" :class="item.class"></i>
										<span>{{item.name}}</span>
										<i class="iconfont icon-duihao" v-if="power === index"></i>
									</p>
									<p>
										{{item.tip}}
									</p>
								</li>
							</ul>
							<el-button type="primary" style="width: 100%" :disabled="seeNameLen">确定</el-button>
						</div>
					</template>
					<template v-if="moreMenuTool === 3">
						<div class="import">
							<el-input class="import-input" type="file" v-model="importFile"></el-input>
							<el-button type="primary">确定导入</el-button>
							<p>使用说明:</p>
							<p>1. 从 Excel 导入，先下载
								<a href="javascript:;">「任务导入模板」</a>，填写完成后，上传并确定导入</p>
							<p>2. 从 MS Project 导入，先在 Project 中将内容导出为 .xml 格式后，上传并确定导入</p>
							<p>3. 一次最多支持 2000 条任务导入</p>
						</div>
					</template>
					<template v-if="moreMenuTool === 4">
						<div class="export">
							<p class="radio">
								<el-radio v-model="exportRradio" label="1">导出项目中所有任务（Excel）</el-radio>
							</p>
							<p class="tip">
								将项目中所有任务通过 Excel 导出，包含所有的任务字段。若项目中有多个任务分组，任务分组会对应 Excel 中的 Sheet。
							</p>
							<p class="radio">
								<el-radio v-model="exportRradio" label="2">选择需要导出的任务分组（CSV）</el-radio>
							</p>
							<el-select v-model="seeCompany">
								<el-option v-for="item in seeCompanyList" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</template>
				</div>
			</transition>
		</div>
		<vtaskFloat :addPersonnelBackground="addPersonnelBackground" :invitation="invitation"></vtaskFloat>
		<vproject-edit :openFlag='isOpenSet'></vproject-edit>
		<project-info :isShow="openProjectInfo"></project-info>
		<tag :show="tagFlag"></tag>
		<task-situation-dialog :show="taskListFlag" :taskConfig="taskListConfig"></task-situation-dialog>
		<popover :show="popoverFlag"></popover>
		<project-dynamic :showProDynamic="showProjectDynamic"></project-dynamic>
		<view-archiving :showArchiving="showArchiv"></view-archiving>
		<task-edit :taskId="editTaskId" v-if="editTaskFlag" @close="closeEditTask"></task-edit>
	</div>
</template>

<script>
	import api from '../../api/http'
	import time from '../../api/time'
	import taskEdit from '../../components/taskEdit/taskEdit'
	import viewArchiving from '../../components/viewArchiving'
	import projectDynamic from '../../components/projectDynamic'
	import taskSituationDialog from '../../components/taskSituationDialog'
	import vprojectEdit from 'components/projectEdit'
	import projectInfo from '../../components/projectInfo'
	import tag from '../../components/tag'
	import popover from '../../components/popover'
	import headerUrl from 'assets/images/chengyuan.png'
	import defaultImg from '../../assets/images/22登录_01.png'
	import vtaskFloat from './taskfloatInvitation' //引入邀请新成员弹出框
	import { mapMutations, mapGetters } from 'vuex'
	import Bus from 'assets/js/Bus.js'

	export default {
		components: {
			vtaskFloat,
			taskEdit,
			projectDynamic,
			taskSituationDialog,
			vprojectEdit,
			projectInfo,
			tag,
			popover,
			viewArchiving
		},
		data() {
			return {
				//迁入项目
				qrxmFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[8].status,
				//迁出项目
				qcxmFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[9].status,
				//添加项目成员
				addProjectcyFlage: null,
				//移除项目成员
				delProjectcyFlage: null,

				//控制对号显示的问题
				duihaoFlages:0,

				userId: [],
				roleId: '', //储存用户权限Id
				roleList_index: -1,
				addDraggableName: '',
				addraggable: false,
				personnels: [{
						name: "王薇薇"
					},
					{
						name: "王伟伟"
					},
					{
						name: "王巍巍"
					}
				],
				rightNav: false,
				personnel: false,
				menu: false,
				baseMenu: true,
				moreMenu: false,
				moreMenuList: [{
						flages: 1,
						name: '查看归档',
						class: 'icon-liebiao1'
					},
					{
						flages: 1,
						name: '复制项目',
						class: 'icon-fuzhi'
					},
					{
						flages: 1,
						name: '保存为项目模板',
						class: 'icon-xiangmuguanli'
					},
					{
						flages: '',
						name: '导入任务至当前分组',
						class: 'icon-pilianggengxin'
					},
					{
						flages: '',
						name: '导出分组内所有任务',
						class: 'icon-download'
					},
				],
				taskCount: [{
						name: '待认领任务',
						count: ''
					},
					{
						name: '今天的事',
						count: ''
					}
				],
				dynamicList: [],
				isOpenSet: false,
				openProjectInfo: false,
				tagFlag: false,
				taskListFlag: false,
				taskListConfig: {},
				popoverFlag: false,
				showArchiv: false,
				moreMenuPanel: false,
				moreMenuTool: 0,
				seeName: '',
				seeCompanyList: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				seeCompany: '',
				proPowers: [{
						name: '私有项目',
						class: 'icon-suo',
						tip: '仅项目成员可查看和编辑'
					},
					{
						name: '企业项目',
						class: 'icon-qiyexinxi',
						tip: '企业内所有成员可见，仅项目成员可编辑'
					},
					{
						name: '公开项目',
						class: 'icon-liebiao2',
						tip: '所有人都可通过链接访问，仅项目成员可编辑'
					}
				],
				power: 0,
				personnelList: [],
				importFile: '',
				exportRradio: '1',
				showProjectDynamic: false,
				editTaskId: 0,
				editTaskFlag: false,

				//成员input框
				search: '',
				searchArr: [],
				roleList: [], //权限下拉框数组
				newIndex: 0,
				role: [],
				nav: [{
						icon: 'icon-yonghu',
						name: '成员',
					},
					{
						icon: 'icon-review',
						name: '视图',
					},
					{
						icon: 'icon-caidan',
						name: '菜单'
					}
				],
				list: [{
						img: 'icon-shujuzuozhanshi',
						name: '看板视图',
					},
					{
						img: 'icon-shijianshitu',
						name: '时间视图'
					},
					//        {
					//          img:'icon-liebiao2',
					//          name:'表格视图',
					//        }
				],
				checkIndex: -1,

				//邀请成员弹出框传值
				addPersonnelBackground: false,
				invitation: [],
        flag:[],
        number:0
			}
		},
		methods: {
			...mapMutations({
				invitationLength: 'SET_INVITATIONLENGTH',
				setInvitation: 'SET_SETINVITATION',
				setTaskInvitation: 'SET_TASKINVITATION'
			}),

			guanbi() {
				this.personnel = false
			},
			guanbi1() {
				this.rightNav = false
			},
			closeMenu() {
				this.menu = false
				this.moreMenu = false
				this.baseMenu = true
			},
			closeMoreMenu() {
				this.baseMenu = !this.baseMenu
				this.moreMenu = !this.moreMenu
			},
			handlePersonnel(index) {
                this.flag = [];
				if(index == 0) {
                    let eid = this.$route.query.eid; //企业id 和项目id
                    let pid = this.$route.query.pid;
                    this.pid = pid;
                    this.eid = eid;
                    let parms = {
                        pid: this.pid,
                        eid: this.$route.query.eid
                    };
                    api.get('/projects/getUserByPid', parms).then(res => {
                        this.personnelList = res.data.data;
                        for(let i=0,le= this.personnelList.length;i<le;i++){
                            if(this.personnelList[i].projectRoleTpe == "admin"){
                                this.flag.push(true);
                            }else{
                                this.flag.push(false)
                            }
                        }
                        // console.log(this.flag,11111111111111111)
                        this.personnelList.map(el => {
                            this.$set(el, 'roleListFals', false)
                            this.$set(el, 'show', false)
                        })
                    });
                    this.personnel = !this.personnel
                    this.setInvitation(this.personnel)
                    this.rightNav = false
                    this.menu = false
				} else if(index == 1) {
					this.rightNav = !this.rightNav
					this.personnel = false
					this.menu = false
				} else if(index === 2) {
					this.rightNav = false
					this.personnel = false
					this.menu = !this.menu
					if(this.menu) {
						this.getProjectMenuInfo()
					}
				}
			},
			addraggableTrue() {
				this.addraggable = !this.addraggable
			},
			showProDyn() {
				this.showProjectDynamic = !this.showProjectDynamic
			},
			// 打开项目设置
			getProjectMenuInfo() {
				let params = {
					projectId: sessionStorage.getItem('projectId')
				}
				api.get('/projects/getProjectMenu', params).then(res => {
					const data = res.data.data
					this.dynamicList = []
					this.taskCount = [{
							name: '待认领任务',
							count: data.countTask
						},
						{
							name: '今天的事',
							count: data.toDayTask
						}
					]
					this.dynamicList = data.commentList
                    console.log(this.dynamicList,66666666666666)
					this.dynamicList.forEach(v => {
						v.createTime = time.formatting(v.createTime)
					})
				})
			},
			openSet() {
				this.isOpenSet = !this.isOpenSet
			},
			openProInfo() {
				this.openProjectInfo = !this.openProjectInfo
			},
			addPersonnelTrue() {
				let parms = {
					eid: sessionStorage.getItem("enterpriseId"),
					pid: sessionStorage.getItem("projectId")
				}
				api.get('/projects/getUsersByEid', parms).then(res => {
					this.invitation = res.data.data
					this.addPersonnelBackground = !this.addPersonnelBackground
					this.setTaskInvitation(this.addPersonnelBackground)
					this.personnel = false
				})
			},
			openTag() {
				this.tagFlag = !this.tagFlag
			},
			openTaskList(data) {
				this.taskListFlag = !this.taskListFlag
				if(data === 0) {
					this.taskListConfig = {
						title: '待认领任务',
						type: 0
					}
				} else if(data === 1) {
					this.taskListConfig = {
						title: '今天的事',
						type: 1
					}
				}
			},
			handlePopover() {
				this.popoverFlag = !this.popoverFlag
			},
			openArchiving(data) {
				if(data === 0) {
					this.showArchiv = !this.showArchiv
				} else {
					this.moreMenu = false
					this.moreMenuPanel = true
					this.moreMenuTool = data
				}
			},
			closeMoreMenuPanel() {
				this.moreMenu = true
				this.moreMenuPanel = false
			},
			selectPower(data) {
				this.power = data
			},
			openDetail(data) {
				this.editTaskFlag = true
				if(data.type == 10 && data.operation !== '删除任务') {
					this.editTaskId = Number(data.content)
				}
			},
			closeEditTask() {
				this.editTaskFlag = false
			},

			//获取当前用户
			getData() {
				let params = {
					id: sessionStorage.getItem('userId')
				}
				api.get('/userInfo/getUserMessage', params).then(res => {
					this.userId = res.data.data
				})
			},

			//成员信息下拉框
			hanldeRemove(li, index) {
				this.searchArr.map(el => {
					el.show = false
					li.show = true
				})
				this.newIndex = index
				let prams = {
					uid: this.personnelList[index].id,
					pid: this.pid,
					eid: sessionStorage.getItem('enterpriseId')
				}
				api.get('/projects/getRoleByUid', prams).then(res => {
					res.data.data.roleList.map(el => {
						this.$set(el, 'show', false)
					})
					this.roleList = res.data.data.roleList
					this.roleId = res.data.data.role.id
					//console.log('-------------------------------------------', res.data.data)

					if(res.data.data.role !== null) {
						for(let ss = 0; ss < res.data.data.roleList.length; ss++) {
							if(res.data.data.role.id == res.data.data.roleList[ss].id) {
								this.duihaoFlages =ss
								//console.log('======================',this.duihaoFlages)
							}
						}
					}
					//					if(res.data.data.role !== null) {
					//						if(res.data.data.role.id == 4) {
					//							this.roleList_index == 0
					//							this.roleList.map(el => {
					//								if(el.id == 4) {
					//									el.show = true
					//								}
					//							})
					//						} else if(res.data.data.role.id == 5) {
					//							if(res.data.data.role.id == 5) {
					//								this.roleList_index == 1
					//								this.roleList.map(el => {
					//									if(el.id == 5) {
					//										el.show = true
					//									}
					//								})
					//							}
					//						} else if(res.data.data.role.id == 6) {
					//							if(res.data.data.role.id == 6) {
					//								this.roleList_index == 7
					//								this.roleList.map(el => {
					//									if(el.id == 6) {
					//										el.show = true
					//									}
					//								})
					//							}
					//						}
					//					}
					this.searchArr[index].roleListFals = !this.searchArr[index].roleListFals
					this.role = res.data.data.role
				})
			},

			//成员弹出框
			roleListFals(li, roleListFals) {
				if(this.userId.id == li.id) {
					li.roleListFals = false
				} else {
					li.roleListFals = true
				}
			},

			//修改成员权限
			hanleCheck(li, indexRole) {
			  // console.log(this.flag)
			  let t = this;
        this.number = 0;
        if(indexRole == this.duihaoFlages){
          return false
        }else{
          if(indexRole == 0){
            this.flag[this.newIndex] = true;
            updata();
          }else{
            this.flag[this.newIndex] = false;
            for(let i=0,le =this.flag.length;i<le;i++){
              if(this.flag[i]){
                this.number++;
              }
            }
            if(this.number>0){
              updata();
            }else{
              t.$message({
                    type: 'info',
                    message: '项目成员必须保持一个拥有者'
                  });
            }
          }
          function updata(){
            t.duihaoFlages = indexRole
            t.checkIndex = indexRole
            t.roleList.map(el => {
              el.show = false
              li.show = true
            })
            t.roleList_index = indexRole
            let rid = t.roleList[indexRole].roleId
            let uid = t.personnelList[t.newIndex].id
            let pid = t.pid
            let data = {
              rid,
              uid,
              pid
            }
            api.post('/projects/updProjectRole', data).then(res => {})
            t.roleId = li.id
          }
        }
			},

			removeLi(li, index) {
				if(this.roleId == 4) {
					this.$notify({
						title: '警告',
						message: '不可删除项目拥有者',
						type: 'warning'
					})
				} else {
					this.$confirm('是否删除成员?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let pid = this.pid;
					let uid = li.id
					let data = {
						pid,
						uid
					}
					api.post('/projects/delProUser', data).then(res => {
						this.searchArr.map(el => {
							el.show = false
						})
						if(res.data.code == 200) {
							this.$notify({
								title: '成功',
								message: '删除成员成功',
								type: 'success'
							})
						}
						this.searchArr.splice(index, 1)
						this.invitationLength(this.searchArr.length)
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除'
					});
				});
					
					
					
					
					
					
					
					
					
					
					
					
					
				}
			},
			addDraggable() {
				let item = {
					title: this.addDraggableName,
					content: []
				}
				this.myArray.push(item)
			},

			//视图跳转
			routerPush(index) {
				if(index == 0) {
					this.$router.push({
						path: '/taskType',
						query: {
							pid: sessionStorage.getItem('projectId'),
							eid: sessionStorage.getItem("enterpriseId")
						}
					})
					this.rightNav = false
					//项目权限设置
					api.get('/projectPermission/queryProjectPermission', {
						projectId: sessionStorage.getItem('projectId')
					}).then(res => {
		//				console.log('=================================',res.data.data)
		//				sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
						Bus.$emit('toQueryProjectPermission', res.data.data)
					})

				} else if(index == 1) {
					this.$router.push({
						path: '/timeview',
						query: {
							pid: sessionStorage.getItem('projectId'),
							eid: sessionStorage.getItem("enterpriseId")
						}
					})
					this.rightNav = false
				}
			},
			jqfz() {
				this.moreMenuList[3].flages = this.qrxmFlage
				this.moreMenuList[4].flages = this.qcxmFlage
			}

		},
		computed: {
			...mapGetters({
				get_taskPeople: 'GET_TASKPEOPLE',
			}),
			seeNameLen() {
				return this.seeName.length === 0
			}
		},
		created: function() {
			this.getData()

			//接收组件通信信息
			Bus.$on('toCurrentRolePermissions', (msg) => {
				this.qrxmFlage = msg.enterprisePermissionList[8].status
				this.qcxmFlage = msg.enterprisePermissionList[9].status
				//				this.addQycyFlage = msg.enterprisePermissionList[10].status
				//				this.delQycyFlage = msg.enterprisePermissionList[11].status
				this.jqfz()
			});
			//接收组件通信信息
			Bus.$on('toQueryProjectPermission', (msg) => {
				this.addProjectcyFlage = msg.projectPermissionList[19].status
				this.delProjectcyFlage = msg.projectPermissionList[20].status
			});
		},
		mounted() {
            let path = this.$route.path.slice(1,99);
            switch(path){
                case 'task':
                    this.nav = [
                        {
                            icon: 'icon-yonghu',
                            name: '成员',
                        },
                        {
                            icon: 'icon-review',
                            name: '视图',
                        },
                        {
                            icon: 'icon-caidan',
                            name: '菜单'
                        }
                    ];break;
                case 'file':
                    this.nav = [
                        {
                            icon: 'icon-yonghu',
                            name: '成员',
                        },
                        {
                            icon: 'icon-caidan',
                            name: '菜单'
                        }
                    ];break;
                case 'schedule':
                    this.nav = [
                        {
                            icon: 'icon-yonghu',
                            name: '成员',
                        },
                        {
                            icon: 'icon-caidan',
                            name: '菜单'
                        }
                    ];break;
            }
			this.jqfz()

		},
		watch: {

			get_taskPeople() {
				this.personnel = false
			},
			personnelList() {
				this.searchArr = this.personnelList
			},
			//查找功能
			search() {
				this.searchArr = this.personnelList.filter(el => {
					if(el.username.indexOf(this.search) > -1) {
						return true
					}
				})
			},
            $route(){
                let path = this.$route.path.slice(1,99);
                switch(path){
                    case 'task':
                        this.nav = [
                            {
                                icon: 'icon-yonghu',
                                name: '成员',
                            },
                            {
                                icon: 'icon-review',
                                name: '视图',
                            },
                            {
                                icon: 'icon-caidan',
                                name: '菜单'
                            }
                        ];break;
                    case 'file':
                        this.nav = [
                            {
                                icon: 'icon-yonghu',
                                name: '成员',
                            },
                            {
                                icon: 'icon-caidan',
                                name: '菜单'
                            }
                        ];break;
                    case 'schedule':
                        this.nav = [
                            {
                                icon: 'icon-yonghu',
                                name: '成员',
                            },
                            {
                                icon: 'icon-caidan',
                                name: '菜单'
                            }
                        ];break;
                }
            }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.slide-enter-active {
		transition: all .3s ease;
	}

	.slide-leave-active {
		transition: all .3s ease;
	}

	.slide-enter {
		transform: translateX(350px);
	}

	.slide-leave-to {
		transform: translateX(-350px);
	}

	.roleListfloat {
		width: 200px;
		height: 200px;
		color: red;
	}

	.dessccs {
		margin-left: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		border: 1px dashed #4e99ff;
		border-radius: 30px;
	}

	.rightNav {
		box-shadow: 0 2px 20px #E1E1E1;
		top: 125px;
		padding: 0 20px 20px 20px;
		background: #f7f7f7;
		position: absolute;
		right: 0;
		z-index: 1;
		height: 505px;
		overflow-y: auto;
	}

	.roleListFals {
		z-index: 20;
		left: 5px;
		position: absolute;
		width: 250px;
		/*  top: 415px;
    left: 1170px;*/
		display: block;
		background: #fff;
	}

	.navHeader {
		color: #333333;
		font-size: 14px;
		font-weight: 700;
		z-index: 1;
		position: relative;
	}

	.navHeader>p {
		border-bottom: 2px solid #efefef;
		width: 300px;
		height: 55px;
		display: flex;
		align-items: center;
		justify-content: center
	}

	.navList {
		padding-bottom: 20px;
		border-bottom: 2px solid #efefef;
	}

	.navList>li {
		cursor: pointer;
		align-items: center;
		display: flex;
		font-size: 12px;
		color: #333333;
		margin-top: 20px;
	}

	.mgT20 {
		margin-top: 20px;
	}

	.pdB20 {
		border-bottom: 2px solid #efefef;
		padding-bottom: 20px;
	}

	.mgT4 {
		margin-top: 4px;
	}

	.mgT17 {
		margin-top: 17px;
	}

	.maL30 {
		margin-left: 30px;
	}

	.rightLog {
		display: flex;
		position: absolute;
		right: 50px;
		top: 87px;
	}

	.rightLog>li {
		cursor: pointer;
		padding: 0 15px 0 15px;
	}

	.menu {
		position: absolute;
		top: 125px;
		right: 0;
		width: 350px;
		height: 81vh;
		box-shadow: 0 2px 20px #e1e1e1;
		background-color: #ffffff;
		overflow-y: auto;
		z-index: 1;
		color: #383838;
		.show-more {
			.head {
				display: flex;
				padding: 0 20px;
				justify-content: space-between;
				.el-button {
					height: 50px;
					color: #383838;
					&:hover {
						color: rgb(10, 126, 233);
					}
				}
			}
			.do-list {
				margin: 5px 0;
				li {
					padding: 0 20px;
					line-height: 40px;
					i {
						margin-right: 6px;
					}
					&:hover {
						background-color: #f7f7f7;
					}
				}
			}
			.see {
				padding: 0 20px;
				line-height: 20px;
				&-name {
					padding: 10px 0;
				}
				.el-select {
					width: 100%;
				}
				ul {
					margin: 15px 0;
					li {
						padding: 8px 16px;
						font-size: 14px;
						color: #ccc;
						p.active {
							color: #3da8f5;
						}
						p:first-child:hover {
							color: #3da8f5;
						}
					}
				}
			}
			.import {
				line-height: 20px;
				padding: 20px;
				.el-input {
					margin-bottom: 20px;
				}
				.el-button {
					width: 100%;
					margin-bottom: 28px;
				}
				p {
					margin-bottom: 16px;
					color: #a6a6a6;
					font-size: 14px;
					a {
						text-decoration: none;
						color: #3da8f5;
					}
				}
			}
			.export {
				padding: 20px;
				.radio {
					margin-bottom: 8px;
				}
				.tip {
					margin-bottom: 20px;
					font-size: 12px;
					color: #a6a6a6;
					margin-left: 24px;
				}
				.el-select {
					width: 100%;
				}
			}
		}
		.header {
			height: 52px;
			font-size: 14px;
			padding: 0 20px;
			.el-col {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				border-bottom: 2px solid #efefef;
			}
			h2 {
				text-align: center;
				font-size: 14px;
				color: #333;
				font-weight: 700;
			}
			.icon {
				text-align: right;
				i {
					cursor: pointer;
				}
				&:hover {
					color: #3da8f5;
				}
			}
		}
		.split-line {
			width: 310px;
			margin: 0 auto;
			border-bottom: 1px solid #efefef;
		}
		.setting {
			padding: 5px 0;
			li {
				padding: 0 20px;
				display: flex;
				line-height: 40px;
				height: 40px;
				font-size: 14px;
				font-weight: 400;
				color: #383838;
				i {
					margin-right: 10px;
				}
				&:hover {
					background-color: #f7f7f7;
				}
			}
			li:hover {
				cursor: pointer;
			}
		}
		.task-count {
			margin-top: 5px;
			padding: 0 20px;
			h2 {
				font-weight: normal;
				line-height: 35px;
				font-size: 14px;
				color: #383838;
				i {
					margin-right: 6px;
				}
			}
			ul {
				display: flex;
				margin-left: 27px;
				padding-bottom: 10px;
				li {
					width: 50%;
					p:first-child {
						line-height: 20px;
						font-size: 14px;
					}
					p:last-child {
						font-size: 24px;
						margin-top: 5px;
						cursor: pointer;
					}
					.unassign {
						color: #87c5ba;
					}
					.today {
						color: #ffae44;
					}
				}
			}
		}
		.dynamic-list {
			padding-top: 6px;
			font-size: 14px;
			.title {
				line-height: 40px;
				padding: 0 20px;
				i {
					margin-right: 6px;
				}
			}
			.list {
				padding: 0 20px;
				li {
					width: 100%;
					display: flex;
					padding: 10px 0;
					.photo {
						width: 30px;
						height: 30px;
						border-radius: 50%;
                        background: #ffae44;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-pack: center;
                        -ms-flex-pack: center;
                        justify-content: center;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        color: white;
                        -webkit-box-shadow: 0 0 10px #E6E6E6;
                        box-shadow: 0 0 10px #E6E6E6;
						/*background: url('http://192.168.5.77:9092/gbfw/majorproject/image/1522651438996.png') no-repeat center;*/
						/*background-size: cover;*/
					}
					.content {
						padding-left: 4px;
						line-height: 30px;
						display: flex;
						width: calc(100% - 34px);
						justify-content: space-between;
						flex-flow: wrap;
						.info {
							.user {
								font-weight: bold;
							}
						}
						.info-body {
							position: relative;
							display: flex;
							width: 100%;
							height: 40px;
							align-items: center;
							line-height: 20px;
							.member-photo {
								width: 30px;
								height: 30px;
								border-radius: 50%;
								background: url('http://192.168.5.77:9092/gbfw/majorproject/image/1522651438996.png') no-repeat center;
								background-size: 100% 100%;
								margin-right: 4px;
							}
						}
						.info-body:hover {
							cursor: pointer;
							background-color: #f1f1f1;
						}
						.time {
							font-size: 12px;
							color: #a4a4a4;
						}
					}
				}
				li.nomember:hover {
					cursor: pointer;
					background-color: #f1f1f1;
				}
			}
			.more {
				padding: 0 20px;
				margin: 5px 0;
				line-height: 40px;
				i {
					margin-right: 6px;
				}
				&:hover {
					background-color: #f7f7f7;
				}
			}
		}
	}

	.personnel {
		height: 69vh;
		overflow-y: auto;
		top: 125px;
		padding-bottom: 75px;
		background: #f7f7f7;
		position: absolute;
		right: 0;
		z-index: 1;
		box-shadow: 0 2px 20px #E1E1E1;
	}

	.personnelInput {
		padding: 0 20px;
	}

	.personnelInput>input {
		width: 290px;
		height: 35px;
	}

	.mgT23 {
		margin-top: 23px;
	}

	.f12 {
		font-size: 12px;
	}

	.addBackground {
		background: #383838;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		opacity: 0.7;
		z-index: 10;
	}

	.disFlex {
		display: flex;
		align-items: center;
	}

	.mgL7 {
		margin-left: 7px;
	}

	.a7a {
		color: #7a7a7a;
	}

	.mgL35 {
		margin-left: 35px;
		font-size: 14px;
	}

	.mgt10 {
		margin-top: 10px;
	}

	.ft14 {
		font-size: 14px;
	}

	.navLog:hover {
		color: #3da8f5;
	}

	.navLog {
		display: flex;
		align-items: center;
	}

	.invitation {
		cursor: pointer;
		padding: 2px 0;
		display: flex;
		align-items: center;
		margin-top: 20px
	}

	.invitation:hover {
		background: #e5e5e5;
	}

	.userImg>img {
		margin-left: 20px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.userImg>div {
		margin-left: 20px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #ffae44;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}
	.mebel:hover {
		cursor: pointer;
		background: #e5e5e5;
	}

	.mebel {
		padding: 5px 0;
		position: relative;
		display: flex;
	}

	.mebelRight {
		margin-left: 12px;
	}

	.mgL10 {
		margin-left: 10px;
	}

	.removeX:hover {
		color: #3da8f5;
	}

	.removeX {
		width: 20px;
		height: 20px;
		position: absolute;
		bottom: 16px;
		right: 20px
	}

	.roleList {
		display: flex;
		align-items: center;
		position: relative;
	}

	.roleList:hover {
		background: #e5e5e5;
		;
	}

	.roleList>div>p {
		padding: 5px 20px;
		font-size: 14px;
		color: gray;
		font-weight: 600;
	}

	.roleListFals {
		border: 1px solid transparent;
		border-radius: 5px;
		padding-bottom: 20px;
		box-shadow: 0 7px 21px rgba(0, 0, 0, .1);
	}

	.roleListFals-header {
		width: 90%;
		position: relative;
		font-size: 15px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 15px;
		border-bottom: 1px solid #e5e5e5
	}

	.removePeople {
		font-size: 14px;
		color: gray;
		font-weight: 600;
		height: 28px;
		display: flex;
		align-items: center;
		padding: 0 20px;
	}

	.removePeople:hover {
		background: #e5e5e5;
	}

	.roleList_Active {
		color: #3da8f5
	}
</style>
