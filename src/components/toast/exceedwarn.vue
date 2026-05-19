<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-19
 * exceedwarn.vue
 *超出警告
-->
<template>
  <div>
    <!-- <p @click="show = true">aaa</p> -->
    <van-overlay :show="determine">
      <div class="wrapper" @click.stop="close">
        <div class="block">
          <div class="odeBox">
            <div class="top">
              <div>您已订购了
                <span class="billPointName">{{ props.idolList.billPointName }}</span>
              </div>
              <div>请选择一位明星为你服务</div>
            </div>
            <!-- <div class="txt">{{ props.warnTxT.txt }}</div> -->
            <div class="idolData">
              <div :class="['idol', item.starId == idolId ? 'checked' : '']" v-for="item in idolList" :key="item.starId" @click="handelImg(item)">
                <div><img :src="item.starPicUrl" alt="" /></div>
                <p>{{ item.starName }}</p>
              </div>
            </div>
            <div class="flex">
              <div class="button-rigth" @click="handelOk">{{ props.warnTxT.button }}</div>
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
import HRequest from '@/api'
import { Toast } from 'vant'
import { getURIParam, urlForm } from '@/utils/index'

const router = useRouter()
const props: any = defineProps({
  warnTxT: {
    type: Object,
    default: {
      title: '温馨提示',
      txt: '默认',
      button: '确 认'
    }
  },
  warnShow: {
    type: Boolean,
    default: false
  },
  idolList: {
    type: Array,
    default: []
  }
})

const determine: any = ref(props.warnShow)
const emit = defineEmits(['toastEmit'])
const idolList = ref()

/**
 *点击头像单选框
 */
const idolId = ref('')
const handelImg = (item: any) => {
  console.log(item.idolId)
  idolId.value = item.starId
}
// 点击遮罩层关闭弹窗
const close = (e:any) => {
  console.log(e.target.className)
  if (e.target.className == 'wrapper') {
    console.log(e.target.className)
    determine.value = false
  }
}
/**
 *确定选择
 */
const handelOk = async () => {
  const params = {
    starId: idolId.value,
    unifyId: props.idolList.unifyId
  }
  if (!idolId.value) return Toast('请选择明星！')
  console.log(params)
  Toast.loading({
    duration: 0,
    message: '请稍后',
    forbidClick: true
  })
  const res = await HRequest.selectIdol(params)
  if (res.code == 200) {
    emit('toastEmit', false)
    determine.value = false
    Toast.clear()
    return
  }
  Toast(res.msg)
  // router.go(-1)
}
watch(
  props,
  (a, b) => {
    determine.value = b.warnShow
    const arrData: any = []
    props.idolList.selectIdol.forEach((e: any) => {
      /**
       *isOrder==1不给展示
       */
      if (e.isOrder != 1) {
        arrData.push(e)
      }
    })
    idolList.value = arrData
    // console.log(props.idolList.selectIdol)
    // console.log(props.idolList.unifyId)
    // console.log(props.idolList.price)
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

  background: #fff url('@/assets/otherImg/more_rule_header.png') no-repeat top center;
  background-size: 100% auto;
  border-radius: 28px;
  .odeBox {
    width: 668px;
    // height: 360px;
    border-radius: 28px;
    text-align: center;
    padding: 42px 35px;
    margin: 0 auto;

    .top {
      font-size: 33px;
      line-height: 50px;
      color: #23262b;
      font-weight: bold;
      margin-bottom: 38px;
      justify-content: space-between;
      .billPointName {
        display: block;
        color: #00278d;
      }
      div:last-child {
        color: #636975;
        font-size: 31px;
        font-weight: normal;
        line-height: 46px;
        margin-top: 8px;
      }
    }
    .idolData {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      .idol {
        width: 188px;
        margin-bottom: 25px;
        margin-right: 17px;
        position: relative;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &::before {
          content: '';
          width: 40px;
          height: 40px;
          top: 8px;
          right: 8px;
          display: block;
          position: absolute;
          background: url('@/assets/img/img/no.png') no-repeat center;
          background-size: cover;
        }
        &.checked {
          > div {
            border-color: #0e4dff;
          }
          &::before {
            background-image: url('@/assets/img/img/yes.png');
          }
        }
        // margin: 0 auto;
        > div {
          border: 2px solid transparent;
          width: 188px;
          height: 188px;
          box-sizing: border-box;
          border-radius: 21px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          color: #23262b;
          font-size: 29px;
          line-height: 29px;
          margin-top: 17px;
        }
      }
    }
    .txt {
      font-size: 32px;
    }
    .flex {
      display: flex;
      justify-content: space-around;
      line-height: 92px;
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
        border-radius: 90px;
        background: linear-gradient( 90deg, #00A2FF 0%, #7C48FF 100%);
        color: #fff;
      }
    }
  }
}
</style>
