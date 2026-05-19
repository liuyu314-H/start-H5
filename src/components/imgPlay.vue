<template>
  <div class="boxVideo">

    <van-overlay :show="props.imgShow">
      <div class="wrapper">
        <div class="block">
          <div class="block-X" @click="handelX">
            <img src="@/assets/img/remindScene/icon_titlebar_close.png" alt="" />
          </div>
          <div class="block-Y">
              <!-- <img src="@/assets/img/ip_xiaoling.png" alt="" /> -->
              <img v-if="props.imgData" :src="AESDecrypt(props.imgData)" alt="">
          </div>
        
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { AESDecrypt } from '@/utils/index' // 导入 AESDecrypt 函数
const props = defineProps({
  imgShow: {
    type: Boolean
  },
  imgData: {
    type: String
  }
})
const url = ref(props.imgData)
const video: any = ref(null)

const emit = defineEmits(['PlayImgShow'])

// 关闭弹窗
const handelX = () => {
  emit('PlayImgShow', false)
}

// watch(
//   () => props.videoData,
//   (a, b) => {
//     setTimeout(() => {
//       video.value ? video.value.load() : false
//       url.value = a
//     }, 100)
//   },
//   {
//     deep: true,
//     immediate: true
//   }
// )
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
  width: 640px;
  background-color: transparent;
  overflow: hidden;
  position: relative;

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
   &-Y {
    width: 640px;
    min-height: 300px;
    background: rgba(0,0,0,0.7); // 使用浅灰色背景，可根据UI设计调整颜色
    display: flex;             // 使用flex居中图片
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
  }
}
</style>
