<template>
  <el-dialog :visible.sync="dialogVisible" width="570px" append-to-body  center top="10vh" custom-class="task">
    <h2 slot="title" class="task_title">
      {{task.title || ''}}
    </h2>
    <div class="task_body">
      <ul>
        <!-- <li class="task_list">
          <div class="task_list_check_box box-situation1"></div>
          <div class="task_list_img">
            <img src="http://keyprojecttbdata.hnatech.com/thumbnail/0113ed8726f85963fca99eb9f75d03a28e47/w/100/h/100">
          </div>
          <div class="task_list_content">
            <div class="task_list_wrap">
              <div class="task_list_info">
                <span class="task_list_name">123</span>
                <span class="task_list_label">任务</span>
                <span class="task_list_tag tag-yellow">asd</span>
                <div class="task_list_parent">
                  属于任务:<span>1111</span>
                </div>  
              </div>
              <div class="time">
                <span>上周四 截止</span>
              </div>
            </div>
          </div>
        </li> -->
        <li class="task_list" v-for="(item, index) in taskList" @click="openTaskEdit(item.id)" :key="index">
          <div class="task_list_check_box iconfont" @click.stop="changeState(item, index)" :class="item.state === 0 ? 'icon-xuanzekuang' : 'icon-xuanzekuang-xuanzhong'"></div>
          <div class="task_list_content">
            <div class="task_list_img" v-if="!item.user||!item.user.user_img">
              <img src="../assets/images/头像.png">
            </div>
            <div class="task_list_img" v-else>
              <img :src="item.user.user_img">
            </div>
            <div class="task_list_wrap">
              <div class="task_list_info">
                <p>
                  <span class="task_list_name">{{item.name}}</span>
                  <span class="task_list_label" @click.stop="changTaskType(item.tgid)">{{item.tname}}</span>
                </p>
                <p>
                  <span class="task_list_tag" :style="{'backgroundColor': d.bq_color}" v-for="(d, i) in item.lableList" :key="i">{{d.name}}</span>
                </p>
                <p class="task_list_parent" v-if="item.pid">
                  属于任务:<span>{{item.pname}}</span>
                </p>  
              </div>
              <div class="time" :class="{ 'important':item.imp}" v-if="item.endTime">
                <span>{{item.endTime}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <task-edit :taskId="taskEditId" v-if="taskEditFlag" @close="closeTaskEdit"></task-edit>
  </el-dialog>
</template>

<script>
import api from '../api/http'
import time from '../api/time'
import taskEdit from './taskEdit/taskEdit'
export default {
  name: 'taskSituationDialog',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    taskConfig: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    taskEdit
  },
  data () {
    return {
      dialogVisible: false,
      task: {
        title: '',
        type: 0
      },
      taskList: [],
      taskEditId: 0,
      taskEditFlag: false
    }
  },
  computed: {
    projectId () {
      return sessionStorage.getItem('projectId')
    }
  },
  methods: {
    changeState (item, index) {
      let self = this;
      api.get('task/getTaskPid', {
        pid: this.projectId
      }).then(res => {
        if(res.data.data){
          api.get('task/getTaskContent', {
            tid: item.id,
            stateChange:item.state === 0 ? 1 : 0
          }).then(res => {
            if(res.data.code==200){
              self.taskList.splice(index, 1)
              // self.taskList[index].state = self.taskList[index].state == 1?0:1;
            }
          })
        }
      })
    },
    getTaskList () {
      if (this.task.type === 0) {
        api.post('/tasks/findNoClaimTask',{
          proid: this.projectId
        }).then(res => {
          this.taskList = res.data.data
          this.taskList.forEach(v => {
            if (v.endTime == null || v.endTime == '') return ''
            let nowTime = new Date().getTime()
            v.imp = v.endTime < nowTime
            v.endTime = time.formatting(v.endTime)
          })
        })
      } else {
        api.post('/tasks/findTodayTask',{
          proid: this.projectId
        }).then(res => {
          this.taskList = res.data.data
          this.taskList.forEach(v => {
            if (v.endTime == null || v.endTime == '') return ''
            let nowTime = new Date().getTime()
            v.imp = v.endTime < nowTime
            v.endTime = time.formatting(v.endTime)
          })
        })
      }
    },
    closeTaskEdit () {
      this.taskEditFlag = false
    },
    openTaskEdit (id) {
      this.taskEditFlag = true
      this.taskEditId = id
    },
    changTaskType (id) {
      this.$store.commit('SET_TASKTYPEID', id)
    }
  },
  watch: {
    show () {
      this.dialogVisible = true
    },
    taskConfig () {
      this.task = this.taskConfig
      console.log(this.task)
      this.getTaskList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .task {
    &_title {
      font-size: 16px;
      font-weight: 500;
    }
    &_body {
      height: 532px;
      overflow-y: auto;
      border-top: 1px solid #eee;
    }
    &_list {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      padding: 12px 0;
      font-size: 14px;
      &:hover {
        background-color: #eee;
      }
      &_check_box {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        margin-top: 2px;
        margin-right: 12px;
        cursor: pointer;
      }
      &_content {
        cursor: pointer;
        display: flex;
        align-items: flex-start;
        font-size: 14px;
        .task_list_img {
          width: 24px;
          height: 24px;
          margin-right: 12px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .task_list_wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 20px;
          .task_list_info {
            width: 266px;
          }
        }
        .task_list_label {
          margin-left: 5px;
          color: #a6a6a6;
        }
        .task_list_label:hover {
          color: #3da8f5;
        }
        .task_list_tag {
          color: #fff;
          border-radius: 12px;
          height: 20px;
          padding: 0 6px;
          white-space:nowrap;
          margin-right: 4px;
        }
        .task_list_parent {
          color: #a6a6a6;
        }
      }
      .time {
        order: 1;
        font-size: 12px;
        margin-right: 5px;
        width: 143px;
        height: 20px;
        padding: 0 4px 0 20px;
        color: #a6a6a6;
        background: url('../assets/images/date_task_gray.png') #f1f1f1 no-repeat 4px center;
      }
      .time.important {
        color: #fff;
        background: url('../assets/images/task_date_1.png') #ff4f3e no-repeat 4px center;
      }
    }
    // 色系
    .tag-blue {
      background-color: #69B6FD;
    }
    .tag-green {
      background-color: #C3F182;
    }
    .tag-skyblue {
      background-color: #87D9F1;
    }
    .tag-purple {
      background-color: #8D9FEE;
    }
    .tag-yellow {
      background-color: #FDCD89;
    }
    .tag-pink {
      background-color: #F9978A;
    }
    .tag-red {
      background-color: #F94F4F;
    }
  }
</style>
