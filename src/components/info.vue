<template>
    <div>
      <div class="nvaheader">
        <div>
          <p style="cursor: pointer;" @click="pushHome">
            个人账号中心
          </p>
        </div>
        <div class="rightBox">
          <div class="header">
            <img :src="imgUrl" alt="">
          </div>
          <div class="rightName">
            <p>{{name}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import api from '../api/http'
    export default {
        name: "info",
        data(){
          return{
            imgUrl:'',
            name:''
          }
        },
        methods:{
          getData(){
            let bid =sessionStorage.getItem('userId')
            let params = {id:bid}
            api.get('/userInfo/getUserMessage',params).then(res=>{
              this.imgUrl=res.data.data.user_img
              this.name=res.data.data.username
            })
          },
          pushHome(){
            this.$router.push({
              path:'/home',
            })
          },
        },
      created:function(){
          this.getData()
      }
    }
</script>

<style scoped>
.nvaheader{
  width: 100%;
  height: 75px;
  background: #ffffff;
  display: flex;
  align-items: center;
}
.nvaheader>div >p{
  font-size: 20px;
  margin-left: 30px;
}
  .header{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: cyan;
  }
  .rightBox{
    display: flex;
    justify-content: center;
    position: absolute;
    right: 30px;
  }
  .rightName{
    margin-left: 10px;
  }
  .header>img{
    width: 100%;
    border-radius: 50%;
  }
</style>
