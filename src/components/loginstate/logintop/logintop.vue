<template>
  <div class="boxcon">
    <div>开启与明星的亲密互动！</div>
    <div class="button" @click.stop="handleLogin"></div>
  </div>

  <notSuccess :isShow="isShow">
    <windowTips :name="windowTipsname.name" :text="windowTipsname.text" @notShow="notShow"></windowTips>
  </notSuccess>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// import notSuccess from '@/components/notSuccess.vue'
// import windowTips from '@/components/windowTips.vue'

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
  position: absolute;
  z-index: 1;
  top: 0;
  width: 750px;
  height: 72px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 48px;
  color: #fff;
  font-size: 32px;

  .button {
    width: 180px;
    height: 52px;
    background: url('@/assets/img/Exclusivevideo/bg_logain.png');
    background-size: cover;
  }
}
</style>
