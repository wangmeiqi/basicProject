<template>
  <el-card class="popover" v-show="popoverVisible">
    <div class="popover-main" v-if="mainPanel">
      <div class="header">
        <div class="user-img">
          <img src="http://keyprojecttbdata.hnatech.com/thumbnail/0110887b0c9acebe5b55396d86a253a0c497/w/100/h/100" alt="">
        </div>
        <div class="user-info">
          <div class="name">{{member.name}}</div>
          <div class="email">{{member.email}}</div>
        </div>
        <div class="iconfont icon-guanbi close" @click="closePopover"></div>
      </div>
      <div class="main">
        <ul>
          <li @click="memberTask">
            <div>
              <i class="iconfont icon-xiangmuguanli"></i>
              <span>项目任务</span>
            </div>
          </li>
          <li @click="handleMember(member.type)">
            <div>
              <i class="iconfont icon-quanxian"></i>
              <span>项目权限设置</span>
            </div>
            <div class="type">
              {{member.type}}
            </div>
          </li>
        </ul>
        <div class="btn">
          <el-button type="primary">私信</el-button>
        </div>
      </div>
    </div>
    <div class="member-handle" v-if="memberPanel">
      <header>
        <i class="iconfont icon-jiantouyou-copy back" @click="backMainPanel"></i>
        <h2>项目权限设置</h2>
        <i class="iconfont icon-guanbi close" @click="closePopover"></i>
      </header>
      <section>
        <ul>
          <li @click="selectType(item)" v-for="(item, index) in memberType" :key="index">
            <div class="type">{{item}}</div>
            <div class="iconfont icon-duihao" v-if="member.type === item"></div>
          </li>
        </ul>
        <div class="remove" v-if="member.type !== '拥有者'" @click="removeMember">
          <el-button type="text">移除成员</el-button>
        </div>
      </section>
    </div>
    <task-situation-dialog :show="memberTaskFlag" :taskConfig="taskConfig"></task-situation-dialog>
  </el-card>
</template>

<script>
import taskSituationDialog from './taskSituationDialog'
export default {
  name: 'popover',
  components: {
    taskSituationDialog
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      popoverVisible: false,
      mainPanel: true,
      memberPanel: false,
      memberTaskFlag: false,
      taskConfig: {},
      member: {
        name: 'test',
        email: 'asde@qq.com',
        type: '管理员'
      },
      memberType: ['拥有者', '管理员', '成员']
    }
  },
  methods: {
    closePopover () {
      this.popoverVisible = false
    },
    handleMember () {
      this.mainPanel = false
      this.memberPanel = true
    },
    backMainPanel () {
      this.mainPanel = true
      this.memberPanel = false
    },
    selectType (data) {
      this.member.type = data
      this.backMainPanel()
    },
    removeMember () {
      this.closePopover()
    },
    memberTask () {
      this.memberTaskFlag = !this.memberTaskFlag
      this.taskConfig = {
        title: 'test的任务'
      }
    }
  },
  watch: {
    show (n,o) {
      if (n === true) {
        this.popoverVisible = true
      } else {
        this.popoverVisible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .popover {
    position: absolute;
    top: 60vh;
    right: 360px;
    z-index: 2;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 2px;
    box-shadow: 0 0 4px rgba(0,0,0,.15);
    width: 320px;
    &-main {
      .header {
        display: flex;
        position: relative;
        .user-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .user-info {
          width: 203px;
          .name {
            font-size: 16px;
            line-height: 24px;
          }
          .email {
            color: #a6a6a6;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .close {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
          cursor: pointer;
        }
      }
      .main {
        margin-top: 20px;
        padding-top: 5px;
        border-top: 1px solid #eee;
        li {
          display: flex;
          justify-content: space-between;
          line-height: 20px;
          padding: 10px 0;
          color: gray;
          font-size: 14px;
          cursor: pointer;
          i {
            margin-right: 8px;
          }
          &:hover {
            background-color: #f7f7f7;
          }
        }
        .btn {
          margin-top: 16px;
          .el-button {
            width: 100%;
            height: 38px;
            padding: 0;
          }
        }
      }
    }
    .member-handle {
      box-sizing: border-box;
      width: 100%;
      header {
        box-sizing: border-box;
        position: relative;
        padding: 0px 20px;
        h2 {
          box-sizing: border-box;
          width: 100%;
          padding: 10px 20px;
          text-align: center;
          line-height: 30px;
          font-weight: 500;
          border-bottom: 1px solid rgba(0,0,0,.07);
        }
        i {
          position: absolute;
          top: 10px;
          height: 30px;
          font-size: 20px;
          line-height: 30px;
          cursor: pointer;
        }
        .back {
          left: 10px;
        }
        .close {
          right: 10px;
        }
      }
      section {
        box-sizing: border-box;
        padding: 0 15px;
        ul {
          padding: 5px 0;
          li {
            display: flex;
            font-size: 14px;
            color: gray;
            justify-content: space-between;
            height: 40px;
            line-height: 40px;
            &:hover {
              background-color: #f7f7f7;
            }
          }
        }
        .remove {
          border-top: 1px solid #eee;
          .el-button {
            width: 100%;
            text-align: left;
            color: #ff3c00;
          }
        }
      }
    }
  }
</style>
