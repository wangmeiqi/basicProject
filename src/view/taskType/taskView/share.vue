<template>
  <div class="shareCon">
      <div class="shareLeft">
        <div class="leftTop">
          <div class="pullBtn">
            <a href="javascript:;">所有分享</a>
            <span class="el-icon-arrow-down"></span>
          </div>
          <div class="addBtn">
            <span>+</span>
            <a href="javascript:;">添加分享</a>
          </div>
        </div>
        <div class="leftCon">
          <div class="empty" style="display: none">
            <p class="pic icon iconfont icon-wenjian2"></p>
            <p class="text">目前还没有分享</p>
          </div>
          <ul class="list">
            <li class="active">
              <div class="avatar"></div>
              <div class="listCon">
                <p class="title">www</p>
                <p class="info">
                  <span class="who">www</span>
                  <i>发布于</i>
                  <span class="time">今天 13:42</span>
                </p>
              </div>
            </li>
            <li>
              <div class="avatar"></div>
              <div class="listCon">
                <p class="title">www</p>
                <p class="info">
                  <span class="who">www</span>
                  <i>发布于</i>
                  <span class="time">今天 13:42</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="shareRight">
        <!--详情展示-->
        <div class="con">
          <div class="rightTitle">
            <h4>分享内容标题</h4>
            <div class="menuRight">
              <span class="dig"></span>
              <span class="el-icon-arrow-down"></span>
            </div>
          </div>
          <div class="rightCon">分享内容</div>
          <div class="tag">
            <div class="tagT">
              <span class="icon iconfont icon-biaoqian"></span>
              <i>标签</i>
            </div>
            <div class="tagAdd">
              <div class="add">添加标签</div>
              <ul>
                <li></li>
              </ul>
            </div>
            <div class="tagMask" style="display:none">
                <div class="tagMaskTitle">
                    <el-input placeholder="搜索标签"></el-input>
                    <span>+</span>
                </div>
                <ul class="tagMaskList">
                    <li><span></span><i>标签标签</i></li>
                    <li><span></span><i>标签标签</i></li>
                </ul>
            </div>
          </div>

          <div class="relation">
            <div class="relaT">
              <span class="icon iconfont icon-guanlian"></span>
              <i>关联内容</i>
            </div>
            <div class="add">
              <span>+</span>
              <a href="javascript:;">添加关联</a>
            </div>
          </div>
          <div class="actor">
            <p>参与者</p>
            <ul>
              <li><img src="../../../assets/images/houtaiguanli.png" alt=""></li>
              <li class="last">+</li>
            </ul>
          </div>
          <div class="operate">
            <ul>
              <li>
                <div class="left">
                  <span class="pic icon iconfont icon-jiaren"></span>
                  <p>
                    <span>MM</span>
                    <span>创建了</span>
                    <span>分享</span>
                  </p>
                </div>
                <div class="right">12分钟前</div>
              </li>
              <li>
                <div class="left">
                  <span class="pic icon iconfont icon-jiaren"></span>
                  <p>
                    <span>MM</span>
                    <span>创建了</span>
                    <span>分享</span>
                  </p>
                </div>
                <div class="right">12分钟前</div>
              </li>
            </ul>
          </div>
        </div>

        <!--编辑-->
        <div class="edit">
          <div class="editCon"></div>
        </div>
      </div>
  </div>
</template>

<script>

  export default {
      components:{

      }
  }

</script>

<style scoped lang="scss">
  .shareCon{
    display:flex;
    margin:0 50px;
    
    height: 100%;
    background: #fff;

  /*分享左侧内容*/
    .shareLeft{
      width:37%;
      border-right: 1px solid #e0e0e0;
      /*左侧头部*/
      .leftTop{
        display:flex;
        font-size: 12px;
        height:70px;
        line-height:70px;
        border-bottom:1px solid #e0e0e0;
        padding:0 20px;
        justify-content: space-between;
        a{
          text-decoration: none;
          color:#999;
        }
        /*所有分享*/
        .pullBtn{
          span{
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
          }
        }
        /*添加分享*/
        .addBtn{
          a{
            color: #077ce7;
            margin-left: 5px;
          }
          span{
            font-size: 16px;
            color: #fff;
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 16px;
            text-align: center;
            border-radius: 50%;
            background: #077ce7;
          }
        }
      }
      /*左侧内容*/
      .leftCon{
        height:85%;
        display: flex;
        justify-content:center;
      /*无数据时展示内容*/
        .empty{
          margin-top:100px;
          p{
            &.pic{
               font-size: 50px;
               color: #ccc;
               display: flex;
               justify-content:center;
             }
            &.text{
               font-size: 12px;
               color: #ccc;
             }

          }
        }
        /*列表内容*/
        ul.list{
          font-size: 12px;
          width:100%;
          height: 100%;
          overflow:auto;
          li{
            box-sizing:border-box;
            cursor: pointer;
            width: 100%;
            height: 71px;
            padding:20px;
            display:flex;
            justify-content: flex-start;
            border-bottom:1px solid #eee;
            &:hover{
               background: #f9f9f9;
            }
            &.active{
               background: #f9f9f9;
             }
            .avatar{
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-image: url("../../../assets/images/houtaiguanli.png");
              background-size: cover;
              background-repeat: no-repeat;
              margin-right: 10px;
            }
            .listCon{
              p{
                &.title{

                 }
                &.info{
                   color:#a6a6a6;
                i{
                  font-style: normal;
                }

                }
              }

            }
          }
        }
      }

    }
  /*分享右侧内容*/
    .shareRight{
      position: relative;
      width:63%;
      .con{
        height: 70%;
        overflow: auto;
      }
     /*详情标题*/
      .rightTitle{
        box-sizing:border-box;
        width:100%;
        padding: 20px 20px 16px;
        display: flex;
        justify-content: space-between;
        h4{
          font-size: 12px;
          font-weight: bold;
        }
        .menuRight{

        }
      }
    /*详情内容*/
      .rightCon{
        height: 35px;
        font-size: 12px;
        margin: 0 20px;
        border-bottom: 1px solid #e0e0e0;
      }
      /*详情标签*/
      .tag{
        position: relative;
        display:flex;
        justify-content: flex-start;
        font-size: 12px;
        padding: 20px 0;
        margin: 0 20px;
        border-bottom: 1px solid #e0e0e0;
        .tagT{
          width:20%;
          span{
            vertical-align: middle;
          }
          i{
            margin-left: 8px;
            font-style: normal;
          }
        }
        .tagAdd{
          .add{
            color: #0a7ee9;
            cursor: pointer;
          }
        }
        /*点击添加标签弹框*/
        .tagMask{
          box-sizing: border-box;
          position: absolute;
          left:150px;
          top: 40px;;
          z-index: 10;
          width: 230px;
          height: 210px;
          background: #fff;
          box-shadow:0px 0px 6px #ddd ;
          padding:0 10px;
          .tagMaskTitle{
            display: flex;
            justify-content: space-between;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            color: #ccc;
            border-bottom: 2px solid #efefef;
            .el-input{
              width: 80%;
              input.el-input__inner {
                border: none !important;
                padding: 0 10px !important;
              }
            }
            span{
              cursor: pointer;
              width: 16px;
              height: 16px;
              line-height: 14px;
              font-size: 18px;
              text-align: center;
              border-radius: 50%;
              border: 1px solid #1d88eb;
              color: #1d88eb;
              margin-top: 10px;
            }

          }
          .tagMaskList{
            height:75%;
            overflow:auto;
            margin-top:10px;
            li{
              cursor: pointer;
              padding: 10px 0;
              font-size:12px;
              span{
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #69b6fd;
                margin-right: 10px;
              }
              i{
                font-style: normal;
              }
            }
          }
        }

      }
      /*关联内容*/
      .relation{
        margin: 0 20px;
        font-size:12px;
        padding:30px 0;
        border-bottom: 1px solid #e0e0e0;
        .relaT{
          margin-bottom:10px;
          span{
            font-size: 14px;
          }
          i{
            margin-left: 10px;
            font-style: normal;
          }

        }
        .add{
          span{
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 16px;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            background: #077ce7;
            margin-right: 10px;
          }
          a{
            color: #0a7ee9;
            text-decoration: none;
          }
        }

      }
    .actor{
      padding:30px 20px 0 20px ;
      p{
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 12px;
      }
      ul{
        display:flex;
        flex-wrap: wrap;
        border-bottom:1px solid #e0e0e0;
        padding-bottom:30px;
        li{
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
          img{
            width:100%;
            height:100%;
          }
        }
        li.last{
          font-size: 24px;
          line-height: 28px;
          color: #fff;
          text-align: center;
          background: #077ce7;
        }
      }
    }
  /*分享*/
   .operate{
     font-size: 12px;
     padding:20px;
     ul{
       li{
         display:flex;
         justify-content: space-between;
          line-height:35px;
         .left{
           display:flex;
           justify-content: flex-start;
           span.pic{
             margin-right: 20px;
           }
         }
       }
     }

   }
  .edit{
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height:30%;
    background: #f1f1f1;
    padding: 20px 16px;
  }
    }

  }
</style>
