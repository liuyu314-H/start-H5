<template>
  <!-- headNavigation -->
  <!-- <headNavigation :headData="headData"></headNavigation> -->

  <div class="box">
    <div class="head">
      <img :src="urlForm(backgroud)" alt="" />
      <div class="head-1">
        <!-- <div class="head-1-1">
          <span>{{ text }}</span>
        </div> -->
        <!-- <div class="head-1-3 flex" @click="handelVideoStop"></div> -->
        <div class="head-1-2 flex" @click="handelExperience"></div>
      </div>
    </div>
    <div class="contentBox">
      <logintop @loginButton="loginButton" v-if="!loginShow"></logintop>
      <div>
        <logintopuser @loginButton="loginButton" :phonData="phonData" :switchuser="switchuser" v-if="loginShow"></logintopuser>
      </div>
      <div class="content">
        <div class="fs-18">明星简介</div>
        <div class="content-js">
          {{ text }}
        </div>
        <!-- 组合订购享受更多 -->
        <!-- <div>
                    <mergeOrder @orderShow="orderShows"></mergeOrder>
                </div> -->
      </div>
      <!-- 明星来电介绍 -->
      <telephoneIntroduce></telephoneIntroduce>
    </div>
  </div>
  <!-- 底部按钮 -->
  <!-- <bottomBanner :bottomData="bottomData"></bottomBanner> -->
  <!-- <div class="button-v" v-if="isOrder == 0" @click="handelAnswer">立即订购（{{ price }}元/月）</div> -->
  <div class="button-o" @click="handelPush">设置场景</div>
  <notSuccess :isShow="isShow">
    <div>
      <windowTips :name="windowTipsname.name" :text="windowTipsname.text" @notShow="notShow"></windowTips>
    </div>
  </notSuccess>
  <!-- 视频播放组件 -->
  <videoPlay :videoShow="videoShow" :videoData="videoData" @PlayShow="PlayShow"></videoPlay>
  <!-- 订购 -->
  <idolOrder v-if="orderShow" @onOrdershow="onOrdershow" :dataOrder="dataOrder" @type="type"></idolOrder>
  <!-- 订购成功 -->
  <toaststate :toastTxT="toasttxt" :toastShow="toastShow"></toaststate>
  <notSuccess :isShow="determine">
    <div class="odeBox">
      <div class="top">
        您已选择
        <span style="font-weight: bold">【 {{ route.query.idolName }}】</span>
        ，该业务为包月业务，确认订购后无法更改，如有疑问，请咨询归属地10086。
      </div>
      <div class="flex">
        <div class="button" @click="handelNo">取消</div>
        <div class="button-rigth" @click="handelYes">确认</div>
      </div>
    </div>
  </notSuccess>
  <toast :toastTxT="noUsertxt" :toastShow="nouserToast" @toastEmit="handelToast"></toast>

  <Login @closeLoginDialog="closeLoginDialog" @phonEncryption="phonEncryption" :canAuth="canAuth" v-if="isLoginDialog"></Login>
  <video ref="clickSound" :src="audio" controls autoplay autopsy webkit-playsinline="true" playsinline="true" preload="true" style="position: absolute; top: -10000px"></video>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { gdXmsStore } from '@/store'
import { Toast } from 'vant'
import { urlForm } from '@/utils/index'
import { $ref } from 'vue/macros'
import Login from '@c/Login.vue'
import HRequest from '@/api'
import logintop from '@/components/loginstate/logintop/logintop.vue'
import logintopuser from '@/components/loginstate/logintop/logintopuser.vue'
import notSuccess from '@/components/notSuccess.vue'
import telephoneIntroduce from '@/components/telephoneIntroduce.vue'
import windowTips from '@/components/windowTips.vue'
import videoPlay from '@/components/videoPlay.vue'
import toast from '@/components/toast/index.vue'

const router = useRouter()
const route: any = useRoute()
const toasttxt: any = ref({}) // 订购成功弹窗数据
const toastShow = ref(false) // 订购成功弹窗显示
const store = gdXmsStore()
const backgroud = ref(route.query.dtPicUrl) //背景图
const videoData = ref(JSON.parse(route.query.defaultSceneList)[0].dsUrl) //视频文件
const text = ref(route.query.adRemark)
const id = ref(route.query.id)
const isOrder: any = ref(route.query.isOrder)
const noUsertxt: any = ref({
  // title: '暂无权限使用',
  // txt: '您还不是明星来电用户'
  title: '温馨提示',
  txt1: '您还不是明星来电用户',
  // txtcolor: '【时代少年团马嘉祺】',
  // txt3: '的生日提醒，请保持电话畅通，注意接听来自125990的电话。',
  // color: '#3882FF',
  button: 1,
  butonTxt: '我知道了'
  // onebtntxt: '去办理'
})
const nouserToast = ref(false) // 无权限使用
const switchuser = ref(true) // 展厅内不展示退出按钮
if (sessionStorage.getItem('switchuser') == '1') {
  switchuser.value = false // 展厅内不展示退出按钮
}
const price = ref(sessionStorage.getItem('price'))
// const queryOrder = async (isOrders: string) => {
//   console.log('明星ID', isOrders)
//   const res = await HRequest.isOrder(isOrders)
//   console.log(res)
//   // isOrder.value = res.data ? 1 : 0
// }
// queryOrder(route.query.idolId)
// 关闭温馨提示
const handelToast = (e: boolean) => {
  toastShow.value = e
  nouserToast.value = false
  console.log(e)
}
const windowTipsname = reactive({
  name: '',
  text: ''
})
const successShow = (e: boolean) => {
  console.log('==========', e)

  isShow.value = false
}
const bottomData = reactive({
  name: '提醒场景管理',
  path: '/sceneDiscipline'
})
const isShow = ref(false)
const videoShow = ref(false)
const data = reactive({})
// 体验一下
// 点击播放视频||音频

const clickSound: any = ref(null) //音频播放ref
const audio = ref('') //
// 点击播放视频||音频
const videostop = ref('') // 按钮状态
const handelVideoStop = (item: any) => {
  videostop.value = ''
  console.log('我是暂停')
  clickSound.value.pause()
  console.log(clickSound.value.ended())
}

const onVideoEnde = () => {
  console.log('我播放结束了')
  videostop.value = ''
}
const handelExperience = async (item: object) => {
  const url = JSON.parse(route.query.defaultSceneList)[0].dsUrl
  const path = JSON.parse(route.query.defaultSceneList)[0].dsPath
  console.log(url, '替换为', urlForm(url))

  Toast.loading({
    duration: 0,
    message: '请稍后',
    forbidClick: true
  })
  if (path.indexOf('mp4') !== -1) {
    const res = await HRequest.play(urlForm(url), 2)
    if (res) {
      Toast.clear()
      clickSound.value.pause() // 暂停音频
      videoShow.value = true // 打开视频组件
      const blob = res
      videoData.value = window.URL.createObjectURL(blob)
    }
  } else {
    Toast.clear()
    audio.value = urlForm(url)
    clickSound.value.play()
  }
}
const PlayShow = (e: any) => {
  videoShow.value = e
}

// 组合介绍
// const orderShows = (e: boolean) => {
//     isShow.value = e
//     windowTipsname.name = '组合订购'
//     windowTipsname.text = '更多明星即将上线，敬请期待！'
// }
const notShow = (e: boolean) => {
  console.log(e)
  isShow.value = e
}
// const dataList = ref('')
// const idolConfigId = ref('')
// const mylist = async (e: any) => {
//   const res = await HRequest.getIdolList(e)
//   console.log('明星订购过形象渲染', res)
//   dataList.value = res.data
//   const result = res.data.filter((item: any) => item.idolId.includes(route.query.idolId))
//   idolConfigId.value = result[0].id
//   console.log(idolConfigId.value)
//   // imageList(result[0].id)
//   // phoneList(result[0].id)

//   // console.log(result[0].id)
// }
// // 帮我从[{name:'我是',id:10},{name:'我是a',id:10}]里面打印出包含字符串包含"我是"的对象
// mylist(1)
// const handelAdd = () => {
//   router.push({
//     path: '/remindScene',
//     query: {
//       idolId: route.query.idolId,
//       dsUrl: JSON.parse(route.query.defaultSceneList)[0].dsUrl,
//       adRemark: route.query.adRemark,
//       dtPicUrl: route.query.dtPicUrl,
//       familyId: 1, // 从这里默认为自己
//       idolConfigId: idolConfigId.value
//     }
//   })
// }

// const data = reactive({})
//登录弹窗
let isLoginDialog: Boolean = $ref(false)
const closeLoginDialog = (val: any): void => {
  isLoginDialog = false
  console.log('我是登录状态弹窗=========', val)
}
//一键登录获取号码
let canAuth: Boolean = $ref(false) //是否可以一键登录
const cmccAuth = async () => {
  let res1 = await HRequest.getAppId()
  if (res1.code != 200) {
    cmccAuthFail()
    return
  }
  let params2 = {
    preSign: window.YDRZ.getSign(res1.data, '1.2')
  }
  // console.log('params2数据', params2)

  let res2 = await HRequest.getSign(params2)
  // console.log('res2数据', res2)

  if (res2.code != 200) {
    cmccAuthFail()
    return
  }
  window.YDRZ.getTokenInfo({
    data: {
      version: '1.2',
      appId: res1.data,
      sign: res2.data,
      openType: '1'
    },
    success: async function (res3: any) {
      console.log('我4G取号成功了')
      store.setYDRZres(res3)
      getPhoneBy4G()
    },
    error: function (err3: any) {
      console.log(err3)
      console.log('我4G取号失败了')
      cmccAuthFail()
    }
  })
}
cmccAuth()
const cmccAuthFail = () => {
  canAuth = false
}
//获取号码，未登录
const getPhoneBy4G = async () => {
  console.log('未登录')
  // window.gdp('send')
  let ydrzRes: any = store.getYDRZres
  let params = {
    token: ydrzRes.token,
    userInformation: ydrzRes.userInformation,
    actId: store.getActId
  }
  console.log('getPhoneBy4G,数据', params)

  let res = await HRequest.getPhoneBy4G(params)
  if (res.code == 200) {
    store.setEncryptedPhone(res.data.phone)
    store.setShow(true)
    console.log('取号接口手机号获取成功', res)
    canAuth = true
    // queryOrder(route.query.idolId)
    // mylist(1)
  }
}
const loginButton = (e: Boolean) => {
  // const types: any = sessionStorage.getItem('userType') || 3
  // console.log(types, localStorage.getItem('tk'))
  // if (!localStorage.getItem('tk') && types !== 3) {
  //   nouserToast.value = true
  //   return
  // }
  cmccAuth()
  isLoginDialog = e
}
const loginShow = ref(localStorage.getItem('tk')) //判断登录显示
const phonEncryption = (data: any) => {
  window.location.reload()
  // 登陆成功
  userDetail() //获取用户信息
  // queryOrder(route.query.idolId) // 更新订购状态
  console.log('我不是空', data)
  loginShow.value = localStorage.getItem('tk')
  // if (localStorage.getItem('tk') && phonData.value.type !== '3') {
  //   nouserToast.value = true
  //   noUsertxt.value = {
  //     title: '暂无权限使用',
  //     txt: '您还不是明星来电用户'
  //   }
  // }
  // mylist(1)
}
const phonData: any = ref('')
const userDetail = async () => {
  const params = {
    loginChn: '4'
  }
  const res = await HRequest.userDetail(params)
  sessionStorage.setItem('userType', res.data.userType)
  console.log(res.data.userType)
  phonData.value = res.data
  if (localStorage.getItem('tk') && res.data.userType !== 3 && res.data.userType.value !== 2) {
    nouserToast.value = true
    noUsertxt.value = {
      title: '暂无权限使用',
      txt1: '您还不是明星来电用户',
      button: 1,
      butonTxt: '我知道了'
    }
  }
}
if (localStorage.getItem('tk')) {
  userDetail()
}
const handelPush = () => {
  console.log(route.query, '==')

  // const userType: any = sessionStorage.getItem('userType')
  // if (userType !== '3') {
  //   nouserToast.value = true
  //   noUsertxt.value = {
  //     title: '暂无权限使用',
  //     txt: '您还不是明星来电用户'
  //   }
  //   return
  // }
  // if (!localStorage.getItem('tk')) {
  //   nouserToast.value = true
  //   noUsertxt.value = {
  //     title: '温馨提示',
  //     txt: '请登录后使用'
  //   }
  //   return
  // }

  if (sessionStorage.getItem('userType') == '3' || sessionStorage.getItem('userType') == '2') {
    router.push({
      path: '/remindScene',
      query: {
        idolId: route.query.idolId
      }
    })

    return
  }

  nouserToast.value = true
  noUsertxt.value = {
    // title: '暂无权限使用',
    // txt: '您还不是明星来电用户'
    title: '暂无权限使用',
    txt1: '您还不是明星来电用户',
    // txtcolor: '【时代少年团马嘉祺】',
    // txt3: '的生日提醒，请保持电话畅通，注意接听来自125990的电话。',
    // color: '#3882FF',
    button: 1,
    butonTxt: '我知道了'
    // onebtntxt: '去办理'
  }
}
const orderShow = ref(false)
// 代接电话
const handelAnswer = (item: object) => {
  if (!localStorage.getItem('tk')) {
    Toast('请先登录！')
    return
  }
  console.log('3元/月', item)
  determine.value = true
}
const onOrdershow = (item: boolean): void => {
  orderShow.value = item
  console.log('我订购了吗=========', item)
}
const determine = ref(false)
const handelNo = () => {
  console.log('取消')
  determine.value = false
}
const dataOrder = ref({})
const handelYes = () => {
  console.log('确定', route.query)
  dataOrder.value = route.query
  determine.value = false
  orderShow.value = true
}
const type = (e: number) => {
  toastShow.value = true
  const idolName: any = sessionStorage.getItem('idolOrderData')
  toasttxt.value = {
    type: 'success',
    title: JSON.parse(idolName).idolName,
    txt: '可以设置明星提醒啦！',
    show: true
  }
  // mylist(1)
  isOrder.value = e
}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.box {
  width: 100%;
  height: 100%;
  word-wrap: break-word;
  background-color: #e8effd;

  .head {
    height: 423.5px;
    width: 100%;
    margin-bottom: -40px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    border-radius: 16px;

    img {
      width: 100%;
    }
    &-1 {
      // width: 450px;
      // height: 320px;
      // background-color: #256fff;
      position: absolute;
      bottom: 14px;
      right: 16px;
      // &-1 {
      //   width: 440px;
      //   height: 244px;
      //   background: url('@/assets/img/Exclusivevideo/Union.png');
      //   background-size: cover;
      //   span {
      //     font-size: 28px;
      //     line-height: 36px;
      //     color: #666;
      //     display: inline-block;
      //     margin: 14px 14px 14px 25px;
      //   }
      // }
      // &-2 {
      // margin: 280px 0 0 0;

      // &-1 {
      //   width: 184px;
      //   height: 60px;
      //   background: url('@/assets/img/Exclusivevideo/add.png') no-repeat;
      //   background-size: contain;

      //   line-height: 60px;
      // }
      &-2 {
        width: 184px;
        height: 60px;
        background: url('@/assets/img/Exclusivevideo/ty.png') no-repeat;
        background-size: contain;
        line-height: 60px;
      }
      &-3 {
        width: 184px;
        height: 60px;
        background: url('@/assets/img/Exclusivevideo/tyyx.png') no-repeat;
        background-size: contain;
        line-height: 60px;
      }
      // }
    }
  }
  .contentBox {
    width: 100%;
    // height: 500px;
    // background-color: royalblue;
    margin-top: -20px;
    border-radius: 0 30px 0 0;
    overflow: hidden;
    .content {
      padding: 30px 30px 0 30px;
      .content-js {
        background-color: #fff;
        // width: 708px;
        // height: 256px;
        border-radius: 16px;
        line-height: 48px;
        padding: 12px;
        font-size: 30px;
        color: #333;
        //超出两行省略号
        // text-overflow: -o-ellipsis-lastline;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-line-clamp: 5;
        // line-clamp: 5;
        // -webkit-box-orient: vertical;
      }
    }
  }
}
.odeBox {
  width: 668px;
  // height: 360px;
  border-radius: 28px;
  text-align: center;
  padding: 64px 50px;
  .top {
    font-size: 28px;
    color: #333;
    // font-weight: bold;
  }
  .flex {
    display: flex;
    justify-content: space-around;
    line-height: 80px;
    font-size: 32px;
    margin-top: 20px;

    .button {
      width: 240px;
      height: 80px;
      border-radius: 60px;
      border: 1px solid #c8c8c9;
      margin-right: 40px;
    }
    .button-rigth {
      width: 240px;
      height: 80px;
      border-radius: 60px;
      background-color: #838cfc;
      color: #fff;
    }
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.fs-18 {
  font-size: 36px;
  font-weight: bold;
  // margin-bottom: 24px;
  margin: 24px 0 24px 0;
}
.button-v {
  width: 624px;
  height: 92px;
  background: url('@/assets/img/idolTelephone/btn.png') no-repeat;
  background-size: contain;
  margin: 0 auto;
  line-height: 92px;
  text-align: center;
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  color: #fff;
  font-size: 32px;
}
.button-o {
  width: 624px;
  height: 100px;
  background: url('@/assets/img/idolTelephone/sz.png') no-repeat;
  background-size: contain;
  margin: 0 auto;
  line-height: 92px;
  text-align: center;
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  color: #fff;
  font-size: 32px;
}
</style>
