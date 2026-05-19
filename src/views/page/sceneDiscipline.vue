<template>
  <!-- 我的场景管理 -->
  <div class="box">
    <div class="contentBox">
      <div class="cellBoxdom">
        <div class="back-box" @click="backMethod">
          <img class="back-icon" src="@/assets/otherImg/back_icon.png" alt="" />
          <img class="back-title" src="@/assets/otherImg/scene_title.png" alt="" />
        </div>
        <div class="disturb">
          
          <div class="disturb-title">免打扰设置</div>
          <van-switch @change="checkSwitch" v-model="checkOutbound"  size="22px" active-color="#24BD4F" inactive-color="#6685CC"/>
        </div>
        <div
          class="details"
          v-for="(item, index) in roleList"
          :key="index"
          @click="handelEdit(item)"
        >
          <div v-if="familyTab" :class="[item.setType == 2 ? 'gqy' : 'gzj']"></div>
          <div class="details-img">
            <img :src="item.starPicUrl" alt="" />
          </div>

          <div class="details-time-work">
            <div class="txt">{{ item.sceneName == "天气提醒" ? "防寒提醒" : item.sceneName }}</div>
            <div class="star-name">{{ item.starName }}</div>
            <span>
              <span v-if="item.repeatType == 1">工作日{{ item.dayTime }}</span>
              <span v-if="item.repeatType == 2">每天{{ item.dayTime }}</span>
              <span v-if="item.repeatType == 3 && item.week.length > 0">
                {{ getDayDescription(item.week.split(",")) }}{{ item.dayTime }}
              </span>
              <span v-if="item.repeatType == 4 && item.monthly !== null">
                每月{{ item.day }}日{{ item.dayTime }}
              </span>
              <span v-if="item.repeatType == 5">
                每年{{ formatJanuaryFirst(`${item.month}-${item.day}`) }}{{ item.dayTime }}
              </span>
              <span v-if="item.repeatType == 0 && item.week[0] !== 8">
                {{ item.year }}-{{ item.month }}-{{ item.day }} {{ item.dayTime }}
              </span>
            </span>
            <!-- <div class="details-time-work-work">
              <span v-if="item.monthlyOrAnnually == 5">生效日期：工作日</span>
              <span v-if="item.monthlyOrAnnually == 4">生效日期：每天</span>
              <span v-if="item.monthlyOrAnnually == 1 && item.week.length > 0">生效日期：{{ getDayDescription(item.week) }}</span>
              <span v-if="item.monthlyOrAnnually == 2 && item.monthly !== null">生效日期：每月{{ item.monthly }}日</span>
              <span v-if="item.monthlyOrAnnually == 3 && item.annually !== '' && item.annually !== null">生效日期：每年{{ formatJanuaryFirst(item.annually) }}</span>
              <span v-if="item.monthlyOrAnnually == 8 && (item.monthlyOrAnnually == 8 || item.monthlyOrAnnually == null) && item.week[0] !== 8">生效日期：{{ item.enableTime }}</span>
            </div> -->
            <!-- 每周判断 -->
            <!-- <span><span>{{ item.enableTime }}</span></span> -->
            <!-- <span v-if="item.monthly !== null">生效时间： {{ formatTime(item.hours + ':' + item.minutes) }}</span>
            <span v-if="item.annually !== '' && item.annually !== null">生效时间：{{ formatTime(item.hours + ':' + item.minutes) }}</span>
            <span v-if="(item.monthlyOrAnnually == 8 || item.monthlyOrAnnually == null) && item.week[0] !== 8">生效时间： {{ formatTime(item.hours + ':' + item.minutes) }}</span> -->
          </div>

          <div class="details-con">
            <img class="imgs" src="@/assets/otherImg/icon_edit.png" alt="" />
            <img src="@/assets/otherImg/icon_del.png" alt="" @click.stop="handelDel(item)" />
          </div>
        </div>

        <van-empty
          class="empty_tip"
          :image="sceneEmpty"
          image-size="80"
          v-if="roleList.length == 0"
        >
          <div slot="description" style="text-align: center; color: #061c69; margin-top: -20px">
            暂无场景设置
            <br />
            快去添加场景吧~
          </div>
        </van-empty>
        <div class="button" @click="handelAdd">+ 添加场景</div>
      </div>
    </div>
  </div>
  <notSuccess :isShow="isShow">
    <div>
      <windowTips
        :name="windowTipsname.name"
        :text="windowTipsname.text"
        @notShow="notShow"
      ></windowTips>
    </div>
  </notSuccess>

  <!-- 视频播放组件 -->
  <videoPlay :videoShow="videoShow" @PlayShow="PlayShow"></videoPlay>
  <addtoast :toastTxT="toastTxT" :toastShow="toastShow" @toastEmit="handelToast"></addtoast>
    <!-- 编辑场景弹窗 -->
      <notSuccess :isShow="showDisturb">
        <div class="phoneAdd">
          <div class="title">提示您</div>
          <div class="outbound-text">
          {{ !checkOutbound ? '确定关闭免打扰吗？关闭后将可接听明星来电“125990”的来电' : '确定开启免打扰吗？开启后将不再接听明星来电“125990”的来电' }}
          </div>
          <div class="buttom">
            <van-button round @click="handelDisturbqx">取 消</van-button>
            <van-button type="primary" round @click="handelDisturbqd"
              >确 定</van-button
            >
          </div>
        </div>
      </notSuccess>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from "vue";
import { useRoute } from "vue-router";
import { getDayDescription, getURIParam, formatJanuaryFirst, formatTime, urlForm } from "@/utils";
import { Toast } from "vant";
import "vant/es/dialog/style";
import notSuccess from "@/components/notSuccess.vue";
import addtoast from "@/components/toast/addtost.vue";
import windowTips from "@/components/windowTips.vue";
import videoPlay from "@/components/videoPlay.vue";
import HRequest from "@/api";
import router from "@/router";
import volcPoint from "@/utils/volc-collect";
import sceneEmpty from "@/assets/otherImg/scene_empty.png";
let volc = new volcPoint("明星来电", "设置管理页");
volc.initEvent();
// 埋点
volc.pageViewEvent("mxld_",{module:"明星来电",module_code:'mxld', page_name: '设置管理页',page_code:"settings management", page_url: window.location.href })
const route: any = useRoute();
const toastTxT: any = ref({
  title: "暂无权限",
  txt1: "您已设置2024年1月10日 12:01",
  txtcolor: "【时代少年团马嘉祺】",
  txt3: "的生日提醒，请保持电话畅通，注意接听来自125990的电话。",
  color: "#256fff",
  button: 1,
  onebtntxt: "双按钮",
  butonTxt: "单个按钮"
});
const toastShow = ref(false); // 无权限使用
const familyTab = ref(false);
const getFriModule = async () => {
  const res = await HRequest.getFriModule();
  familyTab.value = res.data == 0 ? false : true;
};
//----------------------第三方登录代码片段----------------------------
// 第三方登录捕获头部携带的token
const token = getURIParam("token");
const chn = getURIParam("chn");
const login = async () => {
  const params = {
    ssoToken: token,
    // appId: chn,
    tag: "1",
    loginChn: "4",
    version: localStorage.getItem("version")
  };
  const res = await HRequest.singleLogin(params);
  if (res.code == 203) {
    console.log("版本更新");
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    return;
  }
  if (res.code !== 200 && sessionStorage.getItem("UOK") !== "true") {
    Toast("登录失败!");
    setTimeout(() => {
      window.history.go(-1);
    }, 2000);

    return;
  }
  sessionStorage.setItem("UOK", "true");
  userDetail();
};
if (token && chn) {
  login();
}
//----------------------第三方登录代码片段----------------------------

const windowTipsname = reactive({
  name: "",
  text: ""
});

const checkOutbound = ref(false);
const showDisturb=ref(false);
const isShow = ref(false);
const videoShow = ref(false);
const idolId = ref("");
const dsUrl = ref("");
const dtPicUrl = ref("");

const calleds: Ref<(string | never[] | null)[]> | any = ref([]);
idolId.value = route.query.idolId;
dsUrl.value = route.query.dsUrl;
dtPicUrl.value = route.query.dtPicUrl;
interface dataList {
  smPicUrl: string;
  idolName: string;
  id: string;
  idolId: string;
  adPicUrl: string;
}
const backMethod = () => {
  // window.history.back();
  router.push({
      path: "/",
    });
};
const userDetail = async () => {
  const params = {
    loginChn: "4"
  };
  const res = await HRequest.userDetail(params);
  // 用户信息储存
  // ---------第三方代码片段需要代码片段------------
  if (res.code == 200) {
    getFriModule();
    checkOutbound.value = res.data?.isMute;
    // 用户信息储存
    sessionStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("phonData", res.data.phone);
    localStorage.setItem("phon", res.data.phone2);
    Toast.clear();
  } else if (res.code == 203) {
    Toast("获取用户信息失败，请退出重新进入！");
    localStorage.removeItem("tk");
    window.location.reload();
  }
  // ---------第三方代码片段需要代码片段------------
};
if (localStorage.getItem("tk")) {
  userDetail();
}

const dataList: Ref<dataList[]> = ref([]);
const idolConfigId = ref("");

const handelAdd = () => {
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '设置管理页',page_code:"settings management", page_url: window.location.href, click_object: 'addScene',object_name:'添加场景',object_type:'button' })
  router.push({
    path: "/remindScene",
    query: {
      type: remindData.value
    }
  });
  sessionStorage.setItem("settingsType", remindData.value);
  console.log(route.query);
};
// 体验一下

const PlayShow = (e: any) => {
  videoShow.value = e;
};

const handelEdit = (item: any) => {
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '设置管理页',page_code:"settings management", page_url: window.location.href, click_object: 'editScene',object_name:'编辑场景',object_type:'button' })
  console.log("编辑", item);
  const queryItem = {
    ...item,
    calleds: calleds.value,
    familyId: remindData.value,
    type: remindData.value,
    Edit: "Edit",
    idolConfigId: item.idolConfigId,
    state: item.state,
    //
    enableTime: item.enableTime,
    hours: item.hours ? item.hours : item.dayTime ? item.dayTime.split(":")[0] : "",
    id: item.id,
    minutes: item.minutes ? item.minutes : item.dayTime ? item.dayTime.split(":")[1] : "",
    repeat: item.repeat,
    scenceName: item.scenceName,
    scenceUrl: item.scenceUrl,
    week: item.week,
    month: item.month
      ? item.month
      : item.enableTime
      ? item.enableTime.split(" ")[0].split("-")[1]
      : "",
    year: item.year
      ? item.year
      : item.enableTime
      ? item.enableTime.split(" ")[0].split("-")[0]
      : "",
    day: item.day ? item.day : item.enableTime ? item.enableTime.split(" ")[0].split("-")[2] : "",
    fid: item.fid,
    starId: item.starId,
    sceneId: item.sceneId
  };
  router.push({
    path: "/remindScene",
    query: queryItem
  });
};
//js [1,2,3,4,5,6,7]转为['周一','周二', '周三', '周四', '周五', '周六', '周日']
const notShow = (e: boolean) => {
  isShow.value = e;
};

const remindData: any = ref(
  sessionStorage.getItem("idolType") == null ? "2" : sessionStorage.getItem("idolType")
);

const sceneConfigIds = ref([]);
// 渲染形象
const roleList: any = ref([]);
// const roleList: any = []
const week: any = ref([]);
const imageList = async (e: string) => {
  const res = await HRequest.getscenceList(1, 1000, e);
  Toast.loading({
    duration: 0,
    message: "请稍后",
    forbidClick: true
  });
  if (res.code == 200) {
    Toast.clear();
  }
  roleList.value = res.data;

  const arr: any = [];
  week.value = res.data.week;
  res.data.forEach((item: any) => {
    // console.log(item)
    if (item.week[0] !== 8 && item.monthlyOrAnnually == null) {
      item.monthlyOrAnnually = "1";
      console.log("脏数据处理", item);
    }
    arr.push(item.id);
  });
  sceneConfigIds.value = arr;
  console.log(arr);
};
imageList(sessionStorage.getItem("idolType") || "2");

// 1渲染自己，2渲染亲人
const mylist = async (e: any) => {
  const res = await HRequest.getIdolList(e, remindData.value);
  if (res.code == 203) {
    Toast("登录过期，请重新登录");
    setTimeout(() => {
      window.history.back();
    }, 2000);
    return;
  }
  console.log("爱豆订购过形象渲染", res);
  dataList.value = res.data;
  // const result = res.data.filter((item: any) => item.starId.includes(route.query.starId))
  // idolConfigId.value = result[0].id
  // console.log(idolConfigId.value)
  // imageList(result[0].id)
  // // 为1不调用，为2调用
  // if (remindData.value == 2) {
  //   phoneList(result[0].id)
  // } 暂时
};
mylist(1);
// 渲染手机号
const phoneDatalist = ref([]);

const phoneList = async (e: any) => {
  const res = await HRequest.getFriphone(e);
  phoneDatalist.value = res.data;
  calleds.value = res.data;
};

// 删除场景
const delData = ref();
const handelDel = async (item: any) => {
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '设置管理页',page_code:"settings management", page_url: window.location.href, click_object: 'deleteScene',object_name:'删除场景',object_type:'button' })
  console.log(item);
  delData.value = item;
  toastShow.value = true;
  toastTxT.value = {
    title: "明星提示您",
    txt1: `确定要删除：`,
    txtcolor: `${item.starName}-${item.sceneName}`,
    txt3: "吗？",
    color: "#0E4DFF",
    button: 2,
    onebtntxt: "确定"
  };
};
// 关闭温馨提示取消
const handelToast = async (e: boolean) => {
  if (!e) return (toastShow.value = false);
  Toast.loading({
    duration: 0,
    message: "请稍后",
    forbidClick: true
  });
  // 二次确认  删除
  const params = {
    sceneConfigId: delData.value.id
  };
  const res = await HRequest.deleteScene(params);
  if (res.code != 200) return Toast(res.msg);
  toastShow.value = false;
  Toast("删除成功！");
  imageList(remindData.value.toString() || "2");
};
const checkSwitch = (e: boolean) => {
  console.log("免打扰设置", e);
  showDisturb.value=true
}
const handelDisturbqx = () => {
  showDisturb.value = false;
  checkOutbound.value = !checkOutbound.value;
}
const handelDisturbqd = async() => {
  showDisturb.value = false;
  const type =checkOutbound.value?'1':'2'; ;
  const res = await HRequest.getMute(type);
  if(res.code==200){
    Toast('设置成功')
  }else{
     checkOutbound.value = !checkOutbound.value;
    Toast(res.msg)
  }
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
  background: url("@/assets/otherImg/scene_background.png") no-repeat top;
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

      .goods-card {
        margin: 0;
        // background-color: @white;
      }

      .addphone {
        width: 144px;
        height: 48px;
        background: url("@/assets/img/idolTelephone/addphone.png");
        background-size: cover;
      }
      .tj {
        width: 690px;
        // background-color: #256fff;
        height: 172px;
        // background: url('@/assets/img/Exclusivevideo/jb.png');
        background: url("@/assets/img/Exclusivevideo/jb.png");
        background-size: cover;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &-1 {
          width: 630px;
          height: 92px;
          background-color: #256fff;
          border-radius: 60px;
          line-height: 92px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
.boxTi {
  width: 668px;
  height: 400px;
  background-color: #fff;
  border-radius: 28px;
  padding: 20px 0 0 0;
  font-size: 36px;
  font-weight: bold;
  &-box {
    width: 600px;
    height: 300px;
    // background-color: #ad6161;
    display: flex;
    justify-content: space-between;
    margin: 30px auto 0 auto;
    &-left {
      width: 440px;
      height: 64px;
      background: url("@/assets/img/Exclusivevideo/spb.png");
      background-size: cover;
      margin: 0 auto;
    }
    &-rigth {
      width: 440px;
      height: 64px;
      background: url("@/assets/img/Exclusivevideo/ypb.png");
      margin: 0 auto;
      background-size: cover;
    }
  }
}
.phoneAdd {
  padding: 80px 80px 80px 80px;
  .buttom {
    margin-top: 80px;
  }
}
.tag {
  // margin: 0 0 20px 20px;
  // width: 800px;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 30px;

  &-one {
    width: 300px;
    height: 64px;
    border: 1px solid #8994bb;
    color: #000;
    border-radius: 32px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
    // background-color: #256fff;
    .img {
      width: 32px;
      height: 32px;
      img {
        width: 100%;
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
      width: 167px;
      height: auto;
    }
  }
  .disturb{
    color: #FFF;
    position: absolute;
    right: 30px;
    top: 20px;
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    font-size: 28px;
    .disturb-title{
      margin-right: 20px;
    }

  }
  .details {
    width: 100%;
    min-height: 217px;
    background-color: #fff;
    padding: 17px;
    // padding: 30px;
    border-radius: 17px;
    margin-top: 25px;
    display: flex;
    justify-content: space-around;
    // justify-content: space-between;
    align-items: center;
    position: relative;
    .gqy,
    .gzj {
      width: 133px;
      height: 46px;
      background: url("@/assets/otherImg/lab_qy.png");
      background-size: cover;
      position: absolute;
      left: 0px;
      top: -8px;
    }
    .gzj {
      background-image: url("@/assets/otherImg/lab_zj.png");
    }
    .details-img {
      width: 183px;
      height: 183px;
      border-radius: 21px;
      overflow: hidden;
      margin-right: 17px;
      img {
        width: 100%;
      }
    }
    &-text {
      line-height: 45px;
      color: #333;
      // margin: 30px 0 0 30px;
      width: 220px;
      height: 50px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; // 默认不换行；
    }
    &-top {
      padding: 24px 0 0 24px;
      width: 200px;
    }
    .details-con {
      width: 186px;
      height: 183px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      img {
        width: 67px;
        height: 67px;
        // margin-right: 15px;
      }
    }

    &-time-work {
      font-size: 22px;
      width: 370px;
      height: 100%;
      color: #666;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .star-name {
        padding: 8px 16px;
        font-size: 29px;
        background: rgba(14, 77, 255, 0.1);
        border-radius: 8px;
        color: #0e4dff;
      }
      > span {
        font-size: 29px;
        line-height: 46px;
        > span {
          vertical-align: middle;
          word-wrap: break-word;
        }
        &::before {
          content: "";
          width: 29px;
          height: 29px;
          margin-right: 13px;
          vertical-align: middle;
          display: inline-block;
          background: url("@/assets/otherImg/icon_time.png") no-repeat center;
          background-size: cover;
        }
      }
      .txt {
        font-size: 33px;
        line-height: 50px;
        color: #23262b;
        // margin-bottom: 20px;
      }
      .details-time-work-work {
      }
    }
  }
  .empty_tip {
    height: 460px;
  }
  .delete-button {
    height: 100%;
  }
}
.flex-w {
  display: flex;
  justify-content: space-between;
}
.swtx {
  margin: 25px 0 0 30px;
  // padding: 0 0 0 28px;
}
.button {
  width: 100%;
  height: 83px;
  background: linear-gradient(90deg, #00a2ff, #4173ff 52%, #7c48ff);
  margin-top: 42px;
  text-align: center;
  color: #fff;
  line-height: 83px;
  font-size: 33px;
  border-radius: 90px;
}
.toast-class {
  .button-qd {
    background: linear-gradient(90deg, #00a2ff, #7c48ff) !important;
  }
}
.phoneAdd {
  box-sizing: border-box;
  padding: 0 42px 33px;
  background: url("@/assets/otherImg/more_rule_header.png") no-repeat top;
  background-size: 100% auto;
  position: relative;
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
  .outbound-text{
    text-align: left;
    font-size: 30px;
    color: #23262B;
    font-weight: 400;
  }

  
}
</style>
