<template>
  <div class="g">
    <div class="g-header">
      <img src="@/assets/img/g_back.png" alt="" class="g-back" @click="toIndex()" />
      <div class="g-center">
        <img src="@/assets/img/g_one.png" alt="" class="g-one" />
        <img src="@/assets/img/g_two.png" alt="" class="g-two" />
        <img src="@/assets/img/g_thr.png" alt="" class="g-thr" />
      </div>
    </div>
    <div class="g-bottom">
      <img src="@/assets/img/h_use.png" alt="" class="h-use" @click="getExp" />
    </div>
    <CheckVisual @closeVisualDialog="closeVisualDialog" v-if="isVisual"></CheckVisual>
    <Login @closeLoginDialog="closeLoginDialog" v-if="isLoginDialog"></Login>
  </div>
</template>

<script setup lang="ts">
import HRequest from '@/api'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import CheckVisual from '@c/CheckVisual.vue'
import { Toast } from 'vant'
import { $ref } from 'vue/macros'
import Login from '@c/Login.vue'
import router from '@/router/index.js'
let $router: Router = useRouter()

//获取活动id和渠道号
onMounted(() => {
  HRequest.setBigData({
    buttonName: '介绍页'
  })
})

function toIndex(): void {
  $router.push('/')
}
//登录弹窗
let isLoginDialog: Boolean = $ref(false)
const closeLoginDialog = (val: any): void => {
  isLoginDialog = val
  console.log(val)
  // getExp();
  if (!val) {
    getExp()
  } else {
    isLoginDialog = false
  }
}

//获取体验
let isVisual: Boolean = $ref(false)
const getExp = async () => {
  if (!localStorage.getItem('tk')) {
    // 弹出登录框
    // Toast('您的号码暂不符合本次活动要求~')
    console.log('我没登录')
    isLoginDialog = true
    return
  }
  console.log('我登录了')
  isVisual = true
  let res = await HRequest.getUserState()
  if (res.code == 200) {
    // 包类型 1为组合包（非和留言 并且 非来电提醒） 2为升级包（是和留言 或 是来电提醒）
    let type: string = res.data.hlyuser == 0 && res.data.ldtxuser == 0 ? '1' : '2'
    localStorage.setItem('packageType', type)

    Toast.loading('请稍后...')
    isVisual = true
  } else {
    Toast(res.msg)
  }
  HRequest.setBigData({
    buttonName: '介绍页-立即办理'
  })
}
//关闭选择秘书弹框
const closeVisualDialog = (val: any): void => {
  isVisual = false
}
</script>

<style lang="less" scoped>
.g {
  width: 750px;
  min-height: 100vh;
  background-color: #bbdcfc;

  .g-header {
    width: 750px;
    height: 900px;
    background: url(@/assets/img/g_bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    margin-bottom: 2180px;

    .g-back {
      width: 130px;
      height: 58px;
      position: absolute;
      left: 0;
      top: 30px;
    }

    .g-center {
      width: 702px;
      height: 2820px;
      background: rgba(243, 246, 255, 0.7);
      border: 1px solid #ffffff;
      border-radius: 20px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 319px;
      padding-top: 37px;
      text-align: center;
      .g-one {
        width: 632px;
        height: 420px;
        margin-bottom: 92px;
      }
      .g-two {
        width: 632px;
        height: 1220px;
        margin-bottom: 90px;
      }
      .g-thr {
        width: 632px;
        height: 906px;
      }
    }
  }

  .g-bottom {
    width: 750px;
    height: 280px;
    background: linear-gradient(0deg, #2e88fe 0%, rgba(50, 139, 255, 0) 100%);
    opacity: 0.9;
    padding-top: 100px;
    text-align: center;
    .h-use {
      width: 540px;
      height: 104px;
    }
  }
}
</style>
