import * as type from 'store/getters/type'

export default {
	[type.GET_PATH](state) {
		return state.path
	},
	[type.GET_ENTERPRISEID](state) {
		return state.enterpriseID
	},
	[type.GET_MEMBERMESSAGEFLAG](state) {
		return state.memberMessageFlag
	},
	[type.GET_MYARRAY](state) {
		return state.myArray
	},
	[type.GET_MBFLAG](state) {
		return state.mbFlag
	},
	[type.GET_TID](state) {
		return state.tid
	},
	[type.GET_ONTE](state) {
		return state.onte
	},
	[type.GET_ONTELIST](state) {
		return state.onteList
	},
	[type.GET_TASKDATA](state) {
		return state.taskData
	},
	[type.GET_TASKTYPEID](state) {
		return state.taskTypeId
	},
	[type.GET_GETINVITATION](state) {
		return state.getInvitation
	},
	[type.GET_BACKHOME](state) {
		return state.backHome
	},
	[type.GET_PASSMY](state) {
		return state.passMy
	},
	[type.GET_SETINVITATION](state) {
		return state.setInvitation
	},
	[type.GET_TASKPEOPLE](state) {
		return state.taskPeople
	},
	[type.GET_TASKINVITATION](state) {
		return state.taskInvitation
	},
	[type.GET_INVITATIONLENGTH](state) {
		return state.invitationLength
	},
	[type.GET_PROJECTID](state) {
		return state.projectId
	},
	[type.GET_TASKTYPE](state) {
		return state.taskType
	},
	[type.GET_COLSEALLFLAG](state){
		return state.colseAllFlag
	}
}