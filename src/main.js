// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//elemnet ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

if(true){
	Vue.use(ElementUI)
}else{
	Vue.use(ElementUI, { locale })
}

//vue i18n
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'cn',    // 语言标识
  messages : {
    en: require('./common/lang/en'),
    cn: require('./common/lang/cn')
  }
})

//上传文件/文件夹
import uploader from 'vue-simple-uploader'
Vue.use(uploader)
// 禁止页面选中文字
document.onselectstart= function(event){return false;};
//导入状态管理器
import store from '@/store/index'

//导入公共样式
import './common/css/none.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
