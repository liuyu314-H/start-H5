<template>
  <!-- 我的场景管理 -->
  <div class="box">
    <div class="contentBox">
      <div class="cellBoxdom">
        <div class="back-box" @click="backMethod">
            <img class="back-icon" src="@/assets/otherImg/back_icon.png" alt="" />
            <img class="back-title" src="@/assets/otherImg/brityImg.png" alt="" />
        </div>
        <div class="scene-box">
          <div class="scene-upImg" v-if="uploadSetImg">
          <van-uploader :before-read="beforeRead1" :accept="'image/png,.png, .jpg'">
            <div class="scene-up">
              <div class="scene-up-img">
                <img src="@/assets/otherImg/diyUpImg.png" alt="" />
                <div style="color:#000;">上传照片</div>
              </div>
            </div>
          </van-uploader>
          <div class="tips">
            <div>请上传1张五官清晰的正面照片/不可上传</div>
            <div>公众人物</div>
        </div>
          </div>
          <div class="upending" v-else>
            <div class="upensuccessImg">
              <div 
                  v-if="synthesizing" 
                  class="upOverlay"
                >
                  <van-loading color="#2875FF" />
                  <span class="overlayText">合成中</span>
              </div>
              
               <img v-if="synthesizing"  src="@/assets/otherImg/bg.webp" alt="" />
               <img v-else  :src="AESDecrypt(SynmageUrl)" alt="" />
            </div>
            <div v-if="diyFgureId!='2'&&groupStatus!='4'">
            <div  v-if="synthesizing" class="type refreshbtn" @click="refresh"> <img src="@/assets/otherImg/refreshImg.png" alt="" /><span>刷新</span></div>
            <div  v-else>
              <div class="type" :class="groupStatus=='3'?'type1':''"> <img :src="groupStatus=='2'||groupStatus=='5'?success1:failure" alt="" /><span>{{ groupStatus=='2'?'合成成功':groupStatus=='5'?'审核通过':'合成失败' }}</span></div>
            </div>
            <van-uploader :before-read="beforeRead"  v-if="!synthesizing" :accept="'image/png,.png, .jpg'">
              <van-button round  type="default" style="width: 120px;">重新上传</van-button>
          </van-uploader>
          </div>
          </div>
        </div>
          <div class="duration-time">
          <div class="cellBox">
            <div class="cellBox-on">
              <van-cell
                title="合影模板"
                :value="faceType"
                class="year"
                @click="showPopup"
                is-link
              ></van-cell>
            </div>
            <div class="cellBox-on">
              <van-cell
                title="形象名称"
                :value="myName"
                class="year"
                is-link
                @click="showCalledName"
              ></van-cell>
            </div>
          </div>
        </div>
          <div class="boxs">
            <div class="boxs-0" :class="{ 'disabled': !setComplete }" @click="handelImgStop">预览</div>
            <div class="boxs-1" :class="{ 'disabled': !setComplete }" @click="handCreateImage">{{ groupStatus=='4'?'保存':'确认创建' }}</div>
          </div>
          <div class="Statement">
            本页面所有图片由AI技术生成
          </div>
      </div>
    </div>  
  </div>


  <!-- 编辑形象弹窗 -->
    <notSuccess :isShow="showSceneName">
    <div class="phoneAdd">
        <div class="title">形象名称</div>
        <div class="custom-textareaAi">
            <input
            maxlength="6"
            v-model="calledName"
            type="text"
            label=""
            placeholder="请输入形象名称"
            @input="changeCallName" 
            />
            <div class="cleanUpFlex">
                <div>{{ calledName.length }}/6</div>
            </div>
        </div>
        <div class="delwarn">
        <img src="@/assets/img/img/warn.png" alt="">
        <div>不支持输入表情、特殊字符</div>
        </div>
        <div class="buttom">
        <van-button round @click="handelNameqx">取 消</van-button>
        <van-button type="primary" :disabled="calledName.length == 0" round @click="handelNameqd"
            >确 定</van-button
        >
        </div>
    </div>
    </notSuccess>
    <!-- 选择模板 -->
    <van-popup 
    :show="showModule"  
    closeable
    position="bottom"
    class="popup-with-radius"
    @close="handlePopupClose"
    :style="{ height: videoList.length <= 3 ? '55%' : '85%',borderRadius: '16px 16px 0 0' }"
    >
    
    <div class="changeBusiness">
        <div class="popup-title"><div class="t-1">选择明星同框模板</div><div class="t-2">（今日剩余<span class="count">{{ remainingCount }}</span>/{{dailyLimit}}次）</div></div>
      <div :class="videoList.length > 3 ? 'template-grid1' : 'template-grid2'">
        <div  v-for="(item, index) in videoList"
        :key="index"
        class="template-item"
        >
        <van-radio-group :disabled="remainingCount==0"  @click="selectTemplate(item)" v-model="templateChecked" direction="horizontal">
          <van-radio :name="item.templateId"></van-radio>
           <!-- v-if="showUse!=item.templateId" -->
        </van-radio-group>
          <div 
            class="template-img"
            :class="{ 'template-img-active': templateChecked == item.templateId }"
          >
          <img :src="AESDecrypt(item.coverImageUrl)" alt="" />
          <!-- 选中状态覆盖层 -->
          <div 
            v-if="showUse==item.templateId" 
            class="overlay"
          >
            <van-icon name="success" class="check-icon" />
            <span class="use-text">使用中</span>
          </div>
          </div>
          <div 
          class="template-name"
          :class="{ 'template-name-active': templateChecked == item.templateId }">
          {{item.templateName}}
        </div>
        </div>
        <div v-if="videoList.length==0" style="padding: 80px;">暂无数据</div>
        
      </div>
      <div class="actions">
          <div class="actions-2" @click="generate2" :class="{ 'disabled': templateChecked=='' || remainingCount==0 }">确定合成</div>
        </div>
    </div>
    </van-popup>
    <imgPlay :imgShow="imgShow" :imgData="imgData" @PlayImgShow="PlayImgShow"></imgPlay>
</template>
<script setup lang="ts">
import { ref, reactive, Ref,onMounted,nextTick  } from "vue";
import { getURIParam,AESDecrypt } from '@/utils/index.js'
import { useRouter,useRoute } from "vue-router";
import { Toast } from "vant";
import router from "@/router";
import "vant/es/dialog/style";
import HRequest from '@/api'
import success1 from '@/assets/otherImg/success1.png'
import failure from '@/assets/otherImg/failure.png'
const route: any = useRoute();
const faceType =ref('去选择')
const myName=ref('我的形象')
const remainingCount = ref(0);
const dailyLimit = ref(5);
const synthesizing = ref(false)
const popupImg = ref<any>(null)
const setComplete = ref(false)
const showSceneName = ref(false); // 管理形象名称弹窗
const uploadSetImg=ref(false); // 上传的图片是否完成
const calledName = ref(''); // 形象名称
const showModule = ref(false); // 同款模板弹窗
const templateChecked=ref('') // 选择模板
const showUse=ref('');  // 是否使用模板
const imgShow = ref(false); // 图片弹窗显示
const imgData = ref('')     // 新增：存储要显示的图片 URL
// const videoList:any = ref([]); // 模板视频
const diyFgureId = ref("");
diyFgureId.value = route.query.id;
const SynthesizingData = ref<any[]>([]) // 合成视频数据
const SynmageUrl=ref('')  // 形象图片
const SynmageUrlT=ref('')  // 形象图片提交数据使用
const groupStatus=ref('0') // 状态
const HealthId=ref('') // 主键id
const starId=ref('') // 明星id
const imageId=ref('') // 合影形象id
const templateImageUrl=ref('') // 模板封面图
const isSaving = ref(false) // 添加保存状态标志

const videoList:any = ref([])
onMounted(() => {
  if(diyFgureId.value){
    uploadSetImg.value=false // 已上传图片
    getStarFrameData()
  }else{
    uploadSetImg.value=true
    console.log('diyFgureId不存在')
  }
})
// 刷新
const refresh=()=>{
  getStarFrameData()
}
const getStarFrameData = async () => { 
   const frame = await HRequest.getStarFrameList()
   if (frame.code==200) {
    SynthesizingData.value=frame.data
    const framedata=frame.data[0]
    starId.value = framedata.id
    // framedata[0].status=3
    groupStatus.value = framedata.status
    imageId.value = framedata.imageId //合影想象ID
    HealthId.value=framedata.id //主键ID
    myName.value = framedata.imageName
    //  图片赋值
    if([2, 4].includes(framedata.status)){
      setComplete.value=true
      SynmageUrl.value = framedata.imageComposeUrl 
      faceType.value = framedata.templateName
      templateChecked.value=framedata.templateId
    }else{
      SynmageUrl.value = framedata.imageUrl
      faceType.value = framedata.templateName
    }
    SynmageUrlT.value = framedata.imageUrl
    //  多种状态处理
    switch (framedata.status) {
    case 1:
      synthesizing.value = true
      break
    case 2:
    case 3:
      synthesizing.value = false
      break
    case 4:
      // setComplete.value=true
      break
    default:
      console.log('创建完成', framedata.status)
  }
    
  
   }
};
const handelImgStop = () => {
  imgShow.value = true
  imgData.value = SynmageUrl.value // 传递明星图片 URL
}
const backMethod = () => {
  router.push({
      path: "/",
    });
};
const showPopup=async()=>{
if(groupStatus.value=='4') { //创建完成不可更改模板
  Toast('同框模板不可编辑，如需修改，请删除形象后重新创建')
  return
}
if(uploadSetImg.value==true){
  Toast('请先上传图片，审核通过后可选择合影模板')
  return

}
if(synthesizing.value){
  Toast('合成中不可选择合影模板')
  return

}
console.log('选择模板11',faceType.value)
  // showUse.value=templateChecked.value
    showModule.value=true
  //当日合成次数
  await getCount()
  // 获取模板列表
  await getTemplate()
    if (faceType.value != '去选择') {
    const selectedItem = videoList.value.find((item: any) => item.templateName == faceType.value)
    if (selectedItem) {
      templateChecked.value = selectedItem.templateId
      showUse.value = selectedItem.templateId
    }
  }
}
const getCount = async () => { 
    // 当日合成次数
    try {
       const res = await HRequest.getComposeCount()
      if (res.code == 200) {
           remainingCount.value=res.data?.remainingCount
           dailyLimit.value=res.data?.dailyLimit
            console.log('当日使用合成功能次数详情',res.data)
      }else{
          Toast(res.msg)
      }
  } catch (error) {
      console.log(error);
  }
}
const getTemplate = async () => { 
    // 获取模板列表
    try {
       const res = await HRequest.getStarFrameTemplate()
      if (res.code == 200) {
           videoList.value=res.data
             console.log('获取模板',res.data)
      }else{
          Toast(res.msg)
      }
  } catch (error) {
      console.log(error);
  }
}

 const beforeRead = (file:any) => {
  uploadSetImg.value=true
  templateChecked.value=''
  showUse.value='' //是否使用模板
  faceType.value='去选择'
  setComplete.value=false // 是否可以预览和创建
  beforeRead1(file)
   return true; // 返回 true 允许上传继续
    };
 const beforeRead1 = async(file:any) => {
        if (file.size / 1024 / 1024 > 5) {
          Toast(`图片大小不能超过5MB`)
           return undefined; // 阻止上传
        }else{
        Toast.loading({
          duration: 0,
          message: '请稍等...',
          forbidClick: true
        })
        
          console.log(file,'filefilefilefile');
          let formData = new FormData();
          formData.append("file", file);
          console.log(formData.getAll('file')) // 获取指定键的所有值
          console.log(formData,'6666');
          try {
            const res = await HRequest.uploadImage(formData);
            if(res.code==200){
              Toast('上传成功')
              groupStatus.value='5' // status=5审核通过
              uploadSetImg.value=false  
              SynmageUrl.value=res?.data
              SynmageUrlT.value=res?.data
            }else{
              Toast(res.msg)            
            }
          } catch (error) {
            Toast('上传失败')
          console.log(error);
            
          }
          return undefined;
        }
      // if (file.type !== 'image/jpeg') {
      //   Toast('请上传 jpg 格式图片');
      //   return false;
      // }
    };
  const changeCallName=(event: Event)=>{
  const text = (event.target as HTMLTextAreaElement).value;
  calledName.value=text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g,'')
}
const handelNameqx= () => {
  showSceneName.value = false;
 
};
const handelNameqd= async() => {
  // const params = {
  //     id: HealthId.value,
  //     name:calledName.value,
  //   }
   const params = {
      text: calledName.value
    }
  try {
       const res = await HRequest.checkText(params);
      if (res.code == 200) {
            Toast('修改名称成功');
            myName.value = calledName.value;
            showSceneName.value = false;
      }else{
        Toast('请重新设置合规的名称');
          calledName.value = '';
          // showSceneName.value = false;
      }
  } catch (error) {
      console.log(error);
  }

};
const showCalledName= () => {
  showSceneName.value = true;
  calledName.value = myName.value;
 
};
// 关闭弹窗
const handlePopupClose=()=>{
  showModule.value = false;
}
const generate2=async()=>{
      // 如果正在保存中，则不执行后续操作
      if (isSaving.value) return
      isSaving.value = true // 设置为保存中状态
    // videoList.value.forEach(async (item: any, index: number) => { 
    //   if(templateChecked.value == item.templateId){
    //     faceType.value=item.templateName
    //     showUse.value = item.templateId  // ✅ 添加这行，存储模板ID
    //     templateImageUrl.value=item.coverImageUrl  // 模板封面图
    //     console.log('选择模板',templateChecked.value)
    //   }
    // });
    const selectedItem = videoList.value.find((item: any) => item.templateId === templateChecked.value);
     if (!selectedItem) {
    console.error('未找到匹配的模板信息', templateChecked.value);
    Toast('模板信息异常，请刷新重试');
    return;
  }
  console.log('确认合成111',selectedItem)
    Toast.loading({
        duration: 0,
        message: '请稍等...',
        forbidClick: true
      })
    // 确定合成
     const params = {
      // starId: starId.value,
      imageId:imageId.value,
      templateId: selectedItem.templateId,
      imageUrl:SynmageUrlT.value,
      // templateImageUrl:selectedItem.coverImageUrl,
    }
    try {
       const res = await HRequest.createImage(params);
      if (res.code == 200) {   
        Toast.clear();   
        await getStarFrameData()  // 获取合成结果并更新状态
      }else{
        Toast(res.msg);
      }
  } catch (error) {
     Toast.clear();
      console.log(error);
      
  }finally {
    // 2. 无论成功失败，都重置状态
    isSaving.value = false
  }
    showModule.value=false
    faceType.value = selectedItem.templateName;
    showUse.value = selectedItem.templateId;
}
const selectTemplate=(item:any)=>{
  if(remainingCount.value==0){
    Toast('AI同框次数已达上限，请明天再来')
      // templateChecked.value=item.templateId
      return
  }
    templateChecked.value=item.templateId
    showUse.value=''
    console.log('选择模板',templateChecked.value)
}
const PlayImgShow = (e: boolean) => {
  imgShow.value = e
}
const handCreateImage=async()=>{
    console.log('确认创建111',videoList.value)
    if(videoList.value.length==0){
       await getTemplate()
    }
    const selectedItem = videoList.value.find((item: any) => item.templateId === templateChecked.value);
     if (!selectedItem) {
        console.error('未找到匹配的模板信息', templateChecked.value);
        Toast('模板信息异常，请刷新重试');
        return;
      }
      // 确认创建
    const params = {
      imageId: imageId.value,
      templateId: templateChecked.value,
      imageUrl:SynmageUrlT.value,
      imageName:myName.value,
      templateImageUrl:selectedItem.coverImageUrl,
    }
    try {
       const res = await HRequest.createStarFrame(params);
      if (res.code == 200) {
            Toast('创建成功');
            router.push({
              path: "/",
            });
      }else{
        Toast(res.msg);  
      }
  } catch (error) {
      console.log(error);
  }
}
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  height: auto;
  min-height: 100vh;
  background: url("@/assets/otherImg/scene_background.png") no-repeat top;
  background-size: 100% 100%;
  .contentBox {
    width: 100%;
  }
}
.cellBoxdom {
  box-sizing: border-box;
  padding: 25px 21px;
  .back-box {
    display: flex;
    align-items: center;
    .back-icon {
      transform: rotate(180deg);
      width: 33px;
      height: auto;
      margin-right: 4px;
    }
    .back-title {
        width: 224px;
        height: 52px;
    }
  } 
}
.scene-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height: 820x;
  border-radius: 17px;
  padding: 92px 21px 32px;
  background: #fff url("@/assets/otherImg/uploadImage.png") no-repeat top;
  background-size: 100% auto;
  margin-top: 24px;
  // background: red;
  .scene-upImg{
    text-align: center;
    margin: 166px auto 206px;
  }
  .scene-up {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .scene-up-img{
      display: flex;
      width: 248px;
      height: 248px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #EAEDF1;
      border-radius: 8px 8px 8px 8px;
      opacity: 0.6;
      img{
        width: 80px;
        height: 80px;
      }
    }
  }
  .tips{
    font-size: 24px;
    color: #636975;
    text-align: center;
    margin-top: 32px;
    // margin: auto;

  }
}
.upending{
   display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .upensuccessImg{
      width: 300px;
      height: 532px;
      position: relative;

      .upOverlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 532px;
        //background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色蒙版 */
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 10; /* 确保覆盖层在图片上方 */
      }

      .overlayText {
      font-size: 28px;
      // color: #FFFFFF;
      color: #2875FF;
      }
     img{
      width: 300px;
      height: 532px;
    }

    }

    .type{
      display: flex;
      align-items: center;
      justify-content: center; // 添加水平居中
      color: #24BD4F;
      font-size: 28px;
      margin: 20px 0;
      img{
        width: 32px;
        height: 32px;
        margin-right: 15px;
      }
    }
    .type1{
      color: red;
    }
    .refreshbtn{
      color: #0E4DFF;
    }
}
 .duration-time {
        // height: 423px;
        border-radius: 17px;
        background: #fff url("@/assets/otherImg/fgureSet.png")
          no-repeat top left;
        background-size: auto 92px;
        padding: 82px 33px 0;
        margin-top: 25px;
        .cellBox {
          width: 100%;
          margin-top: 20px;
          .cellBox-on {
            border-bottom: 1px solid #e7eaf0;
            &:last-child {
              border-bottom: 0;
            }
          }
        }
      }
      .year {
  width: 100%;
  min-height: 107px;
  padding: 20px 0 0;
  font-size: 33px;
  color: #23262b;
  img {
    width: 28px;
    height: 28px;
  }
}

.boxs {
   display: flex;
   justify-content: space-between;
  width: 100%;
  margin: 40px 0;
  .boxs-0{
    width: 35%;
    height: 83px;
    margin-top: 33px;
 
    background: #fff;
    border-radius: 90px;
    line-height: 83px;
    text-align: center;
    color:#636975;
    font-size: 33px;
    &.disabled {
    pointer-events: none; /* 禁用点击事件 */
    cursor: not-allowed;  /* 鼠标显示禁用图标 */
    opacity: 0.5;
  }
  }
  .boxs-1 {
    width: 60%;
    height: 83px;
    margin-top: 33px;
    background: linear-gradient( 90deg, #00A2FF 0%, #7C48FF 100%);
    border-radius: 90px;
    line-height: 83px;
    text-align: center;
    color: #fff;
    font-size: 33px;
    &.disabled {
    //  background: #cccccc;        // 灰色背景
    color: #fff;      /* 置灰文字 */
    pointer-events: none; /* 禁用点击事件 */
    cursor: not-allowed;  /* 鼠标显示禁用图标 */
    opacity: 0.5;
  }
  }

}
.Statement{
  text-align: center;
  color: #636975;
   font-size: 24px;
}
.popup-title{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 26px;
   color: #23262b;
  .t-1{
    font-size: 33px;

    margin-right: 10px;
    font-weight: 600;
  }
  .t-2{
    font-size: 28px;
    
  }

}
  .count{
    color: #FF4E4E;
  }
.popup-content{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
  .choose-bt{
    width: 20%;
    height: 70px;
    margin-top: 33px;
    background: #EAEDF1;
    border-radius: 90px;
    line-height: 70px;
    text-align: center;
    color:#23262B;
    font-size: 33px;
  }
  .active{
    background: linear-gradient(
  148deg,
  rgba(66, 176, 255, 0.4) 0%,   
  rgba(80, 87, 255, 0.4) 100%  
);
    color: #0E4DFF;
  }
}
.popupImg{
  position: relative;
  img{
    width: 170px;
    height: 330px;
    border-radius: 16px;
  }
  .active{
    position: absolute;
    top: 0;
    left: 0;
    width: 170px;
    height: 330px;
    border: 1px solid #0E4DFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 16px;
  }
}
.phoneAdd {
  box-sizing: border-box;
  padding: 0 42px 33px;
  background: url("@/assets/otherImg/more_rule_header.png") no-repeat top;
  background-size: 100% auto;
  position: relative;
.delwarn {
  width: 450px;
  text-align: center;
  font-size: 24px;
  color: #636975;
  margin:20px auto 0;
  display:flex ;
  img{
    width: 32px;
    height: 32px;
    margin-top:2px;
    margin-right: 8px;
  }  
}
  .exit_btn {
    width: 42px;
    height: 42px;
    background: url("@/assets/otherImg/exit.png") no-repeat;
    background-size: cover;
    position: absolute;
    top: 31px;
    right: 33px;
  }
  .title {
    font-size: 33px;
    color: #000;
    font-weight: 700;
    text-align: center;
    line-height: 50px;
    padding: 27px 0;
    margin-top: 0;
    margin-bottom: 42px;
  }
  .buttom {
    margin-top: 63px;
    > button {
      width: 250px;
      border: 2px solid rgba(175, 185, 204, 0.5);
      color: #23262b;
      border-radius: 90px;
      font-size: 29px;
      text-align: center;
      &:last-child {
        margin-left: 17px;
        border: 0;
        background: linear-gradient(90deg, #00a2ff, #7c48ff);
        color: #fff;
      }
    }
  }
  input {
    width: 100%;
    height: 92px;
    border-radius: 17px;
    padding: 21px 33px;
    background: #eff2f6;
    &::placeholder {
      color: rgba(99, 105, 117, 0.5);
    }
  }
  .phoneName{
     margin-top: 24px;
  }
  .saveRadio{
    height: 70px;
    // line-height: 00px;
    font-size: 28px;
    color: #23262B;
    margin: 32px 0;
    text-align: center;
    // border: 1px solid red;
    display: flex;
    // align-items: center;
    justify-content: center;

    ::v-deep .van-checkbox {
      display: flex;
      align-items: center;
      padding: 0px 0 20px;
    }
    
    ::v-deep .van-checkbox__icon {
      // display: flex;
      // align-items: center;
      // justify-content: center;
      margin-top: -34px;
    }
    
    ::v-deep .van-checkbox__label {
      line-height: normal;
      margin-left: 20px;
      vertical-align: middle;

    }
  }
  
}
.custom-textareaAi{
    // width: 672px;
    // height: 400px;
    // background: #FFFFFF;
    // border-radius: 16px;
    // border: 1px solid #fff;
    // font-size: 30px;
    // padding: 20px; /* 添加内边距 */
    //  padding-top: 100px; /* 调整上内边距 */
     position: relative;
//   text-indent: 2em; /* 首行缩进两个字符 */
}
.cleanUpFlex{
    margin: 40px;
    // display: flex;
    // justify-content:flex-end;
    position: absolute;
    right: 0px;
    top: -6px;
    // bottom: 10px;
    z-index: 12;
}
/* 添加以下样式 */
.select-template{
  font-weight: 500;
font-size: 32px;
color: #23262B;
text-align: center;
margin: 32px auto;
}
/* 添加对应的CSS类 */
.template-grid1 {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  // grid-template-columns: repeat(auto-fill, 250px);
  // justify-content: start;
  gap:28px;
  padding: 20px 44px 0;
  max-height: 920px;
  overflow-y: auto;
    // 滚动条样式优化
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    
    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
.template-grid2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; // 改为居中对齐
  gap: 24px; // 使用gap代替margin控制间距
  height: 500px;
  padding: 20px 36px;
}
.template-item {
  width: 200px; // 固定宽度而不是百分比
  margin-bottom: 20px;
  text-align: center;
  flex-grow: 0; // 不拉伸项目
  flex-shrink: 0; // 不收缩项目
   position: relative; // 添加相对定位

  // 当只有1个项目时完全居中
  &:only-child {
    margin: 0 auto 20px auto;
  }
}
// 为单选框添加绝对定位样式
.template-item .van-radio {
  position: absolute;
  top: 10px;
  right: 0px;
  z-index: 2;
  // 选中时的颜色
  &.van-radio--checked {
    .van-radio__icon--checked {
      background-color: #0E4DFF;
      border-color: #0E4DFF;
     
    }
  }
}
.template-img {
  width: 200px;
  height: 356px;
  background-color: #f0f0f0; /* 占位背景色 */
  margin: 0 auto 10px;
  border-radius: 16px;
  // 默认边框样式
  border: 1px solid transparent;
  transition: all 0.3s ease;
  img{
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }
  
  // 选中状态样式
  &.template-img-active {
    // border-color: #0E4DFF; // 蓝色边框
    // box-shadow: 0 0 10px rgba(14, 77, 255, 0.3);
  }
}
// 新增覆盖层样式
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 356px;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色蒙版 */
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 10; /* 确保覆盖层在图片上方 */
}

.check-icon {
  font-size: 28px;
  margin-bottom: 10px;
}

.use-text {
  font-size: 28px;
//   font-weight: bold;
}

.template-name {
  font-size: 30px;
  color: #23262B;
  text-align: center;
   // 选中状态样式
  &.template-name-active {
    color: #0E4DFF; // 蓝色文字
  }
}
.actions {
  margin: 0 32px 32px;
   width: 640px;
   margin: auto;
  &-2 {
    width: 640px;
    height: 80px;
    background: linear-gradient( 90deg, #00A2FF 0%, #7C48FF 100%);
    border-radius: 80px;
    line-height: 80px;
    text-align: center;
    color: #fff;
    font-size: 33px;
    &.disabled {
    //  background: #cccccc;        // 灰色背景
    color: #fff;      /* 置灰文字 */
    pointer-events: none; /* 禁用点击事件 */
    cursor: not-allowed;  /* 鼠标显示禁用图标 */
    opacity: 0.5;
  }
  }
}

</style>
