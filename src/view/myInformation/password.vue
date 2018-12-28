<template>
  <div>
    <div class="fatherBox">
      <div class="card password-change">
      	<div class="card-header">
      		<h4 class="card-title">登录密码</h4>
      	</div>
      	<div class="card-content">
      		<form class="form-horizontal info-group">
      			<div class="myInput">
      				<p><i style="color: red;padding-right: 6px;">*</i>旧密码</p> 
      				<div class="inputBox">
      					<el-input v-model="oldPassword" type="password"></el-input>
      				</div>
      			</div>
      			<div class="myInput">
      				<p ><i style="color: red;padding-right: 6px;">*</i>新密码</p> 
      				<div class="inputBox">
      					<el-input v-model="newPassword" type="password"></el-input>
      				</div>
      			</div>
      			<div class="myInput">
      				<p ><i style="color: red;padding-right: 6px;">*</i>确认新密码</p> 
      				<div class="inputBox">
      					<el-input v-model="confirmPassword" type="password"></el-input>
      				</div>
      			</div>
      			<div class="myInput">
      				<div class="saveBotton" @click="saveBotton">
      					保存
      				</div>
      			</div>
      		</form>
      	</div>
      </div>
    </div>
  </div>
</template>

<script>
		import api from '../../api/http'
    export default {
        name: "password",
        data(){
          return{
            oldPassword:'',// 旧密码
            newPassword:'', // 新密码
         	 	confirmPassword:''
          }
      },
        methods:{
        	saveBotton(){
        		    let bid =sessionStorage.getItem('userId')
        		    let confirmPassword = this.confirmPassword
        		    let data = {
			            uid:bid,
			            pword:this.oldPassword,
			            npword:this.newPassword,
			          }
			          if(this.oldPassword.trim()==''||this.newPassword.trim()==''||this.confirmPassword.trim()==''){
			          	 this.$message.error('请输入必填项');
			          	 return 
			          }else if(this.newPassword!=this.confirmPassword){
			          	this.$message.error('新密码跟确认密码不一致，请重新输入');
			          	 return 
			          }else{
			          	api.post('/userInfo/modifyPassword',data).then(res=>{
			           	 if(res.data.code==400){
			           			this.$message.error(res.data.message);
			           			 return 
			           		}else {
			           			if(this.newPassword==this.confirmPassword){
			          	    this.$message({
						          message: '密码修改成功',
						          type: 'success'
							        });
						          }
//			           			else{
//					          		this.$message.error('新密码跟确认密码不一致，请重新输入');
//					          	}
			           		}
			           		})
			          }
			           
			           
			           
			           
							
			         
        	}
        }
    }
</script>

<style scoped>
  .fatherBox{
    width: 640px;
    height: 570px;
    background: #ffffff;
  }
.myInput {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-left: 30px;
    margin-top: 20px;
}
.myInput>p {
    width: 20%;
    color: #808080;
    text-align: left !important;
    font-size: 14px;
}
.inputBox {
    width: 60%;
}
.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #333;
    display: inline-block;
    font-size: 12px;
    height: 35px;
    line-height: 35px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
}
.card-title{
	height: 40px;
	line-height: 40px;
	font-size: 14px;
	font-weight: 600;
	padding-left: 30px;
}
.saveBotton {
    width: 14%;
    background: deepskyblue;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #ffffff;
    border-radius: 5px;
    height: 40px;
    margin-left: 20%;
    cursor: pointer;
}
</style>
