<template>
  <!--<div class="memberAdd">
    <div class="title">
      <h2 v-if="memberState==0">新增用户</h2>
      <h2 v-if="memberState==1">更新用户</h2>
    </div>
    <div class="tips" v-if="memberState==1&&successFlag">
        更新成功
    </div>
    <div class="addCon">
      <el-form :model="message" status-icon :rules="rules2" ref="message" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="message.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="message.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="message.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rPassword">
               <el-input type="password" v-model="message.rPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-checkbox v-if="memberState==1" v-model="message.isAdmin" >管理员</el-checkbox>
      </el-form>
    </div>

    <div class="btn">
      <el-button v-if="memberState==0" type="primary" @click="addFun()">新建</el-button>
      <el-button v-if="memberState==1" type="primary" @click="modifyFun()">保存</el-button>
    </div>


  </div>-->
  <div class="memberAdd">
  	   <div class="title">
	      <h2 v-if="memberState==0">新增用户</h2>
	      <h2 v-if="memberState==1">更新用户</h2>
	    </div>
	    <div class="tips" v-if="memberState==1&&successFlag">
	        更新成功
    	</div>
    	<div class="addCon">
    		
    		
  	<el-form :model="message" status-icon :rules="rules2" ref="message" label-width="100px" class="demo-ruleForm">
  		  <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="message.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="message.name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
			  <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="message.passwords" auto-complete="off" placeholder="请输入密码(字母.数字.至少6位)"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
			    <el-input type="password" v-model="message.rPassword" auto-complete="off"></el-input>
			  </el-form-item>
	</el-form>
	</div>
	 <div class="btn">
      <el-button v-if="memberState==0" type="primary" @click="submitForm('message')">新建</el-button>
      <el-button v-if="memberState==1" type="primary" @click="modifyFun('message')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import API from 'api/http'
  
  export default {
    data() {
    	
    	 var checkEmail = (rule, value, callback) => {
        if (!this.message.email){
          return callback(new Error('邮箱不能为空'));
          return 
        }else{
        	 callback();
        }
      };
       var checkName = (rule, value, callback) => {
        if (!this.message.name) {
          return callback(new Error('姓名不能为空'));
        }else{
        	 callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (this.message.passwords === '') {
        	console.log(this.message.passwords)
          callback(new Error('请输入密码'));
        } 
       else if(this.message.passwords.length<6){
        	callback(new Error('密码格式不正确'));
        }
        else {
           this.$refs.message.validateField('checkPass');
           callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (this.message.rPassword === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.message.rPassword !== this.message.passwords) {
        	alert(value)
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
//      checkemail:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,//邮箱正则表达式
        memberState:0,//0代表新增 1代表更新
        successFlag:false,
        message: {
          email: '',
       		name: '',
       		passwords: '',
        	rPassword: '',
       		isAdmin:'',
        },
        rules2: {
        	email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
    	//添加用户
      submitForm(formName) {
      	console.log(this.message.password)
        this.$refs[formName].validate((valid) => {
          if (valid) {
          API.post('/userInfo/addUser', {
          username:this.message.name,
          password:this.message.passwords,
          email:this.message.email,
          pword:this.message.rPassword,
	        }).then(res => {
	        	  console.log(res)
	           if(res.data.data==''){
	           	 alert("创建成功")
	           	 this.$router.push({path:'/mbList'});
	           }
	           if(res.data.data=='邮箱重复'){
	           	alert("邮箱重复创建")
	           	return false
	           }
	          });
	          } else {
						console.log('error submit!!');
            return false;
          }
        });
      },
      //修改用户信息
          
      modifyFun(formName){
      	  this.$refs[formName].validate((valid) => {
          if (valid) {
          	   API.post('/userInfo/modifyUser', {
			          id:localStorage.getItem('memberId'),
			          username:this.message.name,
			          password:this.message.passwords,
			          email:this.message.email,
			          status:Number(this.message.isAdmin),
			          pword:this.message.rPassword,
			        }).then(res => {
			            console.log(res);
			            if(res.data.message=='SUCCESS'){
			                this.successFlag=true;
			                setTimeout(()=>{
			                  this.$router.push({path:'/mbList'});
			                },600);
			            }
			        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      	},
       //获取人员信息
      getUserInfo(){
        this.memberState=localStorage.getItem('memberState');
        const mumberId=localStorage.getItem('memberId');
        console.log(mumberId);
        if(!isNaN(mumberId)){
            //console.log(mumberId);
          API.post('/userInfo/echoUserMessage', {
            id: localStorage.getItem('memberId')
          }).then(res => {
            console.log(res.data.data);
            this.message.name=res.data.data.username;
            this.message.email=res.data.data.email;
            this.message.password=res.data.data.password;
            this.message.isAdmin=Boolean(Number(res.data.data.status));
          })
        }
      },
     //管理员选择
      handleChecked(){
        console.log('123')
      }
      
    },
    created() {
      this.getUserInfo()
    },
    computed:{
       /* userName() {
            var text;
            if(this.message.isAdmin) {
                text = '管理员';
            }else {
                text = '用户';
            }
            console.log(Number(this.message.isAdmin));
            return text;
        }*/
    },
  }

//export default{
//  data(){
//    var validatePass = (rule, value, callback) => {
//      if (value === '') {
//        callback(new Error('请输入密码'));
//      } else {
//        if (this.message.rPassword !== '') {
//          this.$refs.message.validateField('checkPass');
//        }
//        callback();
//      }
//    };
//    var validatePass2 = (rule, value, callback) => {
//      if (value === '') {
//        callback(new Error('请再次输入密码'));
//      } else if (value !== this.message.password) {
//        callback(new Error('两次输入密码不一致!'));
//      } else {
//        callback();
//      }
//    };
//    return{
//      memberState:0,//0代表新增 1代表更新
//      successFlag:false,
//      message: {
//        email: '',
//        name: '',
//        password: '',
//        rPassword: '',
//        isAdmin:'',
//      },
//
//      rules2: {
//        password: [
//          { validator: validatePass, trigger: 'blur' }
//        ],
//        rPassword: [
//          { validator: validatePass2, trigger: 'blur' }
//        ],
//      }
//    }
//  },
//
//  methods:{
//    //添加用户
//    addFun(){
//      API.post('/userInfo/addUser', {
//        username:this.message.name,
//        password:this.message.password,
//        email:this.message.email,
//        pword:this.message.rPassword,
//      }).then(res => {
//          console.log(res);
//        });
//      this.$router.push({path:'/mbList'});
//    },
//
//    //修改用户信息
//    modifyFun(){
//      API.post('/userInfo/modifyUser', {
//        id:localStorage.getItem('memberId'),
//        username:this.message.name,
//        password:this.message.password,
//        email:this.message.email,
//        status:Number(this.message.isAdmin),
//        pword:this.message.rPassword,
//      }).then(res => {
//          console.log(res);
//          if(res.data.message=='SUCCESS'){
//              this.successFlag=true;
//              setTimeout(()=>{
//                this.$router.push({path:'/mbList'});
//              },600);
//
//          }
//
//      });
//
//    },
//
//    //获取人员信息
//    getUserInfo(){
//      this.memberState=localStorage.getItem('memberState');
//      const mumberId=localStorage.getItem('memberId');
//      console.log(mumberId);
//      if(!isNaN(mumberId)){
//          //console.log(mumberId);
//        API.post('/userInfo/echoUserMessage ', {
//          id: localStorage.getItem('memberId')
//        }).then(res => {
//          console.log(res.data.data);
//          this.message.name=res.data.data.username;
//          this.message.email=res.data.data.email;
//          this.message.password=res.data.data.password;
//          this.message.isAdmin=Boolean(Number(res.data.data.status));
//        })
//      }
//    },
//    //管理员选择
//    handleChecked(){
//      console.log('123')
//    }
//  },
//  created() {
//    this.getUserInfo()
//  },
//  computed:{
//     /* userName() {
//          var text;
//          if(this.message.isAdmin) {
//              text = '管理员';
//          }else {
//              text = '用户';
//          }
//          console.log(Number(this.message.isAdmin));
//          return text;
//      }*/
//  },
//}


</script>

<style lang="scss">
  .memberAdd{
    .title{
      height: 64px;
      line-height: 64px;
      padding-left: 26px;
      border-bottom:1px solid #eaeaea;
      h2{
        font-size: 16px;
      }
    }
    .addCon{
      padding: 20px 29px 0;
      .el-form-item__label{
        text-align: left;
        width: 80px !important;
      }
      .el-form-item__content{
        margin-left: 80px !important;
      }
      .el-checkbox{
        padding-left: 14.5%;
      }
    }
    .btn{
      padding:30px 0 0 20%;
      button{
        width: 110px;
        height: 36px;
        background: #077ce7;
      }
    }
    .tips{
      padding-left: 12px;
      margin: 20px 29px 0;
      height:37px;
      line-height: 37px;
      border-left: 3px solid #077ce7;
      box-shadow: 3px 2px 4px #ddd ;
    }

  }
</style>
