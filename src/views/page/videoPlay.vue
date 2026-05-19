
<template>
    <div class="boxss">
          <!-- <video ref="video" autoplay controls webkit-playsinline="true" playsinline="true" controlslist="nodownload">
            <source :src="playUrl" type="video/mp4" />
          </video> -->
          <video ref="video" controls autoplay loop style="width: 100%;" :src="playUrl" webkit-playsinline="true" playsinline="true" controlslist="nodownload"></video>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getURIParam,AESDecrypt } from '@/utils/index.js'
  import HRequest from '@/api'
  import { nextTick } from 'vue';
  import { Toast } from 'vant'
  const props: any = defineProps({})
  const router = useRouter()

  const video = ref()
  const playUrl = ref()
  const ringId = getURIParam('ringId')
  const getIdolList = async () => {
    if(!ringId){return  Toast('请填写正确的ringId')}
    const params = {
      ringId: ringId
  }
  const res = await HRequest.getSceneUrl(params) 
  if (res.code == 200){
    if(res.data){
      playUrl.value=AESDecrypt(res.data)
      console.log(res.data,AESDecrypt(res.data),playUrl.value,'打印')
      await nextTick(); // 确保 DOM 更新

    }else{
      Toast('获取视频失败')
    }

  }else{
    Toast('获取视频失败')
  }
}

getIdolList ()
  </script>
  
  <style lang="less" scoped>
  .boxss {
    width: 100%;
    height: 100vh;
    z-index: 1;
    video {
        width: 100%;
        height: 100%;
      }
  }
  </style>
  