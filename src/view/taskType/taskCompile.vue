<template>
	<div>
		<el-dialog title="任务编辑" @close="closeDialog" :visible.sync="taksCompile" :append-to-body="true" width="805px" center>
			<div style="position: relative">
				<div class="taskEtidBox" style="height: 60vh;overflow-y: auto">
					<div style="position: absolute;top: -120px; display: flex">
						<slot></slot>
					</div>
					<div @click="backgroundFasle">
						<!--
            <div class="navBox">
              <li class="nav" v-for="(nav, index) in fieldList" style="cursor: pointer" @click="navClick(nav)">
                <i :class="nav.icon" ></i>
                <div class="mgL6" style="white-space: nowrap;">
                  {{nav.name}}
                </div>
                <div v-if="nav.name =='标签'">
                   <div  class="lableBox"  v-show="lable ">
                  <div class="lableTitle" >
                    <p>设置标签</p>
                    <img @click="hidelableBox" src="../../assets/images/差号.png" alt="">
                  </div>
                  <div class="lableInput">
                    <el-input v-model="lableInput" placeholder="标签名称"></el-input>
                  </div>
                  <div class="lableButton">
                    <div>创建</div>
                  </div>
                </div>
                </div>
                <div v-if="nav.name == '优先级'" class="levelBox" v-show="level">
                  <div v-for="(lab , index) in levelList">
                    <div style="margin-top: 20px" >
                      {{lab.name}}
                    </div>
                  </div>
                </div>
              </li>
              <div  style="position:relative;display: flex;align-items: center;margin-right: 20px;" v-for="(li ,index ) in navData" @click="navDataClick(li)">
                <img :src="li.img" alt="">
                <p class="mgL6">{{li.name}}</p>
                <div v-if="li.name == '附件'" v-show="accessory" class="accessoryBox">
                  <div style="padding: 0 12px;">
                    <div style="display: flex;margin-top: 18px ">
                      <i class="iconfont icon-diannao"></i>
                      <p style="margin-left: 5px">本地上传</p>
                    </div>
                    <div style="display: flex;margin-top: 18px ">
                      <i class="iconfont icon-wenjian"></i>
                      <p style="margin-left: 5px">从项目文件选择</p>
                    </div>
                  </div>
                  <div style="display: flex;align-items: center;margin-top: 18px">
                    <div style="width: 170px;display: flex">
                      <el-input v-model="accessoryInput" placeholder="粘贴下载链接"></el-input>
                    </div>
                    <div class="addAddce">
                      <p style="display: flex;align-items: center">添加</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
-->
						<div class="contentBox">
							<div class="  cTit" style="position: relative">
								<div>
									<span class="f3f3f3">{{title}}</span>
								</div>
								<div @click="taskSort =!taskSort" style="cursor: pointer;
                position:absolute;right: 10px;top: 6px; font-size: 18px;width: 40px;height: 40px;">
									<i class="iconfont icon-xiala"></i>
								</div>
								<div class="taskSort" v-show="taskSort">
									<div class="taskSortTit">
										<p>任务菜单</p>
										<img src="../../assets/images/差号.png" style="cursor: pointer" @click="taskSort = false" alt="">
									</div>
									<div class="tasks">
										<div class="taskSort_task" v-for="(li, index) in tasks" :class="{taskSortAcitve:taskSortAcitveIndex ==index }" @click="checkTaskActive(index)">
											<i class="iconfont" :class="li.icon"></i>
											<p :class="{taskSortAcitve:taskSortAcitveIndex ==index }">{{li.name}} </p>
										</div>
									</div>
									<div class="task_List">
										<div class="taskSort_taskList" :class="{taskSortAcitve :taskSort_Index ==index }" v-for="(li, index) in taskList" @click.stop="checkTaskSort(li,index)">
											<i class="iconfont" :class=" li.icon"></i>
											<p :class="{taskSortAcitve :taskSort_Index ==index }">{{li.name}}</p>
										</div>
									</div>
									<div class="privacy">
										<div class="privacyBox">
											<i class="iconfont icon-suo"></i>
											<div style="margin-left: 20px">
												<p style="font-size: 14px">隐私模式</p>
												<p style="font-size: 12px">所有成员可见</p>
											</div>
											<div style="color:rgb(40, 121, 255);margin-left: 25px;font-size: 12px;margin-top: 24px;">
												已关闭
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="title">
								<div class="projectName ">
									<span @click="changeSatus1()">
										<i v-if="state == 0" class="iconfont icon-xuanzekuang"></i>
										<i v-if="state == 1" class="iconfont icon-duoxuankuang2"></i>
									</span>
									
									<el-tooltip class="item" effect="dark" content="点击即可编辑" placement="top-start">
										<p v-if="state == 0" class="ft16 hoverName" style="cursor: pointer" v-show="show" @click="hideInput">{{project}}</p>
										<p v-if="state == 1" class="ft16 hoverName" style="cursor: pointer;color: #a1a1a1;" v-show="show" @click="hideInput">{{project}}</p>
									</el-tooltip>
									<input type="text" class="projectInput" v-model="projectInput" @blur.prevent="showP" @keyup.enter="showP" v-show="isShow">
								</div>
								<div class="projectHeader">
									<div class="dispaly" style="cursor: pointer;position: relative;width: 95px" @click="showPro">
										<div class="imgHeader">
											<img v-if="imgUrl != ''" :src="imgUrl" />
											<img v-if="imgUrl == ''" src="../../assets/images/22登录_01.png" />
										</div>
										<p class="mgL10" style="white-space:nowrap;color: #333333;font-size: 14px"> {{Name}}</p>
										<div style="cursor: pointer;position: absolute;right: -18px;">
											<i class="iconfont icon-xiala" style="margin-left: 10px"></i>
										</div>
									</div>
									<div class="mgL30 projectHeader_children">
										<i class="iconfont icon-rili1" style="margin-right: 10px;"></i>
										<div style="width: 80px">
											<div class="rrli el-input__inner el-input--suffix">
												<el-date-picker v-model="startTime" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期">
												</el-date-picker>
											</div>
										</div>
									</div>
									<div style="display: flex;align-items: center;color: gray;">&nbsp;&nbsp;-&nbsp;&nbsp;</div>
									<div class="projectHeader_children boxInt">
										<div style="width: 80px">
											<div class="rrli el-input__inner el-input--suffix">
												<el-date-picker v-model="endTime" type="date" value-format="yyyy-MM-dd" placeholder="选择截止日期">
												</el-date-picker>
											</div>
										</div>
									</div>
									<div class="mgL30 projectHeader_children" style="white-space: nowrap;">
										<img src="../../assets/images/重复.png" alt="">
									</div>
									<div class="mgL30 projectHeader_children" style="white-space: nowrap;">
										<img src="../../assets/images/提醒_09.png" alt="">
									</div>
									<div class="projectHeaderFloat" v-show="projectHeaderFloat">
										<div style="padding: 0 20px">
											<el-input v-model="searchInput" placeholder="查找成员"></el-input>
										</div>
										<div style="padding-top: 20px" class="peoples">
											<div v-for="(li ,index) in searchArr " style="cursor: pointer" @click.stop="checkPeople(li,index)" :class="{peopleAcitve : peopleIndex == index}">
												<div style="margin-left: 20px">
													<img style="width: 30px;height: 30px;border-radius: 50%;display: flex;" v-if="li.user_img != ''" :src="li.user_img" />
													<img style="width: 30px;height: 30px;border-radius: 50%;display: flex;" v-if="li.user_img == ''" src="../../assets/images/22登录_01.png" />
												</div>
												<div style="margin-left: 5px;">
													{{li.username}}
												</div>
												<div style="position:absolute;right: 20px" v-show="li.lconShow">
													<i class="iconfont icon-duihao"></i>
												</div>
											</div>
											<div @click="invitationTaskShow" style="cursor: pointer">
												<i style="margin-left: 20px; font-size:30px; color: #649ef8;" class="iconfont icon-tianjia1 "></i>
												<div style="color: #649ef8">邀请新成员</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="threeBox">
								<li v-for="(li , index) in  fieldList" style="position: relative;display: flex">
									<div style="width: 75px;height: 40px;display: flex">
										<i :class="li.icon" style="position: absolute;top:10px;left: 0;"></i>
										<div class="mgL10 fieldListname">
											{{li.name}}
										</div>
									</div>
									<div v-if="li.name == '任务目标' " style="display: flex">
										<div @click="targetboxShow " style="display: flex;align-items: center;margin-left: 30px" v-show="!targetbox">
											<div style="cursor: pointer">
												{{targetContent}}
											</div>
										</div>
										<div v-show="targetbox" style="display: flex;align-items: center;margin-left: 30px">
											<div style="width: 300px;display: flex;align-items: center" @click="target=true">
												<el-input v-model="input" placeholder="请输入任务目标"></el-input>
											</div>
											<div style="display: flex;align-items: center;margin-left: 20px" v-show="target">
												<el-button style="margin-right: 10px" @click="targetCancel">取消</el-button>
												<el-button type="primary" @click="targetSave">保存</el-button>
											</div>
										</div>
									</div>
									<div v-if="li.name == '优先级' " class="mgL30" style="display: flex;align-items: center;">
										<div>
											<div style="cursor: pointer;" @click="youxianShow">
												<p v-if="youxian== '' ">请添加</p>
												<p v-if="youxian == '一般'" style=" border-radius: 6px; padding: 2px 8px;" :class="{lv:youxian == '一般'}">{{youxian}}</p>
												<p v-if="youxian == '紧急'" style=" border-radius: 6px; padding: 2px 8px;" :class="{yellow:youxian == '紧急'}">{{youxian}}</p>
												<p v-if="youxian == '非常紧急'" style=" border-radius: 6px; padding: 2px 8px;" :class="{red:youxian == '非常紧急'}">{{youxian}}</p>
											</div>
											<div v-show="showYou" class="levelFloat">
												<div style="position: relative;display: flex;align-items: center" v-for="(li ,index) in youxianji" @click="checkYou(index)">
													<p v-if="li.name == '一般'" style="width: 40px;height: 20px" :class="{lv:li.name == '一般'} ">
														{{li.name}}
													</p>
													<p v-if="li.name == '紧急'" style="width: 40px;height: 20px" :class="{yellow:li.name == '紧急'} ">
														{{li.name}}
													</p>
													<p v-if="li.name == '非常紧急'" :class="{red:li.name == '非常紧急'} ">
														{{li.name}}
													</p>
													<i v-show="li.show" style="position: absolute;right: 20px;color:#0a7ee9;" class="iconfont icon-duihao"></i>
												</div>
											</div>
										</div>
									</div>
									<div v-if="li.name == '标签'" class="mgL30 " style="display: flex;align-items: center;cursor: pointer">
										<div style=" display: flex;">
											<div v-show="addLables" @click="showLable">
												添加标签
											</div>
											<div style="margin-right:10px" v-for="(li , index) in lables" v-show="!addLables" class="lablesHover">
												<div style="overflow: hidden;  text-overflow: ellipsis;white-space: nowrap">{{li.name}}</div>
												<div class="deletIcon" @click="deleteLables(li,index)">
													<i style="color: #ffffff;margin-left: 2px;font-size: 12px" class="iconfont icon-guanbi"></i>
												</div>
											</div>
											<div @click="showLables">
												<i class="iconfont icon-tianjia2"></i>
											</div>
										</div>
										<div class="lableFloat">
											<div v-show="lableFloat">
												<div style="display: flex">
													<div>
														<input type="text" class="lableFloat-input" placeholder="搜索标签">
													</div>
													<div style="color: #3da8f5;" class="lableI" @click="lableFloat_add">
														<i class="iconfont icon-tianjia2"></i>
													</div>
												</div>
												<div class="label" @click="addLable(index,li)" v-for="( li , index ) in labelList" @mouseover="li.show =true" @mouseleave="li.show=false">
													<p>{{li.name}}</p>
													<div v-show="li.show" class="label_icon" @click.stop="editorLable(li)">
														<i class="iconfont icon-bianji1"></i>
													</div>
												</div>
											</div>
											<div class="addLableBox" v-show="addLableBox">
												<div class="addLableBox_title">
													<div style="position: absolute;left: 10px;" @click="addLableBox_houtui">
														<i class="iconfont icon-jiantouyou-copy" style="font-size: 18px"></i>
													</div>
													<div>
														<span style="color: #383838;">新建标签</span>
													</div>
													<div style="position: absolute;right: 10px;" @click="addLableBox_guanbi">
														<i style="font-size: 12px" class="iconfont icon-guanbi"></i>
													</div>
												</div>
												<div style="display: flex;align-items: center;justify-content: center;margin-top: 20px">
													<div style="width: 216px;border: 1px solid #e5e5e5;">
														<div class="el-input__inne">
															<el-input v-model="addLableBox_input" placeholder="请输入内容"></el-input>
														</div>
													</div>
												</div>
												<div style="display: flex;justify-content: center;align-items: center;margin-top: 20px">
													<button class="addLableBox_Button" @click="addLableBox_Button">创建</button>
												</div>
											</div>
											<div class="editorLableBox" v-show="editorLableBox">
												<div class="addLableBox_title">
													<div style="position: absolute;left: 10px;" @click="addLableBox_jian">
														<i class="iconfont icon-jiantouyou-copy" style="font-size: 18px"></i>
													</div>
													<div>
														<span style="color: #383838;">编辑标签</span>
													</div>
													<div style="position: absolute;right: 10px;" @click="addLableBox_cha">
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
									<div v-if="li.name == '工时'" class="mgL30 gongshi" style="display: flex;align-items: center;">
										<div @click="gongshifu" v-show="!gongshi">
											{{planTime}}，实际已用工时{{countTime}}小时
										</div>
										<div v-show="gongshi" class="gongshifu">
											<div style="    border-bottom: 1px solid #e5e5e5;">
												<div class="gongshiTitle">
													<div style="width:50px;color: #383838;font-size: 12px;font-weight: bold;margin-left: 20px;white-space: nowrap">
														计划工时
													</div>
													<el-tooltip v-show="!whiteFortime" class="item" effect="dark" content="点击即可编辑" placement="top">
														<div class="waitforTime" style="width: 70px;" @click="whiteFortime =true,closeGon =false ">
															<span>{{waitforTime}}</span>
														</div>
													</el-tooltip>
													<div v-show="whiteFortime" style="display:  flex;align-items: center;margin-left: 10px;position: relative">
														<input class="whiteFortimeInput" type="number" v-model="whiteFortimeInput" @input="inputNum">
														<span @click="whiteFortimeSave" style="width: 30px;color:#3da8f5;margin-left: 10px;">
                                                                确定
                                                        </span>
													</div>
													<div style="position: absolute;right: 10px" @click="showGongshi">
														<i style="font-size: 12px" class="iconfont icon-guanbi"></i>
													</div>
												</div>
												<div style=" color: #ff4f3e;">
													{{whiteAlert}}
												</div>
											</div>
											<div class="shijigs">
												<div style="font-weight: bold;color: #383838;margin-left: 20px;font-size: 12px">
													实际工时
												</div>
												<div style="margin-left: 100px">
													{{countTime}}小时
												</div>
											</div>
											<div class="riqi" v-show="gongshiInput">
												<div class="itemRiqi">
													<div style="width: 130px">
														<el-date-picker value-format="yyyy-MM-dd" v-model="value1" type="date" placeholder="选择日期">
														</el-date-picker>
													</div>
												</div>
												<div style="position: relative">
													<input style="width: 136px;height: 35px;" placeholder="填写工作小时数" v-model="yyhh" type="number" @input="inputNum">
													<p style="position: absolute;right: 55px;top: 8px;font-size: 14px;color: #1e88e5" @click="addTime" v-show="yes">确定</p>
												</div>
											</div>
											<div class="zhixing" v-show="!gongshiInput">
												任务执行者可提交实际工时
											</div>
											<div class="prompt" v-show="prompt">
												当日实际工作不可超过24小时
											</div>
											<div v-for="(li , index ) in yyhhList " v-show="yyhhListShow" class="yyhlis" @mouseover="li.show =true" @mouseleave="li.show=false">
												<div style="margin-left: 20px">
													<div style="font-size: 12px;font-weight: bold;color: #333333;line-height: 1;">
														{{li.user.username}}
													</div>
													<div style="   white-space: nowrap;font-size: 12px;color: #999999;line-height: 1;">
														{{li.createTime}}
													</div>
												</div>
												<div style="font-size: 12px;color: #999999;margin-left: 87px">
													{{li.timeLong}}小时
												</div>
												<div style="margin-left: 20px" @click="deleteYyhh(li,index)">
													<i v-show="li.show" class="iconfont icon-guanbi"></i>
												</div>
											</div>
											<div class="yyhhListHide" v-show="yyhhListHide">
												<div style="margin: 30px">
													<div style="display: flex;justify-content: center">
														<i style="font-size: 50px;color: #0a7ee9" class="iconfont icon-web__zanwujilu"></i>
													</div>
													<div style="font-size: 12px;margin-top:15px;color: #cccccc">
														暂无工时记录
													</div>
												</div>
											</div>

										</div>
									</div>
									<div v-if="li.name == '进度'" style="width: 300px; display:flex;align-items: center" class="mgL30">
                                        <el-tooltip class="item" effect="dark" content="点击修改进度" placement="top">
                                            <div v-show="scheduleShow" @click="isSchedule" style="cursor: pointer;width:50px;">
                                                {{scheduleValue}}
                                            </div>
                                        </el-tooltip>
                                        <div v-show="!scheduleShow" style="display: flex">
                                            <div class="inputEl absloue" v-if="li.name == '进度'">
                                                <input v-model="schedule" type="number" onkeypress=" return ( /[\d]/.test(String.fromCharCode(event.keyCode) ) )" placeholder="请输入进度">
                                            </div>
                                            <div class="dispaly" style="margin-left: 20px">
                                                <el-button @click="scheduleHide" style="margin-right: 10px">取消</el-button>
                                                <el-button type="primary" @click="saveButton">保存</el-button>
                                            </div>
                                            <div style="position: absolute;top: 40px;">
                                                {{alert}}
                                            </div>
                                        </div>
									</div>
									<div v-if="li.name == '备注'" class="noteBox" style="display: flex;align-items: center">
										<div v-show="!noteBox" @click="showNoteBox" style="color:#555555;font-size: 14px">
											<span v-html="beiContent"></span>
										</div>
										<div v-show="noteBox">
											<div class="note">
												<div>
													<vtextEditor :childrenFlag="childrenFlag" :childrenId="childrenId" :beiContent="beiContent" :noteBox="noteBox" />
												</div>
											</div>
											<div class="noteButton">
												<div class="mgr30" style="cursor: pointer;display: flex;align-items: center;" @click="hideNoteBox">取消</div>
												<el-button type="primary" @click="saveBei">保存</el-button>
											</div>
										</div>
									</div>
									<div v-if="li.type == 4" class="fileList_nav">
										<div class="mgL30" v-show="!fildList_typeriqi" @click="fildList_typeriqi = true">
											<span>{{typeFilelist_riqi}}</span>
										</div>
										<div class="mgL30" style="display: flex" v-show="fildList_typeriqi">
											<div class="typeFilelist">
												<div class="block">
													<el-date-picker v-model="typeFilelist_riqi" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
													</el-date-picker>
												</div>
											</div>
											<div>
												<el-button @click="typeRiqi_close">取消</el-button>
												<el-button type="primary" @click="typeRiqi_save">保存</el-button>
											</div>
										</div>
									</div>
									<!-- 日期 -->
									<div v-if="li.type == 1" class="mgL30 fileList_nav">
										<div>
											<div style="cursor: pointer" v-show="!li.fileList_checkShow" @click="get_fileListCheck(index)">
												{{fileList_check}}
											</div>
											<div v-show="li.fileList_checkShow" class="fileList_checkShow">
												<div v-for="(li,index) in get_fileList" class="item_checkShow" :class="{item_checkNamep:item_checkNameIndex == index}" @click="item_checkName(li,index)">
													<div style="margin-left: 10px">
														{{li.name}}
													</div>
													<div>

													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- 单选 -->
									<div v-if="li.type == 2" class="mgL30 fileList_nav">
										<!-- 多选 -->
										<div>
											<div v-show="fileList_allCheck" @click="click_allCheck">
												待添加
											</div>
											<div v-show="!fileList_allCheck" class="newAllcheck" @click="click_allCheck">
												<div v-for="(li,index) in newAllcheck">
													<div>data {{li.name}}
													</div>
												</div>
											</div>
										</div>
										<div class="fileList_checkShow" v-show="fileList_allCheckshow">
											<div @click="closeAllcheck" style="cursor: pointer"><i style="font-size: 12px; position: absolute; top: 0; right: 10px" class="iconfont icon-guanbi"></i></div>
											<div v-for="(allCheck,index) in allCheck_list" :class="{fileList_allAcitve:allCheck.active == true}" @click="clickAll(allCheck,index)">
												<div style="margin-left: 10px;cursor:pointer;margin-top: 10px">
													{{allCheck.name}}
												</div>
											</div>
										</div>
									</div>
									<!-- 多选 -->
									<div v-if="li.type == 3" class="mgL30 fileList_nav" type="number" onkeypress=" return ( /[\d]/.test(String.fromCharCode(event.keyCode) ) )">
										<!--数字-->
										<div v-show="fileList_Numbershow" style="cursor: pointer;" @click="fileList_Numbershow =false">
											<div>
												{{fileList_Number}}
											</div>
										</div>
										<div v-show="!fileList_Numbershow">
											<div class="numberBox">
												<el-input v-model="fileList_NumberModel" type="number" onkeypress=" return ( /[\d]/.test(String.fromCharCode(event.keyCode) ) )" placeholder="待添加"></el-input>
												<div style="margin-left: 10px;display: flex;align-items: center">
													<el-button type="primary" @click="handle_Number">保存</el-button>
												</div>
											</div>
										</div>
									</div>
									<!-- 数字 -->
									<div v-if="li.type == 5" class="mgL30 fileList_nav">
										<!-- 文本输入框 -->
										<div v-show="fileList_Textshow" @click="hand_Text">
											{{fileList_textal}}
										</div>
										<div v-show="!fileList_Textshow" style="display: flex;align-items: center">
											<div class="fileList_TextBox">
												<el-input v-model="fileList_Text" placeholder="请输入内容"></el-input>
											</div>

											<div>
												<div style="margin-left: 10px;display: flex;align-items: center">
													<el-button type="primary" @click="handle_fileList">保存</el-button>
												</div>
											</div>
										</div>
									</div>
								</li>
							</div>
							<div class="sonTask">
								<div class="dispaly">
									<img src="../../assets/images/子任务.png" alt="">
									<div class="mgL10" style="color:#888888;font-size: 12px;">子任务</div>
								</div>
								<div class="reveitev" style="margin-top: 20px">
									<div v-for="(li , index) in sonTask" class=" sontaskItem">
										<div class="dispaly">
											<div class="sonNav">
												<!--<img src="../../assets/images/单选框.png" alt="">-->
												<span @click.stop="changeSatus2(li)">
													<i v-if="li.state == 0" class="iconfont icon-xuanzekuang"></i>
													<i v-if="li.state == 1" class="iconfont icon-duoxuankuang2"></i>
												</span>
												<el-tooltip class="item" effect="dark" content="点击即可编辑" placement="top">
													<div class="mgL10 sonTaskName" v-show="li.sonTaskName_Box" @click="sonTask_list(li)">{{li.name}}</div>>
												</el-tooltip>
												<div v-show="!li.sonTaskName_Box">
													<div class="mgL10 sonTaskName">
														<el-input v-model="li.name" placeholder="请输入内容"></el-input>
													</div>
												</div>
											</div>
											<div class="dispaly sonTaskThree sonContent ">
												<div class="mgL10" style="white-space: nowrap;flex: 1">
													{{li.createTime}}
												</div>
												<img :src="li.user.user_img" alt="">
												<el-tooltip class="item" effect="dark" content="点击进入子任务详情" placement="top">
													<div style="cursor: pointer;" @click.stop="sontaskHearf(li,index)"><i class="iconfont icon-jiantou"></i></div>
												</el-tooltip>
											</div>
										</div>
										<div style="margin-top: 10px;margin-left: 555px" v-show="!li.sonTaskName_Box">
											<el-button @click="sonTaskName_Cancel(li,index)">取消</el-button>
											<el-button type="primary" @click="sonTaskName_Updata(li,index)">保存</el-button>
										</div>
									</div>
									<div style="position: relative" v-show="addsonTask">
										<div class="dispaly mgT20 reveitev">
											<div class="dispaly ">
												<i style="color: #d3d3d3" class="iconfont icon-tianjia2"></i>
												<input class="sonTaskInput mgL10" v-model="sonModel" placeholder="输入子任务内容..." type="text">
											</div>
											<div class="dispaly sonTaskThree">
												<div style="margin-left: 10px">
													<!-- <i style="font-size: 20px;color: #d3d3d3" class="iconfont icon-rili1"></i> -->
												</div>
												<img style="margin-left: 10px;width: 30px; height: 30px; border-radius: 50%" :src="sonTaskThreeImg" alt="" @click="floatChen">
											</div>
										</div>
										<div style="position: relative;margin-top: 10px">
											<span style="margin-left: 20px;cursor: pointer" @click="showType">
					                         {{renType}}
					                       </span>
											<div v-show="floatType" class="floatType">
												<li v-for="(li ,index) in floatTypeList" @click="checkTypeList(index)">
													<i style="font-size: 14px" :class="li.icon"></i>
													<div style="margin-left: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
														{{li.name}}
													</div>
												</li>
											</div>
										</div>
										<div class="dispaly" style="margin-bottom: 20px">
											<div class="noteButton1">
												<div class="mgr30" style="color:#666666;font-size:14px;cursor: pointer;display: flex;align-items: center;" @click="buttonhide">取消</div>
												<el-button type="primary" @click.stop="buttonSon">保存</el-button>
											</div>
										</div>
										<div class="floatC" v-show="floatC">
											<div style="margin-left: 10px;margin-top:10px;display: flex;align-items: center; cursor: pointer" @click=check(-1)>
												<img src="../../assets/images/头像.png" alt="">
												<p style="margin-left: 10px;font-size: 14px">待认领</p>
											</div>
											<li v-for="(li ,index) in list" @click=check(index)>
												<div class="typeLi">
													<div>
														<img v-if="li.user_img != ''" :src="li.user_img" />
														<img v-if="li.user_img == ''" src="../../assets/images/22登录_01.png" />
													</div>
													<div>
														{{li.username}}
													</div>
												</div>
											</li>
										</div>
									</div>
								</div>
								<div class="dispaly" style="margin-bottom: 20px;margin-top: 20px" @click="addSon" v-show="son">
									<i style="color: #2c86ff" class="iconfont icon-add"></i>
									<p style="margin-left: 10px;color:#2879ff;cursor: pointer;">添加子任务</p>
								</div>
							</div>
							<div class="fujianBox">
								<div class="dispaly ">
									<img src="../../assets/images/附件.png" alt="">
									<p class="mgL10" style="color: #888888">附件</p>
								</div>
								<div class="dispaly mgT20 mgL10" style="margin-left: 25px;flex-direction: column;text-align: left;align-items: flex-start;">
									<div style="cursor: pointer;" v-for="(item, index) in onteList.tFileList" @mouseover="item.show =true" @mouseleave="item.show=false">
										<span @click="downLoads(item.fileUrl)">{{item.fileName}}</span>
										<span v-show="item.show" @click="deletetFileList(item,index)"><i style="font-size: 12px" class="iconfont icon-guanbi"></i></span>
									</div>
								</div>
								<div class="dispaly mgT20">
									<i style="color: #2c86ff" class="iconfont icon-add"></i>
									<p class="mgL10" style="cursor: pointer"><span ref="addfile">添加附件</span></p>
								</div>
							</div>
							<!-- <div class="guanlianBox">
								<div class="dispaly mgT20">
									<img src="../../assets/images/关联.png" alt="">
									<p style="font-size: 14px; color: #333333">关联</p>
								</div>
								<div style="margin-left: 25px;flex-direction: column;" class="dispaly mgT20">
									<div v-for="item in onteList.listObject" class="relTask">
										<div>
											<div>
												<img v-if="item.tasks.user.user_img != ''" :src="item.tasks.user.user_img" />
												<img v-if="item.tasks.user.user_img == ''" src="../../assets/images/22登录_01.png" /> {{item.tasks.name}}
											</div>
											<div>
												<span style="margin-right: 10px;">{{item.names}}</span>
											</div>
										</div>
										<div>
											<span style="margin-left: 40px;">{{item.tasks.endTime | times}}</span>
										</div>
									</div>
								</div>
								<div class="dispaly mgT20" style="cursor: pointer" @click="addAssociated">
									<img src="../../assets/images/蓝添加.png" alt="">
									<p class="mgL10">添加关联</p>
								</div>
							</div> -->
							<div class="canyuBox">
								<div style="font-size: 16px;font-weight: 700;color: #333333">
									参与者
								</div>
								<div class="canyuList ">
									<li class="mgR10 canyuLi" v-for="(li , index) in canyuList" @mouseover="canyuClose(li)" @mouseleave="li.show=false">
										<span style="margin-right: 5px">
                      <el-tooltip class="item" effect="dark" :content="li.username" placement="top">
                        <img style="width: 30px;height: 30px;border-radius: 50%" v-if="li.user_img != ''" :src="li.user_img"/>
						<img style="width: 30px;height: 30px;border-radius: 50%" v-if="li.user_img == ''" src="../../assets/images/22登录_01.png" />
                      </el-tooltip>
                    </span>
										<span v-show="li.show" @click="deleteCanyu(li,index)" style="margin-left: 5px; z-index: 2">
                      <i style="font-size: 12px;" class="iconfont icon-guanbi"></i>
                    </span>
									</li>
									<div style="display: inline-block;">
										<img src="../../assets/images/新建文件夹/添加.png" alt="" @click.stop="setProjectId">
										<div class="participantsBox" v-show="participantsBox" @click.stop="participantsBox=true">
											<div style="padding: 0 20px">
												<el-input v-model="participantsInput" placeholder="搜索成员"></el-input>
											</div>
											<div class="allPeople">
												<i style="margin-left: 25px" class="iconfont icon-yonghu"></i>
												<p>所有成员</p>
											</div>
											<div class="participantsList_box">
												<div v-for="(li, index) in  newParticipantsList" class="participantsList" :class="{partActive:partIndex == index}" @click="checkPartic(li,index)">
													<img :src="li.user_img" alt="">
													<p>{{li.username}}</p>
													<div v-show="li.showIcon" style="margin-left: 85px">
														<i style="color: #047ce6" class="iconfont icon-duihao"></i>
													</div>
												</div>
											</div>
											<div style="cursor:pointer;margin-left: 19px; display: flex; align-items: center;padding: 10px 0;" @click="invitationTaskShow">
												<div>
													<i style=" color: #649ef8; font-size: 30px" class="iconfont icon-tianjia1"></i>
												</div>
												<p style="margin-left: 7px">邀请新成员</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="tabBox">
								<vtaskAssociatedTab :components="components" :username="Name" :taksCompile="taksCompile" :elementId="fatherId" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
		<div class="uploadBox">
			<uploader :options="options1" ref="uploader" class="uploader-example">
				<uploader-unsupport></uploader-unsupport>
				<uploader-list></uploader-list>
			</uploader>
		</div>
		<!--关联弹出层-->
		<vtaskAssociated @relevance="relevance" :Associated="Associated" :associatedData="associatedData" :elementId="elementId" :taskGroup="taskGroup" />
		<!--邀请成员弹出层-->
		<vinvitationTask :invitationShow="invitationShow" />
	</div>
</template>

<script>
	import api from '../../api/http'
	import youxianji from '../../assets/images/新建文件夹/优先级.png'
	import guanlian from '../../assets/images/新建文件夹/关联.png'
	import beizhu from '../../assets/images/新建文件夹/备注.png'
	import biaoqian from '../../assets/images/新建文件夹/标签.png'
	import fujian from '../../assets/images/新建文件夹/附件.png'
	import headerUrl from 'assets/images/22登录_01.png'
	import undefinedImg from 'assets/images/头像.png'
	import { mapGetters, mapMutations } from 'vuex'
	import vtextEditor from '../../components/textEditor' //引入富文本编辑器
	import vtaskAssociatedTab from './taskAssociatedTab' //引入切换tab 组建
	import vtaskAssociated from './taskAssociated' //引入关联弹出层
	import vinvitationTask from './invitationTask' //引入邀请成员弹出层

	export default {
		created(){
			this.fatherId = this.elementId
		},
		props: ['taksCompileShow', 'elementId', "myArrayid"],
		name: "task-compile",
		components: {
			vtextEditor,
			vtaskAssociated,
			vtaskAssociatedTab,
			vinvitationTask,
		},
		filters: {
			times(val) {
				let time = new Date(val)
				return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
			}
		},
		data() {
			return {
				fatherId:'',
				childrenId: '',
				childrenFlag: false,
				state: '', //复选框的状态
				eitorId :'',//父任务id
				fatherPid:'',
				fileList_textal: '待添加', //输入框
				fileList_Textshow: true, //
				fileList_Text: '', //文本输入框
				fileList_NumberModel: '', //number input输入框
				fileList_Number: '待添加', //number待添加
				fileList_Numbershow: true,
				newAllcheck: [], //多选添加后的新数组
				fileList_allCheckshow: false, //多选下拉框
				allCheck_list: [], //多选下拉框数组
				fileList_allCheck: true, //多选待添加
				item_checkNameIndex: -1,
				fileList_checkShow: false,
				fileList_check: '待添加',
				typeFilelist_riqi: '待添加',
				fildList_typeriqi: false,
				haveUser_id: '', //拥有id
				addLable_icon: false, //添加标签icon图标
				newParticipantsList: '',
				num: 0,
				addsonTask: false,
				sonTaskName: '', //修改子任务名称
				yyhhListShow: true,
				onteList: [],
				searchArr: [],
				invitationShow: false, //弹出框
				editorLableBox_Input: '', //编辑标签input
				editorLableBox: false,
				addLableBox: false,
				addLableBox_input: '',
				whiteAlert: '',
				whiteFortimeInput: '', //编辑盒子的
				whiteFortime: false, //编辑盒子
				waitforTime: '待添加', //待添加
				targetbox: false, //任务目标input盒子
				targetContent: "请添加任务目标", //评论内容
				target: false,
				taskSort_Index: -1,
				taskSortAcitveIndex: 0,
				partIndex: -1,
				peopleIndex: 0,
				peoples: [], //查找成员数组
				projectHeaderFloat: false, //查找成员弹出框
				searchInput: '', //查找成员
				taskGroup: [], //弹出
				participantsList: [], //参与者数组
				participantsInput: '', //参与者搜索框
				participantsBox: false, //参与者下拉框
				taskList: [{
						icon: 'icon-yidong',
						name: '移动任务'
					},
					{
						icon: 'icon-shoucang',
						name: '收藏任务'
					},
					{
						icon: 'icon-gongxiangtubiaozhuangtaileicaozuolei22',
						name: '共享任务'
					},
					{
						icon: 'icon-guidang',
						name: '归档任务'
					},
					{
						icon: 'icon-shanchu',
						name: '删除任务'
					}
				],
				tasks: [{
					icon: 'icon-fuzhi',
					name: '复制任务'
				}, {
					icon: 'icon-link',
					name: '复制任务链接'
				}],
				taskSort: false, //任务菜单下拉框
				accessoryInput: '', //快捷设置附件input 输入框
				accessory: false, //快捷设置附件下拉列表
				levelList: [{
					name: '一般',
					id: 1,
				}, {
					name: '紧急',
					id: 2,
				}, {
					name: '非常紧急',
					id: 3,
				}], //优先级下拉框
				level: false, //快捷设置优先级盒子
				lableInput: '', //快捷设置标签input
				lable: false, //快捷设置标签盒子
				associatedData: [],
				Associated: false, //关联弹出框 初始值
				beiContent: '待添加', //备注内容
				options1: {
					testMethod: 'post',
					// https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
					target: api.ip + '/task/uploadFile;JSESSIONID=' +　sessionStorage.getItem('JSESSIONID'),
					testChunks: false,
					withCredentials: true,
					chunkSize: 10 * 1024 * 1024,
					query: {
						eid: sessionStorage.getItem('enterpriseId'),
						pid: sessionStorage.getItem('projectId'),
						tid: sessionStorage.getItem('tid'),
					},
					allowDuplicateUploads: true,
					simultaneousUploads: 1
				},
				noteBox: false,
				gongshiInput: false,
				yyhhList: [],
				yes: false,
				prompt: false,
				yyhh: '', //小时数
				floatTypeList: [],
				floatType: false,
				renType: '任务类型',
				floatC: false,
				sonModel: '', //子任务输入框
				scheduleShow: true, //工时
				addLables: true,
				closeGon: true, //关闭工时
				pickerOptions1: {
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
				}, //日期和时间选择器
				show: true, //项目标题
				checkTime: '', //时间
				isShow: false, //项目输入框隐藏
				projectInput: '', //项目输入框回显
				components: [],
				inputCom: '', //评论发送输入框
				activeName: 'second',
				canyuList: [], //添加参与着数组
				labelList: [], //标签浮动框数组
				lableFloat: false,
				showYou: false,
				input: '', //任务目标
				gongshi: false, //工时浮层
				lables: [], //添加标签数组
				youxianji: [{
						name: '一般',
						id: 1,
						show: false
					},
					{
						name: '紧急',
						id: 2,
						show: false
					},
					{
						name: '非常紧急',
						id: 3,
						show: false
					},
				],
				youxian: '',
				fieldList: [], //标签
				sonTask: [], //子任务分类
				imgUrl: headerUrl,
				title: '',
				taksCompile: false,
				son: true,
				navData: [{
						name: '附件',
						img: fujian,
					},
					{
						name: '关联',
						img: guanlian
					}
				],
				scheduleValue: '请添加', //进度value
				project: '项目任务名称', //项目回显 名字
				Name: '王薇薇', //项目拥有者
				startTime: ' ', //项目开始时间
				endTime: '', //项目结束时间
				options: [{
						value: '选项1',
						label: '黄金糕'
					},
					{
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
					}
				],
				value: '',
				time: '11小时',
				value1: '',
				schedule: '',
				alert: '',
				sonTaskThreeImg: headerUrl,
				list: '',
				taskType: '',
				planTime: '',
				countTime: '',
				yyhhCtime: '', //工时时间戳转换
				edLable: {},
				yyhhListHide: true,
				colseAll: false,
				get_fileList: [],
			}
		},
		methods: {
			//改变父元素选框的状态
			changeSatus1() {
				let parm = {
					 pid:this.fatherId,
					 parentId:this.fatherPid
				}
				let data = {
					eid: sessionStorage.getItem('enterpriseId'),
					projectId: sessionStorage.getItem('projectId'),
					taskId: this.fatherId
				}
				let parms = {
                    tid:this.fatherId,
                    stateChange:''
                }
				api.get('/task/getTaskPid', parm)
					.then(res => {
						if(res.data.data==true){
							api.post('/task/taskComplete', data)
								.then(res => {
									if(this.state == 0) {
										this.state = 1;
									} else {
										this.state = 0;
									}
									parms.stateChange = this.state
									this.$emit('chuan',this.state)
								
							}).then(res=>{
                                api.get('/task/getTaskContent', parms).then(res =>{
                                    
                                })
							})
						}
					})
			},
			changeSatus2(el) {
				let parm = {
					 pid:el.id,
					 parentId:this.fatherId
				}
				api.get('/task/getTaskPid', parm).then(res => {
					if(res.data.data==true){
						if(this.state==0){
							let data = {
							eid: sessionStorage.getItem('enterpriseId'),
							projectId: sessionStorage.getItem('projectId'),
							taskId: el.id
						}
						api.post('/task/taskComplete', data)
							.then(res => {
								if(el.state == 0) {
									el.state = 1;
								} else {
									el.state = 0;
								}
							})
						}
					}
				})
				
            },
            // 关闭修改任务弹框时间
            closeDialog() {
                this.$emit('chuan')
            },
			//关联
			relevance(data) {
				this.getTaskEditMsg()
			},
			//
			hand_Text() {
				this.fileList_Textshow = false
				this.fileList_Text = this.fileList_textal
			},
			//保存文本输入框
			handle_fileList() {
				this.fieldList.map(el => {
					if(el.type == 5) {
						if(this.fileList_Text !== '') {
							let data = {
								eid: sessionStorage.getItem('enterpriseId'),
								pid: sessionStorage.getItem('projectId'),
								default_field: el.default_field,
								type: el.type,
								tid: this.fatherId,
								typeId: el.id,
								content: this.fileList_Text
							}
							api.post('/task/updField', data)
								.then(res => {
									if(res.data.code == 200) {
										this.$notify({
											title: '成功',
											message: '保存成功',
											type: 'success'
										})
										this.fileList_textal = this.fileList_Text
										this.fileList_Textshow = true
									}
								})
						}
					}
				})
			},

			//number保存按钮
			handle_Number() {
				this.fieldList.map(el => {
					if(el.type == 3) {
						if(this.fileList_NumberModel !== '') {
							let data = {
								eid: sessionStorage.getItem('enterpriseId'),
								pid: sessionStorage.getItem('projectId'),
								default_field: el.default_field,
								type: el.type,
								tid: this.fatherId,
								typeId: el.id,
								content: this.fileList_NumberModel
							}
							api.post('/task/updField', data)
								.then(res => {
									if(res.data.code == 200) {
										this.$notify({
											title: '成功',
											message: '保存成功',
											type: 'success'
										})
										this.fileList_Number = this.fileList_NumberModel
										this.fileList_NumberModel = ''
										this.fileList_Numbershow = true
									}
								})
						} else if(this.fileList_NumberModel == '') {
							let data = {
								eid: sessionStorage.getItem('enterpriseId'),
								pid: sessionStorage.getItem('projectId'),
								default_field: el.default_field,
								type: el.type,
								tid: this.fatherId,
								typeId: el.id,
								content: this.fileList_NumberModel
							}
							api.post('/task/updField', data)
								.then(res => {
									if(res.data.code == 200) {
										this.$notify({
											title: '成功',
											message: '保存成功',
											type: 'success'
										})
										this.fileList_Number = '待添加'
										this.fileList_NumberModel = ''
										this.fileList_Numbershow = true
									}
								})
						}
					}
				})
			},
			//关闭多选
			closeAllcheck() {
				this.fileList_allCheckshow = false
			},
			//多选点击li
			clickAll(allCheck, index) {
				allCheck.active = !allCheck.active
				let flag = true
				for(let i in this.newAllcheck) {
					if(this.newAllcheck[i].id == allCheck.id) {
						flag = false
					}
				}
				if(flag) {
					this.newAllcheck.push(this.allCheck_list[index])
					this.fieldList.map(el => {
						if(el.type == 2) {
							let data = {
								eid: sessionStorage.getItem('enterpriseId'),
								pid: sessionStorage.getItem('projectId'),
								default_field: el.default_field,
								type: el.type,
								tid: this.fatherId,
								typeId: el.id,
								content: allCheck.id
							}
							api.post('/task/updField', data)
								.then(res => {

								})
						}
					})

				}
				for(let a in this.newAllcheck) {
					if(this.newAllcheck[a].active == false) {
						this.newAllcheck.splice(a, 1)
					}
				}
			},
			//选择多选下拉框
			click_allCheck() {
				if(this.allCheck_list.length > 0) {
					this.fileList_allCheckshow = !this.fileList_allCheckshow
				} else {
					this.fieldList.map(el => {
						if(el.type == 2) {
							let params = {
								fieldId: el.id
							}
							api.get('/task/getFiledByED', params)
								.then(res => {
									res.data.data.map(el => {
										el.active = false
									})
									this.fileList_allCheckshow = !this.fileList_allCheckshow
									this.allCheck_list = res.data.data
								})
						}
					})
				}
			},

			//选择单个下拉框
			item_checkName(li, index) {
				this.item_checkNameIndex = index
				this.fileList_check = li.name
				this.fieldList.map(el => {
					if(el.type == 1) {
						let data = {
							eid: sessionStorage.getItem('enterpriseId'),
							pid: sessionStorage.getItem('projectId'),
							default_field: el.default_field,
							type: el.type,
							tid: this.fatherId,
							typeId: el.id,
							content: li.id
						}
						api.post('/task/updField', data)
							.then(res => {

							})

						el.fileList_checkShow = false

					}
				})

			},
			//获取下拉框数据
			get_fileListCheck(index) {
				this.fieldList.map(el => {
					// console.log(el);
					if(el.type == 1) {
						let params = {
							fieldId: el.id
						}
						api.get('/task/getFiledByED', params)
							.then(res => {
								res.data.data.map(el => {
									el.active = false
								})
								this.get_fileList = res.data.data
								el.fileList_checkShow = false
								this.fieldList[index].fileList_checkShow = true
							})
					}
				})
			},
			//保存日期
			typeRiqi_save() {
				this.fieldList.map(el => {
					if(el.type == 4) {
						let data = {
							type: el.type,
							default_field: el.default_field,
							tid: this.fatherId,
							typeId: el.id,
							content: this.typeFilelist_riqi,
						}
						api.post('/task/updField', data)
							.then(res => {
								if(res.data.code == 200) {
									this.$notify({
										title: '成功',
										message: '修改日期成功',
										type: 'success'
									})
									this.fildList_typeriqi = false
								}
							})
					}
				})
			},

			//取消日期
			typeRiqi_close() {
				this.fildList_typeriqi = false
			},

			//删除附件
			deletetFileList(item, index) {
				let data = {
					eid: sessionStorage.getItem('enterpriseId'),
					projectId: sessionStorage.getItem('projectId'),
					taskId: this.fatherId,
					fileId: item.id
				}
				api.post('/task/delTaskFile', data)
					.then(res => {
						if(res.data.data == true) {
							this.$notify({
								title: '成功',
								message: '删除附件成功',
								type: 'success'
							})
							this.onteList.tFileList.splice(index, 1)

						} else {
							this.$notify.error({
								title: '错误',
								message: '服务器异常'
							})
						}
					})
			},

			canyuClose(li) {
				if(li.id == this.userId) {
					li.show = false
				} else {
					li.show = true
				}
			},

			//dowload
			downLoads(fileUrl) {
				location.href = fileUrl
			},
			//点击外层div
			backgroundFasle() {
				this.colseAll = !this.colseAll
			},
			//邀请新成员弹出层
			invitationTaskShow() {
				let params = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId'),
				}
				api.get('/projects/getUsersByEid', params)
					.then(res => {
						if(res.data.code == 200) {
							res.data.data.map(el => {
								if(el.user_img == '') {
									if(el.username != '') {
										el.user_img = headerUrl
									} else {
										el.user_img = undefinedImg
									}
								}
							})
							this.getInvitation(res.data.data)
							this.invitationShow = !this.invitationShow
							this.projectHeaderFloat = !this.projectHeaderFloat
							this.participantsBox = false
						}
					})
			},

			targetboxShow() {
				this.input = this.targetContent
				this.targetbox = true
			},

			deleteLables(li, index) {
				console.log(this.lables);
				console.log(li);
				let data = {
					tid: this.fatherId,
					lid: li.id,
					fid: 3,
				}
				api.post('/task/delLable', data)
					.then(res => {
						this.lables.splice(index, 1)
						this.$notify({
							title: '成功',
							message: '删除标签成功',
							type: 'success'
						});
					})
			},
			//编辑标签删除按钮
			addLableBox_cha() {
				this.lableFloat = false
				this.editorLableBox = false

			},
			//编辑标签
			addLableBox_jian() {
				this.lableFloat = true
				this.editorLableBox = false
			},
			//编辑标签 完成函数
			saveLable() {
				this.lableFloat = true
				this.editorLableBox = false
				if(this.editorLableBox_Input !== '') {
					this.edLable.name = this.editorLableBox_Input
					let data = {
						name: this.editorLableBox_Input,
						id: this.edLable.id
					}
					api.post('/task/updLableTable', data)
						.then(res => {

						})

				} else {
					this.$notify({
						title: '警告',
						message: '不能输入为空',
						type: 'warning'
					})
				}
			},
			//编辑标签 删除函数
			deleteLable(index) {
				let data = {
					id: this.edLable.id
				}
				api.post('/task/delLableTable', data).then(res => {
					this.labelList.splice(index, 0)
					this.$notify({
						title: '成功',
						message: '删除成功',
						type: 'success'
					})
				})

			},
			//编辑标签函数
			editorLable(li) {
				this.lableFloat = false
				console.log(li);
				this.edLable = li
				this.editorLableBox = true
				this.editorLableBox_Input = li.name

			},

			//创建标签函数
			addLableBox_Button() {
				if(this.addLableBox_input !== '') {
					this.fieldList.map(el => {
						if(el.name == '标签') {
							let data = {
								name: this.addLableBox_input,
								pid: sessionStorage.getItem('projectId'),
								fid: el.id,
							}
							api.post('/task/addLable', data)
								.then(res => {
									this.$notify({
										title: '成功',
										message: '创建成功',
										type: 'success'
									})
									this.showLable()
									this.addLableBox_input = ''
									this.addLableBox = false
									this.lableFloat = true
								})

						}
					})
				} else if(this.addLableBox_input == '') {
					this.$notify.error({
						title: '错误',
						message: '标签名字不可为空'
					});
				}

			},

			addLableBox_guanbi() {
				this.addLableBox = false
			},
			addLableBox_houtui() {
				this.addLableBox = false
				this.lableFloat = true
			},
			lableFloat_add() {
				this.addLableBox = true
				this.lableFloat = false
			},
			showLables() {
				this.lableFloat = !this.lableFloat
				this.fieldList.map(el => {
					if(el.name == '标签') {
						let params = {
							tid: this.fatherId,
							pid: sessionStorage.getItem('projectId'),
							fid: el.id,
						}
						api.get('/task/findTaskLable', params)
							.then(res => {
								res.data.data.map(el => {
									el.show = false
								})
								this.labelList = res.data.data

							})
					}
				})

			},

			//设置计划工时
			whiteFortimeSave() {
				if(this.whiteFortimeInput !== '') {
					this.waitforTime = this.whiteFortimeInput + '小时'
					this.planTime = '计划工时' + this.waitforTime
					this.fieldList.map(el => {
						if(el.name == '工时') {
							let data = {
								eid: sessionStorage.getItem('enterpriseId'),
								pid: sessionStorage.getItem('projectId'),
								tid: this.fatherId,
								fid: el.id,
								tasktime: this.whiteFortimeInput,
							}
							api.post('/task/updTaskTime', data)
								.then(res => {
									if(res.data.code == 200) {
										let params = {
											id: this.fatherId
										}
										api.get('/task/getOneTask', params).then(res => {
											res.data.data.fieldList.map(el => {
												if(el.name == '工时') {
													if(el.map.planTime !== null) {
														this.planTime = '计划工时' + el.map.planTime + '小时'
														this.whiteFortimeInput = el.map.planTime
														this.waitforTime = el.map.planTime
													} else if(el.map.planTime == null) {
														this.planTime = '未设置计划工时'
													}
													if(el.map.countTime !== null) {
														this.countTime = el.map.countTime
													} else if(el.map.countTime == null) {
														this.countTime = '0'
													}
												}
											})
										})
									}
								})
						}
					})
				} else if(this.whiteFortimeInput == '' && this.whiteFortimeInput == 0) {
					this.whiteFortimeInput = '待添加'
					this.planTime = '未设置计划工时'
					this.waitforTime = this.whiteFortimeInput
				}
				this.whiteAlert = ''
				this.whiteFortime = false
			},
			// 工时去负数
			inputNum() {
				let val = this.whiteFortimeInput;
				let val2 = this.yyhh;
				if(val.charAt(0) == '-') {
					this.whiteFortimeInput = val.slice(1)
				}
				if(val2.charAt(0) == '-') {
					this.yyhh = val2.slice(1)
				}
			},
			//删除工时
			deleteYyhh(li, index) {
				let data = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId'),
					tid: this.fatherId,
					lid: li.id,
				}
				api.post('/task/delTaskTime', data)
					.then(res => {
						if(res.data.code == 200) {
							this.onteList.fieldList.map(el => {
								if(el.name == "工时") {
									let params = {
										tid: this.fatherId,
										fid: el.id
									}
									api.get('/task/getTimeLong', params).then(res => {
										console.log(res.data.data);
										res.data.data.list.map(el => {
											el.createTime = this.getTime(el.createTime).slice(5, 10)
											this.$set(el, 'show', false)
										})
										this.$notify({
											title: '成功',
											message: '删除工时成功',
											type: 'success'
										})
										this.yyhhList = res.data.data.list
										this.countTime = Math.floor(res.data.data.countTime * 10) / 10
									})
								}
							})
						}
					})
				if(this.yyhhList.length = 0) {
					console.log(1);
					this.yyhhListHide = true
					this.yyhhListShow = false
				}
			},

			//任务目标 取消按钮
			targetCancel() {
				this.target = false
				this.targetbox = false
			},

			//任务目标 保存按钮
			targetSave() {
				this.fieldList.map(el => {
					if(el.name == '任务目标') {
						if(this.input !== '') {
							let data = {
								eid: sessionStorage.getItem('enterpriseId'),
								pid: sessionStorage.getItem('projectId'),
								default_field: el.default_field,
								type: el.type,
								tid: this.fatherId,
								typeId: el.id,
								content: this.input,
							}
							this.target = false
							this.targetbox = false
							if(this.input !== '') {
								this.targetContent = this.input
							} else {
								this.targetContent = '请输入任务目标'
							}
							api.post('/task/updField', data).then(res => {
								if(res.data.code == 200) {
									this.$notify({
										title: '成功',
										message: '添加目标成功',
										type: 'success'
									})
								} else {
									this.$notify.error({
										title: '错误',
										message: '服务器错误'
									})
								}
							})
						} else if(this.input == '') {
							this.$notify.error({
								title: '错误',
								message: '输入名称不可为空'
							})
						}
					}

				})
			},

			//·
			checkTaskSort(li, index) {
				this.taskSort_Index = index
				if(this.taskSortAcitveIndex = index !== -1) {
					this.taskSortAcitveIndex = index = -1
				}
				if(this.taskList[this.taskSort_Index].name == '删除任务') {
					let data = {
						eid: sessionStorage.getItem('enterpriseId'),
						pid: sessionStorage.getItem('projectId'),
						tid: this.fatherId
					}
					api.post('/task/delTask', data)
						.then(res => {
							if(res.data.code == 200) {
								this.$notify({
									title: '成功',
									message: '删除任务成功',
									type: 'success'
								})
								this.taksCompile = false
								this.$emit('sendTask', this.taksCompile)
							}
						})
				}
			},
			//选中任务菜单，改变颜色
			checkTaskActive(index) {
				if(this.taskSort_Index !== -1) {
					this.taskSort_Index = -1
				}
				this.taskSortAcitveIndex = index
			},

			checkPeople(li, index) {
				this.Name = this.peoples[index].username
				this.imgUrl = this.peoples[index].user_img
				this.peopleIndex = index
				if(this.peopleIndex == index) {
					for(let i = 0; i < this.peoples.length; i++) {
						this.peoples[i].lconShow = false
						li.lconShow = true
					}
				}
				let data = {
					implementPeopleId: li.id,
					eid: sessionStorage.getItem('enterpriseId'),
					projectId: sessionStorage.getItem('projectId'),
					id: this.fatherId
				}
				api.post('/task/updTask', data).then(res => {

				})

				this.projectHeaderFloat = !this.projectHeaderFloat
				this.userId = li.id
			},
			//
			showPro() {
				this.taskSort = false
				this.projectHeaderFloat = !this.projectHeaderFloat
				let params = {
					pid: sessionStorage.getItem('projectId'),
					eid: sessionStorage.getItem('enterpriseId'),
				}
				api.get('/projects/getUserByPid', params).then(res => {
					res.data.data.map(el => {
						if(el.user_img == '') {
							if(el.username != '') {
								el.user_img = headerUrl
							} else {
								el.user_img = undefinedImg
							}
						}
						let lconShow = 'lconShow'
						el[lconShow] = false
					})
					this.peoples = res.data.data
				})
			},

			//查找参与者下拉框
			setProjectId() {
				let id = sessionStorage.getItem('projectId')
				let params = {
					id: this.fatherId,
					pid: id
				}
				api.get('/task/getTaskUser', params).then(res => {
					res.data.data.map(el => {
						if(el.user_img == '') {
							if(el.username != '') {
								el.user_img = headerUrl
							} else {
								el.user_img = undefinedImg
							}
						}
						let showIcon = 'showIcon'
						el[showIcon] = false
					})
					this.participantsList = res.data.data
					console.log(res.data.data);
				})
				this.participantsBox = !this.participantsBox
			},

			//选中参与者
			checkPartic(li, index) {
				this.partIndex = index
				this.participantsList.map(el => {
					el.showIcon = false
					li.showIcon = true
				})
				let data = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId'),
					tid: this.fatherId,
					userId: li.id,
				}
				api.post('/task/addTaskUser', data)
					.then(res => {
						if(res.data.code == 200) {
							this.participantsBox = false
							let newData = {
								username: li.username,
								user_img: li.user_img,
								show: false
							}
							this.canyuList.push(newData)
							this.$notify({
								title: '成功',
								message: '添加参与者成功',
								type: 'success'
							})
						}
					})
			},

			//删除参与者
			deleteCanyu(li, index) {
				let data = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId'),
					tid: this.fatherId,
					userId: li.id
				}
				api.post('/task/delTaskUser', data)
					.then(res => {
						if(res.data.code == 200) {
							this.canyuList.splice(index, 1)
							this.$notify({
								title: '成功',
								message: '删除参与者成功',
								type: 'success'
							})
						}
					})
			},

			//点击快捷附件 和关联
			navDataClick(li) {
				if(li.name == '附件') {
					this.accessory = !this.accessory
				}
			},
			//点击快捷标签
			navClick(nav) {
				if(nav.name == '标签') {
					this.lable = !this.lable
				} else if(nav.name == '优先级') {
					this.level = !this.level
				}
			},
			//关闭快捷设置标签盒子
			hidelableBox() {
				console.log(1);
				this.lable = false
			},
			//添加关联弹出窗
			addAssociated() {
				this.Associated = !this.Associated
				let params = {
					proId: 1,
				}
				api.get('/task/getTaskRelation', params).then(res => {
					this.associatedData = res.data.data
					this.taskGroup = this.associatedData[0].taskGroup
				})

			},
			//保存备注按钮
			saveBei() {
				for(let i = 0; i < this.onteList.fieldList.length; i++) {
					if(this.onteList.fieldList[i].name == '备注') {
						if(sessionStorage.getItem('beizhu').replace('&nbsp', '').trim() == '<br>' || sessionStorage.getItem('beizhu').replace('&nbsp', '').trim() == '') {
							this.beiContent = '请添加'
							this.noteBox = false
						} else {
							this.beiContent = sessionStorage.getItem('beizhu').replace('&nbsp', '').trim()
							let data = {
								type: this.onteList.fieldList[i].type,
								default_field: this.onteList.fieldList[i].default_field,
								tid: this.fatherId,
								typeId: this.onteList.fieldList[i].id,
								content: sessionStorage.getItem('beizhu').replace('&nbsp', '').trim(),
								eid: sessionStorage.getItem('enterpriseId'),
								pid: sessionStorage.getItem('projectId')
							}
							api.post('/task/updField', data).then(res => {
								if(res.data.code == 200) {
									this.$notify({
										title: '成功',
										message: '保存备注成功',
										type: 'success'
									})
									this.noteBox = false
								}
							})
						}
					}
				}
			},

			//选中任务类型
			checkTypeList(index) {
				this.renType = this.floatTypeList[index].name
				this.taskType = this.floatTypeList[index].id
				this.floatType = false
			},
			//选中li
			check(index) {
				if(index == -1) {
					this.sonTaskThreeImg = undefinedImg;
					this.userId = 0;
					this.floatC = !this.floatC;
					return;
				}
				this.sonTaskThreeImg = this.list[index].user_img,
					this.userId = this.list[index].id
				this.floatC = !this.floatC
			},
			hideNoteBox() {
				this.noteBox = false
			},
			showNoteBox() {
				this.noteBox = !this.noteBox
			},

			//显示子任务创建盒子
			addSon() {
				if(this.state==0){
				this.son = true
				this.addsonTask = false
				this.sonTask.map(el => {
					el.sonTaskName_Box = true
				})
				this.addsonTask = true
				this.son = false
				let params = {
					eid: sessionStorage.getItem('enterpriseId'),
					pid: sessionStorage.getItem('projectId'),
				}
				api.get('/projects/getUserByPid', params).then(res => {
					if(res.data.data.length > 0) {
						this.sonTaskThreeImg = res.data.data[0].user_img
						this.list = res.data.data
					} else if(res.data.data.length = 0) {
						this.sonTaskThreeImg = headerUrl
					}
				})
				let param = {
					pid: sessionStorage.getItem('projectId')
				}

				api.get('/task/findTaskType', param).then(res => {
					this.floatTypeList = res.data.data
					this.taskType = res.data.data[0].id
				})
			
				}
			},

			// 保存子任务按钮
			buttonSon() {
				if(this.sonModel !== '') {
					let getDefaultDate = () => {
						let date = new Date();
						let Y = date.getFullYear() + '-';
						let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
						let D = date.getDate();
						return Y + M + D + ' 23:59:59'
					}
					// let defaultDate = Date.parse(new Date()) + 1000*60*60*23.9;
					let defaultDate = getDefaultDate();
					let endTime = this.checkTime ? this.checkTime : defaultDate;
					console.log(endTime, 'Y(^o^)Y');
					let data = {
						tid: this.myArrayid,
						name: this.sonModel,
						endTime,
						pid: this.fatherId,
						implementPeopleId: this.userId,
						taskType: this.taskType,
					}
					api.post('/task/addSubtasks', data).then(res => {
						if(res.data.code == 200) {
							let params = {
								id: this.fatherId
							}
							api.get('/task/getOneTask', params).then(res => {
								res.data.data.sonTask.map(el => {
									console.log(el.user.user_img == '')
									el.createTime = this.getTime(el.createTime)
									if(el.user.user_img == '') {
										el.fileURL = headerUrl
										el.user.user_img = undefinedImg
										el.user.username = '待认领'
									}
								})
								this.sonTask = res.data.data.sonTask
								this.sonTask.map(el => {
									this.$set(el, 'sonTaskName_Box', true)
								})
								this.$notify({
									title: '成功',
									message: '添加子任务成功',
									type: 'success'
								})
								this.sonModel = ''
								this.taskType = ''
								this.son = true
								this.addsonTask = false
							})
						}
					})
				} else if(this.sonModel == '') {
					this.$notify.error({
						title: '错误',
						message: '请填写任务名称'
					})
				}
			},

			//点击显示子任务修改盒子
			sonTask_list(li) {
				this.sonTask.map(el => {
					this.$set(el, 'sonTaskName_Box', true)
					this.$set(li, 'sonTaskName_Box', false)
				})
			},

			// 修改子任务保存按钮
			sonTaskName_Updata(li, index) {
				if(li.name !== '') {
					let data = {
						eid: sessionStorage.getItem('enterpriseId'),
						projectId: sessionStorage.getItem('projectId'),
						id: li.id,
						name: li.name
					}
					api.post('/task/updTask', data)
						.then(res => {
							if(res.data.code == 200) {
								this.$notify({
									title: '成功',
									message: '修改子任务名称成功',
									type: 'success'
								})
							}
						})
					this.sonTask.map(el => {
						this.$set(el, 'sonTaskName_Box', true)
					})
				} else {
					this.$notify.error({
						title: '错误',
						message: '子任务名字不可为空'
					})
				}
			},

			//取消子任务按钮
			sonTaskName_Cancel(li) {
				li.sonTaskName_Box = true
			},

			//点击子任务跳转
			sontaskHearf(li, index) {
				this.lables = []
				this.childrenId = li.id
				this.childrenFlag = !this.childrenFlag
				this.taksCompile = false
				this.fatherId = li.id
				sessionStorage.setItem('tid',li.id)
				
				let params = {
					id: this.sonTask[index].id
				}
				api.get('/task/getOneTask', params).then(res => {
					res.data.data.fieldList.map(el => {
						this.fieldList.map(el => {
							if(el.name == '进度') {
								if(el.taskAndFieldList.length > 0) {
									this.scheduleValue = el.taskAndFieldList[0].content + '%'
								} else if(el.taskAndFieldList.length == 0) {
									this.scheduleValue = '待添加'
								}
							} else if(el.name == '备注') {

								if(el.taskAndFieldList.length > 0) {
									this.beiContent = el.taskAndFieldList[0].content

								} else if(el.taskAndFieldList.length == 0) {
									this.beiContent = '待添加'
								}
							} else if(el.name == '标签') {

								if(el.lableList.length > 0) {
									this.lables = el.lableList
									this.addLables = false
								} else if(el.lableList.length == 0) {
									this.addLables = true
								}

							} else if(el.name == '任务目标') {
								if(el.taskAndFieldList.length > 0) {
									this.targetContent = el.taskAndFieldList[0].content
								} else if(el.taskAndFieldList.length == 0) {
									this.targetContent = '待添加'
								}
							} else if(el.name == '优先级') {

								if(el.taskAndFieldList.length > 0) {
									if(el.taskAndFieldList[0].content == 1) {
										this.youxian = '一般'
									} else if(el.taskAndFieldList[0].content == 2) {
										this.youxian = '紧急'
									} else if(el.taskAndFieldList[0].content == 3) {
										this.youxian = '非常紧急'
									}
								} else if(el.taskAndFieldList == '') {
									this.youxian = ''
								}
							} else if(el.name == '工时') {
								if(el.map.planTime !== null) {
									this.gongshi = false
									this.planTime = '计划工时' + el.map.planTime
									this.whiteFortimeInput = el.map.planTime
									this.waitforTime = el.map.planTime
								} else if(el.map.planTime == null) {
									this.planTime = '未设置计划工时'
								}
								if(el.map.countTime !== null) {
									this.countTime = el.map.countTime
								} else if(el.map.countTime == null) {
									this.countTime = '0'
								}
							} else if(el.type == 4) {
								if(el.taskAndFieldList.length > 0) {

									this.typeFilelist_riqi = el.taskAndFieldList[0].content
								} else {
									this.typeFilelist_riqi = '待添加'
								}
							} else if(el.type == 1) {
								if(el.enterpriseDictionaries == null) {

									this.fileList_check = '待添加'
								} else if(el.enterpriseDictionaries != null) {

									this.fileList_check = el.enterpriseDictionaries[0].name
								}
							} else if(el.type == 2) {
								if(el.enterpriseDictionaries.length == 0) {
									this.fileList_allCheck = true
								} else if(el.enterpriseDictionaries.length > 0) {
									this.fileList_allCheck = false
									this.newAllcheck = el.enterpriseDictionaries
								}
							} else if(el.type == 3) {
								if(el.taskAndFieldList.length == 0) {
									this.fileList_Numbershow = true
									this.fileList_Number = '待添加'
								} else if(el.taskAndFieldList.length > 0) {
									this.fileList_Number = el.taskAndFieldList[0].content
								}
							} else if(el.type == 5) {
								if(el.taskAndFieldList.length == 0) {
									this.fileList_Textshow = true
									this.fileList_textal = '待添加'
								} else if(el.taskAndFieldList.length > 0) {
									this.fileList_Textshow = true
									this.fileList_textal = el.taskAndFieldList[0].content
								}
							}
						})
						this.fieldList = res.data.data.fieldList
						res.data.data.tFileList.map(el => {
							this.$set(el,'show',false);
						})
						this.onteList = res.data.data
					})
                    //用户头像
                    let userName = res.data.data.task.user.username
                    if (userName == '') {
                        this.imgUrl = undefinedImg;
                    }else {
                        this.imgUrl = res.data.data.task.user.user_img
                    }
					//任务名字
					this.project = res.data.data.task.name
					//复选框的状态
					this.state = res.data.data.task.state
					//id
					this.fatherId = res.data.data.task.id
					this.fatherPid = res.data.data.task.pid
					
					
//					sessionStorage.setItem('tid',this.fatherId)
					//执行者名字
					if(res.data.data.task.user.username == '') {
						this.Name = '待认领'
						res.data.data.task.user.user_img = undefinedImg;
					} else {
						this.Name = res.data.data.task.user.username
					}
					//开始事件
					this.startTime = this.getTime(res.data.data.task.startTime)
					//结束时间
					this.endTime = this.getTime(res.data.data.task.endTime)
					//子任务
					if(res.data.data.sonTask.length > 0) {
						res.data.data.sonTask.map(el => {
							this.$set(el, 'sonTaskName_Box', true)
							el.createTime = this.getTime(el.createTime)
							if(el.user.user_img == '') {
                                el.fileURL = undefinedImg
                                if (el.user.username != '') {
                                    el.user.user_img = headerUrl
                                }else {
                                    el.user.user_img = undefinedImg
                                }
                                console.log(el.user.user_img,'Y(^o^)Y');
							}
                        })
                        console.log(res.data.data.sonTask,'Y(^o^)Y');
						this.sonTask = res.data.data.sonTask
					} else if(res.data.data.sonTask.length == 0) {
						this.sonTask = []
					}
					//项目 任务 标题
					this.title = res.data.data.countName
					res.data.data.commentList.map(el => {
						let deteItem = 'deteItem'
						el[deteItem] = false
					})
					this.components = res.data.data.commentList
					//储存执行者 userid
					this.userId = res.data.data.task.user.id

					//参与者
					if(res.data.data.task.userList.length > 0) {
						res.data.data.task.userList.map(el => {
							this.$set(el, 'show', false);
						})
						this.canyuList = res.data.data.task.userList
					} else if(res.data.data.task.userList.length == 0) {
						this.canyuList = []
					}
					this.taksCompile = true
				})

			},

			showType() {
				this.floatType = !this.floatType
			},
			buttonhide() {
				this.son = true
				this.addsonTask = false
			},

			floatChen() {
				this.floatC = !this.floatC
			},
			//保存进度
			saveButton() {
				for(let i = 0; i < this.onteList.fieldList.length; i++) {
					if(this.onteList.fieldList[i].name == "进度") {
						if(this.schedule !== '') {
							let params = {
								type: this.onteList.fieldList[i].type,
								default_field: this.onteList.fieldList[i].default_field,
								tid: this.fatherId,
								typeId: this.onteList.fieldList[i].id,
								content: this.schedule,
							}
							api.post('/task/updField', params).then(res => {
								if(res.data.code == 200) {
									this.$notify({
										title: '成功',
										message: '修改进度成功',
										type: 'success'
									})
									this.scheduleShow = true
									this.scheduleValue = this.schedule + '%'
								} else if(res.data.code == 500) {
									this.$notify.error({
										title: '错误',
										message: '服务器异常'
									});
								}
							})
						} else if(this.schedule == '') {
							this.$notify({
								title: '警告',
								message: '进度不可为空',
								type: 'warning'
							});
						}
					}
				}
			},

			//进度修改
			scheduleHide() {
				console.log(this.schedule);
				console.log(this.scheduleValue);
				if(this.schedule !== '') {
					this.scheduleShow = true
					this.scheduleValue = this.schedule + '%'
				} else if(this.schedule == '') {
					this.$notify({
						title: '警告',
						message: '进度不可为空',
						type: 'warning'
					})
				}
				/*      if (this.schedule !== ''){
=======
<script >

    import api from '../../api/http'
    import youxianji from '../../assets/images/新建文件夹/优先级.png'
    import guanlian  from '../../assets/images/新建文件夹/关联.png'
    import beizhu from '../../assets/images/新建文件夹/备注.png'
    import biaoqian from '../../assets/images/新建文件夹/标签.png'
    import fujian from '../../assets/images/新建文件夹/附件.png'
    import headerUrl from 'assets/images/chengyuan.png'
    import { mapGetters,mapMutations } from 'vuex'
    import vtextEditor from '../../components/textEditor'   //引入富文本编辑器
    import vtaskAssociatedTab from './taskAssociatedTab'  //引入切换tab 组建
    import vtaskAssociated from './taskAssociated'   //引入关联弹出层
    import vinvitationTask from './invitationTask'  //引入邀请成员弹出层

    export default {
        props:['taksCompileShow','elementId',"myArrayid"],
        name: "task-compile",
        components:{
          vtextEditor,
          vtaskAssociated,
          vtaskAssociatedTab,
          vinvitationTask,
        },
        filters:{
        	times(val){
        		let time = new Date(val)
        		return time.getFullYear() + '年' + (time.getMonth()+1) + '月'  + time.getDate() + '日'
        	}
        },
        data(){
          return{
            fileList_textal:'待添加',//输入框
            fileList_Textshow:true,//
            fileList_Text:'', //文本输入框
            fileList_NumberModel:'', //number input输入框
            fileList_Number:'待添加', //number待添加
            fileList_Numbershow:true,
            newAllcheck:[],//多选添加后的新数组
            fileList_allCheckshow:false,//多选下拉框
            allCheck_list:[],//多选下拉框数组
            fileList_allCheck:true, //多选待添加
            item_checkNameIndex:-1,
            fileList_checkShow:false,
            fileList_check:'待添加',
            typeFilelist_riqi:'待添加',
            fildList_typeriqi:false,
            haveUser_id:'',//拥有id
            addLable_icon:false, //添加标签icon图标
            newParticipantsList:'',
          	num:0,
            addsonTask:false,
            sonTaskName:'',//修改子任务名称
            yyhhListShow:true,
            onteList:[],
            searchArr:[],
            invitationShow:false,//弹出框
            editorLableBox_Input:'',//编辑标签input
            editorLableBox:false,
            addLableBox:false,
            addLableBox_input:'',
            whiteAlert:'',
            whiteFortimeInput:'', //编辑盒子的
            whiteFortime:false, //编辑盒子
            waitforTime:'待添加',//待添加
            targetbox:false, //任务目标input盒子
            targetContent:"请添加任务目标",//评论内容
            target:false,
            taskSort_Index:-1,
            taskSortAcitveIndex:0,
            partIndex:-1,
            peopleIndex:0,
            peoples:[],//查找成员数组
            projectHeaderFloat:false, //查找成员弹出框
            searchInput:'',//查找成员
            taskGroup:[],//弹出
            participantsList:[],//参与者数组
            participantsInput:'',//参与者搜索框
            participantsBox:false, //参与者下拉框
            taskList:[
              {
                icon:'icon-yidong',
                name:'移动任务'
              },
              {
                icon:'icon-shoucang',
                name:'收藏任务'
              },
              {
                icon:'icon-gongxiangtubiaozhuangtaileicaozuolei22',
                name:'共享任务'
              },
              {
                icon:'icon-guidang',
                name:'归档任务'
              },
              {
                icon:'icon-shanchu',
                name:'删除任务'
              }
            ],
            tasks:[
              {
                icon:'icon-fuzhi',
                name:'复制任务'
              },{
                icon:'icon-link',
                name:'复制任务链接'
              }
            ],
            taskSort:false, //任务菜单下拉框
            accessoryInput:'',//快捷设置附件input 输入框
            accessory:false, //快捷设置附件下拉列表
            levelList:[
              {
                name:'一般',
                id:1,
              }, {
                name:'紧急',
                id:2,
              },{
                name:'非常紧急',
                id:3,
              }
            ],//优先级下拉框
            level:false, //快捷设置优先级盒子
            lableInput:'', //快捷设置标签input
            lable:false,   //快捷设置标签盒子
            associatedData:[],
            Associated:false,//关联弹出框 初始值
            beiContent:'待添加',//备注内容
            options1: {
              testMethod: 'post',
                // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
              target: api.ip + '/task/uploadFile',
              testChunks: false,
              withCredentials: true,
              chunkSize:10*1024*1024,
              query: {
                eid:sessionStorage.getItem('enterpriseId'),
                pid:sessionStorage.getItem('projectId'),
                tid:sessionStorage.getItem('tid'),
              },
              allowDuplicateUploads:true,
              simultaneousUploads:1
            },
            noteBox:false,
            gongshiInput:false,
            yyhhList:[],
            yes:false,
            prompt:false,
            yyhh:'',//小时数
            floatTypeList:[],
            floatType:false,
            renType:'任务类型',
            floatC:false,
            sonModel:'',//子任务输入框
            scheduleShow:true,//工时
            addLables:true,
            closeGon:true,//关闭工时
            pickerOptions1: {
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
            }, //日期和时间选择器
            show:true ,//项目标题
            checkTime:'',//时间
            isShow:false,//项目输入框隐藏
            projectInput:'',//项目输入框回显
            components:[],
            inputCom:'',//评论发送输入框
            activeName: 'second',
            canyuList:[],//添加参与着数组
            labelList:[],//标签浮动框数组
            lableFloat:false,
            showYou:false,
            input:'',//任务目标
            gongshi:false,//工时浮层
            lables:[],//添加标签数组
            youxianji:[
              {name:'一般' ,id:1,show:false},
              {name:'紧急', id:2,show:false},
              {name:'非常紧急', id:3,show:false},
            ],
            youxian:'',
            fieldList:[], //标签
            sonTask:[], //子任务分类
            imgUrl:headerUrl,
            title:'',
            taksCompile:false,
            son:true,
            navData:[
              {
                name:'附件',
                img:fujian,
              },
              {
                name:'关联',
                img:guanlian
              }
            ],
            scheduleValue:'请添加',//进度value
            project: '项目任务名称', //项目回显 名字
            Name:'王薇薇',//项目拥有者
            startTime: ' ',//项目开始时间
            endTime:'',//项目结束时间
            options: [
              {
              value: '选项1',
              label: '黄金糕'
            },
              {
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
            value: '',
            time:'11小时',
            value1:'',
            schedule:'',
            alert:'',
            sonTaskThreeImg:headerUrl,
            list:'',
            taskType:'',
            planTime:'',
            countTime:'',
            yyhhCtime:'',//工时时间戳转换
            edLable:{},
            yyhhListHide:true,
            colseAll:false,
            get_fileList:[],
          }
        },
        methods:{
          //关联
          relevance(data){
          	this.getTaskEditMsg()
          },
          //
          hand_Text(){
            this.fileList_Textshow = false
            this.fileList_Text =this.fileList_textal
          },
          //保存文本输入框
          handle_fileList(){
            this.fieldList.map(el=>{
              if(el.type == 5){
                if(this.fileList_Text !== ''){
                  let data={
                    eid:sessionStorage.getItem('enterpriseId'),
                    pid:sessionStorage.getItem('projectId'),
                    default_field:el.default_field,
                    type:el.type,
                    tid:this.elementId,
                    typeId:el.id,
                    content:this.fileList_Text
                  }
                  api.post('/task/updField',data)
                    .then(res=>{
                      if(res.data.code == 200){
                        this.$notify({
                          title: '成功',
                          message: '保存成功',
                          type: 'success'
                        })
                        this.fileList_textal = this.fileList_Text
                        this.fileList_Textshow= true
                      }
                    })
                }
              }
            })
          },

          //number保存按钮
          handle_Number(){
            this.fieldList.map(el=>{
              if (el.type == 3){
                if(this.fileList_NumberModel !== ''){
                  let data={
                    eid:sessionStorage.getItem('enterpriseId'),
                    pid:sessionStorage.getItem('projectId'),
                    default_field:el.default_field,
                    type:el.type,
                    tid:this.elementId,
                    typeId:el.id,
                    content:this.fileList_NumberModel
                  }
                  api.post('/task/updField',data)
                    .then(res=>{
                      if(res.data.code == 200){
                        this.$notify({
                          title: '成功',
                          message: '保存成功',
                          type: 'success'
                        })
                        this.fileList_Number =  this.fileList_NumberModel
                        this.fileList_NumberModel = ''
                        this.fileList_Numbershow= true
                      }
                    })
                 }
                 else if (this.fileList_NumberModel == ''){
                  let data={
                    eid:sessionStorage.getItem('enterpriseId'),
                    pid:sessionStorage.getItem('projectId'),
                    default_field:el.default_field,
                    type:el.type,
                    tid:this.elementId,
                    typeId:el.id,
                    content:this.fileList_NumberModel
                  }
                  api.post('/task/updField',data)
                    .then(res=>{
                      if(res.data.code == 200){
                        this.$notify({
                          title: '成功',
                          message: '保存成功',
                          type: 'success'
                        })
                        this.fileList_Number =  '待添加'
                        this.fileList_NumberModel = ''
                        this.fileList_Numbershow= true
                      }
                    })
                }
               }
            })
          },
          //关闭多选
          closeAllcheck(){
            this.fileList_allCheckshow= false
          },
          //多选点击li
          clickAll(allCheck,index){
            allCheck.active =! allCheck.active
            let flag =true
            for(let i in this.newAllcheck){
              if (this.newAllcheck[i].id == allCheck.id ){
                flag = false
              }
            }
            if(flag){
              this.newAllcheck.push(this.allCheck_list[index])
              this.fieldList.map(el=>{
                if(el.type == 2){
                  let data={
                    eid:sessionStorage.getItem('enterpriseId'),
                    pid:sessionStorage.getItem('projectId'),
                    default_field:el.default_field,
                    type:el.type,
                    tid:this.elementId,
                    typeId:el.id,
                    content:allCheck.id
                  }
                  api.post('/task/updField',data)
                    .then(res=>{

                    })
                }
              })

            }
            for(let a in this.newAllcheck){
              if (this.newAllcheck[a].active == false){
                this.newAllcheck.splice(a,1)
              }
            }
          },
          //选择多选下拉框
          click_allCheck(){
            if(this.allCheck_list.length > 0){
              this.fileList_allCheckshow =!this.fileList_allCheckshow
            }else {
              this.fieldList.map(el=>{
                if(el.type == 2){
                  let params={fieldId:el.id }
                  api.get('/task/getFiledByED',params)
                    .then(res=>{
                      res.data.data.map(el=>{
                        el.active =false
                      })
                      this.fileList_allCheckshow =!this.fileList_allCheckshow
                      this.allCheck_list =res.data.data
                    })
                }
              })
            }
          },

          //选择单个下拉框
          item_checkName(li,index){
            this.item_checkNameIndex =index
            this.fileList_check =li.name
            this.fieldList.map(el=>{
              if(el.type == 1){
                let data={
                  eid:sessionStorage.getItem('enterpriseId'),
                  pid:sessionStorage.getItem('projectId'),
                  default_field :el.default_field,
                  type:el.type,
                  tid:this.elementId,
                  typeId:el.id,
                  content:li.id
                }
                api.post('/task/updField',data)
                  .then(res=>{

                  })

                el.fileList_checkShow = false

              }
            })


          },
          //获取下拉框数据
          get_fileListCheck(index){
            this.fieldList.map(el=>{
              // console.log(el);
              if(el.type == 1){
                let params={
                  fieldId:el.id
                }
                api.get('/task/getFiledByED',params)
                  .then(res=>{
                    res.data.data.map(el=>{
                      el.active = false
                    })
                    this.get_fileList = res.data.data
                    el.fileList_checkShow= false
                    this.fieldList[index].fileList_checkShow = true
                  })
              }
            })
          },
          //保存日期
          typeRiqi_save(){
            this.fieldList.map(el=>{
              if(el.type==4) {
                let data={
                  type: el.type,
                  default_field: el.default_field,
                  tid:this.elementId,
                  typeId: el.id,
                  content:this.typeFilelist_riqi,
                }
                api.post('/task/updField',data)
                  .then(res=>{
                      if (res.data.code ==200){
                        this.$notify({
                          title: '成功',
                          message: '修改日期成功',
                          type: 'success'
                        })
                        this.fildList_typeriqi =false
                      }
                  })
              }
            })
          },

          //取消日期
          typeRiqi_close(){
            this.fildList_typeriqi = false
          },

          //删除附件
          deletetFileList(item,index){
            let data={
              eid:sessionStorage.getItem('enterpriseId'),
              projectId:sessionStorage.getItem('projectId'),
              taskId:this.elementId,
              fileId:item.id
            }
            api.post('/task/delTaskFile',data)
              .then(res=>{
                if (res.data.data == true){
                  this.$notify({
                    title: '成功',
                    message: '删除附件成功',
                    type: 'success'
                  })
                  this.onteList.tFileList.splice(index,1)

                }else{
                  this.$notify.error({
                    title: '错误',
                    message: '服务器异常'
                  })
                }
              })
          },

          canyuClose(li){
            if(li.id ==this.userId){
              li.show=false
            }else{
              li.show=true
            }
          },

          //dowload
          downLoads(fileUrl){
            location.href=fileUrl
          },
          //点击外层div
          backgroundFasle(){
           this.colseAll =!this.colseAll
          },
          //邀请新成员弹出层
          invitationTaskShow(){
            let params={
              eid:sessionStorage.getItem('enterpriseId'),
              pid:sessionStorage.getItem('projectId'),
            }
            api.get('/projects/getUsersByEid',params)
              .then(res=>{
                if (res.data.code == 200){
                  res.data.data.map(el=>{
                    if(el.user_img == ''){
                      el.user_img =headerUrl
                    }
                  })
                  this.getInvitation(res.data.data)
                  this.invitationShow =!this.invitationShow
                  this.projectHeaderFloat =!this.projectHeaderFloat
                  this.participantsBox =false
                }
              })
          },


          targetboxShow(){
            this.input= this.targetContent
            this.targetbox=true
          },

          deleteLables(li,index){
            console.log(this.lables);
            console.log(li);
            let data={
              tid:this.elementId,
              lid:li.id,
              fid:3,
            }
            api.post('/task/delLable',data)
              .then(res=>{
                this.lables.splice(index,1)
                this.$notify({
                  title: '成功',
                  message: '删除标签成功',
                  type: 'success'
                });
              })
          },
          //编辑标签删除按钮
          addLableBox_cha(){
            this.lableFloat =false
            this.editorLableBox= false


          },
          //编辑标签
          addLableBox_jian(){
            this.lableFloat =true
            this.editorLableBox= false
          },
          //编辑标签 完成函数
          saveLable(){
            this.lableFloat =true
            this.editorLableBox= false
            if (this.editorLableBox_Input !== ''){
              this.edLable.name = this.editorLableBox_Input
              let data={
                name:this.editorLableBox_Input,
                id:this.edLable.id
              }
              api.post('/task/updLableTable',data)
                .then(res=>{

                })

            }else{
              this.$notify({
                title: '警告',
                message: '不能输入为空',
                type: 'warning'
              })
            }
          },


          //编辑标签 删除函数
          deleteLable(index){
            let data={id:this.edLable.id}
            api.post('/task/delLableTable',data).then(res=>{
              this.fieldList.map(el=>{
                if (el.name == '标签'){
                  let params={
                    tid:this.elementId,
                    pid:sessionStorage.getItem('projectId'),
                    fid:el.id,
                  }
                  api.get('/task/findTaskLable',params)
                    .then(res=>{
                      res.data.data.map(el=>{
                        el.show =false
                      })
                      this.labelList =res.data.data

                    })
                }
              })
              this.lableFloat =true
              this.editorLableBox= false
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
            })

          },
          //编辑标签函数
          editorLable(li){
            this.lableFloat=false
            console.log(li);
            this.edLable=li
            this.editorLableBox= true
            this.editorLableBox_Input =li.name

          },

          //创建标签函数
          addLableBox_Button(){
            if (this.addLableBox_input !== ''){
              this.fieldList.map(el=>{
                if (el.name == '标签'){
                  let data={
                    name:this.addLableBox_input,
                    pid:sessionStorage.getItem('projectId'),
                    fid:el.id,
                  }
                  this.labelList.push(data)
                  api.post('/task/addLable',data)
                    .then(res=>{
                      let params={tid:this.elementId,
                        pid:sessionStorage.getItem('projectId'),
                        fid:el.id,}
                        api.get('/task/findTaskLable',params)
                        .then(res=>{
                          res.data.data.map(el=>{
                            el.show =false
                          })
                          this.labelList =res.data.data
                            })
                      this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success'
                      })
                      this.addLableBox =false
                      this.lableFloat =true
                    })

                }
              })
            }
            else if (this.addLableBox_input == ''){
              this.$notify.error({
                title: '错误',
                message: '标签名字不可为空'
              });
            }

          },

          addLableBox_guanbi(){
           this.addLableBox =false
          },
          addLableBox_houtui(){
            this.addLableBox =false
            this.lableFloat =true
          },
          lableFloat_add(){
            this.addLableBox =true
            this.lableFloat =false
          },
          showLables(){
            this.lableFloat =  !this.lableFloat
            this.fieldList.map(el=>{
              if (el.name == '标签'){
                let params={
                  tid:this.elementId,
                  pid:sessionStorage.getItem('projectId'),
                  fid:el.id,
                }
                api.get('/task/findTaskLable',params)
                  .then(res=>{
                    res.data.data.map(el=>{
                      el.show =false
                    })
                    this.labelList =res.data.data

                  })
              }
            })


          },
          whiteFortimeSave(){
            if(this.whiteFortimeInput  !== '' ){
              this.waitforTime= this.whiteFortimeInput + '小时'
              this.planTime = '计划工时'+this.waitforTime
              this.fieldList.map(el=>{
                if(el.name == '工时' ){
                  let data={
                    eid:sessionStorage.getItem('enterpriseId'),
                    pid:sessionStorage.getItem('projectId'),
                    tid:this.elementId,
                    fid:el.id,
                    tasktime: this.whiteFortimeInput,
                  }
                  api.post('/task/updTaskTime',data)
                    .then(res=>{
                    })
                }
              })
            }else if (this.whiteFortimeInput == '' && this.whiteFortimeInput == 0){
              this.whiteFortimeInput ='待添加'
              this.planTime='未设置计划工时'
              this.waitforTime= this.whiteFortimeInput
            }
            this.whiteAlert =''
            this.whiteFortime=false
            console.log(this.waitforTime)


          },

          //删除工时
          deleteYyhh(li, index){
            let data={
              eid:sessionStorage.getItem('enterpriseId'),
              pid:sessionStorage.getItem('projectId'),
              tid:this.elementId,
              lid:li.id,
            }
            api.post('/task/delTaskTime',data)
              .then(res=>{
                if (res.data.code == 200 ){
                  this.onteList.fieldList.map(el=>{
                    if (el.name == "工时"){
                      let params ={
                        tid:this.elementId,
                        fid:el.id
                      }
                      api.get('/task/getTimeLong',params).then(res=>{
                        console.log(res.data.data);
                        res.data.data.list.map(el=>{
                          el.createTime = this.getTime(el.createTime).slice(5,10)
                          this.$set(el,'show',false)
                        })
                        this.$notify({
                          title: '成功',
                          message: '删除工时成功',
                          type: 'success'
                        })
                        this.yyhhList =res.data.data.list
                        this.countTime= res.data.data.countTime
                      })
                    }
                  })
                }
              })
            if (this.yyhhList.length=0){
              console.log(1);
              this.yyhhListHide = true
              this.yyhhListShow = false
            }
          },

          //任务目标 取消按钮
          targetCancel(){
            this.target =false
            this.targetbox= false
          },

          //任务目标 保存按钮
          targetSave(){
            this.fieldList.map(el=>{
              if(el.name == '任务目标'){
                if (this.input !== ''){
                  let data={
                    eid:sessionStorage.getItem('enterpriseId'),
                    pid:sessionStorage.getItem('projectId'),
                    default_field:el.default_field,
                    type:el.type,
                    tid:this.elementId,
                    typeId:el.id,
                    content:this.input,
                  }
                  this.target =false
                  this.targetbox= false
                  if(this.input !== ''){
                    this.targetContent =this.input
                  }else{
                    this.targetContent='请输入任务目标'
                  }
                  api.post('/task/updField',data).then(res=>{
                      if(res.data.code == 200){
                        this.$notify({
                          title: '成功',
                          message: '添加目标成功',
                          type: 'success'
                        })
                      }
                      else{
                        this.$notify.error({
                          title: '错误',
                          message: '服务器错误'
                        })
                      }
                  })
                }
                else if (this.input == ''){
                  this.$notify.error({
                    title: '错误',
                    message: '输入名称不可为空'
                  })
                }
              }

            })
          },

          //·
          checkTaskSort(li,index){
            this.taskSort_Index =index
            if( this.taskSortAcitveIndex=index !== -1 ){
              this.taskSortAcitveIndex=index = -1
            }
            if(this.taskList[this.taskSort_Index].name =='删除任务'){
              let data={
                eid:sessionStorage.getItem('enterpriseId'),
                pid:sessionStorage.getItem('projectId'),
                tid:this.elementId
              }
              api.post('/task/delTask',data)
                .then(res=>{
                  if (res.data.code == 200){
                    this.$notify({
                      title: '成功',
                      message: '删除任务成功',
                      type: 'success'
                    })
                    this.taksCompile =false
                    this.$emit('sendTask', this.taksCompile)
                  }
                })
            }
          },
          //选中任务菜单，改变颜色
          checkTaskActive(index){
            if ( this.taskSort_Index !== -1){
              this.taskSort_Index =-1
            }
            this.taskSortAcitveIndex=index
          },

          checkPeople(li,index){
            this.Name  = this.peoples[index].username
            this.imgUrl =this.peoples[index].user_img
            this.peopleIndex =index
            if(  this.peopleIndex == index){
              for(let i= 0; i< this.peoples.length;i++){
                this.peoples[i].lconShow =false
                li.lconShow =true
              }
            }
            let data ={
              implementPeopleId:li.id,
              eid:sessionStorage.getItem('enterpriseId'),
              projectId:sessionStorage.getItem('projectId'),
              id:this.elementId
            }
            api.post('/task/updTask',data).then(res=>{

            })

            this.projectHeaderFloat =!this.projectHeaderFloat
            this.userId =  li.id
          },
          //
          showPro(){
            this.taskSort= false
            this.projectHeaderFloat= !this.projectHeaderFloat
            let params ={
              pid:sessionStorage.getItem('projectId'),
              eid:sessionStorage.getItem('enterpriseId'),
            }
            api.get('/projects/getUserByPid',params).then(res=>{
                res.data.data.map(el=>{
                  if (el.user_img == ''){
                    el.user_img =headerUrl
                  }
                  let lconShow ='lconShow'
                  el[lconShow] =false
                })
                this.peoples =res.data.data
            })
          },

          //查找参与者下拉框
          setProjectId() {
            let id = sessionStorage.getItem('projectId')
            let params = {
              id:this.elementId,
              pid: id
            }
            api.get('/task/getTaskUser', params).then(res => {
                 res.data.data.map(el=>{
                   if(el.user_img == ''){
                     el.user_img = headerUrl
                   }
                   let showIcon ='showIcon'
                   el[showIcon] =false
                 })
             this.participantsList=res.data.data
              console.log(res.data.data);
            })
            this.participantsBox =!this.participantsBox
          },

          //选中参与者
          checkPartic(li,index){
            this.partIndex=index
            this.participantsList.map(el=>{
              el.showIcon = false
              li.showIcon =true
            })
            let data ={
              eid:sessionStorage.getItem('enterpriseId'),
              pid:sessionStorage.getItem('projectId'),
              tid:this.elementId,
              userId:li.id,
            }
            api.post('/task/addTaskUser',data)
              .then(res=>{
                if(res.data.code == 200){
                  this.participantsBox =false
                  let newData ={username: li.username ,user_img:li.user_img,show:false}
                  this.canyuList.push(newData)
                  this.$notify({
                    title: '成功',
                    message: '添加参与者成功',
                    type: 'success'
                  })
                }
              })
          },

          //删除参与者
          deleteCanyu(li,index){
            let data ={
              eid:sessionStorage.getItem('enterpriseId'),
              pid:sessionStorage.getItem('projectId'),
              tid:this.elementId,
              userId:li.id
            }
            api.post('/task/delTaskUser',data)
              .then(res=>{
                if(res.data.code == 200){
                  this.canyuList.splice(index, 1)
                  this.$notify({
                    title: '成功',
                    message: '删除参与者成功',
                    type: 'success'
                  })
                }
              })
          },

          //点击快捷附件 和关联
          navDataClick(li){
            if(li.name == '附件') {
              this.accessory = !this.accessory
            }
          },
          //点击快捷标签
          navClick(nav){
            if(nav.name == '标签'){
              this.lable = !this.lable
            }else if (nav.name == '优先级'){
              this.level =!this.level
            }
          },
          //关闭快捷设置标签盒子
          hidelableBox(){
            console.log(1);
            this.lable = false
          },
          //添加关联弹出窗
          addAssociated(){
            this.Associated = !this.Associated
            let params={
              proId:1,
            }
            api.get('/task/getTaskRelation',params).then(res=>{
              this.associatedData = res.data.data
              this.taskGroup =this.associatedData[0].taskGroup
            })

          },
	      	//保存备注按钮
          saveBei(){
           for(let i=0;i <this.onteList.fieldList.length; i++){
             if( this.onteList.fieldList[i].name == '备注'){
                  if (sessionStorage.getItem('beizhu').replace('&nbsp','').trim() == '<br>' ||sessionStorage.getItem('beizhu').replace('&nbsp','').trim() == ''){
                    this.beiContent ='请添加'
                    this.noteBox= false
                  }
                  else {
                    this.beiContent=sessionStorage.getItem('beizhu').replace('&nbsp','').trim()
                    let data={
                      type :this.onteList.fieldList[i].type,
                      default_field:this.onteList.fieldList[i].default_field,
                      tid:this.elementId,
                      typeId:this.onteList.fieldList[i].id,
                      content:sessionStorage.getItem('beizhu').replace('&nbsp','').trim(),
                      eid:sessionStorage.getItem('enterpriseId'),
                	  pid:sessionStorage.getItem('projectId')
                    }
                    api.post('/task/updField',data).then(res=>{
                      if(res.data.code == 200){
                        this.$notify({
                          title: '成功',
                          message: '保存备注成功',
                          type: 'success'
                        })
                        this.noteBox=false
                      }
                    })
                  }
             }
           }
          },

          //选中任务类型
          checkTypeList(index){
            this.renType=this.floatTypeList[index].name
            this.taskType=  this.floatTypeList[index].id
            this.floatType =false
          },
          //选中li
          check(index){
             this.sonTaskThreeImg= this.list[index].user_img,
             this.userId =this.list[index].id
             this.floatC= !this.floatC
          },
          hideNoteBox(){

            this.noteBox = false
          },
          showNoteBox(){
            this.noteBox=true
          },

          //显示子任务创建盒子
          addSon(){

            this.son =true
            this.addsonTask=false
            this.sonTask.map(el=>{
              el.sonTaskName_Box =true
            })
            this.addsonTask=true
            this.son=false
            let params ={
              eid:sessionStorage.getItem('enterpriseId'),
              pid:sessionStorage.getItem('projectId'),
            }
            api.get('/projects/getUserByPid',params).then(res=>{
              if (res.data.data.length>0){
                this.sonTaskThreeImg = res.data.data[0].user_img
                this.list= res.data.data
              }else if (res.data.data.length =0){
                this.sonTaskThreeImg =headerUrl
              }
            })
            let param={
              pid:sessionStorage.getItem('projectId')
            }

            api.get('/task/findTaskType',param).then(res=>{
              this.floatTypeList =res.data.data
              this.taskType=res.data.data[0].id
            })
          },

          // 保存子任务按钮
          buttonSon(){
            if (this.sonModel  !== ''){
              let data = {
                tid:this.myArrayid,
                name:this.sonModel,
                endTime:this.checkTime,
                pid:this.elementId,
                implementPeopleId: this.userId,
                taskType:  this.taskType,
              }
              api.post('/task/addSubtasks',data).then(res=>{
                if(res.data.code == 200){
                  let params = {
                    id: this.elementId
                  }
                  api.get('/task/getOneTask', params).then(res => {
                    console.log(res.data.data);
                    res.data.data.sonTask.map(el=>{
                      el.createTime =this.getTime(el.createTime)
                      if (el.user.user_img ==''){
                        el.fileURL = headerUrl
                      }
                    })
                    this.sonTask =res.data.data.sonTask
                    this.sonTask.map(el=>{
                      this.$set(el, 'sonTaskName_Box',true)
                    })
                    this.$notify({
                      title: '成功',
                      message: '添加子任务成功',
                      type: 'success'
                    })
                    this.sonModel =''
                    this.taskType =''
                    this.son=true
                    this.addsonTask=false
                  })
                }
              })
            }else if (this.sonModel  == ''){
              this.$notify.error({
                title: '错误',
                message: '请填写任务名称'
              })
            }
          },

          //点击显示子任务修改盒子
          sonTask_list(li){
            this.sonTask.map(el=>{
              this.$set(el,'sonTaskName_Box',true)
              this.$set(li, 'sonTaskName_Box',false)
            })
          },


          // 修改子任务保存按钮
          sonTaskName_Updata(li,index){
            if(li.name !== ''){
              let data={
                eid:sessionStorage.getItem('enterpriseId'),
                projectId:sessionStorage.getItem('projectId'),
                id:li.id,
                name:li.name
              }
              api.post('/task/updTask',data)
                .then(res=>{
                    if(res.data.code == 200){
                      this.$notify({
                        title: '成功',
                        message: '修改子任务名称成功',
                        type: 'success'
                      })
                    }
                })
              this.sonTask.map(el=>{
                this.$set(el, 'sonTaskName_Box',true)
              })
            }else {
              this.$notify.error({
                title: '错误',
                message: '子任务名字不可为空'
              })
            }
          },

          //取消子任务按钮
          sonTaskName_Cancel(li){
            li.sonTaskName_Box = true
          },

          //点击子任务跳转
          sontaskHearf(li){
            this.taksCompile = false
            this.elementId = li.id
            let params = {id: li.id}
            api.get('/task/getOneTask', params).then(res => {
              res.data.data.fieldList.map(el => {
                      this.fieldList.map(el => {
                        if(el.name == '进度') {
                          if(el.taskAndFieldList.length > 0) {
                            this.scheduleValue = el.taskAndFieldList[0].content + '%'
                          }else if (el.taskAndFieldList.length == 0){
                            this.scheduleValue ='待添加'
                          }
                        }
                        else if(el.name == '备注') {
                          if(el.taskAndFieldList.length > 0) {
                            this.beiContent = el.taskAndFieldList[0].content

                          } else if(el.taskAndFieldList.length == 0) {
                            this.beiContent = '待添加'
                          }
                        }
                        else if(el.name == '标签') {
                          if(el.lableList.length > 0) {
                            this.lables = el.lableList
                            this.addLables = false
                          } else if(el.lableList.length == 0) {
                            this.addLables = true
                          }

                        }
                        else if(el.name == '任务目标') {
                          if(el.taskAndFieldList.length > 0) {
                            this.targetContent = el.taskAndFieldList[0].content
                          }else if (el.taskAndFieldList.length == 0){
                            this.targetContent ='待添加'
                          }
                        }
                        else if(el.name == '优先级') {
                          if(el.taskAndFieldList.length > 0) {
                            if(el.taskAndFieldList[0].content == 1) {
                              this.youxian = '一般'
                            } else if(el.taskAndFieldList[0].content == 2) {
                              this.youxian = '紧急'
                            } else if(el.taskAndFieldList[0].content == 3) {
                              this.youxian = '非常紧急'
                            }
                          }
                          else if(el.taskAndFieldList == ''){
                            this.youxian =''
                          }
                        }
                        else if(el.name == '工时') {
                          if(el.map.planTime !== null) {
                            this.planTime = '计划工时' + el.map.planTime
                            this.whiteFortimeInput = el.map.planTime + '小时'
                            this.waitforTime = el.map.planTime + '小时'
                          } else if(el.map.planTime == null) {
                            this.planTime = '未设置计划工时'
                          }

                        }
                        else if(el.type == 4){
                          if(el.taskAndFieldList.length > 0){

                            this.typeFilelist_riqi = el.taskAndFieldList[0].content
                          }else{
                            this.typeFilelist_riqi ='待添加'
                          }
                        }
                        else if(el.type == 1){
                          if(el.enterpriseDictionaries == null) {

                            this.fileList_check = '待添加'
                          }
                          else if(el.enterpriseDictionaries != null){

                            this.fileList_check = el.enterpriseDictionaries[0].name
                          }
                        }
                        else if(el.type == 2){
                          if (el.enterpriseDictionaries.length == 0){
                            this.fileList_allCheck =true
                          }else if (el.enterpriseDictionaries.length> 0){
                            this.fileList_allCheck =false
                            this.newAllcheck=el.enterpriseDictionaries
                          }
                        }
                        else if(el.type == 3){
                          if (el.taskAndFieldList.length == 0){
                            this.fileList_Numbershow= true
                            this.fileList_Number = '待添加'
                          }else if (el.taskAndFieldList.length>0){
                            this.fileList_Number =el.taskAndFieldList[0].content
                          }
                        }
                        else if(el.type == 5){
                          if (el.taskAndFieldList.length == 0){
                            this.fileList_Textshow =true
                            this.fileList_textal= '待添加'
                          }else if (el.taskAndFieldList.length>0){
                            this.fileList_Textshow =true
                            this.fileList_textal= el.taskAndFieldList[0].content
                          }
                        }
                      })
                      this.fieldList = res.data.data.fieldList
                    })
              //用户头像
              this.imgUrl =	res.data.data.task.user.user_img
              //任务名字
              this.project =	res.data.data.task.name
              //执行者名字
              this.Name = 	res.data.data.task.user.username
              //开始事件
              this.startTime = this.getTime(	res.data.data.task.startTime)
              //结束时间
              this.endTime = this.getTime(	res.data.data.task.endTime)
              //子任务
              if (  res.data.data.sonTask.length >0 ){
                res.data.data.sonTask.map(el=>{
                  this.$set(el,'sonTaskName_Box',true)
                  el.createTime =this.getTime(el.createTime)
                  if(el.user.user_img == ''){
                    el.fileURL = headerUrl
                  }
                })
                this.sonTask =res.data.data.sonTask
              }else if(res.data.data.sonTask.length == 0){
                this.sonTask=[]
              }
              //项目 任务 标题
              this.title  = res.data.data.countName
              res.data.data.commentList.map(el => {
                let deteItem = 'deteItem'
                el[deteItem] = false
              })
              this.components = res.data.data.commentList
              //储存执行者 userid
              this.userId = res.data.data.task.user.id
              //参与者

              if(res.data.data.task.userList.length >0){
                res.data.data.task.userList.map(el => {
                  this.$set(el, 'show', false);
                })
                this.canyuList = res.data.data.task.userList
              }else if(res.data.data.task.userList.length == 0){
                this.canyuList=[]
              }
              this.taksCompile = true
            })

          },

          showType(){
            this.floatType= !this.floatType
          },
          buttonhide(){
            this.son =true
            this.addsonTask=false
          },

          floatChen(){
            this.floatC = !this.floatC
          },
          //保存进度
          saveButton(){
            for(let i=0 ; i<this.onteList.fieldList.length ; i++){
              if(this.onteList.fieldList[i].name == "进度" ){
                if (this.schedule !== ''){
                  let params= {
                    type:this.onteList.fieldList[i].type,
                    default_field:this.onteList.fieldList[i].default_field,
                    tid:this.elementId,
                    typeId:this.onteList.fieldList[i].id,
                    content:this.schedule,
                  }
                  api.post('/task/updField',params).then(res=>{
                    if (res.data.code == 200){
                      this.$notify({
                        title: '成功',
                        message: '修改进度成功',
                        type: 'success'
                      })
                      this.scheduleShow=true
                      this.scheduleValue =this.schedule + '%'
                    }else if (res.data.code == 500){
                      this.$notify.error({
                        title: '错误',
                        message: '服务器异常'
                      });
                    }
                  })
                }else if(this.schedule == '') {
                  this.$notify({
                    title: '警告',
                    message: '进度不可为空',
                    type: 'warning'
                  });
                }
              }
            }
          },

          //进度修改
          scheduleHide(){
            console.log(this.schedule);
            console.log(this.scheduleValue);
            if (this.schedule !== ''){
              this.scheduleShow=true
              this.scheduleValue =this.schedule + '%'
            }else if (this.schedule == ''){
              this.$notify({
                title: '警告',
                message: '进度不可为空',
                type: 'warning'
              })
            }
            /*      if (this.schedule !== ''){
>>>>>>> 026ac14b86d2f512b1846b4b8a69536521734614
                    console.log(this.schedule)
                    this.scheduleValue =this.schedule + '%'
                    this.scheduleShow=true

                  }else if(this.schedule == ''){
                    this.scheduleValue= '请添加'
                    this.scheduleShow=true
                  }
      */
			},
			//工时显示
			isSchedule() {

				this.schedule = this.scheduleValue.replace("%", "")
				this.scheduleShow = false
				this.scheduleValue = this.schedule
			},

			//添加工时
			addTime() {
				if(this.value1 !== '' && this.yyhh !== '') {
					let data = {
						tasktime: this.yyhh,
						eid: sessionStorage.getItem('enterpriseId'),
						pid: sessionStorage.getItem('projectId'),
						tid: this.fatherId,
						time: this.value1
					}
					api.post('/task/addTaskTime', data)
						.then(res => {
							if(res.data.code == 200) {
								this.onteList.fieldList.map(el => {
									if(el.name == "工时") {
										let params = {
											tid: this.fatherId,
											fid: el.id
										}
										api.get('/task/getTimeLong', params).then(res => {
											console.log(res.data.data);
											res.data.data.list.map(el => {
												el.createTime = this.getTime(el.createTime).slice(5, 10)
												this.$set(el, 'show', false)
											})
											this.$notify({
												title: '成功',
												message: '添加时长成功',
												type: 'success'
											})
											this.yyhhList = res.data.data.list
											console.log(res.data.data.countTime, 'Y(^o^)Y');
											this.countTime = Math.round(res.data.data.countTime * 10) / 10
											this.yyhh = ''
											this.value1 = ''
											this.yes = false
											this.yyhhListHide = false
											this.yyhhListShow = true
										})

									}
								})
							}

						})
				} else if(this.value1 == '' || this.yyhh == '') {
					if(this.value1 == '') {
						this.$notify.error({
							title: '错误',
							message: '请填写日期 '
						})
					} else {
						this.$notify.error({
							title: '错误',
							message: '请填写工时 '
						})
					}
				} else {
					this.$notify.error({
						title: '错误',
						message: '请填写完整信息 '
					})
				}

			},

			//点击显示隐藏工时
			gongshifu() {

				let id = this.userId
				if(this.onteList.task.user.id == id) {
					this.gongshiInput = true
				} else {
					this.gongshiInput = false
				}
				for(let i = 0; i < this.onteList.fieldList.length; i++) {
					if(this.onteList.fieldList[i].name == "工时") {
						let params = {
							tid: this.fatherId,
							fid: this.onteList.fieldList[i].id
						}
						api.get('/task/getTimeLong', params).then(res => {
							res.data.data.list.map(el => {
								el.createTime = this.getTime(el.createTime).slice(5, 10)
								this.$set(el, 'show', false)
							})
							this.yyhhList = res.data.data.list
							this.countTime = Math.floor(res.data.data.countTime * 10) / 10
							if(this.yyhhList.length > 0) {
								this.yyhhListShow = true
								this.yyhhListHide = false
							} else if(this.yyhhList.length < 1) {
								this.yyhhListShow = false
								this.yyhhListHide = true
							}
						})

					}
				}
				if(this.planTime == '未设置计划工时') {
					this.waitforTime = '待添加'
					this.whiteFortimeInput = '待添加'
				} else {

				}
				this.gongshi = true
			},
			hideInput() {
				this.show = false
				this.isShow = true
				this.projectInput = this.project
			},

			//任务名字 回车键
			showP() {
				this.show = true
				this.isShow = false
				this.project = this.projectInput
				let data = {
					eid: sessionStorage.getItem('enterpriseId'),
					projectId: sessionStorage.getItem('projectId'),
					id: this.fatherId,
					name: this.project
				}
				api.post('/task/updTask', data).then(res => {})

			},

			//添加标签
			addLable(index, li) {
				this.lables.push(this.labelList[index])
				this.addLables = false
				this.labelList.splice(this.labelList[index], 1)
				this.onteList.fieldList.map(el => {
					if(el.name == '标签') {
						console.log(el);
						let data = {
							content: li.id,
							tid: this.fatherId,
							eid: sessionStorage.getItem('enterpriseId'),
							pid: sessionStorage.getItem('projectId'),
							type: el.type,
							typeId: 3,
							default_field: el.default_field,
						}
						api.post('/task/updField', data).then(res => {

						})
					}
				})
				this.lableFloat = !this.lableFloat
			},
			//标签浮动框
			showLable() {
				let params = {
					pid: sessionStorage.getItem('projectId'),
					fid: 3,

				}
				api.get('/task/findTaskLable', params).then(res => {
					this.labelList = res.data.data
				})
				this.lableFloat = !this.lableFloat

			},
			//级别浮动框选项
			checkYou(index) {
				for(let a = 0; a < this.youxianji.length; a++) {
					this.youxianji[a].show = false
					this.youxianji[index].show = true
				}
				this.youxian = this.youxianji[index].name
				this.showYou = false
				for(let i = 0; i < this.onteList.fieldList.length; i++) {
					if(this.onteList.fieldList[i].name == '优先级') {
						let data = {
							eid: sessionStorage.getItem('enterpriseId'),
							pid: sessionStorage.getItem('projectId'),
							type: this.onteList.fieldList[i].type,
							default_field: this.onteList.fieldList[i].default_field,
							tid: this.fatherId,
							typeId: this.onteList.fieldList[i].id,
							content: this.youxianji[index].id
						}
						api.post('/task/updField', data).then(res => {

						})
					}

				}

			},
			//级别浮动框
			youxianShow() {
				this.showYou = !this.showYou
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
			//评论删除
			showGongshi() {
				this.gongshi = false
			},
			//获取任务编辑信息
			getTaskEditMsg() {
				let params = {
					id: this.fatherId
				}
				api.get('/task/getOneTask', params).then(res => {
					this.fatherId = res.data.data.task.id
//					sessionStorage.setItem('tid',this.fatherId)
					this.onteList = res.data.data
					this.eitorId = res.data.data.taskId
					this.fatherPid = res.data.data.task.pid
					//6个固定标签的返回值判断
					res.data.data.fieldList.map(el => {
						this.$set(el, 'fileList_checkShow', false)
						this.fieldList.map(el => {
							if(el.name == '进度') {
								if(el.taskAndFieldList != null) {
									if(el.taskAndFieldList.length > 0) {
										this.scheduleValue = el.taskAndFieldList[0].content + '%'
									} else if(el.taskAndFieldList.length == 0) {
										this.scheduleValue = '请添加'
									}
								}
							} else if(el.name == '备注') {
								if(el.taskAndFieldList != null) {
									if(el.taskAndFieldList.length > 0) {

										this.beiContent = el.taskAndFieldList[0].content
									} else if(el.taskAndFieldList == '') {

										this.beiContent = '待添加'
									}
								}
							} else if(el.name == '标签') {
								if(el.lableList != null) {
									if(el.lableList.length > 0) {
										this.lables = el.lableList
										this.addLables = false
									} else if(el.lableList.length == 0) {
										this.lables = []
										this.addLables = true
									}
								}

							} else if(el.name == '任务目标') {
								if(el.taskAndFieldList != null) {
									if(el.taskAndFieldList.length > 0) {
										this.targetContent = el.taskAndFieldList[0].content
									} else if(el.taskAndFieldList.length == 0) {
										this.targetContent = '请添加'
									}
								}

							} else if(el.name == '优先级') {
								if(el.taskAndFieldList != null) {
									if(el.taskAndFieldList.length > 0) {
										if(el.taskAndFieldList[0].content == 1) {
											this.youxian = '一般'
										} else if(el.taskAndFieldList[0].content == 2) {
											this.youxian = '紧急'
										} else if(el.taskAndFieldList[0].content == 3) {
											this.youxian = '非常紧急'
										}
									} else if(el.taskAndFieldList == '') {
										this.youxian = ''
									}
								}

							} else if(el.name == '工时') {
								if(el.map.planTime !== null) {
									this.gongshi = false
									this.planTime = '计划工时' + el.map.planTime + '小时'
									this.whiteFortimeInput = el.map.planTime
									this.waitforTime = el.map.planTime
								} else if(el.map.planTime == null) {
									this.planTime = '未设置计划工时'
								}
								if(el.map.countTime !== null) {
									this.countTime = Math.floor(el.map.countTime * 10) / 10
								} else if(el.map.countTime == null) {
									this.countTime = '0'
								}
							} else if(el.type == 4) {
								if(el.taskAndFieldList != null) {
									if(el.taskAndFieldList.length > 0) {
										this.typeFilelist_riqi = el.taskAndFieldList[0].content
									} else {
										this.typeFilelist_riqi = '待添加'
									}
								}

							} else if(el.type == 1) {
								if(el.enterpriseDictionaries != ''&&el.enterpriseDictionaries != null) {
									if(el.enterpriseDictionaries.length == 0) {
										this.fileList_check = '待添加'
									} else if(el.enterpriseDictionaries != null) {
										this.fileList_check = el.enterpriseDictionaries[0].name
									}
								}

							} else if(el.type == 2) {
								if(el.enterpriseDictionaries.length == 0) {
									this.fileList_allCheck = true
								} else if(el.enterpriseDictionaries.length > 0) {
									this.fileList_allCheck = false
									this.newAllcheck = el.enterpriseDictionaries
								}
							} else if(el.type == 3) {
								if(el.taskAndFieldList.length == 0) {
									this.fileList_Numbershow = true
									this.fileList_Number = '待添加'
								} else if(el.taskAndFieldList.length > 0) {
									this.fileList_Number = el.taskAndFieldList[0].content
								}
							} else if(el.type == 5) {
								if(el.taskAndFieldList.length == 0) {
									this.fileList_Textshow = true
									this.fileList_textal = '待添加'
								} else if(el.taskAndFieldList.length > 0) {
									this.fileList_Textshow = true
									this.fileList_textal = el.taskAndFieldList[0].content
								}
							}
						})
						this.fieldList = res.data.data.fieldList
					})
					this.title = res.data.data.countName
					//添加附件 增加删除按钮
					this.onteList.tFileList.map(el => {
						this.$set(el, 'show', false)
					})
					//用户id
					this.userId = this.onteList.task.user.id
					//用户头像
					if(this.onteList.task.user.user_img == '') {
						// this.imgUrl = headerUrl
						console.log(this.onteList.task.user.username, 'Y(^o^)Y');
						if(this.onteList.task.user.username != '') {
							this.imgUrl = headerUrl
						} else {
							this.imgUrl = undefinedImg
						}
						// this.imgUrl = ''
					} else {
						this.imgUrl = this.onteList.task.user.user_img
					}
					//复选框的状态
					this.state = this.onteList.task.state
					//任务名字
					this.project = this.onteList.task.name
					//执行者名字
					if(this.onteList.task.user.username == '') {
						this.Name = '待认领'
						this.onteList.task.user.user_img = undefinedImg
					} else {
						this.Name = this.onteList.task.user.username
					}

					//开始事件
					this.startTime = this.getTime(this.onteList.task.startTime)
					//结束时间
					this.endTime = this.getTime(this.onteList.task.endTime)
					//子任务
					res.data.data.sonTask.map(el => {
						this.$set(el, 'sonTaskName_Box', true)
						el.createTime = this.getTime(el.createTime)
						if(el.user.user_img == '') {
                            el.fileURL = headerUrl
                            if (el.user.username != '') {
                                el.user.user_img = headerUrl
                            }else {
                                el.user.user_img = undefinedImg
                            }
						}
					})

					this.sonTask = res.data.data.sonTask
                    console.log(this.sonTask,'Y(^o^)Y');
					this.onteList.commentList.map(el => {
						let deteItem = 'deteItem'
						el[deteItem] = false
						if(el.user.user_img == '') {
							el.user.user_img = headerUrl
						}
					})
					this.components = this.onteList.commentList
					//储存执行者 userid
					this.userId = this.onteList.task.user.id
					//参与者
					this.onteList.task.userList.map(el => {
						this.$set(el, 'show', false)
						if(el.user_img == '') {
							el.user_img = headerUrl
						}
					})
					this.canyuList = this.onteList.task.userList
				})
			},

			...mapMutations({
				getInvitation: 'SET_GETINVITATION'
			})

		},
		computed: {
			...mapGetters({
				getOnte: 'GET_ONTE',
			})
		},
		watch: {
			//监听多选框
			newAllcheck() {
				if(this.newAllcheck.length == 0) {
					this.fileList_allCheck = true
				} else {
					this.fileList_allCheck = false
				}
			},
			//点击外层 关闭其他浮动框
			colseAll() {
				this.participantsBox = false

			},

			//参与者弹出框搜索功能
			participantsInput() {
				this.newParticipantsList = this.participantsList.filter(el => {
					if(el.username.indexOf(this.participantsInput) !== -1) {
						return true
					}
				})
			},

			participantsList() {
				this.newParticipantsList = this.participantsList
			},
			fatherId(){
				this.options1.query.tid = this.fatherId
			},
			//接收task组建传递过来的\n值
			taksCompileShow() {
				this.fatherId = this.elementId
				this.taksCompile = !this.taksCompile
				let _this = this;
				if(this.taksCompile == true) {
					if(this.num == 0) {
						this.$nextTick(() => {
							console.log(this.$refs.addfile)
							this.$refs.uploader.uploader.assignBrowse(this.$refs.addfile)
							this.$refs.uploader.uploader.on('complete', function() {
								_this.getTaskEditMsg()
							})
						})
						this.num++
					}
					
					
					this.getTaskEditMsg()
				}
			},

			//监视 this.addLables
			lables() {
				if(this.lables.length > 0) {
					this.addLables = false
				} else {
					this.addLables = true
				}
			},
			//修改截止时间
			endTime(newVal, oldVal) {
				let endTime = (new Date(this.endTime)).getTime() + 1000 * 60 * 60 * 23.9
				let startTime = (new Date(this.startTime)).getTime()
				if(endTime <= startTime) {
					this.$notify.error({
						title: '错误',
						message: '日期截止时间不可小于开始时间'
					})
					this.endTime = this.startTime + 1000 * 60 * 60 * 23.9

				}
				if(newVal !== oldVal && endTime > startTime) {
					let data = {
						eid: sessionStorage.getItem('enterpriseId'),
						projectId: sessionStorage.getItem('projectId'),
						id: this.fatherId,
						endTime: this.endTime
					}
					api.post('/task/updTask', data).then(res => {})
				}
			},
			//修改开始时间
			startTime(newVal, oldVal) {
				if(newVal !== oldVal) {
					let data = {
						eid: sessionStorage.getItem('enterpriseId'),
						projectId: sessionStorage.getItem('projectId'),
						id: this.fatherId,
						startTime: this.startTime
					}
					api.post('/task/updTask', data).then(res => {

					})
				}
			},

			//工时判断
			yyhh() {
				if(this.yyhh > 24) {
					setTimeout(()=>{
						this.yyhh = ''
					},1000)
					this.prompt = true
				}else if(this.yyhh <= 24){
					this.prompt = false
				}
				if(this.yyhh.length < 1) {
					this.yes = false
				} else if(this.yyhh.length > 0) {
					this.yes = true
				}

			},

			//查找成员
			peoples() {
				this.searchArr = this.peoples
			},

			//模糊查找
			searchInput() {
				this.searchArr = this.peoples.filter(el => {
					if(el.username.indexOf(this.searchInput) !== -1) {
						return true
					}
				})
			},

			//编辑盒子input输入框， 不得大于1000
			whiteFortimeInput(newVal, oldVal) {
				if(newVal > 1000) {
					this.whiteFortimeInput = oldVal
					if(newVal > 1000) {
						this.whiteAlert = '计划工事不可超过1000小时'

					}
				}
			},

			//去除进度
			schedule(newVal, oldVal) {
				if(newVal > 100) {
					this.schedule = oldVal
					this.alert = '请输入100以内的数字'
				} else if(newVal < 0) {
					this.schedule = 0
					this.$notify.error({
						title: '错误',
						message: '工时不得超过为负数'
					})
				} else if(newVal == '' && oldVal == '') {
					this.schedule = '请添加'
				}

			},

			//关闭组建收起所有下拉框  弹框
			taksCompile() {
				if(this.taksCompile == false) {
					this.taskSort = false
					this.projectHeaderFloat = false
					this.son = true
					this.participantsBox = false
					this.lableFloat = false
					this.gongshi = false
					this.targetbox = false
					this.scheduleShow = true
					this.showYou = false
					this.fildList_typeriqi = false
					this.addsonTask = false
				}
			}

		},

	}
</script>

<style scoped>
	#priority {
		padding: 2px 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
	}
	
	.taskSortAcitve {
		color: rgb(40, 121, 255);
	}
	
	.red {
		background: #e3768a;
		color: #ffffff;
	}
	
	.yellow {
		background: #ebc36d;
		color: #ffffff;
	}
	
	.lv {
		background: #97d5ca;
		color: #ffffff;
	}
	
	.partActive {
		color: #047ce6;
	}
	
	.newAllcheck {
		display: flex;
	}
	
	.newAllcheck>div {
		margin-right: 10px;
	}
	
	.navBox {
		display: flex;
	}
	
	.nav {
		position: relative;
		margin-right: 20px;
		display: flex;
		align-items: center;
	}
	
	.nav>img {
		margin-right: 6px;
	}
	
	.title {
		height: 95px;
		border-bottom: 1px dashed #e5e5e5;
	}
	
	.contentBox {}
	
	.ft16 {
		font-size: 16px;
	}
	
	.imgHeader {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	
	.imgHeader>img {
		height: 30px;
		width: 30px;
		border-radius: 50%;
	}
	
	.projectName {
		margin-top: 25px;
		display: flex;
		align-items: center;
	}
	
	.projectName>p {
		padding: 2px 11px;
		cursor: pointer;
		color: #333333;
		font-weight: bold;
		font-size: 16px;
	}
	
	.projectHeader {
		position: relative;
		margin-top: 15px;
		display: flex;
	}
	
	.projectHeader>div>p {
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.projectHeader_children {
		display: flex;
		align-items: center;
	}
	
	.mgL30 {
		margin-left: 30px;
	}
	
	.dispaly {
		display: flex;
		align-items: center;
	}
	
	.mgL10 {
		margin-left: 10px;
	}
	
	.mgT20 {
		margin-top: 20px;
	}
	
	.mgL30>p {
		margin-left: 8px;
	}
	
	.mgL15 {
		margin-left: 15px;
	}
	
	.ft14 {
		font-size: 14px;
	}
	
	.mgR10 {
		margin-right: 10px;
	}
	
	.reveitev {
		position: relative;
	}
	
	.noteBox {
		cursor: pointer;
		margin-left: 30px;
		position: relative;
	}
	
	.note {
		width: 560px;
		height: 150px;
		border: 1px dashed #e5e5e5;
		overflow: hidden;
	}
	
	.canyuLi {
		display: inline-block;
		cursor: pointer;
		padding: 2px 5px;
		border-radius: 5px;
	}
	
	.canyuLi>div>i {
		font-size: 12px;
	}
	
	.canyuLi:hover {
		background: #e5e5e5;
	}
	/*.canyuList{
    position: absolute;
    right: 15px;
    top: 24px;
  }*/
	
	.ft12 {
		font-size: 12px;
	}
	
	.mgr30 {
		margin-right: 30px;
	}
	
	.noteButton {
		display: flex;
		margin-left: 435px;
		margin-top: 10px;
	}
	
	.noteButton1 {
		display: flex;
		margin-left: 550px;
		top: 20px;
	}
	
	.inputOne {
		width: 310px;
		height: 35px;
		margin-left: 60px;
	}
	
	.threeBox {
		padding-bottom: 30px;
		border-bottom: 1px dashed #e5e5e5;
		margin-top: 10px;
	}
	
	.mgT15 {
		margin-top: 15px;
	}
	
	.mgL50 {
		margin-left: 50px;
	}
	
	.sonTaskInput {
		font-weight: 600;
		height: 35px;
		background-color: #fff;
		border-radius: 30px;
		border: 1px solid #dcdfe6;
		box-sizing: border-box;
		color: #999999;
		display: inline-block;
		font-size: 12px;
		line-height: 1;
		outline: 0;
		padding: 0 15px;
		width: 580px;
	}
	
	.sonTask {
		border-bottom: 1px dashed #e5e5e5;
		position: relative;
		margin-top: 25px;
	}
	
	.levelFloat {
		width: 230px;
		padding-top: 10px;
		padding-bottom: 20px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
		position: absolute;
	}
	
	.levelFloat>div {
		cursor: pointer;
	}
	
	.levelFloat>div>p {
		border-radius: 4px;
		display: flex;
		width: 70px;
		height: 20px;
		align-items: center;
		justify-content: center;
		margin-left: 20px;
		margin-top: 10px;
	}
	
	.gongshi {
		position: relative;
		cursor: pointer;
	}
	
	.levelFloat>li:hover {
		background: #e5e5e5;
	}
	
	.lableFloat {
		position: absolute;
		top: 40px;
		z-index: 9999;
		width: 248px;
		background: #ffffff;
		-webkit-box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
	}
	
	.lableFloat>div>p {
		width: 200px;
		height: 42px;
		margin-left: 10px;
	}
	
	.fujianBox {
		padding-bottom: 20px;
		border-bottom: 1px dashed #e5e5e5;
		margin-top: 20px;
	}
	
	.canyuBox {
		padding: 18px 0;
		box-sizing: border-box;
		position: relative;
		border-bottom: 1px dashed #e5e5e5;
	}
	
	.renwuBox {
		height: 545px;
		background: royalblue;
		border-bottom: 1px dashed #e5e5e5;
	}
	
	.guanlianBox {
		padding-bottom: 20px;
		border-bottom: 1px dashed #e5e5e5;
		margin-top: 20px;
	}
	
	.f3f3f3 {
		border-radius: 2px;
		padding: 8px 4px;
		width: 200px;
		font-size: 12px;
		background: #f3f3f3;
	}
	
	.tabBox {
		margin-top: 30px;
	}
	
	.cTit {
		height: 23px;
	}
	
	.mgL6 {
		margin-left: 6px;
	}
	
	.projectInput {
		background: #f7f7f7;
		width: 100%;
		padding: 4px;
		margin-left: 4px;
		font-size: 14px;
		border-radius: 3px
	}
	
	.gongshifu {
		left: -20px;
		width: 230px;
		height: 360px;
		overflow-x: hidden;
		overflow-y: auto;
		position: absolute;
		bottom: -10px;
		background: #fff;
		border: 0 solid transparent;
		border-radius: 4px;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
	}
	
	.gongshiTitle {
		align-items: center;
		display: flex;
		height: 40px;
	}
	
	.shijigs {
		padding: 12px 0;
		display: flex;
	}
	
	.floatC>li:hover {
		background: #F7F7F7;
	}
	
	.floatC>li {
		height: 37px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		font-size: 14px;
		cursor: pointer;
		position: relative
	}
	
	.floatC>li>div {
		margin-left: 10px;
	}
	
	.floatC {
		width: 243px;
		position: absolute;
		right: 0;
		padding-bottom: 10px;
		top: 30px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
		;
	}
	
	.hoverName:hover {
		background: #f7f7f7;
		cursor: pointer;
	}
	
	.yyhhListHide {
		display: flex;
		justify-content: center;
	}
	
	.typeLi {
		display: flex;
	}
	
	.typeLi>div>img {
		margin-right: 15px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}
	
	.floatType {
		width: 243px;
		position: absolute;
		padding-bottom: 10px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
		;
	}
	
	.floatType>li {
		display: flex;
		align-items: center;
		margin-top: 20px;
		cursor: pointer;
	}
	
	.floatType>li>i {
		margin-left: 10px;
	}
	
	.floatType>li:hover {
		background: #F7F7F7;
	}
	
	.zhixing {
		background: #F7F7F7;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.riqi {
		display: flex;
	}
	
	.prompt {
		font-size: 12px;
		color: red;
	}
	
	.yyhlis:hover {
		background: #F7F7F7;
	}
	
	.yyhlis {
		height: 40px;
		display: flex;
		align-items: center;
		margin-top: 10px;
	}
	
	.item_checkShow {
		font-size: 12px;
		margin-top: 10px;
		cursor: pointer;
	}
	
	.lableTitle {
		display: flex;
		height: 40px;
		position: relative;
		border-bottom: 2px solid #f3f3f3;
	}
	
	.lableTitle>p {
		display: flex;
		align-items: center;
	}
	
	.lableTitle>img {
		position: absolute;
		top: 12px;
		right: 0;
	}
	
	.lableInput {
		margin-top: 10px;
		width: 190px;
		height: 30px;
	}
	
	.lableButton {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		margin-top: 25px;
		width: 190px;
		height: 35px;
		background-color: #409EFF;
		border-color: #409EFF;
		color: #ffffff;
	}
	
	.lableBox {
		top: 30px;
		padding: 0 20px;
		padding-bottom: 10px;
		width: 190px;
		position: absolute;
		z-index: 9999;
		background: #ffffff;
		-webkit-box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		border: 0 solid transparent;
		border-radius: 4px;
	}
	
	.levelBox {
		top: 30px;
		padding: 0 20px;
		padding-bottom: 10px;
		width: 190px;
		position: absolute;
		z-index: 9999;
		background: #ffffff;
		-webkit-box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		border: 0 solid transparent;
		border-radius: 4px;
	}
	
	.accessoryBox {
		top: 30px;
		padding: 0 4px;
		padding-bottom: 10px;
		width: 220px;
		position: absolute;
		z-index: 9999;
		background: #ffffff;
		-webkit-box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		border: 0 solid transparent;
		border-radius: 4px;
	}
	
	.participantsBox {
		padding: 20px 0;
		width: 220px;
		position: absolute;
		z-index: 9999;
		background: #ffffff;
		-webkit-box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		border: 0 solid transparent;
		border-radius: 4px;
	}
	
	.addAddce {
		margin-left: 5px;
		width: 40px;
		height: 40px;
		border: 1px solid #dcdfe6;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.taskSort {
		right: 10px;
		top: 30px;
		padding: 0 17px;
		padding-bottom: 10px;
		width: 226px;
		position: absolute;
		z-index: 9999;
		background: #ffffff;
		-webkit-box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		border: 0 solid transparent;
		border-radius: 4px;
	}
	
	.taskSortTit {
		height: 52px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border-bottom: 1px solid #efefef;
	}
	
	.taskSortTit>img {
		position: absolute;
		right: 0;
		top: 17px;
	}
	
	.tasks {
		border-bottom: 1px solid #e5e5e5;
		padding: 20px 0;
	}
	
	.taskSort_task {
		cursor: pointer;
		margin-top: 18px;
		display: flex;
		align-items: center;
	}
	
	.taskSort_task>p {
		font-size: 12px;
		margin-left: 20px;
	}
	
	.task_List {
		padding: 22px 0;
		border-bottom: 1px solid rgb(229, 229, 229)
	}
	
	.taskSort_taskList>p {
		font-size: 12px;
		margin-left: 20px;
	}
	
	.taskSort_task:first-child {
		margin-top: 0;
	}
	
	.taskSort_taskList:first-child {
		margin-top: 0;
	}
	
	.taskSort_taskList {
		cursor: pointer;
		margin-top: 20px;
		display: flex;
	}
	
	.privacy {
		padding: 18px 0;
	}
	
	.privacyBox {
		display: flex;
		height: 35px;
	}
	
	.allPeople {
		margin-top: 10px;
		height: 35px;
		background: #F7F7F7;
		display: flex;
		align-items: center;
	}
	
	.allPeople>p {
		margin-left: 6px;
	}
	
	.participantsList_box {
		padding: 10px 0px;
	}
	
	.participantsList:first-child {
		margin-top: 0;
	}
	
	.participantsList {
		margin-left: 20px;
		cursor: pointer;
		display: flex;
		align-items: center;
		height: 30px;
		margin-top: 10px;
	}
	
	.participantsList>p {
		margin-left: 7px;
	}
	
	.participantsList>img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	
	.projectHeaderFloat {
		top: 50px;
		padding: 20px 0;
		position: absolute;
		width: 230px;
		z-index: 9999;
		background: #ffffff;
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
	}
	
	.peoples>div {
		margin-top: 5px;
		height: 35px;
		display: flex;
		align-items: center;
	}
	
	.peopleAcitve {
		background: #f7f7f7;
		color: #409EFF;
	}
	
	.targetCancel {
		border: 5px;
		width: 70px;
		margin-right: 20px;
		height: 40px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ffffff;
	}
	
	.waitforTime {
		position: relative;
		margin-left: 10px;
		display: flex;
		align-items: center;
		width: 100px;
		height: 28px;
	}
	
	.waitforTime>p {
		position: absolute;
		right: 10px;
	}
	
	.waitforTime:hover {
		border-radius: 5px;
		background: #f5f5f5;
	}
	
	.whiteFortimeInput {
		font-weight: 600;
		height: 28px;
		background-color: #fff;
		border-radius: 5px;
		border: 1px solid #dcdfe6;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #999999;
		display: inline-block;
		font-size: 12px;
		line-height: 1;
		outline: 0;
		padding: 0 15px;
		width: 70px;
	}
	
	.sonTaskName {
		padding-left: 3px;
		border-radius: 2px;
		white-space: nowrap;
		width: 500px;
		overflow-x: auto;
	}
	
	.sonTaskName:hover {
		background: #f7f7f7;
		cursor: pointer;
	}
	
	.lableFloat-input {
		flex: 1;
		padding: 8px 0 8px 18px;
		border: none;
		width: 182px;
		height: 24px;
	}
	
	.lableI {
		color: rgb(61, 168, 245);
		width: 48px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.addLableBox {
		width: 248px;
		height: 216px;
	}
	
	.addLableBox_title {
		justify-content: center;
		align-items: center;
		height: 40px;
		display: flex;
		position: relative;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.addLableBox_Button:hover {
		background-color: #3da8f5 !important;
	}
	
	.item_checkNamep {
		color: #3da8f5
	}
	
	.fileList_allAcitve {
		color: #3da8f5
	}
	
	.addLableBox_Button {
		font-weight: 500;
		font-size: 14px;
		color: #fff;
		border: 0;
		border-radius: 5px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 216px;
		background-color: #ccc!important;
		;
	}
	
	.label {
		width: 248px;
		height: 40px;
		display: flex;
		align-items: center;
	}
	
	.label:hover {
		background: #e5e5e5;
	}
	
	.label>p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 20px;
		flex: 1;
		font-size: 14px;
		color: gray;
		font-weight: 600;
	}
	
	.label_icon:hover {
		color: #3da8f5;
	}
	
	.label_icon {
		z-index: 5;
		margin-right: 15px;
		font-size: 20px;
	}
	
	.lablesHover {
		padding: 0 2px;
		display: flex;
		max-width: 100px;
	}
	
	.lablesHover:hover {
		background: #e8e8e8;
		border-radius: 3px;
	}
	
	.fieldListname {
		display: flex;
		align-items: center;
		white-space: nowrap;
		margin-left: 25px;
		font-size: 12px;
		color: #999999
	}
	
	.uploadBox {
		display: none;
	}
	
	.sonNav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: #333333;
	}
	
	.sonContent {
		display: flex;
		justify-content: space-between;
		right: 20px;
		position: absolute;
		width: 200px
	}
	
	.sonContent>img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	
	.sontaskItem:first-child {
		margin-top: 0;
	}
	
	.sontaskItem {
		margin-top: 14px;
	}
	
	.inputEl>input {
		width: 200px;
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
	
	.fileList_nav {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center
	}
	
	.numberBox {
		display: flex;
		align-items: center;
	}
	
	.relTask {
		width: 100%;
		padding: 10px;
		border-radius: 3px;
		margin-right: 4px;
		cursor: pointer;
	}
	
	.relTask:hover {
		background: #E7E7E7;
	}
	
	.fileList_checkShow {
		width: 230px;
		padding-top: 10px;
		padding-bottom: 20px;
		z-index: 9999;
		background: #ffffff;
		-webkit-box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
		border: 0 solid transparent;
		border-radius: 4px;
		position: absolute
	}
	
	.relTask>div:nth-child(1) {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.relTask img {
		width: 30px;
		height: 30px;
		border-radius: 30px;
		margin-right: 10px
	}
	
	.taskEtidBox::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.taskEtidBox::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/
	
	.taskEtidBox::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}
</style>
<style>
	/* 时间控件样式 */
	
	.fileList_TextBox {
		width: 200px;
	}
	
	.fileList_TextBox .el-input__inner {
		width: 200px !important;
		border: 1px solid #dcdfe6 !important;
	}
	
	.mgL30 .el-input__inner {
		border: none !important;
		width: 80px !important;
		text-align: center !important;
		padding: 0 !important;
		color: #666666 !important;
	}
	
	.boxInt .el-input__inner {
		border: none !important;
		width: 80px !important;
		text-align: center !important;
		padding: 0 !important;
		color: #666666 !important;
	}
	
	.mgL30 .el-input--suffix {
		border: none !important;
		padding: 0 !important;
	}
	
	.mgL30 .el-input__icon {
		display: none !important;
	}
	
	.boxInt .el-input__icon {
		display: none !important;
	}
	
	.typeFilelist .el-input__inner {
		width: 200px !important;
		border: 1px solid #dcdfe6 !important;
	}
	
	.numberBox .el-input__inner {
		width: 200px !important;
		border: 1px solid #dcdfe6 !important;
	}
</style>