<template>
	<div>
		<div>
			<div class="navigation">
				<div class="headerBox">
					<p class="leftLog">
						<img src="../assets/images/daohang.png" alt="导航" @click="handle(index)" style="cursor: pointer">
						<span style="font-size: 16px;" @click="skipHome">
							 <el-tooltip class="item" effect="dark" :content="enterpriseName" placement="top-start">
							      <b style="cursor: pointer">{{enterpriseName | cutLongStr1}}</b>
							 </el-tooltip>
						</span>
					</p>
					<div class="nav">
						<div class="navItem">
							<i class="iconfont icon-sousuo sousuo"></i>
							<input type="text" class="allSearch" placeholder="在当前企业中搜索" v-model="keyWords" @keyup="showSeachTable" />
							<div class="searchList" v-show="resultListShow">
								<div class="category" v-for="items in resultListHL" :key="items.index">
									<p class="title">{{items[0].type | getTypeName}}</p>
									<div class="item clearfix" v-for="item in items" :key="item.index" @click="showDetails(item)">
										<img v-if="item.path" :src="item.path" alt="">
										<img v-if="!item.path" src="../assets/images/22登录_01.png" alt="">
										<div class="content">
											<p class="result-title">
												<span v-html="item.name "></span>
												<span class="label" v-for="i in item.label" :key="i" v-html="i"></span>
											</p>
											<p class="describe" v-html="item.remark"></p>
										</div>
									</div>
									<div class="item more" v-show="items[0].showMore" :type="items[0].showMore" @click="searchMore">
										查看全部
									</div>
								</div>
								<!-- 高级搜索 -->
								<div class="category search-plus" v-show="searchPlusShow">
									<div class="item clearfix">
										<div class="content">
											<p class="result-title"><span class="iconfont icon-sousuo"></span>在当前项目中搜索「{{keyWords}}」</p>
										</div>
									</div>
									<div class="item clearfix">
										<div class="content">
											<p class="result-title"><span class="iconfont icon-sousuo"></span>在当前企业中搜索「{{keyWords}}」</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="create">
							<!--<i class="iconfont icon-tianjia"></i>-->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--创建企业浮层-->
		<el-dialog title="创建企业" :visible.sync="addenterprise" width="430px" center>
      <span>
        <div class="dig_fl">
          <div class="dialog__content">
            <div class="digLogborder"></div>
            <div class="diglog_centet">
              <img src="../assets/images/We.png" alt="">
            </div>
            <div class="diglog_text"><span>输入企业名称解锁企业独有功能</span></div>
            <div class="diglog_input">
              <el-input type="text" v-model="name" :maxlength="20" placeholder="企业名称"></el-input>
            </div>
            <div class="diglog_input diglog_border">
              <el-select v-model="value" placeholder="企业规模" style="width:100%">
                <el-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="diglog_input">
              <el-input class="elInput" type="text" v-model="introduction" :maxlength="1000" placeholder="企业描述"></el-input>
            </div>
            <div class="dislog_bloack" @click="submit(index)" style="cursor: pointer;">
              <span>完成</span>
            </div>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer"></span>
	</el-dialog>

	<el-dialog title="企业" :visible.sync="Show" width="330px" center>
		<span>
                <div class="enterpriseBox" ref="enterpriseBox">
                    <el-row style="display: flex;align-items: center;margin-bottom: 30px;" v-for="(item,index) in list" :key="index">
                        <el-col :span="2">
                            <i v-show="liindex==index" class="iconfont icon-xiangqingjingyanliebiaoshuxing" style="color: #077ce5;"></i>
                        </el-col>
                        <el-col :span="22" style="margin-left: 8px;">
                            <p @click="check(index)" style="cursor: pointer;">
                                <b>{{item.name | cutLongStr}}</b>
                                <br />
                                <span style="color: #a1a1a1;font-size: 12px;">{{item.introduction | cutLongStr}}</span>
		</p>
		</el-col>
		</el-row>
		</div>
		<div style="padding: 10px 30px;font-weight: bold;" v-if="isAddProjectFlage">
			<span @click="add" style="cursor: pointer;">
                        <i class="el-icon-plus" style="font-weight: bold;"></i> 添加企业
                    </span>
		</div>
		</span>
	</el-dialog>
	<taskCompile :taksCompileShow="taksCompileShow" :elementId="contentId">
		<span class="btn" @click="toOrigin">前往项目：{{proName}}</span>
		<!-- <span>前往日程表</span> -->
	</taskCompile>
	</div>
</template>

<script>
	import api from '../api/http'
	import taskCompile from '../view/taskType/taskCompile'
	import { mapMutations, mapGetters } from 'vuex'
	import Bus from 'assets/js/Bus.js'
	export default {
		name: "header",
		components: {
			taskCompile
		},
		data() {
			return {
				// 查看任务详情弹框
				taksCompileShow: false,
				//创建企业的弹出框
				addenterprise: false,
				//是否具有创建企业的权限
				isAddProjectFlage: JSON.parse(sessionStorage.getItem('isAddProject')),

				list: {},
				//选择企业的弹出框
				Show: false,
				liindex: 0,
				value: '',
				isShow: false,
				mid: '',
				data: [],
				showUl: false,
				index: 0,
				name: '',
				introduction: '',
				uid: sessionStorage.getItem('userId'),
				bgfloat: false,
				id: '',
				navData: {},
				enterpriseName: '',
				resultListShow: false, // 全文检索框显示
				keyWords: '', // 检索关键字
				resultList: [], // 检索返回数据
				searchPlusShow: false, // 高级搜索
				contentId: '',
				proName: ''

			}
		},
		computed: {
			...mapGetters({
				eid: 'GET_ENTERPRISEID',
				getBackHome: 'GET_BACKHOME'
			}),
			// 高亮关键字
			resultListHL() {
				let list = JSON.parse(JSON.stringify(this.resultList));
				let k = this.keyWords;
				let re = new RegExp(k, "g");
				for(let i = 0; i < list.length; i++) {
					for(let j = 0; j < list[i].length; j++) {
						// 标题替换
						if(list[i][j].name.length < 10) {
							list[i][j].name = list[i][j].name.replace(re, '<em>' + k + '</em>');
						} else {
							let text = list[i][j].name;
							let index = text.indexOf(k);
							if(index > 2) {
								if(text.length - index > 10) {
									text = '...' + text.substr(index - 2, 10) + '...';
								} else {
									text = '...' + text.substr(-10, 10);
								}
							} else {
								text = text.substr(0, 10) + '...';
							}
							text = text.replace(re, "<em>" + k + "</em>");
							list[i][j].name = text;
						}
						// 描述替换
						if(list[i][j].remark.length < 10) {
							list[i][j].remark = list[i][j].remark.replace(re, '<em>' + k + '</em>');
						} else {
							let text = list[i][j].remark;
							let index = text.indexOf(k);
							if(index > 2) {
								text = '...' + text.substr(index - 2, 10) + '...';
							} else {
								text = text.substr(0, 10) + '...';
							}
							text = text.replace(re, "<em>" + k + "</em>");
							list[i][j].remark = text;
						}
						// 标签替换
						if(list[i][j].type == 2) {
							let arr = list[i][j].label;
							for(let z = 0; z < arr.length; z++) {
								if(arr[z].indexOf(k) != -1) {
									arr[z] = arr[z].replace(re, '<em>' + k + '</em>')
								}
							}
						}
					}
				}
				return list;
			}
		},
		methods: {
			//跳转首页
			skipHome() {
				this.$router.push({
					path: '/home'
				})
			},
			bgfloa() {
				this.bgfloat = false
			},
			handle(index) {
				let parms = {
					uid: this.uid
				}
				api.get('/enterprise/getEnterpriseByUid', parms).then(res => {
					this.list = res.data.data
				})

				this.Show = !this.Show
				this.$nextTick(() => {
					this.$refs.enterpriseBox.scrollTop = this.liindex * 62
				})
			},
			check(index) {
				sessionStorage.setItem('enterpriseIndex', index)
				sessionStorage.setItem('enterpriseId', this.list[index].id)
				//切换企业成功当前用户具备哪些权限
				api.get('/enterprisePermission/queryEnterprisePermission', {
					eid: this.list[index].id, //企业ID
				}).then(res => {
					sessionStorage.removeItem('currentRolePermissions')
					sessionStorage.setItem('currentRolePermissions', JSON.stringify(res.data.data))
					console.log('登录成功当前用户具备哪些权限2', sessionStorage.getItem('enterpriseId'), res.data.data)
					Bus.$emit('toCurrentRolePermissions', res.data.data)


					this.liindex = index
					this.enterpriseName = this.list[this.liindex].name
					let prams = {
						eid: this.list[this.liindex].id
					}
					this.setEnterpriseId(this.list[this.liindex].id)
					api.get('/enterpriseDictionaries/getenterpriseDictionaries', prams).then(res => {
						this.Show = !this.Show
					})
					if(this.getBackHome) {
						this.$router.push({
							path: '/home'
						})
					}


				})
				//判断当前用户是否参与当前企业
				api.get('/userInfo/getUserByEid', {
					eid: this.list[index].id, //企业ID
				}).then(res => {
					sessionStorage.setItem('isCurrentEnterprise', JSON.stringify(res.data.data))
					console.log('判断当前用户是否参与当前企业', res.data.data)
					Bus.$emit('toisCurrentEnterprise', res.data.data)
				})




			},
			add() {
				this.addenterprise = !this.addenterprise
				this.Show = !this.Show

			},

			//创建企业保存按钮
			submit() {
				let id = this.id
				let mid = this.mid
				let introduction = this.introduction.trim()
				let name = this.name.trim()
				let uid = this.uid
				if(introduction && name && uid !== '') {
					let newdata = {
						mid: id,
						introduction: introduction,
						name: name,
						uid: uid,
					}
					api.post('/enterprise/addEnterprise', newdata).then(res => {
						if(res.data.code == 200) {
							//切换企业成功当前用户具备哪些权限
							api.get('/enterprisePermission/queryEnterprisePermission', {
								eid: res.data.data[0].id, //企业ID
							}).then(res => {
								sessionStorage.removeItem('currentRolePermissions')
								sessionStorage.setItem('currentRolePermissions', JSON.stringify(res.data.data))
								console.log('登录成功当前用户具备哪些权限22', sessionStorage.getItem('enterpriseId'), res.data.data)
								Bus.$emit('toCurrentRolePermissions', res.data.data)
							})

							this.$notify({
								title: '成功',
								message: '创建企业成功',
								type: 'success'
							})
							this.$router.push({
								path: '/home'
							})
						}
						this.setEnterpriseId(res.data.data[0].id)
						sessionStorage.setItem('enterpriseId', res.data.data[0].id)
						this.enterpriseName = res.data.data[0].name
						this.addenterprise = !this.addenterprise
						this.liindex = this.list.length
						console.log(this.$refs.enterpriseBox)
						this.$nextTick(() => {
							this.$refs.enterpriseBox.scrollTop = this.list.length * 300
						})
						this.name = ''
						this.introduction = ''
						this.value = ''
					})
				} else {
					if(this.introduction == '') {
						this.$notify.error({
							title: '错误',
							message: '请填写企业描述信息'
						})
					} else if(this.name == '') {
						this.$notify.error({
							title: '错误',
							message: '请填写企业名字'
						})
					} else if(this.value == '') {
						this.$notify.error({
							title: '错误',
							message: '请选择企业规模'
						})
					} else {
						this.$notify.error({
							title: '错误',
							message: '请填写完整信息'
						})
					}

				}
			},

			// vuex
			...mapMutations({
				setEnterpriseId: 'SET_ENTERPRISEID',
			}),
			getList() {
				api.get('/enterprise/getEnterpriseScale').then(res => {
					res.data.data.map(el => {
						this.data.push({
							value: el.id,
							label: el.name
						})
					})
				})
			},
			// 获取全文检索结果
			getSearchList() {
				let params = {};
				params.name = this.keyWords; // 关键字
				params.eid = this.eid;
				api.post('/es/queryEs', params).then((res) => {
					if(res.data.code === 200) {
						this.dataPick(res.data.data);
					} else {
						this.$message(res.data.message);
					}
				});
			},
			// 数据分类
			dataPick(data) {
				if(data.length == 0) {
					// 在当前项目/企业搜索选项
					// this.searchPlusShow = true;
					this.resultList = [];
					return;
				} else {
					this.searchPlusShow = false;
				}
				// 标签去空
				for(let i = 0; i < data.length; i++) {
					let labelArr = data[i].label;
					for(let j = data.length; j >= 0; j--) {
						if(data[i].label[j] == '') {
							data[i].label.splice(j, 1);
						}
					}
				}
				let lists = [
					[],
					[],
					[],
					[],
					[]
				];
				for(let i = 0; i < data.length; i++) {
					let index = data[i].type - 1;
					lists[index].push(data[i]);
				}
				for(let i = lists.length - 1; i >= 0; i--) {
					// 每个类型保留五条数据,多的显示查看更多
					if(lists[i].length > 5) {
						lists[i].length = 5;
						lists[i][0].showMore = i + 1;
					}
					// 删除空数组
					if(lists[i].length == 0) {
						lists.splice(i, 1);
					}
				}
				this.resultList = lists;
			},
			// 检索显示更多
			searchMore(e) {
				let typeId = e.target.attributes.type.value;
				let searchLimit = {
					keyWords: this.keyWords,
					typeId
				}
				this.$emit('setSearhLimit', searchLimit);
				this.$emit('showSeach', true);
				this.keyWords = ''
			},
			// 回车显示搜索tabs
			showSeachTable(e) {
			    if(this.keyWords=='')return;
				if(e.key != 'Enter') return;
				let searchLimit = {
					keyWords: this.keyWords,
					typeId: '0'
				}
				this.$emit('showSeach', true);
				this.$emit('setSearhLimit', searchLimit);
				this.keyWords = ''
			},
			// 显示详情
			showDetails(item) {
				this.taksCompileShow = !this.taksCompileShow;
				this.contentId = item.contentId;
				this.proName = item.proName;
				this.keyWords = '';
			},
			// 详请组件上的按钮跳转
			toOrigin() {
				this.taksCompileShow = !this.taksCompileShow;
				this.$router.push('/taskType');
			}
		},
		filters: {
			//剪切过长的字符串
			cutLongStr1(val) {
				if(val.length > 20) {
					return val.substr(0, 20) + '...'
				} else {
					return val
				}
			},
			cutLongStr(val) {
				if(val.length > 10) {
					return val.substr(0, 10) + '...'
				} else {
					return val
				}
			},
			// 分类名称转换
			getTypeName(val) {
				switch(val) {
					case 1:
						return '项目';
						break;
					case 2:
						return '任务';
						break;
					case 3:
						return '分享';
						break;
					case 4:
						return '文件';
						break;
					case 5:
						return '日程';
						break;
					default:
						return '未知';
				}
			}
		},
		created() {
			this.getList()
			let index;
			if(sessionStorage.getItem('enterpriseIndex')!='none') {
				this.liindex = sessionStorage.getItem('enterpriseIndex')
				index = sessionStorage.getItem('enterpriseIndex')
			} else {
				index = 0
			}
			let parms = {
				uid: this.uid
			}
			api.get('/enterprise/getEnterpriseByUid', parms).then(res => {
				this.list = res.data.data
				console.log(this.list)
				if(this.list.length == 0) {
					//当前用户没有公共企业
					//					sessionStorage.setItem('publlQYid', 0)
					Bus.$emit('topubllQYid', 0)
				}
				sessionStorage.setItem('enterpriseId', this.list[index].id)

				//切换企业成功当前用户具备哪些权限
				api.get('/enterprisePermission/queryEnterprisePermission', {
					eid: this.list[index].id, //企业ID
				}).then(res => {
					sessionStorage.removeItem('currentRolePermissions')
					sessionStorage.setItem('currentRolePermissions', JSON.stringify(res.data.data))
					console.log('登录成功当前用户具备哪些权限223', sessionStorage.getItem('enterpriseId'), res.data.data)
					Bus.$emit('toCurrentRolePermissions', res.data.data)
				})

				//判断当前用户是否参与当前企业
				api.get('/userInfo/getUserByEid', {
					eid: this.list[index].id, //企业ID
				}).then(res => {
					sessionStorage.setItem('isCurrentEnterprise', JSON.stringify(res.data.data))
					console.log('判断当前用户是否参与当前企业', res.data.data)
					Bus.$emit('toisCurrentEnterprise', res.data.data)
				})

				this.enterpriseName = this.list[index].name
				let prams = {
					eid: this.list[index].id
				}
				this.setEnterpriseId(this.list[index].id)
				api.get('/enterpriseDictionaries/getenterpriseDictionaries', prams).then(res => {})

				Bus.$on('toisAddProject', (msg) => {
					console.log(msg)
					this.isAddProjectFlage = msg
				});

			})
			// 点击关闭搜索结果弹框
			window.addEventListener('click', () => {
				this.keyWords = '';
			});
		},
		watch: {
			keyWords(newVal, oldVal) {
				if(newVal.trim() != '') {
					this.resultListShow = true;
					this.getSearchList(); // 根据关键字获取数据
				} else {
					this.resultListShow = false;
				}
			},
			name() {
				if(this.name.length == 20) {
					this.$notify.error({
						title: '错误',
						message: '输入企业的名字不得超过20个字'
					})
				}
			},
			introduction() {
				if(this.introduction.length == 1000) {
					this.$notify.error({
						title: '错误',
						message: '输入企业的名字不得超过1000个字'
					})
				}
			},
			addenterprise() {
				if(this.addenterprise == false) {
					this.name = ''
					this.introduction = ''
					this.value = ''
				}
			}

		}
	}
</script>

<style scoped>
	/* 全文检索弹框 */

	.nav navItem {
		position: relative;
	}

	.navItem .searchList {
		position: absolute;
		width: 270px;
		max-height: 500px;
		line-height: normal;
		background: #fff;
		color: gray;
		font-size: 15px;
		overflow-y: auto;
		border-radius: 2px;
		box-shadow: 0 0 10px #DFDFDF;
	}

	.searchList .category {
		padding: 4px 0;
	}

	.category .title {
		margin: 2px 15px 5px;
		padding-bottom: 5px;
		border-bottom: 1px solid #e5e5e5;
	}

	.category .item {
		padding: 5px 15px;
		box-sizing: border-box;
		cursor: pointer;
	}

	.category .item:hover {
		background-color: #f5f5f5;
	}

	.category .item>* {
		float: left;
	}

	.category .item img {
		width: 30px;
		height: 30px;
		border-radius: 15px;
		margin-right: 12px;
	}

	.category .more {
		font-size: 14px;
	}

	.category .more:hover {
		background-color: #fff;
		color: #3da8f5;
	}

	.item .content {
		display: flex;
		height: 30px;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}

	.content .result-title {
		vertical-align: middle;
	}

	.content .describe {
		font-size: 12px;
		color: #a6a6a6;
	}
	/* 高级搜索 */

	.search-plus .result-title {
		overflow: hidden;
		text-overflow: ellipsis;
		width: 250px;
		white-space: nowrap;
	}

	.search-plus .result-title span {
		display: inline-block;
		width: 30px;
	}
	/* 滑动条样式 */
	/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

	.searchList::-webkit-scrollbar {
		width: 7px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/

	.searchList::-webkit-scrollbar-track {
		/* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
		/* border-radius: 10px; */
		background-color: #E5E5E5;
	}
	/*定义滑块，内阴影及圆角*/

	.searchList::-webkit-scrollbar-thumb {
		width: 10px;
		height: 20px;
		border-radius: 1px;
		/* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
		background-color: #A6A6A6;
		border-left: 2px solid transparent;
	}

	.enterpriseBox {
		height: 150px;
		overflow: auto;
		padding: 20px 30px;
		border-top: 2px solid #efefef;
		border-bottom: 1px solid #efefef;
	}

	.enterpriseBox::-webkit-scrollbar {
		width: 7px;
		height: 16px;
		background-color: #f5f5f5;
	}

	.enterpriseBox::-webkit-scrollbar-track {
		/* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
		/* border-radius: 10px; */
		background-color: #E5E5E5;
	}
	/*定义滑块，内阴影及圆角*/

	.enterpriseBox::-webkit-scrollbar-thumb {
		width: 10px;
		height: 20px;
		border-radius: 1px;
		/* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
		background-color: #A6A6A6;
		border-left: 2px solid transparent;
	}

	.enterpriseBox p {
		line-height: 16px;
	}

	.navigation {
		position: fixed;
		top: 0;
		left: 50px;
		border-bottom: 1px solid #eaeaea;
		box-shadow: 20px 0px 20px 8px #fbfbfb;
		width: 100%;
		background: white;
		z-index: 6;
	}

	.leftLog {
		display: flex;
		position: relative;
		left: 30px;
		align-items: center;
	}

	.leftLog>span {
		margin-left: 10px;
	}

	.leftLog>img {
		width: 18px;
	}

	.headerBox {
		display: flex;
		height: 75px;
	}

	.navItem {}

	.nav {
		right: 105px;
		position: absolute;
		display: flex;
		line-height: 75px;
	}

	.navInput {
		border-radius: 24px;
		width: 200px;
		padding: 5px 10px;
		background: #fafafa;
		outline: none;
	}

	.create {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 15px;
	}

	.create i {
		font-size: 28px;
		color: #077ce5;
	}

	.f14 {
		font-size: 14px;
	}

	.f12 {
		font-size: 12px;
		color: #a0a0a0;
	}

	.bottom {
		width: 240px;
		margin-left: 20px;
		border-bottom: 1px solid #efefef;
	}

	.dflex {
		display: flex;
		align-items: center;
		padding: 10px 0px;
	}

	.isS {
		width: 280px;
		top: 77px;
		left: 4.16667%;
		position: fixed;
		background: #ffffff;
		z-index: 3;
	}

	.p12 {
		padding-right: 12px;
	}

	.pbg {
		width: 10px;
		height: 20px;
		background: url("../assets/images/duihao.png") no-repeat;
	}

	.dialog__wrapper {
		background: #666666;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: auto;
		margin: 0;
		z-index: 10;
		opacity: 0.9;
	}

	.dialog__content {
		z-index: 2000;
	}

	.diglog_centet {
		text-align: center;
		margin-top: 20px;
	}

	.diglog_text {
		text-align: center;
		font-size: 14px;
		color: #999999;
	}

	.diglog_input {
		text-align: center;
		margin-top: 20px;
	}

	.diglog_input>input {
		width: 370px;
		height: 35px;
	}

	.diglog_border {
		position: relative;
	}

	.dislog_bloack {
		background: #077ce7;
		width: 370px;
		height: 35px;
		margin-top: 30px;
		color: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.showUl>li {
		width: 370px;
		height: 35px;
		margin-left: 30px;
		font-size: 13px;
		border: 1px solid #efefef;
	}

	.digLogborder {
		width: 100%;
		height: 2px;
		background-color: #efefef;
	}

	.allSearch {
		width: 238px;
		height: 30px;
		outline: none;
		border-radius: 50px;
		border: none;
		border: 1px solid #f2f2f2;
		background: #fafafa;
		padding-left: 27px;
		color: #CCCCCC;
	}

	.allSearch::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #cccccc;
	}

	.allSearch:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #cccccc;
	}

	.allSearch::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #cccccc;
	}

	.allSearch:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #cccccc;
	}

	.allSearch:focus {
		background: white;
	}

	.sousuo {
		color: #CCCCCC;
		font-size: 12px;
		position: absolute;
		left: 12px;
		top: 2px;
	}
	/* 标签 */

	.content .result-title {
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 190px;
	}

	.result-title .label {
		font-size: 10px;
		height: 16px;
		line-height: 16px;
		margin-left: 5px;
		border-radius: 10px;
		padding: 1px 3px;
		box-sizing: border-box;
		background-color: rgba(138, 202, 249, .8);
	}
	/* 详情跳转按钮 */

	.btn {
		margin-right: 10px;
		position: absolute;
		top: -10px;
		box-sizing: border-box;
		font-size: 14px;
		line-height: 20px;
		padding: 5px 12px;
		color: #bdbdbd;
		background-color: #686868;
		border-radius: 2px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
</style>
<style>
	.searchList .category em {
		font-style: normal;
		color: #3da8f5;
	}
</style>
