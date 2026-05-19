<template>
  <div class="z">
    <div class="v-container">
      <img src="@/assets/img/v_select.png" alt="" class="v-select" />
      <div class="v-tltle">
        <span>A版形象包:</span>
        含8个秘书形象，默认形象为晓璇，可在
        <span>“和留言来电秘书”</span>
        小程序中切换
      </div>
      <van-swipe :loop="false" :width="swipeItemWidthXF" :show-indicators="false" class="v-swiper">
        <van-swipe-item v-for="item in SWIPER_DATA" :key="item.id">
          <img :src="getAssetsFile(item.icon)" alt="" class="v-ip" />
          <div class="v-name">{{ item.name }}</div>
        </van-swipe-item>
      </van-swipe>
      <img src="@/assets/img/select_a_btn.png" alt="" class="select-a" @click="navTo('A')" />
      <div class="v-tltle">
        <span>B版形象包:</span>
        含以下秘书形象，默认形象为EGD战队，可在
        <span>“和留言来电秘书”</span>
        小程序中切换
      </div>
      <van-swipe :loop="false" :width="swipeItemWidthXF" :show-indicators="false" class="v-swiper">
        <van-swipe-item v-for="item in CAIXUN_DATA" :key="item.id">
          <img :src="getAssetsFile(item.icon)" alt="" class="v-ip" />
          <div class="v-name">{{ item.name }}</div>
        </van-swipe-item>
      </van-swipe>
      <img src="@/assets/img/select_b_btn.png" alt="" class="select-a select-b" @click="navTo('B')" />
      <div class="v-bottom-tips">明星提示您：形象包一经选择，不可更换哦～</div>
    </div>
    <img src="@/assets/img/btn_close.png" alt="" class="z-close" @click="closeVisualDialog" />
  </div>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros'
import { onMounted } from 'vue'
import HRequest from '@/api'
import { Toast } from 'vant'
import { SWIPER_DATA, CAIXUN_DATA } from '@/config'
import { getAssetsFile } from '@/utils'
let type: string | null = $ref('')
onMounted(() => {
  type = localStorage.getItem('packageType')
})

const emit = defineEmits(['closeVisualDialog'])

const closeVisualDialog = () => {
  emit('closeVisualDialog', 0)
}

// 跳转套餐
const navTo = async (tc: string) => {
  console.log(tc)
  Toast.loading({
    duration: 0,
    forbidClick: true,
    message: '请稍后...'
  })
  // 新增请求token拼链接
  let res = await HRequest.getNavToken()
  let tk = res.data.cmpptoken
  console.log(tk, '=====')

  res.code == 200 ? Toast.clear() : Toast('网络错误，请稍后重试！')
  // if (res.code != 200) {
  //     Toast('网络开小差啦，请稍后再试~')
  //     tk = ''
  //     // window.location.href =
  //     //     'https://www.gx.10086.cn/zt-portal/gxhzg/portal/hzg_wap/template/20230420153709994?token='
  //     return
  // } else {
  // tk = res.data.cmpptoken
  // }

  // type 包类型 1为组合包（非和留言 并且 非来电提醒） 2为升级包（是和留言 或 是来电提醒）
  let url: string = ''
  console.log(tc, type)

  if (tc === 'A' && type === '1') {
    console.log('A组合https://www.gx.10086.cn/zt-portal/gxhzg/portal/hzg_wap/template/20230420153709994?token=' + tk)

    //A组合
    HRequest.setBigData({
      buttonName: '点击A组合包'
    })
    url =
      // 'https://m.sd.10086.cn/zapi/sso/in/groupSso/doBusiness.do?businessCode=YHBA1426?token=' +
      // tk
      'https://www.gx.10086.cn/zt-portal/gxhzg/portal/hzg_wap/template/20230420153709994?token=' + tk
  } else if (tc === 'A' && type === '2') {
    console.log('A升级https://www.gx.10086.cn/zt-portal/gxhzg/portal/hzg_wap/template/20230420140636082')
    //A升级
    HRequest.setBigData({
      buttonName: '点击A升级包'
    })
    url =
      // 'https://m.sd.10086.cn/zapi/sso/in/groupSso/doBusiness.do?businessCode=SJBA1424?token=' +
      // tk
      'https://www.gx.10086.cn/zt-portal/gxhzg/portal/hzg_wap/template/20230420140636082?token=' + tk
  } else if (tc === 'B' && type === '1') {
    console.log('B组合https://www.gx.10086.cn/zt-portal/gxhzg/portal/hzg_wap/template/20230420154112559')
    //B组合
    HRequest.setBigData({
      buttonName: '点击B组合包'
    })
    url = 'https://www.gx.10086.cn/zt-portal/gxhzg/portal/hzg_wap/template/20230420154112559?token=' + tk
  } else if (tc === 'B' && type === '2') {
    console.log('B升级https://www.gx.10086.cn/zt-portal/gxhzg/portal/hzg_wap/template/20230420141429318')
    //B升级
    HRequest.setBigData({
      buttonName: '点击B升级包'
    })
    url = 'https://www.gx.10086.cn/zt-portal/gxhzg/portal/hzg_wap/template/20230420141429318?token=' + tk
  }
  // console.log(type, url)
  console.log(url)

  window.location.href = url
}

// 单个轮播图宽度
let swipeItemWidthXF: number = (210 * document.body.clientWidth) / 750 //单个轮播图宽度
</script>

<style lang="less" scoped>
.v-container {
  width: 640px;
  height: 1020px;
  background: #ffffff;
  border-radius: 20px;
  padding-top: 47px;
  text-align: center;

  .v-select {
    width: 450px;
    height: 40px;
    margin-bottom: 20px;
  }

  .v-tltle {
    width: 544px;
    margin: 0 auto;
    color: #0f2944;
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 18px;

    span {
      font-weight: bold;
    }
  }

  .v-swiper {
    width: 560px;
    height: 230px;
    // background-color: red;
    margin: 0 auto;
    margin-bottom: 10px;

    .van-swipe-item {
      height: 230px;
    }
  }

  .v-ip {
    width: 180px;
    height: 180px;
  }

  .v-name {
    font-size: 26px;
  }

  .select-a {
    width: 440px;
    height: 90px;
    margin-bottom: 20px;
  }

  .c-box {
    width: 412px;
    height: 230px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: 10px;

    .c-item {
      width: 180px;
      height: 230px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }

  .select-b {
    margin-bottom: 00px;
  }

  .v-bottom-tips {
    font-size: 24px;
    color: #5b6068;
    margin: 0 auto;
  }
}
</style>
