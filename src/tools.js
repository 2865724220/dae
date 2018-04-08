import axios from 'axios';

export const Qs = () => {
	var sStr = window.location.href,
	    params = {};
	var pattern = /(\w+)=([^&#]*)*/g;
	var arr = sStr.match(pattern);
	if(arr){
		for(var i = 0; i < arr.length; i++){
		    var kv = arr[i].split('=');
		    params[kv[0]] = kv[1];
		  }
	}
	return params;
	console.log(params); 
}
const params = Qs();
const $http = axios.create({
	timeout:60000,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'mobilePhone': params.mobilePhone,
        'deviceId': params.deviceId,
        'sessionid': params.sessionid || params.sessionId,
	}
});

$http.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});

export {$http}

export const toFix = num => {
    if(!isNaN(num)){
        return (num/100).toFixed(2);
    }
    return num;
}

const checkNum = n => {
    return n < 10 ? ("0" + n) : n;
}

export const DateF = (time, f) => {
	if(time){
		let d = new Date(time);
        let YMd = d.getFullYear() + '-' + checkNum(d.getMonth() + 1) + "-" + checkNum(d.getDate());
        let Hms = checkNum(d.getHours()) + ":" + checkNum(d.getMinutes()) + ":" + checkNum(d.getSeconds());
        if(f === 'date'){
            return YMd;
        }
		return YMd + " " + Hms;
	}
    return time;
}