<template>
	<div class="taskBox">
		<div>
			<div style="display: inline-block;vertical-align: top;">
				<draggable class="box" ref="box" :options="{group:{name:'peoples',pull:true,put:true},handle:'.hand',forceFallback:true,ghostClass:'cccc'}" @end="onAisle">
					<div class="itemc" v-for="(element ,index) in myArray" :listId="element.id" :sort="element.sort" :key="index" @click="setArrayId(index)">
						<div class="hand">
							<div :title="element.name">{{element.name | longStrCut}}</div>
							<div style="cursor: pointer;">
								<i class="iconfont icon-xiala2" style="color: #9f9f9f;" @click="checkShow(element,$event)"></i>
							</div>
						</div>
						<draggable class="lists" :options="options" @end="moveTask">
							<div class="zhanwei"></div>
							<div class="task" v-for="(element, index) in element.tasksList" :key="index" @click="onte(element,index)" :taskId="element.id" :sort="element.sort">
								<div v-if="element.state == 0" style="padding-top: 18px;padding-bottom: 10px;">
									<div class="title">
										<span @click.stop="changeSatus(element)">
                                            <i v-if="element.state == 0" class="iconfont icon-xuanzekuang" style="margin-right: 10px;"></i>
                                            <i v-if="element.state == 1" class="iconfont icon-duoxuankuang2" style="margin-right: 10px;"></i>
                                        </span>
										<span class="itemName">{{element.name}}</span>
										<div>
											<el-tooltip class="item" effect="dark" :content="element.user.username!=''?element.user.username:'待认领'" placement="top">
												<!--<img v-if="element.user.username == ''" src="../../../assets/images/头像.png">-->
												<div v-if="element.user.username == ''" class="img"><i class="iconfont icon-wode"></i></div>
												<img v-if="element.user.user_img != ''" :src="element.user.user_img">
												<div v-if="element.user.user_img == ''&& element.user.username != ''" class="img">{{element.user.username[0]}}</div>
											</el-tooltip>
										</div>
									</div>
									<div class="progress">
										<span class="name">完成度</span>
										<span class="wrap">
                                            <span class="bar" :style="{'width':+ element.progress + '%'}" :class="{yq:element.map.state=='逾期',wc:element.map.state=='已完成'}"></span>
										</span>
										<span class="data">{{element.progress}}%</span>
									</div>
									<p class="report" v-if="element.progressReport!=''" :title="element.progressReport">
										<span class="name">进度汇报：</span>{{element.progressReport}}
									</p>
									<div class="icons">
										<div v-for="(icon, index) in element.map.field" :key="index"><i :class="icon.icon"></i></div>
									</div>
									<div class="labels">
										<div v-for="(item, index) in element.map.lableList" :key="index">{{'· ' + item.name}}</div>
									</div>
								</div>
								<div v-if="element.state == 1" class="selColor" style="padding-top: 18px;padding-bottom: 10px;">
									<div class="title">
										<span @click.stop="changeSatus(element)" class="fontColor">
                                            <i v-if="element.state == 0" class="iconfont icon-xuanzekuang" style="margin-right: 10px;"></i>
                                            <i v-if="element.state == 1" class="iconfont icon-duoxuankuang2" style="margin-right: 10px;"></i>
                                        </span>
										<span class="itemName">{{element.name}}</span>
										<div>
											<el-tooltip class="item" effect="dark" :content="element.user.username!=''?element.user.username:'未命名'" placement="top">
												<!--<img v-if="element.user.username == ''" src="../../../assets/images/22登录_01.png">-->
												<div v-if="element.user.username == ''" class="img"><i class="iconfont icon-wode"></i></div>
												<img v-if="element.user.user_img != ''" :src="element.user.user_img">
												<div v-if="element.user.user_img == ''" class="img">{{element.user.username[0]}}</div>
											</el-tooltip>
										</div>
									</div>
									<div class="progress">
										<span class="name">完成度</span>
										<span class="wrap">
                                            <span class="bar" :style="{'width':+ element.progress + '%'}" :class="{yq:element.map.state=='逾期',wc:element.map.state=='已完成'}"></span>
										</span>
										<span class="data">{{element.progress}}%</span>
									</div>
									<p class="report" v-if="element.progressReport!=''" :title="element.progressReport">
										<span class="name">进度汇报：</span>{{element.progressReport}}
									</p>
									<div class="icons">
										<div v-for="(icon, index) in element.map.field" :key="index"><i :class="icon.icon"></i></div>
									</div>
									<div class="labels">
										<div v-for="(item, index) in element.map.lableList" :key="index">{{'· ' + item.name}}</div>
									</div>
								</div>
							</div>
						</draggable>
						<div class="addTask" v-show="!element.addTaskfloat" v-if="newProjectFlage">
							<span @click="addTask(element)">
                            <i class="iconfont icon-add" style="color: #0a7ee9;"></i>
                                    添加任务
                          </span>
						</div>
						<div class="addTaskfloat" v-show="element.addTaskfloat">
							<div class="addbother">
								<div class="closeBohter" @click="element.addTaskfloat = !element.addTaskfloat">
									<img @click="closeBohter " src="../../../assets/images/差号.png" alt="">
								</div>
								<div class="floatHeader">
									<el-checkbox v-model="checked" style="overflow: hidden;  text-overflow: ellipsis;">{{task}}</el-checkbox>
									<i class="iconfont icon-xiala" @click="showTasklist"></i>
									<div class="taskList" v-show="showTask">
										<div class="menu-item add" @click="showProject">
											<img src="../../../assets/images/加号Task.png" style="margin-right: 5px" alt=""> 添加和管理任务类型
										</div>
										<li v-for="(task ,index) in taskList" :key="index" class="menu-item pointer" @click="getTask(index)">
											<p>{{task.name}}</p>
											<img style="right: 15px; " v-if="index == Active" src="../../../assets/images/gou.png" alt="">
										</li>
									</div>
								</div>
								<div class="floatInput">
									<el-input type="textarea" :rows="3" v-model="taskDescribe" maxlength=20 placeholder="请输入任务描述">
									</el-input>
								</div>
								<div class="yongyou">
									<div @click="receive" style="display: flex">
										<div class="yongHeader">
											<img v-if="imgUrl!=''" :src="imgUrl" alt="">
											<div class="img" v-if="imgUrl==''">{{name.substring(0,1)}}</div>
										</div>
										<p class="yongyouP">{{name}}</p>
									</div>
									<div class="receivePeople" v-show="receivePeople">
										<div style="width: 90%;margin:10px auto;">
											<el-input v-model="search" placeholder="查找成员"></el-input>
											<!--<input class="inputStyle" placeholder="查找成员" v-model="search" type="text" @keydown="searchMemberIpt" />-->
										</div>
										<div style="margin-left: 19px;margin-top:10px;display: flex;align-items: center;position: relative" @click="selected(-2)">
											<img src="../../../assets/images/头像.png" alt="">
											<p style="margin-left: 10px;font-size: 14px">待认领</p>
											<img style="width: 16px; height: 16px; right: 15px; top: 1px; position: absolute" v-if="isActive ==-2 " src="../../../assets/images/gou.png" alt="">
										</div>
										<li class="imgTitle" v-for="(people, index) in Peoples" :key="index" @click="selected(index)">
											<img v-if="people.user_img!=''" :src="people.user_img" alt="">
											<div style="margin-left: 15px;" v-if="people.user_img==''" class="img">{{people.username.substring(0,1)}}</div>
											<p>{{people.username}}</p>
											<img style="width: 16px; height: 16px; right: 15px; top: 11px; position: absolute" v-if=" index == isActive " src="../../../assets/images/gou.png" alt="">
										</li>
										<div class="yaoqing" @click="showTaskFloat">
											<img src="../../../assets/images/jia.png" alt=""> 邀请新成员
										</div>
									</div>
								</div>
								<div class="borederBottom"></div>
								<div class="more" v-show="more">
									<img src="../../../assets/images/gengduo.png" alt="">
									<p class="gengduo" @click="addBoreder">更多</p>
								</div>
								<div class="bottomMore" v-show="bottomMore">
									<!--<div class="more">
                                        <img style="margin-right: 10px" src="../../../assets/images/日历结束.png" alt="">
                                        <el-date-picker v-model="value1" type="date" value-format="yyyy-MM-dd" placeholder="设置截止日期时间">
                                        </el-date-picker>
                                    </div>-->
									<div class="youxianji" v-if="priority != '' ">
										<i :class="youUrl"></i>
										<p>{{priority}}</p>
										<div class="level" @click="levelShow ">
											<div>
												<div v-show="isLevel">
													请添加
												</div>
												<p v-if="levelName == '一般'" :class="{lv:levelName == '一般'}">{{levelName}}</p>
												<p v-if="levelName == '紧急'" :class="{yellow:levelName == '紧急'}">{{levelName}}</p>
												<p v-if="levelName == '非常紧急'" :class="{red:levelName == '非常紧急'}">{{levelName}}</p>
											</div>
										</div>
										<div class="levelFloat">
											<li @click="levelCheck(index)" v-for="(li ,index ) in levels" :key="index" v-show="level">
												<p v-if="li.name == '一般'" :class="{lv:li.name == '一般'} ">
													{{li.name}}
												</p>
												<p v-if="li.name == '紧急'" :class="{yellow:li.name == '紧急'} ">
													{{li.name}}
												</p>
												<p v-if="li.name == '非常紧急'" :class="{red:li.name == '非常紧急'} ">
													{{li.name}}
												</p>
												<img style="position: absolute;right: 10px;" v-if="levelsIndex == index ? true :false " src="../../../assets/images/gou.png" alt="">
											</li>
										</div>
									</div>
									<li v-for="(li, index) in list" :key="index" class="bianli" v-if="li.name !== '备注' && li.name !== '进度' ">
										<i class="iconfont " :class="li.icon"></i>
										<p>{{li.name}}</p>
										<div class="inputEl absloue">
											<input v-model="input" v-if="li.name == '任务目标'" placeholder="请输入文字">
										</div>
										<div v-if="li.name == '标签' " class="absloue ">
											<div style="position: relative">
												<div style="font-size: 14px;cursor: pointer" v-show="taskJia" @click="labelShow">
													添加标签
												</div>
												<div class="label" v-show="labelBox">
													<div style="display: flex;border-bottom: 1px solid #efefef">
														<div>
															<input type="text" class="lableFloat-input" v-model="searchLable" placeholder="搜索标签">
														</div>
														<div style="color: #3da8f5;" class="lableI" @click="addLableShow">
															<i class="iconfont icon-tianjia2"></i>
														</div>
														<div @click="closeBox">
															<i style="font-size: 12px;" class="iconfont icon-guanbi"></i>
														</div>
													</div>
													<div class="labelListBox" v-for="(li ,index) in searchLableArray" :key="index" @mouseover="li.checked =true" @mouseleave="li.checked=false">
														<p @click="addNewLable(li,index)">{{li.name}}</p>
														<div @click="lableFloat_add(li)" v-show="li.checked">
															<i class="iconfont icon-bianji1"></i>
														</div>
														<div class="editorLableBox" v-show="li.show">
															<div class="addLableBox_title">
																<div style="position: absolute;left: 10px;" @click="addLableBox_jian(li)">
																	<i class="iconfont icon-jiantouyou-copy" style="font-size: 18px"></i>
																</div>
																<div>
																	<span style="color: #383838;">编辑标签</span>
																</div>
																<div style="position: absolute;right: 10px;" @click="addLableBox_cha(li)">
																	<i style="font-size: 12px" class="iconfont icon-guanbi"></i>
																</div>
															</div>
															<div style="display: flex;align-items: center;justify-content: center;margin-top: 20px">
																<div style="width: 216px;">
																	<el-input v-model="editorLableBox_Input" placeholder="请输入内容"></el-input>
																</div>
															</div>
															<div style="display: flex;align-items:center;justify-content: center;margin-top: 20px;margin-bottom: 10px">
																<div style="display: flex;">
																	<div>
																		<el-button type="danger" @click="deleteLable(li,index)">删除</el-button>
																	</div>
																	<div style="margin-left: 10px">
																		<el-button type="primary" @click="saveLable(li)">完成</el-button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="addLablebox" v-show="addLablebox">
													<div class="addLableboxTitle">
														<img @click="zuo" style="position: absolute;left: 10px;" src="../../../assets/images/zuojiantou.png" alt="">
														<p>设置标签</p>
														<img @click="cha" style="position: absolute;right: 10px;" src="../../../assets/images/差号.png" alt="">
													</div>
													<div style="width: 90%; margin: 10px auto">
														<el-input v-model="inputLable" placeholder="标签名称"></el-input>
													</div>
													<div class="saveAdd" @click="saveAdd">
														创建
													</div>
												</div>
											</div>
										</div>
										<div class="inputEl absloue" v-if="li.name == '工时'">
											<input v-model="taskTime" type="Number" placeholder="请输入工时">
										</div>
										<!--<div class="inputEl absloue" v-if="li.name == '进度'">-->
										<!--<input v-model="taskCrite" type="number"  placeholder="请输入进度">-->
										<!--</div>-->
									</li>
									<div class="lableList">
										<div v-for="(lable, index) in newLable" :key="index" class="addListlable" @mouseover="lable.checked =true" @mouseleave="lable.checked=false">
											<p style="text-overflow: ellipsis; overflow: hidden;">{{lable.name}}</p>
											<i v-show="lable.checked" @click="deleteNewlable(index)" class="ft12 iconfont icon-guanbi"></i>
										</div>
									</div>
								</div>
								<div class="canyu">
									<div class="canyuHeader">
										<p>参与者</p>
									</div>
									<div class="canyuTitle">
										<div class="canyuTouxiang">
											<li v-for="(li, index) in imgs" :key="index" class="imgItem" @mouseover="li.show =true" @mouseleave="li.show=false">
												<el-tooltip class="item" effect="dark" :content="li.username" placement="top-start">
													<img v-if="li.user_img!=''" :src="li.user_img" alt="">
													<div v-if="li.user_img==''" class="img">{{li.username[0]}}</div>
												</el-tooltip>
												<i v-show="li.show" @click="deleteImgs(index)" class="iconfont icon-guanbi" v-if="removeParticipantFlage"></i>
											</li>
											<div style="cursor: pointer;margin-top: 3px;width: 30px;margin-left: 10px" @click="participateXiala" v-if="addParticipantFlage">
												<i class="iconfont icon-tianjia1" style="font-size: 22px;" v-if="addParticipantFlage"></i>
											</div>
										</div>
										<div class="receivePeople" v-show="participate">
											<div style="width: 190px; margin: 10px auto; ">
												<el-input v-model="search" placeholder="查找成员" @select="searchMemberIpt"></el-input>
												<!--<input class="inputStyle" placeholder="查找成员" v-model="search" type="text" @keyup="searchMemberIpt" />-->
											</div>
											<div class="allPeople">
												<span><i class="iconfont icon-yonghu"></i></span>
												<span style="color: #333333;margin-left: 6px">所有成员</span>
											</div>
											<li class="imgTitle" v-for="(people, index) in Peoples" :key="index" @click="pushImg(people,index)">
												<img v-if="people.user_img!=''" :src="people.user_img" alt="">
												<div style="margin-left: 15px;" v-if="people.user_img==''" class="img">{{people.username.substring(0,1)}}</div>
												<p>{{people.username}}</p>
											</li>
											<div class="yaoqing" @click="showTaskFloat">
												<div>
													<i style="color: #2c86ff;font-size: 24px" class="iconfont icon-tianjia1"></i>
												</div>
												<span style="color: #2c86ff;font-size: 12px;margin-left: 20px">邀请新成员</span>
											</div>
										</div>
									</div>
								</div>
								<div class="borederBottom"></div>
								<div class="more">
									<div class="pointer" v-if="editProjectHeadFlage" v-show="yincang" style="display: flex; align-items:center;" @click="tab">
										<img src="../../../assets/images/开锁.png" style="margin-right: 5px" alt="">
										<div>
											<p class="pointerOne">隐藏模式</p>
											<p class="ft12 pointerTwo">所有成员可见</p>
										</div>
									</div>
									<div class="pointer" v-if="editProjectHeadFlage" v-show="!yincang" style="display: flex;  align-items:center;" @click="tab">
										<img src="../../../assets/images/锁.png" alt="" style="margin-right: 5px">
										<div>
											<p class="pointerOne">隐藏模式</p>
											<p class=" pointerTwo">仅参与者可见</p>
										</div>
									</div>
									<div @click="saveButton(index,element)" class="saveButton">
										创建
									</div>
								</div>
							</div>
						</div>
						<!--右上角列表任务下拉框-->
						<div class="itemChildren" :style="locations" v-show="element.show">
							<div v-show="itemChildren_float">
								<div class="itemChildre_title">
									<span>列表菜单</span>
									<span @click="closeElshow(element)" style="position: absolute; right: 30px"><i style="font-size: 14px;" class="iconfont icon-guanbi"></i></span>
								</div>
								<div class="itemChildre_navTitle">
									<div v-for="(nav , index) in navTitle" :key="index" class="navTitle" @click="checknavTtile(index,element)" :class="{active : checknavTtile_index == index }" v-if="nav.name == '编辑列表'? editProjectListFalge :1">
										<span><i  class="iconfont maL30 ft12" :class="nav.img"></i></span>
										<span class="maL28">{{nav.name}}</span>
									</div>
								</div>
								<div>
									<!--<div v-for="(nav , index) in navList" :key="index" class="navTitle" @click="checkNav(nav,index)" :class="{active : checkNav_index == index }">
										<i class="iconfont maL30 ft12" :class="nav.img "></i>
										<span class="maL28">{{nav.name}}</span>
									</div>-->
								</div>
								<div style="border-bottom: 1px solid #efefef;margin-top: 18px"></div>
								<div class="navTitle" @click="deleteTask(index)" v-if="delProjectListFalge">
									<span><i  class="iconfont icon-shanchu maL30 ft12"></i></span>
									<span class="maL28">删除</span>
								</div>
							</div>
							<div>
								<div class="addLablebox" v-show="itemChildren_setName">
									<div class="addLableboxTitle">
										<img @click="itemChildren_setName =false, itemChildren_float = true" style="position: absolute;left: 10px;" src="../../../assets/images/zuojiantou.png" alt="">
										<p>编辑列表</p>
										<img @click="itemChildren_setName =false,element.show =false" style="position: absolute;right: 10px;" src="../../../assets/images/差号.png" alt="">
									</div>
									<div style="width: 90%; margin: 10px auto">
										<el-input v-model="item_setName" placeholder="列表名称"></el-input>
									</div>
									<div class="saveAdd" @click="item_setNameButton(element)">
										创建
									</div>
								</div>
							</div>
						</div>
					</div>
				</draggable>
			</div>
			<div style="display: inline-block;">
				<div class="create" v-show="vCreate" v-if="newProjectListFalge">
					<div class="taskHeader" @click="createLi">
						<i class="iconfont icon-add" style="color: #0a7ee9;"></i> <span style="font-weight: bold;cursor: pointer">新建任务列表</span>
					</div>
				</div>
				<div v-show="!vCreate" style="margin-left: 10px">
					<div style="width: 234px">
						<el-input v-model="createInput" placeholder="新建任务列表"></el-input>
						<div class="buttonBox">
							<el-button plain @click="cancel">取消</el-button>
							<el-button type="primary" @click="save">保存</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<taskedit styles="width:690px;height:80%" v-if="taksCompileShow" :taskId="elementId" @close="taksCompileShow=false"></taskedit>
		<!--<taskCompile  @chuan='chuan' :taksCompileShow="taksCompileShow" :myArrayid="myArrayid" :elementId="elementId" @sendTask="sendTask">
        </taskCompile>-->
		<vtaskFloat :taskFloat="taskFloat"></vtaskFloat>
		<vproject-edit :openFlag="hideProjet"></vproject-edit>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import headerUrl from 'assets/images/chengyuan.png'
	import taskManagement from 'view/taskType/taskManagement'
	import api from 'api/http'
	import { mapMutations, mapGetters } from 'vuex'
	import taskCompile from '../taskCompile'
	import vtaskFloat from '../taskfloatInvitation'
	import heraderUrl from '../../../assets/images/头像.png'
	import defaultImg from '../../../assets/images/22登录_01.png'
	import vprojectEdit from 'components/projectEdit'
	import taskedit from 'components/taskEdit/taskEdit'
	import Bus from 'assets/js/Bus.js'

	export default {
		components: {
			vtaskFloat,
			draggable,
			taskManagement,
			taskCompile,
			vprojectEdit,
			taskedit
		},
		data() {
			return {
				//项目权限flage
				//创建任务
				newProjectFlage: null,
				//新建任务列表
				newProjectListFalge: null,
				//编辑任务列表
				editProjectListFalge: null,
				//删除任务列表
				delProjectListFalge: null,

				//添加参与者权限
				addParticipantFlage: null,
				//移除参与者权限
				removeParticipantFlage: null,
				//设置隐藏模式
				editProjectHeadFlage: null,


				//当前项目成员角色id
				projectRoleIds:null,

				state: '',
				deleteLableLi: {},
				canyuImg: [],
				limitHandle: true,
				itemChildren_float: true, //显示下拉框
				itemChildren_setName: false, //显示修改列表盒子
				item_setName: '', //修改列表名字input
				//两个list列表
				checknavTtile_index: -1,
				checkNav_index: -1,
				navList: [{
						img: 'icon-wode',
						name: '设置本列表所有任务执行者',
					},
					{
						img: 'icon-rili',
						name: '设置本列表所有任务截止时间'
					},
					{
						img: 'icon-yidong',
						name: '移动本列表所有任务'
					},
					{
						img: 'icon-fuzhi',
						name: '复制本列表所有任务'
					},
					{
						img: 'icon-guidang',
						name: '归档本列表所有任务'
					}
				],
				navTitle: [{
						name: '编辑列表',
						img: 'icon-bianji1'
					},
					{
						name: '在此后添加新列表',
						img: 'icon-tianjia2'
					}
				],

				hideProjet: false,
				myArrayid: '',
				taskTimeAlert: true, //工时
				taskFloat: false,
				searchLableArray: [],
				searchLable: '',
				taskCrite: '',
				taskTime: '',
				editorLableBox: false,
				isLevel: true, //
				checked: false, // 任务完成状态
				taskJia: true,
				taksCompileShow: false,
				myArray: [{
					name: '',
					tasksList: [{
						name: '',
						fileURL: headerUrl,
						createTime: '',
						endTime: '',
						checked: false
					}]
				}],
				levelsIndex: -1,
				youUrl: '',
				Active: 0,
				acitve: false,
				options: {
					group: {
						name: 'lists',
						pull: true,
						put: true
					},
					sort: true,
					scroll: true,
					animation: 300,
					fallbackClass: true,
					forceFallback: true,
					filter: '.addTask',
					ghostClass: 'cccc'
				},
				vCreate: true,
				createInput: '',
				isShow: true,
				more: true,
				value1: '',
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				task: '', // 添加更多隐藏框 任务名称
				taskList: [], //添加更多隐藏框 任务列表
				showTask: false,
				name: '', //登陆用户名称
				imgUrl: '', //登陆用户头像
				receivePeople: false, //认领成员下拉框
				search: '', //查找成员输入框
				Peoples: [], //认领成员列表
				participate: false, //参与者下拉页面
				imgs: [], //img添加的数组
				list: [], //点击更多后的下拉数组
				priority: '', //优先级
				levels: [{
					name: '一般',
					id: 1
				}, {
					name: '紧急',
					id: 2
				}, {
					name: '非常紧急',
					id: 3
				}], //遍历级别数组
				level: false, //优先级浮动框
				levelName: '',
				input: '',
				labelBox: false,
				labelList: [], //遍历标签
				newLable: [], //选择标签的新数组
				inputLable: '', //添加标签的input输入框
				addLablebox: false, //添加标签后的盒子
				taskDescribe: '', // 任务描述
				implementPeopleId: '', //执行者id
				taskTypeId: '', //任务类别id
				ids: [], //人员id
				lables: [], // 标签id合集
				taskFielid: '', //优先级id
				taskField: '',
				tid: '',
				isActive: -1,
				yincang: true,
				id: '',
				tids: [],
				bottomMore: false,
				addLableBox: false,
				lableFloat: false,
				editorLableBox_Input: '',
				timeLong: '', //工时
				progress: '', //进度
				target: '', //目标
				peoplesId: '', //执行者id
				elementId: '',
				locations: '',
        length:999
			}
		},
		filters: {
			longStrCut(str) {
				if(str.length > 10) {
					return str.substr(0, 10) + '...'
				} else {
					return str
				}
			}
		},
		methods: {
			searchMemberIpt(){
				//console.log(this.search)
				let param = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId'),
					name:this.search
				}
				api.get('/projects/getUserByPid', param).then(res => {
					this.Peoples=res.data.data
				})
			},
			onAisle(e) {
				//console.log(e)
				//console.log(this.myArray)
				let t = null;
				t = this.myArray[e.oldIndex]
				this.myArray[e.oldIndex] = this.myArray[e.newIndex]
				this.myArray[e.newIndex] = t
				//console.log(this.myArray)
				let sendArr = []
				this.myArray.map(el => {
					sendArr.push({
						id: el.id,
						sort: el.sort
					})
				})
				//                if(e.newIndex == e.oldIndex) return;
				api.post('/tasks/moveTaskList', {
					fieldJson: JSON.stringify(sendArr)
				})
				//                this.getList(sessionStorage.getItem("tid"))
			},
			//传值
			chuan() {
				//                alert(data)
				//                this.state = data
				this.myArray = [];

				//                this.getList(this.taskTypeId)
				this.getList(this.getTaskTypeId)
			},
			// 移动列表
			moveList(e) {
				// 获取分组id
				let projectId = sessionStorage.getItem('projectId')
				api.get('task/findGroupTask', {
					projectId
				}).then((res) => {
					if(res.data.code === 200) {
						let gid = res.data.data[0].id;
						let currentId = e.target.getAttribute('listid');
						let sourceSort = e.target.getAttribute('sort');
						let coverSort = e.item.parentNode.nextElementSibling.getAttribute('sort') ? e.item.parentNode.nextElementSibling.getAttribute('sort') : -1;
						let params = {
							currentTaskId: currentId,
							sourceSort,
							coverSort,
							gid
						}
						api.post('/task/moveTaskList', params).then((res) => {
							// this.getList(this.getTaskTypeId);
							// window.location.reload();
						})
					} else {
						this.$message(res.data.message);
					}
				});
			},
			// 任务移动
			moveTask(e) {
				//console.log(e, 'Y(^o^)Y');
				// 位置没变不发请求
				if(e.newIndex == e.oldIndex && e.from == e.to) return;
				let eid = sessionStorage.getItem('enterpriseId');
				let pid = sessionStorage.getItem('projectId');
				// 列表id
				let currentListId = e.to.parentNode.getAttribute("listid");
				// 被移动任务id
				let currentTaskId = e.item.getAttribute("taskid");
				// 移动任务的上一个任务sortid  如果自己是第一个就为-1
				let coverSort = e.item.previousElementSibling.getAttribute("sort") ? e.item.previousElementSibling.getAttribute("sort") : -1;
				let params = {
					eid,
					pid,
					currentListId,
					currentTaskId,
					coverSort
				}
				api.post('/task/moveTask', params).then((res) => {
					this.myArray = [];
					this.getList(this.getTaskTypeId);
				})
			},
			//改变复选框的状态
			changeSatus(el) {
				//console.log(1)
				//console.log(el)
				let parm = {
					pid: el.id,
					parentId:el.pid
				}
				let data = {
					eid: sessionStorage.getItem('enterpriseId'),
					projectId: sessionStorage.getItem('projectId'),
					taskId: el.id
				}

				api.get('/task/getTaskPid', parm)
					.then(res => {
						if(res.data.data == true) {
							api.post('/task/taskComplete', data)
								.then(res => {

									if(el.state == 0) {
										el.state = 1;
									} else {
										el.state = 0;

									}
									//parms.stateChange = el.state

								}).then(res => {
									let parms = {
										tid: el.id,
										stateChange: el.state
									}
									api.get('/task/getTaskContent', parms).then(res => {
										this.getList(this.getTaskTypeId)
									})
								})
						}
					})

			},
			//列表下拉框
			checkShow(element, el) {
				this.locations = 'top:' + (el.clientY + 10) + 'px;left:' + el.clientX + 'px';
				this.myArray.map(el => {
					el.show = false
					element.show = true
				})
				this.itemChildren_float = true
			},

			//关闭列表下拉框
			closeElshow(element) {
				element.show = false
			},

			//点击下拉别表li变色  操作编辑盒子
			checknavTtile(index, element) {
				this.checknavTtile_index = index
				this.checkNav_index = -1
				if(this.navTitle[index].name == '编辑列表') {
					this.itemChildren_float = false
					this.itemChildren_setName = true
					this.item_setName = element.name

				}
			},
			checkNav(nav, index) {
				this.checkNav_index = index
				this.checknavTtile_index = -1

			},

			//删除整个任务列表
			deleteTask(index) {
				let data = {
					id: this.myArray[index].id
				}
				api.post('/task/delTaskList', data)
					.then(res => {
						if(res.data.code == 200) {
							this.getList(this.getTaskTypeId)
							this.$notify({
								title: '成功',
								message: ' 成功删除任务列表',
								type: 'success'
							})
						}
					})
			},

			//删除子任务
			sendTask() {
				this.getList(this.getTaskTypeId)
			},
			//待认领
			waitfor() {
				this.peoplesId = 0
				this.receivePeople = false
				this.name = '待认领'
				this.imgUrl = heraderUrl

			},
			//邀请新成员弹出层
			showTaskFloat() {
				this.participate = false
				this.taskFloat = !this.taskFloat
				this.receivePeople = false
			},

			//编辑项目列表名称
			item_setNameButton(element) {
				if(this.item_setName.trim()==''){
					this.$notify({
						title: '警告',
						message: '请填写任务列表名称',
						type: 'warning'
					});
				}else{
					let data = {
					id: element.id,
					name: this.item_setName
				}
				api.post('/task/updTaskList', data)
					.then(res => {
						if(res.data.code == 200) {
							this.getList(this.getTaskTypeId)
							this.$notify({
								title: '成功',
								message: '成功修改任务列表名称',
								type: 'success'
							})
							element.show = false
							this.itemChildren_setName = false
						}
					})
				}

			},

			//
			closeBox() {
				this.labelBox = false
				this.taskJia = true
			},
			//创建标签函数
			addLableShow() {
                //console.log(666)
                this.labelBox = false;
				this.inputLable = ''
				this.addLablebox = true
			},

			//编辑标签 完成函数
			saveLable(li, index) {
				if(this.editorLableBox_Input) {
					li.name = this.editorLableBox_Input
					let data = {
						name: this.editorLableBox_Input,
						id: li.id
					}
					api.post('/task/updLableTable', data)
						.then(res => {
							li.show = false
							if(res.data.code == 200) {
								this.$notify({
									title: '成功',
									message: '修改标签名称成功',
									type: 'success'
								})
							} else if(res.data.code == 500) {
								this.$notify.error({
									title: '错误',
									message: '服务器异常'
								})
							}
						})
				} else {
					this.$notify({
						title: '警告',
						message: '标签名称不可',
						type: 'warning'
					});
				}
			},

			addLableBox_cha(li) {
				li.show = false
				this.lableFloat = false
				this.editorLableBox = false
			},

			//编辑标签
			addLableBox_jian(li) {
				li.show = false
				this.lableFloat = true
				this.editorLableBox = false
			},

			lableFloat_add(li) {
				this.labelList.map(el => {
					el.show = false
					li.show = true
				})
				this.editorLableBox_Input = li.name
				this.editorLableBox = true
				this.addLableBox = true
				this.lableFloat = false
			},

			//添加任务收起
			closeBohter() {
				if(this.imgs.length > 1) {
					this.imgs = []
					this.imgs.push(this.canyuImg)
				}
				//全部清空
				this.isLevel = true
				this.newLable = []
				this.taskTypeId = ''
				this.ids = []
				this.lables = []
				this.taskDescribe = ''
				this.value1 = ''
				this.taskTime = ''
				this.taskCrite = ''
				this.input = ''
				this.taskField = ''
				this.levelName = ''
				this.Active = 0
				this.isLevel = true
				let param = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId')
				}
				api.get('/projects/getUserByPid', param).then(res => {
					this.Peoples = res.data.data
				})
			},

			...mapMutations({

				taskPeople: 'SET_TASKPEOPLE',
				setTaskId: 'SET_TASKTYPEID'
			}),

			//点击进入项目编辑页面
			onte(element, index) {
				this.elementId = element.id

				this.taksCompileShow = !this.taksCompileShow

			},

			showProject() {
				this.showTask = false
				this.hideProjet = !this.hideProjet
			},

			//添加标签方法
			addLable() {
				this.labelBox = false
				this.addLablebox = !this.addLablebox
			},

			//编辑标签
			saveAdd() {
				let params = {
					pid: sessionStorage.getItem('projectId'),
					name: this.inputLable.trim(),
				}

				if(this.inputLable.trim() !== '') {
					api.get('/task/getRepeatLableName', params)
						.then(res => {
							if(res.data.data == true) {
								let data = {
									name: this.inputLable.trim(),
									pid: sessionStorage.getItem('projectId'),
									fid: 3
								}
								if(this.inputLable != '') {
									api.post('/task/addLable', data)
										.then(res => {
											if(res.data.code == 200) {
												let params = {
													pid: sessionStorage.getItem('projectId'),
													fid: 3
												}

												// this.$set(el, 'checked', false);
												// this.$set(el, 'show', false);
												this.labelList = []
												api.get('/task/findTaskLable', params)
													.then(res => {
														res.data.data.map(el => {
															this.$set(el, 'checked', false);
															this.$set(el, 'show', false);
															this.labelList.push(el)
														})

														this.inputLable = ''
													})
											}
											this.addLablebox = !this.addLablebox
                                            this.labelBox = true;
										})
								} else {
									this.$notify({
										title: '警告',
										message: '标签长度不可以超过6个字符',
										type: 'warning'
									})
								}
							} else {
								this.$notify({
									title: '警告',
									message: '标签名字已存在',
									type: 'warning'
								})
								this.inputLable = ''
							}
						})
				} else {
					this.$notify({
						title: '警告',
						message: '请输入标签名字',
						type: 'warning'
					})
				}
			},

			//选择标签增加到新的数组
			addNewLable(li, index) {
				let flag = true
				for(let i in this.newLable) {
					if(this.newLable[i].id == li.id) {
						flag = false
					}
				}
				if(flag) {
					this.newLable.push(this.labelList[index])
					this.lables.push(3 + '-' + this.labelList[index].id)

					this.newLable.map(el => {
						this.$set(el, 'show', false)
					})
					this.labelBox = false
					this.taskJia = true
				}

			},

			//编辑标签 删除函数
			deleteLable(li, index) {
				this.$confirm('是否删除次标签?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.deleteLableLi = li
				let data = {
					id: li.id
				}
				api.post('/task/delLableTable', data).then(res => {
					li.show = false
					this.labelList.splice(index, 1)
//					this.$notify({
//						title: '成功',
//						message: '删除成功',
//						type: 'success'
//					})
					for(let i = 0; i < this.newLable.length; i++) {
						if(this.newLable[i].id == li.id) {
							this.newLable.splice(i, 1)
							this.lables.splice(i, 1)
						}
					}
				})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});

			},

			//删除新标签数组
			deleteNewlable(index) {
				
				this.$confirm('是否删除标签?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
							this.newLable.splice(index, 1)
							this.lables.splice(index, 1)
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				
				
				
			},
			//设置甬道Id
			setArrayId(index) {
				this.myArrayid = this.myArray[index].id
			},
			//标签浮动框
			labelShow() {
				this.taskJia = !this.taskJia
				this.labelBox = !this.labelBox
				let params = {
					pid: sessionStorage.getItem('projectId'),
					fid: 3
				}
				api.get('/task/findTaskLable', params).then(res => {
					res.data.data.map(el => {
						this.$set(el, 'checked', false);
						this.$set(el, 'show', false);
					})
					this.labelList = res.data.data
					//console.log(this.labelList);
				})
			},

			tab() {
				this.yincang = !this.yincang
			},

			//选中优先级li 进行赋值
			levelCheck(index) {
				this.isLevel = false
				this.levelsIndex = index
				this.levelName = this.levels[index].name
				this.taskField = this.taskFielid + '-' + this.levels[index].id
				this.level = false
			},

			//优先级下拉框显示与隐藏
			levelShow() {
				this.level = !this.level
			},

			//获取任务id
			getTask(index) {
				this.task = this.taskList[index].name
				this.taskTypeId = this.taskList[index].id
				sessionStorage.setItem('taskId', this.taskList[index].id)
				this.Active = index;
				this.showTask = false

				let params = {
					typeId: this.taskList[index].id
				}
				api.get('/task/findField', params)
					.then(res => {
						this.list = res.data.data.newData
					})

			},

			//参与者下拉框
			participateXiala() {
				this.level = false
				this.receivePeople = false
				this.participate = !this.participate
				this.taskPeople(this.participate)
				this.setProjectId()
			},

			//增加成员时 成员头像添加到遍历数组
			pushImg(people, index) {
				this.participate = !this.participate
				let flag = true
				for(let i in this.imgs) {
					if(this.imgs[i].id == people.id) {
						flag = false
					}
				}
				if(flag) {
					this.imgs.push(people)
					this.imgs.map(el => {
						if(el.id !== this.peoplesId) {
							this.$set(el, 'show', false)
							//console.log(el);
						}
					})
					this.ids.push(people.id)
				}
			},

			//删除成员头像
			deleteImgs(index) {
				this.$confirm('是否删除参与者?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						//console.log(this.ids);
						this.imgs.splice(index, 1)
						this.ids.splice(index, 1)
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				
			},

			cha() {
                this.labelBox = true;
				this.addLablebox = false
			},

			zuo() {
				this.addLablebox = !this.addLablebox
				this.labelBox = true
			},

			//选中成员
			selected(index) {
				if(index == -2) {
					this.waitfor();
					this.isActive = -2;
					return;
				}
				this.peoplesId = this.Peoples[index].id
				this.imgUrl = this.Peoples[index].user_img
				this.isActive = index
				this.name = this.Peoples[index].username
				this.receivePeople = false
				this.implementPeopleId = this.Peoples[index].id
			},

			//点击用户头像 显示认领 成员下拉框
			receive() {
				this.labelBox = false
				this.level = false
				this.participate = false
				this.receivePeople = !this.receivePeople
				this.taskPeople(this.receivePeople)
				this.setProjectId()
			},

			//显示与隐藏任务列表下拉框z'
			showTasklist() {
				this.showTask = !this.showTask
				this.receivePeople = false
				this.labelBox = false
				this.level = false
				this.participate = false

			},

			//创建任务
			saveButton(index, element) {
				let myDate = new Date()
				if(this.limitHandle) {
					if(this.taskDescribe !== '') {
                        if(this.value1 == '') {
                            this.value1 = myDate.toLocaleDateString()
                        }
                        this.ids.push(this.canyuImg.id)
                        this.limitHandle = false
                        let data = {
                            privacyType:this.yincang ? 0 : 1 ,//公开是0私有是1
                            eid: sessionStorage.getItem('enterpriseId'), //企业id
                            name: this.taskDescribe, //任务描述
                            endTime: this.value1, //设置日期截止事件
                            pid: sessionStorage.getItem('projectId'), //项目id
                            tid: this.myArray[index].id, //任务列表　id
                            implementPeopleId: this.peoplesId, //执行者id
                            taskType: this.taskTypeId, //任务类型
                            ids: this.ids.toString(), //参与人员id
                            lables: this.lables.toString(), //选择标签的id
                            taskField: this.taskField, //优先级
                            timeLong: 5 + '-' + this.taskTime, //工时
                            progress: 6 + '-' + this.taskCrite, //进度
                            target: 4 + '-' + this.input,
                        }
						api.post('/task/addTask', data).then(res => {
							if(res.data.code == 200) {
								this.getList(this.getTaskTypeId)
								this.$notify({
									title: '成功',
									message: '创建任务成功',
									type: 'success'
								})
								let param = {
									eid: sessionStorage.getItem('enterpriseId'),
									pid: sessionStorage.getItem('projectId')
								}
								api.get('/projects/getUserByPid', param).then(res => {
									res.data.data.map(el => {})
									this.Peoples = res.data.data
									this.length = this.Peoples.length
								})
								this.showTask = false
								this.labelBox = false
								this.level = false
								this.participate = false
								this.receivePeople = false
								this.bottomMore = false

								//全清空
								this.isLevel = true
								this.newLable = []
								this.taskTypeId = ''
								this.ids = []
								this.lables = []
								this.taskDescribe = ''
								this.value1 = ''
								this.taskTime = ''
								this.taskCrite = ''
								this.input = ''
								this.taskField = ''
								element.addTaskfloat = false
								this.limitHandle = true
							}
						})
					} else {
						this.$notify.error({
							title: '错误',
							message: '请填写任务名字'
						});
						this.limitHandle = true
					}
				}

			},
			//点击更多显示与隐藏
			addBoreder() {
				this.taskJia = true
				this.more = false
				this.bottomMore = !this.bottomMore
				let params = {
					typeId: this.taskTypeId
				}
				api.get('/task/findField', params).then(res => {
					let arr = res.data.data.newData
					let index = arr.findIndex(el => {
						return el.name == '标签'
					})
					let obj = {}
					for(let i in arr[index]) {
						obj[i] = arr[index][i]
					}
					arr.splice(index, 1);
					arr.push(obj);
					this.list = arr
					this.taskFielid = res.data.data.data.id
					this.youUrl = res.data.data.data.icon
					this.priority = res.data.data.data.name
				})

			},
			//添加任务显示与隐藏
			addTask(element) {
				this.search=''
				if(this.imgs.length > 1) {
					this.imgs = []
					this.imgs.push(this.canyuImg)
				}

				//全部清空
				this.isLevel = true
				this.newLable = []
				this.taskTypeId = ''
				this.ids = []
				this.lables = []
				this.taskDescribe = ''
				this.value1 = ''
				this.taskTime = ''
				this.taskCrite = ''
				this.input = ''
				this.taskField = ''
				this.levelName = ''

				this.Active = 0
				this.isLevel = true
				this.myArray.map(el => {
					el.addTaskfloat = false
					element.addTaskfloat = true
				})
				let param = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId')
				}
				api.get('/projects/getUserByPid', param).then(res => {
					res.data.data.map(el => {
						this.$set(el, 'show', false)
					})
					this.Peoples = res.data.data
				})

				//关闭所有弹框
				this.participate = false
				this.showTask = false
				this.receivePeople = false
				this.addLablebox = false
				this.addTaskfloat = !this.addTaskfloat
				this.bottomMore = false
				this.yincang = false
				this.more = true
				// 获取项目id
				let id = sessionStorage.getItem('projectId')
				let params = {
					pid: id
				}
				//查找任务列表
				api.get('/task/findTaskType', params).then(res => {
					if(res.data.data != '') {
						this.taskTypeId = res.data.data[0].id
						this.taskList = res.data.data
						this.task = res.data.data[0].name
					} else {
						this.task = '添加和任务管理类型'
					}

				})

			},
			createLi() {
				this.vCreate = !this.vCreate
			},
			cancel() {
				this.vCreate = !this.vCreate
			},

			save() {
				let tid = sessionStorage.getItem('tid')
				let data = {
					name: this.createInput,
					tid
				}
				if(this.createInput.trim() != '') {
					api.post('/task/addTaskList', data).then(res => {
						if(res.data.code == 200) {
							this.vCreate = true
							this.createInput = ''
							this.getList(this.getTaskTypeId)
						}
					})
				}else{
					this.$notify({
						title: '警告',
						message: '请填写任务列表名称',
						type: 'warning'
					});
				}

			},

			//页面加载时候数据
			getData() {
				let params = {
					id: sessionStorage.getItem('userId')
				}
				api.get('/userInfo/getUserMessage', params).then(res => {
					this.peoplesId = res.data.data.id
					this.id = res.data.data.id
					this.implementPeopleId = res.data.data.id
					this.name = res.data.data.username
					this.imgUrl = res.data.data.user_img
					this.canyuImg = res.data.data
					this.imgs.push(this.canyuImg)
				})
			},

			//发送项目id函数
			setProjectId() {
				let param = {
					pid: sessionStorage.getItem('projectId'),
					eid: sessionStorage.getItem('enterpriseId'),
				}
				api.get('/projects/getUserByPid', param).then(res => {
					res.data.data.map(el => {
//						if(el.user_img == '') {
//							if(el.username != '') {
//								el.user_img = JSON.parse(sessionStorage.getItem('userMessage')).account.substring(0,1)
//							} else {
//								el.user_img = headerUrl
//							}
//						}
					})
					this.Peoples = res.data.data
				})
			},

			//获取数组
			getMyarray() {
				let params = {
					projectId: sessionStorage.getItem('projectId')
				}
				api.get('/task/findGroupTask', params).then(res => {
					this.tid = res.data.data[0].id
					sessionStorage.setItem('tid', this.tid)
				})
			},

			//任务列表
			getList(taskTypeId) {
				this.setTaskId(taskTypeId)
//				alert(sessionStorage.getItem('projectId'))
				let params = {
					tid: taskTypeId,
					projectId: sessionStorage.getItem('projectId'),
					roleId:this.projectRoleIds == 4 ? 1 : 0,
				}
				api.get('/task/findTaskByGroupId', params).then(res => {
					this.myArray = []
					res.data.data.map(el => {
						this.$set(el, 'show', false);
						el.addTaskfloat = false
						el.tasksList.map(el => {
							this.$set(el, 'checked', false);
							el.createTime = this.getTime(el.startTime).slice(0, 10)
							el.endTime = this.getTime(el.endTime).slice(0, 10)
//							if(el.user.user_img == '') {
//								el.user.user_img = JSON.parse(sessionStorage.getItem('userMessage')).account.substring(0,1)
//							}
							if(el.fileURL == '') {
								el.fileURL = headerUrl
							}
						})
						this.myArray.push(el)
						document.getElementsByClassName("box")[0].style.width = 306 * this.myArray.length + 'px'
					})
				})

			},

			//时间戳转换函数
			getTime(timestamp) {
				let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate() + ' ';
				let h = date.getHours() + ':';
				let m = date.getMinutes() + ':';
				let s = date.getSeconds();
				return Y + M + D + h + m + s;
			},
		},

		computed: {
			...mapGetters({
				getinvitationLength: 'GET_INVITATIONLENGTH',
				getTaskInvitation: 'GET_TASKINVITATION',
				getSetInvitation: 'GET_SETINVITATION',
				getTid: 'GET_TID',
				GET_MYARRAY: 'GET_MYARRAY',
				getEnterpriseId: 'GET_ENTERPRISEID',
				getTaskTypeId: 'GET_TASKTYPEID'
			}),
		},
		created: function() {
			this.getMyarray()

			this.getData()
			api.get('/task/findGroupTask', {
				projectId: sessionStorage.getItem('projectId')
			}).then(res => {
				this.getList(res.data.data[0].id)
			})

			//接收组件通信信息
			Bus.$on('toQueryProjectPermission', (msg) => {
				//console.log(msg)
				//创建任务
				this.newProjectFlage = msg.projectPermissionList[6].status
				this.newProjectListFalge = msg.projectPermissionList[11].status
				this.editProjectListFalge = msg.projectPermissionList[12].status
				this.delProjectListFalge = msg.projectPermissionList[13].status

				//添加参与者权限
				this.addParticipantFlage = msg.projectPermissionList[16].status
				//移除参与者权限
				this.removeParticipantFlage = msg.projectPermissionList[17].status
				//设置隐藏模式
				this.editProjectHeadFlage = msg.projectPermissionList[18].status
				this.userImg =JSON.parse(sessionStorage.getItem('userMessage')).account.substring(0,1)
			//console.log(this.userImg)
			this.projectRoleIds = msg.roleId

			});
		},
		watch: {
			search(val){
				let param = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId'),
					name:val
				}
				api.get('/projects/getUserByPid', param).then(res => {
					this.Peoples=res.data.data
				})
			},
			taksCompileShow(val) {
				this.getList(this.getTaskTypeId)
			},
			value1() {
				let currentDate = Date.parse(new Date());
				let selectDate = Date.parse(new Date(this.value1));
				//      if (selectDate < currentDate) {
				//        let date = currentDate + 1000*60*60*24;
				//        this.value1 = this.getTime(date)
				//      }
			},
			getinvitationLength() {
				let param = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId')
				}
				api.get('/projects/getUserByPid', param).then(res => {
					this.Peoples = res.data.data
				})
			},

			//关闭参与者
			getTaskInvitation() {
				this.participate = false
				this.receivePeople = false
			},

			//关闭参与者
			getSetInvitation() {
				this.participate = false
				this.receivePeople = false
			},

			//如果任务类型id发生改变 刷新任务页面
			getTaskTypeId() {
				this.getList(this.getTaskTypeId)
			},
			labelList() {
				this.searchLableArray = this.labelList
			},
			searchLable() {
				this.searchLableArray = this.labelList.filter(el => {
					if(el.name.indexOf(this.searchLable) !== -1) {
						return true
					}
				})
			},

			//检测工时 时间不得超过1000
			taskTime(newVal, oldVal) {
				if(newVal > 1000) {
					this.taskTime = oldVal
					this.$notify.error({
						title: '错误',
						message: '工时不可以超过1000小时'
					})
				} else if(newVal < 0) {
					this.taskTime = ''
					this.$notify.error({
						title: '错误',
						message: '工时不可以超过为负数'
					})
				}
			},

			//检测进度 时间不得超过100
			taskCrite(newVal, oldVal) {
				if(newVal > 100) {
					this.taskCrite = oldVal
					this.$notify.error({
						title: '错误',
						message: '进度不得超过100'
					});
				} else if(newVal < 0) {
					this.taskCrite = ''
					this.$notify.error({
						title: '错误',
						message: '进度不得为负数'
					})
				}
			},
			taskDescribe(newVal, oldVal) {
				if(newVal.length > 19) {
				  this.length = 20;
					this.taskDescribe = newVal
					this.$notify.error({
						title: '错误',
						message: '任务名称不能超过20'
					});
				}
			},
            inputLable(val, oldVal) {
                if(val.length > 10) {
                    setTimeout(()=>{
                        this.inputLable = oldVal;
                    },100)
                    this.$notify({
                        title: '警告',
                        message: '标签名称不可超过10字',
                        type: 'warning'
                    });

                }
            },
            editorLableBox_Input(val, oldVal) {
                if(val.length > 10) {
                    setTimeout(()=>{
                        this.editorLableBox_Input = oldVal;
                    },100)
                    this.$notify({
                        title: '警告',
                        message: '标签名称不可超过10字',
                        type: 'warning'
                    });

                }
            }
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.taskBox {
		width: 100%;
		overflow: auto;
		height: 80vh;
	}

	.itemChildre_title {
		height: 53px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 15px;
		border-bottom: 1px solid #efefef;
		position: relative;
	}

	.itemChildre_title>span {
		font-size: 14px;
	}

	.box {
		display: inline-block;
		/*white-space: nowrap;*/
		/*word-break: break-word;*/
	}

	.create {
		width: 234px;
		height: 17px;
		background: #f7f7f7;
		right: 0;
		align-items: center;
		padding: 14px 18px;
		display: flex;
		margin-left: 10px;
	}

	.taskHeader:hover {
		color: deepskyblue;
	}

	.itemChildren {
		border-radius: 4px;
		box-shadow: 0px 0px 11px #E1E1E1;
		width: 265px;
		background: #fff;
		position: fixed;
		top: 45px;
		left: 25px;
		z-index: 2;
		padding-bottom: 18px;
	}

	.maL28 {
		margin-left: 28px;
	}

	.buttonBox {
		margin-top: 15px;
	}

	.roleListfloat {
		width: 200px;
		height: 200px;
		color: red;
	}

	.dessccs {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		border: 1px dashed #4e99ff;
		border-radius: 30px;
	}

	.personnelFloat {
		position: absolute;
		z-index: 2000;
		background: #fafafa;
		top: 150px;
		width: 340px;
		left: 490px;
		padding: 30px;
	}

	.rightNav {
		padding: 0 20px 20px 20px;
		background: #ffffff;
		position: absolute;
		right: 0;
		z-index: 2;
	}

	.roleListFals {
		width: 250px;
		z-index: 999;
		top: 415px;
		left: 1170px;
		display: block;
		bottom: auto;
	}

	.navHeader {
		padding: 20px 0 20px 0;
		width: 300px;
		height: 10px;
		border-bottom: 2px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.navList {
		padding-bottom: 20px;
		border-bottom: 1px solid;
	}

	.inputPersonnel {
		position: relative;
		margin-top: 20px;
	}

	.inputPersonnel>input {
		width: 340px;
		height: 35px;
		margin-top: 20px;
	}

	.navList>li {
		margin-top: 20px;
	}

	.mgT20 {
		margin-top: 20px;
	}

	.pdB20 {
		border-bottom: 1px solid;
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

	.rightLog>li {
		padding: 0 15px 0 15px;
	}

	.personnel {
		padding: 0 20px 20px 20px;
		background: #ffffff;
		position: absolute;
		right: 0;
		z-index: 2;
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

	.active {
		font-size: 12px;
		color: #4e99ff;
	}

	.inputPli {
		position: relative;
	}

	.linputSpan {
		display: block;
		width: 50px;
		height: 25px;
		background: #4e99ff;
		position: absolute;
		right: 0;
		text-align: center;
		color: #ffffff;
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

	.add {
		color: #1296db;
	}

	.itemc .selColor {
		background: #f7f7f7;
	}

	.itemc .fontColor {
		color: #a1a1a1;
	}

	.itemc {
		/*position: relative;*/
		padding: 10px;
		width: 270px;
		float: left;
		overflow: auto;
		background: #f7f7f7;
		height: 91vh;
		margin-left: 10px;
		border-right: 6px solid rgba(0, 0, 0, 0);
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.itemc::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.itemc::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.itemc::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}

	.hand {
		font-size: 14px;
		margin-bottom: 13px;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
	}

	.itemc .selColor {
		// color: #f7f7f7;
	}

	.itemc .selColor .fontColor {
		color: #a1a1a1;
	}

	.task {
		width: 100%;
		background: white;
		margin-bottom: 10px;
		border-radius: 4px;
		border-left: 6px solid rgba(0, 0, 0, 0);
		transition: border 1s;
		box-shadow: 0px 0px 10px #E1E1E1;
		.title {
			justify-content: space-between;
			display: flex;
			margin-left: 10px;
			margin-right: 10px;
		}
		.progress {
			margin-top: 10px;
			text-align: center;
			.name {
				color: #bbbbbb;
			}
			.wrap {
				display: inline-block;
				width: 135px;
				height: 5px;
				margin: 0 6px;
				vertical-align: middle;
				border-radius: 3px;
				background-color: #e4e4e4;
				.bar {
					height: 5px;
					border-radius: 3px;
					float: left;
					background-color: #76a2e3;
				}
				.bar.yq {
					background-color: #e3768a;
				}
				.bar.wc {
					background-color: #87c5ba;
				}
			}
		}
		.report {
			width: 100%;
			margin-top: 10px;
			box-sizing: border-box;
			padding: 0 20px;
			white-space: normal;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			word-break: break-all;
			overflow: hidden;
			cursor: pointer;
			.name {
				color: #bbbbbb;
			}
		}
		.icons,
		.labels {
			margin-top: 10px;
			margin-left: 30px;
			color: #999999;
			display: flex;
			flex-wrap: wrap;
		}
		.icons i {
			margin-right: 10px;
		}
		.labels {
			div {
				cursor: pointer;
				padding: 0 4px;
				margin-right: 10px;
				background: #c9e6f5;
				color: white;
				margin-top: 4px;
				border-radius: 4px;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.task:hover {
		border-left: 6px #e3768a solid;
	}

	.addTask {
		width: 100%;
		height: 36px;
		display: flex;
		justify-content: center;
		align-content: center;
		background: white;
		color: #0a7ee9;
		border-left: 6px solid rgba(0, 0, 0, 0);
		box-shadow: 0px 0px 10px #E1E1E1;
		span {
			cursor: pointer;
			line-height: 36px;
			i {
				margin-right: 6px;
			}
		}
	}

	.taskManagement {
		width: 100%;
		display: flex;
		justify-content: center;
		position: fixed;
		top: 30px;
		z-index: 10;
	}

	.cccc {
		background: gainsboro !important;
	}

	.floatHeader {
		display: flex;
		align-items: center;
		position: relative;
	}

	.floatHeader>p {
		margin-left: 10px;
	}

	.floatHeader>img {
		margin-left: 10px;
	}

	.addTaskfloat {
		border-left: 6px solid rgba(0, 0, 0, 0);
		margin-top: 10px;
		width: 100%;
		background: #ffffff;
		box-shadow: 0px 0px 10px #E1E1E1;
	}

	.floatInput {
		width: 100%;
		margin-top: 20px;
	}

	.imgItem {
		position: relative;
		padding: 2px;
	}

	.imgItem>i {
		font-size: 12px;
		position: absolute;
		left: 26px;
		top: -8px
	}

	.yongHeader {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.yongHeader>img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}

	.itemChildre_navTitle {
		padding-bottom: 18px;
		border-bottom: 1px solid #efefef;
	}

	.navTitle>span {
		font-size: 12px;
	}

	.navTitle {
		cursor: pointer;
		margin-top: 18px;
	}

	.yongyou {
		cursor: pointer;
		display: flex;
		align-items: center;
		margin-top: 15px;
		position: relative;
	}

	.yongyouP {
		margin-left: 7px;
		font-size: 14px;
		color: #333333;
		font-weight: 600;

     line-height: 30px;
	}

	.addbother {
		width: 90%;
		margin: auto;
		padding-top: 25px;
		padding-bottom: 10px;
		position: relative;
	}

	.borederBottom {
		margin-top: 15px;
		height: 1px;
		width: 100%;
		background: #e7e7e7;
	}

	.bottomMore {
		border-bottom: 1px solid #e7e7e7;
	}

	.canyu {
		margin-top: 10px;
	}

	.canyuHeader {
		margin-left: 7px;
		font-size: 14px;
		color: #888888;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.canyuTitle>div>i {
		color: #e7e7e7;
		font-size: 30px;
	}

	.canyuTouxiang {
		display: flex;
		margin-right: 10px;
		flex-wrap: wrap;
	}

	.canyuTouxiang>li>img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}

	.canyuTitle {
		margin-top: 10px;
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
	}

	.more>p {
		font-size: 14px;
		margin-left: 10px;
	}

	.more {
		margin-top: 15px;
		display: flex;
		align-items: center;
	}

	.ft12 {
		font-size: 12px;
	}

	.saveButton {
		cursor: pointer;
		font-weight: bold;
		font-size: 14px;
		width: 72px;
		height: 38px;
		background: #077ce7;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		margin-left: 75px;
	}

	.taskList {
		width: 99%;
		position: absolute;
		top: 30px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
	}

	.receivePeople {
		padding-bottom: 10px;
		width: 230px;
		position: absolute;
		top: 30px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
	}

	.imgTitle {
		height: 37px;
		display: flex;
		align-items: center;
		font-size: 14px;
		cursor: pointer;
		position: relative;
	}

	.imgTitle>p {
		font-size: 12px;
		color: #999999;
	}

	.imgTitle>img {
		margin-left: 20px;
	}

	.imgTitle:hover {
		background: #e5e5e5;
	}

	.imgTitle>img {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}

	.imgTitle>p {
		margin-left: 10px;
	}

	.level {
		font-size: 14px;
		position: absolute;
		right: 0;
		cursor: pointer;
	}

	.level>div>p {
		border-radius: 3px;
		top: -10px;
		font-weight: bold;
		font-size: 12px;
		right: 0;
		position: absolute;
		cursor: pointer;
	}

	.gengduo:hover {
		color: #077ce7;
		cursor: pointer;
	}

	.pointer {
		cursor: pointer;
	}

	.levelFloat>li {
		position: relative;
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 14px;
		cursor: pointer;
	}

	.levelFloat>li>p {
		margin-left: 10px;
		padding: 2px 8px;
		border-radius: 6px;
	}

	.levelFloat {
		width: 99%;
		position: absolute;
		top: 30px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
	}

	.inputEl>input {
		width: 150px;
		-webkit-appearance: none;
		background-color: #fff;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #606266;
		display: inline-block;
		font-size: inherit;
		height: 40px;
		line-height: 1;
		outline: 0;
		padding: 0 15px;
		-webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
	}

	.absloue {
		position: absolute;
		right: 0;
	}

	.label {
		right: 0;
		position: relative;
		background: #ffffff;
		top: 20px;
		z-index: 1;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		width: 250px;
		border-radius: 10px;
	}

	.label>div {
		display: flex;
		align-items: center;
	}

	.label>div>P {
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		font-size: 14px;
		color: gray;
		align-items: center;
		height: 40px;
		margin-left: 10px;
		width: 100%;
	}

	.lableList {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		cursor: pointer;
	}

	.floatHeader>p {
		font-size: 14px;
	}

	.addLablebox {
		width: 250px;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		z-index: 9999;
		position: relative;
		padding-bottom: 10px;
	}

	.menu-item>p {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.menu-item {
		display: flex;
		align-items: center;
		padding: 0 16px;
		height: 36px;
		line-height: 36px;
		cursor: pointer;
		font-size: 14px;
		position: relative;
	}

	.menu-item:hover {
		background: #e5e5e5;
	}

	.youxianji {
		height: 30px;
		display: flex;
		position: relative;
		align-items: center;
		margin-top: 10px;
	}

	.bianli {
		display: flex;
		position: relative;
		margin-top: 10px;
		height: 50px;
		align-items: center;
	}

	.bianli {
		font-size: 14px;
	}

	.bianli>p {
		font-size: 14px;
		margin-left: 8px;
	}

	.youxianji>p {
		margin-left: 8px;
		font-size: 14px;
	}

	.addLableboxTitle {
		margin: 0 auto;
		height: 40px;
		width: 90%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid #efefef;
	}

	.addLableboxTitle>p {
		font-size: 14px;
		color: #333333;
	}

	.yaoqing {
		cursor: pointer;
		color: #077ce7;
		font-size: 14px;
		margin-left: 20px;
		display: flex;
		align-items: center;
	}

	.yaoqing>img {
		width: 24px;
		height: 24px;
		margin-right: 10px;
	}

	.saveAdd {
		font-weight: bold;
		cursor: pointer;
		width: 90%;
		margin: 10px auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #077ce7;
		text-align: center;
		color: #ffffff;
		height: 35px;
		border-radius: 5px;
	}

	.labelListBox {
		cursor: pointer;
		position: relative;
	}

	.labelListBox:hover {
		background: #e5e5e5;
	}

	.labelListBox>div {
		margin-right: 15px;
	}

	.closeBohter {
		position: absolute;
		right: 0;
		top: 10px;
		cursor: pointer;
	}

	.title>div>img {
		width: 30px;
		height: 30px;
		border-radius: 30px;
	}

	.pointerOne {
		font-size: 14px;
		font-weight: bold;
		color: #888888;
	}

	.pointerTwo {
		color: #999999;
		font-size: 12px;
	}

	.lv {
		background: #97d5ca;
		color: #ffffff;
		padding: 3px 11px;
	}

	.yellow {
		background: #ebc36d;
		color: #ffffff;
		padding: 3px 11px;
	}

	.red {
		background: #e3768a;
		color: #ffffff;
		padding: 3px 11px;
	}

	.lableFloat-input {
		flex: 1;
		padding: 8px 0 8px 18px;
		border: none;
		width: 160px;
		height: 24px;
	}

	.lableI {
		cursor: pointer;
		color: rgb(61, 168, 245);
		width: 48px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.addLableBox_title {
		justify-content: center;
		align-items: center;
		height: 40px;
		display: flex;
		position: relative;
		border-bottom: 1px solid #e5e5e5;
	}

	.editorLableBox {
		padding: 0 10px;
		border-radius: 5px;
		position: absolute;
		z-index: 999;
		box-shadow: 0 2px 20px #999999;
		background: #f7f7f7;
	}

	.addListlable {
		text-overflow: ellipsis;
		overflow: hidden;
		display: flex;
		align-items: center;
		margin: 5px;
		padding: 1px 5px;
		border-radius: 2px;
		background: #efefef;
	}

	.allPeople {
		height: 36px;
		font-size: 12px;
		display: flex;
		align-items: center;
		color: #333333;
		background: #F7F7F7;
	}

	.allPeople>span {
		margin-left: 20px;
	}

	.zhanwei {
		width: 10px;
		height: 10px;
	}

	.itemName {
		display: inline-block;
		width: 85%;
		white-space: pre-wrap;
	}

	.bulb {
		color: #77c2f8;
	}

	.money {
		color: #69b6fd;
	}

	.people {
		color: #fdcd89;
	}

	.water {
		color: #87d9f1;
	}

	.electricity {
		color: #f9978a;
	}

	.star {
		color: #ffb74c;
	}

	.rightss {
		color: #f94f4f;
	}
		.img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
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
}
.inputStyle{
	-webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    border-color: #c0c4cc;
}
</style>
