/**
 * 火山引擎埋点收集
 */
import { AESDecrypt } from "@/utils";
import cryptoUtils from "@/utils/crypto";
class volcPoint {
  volc_module: string // 模块名称
  volc_page_title: string // 页面名称

  constructor(module: string, title: string) {
    this.volc_module = module
    this.volc_page_title = title
  }

  // 埋点方法 isBlock 是否阻塞执行

  private volcEvent = (e: any, options: any = {}, isBlock: boolean = false) => {
      // @ts-ignore
    if (window.collectEvent) {
        // @ts-ignore
      window.collectEvent(e, {
        // page_path: window.location.href,
        module: this.volc_module,
        // page_title: this.volc_page_title,
        ...options
      })
    }

    return new Promise(resolve => {
      isBlock ? setTimeout(resolve, 300) : resolve('')
    })
  }

  // 获取是否存在某个值
  private hasHashQuery = (word: string): boolean => {
    return window.location.href.includes(word)
  }

  // 初始化
  initEvent = () => {
    let isOnline: boolean = this.hasHashQuery('mxld')
      // @ts-ignore
    if (window.collectEvent) {
        // @ts-ignore
      window.collectEvent('init', {
        app_id: isOnline ? 10000017 : 10000016, // 参考2.1节获取，注意类型是number而非字符串
        channel_domain: 'https://dc.cmicapm.com:7080', // 设置数据上送地址
        log: isOnline ? false : true, // true:开启日志，false:关闭日志
        autotrack: true, // 全埋点开关，true开启，false关闭
        // enable_debug: this.hasHashQuery('debug=true') ? true : false,
        spa: true // 是否开启路由变化的监控
      })
       const encryptedPhone=localStorage.getItem("phon") || ''
       console.log('加密前:',AESDecrypt(encryptedPhone)); // 添加这一行用于调试
       console.log('UUID加密:', cryptoUtils.RSA_Encrypt(AESDecrypt(encryptedPhone))); // 添加这一行用于调试
  // @ts-ignore
      window.collectEvent('config', {
        source_channel_h5: 'dgdd',
        source_id_h5:localStorage.getItem("channel"),
        // uuid: btoa(AESDecrypt(encryptedPhone)),
        user_unique_id:encryptedPhone!=''?cryptoUtils.RSA_Encrypt(AESDecrypt(encryptedPhone)):'',
        user_unique_id_type:"rsa_phone_id",
        
      })
  // @ts-ignore
      // 必须在初始化配置完成后，加入这行代码，否则SDK不会发送数据
      window.collectEvent('start')
    }
  }

  // 活动页面浏览
  pageViewEvent = (page:string,options: any = {}) => {
    return this.volcEvent(page+'page_view', {
      ...options
    })
  }
   // 登录任务结果浏览
  loginViewEvent = (page:string,options: any = {}) => {
    return this.volcEvent(page+'blz_result', {
      ...options
    })
  }

  // 活动页面点击
  pageClickEvent = (page:string, options: any = {}, isBlock: boolean = false) => {
    return this.volcEvent(
      page+'button_click',
      {
        ...options
      },
      isBlock
    )
  }


  
}

export default volcPoint
