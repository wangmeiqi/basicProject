function clear(arr){
	if(arr.length == 0){
		return arr;
	}else{
		arr.pop();
		clear(arr);
	}
}


export default {
	clear(arr){
		clear(arr)
	}
}
