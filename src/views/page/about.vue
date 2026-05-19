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
            <div><img src="@/assets/img/img/logoImg.png" alt=""></div>
            <div>明星来电</div>
            <div>版本号：{{ hzbH5Version }}</div>
        </div>
        <div class="aboutDetails">
            <div class="about-bottom">
                <div class="about-title" @click="showDirection = !showDirection">
                    <div>产品介绍</div>
                    <div><img :src=" showDirection?direction1:direction2" alt=""></div>
                </div>
                <div class="introduction" v-if="showDirection">明星来电是一款提供真人明星与热门动漫IP内容的来电提醒产品。支持给自己或亲友设置自己喜爱的明星形象下包括生日祝福、早安提醒等多个场景。设置成功后，用户将在指定时间接听到明星的视频电话。</div>
            </div>
            
             <div class="about-title about-bottom" @click="navigateMxyhxy">
                <div>用户协议</div>
                <div ><img :src=" direction2" alt=""></div>
            </div>
             <div class="about-title about-bottom" @click="navigateMxyszc">
                <div>隐私政策</div>
                <div><img  :src="direction2" alt=""></div>
            </div>
             <div class="about-title about-bottom" @click="navigateSummary">
                <div>隐私协议摘要</div>
                <div><img  :src="direction2" alt=""></div>
            </div>
             <div class="about-title about-bottom" @click="navigateAct"> 
                <div>中国移动认证服务 </div>
                <div><img :src="direction2" alt=""></div>
            </div>
        </div>
    </div>
 
</template>

<script setup lang="ts">
import { reactive, ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import direction1 from "@/assets/img/img/direction1.png";
import direction2 from "@/assets/img/img/direction2.png";
const data = reactive({});
const router = useRouter();
const showDirection =ref(false);
const hzbH5Version = ref('')

  onMounted(async()=>{
     const encryptedPhone = sessionStorage.getItem("user");
    if (encryptedPhone) {
      const userData = JSON.parse(encryptedPhone);
      hzbH5Version.value=userData.hzbH5Version
    }
    
  })
const backMethod = () => {
  window.history.back();
};
const navigateMxyhxy = () => {
    router.push({
      path: "/mxyhxy"
    });
    
  }
  const navigateMxyszc = () => {
    router.push({
      path: "/mxyszc"
    });
    
  }
    const navigateSummary = () => {
    router.push({
      path: "/summary"
    });
    
  }
  
  const navigateAct=()=>{
    window.location.href = "https://wap.cmpassport.com/resources/html/contract.html";
  }
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
.aboutContent{
    text-align: center;
    margin-bottom: 60px;
    >div:first-child{
        width: 136px;
        height: 136px;
        margin: auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
    >div:nth-child(2){ 
        padding: 16px 0 4px;
        font-weight: 500;
        font-size: 32px;
        color: #23262B;
    }
    >div:last-child{ 
        font-size: 28px;
        color: #636975;
    }

}
.aboutDetails{
    margin: 0 32px;
}
.about-title{
    margin-top: 24px;
    height: 104px;
    line-height: 104px;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    color: #23262B;
    
    img{
        width: 32px;
        height: 32px;
    }
}
.about-bottom{
    border-bottom: 1px solid #DDE7F5;

}
.introduction{
    font-weight: 400;
    font-size: 24px;
    color: #23262B;
    margin-bottom: 28px;
}
</style>
