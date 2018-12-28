<template>
	<div>
		<div class="backGroundbox">
			<vheader @showSeach="showSeach" @setSearhLimit="setSearhLimit"></vheader>
			<vlocation></vlocation>
			<div class="fatherBox">
				<div class="leftBox font16">
					<!--<ul class="mgT30 application">
						<p class="col3">应用</p>
						<li class="items" @click="management(0)">
							<img src="../../assets/images/xiangmublue.png" alt="" v-show="xiangmu">
							<img src="../../assets/images/yingyongguanli.png" v-show="!xiangmu" alt="">
							<p class="mgL8">应用管理</p>
						</li>
						<li class="items" @click="management(1)">
							<img src="../../assets/images/shangdianblue.png" v-show="shangdian" alt="">
							<img src="../../assets/images/yingyongshangdian.png" v-show="!shangdian" alt="">
							<p class="mgL8">应用商店</p>
						</li>
					</ul>-->
					<ul class="mgT40 dataWactch">
						<p class="col3">数据监控</p>
						<li class="items" @click="management(2)">
							<img src="../../assets/images/rizhiblue.png" v-show="rizhi" alt="">
							<img src="../../assets/images/rizhijilu.png" v-show="!rizhi" alt="">
							<p class="mgL8">日志记录</p>
						</li>
					</ul>
					<ul class="mgT40 enterprisesSetup">
						<p class="col3">企业设置</p>
						<li class="items" @click="management(3)" v-if="XGQyjcxxFlage">
							<img src="../../assets/images/qiyeblue.png" v-show="qiye" alt="">
							<img src="../../assets/images/qiyexinxi.png" v-show="!qiye" alt="">
							<p class="mgL8">企业信息</p>
						</li>
						<li class="items" @click="management(4)">
							<img src="../../assets/images/zidingyiblue.png" v-show="zidingyi" alt="">
							<img src="../../assets/images/zidingyi.png" v-show="!zidingyi" alt="">
							<p class="mgL8"> 项目自定义字段</p>
						</li>
					</ul>
					<ul class="mgT40 permissions">
						<p class="col3">权限设置</p>
						<li class="items" @click="management(5)">
							<img src="../../assets/images/qiyequan.png" v-show="qiyequan" alt="">
							<img src="../../assets/images/quanxian.png" v-show="!qiyequan" alt="">
							<p class="mgL8">企业权限</p>
						</li>
						<li class="items" @click="management(6)">
							<img src="../../assets/images/xitongblue.png" v-show="xitong" alt="">
							<img src="../../assets/images/xitongguanli.png" v-show="!xitong" alt="">
							<p class="mgL8">项目权限</p>
						</li>
					</ul>
					<ul class="mgT40 permissions">
						<p class="col3">项目模板</p>
						<li class="items" @click="management(7)">
							<img src="../../assets/images/qiyequan.png" v-show="templets" alt="">
							<img src="../../assets/images/quanxian.png" v-show="!templets" alt="">
							<p class="mgL8">模板管理</p>
						</li>
					</ul>
				</div>
				
				<div>
					<div class="rightBox">
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
        <!-- 全文检索详情 -->
	    <searchTable v-if="searchShow" @showSeach="showSeach" :searhLimit="searhLimit"></searchTable>
	</div>
</template>

<script>
	import vheader from '../../components/header'
	import vlocation from 'components/location'
	import {mapMutations} from 'vuex'
    import api from 'api/http'
    import searchTable from '../index/searchTable'
    import Bus from 'assets/js/Bus.js'
	export default {
		name: "management",
		data() {
			return {
				//"修改企业基础信息"
				XGQyjcxxFlage: JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[15].status,
				
				xitong: false,
				qiyequan: false,
				qiye: false,
				rizhi: false,
				shangdian: false,
				xiangmu: false,
				acitve: false,
				enterpriseInformation: false,
				appManagement: false,
				appShop: false,
				operationDay: false,
				diy: false,
				enterprise: false,
				appProject: false,
                zidingyi: false,
                searchShow: false,
                templets:false,
                searhLimit: {
                    keyWords:'',
                    typeId: '',
                    porjectId: '',
                    userId: ''
                },
			}
		},
		components: {
			vheader,
            vlocation,
            searchTable
		},
		methods: {
			management(index) {

				if(index === 0) {
					this.xiangmu = true
					this.shangdian = false
					this.rizhi = false
					this.qiye = false
					this.zidingyi = false
					this.qiyequan = false
					this.xitong = false
					this.templets=false
					this.$router.push({
						path: '/appManagement'
					})
				} else if(index === 1) {
					this.shangdian = true
					this.xiangmu = false
					this.rizhi = false
					this.qiye = false
					this.zidingyi = false
					this.qiyequan = false
					this.xitong = false
					this.templets=false
					this.$router.push({
						path: '/appShop'
					})
				} else if(index === 2) {
					this.shangdian = false
					this.xiangmu = false
					this.rizhi = true
					this.qiye = false
					this.zidingyi = false
					this.qiyequan = false
					this.xitong = false
					this.templets=false
					this.$router.push({
						path: '/operationDay'
					})
				} else if(index === 3) {
					this.shangdian = false
					this.xiangmu = false
					this.rizhi = false
					this.qiye = true
					this.zidingyi = false
					this.qiyequan = false
					this.xitong = false
					this.templets=false
					let params = {
						eid: sessionStorage.getItem('enterpriseId')
					}
					api.get('/enterprise/getEnterpriseById', params).then(res => {
						this.newData = res.data.data
					})
					this.$router.push({
						path: '/parmissions',
						query: {
							data: this.newData
						}
					})
				} else if(index === 4) {
					this.shangdian = false
					this.xiangmu = false
					this.rizhi = false
					this.qiye = false
					this.zidingyi = true
					this.qiyequan = false
					this.xitong = false
					this.templets=false
					this.$router.push({
						path: '/diy'
					})
				} else if(index === 5) {
					this.shangdian = false
					this.xiangmu = false
					this.rizhi = false
					this.qiye = false
					this.zidingyi = false
					this.qiyequan = true
					this.xitong = false
					this.templets=false
					this.$router.push({
						path: '/enterprise'
					})
				} else if(index === 6){
					this.shangdian = false
					this.xiangmu = false
					this.rizhi = false
					this.qiye = false
					this.zidingyi = false
					this.qiyequan = false
					this.xitong = true
					this.templets=false
					this.$router.push({
						path: '/appProject'
					})
				}else if(index === 7){
					this.shangdian = false
					this.xiangmu = false
					this.rizhi = false
					this.qiye = false
					this.zidingyi = false
					this.qiyequan = false
					this.xitong = false
					this.templets=true
					this.$router.push({
						path: '/templets'
					})
				}

			},
			...mapMutations({
				setBackHome: 'SET_BACKHOME'
            }),
            // 全文检索弹框
            showSeach(action) {
                if(action) {
                    this.searchShow = true;
                    return;
                }
                this.searchShow = false;
            },
            // 设置搜索条件
            setSearhLimit(data) {
                this.searhLimit.keyWords = data.keyWords;
                this.searhLimit.typeId = data.typeId;
            }
		},
		created() {
			this.setBackHome(false)
			this.appManagement = true
			//接收组件通信信息
			Bus.$on('toCurrentRolePermissions', (msg) => {
				this.XGQyjcxxFlage = msg.enterprisePermissionList[15].status
			});
		},
		mounted() {
			let items = document.getElementsByClassName('items');
			let index = 0;
			for(let i = 0; i < items.length; i++) {
				items[i].onclick = function() {
					index = i;
					this.setAttribute('style', 'color:#077ce7')
					for(let j = 0; j < items.length; j++) {
						if(index !== j) {
							items[j].style.color = '#cccccc !important'
							items[j].setAttribute('style', 'color:#cccccc')
						}
					}
				}
			}

		}
	}
</script>

<style scoped>
	.active {
		color: red;
	}
	
	.fatherBox {
		padding: 0px 50px !important;
		/*display: flex;*/
		height: 80vh;
		overflow: auto;
	}
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
	
	.fatherBox::-webkit-scrollbar {
		width: 4px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.fatherBox::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: white;
	}
	/*定义滑块，内阴影及圆角*/
	
	.fatherBox::-webkit-scrollbar-thumb {
		/*width: 10px;*/
		height: 20px;
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: gainsboro;
	}
	
	.leftBox {
		width: 240px;
		height: 720px;
		background: #ffffff;
		float: left;
		margin-bottom: 40px;
	}
	
	.rightBox {
		height: 822;
		background: #ffffff;
		margin-left: 260px
	}
	
	.application>p {
		font-weight: 700;
	}
	
	.dataWactch>p {
		font-weight: 700;
	}
	
	.enterprisesSetup>p {
		font-weight: 700;
	}
	
	.permissions>p {
		font-weight: 700;
	}
	
	.mgT30 {
		margin-top: 30px;
	}
	
	.application>p {
		margin-left: 20px;
	}
	
	.application>li {
		margin-top: 40px;
		display: flex;
		align-items: center;
		color: #cccccc;
		margin-left: 25px;
	}
	
	.mgT40 {
		margin-top: 40px;
	}
	
	.dataWactch>li {
		margin-top: 40px;
		color: #cccccc;
		margin-left: 25px;
		display: flex;
		align-items: center;
	}
	
	.dataWactch>p {
		margin-left: 20px;
	}
	
	.enterprisesSetup>li {
		margin-top: 40px;
		color: #cccccc;
		margin-left: 25px;
		display: flex;
		align-items: center;
	}
	
	.enterprisesSetup>p {
		margin-left: 20px;
	}
	
	.permissions>p {
		margin-left: 20px;
	}
	
	.permissions>li {
		margin-top: 40px;
		color: #cccccc;
		margin-left: 25px;
		display: flex;
		align-items: center;
	}
	
	.parmmiseHeader {
		margin-top: 40px;
		display: flex;
	}
	
	.permissionsName>input {
		width: 585px;
		height: 35px;
	}
	
	.permissionsBrwite>textarea {
		width: 565px;
		height: 65px;
		padding: 10px;
	}
	
	.permissionsTrue>input {
		width: 585px;
		height: 35px;
	}
	
	.saveButton {
		background: #077ce7;
		width: 90px;
		height: 35px;
		text-align: center;
		align-items: center;
		margin-left: 520px;
		margin-top: 100px;
	}
	
	.parmmiseHeader>div {
		margin-left: 15px;
	}
	
	.permissionsName>p {
		margin-top: 40px;
	}
	
	.backGroundbox {
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f7f7f7;
	}
	
	.mgL8 {
		margin-left: 8px;
		cursor: pointer;
		color: #999;
	}
	
	.items {
		color: #cccccc;
	}
	.col3{
		color: #333
	}
	.font16{
		font-size: 16px
	}
</style>