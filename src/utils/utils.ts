
// 中国标准时间 转换成 年月日
const formatDateTime = (date: any) => {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  // return y + '-' + m + '-' + d+' '+h+':'+minute;
  return y + '-' + m + '-' + d
}
const removeArray = (arrData: any, objData: any) => {
  let length = arrData.length
  for (let i = 0; i < length; i++) {
    if (arrData[i] === objData) {
      if (i === 0) {
        arrData.shift() //删除并返回数组的第一个元素
        return arrData
      } else if (i === length - 1) {
        arrData.pop() //删除并返回数组的最后一个元素
        return arrData
      } else {
        arrData.splice(i, 1) //删除下标为i的元素
        return arrData
      }
    }
  }
}
export {
  formatDateTime, removeArray
}

