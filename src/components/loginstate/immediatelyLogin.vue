<template>
  <div class="boxcon">
    <div class="box">
      <div class="con">
        <div></div>
        <div class="login" @click.stop="handleLogin"></div>
      </div>
    </div>
  </div>

  <notSuccess :isShow="isShow">
    <windowTips :name="windowTipsname.name" :text="windowTipsname.text" @notShow="notShow"></windowTips>
  </notSuccess>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import notSuccess from '@/components/notSuccess.vue'
import windowTips from '@/components/windowTips.vue'

const isShow = ref(false)
const router = useRouter()
const emit = defineEmits(['loginButton'])
const windowTipsname = reactive({
  name: '',
  text: ''
})
const notShow = (e: boolean) => {
  console.log(e)
  isShow.value = e
}
const handleLogin = () => {
  emit('loginButton', true)
  console.log('登录，我在immediatelyLogin.vue')
  // router.push('/appLogin')
  // windowTipsname.name = '建设中'
  // windowTipsname.text = '暂无需登录，请直接设置使用'
  // isShow.value = true
}
</script>

<style lang="less" scoped>
.boxcon {
  position: relative;
  z-index: 0;
  // width: 100%;
  // background-color: chartreuse;
}
.box {
  height: 180px;
  width: 690px;
  // margin: 0 auto;
  background: url('@/assets/img/login/mi.png') no-repeat;
  background-size: contain;
  font-size: 28px;
  color: #fff;
  .con {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60px 0 60px;
  }

  .login {
    height: 55px;
    width: 188px;
    text-align: center;
    margin: -50px -40px 0 0;
  }
}
</style>
