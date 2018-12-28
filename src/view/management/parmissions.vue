<template>
    <div >
      <div style="margin-left: 35px;padding-top: 30px;padding-bottom: 30px;box-sizing: border-box">
        <p style="font-size: 16px;font-weight: 700;">基本信息</p>
        <div class="parmmiseHeader">
          <span style="font-size: 14px;" class="c6">企业头像</span>
          <div class="imgHeader"  >
            <img :src="img" alt="">
          </div>
          <div :listenChildEvent="listenChild">
            <upload @sendBase64="listenChild" title="编辑企业头像">上传新头像</upload>
          </div>

        </div>
        <div class="permissionsName">
          <p class="mgT15 c6"  style="font-size: 14px;margin-top: 66px;">企业名称</p>
          <div class="mgT15" style="width: 587px">
            <el-input  v-model="permissions" placeholder="请输入企业名称" :maxlength="20" style="color: #333;"></el-input>
          </div>

        </div>
        <div class="permissionsBrwite">
          <p class="mgT25 c6" style="font-size: 14px;" >企业描述</p>
          <div style="width: 585px" class="mgT15">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="permissionsBrwite"
              :maxlength="1000"
            >
            </el-input>
          </div>
        </div>
        <div class="permissionsTrue">
          <p class="mgT18 c6" style="font-size: 14px">企业公开性</p>
          <div class="mgT15">
            <div style="width: 585px">
              <el-select v-model="value" placeholder="请选择" size="75" style="width: 100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <li>

            </li>
          </div>
        </div>
        <div>
          <p class=" c6 mgT25" style="font-size: 14px">项目三级分类</p>
        </div>
        <div style="display: flex">
          <div class="mgT5 top iptEditor" style="display: flex"  v-for="(li ,index) in enterpriseDictionaries">
          	<i class="iconfont icon-bianji"></i>
          	<el-tooltip class="item" content="修改"  placement="top-start" >
          		<input type="text" v-model="li.name" class="con-ipt">
		    	  </el-tooltip>
          </div>
		</div>
        <div class="saveButton" @click="saveButton" style="margin-left: 493px;">
          保存
        </div>
      </div>
      <div style="height: 40px;width: 100%;background:#f7f7f7;display: none;">
      </div>
      <div class="footerBox" v-if="owner==1">
        <div>
          <p class="mgT25" style="font-weight: 800; font-size: 16px;">更多操作</p>
          <!--<div class="mgT23 f14">企业归属</div>
          <div class="mgT15 f14 border" >
            <div class="borederRaduis">
              	然
            </div>
            <div class="mgL7 fl" style="color: #888;height: 30px;line-height: 30px;">王浩然</div>-->
            <!--<div class="adjust" @click="adjust = true">
            	移交
            </div>
            <el-dialog
			  title="提示"
			  :visible.sync="adjust"
			  width="30%"
			  center>
			  <span>选择一个企业成员作为新的企业拥有者，移交后你的角色将变为成员</span>
			  <div class="sel">盒子</div>
			  <span slot="footer" class="dialog-footer">
			    <!--<el-button @click="adjust = false">取 消</el-button>-->
			    <!--<el-button type="primary" @click="adjust = false">确认移交</el-button>-->
			  <!--</span>-->
			<!--</el-dialog>-->
          </div>
          <div class="mgT15 f14">删除企业</div>
          <p class="tips">一旦你删除了企业，企业内所有项目、部门、成员，项目中所有内容等都将会被永久删除。这是一个不可恢复的操作，请谨慎对待!</p>
        <div>
 			<input class="delCompany" type="button" value="删除" @click="delCompany"/>
		</div>
        </div>
      </div>
    </div>
</template>

<script>
    import api from  '../../api/http'
    import { mapGetters ,mapMutations } from 'vuex'
    import upload from '../../components/upload'
    import bg from '../../assets/images/bg.png'
    export default {
        name: "parmissions",
        data(){
          return{
          	owner:'',//是否有删除企业的权限
          	adjust: '',//移交
            permissions:'',
            permissionsBrwite:'',
            permissionsTrue:'私有企业',
            newData:{},
            enterpriseInformation:false,
            enterpriseDictionaries:{}, //分类列表
            options: [
              {
                value: 0,
                label: '私有企业（仅成员可见）'
              }, {
                value: 1,
                label: '公有企业（所有人可见）'
              }
            ],//企业公开性
            value: '',
            img:bg,
          }
        },
        methods:{
          listenChild(data){
            console.log(data)
            this.img = data
          },
          saveButton(){
            let id =this.getEnterpriseId
            let open = 0;
            let permissions =this.permissions
            let permissionsBrwite =this.permissionsBrwite
            let value = this.value
            if(value === 0){
              open = 0
            }else{
              open = 1
            }
            let base64 =  this.img
            let typeOne= this.enterpriseDictionaries[0].dicId+ '-' +this.enterpriseDictionaries[0].name
            let typeTwo= this.enterpriseDictionaries[1].dicId+ '-' +this.enterpriseDictionaries[1].name
            let typeThree= this.enterpriseDictionaries[2].dicId+ '-' +this.enterpriseDictionaries[2].name
            let data={id,open,name:permissions,introduction:permissionsBrwite,typeOne,typeTwo,typeThree,base64}

            console.log(data);
            api.post('/enterprise/updEnterprise',data).then(res=>{
            	 this.$message({
		          message: '编辑成功',
		          duration:1000,
		          type: 'success'
        });
            })
          },
          //移交
//        adjust(){
//        	this.adjust: false
//        	},
          getData(){
              let params= {eid:sessionStorage.getItem('enterpriseId')}
              api.get('/enterprise/getEnterpriseById',params).then(res=>{
                this.newData =res.data.data
                this.permissions = this.newData.name
                this.permissionsBrwite = this.newData.introduction
                this.enterpriseDictionaries = this.newData.enterpriseDictionaries
                if ( res.data.data.pictureURL == ''){
                  this.img=bg
                }else if (res.data.data.pictureURL !== ''){
                  this.img =res.data.data.pictureURL
                }
				this.value = this.newData.open
              })
              
            },
            delCompany(){
            	
            		this.$confirm('此操作将永久删除该企业, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						let params= {id:this.getEnterpriseId}
		            		api.post('/enterprise/delEnterprise',params).then(res=>{
		            		sessionStorage.setItem('enterpriseId', '')
		            		sessionStorage.setItem('enterpriseIndex','none')
		            		this.$router.push({
									path: '/home'
								})
							
		            	})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
            	
					
            	
            },
            ...mapMutations({
            	setBackHome: 'SET_BACKHOME'
            })
          },
        components:{
          upload
        },
        created() {
        	this.owner = JSON.parse(sessionStorage.getItem('currentRolePermissions')).enterprisePermissionList[17].status
//      	console.log(this.owner)
          	this.getData()
				this.setBackHome(false)
        	},
        watch:{
          //监视企业描述框长度不得大于1000
          permissionsBrwite(){
            if (this.permissionsBrwite.length == 1000){
              this.$notify.error({
                title: '错误',
                message: '企业描述不得超过1000字'
              })
            }
          },

          //检测企业名称长度不得超过20个字
          permissions(){
            if(this.permissions.length == 20){
              this.$notify.error({
                title: '错误',
                message: '企业名字不得超过20字'
              })
            }
          },

          //企业id
          getEnterpriseId(){
          	this.getData()
          }


        },
	    computed: {
	        ...mapGetters({
	          getEnterpriseId: 'GET_ENTERPRISEID',
	          getBackHome: 'SET_BACKHOME'
	        })
	    },
		
    }
</script>

<style scoped>

  .application> p{
    font-weight: 700;
  }
  .dataWactch> p{
    font-weight: 700;
  }
  .enterprisesSetup >p{
    font-weight: 700;
  }
  .permissions >p{
    font-weight: 700;
  }

  .application>p{
    margin-left: 20px;
  }
  .application>li{
    margin-top: 40px;
    color: #ffffff;
    margin-left: 25px;
  }

  .dataWactch>li{
    margin-top: 40px;
    color:#ffffff;
    margin-left: 25px;
  }
  .dataWactch>p{
    margin-left: 20px;
  }
  .enterprisesSetup>li{
    margin-top: 40px;
    color:#ffffff;
    margin-left: 25px;
  }
  .enterprisesSetup>p{
    margin-left: 20px;
  }
  .permissions>p{
    margin-left: 20px;
  }
  .permissions>li{
    margin-top: 40px;
    color:#ffffff;
    margin-left: 25px;
  }
  .parmmiseHeader{
    margin-top: 60px;
    display: flex;
    align-items: center;
  }
  .permissionsName>input{
    width: 585px;
    height: 35px;
  }
  .permissionsBrwite>textarea{
    width: 565px;
    height: 65px;
    padding: 10px;
  }
  .permissionsTrue>input{
    width: 585px;
    height: 35px;
  }
  .saveButton{
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background: #077ce7;
    width: 90px;
    height: 35px;
    text-align: center;
    margin-left: 400px;
    margin-top: 50px;
    color: #fafafa;
    border-radius: 5px;
    margin-bottom: 30px;
  }

  .parmmiseHeader>div{
    margin-left: 15px;
  }
  .permissionsName>p{
    margin-top: 40px;
  }
  .mgT15{
    margin-top: 15px;
  }

  .mgT18{
    margin-top: 18px;
  }
  .imgHeader{

  }
  .imgHeader>img{
    width: 80px;
    height: 80px;
    border-radius:40px ;
  }
  .footerBox{
	background:#ffffff;
    padding-bottom: 20px;
        padding-left: 30px;
  }
   .mgT5{
    margin-top: 5px;
  }
  .mgT15{
    margin-top: 15px;
  }

  .mgT25{
    margin-top: 25px;
  }
  .mgT23{
    margin-top: 23px;
  }

  .f14{
    font-size: 14px;
  }
  .borederRaduis{
    width: 30px;
    height: 30px;
    background: #077ce7;
    border-radius: 50%;
    color: #ffffff;
    float: left;
    line-height: 30px;
    text-align: center;
  }
  .border{
    height: 32px;
  }
  .mgL7{
    margin-left: 7px;
  }
  .c6{
    color: #888;
  }
  .iptEditor{
  	height: 35px;
  	line-height: 35px;
  }

  .iptEditor:hover{
  	background: #f7f7f7;
  	border-radius: 4px;
  	cursor: pointer;
  }
 .iptEditor:hover .con-ipt{
	background: #f7f7f7;
  	cursor: pointer;
	}
 .con-ipt{
	padding-left: 4px;
	 font: 12px/1.5 Microsoft YaHei,tahoma,arial,Hiragino Sans GB,\\5b8b\4f53,sans-serif;
	}
.tips{
	height: 40px;
	line-height: 40px;
	font-size: 14px;
	color: #666;
}
.delCompany{
	width: 120px;
	line-height: 40px;
	text-align: center;
	color: #ef5520;
	cursor: pointer;
	border: 1px solid #ef5520;
	border-radius: 2px;
	font-size: 12px;
	background: #fff;
	margin-top: 20px;
}
.adjust{
    width: 60px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #077ce7;
    border: 1px solid #077ce7;
    font-size: 12px;
    border-radius: 2px;
    float: right;
    margin-right: 30px;
    cursor: pointer;
}
.adjust:hover{
	background: #077ce7;
	color: #fff;
}
</style>

