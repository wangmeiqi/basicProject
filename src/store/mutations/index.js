
import * as type from 'store/mutations/type'

export default {
	//向路径数组里添加元素
  [type.ADD_PATH](state, el){
  	state.path.push(el)
  },
  //向路径数组里删除元素
  [type.POP_PATH](state, index){
  	state.path.splice(index)
  },
  [type.SET_ENTERPRISEID](state, id){
    state.enterpriseID = id
  },
  [type.SET_MEMBERMESSAGEFLAG](state, num){
  	state.memberMessageFlag = num
  },
  [type.SET_MYARRAY](state,list){
    state.myArray = list
  },
  [type.SET_MBFLAG](state,flag){
    state.mbFlag = flag
  },
  [type.SET_TID](state,list){
    state.tid =list
  },
  [type.SET_ONTE](state,list){
    state.onte = list
  },
  [type.SET_ONTELIST](state,list){
    state.onteList =list
  },
  [type.SET_TASKDATA](state,list){
    state.taskData = list
  },
  [type.SET_TASKTYPEID](state, id){
    state.taskTypeId = id
  },
  [type.SET_GETINVITATION](state,list){
    state.getInvitation= list
  },
  [type.SET_BACKHOME](state,bol){
  	state.backHome = bol
  },
  [type.SET_PASSMY](state,bol){
    state.passMy = bol
  },
  [type.SET_SETINVITATION](state,bol){
    state.setInvitation = bol
  },
  [type.SET_TASKPEOPLE](state,bol){
    state.taskPeople = bol
  },
  [type.SET_TASKINVITATION](state, bol){
    state.taskInvitation =bol
  },
  [type.SET_INVITATIONLENGTH](state,number){
    state.invitationLength = number
  },
  [type.SET_PROJECTID](state,id){
  	state.projectId = id
  },
  [type.SET_TASKTYPE](state, bol){
    state.taskType = bol
  },
  [type.SET_CLOSEALLFLAG](state, bol){
  	state.colseAllFlag = bol
  },
    [type.SET_IMAGE](state,bol){
        state.setImage = bol
    },
    [type.SET_NAME](state,bol){
        state.setName = bol
    }
}
