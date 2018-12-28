<template>
	<div class="taskInfoCon">
    <div class="taskInfoBtn icon iconfont icon-icon13" @click="taskInfoFun()"></div>
    <!-- <el-dialog :append-to-body="true" title="项目信息" :visible.sync="taskInfoVisible" width="600px" center class="fieldBox" @close="closeDialog()">
      <span >
        <div class="taskInfoCon">
          <div class="list">
            <ul class="taskFieldList" v-if="addFieldFlag">
              <li v-for="(item,index) in addedFieldList" :key="index">
                <p><span class="icon iconfont icon-liebiao1"></span> <i>{{item.name}}</i></p>
                <span class="del" @click="deleteFieldClick(item.id)">移除</span>
              </li>
            </ul>
            <ul class="taskFieldList" v-if="!addFieldFlag">
              <li v-for="(item,index) in taskInfoListAll" :key="index">
                <p>
                  <span v-show="item.type==3" class="icon iconfont icon-rili2"></span>
                  <span v-show="item.type==1||item.type==2" class="icon iconfont icon-liebiao1"></span>
                  <span v-show="item.type==4||item.type==5" class="icon iconfont icon-bianji3"></span>
                  <i>{{item.name}}</i>
                </p>
                <div v-show="item.type==1" class="options" @click="radioShow(index)">
                  <i>{{item.val}}</i>
                  <span class="icon iconfont icon-xiala" style="float: right"></span>
                  <div class="selectR">
                    <the-select  :index="index" @select="radioSelect($event)" :optionList="item.selectList" v-if="item.selected"></the-select>
                  </div>
                </div>
                <div v-show="item.type==2" class="options" @click="checkShow($event,index)">
                  <i>{{item.val}}</i>
                  <span class="icon iconfont icon-xiala" style="float: right"></span>
                  <div>
                    <the-select :index="index" @select="checkSelect($event)" :optionList="item.selectList" v-if="item.selected"></the-select>
                  </div>
                </div>
                <div class="options" v-show="item.type==3">
                  <el-date-picker v-show="!item.selected" @click="item.selected=!item.selected"
                    v-model="item.val"
                    type="datetime"
                    placeholder="选择日期时间" @blur="saveFieldFun(item.id,item.val,item.state,item.pid,item.type)">
                  </el-date-picker>
                  <span class="icon iconfont icon-rili2"></span>
                </div>
                <div v-show="item.type==4||item.type==5">
                  <div class="options" v-show="!item.selected" @click="item.selected=!item.selected">
                    <i>{{item.val}}</i>
                    <span class="icon iconfont icon-bianji1" style="float: right"></span>
                  </div>
                  <div class="editBox" v-show="item.selected">
                      <el-input v-model="item.val" placeholder="输入字段值"  v-if="item.type==4" type="number" ></el-input>
                      <el-input v-model="item.val" placeholder="输入字段值"  v-if="item.type==5" type="text" ></el-input>
                      <div class="btns">
                        <el-button @click="item.selected=!item.selected">取消</el-button>
                        <el-button type="primary" @click="item.selected=!item.selected;saveFieldFun(item.id,item.val,item.state,item.pid,item.type)">保存</el-button>
                      </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="addField" v-if="addFieldFlag">
            <p class="addFieldBtn" @click="getAddFieldList()">
              <span>+</span> <i>添加项目自定义字段</i>
            </p>
            <div class="taskEditList" v-show="taskFieldListFlag">
              <p class="search">
                <el-input v-model="searchName" placeholder="搜索自定义字段" @keyup.enter.native="searchList()"></el-input>
              </p>
              <ul>
                <li v-for="(item,$index) in taskFieldList" :key="$index" @click="selectField($index)">
                  <p><span class="icon iconfont icon-liebiao1"></span> <i>{{item.name}}</i></p>
                  <span class="icon iconfont icon-duihao" v-show="item.selected"></span>
                </li>
              </ul>
              <div class="listBtn">
                <el-button type="primary" @click="addFieldList()">保存</el-button>
              </div>
            </div>
            <span class="add" @click="clickSuccess()">完成</span>
          </div>
          <div class="managementField" v-if="!addFieldFlag">
            <p @click="alreadyFieldList()"><span class="icon iconfont icon-shezhi"></span> <i>管理项目信息</i></p>
          </div>
        </div>
      </span>
      <el-dialog width="30%" title="移除自定义字段" :visible.sync="deleteField" append-to-body center>
        <span>
          <p class="deleteContent">
            注意！删除该字段将会移除之前所有的数据，所有应用的项
            目资料也将不再展示该字段。
          </p>
          <el-button class="save deleteB" type="primary" @click="deleteFieldFun()">确认</el-button>
        </span>
      </el-dialog>
    </el-dialog> -->
    <project-info :isShow="showProjectInfo"></project-info>
	</div>
</template>

<script>
import API from "api/http";
import theSelect from "components/theSelect";
import projectInfo from '../../components/projectInfo'
export default {
  components: {
    theSelect,
    projectInfo
  },
  data() {
    return {
      showProjectInfo: false,
      type: "Number",
      taskInfoVisible: false, //控制弹框
      addFieldFlag: false, //控制添加字段盒子/添加字段值盒子
      deleteField: false,
      radioFlag: false,
      taskInfoListAll: [], //项目信息所有数据列表
      checkFlag: false,
      timeVal: "",
      editFlag: false,
      editVal: "",
      taskFieldList: [], //字段列表
      taskFieldListFlag: false,
      taskFieldVal: "", //选择完成添加的字段值
      searchName: "", //搜索字段列表
      addedFieldList: [], //已添加字段列表
      delFieldId: ""
    };
  },
  methods: {
    radioSelect(indexObj) {
      var optionIndex = indexObj.index; //选项index
      var liIndex = indexObj.parentIndex; //列表的index
      var curObj = this.taskInfoListAll[liIndex];
      curObj.val = curObj.selectList[optionIndex].name;
      curObj.selectList.forEach(function(item, index) {
        if (optionIndex == index) {
          item.selected = true;
          item.state = 1;
        } else {
          item.selected = false;
          item.state = 2;
        }
      });
      //后台发送请求
      var curL = curObj.selectList[optionIndex];
      this.saveFieldFun(
        curL.value,
        curL.name,
        curL.state,
        curL.pid,
        curObj.type
      );
    },
    checkSelect(indexObj) {
      var optionIndex = indexObj.index; //选项index
      var liIndex = indexObj.parentIndex; //列表的index
      var curObj = this.taskInfoListAll[liIndex];
      var curList = curObj.selectList;
      var str = [];
      curList.forEach(function(item, index) {
        if (index === optionIndex) {
          item.selected = !item.selected;
        }
        if (item.selected) {
          item.state = 1;
          str.push(item.name);
        } else {
          item.state = 2;
        }
      });
      if (str.length > 0) {
        curObj.val = str.join(",");
      } else {
        curObj.val = "待添加";
      }

      //发请求
      var curL = curObj.selectList[optionIndex];
      this.saveFieldFun(
        curL.value,
        curL.name,
        curL.state,
        curL.pid,
        curObj.type
      );
      curL.selected = true;
    },
    //字段列表选择事件
    selectField(index) {
      var item = this.taskFieldList[index];
      item.selected = !item.selected;
    },
    //搜索列表事件
    searchList() {
      this.getFieldListAjax();
    },
    //点击添加项目自定义字段列表展示
    getAddFieldList() {
      this.taskFieldListFlag = !this.taskFieldListFlag;
      if (this.taskFieldListFlag == true) {
        this.getFieldListAjax();
      }
    },
    /*自定义字段列表展示请求*/
    getFieldListAjax() {
      API.post("/projectFields/findpfId", {
        name: this.searchName,
        enterpriseId: sessionStorage.getItem("enterpriseId")
      }).then(res => {
        // console.log(res.data.data);
        var listArr = res.data.data;
        var fieldList = [];
        listArr.forEach(function(item, index) {
          var listobj = {};
          listobj.name = item.name;
          listobj.id = item.id;
          listobj.selected = false;
          fieldList.push(listobj);
        });
        this.taskFieldList = fieldList;
      });
    },
    //自定义字段选择保存
    addFieldList() {
      this.taskFieldListFlag = false;
      this.addListVal();
      API.post("/projectFields/updateProjectId", {
        projectId: sessionStorage.getItem("projectId"),
        ids: this.taskFieldVal
      }).then(res => {
        if (res.data.message == "SUCCESS") {
          this.alreadyFieldListAjax();
        }
      });
    },
    //获取已添加的值id传给后台
    addListVal() {
      var str = [];
      this.taskFieldList.forEach(function(item) {
        item.selected && str.push(item.id);
      });
      this.taskFieldVal = str.join(",");
    },
    //点击管理项目信息获取已添加列表
    alreadyFieldList() {
      this.addFieldFlag = !this.addFieldFlag;
      this.alreadyFieldListAjax();
    },
    //获取已添加列表的请求
    alreadyFieldListAjax() {
      API.post("/projectFields/findValues", {
        projectId: sessionStorage.getItem("projectId"), //项目id
        enterpriseId: sessionStorage.getItem("enterpriseId") //企业id
      }).then(res => {
        console.log(res.data.data);
        var listArr = res.data.data;
        var alreadyList = [];
        listArr.forEach(function(item, index) {
          var listobj = {};
          listobj.name = item.name;
          listobj.id = item.id;
          alreadyList.push(listobj);
        });
        this.addedFieldList = alreadyList;
      });
    },
    //移除已添加按钮
    deleteFieldClick(id) {
      this.deleteField = true;
      this.delFieldId = id;
    },
    //点击确认删除按钮
    deleteFieldFun() {
      this.deleteField = false;
      API.post("/projectFields/updateProjectId", {
        projectId: "",
        ids: this.delFieldId
      }).then(res => {
        //console.log(res);
        if (res.data.message == "SUCCESS") {
          this.alreadyFieldListAjax();
        }
      });
    },
    //项目信息列表展示
    taskInfoFun() {
      this.showProjectInfo = !this.showProjectInfo
    },
    taskInfoFunAjax() {
      API.post("/projectFields/findValues", {
        projectId: sessionStorage.getItem("projectId"), //项目id
        enterpriseId: sessionStorage.getItem("enterpriseId") //企业id
      }).then(res => {
        var listArr = res.data.data;
        console.log(listArr);
        var allList = [];
        //            debugger
        listArr.forEach(function(item, index) {
          // 循环数组查看每个是什么类型的，根据类型做一些数据预处理工作
          // 如果是单选和多选设施optionList和显示的value记忆flag
          // 如果是text
          // 如果是日期
          var listobj = {};
          listobj.name = item.name;
          listobj.type = item.type;
          listobj.selected = false; //控制输入框的显示隐藏
          if (item.type == 1 || item.type == 2) {
            //单选/多选
            listobj.id = item.id; //整条数据id
            var optionList = [];
            var str = [];
            item.fvlist.forEach(function(i, index) {
              var optionObj = {};
              optionObj.name = i.value;
              optionObj.state = i.state; //传给后台的状态
              optionObj.pid = i.pid; //传给后台的pid
              optionObj.selected = i.state === 1;
              optionObj.value = i.id; //选项id
              optionList.push(optionObj);
              if (i.state == 1) {
                //                      debugger;
                str.push(i.value);
              }
            });
            if (str.length > 0) {
              listobj.val = str.join(",");
            } else {
              listobj.val = "待添加";
            }

            listobj.selectList = optionList; // 选择的选项
          } else if (item.type == 3) {
            //时间类型
            if (item.fvlist.length > 0) {
              item.fvlist.forEach(function(i, index) {
                listobj.id = i.id;
                listobj.val = i.value;
                listobj.state = i.state; //传给后台的状态
                listobj.pid = i.pid; //传给后台的pid
              });
            }
          } else {
            //数字/文本类型
            if (item.fvlist.length > 0) {
              item.fvlist.forEach(function(i, index) {
                listobj.id = i.id;
                if (i.value == "") {
                  listobj.val = "待添加";
                } else {
                  listobj.val = i.value;
                }
                listobj.state = i.state; //传给后台的状态
                listobj.pid = i.pid; //传给后台的pid
              });
            }
          }
          allList.push(listobj);
        });
        // console.log(allList);
        this.taskInfoListAll = allList;
      });
    },
    //点击完成按钮
    clickSuccess() {
      this.addFieldFlag = !this.addFieldFlag;
      this.taskInfoFunAjax();
    },

    //下拉框展示
    radioShow(i) {
      this.taskInfoListAll.forEach(function(item, index) {
        if (index == i && item.selected == false) {
          item.selected = true;
        } else if (index == i && item.selected == true) {
          item.selected = false;
        } else {
          item.selected = false;
        }
      });
    },
    checkShow(event, i) {
      this.taskInfoListAll.forEach(function(item, index) {
        if (index == i && item.selected == false) {
          item.selected = true;
        } else if (index == i && event.target.tagName == "LI") {
          //点击li选项下拉不关闭
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
    },
    //点击选项保存数据
    saveFieldFun(id, value, state, pid, type) {
      API.post("/projectFields/updateValue", {
        id: id,
        value: value,
        state: state,
        pid: pid,
        type: type
      }).then(res => {
        //console.log(res);
        if (res.data.message == "SUCCESS") {
          this.taskInfoFunAjax();
        }
      });
    },
    //关闭弹框处理数据
    closeDialog() {
      this.addFieldFlag = false;
      this.taskFieldListFlag = false;
    }
  }
};
</script>

<style scoped lang="scss">
.taskInfoCon {
  position: relative;
  width: 100%;
  height: 100%;
  * {
    box-sizing: border-box;
    font-style: normal;
  }
  .list {
    min-height: 200px;
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .taskInfoBtn {
    cursor: pointer;
    position: relative;
    top: -3px;
    left: 4px;
    width: 18px;
    height: 18px;
    color: #6e6e6e;
    font-size: 18px;
  }
  .taskFieldList {
    padding: 0 30px;
    li {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      padding: 30px 0;
      width: 100%;
      border-top: 1px solid #efefef;
      &:nth-child(1) {
        border-top: 0;
      }
      span.del {
        cursor: pointer;
        width: 53px;
        height: 25px;
        line-height: 23px;
        text-align: center;
        border: 1px solid #ef5520;
        border-radius: 4px;
        color: #ef5520;
        &:hover {
          background: #ef5520;
          color: #fff;
        }
      }
    }
  }
  .addField {
    display: flex;
    justify-content: space-between;
    height: 55px;
    line-height: 55px;
    margin: 0 30px;
    border-top: 1px solid #efefef;
    p {
      cursor: pointer;
      color: #077ce7;
      font-size: 12px;
      span {
        font-size: 20px;
      }
    }
    span.add {
      cursor: pointer;
      font-size: 12px;
      width: 67px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: #077ce7;
      color: #fff;
      border-radius: 4px;
      margin-top: 10px;
    }
  }
  .managementField {
    display: flex;
    justify-content: flex-end;
    height: 55px;
    line-height: 55px;
    margin: 0 30px;
    border-top: 1px solid #efefef;
    p {
      cursor: pointer;
      color: #077ce7;
      font-size: 12px;
      span {
        font-size: 16px;
      }
    }
  }
  .options {
    position: relative;
    min-width: 40px;
    cursor: pointer;
    font-size: 12px;
    .el-input--prefix .el-input__inner {
      padding: 0;
      height: 20px;
      border: none;
    }
    .el-date-editor.el-input {
      width: 130px;
    }
    .el-input__icon {
      display: none;
    }
  }
  .editBox {
    .btns {
      text-align: right;
      margin-top: 10px;
      button {
        width: 68px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        padding: 0;
      }
    }
  }

  /*添加自定义字段列表*/
  .addField {
    position: relative;
    .taskEditList {
      position: absolute;
      border-radius: 4px;
      box-shadow: 0px 0px 10px #ddd;
      left: -30px;
      bottom: 40px;
      padding: 20px;
      width: 230px;
      height: 348px;
      background: #fff;
      .search {
        padding: 0 10px;
      }
      ul {
        height: 64%;
        overflow: auto;
        li {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #333;
          height: auto;
          line-height: normal;
          padding: 15px 0;

          p {
            color: #333;
          }
          span {
            font-size: 14px;
          }
        }
      }
      .listBtn {
        width: 100%;
        margin-top: 10px;
        button {
          width: 100%;
          height: 34px;
          line-height: 34px;
          padding: 0;
        }
      }
    }
  }
}
.el-dialog__header {
  border-bottom: 2px solid #efefef;
  margin: 0px 30px 0 30px;
}
.fieldBox {
  .el-dialog--center .el-dialog__body {
    padding: 0 !important;
  }
}

/*删除按钮*/
.deleteB {
  width: 100%;
  height: 34px;
  line-height: 34px;
  padding: 0;
  margin-top: 20px;
  background-color: #ef5520;
  border-color: #ef5520;
  &:hover {
    background: #ef5520;
  }
  &:focus {
    background: #ef5520;
    border-color: #ef5520;
  }
}
.theRadio {
  right: 0px;
  top: 24px;
}
</style>

