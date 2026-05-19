<script lang="ts" setup>
const { isOneKeyTips } = defineProps({
  isOneKeyTips: Boolean
})

const emit = defineEmits(['closeOneKeyTips'])

const closeOneKeyTips = () => {
  emit('closeOneKeyTips')
}
</script>

<template>
  <div class="z" v-show="isOneKeyTips">
    <div class="t-container">
      <div class="t-title">明星提示您</div>
      <div class="t-tips">本机号码一键登录功能，需在中国移动数据网络环境下才能正常使用。</div>
      <div class="t-step">步骤</div>
      <div>1）请关闭wifi、电信、联通网络；</div>
      <div>2）请打开移动数据网络；</div>
      <div>3）重新点击一键快捷登录按钮。</div>
      <div class="t-text">如按上述步骤仍不成功，请使用账号密码登录，或稍后再试。</div>
      <div class="t-sure" @click="closeOneKeyTips">知道了</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.z {
  z-index: 300;
}
.t-container {
  width: 640px;
  height: 560px;
  background: #ffffff;
  border: 4px solid #a9d8fc;
  border-radius: 24px;
  padding: 40px 48px 0px;
  color: #0f2944;
  font-size: 24px;
  .t-title {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  .t-tips {
    font-size: 28px;
    line-height: 36px;
    margin-bottom: 50px;
  }
  .t-step {
    font-size: 28px;
    font-weight: bold;
  }
  .t-text {
    margin-bottom: 20px;
  }
  .t-sure {
    width: 400px;
    height: 80px;
    background: linear-gradient(-10deg, #21a6ff, #147ffa);
    border-radius: 40px;
    margin: 0 auto;
    text-align: center;
    line-height: 80px;
    color: #ffffff;
    font-size: 36px;
    font-weight: bold;
  }
}
</style>
