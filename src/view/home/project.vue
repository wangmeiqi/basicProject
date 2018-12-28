<template>
	<div>
	<div class="projectBox" v-if="publlQYidFlage">
		<vaddfield v-show="addfieldBol" :addfieldBol="addfieldBol" @closes="closeAddField"></vaddfield>
		<edittasktype :edittasktypeBol="edittasktypeBol" :taskTypeId="taskTypeId" v-show="edittasktypeBol" @closes="closeAddField"></edittasktype>
		<!--三级分类-->
		<div>
			<h1>企业项目</h1>
			<el-row style="margin-top: 24px;">
				<el-col :span="24">
					<el-row :class="{typeBox:!typeOneBol,typeBoxShow:typeOneBol}">
						<el-col :span="2">
							<div class="hand">
								<span style="cursor: default;">{{typeOneMes.name}} :</span>
							</div>
						</el-col>
						<el-col :span="21" class="breadth">
							<ul ref="box1">
								<li class="editor" v-if="editXmfzFlage" @click="openEditTypeMT(1)" style="cursor: pointer;"><i class="iconfont icon-bianji1"></i> 编辑</li>
								<li style="cursor: pointer;" v-for="(item, index) in typeOneList" :key="index" @click="screens(index,1,item.checked)" :class="{typeChecked:item.checked}">
									<span v-if="item.description==''">
										<div slot="content" v-html="changBr(item.description)"></div>
								     	<p>{{item.name}}</p>
									</span>
									<span v-if="item.description!=''">
										<el-tooltip class="item" effect="dark" placement="bottom">
									     	<div slot="content" v-html="changBr(item.description)"></div>
									     	<p>{{item.name}}</p>
									  	</el-tooltip>
									</span>
								</li>
							</ul>
						</el-col>
						<el-col :span="1">
							<span v-if="typeoneShow" @click="typeOneBol=!typeOneBol" class="hand">{{typeOneBol | fold}} <i v-if="typeOneBol" class="el-icon-arrow-up"></i><i v-if="!typeOneBol" class="el-icon-arrow-down"></i></span>
						</el-col>
					</el-row>
					<el-row :class="{typeBox:!typeTwoBol,typeBoxShow:typeTwoBol}">
						<el-col :span="2">
							<div class="hand">
								<span style="cursor: default;">{{typeTwoMes.name}} :</span>
							</div>
						</el-col>
						<el-col :span="21" class="breadth">
							<ul ref="box2">
								<li class="editor" v-if="editXmfzFlage" style="cursor: pointer;" @click="openEditTypeMT(2)"><i class="iconfont icon-bianji1"></i> 编辑</li>
								<li style="cursor: pointer;" v-for="(item, index) in typeTwoList" :key="index" @click="screens(index,2,item.checked)" :class="{typeChecked:item.checked}">
									<span v-if="item.description==''">
										<div slot="content" v-html="changBr(item.description)"></div>
								     	<p>{{item.name}}</p>
									</span>
									<span v-if="item.description!=''">
										<el-tooltip class="item" effect="dark" placement="bottom">
									     	<div slot="content" v-html="changBr(item.description)"></div>
									     	<p>{{item.name}}</p>
									  	</el-tooltip>
									</span>
								</li>
							</ul>
						</el-col>
						<el-col :span="1">
							<span v-if="typeTwoShow" @click="typeTwoBol=!typeTwoBol" class="hand">{{typeTwoBol | fold}} <i v-if="typeTwoBol" class="el-icon-arrow-up"></i><i v-if="!typeTwoBol" class="el-icon-arrow-down"></i></span>
						</el-col>
					</el-row>
					<el-row :class="{typeBox:!typeThreeBol,typeBoxShow:typeThreeBol}">
						<el-col :span="2">
							<div class="hand">
								<span style="cursor: default;">{{typeThreeMes.name}} :</span>
							</div>
						</el-col>
						<el-col :span="21" class="breadth">
							<ul ref="box3">
								<li class="editor" v-if="editXmfzFlage" style="cursor: pointer;" @click="openEditTypeMT(3)"><i class="iconfont icon-bianji1"></i> 编辑</li>
								<li style="cursor: pointer;" v-for="(item, index) in typeThreeList" :key="index" @click="screens(index,3,item.checked)" :class="{typeChecked:item.checked}">
									<span v-if="item.description==''">
										<div slot="content" v-html="changBr(item.description)"></div>
								     	<p>{{item.name}}</p>
									</span>
									<span v-if="item.description!=''">
										<el-tooltip class="item" effect="dark" placement="bottom">
									     	<div slot="content" v-html="changBr(item.description)"></div>
									     	<p>{{item.name}}</p>
									  	</el-tooltip>
									</span>
								</li>
							</ul>
						</el-col>
						<el-col :span="1">
							<span v-if="typeThreeShow" @click="typeThreeBol=!typeThreeBol" class="hand">{{typeThreeBol | fold}} <i v-if="typeThreeBol" class="el-icon-arrow-up"></i><i v-if="!typeThreeBol" class="el-icon-arrow-down"></i></span>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		<!--项目列表-->
		<div class="projectBody">
			<div class="card" @click="skipTask(item)" v-for="(item,index) in projectList" :key="index" @mouseover="item.handle = true" @mouseleave="item.handle = false">
				<div class="cardTitle">
					<div>{{item.name}}</div>
					<div>
						<el-tooltip class="item" effect="dark" content="打开项目设置" placement="top">
							<i @click.stop="openEditPro(index,1)" v-show="item.handle" class="iconfont icon-bianji1"></i>
						</el-tooltip>
						<!--<el-tooltip class="item" effect="dark" content="星标" placement="top">
						 	<i v-show="item.handle" class="iconfont icon-shoucang"></i>
						</el-tooltip>-->
					</div>
				</div>
				<div style="color: white;font-size: 12px;">
					<span v-if="item.bewrite.length <= 20">{{item.bewrite}}</span>
					<!--<el-tooltip  v-if="item.bewrite.length > 20" class="item" effect="dark" :content="item.bewrite" placement="bottom">-->
					<!--<span>{{item.bewrite | longStrCut}}</span>-->
					<!--</el-tooltip>-->
				</div>
				<div class="bg"></div>
				<img v-if="item.image != ''" class="bgimg" :src="item.image" />
				<img v-if="item.image == ''" class="bgimg" src="../../assets/images/back.png" />
			</div>
			<div class="addPro" v-if="isCurrentEnterprise && newQyxmFlage" @click="openAddProMT">
				<div>
					<i class="iconfont icon-add"></i>
				</div>
				<div>
					<span>创建新项目</span>
				</div>
			</div>
		</div>
		<!--归档的项目-->
		<h1 style="margin-top: 80px;">已归档的项目<span @click="openFileProList">{{fileProject | proFile}}
			<i v-show="fileProject" class="el-icon-arrow-up"></i>
			<i v-show="!fileProject" class="el-icon-arrow-down"></i>
		</span></h1>
		<div class="projectBody" v-show="fileProject">
			<div class="card" v-for="(item,index) in fileProjectList" :key="index" @mouseover="item.handle = true" @mouseleave="item.handle = false">
				<div class="cardTitle">
					<div>{{item.name}}</div>
					<div>
						<el-tooltip class="item" effect="dark" content="激活项目" placement="top">
							<i @click="proFile(0,index)" class="iconfont icon-guidang"></i>
						</el-tooltip>
					</div>
				</div>
				<div style="color: white;font-size: 12px;">
					<span v-if="item.bewrite.length <= 20">{{item.bewrite}}</span>
					<el-tooltip v-if="item.bewrite.length > 20" class="item" effect="dark" :content="item.bewrite" placement="bottom">
						<span>{{item.bewrite | longStrCut}}</span>
					</el-tooltip>
				</div>
				<div class="bg"></div>
				<img v-if="item.image != ''" class="bgimg" :src="item.image" />
				<img v-if="item.image == ''" class="bgimg" src="../../assets/images/back.png" />
			</div>
		</div>
		<div style="width: 10px;height: 30px;"></div>

		<!--创建企业功能-->
		<el-dialog :append-to-body="true" title="创建项目" :visible.sync="addProjectBol" width="430px" center>
			<div class="MTbox">
				<el-row>
					<el-col :span="24" class="center">
						<img src="../../assets/images/chuangjian.png" />
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center">
						<span style="font-size: 12px;color: #999999;">为不同的事务建立各自的项目</span>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center">
						<el-input v-model="newProMeg.name" :maxlength="15" placeholder="项目名称"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center">
						<el-input v-model="newProMeg.describe" :maxlength="400" placeholder="项目描述"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center">
						<el-input v-model="newProMeg.target" placeholder="项目目标" :maxlength="200"></el-input>
					</el-col>
				</el-row>
				<!--<el-row>
					<el-col :span="24" class="center" style="justify-content: flex-start;">
						<span style="font-size: 10px;margin-right: 30px;color: #999999;">是否同步到手机上</span>
						<el-radio size="mini" v-model="newProMeg.synchronization" value="1" label="1">是</el-radio>
						<el-radio size="mini" v-model="newProMeg.synchronization" value="0" label="0">否</el-radio>
					</el-col>
				</el-row>-->
				<el-row class="projectTarget">
					<el-col :span="24" class="left">
						项目分类
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center" style="justify-content: flex-start;">
						<el-select v-model="newProMeg.oneId" :placeholder="typeOneMes.name" style="width: 100%;">
							<el-option v-for="item in typeOneListMT" :key="item.dicId" :label="item.name" :value="item.dicId">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center" style="justify-content: flex-start;">
						<el-select v-model="newProMeg.twoId" :placeholder="typeTwoMes.name" style="width: 100%;">
							<el-option v-for="item in typeTwoListMT" :key="item.dicId" :label="item.name" :value="item.dicId">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center" style="justify-content: flex-start;">
						<el-select v-model="newProMeg.threeId" :placeholder="typeThreeMes.name" style="width: 100%;">
							<el-option v-for="item in typeThreeListMT" :key="item.dicId" :label="item.name" :value="item.dicId">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center" style="justify-content: flex-start;">
						<button @click="createdProject()" class="finishBtn">完成并创建</button>
					</el-col>
				</el-row>
			</div>
		</el-dialog>
		<!--在模板下创建企业-->
		<el-dialog :append-to-body="true" title="创建项目" :visible.sync=" addProjectTemplet" width="800px" center class="mystyle">
			<div class="line"></div>
			<div class="fl introduce" style="padding-bottom: 36px;height: 350px;">
				<p style="height: 70px;line-height: 70px;">任务流</p>
				<div class="flow">
					<span v-for="(item,index) in taskList">
						{{item.name}}
						<i v-if="taskList.length-1!=index">></i>
					</span>
				</div>
				<p style="height: 70px;line-height: 70px;">应用与插件</p>
				<div>
					<span class="iconStyle">
						<i style="color: #409EFF;" class="iconfont icon-add"></i>
						<i style="color: #000;">任务</i>
					</span>
					<span class="iconStyle">
						<i style="color: #409EFF;" class="iconfont icon-add"></i>
						<i style="color: #000;">分享</i>
					</span>
					<span class="iconStyle">
						<i style="color: #409EFF;" class="iconfont icon-add"></i>
						<i style="color: #000;">文件</i>
					</span>
					<span class="iconStyle">
						<i style="color: #409EFF;" class="iconfont icon-add"></i>
						<i style="color: #000;">日程</i>
					</span>
					<span class="iconStyle">
						<i style="color: #409EFF;" class="iconfont icon-add"></i>
						<i style="color: #000;">群聊</i>
					</span>

				</div>
			</div>
			<div class="MTbox fl" style="width: 346px;height:350px;background: #fff;border: 0;padding: 0 27px 36px 27px;">
				<el-row>
					<el-col :span="24" class="center">
						<el-input v-model="newProMeg.name" :maxlength="15" placeholder="项目名称"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center">
						<el-input v-model="newProMeg.describe" :maxlength="400" placeholder="项目描述"></el-input>
					</el-col>
				</el-row>
				<el-row class="projectTarget">
					<el-col :span="24" class="center">
						<el-input v-model="newProMeg.target" placeholder="项目目标" :maxlength="200"></el-input>
					</el-col>
				</el-row>
				<!--<el-row>
					<el-col :span="24" class="center" style="justify-content: flex-start;">
						<span style="font-size: 10px;margin-right: 30px;color: #999999;">是否同步到手机上</span>
						<el-radio size="mini" v-model="newProMeg.synchronization" value="1" label="1">是</el-radio>
						<el-radio size="mini" v-model="newProMeg.synchronization" value="0" label="0">否</el-radio>
					</el-col>
				</el-row>-->
				<el-row>
					<el-col :span="24" class="left">
						项目分类
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center" style="justify-content: flex-start;">
						<el-select v-model="newProMeg.oneId" :placeholder="typeOneMes.name" style="width: 100%;">
							<el-option v-for="item in typeOneListMT" :key="item.dicId" :label="item.name" :value="item.dicId">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center" style="justify-content: flex-start;">
						<el-select v-model="newProMeg.twoId" :placeholder="typeTwoMes.name" style="width: 100%;">
							<el-option v-for="item in typeTwoListMT" :key="item.dicId" :label="item.name" :value="item.dicId">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="center" style="justify-content: flex-start;">
						<el-select v-model="newProMeg.threeId" :placeholder="typeThreeMes.name" style="width: 100%;">
							<el-option v-for="item in typeThreeListMT" :key="item.dicId" :label="item.name" :value="item.dicId">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
			</div>
			<div class="line" style="margin-top: 415px;"></div>
			<div style="text-align: right;">
				<button @click="createdProject()" class="finishBtn" style="margin-right: 15px;width: 88px;">完成并创建</button>
			</div>
		</el-dialog>
		<!--新增分类-->
		<el-dialog :append-to-body="true" title="项目管理分类" :visible.sync="editTypeBol" width="430px" center>
			<div class="MTbox" style="overflow: inherit;height: auto;border-top:0">
				<el-row class="editRow">
					<el-col :span="24">
						<el-input :maxlength="15" placeholder="输入项目分类名称" v-model="editTypemsg.name" class="input-with-select">
							<el-button @click="addType" style="background: #077ce6;color: white;border-radius: 0 2px 2px 0;border:1px solid #077ce6" slot="append" type="primary">添加</el-button>
						</el-input>
					</el-col>
				</el-row>
				<el-row class="editRow">
					<el-col :span="24">
						<el-input :maxlength="150" placeholder="输入项目分类描述" v-model="editTypemsg.describe" class="input-with-select">
						</el-input>
					</el-col>
				</el-row>
				<el-row class="editRow">
					<el-col :span="24">
						<h3><span>企业项目分类</span></h3>
					</el-col>
				</el-row>
				<el-row class="editRow">
					<el-col :span="24">
						<ul>
							<li class="typeList" v-for="(item,index) in editTypeList" :key="index">
								<div>
									<i class="iconfont icon-xiangmuguanli" :class="{iconColor1:index%2==1,iconColor1:index%1==1,iconColor2:index%2==1,iconColor3:index%3==1,iconColor4:index%2==0}"></i>
									<span class="projectName">{{item.name}}</span>
								</div>
								<div>
									<span style="position: relative;">
										<i @click="editTypeBox(index)" class="iconfont icon-bianji"></i>
										<div class="editType" v-show="item.editBol">
											<el-row style="margin-bottom: 14px;border-bottom: 2px solid #efefef;">
												<el-col :span="2">&nbsp;</el-col>
												<el-col :span="20" style="font-size: 14px;display: flex;justify-content: center;align-items: center;">
													<span style="color: #333;font-size: 14px;font-weight: ;all: 00;">编辑项目分类</span>
					</el-col>
					<el-col :span="2">
						<i @click="item.editBol = false" class="iconfont icon-guanbi" style="font-size: 12px;"></i>
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 7px;">
					<el-col :span="24">
						<el-input :maxlength="15" v-model="smallEditTypemsg.name" placeholder="输入项目分类名称"></el-input>
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 14px;">
					<el-col :span="24">
						<el-input v-model="smallEditTypemsg.description" type="textarea" :rows="2" placeholder="输入项目分类描述"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<button class="redBtn" @click="editType(index)">确定</button>
					</el-col>
				</el-row>
				</div>
				</span>
				<i @click="delType(item)" class="iconfont icon-shanchu1"></i>
				<i @click="typeSort(index)" class="iconfont icon-paixusheng"></i>
			</div>
			</li>
			</ul>
			</el-col>
			</el-row>
	</div>
	</el-dialog>

	<!--项目编辑-->
	<el-dialog :append-to-body="true" title="项目设置" :visible.sync="editProBol" width="810px" center>
		<div class="MTbox" style="width: 808px;margin-left: -26px;overflow: inherit;border-top: 0;">
			<div class="editBox">
				<div class="leftNav">
					<ul>
						<li :class="{check:editProFlag==nav.flag}" v-for="(nav, index) in editProLeftList" :key="index" class="nav" @click="navSkip(nav.flag)">
							<i :class="nav.icon"></i> {{nav.name}}
						</li>
					</ul>
				</div>
				<div class="rightMain">
					<div class="box" v-if="editProFlag == 1">
						<!--项目信息-->
						<!--<el-row>
								<el-col :span="24">
									<i class="iconfont icon-icon13" style="color: #077ce7;"></i>
									<span style="color: #077ce7;">您暂时没有权限修改此处设置，请联系拥有者修改</span>
								</el-col>
							</el-row>-->
						<el-row>
							<el-col :span="24" class="proMesRow">
								<h3>项目封面</h3>
								<div style="display: flex;align-items: flex-end;">
									<div class="fengmian">
										<img v-if="proMes.image!=''" :src="proMes.image" />
										<img v-if="proMes.image==''" src="../../assets/images/back.png" />
									</div>
									<div style="margin-left: 12px;">
										<up-load title="编辑项目封面" @sendBase64="changeProBg">上传封面</up-load>
									</div>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="proMesRow">
								<h3>项目名称</h3>
								<el-input v-model="proMes.name" :maxlength="15" placeholder="项目名称"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="proMesRow">
								<h3>项目目标</h3>
								<el-input v-model="proMes.targets" placeholder="项目目标"></el-input>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="8" class="proMesRow">
								<h3>项目分类</h3>
								<el-select v-model="proMes.oneId" :placeholder="typeOneMes.name">
									<el-option v-for="item in typeOneListMT" :key="item.dicId" :label="item.name" :value="item.dicId">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="8" class="proMesRow">
								<h3>&nbsp;</h3>
								<el-select v-model="proMes.twoId" :placeholder="typeTwoMes.name">
									<el-option v-for="item in typeTwoListMT" :key="item.dicId" :label="item.name" :value="item.dicId">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="8" class="proMesRow">
								<h3>&nbsp;</h3>
								<el-select v-model="proMes.threeid" :placeholder="typeThreeMes.name">
									<el-option v-for="item in typeThreeListMT" :key="item.dicId" :label="item.name" :value="item.dicId">
									</el-option>
								</el-select>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="proMesRow">
								<h3>项目简介</h3>
								<el-input type="textarea" :rows="3" v-model="proMes.bewrite" placeholder="项目简介"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="proMesRow">
								<h3>项目公开性</h3>
								<el-select v-model="proMes.projectType" placeholder="项目公开性">
									<el-option v-for="item in proOpenness" :key="item.flag" :label="item.content" :value="item.flag">
									</el-option>
								</el-select>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="proMesRow">
								<h3>项目归属</h3>
								<div class="enterpriseBox">
									<div>
										<img v-if="proMes.enterprise.imgUrl !=''" :src="proMes.enterprise.imgUrl" />
										<img v-if="proMes.enterprise.imgUrl ==''" src="../../assets/images/22登录_01.png" />
									</div>
									<span>{{proMes.enterprise.name}}</span>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20" class="proMesRow">
								<h3>&nbsp;</h3>

							</el-col>
							<el-col :span="4" class="proMesRow">
								<el-button @click="saveProMeg" style="width:100%" type="primary">保存</el-button>
							</el-col>
						</el-row>
					</div>

					<div class="box" v-if="editProFlag == 2">
						<!--项目偏好-->
					</div>
					<div class="box" v-if="editProFlag == 3">
						<!--任务类型配置-->
						<div class="addTaskType" @click="addfieldBol=true;editProBol=false">
							<i class="iconfont icon-tianjia2"></i>
							<span>添加任务类型</span>
						</div>
						<ul>
							<li class="taskTypePageRow" v-for="(item,index) in taskTypePageList" :key="index">
								<div>
									<div>
										<i :class="item.icon" style="margin-left: -6px;"></i>
										<span>{{item.name}}</span>
									</div>
									<div>
										<i @click="getXY(index,$event)" class="iconfont icon-msnui-more" style="cursor: pointer;"></i>
										<editbox v-show="item.edixBol" @close="item.edixBol=false" :size="size" title="类型菜单" @outIndex="inIndex" :lists="typeList"></editbox>
									</div>
								</div>
								<div>
									<span v-for="(field,index) in item.fields" :key="index">
											<div v-if="field!=null">
												<i :class="field.icon"></i>
												<span>{{field.name}}</span>
								</div>
								</span>
					</div>
					</li>
					</ul>
				</div>
				<div class="box" v-if="editProFlag == 4">
					<!--自动化规则-->
				</div>
				<div class="box" v-if="editProFlag == 5">
					<!--更多-->
					<h1>项目操作</h1>
					<p>您可以执行以下操作</p>
					<el-row :gutter="20">
						<el-col :span="7">
							<el-button @click="proFile(1)" type="primary" style="width:100%">归档</el-button>
						</el-col>
						<el-col :span="7">
							<el-button @click="exitPro" type="danger" style="width:100%">退出</el-button>
						</el-col>
						<el-col :span="7">
							<el-button @click="delPro" type="danger" style="width:100%"  v-if="delProjectcyFlage">删除</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		</div>
	</el-dialog>
	<!--保存任务类型名称-->
	<el-dialog :append-to-body="true" title="编辑名称" :visible.sync="saveMTBol" width="400px" center>
		<span class="saveMTBox">
				<el-row>
					<el-col :span="24">
						<el-input :maxlength="20" v-model="taskTypeName" placeholder="设置任务类型"></el-input>
						<p>一个配置对应一个任务类型；如有多个类型，创建任务时，可选择任务类型；任务类型不可重名。</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<h2>设置类型图标</h2>
						<div class="radioIcons">
							<div :class="{radioIconac:index==iconIndex}" @click="iconIndex=index" class="radioIcon" v-for="(icon,index) in icons" :key="index">
								<i :class="icon"></i>
							</div>
						</div>
					</el-col>
				</el-row>
			</span>
		<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="savetaskTypeField">确 定</el-button>
			</span>
	</el-dialog>
	<!--项目模板-->
	<el-dialog :append-to-body="true" :visible.sync="proTemplate" width="900px" center>
		<div class="MTbox" style="margin-top: 10px;position: relative;overflow: initial;border-top: 0;">
			<div class="tabs">
				<div @click="proTemplateTabIndex=0">
					<span :class="{bottomBorder:proTemplateTabIndex==0}">标准模板</span>
				</div>
				<div @click="proTemplateTabIndex=1">
					<span :class="{bottomBorder:proTemplateTabIndex==1}">企业模板</span>
				</div>
				<div @click="proTemplateTabIndex=2">
					<span :class="{bottomBorder:proTemplateTabIndex==2}">我的模板</span>
				</div>
			</div>
			<div class="body" style="height: 62vh;overflow: auto;">
				<div v-show="proTemplateTabIndex==0">
					<!--空白模板-->
					<el-row class="row" v-for='(items,index) in getAllProModel'>
						<el-col :span="24">
							<p style="margin-bottom: 10px;">
								<i class="iconfont icon-xiangmuguanli"></i>
								<span>{{items.name}}</span>
							</p>
						</el-col>
						<el-col v-if='index==0' :span="8">
							<div class="mtBox" style="text-align: center;">
								<div class="card" @click="proTemplate=false;addProjectBol=true;templetId=0" style="width: 260px;height: 140px;border-radius: 6px;">
									<i class="iconfont icon-tianjia"></i>
									<span>空白模板</span>
								</div>
							</div>
						</el-col>
						<el-col :span="8" v-for="(item,index) in items.proModelList">
							<div class="mtBox" style="text-align: center;">
								<div class="card" @click="addTempletLayer(item.id)" style="width: 260px;height: 140px;border-radius: 6px;">
									<!--<i class="iconfont icon-tianjia"></i>-->
									<span>{{item.name}}</span>
									<img v-if="item.modelUrl != ''" class="templetimg" :src="item.modelUrl" style="width: 260px;height: 140px;border-radius: 6px;"/>
									<img v-if="item.modelUrl == ''" class="templetimg" src="../../assets/images/back.png" style="width: 260px;height: 140px;border-radius: 6px;" />
								</div>

							</div>
						</el-col>
					</el-row>

				</div>
				<div v-show="proTemplateTabIndex==1">
					未开发
				</div>
				<div v-show="proTemplateTabIndex==2">
					未开发
				</div>
			</div>
		</div>
	</el-dialog>
	</div>
		<div class="projectBox" v-else>
		你目前不是任何企业的成员，无数据展示！
	</div>
	</div>
</template>

<script>
	import API from 'api/http'
	import upLoad from 'components/upload'
	//添加任务类型组件
	import vaddfield from 'view/home/addField'
	//编辑配置
	import edittasktype from 'view/home/editTaskType'
	import { mapGetters, mapMutations } from 'vuex'
	import editbox from 'components/editBox'
	import Bus from 'assets/js/Bus.js'
	export default {
		components: {
			upLoad,
			vaddfield,
			edittasktype,
			editbox
		},
		computed: {
			...mapGetters({
				getEnterpriseId: 'GET_ENTERPRISEID'
			})
		},
		data() {
			return {
				publlQYidFlage:1,
				//权限部分控制JSON.parse(editXmfzFlage).enterprisePermissionList[5].status
				//编辑项目分组权限
				editXmfzFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[5].status,
				//创建企业项目权限
				newQyxmFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[4].status,
				//查看所有项目权限
				clockSyqx:JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[6].status,
				//移除项目权限
				delProjectcyFlage:null,


				//是否参与企业 控制是否能创建项目
				isCurrentEnterprise:JSON.parse(sessionStorage.getItem('isCurrentEnterprise')),



				tabsName: '',
				//项目模板模态框
				proTemplate: false,
				//项目模板模态框tab标识
				proTemplateTabIndex: 0,
				rows: 2,
				//分类的名称
				typeOneMes: {},
				typeTwoMes: {},
				typeThreeMes: {},

				//分类的选项框
				typeOneList: [],
				typeTwoList: [],
				typeThreeList: [],

				//编辑的分类列表
				editTypeOneList: [],
				editTypeTwoList: [],
				editTypeThreeList: [],

				//超出一行隐藏
				typeOneBol: true,
				typeTwoBol: true,
				typeThreeBol: true,

				//是否显示展开收起
				typeoneShow: true,
				typeTwoShow: true,
				typeThreeShow: true,

				//是否显示归档的 项目
				fileProject: false,
				//项目列表
				projectList: [],
				//归档的项目列表
				fileProjectList: [],

				//创建新项目的模态框
				addProjectBol: false,
				//创建新项目的字段信息
				newProMeg: {
					name: '',
					describe: '',
					target: '',
					synchronization: '0',
					oneId: '',
					twoId: '',
					threeId: ''
				},
				//在类型下创建模板
				addProjectTemplet: false,
				getAllProModel: '', //各个模板
				taskList: '', //任务流
				templetId: '', //项目的id
				//创建新项目的模态框分类的选项框
				typeOneListMT: [],
				typeTwoListMT: [],
				typeThreeListMT: [],

				//编辑分类的模态框
				editTypeBol: false,
				//编辑分类的模态框的信息
				editTypemsg: {
					name: '',
					describe: ''
				},
				smallEditTypemsg: {
					name: '',
					describe: ''
				},
				////编辑分类的模态框的列表
				editTypeList: [],
				//编辑分类的模态框的标识
				editFlag: 1,
				//旧的index
				editOldIndex: 0,

				//编辑项目的模态框
				editProBol: false,
				//编辑项目的id
				editProId: 0,
				//编辑项目的模态框左边栏的列表
				editProLeftList: [{
						icon: 'iconfont icon-xiangmuguanli',
						name: '项目信息',
						flag: 1
					},
					//				{
					//					icon:'iconfont icon-review',
					//					name:'项目偏好',
					//					flag:2
					//				},
					{
						icon: 'iconfont icon-renwuyiwancheng',
						name: '任务类型配置',
						flag: 3
					},
					//				{
					//					icon:'iconfont icon-953caidan_liucheng',
					//					name:'自动化规则',
					//					flag:4
					//				},
					{
						icon: 'iconfont icon-msnui-more',
						name: '更多',
						flag: 5
					}
				],
				//编辑项目的模态框右边显示的内容
				editProFlag: 1,
				//项目信息
				proMes: {
					id: '',
					name: '',
					image: '',
					targets: '',
					bewrite: '',
					projectType: '',
					oneId: '',
					twoId: '',
					threeid: '',
					enterprise: {
						name: '',
						imgUrl: '',
						introduction: ''
					}
				},
				//项目公开性
				proOpenness: [{
					content: '公开项目（所有人都可以访问，仅项目成员可以编辑）',
					flag: '1'
				}, {
					content: '私有项目（仅项目成员可以访问和编辑）',
					flag: '2'
				}],

				//项目设置 任务类型配置
				taskTypePageList: [],
				//类型菜单
				typeList: ['编辑名称', '编辑配置', '删除类型'],
				//编辑名称的模态框
				saveMTBol: false,
				//编辑名称
				taskTypeName: '',
				//图标类型列表
				icons: ['iconfont icon-deng bulb', 'iconfont icon-duoxuankuang money', 'iconfont icon-ren people', 'iconfont icon-shui water', 'iconfont icon-dian electricity', 'iconfont icon-xingxing star', 'iconfont icon-xuanzhong right'],
				//图标类型列表index
				iconIndex: 0,
				//任务类型配置任务类型的index
				taskTypeIndex: 0,
				//控制显示添加任务类型组件
				addfieldBol: false,
				//控制显示编辑任务类型组件
				edittasktypeBol: false,
				//编辑需要的任务类型的Id
				taskTypeId: 0,
				//任务类型配置要传进的位置
				size: '',
				//控制连续创建的锁
				createdProjectBol: true,
				//项目的index
				projectIndex: 0
			}
		},
		filters: {
			//展开收起
			fold(bol) {
				if(bol) {
					return '收起'
				} else {
					return '展开'
				}
			},
			proFile(bol) {
				if(bol) {
					return '收起'
				} else {
					return '显示'
				}
			},
			longStrCut(str) {
				if(str.length > 50) {
					return str.substr(0, 50) + '...'
				} else {
					return str
				}
			}
		},
		methods: {
			//获取xy的值
			getXY(index, el) {
				this.taskTypePageList[index].edixBol = !this.taskTypePageList[index].edixBol;
				this.taskTypeIndex = index
				this.size = ''
				this.size = 'width:213px;left:' + el.clientX + 'px;top:' + (el.clientY + 10) + 'px'
			},
			//关闭添加任务类型组件
			closeAddField() {
				this.addfieldBol = false
				this.edittasktypeBol = false
			},
			//保存编辑的任务字段信息
			savetaskTypeField() {
				if(this.taskTypeName != '' && this.editProId != '') {
					API.post('/taskType/isHave', {
						name: this.taskTypeName,
						projectId: this.editProId,
            			typeId: this.taskTypePageList[this.taskTypeIndex].id
					}).then(res => {
						if(res.data.data) {
							API.post('/taskType/updateName', {
								id: this.taskTypePageList[this.taskTypeIndex].id,
								name: this.taskTypeName,
								icon: this.icons[this.iconIndex]
							}).then(res => {
								this.$notify({
									title: '成功',
									message: '修改成功',
									type: 'success'
								});
								this.saveMTBol = false
								this.taskTypePageList[this.taskTypeIndex].edixBol = false
								this.getTaskTypeList()
							})
						} else {
							this.$notify.error({
								title: '失败',
								message: '本次添加类型重复'
							});
						}
					})
				} else if(this.taskTypeName.trim() == '') {

					this.$notify({
						title: '警告',
						message: '这是一条警告的提示消息',
						type: 'warning'
					});
				}
			},
			//接收项目设置类型菜单
			inIndex(index) {
				if(index == 0) {
                    API.post('/taskType/getIsDel', {
                        id: this.taskTypePageList[this.taskTypeIndex].id
                    }).then(res => {
                        if(res.data.data){
                            //编辑名称
                            this.saveMTBol = !this.saveMTBol
                            this.taskTypeName = this.taskTypePageList[this.taskTypeIndex].name
                            this.iconIndex = this.icons.findIndex(el =>{
                                return el == this.taskTypePageList[this.taskTypeIndex].icon
                            })
                        }else{
                            this.$message({
                                type: 'info',
                                message: '该任务类型正在使用，不允许编辑名称'
                            });
                        }
                    })
				} else if(index == 1) {
                    API.post('/taskType/getIsDel', {
                        id: this.taskTypePageList[this.taskTypeIndex].id
                    }).then(res => {
                        if(res.data.data){
                            //编辑配置
                            this.taskTypeId = this.taskTypePageList[this.taskTypeIndex].id
                            this.edittasktypeBol = true
                            this.editProBol = false
                        }else{
                            this.$message({
                                type: 'info',
                                message: '该任务类型正在使用，不允许编辑配置'
                            });
                        }
                    })
				} else if(index == 2) {
					//删除类型
					this.$confirm('此操作将永久删除该任务类型, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
                API.post('/taskType/getIsDel', {
                  id: this.taskTypePageList[this.taskTypeIndex].id
                }).then(res => {
                  if(res.data.data){
                    API.post('/taskType/delName', {
                    	id: this.taskTypePageList[this.taskTypeIndex].id
                    }).then(res => {
                    	this.$message({
                    		type: 'success',
                    		message: '删除成功!'
                    	});
                    	this.getTaskTypeList()
                    })
                  }else{
                    this.$message({
                      type: 'info',
                      message: '该任务类型正在使用，不允许删除'
                    });
                  }
                })
						// API.post('/taskType/delName', {
						// 	id: this.taskTypePageList[this.taskTypeIndex].id
						// }).then(res => {
						// 	this.$message({
						// 		type: 'success',
						// 		message: '删除成功!'
						// 	});
						// 	this.getTaskTypeList()
						// })
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			},
			//获取任务类型配置
			getTaskTypeList() {
				API.post('/taskType/getTaskType', {
					projectId: this.editProId
				}).then(res => {
					this.taskTypePageList = []
					res.data.data.map(el => {
						this.$set(el, 'edixBol', false)
						this.taskTypePageList.push(el)
					})
				})
			},
			//退出项目
			exitPro() {
				this.$confirm('项目是否退出?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '退出成功!'
					});
					
				API.post('/projects/delUser', {
					pid: this.editProId
				}).then(res => {
					this.editProBol = false
					this.getProjectList()
//					this.$notify({
//						title: '成功',
//						message: '退出成功',
//						type: 'success'
//					});
				})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消退出'
					});
				});
				
				
			},
			//项目归档
			proFile(flag, index) {
				if(flag == 1) {
					this.$alert('如果项目已经完成或是暂时中止，你可以先将项目归档。归档的项目可以很容易地再次激活，并且不会有数据丢失', {
						confirmButtonText: '确定',
					}).then(() => {
						API.post('/projects/updFile', {
							id: this.editProId,
							file: flag
						}).then(res => {
							this.editProBol = false
							this.projectList.splice(this.projectIndex, 1)
							this.getFileProList()
							this.$message({
								type: 'success',
								message: '归档成功'
							});
						})
					})
				} else if(flag == 0) {
					this.$confirm('是否激活?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '激活成功!'
					});
					API.post('/projects/updFile', {
						id: this.fileProjectList[index].id,
						file: flag
					}).then(res => {
						this.editProBol = false
						this.getProjectList()
						this.getThreeType()
//						this.$message({
//							type: 'success',
//							message: '激活成功'
//						});
						this.getFileProList()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消激活'
					});
				});
					
					
					
				}

			},
			//删除项目
			delPro() {
				this.$confirm('此操作将永久删除该项目, 是否继续?', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					sessionStorage.setItem("projectId", '')
					API.post('/projects/deletePro', {
						id: this.editProId,
						state: 1,
						eid: sessionStorage.getItem("enterpriseId")
					}).then(res => {
						this.editProBol = false
						this.projectList.splice(this.projectIndex, 1)
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//跳转页面
			skipTask(item) {
				this.popPath(0)
				this.addPath({
					name: '首页',
					path: '/home'
				})
				this.addPath({
					name: item.name,
					path: '/taskType',
					id: item.id
				})
				sessionStorage.setItem('projectId', item.id)
				this.setProId(item.id)
				this.$router.push({
					path: '/taskType',
					query: {
						pid: item.id,
						eid: sessionStorage.getItem("enterpriseId")
					}
				})

			},
			//保存项目信息
			saveProMeg() {
				if(this.proMes.name.length < 16 && this.proMes.name !== '') {
                    if(this.proMes.oneId || this.proMes.twoId ||this.proMes.threeid){
                        let ids = ''
                        ids = this.proMes.oneId + ',' + this.proMes.twoId + ',' + this.proMes.threeid
                        API.post('/projects/updatePro', {
                            base64: this.proMes.image[0] == 'h' ? '' : this.proMes.image,
                            eid: sessionStorage.getItem("enterpriseId"),
                            ids: ids,
                            id: this.proMes.id,
                            name: this.proMes.name,
                            targets: this.proMes.targets,
                            bewrite: this.proMes.bewrite,
                            projectType: this.proMes.projectType,
                            image: this.proMes.image
                        }).then(res => {
                            this.screens(0, 4)
                            this.editProBol = false

                            this.getProjectList()
                        })
                    }else{
                        this.$notify({
                            title: '警告',
                            message: '项目分类必须选择一项',
                            type: 'warning'
                        });
                    }
				} else if(this.proMes.name.length > 15) {
					this.$notify({
						title: '警告',
						message: '项目名称不可超过15字',
						type: 'warning'
					})
				} else if(this.proMes.name == '') {
					this.$notify({
						title: '警告',
						message: '项目名称不可为空',
						type: 'warning'
					});
				}
			},
			//项目模板下创建模板
			addTempletLayer(id) {
				this.proTemplate = false
				this.addProjectTemplet = true
				this.templetId = id
				//获取任务流
				let param = {
					modelId: this.templetId
				}
				API.get('projects/getProModel', param).then(res => {
					//任务流
					this.taskList = res.data.data.modelAisle
				})
			},
			//改变项目背景
			changeProBg(imgUrl) {
				this.proMes.image = imgUrl
			},
			//打开编辑项目模态框
			openEditPro(index, flag) {
				this.projectIndex = index
				this.editProFlag = 1
				this.editProBol = !this.editProBol;
				if(flag == 1) {
					sessionStorage.setItem('projectId', this.projectList[index].id)
					this.editProId = this.projectList[index].id
					this.getProMes()
				} else if(flag == 2) {
					this.getProMes()
					this.editProId = this.projectList[index].id
				}
				//项目权限设置
				API.get('/projectPermission/queryProjectPermission', {
					projectId: this.editProId
				}).then(res => {
	//				console.log('=================================',res.data.data)
					sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
					Bus.$emit('toQueryProjectPermission', res.data.data)
				})
			},
			//获取项目信息
			getProMes() {
				API.get('/projects/showOnePro', {
					id: this.editProId,
					eid: sessionStorage.getItem("enterpriseId")
				}).then(res => {
					this.proMes.id = res.data.data.project.id,
						this.proMes.name = res.data.data.project.name,
						this.proMes.image = res.data.data.project.image,
						this.proMes.targets = res.data.data.project.targets,
						this.proMes.bewrite = res.data.data.project.bewrite,
						this.proMes.projectType = res.data.data.project.projectType,
						this.proMes.oneId = res.data.data.lableList[0].enterpriseDictionariesList.length == 0 ? '' : res.data.data.lableList[0].enterpriseDictionariesList[0].dicId.toString(),
						this.proMes.twoId = res.data.data.lableList[1].enterpriseDictionariesList.length == 0 ? '' : res.data.data.lableList[1].enterpriseDictionariesList[0].dicId.toString(),
						this.proMes.threeid = res.data.data.lableList[2].enterpriseDictionariesList.length == 0 ? '' : res.data.data.lableList[2].enterpriseDictionariesList[0].dicId.toString()
					this.proMes.enterprise.name = res.data.data.enterprise.name
					this.proMes.enterprise.imgUrl = res.data.data.enterprise.pictureURL
					this.proMes.enterprise.introduction = res.data.data.enterprise.introduction
				})
			},
			//项目设置里的选项卡跳转
			navSkip(flag) {
				this.editProFlag = flag
				if(flag == 1) {
					this.getProMes()
				} else if(flag == 3) {
					this.getTaskTypeList()
				}
			},
			//修改分类信息
			editType(index) {
				let pid = 0;
				if(this.editFlag == 1) {
					pid = this.typeOneMes.id
				} else if(this.editFlag == 2) {
					pid = this.typeTwoMes.id
				} else if(this.editFlag == 3) {
					pid = this.typeThreeMes.id
				}
				if(this.smallEditTypemsg.name != '') {
					API.post('/enterpriseDictionaries/ishave', {
						eid: sessionStorage.getItem('enterpriseId'),
						name: this.smallEditTypemsg.name,
						parentId: pid
					}).then(res => {
						if(res.data.data) {
							API.post('/enterpriseDictionaries/editDic', {
						eid: sessionStorage.getItem("enterpriseId"),
						pid: pid,
						name: this.smallEditTypemsg.name,
						description: this.smallEditTypemsg.description,
						dicId: this.editTypeList[index].dicId,
						id: this.editTypeList[index].id,
						sort: this.editTypeList[index].sort
					}).then(res => {
						this.typeOneBol = true
						this.typeTwoBol = true
						this.typeThreeBol = true
						this.getThreeType()
						this.$notify({
							title: '成功',
							message: '修改成功',
							type: 'success'
						});
					})
						} else {
							this.$notify({
								title: '警告',
								message: '您输入的与其他分类重名，请修改',
								type: 'warning'
							});
						}
					})
					
					
					
					
				} else {
					this.$notify({
						title: '警告',
						message: '您修改的分类名称不能为空',
						type: 'warning'
					});
				}

			},
			//删除分类
			delType(item) {
				API.post('/enterpriseDictionaries/delDic', {
					id: item.id,
					dicId: item.dicId
				}).then(res => {
					this.getThreeType()
				})
			},
			//添加分类
			addType() {
				let pid = 0;
				if(this.editFlag == 1) {
					pid = this.typeOneMes.id
				} else if(this.editFlag == 2) {
					pid = this.typeTwoMes.id
				} else if(this.editFlag == 3) {
					pid = this.typeThreeMes.id
				}
				if(this.editTypemsg.name.trim() != '') {
					API.post('/enterpriseDictionaries/ishave', {
						eid: sessionStorage.getItem('enterpriseId'),
						name: this.editTypemsg.name,
						parentId: pid
					}).then(res => {
						if(res.data.data) {
							API.post('/enterpriseDictionaries/addDic', {
								eid: sessionStorage.getItem("enterpriseId"),
								pid: pid,
								name: this.editTypemsg.name,
								description: this.editTypemsg.describe
							}).then(res => {
								this.typeOneBol = true
								this.typeTwoBol = true
								this.typeThreeBol = true
								this.getThreeType()
								this.editTypemsg.name = ''
								this.editTypemsg.describe = ''
								this.$notify({
									title: '成功',
									message: '添加成功',
									type: 'success'
								});
							})
						} else {
							this.$notify({
								title: '警告',
								message: '您输入的与其他分类重名，请修改',
								type: 'warning'
							});
						}
					})
				} else {
					this.$notify({
						title: '警告',
						message: '分类名称不能为空',
						type: 'warning'
					});
				}

			},
			//打开编辑模态框
			openEditTypeMT(flag) {
				this.editTypemsg.name = ''
				this.editTypemsg.describe = ''
				this.editFlag = flag
				this.editTypeBol = true
				this.editTypeList = []
				if(this.editFlag == 1) {
					this.editTypeOneList.map(el => {
						this.editTypeList.push(el)
					})
				} else if(this.editFlag == 2) {
					this.editTypeTwoList.map(el => {
						this.editTypeList.push(el)
					})
				} else if(this.editFlag == 3) {
					this.editTypeThreeList.map(el => {
						this.editTypeList.push(el)
					})
				}
			},
			//打开分类编辑
			editTypeBox(index) {
				let editOldIndex = this.editTypeList.findIndex(el => {
					return el.editBol == true
				})
				this.editTypeList[editOldIndex == -1 ? 0 : editOldIndex].editBol = false
				this.editTypeList[index].editBol = true
				this.smallEditTypemsg.name = this.editTypeList[index].name
				this.smallEditTypemsg.description = this.editTypeList[index].description
			},
			//打开创建项目模态框
			openAddProMT() {
				this.proTemplate = true
				for(let i = 0; i < this.typeOneList.length; i++) {
					if(this.typeOneList[i].checked == true) {
						this.newProMeg.oneId = this.typeOneList[i].dicId
						break
					}
				}
				for(let i = 0; i < this.typeTwoList.length; i++) {
					if(this.typeTwoList[i].checked == true) {
						this.newProMeg.twoId = this.typeTwoList[i].dicId
						break
					}
				}
				for(let i = 0; i < this.typeThreeList.length; i++) {
					if(this.typeThreeList[i].checked == true) {
						this.newProMeg.threeId = this.typeThreeList[i].dicId
						break
					}
				}
			},
			//创建项目
			createdProject() {
				//				alert(this.templetId)
				if(this.createdProjectBol) {
					this.createdProjectBol = false
					if(this.newProMeg.name == '') {
						this.createdProjectBol = true
						this.$notify({
							title: '警告',
							message: '项目名称是必填项',
							type: 'warning'
						});
					} else if(this.newProMeg.oneId != '' || this.newProMeg.twoId != '' || this.newProMeg.threeId != '') {
						API.post('projects/createPro', {
							eid: sessionStorage.getItem("enterpriseId"),
							projectName: this.newProMeg.name,
							bewrite: this.newProMeg.describe,
							targets: this.newProMeg.target,
							ispho: this.newProMeg.synchronization,
							ids: this.newProMeg.oneId + ',' + this.newProMeg.twoId + ',' + this.newProMeg.threeId,
							modelId: this.templetId
						}).then(res => {
							this.addProjectBol = false
							this.addProjectTemplet = false
							//							this.getProjectList()
							this.screens(0, 4)
							this.newProMeg.name = ''
							this.newProMeg.describe = ''
							this.newProMeg.target = ''
							this.newProMeg.synchronization = '0'
							this.newProMeg.oneId = ''
							this.newProMeg.twoId = ''
							this.newProMeg.threeId = ''
							if(res.data.code == 200) {
								this.$notify({
									title: '成功',
									message: '创建成功',
									type: 'success'
								});
								//获取项目列表
								this.getProjectList()

							} else {
								this.$notify({
									title: '警告',
									message: res.data.message,
									type: 'warning'
								});
							}
							this.createdProjectBol = true
						})
					} else {
						this.createdProjectBol = true
						this.$notify({
							title: '警告',
							message: '分类是必填项',
							type: 'warning'
						});
					}

				}

			},
			//筛选项目
			screens(index, flag, checked) {
				let oneIds = '';
				let twoIds = '';
				let threeIds = '';
				if(flag == 1) {
					this.typeOneList[index].checked = !this.typeOneList[index].checked
					this.typeTwoList = []
					this.typeThreeList = []
				} else if(flag == 2) {
					this.typeTwoList[index].checked = !this.typeTwoList[index].checked
					this.typeThreeList = []
				} else if(flag == 3) {
					this.typeThreeList[index].checked = !this.typeThreeList[index].checked
				}

				this.typeOneList.map(el => {
					if(el.checked) {
						oneIds += el.dicId + ','
					}
				})
				this.typeTwoList.map(el => {
					if(el.checked) {
						twoIds += el.dicId + ','
					}
				})
				this.typeThreeList.map(el => {
					if(el.checked) {
						threeIds += el.dicId + ','
					}
				})
				let send = false
				if(oneIds == '' && twoIds == '' && threeIds == '') {
					send = true
				}

				if(send) {
					this.getThreeType()
				}
				API.post('/projects/queryProjectByLable', {
					oneIds: oneIds.substr(0, oneIds.length - 1),
					twoIds: twoIds.substr(0, twoIds.length - 1),
					threeIds: threeIds.substr(0, threeIds.length - 1),
					eid: sessionStorage.getItem("enterpriseId")
				}).then(res => {
					//筛选项目
					this.projectList = []
					res.data.data.project.map(el => {
						this.$set(el, 'handle', false);
						this.projectList.push(el)
					})

					//二级分类 三级分类 联动
					if(flag == 1) {
						this.typeTwoBol = true
						this.typeThreeBol = true
						this.$nextTick(() => {
							if(this.$refs.box2.offsetHeight > 40) {
								this.typeTwoShow = true
								this.typeTwoBol = false
							} else {
								this.typeTwoShow = false
								this.typeTwoBol = false
							}

							if(this.$refs.box3.offsetHeight > 40) {
								this.typeThreeShow = true
								this.typeThreeBol = false
							} else {
								this.typeThreeShow = false
								this.typeThreeBol = false
							}
						})
						res.data.data.dics.map(el => {
							if(el.zsort == 1 && flag != 1) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeOneList.push(el)
							} else if(el.zsort == 2 && flag != 2) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeTwoList.push(el)
							} else if(el.zsort == 3 && flag != 3) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeThreeList.push(el)
							}
						})

					} else if(flag == 2) {
						this.typeOneBol = true
						this.typeThreeBol = true
						this.$nextTick(() => {
							if(this.$refs.box1.offsetHeight > 40) {
								this.typeoneShow = true
								this.typeOneBol = false
							} else {
								this.typeoneShow = false
								this.typeOneBol = false
							}

							if(this.$refs.box3.offsetHeight > 40) {
								this.typeThreeShow = true
								this.typeThreeBol = false
							} else {
								this.typeThreeShow = false
								this.typeThreeBol = false
							}
						})
						res.data.data.dics.map(el => {
							if(el.zsort == 1 && flag != 1) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeOneList.push(el)
							} else if(el.zsort == 2 && flag != 2) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeTwoList.push(el)
							} else if(el.zsort == 3 && flag != 3) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeThreeList.push(el)
							}
						})
					} else if(flag == 3) {
						this.typeOneBol = true
						this.typeTwoBol = true
						//						this.typeThreeBol = true
						this.$nextTick(() => {
							if(this.$refs.box1.offsetHeight > 40) {
								this.typeoneShow = true
								this.typeOneBol = false
							} else {
								this.typeoneShow = false
								this.typeOneBol = false
							}

							if(this.$refs.box2.offsetHeight > 40) {
								this.typeTwoShow = true
								this.typeTwoBol = false
							} else {
								this.typeTwoShow = false
								this.typeTwoBol = false
							}
						})
						res.data.data.dics.map(el => {
							if(el.zsort == 3 && flag != 3) {
								this.$set(el, 'checked', false);
								this.$set(el, 'editBol', false);
								this.typeThreeList.push(el)
							}
						})
					}

					//标签选中
					//					let tabs = res.data.data.dics
					//					for(let i=0;i<tabs.length;i++) {
					//						if(tabs[i].zsort == 1 && flag != 1){
					//							let index = this.typeOneList.findIndex(el => {
					//								return tabs[i].dicId == el.dicId
					//							})
					//							this.typeOneList[index].checked = true
					//						}else if(tabs[i].zsort == 2 && flag != 2){
					//							let index = this.typeTwoList.findIndex(el => {
					//								return tabs[i].dicId == el.dicId
					//							})
					//							this.typeTwoList[index].checked = true
					//						}else if(tabs[i].zsort == 3 && flag != 3){
					//							let index = this.typeThreeList.findIndex(el => {
					//								return tabs[i].dicId == el.dicId
					//							})
					//							this.typeThreeList[index].checked = true
					//						}
					//					}

				})
			},
			//描述换行
			changBr(str) {
				let newStr = ''
				for(let i = 0; i < str.length; i++) {
					if((i + 1) % 30 == 0) {
						newStr += str[i] + '<br />'
					} else {
						newStr += str[i]
					}
				}
				return newStr
			},
			//获取三级分类
			getThreeType() {
				if(sessionStorage.getItem("enterpriseId")) {
					API.get('/enterpriseDictionaries/getenterpriseDictionaries', {
						eid: sessionStorage.getItem("enterpriseId")
					}).then(res => {
						this.typeOneBol = true
						this.typeTwoBol = true
						this.typeThreeBol = true
						this.typeOneMes = res.data.data[0]
						this.typeTwoMes = res.data.data[1]
						this.typeThreeMes = res.data.data[2]

						//初始化选项
						this.typeOneList = []
						this.typeOneListMT = []
						this.editTypeOneList = []
						res.data.data[0].enterpriseDictionariesList.map(el => {
							this.$set(el, 'checked', false);
							this.$set(el, 'editBol', false);
							//							el.description = this.changBr(el.description);
							this.typeOneList.push(el)
							this.typeOneListMT.push(el)
							this.editTypeOneList.push(el)
						})
						this.typeTwoList = []
						this.typeTwoListMT = []
						this.editTypeTwoList = []
						res.data.data[1].enterpriseDictionariesList.map(el => {
							this.$set(el, 'checked', false);
							this.$set(el, 'editBol', false);
							//							el.description = this.changBr(el.description);
							this.typeTwoList.push(el)
							this.typeTwoListMT.push(el)
							this.editTypeTwoList.push(el)
						})
						this.typeThreeList = []
						this.typeThreeListMT = []
						this.editTypeThreeList = []
						res.data.data[2].enterpriseDictionariesList.map(el => {
							this.$set(el, 'checked', false);
							this.$set(el, 'editBol', false);
							this.typeThreeList.push(el)
							this.typeThreeListMT.push(el)
							this.editTypeThreeList.push(el)
						})
						this.typeOneListMT.unshift({
							dicId: '',
							name: '请选择' + this.typeOneMes.name
						})
						this.typeTwoListMT.unshift({
							dicId: '',
							name: '请选择' + this.typeTwoMes.name
						})
						this.typeThreeListMT.unshift({
							dicId: '',
							name: '请选择' + this.typeThreeMes.name
						})
						this.editTypeList = []
						if(this.editFlag == 1) {
							this.typeOneList.map(el => {
								this.editTypeList.push(el)
							})
						} else if(this.editFlag == 2) {
							this.typeTwoList.map(el => {
								this.editTypeList.push(el)
							})
						} else if(this.editFlag == 3) {
							this.typeThreeList.map(el => {
								this.editTypeList.push(el)
							})
						}
						this.$nextTick(() => {
							if(this.$refs.box1.offsetHeight > 40) {
								this.typeoneShow = true
								this.typeOneBol = false
							} else {
								this.typeoneShow = false
								this.typeOneBol = false
							}

							if(this.$refs.box2.offsetHeight > 40) {
								this.typeTwoShow = true
								this.typeTwoBol = false
							} else {
								this.typeTwoShow = false
								this.typeTwoBol = false
							}

							if(this.$refs.box3.offsetHeight > 40) {
								this.typeThreeShow = true
								this.typeThreeBol = false
							} else {
								this.typeThreeShow = false
								this.typeThreeBol = false
							}
						})
					})
				}

			},
			//获取项目列表
			getProjectList(indexs) {
				API.get('/projects/getProjectList', {
					eid: this.getEnterpriseId,
					state: this.clockSyqx
				}).then(res => {
					this.projectList = []
					res.data.data.map(el => {
						this.$set(el, 'handle', false);
						if(el.file == 0) {
							this.projectList.push(el)
						} else if(el.file == 1) {
							this.fileProjectList.push(el)
						}
					})
//					console.log(this.projectList)
				})
			},
			//打开已归档的项目
			openFileProList() {
				this.fileProject = !this.fileProject
				if(this.fileProject) {
					this.getFileProList()
				}
			},
			//获取归档的项目
			getFileProList() {
				API.get('/projects/getFileProject', {
					eid: sessionStorage.getItem("enterpriseId")
				}).then(res => {
					this.fileProjectList = []
					res.data.data.map(el => {
						this.$set(el, 'handle', false);
						this.fileProjectList.push(el)
					})
				})
			},
			//分类向上排序
			typeSort(index) {
				if(index != 0) {
					API.post('/enterpriseDictionaries/sortDic', {
						yId: this.editTypeList[index].id,
						tId: this.editTypeList[index - 1].id,
						ysort: this.editTypeList[index].sort,
						tsort: this.editTypeList[index - 1].sort
					}).then(res => {
						this.getThreeType()
					})
				}
			},
			...mapMutations({
				addPath: 'ADD_PATH',
				popPath: 'POP_PATH',
				setProId: 'SET_PROJECTID'
			})
		},
		watch: {

			'newProMeg.name' () {
				if(this.newProMeg.name.length == 15) {
					this.$notify({
						title: '警告',
						message: '项目名称不可大于15字',
						type: 'warning'
					})
				}
			},
			'newProMeg.describe' () {
				if(this.newProMeg.describe.length == 400) {
					this.$notify({
						title: '警告',
						message: '项目描述不可大于400字',
						type: 'warning'
					})
				}
			},
			'newProMeg.target' () {
				if(this.newProMeg.target.length == 200) {
					this.$notify({
						title: '警告',
						message: '项目目标不可大于200字',
						type: 'warning'
					})
				}
			},

			getEnterpriseId() {
				this.typeOneBol = true
				this.typeTwoBol = true
				this.typeThreeBol = true
				this.getProjectList()
				this.getThreeType()
			},
			edittasktypeBol() {
				if(!this.edittasktypeBol) {
					this.editProBol = true
					this.editProFlag = 3
					this.getTaskTypeList()
				}
			},
			addfieldBol() {
				if(!this.addfieldBol) {
					this.editProBol = true
					this.editProFlag = 3
					this.getTaskTypeList()
				}
			},
			'proMes.name' (newVal, oldVal) {
				if(newVal.length == 15) {
					this.$notify({
						title: '警告',
						message: '项目的名称不可超过15字',
						type: 'warning'
					})
				}
			}
		},
		//初始化
		created() {

			//获取全部模板列表
			API.get('/projects/getAllProModel').then(res => {
				this.getAllProModel = res.data.data
			})
			if(!isNaN(this.getEnterpriseId)) {
				this.getThreeType()
				this.getProjectList()
			}

			this.popPath(0)
			//接收组件通信信息
			Bus.$on('toCurrentRolePermissions', (msg) => {
				this.editXmfzFlage = msg.enterprisePermissionList[5].status
				this.newQyxmFlage = msg.enterprisePermissionList[4].status
				this.clockSyqx = msg.enterprisePermissionList[6].status
			});
			Bus.$on('topubllQYid', (msg) => {
				this.publlQYidFlage = msg
			});


			//接收组件通信信息
			Bus.$on('toQueryProjectPermission', (msg) => {
//				console.log(msg)
				this.delProjectcyFlage = msg.projectPermissionList[21].status
			});
			//判断当前用户是否参与当前企业
			Bus.$on('toisCurrentEnterprise', (msg) => {
				console.log(msg)
				this.isCurrentEnterprise = msg
			});
		}
	}
</script>

<style scoped>
	.projectBox {
		/*width: 100%;*/
		padding: 115px 50px 0 50px;
		height: 86vh;
		overflow: auto;
	}

	.projectBox::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: #f5f5f5;
	}

	.projectBox h1 {
		font-size: 16px;
	}

	.projectBox h1 span {
		color: #999999;
		font-size: 14px;
		margin-left: 20px;
		cursor: pointer;
	}

	.typeBox,
	.typeBoxShow {
		margin-bottom: 12px;
		border-bottom: 2px dashed #e9e9e9;
	}

	.typeBox ul {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		height: 36px;
		overflow: hidden;
	}

	.typeBox ul>li {
		color: #666666;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 26px;
		font-size: 14px;
		background: #f0f0f0;
		padding: 0px 10px;
		border-radius: 4px;
		margin-left: 10px;
		margin-bottom: 10px;
		padding-left: 6px;
		cursor: auto;
	}

	.typeBox ul .editor {
		width: 44px;
	}

	.typeBox ul .editor:hover {
		padding-left: 6px;
		background: #077ce7;
		color: #fff;
	}

	.typeBoxShow ul {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.typeBoxShow ul>li {
		color: #666666;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 26px;
		font-size: 14px;
		background: #f0f0f0;
		padding: 0px 10px;
		border-radius: 4px;
		margin-left: 10px;
		margin-bottom: 10px;
		cursor: auto;
	}

	.typeChecked {
		background: #077ce7 !important;
		color: white !important;
	}

	.hand {
		cursor: pointer;
		font-size: 14px;
		color: #999999;
		margin-top: 4px;
	}

	.projectBody {
		margin-top: 30px;
		display: flex;
		flex-wrap: wrap;
	}

	.projectBody .card {
		width: 220px;
		height: 100px;
		border-radius: 4px;
		padding: 20px;
		position: relative;
		margin-right: 20px;
		margin-bottom: 20px;
		cursor: pointer;
	}

	.projectBody .card .cardTitle {
		display: flex;
		justify-content: space-between;
		color: white;
		height: 24px;
	}

	.projectBody .card .bg {
		width: 260px;
		height: 140px;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 4px;
		z-index: -1;
		background: black;
		opacity: 0.2;
	}

	.projectBody .card .bgimg {
		width: 260px;
		height: 140px;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 4px;
		z-index: -2;
	}

	.projectBody .addPro {
		width: 260px;
		height: 140px;
		background: #f7f7f7;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #cccccc;
	}

	.projectBody .addPro i {
		font-size: 30px;
	}

	.projectBody .addPro:hover {
		color: #3da8f5;
	}

	.MTbox {
		border-top: 2px solid #efefef;
		width: 100%;
		height: 60vh;
		overflow: auto;
	}

	.MTbox .body .row {
		margin-top: 20px;
		color: #999999;
	}

	.MTbox .body .row .mtBox {
		width: 100%;
		position: relative;
	}

	.MTbox .body .row .mtBox .card {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 196px;
		height: 140px;
		background: #f7f7f7;
		border-radius: 6px;
		color: #cccccc;
		font-size: 14px;
		cursor: pointer;
		margin-right: 10px;
		margin-bottom: 10px;
	}

	.templetimg {
		width: 196px;
		height: 140px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.MTbox .body .row .mtBox .card:hover {
		color: #077ce7;
	}

	.MTbox .body .row .mtBox .card span {
		margin-left: 5px;
		margin-top: -4px;
		z-index: 1;
	}

	.MTbox .body .title span {
		font-size: 14px;
	}

	.MTbox .tabs {
		display: flex;
		justify-content: space-around;
		height: 75px;
		width: 98%;
		align-items: center;
		font-size: 16px;
		color: #333333;
		position: absolute;
		top: -75px;
		z-index: 10;
	}

	.MTbox .tabs span {
		cursor: pointer;
		padding: 24px 14px;
		border-bottom: 2px solid rgba(0, 0, 0, 0);
	}

	.MTbox .tabs .bottomBorder {
		border-bottom: 2px solid #077ce7;
	}

	.MTbox>.editBox {
		display: flex;
		width: 100%;
		height: 100%;
	}

	.MTbox>.editBox .leftNav {
		width: 175px;
		height: 20px;
	}

	.MTbox>.editBox .leftNav .nav {
		height: 59px;
		border-bottom: 2px solid #efefef;
		border-right: 1px solid #efefef;
		display: flex;
		align-items: center;
		color: #666666;
		font-size: 12px;
		border-left: 4px solid rgba(0, 0, 0, 0);
		cursor: pointer;
	}

	.MTbox>.editBox .leftNav .nav:hover {
		color: #077ce7;
		border-left: 4px solid #077ce7;
	}

	.MTbox>.editBox .leftNav .check {
		color: #077ce7;
		border-left: 4px solid #077ce7;
	}

	.MTbox>.editBox .leftNav .nav i {
		margin-left: 20px;
		margin-right: 10px;
		font-size: 12px;
	}

	.MTbox>.editBox .rightMain {
		width: 100%;
		height: 100%;
		padding: 14px;
		overflow: auto;
	}

	.MTbox>.editBox .rightMain .box {
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	.MTbox>.editBox .rightMain .box h1 {
		font-size: 16px;
	}

	.MTbox>.editBox .rightMain .box .taskTypePageRow {
		padding-right: 20px;
	}

	.MTbox>.editBox .rightMain .box .taskTypePageRow>div:nth-child(1) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}

	.MTbox>.editBox .rightMain .box .taskTypePageRow>div:nth-child(2) {
		display: flex;
		padding: 10px 0;
		border-bottom: 1px solid #efefef;
		flex-wrap: wrap;
	}

	.MTbox>.editBox .rightMain .box .taskTypePageRow>div:nth-child(2) div {
		margin-right: 30px;
	}

	.MTbox>.editBox .rightMain .box::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: #f5f5f5;
	}

	.MTbox>.editBox .rightMain .box .enterpriseBox {
		display: flex;
		align-items: center;
	}

	.MTbox>.editBox .rightMain .box .enterpriseBox>div:nth-child(1) {
		width: 30px;
		height: 30px;
		border-radius: 30px;
		margin-right: 7px;
		/*background: red;*/
	}

	.MTbox>.editBox .rightMain .box .enterpriseBox>div:nth-child(1) img {
		width: 100%;
		height: 100%;
		border-radius: 30px;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.MTbox::-webkit-scrollbar {
		width: 0px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.MTbox::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/

	.MTbox::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 15px;
	}

	.finishBtn {
		width: 100%;
		height: 36px;
		background: #077ce7;
		color: white;
		outline: none;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.editRow {
		margin-top: 30px;
	}

	.editRow h3 {
		border-bottom: 2px solid #efefef;
		font-size: 14px;
		padding-bottom: 7px;
		color: #999999;
	}

	.editRow h3 span {
		border-bottom: 2px solid #007be5;
		padding-bottom: 10px;
	}

	.editRow .typeList {
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 40px;
		color: #999999;
	}

	.editRow .typeList>div:nth-child(1) i {
		margin-right: 1px;
	}

	.editRow .typeList>div:nth-child(2) i {
		margin-left: 14px;
	}

	.editRow .typeList>div:nth-child(2) i:hover {
		margin-left: 14px;
		color: #017ae6;
	}

	.editRow .typeList>div:nth-child(2) .editType {
		position: absolute;
		width: 260px;
		background: white;
		z-index: 10;
		left: 0px;
		padding: 0 20px;
		border-radius: 6px;
		box-shadow: 0px 0px 10px #999999;
	}

	.editRow .typeList>div:nth-child(2) .editType:hover {
		color: #999999;
	}

	.redBtn {
		width: 100%;
		background: #ef5521;
		height: 28px;
		color: white;
		border-radius: 4px;
		border: none;
		outline: none;
	}

	.proMesRow h3 {
		color: 333333;
		font-size: 14px;
		margin: 14px 0 10px 0;
	}

	.proMesRow .fengmian {
		width: 260px;
		height: 140px;
		border-radius: 4px;
		border: 1px solid #efefef;
	}

	.proMesRow .fengmian img {
		width: 100%;
		height: 100%;
	}

	.saveMTBox h2 {
		margin-top: 30px;
		font-size: 14px;
	}

	.saveMTBox p {
		margin-top: 14px;
		line-height: 16px;
		font-size: 12px;
	}

	.saveMTBox .radioIcons {
		display: flex;
	}

	.saveMTBox .radioIcons .radioIcon {
		width: 20px;
		height: 20px;
		margin-right: 15px;
		border-radius: 4px;
		border: 1px solid #EFEFEF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
	}

	.saveMTBox .radioIcons .radioIcon i {
		margin-top: 2px;
	}

	.saveMTBox .radioIcons .radioIconac {
		border: 1px solid #0a7ee9 !important;
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

	.right {
		color: #f94f4f;
	}

	.addTaskType {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #0a7ee9;
		cursor: pointer;
	}

	.addTaskType i {
		margin-right: 10px;
	}

	.projectName {
		color: #666;
		font-size: 14px;
	}

	.icon-shanchu1,
	.icon-paixusheng,
	.icon-bianji {
		cursor: pointer;
	}

	.iconColor1 {
		color: #9bd0fa;
	}

	.iconColor2 {
		color: #faf3a6;
	}

	.iconColor3 {
		color: #6ff7b2;
	}

	.iconColor4 {
		color: #fdc055;
	}

	.breadth {
		width: 75vw;
	}
	/*添加左侧样式*/

	.iconStyle {
		display: inline-block;
		width: 50px;
		height: 30px;
		line-height: 30px;
		border: 1px solid #ccc;
		padding: 0 8px;
		padding-right: 10px;
		margin-right: 14px;
		margin-top: 5px;
	}

	.introduce {
		width: 370px;
		height: 60vh;
		padding-left: 29px;
		background: #fff;
		border-right: 1px solid #efefef;
	}

	.flow {
		padding-right: 60px;
		line-height: 30px;
		color: #000;
	}

	.line {
		width: 95%;
		margin: 0 auto;
		border: 1px solid #efefef;
		margin-bottom: 10px;
	}

	.projectTarget{
		margin-top:10px;
	}
</style>
<style>
	.mystyle .el-dialog--center .el-dialog__body {
		padding: 25px 25px 30px;
		padding-left: 0;
		padding-right: 0;
	}
</style>
