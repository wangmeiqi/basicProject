<template>
  <el-dialog title="项目动态" :visible.sync="show" top="10vh" center append-to-body>
    <div class="model">
      <header>
        <div class="member nav">
          <div @click.stop="memberFilter">
            <span>成员</span>
            <i class="iconfont icon-xiala2"></i>
            <div class="budge" v-if="selectMemberList.length !== 0">
              <i class="iconfont icon-duihao"></i>
            </div>
          </div>
          <el-card v-if="showMemberFilter">
            <el-input v-model="memberName" size="small" placeholder="查找成员"></el-input>
            <div class="members">
              <div class="all-member" @click.stop="selectAll">
                <div class="all-img">
                  <div class="img">
                    <i class="iconfont icon-renyuan"></i>
                  </div>
                  <div>所有成员</div>
                </div>
                <div class="iconfont icon-duihao" v-if="selectMemberList.length === 0"></div>
              </div>
              <ul>
                <li class="member-list" @click.stop="selectUser(index, item)" v-for="(item, index) in memberListMol" :key="index">
                  <div class="info">
                    <!--<div class="img" v-if="!item.user_img">-->
                      <!--<img src="../assets/images/头像.png" alt="">-->
                    <!--</div>-->
                    <!--<div class="img" v-else>-->
                      <!--<img :src="item.user_img" alt="">-->
                    <!--</div>-->
                      <img class="photo" v-if="item.user_img !=''" :src=item.user_img alt="">
                      <div class="photo" v-if="item.user_img ==''" >{{item.username[0]}}</div>
                    <div class="name">
                      {{item.username}}
                    </div>
                  </div>
                  <div class="iconfont icon-duihao" v-if="selectMemberList.includes(item.sort)"></div>
                </li>
              </ul>
            </div>
          </el-card>
        </div>
        <!--<div class="line"></div>-->
        <div class="type nav">
          <!--<div @click.stop="typeFilter">-->
            <!--<span>类型</span>-->
            <!--<i class="iconfont icon-xiala2"></i>-->
            <!--<div class="budge" v-if="selectTypeList.length !== 0 && !selectTypeList.includes(0)">-->
              <!--<i class="iconfont icon-duihao"></i>-->
            <!--</div>-->
          <!--</div>-->
          <!--<el-card v-if="showTypeFilter">-->
            <!--<ul>-->
              <!--<li v-for="(item, index) in typeList" :key="index" class="type-list" @click.stop="selectType(item, index)">-->
                <!--<div class="type-contnt">-->
                  <!--<div class="icon">-->
                    <!--<i class="iconfont" :class="item.class"></i>-->
                  <!--</div>-->
                  <!--<span>{{item.name}}</span>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<i class="iconfont icon-duihao" v-if="selectTypeList.includes(index)"></i>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</el-card>-->
        </div>
        <!--<div class="line"></div>-->
        <div class="time nav">
          <!--<div>-->
            <!--<span>时间</span>-->
            <!--<i class="iconfont icon-xiala2"></i>-->
          <!--</div>-->
          <!-- <el-card>
            <el-date-picker v-model="value3" type="week" format="yyyy 第 WW 周" placeholder="选择周"></el-date-picker>
            <div>{{value3}}</div>
          </el-card> -->
        </div>
      </header>
      <section>
        <ul class="list">
          <li :class="{'nomember':dynamicList.type !== 13}" v-for="(item, index) in dynamicList" :key="index" @click="openTaskDetail(item)">
            <div class="photo" v-if="item.user.user_img !== ''" :style="{'backgroundImage': `url(${item.user.user_img})`}"></div>
            <div class="photo" v-else></div>
            <div class="content">
              <div class="info">
                <span class="user">
                  {{item.info1}}
                </span>
                <span class="doing">
                  {{item.info2+':'}}
                </span>
                <span class="do-name">
                  {{item.info3}}
                </span>
              </div>
              <div class="time">
                <span class="day">{{item.createTime.split(' ')[0]}}</span>
                <span class="date">{{item.createTime.split(' ')[1]}}</span>
              </div>
            </div>
          </li>
          <!-- <li class="nomember">
            <div class="photo"></div>
            <div class="content">
              <div class="info">
                <span class="user">
                  测试A
                </span>
                <span class="doing">
                  完成了任务:
                </span>
                <span class="do-name">
                  三疙瘩四棒槌
                </span>
              </div>
              <div class="time">
                <span class="day">11月21日</span>
                <span class="date">12:07</span>
              </div>
            </div>
          </li>
          <li class="nomember">
            <div class="photo"></div>
            <div class="content">
              <div class="info">
                <span class="user">
                  测试A
                </span>
                <span class="doing">
                  完成了任务:
                </span>
                <span class="do-name">
                  三疙瘩四棒槌
                </span>
              </div>
              <div class="time">
                <span class="day">11月21日</span>
                <span class="date">12:07</span>
              </div>
            </div>
          </li>
          <li>
            <div class="photo"></div>
            <div class="content">
              <div class="info">
                <span class="user">
                  测试A
                </span>
                <span class="doing">
                  邀请 123321 加入项目
                </span>
                <span class="do-name">
                </span>
              </div>
              <div class="info-body" @click.stop="handlePopover">
                <div class="member-photo"></div>
                <div class="member-info">
                  <div class="name">123123</div>
                  <div class="email">11@11.com</div>
                </div>
              </div>
              <div class="time">
                <span class="day">1月22日</span>
                <span class="date">12:07</span>
              </div>
            </div>
          </li>
          <li>
            <div class="photo"></div>
            <div class="content">
              <div class="info">
                <span class="user">
                  测试A
                </span>
                <span class="doing">
                  完成了任务:
                </span>
                <span class="do-name">
                  三疙瘩
                </span>
              </div>
              <div class="info-body" @click.stop="handlePopover">
                <div class="member-photo"></div>
                <div class="member-info">
                  <div class="name">123123</div>
                  <div class="email">11@11.com</div>
                </div>
              </div>
              <div class="time">
                <span class="day">1月22日</span>
                <span class="date">12:07</span>
              </div>
            </div>
          </li> -->
        </ul>
      </section>
      <task-edit v-if="editTaskFlag" :taskId="editTaskId" @close="closeTaskEdit"></task-edit>
    </div>
  </el-dialog>
</template>

<script>
import api from '../api/http'
import time from '../api/time'
import taskEdit from './taskEdit/taskEdit'
export default {
  name: 'proDynamic',
  props: {
    showProDynamic: {
      type: Boolean,
      default: false
    }
  },
  components: {
    taskEdit
  },
  data () {
    return {
      value3: '',
      show: false,
      // 成员筛选
      showMemberFilter: false,
      memberName: '',
      memberList: [],
        memberListMol:[],
      selectMemberList: [],
      selectMemberIdList: [],
      showTypeFilter: false,
      typeList: [
        {
          name: '所有类型',
          type: '0',
          class: 'icon-ziyuan'
        },
        {
          name: '任务',
          type: '10',
          class: 'icon-icon-test1'
        },
        {
          name: '分享',
          class: 'icon-gongxiangtubiaozhuangtaileicaozuolei22'
        },
        {
          name: '文件',
          type: '14',
          class: 'icon-wenjian'
        },
        {
          name: '日程',
          type: '11',
          class: 'icon-rili2'
        },
        {
          name: '账目',
          class: 'icon-icon-test21'
        },
        {
          name: '标签',
          type: '15',
          class: 'icon-biaoqian'
        },
        {
          name: '消息',
          class: 'icon-xiaoxi'
        }
      ],
      selectTypeList: [0],
      selectScreen: [],
      dynamicList: [],
      editTaskFlag: false,
      editTaskId: 0
    }
  },
  computed: {
    queryProjectDynamic () {
      return {
        projectId: sessionStorage.getItem('projectId'),
        userId: '',
        startTime: '',
        endTime: ''
      }
    },
    dynamicLists () {

    }
  },
  methods: {
    closeTaskEdit () {
      this.editTaskFlag = false
    },
    openTaskDetail (data) {
      if (data.type == 10 && data.operation !== '删除任务') {
        this.editTaskFlag = true
        this.editTaskId = Number(data.content)
      }
    },
    memberFilter () {
      this.showTypeFilter = false
      this.getProUser()
      this.showMemberFilter = !this.showMemberFilter
    },
    // 选中成员
    selectUser (data,item) {
      if (this.selectMemberList.includes(item.sort)) {
        let index = this.selectMemberList.indexOf(item.sort)
        this.selectMemberList.splice(index, 1)
        this.selectMemberIdList.splice(index, 1)
      } else {
        this.selectMemberList.push(item.sort)
        this.selectMemberIdList.push(item.id)
      }
      //console.log(this.memberList,123456789)
      let params = {
        projectId: sessionStorage.getItem('projectId'),
        userId: this.selectMemberIdList.join(',')
      }
      this.getALlProDynamic(params)
    },
    // 选中所有成员
    selectAll () {
        this.selectMemberIdList = [];
      this.selectMemberList.splice(0, this.selectMemberList.length)
      this.getALlProDynamic(this.queryProjectDynamic)
    },
    // 选中类型
    typeFilter () {
      this.showMemberFilter = false
      //this.showTypeFilter = !this.showTypeFilter
    },
    selectType (item, data) {
      if (data === 0) {
        this.selectTypeList.splice(0, this.selectTypeList.length)
        this.selectTypeList.push(data)
      } else {
        let index = this.selectTypeList.indexOf(0)
        let flag = this.selectTypeList.indexOf(data)
        if (index !== -1) {
          this.selectTypeList.splice(index, 1)
        }
        if (flag !== -1) {
          this.selectTypeList.splice(flag, 1)
        } else {
          this.selectTypeList.push(data)
        }
      }
      if (this.selectTypeList.length === 0) {
        this.selectTypeList.push(0)
      }
    },
    getALlProDynamic (params) {
      api.get('projects/getAllProjectLog', params).then(res => {
        //console.log(res)
        this.dynamicList = []
        if(res.data.data.length === 0) return
        this.dynamicList = res.data.data
        this.dynamicList.forEach(v => {
          v.createTime = time.formatting(v.createTime)
        })
        // 标签 15
        // content
        // 任务 10
        // 项目 9
        // 文件 14
        // 成员 13
        // 日程 11
      })
    },
    getProUser () {
      api.get('projects/getUserByPid',{
        pid: sessionStorage.getItem('projectId'),
        eid: sessionStorage.getItem('enterpriseId')
      }).then(res => {
          for(let i=0,le=res.data.data.length;i<le;i++){
              res.data.data[i].sort = i
          }
          this.memberList = res.data.data;
          this.memberListMol = res.data.data;
          if(this.memberName){
              this.memberListMol = []
              this.memberList.map(el => {
                  if(el.username.indexOf(this.memberName) > -1){
                      this.memberListMol.push(el)
                  }
              })
          }
      })
    }
  },
  watch: {
    showProDynamic () {
      this.show = true
        this.selectMemberList.splice(0, this.selectMemberList.length);
      this.getALlProDynamic(this.queryProjectDynamic)
    },
      memberName(val){
          if(val != ''){
              this.memberListMol = []
              this.memberList.map(el => {
                  if(el.username.indexOf(val) > -1){
                      this.memberListMol.push(el)
                  }
              })
          }else{
              this.memberListMol = []
              this.memberList.map(el => {
                  this.memberListMol.push(el)
              })
          }
      }
  }
}
</script>

<style lang="scss" scoped>
  .model {
    height: 60vh;
    overflow-x: hidden;
    overflow-y: auto;
    header {
      display: flex;
      border-top: 1px solid #a6a6a6;
      border-bottom: 1px solid #a6a6a6;
      .nav {
        position: relative;
        flex: 1;
        text-align: center;
        line-height: 20px;
        padding: 10px 0;
        color: #a6a6a6;
        &:hover {
          color: #3da8f5;
        }
        .budge {
          position: absolute;
          top: 0;
          left: 124px;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          background-color: #3da8f5;
          color: #fff;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          transform: scale(0.5)
        }
        .el-card {
          position: absolute;
          top: 40px;
          text-align: left;
          color: #a6a6a6;
        }
        &.member {
          .el-card {
            .members {
              height: 230px;
              overflow-y: auto;
              .all-member {
                margin-top: 5px;
                padding: 5px 5px 5px 0;
                display: flex;
                justify-content: space-between;
                .all-img {
                  display: flex;
                  .img {
                    width: 24px;
                    height: 24px;
                    margin-right: 10px;
                    text-align: center;
                    line-height: 24px;
                    color: #fff;
                    background-color: #3da8f5;
                    border-radius: 50%;
                  }
                }
                &:hover {
                  background-color: #f7f7f7;
                }
              }
              .member-list {
                padding: 5px 5px 5px 0;
                display: flex;
                justify-content: space-between;
                .info {
                  display: flex;
                  img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    margin-right: 10px;
                  }
                }
                &:hover {
                  background-color: #f7f7f7;
                }
              }
            }
          }
        }
        &.type {
          .el-card {
            width: 200px;
            .type-list {
              display: flex;
              justify-content: space-between;
              padding: 5px 0;
              line-height: 20px;
              .iconfont {
                font-size: 14px;
              }
              .type-contnt {
                display: flex;
                .icon {
                  width: 24px;
                  height: 24px;
                    line-height: 24px;
                  background-color: #3da8f5;
                  border-radius: 50%;
                  color: #fff;
                  text-align: center;
                  margin-right: 10px;
                }
              }
              &:hover {
                background-color: #f7f7f7;
              }
            }
          }
        }
        &.time {
          .el-card {
            width: 300px;
            right: 0;
          }
        }
      }
      .line {
        width: 1px;
        height: 20px;
        margin-top: 10px;
        background-color: #a6a6a6;
      }
    }
    section {
      .list {
        li {
          width: 100%;
          display: flex;
          padding: 10px 0;
          .photo {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-image: url('http://192.168.5.77:9092/gbfw/majorproject/image/1522651438996.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
          .content {
            padding-left: 4px;
            line-height: 30px;
            display: flex;
            width: calc(100% - 34px);
            justify-content: space-between;
            flex-flow: wrap;
            .info {
              .user {
                font-weight: bold;
              }
            }
            .info-body {
              position: relative;
              display: flex;
              width: 100%;
              height: 40px;
              align-items: center;
              line-height: 20px;
              .member-photo {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: url('http://192.168.5.77:9092/gbfw/majorproject/image/1522651438996.png') no-repeat center;
                background-size: 100% 100%;
                margin-right: 4px;
              }
            }
            .info-body:hover {
              cursor: pointer;
              background-color: #f1f1f1;
            }
            .time {
              font-size: 12px;
              color: #a4a4a4;
            }
          }
        }
        li.nomember:hover {
          cursor: pointer;
          background-color: #f1f1f1;
        }
      }
    }
  }
  ::-webkit-scrollbar{
    width: 2px;
    background-color: #f0f0f0;
  }
  ::-webkit-scrollbar-thumb{
    background-color: #C1C1C1;
    border-radius: 1px;
  }
    .photo {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #ffae44;
        margin-right: 10px;
        font-size:12px;
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

