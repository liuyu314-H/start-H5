<!--
 * new page
 * @author: FuJing
 * @since: 2023-08-19
 * idolcombination.vue
-->
<template>
  <div class="boxBan">
    <div class="banner" @scroll="scrollEvent($event)">
      <!-- <div :class="[item.index == packg ? 'combination-yes' : 'combination']" v-for="item in list" :key="item.index" @click="handelCombination(item)">
        <img :src="getAssetsFile(item.img)" alt="" />
      </div> -->
      <div :class="[item.index == packg ? 'combination-yes' : 'combination']" v-for="item in list" :key="item.index" @click="handelCombination(item)">
        <img :src="getAssetsFile(item.img)" alt="" />
      </div>
    </div>
    <div class="banner-bom">
      <div class="fs-18">
        选择明星套餐
        <span class="gduo">{{ `（ 已选${data.weak.length}/${packg} ）` }}</span>
      </div>

      <div class="A" v-if="data.listData.length == 0">
        <van-empty class="empty" image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80" description="暂无此套餐" />
      </div>
      <div :class="[idolBoxindex == indexbox ? 'Abor' : 'A']" v-for="(items, indexbox) in data.listData" :key="indexbox" @click="hadnelidolBox(items, indexbox)">
        <div class="A-left">
          组
          <br />
          合
          <br />
          包
          <br />

          {{ letter(indexbox + 1) }}
        </div>

        <div class="A-con">
          <van-checkbox-group v-model="data.weak" direction="horizontal">
            <van-checkbox class="A-box" v-for="(item, index) in items.idolConfigList" :key="index" :name="item.idolId" @click="handelIdol(item)" :disabled="item.isOrder == 1">
              <template #icon="props">
                <div class="ydg" v-if="item.isOrder == 1"></div>
                <img :src="item.smPicUrl" alt="" />
                <img class="rigth-img" v-if="item.isOrder !== 1" src="@/assets/img/idolTelephone/icon_checkbox_dis-1.png" alt="" />
                <img class="rigth-img" v-if="props.checked" src="@/assets/img/idolTelephone/ee.png" alt="" />
                <p>{{ item.idolName }}</p>
              </template>
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
      <div>
        <span style="color: #666">生效时间：</span>
        立即生效
      </div>
      <div>
        <span style="color: #666">可用范围：</span>
        {{ data.txtData[0].provinceName }}
      </div>
      <div>
        <span style="color: #666">续订说明：</span>
        每月自动续订，自动扣费
      </div>
      <div>
        <span style="color: #666">退订说明：</span>
        可退订，详情可咨询10086
      </div>
      <div>
        <span style="color: #666">扣费规则：</span>
        {{ txtData.price }}元/月
      </div>
      <!-- <div class="B">
        <div class="B-con">
          <van-checkbox-group v-model="data.weak" direction="horizontal">
            <van-checkbox class="B-box" v-for="(item, index) in data.repeatData" :key="index" :name="item.index">
              <template #icon="props">
                <img :src="getAssetsFile(item.img)" alt="" />

                <img class="rigth-img" src="@/assets/img/idolTelephone/icon_checkbox_dis-1.png" alt="" />
                <img class="rigth-img" v-if="props.checked" src="@/assets/img/idolTelephone/ee.png" alt="" />
                <p>{{ item.name }}</p>
              </template>
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
      <div class="C">
        <div class="B-con">
          <van-checkbox-group v-model="data.weak" direction="horizontal">
            <van-checkbox class="B-box" v-for="(item, index) in data.repeatData" :key="index" :name="item.index">
              <template #icon="props">
                <img :src="getAssetsFile(item.img)" alt="" />

                <img class="rigth-img" src="@/assets/img/idolTelephone/icon_checkbox_dis-1.png" alt="" />
                <img class="rigth-img" v-if="props.checked" src="@/assets/img/idolTelephone/ee.png" alt="" />
                <p>{{ item.name }}</p>
              </template>
            </van-checkbox>
          </van-checkbox-group>
        </div>
      </div> -->
    </div>
  </div>
  <!-- <div class="buttonNo">立即订购（6元/月）</div> -->
  <div class="buttonOk" v-if="idolpackgShow == 0" @click="handelOk">立即订购（{{ txtData.price }}元/月）</div>
  <div class="buttonNo" v-else>已订购</div>

  <!-- 定购 -->
  <packgOrder v-if="orderShow" @onOrdershow="onOrdershow" :dataOrder="dataOrder" @type="handelType"></packgOrder>
  <notSuccess :isShow="determine">
    <div class="odeBox">
      <div class="top">是否确认定购{{ packgname }}</div>
      <div class="flex">
        <div class="button" @click="determine = false">取消</div>
        <div class="button-rigth" @click="handelYes">确认</div>
      </div>
    </div>
  </notSuccess>
  <toast :toastTxT="toasttxt" :toastShow="toastShow" @toastEmit="handelToast"></toast>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, watch } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { getAssetsFile, letter, monthlyOne } from '@/utils/index'
import HRequest from '@/api'
import toast from '@/components/toast/toast.vue'

const router = useRouter()
const toastShow = ref(monthlyOne())

const toasttxt: any = ref({
  title: '温馨提示',
  txt: '您所订购的组合包，每月可重新选择 1次组合包的明星，是否重新选择？'
})

// 头部渲染
const list = ref([
  { name: '白银组合包', img: 'Exclusivevideo/by.png', index: 3, comboPackType: 1 },
  { name: '黄金组合包', img: 'Exclusivevideo/hj.png', index: 5, comboPackType: 2 },
  { name: '铂金组合包', img: 'Exclusivevideo/bj.png', index: 8, comboPackType: 3 },
  { name: '钻石组合包', img: 'Exclusivevideo/zs.png', index: 12, comboPackType: 4 }
])
// 形象渲染
const data: any = reactive({
  weak: [],
  listData: [
    // { name: '乔巴', img: 'img/yer.png', index: 1 },
    // { name: '王路飞', img: 'img/yer.png', index: 2 },
    // { name: '娜美', img: 'img/yer.png', index: 3 },
    // { name: '刘三刀', img: 'img/yer.png', index: 4 },
    // { name: '弗兰奇', img: 'img/yer.png', index: 5 },
    // { name: '乌索普', img: 'img/yer.png', index: 6 }
    // { name: '罗宾', img: 'img/yer.png', index: 7 },
    // { name: '布鲁克', img: 'img/yer.png', index: 8 },
    // { name: '肾平', img: 'img/yer.png', index: 9 },
    // { name: '汉库克', img: 'img/yer.png', index: 10 },
    // { name: '基拉', img: 'img/yer.png', index: 11 },
    // { name: '梅利号', img: 'img/yer.png', index: 12 },
    // { name: '阳光号', img: 'img/yer.png', index: 13 }
  ],
  txtData: {},
  parmas: {
    payCode: '',
    phone: '', // 加密手机号
    idolIdSelected: [],
    comboPackType: ''
  }
})
// 关闭温馨提示
const handelToast = (e: boolean) => {
  toastShow.value = e
}
// 组合包数据
const packg = ref(3)
const packgname = ref('白银组合包')
sessionStorage.setItem('packgName', '白银组合包')

// 选择组合包
const handelCombination = (item: any) => {
  // const arrData = data.listData.filter((items: any) => items.comboPackType == item.comboPackType)
  // // 渲染对应选择的组合包数据
  // console.log(JSON.parse(JSON.stringify(arrData)))
  // data.listData = JSON.parse(JSON.stringify(arrData))

  // 偏移量
  if (item.comboPackType == 1) {
    candu.value.srcElement.scrollLeft = 0
  } else if (item.comboPackType == 2) {
    candu.value.srcElement.scrollLeft = 320
  } else if (item.comboPackType == 3) {
    candu.value.srcElement.scrollLeft = 650
  } else if (item.comboPackType == 4) {
    candu.value.srcElement.scrollLeft = 980
  }
  data.weak = []
  // 二次确认弹窗数据
  packgname.value = item.name
  dataOrder.value = { idolName: item.name } // 定购弹窗数据还有id未传
  sessionStorage.setItem('packgName', item.name)
  packg.value = item.index
  // 选择多的组合包已选择切回数量少的组合包对应删除
  if (data.weak.length > packg.value) return data.weak.splice(packg.value - data.weak.length)

  // 渲染idol列表
  idolList(user.value ? 1 : 0, item.comboPackType)
}
const user: any | null = ref(localStorage.getItem('tk'))
// 渲染爱豆
const idolList = async (userlogin: number, packg: number) => {
  const res = await HRequest.listComboPack(userlogin)
  const listData = res.data
  data.txtData = { ...res.data }
  //头部组合包选择渲染数据处理，只展示有组合包的数据
  const listIndex: number[] = []
  listData.forEach((e: any) => {
    listIndex.push(e.comboPackType)
  })
  const arrIndex = [...new Set(listIndex)]
  const arrData = list.value.filter((item: any) => arrIndex.includes(item.comboPackType))
  // 重新赋值渲染头部组合包
  list.value = arrData
  //===============渲染爱豆=================
  const arrDatass = listData.filter((items: any) => items.comboPackType == packg)
  // 渲染对应选择的组合包数据
  data.listData = JSON.parse(JSON.stringify(arrDatass))
  // 初始化赋值价格
  txtData.value = data.listData[0].idolConfigList[0]
}
// 需判断未登录   默认第一个展示白银包
idolList(user.value ? 1 : 0, 1)
// 选择爱豆中的大盒子
const txtData: any = ref({})
const idolBoxindex = ref(0)
const idolpackgShow = ref(0)
const hadnelidolBox = (items: any, index: number) => {
  // 筛选是否定购该组合包，如果筛选出有一条就不显示定购按钮
  // idolpackgShow.value = items.idolConfigList.filter((item: any) => item.isOrder == 1)
  // 组合包是否定购，0未定，1已定
  idolpackgShow.value = items.isOrder

  txtData.value = items.idolConfigList[0]
  sessionStorage.setItem('price', items.idolConfigList[0].price)
  idolBoxindex.value = index
  // 新增数据数据添加
  data.parmas.comboPackType = items.comboPackType
  data.parmas.payCode = items.comboPackNumber
}
const userDetail = async () => {
  const params = {
    loginChn: '4'
  }
  await HRequest.userDetail(params)
}
if (localStorage.getItem('tk')) {
  userDetail()
}
// 选择爱豆
const handelIdol = (item: any) => {
  if (data.weak.length > packg.value) {
    data.weak.pop()
    Toast(`${packg.value == 3 ? '白银组合包' : packg.value == 5 ? '黄金组合包' : packg.value == 3 ? '铂金组合包' : '钻石组合包'}只能选择${packg.value}个爱豆`)
    return
  }
}
// 定购
const handelOk = () => {
  data.parmas.idolIdSelected = JSON.parse(JSON.stringify(data.weak))
  data.parmas.phone = localStorage.getItem('phon')
  // console.log('已选择的爱豆ID', JSON.parse(JSON.stringify(data.weak)))
  // console.log('提交的数据', JSON.parse(JSON.stringify(data.parmas)))
  // // const dataList = JSON.parse(JSON.stringify(data.parmas))
  localStorage.setItem('packgList', JSON.stringify(data.parmas))
  if (!localStorage.getItem('tk')) {
    Toast('请先登录！')
    return
  }
  if (data.weak.length < packg.value) {
    // Toast(`至少选择${packg.value}个爱豆`)
    Toast(`当前组合包明星数量不满足订购条件，请选择其他组合包订购`)
    return
  }
  // 传给定购弹窗的值
  console.log('已选择的爱豆ID', data.weak)
  determine.value = true // 打开弹窗
}

//=======点击定购=======
const determine = ref(false)
const orderShow = ref(false)
const dataOrder: Ref<object> = ref({})
// const handelAnswer = (item: object) => {

// }
const handelYes = () => {
  console.log('确定')
  determine.value = false
  orderShow.value = true
}
// 订购取消
const onOrdershow = (item: boolean): void => {
  orderShow.value = item
}
// 订购成功
const handelType = () => {
  Toast('订购成功')
  idolList(localStorage.getItem('tk') ? 1 : 2, 1)
  packg.value = 3
  candu.value.srcElement.scrollLeft = 0
}
// 偏移量
const candu: any = ref(null)
const scrollEvent = (e: any) => {
  candu.value = e
}

watch(idolBoxindex, (a, b) => {
  console.log(a, b)
  if (a !== b) {
    data.weak = []
  }
})
</script>

<style lang="less" scoped>
.boxBan {
  padding: 0 0 150px 0;
}
.banner::-webkit-scrollbar {
  display: none;
}
.A-con::-webkit-scrollbar {
  display: none;
}
.banner {
  height: 316px;
  background: url('@/assets/img/Exclusivevideo/bg.png') no-repeat;
  background-size: contain;
  display: flex;
  overflow-x: auto;
  padding: 40px 50px 0 50px;

  .combination {
    width: 576px;
    height: 216px;
    margin: 0 20px;
    /*很重要，禁止子元素的收缩*/
    flex-shrink: 0;
    transition: 0.3s;
    transform: scale(1);

    img {
      width: 100%;
    }
  }
  .combination-yes {
    width: 576px;
    height: 216px;
    margin: 0 20px;
    /*很重要，禁止子元素的收缩*/
    flex-shrink: 0;
    transition: 0.3s;
    transform: scale(1.13);

    img {
      width: 100%;
    }
  }
}
.fs-18 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 24px;
}
.gduo {
  font-size: 24px;
  color: #fe6480;
}
.banner-bom {
  padding: 11px;
  .Abor {
    box-sizing: border-box;

    max-height: 339px;
    border: 1px #838cfc solid;
    // background: url('@/assets/img/Exclusivevideo/idola.png') no-repeat;
    background-size: contain;
    // padding: 12px 45px 0 85px;
    display: flex;
    border-radius: 20px;
    overflow: hidden;
    background-color: #ffffff;
    margin-bottom: 16px;
  }
  .A {
    max-height: 339px;
    box-sizing: border-box;
    border: 1px #fff solid;
    background-size: contain;
    display: flex;
    border-radius: 20px;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 16px;
    .empty {
      margin: 0 auto;
    }
  }

  .A-left {
    width: 60px;
    background-color: #6780fd;

    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .A-con {
    width: 640px;
    // height: 315px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    margin: 20px 0 0 20px;
    .A-box {
      width: 103.4px;
      height: 152.56px;
      margin-right: 24px;
      margin-bottom: 5px;

      position: relative;
      .ydg {
        width: 40px;
        height: 40px;
        background: url('@/assets/img/Exclusivevideo/ydg.png');
        background-size: cover;
        position: absolute;
        left: 0;
        top: 8px;
      }

      .rigth-img {
        width: 40px;
        height: 40px;
        right: 1px;
        position: absolute;
      }
      img {
        width: 100px;
        height: 100px;
        margin-top: -50px;
        border-radius: 18px;
      }
      p {
        font-size: 28px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.buttonOk {
  width: 624px;
  height: 92px;
  background: url('@/assets/img/idolTelephone/dingo.png');
  background-size: contain;
  position: fixed;
  bottom: 20px;
  left: 8%;
  text-align: center;
  line-height: 92px;
  font-size: 32px;
  color: #fff;
}
.buttonNo {
  width: 624px;
  height: 92px;
  background: url('@/assets/img/idolTelephone/hui.png');
  background-size: contain;
  position: fixed;
  bottom: 20px;
  left: 8%;
  text-align: center;
  line-height: 92px;
  font-size: 32px;
  color: #fff;
}
.buttonNo {
  width: 624px;
  height: 92px;
  background: url('@/assets/img/idolTelephone/hui.png') no-repeat;
  background-size: contain;
  position: fixed;
  bottom: 20px;
  left: 8%;
  text-align: center;
  line-height: 92px;
  font-size: 32px;
  color: #fff;
}
.odeBox {
  width: 668px;
  height: 360px;
  border-radius: 28px;
  text-align: center;
  padding: 64px 50px 0 50px;
  .top {
    font-size: 36px;
    color: #333;
    font-weight: bold;
  }
  .flex {
    display: flex;
    justify-content: space-around;
    line-height: 80px;
    font-size: 32px;
    margin-top: 94px;
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
      background-color: #838cfc;
      color: #fff;
    }
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
