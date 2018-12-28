<template>
  <div>
    <div class="fatherBox">
      <div>
        <h4 style="margin-left: 25px;">个人信息</h4>
        <div class="myTitle">
          <p>头像</p>
          <div class="header">
              <img v-if="imgUrl !=''" :src=imgUrl alt="">
              <!--<img v-if="imgUrl ==''" src="../../assets/images/22登录_01.png" alt="">-->
              <div v-if="imgUrl ==''" class="img">{{name[0]}}</div>
          </div>
          <div style="margin-left: 20px" :listenChildEvent="listenChild">
            <upload @sendBase64="listenChild" title="编辑头像">更换头像</upload>
          </div>
        </div>
      </div>
      <div class="myInput">
        <p>姓名</p>
        <div class="inputBox">
          <el-input v-model="name" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="myInput">
        <p>职位</p>
        <div class="inputBox">
          <el-input v-model="position" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="myInput">
        <p>联系电话</p>
        <div class="inputBox">
          <el-input v-model="call" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="myInput">
        <p>生日</p>
        <div class="inputBox">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="myInput">
        <p>公司</p>
        <div class="inputBox">
          <el-input v-model="home" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="myInput">
        <p>部门</p>
        <div class="inputBox">
          <el-input v-model="department" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="myInput">
        <p>网址</p>
        <div class="inputBox">
          <el-input v-model="url" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="myInput">
        <div class="saveBotton" @click="saveBotton">
          	保存
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import upload from '../../components/upload'
    import api from '../../api/http'
    import { mapMutations } from 'vuex'
		import TIME from 'api/time'
    export default {
        name: "my",
      data(){
          return{
            imgUrl:'请您上传头像',// 头像地址
            name:'', // 姓名输入框
            position:'' ,//职位输入框
            call:'',//电话输入框
            home:'',// 公司
            department:'',//部门
            url:'',//网址
            value1: '',
            time:'',//时间戳
          }
      },

      methods:{
        ...mapMutations({
          setpassMy: 'SET_PASSMY',
            setImage:'SET_IMAGE',
            setName:'SET_NAME'
        }),
        //修改上传图片地址
        listenChild(data) {
          this.imgUrl = data
            this.setImage(data);
            //console.log(this.$store.state.setImage,666)
        },
        // 修改按钮
        saveBotton(){
          let bid =sessionStorage.getItem('userId')
          let data = {
            id:bid,
            username:this.name,
            phone:this.call,
            address:this.home,
            base64:this.imgUrl[0] == 'h' ? '':this.imgUrl,
            department:this.department,
            position:this.position,
            website:this.url,
            birthday:this.value1,
            user_img:this.imgUrl
          }
          api.post('/userInfo/modifyUserMessage',data).then(res=>{
            this.$message({
		          message: '修改成功',
		          duration:1000,
		          type: 'success'
		        })
              this.setName(this.name);
            this.setpassMy= !this.setpassMy;
          })

        },


        //时间戳转换
        getTime(){
          function timestampToTime(timestamp) {
            let date = new Date(timestamp)
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D;
          }
          timestampToTime(this.time);
          this.time=timestampToTime(this.time)
          this.value1 =this.time
          //console.log(this.time);
        },

        //页面加载时候数据
        getData(){
          //console.log(this.setpassMy);
          let bid =sessionStorage.getItem('userId')
          let params = {id:bid}
          api.get('/userInfo/getUserMessage',params).then(res=>{
            //console.log(res.data.data);
            this.name =res.data.data.username
            this.call =res.data.data.phone
            this.home =res.data.data.address
            this.imgUrl=res.data.data.user_img
            this.department=res.data.data.department
            this.position=res.data.data.position
            this.value1 =TIME.formatting(res.data.data.birthday)
//          this.getTime()
            this.url=res.data.data.website
          })

        },



    },
      components:{
          upload,
      },
      created:function(){
          this.getData()
      },
      watch:{
      	value1(val){
      		//console.log(val)
      	}
      }
    }
</script>

<style scoped>
  .fatherBox{
    padding: 10px 10px;
    width: 640px;
    background: #ffffff;
  }
  .myInput{
    display: flex;
    align-items: center;
    margin-left: 30px;
    margin-top: 30px;
  }
  .myInput>p{
    width: 20%;
    color: #808080;
    text-align: left !important;
    font-size: 14px;
  }
  .inputBox{
    width: 60%;
  }
  .myTitle{
    display: flex;
    margin-left: 30px;
    margin-top: 10px;

  }
  .myTitle>p{
    color: #808080;
    font-size: 14px;
  }
  .myTitle{
    display: flex;
    align-items: center;
  }
  .header{
    border-radius: 50%;
    margin-left:100px;
  }
  .header>img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .saveBotton{
    width: 14%;
    background: deepskyblue;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border-radius: 5px;
    height: 40px;
    margin-left: 20%;
    cursor: pointer;
  }
  .img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      background: #ffae44;
      font-size:38px;
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
</style>
