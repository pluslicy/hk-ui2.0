// 时间序列化
function timestampToTime(timestamp){
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y+M+D+h+m+s;
}
// 本天
let time = ()=>{
  let time = new Date();
	let todayStart = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+'T'+'0:0:0'+'Z';
  let todayEnd = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+'T'+'23:59:59'+'Z';
  // if(!new Date(todayStart).getTime()){
	// 	todayStart = todayStart.replace(/-/g,'/');
	// 	todayEnd = todayEnd.replace(/-/g,'/');
	// }
  return([todayStart,todayEnd])
}
// 本周
let week = ()=>{
  let now = new Date(); //当前日期 
  // console.log(now)
  let nowDayOfWeek = now.getDay(); //今天本周的第几天 
  // console.log(nowDayOfWeek)
  let nowDay = now.getDate(); //当前日 
  // console.log(nowDay)
  let nowMonth = now.getMonth(); //当前月
  // console.log(nowMonth)
  let nowYear = now.getFullYear(); //当前年
  // console.log(nowYear)
  let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1); 
  // console.log(weekStartDate)
  let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek + 1)); 
  // console.log(weekEndDate)
	weekStartDate = timestampToTime(Date.parse(weekStartDate));
	weekEndDate = timestampToTime(Date.parse(weekEndDate));
	// if(!new Date(weekStartDate).getTime()){
	// 	weekStartDate = weekStartDate.replace(/-/g,'/');
	// 	weekEndDate = weekEndDate.replace(/-/g,'/');
	// }
	return [weekStartDate,weekEndDate];
}
// 本月
let month = ()=>{
  let month = new Date();
	let monthStart = month.getFullYear()+'-'+(month.getMonth()+1)+'-'+1+' '+'0:0:0';
	// console.log(month.getMonth())
	if (month.getMonth() <= 10){
		var monthEnd = month.getFullYear()+'-'+(month.getMonth()+2)+'-'+1+' '+'0:0:0';
	} else {
		var monthEnd = (month.getFullYear()+1)+'-'+1+'-'+1+' '+'0:0:0';
	}
	// if(!new Date(monthStart).getTime()){
	// 	monthStart = monthStart.replace(/-/g,'/');
	// 	monthEnd = monthEnd.replace(/-/g,'/');
	// }
	// return [new Date(monthStart),new Date(monthEnd)];
	return [monthStart,monthEnd];
}
// 本季度
let quarter = ()=>{
  let now = new Date();
	let nowYear = now.getYear()+1900;//年
	let nowMonth = now.getMonth(); //当前月 
	let start = '';
	let end = '';
	if(nowMonth < 3){
		start = nowYear+'-1-1 0:0:0';
		end = nowYear+'-4-1 0:0:0';
	}else if (nowMonth >= 3 && nowMonth < 6){
		start = nowYear+'-4-1 0:0:0';
		end = nowYear+'-7-1 0:0:0';
	}else if(nowMonth >= 6 && nowMonth< 9){
		start = nowYear+'-7-1 0:0:0';
		end = nowYear+'-10-1 0:0:0';
	}else if (nowMonth >= 9){
		start = nowYear+'-10-1 0:0:0';
		end = (nowYear+1)+'-1-1 0:0:0';
	}
	// if(!new Date(nowYear+'-1-1 0:0:0').getTime()){
	// 	start = start.replace(/-/g,'/');
	// 	end = end.replace(/-/g,'/');
	// 	return [new Date(start),new Date(end)];
	// }
	// return [new Date(start),new Date(end)];
	return [start,end];
}

export default {
  time,
  week,
  month,
  quarter
}