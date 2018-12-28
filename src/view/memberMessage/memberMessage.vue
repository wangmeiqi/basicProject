<template>
    <div>
        <vheader></vheader>
        <vlocation></vlocation>
        <div style="height: 80vh;overflow-y:auto;overflow-x: hidden;">
        	<div class="main">
	            <div class="memberHeader">
	                <div>
	                    <div class="memberName">
	                        <img v-if="userImg != ''" :src="userImg"/>
	                        <img v-if="userImg == ''" src="../../assets/images/22登录_01.png" /> {{name}}
	                        
	                    </div>
	                    <div style="margin-right: 20px;">
	                        <i class="iconfont icon-youxiang" style="font-size: 14px;"></i>
	                        <span>{{email}}</span>
	                    </div>
	                </div>
	                <div>
	                    <div class="memberTabs">
	                        <ul>
	                            <li v-for="(tab,index) in memberTabs">
	                                <span @click="memberTabsSkip(index)" :class="{liBgClick:memberTabsIndex==index}">{{tab.name}}</span>
	                            </li>
	                        </ul>
	                    </div>
	                    <div style="margin-right: 20px;color: #077ce7;cursor: pointer;">
	                        <i class="iconfont icon-tianjia2" style="font-size: 12px;"></i>
	                        发起聊天
	                    </div>
	                </div>
	            </div>
	            <div class="memberTitle">
	                <div style="font-size: 16px;color: #333;">{{title}}</div>
	                <div style="color: #077ce7;cursor: pointer;">
	                    <i class="iconfont icon-bianji2" style="font-size: 14px;"></i>
	                    <span style="font-size: 14px;" @click="edit">编辑</span>
	                </div>
	            </div>
	            <div class="memberBody">
	                <router-view></router-view>
	            </div>
	        </div>
        </div>
        <div class="memberStyle">
        <el-dialog title="企业成员信息" :visible.sync="compile" width="644px" center>
            <span>
                <el-row :gutter="20" style="height: 95px;border-top: 1px solid #ccc;">
                  <el-col :span="12">
                      <div class="title">
                        姓名
                    </div>
                      <el-input v-model="message.name" placeholder="请输入姓名" :disabled="true"></el-input>
                  </el-col>
                  <el-col :span="12">
                      <div class="title">
                        电子邮件
                    </div>
                      <el-input v-model="message.email" placeholder="请输入电子邮件" :disabled="true"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="height: 95px;">
                  <el-col :span="12">
                      <div class="title">
                        生日
                    </div>
                      <el-date-picker v-model="message.birthday" align="center" value-format="yyyy-MM-dd" type="date"  placeholder="选择您的生日" :disabled="true"></el-date-picker>
                  </el-col>
                  <el-col :span="12">
                      <div class="title">
                        入职时间
                    </div>
                      <el-date-picker v-model="message.entryTime" type="date" value-format="yyyy-MM-dd" placeholder="选择入职时间" ></el-date-picker>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="height: 95px;">
                  <el-col :span="12">
                      <div class="title">
                        员工类型
                    </div>
                      <el-select v-model="message.memberType" placeholder="选择或者新增员工类型">
                          <div class="addCls">
                              <div><input type="text" placeholder="添加员工类型" v-model="addMemberTypeStr"/></div>
                              <div class="add" @click="addMemberType">添加</div>
                          </div>
                        <el-option
                          v-for="(item,index) in memberType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          <span v-if="index!=0">{{item.label}}</span>
                            <i v-if="index!=0" class="iconfont icon-shanchu fr" @click.stop="delchen(index,2)"></i>
                        </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                      <div class="title">
                        职位
                    </div>
                      <el-select v-model="message.position" placeholder="选择或者新增职位">
                          <div class="addCls">
                              <div><input type="text" placeholder="添加职位" v-model="addPositionStr"/></div>
                              <div class="add" @click="addPosition">添加</div>
                          </div>
                        <el-option
                          v-for="(item,index) in position"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          <span v-if="index!=0">{{item.label}}</span>
                            <i v-if="index!=0" class="iconfont icon-shanchu fr" @click.stop="delchen(index,1)"></i>
                        </el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" style="height: 95px;">
                        <el-col :span="6">
                            <div class="title">
                                联系电话
                        </div>
                        <el-select v-model="stateVal">
                            <el-option
                              v-for="item in state"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <div class="title">
                            &nbsp;
                        </div>
                        <el-input v-model="stateVal"></el-input>
                    </el-col>
                    <el-col :span="15">
                        <div class="title">
                            &nbsp;
                        </div>
                        <el-input v-model="tel" placeholder="输入电话号码"></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="height: 95px;">
                    <el-col :span="8">
                        <div class="title">工作地点</div>
                        <el-select v-model="countryStr" placeholder="国家">
                            <el-option
                              v-for="item in country"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <div class="title">
                            &nbsp;
                        </div>
                        <el-select v-model="provinceStr" placeholder="省份（直辖市）">
                            <el-option
                              v-for="item in province"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <div class="title">
                            &nbsp;
                        </div>
                        <el-select v-model="cityStr" placeholder="城市（区）">
                            <el-option
                              v-for="item in city"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-row>
                    <el-col :span="24">
                        <button @click="save" class="save">保存</button>
                    </el-col>
                </el-row>
            </span>
        </el-dialog>
         </div>
    </div>
</template>
 
<script>
    import vheader from 'components/header'
    import vlocation from 'components/location'
    import { mapMutations, mapGetters } from 'vuex'
    import API from 'api/http'
    export default {
        components: {
            vheader,
            vlocation
        },
        data() {
            return {
                name: '',
                email: '',
                userImg: '',
                title: '详细资料',
                //成员详情的选项卡
                memberTabs: [{
                    name: '详细资料',
                    path: '/details'
                }, {
                    name: '最新动态',
                    path: '/news'
                }, {
                    name: '任务安排',
                    path: '/taskArrangement'
                }, {
                    name: '日程安排',
                    path: '/schedule'
                }, {
                    name: '项目经历',
                    path: '/project'
                }],
                //成员详情的选项卡index
                memberTabsIndex: 0,
                compile: false,
                //所有数据的存储地点
                message: {
                    name: '',
                    email: '',
                    birthday: '',
                    entryTime: '',
                    memberType: '',
                    position: '',
                    tel:''
                },
                //员工类型
                memberType: [{
                    value:'',
                    label:'请选择员工类型',
                    id:''
                }],
                //增加员工类型的input v-model
                addMemberTypeStr:'',
                //职位
                position: [{
                    value:'',
                    label:'请选择职位',
                    id:''
                }],
                //增加职位的input v-model
                addPositionStr: '',
                //联系人国家
                state: [{
                    value: '+86',
                    label: '中国'
                },{
                    value: '+852',
                    label: '中国香港'
                },{
                    value: '+886',
                    label: '台湾'
                },{
                    value: '+1',
                    label: '美国'
                },{
                    value: '',
                    label: '其他'
                }],
                //区号
                stateVal:'+86',
                //电话号码
                tel:'',
                //国家
                country: [],
                countryStr:'',
                //省份
                province: [],
                provinceStr:'',
                //城市
                city: [],
                cityStr:''
            }
        },
        methods: {
            //打开编辑弹框
            edit(){
                this.compile = true
                this.getUserInfo()
            },
            memberTabsSkip(index) {
                this.memberTabsIndex = index;
                this.title = this.memberTabs[index].name
                this.$router.push({
                    path: '/memberMessage' + this.memberTabs[index].path
                })
            },
            //增加员工类型
            addMemberType(){
                if(this.addMemberTypeStr !== ''){
                    API.post('/enterpriseDictionaries/addDic', {
                        name:this.addMemberTypeStr,
                        type:'employeeType',
                        eid:sessionStorage.getItem('enterpriseId'),
                        pid:0
                    }).then(res => {
                        this.addMemberTypeStr = ''
                        console.log(res.data.data)
                        this.memberType.push({
                            value:res.data.data.dicId,
                            label:res.data.data.name,
                            id:res.data.data.id
                        })
                    })
                }
            },
            //增加职位
            addPosition(){
                if(this.addPositionStr !== ''){
                    API.post('/enterpriseDictionaries/addDic', {
                        name:this.addPositionStr,
                        type:'employeePosition',
                        eid:sessionStorage.getItem('enterpriseId'),
                        pid:0
                    }).then(res => {
                        this.addPositionStr = ''
                        console.log(res.data.data.dicId)
                        this.position.push({
                            value:res.data.data.dicId,
                            label:res.data.data.name,
                            id:res.data.data.id
                        })
                    })
                }
            },
            //删除添加
            delchen(index,flag){
                if(flag==1){
                    API.post('/enterpriseDictionaries/delDic',{
                        id:this.position[index].id,
                    }).then(res => {
                        this.position.splice(index,1)
                    })
                }else{
                    API.post('/enterpriseDictionaries/delDic',{
                        id:this.memberType[index].id,
                    }).then(res => {
                        this.memberType.splice(index,1)
                    })
                }
                
            },
            //保存用户信息
            save(){
                this.compile = false
                API.post('/user/editing' ,{
                    id: sessionStorage.getItem('memberId'),
                    name: this.message.name,
                    email: this.message.email,
                    birthday: this.message.birthday,
                    entry_time: this.message.entryTime,
                    position: this.message.position,
                    employee_type: this.message.memberType,
                    phone: this.message.tel,
                    province: this.provinceStr,
                    city: this.cityStr,
                    area: this.countryStr
                }).then(res => {
                    this.getUserInfo()
                    this.setMemberMessageFlag(this.getMemberMessageFlag+1)
                })
            },
            //获取人员信息
            getUserInfo(){
                API.get('/user/showUserInfo', {
                    id: sessionStorage.getItem('memberId')
                }).then(res => {
    //                console.log(res)
                    this.userImg = res.data.data.userImg
                    this.name = res.data.data.name;
                    this.email = res.data.data.email
                    this.message.name = res.data.data.name
                    this.message.email = res.data.data.email
                    let birthday = typeof(res.data.data.birthday) == 'object' ? '' : new Date(res.data.data.birthday);
                    this.message.birthday = typeof(birthday) == 'object' ? birthday.getFullYear() + '-' + (birthday.getMonth() + 1) + '-' + birthday.getDate() : ''
                    let entryTime = typeof(res.data.data.birthday) == 'object' ? '' : new Date(res.data.data.entry_time);
                    this.message.entryTime = typeof(entryTime) == 'object' ? entryTime.getFullYear() + '-' + (entryTime.getMonth() + 1) + '-' + entryTime.getDate() : ''
                    this.message.memberType = res.data.data.employee_type
                    this.message.position = res.data.data.position
                    this.tel = res.data.data.phone.split('-')[1]
                    this.stateVal = res.data.data.phone.split('-')[0]
                    this.countryStr = isNaN(parseInt(res.data.data.area))?res.data.data.area:parseInt(res.data.data.area)
                    this.provinceStr = res.data.data.province
                    this.cityStr = res.data.data.city
                    this.setMemberMessageFlag(this.getMemberMessageFlag+1)
                })
            },
            ...mapMutations({
                addPath: 'ADD_PATH',
                setMemberMessageFlag:'SET_MEMBERMESSAGEFLAG'
            })
        },
        watch: {
            value() {
                console.log(this.value)
            },
            stateVal(){
                console.log(this.stateVal)
                this.message.tel = this.stateVal +'-'+ this.tel
            },
            tel(){
                this.message.tel = this.stateVal +'-'+ this.tel
            },
            countryStr(){
                API.get('/enterpriseDictionaries/GetProvinces',{
                    id:this.countryStr
                }).then(res => {
                    console.log(res)
                    this.province = []
                    res.data.data.map(el => {
                        this.province.push({
                            value:el.provinceid,
                            label:el.province
                        })
                    })
                })
            },
            provinceStr(){
                API.get('/enterpriseDictionaries/getCity',{
                    id:this.provinceStr
                }).then(res => {
                    console.log(res)
                    this.city = []
                    res.data.data.map(el => {
                        this.city.push({
                            value:el.cityid,
                            label:el.city
                        })
                    })
                })
            },
            value(){
                console.log(this.value.toString())
            },
            
        },
        created(){
            this.getUserInfo()
            
            //获取员工类型
            API.post('/enterpriseDictionaries/findByType', {
                type: 'employeeType',
                eid: sessionStorage.getItem('enterpriseId')
            }).then(res => {
                console.log(res.data.data)
                res.data.data.map(el => {
                    this.memberType.push({
                        value:el.dicId,
                        label:el.name,
                        id:el.id
                    })
                })
                console.log(this.memberType)
            })
            //获取职位列表
            API.post('/enterpriseDictionaries/findByType', {
                type: 'employeePosition',
                eid: sessionStorage.getItem('enterpriseId')
            }).then(res => {
                console.log(res.data.data)
                res.data.data.map(el => {
                    this.position.push({
                        value:el.dicId,
                        label:el.name,
                        id:el.id
                    })
                })
                console.log(this.memberType)
            })
            
            //获取国家列表
            API.get('/enterpriseDictionaries/getCountry').then(res => {
                console.log(res)
                res.data.data.map(el => {
                    this.country.push({
                        value:el.id,
                        label:el.name
                    })
                })
            })
        },
        computed:{
            ...mapGetters({
                getMemberMessageFlag: 'GET_MEMBERMESSAGEFLAG'
            })
        }
    }
</script>
 
<style scoped>
    .main {
        width: 100vw;
        background: #f7f7f7;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
    }
    
    .memberHeader {
        width: 950px;
        height: 150px;
        background: white;
    }
    
    .memberHeader img {
        width: 60px;
        height: 60px;
        border-radius: 60px;
        margin-left: 20px;
        margin-right: 10px;
    }
    
    .memberHeader>div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .memberHeader .memberName {
        height: 96px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 700;
    }
    
    .memberHeader .memberTabs ul {
        display: flex;
        align-items: center;
        margin-left: 90px;
    }
    
    .memberHeader .memberTabs li {
        margin-right: 40px;
        cursor: pointer;
        font-size: 14px;
        color: #333;
    }
    
    .memberHeader .memberTabs li span {
        padding: 4px 14px;
    }
    
    .liBgClick {
        background: #077ce7;
        color: white;
        padding: 4px 14px;
        border-radius: 30px;
    }
    
    .memberTitle {
        width: 950px;
        height: 68px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .memberBody {
        width: 950px;
        background: white;
        margin-bottom: 40px;
    }
    
    .addCls {
        padding: 5px 20px;
        font-size: 14px;
        color: #606266;
        display: flex;
        justify-content: space-between;
    }
    
    .addCls input {
        border: none;
        outline: none;
    }
    
    .addCls .add {
        color: #3da8f5;
        cursor: pointer;
    }
    
    .title{
        height: 40px;
        display: flex;
        align-items: center;
    }
    
    .save{
        width: 98%;
        height: 36px;
        color: white;
        background: #077ce7;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 4px;
    }
</style>
<style>
	.memberStyle .el-dialog--center .el-dialog__body {
	    padding-top: 0;
	}
</style>