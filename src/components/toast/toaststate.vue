<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-19
 * notSuccess.vue
 成功失败警告提示
-->
<template>
  <div>
    <!-- <p @click="show = true">aaa</p> -->
    <van-overlay :show="determine">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="odeBox">
            <img v-if="props.toastTxT.type == 'success'" src="@/assets/img/Exclusivevideo/success.png" alt="" />
            <img v-if="props.toastTxT.type == 'warn'" src="@/assets/img/Exclusivevideo/success.png" alt="" />
            <img v-if="props.toastTxT.type == 'error'" src="@/assets/img/Exclusivevideo/success.png" alt="" />
            <div class="top">
              订购成功：
              <span style="color: #fe6480">{{ props.toastTxT.title }}</span>
            </div>
            <div class="txt">{{ props.toastTxT.txt }}</div>
            <div class="flex">
              <div class="button" @click="determine = false"></div>
              <!-- <div class="button-rigth" @click="handelYes">确认</div> -->
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
const props: any = defineProps({
  toastTxT: {
    type: Object,
    default: {
      title: '温馨提示',
      txt: '默认',
      show: false
    }
  },
  toastShow: {
    type: Boolean,
    default: false
  }
})
const determine: any = ref(props.toastShow)
const emit = defineEmits(['toastEmit'])

const show = ref(false)
const handelYes = () => {
  emit('toastEmit', false)
}
watch(
  props,
  (a, b) => {
    determine.value = b.toastShow
  },
  {
    deep: true
  }
)
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 668px;
  // height: 578px;

  background-color: #fff;
  border-radius: 28px;
  .odeBox {
    width: 668px;
    // height: 360px;
    border-radius: 28px;
    text-align: center;
    padding: 44px 78px 60px 78px;
    img {
      width: 160px;
      height: 160px;
    }
    .top {
      font-size: 36px;
      color: #333;
      font-weight: bold;
      margin-bottom: 38px;
    }
    .txt {
      font-size: 32px;
    }
    .flex {
      display: flex;
      justify-content: space-around;
      line-height: 80px;
      font-size: 32px;
      margin-top: 44px;
      .button {
        width: 480px;
        height: 92px;

        background: url('@/assets/img/Exclusivevideo/haode.png') no-repeat;
        background-size: cover;
      }
      .button-rigth {
        width: 240px;
        height: 80px;
        border-radius: 60px;
        background-color: #838cfc;
      }
    }
  }
}
</style>
