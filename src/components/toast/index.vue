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
        <div class="block">
          <div class="odeBox">
            <div class="top">{{ props.toastTxT.title }}</div>
            <div class="txt">
              {{ props.toastTxT.txt1 }}
              <span :style="{ color: props.toastTxT.color }">{{ props.toastTxT.txtcolor }}</span>
              <br v-if="props.toastTxT.br" />
              <br v-if="props.toastTxT.br" />

              {{ props.toastTxT.txt3 }}
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
import { Toast } from 'vant'
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
      br: false, // 是否换行0不换行，1换行
      onebtntxt: '', // 二次确认按钮的文案
      butonTxt: '好的' // 单按钮的文案
    }
  },
  toastShow: {
    type: Boolean,
    default: false
  }
})
const determine: any = ref(props.toastShow)
const emit = defineEmits(['toastEmit', 'okForm'])

const show = ref(false)
const handelYes = () => {
  console.log('二次确认')
  Toast.loading({
    duration: 0,
    message: '请稍后',
    forbidClick: true
  })
  emit('okForm')
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
  background: #fff url('@/assets/otherImg/more_rule_header.png') no-repeat top;
  background-size: 100% auto;
  border-radius: 28px;
  padding: 27px 83px 33px;
  .odeBox {
    border-radius: 28px;
    text-align: center;
    .top {
      font-size: 36px;
      color: #333;
      font-weight: bold;
      margin-bottom: 69px;
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
      margin-top: 67px;
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
        background: linear-gradient(108deg, #00a2ff, #7c48ff);
        color: #fff;
        line-height: 92px;
      }
      .button-qd {
        color: #fff;
        background: linear-gradient(108deg, #32a5ff 4%, #d920ff 52%);
      }
    }
  }
}
</style>
