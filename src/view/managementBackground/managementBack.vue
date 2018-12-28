<template>
  <div class="managementCon">
    <div class="header">
      <p>
        <span>栗然</span>
        <i>栗然</i>
      </p>
    </div>
    <div class="con">
      <div class="left">
        <ul class="list">
          <li v-for="(item,index) in memberTabs" :class="{active:tabIndex==index}" @click="tabChange(index);">{{item.name}}</li>
          <!--<li class="active" @click="$router.push({path:'/mbList'})">所有用户</li>
          <li>正常用户</li>
          <li @click="$router.push({path:'/mb'})">管理员</li>
          <li>禁用用户</li>-->
        </ul>
        <div class="search">
          <span class="icon iconfont icon-sousuo"></span>
          <input type="text" 	v-model="username" @blur="startSearch">
        </div>
        <div class="settings">
          <span class="icon iconfont icon-shezhi"></span>
          <i>高级设置</i>
        </div>
      </div>

      <div class="right">
        <router-view></router-view>
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
            tabIndex:0,//导航索引
            username:"",
            memberTabs: [{
              name: '所有用户',
            }, {
              name: '正常用户',
            }, {
              name: '管理员',
            }, {
              name: '禁用用户',
            }],

          }

      },
      computed:{
        ...mapGetters({
          getMbflag:"GET_MBFLAG"
        })
      },
     methods: {
       //切换左侧导航
       tabChange(index){
           this.setMbFlag(index);
           this.tabIndex = index;
           this.$router.push({path:'/mbList'});
         //alert(this.getMbflag)
       },
       startSearch() {
        
      },
          
       ...mapMutations({
          setMbFlag: "SET_MBFLAG"
       })
     }
  }

</script>

<style lang="scss">
  .managementCon{
    width: 100%;
    height: 100%;
    background: #f7f7f7;
    i{
      font-style: normal;
    }
  /*头部样式*/
    .header{
      box-sizing: border-box;
      width: 100%;
      height: 70px;
      line-height: 70px;
      background: #fff;
      padding-right: 95px;
      border-bottom: 1px solid #eaeaea;
      clear: both;
      p{
        float: right;
        cursor:pointer;
        span{
          font-size: 14px;
          color: #fff;
          display: inline-block;
          width: 40px;
          height: 40px;
          line-height: 38px;
          border-radius: 50%;
          text-align: center;
          background: #077ce7;
          margin-right: 10px;
        }
        i{
          font-size: 17px;
        }
      }
    }
    /*详情*/
    .con{
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 20px 210px 40px;
      .left{
        width: 32%;
        margin-right:20px;
        justify-content:space-between;
        ul{
          background:#fff;
          border-radius: 3px;
        li{
          box-sizing: border-box;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          height: 60px;
          color: #999;
          line-height: 60px;
          border-top:1px solid #eaeaea;
          padding-left: 21px;
          &.active{
             color: #333;
             font-weight: bold;
           }
          &:hover{
            background: #fafafa;
           }

        }
        }
        .search{
          box-sizing: border-box;
          margin: 20px 0;
          height: 40px;
          background: #fff;
          border-radius: 3px;
          padding-left: 20px;
          span{
            color:#999;
            margin-right: 5px;
          }
          input{
            width: 85%;
            height: 100%;
            border: none;
            outline: none;
            font-size: 16px;
          }
        }
        .settings{
          box-sizing: border-box;
          padding-left: 20px;
          width: 100%;
          height: 60px;
          line-height: 60px;
          background: #fff;
          border-radius: 3px;
          color: #999;
          font-size: 16px;
        }
      }
      .right{
        position: relative;
        width: 66%;
        height: 70vh;
        overflow: auto;
        background: #fff;
        border-radius: 3px;
        padding-bottom: 60px;
      }
      .right::-webkit-scrollbar{
      	width: 4px;
      	height: 16px;
      	background-color: #f5f5f5
      }
      .right::-webkit-scrollbar-track {
				-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
				border-radius: 10px;
				background-color: white;
			}
			/*定义滑块，内阴影及圆角*/
		
			.right::-webkit-scrollbar-thumb {
				/*width: 10px;*/
				height: 20px;
				border-radius: 10px;
				-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
				background-color: gainsboro;
			}


    }

  }
 .icon:hover{
 	cursor: pointer;
 	
 }

</style>
