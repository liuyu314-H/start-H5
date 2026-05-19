<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedNames">
        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component"  :key="$route.fullPath"  v-if="!$route.meta.keepAlive" />
  </router-view>
    <van-overlay :show="isShow">
      <div class="wrapper" @click="handelDialog">
        <div class="block">
          <div class="title">
            <!-- <img :src="data.Tips.icon" class="img" alt="" /> -->
            <!-- <span>{{ data.Tips.title }}</span> -->
          </div>
          <div class="text">
            <span>{{ data.Tips.text }}</span>
          </div>
          <div class="ok">我知道了</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive,computed } from 'vue'
import HRequest from './api'
import { useRouter } from 'vue-router'

const router = useRouter()

const isShow = ref(false)
const data = reactive({
  Tips: {
    text: ''
  }
})
//登录后只调用一次
// const checkIdol = async () => {
//   await HRequest.checkIdol()
//   await HRequest.isExperienceUser()
// }

// localStorage.getItem('tk') ? checkIdol() : null
const cachedNames = computed(() =>
  router.getRoutes()
        .filter(r => r.meta?.keepAlive)
        .map(r => r.name)
        .filter(Boolean)as string[]
)
// 置灰
const getAdPage = async () => {
  const res = await HRequest.getAdPage()
  if (res.data) { // true 置灰 false
    document.documentElement.style.filter = 'grayscale(100%)'
  }
}
getAdPage()
//浏览器指纹
// const getBrowerId = async (): Promise<void> => {
//     let browserMsg: any = await getBrowerId()
//     localStorage.setItem('browserId', browserMsg.murmur)
// }
const handelDialog = () => {
  console.log('取消')
  isShow.value = false
}
// const userDetail = async () => {
//   const res = await HRequest.userDetail()
//   if (localStorage.getItem('tk') && res.data.userType !== 3) {
//     sessionStorage.setItem('userType', res.data.userType)
//     return
//   }
// }
// userDetail()
</script>

<style lang="less">
/**
* 清空默认样式
*/
html {
  margin: 0;
  padding: 0;
  // background: url('@/assets/img/img/BG.png') no-repeat;
  background: linear-gradient(180deg, #ADCEFF, #8FC3FF);
  background-size: cover;
  // min-height: 100vh;
}

div {
  box-sizing: border-box;
}

body,
p {
  margin: 0;
}

a {
  text-decoration: none;
  color: #333;
}
h1 {
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  max-width: 750px;
  height: 100%;
  margin: 0 auto;
  color: #2c3e50;
}

ul,
li {
  list-style: none outside none;
  margin: 0;
  padding: 0;
}

input {
  box-sizing: border-box;
  outline: none;
  border: none;
}

input:focus {
  outline: none;
}

div,
img,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999999;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999999;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999999;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999999;
}

/**公共样式 */
.z {
  width: 750px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.72);
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 200;
}
.z-close {
  width: 64px;
  height: 64px;
  margin-top: 30px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  font-size: 30px;
  width: 640px;
  background-color: #fff;
  border-radius: 24px;
  text-align: center;

  .title {
    font-size: 36px;
    font-weight: 700;
    margin-top: 52px;
  }
  .text {
    width: 508px;
    height: 65px;
    font-size: 30px;
    margin: 30px auto 27px auto;
  }
  .ok {
    width: 400px;
    height: 80px;
    border-radius: 40px;
    background-color: #1a74d4;
    text-align: center;
    line-height: 80px;

    font-size: 36px;
    color: #fff;
    font-weight: 700;
    margin: 41px auto 57px auto;
  }
}
</style>
