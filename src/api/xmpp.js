//生成uuid 

function randomUUID() {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
		uuid = new Array(36),
		rnd = 0,
		r;
	for(var i = 0; i < 36; i++) {
		if(i == 8 || i == 13 || i == 18 || i == 23) {
			uuid[i] = '-';
		} else if(i == 14) {
			uuid[i] = '4';
		} else {
			if(rnd <= 0x02)
				rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
			r = rnd & 0xf;
			rnd = rnd >> 4;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		}
	}
	return uuid.join('').replace(/-/gm, '').toLowerCase();
}
//发送消息
/*
 	to 接收人的id
 	userId 用户的Id
 	userName 用户的名字
 	content 发送的内容
 * */


function sendMsg(to,type,userId,userName,content,room,user_img) {
	var UUID = randomUUID();
	return $msg({
		to: to,
		type: type,
		id: UUID,
		xmlns: 'jabber:client'
	}).c('body', null, '{"messageId":"'+ UUID +'","fromUserId":"'+ userId +'","fromUserName":"'+ userName +'","content":"'+ content +'","timeSend":'+ Date.parse(new Date()) +',"type":1,"room":"'+ room +'","img":"'+ user_img +'","id":"'+ UUID +'"}').c('request', {
		xmlns: "urn:xmpp:receipts"
	}, null)
}

//解析收到的xml信息
function parsing(xml) {
	var msg = xml.getElementsByTagName("body");
//	console.log(msg)
	let arr = [];
	if(msg != undefined){
		for(var i=0;i<msg.length;i++){
			if(typeof(msg[i].innerHTML) == 'string'){
				arr.push(msg[i].innerHTML)
			}
		}
		return arr
	}
}
//导出
export default {
	sendMsg: sendMsg,
	parsingXML: parsing
}