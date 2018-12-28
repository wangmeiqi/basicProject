
import Vue from 'vue'
import Vuex from 'vuex'

//引入模块
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './states'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})


//如果用户刷新页面就把值赋给state.path
if(state.path.length == 0 && sessionStorage.getItem('path')){
	state.path = JSON.parse(sessionStorage.getItem('path'))
}
