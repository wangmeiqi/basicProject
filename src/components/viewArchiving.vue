<template>
  <el-dialog title="查看归档" :visible.sync="show" width="854px" top="10vh" append-to-body center>
    <el-container>
      <el-aside style="width: 200px">
        <ul>
          <li v-for="(item, index) in typeList" :key="index" @click="viewArchiv(index,item)" :class="selectType === index ? 'active' : ''">
            <i class="iconfont" :class="item.class"></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <ul v-if="selectTypeList.length !== 0">
          <li class="task" v-for="(item, index) in selectTypeList" :key="index">
            <div class="content">
              <div class="name">
                <i class="iconfont" :class="selectLabel.class"></i>
                <span>{{item.name}}</span>
              </div>
              <div class="time">
                <span class="date">
                  {{item.time.split(' ')[0]}}
                </span>
                <span class="hour">
                  {{item.time.split(' ')[1]}}
                </span>
              </div>
              <div class="tool">
                <span class="cancle" @click="cancleArchiving(item)">
                  <i class="iconfont icon-liebiaoxunhuan"></i>
                  <span>取消归档</span>
                </span>
                <span class="del" @click="delConfimArchiving(item)">
                  <i class="iconfont icon-shanchu1"></i>
                  <span>{{ '删除' + selectLabel.name}}</span>
                </span>
              </div>
            </div>
          </li>
        </ul>
        <div v-else class="no-search"></div>
        <el-dialog custom-class="cancle-dialog" title="取消归档" :visible.sync="showCancle" :modal="isModal" width="220px" top="40vh" center>
          <p>确认取消归档?</p>
          <el-button type="primary" @click="confirmArchiving">取消归档</el-button>
        </el-dialog>
        <el-dialog custom-class="cancle-dialog" :title="'删除'+selectLabel.name" :visible.sync="showDel" :modal="isModal" width="220px" top="40vh" center>
          <p>{{'确认删除'+selectLabel.name}}</p>
          <el-button type="primary" @click="delArchiving">删除</el-button>
        </el-dialog>
      </el-main>
    </el-container>
  </el-dialog>
</template>

<script>
import api from '../api/http'
import time from '../api/time'
export default {
  props: {
    showArchiving: false
  },
  data () {
    return {
      show: false,
      isModal: false,
      showCancle: false,
      showDel: false,
      typeList: [
        {
          name: '任务',
          type: 'task',
          class: 'icon-renwuwancheng'
        },
        {
          name: '分享',
          class: 'icon-gongxiangtubiaozhuangtaileicaozuolei22'
        },
        {
          name: '文件',
          type: 'file',
          class: 'icon-wenjian'
        },
        {
          name: '日程',
          type: 'schedule',
          class: 'icon-rili2'
        },
        {
          name: '账目',
          class: 'icon-icon-test21'
        },
        {
          name: '标签',
          type: 'label',
          class: 'icon-biaoqian'
        },
        {
          name: '文件夹',
          class: 'icon-weibiaoti5'
        },
        {
          name: '任务分组',
          class: 'icon-liebiao1'
        }
      ],
      selectTypeList: [],
      selectType: 0,
      cancle: {
        id: '',
        type: ''
      },
      deleteItem: {
        id: '',
        type: ''
      }
    }
  },
  computed: {
    selectLabel () {
      return this.typeList[this.selectType]
    }
  },
  methods: {
    viewArchiv (data,item) {
      this.selectType = data
      this.getTypeData(item.type)
    },
    getTypeData (types) {
      let id = sessionStorage.getItem('projectId')
      let params = {
        projectId: id,
        type: types
      }
      this.cancle.type = types
      this.deleteItem.type = types
      if (types === 'schedule') {
        api.get('schedule/queryAllScheduleArchive', params).then(res => {
          this.selectTypeList = res.data.data.map((v, i) => {
            return {
              name: v.title,
              time: time.formatting(v.updateTime),
              id: v.id
            }
          })
        })
      }else {
        api.get('projects/getArchives', params).then(res => {
          this.selectTypeList = []
          let data = res.data.data
          switch (types) {
            case 'task':
            data = data.taskList
            break
            case 'label':
            data = data.labelList
            break
            case 'file':
            data = data.fileList
          }
          // if (types === 'task') {
          //   data = data.taskList
          //   /*
          //     名称: name,
          //     归档时间: updateTime
          //     任务ID: id
          //   */
          // }
          if (data.length === 0) return
          this.selectTypeList = data.map((v,i) => {
            return {
              name: v.name,
              time: time.formatting(v.updateTime),
              id: v.id
            }
          })
        })
      }
    },
    cancleArchiving (data) {
      this.showCancle = true
      this.cancle.id = data.id
    },
    delConfimArchiving (data) {
      this.showDel = true
      this.deleteItem.id = data.id
    },
    confirmArchiving () {
      this.showCancle = false
      if (this.cancle.type === 'task') {
        let params = {
          eid: sessionStorage.getItem('enterpriseId'),
          projectId: sessionStorage.getItem('projectId'),
          taskId: this.cancle.id,
          type: 0
        }                             
        api.post('tasks/isFileTask', params).then(res => {
          if (res.data.message === 'SUCCESS') {
            this.selectTypeList.forEach((v, i) => {
              if (v.id == this.cancle.id) {
                this.selectTypeList.splice(i, 1)
              }
            })
          }
        })
      } else if (this.cancle.type === 'label') {
        let params = {
          lableId: this.cancle.id,
          type: 0
        }
        api.post('tasks/updLableSta', params).then(res => {
          if(res.data.message === 'SUCCESS') {
            this.selectTypeList.forEach((v, i) => {
              if (v.id == this.cancle.id) {
                this.selectTypeList.splice(i, 1)
              }
            })
          }
        })
      } else if (this.cancle.type === 'schedule') {
        let params = {
          id: this.cancle.id,
          eid: sessionStorage.getItem('enterpriseId'),
          pid: 1 || sessionStorage.getItem('projectId')
        }
        api.get('schedule/archiveScheduleCancel', params).then(res => {
          if(res.data.message === 'SUCCESS') {
            this.selectTypeList.forEach((v, i) => {
              if (v.id == this.cancle.id) {
                this.selectTypeList.splice(i, 1)
              }
            })
          }
        })
      } else if (this.cancle.type === 'file') {
        let params = {
          fileId: this.cancle.id,
          eid: sessionStorage.getItem('enterpriseId'),
          projectId: sessionStorage.getItem('projectId'),
          type: 0
        }
        api.post('projects/isFileState', params).then(res => {
          if(res.data.message === 'SUCCESS') {
            this.selectTypeList.forEach((v, i) => {
              if (v.id == this.cancle.id) {
                this.selectTypeList.splice(i, 1)
              }
            })
          }
        })
      }
    },
    delArchiving () {
      this.showDel = false
      if (this.deleteItem.type === 'task') {
        let params = {
          eid: sessionStorage.getItem('enterpriseId'),
          projectId: sessionStorage.getItem('projectId'),
          taskId: this.deleteItem.id,
        }
        api.post('tasks/delTask', params).then(res => {
          if (res.data.message === 'SUCCESS') {
            this.selectTypeList.forEach((v, i) => {
              if (v.id == this.deleteItem.id) {
                this.selectTypeList.splice(i, 1)
              }
            })
          }
        })
      } else if (this.deleteItem.type === 'label') {
        let params = {
          lableId: this.deleteItem.id
        }
        api.post('tasks/delLableTable', params).then(res => {
          if (res.data.message === 'SUCCESS') {
            this.selectTypeList.forEach((v, i) => {
              if (v.id == this.deleteItem.id) {
                this.selectTypeList.splice(i, 1)
              }
            })
          }
        })
      } else if (this.deleteItem.type === 'schedule') {
        let params = {
          id: this.deleteItem.id,
          eid: sessionStorage.getItem('enterpriseId'),
          pid: sessionStorage.getItem('projectId')
        }
        api.post('schedule/deleteSchedule', params).then(res => {
          if (res.data.message === 'SUCCESS') {
            this.selectTypeList.forEach((v, i) => {
              if (v.id == this.deleteItem.id) {
                this.selectTypeList.splice(i, 1)
              }
            })
          }
        })
      } else if (this.deleteItem.type === 'file') {
        let params = {
          fileId: this.deleteItem.id,
          eid: sessionStorage.getItem('enterpriseId'),
          projectId: sessionStorage.getItem('projectId')
        }
        api.post('projects/delProFile', params).then(res => {
          if (res.data.message === 'SUCCESS') {
            this.selectTypeList.forEach((v, i) => {
              if (v.id == this.deleteItem.id) {
                this.selectTypeList.splice(i, 1)
              }
            })
          }
        })
      }
    }
  },
  watch: {
    showArchiving () {
      this.show = true
      this.getTypeData('task')
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    width: 800px;
    height: 600px;
    color: #a6a6a6;
    border-top: 1px solid #f7f7f7;
    .el-aside {
      width: 200px;
      border-right: 1px solid #f7f7f7;
      ul {
        li {
          font-size: 14px;
          line-height: 20px;
          padding: 12px 0;
          &.active {
            color: #3da8f5;
          }
          &:hover {
            background-color: #f7f7f7;
            color: #3da8f5;
          }
        }
      }
    }
    .el-main {
      padding: 0;
      overflow-y: auto;
      ul {
        li {
          position: relative;
          line-height: 20px;
          padding: 0 20px;
          .content {
            display: flex;
            padding: 15px 0;
            justify-content: space-between;
            border-bottom: 1px solid #f7f7f7;
            .tool {
              display: none;
            }
          }
          &:hover {
            background-color: #f7f7f7;
            .content {
              .time {
                display: none;
              }
              .tool {
                display: block;
                span:hover {
                  color: #3da8f5;
                }
              }
            }
          }
          .el-card {
            position: absolute;
            top: 51px;
            right: 50px;
            width: 250px;
            .el-card__body {
              padding: 0;
            }
            .header {
              box-sizing: border-box;
              width: 100%;
              text-align: center;
              h2 {
                font-size: 16px;
                padding-bottom: 20px;
                font-weight: normal;
                border-bottom: 1px solid #f7f7f7;
              }
              i {
                position: absolute;
                top: 20px;
                right: 20px;
                cursor: pointer;
              }
            }
            p {
              line-height: 20px;
              margin: 15px 0; 
            }
            .foot {
              .el-button {
                width: 100%;
                height: 38px; 
              }
            }
          }
        }
      }
      .no-search {
        width: 100%;
        height: 100%;
        background: url('../assets/images/We.png') no-repeat center;
      }
      .cancle-dialog {
        p {
          margin-bottom: 15px;
        }
        .el-button {
          width: 100%;
          height: 38px;
        }
      }
    }
  }
</style>
