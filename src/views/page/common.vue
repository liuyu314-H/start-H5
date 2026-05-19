<template>
    <div class="box">
        <div class="contentBox">
            <div class="cellBoxdom">
                <div class="back-box" @click="backMethod">
                <img class="back-icon" src="@/assets/otherImg/back_icon.png" alt="" />
                </div>
            </div>
        </div>
        <div class="aboutContent">
          <div>
            <div v-for="(item, index) in commonList" :key="index" class="commonItem">
                  <div class="common-title">
                      <img src="@/assets/img/img/askImg.png" alt="">
                      {{ item.name }}</div>
                  <div class="common-content">
                      <img src="@/assets/img/img/questionsImg.png" alt="">
                      {{ item.questions }}</div>
              </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref,onMounted } from "vue";
import { useRouter } from "vue-router";
const data = reactive({});
const router = useRouter();
const showDirection =ref(false);
const hzbH5Version = ref('')
const commonList = ref<any>([
    {
    name:'明星来电如何使用？',
    questions:'用户成功登录明星来电H5页面后，进入添加场景页面选择场景、设置重复日期、来电时间（如用于赠送亲友，则还需添加亲友手机号）后，明星来电平台将会在用户设定的时间，向被叫发起单向视频来电呼叫。目前苹果终端暂不支持接收来自明星的视频电话请求，会回落至音频电话。',
    },
    {
      name:'为亲友设置明星来电提醒的功能如何操作使用？',
      questions:'已订购用户，可在设置场景页面，选择【给亲友】，添加好需要接收来电的亲友手机号码，该位亲友将在设置好的时间接收到您为其设置的明星来电提醒。（仅支持移动号码接听）',
    },
    {
      name:'为亲友设置明星来电提醒的功能是否有设置条数限制？',
      questions:'用户每天最多设置3次明星来电提醒，每月最多设置31次明星来电提醒。',
    },
    {
      name:'亲友接听明星来电呼叫电话收费吗？',
      questions:'不收费。',
    },
    {
      name:'如果亲友错过了明星来电呼叫电话，后续还会提醒吗？',
      questions:'不会，需重新设置。',
    },
    {
      name:'为什么我订购的IP不支持自定义场景？',
      questions:'因IP版权方要求，对场景内容有严格规范，后续将持续丰富使用范围。',
    },
    {
      name:'用户如何查看设置记录？',
      questions:'订购成功后登录明星来电选择“我订购的明星”页面点击界面上方设置管理，查看当前设置记录。',
    },
    {
      name:'为什么我没有在指定时间收到125990外呼？',
      questions:'请查询设置的号码是否有效（无关机、欠费、携号转网等问题）、是否拦截125990，或当天设置已达3通上限，若均无以上问题，请联系10086客服查询处理。',
    }

]);
const backMethod = () => {
  window.history.back();
};


</script>

<style lang="less" scoped>
  .box {
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  height: auto;
  min-height: 100vh;
//   filter: blur(158.89999389648438px);
background: linear-gradient( 180deg, #F0F7FF 0%, #ECF3FF 100%);
  .contentBox{
    width: 56px;
    height: 56px;
    background: rgba(0,0,0,0.5);
    border-radius: 4px 4px 4px 4px;
    margin: 24px;
  }
  .cellBoxdom{
    width: 56px;
    height: 56px;
    img{
      transform: rotate(180deg);
    }
    
  }
}
.aboutBox{
  margin-bottom: 20px;
}
.aboutContent{
    margin: 40px auto 120px;
  >div{
    width: 680px;
    margin: 24px auto;
    
  }
  .commonItem{
    border-radius: 16px;
    padding: 24px;
    background: rgba(255,255,255,0.8);
    margin-bottom: 20px;
    // background: red;
  }
img{
  width: 32px;
  height: 32px;
  vertical-align: middle; // 让图片与文字垂直居中对齐
}
.common-title{
    font-weight: 700;
    font-size: 30px;
    color: #23262B;
    margin-bottom: 16px;
}
.common-content{
  font-weight: 400;
  font-size: 28px;
  color: #23262B;

}
}

</style>
