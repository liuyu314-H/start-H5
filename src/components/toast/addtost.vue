<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-19
 * notSuccess.vue
-->
<template>
  <div>
    <van-overlay :show="props.toastShow">
      <div class="wrapper" @click.stop>
        <div :class="['block', props.toastTxT.cusClass]">
          <div class="odeBox">
            <div class="top">{{ props.toastTxT.title }}</div>
            <div class='txt'>
              {{ props.toastTxT.txt1 }}
              <span :style="{ color: props.toastTxT.color }">{{ props.toastTxT.txtcolor }}</span>
              <span v-if="props.toastTxT.txt3Html" v-html="props.toastTxT.txt3"></span>
              <span v-else>{{ props.toastTxT.txt3 }}</span>
            </div>

            <div class="flex">
              <div v-if="props.toastTxT.button == 1" class="button-rigth" @click="handelOk">{{ props.toastTxT.butonTxt }}</div>
              <div v-if="props.toastTxT.button == 2" class="button" @click="emit('toastEmit', false)">取消</div>
              <div v-if="props.toastTxT.button == 2" class="button button-qd" @click="handelYes">{{ props.toastTxT.onebtntxt }}</div>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
/**
 title: '头',
      txt1: '首段文本',
      txtcolor: '需要变色的文本',
      txt3: '第三段文本',
      color: '#000',//文本颜色
      button: '',// 数字1为单按钮 2为双按钮
      onebtntxt: ''// 双按钮文本
*/

const props: any = defineProps({
  toastTxT: {
    type: Object,
    default: {
      title: '温馨提示',
      txt1: '首段',
      txtcolor: '需要变色段',
      txt3: '',
      color: '#000',
      button: 1,
      onebtntxt: ''
    }
  },
  toastShow: {
    type: Boolean,
    default: false
  }
})
const determine: any = ref(props.toastShow)
const emit = defineEmits(['toastEmit'])
const handelYes = () => {
  console.log('二次确认')
  emit('toastEmit', 'OK')
  /**
   *逻辑处理
   */
}
const handelOk = () => {
  determine.value = false
  emit('toastEmit', false)
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 686px;
  background-color: #fff;
  border-radius: 28px;
  padding: 54px 38px;
  .odeBox {
    border-radius: 28px;
    text-align: center;
    .top {
      font-size: 36px;
      color: #333;
      font-weight: bold;
      margin-bottom: 38px;
    }
    .txt {
      font-size: 32px;
      line-height: 44px;
    }
    .flex {
      display: flex;
      justify-content: space-around;
      line-height: 80px;
      font-size: 32px;
      margin-top: 44px;
      .button {
        width: 240px;
        height: 80px;
        border-radius: 60px;
        border: 1px solid #c8c8c9;
      }
      .button-rigth {
        width: 480px;
        height: 92px;
        border-radius: 60px;
        background: #256fff;
        color: #fff;
        line-height: 92px;
      }
      .button-qd {
        color: #fff;
        background: linear-gradient(90deg, #00A2FF, #7C48FF);
      }
    }
  }
}
</style>
