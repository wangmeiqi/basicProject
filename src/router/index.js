import Vue from 'vue'
import Router from 'vue-router'
//import index from 'components/project'
import index from 'view/home/project'

import taskType from 'view/taskType/taskType'
import task from 'view/taskType/taskView/task'
import timeView from 'view/taskType/taskView/timeView'
import share from 'view/taskType/taskView/share'
import uploadFile from 'view/taskType/taskView/uploadFile'
import schedule2 from 'view/taskType/taskView/schedule'
import chat from 'view/taskType/taskView/chat'

import member from 'view/member/member'
import login from 'view/login/login'
import home from 'view/index/index'

import memberMessage from 'view/memberMessage/memberMessage'
import details from 'view/memberMessage/details'
import news from 'view/memberMessage/news'
import taskArrangement from 'view/memberMessage/taskArrangement'
import schedule from 'view/memberMessage/schedule'
import project from 'view/memberMessage/project'

import management from 'view/management/management'
import appManagement from 'view/management/appManagement' //引入应用管理页面

import appShop from 'view/management/appShop' //引入应用商店页面
import appProject from 'view/management/appProject' //引入项目权限
import operationDay from 'view/management/operationDay' //引入操作日志
import diy from 'view/management/diy' //引入自定义手段
import parmissions from 'view/management/parmissions' //引入企业信息
import enterprise from 'view/management/enterprise' //企业权限
import templets from 'view/management/templet/templets' //模板

import bulletin from 'view/home/bulletin'			//简报


import myInformation from 'view/myInformation/myInformation' //引入个人信息页面
import password from 'view/myInformation/password' //引入密码
import mail from 'view/myInformation/mail' //引入邮箱
import security from 'view/myInformation/security' // 引入安全
import my from 'view/myInformation/my' //引入个人信息

import managementBackground from 'view/managementBackground/managementBack.vue'
import mbList from 'view/managementBackground/memberList' //后台用户列表
import userOper from 'view/managementBackground/userOperation' //后台用户编辑

import report from 'view/report/report' //报告页面

import register from 'view/register/register' //注册页面

import statistical from 'view/statistical/index' //统计页面

import phone from 'view/register/phone'//手机注册页面
import youxiang from 'view/register/youxiang'//邮箱注册页面

// import op from 'components/chat/chatNew'

Vue.use(Router)

export default new Router({
	routes: [
        {
			path: '/',
			name:'login',
			component: login,
			
		},
	   
		{
			name:"register",
			path:'/register',
			component:register,
		},
		{ 
			name:"phone",
			path:'/phone',
			component:phone,
		},
		{
			name:"youxiang",
			path:'/youxiang',
			component:youxiang,
		},
		{
			path: '/mb',
			component: managementBackground,
			children: [{
				path: '/',
				component: mbList
			}, {
				path: '/mbList',
				component: mbList
			}, {
				path: '/useroper',
				component: userOper
			}]
		},
		{
			path: '/login',
			component: login
		},
		{
			path: '/memberMessage',
			component: memberMessage,
			children: [{
				path: '/',
				component: details
			}, {
				path: '/memberMessage/details',
				component: details
			}, {
				path: '/memberMessage/news',
				component: news
			}, {
				path: '/memberMessage/taskArrangement',
				component: taskArrangement
			}, {
				path: '/memberMessage/schedule',
				component: schedule
			}, {
				path: '/memberMessage/project',
				component: project
			}]
		},
		{
			path: '/home',
			component: home,
			children: [{
					path: '/',
					component: index
				},
				{
					path: '/bulletin',
					component: bulletin
				},
				{
					path: '/statistical',
					component: statistical
				},
				{
					path: '/index',
					component: index
				},
				{
					path: '/member',
					component: member
				},
				{
					path: '/report',
					component: report
				},
				{
					path: '/taskType',
					component: taskType,
					children:[{
						path: '/',
						component:task
					},{
						path: '/task',
						component:task
					},{
						path: '/timeview',
						component:timeView
					},{
						path: '/share',
						component: share
					},{
						path: '/file',
						component: uploadFile
					},{
						path: '/schedule', 
						component: schedule2
					},{
						path:'/chat',
						component: chat
					}]
				},
				{
					path: '/login',
					component: login
				},

			]
		},
		{
			path: '/management',
			component: management,
			children: [{
					path: '/',
					component: operationDay
				},
				{
					path: '/appManagement',
					component: appManagement,
				},
				{
					path: '/appShop',
					component: appShop
				},
				{
					path: '/appProject',
					component: appProject,
				},
				{
					path: '/operationDay',
					component: operationDay
				},
				{
					path: '/diy',
					component: diy
				},
				{
					path: '/parmissions',
					component: parmissions
				},
				{
					path: '/enterprise',
					component: enterprise
				},
				{
					path: '/templets',
					component: templets
				}
			]
		},
		{
			path: '/myInformation',
			component: myInformation,
			children: [{
					path: '/',
					component: my,
				},
				{
					path: '/my',
					component: my,
				},
				{
					path: '/password',
					component: password,
				},
				{
					path: '/security',
					component: security,
				},
				{
					path: '/mail',
					component: mail,
				}
			]
		}
	]
})
