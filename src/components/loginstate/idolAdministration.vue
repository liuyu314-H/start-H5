<template>
  <div class="box">
    <div class="idol" @click="handelOk">
      <div class="phonebox">
        <div class="phone">
          <div class="phoneleft">
            <!-- 1是音频2是视频 -->
            <!-- 需ui提供音频版切图 -->

            <!-- <img v-if="phonData.type == 2" src="@/assets/img/idolTelephone/ypb.png" alt="" /> -->
            <img src="@/assets/img/idolTelephone/spb.png" alt="" />
          </div>
          <span style="font-weight: bold">{{ phonData.phone || '' }}</span>

          <!-- <span style="font-size: 12px; margin: 3px 0 0 10px" @click="handelQh">切换</span> -->
        </div>
        <!-- @click="handelQlogin" 切换账号-->
        <div class="qh" v-if="switchuser" @click="hadnelTc"></div>
      </div>

      <div class="phonebom">
        <!-- <div class="leff"> -->
        <div class="guanli" @click="handelMyidol">
          我的明星
          <span class="colo">({{ phonData.idolNum }}位)</span>
        </div>
        <!-- </div> -->
        <div>
          <!-- 线 -->
          <img src="@/assets/img/idolTelephone/x.png" alt="" class="imgx" />
        </div>
        <!-- <div class="leff"> -->
        <div class="guanli" @click="handelYsz">
          已设置场景
          <span class="colo">({{ phonData.sceneNum }}个)</span>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
import 'vant/es/dialog/style'
import HRequest from '@/api'

const router = useRouter()
const { phonData, indexs, switchuser } = defineProps({
  phonData: {
    type: Object,
    default: { idolNum: 0, phone: '', sceneNum: 0, type: 0 }
  },
  indexs: {
    type: Number
  },
  switchuser: {
    type: Boolean
  }
})
// console.log(indexs)
console.log(phonData, '----------组件内数据-----------')
// 退出登录
const hadnelTc = () => {
  Dialog.confirm({
    title: '明星提示您',
    message: `确定要退出登录吗？`
  })
    .then(async () => {
      localStorage.removeItem('tk')
      localStorage.removeItem('phon')
      localStorage.removeItem('phonData')
      sessionStorage.setItem('ztlogin', '1')
      window.location.reload()
    })
    .catch(() => {
      console.log('取消')
    })
}
// import { useRouter } from 'vue-router'
// const router = useRouter()
const emit = defineEmits(['loginButton', 'videoQh', 'setScene', 'myidol'])
const data = reactive({
  dataArr: [
    // {
    //     name: '管理我的爱豆',
    //     index: 1,
    //     icon: Subtract
    // }
  ]
})
const phone = localStorage.getItem('phonData')
const handelOk = (item: object) => {
  console.log('我在idolAdministration.vue', item)
}
// 我的爱豆跳转
const handelMyidol = () => {
  emit('myidol', true)
}
// 已设置场景跳转
const handelYsz = () => {
  emit('setScene', true)
}
// const handelQlogin = () => {
//   emit('loginButton', true)
//   console.log('切换账号')
// }

// const handelQh = async () => {
//   if (!switchuser) {
//     return
//   }
//   await HRequest.changeType()
//   const res = await HRequest.userDetail()
//   console.log(res.data.type)

//   emit('videoQh', res.data.type)
// }
watch(
  phonData,
  (e, d) => {
    console.log(e, '----------组件内监听的数据-----------')
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="less" scoped>
.box {
  width: 708px;
  border-radius: 24px;
  font-size: 28px;
  font-weight: 500;
  color: #080a11;
  // margin-top: -30px;
  // margin-left: 20px;

  .idol {
    height: 180px;
    width: 690px;
    border-radius: 24px;
    padding: 16px 25px 0 25px;
    background: url('@/assets/img/idolTelephone/ylogin.png') no-repeat;
    background-size: cover;
    .phonebox {
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .phone {
        display: flex;
        font-size: 32px;

        .phoneleft {
          width: 43.82px;
          height: 50.58px;
          margin: -9px 10px 0 0;
          img {
            width: 100%;
          }
        }
      }
      .qh {
        width: 88px;
        height: 40px;
        background: url('@/assets/img/idolTelephone/tuic.png') no-repeat;
        background-size: cover;
        margin-right: -25px;
      }
    }
    .phonebom {
      display: flex;
      justify-content: space-around;

      .guanli {
        font-size: 28px;
        margin-left: 25px;
      }
      .colo {
        color: #fe6480;
        font-size: 24px;
      }
    }
  }
  // }
}
.imgx {
  margin-top: 10px;
}
</style>
