//base64 md5加密
import md5 from 'js-md5';
const Base64 = require('js-base64').Base64;

export const encryption = {
	base64:(val, type)=>{
		if(type == 'encode'){
			return Base64.encode(val)
		}else if(type == 'decode'){
			return Base64.decode(val)
		}
	},
	md5:(val)=>{
		return md5(val)
	}
}
