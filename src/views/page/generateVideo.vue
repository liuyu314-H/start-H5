
<template>
      <!-- 我的场景管理 -->
  <div class="box">
    <div class="video-head" v-if="synthesis=='1'">
      <div><img src="@/assets/img/img/loading.svg" alt=""></div>
      <div>视频正在合成中，预计等待30秒 </div>
      <div>请稍后...</div>
    </div>
    <div class="playVideo-head" v-if="synthesis=='2'">
      <div>
        <video  controls @ended="onVideoEnded" style="width: 100%;" :src="playUrl"></video>

      </div>
      <div class="playVImg" @click='pauseImg' >
        <img v-if="isPlayImg"  src="@/assets/img/img/playImg.png" alt="">
        <img v-else src="@/assets/img/img/pauseImg.png" alt="">
      </div>
    </div>
      <div class="video-head" v-if="synthesis=='3'">
      <div><img src="@/assets/img/img/fallImg.png" alt=""></div>
      <div>{{ errText }} </div>
      <div class="tryAgain" @click="listVideo">点击重试</div>
    </div>
    <div class="goModify" v-if="synthesis!=='2'" @click="backMethod">返回修改</div>
    <div v-else class="moreIdol">
      <div class="modifyBtn" @click="backMethod">返回修改</div>
      <div class="sureBtn" @click="confirmSave">确定保存</div>
    </div>
    
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref,reactive,onMounted } from 'vue'
  import { useRouter,useRoute } from 'vue-router'
  import { getURIParam,AESDecrypt,AesEncrypt } from '@/utils/index.js'
  import HRequest from '@/api'
  import { nextTick } from 'vue';
  import { Toast } from 'vant'
  import successIcon from '@/assets/img/img/success.png'
  import volcPoint from "@/utils/volc-collect";
  const route: any = useRoute();
  const router: any = useRouter();
  let volc = new volcPoint("明星来电", "自定义视频");
  volc.initEvent();
// 埋点
volc.pageViewEvent("mxld_",{module:"明星来电",module_code:'mxld', page_name: '自定义视频',page_code:"custom video", page_url: window.location.href })



  const synthesis=ref('1')
   const playUrl = ref()
   const isPlayImg= ref(true)
   const isSaving = ref(false) // 添加保存状态标志
   const showToast=ref(true)
   const errText = ref("视频不小心掉线了");
   const singleId=ref('')
  //  const content = ref("");
  //  content.value = route.query.content;

  onMounted(async()=>{
    listVideo()
  })
  const backMethod = () => {
  showToast.value=false
  window.history.back();
  //  router.push({
  //   path: "/customize",
  //   query: {
  //     type: differentId.value
  //   }
  // });
};
  //    const changeWriting = () => {
  //   Toast.loading({
  //     message: '视频正在合成中，预计等待30秒 请稍后...',
  //     forbidClick: true, // 禁止背景点击
  //     loadingType: 'spinner',
  //     duration: 0 ,// 持续显示
  //     // className: 'custom-toast'
  //   });
  //   //  Toast.clear();
   
  // }
  // changeWriting()
  const listVideo = async() => {
     synthesis.value='1'
    if(sessionStorage.getItem('content')){
      const params = {
          content: sessionStorage.getItem('content'),
          starId:sessionStorage.getItem('starId'),
          templateId:sessionStorage.getItem('templateId')
        }
        try {
       const res = await HRequest.createVideo(params);
       if(res.code==200){
        synthesis.value='2'
        playUrl.value=AESDecrypt(res.data.diyVideoUrl)
        singleId.value=res.data.templateId
        if(showToast.value==true){
            Toast({
            message: '视频生成成功',
            icon: successIcon,
          });
        }
       }else{
        synthesis.value='3'
        if(res.msg&& res.msg != null){
          errText.value=res.msg
        }
       }
        console.log(res.data,'生成视频')
      } catch (error) {
      // 处理网络错误或HTTP错误状态（如504）
      synthesis.value='3'
    }
    }
  }
  const pauseImg= () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
         isPlayImg.value = false;
      } else {
        videoElement.pause();
         isPlayImg.value = true;
      }
    }
  }
  const onVideoEnded=()=>{
    console.log('播放完成')
    isPlayImg.value = true;

  }
  const confirmSave = async() => {
     // 如果正在保存中，则不执行后续操作
     console.log("保存中",isSaving.value)
  if (isSaving.value) return
  
  isSaving.value = true // 设置为保存中状态
  const starId = sessionStorage.getItem("starId");
  const settingsType = sessionStorage.getItem("settingsType");
  
   const params = {
          diyVideoUrl: AesEncrypt(playUrl.value),
          starId:starId,
          templateId:singleId.value
        }
       const res = await HRequest.saveDiyScene(params);
       if(res.code==200){
         Toast({
          message: '场景保存成功',
          icon: successIcon,
        });
        // 无论成功或失败，都恢复按钮状态
          isSaving.value = false
         // 根据settingsType是否存在决定传递的参数
        if(settingsType){
          router.push({
            path: '/remindScene',
            query: {
              type: 2
            }
          });
        }else{
          // starId存在，传递starId参数
          router.push({
            path: '/remindScene',
            query: {
              starId: starId
            }
          });

        }
       // 清除sessionStorage中的starId
      // sessionStorage.removeItem("starId");
      // sessionStorage.removeItem("settingsType");

       }else{
        Toast(res.msg)
        // 无论成功或失败，都恢复按钮状态
        isSaving.value = false
       }
       console.log(res.data,'保存场景')

  


}
  </script>
  
  <style lang="less" scoped>
  .box {
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  height: auto;
  min-height: 100vh;
  background: #000;
  .head {
    height: 466px;
    width: 100%;
    position: relative;
    img {
      width: 100%;
    }
  }
}
.video-head{
  margin-top: 400px;
  font-size: 26px;
  color: #FFFFFF;
  text-align: center;
  img{
    width: 80px;
    height: 80px;
  }

}
.goModify{
  position: fixed;
  bottom: 64px;
  width: 320px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  height: 80px;
  line-height: 80px;
  background: rgba(0,0,0,0.4);
  border-radius: 43px 43px 43px 43px;
  border: 1px solid rgba(175,185,204,0.5);
  font-size: 32px;
  color: #FFFFFF;

}
.tryAgain{

   width: 320px;
  margin: 32px auto;
  text-align: center;
  height: 80px;
  line-height: 80px;
  background: rgba(0,0,0,0.4);
  border-radius: 43px 43px 43px 43px;
  border: 1px solid rgba(175,185,204,0.5);
  font-size: 32px;
  color: #FFFFFF;
}
.playVideo-head{
   position: relative;
  width: 100%;
  height: 100vh; /* 或根据实际需要设置高度 */

}
   video {
        width: 100%;
        height: 100%;
        outline: none;
      }
  &::-webkit-media-controls-panel {
    display: none !important;
  }
  
  &::-webkit-media-controls-start-playback-button {
    display: none !important;
  }
.playVImg{
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 40;
  img{
    width: 100%;
    height: 100%;
  }
}
.moreIdol{
    position: fixed;
  bottom: 64px;
  width: 656px;
  left: 0;
  right: 0;
  display: flex;
  margin: auto;

  .modifyBtn{
    /* 样式 */
  width: 320px;
  height: 80px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
  color: #FFFFFF;
  background: rgba(0,0,0,0.4);
  border-radius: 43px 43px 43px 43px;
  border: 1px solid rgba(175,185,204,0.5);
  }
  .sureBtn{
    /* 样式 */
     width: 320px;
    height: 80px;
    text-align: center;
    height: 80px;
    line-height: 80px;
    font-size: 32px;
    color: #FFFFFF;
    background: linear-gradient( 90deg, #00A2FF 0%, #7C48FF 100%);
    border-radius: 43px 43px 43px 43px;
    border: 1px solid rgba(175,185,204,0.5);
    margin-left: 16px;
  }
}
</style>