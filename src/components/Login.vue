<template>
  <div class="z">
    <div class="l-container">
      <!-- <div class="l-box" v-show="!canAuthLogin"> -->
      <div class="l-box" v-show="canAuth && showSMS">
        <img src="@/assets/otherImg/exit.png" alt="" class="z-closes" @click="closeLoginDialog" />
        <div class="title">登录</div>
        <div class="auth-phone">{{ hidePhone }}</div>
        <!-- <div class="auth-phone">189****5659</div> -->

        <div class="auth-login hasValue" @click="showOneKeyTips">本机号码一键登录</div>
        <div class="auth-sms" @click="toSMS">短信验证码登录</div>
        <div class="auth-title">使用“本机号码一键登录”功能，请勿链接热点登陆，并确认该号码为您的本机号码</div>
        <div class="l-xy">
          <van-checkbox v-model="checkXY" icon-size="18px"  checked-color="#0E4DFF" @change="handelChan"></van-checkbox>
          登录即注册且同意
            <a @click="navigateMxyhxy">《明星来电用户协议》</a>
            <br />
            <a @click="navigateMxyszc">《明星来电隐私政策》</a>
            及
            <a href="https://wap.cmpassport.com/resources/html/contract.html">《中国移动认证服务》</a>
        </div>
      </div>
      <!-- <div class="l-box l-box2" v-show="canAuthLogin"> -->
      <div class="l-box l-box2" v-show="!canAuth || !showSMS">
        <img src="@/assets/otherImg/exit.png" alt="" class="z-closes" @click="closeLoginDialog" />
        <div class="title">登录</div>
        <!-- <div class="flex">
          <div :class="['s-line', phoneType == 1 ? 'txt' : '']" @click="handelPhon(1)">手机快捷登录</div> 
          <div :class="['s-line', phoneType == 2 ? 'txt' : '']" @click="handelPhon(2)">短信验证码登录</div> 
        </div> -->
        <!-- <img src="@/assets/s_back.png" alt="" class="s-back" @click="backAuth" v-show="!showSMS" /> 临时-->
        <!-- sim认证 -->
        <div v-if="phoneType == 1">
          <input type="text" maxlength="11" class="s-phone-sim" placeholder="请输入中国移动手机号" v-model="phoneSim" oninput="value=value.replace(/[^\d]/g,'')" @input="handelInput" />
          <!-- <div class="s-sms-line"></div> -->
          <div :class="['auth-login-sim', inputShow ? 'hasValue': '']" @click=" handelSim">快捷登录</div>
        </div>
        <!-- 短信认证 -->
        <div v-if="phoneType == 2">
          <input type="text" maxlength="11" class="s-phone" placeholder="请输入中国移动手机号" v-model="phoneNum" oninput="value=value.replace(/[^\d]/g,'')" />
          <div class="s-sms-line">
            <input type="text" maxlength="6" class="s-sms" placeholder="输入验证码" v-model="smsCode" oninput="value=value.replace(/[^\d]/g,'')" />
            <div class="s-get" @click="getSmsCode" v-if="!isCounting">获取验证码</div>
            <CountDown :time="60 * 1000" format="ss s" v-else @finish="finishCounting" class="s-get"></CountDown>
          </div>
          <!-- 滑块校验 -->
          <slideVerify v-model:value="form.isVerifyPass" @update="update" v-if="slideShow"></slideVerify>
          <div :class="['auth-login', phoneNum && smsCode ? 'hasValue' : '']" @click="smsLogin">登录</div>
        </div>
        <div class="l-xy">
          <van-checkbox v-model="checkXY" icon-size="18px" @change="handelChan" checked-color="#0E4DFF"></van-checkbox> 登录即注册且同意
            <a
              @click="navigateMxyhxy"
            >
              《明星来电用户协议》
            </a>
            <br />
            <a
              @click="navigateMxyszc"
            >
              《明星来电隐私政策》
            </a>
            及
            <a href="https://wap.cmpassport.com/resources/html/contract.html">
              《中国移动认证服务》
            </a>
        </div>
      </div>
    </div>

    <OneKeyTips :isOneKeyTips="isOneKeyTips" @closeOneKeyTips="closeOneKeyTips"></OneKeyTips>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import OneKeyTips from '@c/OneKeyTips.vue'
import HRequest from '@/api'
import { $ref } from 'vue/macros'
import { gdXmsStore } from '@/store'
import { Toast, CountDown } from 'vant'
import { AESDecrypt, AesEncrypt, volcUUID } from '@/utils'
import { computed, ComputedRef } from '@vue/reactivity'
import { getURIParam } from '@/utils/index.js'
import slideVerify from '@/components/slideVerify.vue'
import volcPoint from '@/utils/volc-collect'
import { useRouter,useRoute } from 'vue-router'
const route: any = useRoute();
const router: any = useRouter();
let volc = new volcPoint('明星来电', '登录')
volc.initEvent()
const store = gdXmsStore()
const emit = defineEmits(['closeLoginDialog', 'phonEncryption'])
  const navigateMxyhxy = () => {
    router.push({
      path: "/mxyhxy"
    });
    
  }
  const navigateMxyszc = () => {
    router.push({
      path: "/mxyszc"
    });
    
  }
//处理号码
let encryptedPhone: string = store.getUserPhone
console.log('加密显示手机号码', encryptedPhone)
if (encryptedPhone) {
  console.log('取号成功！：', encryptedPhone)
  localStorage.setItem('phon', encryptedPhone)
}
let hidePhone: ComputedRef<string> = computed(() => {
  let phone: string = AESDecrypt(encryptedPhone)
  // console.log('我是解密前的手机号码', encryptedPhone)
  // console.log('我是解密后的手机号码', phone)
  store.setPhon(phone)
  // let phonData = `${phone[0]}${phone[1]}${phone[2]}****${phone[7]}${phone[8]}${phone[9]}${phone[10]}`

  // if (phone[0] == undefined) {
  if (encryptedPhone == undefined) {
    console.log('取号为空,需要弹出手机号登录')
    return '取号失败，请使用验证码登录'
  }
  // console.log('我不为空，取号成功，返回手机号渲染需要解密', encryptedPhone)
  showSMS = true

  // return phonData
  return mobileStr(phone)
})
const { canAuth } = defineProps({
  canAuth: Boolean
})
// 埋点

const handelChan = (e:any) => {
  // 埋点
  volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页勾选协议',page_code:"homeAgreement", page_url: window.location.href, click_object: 'Agreement',
    object_name:'勾选协议',success_or_not:e})
}
const canAuthLogin = ref(false)
const phoneType: any = ref(2)
const handelPhon = (item: Number): void => {

  phoneType.value = item
}
const closeLoginDialog = (): void => {
  emit('closeLoginDialog', false)
  volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页关闭登录',page_code:"homeCloseLogin", page_url: window.location.href, click_object: 'CloseLogin',
    object_name:'关闭登录',success_or_not:'true'})
}

//一键登录和短信登录切换
let showSMS: Boolean = $ref(false)
const toSMS = (): void => {
  showSMS = false
  // canAuthLogin.value = true
}
const backAuth = (): void => {
  showSMS = true
  // canAuthLogin.value = false
}
// 手机号加密方法
const mobileStr = (str: string) => {
  if (str.length > 7) {
    return str.substring(0, 3) + '****' + str.substring(7, str.length)
  } else {
    return str.substring(0, str.length - 1) + '****'
  }
}
//协议选择
const chn = getURIParam('chn')
let ydrzRes: any = store.getYDRZres
let checkXY: Boolean = $ref(false)
//一键登录确认
const authLoginConfirm = async (): Promise<void> => {
  console.log(11)
 
  let params = {
    loginChn: 4,
    tag: 1,
    // token: ydrzRes.token,
    // userInformation: ydrzRes.userInformation
    phone: encryptedPhone,
    version: localStorage.getItem('version')
    // actId: store.getActId,
    // encrypt: encryptedPhone
  }
  const _start = performance.now();
  let res = await HRequest.confirmAuthLogin(params)
  console.log('我是code', res.code, res.code === 200)
  const _cost = performance.now() - _start;
  if (res.code === 200) {
    // localStorage.setItem('tk', res.data)
    localStorage.setItem('phonData', mobileStr(AESDecrypt(encryptedPhone)))
    volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页一键登录',page_code:"homeOneclickLogin", page_url: window.location.href, click_object: 'OneclickLogin',
    object_name:'一键登录',success_or_not:'true',msduration: _cost})
    Toast('登录成功')
    let ph = localStorage.getItem('phonData')
    emit('phonEncryption', ph)
    emit('closeLoginDialog', false)
    //     emit('phonEncryption', phonData)

    // 插码
    // window.gdp('setUserAttributes', {
    //     operators_var: '移动', // 赋值运营商名称（移动、联通、电信）。
    //     prov_var: '广东', // 赋值省份名称。
    //     city_var: '广州' // 赋值地市名称。
    // })
  } else if (res.code == 203) {
    console.log('版本更新')
    localStorage.clear()
    sessionStorage.clear()
    window.location.reload()
  } else {
    // emit('closeLoginDialog', false);
    Toast(res.msg)
    volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页一键登录',page_code:"homeOneclickLogin", page_url: window.location.href, click_object: 'OneclickLogin',
    object_name:'一键登录',success_or_not:'false',msduration: _cost,fail_reason:res.msg})
  }
  
}
let phoneNum: number | string = $ref('')
let smsCode: number | string = $ref('')
let isCounting: Boolean = $ref(false)

//获取短信验证码
const getSmsCode = async (): Promise<void> => {
  let phone = phoneNum.toString()
  let phones = AesEncrypt(phoneNum.toString())
  if (phone.length < 11) {
    Toast('请输入11位手机号码')
    return
  }
  let params = {
    phone: phones,
    actId: store.getActId
  }
  const _start = performance.now();
  let res = await HRequest.getSmsCodeApi(params)
  const _cost = performance.now() - _start;
  if (res.code == 200) {
    isCounting = true
    Toast('短信验证码下发成功')
    volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页下发短信',page_code:"homeSendSms", page_url: window.location.href, click_object: 'SendSms',
     object_name:'下发短信',success_or_not:'true',msduration: _cost})
  } else {
    Toast(res.msg)
    volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页下发短信',page_code:"homeSendSms", page_url: window.location.href, click_object: 'SendSms',
     object_name:'下发短信',success_or_not:'false',msduration: _cost,fail_reason:res.msg})
  }
  // window.gdp('track', 'eventClick', {
  //     pageName_var: '验证码按钮', // 事件发生时所在页面。
  //     flowArea_var: '登录-验证码' // 事件发生时所在区域。
  // })
}
//结束倒计时
const finishCounting = (): void => {
  isCounting = false
}
const form = reactive({
  isVerifyPass: false // 滑块验证结果
})
console.log('滑块验证状态', form.isVerifyPass)
const updateShow = ref(false)
const update = (e: boolean) => {
  console.log(e) //成功的回调true
  updateShow.value = e
}
//短信验证码登录
const slideShow = ref(false)
let index = ref(0)
const smsLogin = async (): Promise<void> => {
  if (!phoneNum && !smsCode) return
  // 埋点

  let phone = phoneNum.toString()
  // console.log(phone, '我是手机号')
  // window.gdp('setUserId', phone)
  console.log(AesEncrypt(phone), '我是手机号')
  console.log(AESDecrypt('oEFC4VzPu+Gou3h4nUx+ag=='))

  localStorage.setItem('phon', AesEncrypt(phone))
  // console.log(phoneNum.toString(), '我是手机号')
  store.setPhon(phone)

  if (phone.length < 11) {
    Toast('请输入11位手机号码')
    return
  }
  let code = smsCode.toString()
  if (code.length < 6) {
    Toast('请输入6位短信验证码')
    return
  }
  if (!checkXY) {
    Toast('请认真阅读并勾选协议')
    return
  }
  if (index.value >= 3 && !updateShow.value) {
    Toast('请验证滑块验证码')
    return
  }

  let params = {
    phone: AesEncrypt(phone.toString()),
    code: AesEncrypt(code),
    loginChn: 4,
    tag: 1,
    version: localStorage.getItem('version')
  }
  const _start = performance.now();
  let res = await HRequest.loginBySmsApi(params) //verifySms
  const _cost = performance.now() - _start;
  console.log(res)
  if (res.code == 200) {
    // console.log(res)
    // console.log(phoneNum)
    let phonData = `${phone[0]}${phone[1]}${phone[2]}****${phone[7]}${phone[8]}${phone[9]}${phone[10]}`
    console.log('加密', phonData)
    // store.setPhonshow(true)
    // localStorage.setItem('setPhonshow', 'true')
    localStorage.setItem('phonData', phonData)
    let ph = localStorage.getItem('phonData')
    localStorage.setItem("uid", res.data.uid);
    emit('phonEncryption', ph)
    emit('closeLoginDialog', false)
     volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页短信登录',page_code:"homeSmsLogin", page_url: window.location.href, click_object: 'smsLogin',
    object_name:'短信登录',success_or_not:'true',msduration: _cost})
    Toast('登录成功!')
  } else if (res.code == 203) {
    console.log('版本更新')
    localStorage.clear()
    sessionStorage.clear()
    window.location.reload()
  } else {
    index.value += 1
    if (index.value >= 3) {
      console.log(index, '我超过了')
      slideShow.value = true
    }
    Toast('短信验证码错误或已过期，请重新输入')
      volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页短信登录',page_code:"homeSmsLogin", page_url: window.location.href, click_object: 'smsLogin',
    object_name:'短信登录',success_or_not:'false',msduration: _cost,fail_reason:res.msg})
  }

  // window._hmt.push(['_trackEvent', '广东视频秘书活动首页', '验证码登录'])
  // HRequest.setBigData({
  //     buttonName: '验证码登录',
  //     actId: store.getActId || 'gdxfvd',
  //     chn: chn === null ? store.getChannel : chn
  // })
}
//SIM登录
const phoneSim = ref('')
const input: string[] = []
const inputShow = ref(false)
const handelInput = (e: any) => {
  inputShow.value = phoneSim.value.split('').length == 11 ? true : false
}
const handelSim = async () => {
  if (!inputShow.value) return
  if (!checkXY) {
    Toast('请认真阅读并勾选协议')
    return
  }
  console.log('我是SIM认证登录手机号', phoneSim.value)
  Toast.loading({
    duration: 0,
    message: '加载中...',
    forbidClick: true
  })
  let params = {
    loginChn: 4,
    tag: 1,
    // token: ydrzRes.token,
    // userInformation: ydrzRes.userInformation
    phone: AesEncrypt(phoneSim.value.toString()),
    version: localStorage.getItem('version')
    // actId: store.getActId,
    // encrypt: encryptedPhone
  }
  const _start = performance.now();
  const res = await HRequest.confirmAuthLogin(params)
  const _cost = performance.now() - _start;
  if (res.code === 200) {
    // localStorage.setItem('tk', res.data)
    localStorage.setItem('phonData', mobileStr(AESDecrypt(encryptedPhone)))
    volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页快捷登录',page_code:"homeQuickLogin", page_url: window.location.href, click_object: 'QuickLogin',
    object_name:'快捷登录',success_or_not:'true',msduration: _cost})
  
    Toast('登录成功')
    let ph = localStorage.getItem('phonData')
    emit('phonEncryption', ph)
    emit('closeLoginDialog', false)
    //     emit('phonEncryption', phonData)

    // 插码
    // window.gdp('setUserAttributes', {
    //     operators_var: '移动', // 赋值运营商名称（移动、联通、电信）。
    //     prov_var: '广东', // 赋值省份名称。
    //     city_var: '广州' // 赋值地市名称。
    // })
  } else if (res.code == 203) {
    console.log('版本更新')
    localStorage.clear()
    sessionStorage.clear()
    window.location.reload()
  } else {
    // emit('closeLoginDialog', false);
    Toast(res.msg)
   volc.loginViewEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '首页快捷登录',page_code:"homeQuickLogin", page_url: window.location.href, click_object: 'QuickLogin',
    object_name:'快捷登录',success_or_not:'false',msduration: _cost,fail_reason:res.msg})
  }

  // const res = await HRequest.simLogin({
  //   phone: AesEncrypt(phoneSim.value.toString())
  // })
  // if (res.code == 200) {
  //   console.log(res.data)
  //   console.log('SIM认证发起成功')
  //   // transactionId: 就是res.data
  //   let count: any = 0
  //   const interval = setInterval(async () => {
  //     count += 1
  //     console.log(count)
  //     // 超过20秒即认证超时
  //     if (count < 20) {
  //       const params = {
  //         loginChn: '4',
  //         phone: AesEncrypt(phoneSim.value.toString()),
  //         tag: '1',
  //         transactionId: res.data,
  //         version: localStorage.getItem('version')
  //       }
  //       const SIMlogin = await HRequest.simConfirm(params)
  //       console.log(SIMlogin)
  //       if (SIMlogin.code == '200') {
  
  
  //         console.log('SIM认证成功=================')
  //         clearInterval(interval)
  //         // let phone = phoneNum.toString()
  //         // let phonData = `${phone[0]}${phone[1]}${phone[2]}****${phone[7]}${phone[8]}${phone[9]}${phone[10]}`

  //         localStorage.setItem('phonData', mobileStr(phoneSim.value))
  //         localStorage.setItem('phon', AesEncrypt(phoneSim.value))
  //         let ph = localStorage.getItem('phonData')
  //         emit('phonEncryption', ph)
  //         emit('closeLoginDialog', false)
  //         Toast.clear()
  //       } else {
  
  //       }
  //     } else {
  //       console.log('SIM认证超时')
  //       Toast.clear()
  //       Toast('唤起SIM失败请使用验证码登陆！')
  //       clearInterval(interval)
  //     }
  //   }, 1000)
  // } else {
  //   console.log('发起SIM失败')
  //   Toast(res.msg)
  // }
}

//一键登录遮罩
let isOneKeyTips: Boolean = $ref(false)
const closeOneKeyTips = () => {
  isOneKeyTips = false
  authLoginConfirm()
}
const showOneKeyTips = () => {
  if (!checkXY) {
    Toast('请认真阅读并勾选协议')
    return
  }
  // isOneKeyTips = true 20221113取消该弹框
  authLoginConfirm()
  // window._hmt.push(['_trackEvent', '广东视频秘书活动首页', '一键登录'])
  // HRequest.setBigData({
  //     buttonName: '一键登录',
  //     actId: store.getActId || 'gdxfvd',
  //     chn: chn === null ? store.getChannel : chn
  // })
  // window.gdp('track', 'eventClick', {
  //     pageName_var: '一键登录', // 事件发生时所在页面。
  //     flowArea_var: '首页-一键登录按钮' // 事件发生时所在区域。
  // })
}
// const input = ref(0)
// const inputid: any = []
</script>

<style lang="less" scoped>
.l-container {
  width: 667px;
  // height: 640px;
  background: #ffffff url('@/assets/otherImg/more_rule_header.png') no-repeat top;
  // border: 4px solid #a9d8fc;
  background-size: 100% auto;
  border-radius: 24px;
  color: #0f2944;
  padding: 27px 42px 42px;

  .l-box {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    .title {
      font-size: 33px;
      color: #000;
      line-height: 50px;
      font-weight: 500;
    }
    .z-closes {
      position: absolute;
      right: -9px;
      top: 4px;
      width: 42px;
    }
    .auth-phone {
      color: #000;
      font-size: 42px;
      font-weight: bold;
      margin-bottom: 20px;
      margin-top: 33px;
    }

    .auth-title {
      font-size: 25px;
      color: #636975;
      margin: 0 auto;
      margin-bottom: 25px;
      text-align: center;
      width: 500px;
    }
    .auth-login-sim, .auth-login {
      width: 100%;
      height: 83px;
      // background: linear-gradient(-10deg, #21a6ff, #147ffa);
      background: linear-gradient(90deg, #00A2FF, #7C48FF);
      border-radius: 90px;
      font-size: 33px;
      color: #ffffff;
      line-height: 83px;
      margin-bottom: 33px;
      margin-top: 42px;
      opacity: .5;
      &.hasValue {
        opacity: 1;
      }
    }
    .auth-login-sim-l {
      width: 464px;
      height: 92px;
      // background: linear-gradient(-10deg, #21a6ff, #147ffa);
      background: url('@/assets/img/login/kjdll.png') no-repeat;
      background-size: contain;
      border-radius: 40px;
      font-size: 36px;
      color: #ffffff;
      // line-height: 80px;
      font-weight: bold;
      margin: 0 auto;
      margin-bottom: 60px;
      margin-top: 50px;
    }

    .auth-sms {
      width: 100%;
      height: 83px;
      border: 2px solid #0e4dff;
      // opacity: 0.9;
      color: #0e4dff;
      border-radius: 98px;
      line-height: 83px;
      font-size: 33px;
      margin-bottom: 21px;
    }

    .l-xy {
      width: 100%;
      margin: 0 auto;
      color: #666666;
      font-size: 25px;
      text-align: center;
      line-height: 42px;
      // margin-top: -5px;
      // margin-left: 15px;
      margin: 0 auto;
      a {
        color: #838cfc;
      }
      .van-checkbox { 
        display: inline-block;
        position: relative;
        top: 6px;
        left: -5px;
        margin-right: 10px;
      }
      .xy-uncheck {
        width: 27px;
        height: 27px;
        background: #ffffff;
        border: 1px solid #b5b5b5;
        border-radius: 50%;
      }
    }

    .s-line {
      // width: 00px;
      // margin: 0 auto;
      height: 64px;
      font-size: 33px;
      // font-weight: bold;
      // margin-bottom: 36px;
      line-height: 50px;
      margin-top: 50px;
      color: #23262b;
    }

    .s-back {
      width: 64px;
      height: 64px;
      position: absolute;
      left: -9px;
      top: -4px;
    }
    .s-phone-sim, .s-phone, .s-sms {
      width: 100%;
      height: 90px;
      padding: 21px 33px;
      border-radius: 17px;
      background: #EFF2F6;
      font-size: 33px;
      margin-top: 24px;
      &::placeholder {
        color: rgba(99,105,117,0.5);
      }
      // margin-left: -20px;
    }
    .s-sms-line {
      position: relative;
      .s-sms {
        margin-top: 33px;
        padding-right: 220px;
      }
      .s-get {
        position: absolute;
        width: 240px;
        right: 33px;
        top: 54px;
        color: #838cfc;
        font-size: 33px;
        text-align: center;
        line-height: 50px;
      }
    }
  }
}
.flex {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto 20px auto;
  font-size: 36px;
  .txt {
    position: relative;
    font-weight: 700;
    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 50px;
      height: 10px;
      border-radius: 42px;
      background: linear-gradient(90deg, #85ccff, #6c69ff);
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
