<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-19
 *  视频播放
-->
<template>
  <div class="boxVideo">
    <!-- <p @click="show = true">aaa</p> -->
    <!-- @click="emit('PlayShow', false)" -->
    <van-overlay :show="props.videoShow">
      <div class="wrapper">
        <div class="block">
          <div class="block-X" @click="handelX">
            <img src="@/assets/img/remindScene/icon_titlebar_close.png" alt="" />
          </div>
          <!-- <video ref="video" src="https://fstest.hekouxin.com/f?fid=3Z1253FE31A5A28DDB687F0CD8E1569E4D76" controls webkit-playsinline="true" playsinline="true"></video> -->
          <video ref="video" controls webkit-playsinline="true" playsinline="true" autoplay controlslist="nodownload">
            <source :src="url" type="video/mp4" />
          </video>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  videoShow: {
    type: Boolean
  },
  videoData: {
    type: String
  }
})
const url = ref(props.videoData)
const video: any = ref(null)

const emit = defineEmits(['PlayShow'])

// 关闭弹窗
const handelX = () => {
  video.value.pause()
  emit('PlayShow', false)
}

watch(
  () => props.videoData,
  (a, b) => {
    setTimeout(() => {
      video.value ? video.value.load() : false
      url.value = a
    }, 100)
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="less" scoped>
.boxVideo {
  position: relative;
  z-index: 1000000;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  z-index: 1000;
}

.block {
  width: 622px;
  // height: 1084px;
  // min-height: 300px;
  // height: 1084px;
  // border-radius: 40px;
  // background-color: rgb(0, 0, 0);
  background-color: transparent;
  overflow: hidden;
  position: relative;
  video {
    width: 100%;
    height: 100%;
  }

  &-X {
    width: 48px;
    height: 48px;
    position: absolute;
    right: 26px;
    top: 20px;
    z-index: 100;
    img {
      width: 100%;
    }
  }
}
</style>
