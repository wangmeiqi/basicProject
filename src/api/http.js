//axios 封装
import axios from 'axios'
import qs from 'qs'

// const IP = "http://192.168.9.39:83"
// const IP = "http://192.168.9.31:83"

//本机
//const IP = "http://127.0.0.1:83"

//测试
// const IP = "http://keyprojectapi.biztest.top:8185"

//生产地址
const IP = 'http://219.143.207.136:8086'

//IMA对接
//测试
// const IMAIP = "http://auth.op.pactera-sln.club:8185/login?service=http%3A%2F%2Fkeyprojectapi.biztest.top:8185%2FcasCallback%3Fclient_name%3DCasClient"
//const IMAIP

const IMAIP = "http://219.143.207.136:8086"


// //XMPP地址 测试
// const XMPPIP = 'http://192.168.9.50:5280'
// //XMPP请求地址
// const XMPPHTTP = 'http://192.168.9.50:8092'
// // XMPP 房间地址
// const XMPPROOM = 'muc.192.168.9.50'
// // XMPP 主机名
// const XMPPHOST = '192.168.9.50'

//XMPP地址 正式
const XMPPIP = 'http://219.143.207.136:5280'
//XMPP请求地址
const XMPPHTTP = 'http://219.143.207.136:8089'
// XMPP 房间地址
const XMPPROOM = 'muc.219.143.207.136'
// XMPP 主机名
const XMPPHOST = '219.143.207.136'



//192.168.9.50
//219.143.207.136
axios.defaults.withCredentials=true;




axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
//	location.href = location.origin
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(res.msg)
    location.href = location.origin
  }
  if (res.data && (!res.data.success)) {
//  alert(res.data.error_msg)
  }
  return res
}

export default {
	ip:IP,
	imaip:IMAIP,
	xmpp:XMPPIP,
  xmpphttp:XMPPHTTP,
  xmpproom: XMPPROOM,
  xmpphost:XMPPHOST,
  post (url, data) {
  	let JSESSIONID = ''
		if(typeof(sessionStorage.getItem('JSESSIONID')) == 'string'){
			JSESSIONID = ';JSESSIONID=' +　sessionStorage.getItem('JSESSIONID')
		}else{
			JSESSIONID = ''
		}
    return axios({
      method: 'post',
      baseURL: IP,
      url: url + JSESSIONID,
      data: qs.stringify(data),
      timeout: 60000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
  	let JSESSIONID = ''
		if(typeof(sessionStorage.getItem('JSESSIONID')) == 'string'){
			JSESSIONID = ';JSESSIONID=' +　sessionStorage.getItem('JSESSIONID')
		}else{
			JSESSIONID = ''
		}
    return axios({
      method: 'get',
      baseURL: IP,
      url: url + JSESSIONID,
      params, // get 请求时带的参数
      timeout: 60000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
