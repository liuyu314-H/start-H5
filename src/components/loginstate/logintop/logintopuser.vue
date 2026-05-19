<template>
  <div class="idol" @click="handelOk">
    <div class="phonebox">
      <div class="phone">
        <span style="font-weight: bold">您好,{{ phonData.phone || '' }}</span>
        <div class="phoneleft">
          <!-- <img v-if="phonData.type == 1" src="@/assets/img/idolTelephone/ypb.png" alt="" /> -->
          <img src="@/assets/img/idolTelephone/spb.png" alt="" />
        </div>
      </div>
    </div>
    <div class="qh" @click="hadnelTc" v-if="switchuser"></div>
    <!-- <div class="phonebom">
        <div class="guanli">
          我的爱豆
          <span class="colo">({{ phonData.idolNum }}位)</span>
        </div>

        <div>
          <img src="@/assets/img/idolTelephone/x.png" alt="" class="imgx" />
        </div>

        <div class="guanli">
          已设置场景
          <span class="colo">({{ phonData.sceneNum }}个)</span>
        </div>
      </div> -->
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
console.log(indexs)
// 退出登录
const hadnelTc = () => {
  Dialog.confirm({
    title: '明星提示您',
    message: `确定要退出登录吗？`
  })
    .then(async () => {
      // localStorage.removeItem('tk')
      // localStorage.removeItem('phon')
      // localStorage.removeItem('phonData')
      sessionStorage.clear()
      localStorage.clear()
      sessionStorage.setItem('ztlogin', '1')
      window.location.reload()
    })
    .catch(() => {
      console.log('取消')
    })
}
// import { useRouter } from 'vue-router'
// const router = useRouter()
const emit = defineEmits(['loginButton', 'videoQh'])
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
    console.log(e, d)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="less" scoped>
.idol {
  width: 750px;
  height: 72px;
  position: absolute;
  z-index: 11;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 48px;
  color: #fff;
  font-size: 32px;

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
        margin: -1px 10px 0 10px;
        img {
          width: 100%;
        }
      }
    }
  }

  // .phonebom {
  //   display: flex;
  //   justify-content: space-around;

  //   .guanli {
  //     font-size: 28px;
  //     margin-left: 25px;
  //   }
  //   .colo {
  //     color: #fe6480;
  //     font-size: 24px;
  //   }
  // }
  .qh {
    width: 66.2px;
    height: 30px;
    background: url('@/assets/img/Exclusivevideo/tc.png') no-repeat;
    background-size: cover;

    // margin-right: -25px;
  }
}
// }

.imgx {
  margin-top: 10px;
}
</style>
