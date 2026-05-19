<template>
  <!-- <headNavigation :headData="headData"></headNavigation> -->
  <div class="box" @click="closeQt">
    <!-- 未登录显示返回按钮 -->
    <!-- <img class="fhui" src="@/assets/img/img/fhui.png" alt="" v-if="getURIParam('token')" @click="handelFhui" /> -->
    <!-- 顶部大图，或为轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :show-indicators="false">
      <van-swipe-item><img src="@/assets/img/img/home_banner.png" alt="" /></van-swipe-item>
    </van-swipe>
    <div v-show="!hasTK" class="login-btn" @click="goLogin">
      <img src="@/assets/img/img/user_pic.png" alt="" />
      点击登录</div>
      <div v-show="hasTK" class="qh" >
        <div class="qh-num" @click="toggleUserMenu">
          <img src="@/assets/img/img/user_pic.png" alt="" />
          <span>{{ userNum }}</span>
          <img id="qh-img" :src="showQt?exopen1:exopen" alt="" />
        </div>
        <div id="qh-btn" v-if="showQt" class="qh-btn">
          <div @click="openAbout"><img src="@/assets/img/img/aboutImg.png" alt="" >关于我们</div>
          <div @click="opencommon"><img src="@/assets/img/img/commonImg.png" alt="">常见问题</div>
          <!-- <div @click="openOpinion"><img src="@/assets/img/img/opinionImg.png" alt="">意见反馈</div> -->
          <div @click="qLogin"><img src="@/assets/img/img/exitImg.png" alt="">退出登录</div>
        </div>
      </div>
    <!-- tabsp -->
    <!-- <div class="head"></div> -->

    <div class="contentBox">
      <div class="content">
        <div class="center">
          <div class="my_star">
            <div class="wdmx">
              <div class="my"></div>
              <div class="settings_btn" @click="handelSzgl">设置管理</div>
            </div>
            <van-empty v-if="supplieridol.length == 0" :image="customEmpty" image-size="80">
              <div @click="orderAdd" class="text-white" slot="description">暂无明星，快来订购吧
                <img src="@/assets/otherImg/back_icon.png" alt="">
                 </div>
            </van-empty>
            <div class="box" v-else>
              <div class="box-box" v-if="Tangible&&Synthesizing==0">
                <div class="customBtn" @click="addCustom"><img src="@/assets/otherImg/addCustom.png" alt=""></div>
                <div class="customName">创建形象</div>
              </div>
               <div class="box-box" v-if="Synthesizing==1&&Tangible">
                <div class="customBtn1"><img :src="SynthesizingData[0]?.imageComposeUrl?AESDecrypt(SynthesizingData[0]?.imageComposeUrl):defaultAvatar" alt=""></div>
                <div class="customName1">{{SynthesizingData[0]?.imageName}}</div>
                <div class="customName1-fs" @click="editCustom">编辑形象</div>
              </div>
              <div class="box-box" v-for="(item, index) in !isExpanded||supplieridol.length < ((Tangible&&Synthesizing==0||Synthesizing==1)?5:6)?supplieridol.slice(0, ((Tangible&&Synthesizing==0||Synthesizing==1)?5:6)):supplieridol" :key="index">
                
                <div class="box-img">
                  <img :src="AESDecrypt(item.starPicUrl)" alt="" @click.stop="item.isComposeImage==1?handelImgStop(item):handelExperience(item)" />
                  <div class="settingImg" v-if="item.isComposeImage==1" @click="handelSetting(item)"><img src="@/assets/otherImg/settingImg.png" alt=""></div>
                  <div class="bof">
                    <img src="@/assets/img/remindScene/stop.png" alt="" v-if="item.dtPicUrl == videostop&&item.isComposeImage==0"
                      @click.stop="handelVideoStop(item)" />
                    <img src="@/assets/otherImg/showImgBtn.png" alt=""  @click.stop="handelImgStop(item)"  v-else-if="item.isComposeImage==1">
                    <img src="@/assets/img/Exclusivevideo/bof.png" alt="" @click.stop="handelExperience(item)" v-else />
                  </div>
                </div>
                <div class="box-txt">{{ item.starName }}</div>
                <!-- <div class="button-sy" v-if="item.isOrder == 0" @click.stop="handelAnswer(item)"></div> -->
                <div class="button-fs" @click="handelSceneDiscipline(item)">设置场景</div>
              </div>
              
            </div>
            <!-- 展开/收起按钮 -->
            <div v-if="(Tangible&&Synthesizing==0||Synthesizing==1)?supplieridol.length > 5:supplieridol.length > 6" class="toggle-button">
              <div @click="toggleDisplay" v-if="!isExpanded" class="show-more">    
                <div>展示更多</div>
                <img src="@/assets/img/login/direction1.png" alt="">
              </div>
              <div @click="toggleDisplay" v-else class="show-less"> 
                <div>收起</div>
                <img src="@/assets/img/login/direction1.png" alt="">
              </div>
            </div>
             
          </div>
          <!-- <div class="product">
            <img src="@/assets/otherImg/product_title.png" alt="" />
            <div class="content-text">
              明星来电是一款提供真人明星与热门动漫IP内容的来电提醒产品。支持给自己或亲友设置自己喜爱的明星形象下包括生日祝福、早安提醒等多个场景。设置成功后，用户将在指定时间接听到明星的视频电话。
            </div>
          </div> -->
          <div class="service">
            <img src="@/assets/otherImg/service_title1.png" alt="" />
            <div class="serviceGuide">
              <!-- <div @click="openBeginner">查看新手指引</div>
              <img src="@/assets/img/login/direction.png" alt="" /> -->
            </div>
            <div class="content-text">
              <div :class="`text-box-${index + 1}`" v-for="(item, index) in service_content_text" :key="item">{{ item }}
              </div>
            </div>
          </div>
          <div class="ysxy">
            <div class="serviceTextBox">
              <!-- <div>我们将在自动续费前5日，通过中国移动app—新通话—AI通话—通话设置—服务通知，向您提醒自动续订的服务。</div>
              <div>如需退订，可拨打10086或前往中国移动APP-已订业务咨询办理</div>
              <div class="more" @click="handelYwgz">更多业务规则</div> -->
              <div class="serviceText">
                <div class="selectTextImg"><img src="@/assets/img/login/textImg.png" alt=""> <div>更多业务规则</div> </div>
                <div  @click="handelYwgz"><img src="@/assets/img/login/direction.png" alt=""></div>
              </div >
              <div class="unsubscribe">退订规则：退订后立即生效，次月不再扣取费用，并保留当月功能服务，服务到期后自动失效。<span v-if="isLogin" style="color:#4E57FF" @click="openGetSub"> 点击退订</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-overlay :show="overlayShow" :lock-scroll="false">
    <div class="overlay">
      <img src="@/assets/otherImg/exit.png" @click="overlayShow = false" alt="">
      <div class="title"></div>
      <div class="content-text">
        <span style="font-weight: 700">设置路径与操作</span>
        <br />
        给自己设置：设置管理 - 添加场景 - 选择【给自己】 - 保存。
        <br />
        给亲友设置：设置管理 - 添加场景 - 选择【给亲友】 - 输入手机号 - 保存。每天限为3个亲友设置，每亲友每天限3条提醒。
        <br />
        自定义场景：设置管理-添加场景-自定义场景-自定义文案内容-生成视频-保存。当前仅部分明星IP支持，一个明星IP可支持设置4个自定义场景。
        <br />
        取消提醒：设置管理 - 删除场景。
        <br />
        <br />
        <span style="font-weight: 700">来电详情与注意事项</span>
        <br />
        用户完成设置后会在预设时间收到125990来电提醒。
        <br />
        接听视频来电需用户手机支持VoLTE/VoNR视频通话。
        <br />
        若用户手机不支持视频通话，仅能听到语音来电。
        <br />
        若机主号码异常状态（包括不限于停机、预销号、销号、停机保号、通话中、关机、呼叫转移），将无法收到明星来电，逾期不提供补播服务。
        <br />
        <br />
        <span style="font-weight: 700">来电时间设置说明</span>
        <br />
        最早可设置时间为当天当时的5分钟后，最晚可设置时间是一年后当天日期的任何时间。
        <br />
        如现在时间2024-03-01 10:00，可设置最早时间2024-03-01 10:05，最晚可设置时间2025-03-01日23:59。
        <br />
        <br />
        <span style="font-weight: 700">提醒场景与限制</span>
        <br />
        设置给自己的提醒次数上限为90次（每月），给亲友提醒次数上限为3次（每日）。请您合理安排使用，享受明星来电带来的乐趣。
        <!-- 每月设置提醒的总次数上限为31次，每日提醒次数上限为3次。请您合理安排使用，享受明星来电带来的乐趣。 -->
      </div>
    </div>
    <!-- </div> -->
  </van-overlay>
  <Login @closeLoginDialog="closeLoginDialog" @phonEncryption="phonEncryption" :canAuth="canAuth" v-if="isLoginDialog">
  </Login>
  <notSuccess :isShow="determine">
    <div class="odeBox">
      <div class="top">
        您已选择
        <span style="font-weight: bold">【{{ idolName }}】</span>
        ，该业务为包月业务，确认订购后无法更改，如有疑问，请咨询归属地10086。
      </div>
      <div class="flex">
        <div class="button" @click="determine = false">取消</div>
        <div class="button-rigth" @click="handelYes">确认</div>
      </div>
    </div>
  </notSuccess>
  <!-- 定购 -->
  <idolOrder v-if="orderShow" @onOrdershow="onOrdershow" :dataOrder="dataOrder" @type="type"></idolOrder>
  <!-- 定购成功 -->
  <toaststate :toastTxT="toasttxt" :toastShow="toastShow"></toaststate>
  <notSuccess :isShow="isShow">
    <div>
      <windowTips :name="windowTipsname.name" :text="windowTipsname.text" @notShow="notShow"></windowTips>
    </div>
  </notSuccess>
  <!-- 视频播放组件 -->
  <videoPlay :videoShow="videoShow" :videoData="videoData" @PlayShow="PlayShow"></videoPlay>
   <imgPlay :imgShow="imgShow" :imgData="imgData" @PlayImgShow="PlayImgShow"></imgPlay>


  <video ref="clickSound" :src="audio" controls autoplay autopsy webkit-playsinline="true" playsinline="true"
    preload="true" style="position: absolute; top: -10000px" @ended="onVideoEnde"></video>
  <toast :toastTxT="noUsertxt" :toastShow="nouserToast" @toastEmit="handelToast"></toast>
  <exceedwarn :warnTxT="warnTxT" :idolList="idolList" :warnShow="warnShow" @toastEmit="toastEmit"></exceedwarn>

  <van-popup v-model:show="is" round :close-on-click-overlay="!is">
    <div class="title-com">请选择一种产品包的明星为你服务：</div>
    <div class="zhuhe" v-for="(itemMax, groupIndex) in idolMax" :key="groupIndex">
      <div class="zhb">产品包{{ groupIndex + 1 }}：</div>
      <div class="box" v-for="(item, index) in itemMax" :key="item.idolListName" @click="handelCom(item, groupIndex)">
        <img class="img" src="@/assets/icon_uncheck.png" alt="" />
        <img class="img" src="@/assets/img/idolTelephone/ee.png" v-if="selectedItems[groupIndex] === item.idolListName"
          alt="" />
        <div class="box-con">
          <img v-for="img in item.idolList" :src="urlForm(img.adPicUrl)" alt="" />
        </div>
        <p>{{ item.idolListName }}</p>
      </div>
    </div>
    <div class="com-ok" @click="hadnelComOk">确认</div>
  </van-popup>

  <van-popup v-model:show="refundShow" round :close-on-click-overlay="false">
    <div class="refun-com">产品公告</div>
    <div class="refundBox">
      尊敬的客户，您好！
      由于明星来电徐海乔授权即将到期，新通话-明星来电三档明星B包（10元/月）、新通话-明星来电三档明星B包1（10元/月）、新通话-明星来电徐海乔月包（10元/月）将于2024年9月底下架。在2024年09月30日前你仍可继续使用以上产品服务，已订购的以上产品将在月底自动退订，已设置的来电任务将失效。新通话-明星来电白银组合包B（15元/月）、新通话-明星来电白银组合包B1（15元/月）、明星来电白银心悦包（15元/月）中的明星来电服务即将变更，若您同意服务变更内容，请点击“确认续订”；若您不同意服务内容变更需要退订，请点击“退订”，已设置的来电任务可以继续使用。
      <br />
      给您带来的不便，敬请谅解。
    </div>
    <div class="com-refund">
      <div @click="handelOKrefund(2)">确认续订</div>
      <div @click="handelOKrefund(1)">退订</div>
    </div>
  </van-popup>
  <!-- <toast :toastTxT="toastTxT" :toastShow="toastShow" @toastEmit="handelToast"></toast> -->

   <!-- 编辑场景弹窗 -->
      <notSuccess :isShow="showUnsubscribe">
        <div class="phoneAdd">
          <!-- <img
            src="@/assets/otherImg/exit.png"
            class="exit_btn"
            alt=""
          /> -->
          <div class="title">退订选择</div>
          <div class="viewList">
            <div >
              <div :class="['orderList',chooseBillId == item.billPointId ? 'check' : '',]" v-for="(item, index) in orderList"
                :key="'order' + index"
                @click="clickOrderItem(item,item.billPointId)">{{ item.billPointName }}
                <span class="check-icon" v-show="chooseBillId == item.billPointId"></span>
              </div>
            </div>
            <div v-if="extendList.length" class="tips">已退订</div>
            <div v-if="extendList.length">
              <div :class="['orderList']" v-for="(item, index) in extendList"
                  :key="index"
                  >{{ item.billPointName }}
              </div>
            </div>
          </div>
          <div>
            <div class="remarks">退订于下个月生效，将不再进行套餐扣费</div>

            <div class="buttom">
            <van-button round @click="handelNameqx">取 消</van-button>
            <van-button type="primary" round @click="handelNameqd"
              >确 定</van-button
            >
            </div>
          </div>
        </div>
      </notSuccess>
      <notSuccess :isShow="showUnsubmit">
        <div class="phoneAdd">
          <div class="title">退订提示</div>
          <div style="margin: 40px 0;height: 50px;text-align: start;">确定要退订:<span style="color: #4C7BFF;">{{ chooseBillObj.billPointName }}</span>吗？</div>
          
          <div class="buttom">
            <van-button round @click="()=>{showUnsubmit = false,chooseBillId=''}">取 消</van-button>
            <van-button type="primary" round @click="handelSub"
              >确 定</van-button
            >
          </div>
        </div>
      </notSuccess>
      <notSuccess :isShow="showUnsubDetail">
        <div class="phoneAdd">
       
          <div class="title" style="margin: 0;">退订选择</div>
          <div class="tips">已退订</div>
          <div class="viewList">
          <div :class="['orderList']" v-for="(item, index) in extendList"
              :key="index"
              >{{ item.billPointName }}
           </div>
          </div>

          <div class="buttom" >
            <van-button round @click="()=>{showUnsubDetail = false}" style="width: 70%;">我知道了</van-button>

          </div>
        
        </div>
      </notSuccess>
      <div v-if="showGuidance" class="gowGuidanceBox" >
        <div class="gowGuidanceAdd">
          <div class="gowGuidanceVideo" >
            <img src="@/assets/otherImg/exit1.png" class="exit_btn1" alt="" @click="stopGuidance" />
           <video 
              ref="guideVideo"
              controls 
              autoplay 
              muted
              style="width: 100%;" 
              :src="guidanceVideo" 
              webkit-playsinline="true" 
              playsinline="true" 
              controlslist="nodownload"
              @ended="onVideoEnded"
              @play="onVideoPlay"
              @pause="onVideoPause"
              >
            </video>
            <div class="playVImg" @click='pauseImg' >
              <img v-if="isPlayImg"  src="@/assets/img/img/playImg.png" alt="">
              <img v-else src="@/assets/img/img/pauseImg.png" alt="">
            </div>
          </div>
          <div class="gowGuidanceText">
            <div>设置路径
              <div class="shadowYin"></div>
            </div>
            <div>选择心仪明星<span>>></span>设置视频内容<span>>></span>选择呼叫对象<span>>></span>设定外呼时间<span>>></span>接听电话</div>
          </div>



        </div>
      </div>
      <!-- 管理自定义头像 -->
      <van-popup 
      :show="showAvater"  
      position="bottom"
      round 
      :style="{ height: '28%' }">
      <div class="changeBusiness">
        <div  @click="editAvater">编辑</div>
        <div @click="delAvater">删除</div>
        <div  @click="showAvater = false">取消</div>
      </div>
      </van-popup>
    <!-- 删除弹框 -->
          <notSuccess :isShow="delAvaterName">
        <div class="phoneAdd">
          <div class="title">提示您</div>
          <div>确定删除<span style="color: #0E4DFF;">{{ delStarName }}</span>?</div>
           <div class="delwarn">
            <img src="@/assets/img/img/warn.png" alt="">
            <div>删除后已设置的自定义场景也一并清空</div>
          </div>
          <div class="buttom">
            <van-button round @click="delAvaterqx">取 消</van-button>
            <van-button type="primary"  round @click="delAvaterqd"
              >确 定</van-button
            >
          </div>
        </div>
      </notSuccess>

</template>
<script setup lang="ts">
import { $ref } from 'vue/macros'
import { ref, reactive, Ref, onMounted,computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { gdXmsStore } from '@/store'
import { Toast } from 'vant'
import { appSSO } from '@/utils/app'
import { getURIParam, urlForm, getIdsFromPacks, deduplicateByIdolId,AESDecrypt } from '@/utils/index'
// import toast from '@/components/toast/toast.vue'
import toast from '@/components/toast/index.vue'
import exceedwarn from '@/components/toast/exceedwarn.vue'
import HRequest from '@/api'
import Login from '@c/Login.vue'
import idolOrder from '@/components/loginstate/idolOrder.vue'
// import { $ref } from 'vue/macros';
import volcPoint from '@/utils/volc-collect'
import customEmpty from '@/assets/otherImg/custom_empty.png'
import successIcon from '@/assets/otherImg/success1.png'
import guidanceVideo from '@/assets/otherImg/guidanceVideo.mp4'
import xiaohua from '@/assets/xiaohua.mp4'
import exopen from '@/assets/img/img/exopen.png'
import exopen1 from '@/assets/img/img/exopen1.png'
import defaultAvatar from '@/assets/otherImg/defaultAvatar.png'

const isSaving = ref(false) // 添加保存状态标志
const Tangible=ref(false) // 是否有形象
const Synthesizing = ref(0) // 是否正在合成视频
const SynthesizingData = ref<any[]>([]) // 合成视频数据
const showAvater = ref(false)
const delAvaterName = ref(false)
const showImg=ref(false)
const delStarName=ref('')
const delStarId=ref('')
const service_content_text = [
  '为您提供真人明星、热门动漫IP的视频来电提醒',
  '提供多种场景提醒选择，满足不同场合的提醒需求',
  '支持设置指定日期和时间的单次或重复提醒',
  '每天可为3位亲友设置专属明星的视频祝福'
]
const showQt = ref(false);
const hasTK = ref(false);
const userNum=ref(''); // 用户号码
const isExpanded = ref(false);
const showMore= ref(false)
const isPlayImg= ref(true)
const showGuidance=ref(false)  //引导视频弹框
const showUnsubscribe= ref(false)
const showUnsubmit= ref(false)
const showUnsubDetail= ref(false)
const route = useRoute();
const channel = typeof route.query.channel === "string" ? route.query.channel : "";
localStorage.setItem("channel", channel);

let volc = new volcPoint('明星来电', '首页')
volc.initEvent()
// 埋点
volc.pageViewEvent("mxld_",{module:"明星来电",module_code:'mxld', page_name: '统一设置页首页',page_code:"homePage", page_url: window.location.href })
const is = ref(false)
const store = gdXmsStore()
const router = useRouter()
// const boxShow = ref(true)
const indexs = ref(2)
const toasttxt: any = ref({})
const ywgzShow = ref(false)
const toastShow = ref(false)
const idolName = ref('')
const overlayShow = ref(false)
const comList: any = ref([])
const comindex = ref()
const checked = ref('1')
const idolMax: any = ref([])
const chooseBillId= ref('')
const chooseBillObj:any= ref({})
const orderList:any=ref([


])
const extendList:any= ref([
 
])
const selectedItems = ref(new Array(idolMax.length).fill(null)) // 初始化一个与 idolMax 长度相同的数组，初始值为 null

// 退订续订弹窗
const refundShow = ref(false)
const handelNameqx=()=>{
  showUnsubscribe.value = false
  chooseBillId.value= ''
}
const toggleDisplay=()=>{
  isExpanded.value = !isExpanded.value;
}
const handelNameqd=()=>{
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '统一设置页首页',page_code:"homePage", page_url: window.location.href, click_object: 'Unsubscribe Selected',object_name:'退订选中套餐',object_type:'button' })
  if(!chooseBillId.value){
    Toast('请先选择要退订的业务')
  }else{
    showUnsubscribe.value = false
    showUnsubmit.value= true
  }
  
}
const isLogin= computed(() => {
  return localStorage.getItem('tk') ? true : false
})
const handelSub=()=>{
 
  HRequest.h5Unsub({
    billPointId: chooseBillObj.value.billPointId,
    orderCount: chooseBillObj.value.orderCount
  }).then((res:any)=>{
    if(res.code == 200){
      showUnsubmit.value= false
      chooseBillId.value= ''
        Toast({
          message: '退订申请已提交',
          icon: successIcon,
         
        });
      
    } else{
      Toast({
        type: 'fail',
        message: res.msg,
       
      })
    }
  })
  
}
const openGetSub=()=>{
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '统一设置页首页',page_code:"homePage", page_url: window.location.href, click_object: 'unsubscribe',object_name:'点击退订',object_type:'button' })

  HRequest.getSub().then((res:any)=>{
    if(res.code == 200){
      if(!res.data){
        Toast('尚未开通业务')
        return
      }
      const { subscribed, unsubscribed } = res.data
      orderList.value = subscribed?subscribed:[]
      extendList.value= unsubscribed?unsubscribed:[]
      if(subscribed && subscribed.length == 1){
        chooseBillId.value= subscribed[0].billPointId
        chooseBillObj.value = subscribed[0]
        showUnsubscribe.value= true
      }else if(subscribed && subscribed.length > 1){
        showUnsubscribe.value= true
      }else if(!subscribed && unsubscribed && unsubscribed.length){
        showUnsubDetail.value= true
      }
      
    }

  })
}
const clickOrderItem=(item:any,id:string)=>{
if (chooseBillId.value === id) {
    chooseBillId.value = "";
    chooseBillObj.value={}
  } else {
    chooseBillId.value = id;
    chooseBillObj.value = item
  }
}
//确认续订
const handelOKrefund = async (isOrder: number) => {
  try {
    const res = await HRequest.setSurveyOrder(isOrder)
    refundShow.value = false
    if (res.data) {
      Toast('提交成功')
      return
    }
    Toast('提交异常')
  } catch (err) {
    Toast('系统错误')
    refundShow.value = false
  }
}

// 计费点需求 多个组合包同个计费点，多省多包需求，暂不开发
const getIdolListCom = async () => {
  const res = await HRequest.getIdolListCom()
  if (res.code != 200) return console.log('接口失败')
  idolMax.value = res.data
  const list: any = []
  res.data.forEach((e: any) => {
    list.push(...e)
  })
  comList.value = list
  is.value = res.data.length == 0 ? false : true
}

const idolListCom: any = ref([])
const handelCom = async (item: any, groupIndex: number) => {
  // 更新 selectedItems 中对应组的选定项
  idolListCom.value[groupIndex] = item
  selectedItems.value[groupIndex] = item.idolListName
  idolIdlist.value = getIdsFromPacks(selectedItems.value, idolMax.value)
}
const idolIdlist = ref()
const hadnelComOk = async () => {
  // Toast.loading({
  //   duration: 0,
  //   message: '请稍后',
  //   forbidClick: true
  // })
  let array: any = []
  idolListCom.value.forEach((e: any) => {
    array.push(e)
  })
  if (array.length != idolMax.value.length) return Toast(`每个包至少选择一个`)
  const params = idolListCom.value
  const res = await HRequest.getIdolListComDetail(params)
  if (res.code != 200) return Toast(res.msg)
  is.value = false
  Toast(res.msg)
  // getIdolList()
  toastEmit()
}
//
const handelFhui = () => {
  window.history.back()
}
const handelYwgz = () => {
  overlayShow.value = true
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '统一设置页首页',page_code:"homePage", page_url: window.location.href, click_object: 'Settings More business rules',object_name:'更多业务规则',object_type:'button' })
 
}
/**
 *点击设置管理
 */
const handelSzgl = () => {
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '统一设置页首页',page_code:"homePage", page_url: window.location.href, click_object: 'Settings Management',object_name:'设置管理',object_type:'button' })

  if (!localStorage.getItem('tk')) {
    isLoginDialog.value = true //未登录点击设置显示登录框
    // 唤起登录弹窗
    cmccAuth()
    return
  }
  console.log(userType.value)
  if (userType.value !== 3 && userType.value !== 2) {
    nouserToast.value = true
    noUsertxt.value = {
      title: '温馨提示',
      txt1: '您还不是明星来电用户',
      button: 1,
      butonTxt: '我知道了'
    }
    return
  }

  router.push({
    path: '/sceneDiscipline'
  })
}
const getVersion = async () => {
  const res = await HRequest.getVersion()
  localStorage.setItem('version', res.data)
  getURIParam('token') ? loginInfo() : console.log('链接未检测到token，单点登录无法执行...')
}
getVersion()
//--------------------展第三方单点登录逻辑----------------------------
const loginInfo = async () => {
  const params = {
    ssoToken: getURIParam('token'),
    tag: '1',
    loginChn: '4',
    // appId: 'xth001',
    version: localStorage.getItem('version')
  }
  const res = await HRequest.singleLogin(params)
  if (res.code !== 200) {
    // Toast('单点登录失败！请手动登录！')
    console.log('单点失败，手动登录')
    if (localStorage.getItem('tk')) return

    cmccAuth()
    return
  }
   if (res.data.uid) {
        localStorage.setItem("uid", res.data.uid);
   }
  console.log('-----单点登录成功！-----', res)
  localStorage.setItem('tk', res.data.token)
  hasTK.value = true // 显示登录成功号码
  loginShow.value = '1'
  userDetail()
  //如果登录成功，初始换埋点，确保埋点上报最新用户数据
  volc.initEvent()
}
//检测到未登陆才执行单点登录！
// if (!localStorage.getItem('tk')) {
//   console.log('检测到未登陆，执行单点登录...')
//如果没登陆且链接携带token就执行单点登录

// }

//--------------------展第三方单点登录逻辑----------------------------
//--------------------展厅登录逻辑----------------------------
const switchuser = ref(true) // 展厅内不展示退出按钮
sessionStorage.removeItem('switchuser')
// appSSO()
//   .then(async res => {
//     switchuser.value = false
//     sessionStorage.setItem('switchuser', '1')
//     if (sessionStorage.getItem('ztlogin') == '1') {
//       console.log('展厅内退出登录，不能在执行展厅登录')
//       return
//     }
//     console.log('=======已经退出登录过一次，展厅登录不能执行=======', sessionStorage.getItem('ztlogin') == '1')
//     const params = {
//       ssoToken: res,
//       tag: '1',
//       loginChn: '4',
//       // appId: 'zt001',
//       version: localStorage.getItem('version')
//     }
//     const res1 = await HRequest.singleLogin(params)

//     localStorage.setItem('tk', res1.data.token)
//     console.log('singleLogin展厅登录res', res1)
//     console.log('666新储存的token', localStorage.getItem('tk'))
//     loginShow.value = '1'
//     userDetail()
//   })
//   .catch(err => {
//     console.log('=======展厅取号失败======')
//   })
//=--------------------展厅登录逻辑----------------------------
const noUsertxt: any = ref({
  // title: '暂无权限使用',
  // txt: '您还不是明星来电用户'
  title: '温馨提示',
  txt1: '您还不是明星来电用户',
  // txtcolor: '【时代少年团马嘉祺】',
  // txt3: '的生日提醒，请保持电话畅通，注意接听来自125990的电话。',
  // color: '#3882FF',
  button: 1,
  butonTxt: '我知道了'
  // onebtntxt: '去办理'
})
const nouserToast = ref(false) // 无权限使用

// 关闭温馨提示
const handelToast = (e: boolean) => {
  toastShow.value = e
  nouserToast.value = false
}
onMounted(() => {
  // cmccAuth()
  sessionStorage.setItem('idolType', '2')
  if (!localStorage.getItem('tk') && !getURIParam('token')) {
    // 唤起登录弹窗
    console.log('无单点登录情况执行')
    cmccAuth()
  }
})

const windowTipsname = reactive({
  name: '',
  text: ''
})
const form = reactive({
  isVerifyPass: false // 滑块验证结果
})

const update = (e: any) => {
  console.log(e)
}
// if (localStorage.getItem('tk') && res.data.userType !== 3) {
//   nouserToast.value = true
//   return
// }
const isShow = ref(false)
const data = reactive({
  Tips: {
    text: ''
  },
  listData: []
})
interface listData {
  idolId: number
  smPicUrl: string
  idolName: string
  adRemark: string
  isOrder: string | number
  adPicUrl: string
  price: string
}
const listData: Ref<Array<listData>> = ref([])

// const headData = ref('爱豆来电')
const isLoginDialog: Ref<boolean> = ref(false)
// 登陆成功获取用户信息
// const phonData: any = ref(localStorage.getItem('phonData'))
const phonData: any = ref({ idolNum: 0, phone: '', sceneNum: 0, type: 0 }) //不给默认值会报错
const userType: any = ref('')
const use = ref()

// 是否新订购用户
const isNewOrder = async () => {
  const res = await HRequest.isNewOrder()
  if (res.code == 200) {
    if(res.data){
      // showGuidance.value = true //暂时注释首次登录
    }else{
      showGuidance.value = false
    }
    console.log('新订购用户',res.data)
  }
}
const userDetail = async () => {
  Toast.loading({
    duration: 0,
    message: '请稍后',
    forbidClick: true
  })
  try {
    const params = {
      loginChn: '4'
    }
    const res = await HRequest.userDetail(params)
    if (res.code == 200) {
      maxminTime(2)
      Toast.clear()
      userNum.value = res.data.phone;
      // 用户信息储存
      sessionStorage.setItem('user', JSON.stringify(res.data))
      sessionStorage.setItem('userType', res.data.userType) // 储存用户状态是否有权限
      userType.value = res.data.userType
      use.value = res.data
      if (getURIParam('type') == 'box' && res.data.showBox == 1) {
        refundShow.value = true
      }
      // if (localStorage.getItem('tk') && res.data.userType !== 3) {
      //   nouserToast.value = true
      //   return
      // }
      if (localStorage.getItem('tk') && res.data.userType !== 3 && res.data.userType !== 2) {
        nouserToast.value = true
        noUsertxt.value = {
          title: '暂无权限使用',
          txt1: '您还不是明星来电用户',
          button: 1,
          butonTxt: '我知道了'
        }
      } else {
        // window.location.reload();
        isNewOrder() // 是否新订购用户
        if (res.data.isTipSelectStar != 0) {
          getIdolListCom()
        }
      }

      phonData.value = res.data

      // 切换tab显示
      mediumType.value = res.data.type
      // getIdolList(res.data.type)
      // 未 调用
      // queryList(res.data.type, 1)
      // getIdolList()
      toastEmit()

      // !localStorage.getItem('tk') ? queryList(res.data.type, 1) : ''
    } else if (res.code == 203) {
      Toast('请重新登录!')
      localStorage.removeItem('tk')
      hasTK.value = false
      // window.location.reload()
      toastEmit()
    }
  } catch (error) {
    Toast('服务异常！')
  }

  // phonData.value = { idolNum: 0, phone: '137****5934', sceneNum: 0, type: 2 }
}

// 登录才获取用户信息-------------------------------------
if (localStorage.getItem('tk')) {
  hasTK.value = true;
  userDetail() //获取用户信息
}else{
   hasTK.value = false;

}

// const logins = async (token: string) => {
//   console.log('拿到jsdk 的token', token)

//   const params = {
//     ssoToken: JSON.stringify(appSSO()),
//     tag: '1',
//     loginChn: '4'
//   }
//   console.log(params, 'params-----')

//   const res = await HRequest.singleLogin(params)
//   console.log('jssdk储存token成功', res.data.token)
//   localStorage.setItem('tk', res.data.token)
//   console.log('新储存的token', localStorage.getItem('tk'))
//   userDetail()
// }
// logins('')
// // 根据用户信息查询列表
// const getIdolList = async () => {
//   const res = await HRequest.getIdolList(1)
//   console.log(res)
//   // 在这里进行列表渲染
// }
// getIdolList()
const loginShow = ref(localStorage.getItem('tk')) //判断登录显示
const phonEncryption = (data: any) => {
  // 登陆成功
  console.log('我不是空', data)
  loginShow.value = localStorage.getItem('tk')
  userDetail() //获取用户信息
  // 如果登录成功，初始换埋点，确保埋点上报最新用户数据
  volc.initEvent()
}

const supplieridol: any = ref([])
const getIdolList = async () => {
  // 多包渲染

  // const res1 = await HRequest.getIdolListComDetail([]) // 暂时
  const res1 = { data: null } // 暂时
  // 未登录查询全部
  //
  supplieridol.value = []
  const res = await HRequest.getIdolList(1, 2)
  if (res.code !== 200) return console.log('未登录查询全部失败')
  // 默认把橙络络放在数组最前面  如果数组内没有，就正常排序
  const oneItems = res.data.filter((item: any) => item.starName === '橙络络')
  const otherItems = res.data.filter((item: any) => item.starName !== '橙络络')
  supplieridol.value = deduplicateByIdolId(res1.data == null ? [...oneItems, ...otherItems] : [...oneItems, ...otherItems, ...res1.data])
  console.log(supplieridol.value, '供应商爱豆列表')
    const foundItem = res.data.find((item: any) => item.hasStarFrame == 1);  // 找到第一个hasStarFrame为1的项有创建形象
   console.log('查询是否有创建形象接口', foundItem)
    if (foundItem) {
      Tangible.value = true;
      const frame = await HRequest.getStarFrameList()
      if (frame.code==200&&frame.data.length>0) {
        const framedata=frame.data
        // framedata[0].status=4
        console.log('获取框架成功',framedata)
        if(framedata[0].status==4){
          Synthesizing.value = 2 
          // supplieridol.value=deduplicateByIdolId([...framedata,...supplieridol.value])

        }else{
          Synthesizing.value = 1
          SynthesizingData.value=framedata
        }
      
      }else{
        Synthesizing.value = 0 //没有合成。。及创建成功

      }
      console.log('有创建形象', foundItem.starId);
    }else{
      Tangible.value = false;

    }

}

/**
 *开局弹窗 
 */
const idolList = ref()
const warnShow = ref(false) //
const warnTxT = ref({
  title: `您已订购了元资费包， 请选择一位明星为你服务：`,
  txt: '默认',
  button: '确认'
})

const toastEmit = async () => {
  try {
    getIdolList()
    const res = await HRequest.getSelectedIdol()
    const dataArr: any = {
      price: res.data.price,
      selectIdol: res.data.selectStar.filter((item: any) => item.isOrder == 0),
      unifyId: res.data.unifyId,
      billPointName: res.data.billPointName
    }
    console.log('有待选择明星外层', dataArr.selectIdol.length)
    if (res.data !== null) {
      if (res.code == '200' && dataArr.selectIdol.length !== 0) {
        idolList.value = dataArr
        warnShow.value = true
        console.log('有待选择明星', idolList.value)
      }
    }
  } catch (e) {
    getIdolList()
    console.log(e, '明星选择错误！')
    return
  }
}

//未登录调用供应商爱豆
// localStorage.getItem('tk') ? getIdolList() : ''

//一键登录获取号码
let canAuth = $ref(false) //是否可以一键登录
const cmccAuth = async () => {
  try {
    Toast.loading({
      duration: 0,
      message: '取号中...',
      forbidClick: true
    })

    let res1 = await HRequest.getAppId()
    if (res1.code != 200) {
      cmccAuthFail()
      return
    }
    let params2 = {
      preSign: window.YDRZ.getSign(res1.data, '1.2')
    }
    // console.log('params2数据', params2)

    let res2 = await HRequest.getSign(params2)
    // console.log('res2数据', res2)

    if (res2.code != 200) {
      cmccAuthFail()
      return
    }
    window.YDRZ.getTokenInfo({
      data: {
        version: '1.2',
        appId: res1.data,
        sign: res2.data,
        openType: '1'
      },
      success: async function (res3: any) {
        console.log('我4G取号成功了')
        store.setYDRZres(res3)
        getPhoneBy4G()
      },
      error: function (err3: any) {
        cmccAuthFail()
      }
    })
  } catch {
    cmccAuthFail()
    Toast.clear()
  }
}
// 取号失败，弹出登录框
const cmccAuthFail = () => {
  // Toast('取号失败！请手动登录')
  console.log('取号失败！请手动登录-495-cmccAuthFail')
  Toast.clear()
  canAuth = false
  // isLoginDialog.value = true //添加退出登录框
}
//获取号码，未登录
const getPhoneBy4G = async () => {
  Toast.loading({
    duration: 0,
    message: '请稍后',
    forbidClick: true
  })
  // window.gdp('send')
  let ydrzRes: any = store.getYDRZres
  let params = {
    token: ydrzRes.token,
    userInformation: ydrzRes.userInformation
    // actId: store.getActId
  }
  console.log('getPhoneBy4G,数据', params)

  let res = await HRequest.getPhoneBy4G(params)
  if (res.code == 200) {
    store.setEncryptedPhone(res.data.phone)
    store.setShow(true)
    localStorage.setItem("uid", res.data.uid);
    console.log('取号接口手机号获取成功', res)
    canAuth = true

    // setTimeout(() => {
    //   canAuth = true
    //   store.setEncryptedPhone('6do/oWUItFaZgIYtRVNm+w==')
    //   store.setShow(true)
    //   isLoginDialog.value = true
    //   Toast.clear()
    // }, 2000)
  }
  // Toast('验证失败，请使用验证码登录')
  console.log('取号校验失败，请使用验证码登录-533-getPhoneBy4G')
  Toast.clear()
  // isLoginDialog.value = true //添加退出登录框
}

// 打开登录弹窗
const loginButton = (e: boolean) => {
  const types: any = sessionStorage.getItem('userType') || 3

  // if (!localStorage.getItem('tk') && types !== 3) {
  //   nouserToast.value = true
  //   return
  // }
  cmccAuth()
}
// 点击已经设置场景跳转
const setScene = (e: boolean) => {
  if (!localStorage.getItem('tk')) {
    nouserToast.value = true
    noUsertxt.value = {
      // title: '暂无权限使用',
      // txt: '您还不是明星来电用户'
      title: '温馨提示',
      txt1: '请登录后使用',
      // txtcolor: '【时代少年团马嘉祺】',
      // txt3: '的生日提醒，请保持电话畅通，注意接听来自125990的电话。',
      // color: '#3882FF',
      button: 1,
      butonTxt: '我知道了'
      // onebtntxt: '去办理'
    }
    return
  }
  if (sessionStorage.getItem('userType') == '3' || sessionStorage.getItem('userType') == '2') {
    router.push('/sceneDiscipline')

    return
  }
  nouserToast.value = true
  noUsertxt.value = {
    // title: '暂无权限使用',
    // txt: '您还不是明星来电用户'
    title: '暂无权限使用',
    txt1: '您还不是明星来电用户',
    // txtcolor: '【时代少年团马嘉祺】',
    // txt3: '的生日提醒，请保持电话畅通，注意接听来自125990的电话。',
    // color: '#3882FF',
    button: 1,
    butonTxt: '我知道了'
    // onebtntxt: '去办理'
  }
}
// 点击我的爱豆
// const myidol = (e: boolean) => {
//   if (!localStorage.getItem('tk')) {
//     nouserToast.value = true
//     noUsertxt.value = {
//       // txt: '您还不是明星来电用户'
//       title: '温馨提示',
//       txt1: '请登录后使用',
//       // txtcolor: '【时代少年团马嘉祺】',
//       // txt3: '的生日提醒，请保持电话畅通，注意接听来自125990的电话。',
//       // color: '#3882FF',
//       button: 1
//       // onebtntxt: '去办理'
//     }
//     return
//   }
//   if (sessionStorage.getItem('userType') == '3' || sessionStorage.getItem('userType') == '2') {
//     router.push('/myidol')

//     return
//   }
//   nouserToast.value = true
//   noUsertxt.value = {
//     // title: '暂无权限使用',
//     // txt: '您还不是明星来电用户'
//     title: '暂无权限使用',
//     txt1: '您还不是明星来电用户',
//     // txtcolor: '【时代少年团马嘉祺】',
//     // txt3: '的生日提醒，请保持电话畅通，注意接听来自125990的电话。',
//     // color: '#3882FF',
//     button: 1,
//     butonTxt: '我知道了'
//     // onebtntxt: '去办理'
//   }
// }
// 点击更多
const handelMore = () => {
  router.push('/moreidol')
  // 2是视频1是音频
  const type = mediumType.value
  localStorage.setItem('moreidol', type.toString())
}
// 爱豆组合包跳转
const handelCombination = () => {
  // if (!localStorage.getItem('tk')) return Toast('请先登录！')
  router.push('/idolcombination')
}
// const arrdd = ref(1)
// 切换音视频
// const videoQh = async (e: number) => {
//   console.log(e)
//   userDetail()
//   // indexs.value = indexs.value == 1 ? 2 : 1
//   queryList(e, 1)
//   // window.location.reload()
// }

//回调关闭登录弹窗
const closeLoginDialog = (val: boolean): void => {
  isLoginDialog.value = val
  const user: any = sessionStorage.getItem('user')
  // 刷新页面
  if (localStorage.getItem('tk')){
    hasTK.value = true
    // window.location.reload(); 
  }
   
  // if (localStorage.getItem('tk') && JSON.parse(user).userType !== 3) {
  //   nouserToast.value = true
  //   noUsertxt.value = {
  //     title: '暂无权限使用',
  //     txt: '您还不是明星来电用户'
  //   }
  // }
  // 埋点

}
const imgShow = ref(false)
const imgData = ref('')     // 新增：存储要显示的图片 URL
// 点击播放视频||音频
const videoShow = ref(false)
const videoData = ref('')
const clickSound: any = ref(null)
const audio = ref('')
const videostop = ref('') // 按钮状态
const handelVideoStop = (item: any) => {
  videostop.value = ''
  console.log('我是暂停')
  clickSound.value.pause()
  console.log(clickSound.value.ended())
}

const onVideoEnde = () => {
  console.log('我播放结束了')
  videostop.value = ''
}
const handelImgStop = (item:any) => {
  imgShow.value = true
  imgData.value = item.starPicUrl  // 传递明星图片 URL
  console.log('我全屏图片',AESDecrypt(item.starPicUrl))
}
const handelExperience = async (item: any) => {
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '统一设置页首页',page_code:"homePage", page_url: window.location.href, click_object: 'play',object_name:'播放'+item.starName ,object_type:'button' })

  Toast.loading({
    duration: 0,
    message: '请稍后',
    forbidClick: true
  })
  // console.log('体验一下', JSON.parse(JSON.stringify(item)))
  const data = JSON.parse(JSON.stringify(item))
  // mp4时弹出弹窗播放视频，否则不弹出播放音频     默认场景数据
  if (AESDecrypt(data.defaultSceneList[0].sceneUrl).indexOf('mp4') != -1) {
    console.log('视频链接：', videoData.value)
    // console.log(data.defaultSceneList[0]);
    // console.log("data.defaultSceneList[0].sceneUrl, 2=", data.defaultSceneList[0].sceneUrl, 2);
    //直接播放即可
    Toast.clear()
    videoShow.value = true // 打开视频组件
    videoData.value = AESDecrypt(data.defaultSceneList[0].sceneUrl)

    // const res = await HRequest.play(data.defaultSceneList[0].sceneUrl, 2)
    // if (res) {
    //   console.log("res=",res);
    //   Toast.clear()
    //   videoShow.value = true // 打开视频组件
    //   const blob = res
    //   videoData.value = window.URL.createObjectURL(blob)
    //   console.log(videoData.value)
    // }
  } else {     
    Toast.clear()
    audio.value = AESDecrypt(data.defaultSceneList[0].sceneUrl)
    console.log(item)
    videostop.value = item.dtPicUrl
    console.log('我是音频', audio.value)
    clickSound.value.play()
  }
}

const PlayImgShow = (e: boolean) => {
  imgShow.value = e
  console.log('关闭图片')
}
const PlayShow = (e: boolean) => {
  videoShow.value = e
  videoData.value = ''
  console.log('为空', videoData.value)
}

// 事物提醒1
const handelThing = (item: any) => {
  idolName.value = item.idolName // 二次确认弹窗文案

  sessionStorage.setItem('price', item.price)
  sessionStorage.setItem('typeName', phonData.value.idolNum)
  sessionStorage.setItem('userType', phonData.value.userType)

  router.push({
    path: '/starDetails',
    query: {
      ...item,
      defaultSceneList: JSON.stringify(item.defaultSceneList),
      friendSceneList: JSON.stringify(item.friendSceneList)
    }
  })
}

const orderShow = ref(false)
const dataOrder: Ref<object> = ref({})
// 事务提醒

// const handelAnswer = (item: any) => {
//   // 保存定购价格
//   sessionStorage.setItem('price', item.price)
//   idolName.value = item.idolName // 二次确认弹窗文案

//   if (!localStorage.getItem('tk')) {
//     Toast('请先登录！')
//     return
//   }
//   determine.value = true
//   dataOrder.value = item
// }
// 发送祝福
const handelSceneDiscipline = (item: any) => {
  // 埋点
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '统一设置页首页',page_code:"homePage", page_url: window.location.href, click_object: 'Star IP',object_name:'明星IP',object_type:'button' })
  console.log(item, userType.value)
  console.log(phonData.value)

  if (!localStorage.getItem('tk')) {
    nouserToast.value = true
    noUsertxt.value = {
      title: '温馨提示',
      txt1: '请登录后使用',
      button: 1,
      butonTxt: '我知道了'
    }
    return
  }
  if (userType.value == 3 || userType.value == 2) {
    sessionStorage.setItem("starId",item.starId) 
    // 如果 settingsType 存在，则清除掉
    if (sessionStorage.getItem("settingsType")) {
      sessionStorage.removeItem("settingsType");
    }
    router.push({
      path: '/remindScene',
      query: {
        starId: item.starId
      }
    })

    return
  } else {
    console.log('userType!==3无权限')
    nouserToast.value = true
    noUsertxt.value = {
      title: '暂无权限使用',
      txt1: '您还不是明星来电用户',

      button: 1,
      butonTxt: '我知道了'
    }
  }
}
const determine = ref(false)
const handelYes = () => {
  console.log('确定')
  determine.value = false
  orderShow.value = true
}
const onOrdershow = (item: boolean): void => {
  orderShow.value = item
  console.log(item)
}
// 定购成功回调

const type = (e: number) => {
  toastShow.value = true
  const idolName: any = sessionStorage.getItem('idolOrderData')
  toasttxt.value = {
    type: 'success',
    title: JSON.parse(idolName).idolName,
    txt: '可以设置爱豆提醒啦！',
    show: true
  }
  getIdolList()
}

// const idolName: any = sessionStorage.getItem('idolOrderData')
// toasttxt.value = {
//   type: 'success',
//   title: JSON.parse(idolName).idolName,
//   txt: '可以设置爱豆提醒啦！',
//   show: true
// }
// 列表查询
// const queryList = async () => {
//     // const
// }
// 闲聊吹水
// const handelChat = (item: object) => {
//     console.log('闲聊吹水', item)
//     windowTipsname.name = '闲聊吹水'
//     windowTipsname.text = '闲聊吹水建设中，敬请期待!'
//     isShow.value = true
// }
// 组合介绍
// const orderShow = (e: boolean) => {
//     isShow.value = e
//     windowTipsname.name = '组合订购'
//     windowTipsname.text = '更多爱豆即将上线，敬请期待！'
// }
const notShow = (e: boolean) => {
  console.log(e)
  isShow.value = e
}
// 头部tab切换音视频
const mediumType = ref(2)
const handelSp = async (item: number) => {
  sessionStorage.setItem('idolType', item.toString())
  console.log('视频版', item)
  // 已登录才会获取用户信息ID
  if (localStorage.getItem('tk')) {
    await HRequest.changeType()
    userDetail()
  } else {
    // queryList(item, 0)
    getIdolList()
  }
  mediumType.value = item
}
// 组合包是否展示，如果为空不展示
// const listPackShow = ref([])
// const listComboPack = async () => {
//   const res = await HRequest.listComboPack(localStorage.getItem('tk') ? 1 : 2)
//   listPackShow.value = res.data
// }
// //
// listComboPack()
const maxminTime = async (item: number) => {
  const params = {
    type: item
  }
  const res = await HRequest.getCallTime(params)
  const { friStartTime, friEndTime } = res.data
  const [endHour, endMin] = friEndTime.split(':')
  const [startHour, startMin] = friStartTime.split(':')
  sessionStorage.setItem('getCallTime', JSON.stringify({ ...res.data, startHour, startMin, endHour, endMin }))
}
const stopGuidance = () => {
  showGuidance.value = false
  guideVideo.value.pause()
}
const openBeginner= ()=>{ 
  volc.pageClickEvent("mxld_", { module: '明星来电',module_code:"mxld", page_name: '统一设置页首页',page_code:"homePage", page_url: window.location.href, click_object: "View Beginner's Guide",object_name:'查看新手指引',object_type:'button' })
  showGuidance.value = true
   window.scrollTo({
            top: 0,
            behavior: 'smooth' // 使用平滑滚动
        });
}
  // 定义视频元素的引用
const guideVideo = ref('') as any;
  const pauseImg = () => {
  console.log('暂停播放')
  try {
    if (guideVideo.value) {
      if (guideVideo.value.paused) {
        guideVideo.value.play()
        isPlayImg.value = false
      } else {
        guideVideo.value.pause()
        isPlayImg.value = true
      }
    }
  } catch (error) {
    console.error('视频控制出错:', error)
  }
}
  const onVideoEnded=()=>{
    console.log('播放完成')
    isPlayImg.value = true;
    // showGuidance.value = false

  }
  // 添加视频播放状态监听方法
const onVideoPlay = () => {
  isPlayImg.value = false;
}

const onVideoPause = () => {
  isPlayImg.value = true;
}

const openAbout=()=>{
   router.push({
      path: "/about"
    });
}
const opencommon=()=>{
   router.push({
      path: "/common"
    });
}
const openOpinion=async()=>{
    const encryptedPhone = sessionStorage.getItem("user");
    const uid = localStorage.getItem("uid");
  if (encryptedPhone) {
     const userData = JSON.parse(encryptedPhone);
    console.log(userData.phone2); 
     const params = {
      phone: userData.phone2,
      usessionId:uid
    }
  if (uid) {
      const res = await HRequest.getSsoTempToken(params);
      if(res.code == 200){
         const _ssoToken = res.data;
        window.location.href = `https://newcall.yhszd.com/newcall/feedback?ssoToken=${_ssoToken}`;
      }else {
          Toast(res.msg);
          console.log("获取ssoToken失败");
        }
     }

  }
   
   
 

}
  const goLogin = () => {
    if (hasTK.value == false) {
      isLoginDialog.value = true
    }
  };
  const qLogin = async() => {
    console.log("退出登录");
    // toastShow.value = true;
   // 清除URL中token参数及后面的所有参数
  if (getURIParam('token')) {
    const url = new URL(window.location.href);
    const hash = url.hash;
    
    // 清除查询参数
    url.search = '';
    
    // 如果有hash部分，保留hash但清除其中的查询参数
    if (hash.includes('?')) {
      const hashParts = hash.split('?');
      url.hash = hashParts[0];
    }
    
    window.history.replaceState({}, document.title, url.toString());
  }
    const encryptedPhone = sessionStorage.getItem("user");
    if (encryptedPhone) {
      const userData = JSON.parse(encryptedPhone);
       const params = {
      phone: userData.phone2,
      loginChn:'4'
    }
    const res = await HRequest.getLogout(params);
    if(res.code == 200){
       showQt.value = false
        localStorage.removeItem('tk')
        localStorage.removeItem('phon')
        sessionStorage.removeItem('user')
        Toast("已退出登录");
        // hasTK.value = false
        setTimeout(() => {
        window.location.reload();
      }, 2000);

    }else{
      Toast(res.msg);
    }
      
    }
   
     
    //  sessionStorage.clear();
    // localStorage.clear();
    
    // isLoginDialog.value = true
    
  
  };
const closeQt=(e: any)=>{ 
  // showQt.value = false
   const hasId = e.target.id;
    if (!hasId && showQt.value) {
      showQt.value = false;
    }

}
const orderAdd=async()=>{
  console.log("去订购");
  if (!localStorage.getItem('tk')) {
    isLoginDialog.value = true //未登录点击设置显示登录框
  }else{
    console.log("已登录去订购");
    const encryptedPhone = sessionStorage.getItem("user");
    const uid = localStorage.getItem("uid");
  if (encryptedPhone) {
     const userData = JSON.parse(encryptedPhone);
    console.log(userData.phone2); 
     const params = {
      phone: userData.phone2,
      usessionId:uid
    }
  if (uid) {
      const res = await HRequest.getSsoTempToken(params);
      if(res.code == 200){
         const _ssoToken = res.data;
        window.location.href = `https://newcall.5gnewcall.cn/newcall/star-activity?ssoToken=${_ssoToken}`;
      }else {
          Toast(res.msg);
          console.log("获取ssoToken失败");
        }
     }

  }

  }

}
const toggleUserMenu = (e:Event) => {
  e.stopPropagation(); // 阻止事件冒泡
  showQt.value = !showQt.value;
};

// 创建形象
const addCustom=()=>{
  console.log('创建自定义形象') 
    router.push({
    path: "/diyFgure"
  });

}
// 编辑形象
const editCustom=()=>{
  console.log('创建自定义形象') 
    router.push({
    path: "/diyFgure",
      query: {
      id: 1,
    }
  });

}
// 编辑自定义形象
const handelSetting = async (item: any) => {
  console.log('点击设置头像', item)
  showAvater.value = true
  delStarName.value = item.starName
  delStarId.value = item.id
}
const editAvater=()=>{
  showAvater.value = false
  router.push({
    path: "/diyFgure",
    query: {
      id: 2,
    }
  });
}
// 删除自定义形象弹框
const delAvater =() =>{
  console.log('点击删除头像')
  delAvaterName.value = true
  showAvater.value = false
}
// 取消删除自定义形象弹框
const delAvaterqx =() =>{
  delAvaterName.value = false
}
// 确定删除自定义形象弹框
const delAvaterqd = async() =>{
  // 如果正在保存中，则不执行后续操作
  if (isSaving.value) return
  // 2. 【关键】立即关闭弹窗，从UI上阻止用户再次点击
  isSaving.value = true // 设置为保存中状态
  delAvaterqx()
  console.log('点击确定删除头像')
    const params = {
      id: delStarId.value,
    }
  try {
       const res = await HRequest.delStarFrame(params)
      if (res.code == 200) {
            Toast('删除成功')
            await getIdolList()
            delStarId.value = ''
            delStarName.value = ''
      }else{
            Toast(res.msg)

      }
  } catch (error) {
      console.log(error);
      Toast('删除失败')
      
  }finally {
    isSaving.value = false
  }

}


</script>

<style lang="less" scoped>
.fs-18 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 24px;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 100%;
  word-wrap: break-word;
  // padding: 0 0 210px 0;
  // background: url('@/assets/img/idolTelephone/Group.png') no-repeat;
  // background-size: cover;

  .fhui {
    position: absolute;
    width: 112px;
    height: 50px;
    top: 4px;
    z-index: 11;
  }

  .head {
    height: 300px;

    background: url('@/assets/img/idolTelephone/Group.png') no-repeat;
    background-size: cover;
  }

  .tabyp {
    width: 100%;
    height: 80px;
    background: url('@/assets/img/idolTelephone/yptab.png') no-repeat;
    background-size: cover;
    position: absolute;
    top: 348px;
    z-index: 1;
    display: flex;
    justify-content: space-around;

    div {
      width: 350px;
      height: 70px;
      // background-color: #333;
    }
  }

  .tabsp {
    width: 100%;
    height: 80px;
    background: url('@/assets/img/idolTelephone/sptab.png') no-repeat;
    background-size: cover;
    position: absolute;
    top: 348px;
    z-index: 1;
    display: flex;
    justify-content: space-around;

    div {
      width: 350px;
      height: 70px;
      // background-color: #333;
    }
  }

  .contentBox {
     position: relative;
     z-index: 1;
    height: auto;
    margin-top: 21px;

    .content {
      .center {
        >div {
          padding: 21px;
        }

        .my_star {
          min-height: 500px;
          border-radius: 21px;
          background: linear-gradient(180deg, #6D7CFF, transparent);

          .text-white {
            color: #fff;
            margin-top: -30px;
            display: flex;
            align-items: center; /* 垂直居中对齐 */
            img {
                width: 30px;
                height: 30px;
              }
          }

          .wdmx {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            padding: 4px 4px 0;

            .my {
              background: url('@/assets/otherImg/my_idol_title.png') no-repeat;
              background-size: cover;
              width: 167px;
              height: 54px;
            }

            .settings_btn {
              width: 192px;
              height: 58px;
              background: #4E57FF;
              color: #fff;
              border-radius: 58px;
              line-height: 58px;
              padding-left: 25px;
              position: relative;
              font-size: 29px;

              &::after {
                content: '';
                display: block;
                width: 29px;
                height: 29px;
                position: absolute;
                top: 12px;
                right: 15px;
                background: url('@/assets/otherImg/back_icon.png') no-repeat center;
                background-size: 100% auto;
              }
            }
          }

          .box {
            display: flex;
            flex-wrap: wrap;
            margin-top: 23px;
            width: 100%;
            // overflow-x: scroll;
            padding-bottom: 15px;
            // border:1px solid red;

            .box-box {
              width: 216px;
              height: 367px;
              border-radius: 17px;
              background: #f5fdff;
              margin-left: 10px;
              margin-right: 6px;
              padding: 17px;
              font-size: 33px;
              margin-bottom: 24px;
              // border:1px solid red;
            }
            .customBtn{
              width: 184px;
              height: 224px;
              background: #E5F1FF;
              border-radius: 8px 8px 8px 8px;
              >img{
                width: 32px;
                height: 32px;
                margin: 90px 80px;
              }
            }

            .customName{
              font-size: 32px;
              color: #00278D;
              font-weight: 400;
              text-align: center;
              margin-top: 28px;
            }
            .customBtn1{
              width: 176px;
              height: 206px;
              // height: 176px;
              // background: #E5F1FF;
              // margin-bottom: 45px;
            
              border-radius: 8px 8px 8px 8px;
              >img{
                width: 176px;
                height: 176px;
                object-fit: cover;      // 保持比例填充容器，多余部分裁剪
                object-position: top;   // 关键属性：从顶部开始对齐，从而显示上部分，隐藏下部分
                // margin: 90px 80px;
              }

            }
            .customName1{
              font-size: 32px;
              color: #00278D;
              font-weight: 400;
              text-align: center;
              margin: 14px auto 10px;
            }
            .customName1-fs {
              width: 183px;
              height: 63px;
              border-radius: 31px;
              background: linear-gradient(90deg, #00a2ff, #7c48ff);
              margin: auto;
              font-size: 29px;
              color: #fff;
              text-align: center;
              line-height: 63px;
            }
            .box-img {
              width: 192px;
              height: 192px;
              border-radius: 17px;
              overflow: hidden;
              position: relative;
                .settingImg{
              width: 40px;
              height: 40px;
              position: absolute;
              right: 10px;
              top: 10px;
              z-index: 6;
              img {
                  width: 100%;
                }
            }

              .bof {
                width: 40px;
                height: 40px;
                position: absolute;
                left: 5px;
                bottom: 0px;

                img {
                  width: 100%;
                }
              }

              img {
                width: 100%;
              }
            }

            .box-txt {
              font-size: 33px;
              color: #333;
              line-height: 50px;
              text-align: center;
              margin: 13px 0 17px;
              overflow: hidden;
              /* 隐藏溢出的内容 */
              text-overflow: ellipsis;
              /* 使用省略号代替溢出的文本 */
              white-space: nowrap;
              /* 不换行 */
            }

            .button-fs {
              width: 183px;
              height: 63px;
              border-radius: 31px;
              background: linear-gradient(90deg, #00a2ff, #7c48ff);
              margin: auto;
              font-size: 29px;
              color: #fff;
              text-align: center;
              line-height: 63px;
            }
          }
        }


        // margin-top: 38px;
        .gduo {
          font-size: 24px;
          float: right;
          color: #ff3c33;
        }

      }
      .toggle-button{
            color: #00278D;
              display: flex;
              .show-more{
                width: 200px;
                margin: auto;
                display: flex;
                img{
                margin-top: 10px;
                margin-left: 10px;
                width: 32px;
                height: 32px;
                // transform: rotate(90deg);
              }
            }
            .show-less {
                width: 120px;
                margin: auto;
                display: flex;
                img {
                  margin-top: 5px;
                  margin-left: 10px;
                  width: 32px;
                  height: 32px;
                  transform: rotate(180deg);
                }
            }
          }

      .product {
        width: 100%;
        height: 358px;
        position: relative;
        color: #061c69;
        margin-bottom: 33px;

        img {
          width: 100%;
          display: block;
          position: relative;
          z-index: 1;
        }

        .content-text {
          background: #ffffff;
          padding: 25px 29px;
          line-height: 46px;
          font-size: 29px;
          position: relative;
          z-index: 2;
          border-radius: 16px;
          top: -71px;
        }
      }

      .service {
        width: 100%;
        position: relative;
        color: #061c69;
        margin-bottom: 4px;
        padding-top: 104px !important;

        >img {
          width: calc(100% - 42px);
          display: block;
          position: absolute;
          z-index: 1;
          top: 21px;
          left: 21px;
        }
        .serviceGuide{
          // width: 250px;
          display: flex;
          justify-content: start;
          font-size: 28px;
          color: #00278D;
          position: absolute;
          top: 41px;
          right: 40px;
          z-index: 3;
          >img{
            margin-left: 10px;
            margin-top: 2px;
            width: 32px;
            height: 32px;
          }
        }

        .content-text {
          background: #ffffff;
          padding: 33px 25px;
          font-size: 27px;
          position: relative;
          z-index: 2;
          border-radius: 16px;
          display: flex;
          flex-direction: column;

          [class^=text-box] {
            flex: 1;
            margin-bottom: 25px;
            border-radius: 17px;
            background-color: #e6f6ff;
            padding: 25px 17px 25px 342px;
            background-repeat: no-repeat;
            background-position: left;
            background-size: 342px auto;

            &.text-box-1 {
              background-image: url('@/assets/otherImg/service_1.png');
            }

            &.text-box-2 {
              background-image: url('@/assets/otherImg/service_2.png');
            }

            &.text-box-3 {
              background-image: url('@/assets/otherImg/service_3.png');
            }

            &.text-box-4 {
              background-image: url('@/assets/otherImg/service_4.png');
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .ysxy {
        padding-top: 0 !important;
        

        >div {
          font-size: 26px;
          text-align: left;
          width: 100%;
          min-height: 150px;
          border-radius: 17px;
          background: rgba(255,255,255,0.5);
          color: #23262b;
          padding: 21px;

          // .more {
          //   width: 229px;
          //   height: 54px;
          //   line-height: 42px;
          //   background: linear-gradient(90deg, #579AFF, #6EA8FF);
          //   border-radius: 38px;
          //   padding: 6px 0 6px 29px;
          //   color: #fff;
          //   position: relative;
          //   margin: 17px auto 0;
          //   text-align: left;

          //   &::after {
          //     content: '';
          //     display: block;
          //     position: absolute;
          //     width: 25px;
          //     height: 25px;
          //     background: url('@/assets/otherImg/back_icon.png') no-repeat center;
          //     background-size: 25px;
          //     right: 17px;
          //     top: 14px;
          //   }
          // }
        }
        .serviceText{
          display: flex;
          justify-content: space-between;
          padding-bottom: 24px;
          border-bottom: 1px solid #ADCEFF;
          img{
            width: 40px;
            height: 40px;
          }
        }
        .selectTextImg{
          width: 224px;
          display: flex;
          justify-content: space-between;
        }
        .unsubscribe{
          margin-top: 24px;
          font-size: 24px;
          color: #23262B;

        }
      }
    }
  }
}

//更多规则
.overlay {
  width: 668px;
  height: 1142px;
  border-radius: 24px;
  opacity: 1;
  background: #fff url('@/assets/otherImg/more_rule_header.png') no-repeat top;
  // margin: 0 auto;
  padding: 27px 20px 27px 33px;
  font-size: 29px;
  color: #23262B;
  line-height: 46px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 负值的一半宽度和高度，实现居中 */
  .title {
    text-align: center;
    font-size: 33px;
    color: #000;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 35px;
  }

  .content-text {
    width: 100%;
    height: 929px;
    overflow-y: auto;
    margin: 0 auto;
    padding-right: 13px;
  }

  img {
    position: absolute;
    width: 42px;
    height: 42px;
    right: 33px;
    top: 31px;
  }
}

.odeBox {
  width: 668px;
  // height: 360px;
  border-radius: 28px;
  text-align: center;
  padding: 64px 50px;

  .top {
    font-size: 28px;
    color: #333;
    // font-weight: bold;
  }

  .flex {
    display: flex;
    justify-content: space-around;
    line-height: 80px;
    font-size: 32px;
    margin-top: 20px;

    .button {
      width: 240px;
      height: 80px;
      border-radius: 60px;
      border: 1px solid #c8c8c9;
      margin-right: 40px;
    }

    .button-rigth {
      width: 240px;
      height: 80px;
      border-radius: 60px;
      background-color: #ff3c33;
      color: #fff;
    }
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 1000px;
  height: 3000px;
  background-color: #ffffff;
  position: absolute;
  border-radius: 0px;
  top: 0;
  transition: 1s;
}

.zsfw {
  width: 708px;
  height: 760px;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.gdywgz {
  width: 240px;
  height: 64px;
  display: block;
  margin: 24px auto;
}

.XX {
  width: 48px !important;
  height: 48px;
  position: absolute;
  bottom: -100px;
  left: 45%;
}

.my-swipe .van-swipe-item {
  width: 750px;
  //height: 387px;

  img {
    width: 750px;
    // height: 387px;
  }
}

.title-com {
  width: 80%;
  // background-color: #333;
  margin: 30px auto 0 auto;
  font-size: 32px;
  font-weight: bold;
}

.zhuhe {
  width: 650px;
  // height: 500px;
  background-color: #ffffff;
  padding: 30px 0px 0px 35px;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  margin-top: 50px;

  .zhb {
    position: absolute;
    top: -20px;
  }

  .box {
    width: 180px;
    height: 220px;
    margin: 0 20px 20px 0;
    text-align: center;
    background: linear-gradient(180deg, rgba(202, 223, 250, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 20px;
    position: relative;
    font-size: 28px;
    line-height: 50px;

    &:nth-child(3n) {
      margin-right: 20px;
    }

    .img {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 10px;
      top: 10px;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      /* 使用省略号代替溢出的文本 */
      white-space: nowrap;
      /* 不换行 */
    }
  }

  .box-con {
    width: 180px;
    height: 175px;
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    justify-content: space-between;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
      border-radius: 10px;
    }
  }
}

.com-ok {
  width: 80%;
  height: 100px;
  font-size: 32px;
  background-color: #256fff;
  text-align: center;
  line-height: 100px;
  margin: 0 auto;
  color: #fff;
  margin-bottom: 70px;
  border-radius: 50px;
}

.refun-com {
  text-align: center;
  margin-top: 30px;
  font-size: 32px;
  font-weight: bold;
}

.refundBox {
  width: 600px;
  padding: 30px;
}

.com-refund {
  display: flex;
  justify-content: space-evenly;

  div {
    padding: 20px 60px;
    background-color: #256fff;
    border-radius: 30px;
    color: #fff;
    margin-bottom: 40px;

    &:nth-child(2n) {
      background-color: #ccc;
    }
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
  margin:16px auto 42px;
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
  .viewList{
    max-height: 650px;
    overflow: auto;
  }
  .orderList{
    position: relative;
    height: 112px;
    line-height: 112px;
    margin-bottom: 16px;
    border-radius: 16px;
    border: 1px solid #EAEDF1;
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
  }
  .tips{
     margin: 30px 0;
     font-size: 28px;
  }
  .remarks{
    margin: 20px 0;
    font-size: 24px;
    color: #23262B;
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
.gowGuidanceBox{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  position: absolute; /* 添加这行 */
  top: 0px;
  z-index: 5;

}

.gowGuidanceAdd{
  width: 650px;
  margin: auto;
  height: 952px;
  position: relative; /* 添加这行 */
  top: 200px;
}
.gowGuidanceVideo{
  width: 480px;
  height: 852px;
  margin-top: 20px;
  margin-left: 80px;
  >video{
    width: 100%;
    height: 100%;
    border-radius: 8px 8px 8px 8px;
  }
}
.exit_btn1{
  width: 56px;
  height: 56px;
  position: absolute;
  top: -40px;
  // left: 526px;
  right: 20px;
  z-index: 6;

}
.playVImg{
  width: 80px;
  height: 80px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 40;
  img{
    width: 100%;
    height: 100%;
  }
}
.gowGuidanceText{
  width: 560px;
  height: 196px;
  margin: 40px auto;
  background: #FFFFFF;
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #FFFFFF;
}
.gowGuidanceText>div:first-child{
  height: 52px;
  background: linear-gradient( 360deg, rgba(157,185,255,0) 0%, rgba(156,191,255,0.4) 100%);
  opacity: 0.7;
  font-size: 28px;
  color: #00278D;
  padding: 24px 32px;
}
.shadowYin{
  margin-top: -10px;
  width: 110px;
  height: 12px;
  background: rgba(14,77,255,0.2);
  border-radius: 0px 0px 0px 0px;
}
.gowGuidanceText>div:last-child{
  font-size: 28px;
  color: #23262B;
  padding: 24px 32px;
  span{
    color: #00278D;

  }
}

// 
.login-btn {
        width: 200px;
        height: 64px;
        background: rgba(0,0,0,0.15);
        border-radius: 40px;
        font-size: 29px;
        line-height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 25px;
        right: 17px;
        letter-spacing: 2px;
        color: #fff;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      }
  .qh {
    width: 292px;
    max-height: 200px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: end;
    top: 25px;
    right: 17px;
    z-index: 1;
    color: #fff;
    .qh-num {
      width: 292px;
      height: 58px;
      line-height: 58px;
      background: rgba(0,0,0,0.15);
      border-radius: 29px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
      }
      img:last-child {
        width: 20px;
        height: 20px;
        margin-top: -5px;
      }
    }
    .qh-btn {
      margin-top: 0.5rem;
      width: 256px;
      // height: 320px;
      text-align: center;
      background: #fff;
      border-radius: 10px;
      color: #242933;
      position: relative;
      z-index: 9;
      img{
        width: 32px;
        height: 32px;
        vertical-align: middle; /* 添加这行实现图片文字垂直居中 */
        margin-right: 10px;
      }
      >div{
        width: 200px;
        margin: 0 auto;
        height: 98px;
        line-height: 98px;
      }
      >div:nth-child(2){
        border-top: 2px solid rgba(255,255,255,0.5);
        border-bottom: 1px solid rgba(255,255,255,0.5);
      }
    }
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

</style>
