<template>
  <div class="z">
    <div class="l-container">
      <div class="l-box l-box2">
        <img src="@/assets/img/login/btn_close.png" alt="" class="z-closes" @click="onOrdershow" />
        <div class="dingo">
          <div class="s-line">现在订购</div>
          <div>
            <span style="color: #ff8049">
              {{ dataList.idolName }}
            </span>
            ： 资费{{ price }}元/月
          </div>
        </div>

        <img src="@/assets/s_back.png" alt="" class="s-back" v-if="canAuth" @click="backAuth" />

        <!-- <input
                    type="text"
                    maxlength="11"
                    class="s-phone"
                    placeholder="输入中国移动手机号"
                    v-model.lazy="phoneNum"
                    disabled
                    oninput="value=value.replace(/[^\d]/g,'')"
                /> -->
        <h3>{{ phonData }}</h3>
        <div class="s-sms-line">
          <input type="text" maxlength="6" class="s-sms" placeholder="输入短信验证码" v-model.lazy="smsCode" oninput="value=value.replace(/[^\d]/g,'')" />
          <div class="s-get" @click="getSmsCode" v-if="!isCounting">获取验证码</div>
          <CountDown :time="60 * 1000" format="ss s" v-else @finish="finishCounting" class="s-get"></CountDown>
        </div>
        <div class="button">
          <div class="auth-login-no" @click="onOrdershow">取消</div>
          <div class="auth-login" @click="smsLogin">确认订购</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import HRequest from '@/api'
import { $ref } from 'vue/macros'

import { gdXmsStore } from '@/store'
import { Toast, CountDown } from 'vant'
import { AESDecrypt, AesEncrypt } from '@/utils'
import { computed, ComputedRef } from '@vue/reactivity'
import { getURIParam } from '@/utils/index.js'
import { Ref } from 'vue'
// const props = defineProps({
//     dataOrder: {
//         type: Object
//     }
// })

const store = gdXmsStore()
const emit = defineEmits(['onOrdershow', 'phonEncryption', 'type'])

const phonData = localStorage.getItem('phonData') // 处理号码
const price = ref(sessionStorage.getItem('price')) // 获取价格
const { canAuth, dataOrder } = defineProps({
  canAuth: Boolean,
  dataOrder: Object
})
console.log(JSON.parse(JSON.stringify(dataOrder)))
const dataList = ref(JSON.parse(JSON.stringify(dataOrder)))

const onOrdershow = (): void => {
  emit('onOrdershow', false)
  // emit('type', dataList.value.type)

  console.log('取消')
}

//一键登录和短信登录切换
let showSMS: Boolean = $ref(false)
const toSMS = (): void => {
  showSMS = true
}
const backAuth = (): void => {
  showSMS = false
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
let checkXY: Boolean = $ref(false)

// let phoneNum: number | string = $ref('')
let smsCode: number | string = $ref('')
let isCounting: Boolean = $ref(false)

//获取短信验证码
const getSmsCode = async (): Promise<void> => {
  // let phone = phoneNum.toString()
  // let phones = AesEncrypt(phoneNum.toString())
  // if (phone.length < 11) {
  //     Toast('请输入11位手机号码')
  //     return
  // }
  let params = {
    phone: localStorage.getItem('phon'),
    actId: store.getActId
  }
  let res = await HRequest.getSmsCodeApi(params)
  if (res.code == 200) {
    isCounting = true
    Toast('短信验证码下发成功')
  } else {
    Toast(res.msg)
  }
}
//结束倒计时
const finishCounting = (): void => {
  isCounting = false
}
// 储存定购爱豆的信息
sessionStorage.setItem('idolOrderData', JSON.stringify(dataList.value))
//短信验证码登录
const smsLogin = async (): Promise<void> => {
  console.log('价格', price.value)

  // console.log(dataList.value.type)

  // console.log(
  //     '============',
  //     mobileStr(AESDecrypt('02oJGdbDhCMwmtR/Orgt6Q=='))
  // )
  // let phone = phoneNum.toString()
  // console.log(phone, '我是手机号')
  // window.gdp('setUserId', phone)
  // console.log(AesEncrypt(phone), '我是手机号')
  // localStorage.setItem('phon', AesEncrypt(phone))
  // console.log(phoneNum.toString(), '我是手机号')
  // store.setPhon(phone)

  // if (phone.length < 11) {
  //     Toast('请输入11位手机号码')
  //     return
  // }
  let code = smsCode.toString()
  if (code.length < 6) {
    Toast('请输入6位短信验证码')
    return
  }
  const params = {
    phone: localStorage.getItem('phon'),
    idolId: dataList.value.idolId,
    payCode: dataList.value.payCode
  }

  const res = await HRequest.csdg(params)
  console.log(res, '定购')

  if (res.code !== 200) {
    console.log('订购失败')
    Toast(res.msg)
    return
  }
  // console.log('订购成功')
  // Toast('订购成功！')
  emit('onOrdershow', false)
  console.log(params)
  emit('type', dataList.value.type)

  // if (!checkXY) {
  //     Toast('请认真阅读并勾选协议')
  //     return
  // }
}
</script>

<style lang="less" scoped>
.l-container {
  width: 640px;
  height: 580px;
  background: #ffffff;
  // border: 4px solid #a9d8fc;
  border-radius: 24px;
  color: #0f2944;

  .l-box {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    text-align: center;
    .z-closes {
      margin-left: 550px;
    }
    &.l-box2 {
      padding-top: 20px;
      position: relative;
    }

    .auth-title {
      font-size: 28px;
      margin: 0 auto;
      margin-bottom: 28px;
      text-align: left;
      width: 560px;
    }

    .auth-login {
      width: 240px;
      height: 80px;
      // background: url('@/assets/img/login/logindl.png');
      // background-size: cover;
      background: linear-gradient(90deg, #838cfc 0%, #7389ff 100%), linear-gradient(90deg, #838cfc 0%, #7389ff 100%);
      line-height: 80px;
      text-align: center;
      color: #fff;
      font-size: 32px;
      border-radius: 60px;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    .auth-login-no {
      width: 240px;
      height: 80px;
      border: #c8c8c9 1px solid;
      line-height: 80px;
      text-align: center;
      color: #333;
      font-size: 32px;
      border-radius: 60px;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    .auth-sms {
      width: 400px;
      height: 72px;
      border: 2px solid #868889;
      opacity: 0.9;
      border-radius: 36px;
      line-height: 72px;
      font-size: 30px;
      margin: 0 auto;
      margin-bottom: 40px;
    }

    .l-xy {
      width: 540px;
      margin: 0 auto;
      display: flex;

      .xy-uncheck {
        width: 27px;
        height: 27px;
        background: #ffffff;
        border: 1px solid #b5b5b5;
        border-radius: 50%;
      }

      .xy-text {
        color: #666666;
        font-size: 24px;
        width: 500px;
        text-align: left;
        line-height: 40px;
        margin-top: -5px;
        margin-left: 15px;
        a {
          color: #055fe7;
        }
      }
    }
    .dingo {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 8px;
    }
    .s-line {
      height: 64px;

      // font-weight: bold;
      // margin-bottom: 36px;
      line-height: 64px;
    }

    .s-back {
      width: 64px;
      height: 64px;
      position: absolute;
      top: 20px;
      left: 15px;
    }

    .s-phone {
      width: 460px;
      height: 80px;
      background: #ffffff;
      border: 2px solid #cccccc;
      border-radius: 8px;
      padding-left: 20px;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .s-phone-sim {
      width: 460px;
      height: 80px;
      background: #ffffff;
      border: 2px solid #cccccc;
      border-radius: 8px;
      padding-left: 20px;
      font-size: 30px;
      margin: 30px 0 30px 0;
    }

    .s-sms-line {
      width: 460px;
      height: 80px;
      display: flex;
      align-items: center;
      margin: 0 auto;
      margin-bottom: 30px;

      .s-sms {
        width: 280px;
        height: 80px;
        background: #ffffff;
        border: 2px solid #cccccc;
        border-radius: 8px;
        padding-left: 20px;
      }

      .s-get {
        width: 180px;
        height: 80px;
        color: #1b82ff;
        font-size: 28px;
        text-align: center;
        line-height: 80px;
      }
    }
  }
}
.flex {
  width: 80%;
  display: flex;
  align-items: center;

  justify-content: space-around;
  margin: 0 auto 20px auto;
  .img {
    height: 20px;
    margin: 0 50px 0 20px;
  }
  .txt {
    border-bottom: #838cfc 5px solid;
    color: #838cfc;
  }
}
.button {
  width: 80%;
  display: flex;
  margin: 0 auto;
}
</style>
