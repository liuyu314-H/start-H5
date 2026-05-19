
<template>
      <!-- 我的场景管理 -->
  <div class="box">
    <div class="contentBox">
      <div class="cellBoxdom">
        <div class="back-box" @click="backMethod">
          <img class="back-icon" src="@/assets/otherImg/back_icon.png" alt="" />
          <img class="back-title" src="@/assets/img/img/customizeImg.png" alt="" />
        </div>
      </div>
    </div>
    <div class="generateBtn" v-if="setType==1&&!helpShow&&network">
      <div >
        <div @click="backModify">返回修改</div>
        <div @click="generateVideo1">选择播报模板</div>
      </div>
    </div>
    <div class="customizeContent">
         <!-- <div class="boxTi-box">
          <div
            :class="setType == 1 ? 'check' : ''"
            @click="hadnelMi(1)"
          >
            帮你写文案
          </div>
          <div
            :class="setType == 2 ? 'check' : ''"
            @click="hadnelMi(2)"
          >
            自定义
          </div>
        </div> -->
        <div  v-if="setType == 1">
            <div class="helpCopywriting" v-if="helpShow">
              <div class="textarea-image-container">
                <img src="@/assets/img/img/AiImg.png" alt="提示图片" class="textarea-image" />
              </div>
                <textarea 
                    v-model="customText" 
                    placeholder="我可以帮你生成视频文案，请输入要发送的主题吧。示例:给XX发送一个生日祝福"
                    class="custom-textareaAi"
                    rows="12"
                    maxlength="30"
                    >
                </textarea>
                <div class="cleanUpFlex">
                    <div class="cleanUp"  @click="clearText">
                        <img src="@/assets/img/img/cleanUp.png" alt="">
                        <div>清空文案</div>
                    </div>
                    <div>{{ customText.length }}/30</div>
                </div>
                <div class="generateCopy"
                :class="{ 'disabled': !customText.trim() }"
                @click="AddGenerate">生成文案</div>
                <div class="openCopywriting">{{ copywritingName }}</div>
             </div>
             <div v-else class="playWritingBottom">
                <div  v-for="(item, index) in writingList" :key="index" class="playWriting"  v-if="network">
                    <div class="playWritingFlex">
                        <div>
                        <van-radio-group v-model="checked" shape="dot" @change="handleRadioChange">
                        <van-radio :name="item.text">{{item.promptStyle}}</van-radio>
                        </van-radio-group>
                        </div>
                        <div class="editWriting">
                            <!-- <div @click="editWriting(item,index)"><img src="@/assets/img/img/editImg.png" alt="">
                              <div>编辑</div>
                            </div> -->
                            
                            <div @click="changeWriting(item,index)"><img src="@/assets/img/img/changeImg.png" alt="">
                              <div>换一换</div>
                            </div>
                    </div>
                    </div>
                    <div class="writingText">{{item.text}}</div>
                </div>
                <div v-if="!network" class="networkError">
                  <div><img src="@/assets/img/img/network.png" alt=""></div>
                  <div>网络有点问题，请再试试~</div>
                  <div class="playRefresh" @click="playRefresh">点击刷新</div>

                </div>
             </div>
        </div>
        <div class="helpCopywriting" v-if="setType == 2">
            <textarea 
                v-model="customizeText" 
                placeholder="请输入要发送的文案"
                class="custom-textarea custom-textarea1"
                rows="12"
                maxlength="150"
                >
            </textarea>
            <div class="cleanUpFlex">
                <div class="cleanUp"  @click="clearCustomizeText">
                    <img src="@/assets/img/img/cleanUp.png" alt="">
                    <div>清空文案</div>
                </div>
                <div>{{ customizeText.length }}/150</div>
            </div>
             <div class="generateCopy"
             :class="{ 'disabled': !customizeText.trim() }"
              @click="generateVideo2">选择播报模板</div>
            <div class="openCopywriting">{{ copywritingName }}</div>
        </div>
       
         
    </div>
    
     <!-- 编辑场景弹窗 -->
      <notSuccess :isShow="showSceneName">
        <div class="phoneAdd">
          <img
            src="@/assets/otherImg/exit.png"
            class="exit_btn"
            @click="handelNameqx"
            alt=""
          />
          <div class="title">编辑</div>
          <textarea
              maxlength="150"
              rows="12"
              class="custom-textarea2"
              v-model="calledName"
              label=""
              placeholder="请输入文案"
            
          ></textarea>
           <div class="cleanUpFlex1">
                <div>{{ calledName.length }}/150</div>
            </div>
          <div class="buttom">
            <van-button round @click="handelNameqx">取 消</van-button>
            <van-button type="primary" round @click="handelNameqd"
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
          <div class="select-template">选择播报模板</div>
          <div :class="videoList.length > 3 ? 'template-grid1' : 'template-grid2'">
            <div  v-for="(item, index) in videoList"
            :key="index"
            class="template-item"
            
            >
            <van-radio-group v-model="templateChecked" direction="horizontal">
              <van-radio :name="item.templateId"></van-radio>
            </van-radio-group>
              <div 
                class="template-img"
                :class="{ 'template-img-active': templateChecked == item.templateId }"
              >
              <img :src="AESDecrypt(item.coverImageUrl)" alt="" />
            </div>
            
              <div 
              class="template-name"
              :class="{ 'template-name-active': templateChecked == item.templateId }">
              {{item.templateName}}
            </div>
            </div>
            
          </div>
          <div class="actions">
              <div class="actions-1"  @click="handlePopupClose">返回</div>
              <div class="actions-2" @click="setType == 1?generate1():generate2()">生成视频</div>
            </div>
         
        </div>
        </van-popup>
    
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref,reactive,onMounted  } from 'vue'
  import { useRouter,useRoute } from 'vue-router'
  import { getURIParam,AESDecrypt } from '@/utils/index.js'
  import HRequest from '@/api'
  import { nextTick } from 'vue';
  import {  onActivated } from 'vue'
  import { Toast } from 'vant'
  import { isAsyncFunction } from 'util/types';
  import successIcon from '@/assets/img/img/success.png'
  import volcPoint from "@/utils/volc-collect";
  const route: any = useRoute();
  const router: any = useRouter();
  let volc = new volcPoint("明星来电", "自定义场景");
  volc.initEvent();
// 埋点
volc.pageViewEvent("mxld_",{module:"明星来电",module_code:'mxld', page_name: '自定义场景',page_code:"custom scenario", page_url: window.location.href })


const setType=ref(1)
const customText = ref('')
const customizeText = ref('')
const helpShow = ref(true)
const checked=ref('')
const templateChecked=ref(null) // 选择模板
const network = ref(true) // 假设网络状态为true，实际应用中可以通过API检查网络状态
const showSceneName = ref(false)
const calledName = ref('') // 场景名称
const calledNameT = ref('') // 场景名称备用
const modifyId=ref() // 选择id
const copywritingName=ref('本页面所有文案和动态视频由AI技术生成')
const showModule = ref(false); // 管理场景弹窗
const videoList:any = ref([]); // 模板视频
const isSaving = ref(false) // 添加保存状态标志
onActivated(() => {
  // 每次被 keep-alive 唤醒都会执行
  const {forward,back} = router.options.history.state
  if(!forward){
    setType.value=1
    helpShow.value=true
    customText.value=''
    customizeText.value=''
    checked.value=''
    showModule.value=false
    templateChecked.value=videoList.value.length? videoList.value[0].templateId:null
  }
})
const writingList: any = ref("");

  const backMethod = () => {
  router.back();
};
const validateInput=()=>{
  const regex = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;
      
    // 替换不符合条件的字符
    customizeText.value = customizeText.value.replace(regex, '');

}
const hadnelMi = async (item: number) => {
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object: item==1?'Copywriting':'customize',object_name:item==1?'帮你写文案':'自定义',object_type:'button' })
  console.log(item);
  setType.value = item;


};
const clearText = () => {
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object:'Clear the copy',object_name:'清空文案',object_type:'button' })
    customText.value = '';
}
const clearCustomizeText = () => {
    customizeText.value = '';
    //埋点
    volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object:'Clear the copy',object_name:'清空文案',object_type:'button' })
  }
  const AddGenerate=async()=>{
    // 埋点
    volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object:'generate2 copywriting',object_name:'生成文案',object_type:'button' })
    console.log("生成文案");
    console.log(customText.value);
      const params = {
      text: customText.value,
    }
    const res1 = await HRequest.checkText(params);
    if(res1.code==200){
      Toast.loading({
        message: '生成中',
        forbidClick: true, // 禁止背景点击
        loadingType: 'spinner',
        duration: 0 // 持续显示
      });
      const params1 = {
      text: customText.value,
      starId: sessionStorage.getItem("starId")
    }
      const res = await HRequest.generateText(params1);
      if(res.code == 200) { 
        helpShow.value = false;
        network.value=true 
        writingList.value=res.data;
        Toast({
        message: '文案生成成功',
        icon: successIcon,

      });
      }else if(res.code == 1){
        // network.value=true  // 假设网络状态为false
        // // Toast.clear();
        Toast('内容含敏感信息，请修改');

      }
      else{
         helpShow.value = false;
        network.value=false  // 假设网络状态为false
        Toast.clear();

      }
    }else{
      Toast(res1.msg);
    }
     


  }
    const playRefresh=()=>{
    console.log("11生成文案");
    AddGenerate()

  }
  const changeWriting = async(item: any,index: number) => {
    volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object: 'Change',object_name:'生成文案后换一换',object_type:'button' })
    console.log("换一换", item);
     const params = {
      text: customText.value,
      promptStyle:item.promptStyle, 
      starId: sessionStorage.getItem("starId")
    }
      Toast.loading({
      message: '生成中',
      forbidClick: true, // 禁止背景点击
      loadingType: 'spinner',
      duration: 0 // 持续显示
    });
    const res = await HRequest.regenerateText(params);
    if(res.code==200){
      if(item.text==checked.value){
        checked.value=res.data.text;
        console.log('保持原来勾选',checked.value)
      }
      Toast.clear();
      item.text = res.data.text;
      item.promptStyle=res.data.promptStyle;
    }else{
      Toast(res.msg);
    }
    console.log(res)
   // 显示加载提示
    // Toast.loading({
    //   message: '生成中',
    //   forbidClick: true, // 禁止背景点击
    //   loadingType: 'spinner',
    //   duration: 0 // 持续显示
    // });
    //  
   
  }
  const editWriting = (item: any,index:number) => {
    volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object: 'edit',object_name:'生成文案后编辑',object_type:'button' })
    console.log("编辑", item);
     showSceneName.value = true;
     calledName.value = item.text;
     calledNameT.value = item.text;
     modifyId.value = index;
    // 显示加载提示
    // Toast.loading({
    //   message: '编辑中',
    //   forbidClick: true, // 禁止背景点击
    //   loadingType: 'spinner',
    //   duration: 0 // 持续显示
    // });
    //  Toast.clear();
  }
  
  
  const backModify = () => {
    volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object: 'Return for modification',object_name:'返回修改',object_type:'button' })
    helpShow.value = true;
}
const handelNameqx= () => {
  showSceneName.value = false;
 
};
const handelNameqd= async() => {
  showSceneName.value = false;
  const params = {
      text: calledName.value
    }
const res = await HRequest.editText(params);
if(res.code == 200){
  writingList.value.forEach((item: any, index: number) => {
  if(modifyId.value==index){
    item.text=calledName.value
    if(calledNameT.value==checked.value){
      checked.value=calledName.value
      console.log('编辑前已勾选');
    }
     Toast("保存成功");
  }
  // 在这里处理每一项和索引
  
});

}else{
  Toast(res.msg);
}

};
const generateVideo1 = async() => {
  console.log("选择播报");
  if(checked.value==''){
    Toast("请选择一种文本风格");
    return;

  } else if(checked.value.length<5){
    Toast("请输入5个字以上的文案");
    return;
  }else{
    console.log("已选择文案风格:", checked.value);
    // 存储是自定义还是
    const params = {
      text: checked.value
    }
      const res = await HRequest.checkText(params);
      if(res.code=200){
        sessionStorage.setItem("content", checked.value);
        showModule.value = true;
        const starId = sessionStorage.getItem("starId");
        console.log(starId,'id值')
            const params = {
              starId: starId
            }
        const res = await HRequest.getDiyTemplate(params);
        console.log('模板',res)
        if(res.code!=200){
          Toast(res.msg)
           return;
        }
        videoList.value=res.data;
        templateChecked.value=res.data[0]?.templateId
    
      }else{
        Toast(res.msg)

      }
  }
  

  // generate1();
};
const generate1 = async() => {
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object: 'generate2 video',object_name:'生成视频',object_type:'button' })
  console.log("生成视频",checked.value,templateChecked.value);
  sessionStorage.setItem("templateId", String(templateChecked.value));
  await confirmSave(checked.value);
  showModule.value=false
  templateChecked.value=videoList.value.length? videoList.value[0].templateId:null
    //  router.push({
    //   path: "/generateVideo",
    // });
  // if(checked.value==''){
  //   Toast("请选择一种文本风格");
  //   return;

  // } else if(checked.value.length<5){
  //   Toast("请输入5个字以上的文案");
  //   return;
  // }else{
  //   console.log("已选择文案风格:", checked.value);
  //   // 存储是自定义还是
  //   const params = {
  //     text: checked.value
  //   }
  //     const res = await HRequest.checkText(params);
  //     if(res.code=200){
  //       sessionStorage.setItem("content", checked.value);
  //         router.push({
  //         path: "/generateVideo",
  //         //  query: {
  //         //   content: checked.value,
  //         // }
  //       });
  //     }else{
  //       Toast(res.msg)

  //     }
  // }
};
  const confirmSave = async(text: string) => {
     // 如果正在保存中，则不执行后续操作
      if (isSaving.value) return
      isSaving.value = true // 设置为保存中状态
      videoList.value.forEach(async (item: any, index: number) => { 
      if(templateChecked.value == item.templateId){
      const params = {
          content:text ,
          starId:sessionStorage.getItem('starId'),
          templateId:item.templateId
        }
        
       const res = await HRequest.createVideo(params);
       if(res.code==200){
        console.log('视频生成成功')
        isSaving.value = false
        JumpBack();

       }else{
        Toast(res.msg)
        isSaving.value = false
      }
      }
    });

  }
const changeCallName1=(event: Event)=>{
  const text = (event.target as HTMLTextAreaElement).value;
  customText.value=text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g,'')
}
const changeCallName2=(event: Event)=>{
  const text = (event.target as HTMLTextAreaElement).value;
  customizeText.value=text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g,'')
}
const changeCallName3=(event: Event)=>{
  const text = (event.target as HTMLTextAreaElement).value;
  calledName.value=text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g,'')
}
const handleRadioChange = (value: any) => {
  // 埋点 - 选中文案风格
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object: 'Select playback scene',object_name:'选中播放场景',object_type:'button' })
};
const generateVideo2 = async() => {
  console.log("选择播报");
  if(customizeText.value.length<5){
        Toast('请输入5个字符以上的内容')
        return
      }

      const params1 = {
      text: customizeText.value
    }
      const res1 = await HRequest.checkText(params1);
  if(res1.code==200){
    sessionStorage.setItem("content", customizeText.value);
    showModule.value = true;
    const starId = sessionStorage.getItem("starId");
    console.log(starId,'id值')
        const params = {
          starId: starId
        }
    const res = await HRequest.getDiyTemplate(params);
    console.log('模板',res)
    videoList.value=res.data;
    templateChecked.value=res.data[0].templateId
    // videoList.value= videoList.value.slice(0,4)
   
  }else{
    Toast(res1.msg)
  }
  // generate2();
};
const generate2=async()=>{
    volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '自定义场景页',page_code:"Customize Scene Page", page_url: window.location.href, click_object: 'generate2 video',object_name:'生成视频',object_type:'button' })
    console.log('3334',templateChecked.value)
    sessionStorage.setItem("templateId", String(templateChecked.value));
    await confirmSave(customizeText.value);
    showModule.value=false
    templateChecked.value=videoList.value.length? videoList.value[0].templateId:null
    //  router.push({
    //   path: "/generateVideo",
    // });
    
  //     const params = {
  //     text: customizeText.value
  //   }
  //     const res = await HRequest.checkText(params);
  // if(res.code==200){
  //    sessionStorage.setItem("content", customizeText.value);
  //   router.push({
  //   path: "/generateVideo",
  //   // query: {
  //   //   content: customizeText.value,
  //   // }
  // });

  // }else{
  //   Toast(res.msg)
  // }

}
const JumpBack=async()=>{
    const starId = sessionStorage.getItem("starId");
  const settingsType = sessionStorage.getItem("settingsType");
       // 根据settingsType是否存在决定传递的参数
        if(settingsType){
          router.push({
            path: '/remindScene',
            query: {
              type: 2
            }
          });
        }else{
          // starId存在，传递starId参数
          router.push({
            path: '/remindScene',
            query: {
              starId: starId
            }
          });

        }
    Toast('视频生成中，请稍后预览效果')
}

// 关闭弹窗
const handlePopupClose=()=>{
  showModule.value = false;
}
  </script>
  
  <style lang="less" scoped>
  .fs-18 {
  font-size: 36px;
  font-weight: bold;
}
.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
  .box {
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  height: auto;
  min-height: 100vh;
  background: url("@/assets/img/img/bgImg.png") no-repeat top;
  background-size: 100% 100%;
  .head {
    height: 466px;
    width: 100%;
    position: relative;
    img {
      width: 100%;
    }
  }
  .contentBox {
    width: 100%;
    .content {
      padding: 30px 30px 0 30px;
      .top {
        color: #333333;
        // margin-top: 52px;
        font-size: 36px;
        font-weight: bold;
      }
      .flex-d {
        display: flex;
        justify-content: space-between;
        margin: 32px 0 28px 0;
        .leng {
          color: #666;
          font-size: 28px;
        }
      }
      .box {
        // width: 100%;
        height: 220px;
        overflow: hidden;
        overflow-x: auto;
        &-s {
          display: flex;

          &-1 {
            width: 182px;
            height: 182px;
            // background-color: #333;
            margin-right: 18px;
            position: relative;
            // overflow: hidden;
            .img {
              width: 182px;
              height: 182px;
              overflow: hidden;
            }
            .top {
              width: 36px;
              height: 36px;
              // background-color: #256fff;
              position: absolute;
              right: 10px;
              top: 10px;
              img {
                width: 100%;
              }
            }
            img {
              width: 100%;
            }
            &-bottom {
              width: 186px;
              height: 52px;
              border-radius: 40px;
              position: absolute;
              bottom: -43px;
              display: flex;
              padding: 0 10px 0 10px;
              justify-content: space-between;
              // line-height: 52px;
              align-items: center;
              font-size: 26px;

              .name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin: 0 auto;
              }
            }
            &-icon {
              width: 32px;
              height: 32px;
              img {
                width: 100%;
              }
            }
          }
        }
      }

      /*滚动条样式*/
      ::-webkit-scrollbar {
        display: none;
      }
    }
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
      width: 192px;
      height: auto;
    }
  }
}
.boxTi-box {
  width: 100%;
  height: 76px;
  border-radius: 60px;
  background: rgba(14, 77, 255, 0.3);
  padding: 4px;
  display: flex;
  color: #fff;
  font-size: 31px;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 29px;
  > div {
    flex: 1;
    line-height: 68px;
  }
  .check {
    background: #fff;
    border-radius: 58px;
    color: #00278d;
    opacity: 1;
  }
}
.customizeContent{
    margin: 28px 24px;
}

.textarea-image {
    width: 692px; /* 根据需要调整 */
    height: auto;
    position: absolute;
    z-index: 2;
    left: 0;
}
.custom-textareaAi{
    width: 672px;
    height: 400px;
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid #fff;
    font-size: 30px;
    padding: 20px; /* 添加内边距 */
     padding-top: 100px; /* 调整上内边距 */
     position: relative;
//   text-indent: 2em; /* 首行缩进两个字符 */
}
.custom-textarea{
    width: 672px;
    height: 400px;
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid #fff;
    font-size: 30px;
    padding: 20px; /* 添加内边距 */
//   text-indent: 2em; /* 首行缩进两个字符 */
}
.custom-textarea2{
    width: 592px;
    height: 400px;
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid #fff;
    font-size: 30px;
    padding: 20px; /* 添加内边距 */
    border: 1px solid #EAEDF1;
//   text-indent: 2em; /* 首行缩进两个字符 */
}
.custom-textarea1{
    height: 672px;

}
.generateCopy{
    width: 98%;
    height: 80px;
    background: linear-gradient( 90deg, #00A2FF 0%, #7C48FF 100%);
    border-radius: 86px;
    font-size: 32px;
    color: #FFFFFF;
    line-height: 80px;
    text-align: center;
    margin-top: -60px;
}
.helpCopywriting{
    position: absolute;

}
.cleanUpFlex1{
    display: flex;
    justify-content:end;
    margin-top: 10px;
    color: #999999;
    font-size: 28px;
    position: relative;
    top: -80px;
}
.cleanUpFlex{
    margin: 32px;
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: 100px;
    z-index: 12;
}
.cleanUp{
    display: flex;
    img{
        width: 32px;
        height: 32px;
        margin-right: 10px;
        margin-top: 5px;
    }

}
  &.disabled {
    //  background: #cccccc;        // 灰色背景
    color: #fff;      /* 置灰文字 */
    pointer-events: none; /* 禁用点击事件 */
    cursor: not-allowed;  /* 鼠标显示禁用图标 */
    opacity: 0.5;
  }
  .playWriting{
    min-height: 332px;
    background: #fff;
    margin-top: 24px;
    padding: 32px;
    border-radius: 16px;
    
    
  }
  .playWritingBottom{
    // height: 900px;
    height: 70vh;
    overflow:auto ;

  }
  .playWritingFlex{
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    font-size: 32px;
    color: #23262B;
  }
  .editWriting{
    width: 300px;
    display: flex;
    // justify-content: space-between;
    justify-content: flex-end;
    color: #0E4DFF;
    font-size: 28px;
    
    >div{
      min-width: 124px;
      height: 56px;
      line-height: 56px;
      display: flex;
      background: rgba(14,77,255,0.07);
      border-radius: 16px;
      padding:0 16px;
      img{
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }

    }
    img{
      width: 32px;
      height: 32px;
      margin-top: 12px;
    }
  }
  .writingText{
    font-size: 30px;
color: #23262B;
  }
  .generateBtn{
    width: 100%;
    height: 144px;
    background: rgba(255,255,255,0.7);
    position: fixed;
    
    z-index: 5;
    bottom: 0;
    border-radius: 40px 40px 0 0;

    >div{
      display: flex;
      justify-content: space-between;
      width: 656px;
      margin: auto;
      margin-top: 32px;
      >div:first-child{
        width: 320px;
        height: 80px;
        line-height: 80px;
        background: rgba(255,255,255,0.3);
        border-radius: 86px;
        border: 1px solid rgba(175,185,204,0.5);
        text-align: center;

      }
      >div:last-child{
        width: 320px;
        height: 80px;
        line-height: 80px;
        background: linear-gradient( 90deg, #00A2FF 0%, #7C48FF 100%);
        border-radius: 86px;
        color: #FFFFFF;
        text-align: center;
      }
    }

  }
  .networkError{
    margin-top: 180px;

    text-align: center;
    img{
      width: 168px;
      height: 168px;
    }
  }
  .playRefresh{
    width: 304px;
    height: 80px;
    line-height: 80px;
    background: rgba(14,77,255,0.6);
    border-radius: 43px 43px 43px 43px;
    font-size: 28px;
    color: #FFFFFF;
    margin: 32px auto;
  }
  .phoneAdd {
  box-sizing: border-box;
  padding: 0 42px 33px;
  background: url("@/assets/otherImg/more_rule_header.png") no-repeat top;
  background-size: 100% auto;
  position: relative;
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
  }
  .buttom {
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
}
.openCopywriting{
  font-size: 24px;
  color: #636975;
  text-align: center;
  margin-top: 32px;

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
  padding: 20px 36px;
  height: 500px;
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
    border-color: #0E4DFF; // 蓝色边框
    box-shadow: 0 0 10px rgba(14, 77, 255, 0.3);
  }
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
  display: flex;
  justify-content: space-between;
  // border: 1px solid red;
  &-1 {
    width: 320px;
    height: 80px;
    background: rgba(255,255,255,0.3);
    border-radius: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 33px;
    color: #23262B;
    border: 1px solid rgba(175,185,204,0.5);
  }
  &-2 {
    width: 320px;
    height: 80px;
    background: linear-gradient(90deg, #00a2ff, #7c48ff);
    border-radius: 80px;
    line-height: 80px;
    text-align: center;
    color: #fff;
    font-size: 33px;
  }
}
  </style>
  