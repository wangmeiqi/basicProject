<template>
  <div class="memberListCon">
    <div class="title">
      <p>用户数<i>·</i><span>{{totalNum}}</span></p>
      <div class="add" @click="addUserBtn()">
        <span>+</span>
        <a href="javascript:;">新增用户</a>
      </div>
    </div>
    <div class="list">
      <p class="listTitle">
        <span>姓名</span>
        <span>账号</span>
      </p>
        <ul class="listUl" >
          <li v-for="(item,index) in memberList" >
            <span>{{item.username}}
              <i class="dis" v-if="item.state==0&&item.state!=''">(被禁用）</i>
              <i class="man" v-if="item.status==1&&item.state==1">(管理员）</i>
            </span>
            <span>{{item.account}}</span>
            <div class="operate">
              <button class="edit" @click="editUserInfo(item.id)">编辑</button>
              <button class="disable" v-if="item.state==1||item.state==''" @click="changeState(item.id,0);">禁用</button>
              <button class="cancel" v-if="item.state==0&&item.state!=''" @click="changeState(item.id,1);">取消禁用</button>
              <!--<button :class="item.state==0 ? 'cancel' : 'disable' ">禁用</button>-->
            </div>
          </li>
        </ul>
      <!--分页-->
      <div class="block">
        <el-pagination
		      @size-change="sizeChange"
		      @current-change="currentChange"
		      :current-page.sync="page"
		      :page-size="pageSize"
		      layout="prev, pager, next, jumper"
		      :total="totalNum">
		    </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
  import API from 'api/http'
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    data(){
        return{
          memberList:[],
          listUrl:'/userInfo/getAllUserList',//切换左侧更换url
          totalNum:0,//总人数
          page:1,//当前页数
          pageSize:10,//每页显示数据条数
          stateFlag:false,//控制禁用/非禁用
          state:0,
          memberUrls:[
            {url:'/userInfo/getAllUserList'},//所有
            {url:'/userInfo/getNormalUserList'},//正常
            {url:'/userInfo/getAdminList'},//管理员
            {url:'/userInfo/getDisableUserList'},//禁用
          ],
        }
    },
    computed:{
      ...mapGetters({
        getMbflag:"GET_MBFLAG"
      })
    },
    methods: {
      //获取所有用户列表
      allMember() {
        API.get(this.memberUrls[this.getMbflag].url,{page:this.page,size:this.pageSize})
          .then(res => {
            console.log(res.data.data);
           this.memberList = res.data.data.allUser.list;
           this.totalNum=res.data.data.count;
            //state 0 禁用 1 非禁用
            //status 1管理员 0 非管理员
        })
      },
      //点击添加用户按钮
      addUserBtn(){
        this.$router.push({path:'/useroper'});
        localStorage.setItem('memberId',NaN);
        localStorage.setItem('memberState',0);//新增
      },
      //切换分页
      sizeChange(val) {
          console.log(123);
      },
      currentChange(res){
          this.page=res;
          API.get(this.listUrl,{page:this.page,size:this.pageSize})
          .then(res => {
          this.memberList = res.data.data.allUser.list;
          //state 0 禁用 1 非禁用
          //status 1管理员 0 非管理员
        })
      },
      //点击编辑按钮
      editUserInfo(id){
        console.log(id);
        localStorage.setItem('memberId',id);
        localStorage.setItem('memberState',1);//编辑
        this.$router.push({path:'/useroper'});
      },
      //更改禁用状态
      changeState(id,state){
        this.stateFlag = !this.stateFlag;
        API.post('/userInfo/modifyUserState', {
          id: id,
          state:state,
        }).then(res => {
          if(res.data.message=="SUCCESS"){
            this.allMember();
          }
        })
      }
    },

    created() {
      this.allMember()
    },

    watch:{
      getMbflag(){//点击左侧导航切换获取数据
        this.page = 1;
        //alert(this.getMbflag)
        this.listUrl=this.memberUrls[this.getMbflag].url;
        API.get(this.listUrl,{page:this.page,size:this.pageSize}).then(res => {
          console.log(res.data.data);
          this.memberList = res.data.data.allUser.list;
          this.totalNum=res.data.data.count;
          //state 0 禁用 1 非禁用
          //status 1管理员 0 非管理员
        })
      }
    }
  }

</script>

<style lang="scss">
  .memberListCon{
    *{
      box-sizing: border-box;
      font-style: normal;
    }
    .title{
      display: flex;
      height: 62px;
      line-height: 62px;
      justify-content:space-between;
      padding: 0 28px;
      p{
        font-size: 16px;
        color: #333;
        font-weight: bold;
        i{
          margin: 0 6px;
        }
      }
      .add{
        span{
          cursor: pointer;
          font-size: 20px;
          display: inline-block;
          width: 27px;
          height: 27px;
          line-height: 25px;
          border-radius: 50%;
          text-align: center;
          background: #077ce7;
          color: #fff;
        }
        a{
          text-decoration: none;
          color: #666;
          font-size: 15px;
        }
      }
    }
   .list{
      font-size:12px;
     .listTitle{
       display:flex;
       justify-content:flex-start;
       height: 60px;
       line-height: 60px;
       padding:0 28px;
       border-bottom:1px solid #eaeaea;
       span{
         width: 33.3%;
         color: #999;

       }
     }
    ul.listUl {
      li{
        padding: 0 28px;
        display:flex;
        justify-content:flex-start;
        height:60px;
        line-height:60px;
        border-bottom:1px solid #eaeaea;
        span{
          width: 33.3%;
          text-overflow : ellipsis;
          white-space : nowrap;
          overflow : hidden;
          i{
            font-size: 12px;
            margin-left: 5px;
            &.dis{
               color: #a0a1a0;
             }
            &.man{
               color: #ff3c00;
             }

          }
        }
        .operate{
          button{
            cursor: pointer;
            padding: 8px 20px;
            background: #fff;
            border: 1px solid #077ce7;
            color: #077ce7;
            border-radius: 3px;
            &.edit{
             margin-right:15px;
              &:hover{
                background: #077ce7;
                color: #fff;
               }

             }
            &.disable{
              border: 1px solid #ef5520;
              color:#ef5520;
              &:hover{
                 background: #ef5520;
                 color: #fff;
               }
             }
            &.cancel{
              border: 1px solid #808080;
               color:#808080;
              &:hover{
                 background: #808080;
                 color: #fff;
               }
             }
          }
        }
      }
    }
    .block{
    	width: 45.7%;
    	background: white;
      position: fixed;
      bottom: -3px;
      left: 38.9vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
   }
  }

</style>

