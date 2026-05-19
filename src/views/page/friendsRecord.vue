
<template>
      <!-- 我的场景管理 -->
  <div class="box">
    <div class="contentBox">
      <div class="cellBoxdom">
        <div class="back-box" @click="backMethod">
          <img class="back-icon" src="@/assets/otherImg/back_icon.png" alt="" />
          <img class="back-title" src="@/assets/img/img/friendsImg.png" alt="" />
        </div>
      </div>
    </div>
    <div class="friendsBox">
        <div class="addFriend" @click="handeAddphone">
            <img src="@/assets/img/img/addImg.png" alt="">
            <div>新增亲友</div>
        </div>
        <div class="friendsList" >
            <div class="playWriting" v-for="(item,index) in friendsList" :key="index">
                <div class="playPhone">
                    <van-checkbox-group v-model="checked" :max="3" >
                        <van-checkbox :name="item.friPhone" :disabled="isCheckboxDisabled(item.friPhone)"></van-checkbox>
                    </van-checkbox-group>
                     <div class="playText" style="margin-left:20px;">
                        <div >{{ item.nickName }}</div>
                        <div :class="item.nickName=='' ? 'phoneText' : 'phoneText1'">
                          {{item.visible ? AESDecrypt(item.friPhone):mobileStr(AESDecrypt(item.friPhone)) }}
                       <img 
                          @click="item.visible = !item.visible" 
                          :src="item.visible ? eyeImg : hidingImg" 
                          alt=""
                        >
                        </div>
                    </div>
                </div>
               
                <div>
                    <img @click="delPhone(item.friPhone)" src="@/assets/img/img/delPhone.png" alt="">
                </div>
            </div>

        </div>
        <div :class="[checked.length>0 ? 'addPhone' : 'addPhone1']" @click="addFriends">
            添加到接收手机号
        </div>
        <div class="friendsListTips">*温馨提示：明星来电送亲友功能每日上限送3条祝福哦～</div>
    </div>

     <!-- 添加手机号码弹窗 -->
      <notSuccess :isShow="addPhoneshow">
        <div class="phoneAdd">
          <!-- <img
            src="@/assets/otherImg/exit.png"
            class="exit_btn"
            @click="handelPhoneqx"
            alt=""
          /> -->
          <div class="title">新增亲友</div>
          <input
            maxlength="11"
            v-model="called"
            type="text"
            label=""
            placeholder="请输入中国移动手机号"
            oninput="value=value.replace(/[^\d]/g,'')"
          />
          <input
            maxlength="10"
            v-model="customText"
            type="text"
            label=""
            placeholder="请输入备注昵称（选填）"
            @input="changeCallName1"
            class="phoneName"
          />
          <div class="buttom">
            <van-button round @click="handelPhoneqx">取 消</van-button>
            <van-button type="primary" round @click="handelPhoneqd"
              >确 定</van-button
            >
          </div>
        </div>
      </notSuccess>
      
  </div>
 <addtoast :toastTxT="toastTxT" :toastShow="toastShow" @toastEmit="handelToast"/>
  </template>
  
<script setup lang="ts">
import { ref,reactive,onMounted  } from 'vue'
import addtoast from "@/components/toast/addtost.vue";
import { useRouter,useRoute } from 'vue-router'
import { getURIParam,AESDecrypt,AesEncrypt,unique } from '@/utils/index.js'
import HRequest from '@/api'
import { nextTick } from 'vue';
import {  onActivated } from 'vue'
import { Toast } from 'vant'
import { isAsyncFunction } from 'util/types';
import hidingImg from '@/assets/img/img/hidingImg.png'
import eyeImg from '@/assets/img/img/eyeImg.png'
import volcPoint from "@/utils/volc-collect";
let volc = new volcPoint("明星来电", "自定义场景");
volc.initEvent();

const route: any = useRoute();
const router: any = useRouter();
const checked:any = ref([]);
const addPhoneshow = ref(false);
const called = ref("");
const customText=ref('')
const content =ref<string[]>([]);
// content.value = route.query.PhoneId;
const numHiding = ref(false);
const friendsList:any=ref([])
const toastShow=ref(false)
const delData=ref()
const toastTxT: any = ref({
    title: "提示",
    txt1: `确定要删除该亲友吗？`,
    color: "#0E4DFF",
    button: 2,
    onebtntxt: "确定"
  })
 onMounted(async()=>{
   // 标准化 PhoneId 数据格式
    const phoneIdParam = route.query.PhoneId;
    if (phoneIdParam) {
        content.value = Array.isArray(phoneIdParam) ? phoneIdParam : [phoneIdParam];
    }
    getAllFriPhone()
  })
const getAllFriPhone=()=>{
  HRequest.getAllFriPhone().then((res:any)=>{
    if(res.code == 200){
      // 给每个 friend 添加 visible 字段
      res.data.forEach((item: any) => {
        item.visible = false;
      });
      friendsList.value=res.data
      console.log('数据查看',content.value,res.data)
      content.value?.forEach((e: any) => {
      res.data.forEach((item:any)=>{
      if(e==item.friPhone){
        checked.value.push(item.friPhone)
        }
      })
    });
    }
  })
}

const changeCallName1=(event: Event)=>{
  const text = (event.target as HTMLTextAreaElement).value;
  customText.value=text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g,'')
}
  const backMethod = () => {
    
  window.history.back();
};
// 手机号加密方法
const mobileStr = (str: string) => {
  if (str.length > 7) {
    return str.substring(0, 3) + '****' + str.substring(7, str.length)
  } else {
    return str.substring(0, str.length - 1) + '****'
  }
}
const delPhone = (item:any) => {
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '亲友号码录',page_code:"relatives and friends", page_url: window.location.href, click_object: 'delPhone',object_name:'删除亲友号码',object_type:'button' })
    delData.value= AESDecrypt(item)
    toastShow.value = true;
  
}
const handelToast = async (e: boolean) => {
  if (!e) return (toastShow.value = false);
  Toast.loading({
    duration: 0,
    message: "请稍后",
    forbidClick: true
  })
  console.log("数据过来没有", delData.value);
  const params = {
    friPhone: AesEncrypt(delData.value)
  };
  const res = await HRequest.delFriPhone(params)
 if(res.code == 200){
  toastShow.value = false;
  const deletedPhone = AesEncrypt(delData.value);
    checked.value = checked.value.filter(
      (phone: string) => phone !== deletedPhone
    );
  Toast("删除成功！");
  getAllFriPhone()
 }}
const isCheckboxDisabled = (friPhone: string) => {
for (let i = 0; i < checked.value.length; i++) {
  for (let j = i + 1; j < checked.value.length; j++) {
    if (checked.value[i] === checked.value[j]) {
      checked.value.splice(j, 1);
      j--; // 调整索引
    }
  }
}
   return checked.value.length >= 3 && !checked.value.includes(friPhone);
};
// 取消
const handelPhoneqx = () => {
  addPhoneshow.value = false;
  called.value = "";
  customText.value='' 
  // 埋点
};
// 确定添加手机号，发请求
const handelPhoneqd = async () => {
  if (called.value.length < 11) {
    Toast("请输入11位手机号");
    return;
  }
  if (AesEncrypt(called.value) == localStorage.getItem("phon"))
    return Toast("请输入亲友手机号！");
 
  Toast.loading({
    duration: 0,
    message: "请稍后",
    forbidClick: true,
  });
  const params = {
    phone: AesEncrypt(called.value),
  };
  const res = await HRequest.isMobile(params);
  if (!res.data) {
    Toast("仅支持中国移动手机号！");
    return;
  }
  HRequest.addFriPhone({
    friPhone: AesEncrypt(called.value),
    nickName: customText.value,
  }).then((res: any) => {
    if (res.code != 200) return Toast(res.msg);
      Toast("添加成功！");
      handelPhoneqx()
      getAllFriPhone()
  })
};
const handeAddphone = () => {
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '亲友号码录',page_code:"relatives and friends", page_url: window.location.href, click_object: 'relatives and friends',object_name:'新增亲友',object_type:'button' })
  let arr = JSON.parse(JSON.stringify(friendsList.value));
  if (arr !== null) {
    if (arr.length == 6) {
      Toast("最多可保存6个号码");
      return;
    }
  }
  addPhoneshow.value = true;
};
const addFriends=()=>{
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '亲友号码录',page_code:"relatives and friends", page_url: window.location.href, click_object: 'Add to receiving phone number',object_name:'添加到接收手机号',object_type:'button' })
  // 计算添加后唯一号码总数
  let arr:any =[]
     checked.value?.forEach((item: any) => {
      arr.push(item)
    })
  if(!arr.length){
    return;
  }
  const arr2 = JSON.parse(JSON.stringify(content.value));
  // 合并两个数组并去重
  const mergedNumbers = [...new Set([...arr, ...arr2])];
  console.log('mergedNumbers',mergedNumbers)

  // 检查是否超过限制
  if (mergedNumbers.length > 3) {
    Toast('只能配置3位亲友手机号');
    return;
  }
  sessionStorage.setItem('friendsRecord_phoneDatalist', JSON.stringify(mergedNumbers));
  window.history.back();
  

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
.friendsBox{
    margin: 0 20px;
}
.addFriend{
    width: 100%;
height: 80px;
 line-height: 80px;
background: #FFFFFF;
border-radius: 8px 8px 8px 8px;
opacity: 0.7;
font-size: 30px;
color: #0E4DFF;
display: flex;
margin: 32px auto 24px;
    img{
      width: 32px;
      height: 32px;
      margin: 20px 10px 0 260px;
    }

}
.friendsList{
    min-height: 900px;
    
}
.friendsListTips{ 
  font-size: 24px;
  text-align: center;
  color: #636975;
}
.addPhone{
    width: 640px;
    height: 80px;
    line-height: 80px;
    background: linear-gradient( 90deg, #00A2FF 0%, #4173FF 52%, #7C48FF 100%);
    border-radius: 43px 43px 43px 43px;
    
    text-align: center;
    font-size: 30px;
    color: #FFFFFF;
    margin: 20px auto;
}
.addPhone1{
   width: 640px;
    height: 80px;
    line-height: 80px;
    background: linear-gradient( 90deg, #00A2FF 0%, #4173FF 52%, #7C48FF 100%);
    border-radius: 43px 43px 43px 43px;
    opacity: 0.5;
    text-align: center;
    font-size: 30px;
    color: #FFFFFF;
    margin: 20px auto;
}
.playWriting{
    width: 100%;
    height: 144px;
    background: #FFFFFF;
    border-radius: 8px 8px 8px 8px;
    // padding: 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
img{
    width: 56px;
    height: 56px;
    margin: 44px 40px;
}
}
.playPhone{
    margin-left: 32px;
    display: flex;
    margin-top: 52px;
    .playText{
        margin-left: 32px;
        font-size: 30px;
        margin-top: -32px;
        img{
          width: 32px;
          height: 32px;

        }
        
        >div:first-child{
            color: #23262B;
            margin-bottom: 12px;
        }
        >div:last-child{
          color: #636975; 
    }
    }
}
.phoneText {
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: normal;
  margin-top: -16px;
  
  img {
    width: 32px;
    height: 32px;
    margin-left: 10px;
    cursor: pointer;
  }
}
.phoneText1 {
  width: 280px;
   display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: normal;
  margin-top: -30px;
  
  img {
    width: 32px;
    height: 32px;
    margin-left: 10px;
    cursor: pointer;
  }
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
}
  </style>
  