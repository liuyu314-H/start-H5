<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-19
 * notSuccess.vue
-->
<template>
  <div>
    <!-- <p @click="show = true">aaa</p> -->
    <van-overlay :show="determine">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="odeBox">
            <div class="top">{{ props.toastTxT.title }}</div>
            <div class="txt">{{ props.toastTxT.txt }}</div>
            <div class="flex">
              <!-- <div class="button" @click="determine = false">取消</div>
              <div class="button-rigth" @click="handelYes">确认</div> -->
              <div class="button-rigth" @click="handelOk">好的</div>
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

const props: any = defineProps({
  toastTxT: {
    type: Object,
    default: {
      title: '温馨提示',
      txt: '默认'
    }
  },
  toastShow: {
    type: Boolean,
    default: false
  }
})
const determine: any = ref(props.toastShow)
const emit = defineEmits(['toastEmit'])
console.log(props)

const show = ref(false)
const handelYes = () => {
  emit('toastEmit', false)
}
const handelOk = () => {
  determine.value = false
  emit('toastEmit', false)
  // localStorage.removeItem('tk')
  // if (!localStorage.getItem('tk')) {
  //   window.location.reload()
  // }
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
  width: 686px;
  // height: 578px;

  background-color: #fff;
  border-radius: 28px;
  .odeBox {
    width: 668px;
    // height: 360px;
    border-radius: 28px;
    text-align: center;
    padding: 44px 8px 60px 8px;
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
        width: 240px;
        height: 80px;
        border-radius: 60px;
        border: 1px solid #c8c8c9;
      }
      .button-rigth {
        width: 480px;
        height: 92px;
        border-radius: 60px;
        background-color: #838cfc;
        color: #fff;
        line-height: 92px;
      }
    }
  }
}
</style>
