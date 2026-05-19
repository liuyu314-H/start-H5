import CryptoJS from "crypto-js"
import { CRYPTO_NUM } from '@/config'

export const AESDecrypt = (word: string): string => {
  const key = CryptoJS.enc.Utf8.parse(CRYPTO_NUM)
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
};

 
//加密
export const AesEncrypt = (word: string): string => {
  var key = CryptoJS.enc.Utf8.parse(CRYPTO_NUM)
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

/**
 * @浏览器指纹
 * @author gao
 */
 import Fingerprint2 from 'fingerprintjs2'

 export const getBrowerId = () => {
   return new Promise((resolve) => {
     Fingerprint2.get(function(components: any[]) { // 参数只有回调函数时，默认浏览器指纹依据所有配置信息进行生成
       const values = components.map((component: { value: any }) => component.value) // 配置的值的数组
       const murmur = Fingerprint2.x64hash128(values.join(''), 31) // 生成浏览器指纹
       localStorage.setItem('browserId', murmur)
       resolve(murmur)
     })
   })
 }

export const getURIParam = (paramName: string): string | null => {
  const reg = new RegExp("(^|&|\\?)" + paramName + "=([^&#]*)", "i");
  const r = location.href.match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};



/**
 * 获取静态资源
 */
export const getAssetsFile = (url: string): string => {
  return new URL(`/src/assets/img/${url}`, import.meta.url).href
}
 
// 26字母筛选
export const letter = (e: number) => {
  let data = 'A'
  switch (e) {
    case 1:
      data = 'A'
      break
    case 2:
      data = 'B'
      break
    case 3:
      data = 'C'
      break
    case 4:
      data = 'D'
      break
    case 5:
      data = 'E'
      break
    case 6:
      data = 'F'
      break
    case 7:
      data = 'G'
      break
    case 8:
      data = 'H'
      break
    case 9:
      data = 'I'
      break
    case 10:
      data = 'J'
      break
    case 11:
      data = 'K'
      break
    case 12:
      data = 'L'
      break
    case 13:
      data = 'M'
      break
    case 14:
      data = 'N'
      break
    case 15:
      data = 'O'
      break
    case 16:
      data = 'P'
      break
    case 17:
      data = 'Q'
      break
    case 18:
      data = 'R'
      break
    case 19:
      data = 'S'
      break
    case 20:
      data = 'T'
      break
    case 21:
      data = 'U'
      break
    case 22:
      data = 'V'
      break
    case 23:
      data = 'W'
      break
    case 24:
      data = 'X'
      break
    case 25:
      data = 'Y'
      break
    case 26:
      data = 'Z'
      break
    default:
      console.log('字母匹配失败')
  }
  return data
}

// 每个月一号返回true
export const monthlyOne = () => {
  function isFirstDayOfMonth() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
  
    return currentDay === 1;
  }
  
  // 使用示例
  const isCurrentMonthFirstDay = isFirstDayOfMonth();
  return isCurrentMonthFirstDay
}

// 数组去重
export  const unique=(arr:string[])=> {
  return Array.from(new Set(arr));
}

 // 判断是否中国移动手机号
 export  const isChinaMobile=(phoneNumber:string)=> {
  const regex =/^(13[4-9]|147|15[0-2,7-9]|178|18[2-4,7-8]|198)\d{8}$/;
  return regex.test(phoneNumber);
}

//
export const getDayDescription=(arr:number[]) =>{
  const weekdays = ['周一', '周二', '周三', '周四', '周五','周六','周日'];
  const weekends = ['周六', '周日'];

  // 判断是否连续
  function isContinuous(arr:number[]) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i + 1] - arr[i] !== 1) {
        return false;
      }
    }
    return true;
  }
  // 判断是否为工作日
  function isWeekday(arr: number[]): boolean {    
    arr.sort((a, b) => a - b); // 将数组从小到大排序
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i + 1] - arr[i] !== 1) { // 如果相邻两个数字的差不为1,则不是连续的
        return false;
      }
    }
    if(arr.length!==5){
      return false
    }
    return true; // 所有数字都连续，返回true
  }
 
  // 判断是否为周末
  function isWeekend(arr:number[]) {
    for (let i = 0; i < arr.length; i++) {
      if (!weekends.includes(weekdays[arr[i] - 1])) {
        return false;
      }
    }
    return true;
  }

  // 处理结果
  // if(arr.length==1){
  //   switch (arr[0]) {
  //     case 1:
  //         return '周一';
  //     case 2:
  //         return '周二';
  //     case 3:
  //         return '周三';
  //     case 4:
  //         return '周四';
  //     case 5:
  //         return '周五';
  //     case 6:
  //         return '周六';
  //     case 7:
  //         return '周日';
  //     default:
  //         return '不重复';
  // }
  // }
  if (arr.length === 7) {
    return '每天';
  } 
  // else
  //  if (isWeekday(arr)) {
  //   return '工作日';
  // }
  // else
  //  if (isContinuous(arr)) {
  
  //   return `每${weekdays[arr[0] - 1]} 至 ${weekdays[arr[arr.length - 1] - 1]}`;
  // }
  //  else
  // if (isWeekend(arr)) {
  //   return '周末';
  // } 
  else
   if (arr[0]==8) {
    return '不重复';
  } else {
    const days = arr.map((day:any) => weekdays[day - 1]);
    console.log(days.join(','));
    return '每'+days.join(',');
  }
}
// 使用示例
// console.log(getDayDescription([1, 2, 3, 4, 5, 6, 7]));     // 输出：每天
// console.log(getDayDescription([1, 2, 3, 4, 5]));          // 输出：工作日
// console.log(getDayDescription([1,2,3]));                // 输出：周一~周三
// console.log(getDayDescription([1, 3, 5, 6, 7]));          // 输出：周一、周三、周五、周六、周天
// console.log(getDayDescription([8]));   //不重复  
// console.log(getDayDescription([1]));     //周一
               
               
                
export const formatJanuaryFirst=(dateStr:string)=> {
  
  // 假设输入始终是 "1-1"
  const [month, day] = dateStr.split('-');
  const monthName = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'][parseInt(month) - 1];
  
  return `${monthName}${day}日`;
}          

export const formatTime=(timeStr:string)=> {
  // 假设输入始终是 "小时:分钟" 的格式，例如 "1:3"
  const [hour, minute] = timeStr.split(':');
  
  // 确保小时和分钟是一位数时前面补零
  const formattedHour = (hour.length === 1) ? '0' + hour : hour;
  const formattedMinute = (minute.length === 1) ? '0' + minute : minute;
  
  return `${formattedHour}:${formattedMinute}`;
}

 //显示文件替换
 export const urlForm = (item: string ) => {
  let Url:string=''
  if (!item) return item
  if (window.location.hostname == 'yyxx.10086.cn') {
    console.log('生产环境', window.location.hostname + '替换为:https://ddly.hekouxin.com')
    Url = 'https://ddly.hekouxin.com'
  } else {
    console.log('开发环境+fstest测试环境', window.location.hostname + '替换为:https://fstest.hekouxin.com')
    Url  = 'https://fstest.hekouxin.com'
  }
  return item.replace(new URL(item).origin, Url)
}


export const YearData=()=>{
  // 创建一个表示当前日期和时间的 Date 对象
const now = new Date();

// 调整日期对象到当前月份的第一天
now.setDate(1); // 设置为本月第一天
// 计算当前月份的最后一天
const lastDayOfMonth = new Date(
  now.getFullYear(),
  now.getMonth() + 1, // 月份加 1，因为 getMonth 返回的是 0-11 的范围
  0 // 设置日期为 0，JavaScript 会自动调整为上个月的最后一天
);
console.log(lastDayOfMonth);

lastDayOfMonth.setDate(lastDayOfMonth.getDate()); // 减去 1 天，得到本月最后一天

const arr=[]
// 遍历当前月份的所有日期并打印
for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
  // console.log(`Day ${day} of this month`);
  arr.push(day+'日')
  // 在这里可以对每一天进行其他处理，例如存储到数组、数据库等
}
console.log(arr);

return arr
}
export const volcUUID = (phone: string): string => {  
  return btoa(phone.length > 11 ? AESDecrypt(phone) : phone)
}


export const getIdsFromPacks=(packs:any, data:any)=> {
  // 使用 reduce 来构建结果数组
  return data.reduce((result:any, level:any) => {
    // 每一层的数组
    return result.concat(level.reduce((levelResult:any, pack:any) => {
      // 如果当前包的名字在 packs 数组中，则添加到结果中
      if (packs.includes(pack.idolListName)) {
        // 添加该组合包的所有成员的 idolId
        levelResult.push(...pack.idolList.map((member:any) => member.idolId));
      }
      return levelResult;
    }, []));
  }, []).join(',');
}

export const deduplicateByIdolId = (array: any) => {
  const seenIds = new Map()
  const uniqueItems: any = []

  array.forEach((item: any) => {
    if (!seenIds.has(item.starId)) {
      seenIds.set(item.starId, true)
      uniqueItems.push(item)
    }
  })

  return uniqueItems
}
