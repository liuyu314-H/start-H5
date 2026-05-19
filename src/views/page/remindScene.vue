<template>
  <!-- headNavigation -->
  <!-- <headNavigation :headData="headData"></headNavigation> -->

  <div class="box">
    <div
      :class="['star-container', route.query.starId ? 'one-star' : '']"
      :style="
        route.query.starId && Listi && Listi.dtPicUrl ? `background-image: url(${AESDecrypt(Listi.dtPicUrl)});` : ''
      "
    >
      <div class="content-sw">
        <div class="wodemx" @click="goBack">
          <img
            v-if="!route.query.starId"
            src="@/assets/otherImg/my_star_title.png"
            alt=""
          />
        </div>
        <span v-if="!route.query.starId" class="idollength"
          >共有 {{ dataList.length }} 位明星</span
        >
      </div>
      <div class="content-flex idol" v-if="!route.query.starId">
        <div class="box-s">
          <div
            class="box-s-1"
            v-for="(item, index) in dataList"
            :key="index"
            @click="handelIdol(item)"
          >
            <div :class="[starId == item.starId ? 'img-1' : 'img']">
              <img :src="AESDecrypt(item.starPicUrl)" alt="" />
            </div>
            <div class="box-s-1-bottom">
              <div class="name">{{ item.starName }}</div>
            </div>
          </div>
        </div>
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
          <div class="title">添加号码</div>
          <input
            maxlength="11"
            v-model="called"
            type="text"
            label=""
            placeholder="请输入中国移动手机号"
            oninput="value=value.replace(/[^\d]/g,'')"
          />
            <input
            v-if="saveLog"
            maxlength="10"
            v-model="customText"
            type="text"
            label=""
            placeholder="请输入备注昵称（选填）"
            @input="changeCallName1"
            class="phoneName"
          />
          
          <div class="saveRadio">
            <van-checkbox v-model="saveLog" @change="handelChan">保存到亲友号码录</van-checkbox>
          </div>
          <div class="buttom">
            <van-button round @click="handelPhoneqx">取 消</van-button>
            <van-button type="primary" round @click="handelPhoneqd"
              >确 定</van-button
            >
          </div>
        </div>
      </notSuccess>
    </div>

    <div :class="['contentBox', route.query.starId ? 'one-star' : '']">
      <div class="content">
        <div v-if="familyTab == '1'" class="boxTi-box">
          <div
            :class="data.timeData.setType == 1 ? 'check' : ''"
            @click="hadnelMi(1)"
          >
            给自己
          </div>
          <div
            :class="data.timeData.setType == 2 ? 'check' : ''"
            @click="hadnelMi(2)"
          >
            送亲友
          </div>
        </div>
        <div class="content-sw" v-if="data.timeData.setType == 2"  :class="{ 'has-phone-data': phoneDatalist.length > 0 }">
          <div class="addphone2" @click="handeAddphone2"> 亲友号码录 <img src="@/assets/img/img/addPhoneImg.png" alt=""> </div>
          <div class="content-flex" v-if="phoneDatalist.length > 0">
            <!-- <div
              class="kon"
              v-if="
                phoneDatalist == null
                  ? true
                  : phoneDatalist.length == 0
                  ? true
                  : false
              "
            >
              请添加手机号码
            </div> -->
            <div
              class="tag"
              v-if="
                phoneDatalist == null
                  ? false
                  : phoneDatalist.length == 0
                  ? false
                  : true
              "
            >
              <div class="tag-one" v-for="item in phoneDatalist" :key="item">
                <div>{{ AESDecrypt(item) }}</div>
                <div class="img" @click="handelDelphone(item)">
                  <img src="@/assets/otherImg/del_icon.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="addphone1" @click="handeAddphone">
                <img src="@/assets/img/img/addImg.png" alt="">
                <div>添加手机号码</div>
              </div>
        </div>
        <div>
          <div class="scene-box">
            <div class="scene-bt" v-if='Listi.isDiy==1&&customizeStatus=="0"'>
              <div 
                :class="['foundation', { 'select-img': selectedSceneType === 'foundation', 'notSelect-img': selectedSceneType !== 'foundation' }]"
                @click="selectFoundationScene"
              >基础场景</div>
              <div 
                :class="['foundation', { 'select-img': selectedSceneType === 'customize', 'notSelect-img': selectedSceneType !== 'customize' }]"
                @click="selectCustomizeScene"
              >自定义场景</div>
            </div>
            <div v-if="selectedSceneType != 'foundation'"> 
              <div class="scene-allList">
                <div class="manageDiy">
                  <div class="scene-setUp"  @click="toggleExitMode">
                    <img :src="toExit ? setUpImg : launchImg" alt="" >
                    <div class="scene-setTitle">{{ toExit ? '管理场景' : '退出管理' }}</div>
                  </div>
                  <div class="scene-setUp" @click="getDiyScene(Listi.starId,'1')" v-if='toExit'>
                     <img :src="changeImg" alt="" >
                     <div class="scene-setTitle">刷新状态</div>
                  </div>

                </div>
                
                <div class="customizeList" >
                  <!-- item.state !== '审核通过' ? 'disabled-scene' : '', -->
                  <div 
                  :class="[
                  'Individual',
                 data.timeData.sceneId == item.id&& toExit ? 'check' : '',
                  `Individual-${(index % 4) + 1}`,
                   
                ]"
                   v-for="(item, index) in sceneList.listData" :key="index"
                    @click="toExit&&clickCustomize(item,item.id)"
                   >
                    <div>
                      <div class="customizeName"> {{ item.sceneName }} </div>
                      <div  class="customizeState"
                       :class="{
                        'review-layout': item.process == '审核通过',
                        'approved-layout': item.process != '审核通过'
                      }" 
                       v-if="toExit">
                        <img
                         class="imgs"
                          src="@/assets/img/remindScene/play.png"
                          alt=""
                          @click.stop="handelVideoPlay(item)"
                          v-if="item.process == '审核通过'"
                        />
                        <div class="customizeStateName" :class="getStatusClass(item.process)">
                          {{ item.process }}
                        </div>
                         <!-- 添加选中勾选图标 -->
                        <span
                          class="check-icon"
                          v-show="data.timeData.sceneId == item.id"
                        ></span>
                      </div>
                      <div v-else class="customizeMoreImg" >
                         <img
                         @click="openSceneItem(item)"
                          src="@/assets/img/img/moreImg.png"
                          alt=""
                        />

                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="cellBox-onData" v-if='sceneList.listData.length==0'>
                <div><img src="@/assets/img/img/noData1.png" alt=""></div>
                <div>暂无自定义场景，快去添加场景吧</div>
              </div>


              <div class="addCustomize" @click="addCustomize">
                <img src="@/assets/img/img/addImg.png" alt="">
                <div>添加自定义场景</div>
              </div>
            </div>
            <div v-else
              class="scene-item-box-wrapper"
              :class="{ 'scrollable': data.dataList.length > 6 }">
              <div class="scene-item-box" > 
                <div
                  :class="[
                    'scene-item',
                    data.timeData.sceneId == item.id ? 'check' : '',
                    `scene-item-${(index % 8) + 1}`,
                  ]"
                  v-for="(item, index) in data.dataList"
                  :key="'scene' + index"
                  @click="clickSceneItem(item,item.id)"
                >
                  <div class="imgs-zz" v-if="viodeShow"></div>
                  <img
                    src="@/assets/img/remindScene/stop.png"
                    class="imgs"
                    alt=""
                    v-if="item.url == videostop"
                    @click.stop="handelVideoStop(item)"
                  />
                  <img
                    v-else
                    class="imgs"
                    src="@/assets/img/remindScene/play.png"
                    alt=""
                    @click.stop="handelVideoPlay(item)"
                  />
                  <div>{{ item.sceneName }}</div>
                  <span
                    class="check-icon"
                    v-show="data.timeData.sceneId == item.id"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 生效时长 -->
        <div class="duration-time">
          <!--  -->
          <div class="cellBox">
            <div class="cellBox-on" :data-v="data.timeData.repeatType">
              <!-- route.query.Edit !== 'Edit' -->
              <van-cell
                title="重复模式"
                :value="MonthlyData.name"
                @click="show = true"
                class="year"
                is-link
              ></van-cell>
              <van-action-sheet
                v-model:show="show"
                :actions="actions"
                cancel-text="取消"
                :description="
                  route.query.Edit ? '编辑状态无法选择' : '请选择重复时间'
                "
                close-on-click-action
                @select="handelCF"
              />
            </div>
            <!-- 不重复，选择年月日 -->
            <div class="cellBox-on" v-if="data.timeData.repeatType == 0">
              <van-cell
                title="选择日期"
                :value="data.timeData.enableTimeFormat"
                @click="currentShow = !route.query.Edit ? true : false"
                class="year"
                is-link
              ></van-cell>
              <van-popup
                v-model:show="currentShow"
                round
                position="bottom"
                :style="{ height: '50%' }"
              >
                <van-datetime-picker
                  v-model="currentDate"
                  type="date"
                  title=""
                  cancel-button-text="选择日期"
                  v-if="currentShow"
                  @confirm="handelYear"
                  Slots="confirm cancel"
                  :formatter="formatter"
                  :min-date="minDate"
                  :max-date="maxDate"
                ></van-datetime-picker>
              </van-popup>
            </div>
            <!-- 每月，获取月份的天数 -->
            <div class="cellBox-on" v-if="data.timeData.repeatType == 4">
              <van-cell
                title="选择日期"
                :value="monthly"
                @click="monthShow = !route.query.Edit ? true : false"
                class="year"
                is-link
              ></van-cell>
              <!-- <van-calendar
                :show-mark="false"
                :show-title="false"
                :lazy-render="false"
                color="#256fff"
                v-model:show="monthShow"
                :min-date="new Date(2024, new Date().getMonth(), 1)"
                :max-date="new Date(2024, new Date().getMonth(), 31)"
                @change="handelSun"
                @confirm="handelSunClick"
              ></van-calendar> -->
              <van-popup
                v-model:show="monthShow"
                round
                position="bottom"
                :style="{ height: '40%' }"
              >
                <van-picker
                  title=""
                  :columns="columns"
                  @confirm="onConfirm"
                  @cancel="onCancel"
                  :default-index="columnsMoren"
                />
              </van-popup>
            </div>
            <!-- 每年，获取几月几号 -->
            <div class="cellBox-on" v-if="data.timeData.repeatType == 5">
              <van-cell
                title="选择日期"
                :value="annually"
                @click="monthShow = !route.query.Edit ? true : false"
                class="year"
                is-link
              ></van-cell>
              <van-popup
                v-model:show="monthShow"
                round
                position="bottom"
                :style="{ height: '50%' }"
              >
                <van-datetime-picker
                  v-model="month"
                  type="month-day"
                  title="选择日期"
                  :min-date="minDate"
                  :max-date="maxDate"
                  @cancel="monthShow = false"
                  @change="handelMonth"
                  @confirm="handelMonthClick"
                  :formatter="formatter"
                />
              </van-popup>
            </div>
            <!-- 每周，周一-周日 -->
            <div class="cellBox-on" v-if="data.timeData.repeatType == 3">
              <van-cell
                title="选择日期"
                :value="data.textLists"
                @click="remindShow = !route.query.Edit ? true : false"
                class="year"
                is-link
              ></van-cell>
              <van-popup
                v-model:show="remindShow"
                round
                position="bottom"
                :style="{ height: '60%' }"
                @click-overlay="handeloverlay"
              >
                <div class="cf-time">
                  选择日期
                  <!-- <span @click="remindShow = false">确认</span> -->
                </div>

                <van-checkbox-group
                  v-model="data.timeData.week"
                  direction="horizontal"
                  class="checkboxBox"
                >
                  <van-checkbox
                    class="checkbox"
                    v-for="(item, index) in data.repeatData"
                    :key="index"
                    @click="addTime(item)"
                    :name="item.id"
                  >
                    <template #icon="props">
                      <div class="check" v-if="props.checked">
                        <p>{{ item.name }}</p>
                        <img src="@/assets/img/img/Vectoryes.png" alt="" />
                      </div>
                      <div class="check" v-else>
                        <p>{{ item.name }}</p>
                        <img src="@/assets/img/img/Vector.png" alt="" />
                      </div>
                    </template>
                    <!-- <template #icon="props">
                      <van-button class="button" type="primary" v-if="props.checked">
                        {{ item.name }}
                      </van-button>
                      <van-button class="button" v-else>
                        {{ item.name }}
                      </van-button>
                    </template> -->
                  </van-checkbox>
                </van-checkbox-group>
                <div class="riqi">
                  <div @click="handelno">取消</div>
                  <div @click="handelcheckOk">确认</div>
                </div>
              </van-popup>
            </div>
            <!-- 提醒时间 -->
            <div class="cellBox-on">
              <van-cell
                title="提醒时间"
                :value="data.timeData.dayTime"
                @click="maxminTime('open')"
                class="year"
                is-link
              ></van-cell>
              <van-popup
                v-model:show="currentimeShow"
                round
                position="bottom"
                :style="{ height: '50%' }"
              >
                <van-datetime-picker
                  class="picker"
                  v-model="currentTime"
                  type="time"
                  cancel-button-text="取消"
                  v-if="currentimeShow"
                  title="选择提醒时间"
                  @change="handelTime"
                  @cancel="currentimeShow = false"
                  @confirm="handelTimeaout"
                  Slots="confirm cancel"
                  confirm-button-text="确定"
                  :min-hour="hourTime"
                  :min-minute="minuteTime"
                  :max-hour="maxhourTime"
                  :max-minute="maxminuteTime"
                  :formatter="formatter"
                ></van-datetime-picker>
              </van-popup>
            </div>
          </div>
        </div>
        <!-- 为自己  v-if="data.timeData.setType == 1"-->
        <div class="bottomtxt">
          温馨提示：
          <br />
          1.明星来电会在预定的时间，通过125990向您订购的手机号或者指定的手机号呼出视频电话进行提醒，敬请留意。
          <br />
          2.如您的手机为iPhone，或手机未启用volte高清通话功能，您接到的将是125990的普通语音来电。
        </div>
        <!-- 为亲朋好友 -->
        <!-- <div class="bottomtxt" v-else>
          温馨提示：
          <br />
          1.为亲友设置视频电话提醒，明星来电会在保存设置后，向您设置接收视频提醒的手机号发送告知短信。
          <br />
          2.如接收视频电话提醒的手机为iphone，或手机未启用volte高清通话功能，您接到的将是125990的普通语音来电。
          <br />
          <span v-show="callTimeData.isDay == 0">
            3.仅支持在早{{ formatTime(callTimeData.startHour + ':' + callTimeData.startMin) }} - 晚{{ formatTime(callTimeData.endHour + ':' + callTimeData.endMin) }}期间为亲友号码设置电话提醒。
          </span>
        </div> -->
        <!-- 底部按钮 -->
        <van-sticky>
          <div class="boxs">
             <div class="boxs-1" @click="handelOne"  v-if="!route.query.Edit">
              <img src="@/assets/img/img/iphonebtn.png" alt="">
              一键来电</div>
            <div  :class="[route.query.Edit?'boxs-3':'boxs-4','boxs-2']" @click="handelOK">保存设置</div>
          </div>
        </van-sticky>
        <div class="warning-message" v-if="!route.query.Edit"><img src="@/assets/img/img/warning.png" alt="">点击一键来电：将在5分钟后来电</div>
      </div>
    </div>
    
  </div>
  <!-- <FriendsRecord></FriendsRecord> -->
  <!-- 管理场景 -->
  <van-popup 
  :show="showBottom" 
  round 
  position="bottom"
  :style="{ height: '28%' }">
  <div class="changeBusiness">
     <div @click="editScene">编辑场景名称</div>
    <div @click="delScene">删除场景</div>
    <div  @click="showBottom = false">取消</div>
  </div>
  </van-popup>
  <!-- 编辑场景弹窗 -->
      <notSuccess :isShow="showSceneName">
        <div class="phoneAdd">
          <img
            src="@/assets/otherImg/exit.png"
            class="exit_btn"
            @click="handelNameqx"
            alt=""
          />
          <div class="title">编辑场景名称</div>
          <input
            maxlength="6"
            v-model="calledName"
            type="text"
            label=""
            placeholder="请输入场景名称"
            @input="changeCallName"
          />
          <div class="buttom">
            <van-button round @click="handelNameqx">取 消</van-button>
            <van-button type="primary" round @click="handelNameqd"
              >确 定</van-button
            >
          </div>
        </div>
      </notSuccess>
      <!-- 删除场景弹框 -->
          <notSuccess :isShow="delSceneName">
        <div class="phoneAdd">
          <img
            src="@/assets/otherImg/exit.png"
            class="exit_btn"
            @click="delNameqx"
            alt=""
          />
          <div class="title">删除提示</div>
          <div>确定要删除 <span style="color: #0E4DFF;">{{calledName}}</span>吗?</div>
          <div class="delwarn">
            <img src="@/assets/img/img/warn.png" alt="">
            <div>删除后，未执行的外呼任务将自动取消</div>
          </div>
          <div class="buttom">
            <van-button round @click="delNameqx">取 消</van-button>
            <van-button type="primary" round @click="delNameqd"
              >确 定</van-button
            >
          </div>
        </div>
      </notSuccess>

  <notSuccess :isShow="isShow">
    <windowWarning
      :warningData="data.warningData"
      @warningShow="warningShow"
    ></windowWarning>
  </notSuccess>

  <notSuccess :isShow="phonShow">
    <tipsPhone @phonisShow="phonisShow"></tipsPhone>
  </notSuccess>
  <!-- 视频播放组件 -->
  <videoPlay
    :videoShow="videoShow"
    :videoData="videoData"
    @PlayShow="PlayShow"
  ></videoPlay>
  <!--音频播放静音，取消 
      <audio ref="clickSound" controls autoplay autopsy>
        <source :src="audio" type="audio/mpeg" />
    </audio> -->
  <video
    ref="clickSound"
    :src="audio"
    controls
    autoplay
    autopsy
    webkit-playsinline="true"
    playsinline="true"
    preload="true"
    @ended="onVideoEnde"
    style="position: absolute; top: -10000px"
  ></video>
  <!-- <exceedwarn :warnTxT="warnTxT" :warnShow="warnShow"></exceedwarn> -->
  <toast
    :toastTxT="noUsertxt"
    :toastShow="nouserToast"
    @toastEmit="handelToast1"
    @ok-form="okForm"
  ></toast>
  <addtoast
    :toastTxT="toastTxT"
    :toastShow="toastShow"
    @toastEmit="handelToast"
  ></addtoast>

  
</template>

<script setup lang="ts">
import { ref, reactive, Ref,onMounted,watch } from "vue";
import { Dialog } from "vant";
import {
  AESDecrypt,
  AesEncrypt,
  getURIParam,
  unique,
  formatTime,
  isChinaMobile,
  formatJanuaryFirst,
  urlForm,
  YearData,
  deduplicateByIdolId,
} from "@/utils";
import { useRouter, useRoute  } from "vue-router";
import { formatDateTime } from "@/utils/utils";
import { Toast } from "vant";
import HRequest from "@/api";
import addtoast from "@/components/toast/addtost.vue";
import notSuccess from "@/components/notSuccess.vue";
import "vant/es/dialog/style";
import videoPlay from "@/components/videoPlay.vue";
import windowWarning from "@/components/windowWarning.vue";
import tipsPhone from "@/components/tipsPhone.vue";
import toast from "@/components/toast/index.vue";
import volcPoint from "@/utils/volc-collect";

import setUpImg from '@/assets/img/img/setUp.png';
import launchImg from '@/assets/img/img/launch.png';
import changeImg from '@/assets/img/img/changeImg.png';
import successIcon from '@/assets/img/img/success.png'

// import FriendsRecord from '@/views/page/friendsRecord.vue'

const toExit = ref(true);
const showBottom = ref(false); // 管理场景弹窗
const showSceneName = ref(false);  //编辑自定义名称
const calledName = ref(''); // 场景名称
const delSceneName = ref(false);  //删除场景弹框
const customizeId=ref(''); //自定义id
const customizeStarId=ref(''); //明星id
const customText=ref(''); // 备注昵称
const saveLog=ref(false); // 是否保存到亲友号码录
const callStatus=ref(false); // 来电状态


const customizeStatus=ref('0'); // 场景状态
const selectedSceneType = ref('foundation'); // 'foundation' 或 'customize'
// 场景类型数组
const sceneList:any = reactive({
  listData:[]})
onMounted(()=>{
  console.log('来源页面:', route.meta.from)
   const storedPhoneList = sessionStorage.getItem('friendsRecord_phoneDatalist');
   if(route.meta.from.includes("friendsRecord")){
      data.timeData.setType = 2 
   }
  if (storedPhoneList) {
     
    try {
      const parsedPhoneList = JSON.parse(storedPhoneList);
      if (Array.isArray(parsedPhoneList)) {
        console.log(parsedPhoneList)
        phoneDatalist.value = [...phoneDatalist.value, ...parsedPhoneList];
        data.timeData.friendPhones = phoneDatalist.value;
        console.log('从 friendsRecord 接收到的手机号列表:', phoneDatalist.value);
      }
    } catch (error) {
      console.error('解析手机号列表失败:', error);
    }
  }
  if ("Edit" in route.query)  getEdit()
   // 清除 sessionStorage 中的数据，避免重复使用
  sessionStorage.removeItem('friendsRecord_phoneDatalist');

})
const clickSceneItem = (item:any,id: string) => {
  data.timeData.isDiyScene=''
  if (data.timeData.sceneId === id) {
    data.timeData.sceneId = "";
  } else {
    data.timeData.sceneId = id;
  }
    // 埋点
volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'tick',object_name:'勾选'+item.sceneName,object_type:'button' })

};
let volc = new volcPoint("明星来电", "设置场景页");
volc.initEvent();
// 埋点
volc.pageViewEvent("mxld_",{module:"明星来电",module_code:'mxld', page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href })
const router = useRouter();
const route: any = useRoute();

const toastTxT: any = ref({
  title: "暂无权限",
  txt1: "您已设置2024年1月10日 12:01",
  txtcolor: "【时代少年团马嘉祺】",
  txt3: "的生日提醒，请保持电话畅通，注意接听来自125990的电话。",
  color: "#256fff",
  button: 1,
  onebtntxt: "双按钮",
  butonTxt: "单个按钮",
});
const toastShow = ref(false); // 无权限使用
const callTimeData = ref(
  JSON.parse(sessionStorage.getItem("getCallTime") || "{}")
);

// callTimeData.value = JSON.parse(sessionStorage.getItem('callTimeData'))
const minDate = ref(
  new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  )
); // 获取当前年月日

const maxDate = ref(
  new Date(
    new Date().getFullYear() + 1,
    new Date().getMonth() + 1,
    new Date().getDate()
  )
); //限制能设置到什么时候

const hourTime = ref(); //获取当前小时new Date().getMinutes() + 5 >= 60 ? new Date().getHours() + 1 : new Date().getHours()
console.log("获取当前小时", hourTime.value);
const maxhourTime = ref();
const maxminuteTime = ref();
const minuteTime = ref(); //获取当前分钟new Date().getMinutes() + 5 >= 60 ? new Date().getMinutes() + 5 - 60 : new Date().getMinutes() + 5
// new Date().getMinutes() + 5 >= 60 ? new Date().getMinutes() + 5 - 60 : new Date().getMinutes() + 5
// console.log(new Date().getHours())
// console.log(new Date().getMinutes())
// ------------------重复时间逻辑--------------------

const show = ref(false);
const actions = ref([
  //repeat==1为重复
  // 每天 week=[1,2,3,4,5,6,7]  ,工作日
  { name: "不重复", repeatType: 0, disabled: route.query.Edit ? true : false }, //annual年份，month月份，day日，dayTime时间
  { name: "工作日", repeatType: 1, disabled: route.query.Edit ? true : false }, //仅时间，如03:12
  { name: "每天", repeatType: 2, disabled: route.query.Edit ? true : false }, //仅时间，如03：12
  { name: "每周", repeatType: 3, disabled: route.query.Edit ? true : false }, //week，如1，2，时间03：12
  { name: "每月", repeatType: 4, disabled: route.query.Edit ? true : false }, //day每月第几天，时间03：12
  { name: "每年", repeatType: 5, disabled: route.query.Edit ? true : false }, //month月份，day日期，时间03：12
]);
const MonthlyData: any = ref({
  name: "不重复",
  repeatType: 0,
  repeat: "2",
  subname: "",
});

/**
 *弹窗
 */
const noUsertxt: any = ref({
  // title: '暂无权限使用',
  // txt: '您还不是明星来电用户'
  title: "温馨提示",
  txt1: "您还不是明星来电用户",
  // txtcolor: '【时代少年团马嘉祺】',
  // txt3: '的生日提醒，请保持电话畅通，注意接听来自125990的电话。',
  // color: '#3882FF',
  button: 1,
  // onebtntxt: '去办理'
});
const nouserToast = ref(false); // 无权限使用
// 关闭温馨提示
const handelToast1 = (e: boolean) => {
  nouserToast.value = false;
};
const handelCF = (item: any) => {
  // maxminTime()
  console.log("-----", item);
  console.log(hourTime.value, minuteTime.value);
  minDate.value = new Date(new Date().getFullYear(), 0, 1); //非重复初始化默认1.1日
  data.timeData.repeatType = item.repeatType;
  if (data.timeData.setType !== 1) {
    maxminTime();
    console.log(
      `为亲友限制${TimeData.value.startHour}:${TimeData.value.startMin}~${TimeData.value.endHour}:${TimeData.value.endMin}`
    );
    if (item.repeatType !== 0) {
      hourTime.value = 0;
      minuteTime.value = 23;
      minuteTime.value = 0;
      maxminuteTime.value = 59;
    }
  }
  console.log(item);
  data.textLists = "";
  data.timeData.year = "";
  data.timeData.month = "";
  // data.timeData.hours = ''
  // data.timeData.minutes = ''
  annually.value = "";
  data.repeatTime = "";
  data.timeData.week = [];
  MonthlyData.value = item;
  // 如果选择的是不重复选项，单独给repeat赋值
  if (item.repeatType == 0) {
    console.log("不重复选项");
    minDate.value = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    currentTime.value =
      (new Date().getMinutes() + 5 >= 60
        ? new Date().getHours() + 1
        : new Date().getHours()) +
      ":" +
      (new Date().getMinutes() + 5 >= 60
        ? new Date().getMinutes() + 5 - 60
        : new Date().getMinutes() + 5);

    hourTime.value =
      new Date().getMinutes() + 5 >= 60
        ? new Date().getHours() + 1
        : new Date().getHours();
    minuteTime.value =
      new Date().getMinutes() + 5 >= 60
        ? new Date().getMinutes() + 5 - 60
        : new Date().getMinutes() + 5;
    data.repeatTime = "";
    console.log("------", minuteTime.value);
    return;
  }

  hourTime.value = 0;
  minuteTime.value = 0;
};

// ------------------重复时间逻辑--------------------
//----------------------选择按年月份逻辑部分-----------------------

const monthShow = ref(false);
const month = ref(new Date(new Date().getFullYear(), 0, 1));
const annually = ref(); //回显数据
// 点击按钮
const handelMonthClick = (time: any) => {
  monthShow.value = false;
  handelMonth(time);
  annually.value = formatJanuaryFirst(
    data.timeData.month + "-" + data.timeData.day
  );
};

// 非点击按钮
const handelMonth = (time: any) => {
  console.log(time);
  const date = new Date(time);
  const month = date.getMonth() + 1; // getMonth()返回的月份是从0开始的，所以需要加1
  const day = date.getDate();
  data.timeData.month = month;
  data.timeData.day = day;
};
//----------------------选择按年月份逻辑部分-----------------------
//----------------------选择按月日期赋值----------------------
const monthly = ref(); //回显和渲染
// 点击按钮
// const handelSunClick = (time: any) => {
//   monthShow.value = false
//   handelSun(time)
// }
// // 非点击按钮
// const handelSun = (time: any) => {
//   console.log(data.timeData.monthly)

//   const date = new Date(time)
//   const month = date.getMonth() + 1 // getMonth()返回的月份是从0开始的，所以需要加1
//   const day = date.getDate()
//   data.timeData.monthly = day
//   monthly.value = data.timeData.monthly == null ? '' : data.timeData.monthly + '日'
// }
// 获取月份
const columns = YearData();
const columnsMoren = ref(new Date().getDate() - 1); // 默认选择的天数
const onConfirm = (value: any, index: any) => {
  // Toast(`111当前值: ${value}, 当前索引: ${index + 1}`)
  monthly.value = value;
  data.timeData.day = index + 1;
  monthShow.value = false;
  columnsMoren.value = index;
};
// const onChange = (value: any, index: any) => {
//   // Toast(`222当前值: ${value}, 当前索引: ${index}`)
// }
const onCancel = () => (monthShow.value = false);
//----------------------选择按月日期赋值-----------------------
const starId = ref("1"); // 选中的状态
const dataList: Ref<dataList[]> = ref([]); // 明星渲染
interface dataList {
  smPicUrl: string;
  starName: string;
  id: string;
  starId: string;
  starPicUrl: string;
  sceneId: string;
}
const isShow = ref(false);
const phonShow = ref(false);
const videoShow = ref(false);
const id = ref(0);
const currentDate = ref(new Date());
// 如果当前分钟>=55 小时+1 分钟当前分钟+5-60
const currentTime = ref();
// 此判断作用：当时间校准为23:55分时会导致小时选择为Null
if (
  hourTime.value == 23 &&
  new Date().getHours() == 23 &&
  new Date().getMinutes() >= 55
) {
  console.log("23：55时间校验刷新");
  hourTime.value = 0;
  minuteTime.value = 0;
  currentTime.value = "0:0";
} else {
  console.log("非23：55", new Date().getHours());
  // maxhourTime.value = new Date().getHours() + 1
  currentTime.value =
    (new Date().getMinutes() + 5 >= 60
      ? new Date().getHours() + 1
      : new Date().getHours()) +
    ":" +
    (new Date().getMinutes() + 5 >= 60
      ? new Date().getMinutes() + 5 - 60
      : new Date().getMinutes() + 5);
}
// console.log(currentTime.value)

// console.log(
//   (new Date().getMinutes() + 5 >= 60 ? new Date().getHours() + 1 : new Date().getHours()) +
//     ':' +
//     (new Date().getMinutes() + 5 >= 60 ? new Date().getMinutes() + 5 - 60 : new Date().getMinutes() + 5) ==
//     '15:28'
// )
// console.log(hourTime.value + ':' + new Date().getMinutes())
// 动态时间这俩个变量赋值就行====================================================
// hourTime.value = 0
// minuteTime.value = 0
const currentShow = ref(false);
const currentimeShow = ref(false);
const remindShow: any = ref(false);

const data: any = reactive({
  repeatTime: "",
  dataList: [],
  timeData: {
    friendPhones:
      route.query.friendPhones == null ? [] : route.query.friendPhones, //被叫手机号['自己']&&['亲'，'''] 未接入
    repeatType: 0, // 重复模式，默认不重复
    idolConfigId: "", //idol配置id 长的
    scenceName: "", //文件名字
    scenceUrl: "", //视频路径
    fid: "",
    sceneConfigId: route.query.id,
    setType: 1, // 1 给自己， 2送亲友，默认1
    month: "", // 月
    year: "", //年
    day: "", // 日
    monthDate: "", //月-日
    week: [], //选择的星期几
    enableTime: "", //yy-xx-dd 不重复选择日期
    enableTimeFormat: "", //yy-xx-dd 不重复选择日期展示
    dayTime: "", //提醒时间 hh:mm
    sceneId: "", // 素材id
    starId: "",
    id: "",
    isDiyScene:'',//区分自定义场景（ “1”）还是基础场景
  },
  textLists: [],
  repeatData: [
    { name: "周一", id: 1, ischeck: false },
    { name: "周二", id: 2, ischeck: false },
    { name: "周三", id: 3, ischeck: false },
    { name: "周四", id: 4, ischeck: false },
    { name: "周五", id: 5, ischeck: false },
    { name: "周六", id: 6, ischeck: false },
    { name: "周日", id: 7, ischeck: false },
    // { name: '不重复', id: 8, ischeck: false }
  ],
  repeatSelarr: [],
  warningData: {
    title: "",
    text: "",
    path: "",
  },
});
// 进页面初始化限制不重复只能选后五分钟逻辑
if (data.timeData.repeatType == 0&&!route.query.Edit) {
  console.log("不重复选项");
  minDate.value = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  currentTime.value =
    (new Date().getMinutes() + 5 >= 60
      ? new Date().getHours() + 1
      : new Date().getHours()) +
    ":" +
    (new Date().getMinutes() + 5 >= 60
      ? new Date().getMinutes() + 5 - 60
      : new Date().getMinutes() + 5);
  hourTime.value =
    new Date().getMinutes() + 5 >= 60
      ? new Date().getHours() + 1
      : new Date().getHours();
  minuteTime.value =
    new Date().getMinutes() + 5 >= 60
      ? new Date().getMinutes() + 5 - 60
      : new Date().getMinutes() + 5;
  data.repeatTime = "";
}
const familyTab = ref("0");
const getFriModule = async () => {
  const res = await HRequest.getFriModule();

  familyTab.value = res.data;
};

// const warnShow = ref(false) // 警告弹窗
// const warnTxT = ref({
//   title: '温馨提示',
//   txt: '默认',
//   button: '我知道了'
// })

//--------------------展第三方单点登录逻辑----------------------------
const getVersion = async () => {
  const res = await HRequest.getVersion();
  localStorage.setItem("version", res.data);
  getURIParam("token") ? loginInfo() : null;
};
getVersion();
const loginInfo = async () => {
  const params = {
    ssoToken: getURIParam("token"),
    tag: "1",
    loginChn: "4",
    // appId: "xth001",
    version: localStorage.getItem("version"),
  };
  const res = await HRequest.singleLogin(params);
  console.log("-----执行第三方单点登录-----", res);
  localStorage.setItem("tk", res.data.token);
  sessionStorage.setItem("actId", "study");
  userDetail();
};
//--------------------展第三方单点登录逻辑----------------------------
const userDetail = async () => {
  const params = {
    loginChn: "4",
  };
  const res = await HRequest.userDetail(params);
  getFriModule();
  //status   用户呼叫状态，0为正常，1为超出每天3次上限，2为超出每月30次上限
  // if (res.data.status == 1) {
  //   warnShow.value = true
  //   warnTxT.value = {
  //     title: '温馨提示',
  //     txt: '您今日的提醒次数已达到3次上限。请明日再尝试。'
  //   }
  // } else if (res.data.status == 3) {
  //   warnShow.value = true
  //   warnTxT.value = {
  //     title: '温馨提示',
  //     txt: '您本月的提醒次数已达到30次上限。请下个月再尝试。'
  //   }
  // }
};
if (localStorage.getItem("tk")) {
  userDetail();
}
const handelIdol = (item: any) => {
  console.log("点击选中形象", item);
  starId.value = item.starId;
  // data.timeData.idolConfigId = item.id
  data.timeData.fid = "";
  data.timeData.sceneId = "";
  data.timeData.scenceName = "";
  data.timeData.scenceUrl = "";

  // 显示不同形象下的亲友手机号
  // phoneList(item.id)
  selectedSceneType.value='foundation'  //默认显示基础场景
  sessionStorage.setItem("starId", item.starId);
  // 渲染明星
  getIdolByIdolId(item.starId);
};
// 切换自己亲友清除事务场景数据
const Listi: any = ref("");
const hadnelMi = async (item: number) => {
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: item==1?'oneself':'friends',object_name:item==1?'给自己':'给亲友',object_type:'button' })
  console.log(item);
  // data.timeData.sceneId = ''
  // data.timeData.scenceUrl = ''
  // data.dataList = [] // 切换自己亲友清除事务场景数据
  data.timeData.setType = item;
  currentTime.value = "";
  data.repeatTime = "";
  data.timeData.fid = "";
  data.timeData.sceneId = "";
  data.timeData.scenceName = "";
  data.timeData.scenceUrl = "";
  id.value = 0;
  console.log('需要看看齿条',dataList.value)
  // starId.value = dataList.value[0].starId;
   if (dataList.value && dataList.value.length > 0) {
      starId.value = dataList.value[0].starId;
  } else {
      // 兜底策略：如果列表为空，尝试从路由或缓存获取，或者提示用户刷新
      console.warn("明星列表为空，无法设置默认 starId");
      // 如果是在编辑模式，可能可以从 route.query.starId 获取
      if (route.query.starId) {
          starId.value = route.query.starId as string;
      }
  }
  if (!route.query.Edit) {
    data.timeData.enableTimeFormat = "";
    data.timeData.dayTime = "";
  }
  // 从发送祝福进来执行这个方法
  // if (route.query.starId) {
  //   getIdolByIdolId(route.query.starId)
  // }
  if (route.query.starId) {
    console.log("发祝福");

    getIdolByIdolId(route.query.starId); // 判断亲友自己的ID
  } else {
    console.log("设置页进入");

    getIdolByIdolId(dataList.value[0].starId); // 判断亲友自己的ID
  }

  const arr: object[] = [];
  if (item == 1) {
    Listi.value.defaultSceneList?.forEach((e: any) => {
      arr.push(e);
    });
  } else {
    Listi.value.friendSceneList?.forEach((e: any) => {
      arr.push(e);
    });
  }
  console.log(
    arr,
    `为${data.timeData.setType == 1 ? "自己" : "亲友"}`,
    item,
    "头部切换自己亲友"
  );
  data.dataList = arr;
  // 动态最大在这里设置=============================
  console.log(item);
  if (item !== 1) {
    console.log("为亲友限制");

    maxminTime();
  } else {
    console.log("为自己重置");
    // 最小
    hourTime.value = 0;
    minuteTime.value = 0;
    // 最大
    maxhourTime.value = 23;
    maxminuteTime.value = 59;
    //如果是不重复，则重定向不重复时间段
    if (data.timeData.repeatType == 0) {
      console.log("为自己重置不重复", MonthlyData.value);
      minDate.value = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      handelCF(MonthlyData.value);
    }
  }
  console.log("-------", data.timeData.repeatType);
  // 为自己为亲友渲染的明星
  // mylist(item)
};

const maxminTime = async (type?: string) => {
  console.log(data.timeData.setType, "1为自己2为亲友");
  if (type === "open") {
    currentimeShow.value = true;
  }
  console.log('当前时间',hourTime.value, new Date().getHours())
  if (new Date().getHours() == 23 && new Date().getMinutes() >= 55) {
    console.log("23：55时间校验刷新");
    hourTime.value = 0;
    minuteTime.value = 0;
    currentTime.value = "0:0";
  } else {
    console.log("非23：55", new Date().getHours());
    // minuteTime.value = new Date().getHours() + 1
    currentTime.value =
      (new Date().getMinutes() + 5 >= 60
        ? new Date().getHours() + 1
        : new Date().getHours()) +
      ":" +
      (new Date().getMinutes() + 5 >= 60
        ? new Date().getMinutes() + 5 - 60
        : new Date().getMinutes() + 5);
  }
  if (data.timeData.setType == 2) {
    console.log("data.timeData.setType == 2执行为亲友的限制！");
    const params = {
      type: 2,
    };
    const res = await HRequest.getCallTime(params);
    if (res.data.isDay == 1) {
      // Toast('为亲友开放全天提醒！')
      console.log("为亲友开放全天提醒！");

      TimeData.value = {
        endHour: 23,
        endMin: 59,
        id: "全天",
        isDay: 1, // 修改为1表示全天可选
        startHour: 0,
        startMin: 0,
      };
      return;
    }
    console.log(
      `为亲友限制${formatTime(res.data.friStartTime)}~${formatTime(
        res.data.friEndTime
      )}`
    );
    console.log(res.data);
    const { friStartTime, friEndTime } = res.data;
    const [endHour, endMin] = friEndTime.split(":");
    const [startHour, startMin] = friStartTime.split(":");
    console.log(endHour);
    TimeData.value = { ...res.data, startHour, startMin, endHour, endMin };
    console.log(data.timeData.hours);
    console.log(new Date().getHours());
    console.log(
      "限制时间字段",
      `${TimeData.value.startHour + ":" + TimeData.value.startMin} ~ ${
        TimeData.value.endHour + ":" + TimeData.value.endMin
      }`
    );

    // 最小
    hourTime.value = startHour;

    // if (startMin !== 0) {
    //   console.log('最小时间不等于0', startMin)
    //   minuteTime.value = startMin
    // }
    // 若当前选择的小时或者当前小时等于限制的最小时间
    if (
      data.timeData.hours == hourTime.value ||
      new Date().getHours() == hourTime.value
    ) {
      minuteTime.value = startMin;
    } else {
      minuteTime.value = 0;
    }
    // 最大
    maxhourTime.value = endHour;
    // 若当前选择的小时或者当前小时等于限制的最大时间
    if (
      data.timeData.hours == maxhourTime.value ||
      (new Date().getHours() == maxhourTime.value &&
        new Date().getMinutes() == endMin)
    ) {
      maxminuteTime.value = endMin;
    } else {
      maxminuteTime.value = 59;
    }
    // if (endMin !== 0) {
    //   console.log('最大时间不等于0', endMin)

    //   maxminuteTime.value = endMin
    // }
    // 若为不重复时,且当前时间超出最大限制时间，要求用户设置第二天
    // 若当前时间不在限制时间内，则设置当前时间为限制时间下限
    if (data.timeData.repeatType == 0) {
      const hour =
        data.timeData.hours !== ""
          ? data.timeData.hours
          : new Date().getHours();
      const minutes =
        data.timeData.minutes !== ""
          ? data.timeData.minutes
          : new Date().getMinutes();
      if (
        hour < startHour ||
        hour > endHour ||
        (hour == endHour && minutes > endMin)
      ) {
        currentTime.value = startHour + ":" + startMin; // 当前时间大于限制时间上限，则设置当前时间为限制时间下限
      }
      // 若当前选择日期在限制时间内则不做修改
      if (data.timeData.hours >= startHour || data.timeData.hours <= endHour) {
        currentTime.value = data.timeData.hours + ":" + data.timeData.minutes;
      }
      if (
        new Date().getHours() > maxhourTime.value ||
        (new Date().getHours() == maxhourTime.value &&
          new Date().getMinutes() > endMin)
      ) {
        minDate.value = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1
        ); // 限制时间的最大时间小于当前时间，要求用户不能设置当天
      }
    }
  } else {
    console.log("data.timeData.setType == 1执行为自己的限制！");
  }
  console.log(
    "xx",
    hourTime.value,
    "yy",
    minuteTime.value,
    maxminuteTime.value,
    "zz",
    currentTime.value
  );
};
if (data.timeData.setType !== 1) {
  maxminTime();
}
// 1渲染自己，2渲染亲人
const mylist = async (e: any) => {
  // const res = await HRequest.getStateIdolList(e, usertype.value)
  // // state为1为自己 2为亲友
  // dataList.value = res.data
  // const res1 = await HRequest.getIdolListComDetail([]) // 暂时
  const res1 = { data: null }; // 暂时
  const res = await HRequest.getIdolList(1, 2);

  dataList.value = deduplicateByIdolId(
    res1.data == null ? res.data : [...res.data, ...res1.data]
  );

  // 点击发送祝福跳转
  if (route.query.starId) {
    getIdolByIdolId(route.query.starId);
    // 点击为亲朋好友执行
  } else {
    console.log("非发送祝福跳转默认选第一个", dataList.value[0].starId);
    starId.value = dataList.value[0].starId; // 复选框状态
    getIdolByIdolId(dataList.value[0].starId);
  }

  // dataList.value = res.data.filter((item: any) => item.setType == e)

  // const result = res.data.filter((item: any) => item.starId.includes(route.query.starId))
  // idolConfigId.value = result[0].id
  // console.log(idolConfigId.value)
  // imageList(result[0].id)
  // // 为1不调用，为2调用
  // if (remindData.value == 2) {
  //   phoneList(result[0].id)
  // }
};
mylist(1);
// 渲染场景
const getIdolByIdolId = async (item: string) => {
  data.timeData.starId = item;
   if (item && item.startsWith('HY')) {
    console.log('检测到 HY 开头的明星ID:', item);
    selectedSceneType.value = 'customize';
    // customizeStatus.value = '1'; //只有自定义场景
    //  getDiyScene(item,'2')
    //  return
 
  }
  console.log("查询明星配置列表渲染", item);
  const res = await HRequest.getIdolByIdolId(item);
  // const res = await HRequest.getIdolByIdolId(route.query.starId)
  console.log("明星配置列表渲染", res );
  customizeStatus.value = (res.data.isDiy && item.startsWith('HY')) ? '1' : '0';
  if(res.data.isDiy){
    getDiyScene(item,'2')
  }
  Listi.value = res.data;
  // data.timeData.idolConfigId = res.data.idolConfigId
  idolConfigId.value = res.data.idolConfigId; // 查询亲友手机号ID赋值
  data.timeData.idolConfigId = res.data.idolConfigId;
  const { defaultSceneList, friendSceneList } = res.data;
  //0为自己，1为家人
  const arr: object[] = [];
  if (data.timeData.setType == 1) {
    // data.timeData.friendPhones = []
    defaultSceneList?.forEach((e: any) => {
      arr.push(e);
    });
  } else {
    friendSceneList?.forEach((e: any) => {
      arr.push(e);
    });
  }
  data.dataList = arr;
};

// getIdolByIdolId()
const warningShow = (e: boolean) => {
  isShow.value = e;
};

// 接收手机号码逻辑==========================================
const called = ref("");
const addPhoneshow = ref(false);
const idolConfigId = ref("");
const sceneConfigIds = ref(null);
// 渲染手机号
const phoneDatalist: any = ref([]);
const friendPhones: Ref<(string | never[] | null)[]> | any = ref([]);

const handeAddphone2=()=>{
   volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'relatives and friends',object_name:'亲友号码录',object_type:'button' })
  router.push({
    path: '/friendsRecord',
     query: {
          PhoneId: phoneDatalist.value
        }
  });
  console.log(phoneDatalist.value,'已添加的号码')

}
const handeAddphone = () => {
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'addPhone',object_name:'添加手机号码',object_type:'button' })
  let arr = JSON.parse(JSON.stringify(phoneDatalist.value));
  if (arr !== null) {
    if (arr.length == 3) {
      Toast("只能配置3位亲友手机号");
      return;
    }
  }
  addPhoneshow.value = true;
  // 埋点
 
};
// 取消
const handelPhoneqx = () => {
  addPhoneshow.value = false;
  called.value = "";
  customText.value=''
  saveLog.value=false
  // 埋点
 
};
const handelChan=(e:any)=>{
  
  if(!e){
    customText.value = "";
  }
}
// 确定添加手机号，发请求
const handelPhoneqd = async () => {
  Toast.loading({
    duration: 0,
    message: "请稍后",
    forbidClick: true,
  });
  
  if (called.value.length < 11) {
    Toast("请输入11位手机号");
    return;
  }
  if (AesEncrypt(called.value) == localStorage.getItem("phon"))
    return Toast("请输入亲友手机号！");
  const params = {
    phone: AesEncrypt(called.value),
  };
  const res = await HRequest.isMobile(params);
  if (!res.data) {
    Toast("仅支持中国移动手机号！");
    return;
  }
  addPhoneshow.value = false;
  phoneDatalist.value.push(AesEncrypt(called.value)); // 静态添加手机号
  phoneDatalist.value = unique(phoneDatalist.value); // 去重复手机号
  data.timeData.friendPhones = phoneDatalist.value;
  if(saveLog.value){
   const res2= await HRequest.addFriPhone({
      friPhone: AesEncrypt(called.value),
      nickName: customText.value,
    })
    if (res2.code != 200) return Toast(res2.msg);
  }
  called.value = ""; // 添加完后滞空手机号输入框
  customText.value='' 
  saveLog.value=false
  Toast("添加成功！");
};
// 请求返回渲染手机号
const phoneList = async (e: any) => {
  // sceneConfigId   就是route.query.id
  if(sessionStorage.getItem('friendsRecord_phoneDatalist')){
    return 
  }
  const res = await HRequest.getFriphone(route.query.id);
  phoneDatalist.value = res.data.map((i: string) => {
    return AesEncrypt(i);
  });
  data.timeData.friendPhones = unique(phoneDatalist.value); // 添加需要的数组
};

// 删除手机号
const handelDelphone = async (item: string) => {
  phoneDatalist.value = phoneDatalist.value.filter((e: string) => e !== item);
  data.timeData.friendPhones = data.timeData.friendPhones.filter(
    (e: string) => e !== item
  );
};
// 接收手机号码逻辑==========================================

// 选择年

const handelYear = (e: any) => {
  console.log("当前年月日", formatDateTime(minDate.value));
  console.log("选择的年月日", formatDateTime(e));
  if (formatDateTime(minDate.value) !== formatDateTime(e)) {
    hourTime.value = 0;
    minuteTime.value = 0;
    console.log("时间不相同");
    data.timeData.dayTime = ""; //显示的时间滞空
    data.timeData.hours = ""; // 小时滞空
    data.timeData.minutes = ""; //分钟滞空
  } else {
    console.log("时间相同");
    hourTime.value =
      new Date().getMinutes() + 5 >= 60
        ? new Date().getHours() + 1
        : new Date().getHours();
    minuteTime.value =
      new Date().getMinutes() + 5 >= 60
        ? new Date().getMinutes() + 5 - 60
        : new Date().getMinutes() + 5;
    data.timeData.dayTime = ""; //显示的时间滞空
    data.timeData.hours = ""; // 小时滞空
    data.timeData.minutes = ""; //分钟滞空
  }
  currentShow.value = false;
  data.timeData.enableTimeFormat = formatDateTime(e);
};

// -------------------------选择时间---------------
const TimeData = ref();
TimeData.value = callTimeData.value;
console.log(TimeData.value);
// 提醒时间选择
const handelTime = (e: any) => {
  console.log("我是时间", e);
  data.timeData.hours = parseInt(e.split(":")[0]);
  data.timeData.minutes = parseInt(e.split(":")[1]);
  const [hour, minute] = e.split(":");
  console.log("选择小时", parseInt(hour), "当前小时", new Date().getHours());
  // 除选择时间外还需判断选择日期
  if (
    parseInt(hour) !== new Date().getHours() ||
    formatDateTime(minDate.value) !==
      formatDateTime(new Date(data.timeData.enableTimeFormat))
  ) {
    minuteTime.value = 0;
  } else {
    // 选择时间==当前时间就按照原本的+5分钟
    if (
      data.timeData.repeatType == 0 &&
      parseInt(hour) == new Date().getHours()
    ) {
      minuteTime.value =
        new Date().getMinutes() + 5 >= 60
          ? new Date().getMinutes() + 5 - 60
          : new Date().getMinutes() + 5;
    } else {
      minuteTime.value = 0;
    }
  }

  data.timeData.hours = parseInt(hour);
  data.timeData.minutes = parseInt(minute);
  data.timeData.dayTime = hour + ":" + minute;
  console.log("测试测试选择时间",data.timeData.setType,data.timeData.hours , TimeData.value.endHour);
  // 为亲友限制
  if (data.timeData.setType != 1) {
    console.log(TimeData.value);

    // 条件1（最小小时为8：30.startHour=8，startMin写死最小==30）
    if (
      data.timeData.hours == TimeData.value.startHour &&
      TimeData.value.id !== "全天"
    ) {
      console.log("最小时间", TimeData.value.startHour);
      minuteTime.value = TimeData.value.startMin;
      maxminuteTime.value = 59;
      //   条件2（选择到最大时间，归0，否则可选范围0-59）
    } else if (data.timeData.hours == TimeData.value.endHour) {
      console.log(
        "最大时间1",
        TimeData.value.endHour,
        "最大分钟",
        TimeData.value.endMin
      );
      minuteTime.value = 0;
      maxminuteTime.value = TimeData.value.endMin;
    } else {
      console.log("其他情况");
      minuteTime.value = 0;
      maxminuteTime.value = 59;
      // 如果是55分钟得parseInt(hour)+1 23点直接==0
      const time =
        new Date().getMinutes() + 5 >= 60
          ? new Date().getHours() + 1
          : new Date().getHours();
      console.log(time);
      // 如果选择不重复并且当前时间==当前小时就按照原本的+5分钟
      if (
        data.timeData.repeatType == 0 &&
        data.timeData.hours == new Date().getHours()
      ) {
        console.log(data.timeData.hours, new Date().getHours());
        console.log(
          "其他情况--为亲友为不重复",
          new Date().getMinutes() + 5 >= 60
            ? new Date().getMinutes() + 5 - 60
            : new Date().getMinutes() + 5
        );
        minuteTime.value =
          new Date().getMinutes() + 5 >= 60
            ? new Date().getMinutes() + 5 - 60
            : new Date().getMinutes() + 5;
        return;
      } else {
        console.log(
          "其他情况--不为不重复",
          data.timeData.repeatType,
          parseInt(hour),
          parseInt(hour) == new Date().getHours()
        );

        minuteTime.value = 0;
        maxminuteTime.value = 59;
      }
    }
    // maxminTime()
  }
};
// 点击时间关闭赋值
const handelTimeaout = (e: any) => {
  currentimeShow.value = false;
  handelTime(e);
};
// -------------------------选择时间---------------
// 格式化时间
const formatter = (type: string, val: number) => {
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${val}月`;
  }
  if (type === "day") {
    return `${val}日`;
  }
  if (type === "hour") {
    return `${val}时`;
  }
  if (type === "minute") {
    return `${val}分`;
  }
  return val;
};
// 事务提醒场景状态
const typeShow = ref(1);
const handelAffair = (item: any) => {
  console.log(Listi.value);
  console.log("事务提醒", JSON.parse(JSON.stringify(item)));
  typeShow.value = item.type;
  id.value = item.url;
  data.timeData.scenceName = item.idoName;
  data.timeData.scenceUrl = item.url;
  data.timeData.fid = item.fid;
  data.timeData.sceneId = item.sceneId;
};
// 点击播放视频||音频
const videostop = ref(""); // 按钮状态
const videoData = ref(""); //视频路径
const clickSound: any = ref(null); //音频播放ref
const audio = ref(""); //
const handelVideoStop = (item: any) => {
  videostop.value = "";
  clickSound.value.pause();
  console.log("暂停播放", item);
};
const viodeShow = ref(false);
const handelVideoPlay = async (item: any) => {
    // 埋点
volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'playVideo',object_name:'播放'+item.sceneName,object_type:'button' })
Toast.loading({
    duration: 0,
    message: "请稍后",
    forbidClick: true,
  });
  videostop.value = AESDecrypt(item.sceneUrl);
  if (AESDecrypt(item.sceneUrl).indexOf("mp4") != -1) {
      //直接播放视频
      Toast.clear();
      clickSound.value.pause(); // 暂停音频
      videoShow.value = true; // 打开视频组件
      videoData.value = AESDecrypt(item.sceneUrl);
    // const res = await HRequest.play(item.sceneUrl, 2);
    // if (res) {
    //   Toast.clear();
    //   clickSound.value.pause(); // 暂停音频
    //   videoShow.value = true; // 打开视频组件
    //   const blob = res;
    //   videoData.value = window.URL.createObjectURL(blob);
    // }


 
  } else {
    Toast.clear();
    // audio.value = urlForm(item.sceneUrl);
    audio.value = AESDecrypt(item.sceneUrl);
    console.log("播放音频", audio.value);
    // getVidDur()
    clickSound.value.play();
  }
};

const onVideoEnde = () => {
  console.log("播放结束");
  viodeShow.value = false;
  videostop.value = "";
};
// 视频组件关闭弹窗回调
const PlayShow = (e: any) => {
  videostop.value = "";
  videoShow.value = e;
  videoData.value = ""; // 关闭后清除路径
};

const phonisShow = (e: any) => {
  if (e.phon === "关闭") {
    console.log("关闭");
    phonShow.value = e.isShow;
  } else {
    phonShow.value = e.isShow;
  }
};
// 保存
// const token = ref('')
// called: 'string', //手机号
// enableTime: '2022-11-25', //生效时间 ok
// hours: '12:00', //小时
// id: 'string',
// inTime: '2022-11-25',
// minutes: 0, //分钟
// repeat: 0, //重复或者不重复 选中蛋糕哪里的type
// sceneId: 'string', // 场景ID  选中蛋糕哪里的ID
// videoId: 'string', //形象ID
// week: [0] //周一周日的数组
// 处理星期
const weekData = (arrData: number[]) => {
  const arr = arrData.sort((a: number, b: number) => a - b);
  const weekDays = [
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
    "周日",
    "不重复",
  ];
  return arr.map((num) => weekDays[num - 1]).filter(Boolean).length == 7
    ? "每天"
    : arr.map((num) => weekDays[num - 1]).filter(Boolean);
};
const callAdd = async () => { 
  console.log("一键来电点击保存");
    // Toast.clear();
  console.log("添加场景数据", JSON.parse(JSON.stringify(data.timeData)));

    const params = {
      starId: data.timeData.starId,
      sceneId:data.timeData.sceneId,
      repeatType:0,
      setType:data.timeData.setType,
      friendPhones:data.timeData.friendPhones,
      isDiyScene:data.timeData.isDiyScene,
    }
     const res = await HRequest.oneClickSet(params);
     console.log(res,'一键来电')
  if (res.code == 200) {
    Toast({
      message: '设置成功,请注意接听',
      icon: successIcon,
    });
    router.push("/"); // 直接返回首页
  } else if (res.code == 401) {
    Toast.clear();
    nouserToast.value = true;
    noUsertxt.value = {
      title: "每日外呼次数已达上限",
      txt1: res.msg,
      butonTxt: "我知道了",
      button: 1,
    };
  } else if (res.code == 402) {
    nouserToast.value = true;
    noUsertxt.value = {
      title: "本月外呼次数已达上限",
      txt1: res.msg,
      butonTxt: "我知道了",
      button: 1,
    };
    Toast.clear();
  } else {
    nouserToast.value = true;
    noUsertxt.value = {
      title: "温馨提示",
      txt1: res.msg,
      butonTxt: "我知道了",
      button: 1,
    };
    Toast.clear();
  }

};
const Add = async () => {
  if (data.timeData.repeatType == 0) {
    const [year, month, day] = data.timeData.enableTimeFormat.split("-");
    data.timeData.year = Number(year);
    data.timeData.month = Number(month);
    data.timeData.day = Number(day);
    data.timeData.enableTime =
      data.timeData.enableTimeFormat + " " + data.timeData.dayTime + ":00";
  }
  data.timeData.week =
    data.timeData.week.length === 0 ? "" : data.timeData.week.join();
  console.log("添加场景数据", JSON.parse(JSON.stringify(data.timeData)));
  const res = await HRequest.setScene(JSON.stringify(data.timeData));
  Toast.clear();
  if (res.code == 200) {
    Toast("场景保存成功！");
    // router.back();
     router.push("/"); // 直接返回首页
  } else if (res.code == 401) {
    Toast.clear();
    nouserToast.value = true;
    noUsertxt.value = {
      title: "每日外呼次数已达上限",
      txt1: res.msg,
      butonTxt: "我知道了",
      button: 1,
    };
    // warnShow.value = true
    // warnTxT.value = {
    //   title: '每日外呼次数已达上限',
    //   txt: res.msg,
    //   button: '我知道了'
    // }
  } else if (res.code == 402) {
    nouserToast.value = true;
    noUsertxt.value = {
      title: "本月外呼次数已达上限",
      txt1: res.msg,
      butonTxt: "我知道了",
      button: 1,
    };
    Toast.clear();
    // warnShow.value = true
    // warnTxT.value = {
    //   title: '本月外呼次数已达上限',
    //   txt: res.msg,
    //   button: '我知道了'
    // }
  } else {
    nouserToast.value = true;
    noUsertxt.value = {
      title: "温馨提示",
      txt1: res.msg,
      butonTxt: "我知道了",
      button: 1,
    };
    Toast.clear();
  }
};
const Edit = async () => {
  try {
    if (data.timeData.repeatType == 0) {
      const [year, month, day] = data.timeData.enableTimeFormat.split("-");
      data.timeData.year = Number(year);
      data.timeData.month = Number(month);
      data.timeData.day = Number(day);
      data.timeData.enableTime =
        data.timeData.enableTimeFormat + " " + data.timeData.dayTime + ":00";
    }
    data.timeData.week =
      data.timeData.week.length === 0 ? "" : data.timeData.week.join();
    console.log("编辑的数据", data.timeData);
    const res = await HRequest.updateScene(data.timeData);
    Toast.clear();
    if (res.code == 200) {
      Toast("编辑成功");
      router.back();
    } else if (res.code == 401) {
      Toast.clear();
      nouserToast.value = true;
      noUsertxt.value = {
        title: "每日外呼次数已达上限",
        txt1: res.msg,
        butonTxt: "我知道了",
        button: 1,
      };
      // warnShow.value = true
      // warnTxT.value = {
      //   title: '每日外呼次数已达上限',
      //   txt: res.msg,
      //   button: '我知道了'
      // }
    } else if (res.code == 402) {
      // warnShow.value = true
      // warnTxT.value = {
      //   title: '本月外呼次数已达上限',
      //   txt: res.msg,
      //   button: '我知道了'
      // }
      Toast.clear();
      nouserToast.value = true;
      noUsertxt.value = {
        title: "本月外呼次数已达上限",
        txt1: res.msg,
        butonTxt: "我知道了",
        button: 1,
      };
    } else {
      nouserToast.value = true;
      noUsertxt.value = {
        title: "温馨提示",
        txt1: res.msg,
        butonTxt: "我知道了",
        button: 1,
      };
      Toast.clear();
    }
    console.log(1);

    Toast.clear();
  } catch (err: any) {
    console.log("编辑失败", err);
    Toast.clear();
  }
};
// 关闭温馨提示取消
const handelToast = async (e: boolean) => {
  if (!e) return (toastShow.value = false);
  Toast.loading({
    duration: 0,
    message: "请稍后",
    forbidClick: true,
  });
  // 二次确认  去办理
  if ("Edit" in route.query) {
    Edit();
  } else {
    callStatus.value?callAdd():Add()
  }
  toastShow.value = false;
};
const handelOne=async()=>{
    // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'One Click Call',object_name:'一键来电',object_type:'button' })
  if (data.timeData.friendPhones.length == 0 && data.timeData.setType == 2) {
    Toast("请填写亲友手机号！");
    return;
  }
  if (!data.timeData.sceneId) {
    Toast("请选择提醒场景！");
    return;
  }
 /**
   *二次确认
   */
    toastTxTOK();
    callStatus.value = true;  //来电状态
    
}
const handelOK = async () => {
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'Save Settings',object_name:'保存设置',object_type:'button' })
  console.log("新增的数据:", JSON.parse(JSON.stringify(data.timeData)));
  // if (data.timeData.setType == 2 && data.timeData.friendPhones.length == 0) {
  //   Toast('请添加亲友手机号!')
  //   return
  // }
  // if (data.timeData.scenceUrl == '') {
  //   Toast('请选择事务提醒！')
  //   return
  // }
  if (data.timeData.friendPhones.length == 0 && data.timeData.setType == 2) {
    Toast("请填写亲友手机号！");
    return;
  }
  if (!data.timeData.sceneId) {
    Toast("请选择提醒场景！");
    return;
  }
  if (data.timeData.repeatType === 0 && data.timeData.enableTimeFormat == "") {
    Toast("请选择生效日期！");
    return;
  }
  // 每年
  if (
    data.timeData.repeatType == 5 &&
    data.timeData.month == "" &&
    data.timeData.day == ""
  ) {
    Toast("请选择日期！");
    return;
  }
  // 每月
  if (data.timeData.repeatType == 4 && data.timeData.day == "") {
    Toast("请选择日期！");
    return;
  }
  // 每周
  if (data.timeData.repeatType == 3 && data.timeData.week.length == 0) {
    Toast("请选择日期！");
    return;
  }
  if (data.timeData.dayTime == "") {
    Toast("请选择提醒时间！");
    return;
  }
  toastTxTOK();
  /**
   *二次确认
   */
    toastTxTOK();
    callStatus.value = false;  //来电状态
  // nouserToast.value = true
  // noUsertxt.value = {
  //   title: '温馨提示',
  //   txt1:
  //     data.timeData.setType != 1
  //       ? '明星来电将在预定的时间向亲友号码发起电话提醒。请确保您的亲友同意接收视频电话提醒，避免对他人造成骚扰。若我们接到用户投诉，我们将有权关闭设置方的使用权限，请您知悉风险。'
  //       : `确定要保存此场景吗？`,
  //   // txtcolor: '【时代少年团马嘉祺】',
  //   txt3: data.timeData.setType != 1 ? '若您点击“确认保存”按钮，表示您已知道相关风险。' : '',
  //   // color: '#3882FF',
  //   button: 2,
  //   br: true,
  //   onebtntxt: data.timeData.setType != 1 ? '确认保存' : '保存'
  // }
  // Dialog.confirm({
  //   title: '明星提示您',
  //   messageAlign: data.timeData.setType != 1 ? 'left' : 'center',
  //   confirmButtonText: data.timeData.setType != 1 ? '确认保存' : '保存',
  //   message:
  // data.timeData.setType != 1
  //   ? '明星来电将在预定的时间向亲友号码发起电话提醒。请确保您的亲友同意接收视频电话提醒，避免对他人造成骚扰。若我们接到用户投诉，我们将有权关闭设置方的使用权限，请您知悉风险。\n若您点击“确认保存”按钮，表示您已知道相关风险。'
  //   : `确定要保存此场景吗？`
  // })
  //   .then(async () => {
  //     if ('Edit' in route.query) {
  //       Edit()
  //     } else {
  //       Add()
  //     }
  //   })
  //   .catch(() => {
  //     console.log('取消')
  //   })
};
const toastTxTOK=()=> {
  toastShow.value = true;
  toastTxT.value = {
    title: data.timeData.setType != 1 ? "温馨提示" : "明星提示您",
    txt1:
      data.timeData.setType != 1
        ? `明星来电将在预定的时间向亲友号码发起电话提醒。请确保您的亲友同意接收视频电话提醒，避免对他人造成骚扰。若我们接到用户投诉，我们将有权关闭设置方的使用权限，请您知悉风险。`
        : `确定要保存此场景吗？`,
    br: true,
    txtcolor: "",
    txt3:
      data.timeData.setType != 1
        ? '<div style="color: #636975; margin-top: 10px;">若您点击“<span style="color: #23262b">确认保存</span>”按钮，表示您已知道相关风险。</div>'
        : "",
    txt3Html: true,
    cusClass: "handle-ok-btn",
    color: "#23262B",
    button: 2,
    onebtntxt: data.timeData.setType != 1 ? "确认保存" : "保存",
  };
};
const okForm = () => {
  console.log("确认保存！执行方法");
  if ("Edit" in route.query) {
    Edit();
  } else {
    callStatus.value?callAdd():Add()
  }
};
const getEdit =()=> {
  console.log("路由数据", route.query);
  console.log("sceneConfigId仅限于查询手机号使用:", route.query.id);
  // const { scenceUrl } = data.timeData
  // currentTime.value = '' // 初始化分钟
  data.timeData.setType = route.query.setType;
  //数据部分
  phoneList(route.query.idolConfigId); // 手机号回显
  console.log("编辑使用的idolConfigId", route.query.idolConfigId);

  starId.value = route.query.starId; // 头像选中状态回显
  getIdolByIdolId(route.query.starId); //事务提醒场景数据回显渲染 传idolId      AD175
  // 直接解构后端未做过滤，前端单个赋值
  data.timeData.id = route.query.id;
  data.timeData.enableTimeFormat = route.query.year
    ? `${route.query.year}-${route.query.month}-${route.query.day}`
    : "";
  data.timeData.repeatType = Number(route.query.repeatType);
  data.timeData.dayTime = route.query.dayTime;
  data.timeData.hours = Number(route.query.hours);
  data.timeData.minutes = Number(route.query.minutes);
  data.timeData.repeat = route.query.repeat;
  data.timeData.scenceName = route.query.scenceName;
  data.timeData.scenceUrl = route.query.scenceUrl;
  data.timeData.idolConfigId = route.query.id;
  data.timeData.fid = route.query.fid;
  data.timeData.sceneId = route.query.sceneId;
  data.timeData.month = Number(route.query.month);
  data.timeData.day = Number(route.query.day);
  data.timeData.year = Number(route.query.year);
  // 获取每周数据
  const weekArray = route.query.week.split(",");
  data.textLists = weekData(weekArray.map(Number));
  data.timeData.isDiyScene = route.query.isDiyScene;
  if(data.timeData.isDiyScene == 1){
    selectedSceneType.value='customize'

  }
  // 编辑 为亲友限制
  if (data.timeData.repeat == 1) {
    maxminTime();
  }
  // MonthlyData 重复模式回显
  const monthDay =
    route.query.month && route.query.day
      ? route.query.month + "-" + route.query.day
      : "";
  if (
    data.timeData.repeatType == 3 &&
    route.query.week.length !== 0 &&
    route.query.week[0] !== "8"
  ) {
    MonthlyData.value = { name: "每周", repeatType: 3, subname: "" };
  } else if (
    data.timeData.repeatType == 4 &&
    route.query.month !== "" &&
    route.query.month !== null
  ) {
    MonthlyData.value = { name: "每月", repeatType: 4, subname: "" };
  } else if (data.timeData.repeatType == 5 && monthDay) {
    MonthlyData.value = { name: "每年", repeatType: 5, subname: "" };
  } else if (data.timeData.repeatType == 2) {
    MonthlyData.value = { name: "每天", repeatType: 2, subname: "" };
  } else if (data.timeData.repeatType == 1) {
    MonthlyData.value = { name: "工作日", repeatType: 1, subname: "" };
  } else if (
    data.timeData.repeatType == 0 ||
    route.query.week.length == 0 ||
    route.query.week[0] == 8
  ) {
    MonthlyData.value = {
      name: "不重复",
      repeatType: 0,
      repeat: "2",
      subname: "",
    };
    // handelCF(MonthlyData.value)
  }
  // handelCF(MonthlyData.value)
  // 渲染月份
  annually.value = formatJanuaryFirst(monthDay || "1-1"); // 1-1回显
  monthly.value = route.query.day ? route.query.day + "日" : "";
  // data.timeData = { ...route.query }

  // 回显部分
  // 排序
  const arr: any = [];
  route.query.week &&
    route.query.week.split(",").map((e: string) => {
      arr.push(parseInt(e));
    });
  const arrdata = arr.sort((a: number, b: number) => a - b);
  data.timeData.week = arrdata;
  data.timeData.sceneId = route.query.sceneId;
  id.value = route.query.sceneId; //场景提醒回显
  // 提醒时间回显
  data.repeatTime = route.query.dayTime;
  currentTime.value = route.query.dayTime;
  console.log("------", data.timeData);
  // 若当前选择时间不是当天，则不限制不重复模式选择逻辑
  if (
    data.timeData.repeatType == 0 &&
    formatDateTime(minDate.value) !== data.timeData.enableTimeFormat
  ) {
    hourTime.value = 0;
    minuteTime.value = 0;
  }
} 
// else {
//   console.log("新增");
// }
const addTime = (e: any) => {
  console.log(e, 111);
  data.textLists = weekData(data.timeData.week);
};
data.textLists = weekData(data.timeData.week);
/**
 *
 */
const handelcheckOk = () => {
  console.log("二次确认");

  data.textLists = weekData(data.timeData.week);
  console.log(data.timeData.week);
  remindShow.value = false;
};
const handelno = () => {
  remindShow.value = false;
  data.timeData.week = [];
  data.textLists = "";
};
const handeloverlay = () => {
  // data.timeData.week = []
  // data.textLists = ''
};
//  时间处理 1-9处理为00-09,

// 添加获取状态类名的方法
const getStatusClass = (state: string) => {
  switch (state) {
    case '审核中':
    case '合成中':  // 新增
      return 'status-review';
    case '审核通过':
      return 'status-approved';
    case '审核失败':
    case '合成失败':  // 新增
      return 'status-rejected';
    default:
      return '';
  }
};
const editScene= async() => {
  showSceneName.value = true;
  showBottom.value = false;
};
const openSceneItem= (item:any) => {
  showBottom.value = true;
  calledName.value = item.sceneName;
  customizeId.value=item.id
  customizeStarId.value=item.starId
 
};
const handelNameqx= () => {
  showSceneName.value = false;
 
};
const handelNameqd= async() => {
  showSceneName.value = false;
    console.log("编辑场景1",calledName.value);
  const params = {
      sceneId :customizeId.value,
      name: calledName.value,

    }
  const res = await HRequest.renameDiyScene(params);
  if(res.code==200){
      Toast({
      message: '场景保存成功',
      icon: successIcon,
    });
    getDiyScene(customizeStarId.value,'2')
    calledName.value = '';
  }else{
    Toast(res.msg);
  }
  console.log(res,'是否修改成功')
  

};
const delScene= async() => {
  delSceneName.value = true;
  showBottom.value = false;
};
const delNameqx= () => {
  delSceneName.value = false;
 
};
const delNameqd= async() => {
  delSceneName.value = false;
  const params = {
      id:customizeId.value
    }
  const res = await HRequest.deleteDiyScene(params);
    if(res.code==200){
      Toast({
      message: '场景已删除',
      icon: successIcon,
    });
    getDiyScene(customizeStarId.value,'3')
    }else{
      Toast(res.msg);
    }
 
};
const addCustomize=()=>{
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'addCustomize',object_name:'添加自定义场景',object_type:'button' })
  if(route.query.id){
    Toast("编辑设置场景暂不支持新增")
    return

  }
  if(sceneList.listData.length >= 4) {
    Toast("自定义场景最多可设置4个，请删除已有场景后再操作")
    return
  }
   console.log("添加自定义场景1");
    router.push({
    path: "/customize",
    // query: {
    //   type: 1, // 1表示添加自定义场景
    //   // helpShow: 1 // 确保这一行语法正确
    // }
  });
  
 
}
const clickCustomize = (item: any, id: string) => {
  console.log("点击自定义场景", item, id);
  // 检查场景状态
  if (item.process !== '审核通过') {
    Toast('该视频暂不支持设置');
    return;
  }
  
  // 只有审核通过的场景才能被选中
  // 这里根据模板中的判断条件 data.timeData.sceneId == item.id 来设置选中状态
  if (data.timeData.sceneId=== id) {
    data.timeData.sceneId = ""; // 取消选中
    data.timeData.isDiyScene=''
  } else {
    data.timeData.sceneId = id; // 选中该场景
    data.timeData.isDiyScene=item.isDiyScene
  }
  
};
const goBack=() => { 
  if(route.query.type){
    router.push({
      path: "/sceneDiscipline",
    });
  }else{
    router.push({
      path: "/",
    });
  }
  console.log(route.query.type,'返回')
};

const getDiyScene=async(item:string,num:string) => { 
  console.log("获取自定义场景列表", item,sceneList.listData);
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'refresh',object_name:'刷新状态',object_type:'button' })
   const params = {
          starId:item
   }
  const res = await HRequest.getDiyScene(params);
  if(res.code==200){
    sceneList.listData = res.data;
    console.log("获取自定义场景列表成功", res.data);
    if(num=='1'){
      Toast({
      message: '场景状态已更新',
      icon: successIcon,
    });

    }
  
  }else{
     Toast(res.msg);
  }
  
};
const changeCallName=(event: Event)=>{
  const text = (event.target as HTMLTextAreaElement).value;
  calledName.value=text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g,'')
}
const changeCallName1=(event: Event)=>{
  const text = (event.target as HTMLTextAreaElement).value;
  customText.value=text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g,'')
}
// 基础场景
const selectFoundationScene = () => {
  selectedSceneType.value = 'foundation';
  // 埋点
   volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'foundation',object_name:'基础场景',object_type:'button' })
};
// 自定义场景
const selectCustomizeScene = () => {
  selectedSceneType.value = 'customize';
  // 埋点
     volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: 'customize',object_name:'自定义场景',object_type:'button' })
};
// 管理场景
const toggleExitMode = () => {
  toExit.value = !toExit.value;
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld",  page_name: '设置场景页',page_code:"Set Scene Page", page_url: window.location.href, click_object: !toExit.value ? 'Management scenario' : 'Exit the scene',object_name:!toExit.value ? '管理场景' : '退出管理',object_type:'button' })
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.flex {
  display: flex;
  justify-content: space-around;

  align-items: center;
}
.box {
  width: 100%;
  word-wrap: break-word;
  background: linear-gradient(180deg, #d6e1ff 0%, #dee7ff 100%);
  background-size: cover;
  .head {
    height: 466px;
    width: 100%;
    position: relative;
    overflow: hidden;
    z-index: -1;
    img {
      width: 100%;
    }
    &-1 {
      width: 450px;
      height: 320px;
      // background-color: #256fff;
      position: absolute;
      top: 50px;
      right: 5px;
      &-1 {
        width: 440px;
        height: 244px;
        background: url("@/assets/img/Exclusivevideo/Union.png");
        background-size: cover;
        span {
          font-size: 28px;
          line-height: 36px;
          color: #666;
          display: inline-block;
          margin: 14px 14px 14px 25px;
        }
      }
    }
  }
  .star-container {
    height: 500px;
    background: url("@/assets/otherImg/my_star_bg.png") no-repeat top left;
    background-size: 100% auto;
    &.one-star {
      height: 292px;
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
    }
    .content-sw {
      display: flex;
      justify-content: space-between;
      padding: 25px;
      align-items: center;
      .wodemx {
        &::before {
          content: "";
          display: inline-block;
          vertical-align: middle;
          width: 33px;
          height: 33px;
          background: url("@/assets/otherImg/back_icon.png") no-repeat center;
          background-size: cover;
          transform: rotate(180deg);
        }
        img {
          width: 167px;
          height: auto;
          display: inline-block;
          vertical-align: middle;
          margin-left: 8 px;
        }
      }
      .idollength {
        padding: 8px 13px;
        border-radius: 31px;
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.5);
        color: #fff;
        font-size: 25px;
      }
    }
    .content-flex {
      .box-s {
        padding: 0 33px 33px;
        display: flex;
        overflow-x: auto;
        .box-s-1 {
          margin-left: 29px;
          &:first-child {
            margin-left: 0;
          }
          .img,
          .img-1 {
            width: 208px;
            height: 208px;
            border-radius: 17px;
            overflow: hidden;
            border: 2px solid transparent;
            position: relative;
            img {
              width: 100%;
            }
            &.img-1 {
              border-color: #fff;
              &::before {
                content: "";
                display: block;
                width: 48px;
                height: 33px;
                background: url("@/assets/otherImg/check_icon.png") no-repeat
                  center;
                background-size: cover;
                position: absolute;
                top: 2px;
                right: 2px;
              }
            }
          }
          .box-s-1-bottom {
            font-size: 29px;
            color: #fff;
            line-height: 46px;
            text-align: center;
            margin-top: 17px;
            .name {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 208px;
            }
          }
        }
      }
    }
    > img {
      width: 100%;
      height: 100%;
      z-index: 0;
      position: relative;
    }
  }
  .contentBox {
    width: 100%;
    background: linear-gradient(180deg, #d6e1ff 0%, #dee7ff 100%);
    padding: 44px 21px;
    margin-top: -92px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    &.one-star {
      margin-top: 0;
    }
    .content {
      .idol {
        height: 230px;
        display: flex;
        border-radius: 16px;
        flex-wrap: wrap;
        margin: 0 auto;
        overflow-x: auto;
        width: 680px;
        .kon-s {
          // margin: -80px 0 0 140px;
          margin: -80px auto 0px auto;
        }
      }
      .flexd {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .content-sw {
        min-height: 272px;
        width: 100%;
        font-size: 36px;
        border-radius: 17px;
        background: #fff url("@/assets/otherImg/phone_header.png") no-repeat top;
        background-size: auto 92px;
        padding-top: 92px;
        position: relative;
        margin-bottom: 25px;
        // 当有手机号数据时，增加底部内边距，为 addphone1 留出空间
          &.has-phone-data {
            padding-bottom: 24px;
          }
        .addphone2 {
          width: 208px;
          height: 58px;
          color: #0e4dff;
          font-size: 29px;
          line-height: 58px;
          // border-radius: 42px;
          text-align: center;
          // border: 2px solid #0e4dff;
          position: absolute;
          right: 21px;
          top: 17px;
          display: flex;
          img{
            width: 32px;
            height: 32px;
            margin: 16px 0 0 8px;
          }
        }
        .addphone1{
          width: 632px;
          margin:40px auto ;
          height: 80px;
          line-height: 80px;
          background: rgba(14,77,255,0.1);
          border-radius: 43px 43px 43px 43px;
          text-align: center;
          font-size: 30px;
          color: #0E4DFF;
          display: flex;
          img{
            width: 32px;
            height: 32px;
            margin: 20px 10px 0 190px;
          }
        }
        .content-flex {
          padding: 17px 21px 25px;
          min-height: 158px;
          width: 100%;
          .kon {
            font-size: 29px;
            color: #636975;
            line-height: 117px;
            border-radius: 17px;
            background: #eff2f6;
            text-align: center;
          }
          .tag {
            padding: 25px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            background-color: #eff2f6;
            justify-content: space-between;
            &-one {
              width: calc((100% - 17px) / 2);
              height: 67px;
              color: #636975;
              border-radius: 42px;
              display: flex;
              background: #fff;
              justify-content: space-around;
              align-items: center;
              padding: 10px 17px 10px 25px;
              font-size: 29px;
              .img {
                width: 33px;
                height: 33px;
                img {
                  width: 100%;
                }
              }
              &:nth-child(3) {
                margin-top: 25px;
              }
            }
          }
        }
        .wodemx {
          display: flex;
          justify-content: space-between;
          margin-left: 10px;
          img {
            width: 218.78px;
            height: 72.1px;
          }

          .idollength {
            font-size: 24px;
            color: #fe6480;
            // margin-right: 197px;
            line-height: 72px;
            display: block;
            margin-left: -20px;
          }
        }
      }
      .content-cj {
        width: 216px;
        height: 152px;
        background-color: #fff;
        border-radius: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 16px 16px 0;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
      .content-cj-ok {
        width: 216px;
        height: 152px;
        background: url("@/assets/img/img/butbj.png");
        background-size: cover;
        border-radius: 24px;
        display: flex;
        justify-content: center;
        color: #fff !important;
        align-items: center;
        margin: 0 16px 16px 0;

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
      &-box {
        width: 168px;
      }
      &-img {
        display: flex;
        justify-content: space-between;
        img {
          width: 40px;
          height: 40px;
        }
        .imgs {
          width: 48px;
          height: 48px;
        }
        // .imgs-zz {
        //   width: 48px;
        //   height: 48px;
        //   // background-color: #000;
        //   position: absolute;
        // }
      }
      &-text {
        color: #000;
        margin-top: 28px;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &-text-ok {
        color: #fff;
        margin-top: 28px;
      }
      .duration-time {
        height: 423px;
        border-radius: 17px;
        background: #fff url("@/assets/otherImg/duration_time_header.png")
          no-repeat top left;
        background-size: auto 92px;
        padding: 82px 33px 0;
        margin-top: 25px;
        .cellBox {
          width: 100%;
          .cellBox-on {
            border-bottom: 1px solid #e7eaf0;
            &:last-child {
              border-bottom: 0;
            }
          }
        }
      }
      .box-s::-webkit-scrollbar {
        display: none;
      }
      .box-s {
        display: flex;
        overflow-x: auto;
        width: 800px !important;
        &-1 {
          width: 188px;
          height: 188px;

          margin-right: 18px;
          position: relative;
          /*很重要，禁止子元素的收缩*/
          flex-shrink: 0;
          // overflow: hidden;
          .img {
            width: 182px;
            height: 182px;
            overflow: hidden;
            border-radius: 16px;
          }
          .img-1 {
            width: 182px;
            height: 182px;
            overflow: hidden;
            border-radius: 16px;
            // background-color: #333;
            border: 4px solid #536fff;
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
.delwarn {
  width: 450px;
  text-align: center;
  font-size: 24px;
  color: #636975;
  margin:16px auto;
  display:flex ;
  img{
    width: 32px;
    height: 32px;
    margin-top:2px;
    margin-right: 8px;
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
.picker {
  font-size: 32px;
  color: #222;
  font-weight: 500;

  img {
    width: 48px;
    height: 48px;
  }
}
.fs-18 {
  font-weight: 500;
  color: #000;
}

.remind-btn {
  width: 156px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  background: url("@/assets/img/remindScene/syj.png") no-repeat;
  background-size: contain;
  border-radius: 8px;
  margin-bottom: 16px;
}
.remind-btns {
  width: 156px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  // border: 1px solid #448ff5;
  background: url("@/assets/img/remindScene/syb.png") no-repeat;
  background-size: contain;
  border-radius: 8px;
  margin-bottom: 16px;
}
.flex-box {
  padding: 0 30px 0 30px;
}
.warning-message{
  margin-top: 40px;
  font-weight: 400;
  font-size: 24px;
  color: #636975;
   img{
      width: 32px;
      height: 32px;
      vertical-align: middle; /* 垂直居中对齐 */
      margin-top: -5px;       /* 微调位置 */
      margin-right: 5px;
    }
}
.boxs {
  display: flex;
  justify-content: space-between;
  &-1 {
    width: 320px;
    height: 83px;
    margin-top: 33px;
    // background-color: #256fff;
    background: linear-gradient( 90deg, #BED6FF 0%, #B9D7FF 100%);
    border-radius: 90px;
    line-height: 83px;
    text-align: center;
    color: #00278D;
    font-size: 33px;
    img{
      width: 40px;
      height: 40px;
      vertical-align: middle; /* 垂直居中对齐 */
      margin-top: -5px;       /* 微调位置 */
    }
  }
  &-2 {
    
    height: 83px;
    margin-top: 33px;
    // background-color: #256fff;
    background: linear-gradient(90deg, #00a2ff, #7c48ff);
    border-radius: 90px;
    line-height: 83px;
    text-align: center;
    color: #fff;
    font-size: 33px;
  }
   &-3{
    width: 100%;
   }
   &-4{
     width: 320px;
   }
}
.checkboxBox {
  margin-left: 90px;
  .checkbox {
    width: 100%;
    height: 90px;
    .check {
      width: 560px;
      border-bottom: 1px #dbdbdb solid;
      height: 60px;
      font-size: 36px;
      display: flex;
      justify-content: space-between;
      &:nth-child(6n) {
        border-bottom: 0px #dbdbdb solid !important;
      }

      img {
        width: 40px;
        height: 40px;
      }
    }
    .button {
      width: 150px;
    }
  }
}
.riqi {
  width: 70%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  div {
    width: 240px;
    height: 80px;
    border-radius: 46px;
    border: 1px #ccc solid;
    text-align: center;
    line-height: 80px;
    &:nth-child(2) {
      background: linear-gradient(90deg, #00a2ff 0%, #7c48ff 100%);
      color: #fff;
    }
  }
}

.cf-time {
  // margin: 20px 0 0 40px;
  margin: 30px auto;
  display: flex;
  justify-content: space-around;
  font-size: 36px;
  font-weight: 700;

  span {
    margin-right: 40px;
    font-size: 24px;
    color: #34467f;
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
.bottomtxt {
  height: 292px;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 17px;
  color: #23262b;
  margin-top: 25px;
  font-size: 27px;
  line-height: 42px;
  padding: 21px;
  img {
    width: 100%;
  }
}
::v-deep .van-overlay {
  z-index: 1000;
}
::v-deep .van-calendar__header-subtitle {
  color: #ffffff !important;
}
::v-deep .van-cell__value {
  height: 100%;
  min-width: 65%;
  // background-color: #000;

  line-height: 80px;
}
::v-deep .van-cell__title {
  line-height: 80px;
}
::v-deep .van-icon {
  margin-top: 18px;
}
// ::v-deep .van-popup--bottom.van-popup--round {
//   background: linear-gradient(180deg, #d0f5ff 2%, #ffffff 37%);
// }
.select-img { 
  background-image: url('@/assets/img/img/selectedBtn.png') ;
  color: #0E4DFF;
  background-size: 100%;
 


}
.notSelect-img { 
    background-image:  url("@/assets/img/img/notSelectedBtn.png") ;
    color: #23262B;
    background-size: 100%;
}
  .changeBusiness{
    font-size: 32px;
    color: #23262B;
    text-align: center;
    >div{
      height: 112px;
      line-height: 112px;
    }
    >div:not(:last-child){
      border-bottom: 1px solid #E7EAF0;

    }

  }

.scene-box {
  border-radius: 17px;
  padding: 92px 21px 4px;
  background: #fff url("@/assets/otherImg/scene_box_header.png") no-repeat top;
  background-size: 100% auto;
  .scene-bt{
     display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 30px;
      margin-bottom: 20px;
  }
  .foundation{
    width: 312px;
    height: 86px;
    text-align: center;
    line-height: 86px;
    border-radius: 8px;
    cursor: pointer;
     box-sizing: border-box;
  }
  .cellBox-onData{
    text-align: center;
    margin:60px auto;
    font-size: 28px;
    color: #23262B;
    img{
      width: 128px;
      height:128px
    }
  }
  .customizeList{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

  }
  .customizeState{
     display: flex;
    // justify-content: space-between;
    align-items: center;
    margin: 40px 20px ;
      /* 默认情况下使用 space-between */
    &.review-layout {
      justify-content: space-between;
    }
    
    /* 审核通过状态下使用从右到左布局 */
    &.approved-layout {
      flex-direction: row-reverse;
    }
    .customizeStateName{ 
        position: relative;
        z-index: 5;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        border-radius: 4px;
        text-align: center;
        &.status-review {
          width: 96px;
          color: #F5A623; // 审核中 合成中 - 橙色
          background: #FEF7E9;
          border: 1px solid #F5A623;
        }
      &.status-approved {
          width: 120px;
          color: #67C23A; // 审核通过 - 绿色
          background: #F0F9EC;
          border: 1px solid #67C23A;
      }
  
      &.status-rejected {
        width: 120px;
        color: #FF5252; // 审核失败 合成失败- 红色
        background: #FEE9EA;
        border: 1px solid #F5222D;
      }
    
    }

      img{
      width: 48px;
      height: 48px;
      // position: absolute;
      // bottom: 21px;
      // left: 21px;
    }

  }
  .customizeMoreImg{
    // display: flex;
    // justify-content: end;
    // margin: 40px 20px ;
    position: absolute;
    z-index: 55;
    bottom: 20px;
    right: 20px;
      img{
        width: 56px;
        height:56px

      }

  }
  .customizeName{
    font-size: 30px;
    color: #23262B;
    margin: 16px 20px;
  }
  .Individual{
    width: calc((100% - 17px) / 2);
    height: 167px;
    margin-bottom: 21px;
    position: relative;
    border-radius: 17px;
    overflow: hidden;
    border: 1px solid transparent;
     &-1 {
      background: linear-gradient(316deg, #ffc995 0%, #ffe3c7 100%);
    }
    &-2 {
      background: linear-gradient(137deg, #cff1ff 0%, #afe8ff 100%);
    }
    &-3 {
      background: linear-gradient(138deg, #ffd8ce 0%, #ffbeb5 100%);
    }
    &-4 {
      background: linear-gradient(318deg, #a1ffce 0%, #d7ffe5 100%);
    }
      &::after {
      display: block;
      content: "";
      width: 129px;
      height: 125px;
      position: absolute;
      right: 0;
      bottom: 0;
      background: url("@/assets/otherImg/scene_bg.png") no-repeat center;
      background-size: cover;
    }
      // 审核未通过的场景隐藏装饰图案
  &.disabled-scene::after {
    display: none;
  }
    &.check {
      border: 1px solid #0e4dff;
      .check-icon {
        position: absolute;
        display: block;
        top: 0;
        right: 0;
        width: 42px;
        height: 33px;
        background: #0e4dff;
        // text-align: center;
        // line-height: 25px;
        border-bottom-left-radius: 17px;
        &::after {
          content: "";
          display: inline-block;
          border: 5px solid #fff;
          width: 21px;
          height: 16px;
          border-bottom-left-radius: 5px;
          box-sizing: border-box;
          border-right: transparent;
          border-top: transparent;
          // transform: rotate(-45deg);
            position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
 
  }
  .addCustomize{
    width: 632px;
    margin:40px auto;
    height: 80px;
    line-height: 80px;
    background: rgba(14,77,255,0.1);
    border-radius: 43px 43px 43px 43px;
    text-align: center;
    font-size: 30px;
    color: #0E4DFF;
    display: flex;
    img{
      width: 32px;
      height: 32px;
      margin: 20px 10px 0 190px;
    }
  }
  .manageDiy{
    display: flex;
    justify-content: space-between;

  }
  .scene-setUp{
    display: flex;
    font-size: 28px;
    color: #0E4DFF;
    margin: 20px;
    img{
       width: 32px;
       height: 32px;
      margin-top: 4px;
    }
    .scene-setTitle{
      margin-left: 8px;
    }
  }
  // 添加样式
.scene-item-box-wrapper {
    width: 100%;
  &.scrollable {
    max-height: 540px; /* 6个的大致高度 */
    overflow-y: auto;
    padding-right: 5px;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  }
}
  

  .scene-item-box{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .scene-item {
    width: calc((100% - 17px) / 2);
    height: 167px;
    margin-bottom: 21px;
    position: relative;
    border-radius: 17px;
    overflow: hidden;
    border: 1px solid transparent;
    &-1 {
      background: linear-gradient(316deg, #ffc995 0%, #ffe3c7 100%);
    }
    &-2 {
      background: linear-gradient(137deg, #cff1ff 0%, #afe8ff 100%);
    }
    &-3 {
      background: linear-gradient(138deg, #ffd8ce 0%, #ffbeb5 100%);
    }
    &-4 {
      background: linear-gradient(318deg, #a1ffce 0%, #d7ffe5 100%);
    }
    &-5 {
      background: linear-gradient(317deg, #fde597 0%, #ffecba 100%);
    }
    &-6 {
      background: linear-gradient(316deg, #b8dcff 0%, #d9ecff 100%);
    }
    &-7 {
      background: linear-gradient(133deg, #d7ddff 0%, #c0caff 100%);
    }
    &-8 {
      background: linear-gradient(313deg, #cbff9e 0%, #f3ffc4 100%);
    }
    &::after {
      display: block;
      content: "";
      width: 129px;
      height: 125px;
      position: absolute;
      right: 0;
      bottom: 0;
      background: url("@/assets/otherImg/scene_bg.png") no-repeat center;
      background-size: cover;
    }
    &.check {
      border: 1px solid #0e4dff;
      .check-icon {
        position: absolute;
        display: block;
        top: 0;
        right: 0;
        width: 42px;
        height: 33px;
        background: #0e4dff;
        text-align: center;
        line-height: 25px;
        border-bottom-left-radius: 17px;
        &::after {
          content: "";
          display: inline-block;
          border: 5px solid #fff;
          width: 21px;
          height: 16px;
          border-bottom-left-radius: 5px;
          box-sizing: border-box;
          border-right: transparent;
          border-top: transparent;
          transform: rotate(-45deg);
        }
      }
    }
    .imgs {
      width: 48px;
      height: 48px;
      position: absolute;
      bottom: 21px;
      left: 21px;
    }
    .imgs-zz {
      width: 48px;
      height: 48px;
      // background-color: #000;
      position: absolute;
    }
    div {
      position: absolute;
      z-index: 2;
      font-size: 31px;
      line-height: 46px;
      top: 21px;
      left: 21px;
    }
  }
}
::v-deep .handle-ok-btn {
  background: #fff url("@/assets/otherImg/more_rule_header.png") no-repeat;
  background-size: 100% auto;
  width: 583px;
  border-radius: 17px;
  padding: 27px 33px 33px;
  .txt {
    text-align: left;
    line-height: 48px !important;
    font-size: 31px !important;
    color: #23262b;
  }
}
</style>
