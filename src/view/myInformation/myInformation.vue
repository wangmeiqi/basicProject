<template>
    <div>
      <info/>
      <div class="fatherBox">
        <div class="borderBox">
          <div class="leftBox">
            <div class="leftHeader">
              <div class="header">
                  <img v-if="imgUrl !=''" :src=imgUrl alt="">
                  <div v-if="imgUrl ==''" class="img">{{name[0]}}</div>
              </div>
              <div style="margin-left: 20px">
                <div>
                  <p>{{name}}</p>
                </div>
                <div>
                  <p>{{email}}</p>
                </div>
              </div>
            </div>
            <div class="borderD"></div>
            <div class="navList">
              <li v-for="(li ,index) in navList " class="navLi" @click="routerPush(index)">
                <p>{{li.name}}</p>
              </li>
            </div>
          </div>
          <div  class="rightBox">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import info from 'components/info'
    import api from 'api/http'
    import { mapGetters } from 'vuex'

    export default {
        name: "my-information",
      data(){
          return{
            imgUrl:'请您上传头像',
            name:'',
            navList:[
              {name:'个人信息'},
              {name:'账号密码'},
              {name:'安全设置'},
              {name:'邮件提醒'}
            ],
          }

      },
      components:{
        info,
      },
      methods:{
        //路由跳转
        routerPush(index){
          if(index === 0){
            this.$router.push({
              path: '/my'
            })
          }else if(index === 1) {
            this.$router.push({
              path: '/password'
            })
          }else if(index === 2){
            this.$router.push({
              path: '/security'
            })
          }else{
            this.$router.push({
              path:'/mail'
            })
          }

      },

        //获取头像
        getImg(){
          //console.log(this.getpassMy);
          let bid =sessionStorage.getItem('userId')
          let params = {id:bid}
          api.get('/userInfo/getUserMessage',params).then(res=>{
            this.imgUrl=res.data.data.user_img
            this.name=res.data.data.username
            this.email=res.data.data.email
          })
        }
      },

      computed: {
        ...mapGetters({
          getpassMy :'GET_PASSMY'
        }),
      },
      created:function(){
          this.getImg()
      },
      watch:{
        getpassMy(){
          //console.log('1111s');
          // this.getImg()
        },
          "$store.state.setImage"(){
             this.imgUrl = this.$store.state.setImage;
          },
          "$store.state.setName"(){
              this.name = this.$store.state.setName;
          }
      }
    }
</script>

<style scoped>
.fatherBox{
  position: absolute;
  top: 75px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #e7e7e7;
  display: flex;

}
.borderBox{
  width: 80%;
  display: flex;
  margin: 30px auto;

}
  .leftBox{
    width: 32.6530%;
    height: 330px;
    background: #ffffff;
  }
  .rightBox{
    width: 67.3469%;
    margin-left: 20px;
    overflow-y: scroll;
  }
  .borderD{
    width: 100%;
    height: 30px;
    background:#e7e7e7 ;
  }
  .navLi{
    height: 30px;
    display: flex;
    align-items: center;
    padding:10px 20px;


  }
  .navLi>p{
    font-size:18px;
    cursor: pointer;
  }
  .navLi:hover{
    background-color: #eeeeee;
  }
  .navList{
    box-shadow: rgba(0, 0, 0, .0470588) 0 2px 3px 0;
  }
  .leftHeader{
    height: 100px;
    display: flex;
    align-items: center;
    margin-left: 30px;
  }
  .header{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .header>img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
.img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: #ffae44;
    font-size:26px;
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
