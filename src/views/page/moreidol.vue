<!--
 * new page
 * @author: FuJing
 * @since: 2023-08-18
 * myidol.vue
-->
<template>
  <div class="box">
    <van-empty style="margin: 0 auto" v-if="listData.length == 0" image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80" description="暂无明星" />

    <div class="box-box" v-for="(item, index) in listData" :key="index">
      <div class="box-img">
        <img :src="item.adPicUrl" alt="" @click.stop="handelThing(item)" />
        <div class="bof">
          <img src="@/assets/img/remindScene/stop.png" alt="" v-if="item.adPicUrl == videostop" @click.stop="handelVideoStop(item)" />
          <img src="@/assets/img/Exclusivevideo/bof.png" alt="" @click.stop="handelExperience(item)" v-else />
        </div>
      </div>
      <div class="box-txt">{{ item.idolName }}</div>
      <div class="button-sy" v-if="item.isOrder == 0" @click.stop="handelAnswer(item)">
        {{ item.price }}元/月
        <img src="@/assets/img/Exclusivevideo/gwc.png" alt="" />
      </div>
      <div v-else class="button-fs" @click="handelSceneDiscipline(item)"></div>
    </div>
  </div>
  <!-- 订购 -->
  <idolOrder v-if="orderShow" @onOrdershow="onOrdershow" :dataOrder="dataOrder" @type="type"></idolOrder>
  <notSuccess :isShow="determine">
    <div class="odeBox">
      <div class="top">
        您已选择
        <span style="font-weight: bold">【{{ idolName }}】</span>
        ，该业务为包月业务，确认订购后无法更改，如有疑问，请咨询归属地10086。
      </div>
      <div class="flex">
        <div class="button" @click="determine = false">取消</div>
        <div class="button-rigth" @click="handelYes">确认</div>
      </div>
    </div>
  </notSuccess>
  <!-- 视频播放组件 -->
  <videoPlay :videoShow="videoShow" :videoData="videoData" @PlayShow="PlayShow"></videoPlay>
  <!-- 音频 -->
  <video ref="clickSound" :src="audio" controls autoplay autopsy webkit-playsinline="true" playsinline="true" preload="true" style="position: absolute; top: -10000px" @ended="onVideoEnde"></video>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import HRequest from '@/api'
const idolName = ref('')
const router = useRouter()
const listData: Ref<Array<listData>> = ref([])
interface listData {
  idolId: number
  smPicUrl: string
  idolName: string
  adRemark: string
  isOrder: string | number
  adPicUrl: string
  price: string
}
// 查询列表
const queryList = async (e: string | null, login: number) => {
  console.log(localStorage.getItem('tk'))
  // isLogin 0 为=未登录音视频混合，1.音频，2.视频    login  0未登录，1登录
  const res = await HRequest.oneClicklistIdol(1, 2, e == '0' ? '' : e, login)
  console.log(res.data.content)
  listData.value = res.data.content
}

queryList(localStorage.getItem('moreidol'), localStorage.getItem('tk') ? 1 : 0)
// 点击头像
const handelThing = (item: any) => {
  idolName.value = item.idolName // 二次确认弹窗文案
  router.push({
    path: '/starDetails',
    query: {
      ...item,
      defaultSceneList: JSON.stringify(item.defaultSceneList),
      friendSceneList: JSON.stringify(item.friendSceneList)
    }
  })
}
// 发送祝福(订购)
const handelSceneDiscipline = (item: any) => {
  router.push({
    path: '/remindScene',
    query: {
      idolId: item.idolId
      // ...item,
      // defaultSceneList: JSON.stringify(item.defaultSceneList),
      // friendSceneList: JSON.stringify(item.friendSceneList)
    }
  })
}
//=======点击订购=======
const determine = ref(false)
const orderShow = ref(false)
const dataOrder: Ref<object> = ref({})
const handelAnswer = (item: any) => {
  idolName.value = item.idolName // 二次确认弹窗文案
  sessionStorage.setItem('price', item.price)

  if (!localStorage.getItem('tk')) {
    Toast('请先登录！')
    return
  }
  console.log('3元/月', item)
  determine.value = true
  dataOrder.value = item
}
const handelYes = () => {
  console.log('确定')
  determine.value = false
  orderShow.value = true
}
const onOrdershow = (item: boolean): void => {
  orderShow.value = item
  console.log(item)
}
const type = (e: string) => {
  queryList(e, 1)
}
// =======点击播放视频||音频=========
const videoShow = ref(false)
const clickSound: any = ref(null)
const audio = ref('')
const videostop = ref('') // 按钮状态
const videoData = ref('')
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
const handelExperience = async (item: any) => {
  Toast.loading({
    duration: 0,
    message: '请稍后',
    forbidClick: true
  })
  // console.log('体验一下', JSON.parse(JSON.stringify(item)))
  const data = JSON.parse(JSON.stringify(item))
  // mp4时弹出弹窗播放视频，否则不弹出播放音频     默认场景数据
  if (data.defaultSceneList[0].dsPath.indexOf('mp4') != -1) {
    // videoData.value = data.defaultSceneList[0].dsUrl
    // console.log('我是视频', videoData.value)
    const res = await HRequest.play(data.defaultSceneList[0].dsUrl, 2)
    if (res) {
      videoShow.value = true
      Toast.clear()
      clickSound.value.pause() // 暂停音频
      videoShow.value = true // 打开视频组件
      const blob = res
      videoData.value = window.URL.createObjectURL(blob)
    }
  } else {
    Toast.clear()
    audio.value = data.defaultSceneList[0].dsUrl
    console.log(item)
    videostop.value = item.adPicUrl
    console.log('我是音频', audio.value)
    clickSound.value.play()
  }
}
const PlayShow = (e: boolean) => {
  videoShow.value = e
}
// =======点击播放视频||音频=======
</script>

<style lang="less" scoped>
.box {
  padding: 18px 11px;
  display: flex;

  // justify-content: space-around;
  align-self: order;
  flex-wrap: wrap;
  .fs-18 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  .box-box {
    width: 224px;
    height: 312px;
    border-radius: 16px;
    background-color: #fff;
    margin: 0 0 16px 0;
    padding: 16px 22px;
    font-size: 30px;
    margin-left: 15px;
  }
  .box-img {
    width: 180px;
    height: 180px;
    overflow: hidden;
    position: relative;
    .bof {
      width: 40px;
      height: 40px;
      position: absolute;
      left: 5px;
      bottom: 0px;
      img {
        width: 100%;
      }
    }
    img {
      width: 100%;
    }
  }
  .box-txt {
    font-size: 30px;
    color: #333;
    text-align: center;
    margin: 8px 0;
  }
  .button-sy {
    width: 140px;
    height: 48px;
    background: url('@/assets/img/Exclusivevideo/symy.png');
    background-size: cover;
    margin-top: 8px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 24px;
    img {
      width: 36px;
      height: 36px;
      margin-left: 10px;
    }
  }
  .button-fs {
    width: 140px;
    height: 48px;
    background: url('@/assets/img/Exclusivevideo/fszf.png');
    background-size: cover;
    margin-top: 8px;
    margin: auto;
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
</style>
