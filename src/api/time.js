export default {
	formatting(time){
		let times = new Date(time);
		return times.getFullYear() + '-' + this.doubleStr(times.getMonth()+1) + '-' + this.doubleStr(times.getDate())  + ' ' + this.doubleStr(times.getHours()) + ':' + this.doubleStr(times.getMinutes()) + ':' + this.doubleStr(times.getSeconds())                                       
	},

	startMinutes(time){
		let times = new Date(time);
		return  new Date(times.getFullYear(),this.doubleStr(times.getMonth()),this.doubleStr(times.getDate()),this.doubleStr(times.getHours()))                              
	},
	endMinutes(time){
		let times = new Date(time);
		return  new Date(times.getFullYear(),this.doubleStr(times.getMonth()),this.doubleStr(times.getDate()),this.doubleStr(times.getHours()+1))                              
	},

	getRightTime(time){
		let times = new Date(time);
		return  this.doubleStr(times.getMonth()+1) + '-' + this.doubleStr(times.getDate())  + ' ' + this.doubleStr(times.getHours()) + ':' + this.doubleStr(times.getMinutes());                            
	},
	getRightDay(time){
		let times = new Date(time);
		return  this.doubleStr(times.getMonth()+1) + '-' + this.doubleStr(times.getDate());                            
	},

	doubleStr(doubleStr){
		return doubleStr > 9 ? doubleStr : ('0' + doubleStr);
	
    },
    getYMD(time) {
        let times = new Date(time);
        return times.getFullYear() + '年' + (times.getMonth()+1) + '月' +  times.getDate() + '日';
    },
    getYmd(time) {
        let times = new Date(time);
        return times.getFullYear() + '-' + (times.getMonth()+1) + '-' +  times.getDate();
    }
}
