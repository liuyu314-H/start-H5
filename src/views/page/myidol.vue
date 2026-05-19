<!--
 * new page
 * @author: FuJing
 * @since: 2023-08-18
 * myidol.vue
-->
<template>
  <div class="boxbox">
    <div class="fs-18">
      我的明星
      <span style="color: #ffd976">（{{ videoList.length }}位）</span>
    </div>
    <van-empty v-if="videoList.length == 0" image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80" description="暂无明星" />

    <div class="box" v-else>
      <div class="box-box" v-for="(item, index) in videoList" :key="index">
        <div class="box-img">
          <img :src="urlForm(item.adPicUrl)" alt="" @click.stop="handelThing(item)" />
          <div class="bof">
            <img src="@/assets/img/remindScene/stop.png" alt="" v-if="item.adPicUrl == videostop" @click.stop="handelVideoStop(item)" />
            <img src="@/assets/img/Exclusivevideo/bof.png" alt="" @click.stop="handelExperience(item)" v-else />
          </div>
        </div>
        <div class="box-txt">{{ item.idolName }}</div>
        <!-- <div class="button-sy" v-if="item.isOrder == 0" @click.stop="handelAnswer(item)"></div> -->
        <div class="button-fs" @click="handelSceneDiscipline(item)"></div>
      </div>
    </div>
    <!-- <div class="fs-18">
      音频版
      <span>（{{ audioList.length }}位）</span>
    </div>
    <van-empty v-if="audioList.length == 0" image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80" description="暂无音频版爱豆" />

    <div class="box">
      <div class="box-box" v-for="(item, index) in audioList" :key="index">
        <div class="box-img">
          <img :src="item.adPicUrl" alt="" @click.stop="handelThing(item)" />
          <div class="bof">
            <img src="@/assets/img/remindScene/stop.png" alt="" v-if="item.adPicUrl == videostop" @click.stop="handelVideoStop(item)" />
            <img src="@/assets/img/Exclusivevideo/bof.png" alt="" @click.stop="handelExperience(item)" v-else />
          </div>
        </div>
        <div class="box-txt">{{ item.idolName }}</div>
        <div class="button-fs" @click="handelSceneDiscipline(item)"></div>
      </div>
    </div> -->
  </div>

  <!-- 定购 -->
  <idolOrder v-if="orderShow" @onOrdershow="onOrdershow" :dataOrder="dataOrder" @type="type"></idolOrder>
  <notSuccess :isShow="determine">
    <div class="odeBox">
      <div class="top">是否确认定购服务</div>
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
import { urlForm } from '@/utils'
import { Toast } from 'vant'
import HRequest from '@/api'

const router = useRouter()
const audioList: Ref<Array<listData>> = ref([])
const videoList: Ref<Array<listData>> = ref([])
interface listData {
  idolId: number
  smPicUrl: string
  idolName: string
  adRemark: string
  isOrder: string | number
  adPicUrl: string
}
sessionStorage.removeItem('typeName')
const userDetail = async () => {
  const params = {
    loginChn: '4'
  }
  await HRequest.userDetail(params)
}
if (localStorage.getItem('tk')) {
  userDetail()
}

const getIdolList = async () => {
  const res = await HRequest.getIdolList(1, 2)
  // const audio = res.data.filter((item: any) => item.type == 1)
  // const video = res.data.filter((item: any) => item.type == 2)
  if (res.code !== 200) {
    console.log('用户未登录!')
    router.push('/')
  }
  // audioList.value = audio
  videoList.value = res.data

  // 在这里进行列表渲染
}
getIdolList()
// 点击头像
const handelThing = (item: any) => {
  router.push({
    path: '/starDetails',
    query: {
      ...item,
      isOrder: item.isOrder,
      defaultSceneList: JSON.stringify(item.defaultSceneList),
      friendSceneList: JSON.stringify(item.friendSceneList)
    }
  })
}
// 发送祝福(定购)
const handelSceneDiscipline = (item: any) => {
  console.log(item)

  router.push({
    path: '/remindScene',
    query: {
      idolId: item.idolId,
      idolConfigId: item.id
      // ...item,
      // defaultSceneList: JSON.stringify(item.defaultSceneList),
      // friendSceneList: JSON.stringify(item.friendSceneList)
    }
  })
}
//=======点击定购=======
const determine = ref(false)
const orderShow = ref(false)
const dataOrder: Ref<object> = ref({})
const handelAnswer = (item: object) => {
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
const type = (e: number) => {
  // queryList(e, 1)
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
    console.log('视频链接：', videoData.value)
    const res = await HRequest.play(urlForm(data.defaultSceneList[0].dsUrl), 2)
    if (res) {
      Toast.clear()
      clickSound.value.pause() // 暂停音频
      videoShow.value = true // 打开视频组件
      const blob = res
      videoData.value = window.URL.createObjectURL(blob)
      console.log(videoData.value)
    }
  } else {
    audio.value = urlForm(data.defaultSceneList[0].dsUrl)
    console.log(item)
    Toast.clear()
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
.boxbox {
  padding: 14px;
}
.fs-18 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 24px;
  span {
    font-size: 24px;
    color: red;
  }
}
.box {
  display: flex;
  align-self: order;
  flex-wrap: wrap;

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
  }
  .button-fs {
    width: 132px;
    height: 50px;
    background: url('@/assets/img/Exclusivevideo/fszf.png') no-repeat;
    background-size: cover;
    margin-top: 8px;
    margin: auto;
  }
}
.odeBox {
  width: 668px;
  height: 360px;
  border-radius: 28px;
  text-align: center;
  padding: 64px 50px 0 50px;
  .top {
    font-size: 36px;
    color: #333;
    font-weight: bold;
  }
  .flex {
    justify-content: space-around;
    line-height: 80px;
    font-size: 32px;
    margin-top: 94px;
    .button {
      width: 240px;
      height: 80px;
      border-radius: 60px;
      border: 1px solid #c8c8c9;
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
